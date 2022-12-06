// import { useHistory } from "react-router-dom";


// export default function CardRecom () {

//   if(history.location.pathname.includes('/meals')) {
//     return(
//       <div className='recommendation'>
//       {recomendation && recomendation.map((i, index) => (
//         <div key={ i.idDrink } data-testid={ `${index}-recommendation-card` }>
//           <img
//             src={ i.strDrinkThumb }
//             alt={ i.strDrink }
//             style = {{ maxWidth: '300px' }}
//           />
//           <p data-testid={ `${index}-recommendation-title` }>{ i.strDrink }</p>
//       </div>
//       ))}
//     </div>
//     )
//   }
//   if(history.location.pathname.includes('/drinks')) {
//     return(
//       <div className='recommendation'>
//       {recomendation && recomendation.map((i, index) => (
//         <div key={ i.idMeal } data-testid={ `${index}-recommendation-card` }>
//           <img
//             src={ i.strMealThumb }
//             alt={ i.strMeal }
//             style = {{ maxWidth: '300px' }}
//           />
//           <p data-testid={ `${index}-recommendation-title` }>{ i.strMeal }</p>
//       </div>
//       ))}
//     </div>
//     )
//   }
// }