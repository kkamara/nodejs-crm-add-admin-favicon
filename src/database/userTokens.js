'use strict';
const { DataTypes, } = require("sequelize");
const { log, error, } = require('console');
const sequelize = require('.');
const { encrypt, } = require('../models/user');
const { appKey, } = require('../config/index');

const UserTokens = sequelize.define("users_tokens", {
  uid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  users_id: {
    type: DataTypes.INTEGER,
  },
  token: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

sequelize.sync().then(async () => {
  log('UserTokens table created successfully!');
  UserTokens.create({
    users_id: 1,
    token: encrypt(appKey).hash,
  })
  .then(() => { log('UserTokens created.'); })
  .catch(() => { log('Unable to create userTokens.'); });
  UserTokens.create({
    users_id: 2,
    token: encrypt(appKey).hash,
  })
  .then(() => { log('UserTokens created.'); })
  .catch(() => { log('Unable to create userTokens.'); });
  UserTokens.create({
    users_id: 3,
    token: encrypt(appKey).hash,
  })
  .then(() => { log('UserTokens created.'); })
  .catch(() => { log('Unable to create userTokens.'); });
}).catch((err) => {
  error('Unable to create table : ', err);
});

module.exports = UserTokens;
