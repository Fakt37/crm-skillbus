export const createEditButton = () => {
  const editBtn = document.createElement('button');
  editBtn.classList.add('action__btn', 'action__btn--edit');
  editBtn.textContent = 'Изменить';
  editBtn.id = 'editModal';
  return editBtn;
};

export const createDeleteButton = () => {
  const delBtn = document.createElement('button');
  delBtn.classList.add('action__btn', 'action__btn--del');
  delBtn.textContent = 'Удалить';
  return delBtn;
};

export const createAddButton = () => {
  const addBtn = document.createElement('button');
  addBtn.classList.add('clients__add-btn');
  addBtn.textContent = 'Добавить клиента';
  addBtn.id = 'openModal';

  return addBtn;
};

export const createAddContact = () => {
  const addContactBtn = document.createElement('button');
  addContactBtn.classList.add('add-contact__btn');
  addContactBtn.textContent = 'Добавить контакт';

  return addContactBtn;
};

export const createSubmitButton = (name) => {
  const saveBtn = document.createElement('button');
  saveBtn.classList.add('modal__submit-btn');
  saveBtn.type = 'submit';
  saveBtn.textContent = name;

  return saveBtn;
};

export const createCancelButton = () => {
  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('modal__cancel-btn');
  cancelBtn.textContent = 'Отмена';

  return cancelBtn;
};
