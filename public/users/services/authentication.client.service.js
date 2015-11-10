angular.module('users').factory('Authentication', [
	function(){
		this.user = window.user; // what window referring to
		return{
			user: this.user
		};
	}
]);