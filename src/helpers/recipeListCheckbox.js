export default function RecipeListCheckbox(object) {
  const handleCheckbox = ({ target }) => {
    if (target.checked) {
      target.parentElement.className = 'checkbox';
    }
    if (!target.checked) {
      target.parentElement.className = '';
    }
  };

  const arrIngredients = Object.keys(object)
    .filter((filteredKey) => object[filteredKey] !== null && object[filteredKey] !== '')
    .filter((key) => key.includes('strIngredient'));

  const arrMeasures = Object.keys(object)
    .filter((filteredKey) => object[filteredKey] !== null && object[filteredKey] !== '')
    .filter((key) => key.includes('strMeasure'));

  return arrIngredients.map((ingredient, index) => (
    <div key={ index }>

      <label
        htmlFor={ object[ingredient].replace(' ', '_') }
        data-testid={ `${index}-ingredient-step` }
      >
        { `${object[ingredient]} - ${object[arrMeasures[index]]}`}
        <input
          type="checkbox"
          value={ object[ingredient].replace(' ', '_') }
          id={ object[ingredient].replace(' ', '_') }
          onClick={ handleCheckbox }
        />
      </label>
    </div>

  ));
}

// Não testado
