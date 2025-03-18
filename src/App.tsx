import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import './App.css';

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Инициализация Telegram WebApp
    WebApp.ready();
    
    // Получение данных пользователя
    if (WebApp.initDataUnsafe.user) {
      setUser(WebApp.initDataUnsafe.user);
    }
    
    // Настройка основной кнопки
    WebApp.MainButton.setText('ГОТОВО');
    WebApp.MainButton.onClick(() => {
      WebApp.showAlert('Вы нажали на основную кнопку!');
    });
  }, []);

  const showMainButton = () => {
    WebApp.MainButton.show();
  };

  const hideMainButton = () => {
    WebApp.MainButton.hide();
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Game Name</h1>
          {user && (
            <div className="user-avatar">
              {/* Аватар пользователя из Telegram, показываем инициалы если нет фото */}
              {user.photo_url ? (
                <img src={user.photo_url} alt={`${user.first_name}'s avatar`} />
              ) : (
                <div className="avatar-placeholder">
                  {user.first_name.charAt(0)}
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <main className="main-content">
        <button className="start-game-button" onClick={() => WebApp.showAlert('Функция запуска игры еще не реализована')}>
          НАЧАТЬ ИГРАТЬ
        </button>
      </main>
    </div>
  );
}

export default App;