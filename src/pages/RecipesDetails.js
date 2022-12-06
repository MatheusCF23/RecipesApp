import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Details from '../components/Details';
import { AppContext } from '../context/AppContext';

export default function RecipesDetails() {
  const history = useHistory();
  const { API, setAPI } = useContext(AppContext);
  const id = history.location.pathname.split('/')[2];

  useEffect(() => {
    async function fetchDetails() {
      let response = {};
      let data = [];
      switch (history.location.pathname) {
      case `/meals/${id}`:
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        data = await response.json();

        return setAPI(data.meals);

      case `/drinks/${id}`:
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        data = await response.json();

        return setAPI(data.drinks);

      default:
        break;
      }
    }
    fetchDetails();
  }, [history.location.pathname, setAPI, id]);

  return (
    <>
      <h1> Recipes Details </h1>
      {API.map((recipe, index) => (<Details key={ index } recipe={ recipe } />))}
    </>
  );
}
