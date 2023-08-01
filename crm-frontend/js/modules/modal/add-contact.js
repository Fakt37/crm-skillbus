import { createSelect } from '../utils/select.js';
import { createAddContact } from '../utils/button.js';
import { createInput } from './input.js';

export const createContactsForm = (contacts = []) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('modal__add-contact');

    const formContact = document.createElement('form');
    formContact.classList.add('modal__add-contact-form', 'add-contact');

    const addContact = createAddContact();

    let contactCount = 0;
    let selectWrapper;
    let input;

    const createInputField = (inputType = 'text', value = '') => {
        return createInput(
            'Введите данные контакта',
            `${'contact' + contactCount}`,
            'add-contact__input',
            false,
            value,
            inputType,
        );
    };

    const onTypeChange = (newTypeValue) => {
        selectWrapper.removeChild(input.addContactContainer);
        const inputType =
            newTypeValue === 'phone'
                ? 'tel'
                : newTypeValue === 'email'
                    ? 'email'
                    : 'text';
        input = createInputField(inputType);
        selectWrapper.append(input.addContactContainer);
    };

    const addNewContact = () => {
        wrapper.classList.add('modal__add-contact--new-contact');
        input = createInputField('tel');
        const select = createSelect(contactCount, onTypeChange);
        selectWrapper = document.createElement('div');
        selectWrapper.classList.add('select-wrapper');
        selectWrapper.append(select.dropdown);
        selectWrapper.append(input.addContactContainer);
        formContact.append(selectWrapper);
        wrapper.prepend(formContact);
        input.inputDel.addEventListener('click', (e) => {
            e.preventDefault();
            selectWrapper.remove();
            contactCount--;
            if (!contactCount) {
                formContact.remove();
                wrapper.classList.remove('modal__add-contact--new-contact');
            }
        });
        contactCount++;
        if (contactCount === 10) {
            addContact.remove();
        }
    };

    addContact.addEventListener('click', (e) => {
        e.preventDefault();
        addNewContact();
    });

    wrapper.append(addContact);

    const createContactElements = (contact) => {
        const inputType =
            contact.type === 'phone'
                ? 'tel'
                : contact.type === 'email'
                    ? 'email'
                    : 'text';
        input = createInputField(inputType, contact.value);
        const select = createSelect(contactCount, onTypeChange, contact);
        selectWrapper = document.createElement('div');
        selectWrapper.classList.add('select-wrapper');
        selectWrapper.append(select.dropdown);
        selectWrapper.append(input.addContactContainer);
        formContact.append(selectWrapper);
        wrapper.prepend(formContact);
        input.inputDel.addEventListener('click', (e) => {
            e.preventDefault();
            selectWrapper.remove();
            contactCount--;
            if (!contactCount) {
                formContact.remove();
                wrapper.classList.remove('modal__add-contact--new-contact');
            }
        });
        contactCount++;
    };

    if (contacts.length > 0) {
        wrapper.classList.add('modal__add-contact--new-contact');
        contacts.forEach((contact) => createContactElements(contact));
    }

    return wrapper;
};
