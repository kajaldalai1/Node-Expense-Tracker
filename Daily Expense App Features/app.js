const express=require('express')
const app=express()
const path=require('path')
const bcrypt=require('bcrypt')
const sequelize=require('./util/expense')
const Sequelize = require('./models/expense')
const user=require('./models/user')
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




Sequelize.sync().then((result)=>{
    console.log(result)
  })

  user.sync().then((result)=>{
    console.log(result)
  })


app.listen(2000)