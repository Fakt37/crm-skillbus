import { tbody } from '../table/table-body.js';

export const clearTable = () => {
  const rows = tbody.getElementsByTagName('tr');
  while (rows.length > 0) {
    tbody.removeChild(rows[rows.length - 1]);
  }
};
