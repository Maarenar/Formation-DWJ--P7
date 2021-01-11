const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql2');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); 

const usersRoutes = require('./routes/users.routes');
app.use('/api/users', usersRoutes);

const postsRoutes = require('./routes/posts.routes');
app.use('/api/posts', postsRoutes);


const commentsRoutes = require('./routes/comments.routes');
app.use('/api/comments', commentsRoutes);

module.exports = app; 