# Угадай достопримечательность Саратова

Интерактивная игра на основе Yandex Maps API: пользователю показывается панорама достопримечательности Саратова, а задача — кликнуть на карте как можно ближе к реальному месту.  
Приложение использует Firebase для аутентификации пользователей и хранения данных, а также переменные окружения из `.env` для секретных ключей.

---

## Стек технологий

- HTML, CSS, JavaScript
- Yandex Maps API
- Firebase (Auth, Firestore)
- Node.js (скрипт сборки)
- `dotenv` для работы с `.env`

---
<img width="1406" height="762" alt="Снимок экрана 2026-02-06 в 16 38 54" src="https://github.com/user-attachments/assets/044154f5-e0ec-4822-b3cd-aff749d3849b" />

<img width="1239" height="748" alt="Снимок экрана 2026-02-06 в 16 39 40" src="https://github.com/user-attachments/assets/8f7bec32-bf90-4c33-bf77-e38b320f486f" />

<img width="516" height="457" alt="Снимок экрана 2026-02-06 в 16 40 19" src="https://github.com/user-attachments/assets/f31ec5e3-b884-4615-b449-98cd2d2d9321" />


## Структура проекта

Основные файлы:

- `index.html` — основное приложение с картой и игрой
- `auth.html` — страница регистрации
- `login.html` — страница входа
- `script.js` — логика игры с картой
- `src/index.js` — инициализация Firebase (модульный JS)
- `build.js` — Node.js-скрипт сборки: подставляет значения из `.env` вместо плейсхолдеров
- `.gitignore` — исключает `node_modules`, `.env` и служебные файлы
- `package.json` — зависимости и npm-скрипты

---

## Переменные окружения

Все секреты хранятся в `.env` и не коммитятся в репозиторий.

Создайте файл `.env` в корне проекта и добавьте:

```env
# Yandex Maps
YANDEX_MAPS_API_KEY=ВАШ_КЛЮЧ_YANDEX_MAPS

# Firebase
FIREBASE_API_KEY=ВАШ_FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN=ВАШ_FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID=ВАШ_FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET=ВАШ_FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID=ВАШ_FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID=ВАШ_FIREBASE_APP_ID
FIREBASE_MEASUREMENT_ID=ВАШ_FIREBASE_MEASUREMENT_ID
```

> В исходниках используются только плейсхолдеры вида `{{YANDEX_MAPS_API_KEY}}` и `{{FIREBASE_*}}`.  
> Реальные значения подставляются на этапе сборки из `.env`.

---

## Установка и запуск

### 1. Установить зависимости

```bash
npm install
```

### 2. Настроить `.env`

Создайте `.env` (см. раздел выше) и вставьте свои ключи Yandex и Firebase.

### 3. Выполнить сборку

```bash
npm run build
```

Скрипт `build.js`:

- читает значения из `.env`
- заменяет плейсхолдеры:
  - в `index.html`, `auth.html`, `login.html`
  - в `src/index.js`
- подставляет реальные ключи Yandex Maps и Firebase

После успешного выполнения команды в консоли будет:

```text
✅ Updated index.html
✅ Updated auth.html
✅ Updated login.html
✅ Updated src/index.js
✅ All files updated successfully!
```

### 4. Запуск приложения локально

После `npm run build` откройте `index.html` в браузере (двойной клик или «Open With…»).
