function getWeatherCode(openMeteoWeatherCode) {
  return weatherCodeMap[openMeteoWeatherCode];
}

function getWeatherCodeKey(openMeteoWeatherCode) {
  const code = getWeatherCode(openMeteoWeatherCode);

  for (const [key, value] of Object.entries(weatherCode)) {
    if (value === code) {
      return key;
    }
  }
  return weatherCode.SUNNY;
}

function getWeatherIconUrl(openMeteoWeatherCode) {
  return iconMap[getWeatherCode(openMeteoWeatherCode)];
}

const weatherCode = {
  SUNNY: 0, // 맑음
  PARTLY_CLOUDY: 1, // 조금 흐림
  CLOUDY: 2, // 흐림
  RAINY: 3, // 비
  SNOWY: 4, // 눈
};

const iconMap = {
  [weatherCode.SUNNY]: "img/weather/sunny.png",
  [weatherCode.PARTLY_CLOUDY]: "img/weather/partly-cloud.png",
  [weatherCode.CLOUDY]: "img/weather/cloudy.png",
  [weatherCode.RAINY]: "img/weather/rainy.png",
  [weatherCode.SNOWY]: "img/weather/snowy.png",
};

const weatherCodeMap = {
  // 맑음 관련
  0: weatherCode.SUNNY,
  1: weatherCode.SUNNY,
  // 약간 흐림 관련
  2: weatherCode.PARTLY_CLOUDY,
  3: weatherCode.CLOUDY,
  // 안개는 흐림으로 취급
  45: weatherCode.CLOUDY,
  48: weatherCode.CLOUDY,
  // 이슬비, 비 등은 모두 비로 취급
  51: weatherCode.RAINY,
  53: weatherCode.RAINY,
  55: weatherCode.RAINY,
  56: weatherCode.RAINY,
  57: weatherCode.RAINY,
  61: weatherCode.RAINY,
  63: weatherCode.RAINY,
  65: weatherCode.RAINY,
  66: weatherCode.RAINY,
  67: weatherCode.RAINY,
  80: weatherCode.RAINY,
  81: weatherCode.RAINY,
  82: weatherCode.RAINY,
  // 눈과 관련된 코드는 모두 눈으로 취급
  71: weatherCode.SNOWY,
  73: weatherCode.SNOWY,
  75: weatherCode.SNOWY,
  77: weatherCode.SNOWY,
  85: weatherCode.SNOWY,
  86: weatherCode.SNOWY,
  // 뇌우도 비로 간주
  95: weatherCode.RAINY,
  96: weatherCode.RAINY,
  99: weatherCode.RAINY,
};

export { getWeatherCode, getWeatherCodeKey, getWeatherIconUrl };
