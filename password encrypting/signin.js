const express=require('express')
const server=express()
const path=require('path')
const bcrypt=require('bcrypt')
const bodyParser=require('body-parser')
const sequelize=require('./util/signup')
const Sequelize = require('./models/signup')
server.use(express.json());
const cors=require('cors');
server.use(cors())
server.use(express.static(path.join(__dirname,'public')))
server.use(bodyParser.urlencoded({extended:false}))

function isstringinvalid(string){
  if(string == undefined ||string.length === 0){
      return true
  } else {
      return false
  }
}

server.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','login.html'))
})

let newUserdata = {};
server.post('/user', async (req, res) => {
    try {
      
      const email = req.body.email;     
      const password=req.body.password
      
      if(email==undefined ||email.length===0|| password==undefined || password.length===0){
        return res.status(400).json({message:"Bad parameter or something is missing"})
      }      
      const data = {
        email:email,     
        password: password
      }
      newUserdata=data;    
          
      res.status(201).json({ newUserdata: data });
      console.log(data)

    } catch (err) {       
    res.status(500).json({ error:"some error", err }) 
    }
  });

  server.get('/user/login',async(req,res)=>{
    try{
      const { email, password } = req.query;
      if(isstringinvalid(email) || isstringinvalid(password)){
          return res.status(400).json({message: 'EMail idor password is missing ', success: false})
      }
      console.log(password);
      const user  = await Sequelize.findAll({ where : { email }})
          if(user.length > 0){
             bcrypt.compare(password, user[0].password, (err, result) => {
             if(err){
              throw new Error('Something went wrong')
             }
              if(result === true){
                  return res.status(200).json({success: true, message: "User logged in successfully", token: generateAccessToken(user[0].id, user[0].name, user[0].ispremiumuser)})
              }
              else{
              return res.status(400).json({success: false, message: 'Password is incorrect'})
             }
          })
          } else {
              return res.status(404).json({success: false, message: 'User Doesnot exitst'})
          }
      }catch(err){
          res.status(500).json({message: err, success: false})
      }
  })


sequelize.sync().then((result)=>{
    console.log(result)
})




server.listen(2000,()=>{
    console.log('server is running')
})