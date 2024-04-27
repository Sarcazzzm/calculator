'use strict'

// Минусы что обнаружил: бесконечный ввод нулей, знаков, точек (только с определенным интервалом) :)

// выбор степени округления (((после интерфейса)))

const input = document.querySelector('.display')                        // вывод
const reset = document.querySelector('.reset')                          // сброс
const operation = document.querySelectorAll('.operation')               // операции в общем
const equally = document.querySelector('.equally')                      // равно
const number = document.querySelectorAll('.number')                     // числа
const zero = document.querySelector('.zero')                            // ноль
const point = document.querySelector('.point')                          // точка
const pm = document.querySelector('.pm')                                // добавление минуса перед числом
const prc = document.querySelector('.prc')                              // процент (деление на 100)
 
let result = '';                                                        // результат
let disabledZero = false;                                               // блокировки
let disabledPoint = false;                                              
let disabledOperation = false;


pm.addEventListener('click', function() {                               // знак +-
    result = result.toString()                                          // чтобы конечный результат который числового типа переводился в строку
    if (result.length == 0) {                                           // если ввод пустой
        if (result.charAt(result.length - 1) == '-') {                  // условие если последнее значение минус, то его удалить
            result = result.slice(0, -1)                                // удаление последнего числа
            input.value = result                                        // применение этой функции
        } else {                                                        // если последнее значение не минус, то его добавить
            result += '-'
            input.value = result
        }
    } else { // если уже есть число
        if (result.charAt(0) == '-') {                                  // если в начале минус, то его удалить
            let arr = result.split('')                                  // раскидываем на массив
            arr.shift()                                                 // удаляем первый элемент, но так лучше не делать :)
            result = arr.join('')                                       // собираем массив в строку
            input.value = result                                        // выводим
        } else {                                                        // если в начале нет минуса то его вставить
            let arr = result.split('')
            arr.unshift('-')                                            // вставляем первый элемент, но так лучше не делать :)
            result = arr.join('')
            input.value = result
        }
    }
})

prc.addEventListener('click', function() {                              // проценты
    if (result.length == 0 || result == '-' || result.charAt(result.length - 1) == '+' || result.charAt(result.length - 1) == '-' || result.charAt(result.length - 1) == '*' || result.charAt(result.length - 1) == '/') {                                       // проверка на пустоту
        setTimeout(() => {
            input.value = ''
            result = ''
        }, 1000);
        input.value = 'Ошибка' 
    } else {
        result = result.toString()
        result = result/100
        input.value = result
    }
})

reset.addEventListener('click', function() {                            // кнопка сброса
    input.value = ''                                                    // обнуление инпута
    result = ''                                                         // обнуление результата
})

input.addEventListener('click', function() {                            // убрать значение при нажатии на поле
    result = result.toString()                                          // чтобы конечный результат который числового типа переводился в строку
    result = result.slice(0, -1)                                        // удаление последнего числа
    input.value = result                                                // применение этой функции
})

number.forEach(function(btn) {                                          // вывод контента на дисплей
    btn.addEventListener('click', function() {
        let btnContent = btn.textContent;                               // создаем переменную в которую помещаем содержимое кнопки
        input.value += btnContent                                       // добавляем содержимое в инпут
        result += btnContent                                            // добавляем содержимое в результат
    })
})

operation.forEach(function(btn) {                                       // вывод контента на дисплей
    btn.addEventListener('click', function() {
        if (result.length !== 0) {                                      // условие на первый символ
            if (!disabledOperation) {                                   // условие на блокировку
                let btnContent = btn.textContent;                         
                input.value += btnContent                               
                result += btnContent    
                disabledOperation = true;                               // блокировка
                setTimeout(function() {
                    disabledOperation = false;                          // снятие блокировки по прошествии 2х секунд
                }, 2000);
            }
        }
    })
})
 
zero.addEventListener('click', function() {
    if (result.length < 2) {
        if (!disabledZero) {                                            // условие на блокировку
            input.value += zero.textContent
            result += zero.textContent
            disabledZero = true;                                        // блокировка
            setTimeout(function() {
                disabledZero = false;
            }, 2000);                                                   // снятие блокировки по прошествии 2х секунд
        }
    } else {
        input.value += zero.textContent
        result += zero.textContent
    }
});

point.addEventListener('click', function() {                            // точка
    if (result.length !== 0) {
        if (!disabledPoint) {                                           // условие на блокировку
            input.value += point.textContent
            result += point.textContent
            disabledPoint = true;                                       // блокировка
            setTimeout(function() {
                disabledPoint = false;                                  // снятие блокировки по прошествии 2х секунд
            }, 2000);
        }
    }
})

equally.addEventListener('click', function() {                          // равно
    if (result.charAt(result.length - 1) == '/' || result.charAt(result.length - 1) == '*' || result.charAt(result.length - 1) == '+' || result.charAt(result.length - 1) == '-' || result.charAt(result.length - 1) == '.') {                                       // условие чтобы последним символом не были знаки
        setTimeout(() => {
            input.value = ''
            result = ''
        }, 1000);
        input.value = 'Ошибка'                                          // исчезнет через секунду
    } else {
        let keke = eval(result)                                         // переводим строку в числовой тип
        if (Math.floor(keke) !== keke) {                                // условие округления
            keke = keke.toFixed(3)                                      // округляем
            input.value = keke                                          // вывод
            result = keke
        } else {
            input.value = keke                                          // вывод
            result = keke
        }
    }    
})
