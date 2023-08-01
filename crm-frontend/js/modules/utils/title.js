export const createTitle = (title, tagElem) => {
  const titleTag = document.createElement(`${tagElem}`);
  titleTag.classList.add('clients__title');
  titleTag.textContent = title;

  return titleTag;
};
