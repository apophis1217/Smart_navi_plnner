// src/components/spot/SpotItem.jsx
import './SpotItem.css'; // ✨ 1단계에서 만든 CSS 파일 로드

export default function SpotItem({ spot, index, onDelete }) {
  return (
    <div className="spot-item-card">
      {/* 왼쪽 영역: 번호 배지와 텍스트 가로 정렬 */}
      <div className="spot-item-left">
        {/* 순번 표시 배지 */}
        <span className="spot-item-badge">
          {index + 1}
        </span>
        
        {/* 장소명과 메모 */}
        <div className="spot-item-text">
          <h4 className="spot-item-title">{spot.title}</h4>
          {spot.memo && <p className="spot-item-memo">{spot.memo}</p>}
        </div>
      </div>

      {/* 오른쪽 영역: 삭제 버튼 */}
      <button 
        onClick={() => onDelete(spot.id)}
        className="spot-item-delete-btn"
      >
        ❌
      </button>
    </div>
  );
}