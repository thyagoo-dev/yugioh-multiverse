// js/utils/assets.js

// Mapa para corrigir discrepâncias entre o ID do banco e o nome da pasta física
const folderMapping = {
    'arc-v': 'arcv', 
    '5ds': '5ds'
};

// Função auxiliar para pegar o nome correto da pasta da série
const getFolderName = (seriesId) => folderMapping[seriesId] || seriesId;

// Função auxiliar para descobrir a categoria (Anime ou Comic/Mangá)
const getCategoryFolder = (seriesId) => {
    // Nova lista atualizada com todos os seus novos mangás!
    const comicsList = [
        'ocgstructures', 'ocgstories', 'yugioh', 'r', 'dteamzexal',
        'rushduellp', 'saikyoduelistyuya', 'sevenslukeexplosionsupremacylegend', 'sevensmyroadacademy'
    ];
    
    // Verifica se está na lista ou se possui o sufixo "-manga" no ID
    const isComic = comicsList.includes(seriesId) || seriesId.includes('-manga');
    
    return isComic ? 'comics' : 'animes';
};

/**
 * Retorna o caminho do Logo da série para o Menu Lateral
 */
export const getSeriesLogo = (seriesId) => {
    if (!seriesId) return './img/logotipos/not-found.png';
    const folder = getFolderName(seriesId);
    const category = getCategoryFolder(seriesId);
    
    return `./img/logotipos/${category}/${folder}/${folder}.png`; 
};

/**
 * Retorna o caminho do Título Estilizado da série para o Cabeçalho
 */
export const getSeriesTitleImage = (seriesId) => {
    if (!seriesId) return './img/logotipos/not-found-title.png';
    const folder = getFolderName(seriesId);
    const category = getCategoryFolder(seriesId);
    
    return `./img/logotipos/${category}/${folder}/${folder}-series-title.png`; 
};

/**
 * Retorna o caminho do Retrato do Personagem (Oficial do Grid)
 */
export const getCharacterPortrait = (character) => {
    if (character && character.sprites && character.sprites.profile) {
        return character.sprites.profile; 
    }
    
    if (!character || !character.series || !character.charKey) {
        return 'https://placehold.co/200x300/222/FFF?text=Sem+Foto';
    }

    const seriesFolder = getFolderName(character.series);
    return `./img/characters/${seriesFolder}/${character.charKey}/profile.jpg`;
};