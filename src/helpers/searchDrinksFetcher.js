import apiResultManager from './apiResultManager';

export default function searchDrinksFetcher(search, typeOfSearch) {
  switch (typeOfSearch) {
  case 'recipeIngredient':
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`)
      .then((r) => r.json())
      .then((d) => apiResultManager(d.drinks));

  case 'recipeName':
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then((r) => r.json())
      .then((d) => apiResultManager(d.drinks));

  case 'recipeFirstLetter':
    if (search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`)
      .then((r) => r.json())
      .then((d) => apiResultManager(d.drinks));

  default:
    break;
  }
}
