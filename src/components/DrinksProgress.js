import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import recipeListCheckbox from '../helpers/recipeListCheckbox';

export default function DrinksInProgress(object) {
  const history = useHistory();
  const [drink, setDrink] = useState({});
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const id = locationSplit[2];
  const [disableBTN, setDisableBTN] = useState(false);
  console.log(setDisableBTN);
  console.log(object);

  useEffect(() => {
    const fetchAPI = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const results = await response.json();
      console.log(results);
      setDrink(results.drinks[0]);
    };
    fetchAPI();
  }, [id]);

  const saveDoneRecipeLocalS = (parametro) => {
    localStorage.setItem('doneRecipes', JSON.stringify(parametro));
  };

  const inDate = new Date();

  const saveLocalStorage = {
    id: drink.idDrink,
    type: 'drink',
    nationality: (drink.strArea ? drink.strArea : ''),
    category: (drink.strCategory !== null ? drink.strCategory : ''),
    alcoholicOrNot: (drink.strAlcoholic !== null ? drink.strAlcoholic : ''),
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    doneDate: inDate.toISOString(),
    tags: ((drink.strTags !== null && drink.strTags) ? drink.strTags.split(',') : []),

  };

  const handleBtnFinish = () => {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipe) {
      saveDoneRecipeLocalS([saveLocalStorage]);
    } else {
      saveDoneRecipeLocalS([...doneRecipe, saveLocalStorage]);
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
        <h2 data-testid="recipe-title">{drink.strDrink}</h2>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <p data-testid="recipe-category">{drink.strCategory}</p>
        <p data-testid="instructions">{drink.strInstructions}</p>
        {recipeListCheckbox(drink)}
        <button
          type="button"
          className="finish-btn"
          data-testid="finish-recipe-btn"
          disabled={ disableBTN }
          onClick={ handleBtnFinish }
        >
          Finish Recipe

        </button>
      </div>

    </div>
  );
}
