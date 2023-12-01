const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./utils/signup');
const Sequelize = require('./models/signup');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.post('/user', async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;

        if (
            email == undefined ||
            email.length === 0 ||
            name.length === 0 ||
            name == undefined ||
            phone == undefined ||
            phone.length === 0 ||
            password == undefined ||
            password.length === 0
        ) {
            return res.status(400).json({ message: "Bad parameter or something is missing" });
        }

        const data = await Sequelize.create({
            name: name,
            email: email,
            phone: phone,
            password: password,
        });

        res.status(201).json({ newUserdata: data });
    } catch (err) {
        res.status(500).json({ error: "some error", err });
    }
}); // Add this closing parenthesis

sequelize.sync().then((result) => {
    console.log(result);
});

app.listen(3000, () => {
    console.log('server is running');
});
