import { openModal } from "../modal/modal.js";

const retrieveClient = async (clientId) => {
    const response = await fetch(`http://localhost:3000/api/clients/${clientId}`);
    if (response.ok) {
        const client = await response.json();
        return client;
    } else {
        throw new Error('Failed to retrieve client data');
    }
};

export const handleHash = async () => {
    const hash = window.location.hash;
    if (hash.startsWith('#edit')) {
        const clientId = hash.slice(5);
        try {
            const client = await retrieveClient(clientId);
            openModal('Редактирование клиента', 'edit', client);
        } catch (error) {
            console.error(error);
        }
    }
};