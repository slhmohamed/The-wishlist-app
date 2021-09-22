'use strict';
const mongoose=require('mongoose');
const winston=require('winston');
module.exports = () => {
    mongoose.connect('mongodb://localhost/astrolab',{
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true,
        useCreateIndex:true
    }).then(()=>winston.info('Mongo db Connected.....'));
}