import { header } from './modules/header.js';
import { main } from './modules/main-section.js';
import { openModal } from './modules/modal/modal.js';
import { handleHash } from './modules/utils/hash-handler.js';

const app = document.getElementById('app');

const createCrmApp = () => {
    app.append(header, main);
};

document.addEventListener('DOMContentLoaded', async () => {
    createCrmApp();
    handleHash()
});
