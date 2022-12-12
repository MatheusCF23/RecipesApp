import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../App.css';
import recipesLocalS from '../components/recipesLocalS';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function MealsProgress() {
  const params = useParams();
  const { id } = params;
  const history = useHistory();
  const { location: { pathname } } = history;

  const [fetchALL, setFetchALL] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(null);
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    if (!localStorage.inProgressRecipes) {
      const isMeal = pathname.includes('meals') ? 'meals' : 'drinks';
      localStorage.setItem('inProgressRecipes', JSON.stringify({ [isMeal]: {} }));
    }
    if (localStorage.inProgressRecipes.includes(id)) {
      const checkMeal = pathname.includes('meals') ? 'meals' : 'drinks';
      const upChecked = JSON.parse(localStorage.inProgressRecipes)[checkMeal][id];
      setIsChecked([...upChecked]);
    }
  }, [id, pathname]);

  useEffect(() => {
    const mealsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const drinksUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const isMeal = pathname.includes('meals') ? mealsUrl : drinksUrl;
    const fetchDish = async () => {
      const request = await fetch(isMeal);
      const response = await request.json();
      const recipes = response.meals || response.drinks;
      setFetchALL(recipes || []);
      const selectIngredients = Object.entries(recipes[0])
        .filter(([key, value]) => key.includes('Ingredient') && value);
      setIngredients(selectIngredients);
      const isMeal2 = pathname.includes('meals') ? 'meals' : 'drinks';
      const upChecked = JSON.parse(localStorage.inProgressRecipes)[isMeal2][id];
      if (!upChecked) {
        setIsChecked(new Array(selectIngredients.length)
          .fill(false));
      }
    };
    const save = localStorage.favoriteRecipes
      ? JSON.parse(localStorage.favoriteRecipes) : [];
    if (save.find((el) => el.id === id)) {
      setIsFavorite(true);
    }
    fetchDish();
  }, [id, pathname]);

  const handleRecipies = () => {
    const isMeal = pathname.includes('meals') ? 'meals' : 'drinks';
    if (isChecked) {
      if (!isChecked.includes(false)) {
        setIsDisabled(false);
      }
      if (isChecked.includes(false)) {
        setIsDisabled(true);
      }
    }
    if (localStorage.inProgressRecipes) {
      const parseRecipes = JSON.parse(localStorage.inProgressRecipes);
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ ...parseRecipes,
          [isMeal]: { ...parseRecipes[isMeal], [id]: isChecked } }),
      );
    }
  };

  useEffect(() => {
    handleRecipies();
  });

  const handleChange = (position) => {
    const updatedCheckedState = isChecked
      .map((item, index) => (index === position ? !item : item));
    setIsChecked(updatedCheckedState);
  };

  const saveFav = (elemento) => {
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const ID = elemento.idMeal || elemento.idDrink;
    const type = elemento.idMeal ? 'meal' : 'drink';
    const nationality = elemento.strArea || '';
    const category = elemento.strCategory || '';
    const alcoholicOrNot = elemento.strAlcoholic || '';
    const name = elemento.strDrink || elemento.strMeal;
    const image = elemento.strDrinkThumb || elemento.strMealThumb;
    const save = JSON.parse(localStorage.favoriteRecipes);
    const newData = { id: ID,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image };
    const up = [...save, newData];
    if (!save.find((el) => el.ID === newData.ID)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(up));
    }
  };

  const removeFavorite = () => {
    const save = JSON.parse(localStorage.favoriteRecipes) || '';
    const removeItem = save.filter((el) => el.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeItem));
  };

  return (
    <div>
      { fetchALL.map((e) => (
        <div key={ e.idMeal || e.idDrink }>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ () => {
              if (navigator.clipboard) {
                const recipeURL = window.location.href;
                navigator.clipboard.writeText(recipeURL.replace('/in-progress', ''));
              }
              setIsCopy(true);
            } }
          >
            Compartilhar
          </button>
          {isCopy && <p>Link copied!</p>}
          <button
            type="button"
            onClick={ (() => {
              if (!isFavorite) { saveFav(elemento); }
              if (isFavorite) { removeFavorite(); }
              setIsFavorite(!isFavorite);
            }
            ) }
          >
            <img
              data-testid="favorite-btn"
              src={ !isFavorite
                ? whiteHeartIcon
                : blackHeartIcon }
              alt="favorites"
            />
          </button>
          <img
            data-testid="recipe-photo"
            src={ e.strMealThumb || e.strDrinkThumb }
            alt={ e.strMeal || e.strDrink }
          />
          <h2 data-testid="recipe-title">{e.strMeal || e.strDrink}</h2>
          <h3 data-testid="recipe-category">{e.strCategory}</h3>
          { ingredients.map((elem, index) => (
            <li key={ index }>
              <label
                htmlFor={ `${index}-ingredient-step` }
                data-testid={ `${index}-ingredient-step` }
                style={ { textDecoration: isChecked[index]
                    && 'line-through solid rgb(0, 0, 0)' } }
              >
                <input
                  type="checkbox"
                  id={ `${index}-ingredient-step` }
                  checked={ isChecked[index] }
                  onChange={ () => handleChange(index) }
                />
                {elem[1]}
              </label>
            </li>
          ))}
          <p data-testid="instructions">{ e.strInstructions }</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ isDisabled }
            onClick={ () => {
              recipesLocalS(e);
              history.push('/done-recipes');
            } }
          >
            Finalizar
          </button>
        </div>
      ))}
    </div>
  );
}
