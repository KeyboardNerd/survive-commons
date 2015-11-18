angular.module('post').factory('Post',
	['$resource', 
	function($resource) {
 		return $resource('api/articles/:articleId', {articleId: '@_id'}, { update:{ method: 'PUT' }	}); 
	}
	]
);