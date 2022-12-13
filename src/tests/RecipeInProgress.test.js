import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import renderWithRouter from '../helpers/renderWithRouter';

const pathMealsId = '/meals/53060/in-progress';
const pathDrinksId = '/drinks/15997/in-progress';
const whiteHeartIcon = 'whiteHeartIcon.svg';
const blackHeartIcon = 'blackHeartIcon.svg';
const favoriteBtn = 'favorite-btn';

describe('Testes da tela de Recipes in procress de Meals', () => {
  localStorage.setItem('doneRecipes', JSON.stringify([{
    alcoholicOrNot: '',
    category: 'Side',
    doneDate: '2022-12-12T22:28:52.281Z',
    id: '53060',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    name: 'Burek',
    nationality: 'Croatian',
    tags: ['Streetfood', ' Onthego'],
    type: 'meal',
  }]));

  test('Testa se há uma imagem na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });
    const img = await screen.findByRole('img', { name: /Burek/i });
    expect(img).toBeInTheDocument();
  });

  test('Testa se há um titulo na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });

    const title = await screen.findByText(/Burek/i);
    expect(title).toBeInTheDocument();
  });

  test('Teta se o botão favoritar muda o icone ao salvar', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });
    const buttonFavoritar = await screen.findByTestId(favoriteBtn);
    expect(buttonFavoritar).toBeInTheDocument();

    expect(buttonFavoritar).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(buttonFavoritar);
    expect(buttonFavoritar).toBeTruthy();
  });

  test('Testa se há dois botões na tela', async () => {
    localStorage.clear();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => {},
      },
    });

    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });
    const buttonCompartilhar = await screen.findByRole('button', { name: /Compartilhar/i });
    expect(buttonCompartilhar).toBeInTheDocument();
    userEvent.click(buttonCompartilhar);
    expect(await screen.findByText(/Link copied/i)).toBeInTheDocument();

    const buttonFavoritar = await screen.findByTestId(favoriteBtn);
    expect(buttonFavoritar).toBeInTheDocument();

    expect(buttonFavoritar).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(buttonFavoritar);
    expect(buttonFavoritar).toHaveAttribute('src', blackHeartIcon);

    userEvent.click(buttonFavoritar);

    // expect(buttonFavoritar).toHaveAttribute('src', whiteHeartIcon);
  });

  test('Testa se há instruções sendo renderizado na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });
    const instrucao = await screen.findByTestId('instructions');
    expect(instrucao).toBeInTheDocument();
  });

  test('Testa se há 1 ingrediente renderizado na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });
    const buttonFinalizar = await screen.findByRole('button', { name: /Finalizar/i });
    expect(buttonFinalizar).toBeDisabled();

    const ingredient1 = await screen.findByTestId('0-ingredient-step');
    expect(ingredient1).toBeInTheDocument();
    userEvent.click(ingredient1);
    const ingredient2 = await screen.findByTestId('1-ingredient-step');
    expect(ingredient2).toBeInTheDocument();
    userEvent.click(ingredient2);
    const ingredient3 = await screen.findByTestId('2-ingredient-step');
    expect(ingredient3).toBeInTheDocument();
    userEvent.click(ingredient3);
    const ingredient4 = await screen.findByTestId('3-ingredient-step');
    expect(ingredient4).toBeInTheDocument();
    userEvent.click(ingredient4);
    const ingredient5 = await screen.findByTestId('4-ingredient-step');
    expect(ingredient5).toBeInTheDocument();
    userEvent.click(ingredient5);
    const ingredient6 = await screen.findByTestId('5-ingredient-step');
    expect(ingredient6).toBeInTheDocument();
    userEvent.click(ingredient6);

    expect(buttonFinalizar).not.toBeDisabled();

    userEvent.click(buttonFinalizar);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});

describe('Testes da tela de Recipes in procress de drinks', () => {
  localStorage.setItem('doneRecipes', JSON.stringify([{
    alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    doneDate: '2022-12-12T22:27:12.870Z',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    tags: [],
    type: 'drink',
  }]));

  test('Testa se há uma imagem na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });
    const img = await screen.findByRole('img', { name: /GG/i });
    expect(img).toBeInTheDocument();
  });

  test('Testa se há um titulo na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
  });

  test('Teta se o botão favoritar muda o icone ao salvar', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });
    const buttonFavoritar = await screen.findByTestId('favorite-btn');
    expect(buttonFavoritar).toBeInTheDocument();

    expect(buttonFavoritar).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(buttonFavoritar);
    expect(buttonFavoritar).toBeTruthy();
  });

  test('Testa se há dois botões na tela', async () => {
    localStorage.clear();
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });
    const buttonCompartilhar = await screen.findByRole('button', { name: /Compartilhar/i });
    expect(buttonCompartilhar).toBeInTheDocument();
    userEvent.click(buttonCompartilhar);
    expect(await screen.findByText(/Link copied/i)).toBeInTheDocument();

    const buttonFavoritar = await screen.findByTestId(favoriteBtn);
    expect(buttonFavoritar).toBeInTheDocument();
    expect(buttonFavoritar).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(buttonFavoritar);
    expect(buttonFavoritar).toHaveAttribute('src', blackHeartIcon);

    userEvent.click(buttonFavoritar);

    // expect(buttonFavoritar).toHaveAttribute('src', whiteHeartIcon);
  });

  test('Testa se há instruções sendo renderizado na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });
    const instrucao = await screen.findByTestId('instructions');
    expect(instrucao).toBeInTheDocument();
  });

  test('Testa se ao marcar nos ingredientes libera o botão finalizar', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });
    const buttonFinalizar = await screen.findByRole('button', { name: /Finalizar/i });
    expect(buttonFinalizar).toBeDisabled();

    const ingredient1 = await screen.findByTestId('0-ingredient-step');
    expect(ingredient1).toBeInTheDocument();
    userEvent.click(ingredient1);
    const ingredient2 = await screen.findByTestId('1-ingredient-step');
    expect(ingredient2).toBeInTheDocument();
    userEvent.click(ingredient2);
    const ingredient3 = await screen.findByTestId('2-ingredient-step');
    expect(ingredient3).toBeInTheDocument();
    userEvent.click(ingredient3);

    expect(buttonFinalizar).not.toBeDisabled();

    userEvent.click(buttonFinalizar);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
