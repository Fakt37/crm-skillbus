const contacts = {
  phone: {
    label: 'Телефон',
    value: 'phone',
  },
  otherPhone: {
    label: 'Доп. телефон',
    value: 'otherPhone',
  },
  email: {
    label: 'Email',
    value: 'email',
  },
  vk: {
    label: 'Vk',
    value: 'vk',
  },
  fb: {
    label: 'Facebook',
    value: 'fb',
  },
};

export const createSelect = (id, onTypeChange, typeValue = '') => {
  const dropdown = document.createElement('div');
  dropdown.classList.add('dropdown');
  const dropdownBtn = document.createElement('button');
  dropdownBtn.classList.add('dropdown__btn');

  const dropdownList = document.createElement('ul');
  dropdownList.classList.add('dropdown__list');

  dropdownBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('dropdown--active');
  });

  const createDropdownItem = (data) => {
    const dropdownItem = document.createElement('li');
    dropdownItem.classList.add('dropdown__item');
    dropdownItem.dataset.value = data.value;
    dropdownItem.textContent = data.label;

    dropdownItem.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedDropdownItem = dropdownList.querySelector('.selected');

      if (selectedDropdownItem) {
        selectedDropdownItem.classList.remove('selected');
      }
      dropdownBtn.textContent = dropdownItem.textContent;
      type.value = dropdownItem.dataset.value;
      dropdown.classList.remove('dropdown--active');
      dropdownItem.classList.add('selected');

      const changeEvent = new Event('change');
      type.dispatchEvent(changeEvent);
    });

    return dropdownItem;
  };

  const phone = createDropdownItem(contacts.phone);
  const other = createDropdownItem(contacts.otherPhone);
  const email = createDropdownItem(contacts.email);
  const vk = createDropdownItem(contacts.vk);
  const fb = createDropdownItem(contacts.fb);

  dropdownList.append(phone, other, email, vk, fb);

  const type = document.createElement('input');
  type.classList.add('dropdown__input-hidden');
  type.type = 'text';
  type.id = `${'select-value' + id}`;
  type.value = typeValue ? typeValue.type : contacts.phone.value;

  type.addEventListener('change', (e) => {
    const newTypeValue = e.target.value;
    if (onTypeChange) {
      onTypeChange(newTypeValue);
    }
  });

  if (typeValue && typeValue.type === contacts.phone.value) {
    dropdownBtn.textContent = contacts.phone.label;
    phone.classList.add('selected');
  } else if (typeValue && typeValue.type === contacts.otherPhone.value) {
    dropdownBtn.textContent = contacts.otherPhone.label;
    other.classList.add('selected');
  } else if (typeValue && typeValue.type === contacts.email.value) {
    dropdownBtn.textContent = contacts.email.label;
    email.classList.add('selected');
  } else if (typeValue && typeValue.type === contacts.vk.value) {
    dropdownBtn.textContent = contacts.vk.label;
    vk.classList.add('selected');
  } else if (typeValue && typeValue.type === contacts.fb.value) {
    dropdownBtn.textContent = contacts.fb.label;
    fb.classList.add('selected');
  } else {
    dropdownBtn.textContent = contacts.phone.label;
    phone.classList.add('selected');
  }

  dropdown.append(dropdownBtn);
  dropdown.append(dropdownList);
  dropdown.append(type);

  const closeDropdown = () => {
    dropdown.classList.remove('dropdown--active');
  };

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Tab') {
      closeDropdown();
    }
  });

  return { dropdown, type };
};
