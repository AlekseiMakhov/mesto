let originArray = []; //Исходный массив
let sortedArray = []; //Отсортированный массив
let usortCounter = 0; //Количество циклов при обычной сортировке
let qsortCounter = 0; //Количество циклов при быстрой сортировке
let arrayItemsCount = 0; //Число элементов массива


//Переключение отображения типа ввода массива
const inputBlockModifier = 'array-input_invisible';
const inputButtonModifier = 'sort-select__button_active';
const manualInputButton = document.querySelector('#manual');
const autoInputButton = document.querySelector('#auto');
const manSortField = document.querySelector('#man-sort');
const autoSortField = document.querySelector('#auto-sort');

//Модификаторы для отображения массивов и линий
const lineInvisible = 'line_invisible';
const arrayInvisible = 'array_invisible';

//Линии
const line2 = document.querySelector('#line2');
const line3 = document.querySelector('#line3');

//Блоки с массивами
const inputedArrayBlock = document.querySelector('#array-inputed');
const sortedArrayBlock = document.querySelector('#array-sorted');

//Результат
const resultBlock = document.querySelector('#result');


//Модификатор кнопки ввода
const buttonDisabled = 'array-input__button_disabled';
const sortButtonDisabled = 'array__button_disabled';
const arrItemInput = document.querySelector('#array-element');
const addButton = document.querySelector('#ok');
const generateButton = document.querySelector('#generate');
const itemsCount = document.querySelector('#items-count');
const inputedArray = document.querySelector('#original-array');
const resetButton = document.querySelector('#reset');
const itemsCountInput = document.querySelector('#array-count');
const sortButton = document.querySelector('#sort');
const sortedArrayArea = document.querySelector('#sorted-array');

const usortTime = document.querySelector('#usortTime');
const usortCycles = document.querySelector('#usortCycles');
const qsortCycles = document.querySelector('#qsortCycles');




//Обнуляем все поля и значения, скрываем элементы
const resetValues = () => {
    originArray = [];
    sortedArray = [];
    usortCounter = 0;
    qsortCounter = 0;
    arrayItemsCount = 0;
    addButton.setAttribute('disabled', '');
    addButton.classList.add(buttonDisabled);
    itemsCount.textContent = '';
    inputedArray.textContent = originArray;
    line2.classList.add(lineInvisible);
    line3.classList.add(lineInvisible);
    inputedArrayBlock.classList.add(arrayInvisible);
    sortedArrayBlock.classList.add(arrayInvisible);
    resultBlock.classList.add(arrayInvisible);
    arrItemInput.value = '';
    itemsCountInput.value = '';
    sortButton.classList.remove(sortButtonDisabled);
    sortButton.removeAttribute('disabled');
}

resetButton.addEventListener('click', resetValues);

//Функции переключения типа ввода массива
const showManualInput = () => {
    manualInputButton.classList.add(inputButtonModifier);
    manualInputButton.setAttribute('disabled', '');
    manSortField.classList.remove(inputBlockModifier);
    autoInputButton.classList.remove(inputButtonModifier);
    autoInputButton.removeAttribute('disabled');
    autoSortField.classList.add(inputBlockModifier);
    resetValues();
}

const showMAutoInput = () => {
    autoInputButton.classList.add(inputButtonModifier);
    autoInputButton.setAttribute('disabled', '');
    autoSortField.classList.remove(inputBlockModifier);
    manualInputButton.classList.remove(inputButtonModifier);
    manualInputButton.removeAttribute('disabled');
    manSortField.classList.add(inputBlockModifier);
    resetValues();
}

//Кнопки переключения ражима ввода массива
manualInputButton.addEventListener('click', showManualInput);
autoInputButton.addEventListener('click', showMAutoInput);



// Алгоритм обычной сортировки массива
const getUsualSort = (inArray) => {
    let len = inArray.length;   //Размер входного массива
    let tempArr =[]; //Промежуточный массив
    let min = 0;    //Временный минимум
    let minInd = 0; //индекс минимума
 
    //Копируем в промежуточный массив входной поэлементно,
    //чтобы собрать новый массив, а не ссылаться на входной
    for (let i = 0; i < len; i++) {
        tempArr[i] = inArray[i];
    }
    sortedArray = [];
    for (let i = 0; i < len; i++) {
        min = tempArr[i];
        for (let j = i+1; j < len; j++) {
            usortCounter += 1;
            if (tempArr[j] < min) {
                min = tempArr[j];
                minInd = j;
            }
        }
        tempArr[minInd] = tempArr[i];
        tempArr[i] = min;    
    }

    sortedArray = tempArr;
}

// Алгоритм быстрой сортировки массива
const getQuicksSort = (inArray) => {
    let baseEl = [];
    let lessArr =[]; //Промежуточный массив элементов меньше базового
    let greaterArr =[]; //Промежуточный массив элементов больше базового
    let len = inArray.length; //Размер входного массива

    if (len < 2) {  
        return inArray;
    } else {
        baseEl[0] = inArray[0]; //Базовый (опорный) элемент
        for (let i = 1; i < len; i++) {
            if (inArray[i] < baseEl[0]) {
                lessArr.push(inArray[i]);
            } else {
                greaterArr.push(inArray[i]);
            }
            qsortCounter += 1;
        }
        return getQuicksSort(lessArr).concat(baseEl[0], getQuicksSort(greaterArr));
    }
}

function showOriginArray() {
    line2.classList.remove(lineInvisible);
    inputedArrayBlock.classList.remove(arrayInvisible);
    
    itemsCount.textContent = arrayItemsCount;
    inputedArray.textContent = originArray;
}

//Ввод элемента массива
function inputArrayItem(evt) {
    if (!evt.target.value) {

    } else {
        if (evt.key === 'Enter') {
            if (evt.target.value >= 0 && evt.target.value < 10000) {
                
                originArray.push(evt.target.value);
                arrayItemsCount += 1;
                evt.target.value = '';
            }
        }
        if (arrayItemsCount > 0) {
        }
        showOriginArray();
    }
}

//Обработчик события для ввода элемента массива
arrItemInput.addEventListener('keydown', inputArrayItem);

//Эта кнопка отказывается работать
//addButton.addEventListener('click', inputArrayItem);

//Генерация случайного массива
function generateArray() {
    if (itemsCountInput.value > 0) {
        for (let i = 0; i < itemsCountInput.value; i ++) {
            originArray[i] = Math.floor(10000 * Math.random());
        }
        arrayItemsCount = itemsCountInput.value;
    }
}

itemsCountInput.addEventListener('input', evt => {
    if (!evt.target.value) {
        generateButton.classList.add(buttonDisabled);
        generateButton.setAttribute('disabled', '');
    } else {
        if (evt.target.value > 0 && evt.target.value < 100000) {
            generateButton.classList.remove(buttonDisabled);
            generateButton.removeAttribute('disabled');
        }
    }
});

generateButton.addEventListener('click', () => {
    generateButton.classList.add(buttonDisabled);
    generateButton.setAttribute('disabled', '');
    generateArray();
    showOriginArray();
});

sortButton.addEventListener('click', () => {
    let numberArray =[];    //массив чисел для сортировки
    //Преобразуем исходный массив в массив чисел для 
    //корректной работы алгоритмов
    for (let i = 0; i < originArray.length; i++) {
        numberArray[i] = Number(originArray[i]);
    } 
    sortButton.classList.add(sortButtonDisabled);
    sortButton.setAttribute('disabled', '');

    line3.classList.remove(lineInvisible);
    sortedArrayBlock.classList.remove(arrayInvisible);
    // Выводим результаты
    resultBlock.classList.remove(arrayInvisible);
    let startTime = new Date().getTime();
    getUsualSort(numberArray);
    let endTime = new Date().getTime();
    usortTime.textContent = `${endTime - startTime} ms`;
    usortCycles.textContent = `${usortCounter}`;

    startTime = new Date().getTime();
    sortedArrayArea.textContent = getQuicksSort(numberArray);
    endTime = new Date().getTime();
    qsortTime.textContent = `${endTime - startTime} ms`;
    qsortCycles.textContent = `${qsortCounter}`;
});