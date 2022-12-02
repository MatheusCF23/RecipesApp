import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Switch>
      <Route>
        {/* <Route path="/drinks/:id-da-receita/in-progress" component={ DrinksID } /> */}
        {/* <Route path="/meals/:id-da-receita/in-progress" component={ MealsID } /> */}
        {/* <Route path="/meals/:id-da-receita" component={ MealsID } /> */}
        {/* <Route path="/drinks/:id-da-receita" component={ DrinksID } /> */}
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/meals" component={ Recipes } />
        <Route exact path="/" component={ Login } />
      </Route>
    </Switch>
  );
}

export default App;
