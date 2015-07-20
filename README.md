
# Ionic - Lector QR
Aplicación Lectora de códigos QR

[Post](http://ivanbtrujillo.com/lector-qr-ionic/)

La aplicación es muy básica, sirve de ejemplo en el post para aprender como añadir plugins a ionic utilizando NG Cordova.

## Clonar desde Github
Para clonar el repositorio en nuestro PC, ejecutamos el siguiente comando, el cual nos creará una carpeta llamada TLP2015 con el código del proyecto dentro:
```javascript
$ git clone https://github.com/ivanbtrujillo/Ionic-LectorQR.git LectorQR
```

## Plugins
Debemos de instalar el plugin del lectorQR con este comando:
```javascript
cordova plugin add https://github.com/wildabeast/BarcodeScanner.git
```


## Añadir plataformas
```javascript
ionic platform add ios / android
```


## Lanzar a dispositivo USB
```javascript
ionic run ios / android
```
