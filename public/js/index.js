import { mapModule } from "./module/map.js";
import { apiModule } from "./module/common/api.js";

let map = new naver.maps.Map("map", {
  center: new naver.maps.LatLng(37.5666805, 126.9784147),
  zoom: 6,
});

//이벤트 리스너 등록
document.getElementById("traff-btn").addEventListener("click", setTrafficLayer);
document.getElementById("search-btn").addEventListener("click", async () => {
  mapModule.removeAllMarkers(map);
  const param = generateParamWithSearchCondition();
  let urn = "/search?" + param.toString();
  const result = await apiModule.apiGet(urn);

  result.forEach((el) => {
    mapModule.markingTarget(map, new naver.maps.LatLng(el.lat, el.lot));
  });
});
document.getElementById("random-btn").addEventListener("click", async () => {
  mapModule.removeAllMarkers(map);
  const param = generateParamWithSearchCondition();
  let urn = "/random?" + param.toString();
  const result = await apiModule.apiGet(urn);

  mapModule.markingTarget(map, new naver.maps.LatLng(result.lat, result.lot));
});

//사용자 현재 위치 표시
initMyLocation();

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
    mapModule.marking(map, userLocation);
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
