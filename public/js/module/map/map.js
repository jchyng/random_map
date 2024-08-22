export const mapModule = {
  getMyLocation: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          resolve(currentPosition);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    });
  },

  zoomPosition: (map, position, zoomLevel = 14) => {
    if (!map || !position) {
      console.error("Invalid map or position");
      return;
    }
    map.setCenter(position);
    map.setZoom(zoomLevel);
  },

  setTrafficLayer: (() => {
    let trafficLayer = null;
    return (map) => {
      if (!map) {
        console.error("Invalid map");
        return;
      }
      if (!trafficLayer) {
        trafficLayer = new naver.maps.TrafficLayer();
      }
      trafficLayer.setMap(trafficLayer.getMap() ? null : map);
    };
  })(),
};
