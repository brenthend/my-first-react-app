/* global test, expect, jest */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CategorySelect from '../CategorySelect';
import * as api from '@api';

// 🔧 Mock getCategories to return fake categories
jest.spyOn(api, 'getCategories').mockResolvedValue({
  data: [
    { id: 1, name: 'grocery' },
    { id: 2, name: 'hardware' }
  ]
});

test('renders categories and calls onChange when selection changes', async () => {
  const handleChange = jest.fn();

  render(<CategorySelect selected="grocery" onChange={handleChange} />);

  // ⏳ Wait for categories to appear
  await waitFor(() => {
    expect(screen.getByRole('option', { name: /Grocery/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Hardware/i })).toBeInTheDocument();
  });

  // 🔄 Simulate changing the selection
  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: 'hardware' },
  });

  // ✅ Expect the onChange handler to be called with new value
  expect(handleChange).toHaveBeenCalledWith('hardware');
});