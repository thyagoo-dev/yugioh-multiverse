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
    // Lista atualizada com todos os seus mangás
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
    // Proteção caso o objeto character venha incompleto
    if (!character || !character.series || !character.charKey) {
        return 'https://placehold.co/200x300/222/FFF?text=Sem+Foto';
    }

    const seriesFolder = getFolderName(character.series);
    const category = getCategoryFolder(character.series);

    // Prioriza o link salvo no banco de dados
    if (character.sprites && character.sprites.profile) {
        let dbPath = character.sprites.profile;
        
        // MÁGICA: Corrige automaticamente os links antigos salvos no banco
        // Se o link ainda for "./img/characters/ocgstructures/...", 
        // ele transforma em "./img/characters/comics/ocgstructures/..."
        if (!dbPath.includes(`/img/characters/${category}/`)) {
            dbPath = dbPath.replace('./img/characters/', `./img/characters/${category}/`);
        }
        
        return dbPath; 
    }
    
    // Fallback para gerar o link local caso não tenha no banco
    return `./img/characters/${category}/${seriesFolder}/${character.charKey}/profile.jpg`;
};