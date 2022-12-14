import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

export default function CardTests(props) {
  const history = useHistory();
  const { recipe, index } = props;

  if (history.location.pathname === '/meals') {
    return (
      <Link to={ `${history.location.pathname}/${recipe.idMeal}` }>

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
            style={ { height: '200px', width: '200px', borderRadius: '5px' } }
          />
        </div>
      </Link>
    );
  }

  if (history.location.pathname === '/drinks') {
    return (
      <Link to={ `${history.location.pathname}/${recipe.idDrink}` }>

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
            style={ { height: '200px', width: '200px', borderRadius: '5px' } }
          />
        </div>
      </Link>
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
