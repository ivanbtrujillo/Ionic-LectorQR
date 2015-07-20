angular.module('controllers', [])
	//Controlador del menu
	.controller("AppCtrl", function($scope){
	})

	.controller("LectorCtrl", function($scope, $cordovaBarcodeScanner, $http, $ionicModal){
		//Creamos el modal indicando la url de la plantilla
		$ionicModal.fromTemplateUrl('templates/modal-data.html', {
				scope: $scope,
				animation: 'slide-in-up'
		}).then(function(modal) {
				$scope.modal = modal;
		});

		//Abrimos el lector
		$scope.leerCodigo =function(){
			$scope.modal.show();
			//Llamamos al plugin
			$cordovaBarcodeScanner.scan()
				//Si escanea algo, mostramos el texto de lo escaneado
				.then ( function(imagenEscaneada){
						//Realizamos una peticion GET con el id
						$http.get('http://192.168.1.81:3000/'+ imagenEscaneada.text)
							//OK
							.success(function(data){
								//Asignamos los datos recibidos a qrdata
								$scope.qrdata= data.qrcode;
								//Abrimos el modal
								$scope.modal.show();

							})
							//Error
							.error(function(error){
								alert('Ha ocurrido un error al consultar los datos: '+error)
							})
				},
				//Si hay un error
				function(error){
					alert("Ha ocurrido un error al escanear: "+ error);
				});
		}
	})


	//Inyectamos $http para poder hacer peticiones y $cordovaFile para guardar los qr
	.controller("GeneratorCtrl", function($scope, $http, $cordovaFile){
		//Inicializamos el valor de input de la vista y del parrafo donde mostramos el texto
		$scope.textoGenerador = '';
		//Valores del select para las marcas
		$scope.options = [
			{ label: 'HP', value: 'Hp' },
			{ label: 'ASUS', value: 'Asus'},
			{ label: 'Dell', value:'Dell'}
		];
		//Funcion que se ejecuta al pulsar el boton. Recibimos el valor del input
		$scope.generarCodigo = function(qrcode){
			//Actualizamos la marca al valor del objeto options
			qrcode.marca = qrcode.marca.value;

			//Realizamos una peticion POST con el objeto qrdata
			$http.post('http://192.168.1.81:3000', { qrcode	})
			//OK
			.success(function(data){
				//Guardamos el fichero
				$cordovaFile.writeFile(cordova.file.dataDirectory, data.qrcode._id+".svg", data.qrcode.image, true)
				.then(function (success) {
						//Asignamos la ruta al ficheor
						$scope.qr = cordova.file.dataDirectory + data.qrcode._id +".svg";
				}, function (error) {
						alert('Error al guardar el QR en el teléfono: ' +JSON.stringify(error));
				});

			})
			//Error
			.error(function(error){
				alert('Ha ocurrido un error: '+error)
			})
		}
	});
