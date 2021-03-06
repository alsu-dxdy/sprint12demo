const express = require('express');
const app = express();
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {errors} = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(cookieParser());

app.use((req, res, next) => {
    req.user = {
        _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
    };

    next();
});
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.use('/', router);


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})


app.use(errorLogger);
app.use(errors());

app.use(function (err, req, res, next) {
    const status = err.status || 500;
    let message = err.message;
    if (err.name === 'ValidationError' || err.joi){
        return res.status(400).send(`validation error:\n${err.message}`);        
    }

    if (status == 500){
        console.error(err.stack || err);
        message = 'unexpected error';
    }

    res.status(status).send(message);
})
