### Hexlet tests and linter status:
[![Actions Status](https://github.com/mikitasazan/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/mikitasazan/frontend-project-11/actions)

# RSS агрегатор

Веб-приложение, которое добавляет RSS-ленты по ссылке, парсит их и
показывает списком фиды и посты; клик по «Просмотр» открывает пост в
модальном окне и отмечает его как прочитанный.

## Стек

Webpack 5, Babel, JavaScript (ES modules), Axios (запросы через прокси
`allorigins.hexlet.app`), встроенный `DOMParser` для разбора RSS/XML,
Bootstrap 5.

## Установка и запуск

```bash
make install
make develop   # dev-сервер с хот-релоадом
```

Продакшен-сборка через собственный webpack-конфиг репозитория:

```bash
make build     # собирает dist/
npx serve dist # или любой статический сервер
```

Автопроверка Hexlet (`hexlet-check`) собирает и запускает проект своим
собственным Vite-пайплайном поверх исходников (`index.html` + `src/`), в
обход `webpack.config.js` этого репозитория — оставьте
`<script type="module" src="/src/index.js">` в `index.html`, это точка
входа, которую ищет её Vite-сборка.

## Использование

Вставьте ссылку на RSS-ленту в поле ввода и нажмите «Добавить». Пример для
проверки: `https://lorem-rss.hexlet.app/feed`. Приложение проверяет URL,
запрещает повторное добавление той же ленты, парсит фид и показывает
списком фиды (слева) и посты (справа). Клик по «Просмотр» у поста открывает
модальное окно с текстом и ссылкой на полную статью и отмечает пост
прочитанным.
