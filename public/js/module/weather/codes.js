// weatherCodes.js
const WeatherCode = {
  CLEAR_SKY: 0, // 맑은 하늘
  MAINLY_CLEAR: 1, // 대체로 맑음
  PARTLY_CLOUDY: 2, // 약간 흐림
  CLOUDY: 3, // 흐림
  FOG: 45, // 안개
  FOG_ICE: 48, // 쌓이는 서리 안개
  DRIZZLE_LIGHT: 51, // 이슬비: 가벼움
  DRIZZLE_MODERATE: 53, // 이슬비: 보통
  DRIZZLE_HEAVY: 55, // 이슬비: 짙은 강도
  DRIZZLE_ICE_LIGHT: 56, // 얼음 이슬비: 가벼움
  DRIZZLE_ICE_HEAVY: 57, // 얼음 이슬비: 짙은 강도
  RAIN_LIGHT: 61, // 비: 약간
  RAIN_MODERATE: 63, // 비: 보통
  RAIN_HEAVY: 65, // 비: 강함
  SLEET_LIGHT: 66, // 빙우: 가벼움
  SLEET_HEAVY: 67, // 빙우: 강한 강도
  SNOW_LIGHT: 71, // 눈 내림: 약간
  SNOW_MODERATE: 73, // 눈 내림: 보통
  SNOW_HEAVY: 75, // 눈 내림: 강함
  SNOW_PELLETS: 77, // 눈알
  SHOWER_LIGHT: 80, // 소나기: 약간
  SHOWER_MODERATE: 81, // 소나기: 보통
  SHOWER_HEAVY: 82, // 소나기: 강함
  SNOW_SHOWER_LIGHT: 85, // 눈소나기: 약간
  SNOW_SHOWER_HEAVY: 86, // 눈소나기: 많이
  THUNDERSTORM_LIGHT: 95, // 뇌우: 약간 또는 중간
  THUNDERSTORM_HAIL_LIGHT: 96, // 가벼운 우박을 동반한 뇌우
  THUNDERSTORM_HAIL_HEAVY: 99, // 강한 우박을 동반한 뇌우
};

module.exports = WeatherCode;
