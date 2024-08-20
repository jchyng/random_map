export const mapModule = {
  getMyLocation: () => {
    return new Promise((resolve, reject) => {
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
          enableHighAccuracy: true, // 높은 정확도 요청
          timeout: 5000, // 타임아웃 설정
          maximumAge: 0, // 캐시된 위치 정보 사용 안함
        }
      );
    });
  },
  zoomPosition: (map, position, zoomLevel = 14) => {
    map.setCenter(position);
    map.setZoom(zoomLevel);
  },
  setTrafficLayer: (map) => {
    var trafficLayer = new naver.maps.TrafficLayer();
    trafficLayer.setMap(map);
  },
};
