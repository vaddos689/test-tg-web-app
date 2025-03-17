import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

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
        <h1>Telegram Mini App</h1>
        {user && (
          <div className="user-info">
            <p>Привет, {user.first_name}!</p>
          </div>
        )}
      </header>
      <main>
        <div className="button-container">
          <button onClick={showMainButton}>Показать основную кнопку</button>
          <button onClick={hideMainButton}>Скрыть основную кнопку</button>
          <button onClick={() => WebApp.showAlert('Это тестовое уведомление')}>
            Показать уведомление
          </button>
        </div>
      </main>
    </div>
  );
}

export default App; 