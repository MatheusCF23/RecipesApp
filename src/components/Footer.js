import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();

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
        onClick={ () => history.push('/drinks') }
      />

      <input
        type="image"
        src={ mealIcon }
        alt="meal-img"
        data-testid="meals-bottom-btn"
        onClick={ () => history.push('/meals') }
      />

    </div>
  );
}
