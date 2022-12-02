import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SAVE_EMAIL from '../redux/actions';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  function validateEmail() {
    const validation = /\S+@\S+\.\S+/;
    return email.match(validation);
  }

  function validatePassword() {
    const passwordMinLength = 6;
    return password.length > passwordMinLength;
  }

  function handleLogin(event) {
    event.preventDefault();
    dispatch(SAVE_EMAIL(email));
    localStorage.setItem('user', JSON.stringify({ email }));
    return history.push('/meals');
  }

  return (
    <form>
      <label htmlFor="email-input">
        Email:
        <input
          type="email"
          id="email-input"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>

      <label htmlFor="password-input">
        Senha:
        <input
          type="password"
          id="password-input"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>

      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !(validateEmail() && validatePassword()) }
        onClick={ (event) => handleLogin(event) }
      >
        Enter
      </button>
    </form>
  );
}
