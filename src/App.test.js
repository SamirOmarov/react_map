import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders without crashing', () => {
  render(<App />);
  const heading = screen.getByText(/Choose 2 points/i);
  expect(heading).toBeInTheDocument();
});