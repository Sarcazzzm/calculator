'use strict'

// Минусы что обнаружил: бесконечный ввод нулей, точки можно ставить в текущем числе но не подряд, не считает 0n , не отображает умножение :)

// выбор степени округления (((после интерфейса)))
// в инструкции указать как убрать последний символ (дбл клик)
// сделать записную книжку
// историю вычислений

// разобраться с нулем
// разобраться с точками
// разобраться с числами которые 0n

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
    input.style.direction = '';
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
            input.style.direction = 'rtl';
        } else {
            input.style.direction = '';
        }
    })
})

operation.forEach(function(btn) {                                       // вывод контента на дисплей
    btn.addEventListener('click', function() {
        if (result.length !== 0 && result.charAt(result.length - 1) !== '+' && result.charAt(result.length - 1) !== '-' && result.charAt(result.length - 1) !== '*' && result.charAt(result.length - 1) !== '/' && result.charAt(result.length - 1) !== '.') {
            let btnContent = btn.textContent;                         
            input.value += btnContent                               
            result += btnContent
        }
    })
})
// когда первый элемент не ноль, если поле пустое, или последнее цифра, знак или точка то могу, или предпоследнее цифра а последнее ноль
zero.addEventListener('click', function() {
    input.value += zero.textContent
    result += zero.textContent
});

point.addEventListener('click', function() {                            // точка
    if (result.length !== 0 && result.charAt(result.length - 1) !== '+' && result.charAt(result.length - 1) !== '-' && result.charAt(result.length - 1) !== '*' && result.charAt(result.length - 1) !== '/' && result.charAt(result.length - 1) !== '.') {
        input.value += point.textContent
        result += point.textContent
    }
})

equally.addEventListener('click', function() {                          // равно
    if (result.charAt(result.length - 1) == '/' || result.charAt(result.length - 1) == '*' || result.charAt(result.length - 1) == '+' || result.charAt(result.length - 1) == '-' || result.charAt(result.length - 1) == '.') {                   // условие чтобы последним символом не были знаки
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
            result = keke.toString()
        } else {
            input.value = keke                                          // вывод
            result = keke.toString()
        }
    }    
})