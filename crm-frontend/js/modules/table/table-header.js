import { updateClientsList } from './table-body.js';
import { clearTable } from '../utils/clearTable.js';

const theadNameList = {
  id: 'ID',
  fullName: 'Фамилия Имя Отчество',
  timeCreate: 'Дата и время <br />создания',
  timeChange: 'Последние <br />изменения',
  contacts: 'Контакты',
  actions: 'Действия',
};

const createSpan = (text, classes = []) => {
  const span = document.createElement('span');
  span.innerHTML = text;
  classes.forEach((cls) => span.classList.add(cls));
  return span;
};

const createHeaderCell = (text, classes = []) => {
  const th = document.createElement('th');
  const span = createSpan(text, classes);
  th.classList.add('table__th');
  th.appendChild(span);
  return th;
};

const createHeader = () => {
  const thead = document.createElement('thead');
  thead.classList.add('table__thead');
  const tr = document.createElement('tr');
  const { id, fullName, timeCreate, timeChange, contacts, actions } =
    theadNameList;

  tr.appendChild(createHeaderCell(id, ['table__id', 'arrow', 'down']));
  tr.appendChild(
    createHeaderCell(fullName, ['table__fullname', 'arrow', 'down', 'sorting']),
  );
  tr.appendChild(
    createHeaderCell(timeCreate, ['table__create', 'arrow', 'down']),
  );
  tr.appendChild(
    createHeaderCell(timeChange, ['table__change', 'arrow', 'down']),
  );
  tr.appendChild(createHeaderCell(contacts));
  tr.appendChild(createHeaderCell(actions));

  thead.addEventListener('click', (event) => {
    if (event.target.tagName === 'SPAN') {
      const targetSpan = event.target;
      const parentCell = targetSpan.closest('th');
      if (parentCell) {
        const isDescending = targetSpan.classList.contains('down');
        const headerText = targetSpan.textContent.trim();
        handleHeaderClick(headerText, isDescending);
        targetSpan.classList.toggle('down');
        targetSpan.classList.toggle('up');
      }
    }
  });

  const sortClientsList = async (headerText, isDescending) => {
    let sortKey;
    if (headerText === 'ID') {
      sortKey = 'id';
    } else if (headerText === 'Фамилия Имя Отчество') {
      sortKey = 'surname';
    } else if (headerText === 'Дата и время создания') {
      sortKey = 'createdAt';
    } else if (headerText === 'Последние изменения') {
      sortKey = 'updatedAt';
    } else {
      return;
    }

    const response = await fetch('http://localhost:3000/api/clients');
    const clientsList = await response.json();

    const sortedList = [...clientsList];

    const compare = (a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (valueA < valueB) {
        return isDescending ? 1 : -1;
      }
      if (valueA > valueB) {
        return isDescending ? -1 : 1;
      }
      return 0;
    };

    sortedList.sort(compare);

    clearTable();

    sortedList.forEach((client) => {
      updateClientsList(client);
    });
  };

  const handleHeaderClick = (headerText, isDescending) => {
    sortClientsList(headerText, isDescending);
  };

  thead.appendChild(tr);

  return thead;
};

export const thead = createHeader();
