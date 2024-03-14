const express=require('express')
const {postReg,postLogin}=require('../controllers/authController')
const router=express.Router()

router.post('/register',postReg)
router.post('/login',postLogin)
module.exports=router