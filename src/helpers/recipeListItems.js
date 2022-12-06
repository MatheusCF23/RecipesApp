export default function recipeListItems(object) {
  const arrIngredients = Object.keys(object)
    .filter((filteredKey) => object[filteredKey] !== null && object[filteredKey] !== '')
    .filter((key) => key.includes('strIngredient'));

  const arrMeasures = Object.keys(object)
    .filter((filteredKey) => object[filteredKey] !== null && object[filteredKey] !== '')
    .filter((key) => key.includes('strMeasure'));

  return arrIngredients.map((ingredient, index) => (
    <li
      key={ index }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {`${object[ingredient]} - ${object[arrMeasures[index]]}`}
    </li>
  ));
}
