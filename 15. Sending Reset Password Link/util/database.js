const Sequelize = require('sequelize');

const sequelize = new Sequelize('sending_reset_password','root','Littletwinkle@1',{
    //node-complete
    dialect: 'mysql',
    host: 'localhost'
});

module.exports= sequelize;