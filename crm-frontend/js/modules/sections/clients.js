import { createTitle } from '../utils/title.js';
import { createContainer } from '../utils/container.js';
import { clientsTable } from '../table/table.js';
import { createAddButton } from '../utils/button.js';
import { openModal } from '../modal/modal.js';

export const createClientsSection = () => {
  const title = createTitle('Клиенты', 'h2');

  const sectionClients = document.createElement('section');
  sectionClients.classList.add('clients');

  const container = createContainer();
  const addBtn = createAddButton();

  addBtn.addEventListener('click', () => {
    openModal('Новый клиент', 'add');
    const clientForm = document.getElementById('client-form');
    clientForm.reset();
  });

  container.append(title);
  container.append(clientsTable);
  container.append(addBtn);
  sectionClients.append(container);

  return sectionClients;
};
