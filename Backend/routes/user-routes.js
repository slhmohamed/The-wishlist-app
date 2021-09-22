const express=require('express');
const { Signup,curentUser} = require('../controllers/userController');
const auth = require('../middelware/auth');


const router =express.Router();
router.post('/register',Signup);

 

module.exports={
    routes:router
}