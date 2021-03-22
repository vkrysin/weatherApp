Search.vue Implementation Test    
      
Метод: -    
Тест: initializes with correct elements  
Цель: Проверить инициализацию компонента
Тип: positive  
Входные данные: -  
Ожидаемый результат: Все элементы компонента добавлены
    на экран

Метод: searchCity    
Тест: emits a custom event when searchCity() is called  
Цель: Проверить работу метода
Тип: positive  
Входные данные: -  
Ожидаемый результат: 
    emit 'search-sity'

Search.vue Behavioral Test

Метод: -    
Тест: initializes with the two buttons disabled  
Цель: Проверить изначальную отрисовку компонента
Тип: positive  
Входные данные: -  
Ожидаемый результат: 
    кнопки поиска и очистки неактивны

Метод: -    
Тест: enables the two buttons when a city is entered  
Цель: Проверить реакцию компонента на ввод данных в поле поиска
Тип: positive  
Входные данные: -  
Ожидаемый результат: 
    кнопки поиска и очистки активны

Метод: clearCity()    
Тест: clears the input when clearCity() is called  
Цель: Проверить работу метода
Тип: positive    
Входные данные:  
    { inputCity: 'San Francisco' }  
Ожидаемый результат:   
    { inputCity: '' }  