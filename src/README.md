# Проект 4: Место

* [Ссылка на сайт на github pages](https://alekseimakhov.github.io/mesto/dist/index.html)

### Технологии

Для реализации адаптивности сайта применена технология медиазапросов для брейкпойнтов ширины экрана 620px, 920px. Применены технологии grid layout, flexbox.

Логика отображения/скрытия окна формы редактирования профиля реализована путем добавления/удаления модификатора со свойством _display: none_ элементу, на котором расположена форма редактирования.

##### Доработка в 5 спирнте:

1. Добавлена всплывающая форма добавления карточки (название + ссылка на изображение),
2. Добавлен функционал удаления карточки,
3. Добавлен функционал на кнопку "лайк",
4. Добавлено всплывающее окно с отображением полного изображения по клику на карточку.

##### Доработка в 6 спринте:

1. Добавлена валидация форм,
2. Добавлено закрытие всплывающих окон по клику на оверлее, по кнопке Escape,
3. Произведен рефакторинг кода в соответствии с требованиями брифа 6 спринта.

##### Доработка в 7 спринте:

1. Произведен рефакторинг кода в соответствии с требованиями 7 спринта,
2. Добавлен класс Card со свойствами и методами элемента-карточки, класс выделен в отдельный модуль,
3. Добавлен класс FormValidator, который включил функционал validate.js - для каждой формы на странице создается экземпляр класса, который своими методами реализует валидацию этой формы. Класс так же выделен в отдельный модуль,
4. Добавлен модуль data.js (это не по брифу), в который вынесено 2 объекта: initialCards, validationElements,
5. Классы и объекты из модулей data.js, card.js, formValidator.js импортируются в index.js.

##### Доработка в 8 спринте:

1. Произведен рефакторинг кода в соответствии с требованиями 8 спринта,
2. Добавлены классы Popup, PopupWithForm, PopupWithImage, Section, UserInfo,
3. Применена технология мягкого связывания классов с использованием колбэк-функций,
4. Все переменные перенесены в модуль constants.js,
5. Установлен и настроен пакет Webpack,
6. Проект собран в папку Dist с помощью плагинов Webpack.

Отображение проверено в **Chrome, Firefox, Yandex, Safari**.
html-код страницы проверен в валидаторе