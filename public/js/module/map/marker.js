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
  createInfoWindow: (targetData) => {
    return new naver.maps.InfoWindow({
      content: `
        <div style="padding:10px;width:200px;">
          <h3>${targetData.name}</h3>
          <p>주소: ${targetData.address}</p>
          ${targetData.altitude ? `<p>고도: ${targetData.altitude}m</p>` : ""}
          <p>위도: ${targetData.lat}</p>
          <p>경도: ${targetData.lot}</p>
        </div>
      `,
    });
  },
};
