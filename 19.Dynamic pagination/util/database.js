const Sequelize = require('sequelize');

const sequelize = new Sequelize('report_generation_frontend','root','Littletwinkle@1',{
    //node-complete
    dialect: 'mysql',
    host: 'localhost'
});

module.exports= sequelize;