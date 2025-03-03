const express=require('express');
const getDb=require('./db');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOtpEmail = async (email, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Verification',
        text: `Your OTP is: ${otp}`,
    });
};



const sendMail=async(email)=>{
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStorage[email] = { otp, password: hashpassword };
    await sendOtpEmail(email, otp);
}

router.post('/sign',async(req,res)=>{
try {
    const {email,passowrd}=req.body;
    const account=getDb('accounts');
    const user=await account.findOne({email});
    if(user) return res.status(400).json({msg:'User Already Exists !!!'});
    const hashpassword=await bcrypt.hash(passowrd,12);
    await account.insertOne({email:email,passowrd:hashpassword});
    await sendMail(email);
    return res.status(200).json({msg:'User Registered Successfully'});
} catch (error) {
    console.log(error);
}
});

router.post('/log',async(req,res)=>{
    try {
        const {email,password}=req.body;
        const account=getDb('accounts');
        const user=await account.findOne({email});
        if(!user) return res.status(400).json({msg:'User not found !!!'});
        const check=bcrypt.compare(password,user.passowrd);
        if(!check) return res.status(400).json({msg:'Invalid Access !!!'});
        sendMail(email);
        return res.status(200).json({msg:'User Loggedin Successfully!!!'});
    } catch (error) {
        console.log(error);
    }
});