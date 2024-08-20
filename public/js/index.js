import { mapModule } from "./module/map/map.js";
import { markerModule } from "./module/map/marker.js";
import { apiModule } from "./module/common/api.js";
import { displayWeatherOnSwiper } from "./module/weather/weather.js";

let map = new naver.maps.Map("map", {
  center: new naver.maps.LatLng(37.5666805, 126.9784147),
  zoom: 6,
});

//이벤트 리스너 등록
document.getElementById("traff-btn").addEventListener("click", setTrafficLayer);

document.getElementById("search-btn").addEventListener("click", async () => {
  markerModule.removeAllMarkers(map);

  const result = fetchTarget("/search");

  result.forEach((el) => {
    const latLng = new naver.maps.LatLng(el.lat, el.lot);
    let marker = markerModule.markingTarget(map, latLng);
    addTartgetMarkerEventListeners(marker);
  });
});
document.getElementById("random-btn").addEventListener("click", async () => {
  markerModule.removeAllMarkers(map);

  const result = fetchTarget("/random");

  const latLng = new naver.maps.LatLng(result.lat, result.lot);
  let marker = markerModule.markingTarget(map, latLng);
  addTartgetMarkerEventListeners(marker);
});

//사용자 현재 위치 표시
initMyLocation();

displayWeatherOnSwiper(39.5666805, 126.9784147);

// todo: 코드 정리 방법 물어보기
//==============================================================//
//==========================Function============================//
//==============================================================//

//교통 상황 표시
function setTrafficLayer() {
  mapModule.setTrafficLayer(map);
}

//현재 사용자 위치 마커 표시
async function initMyLocation() {
  try {
    const userLocation = await mapModule.getMyLocation();
    let marker = markerModule.marking(map, userLocation);
    naver.maps.Event.addListener(
      marker,
      "click",
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

  if (regionTag.selectedIndex != 0 && subRegionTag.selectedIndex == 0) {
    param.append("address", regionTag.value);
  }
  if (regionTag.selectedIndex != 0 && subRegionTag.selectedIndex != 0) {
    param.append("address", subRegionTag.value);
  }
  return param;
}

async function fetchTarget(path) {
  const param = generateParamWithSearchCondition();
  let urn = path + "?" + param.toString();
  return await apiModule.apiGet(urn);
}

function addTartgetMarkerEventListeners(marker) {
  naver.maps.Event.addListener(
    marker,
    "click",
    targetMarkerClickFunction(marker)
  );
  naver.maps.Event.addListener(
    marker,
    "dblclick",
    mapModule.zoomPosition(map, userLocation)
  );
}

async function targetMarkerClickFunction(marker) {
  //todo: 팝업 띄우기

  var position = marker.getPosition();
  var lat = position.lat();
  var lng = position.lng();

  displayWeatherOnSwiper(lat, lng);
}
