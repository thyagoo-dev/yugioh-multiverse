// js/state/store.js

const state = {
    allCharacters: [], 
    seriesList: [], 
    currentSeries: "dm",
    searchTerm: "",
    currentModalIndex: 0,
    isLoading: true,
    currentTab: "characters" // NOVA PROPRIEDADE: Controla a aba principal atual
};

export const fetchSeriesFromDB = async () => {
    try {
        const SeriesClass = Parse.Object.extend("Series");
        const query = new Parse.Query(SeriesClass);
        query.ascending("order"); 
        const results = await query.find();
        state.seriesList = results.map(parseObj => ({
            id: parseObj.get("seriesId"),
            name: parseObj.get("name"),
            order: parseObj.get("order")
        }));
    } catch (error) { console.error("Erro série:", error); }
};

export const fetchCharactersFromDB = async () => {
    try {
        const CharacterClass = Parse.Object.extend("Character");
        const query = new Parse.Query(CharacterClass);
        query.limit(1000); 
        const results = await query.find();
        state.allCharacters = results.map(parseObj => ({
            id: parseObj.get("charId"), name: parseObj.get("name"), series: parseObj.get("series"),
            charKey: parseObj.get("charKey"), hasSync: parseObj.get("hasSync"), mainCard: parseObj.get("mainCard"),
            desc: parseObj.get("desc"), sprites: parseObj.get("sprites")
        }));
        state.isLoading = false;
    } catch (error) {
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
// NOVO: Função para trocar de aba
export const setTab = (tabId) => { state.currentTab = tabId; };