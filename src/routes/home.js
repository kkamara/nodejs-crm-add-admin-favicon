'use strict';
const express = require('express');
const { QueryTypes, } = require('sequelize');
const deepClone = require('deep-clone');
const config = require('../config');
const db = require('../database');

const home = express.Router();

home.get('/dashboard', async (req, res) => {
  const adminUser = 3;
  const [results, metadata] = await db.query(
      "SELECT uid FROM users WHERE users.uid = ? ORDER BY uid DESC LIMIT 1", 
      {
          replacements: [ adminUser, ],
          type: QueryTypes.SELECT,
      },
  );

  req.session.page = { title: 'Dashboard', };
  req.session.auth = {
    name: 'Jane Doe',
    lastLogin: '2023-07-03 16:40:00',
    permissions: [
      'view client',
      'create client',
      'view user',
      'create user',
      'view log',
      'create log',
    ], 
  };

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
  
  return res.render('home.pug', {
      config,
      title: session.page.title,
      session,
  });
})

module.exports = home;