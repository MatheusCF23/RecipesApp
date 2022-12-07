import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function DrinksInProgress() {
  const [drink, setDrink] = useState({});
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const id = locationSplit[2];

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
        <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
      </div>

    </div>
  );
}
