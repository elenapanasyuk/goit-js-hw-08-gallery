import galleryImages from "./data/gallery-items.js";

const galleryListEl = document.querySelector(".js-gallery");
const modalImageEl = document.querySelector(".lightbox__image");
const modalEl = document.querySelector(".js-lightbox");
const closeModalBtn = document.querySelector(
  '[data-action = "close-lightbox"]'
);
const backdropEl = document.querySelector(".lightbox__overlay");

function makeGalleryCardMarkup(cards) {
  return cards
    .map(({ preview, original, description }) => {
      return `
<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  `;
    })
    .join("");
}
galleryListEl.insertAdjacentHTML(
  "beforeend",
  makeGalleryCardMarkup(galleryImages)
);

galleryListEl.addEventListener("click", onModalOpen);
closeModalBtn.addEventListener("click", onModalClose);
backdropEl.addEventListener("click", onBackdropClose);

function onModalOpen(evt) {
  window.addEventListener("keydown", onEscKeyPress);
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  modalEl.classList.add("is-open");
  modalImageEl.src = evt.target.dataset.source;
  modalImageEl.alt = evt.target.alt;
}

function onModalClose(evt) {
  window.removeEventListener("keydown", onEscKeyPress);
  modalEl.classList.remove("is-open");
  modalImageEl.src = "";
  modalImageEl.alt = "";
}

function onBackdropClose(evt) {
  if (evt.currentTarget === evt.target) {
    onModalClose();
  }
}

function onEscKeyPress(evt) {
  const ESC_KEY_CODE = "Escape";
  if (evt.code === ESC_KEY_CODE) {
    onModalClose();
  }
}
