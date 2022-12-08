import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import recipeListCheckbox from '../helpers/recipeListCheckbox';

export default function MealsInProgress(object) {
  const [meal, setMeal] = useState({});
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const id = locationSplit[2];
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
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}
