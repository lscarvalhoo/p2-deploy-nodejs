import { addEvent } from "../libraries/method-lib.js";
import changeContent from "./change-content.js";

export default function initEdit() {
  const registerArrow = document.querySelector('#register-arrow');
  const userName = document.querySelector('#edit-userName');
  const bio = document.querySelector('#edit-bio'); 
  const phone = document.querySelector('#edit-phone'); 
  const email = document.querySelector('#edit-email'); 
  const password = document.querySelector('#edit-password');
  const editButton = document.querySelector('.button-edit');

  let userNameValue = email.value;
  let bioValue = email.value;
  let phoneValue = email.value; 
  let emailValue = email.value;
  let passwordValue = email.value;

  async function editProfile() {
    const userName = document.formLogin.name.value;
    const bio = document.formLogin.bio.value;
    const phone = document.formLogin.phone.value;
    const email = document.formLogin.email.value;
    const password = document.formLogin.password.value;
    const data = { userName, bio, phone, email, password }; 

    const request = await fetch('/updateUser', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });  
  }

  email.addEventListener('focus', () => {
    emailValue = email.value;
    email.value = '';
  });
  email.addEventListener('blur', () => {
    if (email.value === '')
      email.value = emailValue;
  });

  password.addEventListener('focus', () => {
    passwordValue = password.value;
    password.value = '';
  });
  password.addEventListener('blur', () => {
    if (password.value === '')
      password.value = passwordValue;
  });

  userName.addEventListener('focus', () => {
    userName = userName.value;
    userName.value = '';
  });
  userName.addEventListener('blur', () => {
    if (userName.value === '')
      userName.value = userNameValue;
  });

  bio.addEventListener('focus', () => {
    bio = bio.value;
    bio.value = '';
  });
  bio.addEventListener('blur', () => {
    if (bio.value === '')
    bio.value = bioNameValue;
  });

  phone.addEventListener('focus', () => {
    phone = phone.value;
    phone.value = '';
  });
  phone.addEventListener('blur', () => {
    if (phone.value === '')
    phone.value = phoneNameValue;
  });

  addEvent(editButton, editProfile);

  registerArrow.addEventListener('click', (event) => {
    event.preventDefault();
    changeContent('create');
  });
}