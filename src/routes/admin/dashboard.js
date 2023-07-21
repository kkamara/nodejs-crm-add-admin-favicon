'use strict';
const express = require('express');
const { QueryTypes, } = require('sequelize');
const deepClone = require('deep-clone');
const config = require('../../config');
const db = require('../../database');
const { 
  validateAuthenticate,
  authenticate,
  getNewToken,
} = require('../../models/user');

const dashboard = express.Router();

dashboard.get('/', async (req, res) => {
  req.session.page = { title: 'Admin Dashboard', };
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
  
  return res.render(
    'admin/dashboard.pug',
    {
      config,
      title: session.page.title,
      session,
    }
  );
});

module.exports = dashboard;