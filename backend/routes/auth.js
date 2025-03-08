const express = require('express');
const {getDb} = require('./db');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOtpEmail = async (email, otp) => {
   try{ await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Verification',
        text: `Your OTP is: ${otp}`,
    });}
    catch(error){
        console.log(error);
    }
};

const generateToken = (email) => { return jwt.sign({ email }, process.env.SECRET, { expiresIn: '1h' }) }



const sendMail = async (email, res) => {
   try{ const otpRT = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 60 * 60 * 1000;
    res.cookie('otp', JSON.stringify({otpRT, expiresAt}), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'Strict',
        maxAge: 3600000
    });
    await sendOtpEmail(email, otpRT);}
    catch(error){
        console.log(error);
    }
}

const compareOtp=(enteredOTP, otpCookie)=>{
    try {
        
        if(!otpCookie) return false;
        const { otpRT, expiresAt } = JSON.parse(otpCookie);
        if(Date.now() > expiresAt){
            return false;
        }
        if(otpRT!==enteredOTP) return false;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

router.post('/verify-otp', (req, res) => {
  try {
    const { otp}=req.body;
    
    if( !otp) return res.status(400).json({msg:'Email/OTP required !!!'});
    if(compareOtp(otp, req.cookies.otp)){
        return res.status(200).json({ msg: 'OTP verified successfully' });
    }
    else{
        return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:'Internal Server Error !!!'});
  }
});

router.post('/sign', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const account = getDb('accounts');
        const user = await account.findOne({ email });

        // if (user) return res.status(400).json({ msg: 'User Already Exists !!!' });
        const hashpassword = await bcrypt.hash(password, 12);

        await account.insertOne({ email: email, password: hashpassword, name: name });
        await sendMail(email,res);

        const token = generateToken(email);

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
        return res.status(200).json({ msg: 'User Registered Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error !!!' });
    }
});

router.post('/log', async (req, res) => {
    try {
        const { email, password } = req.body;

        const account = getDb('accounts');
        const user = await account.findOne({ email });

        if (!user) return res.status(400).json({ msg: 'User not found !!!' });

        const check = await bcrypt.compare(password, user.password);
        if (!check) return res.status(400).json({ msg: 'Invalid Access !!!' });

        await sendMail(email,res);
        const token = generateToken(email);

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


        return res.status(200).json({ msg: 'User Loggedin Successfully!!!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error !!!' });
    }
});

module.exports=router;