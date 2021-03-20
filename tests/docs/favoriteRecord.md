favoriteRecord.vue Implementation Tests

Тест: initializes with correct elements
Цель: Начальные данные дошли до компонентов, их использующих 
Тип: positive
Входные данные: { 
    propsData: {
        cityName: 'Moscow'
      }
    }
Ожидаемый результат: { 
    propsData: {
        cityName: 'Moscow'
      }
    }

Метод: clear
Тест: clear_MoscowInFavoritePlaces_MoscowExcludeFromFavoritePlace
Цель: Проверить то, что метод удаляет название города, находящегося в конкретном
    экзмепляре favoriteRecords из общего хранилища данных(store)
Тип: positive
Входные данные: {
    store: { 
        favoritePlaces: {
        'Vlad': ['chicago', 'paris', 'moscow']
        },
    }
}
Ожидаемый результат: { 
    store: { 
        favoritePlaces: {
        'Vlad': ['chicago', 'paris']
        },
    }

Метод: autoSearch
Тест: autoSearch_buttonWithTextMoscow_updStateCityNameValue
Цель: Проверить, то что метод обновляет значения в хранилище(store)
Тип: positive
Входные данные:  нажатие кнопки с названием города
Ожидаемый результат: { 
    store: { 
        inputCity: 'moscow'
    }