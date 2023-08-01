import { createCancelButton, createSubmitButton } from '../utils/button.js';
import { showPreloader } from '../utils/preloader.js';
import { closeModal } from './modal.js';

export const createModalDel = (client, clientRow) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('modal__body');
  const textDel = document.createElement('p');
  textDel.classList.add('modal__descr');
  textDel.textContent = 'Вы действительно хотите удалить данного клиента?';

  const delBtn = createSubmitButton('Удалить');
  delBtn.addEventListener('click', async () => {
    showPreloader(delBtn, 'preloader__sm--white');

    const response = await fetch(
      `http://localhost:3000/api/clients/${client.id}`,
      {
        method: 'DELETE',
      },
    );
    if (response.ok) {
      clientRow.remove();
      closeModal();
    }
  });
  const cancel = createCancelButton();

  wrapper.append(textDel);
  wrapper.append(delBtn);
  wrapper.append(cancel);

  return wrapper;
};
