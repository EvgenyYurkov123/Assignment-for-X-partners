const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

router.get('/', (req, res) => {
  res.json({ user: req.session?.user || '' });
});

router.post('/reg', async (req, res) => {
  const { userName, userEmail, password } = req.body;
  try {
    if (!userName || !userEmail || !password) {
      return res.status(400).json({ error: 'Заполните все поля' });
    }

    const existingUser = await User.findOne({ where: { userEmail } });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь уже существует' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName, userEmail, password: hashPassword,
    });
    const rawData = user.get({ plain: true });
    const userData = { ...rawData };
    delete userData.password;
    req.session.user = userData;
    res.status(201).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Ошибка при регистрации: ${error.message}` });
  }
});

router.post('/login', async (req, res) => {
  const { userEmail, password } = req.body;
  try {
    const existUser = await User.findOne({ where: { userEmail }, raw: true });
    if (!existUser || !(await bcrypt.compare(password, existUser.password))) {
      return res.status(400).json({ error: 'Неверная почта или пароль' });
    }
    const userData = { ...existUser };
    delete userData.password;
    req.session.user = userData;
    res.json(userData);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка при входе в систему' });
  }
});

router.get('/logout', (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('X-partners');
      res.json({ user: '' });
    });
  } catch (error) {
    console.log('Куки не убили', error);
    res.sendStatus(400);
  }
});

module.exports = router;
