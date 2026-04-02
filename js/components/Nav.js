// js/components/Nav.js
import { seriesList } from '../data/db.js';
import { getState, setSeries } from '../state/store.js';
import { getSeriesLogo } from '../utils/assets.js';
import { updateAppView } from '../main.js';

export const renderNav = () => {
    const navElement = document.getElementById('series-nav');
    const { currentSeries } = getState();
    
    navElement.innerHTML = '';
    
    seriesList.forEach(series => {
        const btn = document.createElement('button');
        btn.className = `series-btn ${series.id === currentSeries ? 'active' : ''}`;
        
        const logoUrl = getSeriesLogo(series.id);
        
        btn.innerHTML = `<img src="${logoUrl}" alt="${series.name}" style="height: 40px; object-fit: contain;" onerror="this.style.display='none'; this.parentNode.innerHTML='<span style=\'color:white; font-size:14px;\'>${series.name}</span>'">`;

        btn.onclick = () => {
            if (currentSeries !== series.id) {
                setSeries(series.id);
                document.getElementById('search-input').value = ''; // Reseta input visual
                updateAppView();
            }
        };
        
        navElement.appendChild(btn);
    });
};