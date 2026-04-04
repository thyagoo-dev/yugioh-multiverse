// js/components/Grid.js
import { getFilteredCharacters, setModalIndex, getState } from '../state/store.js';
import { getCharacterPortrait } from '../utils/assets.js';
import { openModal } from './Modal.js';

export const renderGrid = () => {
    const gridElement = document.getElementById('character-grid');
    const filteredCharacters = getFilteredCharacters();
    const { isLoading } = getState(); 
    
    gridElement.innerHTML = '';

    if (isLoading) {
        gridElement.innerHTML = '<p style="grid-column: 1/-1; text-align: center; margin-top: 20px; color: var(--accent-cyan); font-weight: bold; animation: pulse 1.5s infinite;">Acessando o banco de dados do Multiverso...</p>';
        return;
    }

    if(filteredCharacters.length === 0) {
        gridElement.innerHTML = '<p style="grid-column: 1/-1; text-align: center; margin-top: 20px;">Nenhum personagem encontrado.</p>';
        return;
    }

    filteredCharacters.forEach((char, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'char-icon-wrapper';
        wrapper.id = `char-icon-${char.id}`;
        
        wrapper.onclick = () => {
            selectCharacterUI(char.id);
            setModalIndex(index);
            openModal();
        };

        const imgSrc = getCharacterPortrait(char);
        const frameNormal = './img/frames/icon-frame.png';
        const frameSelected = './img/frames/icon-hover.png';

        // Aqui nós trocamos a lógica antiga do 'Z' pela renderização do novo ícone
        wrapper.innerHTML = `
            <div class="frame-container" style="position: relative;">
                <img class="char-portrait" src="${imgSrc}" alt="${char.name}" onerror="this.src='https://placehold.co/300x400/222/FFF?text=Sem+Foto'">
                <img class="frame-image" src="${frameNormal}" alt="Moldura Normal">
                <img class="frame-image-selected" src="${frameSelected}" alt="Moldura Selecionada">
                ${char.hasSync ? `<img class="alt-style-icon" src="./img/icons/another_icon.png" alt="Estilo Alternativo">` : ''}
            </div>
        `;
        gridElement.appendChild(wrapper);
    });
};

export const deselectAllCharactersUI = () => {
    const allWrappers = document.querySelectorAll('.char-icon-wrapper');
    allWrappers.forEach(w => w.classList.remove('selected'));
};

const selectCharacterUI = (charId) => {
    deselectAllCharactersUI();
    const clickedWrapper = document.getElementById(`char-icon-${charId}`);
    if (clickedWrapper) {
        clickedWrapper.classList.add('selected');
    }
};