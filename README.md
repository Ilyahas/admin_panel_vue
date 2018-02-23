# [Vue.js] CMS to update data on web-site


### Compile client part
```
$ cd Client/admin (/user and /login)
$ npm install
$ npm run build
```

#### Dev mode
```bash
$ npm run dev
``` 
This will run client site on http://localhost:8080 (by default).

For setup correct requests you need to change server DNS in config.js file in 'src' directory.
('src/components/Login.vue' for login page)

### Install server dependencies
In root project folder:
```bash
$ npm install
```

### Run server
```bash
$ npm start
```
### Database
PostgreSQL config in app/config.js:
```
'host': '<host>',
'user': '<username>',
'password': '<password>',
'database': '<database_name>',
'port': '<port>'
```

Also in config.js you need to setup server port (3000 by default)
