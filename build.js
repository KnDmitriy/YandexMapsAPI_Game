const fs = require('fs');
const path = require('path');

require('dotenv').config();

// Список файлов для обработки
const htmlFiles = ['index.html', 'auth.html', 'login.html'];
const jsFiles = ['src/index.js'];

// Функция замены Firebase конфигурации
function replaceFirebaseConfig(html) {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

  // Проверяем наличие всех переменных
  const missing = Object.entries(config).filter(([key, value]) => !value);
  if (missing.length > 0) {
    console.error(`❌ Missing Firebase env variables: ${missing.map(([k]) => k).join(', ')}`);
    process.exit(1);
  }

  // Заменяем плейсхолдеры на реальные значения из .env
  let updated = html;
  updated = updated.replace(/\{\{FIREBASE_API_KEY\}\}/g, config.apiKey);
  updated = updated.replace(/\{\{FIREBASE_AUTH_DOMAIN\}\}/g, config.authDomain);
  updated = updated.replace(/\{\{FIREBASE_PROJECT_ID\}\}/g, config.projectId);
  updated = updated.replace(/\{\{FIREBASE_STORAGE_BUCKET\}\}/g, config.storageBucket);
  updated = updated.replace(/\{\{FIREBASE_MESSAGING_SENDER_ID\}\}/g, config.messagingSenderId);
  updated = updated.replace(/\{\{FIREBASE_APP_ID\}\}/g, config.appId);
  updated = updated.replace(/\{\{FIREBASE_MEASUREMENT_ID\}\}/g, config.measurementId);

  return updated;
}

// Обрабатываем каждый HTML файл
let hasErrors = false;

htmlFiles.forEach(file => {
  const htmlPath = path.join(__dirname, file);
  if (!fs.existsSync(htmlPath)) {
    console.warn(`⚠️  File ${file} not found, skipping...`);
    return;
  }

  let html = fs.readFileSync(htmlPath, 'utf8');
  let updated = false;

  // Заменяем Yandex Maps API ключ (если есть в файле)
  const apiKey = process.env.YANDEX_MAPS_API_KEY;
  if (apiKey && html.includes('api-maps.yandex.ru')) {
    const beforeYandex = html;
    html = html.replace(
      /https:\/\/api-maps\.yandex\.ru\/2\.1\/\?apikey=[^&"']+/,
      `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}`
    );
    if (beforeYandex !== html) {
      updated = true;
    }
  }

  // Заменяем Firebase конфигурацию (если есть в файле)
  if (html.includes('firebaseConfig') || html.includes('{{FIREBASE_API_KEY}}')) {
    const beforeFirebase = html;
    html = replaceFirebaseConfig(html);
    if (beforeFirebase !== html) {
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`✅ Updated ${file}`);
  } else {
    console.log(`ℹ️  No changes needed in ${file}`);
  }
});

// Обрабатываем JS файлы
jsFiles.forEach(file => {
  const jsPath = path.join(__dirname, file);
  if (!fs.existsSync(jsPath)) {
    console.warn(`⚠️  File ${file} not found, skipping...`);
    return;
  }

  let js = fs.readFileSync(jsPath, 'utf8');
  let updated = false;

  // Заменяем Firebase конфигурацию (если есть плейсхолдеры)
  if (js.includes('{{FIREBASE_API_KEY}}')) {
    const beforeFirebase = js;
    js = replaceFirebaseConfig(js);
    if (beforeFirebase !== js) {
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(jsPath, js, 'utf8');
    console.log(`✅ Updated ${file}`);
  } else {
    console.log(`ℹ️  No changes needed in ${file}`);
  }
});

// Проверяем Yandex Maps API ключ
if (!process.env.YANDEX_MAPS_API_KEY) {
  console.warn('⚠️  YANDEX_MAPS_API_KEY not found in .env');
  hasErrors = true;
}

if (hasErrors) {
  console.error('❌ Build completed with warnings');
  process.exit(1);
} else {
  console.log('✅ All files updated successfully!');
}
