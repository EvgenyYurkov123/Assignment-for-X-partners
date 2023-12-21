const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const verifyToken = require('../lib/middlewares/verifyToken');
const { User } = require('../../db/models');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', verifyToken, async (req, res) => {
  try {
    const { user } = req;
    console.log('user', user);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Произошла ошибка' });
  }
});

router.post('/register', upload.single('photo'), async (req, res) => {
  console.log('req.body', req.body);
  console.log('req.file', req.file);
  try {
    const {
      name, email, password, dateOfBirth, gender, photo,
    } = req.body;
    if (!name || !email || !password || !dateOfBirth || !gender || !photo) {
      return res.status(400).json({ error: 'Заполните все поля' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, email, password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: user.dataValues.id,
        name: user.dataValues.name,
        email: user.dataValues.email,
        gender: user.dataValues.gender,
        dateOfBirth: user.dataValues.dateOfBirth,
        photo: user.dataValues.photo,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );

    res.json({ token });
    res.json({ message: 'Регистрация прошла успешно' });
  } catch (error) {
    res.status(500).json({ error: 'Произошла ошибка при регистрации' });
  }
});

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

router.get('/logout', (req, res) => {
  delete req.headers.authorization;
  res.status(200).json({ message: 'Пользователь успешно вышел' });
});

module.exports = router;
