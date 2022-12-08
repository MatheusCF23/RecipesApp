import FavoritesRecipesComponent from '../components/FavoritesRecipesComponent';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const favLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  return (
    <>
      <Header />
      <FavoritesRecipesComponent
        data={ favLocalStorage }
      />
      <Footer />
    </>
  );
}
