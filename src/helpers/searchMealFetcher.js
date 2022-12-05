export default async function searchMealFetcher(search, typeOfSearch) {
  let response = {};
  let data = [];
  switch (typeOfSearch) {
  case 'recipeIngredient':
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
    data = await response.json();
    return data.meals;
  case 'recipeName':
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    data = await response.json();
    return data.meals;
  case 'recipeFirstLetter':
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    data = await response.json();
    return data.meals;
  default:
    break;
  }
}
