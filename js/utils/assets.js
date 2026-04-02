export const getCharacterPortrait = (char) => {
    return `./img/personagens/${char.series}/${char.charKey}.jpg`;
};

export const getSeriesLogo = (seriesId) => {
    return `./img/logotipos/${seriesId}.png`;
};