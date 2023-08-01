import { updateClientRow, updateClientsList } from '../table/table-body.js';
import { createCancelButton, createSubmitButton } from '../utils/button.js';
import { showPreloader } from '../utils/preloader.js';
import {
    clearErrorMessages,
    displayErrorMessages,
    validateContacts,
    validateForm,
} from '../utils/validation-form.js';
import { createContactsForm } from './add-contact.js';
import { createInput } from './input.js';
import { closeModal } from './modal.js';

export const createForm = (inside, client = '') => {
    const form = document.createElement('form');
    form.classList.add('modal__form');
    form.id = 'client-form';

    const inputs = [
        { label: 'Фамилия', id: 'client-surname', required: true },
        { label: 'Имя', id: 'client-name', required: true },
        { label: 'Отчество', id: 'client-lastname', required: false },
    ];

    const inputWrapperFragment = document.createDocumentFragment();
    inputs.forEach(({ label, id, required }) => {
        const inputWrapper = createInput(label, id, 'modal__input', required);
        inputWrapperFragment.appendChild(inputWrapper);
    });
    form.append(inputWrapperFragment);

    const addContact = createContactsForm(client.contacts);
    form.append(addContact);

    const btnGroup = document.createElement('div');
    btnGroup.classList.add('modal__btn-group');

    const save = createSubmitButton('Сохранить');
    const cancel = createCancelButton();
    cancel.addEventListener('click', () => {
        closeModal();
    });

    btnGroup.append(save, cancel);
    form.append(btnGroup);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        clearErrorMessages();

        const surnameInput = document.getElementById('client-surname');
        const nameInput = document.getElementById('client-name');

        const surnameValue = surnameInput.value.trim();
        const nameValue = nameInput.value.trim();

        const errorMessages = validateForm(surnameValue, nameValue);

        if (errorMessages.length > 0) {
            displayErrorMessages(errorMessages);
            return;
        }

        const inputs = form.querySelectorAll('.modal__input');
        const formData = {};
        const contactsType = addContact.querySelectorAll('.dropdown__input-hidden');
        const contactsValue = addContact.querySelectorAll('.add-contact__input');
        let contactErrors;

        const contactDataArray = [];
        contactsType.forEach((type, index) => {
            const input = contactsValue[index];
            contactErrors = validateContacts(input);
            const typeName = type.value;
            const inputValue = input.value;
            const contactData = {
                type: typeName,
                value: inputValue,
            };
            contactDataArray.push(contactData);
        });

        if (contactErrors && contactErrors.length > 0) {
            displayErrorMessages(contactErrors);
            return;
        }
        inputs.forEach((input) => {
            const formattedValue = input.value.trim().toLowerCase();
            const formattedInputValue = formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
            formData[input.id] = formattedInputValue;
        });

        const saveBtn = form.querySelector('.modal__submit-btn');

        showPreloader(saveBtn, 'preloader__sm--white');

        try {
            const url =
                inside === 'add'
                    ? 'http://localhost:3000/api/clients'
                    : `http://localhost:3000/api/clients/${client.id}`;
            const response = await fetch(url, {
                method: inside === 'add' ? 'POST' : 'PATCH',
                body: JSON.stringify({
                    name: formData['client-name'],
                    surname: formData['client-surname'],
                    lastName: formData['client-lastname'] || '',
                    contacts: contactDataArray,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedClient = await response.json();
                if (inside === 'add') {
                    updateClientsList(updatedClient);
                } else {
                    updateClientRow(updatedClient);
                }
                closeModal();
            } else {
                const errorData = await response.json();
                const errorMessages = errorData?.errors || ['Что-то пошло не так...'];
                displayErrorMessages(errorMessages);
            }
        } catch (error) {
            const errorMessages = ['Произошла ошибка при выполнении запроса.'];
            displayErrorMessages(errorMessages);
        }
    });

    return form;
};
