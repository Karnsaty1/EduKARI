import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./comp.css";

const Sign = () => {
  const [check, setCheck] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rep1 = await fetch(`${import.meta.env.VITE_BACKEND}/auth/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify(formData),
      });
      if (rep1.ok) {
        setCheck(true);
      }
      else{
        console.log(rep1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpChange = (index, e) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

const otpSubmit=async(e)=>{
  e.preventDefault();
  try {
    const rep2=await fetch(`${import.meta.env.VITE_BACKEND}/auth/verify-otp`,{method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials:'include',
      body: JSON.stringify({ email: formData.email, otp: otp.join("") })
    });
    if(rep2.ok){
      navigate('/dashboard');
    }
    else{
      console.log(rep2);
    }
   
  } catch (error) {
    
  }
}

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log("OTP Submitted:", otp.join(""));
  };

  return !check ? (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  ) : (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <form onSubmit={otpSubmit}>
        <div className="otp-box">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e)}
            />
          ))}
        </div>
        <button type="submit" >Verify OTP</button>
      </form>
    </div>
  );
};

export default Sign;
