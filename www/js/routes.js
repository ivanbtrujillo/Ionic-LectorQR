angular.module('routes',['ionic'])
//Gestion de las rutas que muestran las vistas
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  //Menu lateral (Abstracto de las otras vistas)
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  //Vista del Lector de codigos
  .state('app.lector', {
    url: "/lector",
    views: {
      'menuContent': {
        templateUrl: "templates/lector.html",
        controller: 'LectorCtrl'
      }
    }
  })
  //Vista del generador de QR
  .state('app.generate', {
    url: "/generate",
    views: {
      'menuContent': {
        templateUrl: "templates/generate.html",
        controller: 'GeneratorCtrl'
      }
    }
  });

  //Ruta por defecto si se hace una peticion a una inexistente
  $urlRouterProvider.otherwise('/app/lector');
});
