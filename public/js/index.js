import { mapModule } from "./module/map.js";

let map = new naver.maps.Map("map", {
  center: new naver.maps.LatLng(37.5666805, 126.9784147),
  zoom: 6,
});

document.getElementById("traff_btn").addEventListener("click", setTrafficLayer);

initMyLocation();

mapModule.marking(
  map,
  new naver.maps.LatLng(37.5666805, 126.9784147),
  "img/marker.png"
);

async function initMyLocation() {
  try {
    const userLocation = await mapModule.getMyLocation();
    mapModule.marking(map, userLocation);
  } catch (error) {
    console.error("Error occurred while getting location: " + error.message);
  }
}

function setTrafficLayer() {
  mapModule.setTrafficLayer(map);
}
