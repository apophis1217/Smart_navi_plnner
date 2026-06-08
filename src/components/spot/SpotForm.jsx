// src/components/spot/SpotForm.jsx
import { useState } from 'react';
import './SpotForm.css'; // ✨ 5단계에서 만든 CSS 파일 로드

export default function SpotForm({ spots, setSpots, currentDay }) {
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("장소 이름을 입력해주세요!");

    // 카카오 장소 검색 객체 생성
    const ps = new window.kakao.maps.services.Places();

    // 키워드로 장소 검색 실행
    ps.keywordSearch(title, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const firstResult = data[0];
        const lat = parseFloat(firstResult.y);
        const lng = parseFloat(firstResult.x);
        const realTitle = firstResult.place_name;

        const newSpot = {
          id: Date.now(),
          day: currentDay,
          title: realTitle,
          memo,
          lat: lat,
          lng: lng,
        };

        setSpots([...spots, newSpot]);
        setTitle('');
        setMemo('');
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다. 정확한 장소명을 입력해주세요!");
      } else {
        alert("장소 검색 중 오류가 발생했습니다.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="spot-form">
      <div className="spot-form-input-container">
        <input
          type="text"
          placeholder="어디로 갈까요? (ex. 명진전복, 성산일출봉)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="spot-form-input-title"
        />
      </div>
      <div className="spot-form-row">
        <input
          type="text"
          placeholder="간단한 메모 (ex. 점심식사)"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="spot-form-input-memo"
        />
        <button type="submit" className="spot-form-submit-btn">
          추가
        </button>
      </div>
    </form>
  );
}