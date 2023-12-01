const Sequelize = require('sequelize');

const sequelize =new Sequelize('signup', 'root', 'Littletwinkle@1',{
    dialect:'mysql',
    host:'localhost'
})
sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successflly. ');

})
.catch((err) => {
    console.error('Unable to connect to the database:', err);

});
module.exports=sequelize;