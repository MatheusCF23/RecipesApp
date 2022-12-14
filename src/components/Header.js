import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import pageTitleManager from '../helpers/pageTitleManager';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const history = useHistory();
  const [toggleSearch, setToggleSearch] = useState(false);
  return (
    <header>

      <div className="headerIcons">
        {(history.location.pathname === '/meals'
        || history.location.pathname === '/drinks')
        && (

          <input
            type="image"
            src={ searchIcon }
            alt="search-img"
            data-testid="search-top-btn"
            onClick={ () => setToggleSearch(!toggleSearch) }
          />
        )}

        <input
          type="image"
          src={ profileIcon }
          alt="profile-img"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/profile') }
        />

      </div>

      <br />

      <h1 className="titleHeader" data-testid="page-title">
        { pageTitleManager(history.location.pathname) }
      </h1>

      {toggleSearch && (<SearchBar />)}

    </header>
  );
}
