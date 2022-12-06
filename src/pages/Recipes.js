import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CardTests from '../components/CardTests';
import FilterCategoryButtons from '../components/FilterCategoryButtons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import maxNumberOf from '../helpers/maxNumberOf';

export default function Recipes() {
  const { API, setAPI } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    async function fetcherForPage() {
      let data = [];
      let response = [];

      switch (history.location.pathname) {
      case '/meals':
        response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        data = await response.json();

        return setAPI(data.meals);

      default:
        response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        data = await response.json();

        return setAPI(data.drinks);
      }
    }
    fetcherForPage();
  }, [history.location.pathname, setAPI]);

  return (
    <>
      <Header />
      <FilterCategoryButtons />
      {API
        .slice(0, maxNumberOf)
        .map((recipe, index) => (
          <CardTests key={ index } recipe={ recipe } index={ index } />
        ))}
      <Footer />
    </>
  );
}
