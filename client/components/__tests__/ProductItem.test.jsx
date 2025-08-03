/* global test, expect, jest */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductItem from '../ProductItem';

test('shows alert when button is clicked', () => {
    window.alert = jest.fn(); // Mock the alert function
    render(<ProductItem name="Banana" extra="sweet" />);
    const button = screen.getByText('Banana');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('Banana has been added to your cart!');
});

test('renders button with correct name and extra props', () => {
  render(<ProductItem name="Avocado" extra="organic" />);
  
  const button = screen.getByRole('button', { name: /Avocado/i });

  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('name', 'organic');
});