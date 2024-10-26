/** @format */

// This is the home page component that contains the sign in component and a cover image
import Header from '../Header/Header.js';
import SignIn from '../SignIn/SignIn.js';
import background from './background.webp';
import './Home.css';

function Home({ setIsAdmin }) {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        {' '}
        <img
          className='background'
          src={background}
          alt='cover for Bosstrength'
        />
        <SignIn setIsAdmin={setIsAdmin} />
      </div>
    </div>
  );
}

export default Home;
