import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import recipeListItems from "../helpers/recipeListItems";
import Details from "./Details";


export default function MealsProgress() {
  const history = useHistory();
  const [ mealsProgress, setMealsProgress ] = useState();
  const { API, setAPI } = useContext(AppContext);
  const id = history.location.pathname.split('/')[2];

  

 const fetchMealsProgress = async () => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  const response = await fetch(url);
  const results = await response.json();
  setMealsProgress(results)
  
 }
 useEffect(() => {
  fetchMealsProgress();
  console.log(results)
 }, []);

  return (
    <>
      <img
        src={mealsProgress.strMealThumb}
        alt={mealsProgress.strMeal}
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title"> {mealsProgress.strMeal} </h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <h3 data-testid="recipe-category"> {mealsProgress.strCategory} </h3>
      <h3 data-testid="instructions">{mealsProgress.strInstructions}</h3>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
      <ul>
        {recipeListItems(mealsProgress)}
      </ul>
    </>
  
  )
    
}