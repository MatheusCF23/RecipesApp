import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  const { setAPI } = useContext(AppContext);

  function redirectTo(where) {
    switch (where) {
    case '/meals':
      return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((r) => r.json())
        .then((d) => d.meals)
        .then((f) => setAPI(f))
        .then(() => history.push('/meals'));

    case '/drinks':
      return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((r) => r.json())
        .then((d) => d.drinks)
        .then((f) => setAPI(f))
        .then(() => history.push('/drinks'));

    default:
      break;
    }
  }
  return (
    <div
      data-testid="footer"
      className="footer"
    >

      <input
        type="image"
        src={ drinkIcon }
        alt="drink-img"
        data-testid="drinks-bottom-btn"
        onClick={ () => redirectTo('/drinks') }
      />

      <input
        type="image"
        src={ mealIcon }
        alt="meal-img"
        data-testid="meals-bottom-btn"
        onClick={ () => redirectTo('/meals') }
      />

    </div>
  );
}
