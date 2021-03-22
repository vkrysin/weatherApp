Render elements when component is created  
  
Метод: -  
Тест: Render with empty initialize value  
Цель: Проверить работу метода
Тип: positive  
Входные данные: -  
Ожидаемый результат: Компонент отрисовался с начальными значениями

Метод: -  
Тест: Render warning message, if errorSignIn=true  
Цель: Проверить отрисовку элемента wrong-data  
Тип: positive  
Входные данные: errorSignIn: true    
Ожидаемый результат: Компонент отрисовался  

Implementation tests of methods

Метод: getLogInData  
Тест: getLogInData_[]_[]  
Цель: Проверить работу метода 
Тип: positive  
Входные данные: ['','']  
Ожидаемый результат: ['','']  

Метод: getLogInData  
Тест: getLogInData_[some@mail.ru, Vlad]_[some@mail.ru, Vlad]    
Цель: Проверить работу метода  
Тип: positive    
Входные данные: [some@mail.ru, Vlad]  
Ожидаемый результат: [some@mail.ru, Vlad]  

Метод: isLogInDataContainsInBase
Тест: isLogInDataContainsInBase_[Vlad, some@mail.ru]_true  
Цель: Проверить работу метода  
Тип: positive  
Входные данные:   
    users: [{  
      userEmail: 'some@mail.ru',  
      userName: 'Vlad'  
    }],  
    [Vlad, some@mail.ru]  
Ожидаемый результат: true  

Метод: isLogInDataContainsInBase  
Тест: isLogInDataContainsInBase_[vvv, some@mail.ru]_flase  
Цель: Проверить работу метода  
Тип: negative    
Входные данные:   
    users: [{  
      userEmail: 'some@mail.ru',  
      userName: 'Vlad'  
    }],  
    [vvv, some@mail.ru]  
Ожидаемый результат: false  
  
Метод: LogIn  
Тест: LogIn_[Vlad, some@mail.ru]_errorSignIn=false    
Цель: Проверить работу метода    
Тип: positive    
Входные данные:   
    users: [{  
      userEmail: 'some@mail.ru',  
      userName: 'Vlad'  
    }],  
    [Vlad, some@mail.ru]  
Ожидаемый результат: errorSignIn=false  
  
Метод: LogIn  
Тест: LogIn_[vvv, some@mail.ru]_errorSignIn=true    
Цель: Проверить работу метода    
Тип: negative  
Входные данные:   
    users: [{  
      userEmail: 'some@mail.ru',  
      userName: 'Vlad'  
    }],  
    [vvv, some@mail.ru]  
Ожидаемый результат: errorSignIn=true  