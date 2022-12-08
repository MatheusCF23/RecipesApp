import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import searchDrinksFetcher from '../helpers/searchDrinksFetcher';
import searchMealFetcher from '../helpers/searchMealFetcher';

function SearchBar() {
  const [checkedRadio, setCheckedRadio] = useState();
  const [query, setQuery] = useState('');
  const history = useHistory();
  const { setAPI } = useContext(AppContext);

  async function handleSearch(search, radioType) {
    let APIresponse = [];

    if (radioType === 'recipeFirstLetter' && search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }

    switch (history.location.pathname) {
    case '/meals':
      APIresponse = await searchMealFetcher(search, radioType);

      if (APIresponse === null || APIresponse === undefined) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (APIresponse.length === 1) {
        return history.push(`/meals/${APIresponse[0].idMeal}`);
      }

      return setAPI(APIresponse);

    default:
      APIresponse = await searchDrinksFetcher(search, radioType);

      if (APIresponse === null || APIresponse === undefined) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (APIresponse.length === 1) {
        return history.push(`/drinks/${APIresponse[0].idDrink}`);
      }

      return setAPI(APIresponse);
    }
  }

  return (
    <form>

      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar"
        value={ query }
        onChange={ ({ target }) => setQuery(target.value) }
      />
      <br />
      <label htmlFor="ingredient-search-radio">
        Ingrediente:
        <input
          type="radio"
          name="search-type"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value="recipeIngredient"
          checked={ checkedRadio === 'recipeIngredient' }
          onChange={ ({ target }) => setCheckedRadio(target.value) }
        />
      </label>

      <br />

      <label htmlFor="name-search-radio">
        Nome da Receita:
        <input
          type="radio"
          name="search-type"
          id="name-search-radio"
          data-testid="name-search-radio"
          value="recipeName"
          checked={ checkedRadio === 'recipeName' }
          onChange={ ({ target }) => setCheckedRadio(target.value) }
        />
      </label>

      <br />

      <label htmlFor="first-letter-search-radio">
        Primeira letra:
        <input
          type="radio"
          name="search-type"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          value="recipeFirstLetter"
          checked={ checkedRadio === 'recipeFirstLetter' }
          onChange={ ({ target }) => setCheckedRadio(target.value) }
        />
      </label>

      <br />

      <button
        type="button"
        id="exec-search-btn"
        data-testid="exec-search-btn"
        onClick={ () => handleSearch(query, checkedRadio) }
      >
        Buscar
      </button>

    </form>
  );
}

export default SearchBar;
