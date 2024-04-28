'use strict'

// Динамическая типизация

// бесконечный ввод нулей
// бесконечный ввод точек но не подряд
// пофиксить числа по типу 0n...
// пофиксить умножение

const input = document.querySelector('.display')                        // вывод
const reset = document.querySelector('.reset')                          // сброс
const operation = document.querySelectorAll('.operation')               // операции в общем
const equally = document.querySelector('.equally')                      // равно
const number = document.querySelectorAll('.number')                     // числа
const zero = document.querySelector('.zero')                            // ноль
const point = document.querySelector('.point')                          // точка
const pm = document.querySelector('.pm')                                // добавление минуса перед числом
const prc = document.querySelector('.prc')                              // процент (деление на 100)
const btnNotes = document.querySelector('.clear__notes')                // кнопка очистки записей
const btnHist = document.querySelector('.clear__history')               // истории
const notes = document.querySelector('.for__notes')
const history = document.querySelector('.for__history')

let result = '';                                                        // результат
let round = 0

function updateValue(value) {                                           // брать текущее значение инпута
    round = +value + 1
    return round
}

btnNotes.addEventListener('click', function() {                         // очистка записей
    notes.value = ''
})
btnHist.addEventListener('click', function() {                         // очистка истории
    history.value = ''
})

document.addEventListener('DOMContentLoaded', function() {              // инициализация значения round после загрузки страницы
    round = updateValue(document.querySelector('.round').value);
});


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
    if (result.length > 0 && result.indexOf('+') == '-1' && result.indexOf('-') == '-1' && result.indexOf('*') == '-1' && result.indexOf('/') == '-1' && result.charAt(result.length - 1) !== '.') {   
        result = result/100
        input.value = result
        result = result.toString()      
        history.value += `${result}%; `
    } else {
        setTimeout(() => {
            input.value = result
        }, 1000);
        input.value = 'Ошибка' 
    }
})

reset.addEventListener('click', function() {                            // кнопка сброса
    input.value = ''                                                    // обнуление инпута
    result = ''                                                         // обнуление результата
    input.style.direction = '';                                         // сбрасываем направление текста
})

input.addEventListener('dblclick', function() {                         // убрать значение при двойном нажатии на поле
    result = result.toString()                                          // чтобы конечный результат который числового типа переводился в строку
    result = result.slice(0, -1)                                        // удаление последнего числа
    input.value = result                                                // применение этой функции
})

number.forEach(function(btn) {                                          // вывод контента на дисплей
    btn.addEventListener('click', function() {
        let btnContent = btn.textContent;                               // создаем переменную в которую помещаем содержимое кнопки
        input.value += btnContent                                       // добавляем содержимое в инпут
        result += btnContent                                            // добавляем содержимое в результат
        if (input.value.length > 7) {                                   // проверка на кол-во символов чтобы следить за ходом расчета
            input.style.direction = 'rtl';                              // меняем направление текста
        } else {
            input.style.direction = '';                                 // прежнее направление текста
        }
    })
})

operation.forEach(function(btn) {                                       // вывод контента на дисплей
    btn.addEventListener('click', function() {
        if (result.length !== 0 && result.charAt(result.length - 1) !== '+' && result.charAt(result.length - 1) !== '-' && result.charAt(result.length - 1) !== '*' && result.charAt(result.length - 1) !== '/' && result.charAt(result.length - 1) !== '.') {     // условие на операции
            let btnContent = btn.textContent;                         
            input.value += btnContent                               
            result += btnContent
        }
    })
})

zero.addEventListener('click', function() {
    input.value += zero.textContent
    result += zero.textContent
});

point.addEventListener('click', function() {                            // точка
    if (result.length !== 0 && result.charAt(result.length - 1) !== '+' && result.charAt(result.length - 1) !== '-' && result.charAt(result.length - 1) !== '*' && result.charAt(result.length - 1) !== '/' && result.charAt(result.length - 1) !== '.') {           // условие ввода точки 
        input.value += point.textContent
        result += point.textContent
    }
})

equally.addEventListener('click', function() {                          // равно
    if (result.length !== 0 && result.charAt(0) !== '-' && (result.indexOf('+') !== -1 || result.indexOf('-') !== -1 || result.indexOf('*') !== -1 || result.indexOf('/') !== -1 ) && (result.charAt(result.length - 1) !== '/' && result.charAt(result.length - 1) !== '*' && result.charAt(result.length - 1) !== '+' && result.charAt(result.length - 1) !== '-' && result.charAt(result.length - 1) !== '.')) {                                             // условие ввода знака "равно"
        let keke = eval(result)                                         // переводим строку в числовой тип
        if (Math.floor(keke) !== keke) {                                // условие округления
            keke = keke.toFixed(round)                                  // округляем
            input.value = keke                                          // вывод
            result = keke.toString()                                    // перевод конечного результата в строчный тип
            history.value += `${keke}; `                                // запись в историю
        } else {
            input.value = keke                                          // вывод
            result = keke.toString()                                    // перевод конечного результата в строчный тип
            history.value += `${keke}; `                                // // запись в историю
        }
    }  
})