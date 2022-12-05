import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import renderWithRouter from '../helpers/renderWithRouter';
import mockIngredientDrinks from './mockIngredientDrinks';

describe('Testando o fetch', () => {
  // afterEach(() => jest.clearAllMocks());

  test('Verificando se é renderizado na tela 12 drinks', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockIngredientDrinks),
    }));
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push('/drinks');
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );

    // const image = await screen.findAllByRole('img');
    // expect(image).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    const text = await screen.findByText(/GG/i);
    expect(text).toBeInTheDocument();
  });
});
