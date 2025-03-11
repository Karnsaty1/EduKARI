import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css";

const Sign = () => {
  const [check, setCheck] = useState(false);
  const [otp, setOtp] = useState("");
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
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (rep1.ok) {
        setCheck(true);
      } else {
        console.log(rep1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const otpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert("Please enter a 6-digit OTP.");
      return;
    }
    try {
      const rep2 = await fetch(`${import.meta.env.VITE_BACKEND}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: formData.email, otp }),
      });
      if (rep2.ok) {
        navigate("/dashboard");
      } else {
        console.log(rep2);
      }
    } catch (error) {
      console.log(error);
    }
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
        <input
          type="text"
          value={otp}
          maxLength={6}
          onChange={handleOtpChange}
          placeholder="Enter 6-digit OTP"
          className="otp-input"
        />
        <button type="submit">Verify OTP</button>

      </form>
      <h2>Welcome!</h2>
    </div>
  );
};

export default Sign;
