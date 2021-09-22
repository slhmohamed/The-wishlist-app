const Joi = require('joi');
const bcrypt = require('bcrypt');
const {userModel} = require('../models/user-model');


const login = async (req, res) => {
    const {error} = validate(req.body);
 
    if(error) return res.status(422).send(error.details[0].message);

    const user = await userModel.findOne({email: req.body.email}).exec();
    
    if(!user) return res.status(404).send({message:'Invalid email or password'});

    const validPassword= await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(404).send('Invalid email or password');

    const token  = user.generateAuthToken();
 
    res.send({ status: true, result: token });
}

const validate = (req) => {
    const schema = { 
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

  return  Joi.validate(req, schema);
}

module.exports = {
    login
}