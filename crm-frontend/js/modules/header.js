import { searchClientInTable } from "./table/table-body.js";

const createLogo = () => {
    const logoWrapper = document.createElement('div');
    const link = document.createElement('a');
    const logo = document.createElement('img');

    logo.src = 'images/logo.svg';
    logo.alt = 'Логотип: Skillbus';
    logo.classList.add('logo__img');

    link.classList.add('logo__link');
    link.appendChild(logo);

    logoWrapper.classList.add('header__logo', 'logo');
    logoWrapper.appendChild(link);

    return logoWrapper;
};

let searchTimer;

const createAutocompleteList = () => {
    const listWrapper = document.createElement('ul');
    listWrapper.classList.add('header__autocomplete-list');
    return listWrapper;
};

const createInput = () => {
    const inputWrapper = document.createElement('div');
    const inputElem = document.createElement('input');
    const autocompleteList = createAutocompleteList();

    inputElem.classList.add('input__element');
    inputElem.placeholder = 'Введите запрос';
    inputElem.type = 'text';
    inputElem.name = 'search';
    inputElem.id = 'search';

    inputWrapper.classList.add('header__input', 'input');
    inputWrapper.appendChild(inputElem);
    inputWrapper.appendChild(autocompleteList);
    autocompleteList.style.display = 'none';

    const hideAutocompleteList = () => {
        autocompleteList.style.display = 'none';
    };

    document.addEventListener('click', (event) => {
        const isClickInsideAutocomplete = event.target.closest('.header__autocomplete-list');

        if (!isClickInsideAutocomplete) {
            hideAutocompleteList();
        }
    });

    return { inputWrapper, inputElem, autocompleteList };
};

const createHeader = () => {
    const header = document.createElement('header');
    const headerWrapper = document.createElement('div');
    const container = document.createElement('div');
    const logo = createLogo();
    const { inputWrapper, inputElem, autocompleteList } = createInput();

    const handleSearchInput = () => {
        clearTimeout(searchTimer);

        searchTimer = setTimeout(() => {
            const searchQuery = inputElem.value;
            if (searchQuery.trim() === '') {
                autocompleteList.innerHTML = '';
                autocompleteList.style.display = 'none';
            } else {
                fetchAutocompleteData(searchQuery);
            }
        }, 300);
    };

    const updateAutocompleteList = (autocompleteData) => {
        autocompleteList.innerHTML = '';

        if (autocompleteData.length > 0) {
            autocompleteData.forEach((item) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.surname} ${item.name}`;
                listItem.classList.add('header__autocomplete-item');
                autocompleteList.appendChild(listItem);
                listItem.addEventListener('click', () => {
                    searchClientInTable(item);
                });
            });
            autocompleteList.style.display = 'block';
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = 'Ничего не найдено';
            listItem.classList.add('header__autocomplete-item');
            autocompleteList.appendChild(listItem);
            autocompleteList.style.display = 'block';
        }
    };

    const fetchAutocompleteData = async (searchQuery) => {
        const url = `http://localhost:3000/api/clients?search=${encodeURIComponent(searchQuery)}`;
        const response = await fetch(url);
        const autocompleteData = await response.json();

        updateAutocompleteList(autocompleteData);
    };

    inputElem.addEventListener('input', handleSearchInput);

    headerWrapper.classList.add('header__wrapper');
    headerWrapper.appendChild(logo);
    headerWrapper.appendChild(inputWrapper);

    container.classList.add('container');
    container.appendChild(headerWrapper);

    header.classList.add('header');
    header.appendChild(container);

    return header;
};

export const header = createHeader();
