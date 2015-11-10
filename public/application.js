var mainApplicationModuleName = 'survive-commons';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource','ngRoute','users','example','articles']); // dependencies in public angular.js comes to here
// what is ready
// what is element
// what is bootstrap, module
mainApplicationModule.config(['$locationProvider',
	function($locationProvider){
		$locationProvider.hashPrefix('!');
	}
	]);
if (window.location.hash === '#_=_') window.location.hash = '#!';
angular.element(document).ready(function(){
	angular.bootstrap(document, [mainApplicationModuleName]);
});