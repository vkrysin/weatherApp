Weather.vue Implementation Tests

Тест: initializes with correct elements
Цель: Начальные данные дошли до компонентов, их использующих 
Тип: positive
Входные данные: { 
    propsData: {
        city: '',
        weatherSummary: '',
        weatherDescription: '',
        currentTemperature: 0.0,
        lowTemperature: 0.0,
        highTemperature: 0.0
      }
    }
Ожидаемый результат: { 
    propsData: {
        city: '',
        weatherSummary: '',
        weatherDescription: '',
        currentTemperature: 0.0,
        lowTemperature: 0.0,
        highTemperature: 0.0
      } 
    }

Тест: processes valid props data
Цель: Входные данные дошли до компонентов, их использующих 
Тип: positive
Входные данные: { 
        city: 'Chicago',
        weatherSummary: 'Cloudy',
        weatherDescription: 'Cloudy with a chance of rain',
        currentTemperature: 45.1,
        lowTemperature: 42.0,
        highTemperature: 47.7
        }
Ожидаемый результат: { 
    message: 'testdriven.io 2021' 
    }

Метод: clearWeather
Тест: emits a custom event when the Clear Weather Data button is clicked
Цель: проверить работу связи компонента с родителем
Тип: positive
Входные данные: нажатие кнопки clear
Ожидаемый результат: отправка сигнала 'clear-weather-data' родительскому компоненту