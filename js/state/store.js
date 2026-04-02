import { charactersData, seriesList } from '../data/db.js';

// Estado privado
const state = {
    currentSeries: "dm",
    searchTerm: "",
    currentModalIndex: 0
};

// Funções de Leitura (Getters)
export const getState = () => state;

export const getSeriesInfo = () => {
    return seriesList.find(s => s.id === state.currentSeries) || { name: "Yu-Gi-Oh!" };
};

export const getFilteredCharacters = () => {
    return charactersData.filter(char => 
        char.series === state.currentSeries && 
        char.name.toLowerCase().includes(state.searchTerm)
    );
};

// Funções de Escrita (Setters)
export const setSeries = (seriesId) => {
    state.currentSeries = seriesId;
    state.searchTerm = ''; // Limpa a busca ao trocar de série
    state.currentModalIndex = 0;
};

export const setSearchTerm = (term) => {
    state.searchTerm = term.toLowerCase();
    state.currentModalIndex = 0;
};

export const setModalIndex = (index) => {
    state.currentModalIndex = index;
};