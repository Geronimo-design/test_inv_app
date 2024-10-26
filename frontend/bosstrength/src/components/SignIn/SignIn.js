/** @format */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ setIsAdmin }) => {
  // State variables for username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to the backend
      const response = await fetch('http://localhost:8000/users/signIn', {
        // Updating the URL to the backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send username and password in the request body
      });

      if (response.ok) {
        // If the response is successful
        const data = await response.json();

        // Sets the JWT token and admin status in local storage when a user successfully signs in to know what to show to a user
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAdmin', data.isAdmin);

        // Update admin status
        setIsAdmin(data.isAdmin); // Assuming isAdmin is part of the response

        // Redirects to the products page when a user successfully signs in
        navigate('/products');
        console.log('Sign-in successful:', data);
      } else {
        // If the response has an error status, shows that the sign-in has failed

        const errorData = await response.json();
        alert(errorData.message || 'Sign-in failed');
      }
    } catch (err) {
      // Handling any network or unexpected errors
      console.error('Error during sign-in:', err);
      alert('An error occurred during sign-in');
    }
  };

  // rendering the sign in form
  return (
    <div className='sign-in-container'>
      <h2>Sign In</h2>
      <hr />
      <form className='sign-in-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            autoComplete='current username'
            type='text'
            id='username'
            name='username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            autoComplete='current password'
            type='password'
            id='password'
            name='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='submit'>Sign In</button>
      </form>
      <hr />
      <p className='sign-up-option'>
        Don't have an account? <a href='/signup'>Sign Up</a>
      </p>
    </div>
  );
};

export default SignIn;
