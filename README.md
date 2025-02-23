# Sosa 

Мой первый полноценный проект, задумылвася как площадка для публикации и прослушивания музыки (можно сказать клон саундклауда, яндекс музыки или спотифая)

Стек: 
- React
- Type Script
- MongoDB
- Express
- NodeJS

## Инструкция 

Для запуска приложения на вашем устройстве должны быть установлены.

- NodeJS
- MongoDB

В файле `./server/src/config.js` в поле `db` вставте свою ссылку на локальную или глобальну базу MongoDB.
  
### Запуск клиентской части приложения

1. Открываем первый терминал в папке с проектом, переходим в папку `client` командой:
```bash
cd client
```

2. Даллее надо установить все зависимости командой:
```bash
npm install
```
```bash
yarn
```

3. Запускаем клиент командой:
```bash
npm run dev
```
```bash
yarn dev
```

4. В терминале выведится такое сообщение:
```bash
VITE v5.2.9  ready in 390 ms

➜  Local:   http://localhost:8000/
➜  Network: use --host to expose
➜  press h + enter to show help

```

5. В адресную строку браузера введите http://localhost:8000/, у вас откроется приложение. Терминал с запущенным клиентом не закрывайте.

### Запуск серверной части приложения

1. Открываем новый терминал в папке с проектом, переходим в папку `server` командой:
```bash
cd server
```

2. Даллее надо установить все зависимости командой:
```bash
npm install
```
```bash
yarn
```

3. Запускаем сервер командой:
```bash
npm run dev
```
```bash
yarn dev
```

4. Не много подождите, в терминале должно вывестись такое сообщение:
```bash
[nodemon] 3.1.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node ./src/index.js`
Server started on https://localhost:8001
DB ok
```

Всё вы запустили проект
