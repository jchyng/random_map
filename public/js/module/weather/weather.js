import { getWeatherCodeKey, getWeatherIconUrl } from "./weatherIcons.js";
import { createSwiper, destroySwiper } from "../common/swiper.js";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

async function getWeatherForecast(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto&forecast_days=7`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.daily.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString(),
      maxTemp: Math.round(data.daily.temperature_2m_max[index]),
      minTemp: Math.round(data.daily.temperature_2m_min[index]),
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
  destroySwiper();
  const swiper = createSwiper();
  forecastData.forEach((day) => {
    const date = new Date(day.date);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const showPrecipitation = ["rainy", "snowy"].includes(
      day.weatherType.toLowerCase()
    );
    swiper.appendSlide(`
      <div class="swiper-slide ${day.weatherType.toLowerCase()}">
      <p class="date-of-week">${day.date}(${dayOfWeek})</p>
        <img class="weather-icon" src="${day.iconUrl}" alt="날씨 아이콘">
        <p class="temperature max"><span class="temperature-text">최고</span> ${
          day.maxTemp
        }℃</p>
        <p class="temperature min"><span class="temperature-text">최저</span> ${
          day.minTemp
        }℃</p>
        ${
          showPrecipitation
            ? `<p class="rainfall">💧${day.precipitation}mm</p>`
            : ""
        }
      </div>
    `);
  });
}

export { getWeatherForecast, displayWeatherOnSwiper };
