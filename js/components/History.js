// js/components/History.js
import { getSeriesList } from '../state/store.js';
import { getSeriesLogo } from '../utils/assets.js';

const releaseDates = {
    'yugioh': 'Set 1996 - Mar 2004',
    'r': 'Abr 2004 - Dez 2007',
    'gx-manga': 'Dez 2005 - Mar 2011',
    '5ds-manga': 'Ago 2009 - Jan 2015',
    'zexal-manga': 'Dez 2010 - Jun 2015',
    'dteamzexal': 'Abr 2012 - Abr 2014',
    'arcv-manga': 'Ago 2015 - Abr 2019',
    'saikyoduelistyuya': 'Abr 2015 - Ago 2017',
    'ocgstructures': 'Jun 2019 - Presente',
    'sevenslukeexplosionsupremacylegend': 'Set 2020 - Mar 2022',
    'sevensmyroadacademy': 'Ago 2020 - Fev 2022',
    'rushduellp': 'Ago 2021 - Ago 2022',
    'gorush-manga': 'Abr 2022 - Presente',
    'ocgstories': 'Abr 2022 - Presente',
    'toeianime': 'Abr 1998 - Out 1998',
    'dm': 'Abr 2000 - Set 2004',
    'dsod': 'Abr 2016 (Filme)',
    'gx': 'Out 2004 - Mar 2008',
    '5ds': 'Abr 2008 - Mar 2011',
    'zexal': 'Abr 2011 - Mar 2014',
    'arc-v': 'Abr 2014 - Mar 2017',
    'vrains': 'Mai 2017 - Set 2019',
    'sevens': 'Abr 2020 - Mar 2022',
    'gorush': 'Abr 2022 - Presente'
};

const historyIcons = {
    cronologia: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v6h-2zm0-4h2v2h-2z"/></svg>`,
    construcao: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-5.5 9h11L12 2zm0 4.23L13.68 9h-3.36L12 6.23zM2 13v2h20v-2H2zm2 4v2h16v-2H4z"/></svg>`
};

const mangaArtAssets = {
    gx: './img/artes/mangas/gx-manga_arte1.png',
    yugioh: './img/artes/mangas/yugioh_arte1.png',
    ocgstructures: './img/artes/mangas/ocgstructures_arte1.png'
};

const animeArtAssets = {
    toei: './img/artes/animes/toei_arte1.jpg',
    gx: './img/artes/animes/gx_arte1.png',
    vrains: './img/artes/animes/vrains_arte1.png'
};

const movieArtAssets = {
    toei1999: './img/artes/filmes/filme1999_arte1.png',
    bonds3d: './img/artes/filmes/3d_arte1.png',
    dsod: './img/artes/filmes/dsod_arte1.png'
};

let currentHistoryView = 'menu'; 

export const renderHistoryView = () => {
    const historyContainer = document.getElementById('history-view');
    if (!historyContainer) return;

    if (currentHistoryView === 'menu') {
        renderMenu(historyContainer);
    } else if (currentHistoryView === 'cronologia' || currentHistoryView === 'filmes') {
        renderComingSoon(historyContainer, currentHistoryView.charAt(0).toUpperCase() + currentHistoryView.slice(1));
    } else {
        renderList(historyContainer, currentHistoryView);
    }
};

const renderMenu = (container) => {
    container.innerHTML = `
        <div class="history-header-text">
            <h2>ACERVO DO MULTIVERSO</h2>
            <p>Selecione uma categoria para explorar</p>
        </div>
        
        <div class="history-cards-container">
            <div class="history-card" id="btn-cronologia">
                <div class="card-icon">${historyIcons.cronologia}</div>
                <div class="card-text">
                    <h3>Cronologia</h3>
                    <p>A linha do tempo oficial</p>
                </div>
            </div>

            <div class="history-card" id="btn-mangas">
                <div class="icon-and-text">
                    <div class="card-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 2H5c-1.11 0-2 .9-2 2v16c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM5 4h8v7l-2.5-1.5L8 11V4h7v16H5V4zm14 16h-2V4h2v16z"/></svg>
                    </div>
                    <div class="card-text">
                        <h3>Mangás</h3>
                        <p>Publicações e Spin-offs</p>
                    </div>
                </div>
                <div class="manga-arts-overlay">
                    <img src="${mangaArtAssets.gx}" alt="GX Manga">
                    <img src="${mangaArtAssets.yugioh}" alt="YGO Manga">
                    <img src="${mangaArtAssets.ocgstructures}" alt="OCG Manga">
                </div>
            </div>
            
            <div class="history-card" id="btn-animes">
                <div class="icon-and-text">
                    <div class="card-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zm-11-2l5-3-5-3v6z"/></svg>
                    </div>
                    <div class="card-text">
                        <h3>Animes</h3>
                        <p>Séries animadas e temporadas</p>
                    </div>
                </div>
                <div class="animes-arts-overlay">
                    <img src="${animeArtAssets.toei}" alt="Toei Anime">
                    <img src="${animeArtAssets.gx}" alt="GX Anime">
                    <img src="${animeArtAssets.vrains}" alt="VRAINS Anime">
                </div>
            </div>
            
            <div class="history-card" id="btn-filmes">
                <div class="icon-and-text">
                    <div class="card-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
                    </div>
                    <div class="card-text">
                        <h3>Filmes</h3>
                        <p>Longa-metragens da franquia</p>
                    </div>
                </div>
                <div class="filmes-arts-overlay">
                    <img src="${movieArtAssets.toei1999}" alt="Filme 1999 Toei">
                    <img src="${movieArtAssets.bonds3d}" alt="3D Bonds Beyond Time">
                    <img src="${movieArtAssets.dsod}" alt="The Dark Side of Dimensions">
                </div>
            </div>
        </div>
    `;

    document.getElementById('btn-cronologia').onclick = () => { currentHistoryView = 'cronologia'; renderHistoryView(); };
    document.getElementById('btn-mangas').onclick = () => { currentHistoryView = 'mangas'; renderHistoryView(); };
    document.getElementById('btn-animes').onclick = () => { currentHistoryView = 'animes'; renderHistoryView(); };
    document.getElementById('btn-filmes').onclick = () => { currentHistoryView = 'filmes'; renderHistoryView(); };
};

const renderComingSoon = (container, title) => {
    container.innerHTML = `
        <div class="history-sub-header">
            <button class="btn-back" id="btn-back-history">❮ Voltar</button>
            <h2>${title}</h2>
        </div>
        <div class="history-list-wrapper" style="align-items: center; justify-content: center; text-align: center;">
            <div style="background: rgba(2, 10, 28, 0.8); padding: 40px 20px; border-radius: 12px; border: 1px solid var(--accent-cyan); box-shadow: 0 0 15px rgba(0,255,255,0.2); max-width: 90%;">
                <div class="card-icon" style="color: var(--accent-cyan); width: 60px; height: 60px; margin: 0 auto 15px auto;">
                    ${historyIcons.construcao}
                </div>
                <h3 style="color: white; margin-bottom: 10px; font-size: 1.5rem;">Área em Construção</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5;">Os registros da aba <strong>${title}</strong> ainda estão sendo decodificados.<br><br>Volte em breve!</p>
            </div>
        </div>
    `;
    document.getElementById('btn-back-history').onclick = () => { currentHistoryView = 'menu'; renderHistoryView(); };
};

const renderList = (container, category) => {
    const seriesList = [...getSeriesList()].sort((a, b) => (a.order || 0) - (b.order || 0));
    const mangaIds = ['ocgstructures', 'ocgstories', 'yugioh', 'r', 'dteamzexal', 'rushduellp', 'saikyoduelistyuya', 'sevenslukeexplosionsupremacylegend', 'sevensmyroadacademy'];
    
    let filteredList = [];
    let title = '';

    if (category === 'mangas') {
        title = 'Mangás e Spin-offs';
        filteredList = seriesList.filter(s => mangaIds.includes(s.id) || s.id.includes('-manga'));
    } else if (category === 'animes') {
        title = 'Séries Animadas';
        filteredList = seriesList.filter(s => !mangaIds.includes(s.id) && !s.id.includes('-manga') && s.id !== 'dsod'); 
    }

    let html = `
        <div class="history-sub-header">
            <button class="btn-back" id="btn-back-history">❮ Voltar</button>
            <h2>${title}</h2>
        </div>
        <div class="history-list-wrapper">
    `;

    filteredList.forEach(series => {
        const logo = getSeriesLogo(series.id);
        const dates = releaseDates[series.id] || 'Data desconhecida';
        html += `
            <div class="history-list-item">
                <div class="history-item-logo-box"><img src="${logo}" alt="${series.name}" onerror="this.style.display='none'"></div>
                <div class="history-item-info">
                    <h4>${series.name}</h4>
                    <p><strong>Lançamento:</strong> ${dates}</p>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
    document.getElementById('btn-back-history').onclick = () => { currentHistoryView = 'menu'; renderHistoryView(); };
};