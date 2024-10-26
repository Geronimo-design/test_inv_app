/** @format */

// A snapshot test for the Products component
import React from 'react';
import { render } from '@testing-library/react';
import Products from '../components/Products/Products';

// // Creating mock versions of Header and ErrorPage components, to ensure that the test is able to catch the ErrorPage if a user is not logged in
jest.mock('../components/Header/Header', () => () => <div>Mocked Header</div>);
jest.mock('../components/ErrorPage/ErrorPage', () => ({ message }) => (
  <div>{message}</div>
));

// Checks to ensure that these values are being held in localStorage
beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn((key) => {
        if (key === 'token') return 'mockToken';
        if (key === 'isAdmin') return 'true';
        return null;
      }),
    },
    writable: true,
  });
});

// Renders the Products component as a fragment and checks if it matches the previous snapshot
test('Products component renders correctly', () => {
  const { asFragment } = render(<Products />);
  expect(asFragment()).toMatchSnapshot();
});
