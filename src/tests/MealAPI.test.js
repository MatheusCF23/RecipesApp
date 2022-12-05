import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import renderWithRouter from '../helpers/renderWithRouter';
import mockNameMeals from './mockNameMeals';

describe('Testando o fetch', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockNameMeals),
    }));
  });

  afterEach(() => jest.clearAllMocks());

  test('Verificando se é renderizado na tela 1 receita', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/meals');
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );

    const text = await screen.findByText(/Corba/i);
    expect(text).toBeInTheDocument();
  });

  // test('Verificando se é renderizado na tela 1 receita, após pesquisar pela primeira letra', async () => {
  //   const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
  //   act(() => {
  //     history.push('/meals');
  //   });

  //   const iconSearch = screen.getByTestId('search-top-btn');
  //   expect(iconSearch).toBeInTheDocument();
  //   userEvent.click(iconSearch);

  //   const inputSearch = screen.getByTestId('search-input');
  //   userEvent.type(inputSearch, 'a');

  //   const first = screen.getByTestId('first-letter-search-radio');
  //   expect(first).toBeInTheDocument();
  //   userEvent.click(first);

  //   const btnBusca = screen.getByTestId('exec-search-btn');
  //   userEvent.click(btnBusca);

  //   expect(global.fetch).toHaveBeenCalled();
  //   expect(global.fetch).toHaveBeenCalledWith(
  //     'https://www.themealdb.com/api/json/v1/1/search.php?f=a',
  //   );

  //   const firstLetter = await screen.findByText(/Apple Frangipan Tart/i);
  //   expect(firstLetter).toBeInTheDocument();
  // });
});
