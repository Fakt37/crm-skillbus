import { createContactsForm } from './add-contact.js';
import { createForm } from './form.js';
import { closeModal, openModal } from './modal.js';

export const createModalUpdate = (client, clientRow) => {
  const form = createForm('edit', client);
  const inputs = form.querySelectorAll('.modal__input');
  const delClient = document.createElement('button');
  delClient.classList.add('modal__del-btn');
  delClient.textContent = 'Удалить клиента';

  const replace = form.querySelector('.modal__cancel-btn');
  replace.replaceWith(delClient);

  inputs.forEach((input) => {
    if (input.id === 'client-surname') {
      input.value = client.surname;
    } else if (input.id === 'client-name') {
      input.value = client.name;
    } else if (input.id === 'client-lastname') {
      input.value = client.lastName;
    }
    if (input.value) {
      input.classList.add('focus-input');
    }
  });

  const contactsForm = createContactsForm(client.contacts);

  form.replaceWith(contactsForm);
  const inputDelBtn = form.querySelectorAll('.add-contact__clear-btn');
  inputDelBtn.forEach((item) => {
    item.classList.add('active-btn');
  });

  delClient.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
    setTimeout(() => {
      openModal('Удалить клиента', 'del', client, clientRow);
    }, 300);
  });

  const clientIdHash = client.id ? `#edit${client.id}` : '';
  window.location.hash = clientIdHash;

  return form;
};
