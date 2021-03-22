Implementation Test for Home.vue with Successful HTTP GET
  
Метод: -    
Тест: renders sub-components when the component is created    
Цель: Проверить начальную отрисовку компонета 
Тип: positive    
Входные данные: -  
Ожидаемый результат: 
    Компонент и все его потомки, размещенные в нем отрисованы

Метод: searchCity   
Тест: does load the weather data when a successful HTTP GET occurs    
Цель: Проверить доставку данных в компонент, после запроса к серверу 
Тип: positive    
Входные данные: 
    data:  
        {  
          name: '',  
          weather: [  
            {  
              main: '',  
              description: ''  
            }  
          ],  
          main: {  
            temp: 0,  
            temp_min: 0,  
            temp_max: 0  
          }  
        }  
    }   
Ожидаемый результат: 
    data:  
        {  
          name: 'Chicago',  
          weather: [  
            {  
              main: 'Cloudy',  
              description: 'Cloudy with a chance of rain'  
            }  
          ],  
          main: {  
            temp: 56.3,  
            temp_min: 53.8,  
            temp_max: 58.6  
          }  
        }  
    }  

Метод: resetData()    
Тест: resets the weather data when resetData() is called    
Цель: Проверить работу метода
Тип: positive    
Входные данные:   
    weatherData: {  
      city: 'Boise',  
      weatherSummary: 'Sunny',  
      weatherDescription: 'No clouds in the sky',  
      currentTemperature: 75.5,  
      highTemperature: 78.6,  
      lowTemperature: 48.9  
    }  
Ожидаемый результат:   
    weatherData: {  
      city: '',  
      weatherSummary: '',  
      weatherDescription: '',  
      currentTemperature: 0,  
      highTemperature: 0,  
      lowTemperature: 0 
    }

Метод: clearMessage()    
Тест: resets the banner data when clearMessage() is called    
Цель: Проверить работу метода 
Тип: positive    
Входные данные:   
    data(  
      {  
        messageToDisplay: 'Great search results!',  
        messageType: 'Success!!!'  
      }   
Ожидаемый результат:   
    Data(  
      {  
        messageToDisplay: '',  
        messageType: ''  
      }  

Implementation Test for Home.vue with Failed HTTP GET

Метод: searchCity    
Тест: does not load the weather data when a failed HTTP GET occurs    
Цель: Проверить работу метода при ошибке запроса 
Тип: negative    
Входные данные:   
        data:  
        {  
          name: '',  
          weather: [  
            {  
              main: '',  
              description: ''  
            }  
          ],  
          main: {  
            temp: 0,  
            temp_min: 0,  
            temp_max: 0  
          }  
        }  
    }    
Ожидаемый результат:   
        data:  
        {  
          name: '',  
          weather: [  
            {  
              main: '',  
              description: ''  
            }  
          ],  
          main: {  
            temp: 0,  
            temp_min: 0,  
            temp_max: 0  
          }  
        }  
    }  

Behavioral Test for Home.vue with Successful HTTP GET  

Метод: -    
Тест: initializes with the two buttons disabled and no weather data displayed    
Цель: Проверить инициализацию дочернего компонента Search
Тип: positive    
Входные данные: -
Ожидаемый результат: компонент отрисовался с начальными значениями

Метод: searchCity    
Тест: displays the weather data for a valid search    
Цель: Проверить отображение данных в компоненте 
Тип: positive    
Входные данные:   
    data:  
      {  
        name: 'Chicago',  
        weather: [  
          {  
            main: 'Cloudy',  
            description: 'Cloudy with a chance of rain'  
          }  
        ],  
        main: {  
          temp: 56.3,  
          temp_min: 53.8,  
          temp_max: 58.6  
        }  
      }  
    }      
Ожидаемый результат:   
    Исходные данные присвоины в соответствующие элемены компонета

Test home hooks  

Метод: -    
Тест: created_api=ds12fesre_messageType=info    
Цель: Проверить отрисовку компонента Banner 
Тип: positive    
Входные данные:      
    data {  
      openweathermapApiKey: 'ds12fesre'  
    }      
Ожидаемый результат:      
    Banner не отрисован,  
    messageType=info   

Метод: -      
Тест: created_api=""_messageType=error      
Цель: Проверить отрисовку компонента Banner   
Тип: positive      
Входные данные:        
    data {    
      openweathermapApiKey: 'ds12fesre'    
    }        
Ожидаемый результат:      
    Banner отрисован,  
    messageType=error    
  