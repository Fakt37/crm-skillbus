import { thead } from './table-header.js';
import { tbody, updateClientsList } from './table-body.js';
import { hidePreloader, showPreloader } from '../utils/preloader.js';

const createTable = () => {
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('clients__table-wrapper');

    const table = document.createElement('table');
    table.classList.add('clients__table', 'table');

    table.appendChild(thead);
    table.appendChild(tbody);

    tableWrapper.appendChild(table);

    const tableBackground = document.createElement('div');
    tableBackground.classList.add('clients__table-background');
    tableWrapper.append(tableBackground);

    return tableWrapper;
};

export const clientsTable = createTable();

const tableBackground = clientsTable.querySelector(
    '.clients__table-background',
);

const getClientsList = async () => {
    showPreloader(tableBackground);
    try {
        const response = await fetch('http://localhost:3000/api/clients');
        const clientsList = await response.json();

        clientsList.forEach((client) => {
            updateClientsList(client);
        });

        return clientsList;
    } catch (error) {
        console.error('Error loading clients:', error);
    } finally {
        hidePreloader(tableBackground);
    }
};

getClientsList();
