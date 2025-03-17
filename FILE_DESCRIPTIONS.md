# Описание файлов проекта

## Основные файлы

### index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Настройки страницы -->
    <meta charset="UTF-8" /> <!-- Поддержка русского и других языков -->
    <meta name="viewport" content="width=device-width..." /> <!-- Настройки для мобильных устройств -->
    <title>Telegram Mini App</title>
    <!-- Подключаем скрипт Telegram -->
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
  </head>
  <body>
    <div id="root"></div> <!-- Сюда React вставит всё приложение -->
    <script type="module" src="/src/main.tsx"></script> <!-- Подключаем наше приложение -->
  </body>
</html>
```

### package.json
```json
{
  "name": "tg-mini-app", // Название проекта
  "version": "1.0.0", // Версия
  "scripts": {
    "dev": "vite", // Команда для разработки: npm run dev
    "build": "tsc && vite build", // Команда для сборки: npm run build
    "preview": "vite preview" // Команда для предпросмотра: npm run preview
  },
  "dependencies": { // Основные библиотеки
    "@twa-dev/sdk": "^6.9.0", // Для работы с Telegram
    "react": "^18.2.0", // Сам React
    "react-dom": "^18.2.0" // Для работы React в браузере
  },
  "devDependencies": { // Библиотеки для разработки
    "@types/react": "^18.2.15", // Типы для React
    "@vitejs/plugin-react": "^4.0.3", // Поддержка React в Vite
    "typescript": "^5.0.2", // TypeScript
    "vite": "^4.4.5" // Инструмент сборки
  }
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020", // Версия JavaScript на выходе
    "jsx": "react-jsx", // Поддержка React
    "strict": true, // Строгая проверка типов
    // ... другие технические настройки TypeScript
  }
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Подключаем поддержку React
  base: './', // Путь к файлам (важно для деплоя)
  build: {
    outDir: 'dist', // Куда складывать готовое приложение
    assetsDir: 'assets' // Куда складывать картинки и другие файлы
  }
});
```

## Папка src (исходный код)

### main.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Создаём React-приложение и прикрепляем его к div#root
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App /> {/* Наше главное приложение */}
  </React.StrictMode>
);
```

### App.tsx
```typescript
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

function App() {
  // Храним данные пользователя
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Говорим Telegram, что приложение готово
    WebApp.ready();
    
    // Получаем данные пользователя из Telegram
    if (WebApp.initDataUnsafe.user) {
      setUser(WebApp.initDataUnsafe.user);
    }
    
    // Настраиваем главную кнопку в Telegram
    WebApp.MainButton.setText('ГОТОВО');
    WebApp.MainButton.onClick(() => {
      WebApp.showAlert('Вы нажали на основную кнопку!');
    });
  }, []);

  // Функции для работы с кнопкой
  const showMainButton = () => WebApp.MainButton.show();
  const hideMainButton = () => WebApp.MainButton.hide();

  return (
    <div className="app">
      <header>
        <h1>Telegram Mini App</h1>
        {/* Показываем имя пользователя, если оно есть */}
        {user && <p>Привет, {user.first_name}!</p>}
      </header>
      <main>
        {/* Кнопки для управления */}
        <button onClick={showMainButton}>Показать основную кнопку</button>
        <button onClick={hideMainButton}>Скрыть основную кнопку</button>
        <button onClick={() => WebApp.showAlert('Это тестовое уведомление')}>
          Показать уведомление
        </button>
      </main>
    </div>
  );
}
```

### index.css
```css
:root {
  /* Основные настройки шрифтов и цветов */
  font-family: system-ui, -apple-system, ...; /* Системные шрифты */
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  display: flex;
  min-width: 320px;
  min-height: 100vh;
  /* Используем цвета из Telegram */
  background-color: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
}

button {
  /* Стили для кнопок */
  background-color: var(--tg-theme-button-color, #2481cc);
  color: var(--tg-theme-button-text-color, #ffffff);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
}
```

### types.d.ts
```typescript
declare module '@twa-dev/sdk' {
  // Описание типов данных пользователя Telegram
  interface WebAppUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    // ... другие поля
  }

  // Описание API для работы с Telegram
  interface WebApp {
    ready: () => void; // Сообщить что приложение готово
    showAlert: (message: string) => void; // Показать сообщение
    MainButton: {
      setText: (text: string) => void; // Установить текст кнопки
      show: () => void; // Показать кнопку
      hide: () => void; // Скрыть кнопку
      // ... другие методы
    };
    // ... другие функции
  }
}
```

## Как всё это работает вместе

1. Когда пользователь открывает мини-приложение в Telegram:
   - Загружается `index.html`
   - Telegram внедряет свой SDK через `telegram-web-app.js`
   - Загружается наше приложение через `main.tsx`

2. В `main.tsx`:
   - Создаётся React-приложение
   - Подключаются стили из `index.css`
   - Запускается компонент `App`

3. В `App.tsx`:
   - Приложение сообщает Telegram что оно готово (`WebApp.ready()`)
   - Получает данные пользователя
   - Настраивает главную кнопку
   - Отображает интерфейс с кнопками управления

4. Стили из `index.css`:
   - Используют цвета темы Telegram через переменные `--tg-theme-*`
   - Настраивают внешний вид кнопок и текста
   - Делают приложение адаптивным для разных экранов

5. Когда пользователь нажимает на кнопки:
   - Вызываются функции из SDK Telegram
   - Показываются/скрываются элементы интерфейса
   - Отправляются данные в Telegram

## Папка public

- Здесь хранятся статические файлы (картинки, иконки и т.д.), которые не требуют обработки при сборке.

## Папка node_modules

- Содержит все установленные зависимости (библиотеки). Создается автоматически при выполнении `npm install`. Не нужно редактировать вручную.

## Папка dist (появится после сборки)

- Содержит готовое к публикации приложение после выполнения команды `npm run build`. Именно эти файлы нужно загружать на хостинг.

## Как работает приложение

1. Когда пользователь открывает приложение, загружается **index.html**
2. В нем подключается скрипт **main.tsx**, который запускает React-приложение
3. Основная логика находится в **App.tsx** - там обрабатываются данные из Telegram и отображается интерфейс
4. Стили из **index.css** определяют внешний вид приложения
5. Библиотека **@twa-dev/sdk** обеспечивает взаимодействие с Telegram 