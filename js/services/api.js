// js/services/api.js

// Inicializa a conexão com o banco de dados
export const initAPI = () => {
    Parse.initialize(
        'S45oz7nDhneEmeLmO084hdRi0CCW1ZtWWFlUgTeH',
        'zJhueqxl3fOyfQWVxtt1nyBPsiCHgvqwlW2tPaQg'
    );
    Parse.serverURL = 'https://parseapi.back4app.com/';
};

// Busca as séries
export const getSeriesFromDB = async () => {
    const SeriesClass = Parse.Object.extend("Series");
    const query = new Parse.Query(SeriesClass);
    query.ascending("order"); 
    return await query.find();
};

// Busca os personagens
export const getCharactersFromDB = async () => {
    const CharacterClass = Parse.Object.extend("Character");
    const query = new Parse.Query(CharacterClass);
    query.limit(1000); 
    return await query.find();
};