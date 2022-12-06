import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import maxNumberOfButtons from '../helpers/maxNumberOfButtons';

export default function FilterCategoryButtons() {
  const [buttons, setButtons] = useState([]);
  const [toggle, setToggle] = useState(false);
  const history = useHistory();
  const { setAPI } = useContext(AppContext);

  useEffect(() => {
    async function categoryFetcher() {
      let data = [];
      let response = [];

      switch (history.location.pathname) {
      case '/meals':
        response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        data = await response.json();

        return setButtons(data.meals);

      default:
        response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        data = await response.json();

        return setButtons(data.drinks);
      }
    }
    categoryFetcher();
  }, [history.location.pathname]);

  async function filterByCategory(category) {
    let response = {};
    let data = [];
    switch (history.location.pathname) {
    case '/meals':
      if (toggle !== category) {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        data = await response.json();
        setToggle(category);

        return setAPI(data.meals);
      }
      if (toggle === category) {
        response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        data = await response.json();
        setToggle(!toggle);

        return setAPI(data.meals);
      }
      break;

    default:
      if (toggle !== category) {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        data = await response.json();
        setToggle(category);

        return setAPI(data.drinks);
      }
      if (toggle === category) {
        response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        data = await response.json();
        setToggle(!toggle);

        return setAPI(data.drinks);
      }
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
      setToggle(false);

      return setAPI(data.meals);

    default:
      response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      data = await response.json();
      setToggle(false);

      return setAPI(data.drinks);
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
            name={ strCategory }
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
