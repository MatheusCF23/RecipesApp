import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function FavoritesRecipesComponent(props) {
  const { data } = props;
  const [filter, setFilter] = useState('');
  const [newList, setNewList] = useState(data);
  const [copied, setCopied] = useState(false);
  console.log(newList);

  function desfavorite(obj) {
    const filteredList = newList.filter((o) => o.name !== obj.name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredList));
    setNewList(filteredList);
  }

  function copyToClipboard({ id, type }) {
    const href = window.location.origin;
    copy(`${href}/${type}s/${id}`);
    return setCopied(true);
  }

  function redirect({ type, id }) {
    if (type === 'drink') {
      return `/drinks/${id}`;
    }
    return `/meals/${id}`;
  }

  return (
    <>
      {copied && <p>Link copied!</p>}
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => setFilter('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      {newList.filter((o) => o.type.includes(filter)).map((obj, index) => (
        <div
          key={ `${obj.id}Key` }
        >
          <Link
            to={ redirect(obj) }
          >
            <img
              src={ obj.image }
              alt={ `${obj.name}pic` }
              data-testid={ `${index}-horizontal-image` }
              width="100"
              height="100"
            />
            <br />
            <span
              data-testid={ `${index}-horizontal-name` }
            >
              {obj.name}
            </span>
            <br />
            {obj.type === 'meal' ? (
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${obj.nationality} - ${obj.category}`}
              </span>
            )
              : (
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${obj.alcoholicOrNot}`}
                </span>
              )}
          </Link>
          <br />
          <input
            type="image"
            src={ blackHeartIcon }
            alt="desfavoriteButton"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => desfavorite(obj) }
          />
          <input
            type="image"
            src={ shareIcon }
            alt="shareButton"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => copyToClipboard(obj) }
          />
        </div>
      ))}
    </>
  );
}

FavoritesRecipesComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};
