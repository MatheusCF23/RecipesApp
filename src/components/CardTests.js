import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function CardTests(props) {
  const history = useHistory();
  const { recipe, index } = props;

  if (history.location.pathname === '/meals') {
    return (
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <h3
          data-testid={ `${index}-card-name` }
        >
          {recipe.strMeal}
        </h3>
        <img
          src={ `${recipe.strMealThumb}/preview` }
          alt={ recipe.idMeal }
          data-testid={ `${index}-card-img` }
        />
      </div>
    );
  }

  if (history.location.pathname === '/drinks') {
    return (
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <h3
          data-testid={ `${index}-card-name` }
        >
          {recipe.strDrink}
        </h3>
        <img
          src={ `${recipe.strDrinkThumb}/preview` }
          alt={ recipe.idDrink }
          data-testid={ `${index}-card-img` }
        />
      </div>
    );
  }
}

CardTests.propTypes = {
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
