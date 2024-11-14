import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Register.css'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); 
  const navigate = useNavigate(); // Use this for navigation

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      alert('Registration Successful');
      console.log('Response:', response.data);
      // Redirect to the login page after successful registration
      navigate('/login');
    } catch (error) {
      alert('Registration Failed');
      console.log(error)
    }
  };


  return (
       <div className="form-container">
      <p className="title">Create Your Account</p>
       <form className="form">
       <input type="name" className="input" value={name}  onChange={(e) => setName(e.target.value)}
          placeholder="Name" autoComplete="email" />
  <input type="email" className="input"  value={email}
        onChange={(e) => setEmail(e.target.value)}  placeholder="Email" autoComplete="email" />
  <input type="password" className="input" placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        <select className="input" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" type="role"  >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
       </select>
       <button onClick={handleRegister} className="form-btn">Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>

</div>   
  );
};

export default Register;
