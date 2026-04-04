// js/main.js
import { renderNav } from './components/Nav.js';
import { renderGrid } from './components/Grid.js';
import { initSearch } from './components/Search.js';
import { initModal } from './components/Modal.js';
import { getSeriesInfo, fetchCharactersFromDB, fetchSeriesFromDB, getState } from './state/store.js';
import { getSeriesTitleImage } from './utils/assets.js'; // Importamos a nova função

// Inicialização do Parse (Back4App)
Parse.initialize(
    'S45oz7nDhneEmeLmO084hdRi0CCW1ZtWWFlUgTeH',
    'zJhueqxl3fOyfQWVxtt1nyBPsiCHgvqwlW2tPaQg'
);
Parse.serverURL = 'https://parseapi.back4app.com/';

// Função global para atualizar a UI quando o estado muda (Roteador)
export const updateAppView = () => {
    const { currentTab, currentSeries } = getState();
    const seriesInfo = getSeriesInfo();
    
    // Captura os elementos da interface
    const headerEl = document.querySelector('.top-header');
    const controlsEl = document.querySelector('.controls');
    const gridEl = document.getElementById('character-grid');
    
    // Identifica se estamos na aba de personagens
    const isCharactersTab = currentTab === 'characters';

    // NOVA LÓGICA DO CABEÇALHO: Injeta imagem em vez de texto
    if (headerEl) {
        if (isCharactersTab) {
            headerEl.style.display = 'flex'; // Usamos flex para centralizar a imagem
            const titleImageUrl = getSeriesTitleImage(currentSeries);
            // Injeta a tag IMG com classe para controle de tamanho
            headerEl.innerHTML = `<img src="${titleImageUrl}" alt="${seriesInfo.name}" class="dynamic-series-title">`;
        } else {
            headerEl.style.display = 'none';
        }
    }
    
    // Mostra ou esconde o resto das áreas dependendo da aba
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