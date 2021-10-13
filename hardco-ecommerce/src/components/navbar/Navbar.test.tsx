import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import Navbar from  './Navbar'


test('Render Logo', () => {
  render(<Navbar/>);
  const linkElement = screen.getByText(/hardco/i);
  expect(linkElement).toBeInTheDocument();
});

