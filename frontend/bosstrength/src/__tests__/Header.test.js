/** @format */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header/Header';

test('renders Header with correct links', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Find elements by their test ids
  const productsLink = screen.getByTestId('products-link');
  const interactLink = screen.getByTestId('interact-link');
  const signInLink = screen.getByTestId('sign-in-link');

  // Ensure that elements are present
  expect(productsLink).toBeInTheDocument();
  expect(interactLink).toBeInTheDocument();
  expect(signInLink).toBeInTheDocument();
});
