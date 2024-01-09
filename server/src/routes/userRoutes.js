const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const { Op } = require('sequelize');

const { body, validationResult } = require('express-validator');
const { User } = require('../../db/models');
const verifyToken = require('../lib/middlewares/verifyToken');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/', verifyToken, async (req, res) => {
  try {
    const { user } = req;
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Произошла ошибка' });
  }
});

router.get('/people', verifyToken, async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        id: { [Op.ne]: req.user.userId },
      },
      attributes: ['id', 'name', 'age', 'photo'],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Произошла ошибка при получении пользователей' });
  }
});

router.post(
  '/register',
  upload.single('photo'),
  [
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password').isLength({ min: 5 }).withMessage('Пароль должен содержать минимум 5 символов'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const photoPath = req.file.path;
      const {
        name, email, password, gender, dateOfBirth,
      } = req.body;
      console.log('mmmmmmmm', 'req.body;', req.body);

      if (!name || !email || !password || !gender || !dateOfBirth || !photoPath) {
        return res.status(400).json({ error: 'Заполните все поля' });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Пользователь уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name, email, password: hashedPassword, gender, dateOfBirth, photo: photoPath,
      });

      const token = jwt.sign(
        {
          userId: user.dataValues.id,
          name: user.dataValues.name,
          email: user.dataValues.email,
          dateOfBirth: user.dataValues.dateOfBirth,
          gender: user.dataValues.gender,
          photo: user.dataValues.photo,
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
      );

      res.json({ message: 'Регистрация прошла успешно', token });
    } catch (error) {
      console.error('Ошибка обработки запроса на регистрацию:', error);
      res.status(500).json({ error: 'Произошла ошибка при регистрации' });
    }
  },
);

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Неверная почта или пароль' });
    }
    const token = jwt.sign(
      {
        userId: user.dataValues.id,
        name: user.dataValues.name,
        email: user.dataValues.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Произошла ошибка при входе' });
  }
});
router.put('/:userId', verifyToken, upload.single('photo'), async (req, res) => {
  try {
    const { userId } = req.params;

    console.log('>>>>>>>>.....>', req.params);
    const { name, password, photo } = req.body;
    console.log('>>>>>>>>.....> req.body', req.body);

    if (String(userId) !== String(req.user.userId)) {
      // console.log('Я попал сюда');
      return res.status(403).json({ error: 'У вас нет прав для выполнения этой операции' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    console.log('::::::::> req.file', req.file, 'photo', photo);
    if (photo && req.file) {
      const oldPhotoPath = user.photo; // Сохраняем старый путь к фотографии
      // console.log('>>>>>>>>>>>>', oldPhotoPath, user.photo);
      if (oldPhotoPath) {
        try {
          // Удаляем старую фотографию из файловой системы
          fs.unlinkSync(oldPhotoPath);
        } catch (error) {
          console.error('Ошибка удаления старой фотографии:', error);
          return res.status(500).json({ error: 'Произошла ошибка при удалении старой фотографии' });
        }
      }

      user.photo = req.file.path; // Заменяем фотографию на новую
    }

    // Обновляем имя и пароль, если они были предоставлены
    if (name) {
      user.name = name;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({
      userId: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    res.status(500).json({ error: 'Произошла ошибка при обновлении профиля' });
  }
});

router.get('/logout', (req, res) => {
  delete req.headers.authorization;
  res.status(200).json({ message: 'Пользователь успешно вышел' });
});

module.exports = router;
