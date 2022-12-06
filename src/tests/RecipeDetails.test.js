import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import renderWithRouter from '../helpers/renderWithRouter';

const pathMealsId = '/meals/52977';
const pathDrinksId = 'drinks/15997';

describe('Testes da tela de Recipes Details de Meals', () => {
  test('Testa se há o texto Recipes Details na tela', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });

    const text = screen.getByText(/Recipes Details/i);
    expect(text).toBeInTheDocument();
  });

  test('Testa se há um botão voltar na tela e se redireciona para a tela de Meals', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });
    const button = await screen.findByRole('button', { name: 'Voltar' });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');
  });

  test('Testa se há um icone de copiar e um de favoritar na tela de Meals', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });
    const IconCompartilhar = await screen.findByTestId('share-btn');
    expect(IconCompartilhar).toBeInTheDocument();
    // userEvent.click(IconCompartilhar);
    // expect(await screen.findByText(/Link copied/i)).toBeInTheDocument();

    const iconFavorite = await screen.findByTestId('favorite-btn');
    expect(iconFavorite).toBeInTheDocument();
  });

  test('Testa se há uma imagem na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });
    const img = await screen.findByRole('img', { name: /Corba/i });
    expect(img).toBeInTheDocument();
  });

  test('Testa se há o nome da receita na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });
    const nameRecipe = await screen.findByText(/Corba/i);
    expect(nameRecipe).toBeInTheDocument();
  });

  test('Testa se há 1 ingrediente renderizado na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });
    const ingredient = await screen.findByText(/Lentils - 1 cup/i);
    expect(ingredient).toBeInTheDocument();
  });

  // test('Testa se há um vídeo renderizado na tela', async () => {
  //   const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
  //   act(() => {
  //     history.push(pathMealsId);
  //   });
  //   const video = await screen.findByRole('iframe', { name: 'https://www.youtube.com/watch?v=VVnZd8A84z4' });
  //   expect(video).toBeInTheDocument();
  // });

  test('Testa se há instruções sendo renderizado na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });
    const instrucao = await screen.findByText(/Instruções/i);
    expect(instrucao).toBeInTheDocument();
  });

  test('Testa se há um botão Start Recipe na tela  Meals', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });
    const button = await screen.findByRole('button', { name: 'Start Recipe' });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });

  test('Testa se há o texto Recomendações esta na tela', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathMealsId);
    });

    const text = screen.getByText(/Recomendações/i);
    expect(text).toBeInTheDocument();
  });
});

describe('Testes da tela de Recipes Details de Drinks', () => {
  test('Testa se há o texto Recipes Details na tela', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });

    const text = screen.getByText(/Recipes Details/i);
    expect(text).toBeInTheDocument();
  });

  test('Testa se há um botão voltar na tela e se redireciona para a tela de Meals', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });
    const button = await screen.findByRole('button', { name: 'Voltar' });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/drinks');
  });

  test('Testa se há um icone  de copiar e um de favoritar na tela de Drinks', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });
    const IconCompartilhar = await screen.findByTestId('share-btn');
    expect(IconCompartilhar).toBeInTheDocument();
    // userEvent.click(IconCompartilhar);
    // expect(await screen.findByText(/Link copied/i)).toBeInTheDocument();

    const iconFavorite = await screen.findByTestId('favorite-btn');
    expect(iconFavorite).toBeInTheDocument();
  });

  test('Testa se há uma imagem na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });
    const img = await screen.findByRole('img', { name: /GG/i });
    expect(img).toBeInTheDocument();
  });

  test('Testa se há o nome da receita na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });
    const nameRecipe = await screen.findByTestId('recipe-title');
    expect(nameRecipe).toBeInTheDocument();
  });

  test('Testa se há 1 ingrediente renderizado na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });
    const ingredient = await screen.findByText('Galliano - 2 1/2 shots');
    expect(ingredient).toBeInTheDocument();
  });

  // test('Testa se há um vídeo renderizado na tela', async () => {
  //   const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
  //   act(() => {
  //     history.push(pathMealsId);
  //   });
  //   const video = await screen.findByRole('iframe', { name: 'https://www.youtube.com/watch?v=VVnZd8A84z4' });
  //   expect(video).toBeInTheDocument();
  // });

  test('Testa se há instruções sendo renderizado na tela', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });
    const instrucao = await screen.findByText(/Instruções/i);
    expect(instrucao).toBeInTheDocument();
  });

  test('Testa se há um botão Start Recipe na tela  Meals', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });
    const button = await screen.findByRole('button', { name: 'Start Recipe' });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });

  test('Testa se há o texto Recomendações esta na tela', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => {
      history.push(pathDrinksId);
    });

    const text = screen.getByText(/Recomendações/i);
    expect(text).toBeInTheDocument();
  });
});
