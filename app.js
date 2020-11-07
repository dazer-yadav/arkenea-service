//app.js file
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');
require('./db/mongoose');

const app = express();

const port = 3000;
const hostname = 'localhost';

let allowCrossDomain = (req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers','XMLHttpRequest','Content-Type','X-Requested-With','authorization','accesstoken');
    next();
}

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(allowCrossDomain);

app.get('/', (req,res)=>{
    res.send('Welcome to express server');
})
const userRouter = require('./routes/userRouter');

app.use('/users',userRouter);

const server = http.createServer(app);

server.listen(port,()=>{
	console.log('Server up and running on port: '+ port);
})


