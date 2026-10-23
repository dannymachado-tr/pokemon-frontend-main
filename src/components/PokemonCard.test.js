import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';

const pokemon = { id: 25, name: 'Pikachu', type: ['Electric'], legendary: false, image: '/pikachu.png' };
test('renders the name, padded ID, type, and accessible image', () => {
  render(<PokemonCard pokemon={pokemon} />);
  expect(screen.getByRole('heading', { name: 'Pikachu' })).toBeTruthy();
  expect(screen.getByText('#025')).toBeTruthy();
  expect(screen.getByText('Electric')).toBeTruthy();
  expect(screen.getByRole('img', { name: 'Pikachu' }).getAttribute('src')).toBe('/pikachu.png');
  expect(screen.queryByText(/Legendary/)).toBeNull();
});
test('legendary Pokemon show the badge', () => {
  render(<PokemonCard pokemon={{ ...pokemon, legendary: true }} />);
  expect(screen.getByText(/Legendary/)).toBeTruthy();
});
