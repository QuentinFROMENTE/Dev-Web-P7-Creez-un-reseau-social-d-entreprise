const express = require ('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

const userAuthRoutes = require('./routes/UserAuth');
const userInfoRoutes = require('./routes/userInfo');
const quoteRoutes = require('./routes/Quote');

/*Connexion à la bas de donnée MongoDB*/
mongoose.connect(
    'mongodb+srv://Admin:tWUoEOAjShYDnJON@p7fromente.3htmk.mongodb.net/p7fromente',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connection à MongoDB réussi'))
    .catch(() => console.log('Connexion à MongoDB échoué'));
    
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json());

/*Middleware de gestion CORS*/
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images/profile', express.static(path.join(__dirname, '../images/profile')));
app.use('/images/quote', express.static(path.join(__dirname, '../images/quote')));

app.use('/api/auth', userAuthRoutes);
app.use('/api/user', userInfoRoutes);
app.use('/api/quote', quoteRoutes);

module.exports = app;