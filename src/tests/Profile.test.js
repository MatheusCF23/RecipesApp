import { expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import renderWithRouter from '../helpers/renderWithRouter';

const emailTest = 'teste@teste.com';

describe('Testes da tela do Profile.', () => {
  test('Testa se há 3 Button', () => {
    localStorage.setItem('user', JSON.stringify([{
      email: emailTest,
    }]));
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/profile');
    });

    const btnDone = screen.getByTestId('profile-done-btn');
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');

    expect(btnDone).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
  });

  test('Testa se a página muda após o usuário clicar no botão de Done Recipes', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/profile');
    });
    const doneBtn = screen.getByRole('button', { name: /done recipes/i });
    expect(history.location.pathname).toBe('/profile');
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Testa se a página muda após o usuário clicar no botão de Favorite Recipes', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/profile');
    });
    const doneBtn = screen.getByRole('button', { name: /favorite recipes/i });
    expect(history.location.pathname).toBe('/profile');
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Testa se a página muda após o usuário clicar no botão de Logout', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/profile');
    });
    const doneBtn = screen.getByRole('button', { name: /Logout/i });
    expect(history.location.pathname).toBe('/profile');
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/');
  });
});
