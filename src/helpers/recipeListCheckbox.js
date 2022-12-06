export default function recipeListCheckbox(object) {
  const arrIngredients = Object.keys(object)
    .filter((filteredKey) => object[filteredKey] !== null && object[filteredKey] !== '')
    .filter((key) => key.includes('strIngredient'));

  const arrMeasures = Object.keys(object)
    .filter((filteredKey) => object[filteredKey] !== null && object[filteredKey] !== '')
    .filter((key) => key.includes('strMeasure'));

  return arrIngredients.map((ingredient, index) => (
    <label key={ index } htmlFor={ object[ingredient] }>
      { `${object[ingredient]} - ${object[arrMeasures[index]]}`}
      <input
        type="checkbox"
        value={ object[ingredient] }
        data-testid={ `${index}-ingredient-name-and-measure` }
      />

    </label>

  ));
}

// Não testado
