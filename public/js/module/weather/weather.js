import { getWeatherCodeKey, getWeatherIconUrl } from "./weatherIcons.js";
import { createSwiper, destorySwiper } from "../common/swiper.js";

async function getWeatherForecast(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto&forecast_days=7`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.daily.time.map((date, index) => ({
      date: date,
      maxTemp: data.daily.temperature_2m_max[index],
      minTemp: data.daily.temperature_2m_min[index],
      precipitation: data.daily.precipitation_sum[index],
      iconUrl: getWeatherIconUrl(data.daily.weathercode[index]),
      weatherType: getWeatherCodeKey(data.daily.weathercode[index]),
    }));
  } catch (error) {
    console.error("날씨 정보를 가져오는 데 실패했습니다:", error);
    return null;
  }
}

async function displayWeatherOnSwiper(latitude, longitude) {
  const forecastData = await getWeatherForecast(latitude, longitude);

  if (!forecastData) {
    console.error("날씨 데이터를 불러오지 못했습니다.");
    return;
  }

  destorySwiper();
  const swiper = createSwiper();
  forecastData.forEach((day) => {
    swiper.appendSlide(`
      <div class="swiper-slide ${day.weatherType.toLowerCase()}">
        <img src="${day.iconUrl}" alt="날씨 아이콘">
        <p>${day.date}</p>
        <p>${day.minTemp}℃ ~ ${day.maxTemp}℃</p>
        <p>${day.precipitation}mm</p>
      </div>
    `);
    //todo: 눈, 비 일때만 강수량 추가
    //tood: 날씨에 따라 날씨 카드 배경색 변경
  });
}

export { getWeatherForecast, displayWeatherOnSwiper };
