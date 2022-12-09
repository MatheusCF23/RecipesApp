import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import recipeListCheckbox from '../helpers/recipeListCheckbox';

export default function MealsInProgress(object) {
  const history = useHistory();
  const [meal, setMeal] = useState({});
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const id = locationSplit[2];
  const [disableBTN, setDisableBTN] = useState(true);
  console.log(setDisableBTN);
  console.log(object);

  useEffect(() => {
    const fetchAPI = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const results = await response.json();
      setMeal(results.meals[0]);
    };
    fetchAPI();
  }, [id]);

  const saveDoneRecipeLocalS = (parametro) => {
    localStorage.setItem('doneRecipes', JSON.stringify(parametro));
  };

  const inDate = new Date();

  const saveLocalS = {
    id: meal.idMeal,
    type: 'meal',
    nationality: (meal.strArea ? meal.strArea : ''),
    category: (meal.strCategory !== null ? meal.strCategory : ''),
    alcoholicOrNot: ((meal.strAlcoholic !== null
       && meal.strAlcoholic) ? meal.strAlcoholic : ''),
    name: meal.strMeal,
    image: meal.strMealThumb,
    doneDate: inDate.toISOString(),
    tags: ((meal.strTags !== null && meal.strTags) ? meal.strTags.split(',') : []),
  };

  const handleBtnFinish = () => {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipe) {
      saveDoneRecipeLocalS([saveLocalS]);
    } else {
      saveDoneRecipeLocalS([...doneRecipe, saveLocalS]);
    }
    history.push('/done-recipes');
  };

  return (

    <div>
      <img
        data-testid="recipe-photo"
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
      />
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{meal.strCategory}</p>
      <p data-testid="instructions">{meal.strInstructions}</p>
      {recipeListCheckbox(meal)}
      <button
        type="button"
        className="finish-btn"
        data-testid="finish-recipe-btn"
        disable={ disableBTN }
        onClick={ handleBtnFinish }
      >
        Finish Recipe
      </button>
    </div>
  );
}
