import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes do componente SearchBar na tela Meals', () => {
  test('Testa os componentes da página Meals', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/meals');
    });
    const iconSearch = screen.getByTestId('search-top-btn');
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'onions');

    const ingredients = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredients);

    const btnBusca = screen.getByTestId('exec-search-btn');
    userEvent.click(btnBusca);

    const text = await screen.findByText('Beef Dumpling Stew');
    expect(text).toBeInTheDocument();

    const name = screen.getByTestId('name-search-radio');
    userEvent.click(name);
    userEvent.type(inputSearch, 'Corba');
    userEvent.click(btnBusca);

    expect(history.location.pathname).toBe('/meals');

    const first = screen.getByTestId('first-letter-search-radio');
    expect(first).toBeInTheDocument();

    jest.spyOn(global, 'alert').mockImplementation(() => {});
    userEvent.type(inputSearch, 'be');
    userEvent.click(first);
    userEvent.click(btnBusca);

    expect(first.checked).toEqual(true);
    expect(global.alert).toHaveBeenCalled();

    // const textFirst = await screen.findByText('Bread and Butter Pudding');
    // expect(textFirst).toBeInTheDocument();
  });

  // test('Verificar se possui a página Meals tem 5 botões de categorias', async () => {
  //   const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
  //   act(() => {
  //     history.push('/meals');
  //   });

  //   const button1 = await screen.findByRole('button', { name: /Beef/i });
  //   expect(button1).toBeInTheDocument();
  //   userEvent.click(button1);
  //   expect(await screen.findByText(/Beef and Mustard Pie/i)).toBeInTheDocument();

  //   const button2 = await screen.findByRole('button', { name: /Breakfast/i });
  //   expect(button2).toBeInTheDocument();
  //   userEvent.click(button2);
  //   expect(await screen.findByText(/Breakfast Potatoes/i)).toBeInTheDocument();

  //   const button3 = await screen.findByRole('button', { name: /Chicken/i });
  //   expect(button3).toBeInTheDocument();
  //   userEvent.click(button3);
  //   expect(await screen.findByText(/Ayam Percik/i)).toBeInTheDocument();

  //   const button4 = await screen.findByRole('button', { name: /Dessert/i });
  //   expect(button4).toBeInTheDocument();
  //   userEvent.click(button4);
  //   expect(await screen.findByText(/Apam balik/i)).toBeInTheDocument();

  //   const button5 = await screen.findByRole('button', { name: /Goat/i });
  //   expect(button5).toBeInTheDocument();
  //   userEvent.click(button5);
  //   expect(await screen.findByText(/Mbuzi Choma (Roasted Goat)/i)).toBeInTheDocument();

  //   const buttonAll = await screen.findByRole('button', { name: /All/i });
  //   expect(buttonAll).toBeInTheDocument();
  //   userEvent.click(buttonAll);
  //   expect(await screen.findByText(/Corba/i)).toBeInTheDocument();
  // });
});

describe('Testando o SearchBar da page Drinks', () => {
  test('Testa os componentes da página Drinks', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/drinks');
    });
    const iconSearch = screen.getByTestId('search-top-btn');
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'lemon');

    const ingredients = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredients);

    const btnBusca = screen.getByTestId('exec-search-btn');
    userEvent.click(btnBusca);

    const text = await screen.findByText('A True Amaretto Sour');
    expect(text).toBeInTheDocument();

    const name = screen.getByTestId('name-search-radio');
    userEvent.click(name);
    userEvent.type(inputSearch, 'figgy Thyme');
    userEvent.click(btnBusca);

    expect(history.location.pathname).toBe('/drinks');

    const first = screen.getByTestId('first-letter-search-radio');
    expect(first).toBeInTheDocument();

    jest.spyOn(global, 'alert').mockImplementation(() => {});
    userEvent.type(inputSearch, 'ee');
    userEvent.click(first);
    userEvent.click(btnBusca);

    expect(first.checked).toEqual(true);
    expect(global.alert).toHaveBeenCalled();
    // userEvent.click(first);
    // userEvent.type(inputSearch, 'e');
    // userEvent.click(btnBusca);

    // const textFirst = await screen.findByText('Ethon Mess');
    // expect(textFirst).toBeInTheDocument();
  });

  test('Verificar se possui a página Drinks tem 5 botões de categorias', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/drinks');
    });

    const button1 = await screen.findByRole('button', { name: 'Ordinary Drink' });
    expect(button1).toBeInTheDocument();
    userEvent.click(button1);
    expect(await screen.findByText(/3-Mile Long Island Iced Tea/i)).toBeInTheDocument();

    const button2 = await screen.findByRole('button', { name: /Cocktail/i });
    expect(button2).toBeInTheDocument();
    userEvent.click(button2);
    expect(await screen.findByText(/GG/i)).toBeInTheDocument();

    const button3 = await screen.findByRole('button', { name: /Shake/i });
    expect(button3).toBeInTheDocument();
    userEvent.click(button3);
    expect(await screen.findByText(/151 Florida Bushwacker/i)).toBeInTheDocument();

    const button4 = await screen.findByRole('button', { name: 'Other/Unknown' });
    expect(button4).toBeInTheDocument();
    userEvent.click(button4);
    expect(await screen.findByText(/GG/i)).toBeInTheDocument();

    const button5 = await screen.findByRole('button', { name: /Cocoa/i });
    expect(button5).toBeInTheDocument();
    userEvent.click(button5);
    expect(await screen.findByText(/Castillian Hot Chocolate/i)).toBeInTheDocument();

    const buttonAll = await screen.findByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(await screen.findByText(/GG/i)).toBeInTheDocument();
  });
});
