// src/components/map/MapContainer.jsx
import { useState, useEffect } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import './MapContainer.css';

export default function MapContainer({ spots, currentDay }) {
  // 💡 내 현재 위치 좌표를 저장할 상태 (기본값은 서울역으로 설정)
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.555142, lng: 126.970548 });

  // 현재 날짜에 맞는 장소들만 필터링
  const filteredSpots = spots.filter((spot) => spot.day === currentDay);

  // 선(Polyline)을 그리기 위한 위도/경도 좌표 배열 가공
  const linePath = filteredSpots.map((spot) => ({
    lat: spot.lat,
    lng: spot.lng,
  }));

  // ✨ 컴포넌트가 처음 켜질 때 브라우저 GPS로 내 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 성공적으로 위치를 가져오면 상태 업데이트
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("위치 정보를 가져오는데 실패했습니다.", error);
        }
      );
    }
  }, []);

  // 💡 데이터가 있으면 마지막 등록한 장소, 없으면 '내 현재 위치'를 중심 좌표로 설정
  const mapCenter = filteredSpots.length > 0 
    ? { lat: filteredSpots[filteredSpots.length - 1].lat, lng: filteredSpots[filteredSpots.length - 1].lng }
    : currentLocation;

  return (
    <main className="map-main-panel">
      <Map
        center={mapCenter}
        style={{ width: "100%", height: "100vh" }}
        level={5}
      >
        {/* 1. 마커 무리 렌더링 */}
        {filteredSpots.map((spot, index) => (
          <MapMarker
            key={spot.id}
            position={{ lat: spot.lat, lng: spot.lng }}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
              size: { width: 36, height: 37 },
              options: {
                spriteSize: { width: 36, height: 691 },
                spriteOrigin: { x: 0, y: index * 46 },
              },
            }}
          />
        ))}

        {/* 2. 장소와 장소를 이어주는 동선 실선 그리기 */}
        {linePath.length > 1 && (
          <Polyline
            path={linePath}
            strokeWeight={4}
            strokeColor="#3b82f6"
            strokeOpacity={0.8}
            strokeStyle="solid"
          />
        )}
      </Map>
    </main>
  );
}