export const showPreloader = (block, cls) => {
  const preloader = document.createElement('div');
  preloader.classList.add('preloader', cls);
  block.prepend(preloader);
};

export const hidePreloader = (block) => {
  const preloader = block.querySelector('.preloader');
  if (preloader) {
    block.removeChild(preloader);
  }
};
