const bcrypt = require('bcrypt');

const Joi = require('joi')
const _ = require('lodash');
const { userModel, validate } = require('../models/user-model');


const Signup = async (req, res) => {

    const { error } = validate(req.body);

    if (error) return res.status(422).send(error.details[0].message);

    let user = await userModel.findOne({ email: req.body.email }).exec();
    if (user) return res.status(400).send('User with this email already exist');


    try {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(req.body.password, salt);
        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: password
        })
        const User = await newUser.save();
        console.log(User);
        return res.status(201).json(User);
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}

const curentUser = async (req, res) => {
    let user = await User.findById({ _id: req.params.id }).exec();
    res.status(200).send({ status: true, result: user });
}


module.exports = {
    Signup,
    curentUser
}