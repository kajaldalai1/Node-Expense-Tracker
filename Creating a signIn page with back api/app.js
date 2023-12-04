const express= require('express');
const app= express();
const path= require('path');
const cors= require('cors');
const bodyParser= require('body-parser');
const sequelize = require('./utils/signIn');
const Sequelize = require('./models/signIn');


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join( __dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'signIn.html'));
});
app.post('/user', async(req,res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (
            email==undefined ||
            email.length === 0 ||
            password== undefined ||
            password.length===0
        ){
            return res.status(400).json({message: "Bad parameter or something is missing"});
        }
        const data = await Sequelize.create({
            email:email,
            password: password
        });
        res.status(201).json({newUsersdata: data});
    }catch(err){
        res.status(500).json({ error: "some error", err});
    }
});
sequelize.sync().then((result) => {
    console.log(result);
});
app.listen(3000, () => {
    console.log('server is running');
});