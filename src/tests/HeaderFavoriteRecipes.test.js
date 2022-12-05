import { expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes da tela Header da tela Favorite Recipes', () => {
  test('Testa se há o texto Favorite Recipes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });

    const text = screen.getByRole('heading', { name: /Favorite Recipes/i });
    expect(text).toBeInTheDocument();
  });

  test('Testa se há um icone de profile e se é clicavel', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });

    const iconProfile = screen.getByTestId('profile-top-btn');
    expect(iconProfile).toBeInTheDocument();
    userEvent.click(iconProfile);

    act(() => {
      history.push('/profile');
    });

    expect(history.location.pathname).toBe('/profile');
  });
});
