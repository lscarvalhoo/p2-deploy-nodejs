import changeContent from "./change-content.js";
import initEdit from './edit.js';

export default function initProfile() {
    const buttonEdit = document.querySelector('.button-edit');
    const header = document.querySelector('.header');

    header.classList.add('active');

    console.log(buttonEdit)

    buttonEdit.addEventListener('click', () => {
        initEdit();
        changeContent('edit');
    });
}