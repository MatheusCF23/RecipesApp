import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  const { email } = JSON.parse(localStorage.getItem('user'))
   || { email: 'Usuário desconhecido' };
  function buttonRemove() {
    localStorage.clear();
    return history.push('/');
  }
  return (
    <>
      <Header />
      <div>
        <p
          data-testid="profile-email"
        >
          {email}
        </p>
        <button
          className="btn btn-primary icon"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          className="btn btn-primary icon"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          className="btn btn-primary icon"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => buttonRemove() }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}
