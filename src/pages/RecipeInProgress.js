import { useLocation } from 'react-router-dom';
import DrinksProgress from '../components/DrinksProgress';
import MealsProgress from '../components/MealsProgress';

export default function RecipeInProgress() {
  const location = useLocation();
  const locationType = location.pathname.split('/')[1];

  return (
    <div>
      {locationType === 'meals'
      && (
        <div>
          <MealsProgress />
        </div>
      )}
      {locationType === 'drinks'
      && (

        <div>
          <DrinksProgress />
        </div>
      )}
      ola

    </div>
  );
}
