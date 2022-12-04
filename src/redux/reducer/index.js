import { SAVE_EMAIL } from '../constants';

const INITIAL_STATE = {
  email: '',
};
function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_EMAIL:
    return ({ ...state, email: action.payload });
  default:
    return state;
  }
}

export default appReducer;
