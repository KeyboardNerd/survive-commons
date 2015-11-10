angular.module('example').config(['$routeProvider', // grab example module, execute config() method to create a new configuration block, then using DI to inject the routeProvider object to your configuration function, and the routeProvider.when() method to define a new route.
	function($routeProvider){
		$routeProvider.
		when('/',{
			templateUrl: 'example/views/example.client.view.html'
		}).
		otherwise({
			redirectTo:'/'
		});
	}])