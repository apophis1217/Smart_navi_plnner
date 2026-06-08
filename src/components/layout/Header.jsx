// src/components/layout/Header.jsx
import './Header.css';

export default function Header({ currentDay, setCurrentDay }) {
  const days = [1, 2, 3]; // 최대 3일차까지 선택 가능하도록 설정

  return (
    <header className="header-bar">
      <h1 className="header-logo">📍 스마트 네비 플래너</h1>
      
      <div className="header-tab-container">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setCurrentDay(d)}
            /* ✨ 클래스명 내부의 자바스크립트 주석을 지우고 
              삼항 연산자만 깔끔하게 남겨두어 에러를 방지합니다.
            */
            className={`header-tab-btn ${
              currentDay === d ? 'active' : 'inactive'
            }`}
          >
            {d}일 차
          </button>
        ))}
      </div>
    </header>
  );
}