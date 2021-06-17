# * English version below *
# Aplikacja do śledzenia aktywności ruchowej
## Koncepcja aplikacji 

Jest to aplikacja mobilna wykonana przy pomocy takich technologii jak: Expo, React Native, React, Redux, Sqlite oraz przy użyciu języka programowania Javascript.
Służy ona do zapisywania tras pokonanych przez użytkownika w trybie offline w telefonach z systemem Android.    Aby użyć aplikację wystarczy pobrać aplikację Expo i zeskanować poniższy kod:  
![QRCode](https://github.com/adsuski/Uniwersytet/blob/master/images/QR.PNG)


# Ekrany aplikacji

## Ekran listy tras
Ekran na którym użytkownik widzi zapisane przez siebie trasy. W wypadku braku wcześniej zapisanych tras lista jest pusta. Z tego ekranu możliwe jest dodanie nowej trasy poprzez znak "+" albo wybranie szczegółów trasy.
![ListScreen](https://github.com/adsuski/Uniwersytet/blob/master/images/ListScreen.jpg)

## Ekran dodawania trasy
Ekran będący najważniejszą częścią aplikacji, gdyż to właśnie tu zapisuje się dane do  bazy danych. Użytkownik wpisuje tu tytuł, wybiera zdjęcie z galerii znajdującej się w pamięci telefonu za pomocą przycisku „Take Image”, oraz przechodzi do najważniejszej funkcji  „Track your route”, która zabiera użytkownika do ekranu pobierania lokalizacji. Z ekranu pobierania lokalizacji pobiera parametry, które zostały zarejestrowane przez użytkownika po czym zapisuje je do pamięci urządzenia.  
![NewRouteScreen](https://github.com/adsuski/Uniwersytet/blob/master/images/NewRouteScreen.jpg)

## Ekran pobierania lokalizacji
Ekran w którym po naciśnięciu „Start” rozpoczyna się odliczanie czasu, pobieranie lokalizacji użytkownika i liczenie odległości pomiędzy każdym z położeń użytkownika. Kiedy użytkownik chce zakończyć rejestrowanie trasy musi wybrać „Stop” po czym ma szansę wznowić proces pobierania lokalizacji lub przekazać parametry: dystansu, czasu i koordynatów do „Ekranu dodawania trasy”  
![MapScreen](https://github.com/adsuski/Uniwersytet/blob/master/images/MapScreen.jpg)

## Ekran szczegółów trasy
Ekran zawierający informacje o trasie wybranej w ekranie listy tras. Dzięki przyciskowi „Go to map with route” można wyświetlić trasę na mapie przechodząc do ekranu pobierania lokalizacji . Można również wrócić do listy tras.  
![DetailScreen](https://github.com/adsuski/Uniwersytet/blob/master/images/DetailScreen.jpg)

## Ekran wyświetlania zapisanej trasy
Ekran ten wyświetla narysowaną trasę, którą użytkownik wcześniej zapisał oraz wybrał później z listy tras.  
![MapRouteScreen](https://github.com/adsuski/Uniwersytet/blob/master/images/MapRouteScreen.jpg)




# English version
# Application for tracking physical activity
## Description of the application 

It is a mobile application made with the use of technologies such as: Expo, React Native, React, Redux, Sqlite and using the Javascript programming language.
It is used to save the routes traveled by the user in the offline mode on Android phones. To use the application, simply download the Expo application and scan the code below:  
![QRCode](https://github.com/adsuski/Uniwersytet/blob/master/images/QR.PNG)


# Screens

## Route List Screen
The screen where the user can see the routes he has saved. If there are no previously saved routes, the list is empty. From this screen it is possible to add a new route with the "+" sign or select route details.  
![ListScreen](https://github.com/adsuski/Uniwersytet/blob/master/images/ListScreen.jpg)

## New Route Screen
The screen is the most important part of the application, because it is here that data is saved to the database. The user enters the title here, selects a photo from the gallery stored in the phone's memory using the "Take Image" button, and goes to the most important function "Track your route", which takes the user to the Map Screen. From the Map Screen, it downloads the parameters that have been registered by the user and saves them to the device's memory.  

![NewRouteScreen](https://github.com/adsuski/Uniwersytet/blob/master/images/NewRouteScreen.jpg)

## Map Screen
The screen in which, after pressing "Start", the countdown of time begins, downloading the user's location and counting the distance between each of the user's positions. When the user wants to stop recording the route, he must select "Stop" and then he has the opportunity to resume the process of downloading the location or transfer the parameters: distance, time and coordinates to the "New Route Screen"  
![MapScreen](https://github.com/adsuski/Uniwersytet/blob/master/images/MapScreen.jpg)

## Detail Screen
A screen that provides information about the route selected in the route list screen. With the "Go to map with route" button, you can display the route on the map by going to the Map Screen. You can also go back to the route list screen.  
![DetailScreen](https://github.com/adsuski/Uniwersytet/blob/master/images/DetailScreen.jpg)

## Map With Route Screen
This screen displays the drawn route that the user previously saved and later selected from the routes list.  
![MapRouteScreen](https://github.com/adsuski/Uniwersytet/blob/master/images/MapRouteScreen.jpg)
