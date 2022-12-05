import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import RecipesDetails from './pages/RecipesDetails';

function App() {
  return (
    <Switch>
      <Route>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/drinks/:id/in-progress" component={ DrinksID } /> */}
        {/* <Route path="/meals/:id/in-progress" component={ MealsID } /> */}
        <Route path="/meals/:id" component={ RecipesDetails } />
        <Route path="/drinks/:id" component={ RecipesDetails } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals" component={ Recipes } />
      </Route>
    </Switch>
  );
}

export default App;
