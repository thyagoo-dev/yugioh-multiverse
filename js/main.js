// js/main.js
import { renderNav } from './components/Nav.js';
import { renderGrid } from './components/Grid.js';
import { initSearch } from './components/Search.js';
import { initModal } from './components/Modal.js';
import { getSeriesInfo, fetchCharactersFromDB, fetchSeriesFromDB, getState } from './state/store.js';

// Inicialização do Parse (Back4App)
Parse.initialize(
    'S45oz7nDhneEmeLmO084hdRi0CCW1ZtWWFlUgTeH',
    'zJhueqxl3fOyfQWVxtt1nyBPsiCHgvqwlW2tPaQg'
);
Parse.serverURL = 'https://parseapi.back4app.com/';

// Função global para atualizar a UI quando o estado muda (Nosso Roteador!)
export const updateAppView = () => {
    const { currentTab } = getState();
    const seriesInfo = getSeriesInfo();
    const titleElement = document.getElementById('page-title');
    
    if (titleElement) {
        titleElement.innerText = `${seriesInfo.name} - Personagens`;
    }
    
    // Identifica se estamos na aba de personagens
    const isCharactersTab = currentTab === 'characters';
    
    // Captura os elementos da interface
    const headerEl = document.querySelector('.top-header');
    const controlsEl = document.querySelector('.controls');
    const gridEl = document.getElementById('character-grid');
    
    // Mostra ou esconde as áreas dependendo da aba
    if (headerEl) headerEl.style.display = isCharactersTab ? 'block' : 'none';
    if (controlsEl) controlsEl.style.display = isCharactersTab ? 'block' : 'none';
    if (gridEl) gridEl.style.display = isCharactersTab ? 'grid' : 'none';

    renderNav();
    
    // Só renderiza o peso dos personagens se estiver na aba correta
    if (isCharactersTab) {
        renderGrid();
    }
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', async () => {
    initSearch();
    initModal();
    
    // Aguarda carregar séries e personagens antes de exibir a tela
    await fetchSeriesFromDB();
    await fetchCharactersFromDB();
    
    updateAppView(); 
    
    console.log("🚀 Aplicação conectada ao Back4App com sucesso!");
});