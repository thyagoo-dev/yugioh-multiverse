// js/state/store.js
import { getSeriesFromDB, getCharactersFromDB } from '../services/api.js';

const state = {
    allCharacters: [], 
    seriesList: [], 
    currentSeries: "dm",
    searchTerm: "",
    currentModalIndex: 0,
    isLoading: true,
    currentTab: "characters" 
};

export const fetchSeriesFromDB = async () => {
    try {
        const results = await getSeriesFromDB();
        state.seriesList = results.map(parseObj => ({
            id: parseObj.get("seriesId"),
            name: parseObj.get("name"),
            order: parseObj.get("order")
        }));
    } catch (error) { 
        console.error("Erro ao carregar séries:", error); 
    }
};

export const fetchCharactersFromDB = async () => {
    try {
        const results = await getCharactersFromDB();
        state.allCharacters = results.map(parseObj => ({
            id: parseObj.get("charId"), 
            name: parseObj.get("name"), 
            series: parseObj.get("series"),
            charKey: parseObj.get("charKey"), 
            hasSync: parseObj.get("hasSync"), 
            mainCard: parseObj.get("mainCard"),
            desc: parseObj.get("desc"), 
            sprites: parseObj.get("sprites")
        }));
        state.isLoading = false;
    } catch (error) {
        console.error("Erro ao carregar personagens:", error);
        state.isLoading = false;
    }
};

export const getState = () => state;
export const getSeriesList = () => state.seriesList;
export const getSeriesInfo = () => state.seriesList.find(s => s.id === state.currentSeries) || { name: "Yu-Gi-Oh!" };
export const getFilteredCharacters = () => state.allCharacters.filter(char => char.series === state.currentSeries && char.name.toLowerCase().includes(state.searchTerm));

export const setSeries = (seriesId) => { state.currentSeries = seriesId; state.searchTerm = ''; state.currentModalIndex = 0; };
export const setSearchTerm = (term) => { state.searchTerm = term.toLowerCase(); state.currentModalIndex = 0; };
export const setModalIndex = (index) => { state.currentModalIndex = index; };
export const setTab = (tabId) => { state.currentTab = tabId; };