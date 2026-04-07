// js/main.js
import { renderNav } from './components/Nav.js';
import { renderGrid } from './components/Grid.js';
import { initSearch } from './components/Search.js';
import { initModal } from './components/Modal.js';
import { renderHistoryView } from './components/History.js';
import { getSeriesInfo, fetchCharactersFromDB, fetchSeriesFromDB, getState } from './state/store.js';
import { getSeriesTitleImage } from './utils/assets.js';
import { initAPI } from './services/api.js';

// Função global para atualizar a UI quando o estado muda (Roteador)
export const updateAppView = () => {
    const { currentTab, currentSeries } = getState();
    const seriesInfo = getSeriesInfo();
    
    // Captura os elementos da interface
    const headerEl = document.querySelector('.top-header');
    const controlsEl = document.querySelector('.controls');
    const gridEl = document.getElementById('character-grid');
    const historyEl = document.getElementById('history-view');
    
    const isCharactersTab = currentTab === 'characters';
    const isHistoryTab = currentTab === 'history';

    // LÓGICA DO CABEÇALHO (Muda dependendo da aba)
    if (headerEl) {
        if (isCharactersTab) {
            headerEl.style.display = 'flex'; 
            const titleImageUrl = getSeriesTitleImage(currentSeries);
            headerEl.innerHTML = `<img src="${titleImageUrl}" alt="${seriesInfo.name}" class="dynamic-series-title">`;
        } else if (isHistoryTab) {
            headerEl.style.display = 'flex'; 
            headerEl.innerHTML = `<h1 style="color: var(--accent-cyan); text-shadow: 0 0 5px var(--accent-cyan); text-transform: uppercase; letter-spacing: 2px;">History</h1>`;
        } else {
            headerEl.style.display = 'none';
        }
    }
    
    // Mostra ou esconde as áreas dependendo da aba
    if (controlsEl) controlsEl.style.display = isCharactersTab ? 'block' : 'none';
    if (gridEl) gridEl.style.display = isCharactersTab ? 'grid' : 'none';

    // Controle da aba History
    if (historyEl) {
        // A MÁGICA COMEÇA AQUI: Usamos 'flex' no lugar de 'block'
        historyEl.style.display = isHistoryTab ? 'flex' : 'none';
        if (isHistoryTab) {
            renderHistoryView(); 
        }
    }

    renderNav();
    
    if (isCharactersTab) {
        renderGrid();
    }
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', async () => {
    initAPI(); 
    initSearch();
    initModal();
    
    await fetchSeriesFromDB();
    await fetchCharactersFromDB();
    
    updateAppView(); 
    
    console.log("🚀 Aplicação conectada ao Back4App com sucesso!");
});