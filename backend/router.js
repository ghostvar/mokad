'use strict'
const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');
const knex = require('./knex');

const api = express.Router();
const avalfun = ['login', 'krs', 'transkip'];

function unAuth(res) {
  res.status(403).json({
    status: 'error',
    message: 'Unauthorized'
  });
}

api.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  req.auth = req.headers.authorization;
  const basic = req.headers.authorization ? req.headers.authorization.split(' ')[1] || null : null;
  if(basic) {
    const [username, password] = Buffer.from(basic, 'base64').toString('ascii').split(':');
    if(username && password) {
      req.auth = {
        username, password,
        urlencoded: `username=${username}&password=${password}`
      };
      next();
    } else {
      unAuth(res);
    }
  } else {
    unAuth(res);
  }
});

api.get('/scrapper/:funame', function (req, res) {
  const { funame } = req.params;
  if(avalfun.includes(funame)) {
    const child = spawn('phantomjs', [__dirname + "/scrapper/phantom.js", funame, req.auth.urlencoded]);
    child.stdout.on('data', async (out) => {
      const [status, html] = JSON.parse(out);
      const id = uuidv4();
      await knex('metadata').insert({
        id,
        userid: crypto.createHash('sha256').update(req.auth.urlencoded).digest('hex'),
        status, html, funame
      });
      res.status(201).json({
        id, status, html,
        message: status == 'success' ? 'Metadata success downloaded!' : 'Failed to download metadata!',
      });
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Not Found'
    });
  }
});

api.get('/scrapper', async function (req, res) {
  const { funame } = req.query;
  const meta = knex('metadata').where({
    userid: crypto.createHash('sha256').update(req.auth.urlencoded).digest('hex'),
  });
  if(funame) meta.where({ funame });
  res.status(200).json(await meta.select('id', 'funame', 'status', 'created_at').orderBy('created_at', 'desc'));
});

api.get('/renderer/:id?', async function (req, res) {
  const { id } = req.params;
  if(id && !uuidValidate(id)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid parameter id'
    });
  }
  let meta = knex('metadata').where({
    userid: crypto.createHash('sha256').update(req.auth.urlencoded).digest('hex'),
  });

  if(id) meta.where({ id });
  else meta.where({ funame: 'transkip' });

  meta = await meta.orderBy('created_at', 'desc').first();
  if(meta) {
    if(fs.existsSync(__dirname + "/renderer/" + meta.funame + ".js")) {
      res.status(200).json({
        status: 'success',
        message: 'Render metadata success',
        metadata: {
          id: meta.id,
          funame: meta.funame
        },
        data: require('./renderer/' + meta.funame)(meta.html)
      });
    } else {
      res.status(400).json({
        status: 'error',
        message: 'Metadata tidak dapat dirender'
      });
    }
  } else {
    res.status(404).json({
      status: 'error',
      message: id ? 'Not Found': 'Setidaknya terdapat satu transkip ter-scrapping!'
    });
  }
});

module.exports = api;