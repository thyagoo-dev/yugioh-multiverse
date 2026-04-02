import { setSearchTerm } from '../state/store.js';
import { updateAppView } from '../main.js';

export const initSearch = () => {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', (e) => {
        setSearchTerm(e.target.value);
        updateAppView();
    });
};