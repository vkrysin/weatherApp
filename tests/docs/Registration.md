Implementation tests of methods

Метод: checkEmailCorrectness
Тест: checkEmailCorrectness_some@mail.ru_isUserEmailIncorrect=false
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