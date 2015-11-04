var mainApplicationModuleName = 'survive-commons';
var mainApplicationModule = angular.module(mainApplicationModuleName, []); // ?
// what is ready
// what is element
// what is bootstrap, module
angular.element(document).ready(function(){
	angular.bootstrap(document, [mainApplicationModuleName]);
});