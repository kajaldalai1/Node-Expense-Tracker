const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-expense','root','Littletwinkle@1',{
    //node-complete
    dialect: 'mysql',
    host: 'localhost'
});

module.exports= sequelize;
