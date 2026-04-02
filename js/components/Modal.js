import { getState, setModalIndex, getFilteredCharacters } from '../state/store.js';
import { getCharacterPortrait } from '../utils/assets.js';
import { deselectAllCharactersUI } from './Grid.js';

let modal, btnClose, modalName, modalDesc, modalImg, modalCard, btnPrev, btnNext;

export const initModal = () => {
    modal = document.getElementById('character-modal');
    btnClose = document.getElementById('close-modal');
    modalName = document.getElementById('modal-char-name');
    modalDesc = document.getElementById('modal-char-desc');
    modalImg = document.getElementById('modal-char-img');
    modalCard = document.getElementById('modal-char-card');
    btnPrev = document.getElementById('prev-char');
    btnNext = document.getElementById('next-char');

    btnClose.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    btnPrev.addEventListener('click', showPrevCharacter);
    btnNext.addEventListener('click', showNextCharacter);
};

export const openModal = () => {
    populateModal();
    modal.classList.remove('hidden');
};

const closeModal = () => {
    modal.classList.add('hidden');
    deselectAllCharactersUI();
};

const populateModal = () => {
    const { currentModalIndex } = getState();
    const filteredCharacters = getFilteredCharacters();
    const char = filteredCharacters[currentModalIndex];
    
    if (!char) return;

    modalName.innerText = char.name;
    modalDesc.innerText = char.desc;
    modalCard.innerText = char.mainCard;
    modalImg.src = getCharacterPortrait(char);
    modalImg.alt = char.name;
    
    modalImg.onerror = function() {
        this.src = 'https://placehold.co/300x400/222/FFF?text=Sem+Foto';
    };
};

const showPrevCharacter = () => {
    const { currentModalIndex } = getState();
    const filteredCharacters = getFilteredCharacters();
    const newIndex = (currentModalIndex - 1 + filteredCharacters.length) % filteredCharacters.length;
    
    setModalIndex(newIndex);
    populateModal();
};

const showNextCharacter = () => {
    const { currentModalIndex } = getState();
    const filteredCharacters = getFilteredCharacters();
    const newIndex = (currentModalIndex + 1) % filteredCharacters.length;
    
    setModalIndex(newIndex);
    populateModal();
};