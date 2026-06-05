# TalentMind Landing Page

Одностраничный лендинг ИИ-платформы TalentMind. Готов к деплою на [Vercel](https://vercel.com).

## Локальный запуск

```bash
npm install
npm run dev
```

Или просто откройте `index.html` в браузере.

## Деплой на Vercel

### Вариант 1: через сайт (рекомендуется)

1. Залейте репозиторий на GitHub.
2. Откройте [vercel.com/new](https://vercel.com/new).
3. Импортируйте репозиторий.
4. Настройки оставьте по умолчанию (Vercel подхватит `vercel.json`):
   - **Framework Preset:** Other
   - **Build Command:** пусто
   - **Output Directory:** `.`
5. Нажмите **Deploy**.

### Вариант 2: через CLI

```bash
npm i -g vercel
vercel login
vercel
```

Для продакшена:

```bash
vercel --prod
```

## Структура проекта

```
├── index.html      # Главная страница
├── styles.css      # Стили
├── script.js       # Интерактив (чат, табы, меню)
├── vercel.json     # Конфигурация Vercel
├── package.json    # Скрипты для локальной разработки
└── .gitignore
```

## Блоки лендинга

1. Hero — главный экран с мокапом ЛК
2. Проблема — цена ошибки найма
3. Решение — 3 шага + 3 столпа
4. ИИ-Ассистент — интерактивный чат
5. Отчёт — карточка кандидата с табами
6. ROI — метрики до/после
7. Безопасность — 152-ФЗ, On-Premise
8. Тарифы — 4 тарифные карточки
9. Контакты и футер
