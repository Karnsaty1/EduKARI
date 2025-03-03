import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import "./comp.css"; 

const Sign = () => {
    const navigate=useNavigate();
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
    const rep1=await fetch(`${process.env.BACKEND}/auth/sign`,{method:'POST',

        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
    });
    if(rep1.ok){
   navigate('/dashboard');
    }
   } catch (error) {
    console.log(error);
   }
  };

  return (
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
  );
};

export default Sign;
