const Sequelize = require('sequelize');
const sequelize = require('../utils/signIn');

const sign_In = sequelize.define('signIn',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
module.exports=sign_In;