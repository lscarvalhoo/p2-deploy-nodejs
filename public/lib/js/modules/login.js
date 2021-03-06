import { addEvent } from "../libraries/method-lib.js";
import changeContent from "./change-content.js";
import initProfile from "./profile.js";

export default function initLogin() {
  const registerArrow = document.querySelector('#register-arrow');
  const email = document.querySelector('#login-email');
  const password = document.querySelector('#login-password');
  const loginButton = document.querySelector('.button-login');
  let emailValue = email.value;
  let passwordValue = email.value;

  async function login() {
    const email = document.formLogin.email.value;
    const password = document.formLogin.password.value;
    const data = { email, password };

    const request = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    const requestJson = await request.json();
    console.log(requestJson)
    if (requestJson.logged) {
      localStorage.token = requestJson.token;
      localStorage.userName = requestJson.pessoa.name;

      console.log(requestJson)
      changeContent('profile');
      initProfile();
    } else {
      alert('E-mail or password incorrect, please try again');
    };
  }

  email.addEventListener('focus', () => {
    emailValue = email.value;
    email.value = '';
  });
  password.addEventListener('focus', () => {
    passwordValue = password.value;
    password.value = '';
  });
  email.addEventListener('blur', () => {
    if (email.value === '')
      email.value = emailValue;
  });
  password.addEventListener('blur', () => {
    if (password.value === '')
      password.value = passwordValue;
  });

  addEvent(loginButton, login);

  registerArrow.addEventListener('click', (event) => {
    event.preventDefault();
    changeContent('create');
  });
}