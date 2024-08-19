export const mapModule = {
  marking: (map, position) => {
    const marker = new naver.maps.Marker({
      position: position,
      map: map,
    });

    naver.maps.Event.addListener(marker, "click", () => {
      map.setCenter(position);
      map.setZoom(14);
    });
  },
  markingTarget: (map, position) => {
    const marker = new naver.maps.Marker({
      position: position,
      map: map,
      icon: {
        url: "img/marker.png",
        size: new naver.maps.Size(30, 30),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 25),
      },
    });

    naver.maps.Event.addListener(marker, "dblclick", () => {
      map.setCenter(position);
      map.setZoom(14);
    });
  },
  setTrafficLayer: (map) => {
    var trafficLayer = new naver.maps.TrafficLayer();
    trafficLayer.setMap(map);
  },
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
};
