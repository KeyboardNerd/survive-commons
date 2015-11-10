angular.module('example').controller('ExampleController', ['$scope', 
	'Authentication'
	function($scope, Authentication){ // <- constructor function
		$scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN';
	}
	]); // use module to retrieve the module, use controller to create a new ExampleController connstructor function.
// injected the Authentication service to the controller and used it to reference the model name field to the user fullName field.