Implementation tests of methods    
    
Метод: setInitialFavoritePlaces    
Тест: setInitialFavoritePlaces_userName_[]  
Цель: Проверить работу метода  
Тип: positive  
Входные данные: 
    userName: 'userName'
Ожидаемый результат: 
    state.favoritePlaces.userName = []

Метод: checkShowFavorite  
Тест: checkShowFavorite_milanHasAlreadyBeenAdded    
Цель: Проверить работу метода  
Тип: positive  
Входные данные: 
    state = {  
    favoritePlaces: {  
      Vlad: ['milan']  
    },  
    userEmail: 'some@mail.ru',  
    userName: 'Vlad',  
    addToFavoriteShow: false  
  }  
Ожидаемый результат:   
    addToFavoriteShow: false  
  
Метод: checkShowFavorite  
Тест: checkShowFavorite_milanHasNeverBeenAdded  
Цель: Проверить работу метода  
Тип: positive  
Входные данные:   
    state = {  
    favoritePlaces: {  
      Vlad: []  
    },  
    userEmail: 'some@mail.ru',  
    userName: 'Vlad',  
    addToFavoriteShow: false  
  }  
Ожидаемый результат:   
    addToFavoriteShow: true  

Метод: addToFavotie 
Тест: addToFavotie_Milan  
Цель: Проверить работу метода  
Тип: positive  
Входные данные:   
  state = {  
    favoritePlaces: {  
      Vlad: ['moscow']  
    },  
    userEmail: 'some@mail.ru',  
    userName: 'Vlad',  
    addToFavoriteShow: false  
  }  
Ожидаемый результат:   
   favoritePlaces: {  
      Vlad: ['moscow', 'milan']  
   }  