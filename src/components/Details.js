import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recipeListItems from '../helpers/recipeListItems';
import youtubeManager from '../helpers/youtubeManager';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

export default function Details(props) {
  const history = useHistory();
  const [copied, setCopied] = useState(false);
  const { recipe } = props;
  console.log(window.location.href);
  console.log(recipe)

  function copyToClipboard() {
    copy(window.location.href);
    return setCopied(true);
  }

  //funções para favoritar drinks e meals
 function handleFavMeals(event) {
  const objMeals = [{
    id: recipe.idMeal,
    type: 'meal',
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  }]
    const favoritado = JSON.stringify( objMeals );
    event.preventDefault();

    localStorage.setItem('favoriteRecipes', favoritado);
  }

 

  function handleFavDrink(event) {
    const objDrink = [{
      id: recipe.idDrink, 
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    }]
      const favoritado = JSON.stringify( objDrink );
      event.preventDefault();
  
      localStorage.setItem('favoriteRecipes', favoritado);
    }
  
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
          src={ whiteHeartIcon }
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
          src={ whiteHeartIcon }
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
  }).isRequired,
};
