import { createClientsSection } from './sections/clients.js';

const createMainSection = () => {
  const main = document.createElement('main');
  main.classList.add('main');

  const sectionClients = createClientsSection();

  main.append(sectionClients);

  return main;
};

export const main = createMainSection();
