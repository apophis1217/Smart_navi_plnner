// src/components/spot/SpotList.jsx
import SpotItem from './SpotItem';
import './SpotList.css'; // ✨ 3단계에서 만든 CSS 파일 로드

export default function SpotList({ spots, setSpots, currentDay }) {
  // 전체 장소 중 현재 일차(day)에 해당하는 장소만 필터링합니다.
  const filteredSpots = spots.filter((spot) => spot.day === currentDay);

  const handleDelete = (id) => {
    setSpots(spots.filter((spot) => spot.id !== id));
  };

  if (filteredSpots.length === 0) {
    return <p className="spot-list-empty">등록된 장소가 없습니다.</p>;
  }

  return (
    <div className="spot-list-container">
      {filteredSpots.map((spot, index) => (
        <SpotItem 
          key={spot.id} 
          spot={spot} 
          index={index} 
          onDelete={handleDelete} 
        />
      ))}
    </div>
  );
}