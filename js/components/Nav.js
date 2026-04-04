// js/components/Nav.js
import { getState, setSeries, getSeriesList, setTab } from '../state/store.js';
import { getSeriesLogo, getCharacterPortrait } from '../utils/assets.js'; // Importamos a função oficial de retrato!
import { updateAppView } from '../main.js';

// SVGs Profissionais
const icons = {
    home: `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 3l-10 9h3v8h5v-6h4v6h5v-8h3z"/></svg>`,
    series: `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M4 6h16v12H4zm2 2v8h12V8zM2 4h20v16H2z"/></svg>`,
    characters: `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    profile: `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`
};

// Mapa inteligente com nome de busca para garantir que vai achar o personagem
const protagonistsMap = {
    toeianime: { charKey: 'yugi-muto', nameSearch: 'yugi' },
    dm: { charKey: 'yami-yugi', nameSearch: 'yami' },
    gx: { charKey: 'jaden-yuki', nameSearch: 'jaden' },
    '5ds': { charKey: 'yusei-fudo', nameSearch: 'yusei' },
    zexal: { charKey: 'yuma-tsukumo', nameSearch: 'yuma' },
    'arc-v': { charKey: 'yuya-sakaki', nameSearch: 'yuya' },
    vrains: { charKey: 'playmaker', nameSearch: 'playmaker' },
    sevens: { charKey: 'yuga-ohdo', nameSearch: 'yuga' },
    gorush: { charKey: 'yudias-velgear', nameSearch: 'yudias' },
    dsod: { charKey: 'seto-kaiba-dsod', nameSearch: 'kaiba' }
};

let isMenuOpen = false;

export const renderNav = () => {
    const navElement = document.getElementById('series-nav');
    const { currentTab, currentSeries, allCharacters } = getState();
    const seriesList = getSeriesList(); 
    
    navElement.innerHTML = '';
    navElement.className = 'main-bottom-nav'; 
    
    const tabs = [
        { id: 'home', name: 'Home', icon: icons.home },
        { id: 'series', name: 'Series', icon: icons.series },
        { id: 'characters', name: 'Characters', icon: icons.characters },
        { id: 'profile', name: 'Profile', icon: icons.profile }
    ];

    tabs.forEach(tab => {
        const btn = document.createElement('button');
        btn.className = `nav-tab-btn ${tab.id === currentTab ? 'active' : ''}`;
        btn.innerHTML = `<div class="nav-icon">${tab.icon}</div><span class="nav-label">${tab.name}</span>`;
        btn.onclick = () => {
            setTab(tab.id);
            updateAppView();
        };
        navElement.appendChild(btn);
    });

    const oldFab = document.getElementById('fab-container');
    if (oldFab) oldFab.remove();

    if (currentTab === 'characters') {
        const fabContainer = document.createElement('div');
        fabContainer.id = 'fab-container';
        
        const fabBtn = document.createElement('button');
        fabBtn.className = 'fab-series-btn';
        const activeSeriesInfo = getSeriesList().find(s => s.id === currentSeries);
        fabBtn.innerHTML = `<img src="${getSeriesLogo(activeSeriesInfo?.id || 'dm')}" alt="World" onerror="this.src='./img/icons/another_icon.png'">`;
        
        const menuOverlay = document.createElement('div');
        menuOverlay.className = `series-menu-overlay ${isMenuOpen ? 'open' : ''}`;
        
        const menuList = document.createElement('div');
        menuList.className = `series-menu-list ${isMenuOpen ? 'open' : ''}`;

        seriesList.forEach(series => {
            const seriesWrapper = document.createElement('div');
            seriesWrapper.className = `dl-series-wrapper ${series.id === currentSeries ? 'active' : ''}`;
            
            const seriesInner = document.createElement('div');
            seriesInner.className = 'dl-series-inner';
            
            const logoUrl = getSeriesLogo(series.id);
            const protMap = protagonistsMap[series.id];
            
            let protagonistUrl = 'https://placehold.co/100x100/222/FFF?text=?'; // Placeholder padrão (sem erro 404)

            if (protMap) {
                // 1. Tenta achar o protagonista exato pelo charKey ou parte do nome
                let protCharacter = allCharacters.find(c => 
                    c.series === series.id && 
                    (c.charKey === protMap.charKey || c.name.toLowerCase().includes(protMap.nameSearch))
                );

                // 2. À prova de falhas: Se não achar, pega O PRIMEIRO personagem da série que existir no banco!
                if (!protCharacter) {
                    protCharacter = allCharacters.find(c => c.series === series.id);
                }

                // 3. Se achou ALGUÉM, usa a função oficial (a mesma do Grid) para pegar a imagem certa
                if (protCharacter) {
                    protagonistUrl = getCharacterPortrait(protCharacter);
                }
            }

            // O novo layout perfeito (Idêntico à sua referência do Duel Links)
            seriesInner.innerHTML = `
                <div class="dl-logo-container">
                    <img class="dl-series-logo" src="${logoUrl}" alt="${series.name}" onerror="this.style.display='none';">
                </div>
                <div class="dl-char-container">
                    <img class="dl-protagonist-img" src="${protagonistUrl}" alt="${series.name}" onerror="this.src='https://placehold.co/100x100/222/FFF?text=?';">
                </div>
            `;

            seriesWrapper.appendChild(seriesInner);

            seriesWrapper.onclick = () => {
                setSeries(series.id);
                isMenuOpen = false; 
                const searchInput = document.getElementById('search-input');
                if (searchInput) searchInput.value = ''; 
                updateAppView();
            };
            
            menuList.appendChild(seriesWrapper);
        });

        fabBtn.onclick = () => {
            isMenuOpen = !isMenuOpen;
            updateAppView();
        };

        menuOverlay.onclick = () => {
            isMenuOpen = false;
            updateAppView();
        };

        fabContainer.appendChild(menuOverlay);
        fabContainer.appendChild(menuList);
        fabContainer.appendChild(fabBtn);
        document.body.appendChild(fabContainer);
    }
};