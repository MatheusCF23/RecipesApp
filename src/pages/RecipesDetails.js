import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Details from '../components/Details';
import { AppContext } from '../context/AppContext';
import maxNumberOfRecommendation from '../helpers/maxNumberOfRecommendation';

// recomendation é onde o fetch tá localizado viu!

export default function RecipesDetails() {
  const history = useHistory();
  const { API, setAPI } = useContext(AppContext);
  const [recomendation, setRecomendation] = useState([]);
  const id = history.location.pathname.split('/')[2];

  console.log(recomendation);

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

    async function fetchRecommendation() {
      let response = {};
      let data = [];
      switch (history.location.pathname) {
      case `/meals/${id}`:
        response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        data = await response.json();

        return setRecomendation(data.drinks.slice(0, maxNumberOfRecommendation));
      case `/drinks/${id}`:
        response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        data = await response.json();

        return setRecomendation(data.meals.slice(0, maxNumberOfRecommendation));

      default:
        break;
      }
    }
    fetchDetails();
    fetchRecommendation();
  }, [history.location.pathname, setAPI, id, setRecomendation]);

  function CardRecom () {
    if(history.location.pathname.includes('/meals')) {
      return(
        <div className='recommendation'>
        {recomendation && recomendation.map((i, index) => (
          <div key={ i.idDrink } data-testid={ `${index}-recommendation-card` }>
            <img
              src={ i.strDrinkThumb }
              alt={ i.strDrink }
              style = {{ maxWidth: '180px' }}
            />
            <p data-testid={ `${index}-recommendation-title` }>{ i.strDrink }</p>
        </div>
        ))}
      </div>
      )
    }
    if(history.location.pathname.includes('/drinks')) {
      return(
        <div className='recommendation'>
        {recomendation && recomendation.map((i, index) => (
          <div key={ i.idMeal } data-testid={ `${index}-recommendation-card` }>
            <img
              src={ i.strMealThumb }
              alt={ i.strMeal }
              style = {{ maxWidth: '180px' }}
            />
            <p data-testid={ `${index}-recommendation-title` }>{ i.strMeal }</p>
        </div>
        ))}
      </div>
      )
    }
  }

  return (
      <>
        <h1> Recipes Details </h1>
        {API.map((recipe, index) => (<Details key={ index } recipe={ recipe } />))}
        <h3> Recomendações </h3>
        <div>
        { CardRecom() }
        </div>
        <button
          className="startbtn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
        >
        Start Recipe
      </button>
      </> 
  );
}
