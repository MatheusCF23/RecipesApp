export default async function searchDrinksFetcher(search, typeOfSearch) {
  let response = {};
  let data = [];
  switch (typeOfSearch) {
  case 'recipeIngredient':
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
    data = await response.json();
    return data.drinks;
  case 'recipeName':
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
    data = await response.json();
    return data.drinks;
  case 'recipeFirstLetter':
    if (search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
    data = await response.json();
    return data.drinks;
  default:
    break;
  }
}
