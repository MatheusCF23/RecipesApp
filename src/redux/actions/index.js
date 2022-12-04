import { SAVE_EMAIL } from '../constants';

const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export default saveEmail;
