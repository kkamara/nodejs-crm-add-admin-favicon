'use strict';
const express = require('express');
const { QueryTypes, } = require('sequelize');
const deepClone = require('deep-clone');
const config = require('../../config');
const db = require('../../database');
const { 
  validateAuthenticate,
  authenticate: auth,
  getNewToken,
} = require('../../models/user');

const authenticate = express.Router();

authenticate.post('/', async (req, res) => {
  if (
    !req.headers.authorization || 
    null === req.headers.authorization.match(/Basic /)
  ) {
    res.status(401);
    return res.json({ message: 'Unauthorized.' });
  }

  req.session.page = { title: 'Admin Authenticate', };
  req.session.auth = null;

  await new Promise((resolve, reject) => {
    req.session.save(function(err) {
      if (err) {
        console.log(err)
        return reject(err);
      }
      resolve()
    });
  });
  
  const newSession = { page: req.session.page, auth: req.session.auth, };
  const session = deepClone(newSession);
  await new Promise((resolve, reject) => {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err)
        return reject(err);
      }
      resolve();
    });
  });
  
  return res.json({ 
    message: 'Success',
    data: null,
  });
});

module.exports = authenticate;