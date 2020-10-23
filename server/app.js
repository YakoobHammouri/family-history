const express = require('express');

const path = require('path');

const cookieParser = require('cookie-parser');

const fileUpload = require('express-fileupload');

const cloudinary = require('cloudinary').v2;

const router = require('./controllers');

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const app = express();
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  }),
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(router);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
module.exports = app;
