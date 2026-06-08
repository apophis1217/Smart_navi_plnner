// src/App.jsx
import { useState, useEffect } from 'react';
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import MapContainer from "./components/map/MapContainer";
import './App.css'; // ✨ 13단계에서 수정한 CSS 파일 연결

export default function App() {
  // LocalStorage에서 기존 데이터 불러오기 (없으면 빈 배열)
  const [spots, setSpots] = useState(() => {
    const savedSpots = localStorage.getItem('travel_spots');
    return savedSpots ? JSON.parse(savedSpots) : [];
  });

  // 현재 유저가 선택한 여행 일차 (기본값: 1일차)
  const [currentDay, setCurrentDay] = useState(1);

  // spots 상태가 바뀔 때마다 LocalStorage에 자동 저장
  useEffect(() => {
    localStorage.setItem('travel_spots', JSON.stringify(spots));
  }, [spots]);

  return (
    <div className="app-container">
      {/* 1. 상단 헤더 구역 */}
      <Header currentDay={currentDay} setCurrentDay={setCurrentDay} />

      {/* 2. 메인 콘텐츠 구역 (사이드바 + 지도 가로 배치) */}
      <div className="app-main-content">
        {/* 좌측 사이드바 패널 */}
        <Sidebar 
          spots={spots} 
          setSpots={setSpots} 
          currentDay={currentDay} 
        />
        
        {/* 우측 지도 패널 */}
        <MapContainer 
          spots={spots} 
          currentDay={currentDay} 
        />
      </div>
    </div>
  );
}