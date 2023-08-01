let array = [5, 4, 2, 3];

function absentNumber(array) {
  array.sort();

  let left = 0;
  let right = array.length - 1;

  for (let i = 0; i < array.length; i++) {
    if (Number(array[i])) {
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (array[mid] - mid === 1) {
          // Отсутствующее число находится в правой половине
          left = mid + 1;
        } else {
          // Отсутствующее число находится в левой половине
          right = mid - 1;
        }
      }
      // Возвращаем отсутствующее число
      return left + 1;
    } else {
      return false;
    }
  }
}

console.log(absentNumber(array));
