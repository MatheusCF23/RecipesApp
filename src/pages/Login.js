import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  function validateEmail() {
    const validation = /\S+@\S+\.\S+/;
    return email.match(validation);
  }

  function validatePassword() {
    const passwordMinLength = 6;
    return password.length > passwordMinLength;
  }

  async function handleLogin(event) {
    const formattedEmail = JSON.stringify({ email });
    event.preventDefault();
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { }, meals: {} }));
    localStorage.setItem('user', formattedEmail);
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
