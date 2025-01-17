const { json } = require('express');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');


const home = async(req,res) => {
    try {
        res
        .status(200)
        .send("Welcome ji Welcome auth"); 
    } catch (error) {
        console.log(error);
        
    }
};

const register = async (req,res) => {
    try {
        console.log(req.body);
        const {username, email, phone, password} = req.body;
        const userExist = await User.findOne({ email});

        if(userExist) {
            return res.status(400).json({message : "email already exists"});
        }

        const userCreated = await User.create({username, email, phone, password});


        res.status(200).send({ msg : 'registration succesfull', token: await userCreated.generateToken(), userId: userCreated._id.toString()});
    } catch (error) {
        res.status(500).send({msg: 'Error page not found'})
    }
};


const login = async (req, res) => {
    try {
      const { email, password} = req.body;
      
      const userExist = await User.findOne({email});

      if(!userExist) {
        return res.status(400).json({ message: 'Invalid Login Credentials'});
      }

    //   const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

      if (user) {
        res.status(200).send({ msg : 'Login succesfull', token: await userExist.generateToken(), userId: userExist._id.toString()});
      }
      else{
        res.status(401).json({message: 'Invalid Id or password'});
      }
    } catch (error) {
        // res.status(500).json('internal server error');
        next(error);
    }
}


const user = async(req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({userData});
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
}

module.exports = { home, register, login, user };