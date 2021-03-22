Test home methods 
  
Метод: searchCity    
Тест: searchCity_mOsCow_success    
Цель: Проверить работу метода  
Тип: positive    
Входные данные: mOsCow   
Ожидаемый результат: messageType = 'Success'  

Метод: searchCity    
Тест: searchCity_[./63.]_error    
Цель: Проверить работу метода  
Тип: negative    
Входные данные: [./63.]   
Ожидаемый результат: messageType = 'Error'

Метод: searchCity    
Тест: searchCity_[Moscow]_error    
Цель: Проверить работу метода  
Тип: negative    
Входные данные: [Moscow]   
Ожидаемый результат: messageType = 'Error'

Метод: searchCity    
Тест: searchCity_emptyString_error    
Цель: Проверить работу метода  
Тип: negative    
Входные данные: ''   
Ожидаемый результат: messageType = 'Error'

Метод: exit   
Тест: Implementation exit test   
Цель: Проверить работу метода  
Тип: positive    
Входные данные:   
    И в vuex, и в localStorage:  
        userEmail: 'some@mail.ru',  
        userName: 'Vlad',  
Ожидаемый результат:  
    И в vuex, и в localStorage   
        userEmail: '',  
        userName: ''  