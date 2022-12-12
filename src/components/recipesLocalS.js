export default function recipesLocalS(e) {
  if (!localStorage.doneRecipes) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
  const ID = e.idMeal || e.idDrink;
  const type = e.idMeal ? 'meal' : 'drink';
  const nationality = e.strArea || '';
  const category = e.strCategory || '';
  const alcoholicOrNot = e.strAlcoholic || '';
  const name = e.strDrink || e.strMeal;
  const image = e.strDrinkThumb || e.strMealThumb;
  const tags = !e.strTags ? [] : e.strTags.split(',');
  const doneDate = new Date();
  const saved = JSON.parse(localStorage.doneRecipes);
  const newData = { id: ID,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
    tags,
    doneDate };
  const up = [...saved, newData];
  if (!saved.find((elemento) => elemento.id === newData.id)) {
    localStorage.setItem('doneRecipes', JSON.stringify(up));
  }
}
