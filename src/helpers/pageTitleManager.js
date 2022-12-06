export default function pageTitleManager(pathname) {
  switch (pathname) {
  case '/meals':
    return 'Meals';
  case '/drinks':
    return 'Drinks';
  case '/profile':
    return 'Profile';
  case '/done-recipes':
    return 'Done Recipes';
  default:
    return 'Favorite Recipes';
  }
}
