/** @format */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Interact from '../components/Interact/Interact';

// Tests to ensure that the interact component is actually rendering properly
test('renders properly', () => {
  render(
    <BrowserRouter>
      <Interact />
    </BrowserRouter>
  );
  expect(screen.getByTestId('interact-component')).toBeInTheDocument();
});
