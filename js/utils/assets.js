// js/utils/assets.js

export const getCharacterPortrait = (char) => {
    // Lê diretamente do objeto de sprites puxado do Back4App
    if (char && char.sprites && char.sprites.profile) {
        return char.sprites.profile;
    }
    // Fallback de segurança caso a imagem não exista no banco
    return 'https://placehold.co/300x400/222/FFF?text=Sem+Foto';
};

export const getSeriesLogo = (seriesId) => {
    // Agora o código flui sem exceções: busca pelo nome exato do ID da série
    return `./img/logotipos/${seriesId}.png`;
};

// Puxa as outras variações de imagem (base, sorrindo, etc)
export const getCharacterSprite = (char, spriteType = 'base') => {
    if (char && char.sprites && char.sprites[spriteType]) {
        return char.sprites[spriteType];
    }
    return null; 
};