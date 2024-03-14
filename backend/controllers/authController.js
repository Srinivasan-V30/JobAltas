const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User = require('../models/userModel')
const mongoose= require('mongoose')

const postReg = async (req, res) => {
    try {
        // Hash the password with 10 rounds of salt
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword, // Use the hashed password
            role: req.body.role
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const postLogin=(async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user)
        {
            return res.status(404).json({message:'User not found'})   
        }
        if (!await bcrypt.compare(req.body.password,user.password))
        {
            res.status(404).json({message:'Incorrect password'})
        }
        const token= jwt.sign({id:user._id},'secret_key')
        res.json({token})
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
    
})

module.exports={
    postReg,
    postLogin
}



