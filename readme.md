![nodejs-crm5.png](https://github.com/kkamara/useful/blob/main/nodejs-crm5.png?raw=true)

![nodejs-crm2.png](https://github.com/kkamara/useful/blob/main/nodejs-crm2.png?raw=true)

![nodejs-crm.png](https://github.com/kkamara/useful/blob/main/nodejs-crm.png?raw=true)

# nodejs-crm

(02-Jul-23) Nodejs, Mysql, Redis, Reactjs.

## App Security with Node.js

Authenticating `/admin` login. [File](https://github.com/kkamara/nodejs-crm/blob/main/src/models/user.js). Snippet:

```bash
'use strict';
...
/**
 * Returns the salt and hash
 * @param {string} plainText
 * @return {object} Like { salt, hash, }.
 */
const encrypt = (plainText) => {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(plainText, salt, 64)
    .toString('hex');
  return { salt, hash, };
};

/**
 * Compare resulting hashes.
 * @param {string} plainText
 * @param {string} hash
 * @param {string} hashSalt
 * @return {bool}
 */
const compare = (plainText, hash, hashSalt) => {  
  let res = false;
  const hashedBuffer = scryptSync(
    plainText, hashSalt, 64,
  );

  const keyBuffer = Buffer.from(hash, 'hex');
  const match = timingSafeEqual(hashedBuffer, keyBuffer);
  
  if (!match) {
      return res;
  }

  res = true;
  return res;
};
```

## Installation

* [Node.js](https://nodejs.org/en/)
* [yarn](https://yarnpkg.com/).

```bash
  cp .env.example .env
  yarn install
```

## Usage

##### Run database migrations

```bash
  yarn node src/index.js
```

##### Run start
```bash
  yarn start # Runs Start-script `yarn node src/app.js`
  # Serves app to http://localhost:3000/.
  # Serves api to http://localhost:3000/api/v1.
  #   Example api route: http://localhost:3000/api/v1/test.
```

###### Reload server on project files change

```bash
  yarn dev # Runs Dev-script `nodemon yarn src/app.js`
  # We can also `APP_ENV=development nodemon yarn src/app.js`.
```


## Using docker?

* [docker](https://docs.docker.com/engine/install/) 
* [docker-compose](https://docs.docker.com/compose/install/).

```bash
  docker-compose up --build -d
```

## To run api tests

```bash
  yarn test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[BSD](https://opensource.org/licenses/BSD-3-Clause)
