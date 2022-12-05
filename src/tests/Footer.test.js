import { expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes da tela do Footer', () => {
  test('Testa se há um icone de drink e se é clicavel', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/drinks');
    });

    const iconDrink = screen.getByTestId('drinks-bottom-btn');
    expect(iconDrink).toBeInTheDocument();
    userEvent.click(iconDrink);

    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');
  });

  test('Testa se há um icone de meals e se é clicavel', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/meals');
    });

    const iconMeals = screen.getByTestId('meals-bottom-btn');
    expect(iconMeals).toBeInTheDocument();
    userEvent.click(iconMeals);

    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');
  });
});
