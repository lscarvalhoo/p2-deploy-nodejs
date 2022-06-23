import changeContent from "./change-content.js";
import { addEvent } from "../libraries/method-lib.js";

export default function initCreate() {
  const loginArrow = document.querySelector('#login-arrow');
  const createButton = document.querySelector('.button-create');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  let emailValue = email.value;
  let passwordValue = email.value;

  async function createUser() {
    const email = document.formCreateUser.email.value;
    console.log(email)
    const password = document.formCreateUser.password.value;
    const data = { email, password };
    console.log(data)

    const verifyEmail = await fetch('/verifyEmail', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }); 

    if (verifyEmail.ok) {
      const responseJson = await verifyEmail.json(); 

      if (responseJson.isMember) {
        alert('this email is already registered, please enter with another email or make login');
      } else {
        const request = await fetch('/createUser', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        });

        if (request.ok) {
          alert('Successfully registered, please make login');
          changeContent('login');
        } else {
          alert('Registration failed, please try again');
        }
      }
    }
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

  addEvent(createButton, createUser);

  loginArrow.addEventListener('click', (event) => {
    event.preventDefault();
    changeContent('login');
  });
}