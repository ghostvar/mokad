'use strict'
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const app = express();
const port = process.env.APP_PORT || 3030;

app.use(helmet());
app.use('/api', require('./backend/app'));

app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`app was listening on port ${port}`)
});