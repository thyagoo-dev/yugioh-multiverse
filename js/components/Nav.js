// js/components/Nav.js
import { getState, setSeries, getSeriesList, setTab } from '../state/store.js';
import { getSeriesLogo, getCharacterPortrait } from '../utils/assets.js'; 
import { updateAppView } from '../main.js';

// SVGs Profissionais (Atualizado com ícone de History)
const icons = {
    home: `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 3l-10 9h3v8h5v-6h4v6h5v-8h3z"/></svg>`,
    history: `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`,
    characters: `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    profile: `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`
};

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
    dsod: { charKey: 'seto-kaiba-dsod', nameSearch: 'kaiba' },
    ocgstructures: { charKey: 'shoma-yusa', nameSearch: 'shoma' },
    ocgstories: { charKey: 'sky-striker-ace-raye', nameSearch: 'raye' }, 
    yugioh: { charKey: 'yami-yugi', nameSearch: 'yami' }, 
    r: { charKey: 'yami-yugi', nameSearch: 'yami' }, 
    'gx-manga': { charKey: 'jaden-yuki', nameSearch: 'jaden' },
    '5ds-manga': { charKey: 'yusei-fudo', nameSearch: 'yusei' },
    'zexal-manga': { charKey: 'yuma-tsukumo', nameSearch: 'yuma' },
    'arcv-manga': { charKey: 'yuya-sakaki', nameSearch: 'yuya' },
    'gorush-manga': { charKey: 'yudias-velgear', nameSearch: 'yudias' },
    dteamzexal: { charKey: 'yuma-tsukumo', nameSearch: 'yuma' },
    saikyoduelistyuya: { charKey: 'yuya-sakaki', nameSearch: 'yuya' },
    rushduellp: { charKey: 'yuga-ohdo', nameSearch: 'yuga' },
    sevensmyroadacademy: { charKey: 'yuga-ohdo', nameSearch: 'yuga' },
    sevenslukeexplosionsupremacylegend: { charKey: 'lucidien-kallister', nameSearch: 'luke' }
};

let isMenuOpen = false;

export const renderNav = () => {
    const navElement = document.getElementById('series-nav');
    const { currentTab, currentSeries, allCharacters } = getState();
    
    const seriesList = [...getSeriesList()].sort((a, b) => (a.order || 0) - (b.order || 0));
    
    navElement.innerHTML = '';
    navElement.className = 'main-bottom-nav'; 
    
    const tabs = [
        { id: 'home', name: 'Home', icon: icons.home },
        { id: 'history', name: 'History', icon: icons.history },
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
        const activeSeriesInfo = seriesList.find(s => s.id === currentSeries);
        fabBtn.innerHTML = `<img src="${getSeriesLogo(activeSeriesInfo?.id || 'dm')}" alt="World" onerror="this.src='./img/icons/another_icon.png'">`;
        
        const menuOverlay = document.createElement('div');
        menuOverlay.className = `series-menu-overlay ${isMenuOpen ? 'open' : ''}`;
        
        const menuContainer = document.createElement('div');
        menuContainer.className = `series-menu-container ${isMenuOpen ? 'open' : ''}`;

        const mangaIds = [
            'ocgstructures', 'ocgstories', 'yugioh', 'r', 'dteamzexal', 
            'rushduellp', 'saikyoduelistyuya', 'sevenslukeexplosionsupremacylegend', 'sevensmyroadacademy'
        ];
        
        const animes = [];
        const mangas = [];

        seriesList.forEach(series => {
            if (mangaIds.includes(series.id) || series.id.includes('-manga')) {
                mangas.push(series);
            } else {
                animes.push(series);
            }
        });

        const buildColumn = (title, items) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'series-column-wrapper';
            
            const header = document.createElement('div');
            header.className = 'series-column-title';
            header.innerText = title;
            wrapper.appendChild(header);

            const col = document.createElement('div');
            col.className = 'series-menu-column';

            items.forEach(series => {
                const seriesWrapper = document.createElement('div');
                seriesWrapper.className = `dl-series-wrapper ${series.id === currentSeries ? 'active' : ''}`;
                
                const seriesInner = document.createElement('div');
                seriesInner.className = 'dl-series-inner';
                
                const logoUrl = getSeriesLogo(series.id);
                const protMap = protagonistsMap[series.id];
                
                let protagonistUrl = 'https://placehold.co/100x100/222/FFF?text=?'; 

                if (protMap) {
                    let protCharacter = allCharacters.find(c => 
                        c.series === series.id && 
                        (c.charKey === protMap.charKey || c.name.toLowerCase().includes(protMap.nameSearch))
                    );
                    if (!protCharacter) {
                        protCharacter = allCharacters.find(c => c.series === series.id);
                    }
                    if (protCharacter) {
                        protagonistUrl = getCharacterPortrait(protCharacter);
                    }
                }

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
                col.appendChild(seriesWrapper);
            });
            
            wrapper.appendChild(col);
            return wrapper;
        };

        menuContainer.appendChild(buildColumn('Mangás', mangas));
        menuContainer.appendChild(buildColumn('Animes', animes));

        fabBtn.onclick = () => {
            isMenuOpen = !isMenuOpen;
            updateAppView();
        };

        menuOverlay.onclick = () => {
            isMenuOpen = false;
            updateAppView();
        };

        fabContainer.appendChild(menuOverlay);
        fabContainer.appendChild(menuContainer); 
        fabContainer.appendChild(fabBtn);
        document.body.appendChild(fabContainer);
    }
};