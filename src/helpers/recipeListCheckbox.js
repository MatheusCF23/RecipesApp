export default function recipeListCheckbox(object) {
  const arrIngredients = Object.keys(object)
    .filter((filteredKey) => object[filteredKey] !== null && object[filteredKey] !== '')
    .filter((key) => key.includes('strIngredient'));

  const arrMeasures = Object.keys(object)
    .filter((filteredKey) => object[filteredKey] !== null && object[filteredKey] !== '')
    .filter((key) => key.includes('strMeasure'));

  return arrIngredients.map((ingredient, index) => (
    <div key={ index }>

      <input
        type="checkbox"
        value={ object[ingredient].replace(' ', '_') }
        id={ object[ingredient].replace(' ', '_') }
        className="checkbox"
      />
      <label
        htmlFor={ object[ingredient].replace(' ', '_') }
        data-testid={ `${index}-ingredient-step` }
      >
        { `${object[ingredient]} - ${object[arrMeasures[index]]}`}
      </label>
    </div>

  ));
}

// Não testado
