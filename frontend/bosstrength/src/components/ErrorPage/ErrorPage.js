/** @format */

// A component that throws an error page when no JWT is detected. The JWT is checked for in products.js and interact.js.
import './ErrorPage.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  // Returns a message and a link to sign in
  return (
    <div className='error-message'>
      <h1>Error</h1>
      <p className='error-page'>
        You must be signed in to view this page.
        <Link to='/'>Back to sign-in</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
