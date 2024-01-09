// ! Инициализация проекта
// * npm init -y
// * npx eslint --init
// * npx create-gitignore node
//! Зависимости
/* "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "dev": "nodemon app.js --ext js,jsx --ignore sessions"
  },

  "devDependencies": {
    "eslint": "^8.44.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.22",
    "sequelize-cli": "^6.6.1"
  },
  "dependencies": {
    "@babel/core": "^7.17.12",
    "@babel/preset-env": "^7.17.12",
    "@babel/preset-react": "^7.17.12",
    "@babel/register": "^7.17.7",
    "bcrypt": "^5.1.0",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "http-errors": "^1.8.0",
    "pg": "^8.11.1",
    "pg-hstore": "^2.3.4",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "sequelize": "^6.32.1",
    "session-file-store": "^1.5.0"
  }, */

// todo создай файл .babelrc и добавь в него:
/*
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
*/
// !  Создай Файл app.js
// ! Добавить в Файл app.js
//    require('@babel/register');

// todo Добавь скрипты dev и start в package.json
/*
"dev": "nodemon app.js --ext js,jsx",
"start": "node app.js"
*/

// todo установки библиотек:
// * npm i sequelize pg pg-hstore
// * npm i -D sequelize-cli

// todo создай файл .sequelizerc с таким содержимым:
const path = require('path');

module.exports = {
  config: path.resolve('db', 'config', 'database.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations'),
};

// ? npx sequelize - список всех команд
// * npx sequelize-cli init - инициализация папок sequelize

// todo подредактируй config/database.json
// * "dialect": "postgres"

// todo создай базу данных
// * npx sequelize db:create

// ? npx sequelize model:generate --help - список команд для генерации модели
// ? allowNull: false  - чтобы поле не могло быть null
// * npx sequelize model:generate --name Сard --attributes title:string,quantity:integer,price:int,image:string,category_id:integer

// todo Команда для миграции
// * npx sequelize db:migrate

// todo Команда для отмены миграции
// * npx sequelize db:migrate:undo:all

// todo Команда для генерации сидера
// ? npx sequelize seed:generate --help - список команд для генерации модели
// * npx sequelize seed:generate --name CreateBears

// todo Команда для использования сидера
// * npx sequelize db:seed:all

// todo Отмена сидера
// * npx sequelize db:seed:undo
// ? Отмена конкретного сидера
// * npx sequelize db:seed:undo --seed 20220906083531-CreateDirectors.js

// todo Отмена всех сидов
// * npx sequelize db:seed:undo:all

// todo Создание связей one-to-one и one-to-many
// ? Для поля типа `foreignKey` необходимо прописать в миграции следующую опцию
/*
references: {
  model: {
    tableName: 'tableName',
  },
  key: 'id'
}
*/

// todo создай файл в DB dbConnectCheck.js на проверку подключения к базе данных
/* //! Не забудь
const { sequelize } = require('./models');

module.exports = async () => {
  try {
    await sequelize.authenticate();
    console.log('База данных успешно подключена! :)');
  } catch (error) {
    console.error('База данных не подключена:', error.message);
  }
};
*/

// ? Для таблицы, где прописан foreignKey, нужно в ассоциациях прописать:

// this.belongsTo(models.Model, { foreignKey: 'modelId' })

// ? Для таблицы, на которую ссылается зависимая нужно прописать,
// ? в зависимости от типа связи либо `hasOne`, либо `hasMany`

// this.belongsTo(models.Deck, { foreignKey: 'Deck_id' });
// this.hasMany(models.Guess, { foreignKey: 'Round_id' });

// ? modelId - имя foreignKey в зависимой таблицы_

// ! Внешний ключ foreignKey будет в той модели, КОТОРАЯ ПРИНАДЛЕЖИТ к другой (belongsTo)

// todo Полезные опции для миграций
// ? для того кто принадлежит перед createdAt в миграции после ключа id
// onUpdate: 'CASCADE',
// onDelete: 'CASCADE',
// ? Например:
/* title: {
  type: Sequelize.STRING,
    allowNull: false,
      },
*/
// ? и в моделях
/* User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'User' */
// * defaultValue - позволяет установить значение по умолчанию
// * allowNull - может ли значение отсутствовать (null)
// * unique - должны ли все записи быть уникальными
// * onDelete - позволяет указать, что нужно делать при удалении записи, от которой зависит текущая

// ! Инициализация базы данных
// * npm i sequelize sequelize-cli pg pg-hstore
// todo создай файл .sequelizerc и добавь в него:
/*

*/
// * npx sequelize init
// * npx sequelize db:create
// * npx sequelize model:generate
// * npx sequelize db:migrate
// * npx sequelize db:seed:all

// ? npm i @faker-js/faker
// * npm i express dotenv

// * Подключение bootstrap
/*
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
*/
//! Для цвета в консоли
// '\x1b[33mБаза данных успешно подключена! :)\x1b[0m' - Жёлтый
// '\x1b[36mСервер Успешно подключён!!!! \x1b[0m' - голубой


require('@babel/register');

const ReactDOMServer = require('react-dom/server');
const React = require('react');

const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const paths = require('path');

// Импортируем созданный в отдельный файлах рутеры.
const indexRouter = require('./routes/index');
const entriesRouter = require('./routes/entries');
const Error = require('./views/Error');

const app = express();
const PORT = 3000;

// Подключаем middleware morgan с режимом логирования "dev", чтобы для каждого HTTP-запроса на
// сервер в консоль выводилась информация об этом запросе.
app.use(logger('dev'));
// Подключаем middleware, которое сообщает epxress, что в папке "ПапкаПроекта/public" будут
// находится статические файлы, т.е.файлы доступные для скачивания из других приложений.
app.use(express.static(path.join(__dirname, 'public')));
// Подключаем middleware, которое позволяет читать содержимое body из HTTP-запросов
// типа POST, PUT и DELETE.
app.use(express.urlencoded({ extended: true }));
// Подключаем middleware, которое позволяет читать переменные JavaScript, сохранённые
// в формате JSON в body HTTP - запроса.
app.use(express.json());

app.use('/', indexRouter);
app.use('/entries', entriesRouter);

// Если HTTP-запрос дошёл до этой строчки, значит ни один из ранее встречаемых рутов не ответил
// на запрос.Это значит, что искомого раздела просто нет на сайте.Для таких ситуаций используется
// код ошибки 404. Создаём небольшое middleware, которое генерирует соответствующую ошибку.
app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

// Отлавливаем HTTP-запрос с ошибкой и отправляем на него ответ.
app.use((err, req, res) => {
  // Получаем текущий ражим работы приложения.
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;

  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку.
  // В противно случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  // Записываем информацию об ошибке и сам объект ошибки в специальные переменные,
  // доступные на сервере глобально, но только в рамках одного HTTP - запроса.
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть.
  // В противно случае записываем универсальный стату ошибки на сервере - 500.
  res.status(err.status || 500);
  // Ренедрим React-компонент Error и отправляем его на клиент в качестве ответа.
  const errorPage = React.createElement(Error, res.locals);
  const html = ReactDOMServer.renderToStaticMarkup(errorPage);
  res.write('<!DOCTYPE html>');
  res.end(html);
});

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
// app.use('/pics', express.static('pics'));