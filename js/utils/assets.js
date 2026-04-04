// js/utils/assets.js

// Mapa para corrigir discrepâncias entre o ID do banco e o nome da pasta física
const folderMapping = {
    'arc-v': 'arcv', // Transforma 'arc-v' do banco na string limpa 'arcv'
    '5ds': '5ds'
};

// Função auxiliar para pegar o nome correto da pasta
const getFolderName = (seriesId) => folderMapping[seriesId] || seriesId;

/**
 * Retorna o caminho do Logo da série para o Menu Lateral
 * Padrão: img/logotipos/[pasta_da_serie]/[pasta_da_serie].png
 */
export const getSeriesLogo = (seriesId) => {
    if (!seriesId) return './img/logotipos/not-found.png';
    const folder = getFolderName(seriesId);
    return `./img/logotipos/${folder}/${folder}.png`; // Agora usa folder.png (ex: arcv.png)
};

/**
 * Retorna o caminho do Título Estilizado da série para o Cabeçalho
 * Padrão: img/logotipos/[pasta_da_serie]/[pasta_da_serie]-series-title.png
 */
export const getSeriesTitleImage = (seriesId) => {
    if (!seriesId) return './img/logotipos/not-found-title.png';
    const folder = getFolderName(seriesId);
    return `./img/logotipos/${folder}/${folder}-series-title.png`; // Ex: arcv-series-title.png
};

/**
 * Retorna o caminho do Retrato do Personagem (Oficial do Grid)
 */
export const getCharacterPortrait = (character) => {
    if (character && character.sprites && character.sprites.profile) {
        return character.sprites.profile; 
    }
    const seriesFolder = folderMapping[character.series] || character.series;
    return `./img/characters/${seriesFolder}/${character.charKey}/profile.jpg`;
};