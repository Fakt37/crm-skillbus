const validateName = (value) => {
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z]+$/;
    //const nameRegex = /(^[A-Z]{1}[a-z]{1,19}$)|(^[А-Я]{1}[а-я]{1,19}$)/;
    return nameRegex.test(value.trim());
};

const validatePhoneNumber = (phoneNumber) => {
    if (!/^(?:\+7|8)/.test(phoneNumber)) {
        return phoneNumber;
    }

    const phoneNumberRegex = /^(?:\+7|8)\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
    return phoneNumberRegex.test(phoneNumber);
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const applyPhoneInputMask = (input) => {
    const formatPhoneNumber = () => {
        let inputValue = input.value.replace(/\D/g, '');
        let formattedValue = '';

        if (['7', '8', '9'].indexOf(inputValue[0]) > -1) {
            if (inputValue[0] === '9') inputValue = '7' + inputValue;
            const firstSymbols = inputValue[0] === '8' ? '8' : '+7';
            formattedValue = `${firstSymbols} `;

            if (inputValue.length > 1) {
                formattedValue += `(${inputValue.substring(1, 4)}`;
            }
            if (inputValue.length >= 5) {
                formattedValue += `) ${inputValue.substring(4, 7)}`;
            }
            if (inputValue.length >= 8) {
                formattedValue += `-${inputValue.substring(7, 9)}`;
            }
            if (inputValue.length >= 10) {
                formattedValue += `-${inputValue.substring(9, 11)}`;
            }
        } else {
            formattedValue = '+' + inputValue.substring(0, 15);
        }

        input.value = formattedValue;
    };

    const handlePhoneInput = (e) => {
        const input = e.target;
        const selectionStart = input.selectionStart;

        if (input.value.length !== selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = input.value.replace(/\D/g, '');
            }
            return;
        }

        formatPhoneNumber(input);
    };

    const handlePhonePaste = (e) => {
        const input = e.target;
        const inputNumbersValue = input.value.replace(/\D/g, '');
        const pasted = e.clipboardData || window.clipboardData;

        if (pasted) {
            const pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
                return;
            }
        }
    };

    const handlePhoneKeyDown = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode === 8 && inputValue.length === 1) {
            e.target.value = '';
        }
    };

    input.addEventListener('keydown', handlePhoneKeyDown);
    input.addEventListener('input', handlePhoneInput, false);
    input.addEventListener('paste', handlePhonePaste, false);
};

export const validateForm = (surnameValue, nameValue) => {
    const errors = [];

    if (surnameValue.trim() === '' && nameValue.trim() === '') {
        errors.push('Введите фамилию и имя.');
    } else {
        if (surnameValue.trim() === '') {
            errors.push('Введите фамилию.');
        } else if (surnameValue.trim().length < 2) {
            errors.push('Фамилия должна содержать не менее двух символов.');
        }

        if (nameValue.trim() === '') {
            errors.push('Введите имя.');
        } else if (nameValue.trim().length < 2) {
            errors.push('Имя должно содержать не менее двух символов.');
        }
    }

    if (surnameValue.trim() !== '') {
        if (!validateName(surnameValue)) {
            errors.push('Некорректно введена фамилия.');
        }
    }

    if (nameValue.trim() !== '') {
        if (!validateName(nameValue)) {
            errors.push('Некорректно введено имя.');
        }
    }

    return errors;
};

export const displayErrorMessages = (messages) => {
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-container');

    messages.forEach((message) => {
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = message;
        errorContainer.appendChild(errorMessage);
    });

    const previousErrorContainer = document.querySelector('.error-container');
    if (previousErrorContainer) {
        previousErrorContainer.remove();
    }

    const form = document.getElementById('client-form');
    form.querySelector('.modal__btn-group').prepend(errorContainer);
};

export const clearErrorMessages = () => {
    const previousErrorContainer = document.querySelector('.error-container');
    if (previousErrorContainer) {
        previousErrorContainer.remove();
    }
};

export const validateContacts = (contactsInput) => {
    const errorMessages = [];
    if (contactsInput.value.trim() === '') {
        errorMessages.push('Введите данные контакта');
    } else {
        if (contactsInput.type === 'tel') {
            if (!validatePhoneNumber(contactsInput.value.trim())) {
                errorMessages.push('Неверный формат номера телефона');
            }
        }
        if (contactsInput.type === 'email') {
            if (!validateEmail(contactsInput.value.trim())) {
                errorMessages.push('Неверный формат Email')
            }
        }
    }
    return errorMessages;
};
