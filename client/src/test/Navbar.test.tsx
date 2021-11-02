import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import Navbar from  '../components/navbar/Navbar'
import { BrowserRouter } from 'react-router-dom';


test('Render Logo', () => {
  render(
    <BrowserRouter>
      <Navbar/>
    </BrowserRouter>, 
  );
  const linkElement = screen.getByText(/hardco/i);
  expect(linkElement).toBeInTheDocument();
});
