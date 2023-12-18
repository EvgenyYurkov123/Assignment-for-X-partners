  const router = require('express').Router()
const { User } = require('../../db/models');

router.get('/', (req, res) => {
  res.json({user: req.session?.user || ''})
})

router.post('/reg', async (req, res) => {
  try {
    const { name, pass } = req.body
    const user = await User.create({ name, pass });
    req.session.user = user.name
    res.json(user);
  } catch (error) {
    res.json({err: error})
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('Cookie');
    res.json({user: ''})
  })
})

module.exports = router



