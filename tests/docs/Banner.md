Banner.vue Implementation Tests:\

Тест: initializes with correct elements\
Цель: проверить состояние начальных данных компонента\
Тип: positive\
Входные данные: {\ 
    bannerMessage: ''\ 
    }\
Ожидаемый результат: {\
    bannerMessage: '', bannerBackgroundColor: red\ 
    }\
\
Тест: initializes with message\
Цель: проверить ожидаемую работу компонента\
Тип: positive\
Входные данные: {\ 
    bannerMessage: 'Banner message 123'\ 
    }\
Ожидаемый результат: {\ 
    bannerMessage: 'Banner message 123',\
    bannerBackgroundColor: red\
    }\
\
Метод: clearBannerMessage\
Тест: emits an event when the clear button is clicked\
Цель: проверить работу связи компонента с родителем\
Тип: positive\
Входные данные: нажатие кнопки clear\
Ожидаемый результат: отправка сигнала 'clear-banner' родительскому компоненту\
