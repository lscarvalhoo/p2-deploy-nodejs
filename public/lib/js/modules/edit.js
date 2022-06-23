import changeContent from "./change-content.js";

export default function initEdit() {
  const backButton = document.querySelector('#back');
  const editButton = document.querySelector('#edit-button');
  const userName = document.querySelector('#edit-username');
  const bio = document.querySelector('#edit-bio');
  const phone = document.querySelector('#edit-phone');
  const email = document.querySelector('#edit-email');
  const password = document.querySelector('#edit-password');


  async function editProfile() {
    const userName = document.querySelector('#edit-username');
    const bio = document.querySelector('#edit-bio');
    const phone = document.querySelector('#edit-phone');
    const email = document.querySelector('#edit-email');
    const password = document.querySelector('#edit-password');
    const data = [userName.value, bio.value, phone.value, email.value, password.value];

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

  editButton.addEventListener('click', (event) => {
    event.preventDefault();
    editProfile();
  });

  backButton.addEventListener('click', (event) => {
    event.preventDefault();
    changeContent('profile');
  });
}