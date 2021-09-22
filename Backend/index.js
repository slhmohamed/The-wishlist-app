'use strict';
 
const express=require('express');
const cors =require('cors');
const environement=require('./environnement');
const bodyParser=require('body-parser');
const winston=require('winston');
 
const app=express();

app.use('/src/files',express.static(__dirname+'/src/files'));
const userRouter=require('./routes/user-routes');
const authRoutes=require('./routes/auth-routes');

const wishlistRoutes=require('./routes/wishlist-routes');

const productRoutes=require('./routes/product-routes');
 
 
require('./stratup/config')();
require('./stratup/db')();
require('./stratup/logging')();
require('./stratup/validation')();
 
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
 
app.use('/api/user',userRouter.routes);
 
app.use('/api/auth',authRoutes.routes);

app.use('/api/wishlist',wishlistRoutes.routes);
app.use('/api/product',productRoutes.routes);

 
 
app.listen(environement.port, () => winston.info('App listening on url:http://localhost:'+environement.port));