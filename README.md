[![Build Status](https://travis-ci.com/vladkrysin/weatherApp.svg?branch=master)](https://travis-ci.com/vladkrysin/weatherApp)
[![Coverage Status](https://coveralls.io/repos/github/vladkrysin/weatherApp/badge.svg?branch=master)](https://coveralls.io/github/vladkrysin/weatherApp?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vladkrysin_weatherApp&metric=alert_status)](https://sonarcloud.io/dashboard?id=vladkrysin_weatherApp)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=vladkrysin_weatherApp&metric=bugs)](https://sonarcloud.io/dashboard?id=vladkrysin_weatherApp)

## Description

The Vue Weather App allows the user to search for the current weather for a city, also user can register and add favorite places. This application was developed to provide examples of how to unit test Vue components.

## Example

![Alt text](/blogpost_screenshots/VueWeatherApp_Walkthrough_Step4.png?raw=true "Vue Weather App Example")

## Installation Instructions

If you would like to run the Vue Weather App on your local machine, you will need to follow these instructions:

1. > clone this repo 
2. > npm i 

Additionally, you will need to create a free account at [Open Weather](https://openweathermap.org) and get an API key for using their API service.  The API key can be found in your account page under the 'API Keys' tab.  The API key needs to be included in the `App` component (defined in /src/App.vue) in the data section:

```javascript
// API key from openweathermap.org - Unique to each person
openweathermapApiKey: ''
```

## Running the Application

### Compiles and hot-reloads for development
```
npm run serve
```

### Run your unit tests
```
npm run test:unit
```

## Additional Resources

VueJS Documentation: https://vuejs.org/v2/guide/
