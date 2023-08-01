import { applyPhoneInputMask } from '../utils/validation-form.js';

export const createInput = (
  name = '',
  id,
  cls,
  required,
  value = '',
  type = 'text',
) => {
  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('modal__input-wrapper');
  const addContactContainer = document.createElement('div');
  addContactContainer.classList.add('add-contact__input-container');

  const input = document.createElement('input');
  input.classList.add(cls);
  input.id = id;
  input.type = type;
  input.placeholder = name;
  input.value = value;
  input.required = false;

  if (input.type === 'tel') {
    applyPhoneInputMask(input);
  }

  const label = document.createElement('label');
  label.classList.add('modal__label', 'label');
  label.for = id;

  const labelName = document.createElement('span');
  labelName.classList.add('label__name');
  labelName.textContent = name;

  label.append(labelName);

  if (required) {
    const labelStar = document.createElement('span');
    labelStar.classList.add('label__star');
    labelStar.textContent = '*';

    label.append(labelStar);
  }

  input.addEventListener('input', () => {
    input.classList.add('focus-input');
    if (!input.value) {
      input.classList.remove('focus-input');
      inputDel.classList.remove('active-btn');
    } else {
      inputDel.classList.add('active-btn');
      inputDel.addEventListener('click', (e) => {
        e.preventDefault();
      });
    }
  });

  const inputDel = document.createElement('button');
  inputDel.classList.add('add-contact__clear-btn');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('add-contact__del-icon');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    'images/sprite.svg#inputDel',
  );
  svg.appendChild(use);
  inputDel.appendChild(svg);

  const btnDel = document.createElement('button');
  btnDel.classList.add('add-contact__btn-del');
  btnDel.textContent = 'del';

  if (cls === 'modal__input') {
    inputWrapper.append(input);
    inputWrapper.append(label);
    return inputWrapper;
  } else {
    addContactContainer.append(input);
    addContactContainer.append(inputDel);
    return { addContactContainer, input, inputDel, btnDel };
  }
};
