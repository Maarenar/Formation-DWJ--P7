const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());


const usersRoutes = require('./routes/users.routes');
app.use('/', usersRoutes);

/*
const postsRoutes   = require('./routes/posts.routes');
const comsRoutes    = require('./routes/coms.routes');

app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/coms', comsRoutes);*/


module.exports = app;