const express=require('express')
const app=express()
const path=require('path')
const bcrypt=require('bcrypt')
const sequelize=require('./util/expense')
const Expense = require('./models/expense')
const User=require('./models/user')
const bodyParser=require('body-parser')
const router=require('./routes/expense')
const userRoutes = require('./routes/user')
app.use(express.json());
const cors=require('cors')
app.use(cors())
app.use(express.static(path.join(__dirname, '..','views')));
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:false}))


app.use(router)
app.use('/user', userRoutes)



User.hasMany(Expense);
Expense.belongsTo(User);


sequelize.sync()
    .then(() => {
        app.listen(2000);
    })
    .catch(err => {
        console.log(err);
    })