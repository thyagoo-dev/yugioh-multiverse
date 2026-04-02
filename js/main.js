import { renderNav } from './components/Nav.js';
import { renderGrid } from './components/Grid.js';
import { initSearch } from './components/Search.js';
import { initModal } from './components/Modal.js';
import { getSeriesInfo } from './state/store.js';

// Função global para atualizar a UI quando o estado muda
export const updateAppView = () => {
    const titleElement = document.getElementById('page-title');
    const seriesInfo = getSeriesInfo();
    
    titleElement.innerText = `${seriesInfo.name} - Personagens`;
    
    renderNav();
    renderGrid();
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    initModal();
    updateAppView(); // Primeira renderização
});