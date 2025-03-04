const express=require('express');
const getDb=require('./db');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer');

const otpStorage = {};

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

const generateToken=(email)=>{return jwt.sign({email},process.env.SECRET,{expiresIn:'1h'})}



const sendMail=async(email)=>{
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStorage[email] = { otp };
    await sendOtpEmail(email, otp);
}

router.post('/sign',async(req,res)=>{
try {
    const {email,password,name}=req.body;
    const account=getDb('accounts');
    const user=await account.findOne({email});

    if(user) return res.status(400).json({msg:'User Already Exists !!!'});
    const hashpassword=await bcrypt.hash(password,12);

    await account.insertOne({email:email,password:hashpassword,name:name});
    await sendMail(email);

    const token=generateToken(email);
    
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  
            sameSite: 'Strict',
            maxAge: 3600000 
        });
        res.cookie('email', email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  
            sameSite: 'Strict',
            maxAge: 3600000 
        });
    
        res.cookie('name', name, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  
            sameSite: 'Strict',
            maxAge: 3600000 
        });
    
    return res.status(200).json({msg:'User Registered Successfully'});
} catch (error) {
    console.log(error);
    res.status(500).json({msg:'Internal Server Error !!!'});
}
});

router.post('/log',async(req,res)=>{
    try {
        const {email,password}=req.body;

        const account=getDb('accounts');
        const user=await account.findOne({email});

        if(!user) return res.status(400).json({msg:'User not found !!!'});

        const check=await bcrypt.compare(password,user.password);
        if(!check) return res.status(400).json({msg:'Invalid Access !!!'});

        await sendMail(email);
        const token=generateToken(email);

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  
            sameSite: 'Strict',
            maxAge: 3600000 
        });
    
        res.cookie('email', email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  
            sameSite: 'Strict',
            maxAge: 3600000 
        });
    
        res.cookie('name', user.name, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  
            sameSite: 'Strict',
            maxAge: 3600000 
        });
    

        return res.status(200).json({msg:'User Loggedin Successfully!!!'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Internal Server Error !!!'});
    }
});