const $body = document.body;
let scrollPosition = 0;

export function disableScroll() {
  scrollPosition = window.pageYOffset;
  let oldWidth = $body.clientWidth;

  $body.style.overflow = 'hidden';
  $body.style.position = 'fixed';
  $body.style.top = `-${scrollPosition}px`;
  $body.style.width = `${oldWidth}px`;
}

export function enableScroll() {
  if ($body.style.overflow !== 'hidden') scrollPosition = window.pageYOffset;

  $body.style.overflow = '';
  $body.style.position = '';
  $body.style.top = ``;
  $body.style.width = ``;
  window.scrollTo(0, scrollPosition);
}

export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
