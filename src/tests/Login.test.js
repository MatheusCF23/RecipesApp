import { expect, test } from '@jest/globals';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import Login from '../pages/Login';

describe('Testes da tela de login', () => {
  beforeEach(() => render(<Login />));
  afterEach(cleanup);

  test('Testa se há dois inputs', () => {
    const inputEmail = screen.getByLabelText('Email:');
    const inputPassword = screen.getByLabelText('Senha:');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('Testa se há um botão na tela', () => {
    const button = screen.getByRole('button', { name: 'Enter' });

    expect(button).toBeDisabled();
    expect(button).toBeInTheDocument();
  });

  test('Testa se ao digitar um email válido, o botão é ativado', () => {
    const button = screen.getByRole('button', { name: 'Enter' });
    const inputEmail = screen.getByLabelText('Email:');
    const inputPassword = screen.getByLabelText('Senha:');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, 'testeteste');

    expect(button).toBeEnabled();
  });

  // test('Verifica se a função validateEmail foi chamada', () => {
  //   const button = screen.getByRole('button', { name: 'Enter' });
  //   const inputEmail = screen.getByLabelText('Email:');
  //   const inputPassword = screen.getByLabelText('Senha:');

  //   userEvent.type(inputEmail, 'teste@teste.com');
  //   userEvent.type(inputPassword, 'testeteste');

  //   userEvent.click(button);

  //   expect(funçãoHandleClick).toBeCalledTimes(1);
  // });
});

test('Verifica se ao preencher tudo corretamente, o usuário é redirecionado a página meals', () => {
  const { history } = renderWithRouter(<App />);
  const button = screen.getByRole('button', { name: 'Enter' });
  const inputEmail = screen.getByLabelText('Email:');
  const inputPassword = screen.getByLabelText('Senha:');

  userEvent.type(inputEmail, 'teste@teste.com');
  userEvent.type(inputPassword, 'testeteste');
  userEvent.click(button);

  expect(history.location.pathname).toBe('/meals');
});
