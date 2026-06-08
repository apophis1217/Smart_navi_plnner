// src/components/layout/Sidebar.jsx
import SpotForm from '../spot/SpotForm';
import SpotList from '../spot/SpotList';
import './Sidebar.css'; // ✨ 7단계에서 만든 CSS 파일 로드

export default function Sidebar({ spots, setSpots, currentDay }) {
  return (
    <aside className="sidebar-panel">
      {/* 장소 입력 양식 */}
      <SpotForm spots={spots} setSpots={setSpots} currentDay={currentDay} />
      
      {/* 장소 리스트 영역 */}
      <div className="sidebar-content">
        <h3 className="sidebar-title">
          {currentDay}일 차 이동 경로
        </h3>
        <SpotList spots={spots} setSpots={setSpots} currentDay={currentDay} />
      </div>
    </aside>
  );  
}