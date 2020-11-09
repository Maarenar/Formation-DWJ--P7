const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql');

const Comment = sequelize.define('Comment', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull
      },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
  });