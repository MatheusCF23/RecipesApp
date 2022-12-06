import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import recipeListItems from '../helpers/recipeListItems';
import youtubeManager from '../helpers/youtubeManager';

export default function Details(props) {
  const history = useHistory();
  const { recipe } = props;

  if (history.location.pathname.includes('/drinks')) {
    return (
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
    );
  }

  if (history.location.pathname.includes('/meals')) {
    const video = youtubeManager(recipe.strYoutube);
    return (
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
    );
  }
}

Details.propTypes = {
  recipe: PropTypes.shape({
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
