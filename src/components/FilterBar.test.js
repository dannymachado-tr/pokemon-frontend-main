import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FilterBar from './FilterBar';

const empty = { name: '', type: '', legendary: '' };
function mount(filters = empty) {
  const onFilterChange = jest.fn();
  const onClearFilters = jest.fn();
  render(<FilterBar filters={filters} types={['Electric', 'Fire']} onFilterChange={onFilterChange} onClearFilters={onClearFilters} />);
  return { onFilterChange, onClearFilters };
}
test('changing name preserves the other filters', () => {
  const { onFilterChange } = mount({ ...empty, type: 'Electric' });
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Pika' } });
  expect(onFilterChange).toHaveBeenCalledWith({ name: 'Pika', type: 'Electric', legendary: '' });
});
test('type and legendary selectors send their values', () => {
  const { onFilterChange } = mount();
  fireEvent.change(screen.getByLabelText('Filter by Type:'), { target: { value: 'Fire' } });
  expect(onFilterChange).toHaveBeenCalledWith({ ...empty, type: 'Fire' });
  fireEvent.change(screen.getByLabelText('Legendary Status:'), { target: { value: 'false' } });
  expect(onFilterChange).toHaveBeenCalledWith({ ...empty, legendary: 'false' });
});
test('clear button is absent without active filters', () => {
  mount();
  expect(screen.queryByRole('button', { name: 'Clear Filters' })).toBeNull();
});
test('clear button invokes the callback for active filters', () => {
  const { onClearFilters } = mount({ ...empty, name: 'Pika' });
  fireEvent.click(screen.getByRole('button', { name: 'Clear Filters' }));
  expect(onClearFilters).toHaveBeenCalledTimes(1);
});
