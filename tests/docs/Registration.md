Implementation tests of methods  
  
Метод: checkEmailCorrectness  
Тест: checkEmailCorrectness_some@mailru_isUserEmailIncorrect=false  
Цель: Проверить работу метода при вводе корректного имейла  
Тип: positive  
Входные данные: some@mail.ru  
Ожидаемый результат: {    
      isUserEmailIncorrect=false  
    }  
  
Метод: checkEmailCorrectness    
Тест: checkEmailCorrectness_OOooOO.ru_isUserEmailIncorrect=true  
Цель: Проверить работу метода при вводе некорректного имейла  
Тип: negative  
Входные данные: OOooOO.ru  
Ожидаемый результат: {    
      isUserEmailIncorrect=true  
    }  
Метод: checkEmailCorrectness      
Тест: checkEmailCorrectness_OOoo@.@.ru_isUserEmailIncorrect=true    
Цель: Проверить работу метода при вводе некорректного имейла     
Тип: negative    
Входные данные: OOoo@.@.ru    
Ожидаемый результат: {      
      isUserEmailIncorrect=true    
    }  
Метод: checkEmailCorrectness      
Тест: checkEmailCorrectness_@.@.ru_isUserEmailIncorrect=true    
Цель: Проверить работу метода при вводе некорректного имейла    
Тип: negative    
Входные данные: @.@.ru    
Ожидаемый результат: {      
      isUserEmailIncorrect=true    
    }  
Метод: checkEmailCorrectness      
Тест: checkEmailCorrectness_!@!_isUserEmailIncorrect=true    
Цель: Проверить работу метода при вводе некорректного имейла    
Тип: negative    
Входные данные: !@!    
Ожидаемый результат: {      
      isUserEmailIncorrect=true    
    }       
Метод: checkEmailCorrectness      
Тест: checkEmailCorrectness_a@a_isUserEmailIncorrect=true    
Цель: Проверить работу метода при вводе некорректного имейла    
Тип: negative    
Входные данные: a@a    
Ожидаемый результат: {      
      isUserEmailIncorrect=true    
    }   
Метод: checkEmailCorrectness      
Тест: checkEmailCorrectness_---@.ru_isUserEmailIncorrect=true    
Цель: Проверить работу метода при вводе некорректного имейла    
Тип: negative    
Входные данные: ---@.ru    
Ожидаемый результат: {      
      isUserEmailIncorrect=true    
    }          
   
Метод: isEmailInBase  
Тест: isEmailInBase_some@mail.ru_true  
Цель: Проверить работу метода при вводе имейла, имеющегося в базе  
Тип: positive  
Входные данные:   
      email: some@mail.ru,  
      store.state.users = [{  
        userEmail: 'some@mail.ru',  
        userName: 'Vlad'  
      }]  
Ожидаемый результат: true  
  
Метод: isEmailInBase  
Тест: isEmailInBase_other@mail.ru_true  
Цель: Проверить работу метода при вводе имейла, не содержащегося в базе  
Тип: negative  
Входные данные:   
        email: other@mail.ru,  
        store.state.users = [{  
            userEmail: 'some@mail.ru',  
            userName: 'Vlad'  
        }]  
Ожидаемый результат: false  
  
Метод: isUserDataCorrect  
Тест: isUserDataCorrect_{other@mail.ru, Vlad}_true  
Цель: Проверить работу метода при вводе корректных данных  
Тип: positive  
Входные данные:   
      Data({  
        email: 'other@mail.ru',  
        userName: 'Vlad'  
      })  
Ожидаемый результат: true  
  
Метод: isUserDataCorrect  
Тест: isUserDataCorrect_{other@mail.ru, ""}_false  
Цель: Проверить работу метода при вводе некорректных данных  
Тип: negative  
Входные данные:   
      Data({  
        email: 'other@mail.ru',  
        userName: ''  
      })  
Ожидаемый результат: false  
  
Метод: signUp  
Тест: signUp_{other@mail.ru, Vlad}_ОК  
Цель: Проверить работу метода регистрации(данные уже проверены)  
Тип: positive  
Входные данные:   
      Data({  
        email: 'other@mail.ru',  
        userName: 'Vlad'  
      })  
Ожидаемый результат: пользователь добавлен в users{}  
  
Render elements when component is created  
  
Метод: -   
Тест: Render with empty initialize value  
Цель: Проверить начальную иницализацию данных компонента  
Тип: positive        
Входные данные:     
      Data({     
        email: '',  
        userName: '',  
        isUserEmailIncorrect: false    
      })      
Ожидаемый результат:   
      Data({     
        email: '',  
        userName: '',  
        isUserEmailIncorrect: false    
      })    