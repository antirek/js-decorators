const express = require('express');
const app = express();
const util = require('util');

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

const users = express.Router();

let get = async (req, res) => {
    // console.log('users list', 1);
    const result = [{
        name: 'vasya',
    }];
    res.json(result);

    return {
        id: 'dsfsdgdg',
        result: 'ok',
    }
};

function logged(f, action) {
    // получаем название функции
    const name = f.name;
    async function wrapped(...args) {
      // сообщаем о запуске функции
      console.log(action, `запуск ${name} с аргументами ${args.join(', ')}`);
      // получаем результат выполнения функции
      const ret = f.call(this, ...args);
      // сообщаем о завершении функции
      console.log(action, `завершение ${name}`);
      // возвращаем результат
      let y;
      if (util.types.isPromise(ret)) {
          y = await Promise.resolve(ret);
      } else {
          y = ret;
      }
      console.log(action, y);
      //   return ret
    }
    // Object.defineProperty() определяет новое или изменяет существующее свойство объекта
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
    Object.defineProperty(wrapped, 'name', { value: name, configurable: true })
    // возвращаем обертку
    return wrapped
  }

get = logged(get, 'users');

users.get('/', get)

app.use('/users', users)

app.listen(3000)