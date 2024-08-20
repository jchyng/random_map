export const markerModule = {
  removeAllMarkers: (map) => {
    const markers = map.markers || [];
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    map.markers = [];
  },
  marking: (map, position) => {
    const marker = new naver.maps.Marker({
      position: position,
      map: map,
    });

    if (!map.markers) map.markers = [];
    map.markers.push(marker);

    return marker;
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

    if (!map.markers) map.markers = [];
    map.markers.push(marker);

    return marker;
  },
};
