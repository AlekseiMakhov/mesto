const popupArray = Array.from(document.querySelectorAll('.popup'));
const page = document.querySelector('.page');

const closePopup = (evt) => {
     evt.target.classList.remove('popup_opened');
}

popupArray.forEach((item, evt) => {
    const closeButton = item.querySelector(`.${item.firstElementChild.getAttribute('class')}__close-button`);
    const close = () => {
        item.classList.remove('popup_opened');            
    }
    closeButton.addEventListener('click', close);
    if (evt.target === evt.currentTarget) {
        item.addEventListener('click', closePopup);
    }
    page.addEventListener('keydown', evt => {
        if (evt.key === "Escape") {
            close();
        }
    });
})