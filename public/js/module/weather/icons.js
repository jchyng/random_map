// icons.js
const WeatherCode = require('./weatherCodes');

const iconMap = {
    [WeatherCode.CLEAR_SKY]: 'https://example.com/icon_clear_sky.png',  // 맑은 하늘
    [WeatherCode.MAINLY_CLEAR]: 'https://example.com/icon_mainly_clear.png',  // 대체로 맑음
    [WeatherCode.PARTLY_CLOUDY]: 'https://example.com/icon_partly_cloudy.png',  // 약간 흐림
    [WeatherCode.CLOUDY]: 'https://example.com/icon_cloudy.png',  // 흐림
    [WeatherCode.FOG]: 'https://example.com/icon_fog.png',  // 안개
    [WeatherCode.FOG_ICE]: 'https://example.com/icon_fog_ice.png',  // 쌓이는 서리 안개
    [WeatherCode.DRIZZLE_LIGHT]: 'https://example.com/icon_drizzle_light.png',  // 이슬비: 가벼움
    [WeatherCode.DRIZZLE_MODERATE]: 'https://example.com/icon_drizzle_moderate.png',  // 이슬비: 보통
    [WeatherCode.DRIZZLE_HEAVY]: 'https://example.com/icon_drizzle_heavy.png',  // 이슬비: 짙은 강도
    [WeatherCode.DRIZZLE_ICE_LIGHT]: 'https://example.com/icon_drizzle_ice_light.png',  // 얼음 이슬비: 가벼움
    [WeatherCode.DRIZZLE_ICE_HEAVY]: 'https://example.com/icon_drizzle_ice_heavy.png',  // 얼음 이슬비: 짙은 강도
    [WeatherCode.RAIN_LIGHT]: 'https://example.com/icon_rain_light.png',  // 비: 약간
    [WeatherCode.RAIN_MODERATE]: 'https://example.com/icon_rain_moderate.png',  // 비: 보통
    [WeatherCode.RAIN_HEAVY]: 'https://example.com/icon_rain_heavy.png',  // 비: 강함
    [WeatherCode.SLEET_LIGHT]: 'https://example.com/icon_sleet_light.png',  // 빙우: 가벼움
    [WeatherCode.SLEET_HEAVY]: 'https://example.com/icon_sleet_heavy.png',  // 빙우: 강한 강도
    [WeatherCode.SNOW_LIGHT]: 'https://example.com/icon_snow_light.png',  // 눈 내림: 약간
    [WeatherCode.SNOW_MODERATE]: 'https://example.com/icon_snow_moderate.png',  // 눈 내림: 보통
    [WeatherCode.SNOW_HEAVY]: 'https://example.com/icon_snow_heavy.png',  // 눈 내림: 강함
    [WeatherCode.SNOW_PELLETS]: 'https://example.com/icon_snow_pellets.png',  // 눈알
    [WeatherCode.SHOWER_LIGHT]: 'https://example.com/icon_shower_light.png',  // 소나기: 약간
    [WeatherCode.SHOWER_MODERATE]: 'https://example.com/icon_shower_moderate.png',  // 소나기: 보통
    [WeatherCode.SHOWER_HEAVY]: 'https://example.com/icon_shower_heavy.png',  // 소나기: 강함
    [WeatherCode.SNOW_SHOWER_LIGHT]: 'https://example.com/icon_snow_shower_light.png',  // 눈소나기: 약간
    [WeatherCode.SNOW_SHOWER_HEAVY]: 'https://example.com/icon_snow_shower_heavy.png',  // 눈소나기: 많이
    [WeatherCode.THUNDERSTORM_LIGHT]: 'https://example.com/icon_thunderstorm_light.png',  // 뇌우: 약간 또는 중간
    [WeatherCode.THUNDERSTORM_HAIL_LIGHT]: 'https://example.com/icon_thunderstorm_hail_light.png',  // 가벼운 우박을 동반한 뇌우
    [WeatherCode.THUNDERSTORM_HAIL_HEAVY]: 'https://example.com/icon_thunderstorm_hail_heavy.png'  // 강한 우박을 동반한 뇌우
};

module.exports = iconMap;
