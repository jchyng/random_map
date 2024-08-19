import { mapModule } from "./module/map.js";
import { apiModule } from "./module/common/api.js";

let map = new naver.maps.Map("map", {
  center: new naver.maps.LatLng(37.5666805, 126.9784147),
  zoom: 6,
});

document.getElementById("traff-btn").addEventListener("click", setTrafficLayer);
document.getElementById("search-btn").addEventListener("click", async () => {
  const param = generateParamWithSearchCondition();
  let urn = "/search?" + param.toString();
  const result = await apiModule.apiGet(urn);

  result.forEach((el) => {
    mapModule.markingTarget(map, new naver.maps.LatLng(el.lat, el.lot));
  });
});
document.getElementById("random-btn").addEventListener("click", async () => {
  const param = generateParamWithSearchCondition();
  let urn = "/random?" + param.toString();
  const result = await apiModule.apiGet(urn);

  mapModule.markingTarget(map, new naver.maps.LatLng(result.lat, result.lot));
});

initMyLocation();

function setTrafficLayer() {
  mapModule.setTrafficLayer(map);
}

async function initMyLocation() {
  try {
    const userLocation = await mapModule.getMyLocation();
    mapModule.marking(map, userLocation);
  } catch (error) {
    console.error("Error occurred while getting location: " + error.message);
  }
}

function generateParamWithSearchCondition() {
  const target = document.getElementById("target").value;
  const regionTag = document.getElementById("regions");
  const subRegionTag = document.getElementById("sub-regions");

  const param = new URLSearchParams({ target: target });
  if (regionTag.selectedIndex != 0) {
    param.append("region", regionTag.value);
  }
  if (subRegionTag.selectedIndex != 0) {
    param.append("subRegion", subRegionTag.value);
  }
  return param;
}
