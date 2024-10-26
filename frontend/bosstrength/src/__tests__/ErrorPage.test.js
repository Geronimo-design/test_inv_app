/** @format */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage/ErrorPage';

test('renders ErrorPage when user is not signed in', () => {
  // Render the ErrorPage component inside a BrowserRouter to handle Link components
  render(
    <BrowserRouter>
      <ErrorPage />
    </BrowserRouter>
  );

  // Assert that the error message is displayed
  const errorMessage = screen.getByText(
    /You must be signed in to view this page./i
  );
  expect(errorMessage).toBeInTheDocument();

  // Assert that the link to sign-in is present
  const signInLink = screen.getByRole('link', { name: /Back to sign-in/i });
  expect(signInLink).toBeInTheDocument();
  expect(signInLink).toHaveAttribute('href', '/');
});
