angular.module('index').controller('ExampleController', ['$scope', 
	'Authentication',
	function($scope, Authentication){ // <- constructor function
		$scope.authentication = Authentication;
	}
]); 