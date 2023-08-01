import { openModal } from '../modal/modal.js';
import { createEditButton } from '../utils/button.js';
import { createDeleteButton } from '../utils/button.js';
import { hidePreloader, showPreloader } from '../utils/preloader.js';
import { createContactsList } from './iconsContacts.js';

const createTr = () => {
    const trBody = document.createElement('tr');
    trBody.classList.add('table__tr', 'table__tr--tbody');

    return trBody;
};

const formatDate = (data) => {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;

    return { formattedDate, formattedTime };
};

const createClientRow = (client) => {
    const clientRow = createTr();
    clientRow.id = client.id;
    clientRow.dataset.id = client.id;

    const id = document.createElement('td');
    id.classList.add('table__td', 'table__td--id');
    id.textContent = client.id.slice(-6);

    const fullName = document.createElement('td');
    fullName.classList.add('table__td');
    fullName.textContent = `${client.surname} ${client.name} ${client.lastName ? client.lastName : ''
        }`;

    const create = document.createElement('td');
    const dateCreate = formatDate(client.createdAt);
    create.classList.add('table__td');
    create.innerHTML = `
    <span>${dateCreate.formattedDate}</span>
    <span class="table__time">${dateCreate.formattedTime}</span>
  `;

    const update = document.createElement('td');
    const dateUpdate = formatDate(client.updatedAt);
    update.classList.add('table__td');
    update.innerHTML = `
    <span>${dateUpdate.formattedDate}</span>
    <span class="table__time">${dateUpdate.formattedTime}</span>
  `;

    const contacts = document.createElement('td');
    contacts.classList.add('table__td', 'contacts');

    const wrapper = createContactsList(client);
    contacts.append(wrapper);

    const action = document.createElement('td');
    action.classList.add('table__td', 'action');
    const editBtn = createEditButton();
    const delBtn = createDeleteButton();

    const actionWrapper = document.createElement('div');
    actionWrapper.classList.add('action__wrapper');
    actionWrapper.appendChild(editBtn);
    actionWrapper.appendChild(delBtn);
    action.appendChild(actionWrapper);

    clientRow.append(id);
    clientRow.append(fullName);
    clientRow.append(create);
    clientRow.append(update);
    clientRow.append(contacts);
    clientRow.append(action);

    const handleEditClick = async () => {
        editBtn.classList.add('hide-image');
        showPreloader(editBtn, 'preloader__sm');
        try {
            const { id: clientId } = client;
            const response = await fetch(
                `http://localhost:3000/api/clients/${clientId}`,
            );
            if (response.ok) {
                const foundClient = await response.json();
                if (foundClient) {
                    openModal('Изменить данные', 'edit', foundClient);
                } else {
                    console.log('Клиент не найден');
                }
            } else {
                console.log('Ошибка при загрузке клиента:', response.status);
            }
        } catch (error) {
            console.log('Ошибка при загрузке клиента:', error);
        } finally {
            editBtn.classList.remove('hide-image');
            hidePreloader(editBtn);
        }
    };

    const handleDeleteClick = async () => {
        delBtn.classList.add('hide-image');
        showPreloader(delBtn, 'preloader__sm');
        try {
            const { id: clientId } = client;
            const response = await fetch(
                `http://localhost:3000/api/clients/${clientId}`,
            );
            if (response.ok) {
                const foundClient = await response.json();
                openModal('Удалить клиента', 'del', foundClient, clientRow);
            } else {
                console.log('Не удалось удалить клиента');
            }
        } catch (error) {
            console.log('Ошибка при удалении клиента:', error);
        } finally {
            delBtn.classList.remove('hide-image');
            hidePreloader(delBtn);
        }
    };

    editBtn.addEventListener('click', handleEditClick);
    delBtn.addEventListener('click', handleDeleteClick);

    return clientRow;
};

export const updateClientsList = (client) => {
    const tbody = document.querySelector('.table__tbody');

    const newClient = createClientRow(client);
    tbody.append(newClient);
};

export const updateClientRow = (client) => {
    const rowClient = document.getElementById(`${client.id}`);
    const updateRowClient = createClientRow(client);

    rowClient.parentNode.replaceChild(updateRowClient, rowClient);
};

export const searchClientInTable = (client) => {
    const previousSelection = tbody.querySelector('.selected-client');
    if (previousSelection) {
        previousSelection.classList.remove('selected-client');
    }

    const rows = tbody.querySelectorAll('tr');
    rows.forEach((row) => {
        if (
            row.dataset.id === client.id
        ) {
            row.classList.add('selected-client');
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

}

const createBody = () => {
    const tbody = document.createElement('tbody');
    tbody.classList.add('table__tbody');

    return tbody;
};

export const tbody = createBody();
