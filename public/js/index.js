import { mapModule } from "./module/map/map.js";
import { markerModule } from "./module/map/marker.js";
import { apiModule } from "./module/common/api.js";
import { displayWeatherOnSwiper } from "./module/weather/weather.js";

let map = new naver.maps.Map("map", {
  center: new naver.maps.LatLng(37.5666805, 126.9784147),
  zoom: 6,
});

//이벤트 리스너 등록
document
  .getElementById("traff-btn")
  .addEventListener("click", () => setTrafficLayer(map));

document.getElementById("search-btn").addEventListener("click", handleSearch);

document.getElementById("random-btn").addEventListener("click", handleRandom);

//사용자 현재 위치 표시
initMyLocation();

displayWeatherOnSwiper(37.5666805, 126.9784147);

// Functions

//교통 상황 표시
function setTrafficLayer(map) {
  mapModule.setTrafficLayer(map);
}

//현재 사용자 위치 마커 표시
async function initMyLocation() {
  try {
    const userLocation = await mapModule.getMyLocation();
    let marker = markerModule.marking(map, userLocation);
    naver.maps.Event.addListener(marker, "click", () =>
      mapModule.zoomPosition(map, userLocation)
    );
  } catch (error) {
    console.error("Error occurred while getting location: " + error.message);
  }
}

//검색 조건으로 API request parameter 생성
function generateParamWithSearchCondition() {
  const target = document.getElementById("target").value;
  const regionTag = document.getElementById("regions");
  const subRegionTag = document.getElementById("sub-regions");

  const param = new URLSearchParams({ target: target });

  if (regionTag.selectedIndex !== 0) {
    param.append(
      "address",
      subRegionTag.selectedIndex !== 0 ? subRegionTag.value : regionTag.value
    );
  }
  return param;
}

async function fetchTarget(path) {
  const param = generateParamWithSearchCondition();
  let urn = `${path}?${param.toString()}`;
  return await apiModule.apiGet(urn);
}

function addTargetMarkerEventListeners(marker, infowindow) {
  naver.maps.Event.addListener(marker, "click", () =>
    targetMarkerClickFunction(marker, infowindow)
  );
  naver.maps.Event.addListener(marker, "dblclick", () =>
    mapModule.zoomPosition(map, marker.getPosition())
  );
}

async function targetMarkerClickFunction(marker, infowindow) {
  if (infowindow.getMap()) {
    infowindow.close();
  } else {
    infowindow.open(map, marker);
  }

  var position = marker.getPosition();
  displayWeatherOnSwiper(position.lat(), position.lng());
}

async function handleSearch() {
  markerModule.removeAllMarkers(map);
  const results = await fetchTarget("/search");
  results.forEach((el) => {
    const latLng = new naver.maps.LatLng(el.lat, el.lot);
    let marker = markerModule.markingTarget(map, latLng);
    let infowindow = markerModule.createInfoWindow(el);
    addTargetMarkerEventListeners(marker, infowindow);
  });
}

async function handleRandom() {
  markerModule.removeAllMarkers(map);
  const result = await fetchTarget("/random");
  const latLng = new naver.maps.LatLng(result.lat, result.lot);
  let marker = markerModule.markingTarget(map, latLng);
  let infowindow = markerModule.createInfoWindow(result);
  addTargetMarkerEventListeners(marker, infowindow);
}
