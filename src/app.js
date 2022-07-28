const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const router = express.Router();
app.use(express.json());
app.use(function (req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
    next(); 
});

mongoose.connect(process.env.DB_CONNECTION.toString());

const Professor = require('./models/usuario');
const Review = require('./models/aluno');

const rotaIndex = require('./routes/rotaIndex');
const rotaProfessor = require('./routes/rotaUsuario');
const rotaReview= require('./routes/rotaAluno.js');

app.use('/', rotaIndex);
app.use('/professores', rotaProfessor);
app.use('/reviews', rotaReview);

module.exports = app;