const Sequelize = require("sequelize");

const sequelize = require('../util/database');

const User = sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING, // Assuming you're storing passwords as strings
        allowNull: false,
      },
      totalExpenses: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      ispremiumuser: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    }, {
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    });
    
    module.exports = User;