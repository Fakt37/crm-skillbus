import { createModalDel } from './del.js';
import { createForm } from './form.js';
import { createModalUpdate } from './update.js';

let content = null;
let modal = null;

const createModalTitle = (value) => {
  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.id = 'modal-title';
  title.textContent = `${value}`;

  return title;
};

const createModalClientId = (client) => {
  if (!client || !client.id) {
    return null;
  }

  const clientId = document.createElement('span');
  clientId.classList.add('modal__subtitle');
  clientId.textContent = `ID: ${client.id}`;

  return clientId;
};

const createModal = (title, inside, client = '', clientRow) => {
  modal = document.createElement('div');
  modal.classList.add('modal');
  modal.id = 'modal';

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal__content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal__header');

  const modalTitle = createModalTitle(title);

  if (inside === 'edit') {
    const clientId = createModalClientId(client);
    if (clientId) {
      modalHeader.append(modalTitle, clientId);
    } else {
      modalHeader.append(modalTitle);
    }
  } else {
    modalHeader.append(modalTitle);
  }

  const close = document.createElement('span');
  close.classList.add('modal__close');

  close.addEventListener('click', () => {
    closeModal();
  });

  if (inside === 'add') {
    const form = createForm(inside);
    content = form;
  } else if (inside === 'del') {
    modalTitle.classList.add('text-center');
    const text = createModalDel(client, clientRow);
    content = text;
  } else if (inside === 'edit') {
    const clientIdHash = client.id ? `#edit${client.id}` : '';
    window.location.hash = clientIdHash;
    const update = createModalUpdate(client);
    content = update;
  }

  modalContent.append(modalHeader, close);
  modalContent.append(content);
  modal.append(modalContent);

  return modal;
};

export const openModal = (title, inside, client = '', clientRow = '') => {
  modal = createModal(title, inside, client, clientRow);
  modal.classList.add('modal-active');
  document.body.appendChild(modal);

  document.addEventListener('click', handleOutsideClick);
};

export const closeModal = () => {
  modal.classList.remove('modal-active');
  modal.classList.add('modal-close');
  setTimeout(() => {
    modal.remove();
    history.pushState(
      '',
      document.title,
      window.location.pathname + window.location.search,
    );
  }, 300);

  document.removeEventListener('click', handleOutsideClick);
};

const handleOutsideClick = (e) => {
  if (e.target === modal) {
    closeModal();
    history.pushState(
      '',
      document.title,
      window.location.pathname + window.location.search,
    );
  }
};
