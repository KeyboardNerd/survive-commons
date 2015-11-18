angular.module('post').config(['$routeProvider',
    function($routeProvider) {
       $routeProvider
       .when('/post', {templateUrl: 'articles/views/list-articles.client.view.html'})
       .when('/post/create', { templateUrl: 'articles/views/create-article.client.view.html'})
       .when('/post/:articleId', {templateUrl: 'articles/views/view-article.client.view.html'})
       .when('/post/:articleId/edit', {templateUrl: 'articles/views/edit-article.client.view.html'}); 
   	}
]);