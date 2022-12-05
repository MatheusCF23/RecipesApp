import { expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes da tela Header da tela Meals', () => {
  test('Testa se há o texto Meals', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/meals');
    });

    const text = screen.getByText(/Meals/i);

    expect(text).toBeInTheDocument();
  });

  test('Testa se há um icone de profile e se é clicavel', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/meals');
    });

    const iconProfile = screen.getByTestId('profile-top-btn');
    expect(iconProfile).toBeInTheDocument();
    userEvent.click(iconProfile);

    act(() => {
      history.push('/profile');
    });

    expect(history.location.pathname).toBe('/profile');
  });

  test('Testa se há um icone de pesquisa e exibe um campo de busca', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/meals');
    });

    const iconSearch = screen.getByTestId('search-top-btn');
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);

    const search = screen.getByTestId('search-input');
    userEvent.type(search, 'Rice');

    expect(search).toHaveValue('Rice');
  });
});
