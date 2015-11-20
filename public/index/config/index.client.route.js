angular.module('index').config(['$routeProvider', // grab example module, execute config() method to create a new configuration block, then using DI to inject the routeProvider object to your configuration function, and the routeProvider.when() method to define a new route.
	function($routeProvider){
		$routeProvider.
		when('/',{ templateUrl: '/index/views/index.client.view.html'}) // on index page, route '/' to index/views/index.client.view.html
		.otherwise({redirectTo:'/'});
}]);