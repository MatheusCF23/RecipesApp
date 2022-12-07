import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recipeListCheckbox from '../helpers/recipeListCheckbox';
import recipeListItems from '../helpers/recipeListItems';
import youtubeManager from '../helpers/youtubeManager';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

export default function Details(props) {
  const history = useHistory();
  const [copied, setCopied] = useState(false);
  const { recipe } = props;
  const [favorited, setFavorited] = useState(false);
  console.log(recipeListCheckbox(recipe))

  function copyToClipboard() {
    copy(window.location.href);
    return setCopied(true);
  }

  // funções para favoritar drinks e meals
  function handleFavMeals(event) {
    const prevLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (prevLocalStorage.find(({ id, type }) => (
      id === recipe.idMeal && type === 'meal'))) {
      const filterLocalStorage = prevLocalStorage
        .filter(({ id }) => id !== recipe.idMeal);
      setFavorited(false);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(filterLocalStorage));
    }

    const objMeals = {
      id: recipe.idMeal,
      type: 'meal',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };

    const favoritado = JSON.stringify([...prevLocalStorage, objMeals]);
    event.preventDefault();

    localStorage.setItem('favoriteRecipes', favoritado);
    return setFavorited(true);
  }

  function handleFavDrink(event) {
    const prevLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (prevLocalStorage.find(({ id, type }) => (
      id === recipe.idDrink && type === 'drink'))) {
      const filterLocalStorage = prevLocalStorage
        .filter(({ id }) => id !== recipe.idDrink);
      setFavorited(false);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(filterLocalStorage));
    }

    const objDrink = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };

    const favoritado = JSON.stringify([...prevLocalStorage, objDrink]);
    event.preventDefault();

    localStorage.setItem('favoriteRecipes', favoritado);
    return setFavorited(true);
  }

  useEffect(() => {
    function favoriteIcon() {
      const prevLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      switch (history.location.pathname) {
      case `/drinks/${recipe.idDrink}`:
        return prevLocalStorage.some(({ id, type }) => (
          id === recipe.idDrink && type === 'drink'))
          ? setFavorited(true)
          : setFavorited(false);

      default:
        return prevLocalStorage.some(({ id, type }) => (
          id === recipe.idMeal && type === 'meal'))
          ? setFavorited(true)
          : setFavorited(false);
      }
    }
    favoriteIcon();
  }, [history.location.pathname, recipe.idDrink, recipe.idMeal]);

  if (history.location.pathname.includes(`/drinks/${recipe.idDrink}`)) {
    return (
      <>
        <button
          type="button"
          onClick={ () => history.push('/drinks') }
        >
          Voltar

        </button>

        {copied && (<p> Link copied! </p>)}

        <input
          type="image"
          src={ shareIcon }
          alt="Compartilhar"
          data-testid="share-btn"
          onClick={ () => copyToClipboard() }
        />

        <input
          type="image"
          src={ favorited ? blackHeartIcon : whiteHeartIcon }
          alt="favoritar"
          data-testid="favorite-btn"
          onClick={ (event) => handleFavDrink(event) }
        />

        <div>

          <img
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            data-testid="recipe-photo"
          />
          <h2
            data-testid="recipe-title"
          >
            {recipe.strDrink}
          </h2>
          <h3
            data-testid="recipe-category"
          >
            {recipe.strAlcoholic}
          </h3>

          <ul>
            {recipeListItems(recipe)}
          </ul>

          <div>
            <h4> Instruções </h4>
            <span
              data-testid="instructions"
            >
              {recipe.strInstructions}
            </span>
          </div>
          {recipeListCheckbox(recipe)}
        </div>
      </>
    );
  }

  if (history.location.pathname.includes(`/meals/${recipe.idMeal}`)) {
    const video = youtubeManager(recipe.strYoutube);
    return (
      <>
        <button
          type="button"
          onClick={ () => history.push('/meals') }
        >
          Voltar

        </button>

        {copied && (<small> Link copied! </small>)}
        <input
          type="image"
          src={ shareIcon }
          alt="Compartilhar"
          data-testid="share-btn"
          onClick={ () => copyToClipboard() }
        />

        <input
          type="image"
          src={ favorited ? blackHeartIcon : whiteHeartIcon }
          alt="favoritar"
          data-testid="favorite-btn"
          onClick={ (event) => handleFavMeals(event) }
        />

        <div>
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            data-testid="recipe-photo"
          />
          <h2
            data-testid="recipe-title"
          >
            {recipe.strMeal}
          </h2>
          <h3
            data-testid="recipe-category"
          >
            {recipe.strCategory}
          </h3>

          <ul>
            {recipeListItems(recipe)}
          </ul>

          <div>
            <iframe
              title="Instructions video"
              src={ video }
              data-testid="video"
            />
            <h4> Instruções </h4>
            <span
              data-testid="instructions"
            >
              {recipe.strInstructions}
            </span>
          </div>

        </div>
      </>
    );
  }
}

Details.propTypes = {
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strYoutube: PropTypes.string,
    strArea: PropTypes.string,
  }).isRequired,
};
