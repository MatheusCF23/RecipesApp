import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import renderWithRouter from '../helpers/renderWithRouter';

const favorite = '/favorite-recipes';
const pathMealsId = '/meals/52977';

describe('Testes da tela de Receitas favoritas', () => {
  test('Testa se há um texto na tela', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      alcoholicOrNot: '',
      category: 'Side',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      type: 'meal',
    }]));

    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(favorite);
    });
    const text = screen.getByText(/Favorite Recipes/i);
    expect(text).toBeInTheDocument();
  });

  test('Testa se há três botões na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(favorite);
    });
    const buttonMeals = await screen.findByRole('button', { name: /Meals/i });
    expect(buttonMeals).toBeInTheDocument();

    const buttonDrinks = await screen.findByRole('button', { name: /Drinks/i });
    expect(buttonDrinks).toBeInTheDocument();

    const buttonAll = await screen.findByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
  });

  test('Testa quando clica no botão Meals renderiza as receitas favoritadas', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(favorite);
    });
    const buttonMeals = await screen.findByRole('button', { name: /Meals/i });
    userEvent.click(buttonMeals);

    const img = await screen.findByRole('img', { name: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' });
    expect(img).toBeInTheDocument();
    userEvent.click(img);
    expect(history.location.pathname).toBe(pathMealsId);

    const title = await screen.findByText(/Corba/i);
    expect(title).toBeInTheDocument();
    userEvent.click(title);
    expect(history.location.pathname).toBe(pathMealsId);

    const typeRecipes = await screen.findByText(/Turkish-Side/i);
    expect(typeRecipes).toBeInTheDocument();
    userEvent.click(typeRecipes);
    expect(history.location.pathname).toBe(pathMealsId);

    const IconCompartilhar = await screen.findByTestId('share-btn');
    expect(IconCompartilhar).toBeInTheDocument();

    const iconFavorite = await screen.findByTestId('favorite-btn');
    expect(iconFavorite).toBeInTheDocument();
    userEvent.click(iconFavorite);
    expect(iconFavorite).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
});
