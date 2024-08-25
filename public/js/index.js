import { mapModule } from "./module/map/map.js";
import { markerModule } from "./module/map/marker.js";
import { apiModule } from "./module/common/api.js";
import { displayWeatherOnSwiper } from "./module/weather/weather.js";

let map = new naver.maps.Map("map", {
  center: new naver.maps.LatLng(37.5666805, 126.9784147),
  zoom: 6,
});

let currentInfoWindow = null;

//이벤트 리스너 등록
document
  .getElementById("traff-btn")
  .addEventListener("click", () => setTrafficLayer(map));

document.getElementById("search-btn").addEventListener("click", handleSearch);

document.getElementById("random-btn").addEventListener("click", handleRandom);

//사용자 현재 위치 표시
initMyLocation();

// Functions

function initMap() {
  map.setZoom(6);
  map.center(new naver.maps.LatLng(37.5666805, 126.9784147));
}

//교통 상황 표시
function setTrafficLayer(map) {
  mapModule.setTrafficLayer(map);
}

//현재 사용자 위치 마커 표시
async function initMyLocation() {
  try {
    const userLocation = await mapModule.getMyLocation();
    const marker = markerModule.marking(map, userLocation);
    const infowindow = new naver.maps.InfoWindow({
      content: "<h4 style='padding: 4px'>현재 위치</h4>",
    });
    addMarkerEventListeners(marker, infowindow);
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

async function markerClickFunction(marker, infowindow) {
  if (infowindow.getMap()) {
    infowindow.close();
  } else {
    infowindow.open(map, marker);
  }
  currentInfoWindow = infowindow;

  var position = marker.getPosition();
  displayWeatherOnSwiper(position.lat(), position.lng());
}

async function handleSearch() {
  if (currentInfoWindow) {
    currentInfoWindow.close();
  }

  markerModule.removeAllMarkers(map);
  const results = await fetchTarget("/search");
  for (let i = 0; i < results.length - 1; i++) {
    handleCommon(results[i]);
  }
  let { marker, infowindow } = handleCommon(results[results.length - 1]);
  initMap();
}

async function handleRandom() {
  markerModule.removeAllMarkers(map);
  const result = await fetchTarget("/random");
  let { marker, infowindow } = handleCommon(result);
  markerClickFunction(marker, infowindow);
  initMap();
}

function handleCommon(result) {
  const latLng = new naver.maps.LatLng(result.lat, result.lot);
  const marker = markerModule.markingTarget(map, latLng);
  const infowindow = createTargetInfoWindows(result);
  addMarkerEventListeners(marker, infowindow);

  return { marker, infowindow };
}

function createTargetInfoWindows(targetData) {
  return new naver.maps.InfoWindow({
    content: `
      <div style="padding:4px">
        <h4>${targetData.name}</h4>
        ${targetData.altitude ? `<p>고도: ${targetData.altitude}m</p>` : ""}
      </div>
    `,
  });
}

function addMarkerEventListeners(marker, infowindow) {
  naver.maps.Event.addListener(marker, "click", () =>
    markerClickFunction(marker, infowindow)
  );
  naver.maps.Event.addListener(marker, "dblclick", () =>
    mapModule.zoomPosition(map, marker.getPosition())
  );
}
