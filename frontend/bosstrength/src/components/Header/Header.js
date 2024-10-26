/** @format */

// A component that acts like a sticky header with links to the products, sign in and interact pages.
import React from 'react';
import logo from './logo.jpg';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  // Checks for a token in local storage. Considers the user logged in if it finds a token, and logged out if no token exists.
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');

  // Signs a user out by removing their JWT from local storage
  const signOut = () => {
    if (token) {
      localStorage.removeItem('token');
    }
    if (isAdmin) {
      localStorage.removeItem('isAdmin');
    }
  };
  // The '/' route will be the sign in page. If a user is signed in and clicks this link, they will be signed out
  return (
    <div className='header'>
      <img className='logo' src={logo} alt='Verdantly logo' />
      <h1>Bosstrength</h1>
      <nav>
        <Link to='/products' data-testid='products-link'>
          Products
        </Link>

        {token ? (
          <Link to='/' onClick={signOut}>
            Sign out
          </Link>
        ) : (
          <Link to={'/'} data-testid='sign-in-link'>
            Sign in
          </Link>
        )}

        <Link to='/interact' data-testid='interact-link'>
          Interact
        </Link>
      </nav>
    </div>
  );
}

export default Header;
