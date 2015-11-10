angular.module('articles').controller('ArticlesController', ['$scope', '$routeParams', '$location','Authentication','Articles', 
	function($scope, $routeParams, $location, Authentication, Articles)
	{
		$scope.authentication = Authentication;
	}]);
/*
• $routeParams: This is provided with the ngRoute module and holds references to route parameters of the AngularJS routes you'll define next
• $location: This allows you to control the navigation of your application
• Authentication: You created this service in the previous chapter and it
provides you with the authenticated user information
• Articles: You created this service in the previous section and it provides you with a set of methods to communicate with RESTful endpoints
*/

// this will be available to ejs
$scope.create = function(){
	var article = new Articles({
		title: this.title, // this refers to what?
		content: this.content
	});
	article.$save(funciton(response){
		$location.path('articles/'+response._id);
	}, function(errorResponse){
		$scope.error = errorResponse.data.message; // view will be able to present it to the user
	})
};

$scope.find = function(){
	$scope.articles = Articles.query(); // how
};

$scope.findOne = function(){
	$scope.article = Articles.get({
		articleId:$routeParams.articleId
	}); // how
};

$scope.update = function(){
	$scope.article.$update(function() {
		$location.path('articles/' + $scope.article._id);
	}, function(errorResponse){
		$scope.error = errorResponse.data.message;
	});
};

$scope.delete = function(article){
	if (article) {
		article.$remove(function(){
			for (var i in $scope.articles){
				if ($scope.articles[i] === article){
					$scope.articles.splice(i,1); // ?
				}
			}
		});
	} else {
		$scope.article.$remove(function(){
			$location.path('articles');
		});
	}
};