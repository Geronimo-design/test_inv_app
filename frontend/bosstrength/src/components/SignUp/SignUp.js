/** @format */

// A function that allows a new user to sign up
import React, { useState } from 'react';
import Header from '../Header/Header';
import './SignUp.css';

const SignUp = () => {
  // A state variable that contains the new user's information
  const [signupData, setSignupData] = useState({ username: '', password: '' });

  // Handles changing user input in the input fields
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  // This function handles the submission of the form by making an API call to the backend
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert(`Error during signup: ${error}`);
      console.error(`Error during signup: ${error}`);
    }
  };

  return (
    <div>
      <Header />
      <div className='form-container'>
        <h2>Signup</h2>
        <form onSubmit={handleSignupSubmit}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={signupData.username}
            onChange={handleSignupChange}
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={signupData.password}
            onChange={handleSignupChange}
            required
          />
          <button type='submit'>Signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
