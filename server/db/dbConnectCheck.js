
const { sequelize } = require('../db/models');

module.exports = async () => {
  try {
    await sequelize.authenticate();
    console.log('\x1b[36mБаза данных успешно подключена! \x1b[0m');
  } catch (error) {
    console.error('\x1b[31mБаза данных Не подключена! \x1b[0m', error.message);
  }
};



