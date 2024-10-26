/** @format */

// The main App.js component, with routing for all of the routes
import ProductList from './components/Products/Products.js';
import Home from './components/Home/Home.js';
import SignUp from './components/SignUp/SignUp.js';
import Interact from './components/Interact/Interact.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/SignUp' element={<SignUp isAdmin={isAdmin} />} />
          <Route path='/products' element={<ProductList isAdmin={isAdmin} />} />
          <Route path='/' element={<Home setIsAdmin={setIsAdmin} />} />
          <Route path='/interact' element={<Interact isAdmin={isAdmin} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
