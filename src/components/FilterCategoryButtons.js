import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import maxNumberOfButtons from '../helpers/maxNumberOfButtons';

export default function FilterCategoryButtons() {
  const [buttons, setButtons] = useState([]);
  const [toggle, setToggle] = useState(false);
  const history = useHistory();
  const { setAPI } = useContext(AppContext);

  console.log(buttons);

  useEffect(() => {
    async function categoryFetcher() {
      let data = [];
      let response = [];

      switch (history.location.pathname) {
      case '/meals':
        response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        data = await response.json();

        return setButtons(data.meals);

      case '/drinks':
        response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        data = await response.json();

        return setButtons(data.drinks);

      default:
        break;
      }
    }
    categoryFetcher();
  }, [history.location.pathname]);

  async function filterByCategory(category) {
    let response = {};
    let data = [];
    switch (history.location.pathname) {
    case '/meals':
      if (toggle === false) {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        data = await response.json();
        setToggle(!toggle);

        return setAPI(data.meals);
      }
      response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      data = await response.json();

      return setAPI(data.meals);
    case '/drinks':
      if (toggle === false) {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        data = await response.json();
        setToggle(!toggle);

        return setAPI(data.drinks);
      }
      response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      data = await response.json();

      return setAPI(data.drinks);

    default:
      break;
    }
  }

  async function resetCategory() {
    let response = {};
    let data = [];

    switch (history.location.pathname) {
    case '/meals':
      response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      data = await response.json();

      return setAPI(data.meals);

    case '/drinks':
      response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      data = await response.json();

      return setAPI(data.drinks);

    default:
      break;
    }
  }

  return (
    <div>
      {buttons
        .slice(0, maxNumberOfButtons)
        .map(({ strCategory }) => (
          <button
            key={ `${strCategory}-button` }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => filterByCategory(strCategory) }
          >
            {strCategory}
          </button>
        ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => resetCategory() }
      >
        All
      </button>

    </div>
  );
}
