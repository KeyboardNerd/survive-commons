angular.module('index').controller('indexController', ['$scope', '$http',
	function($scope, $http){
        var data_query = { method: 'GET',url: '/api/post_list'};
        $scope.view_title = "";
        $scope.view_context = "";
        $scope.data = "the data is here";
        $scope.post_list = new Array();
        $scope.push_data = "";
        $scope.action_downvote = function(post_id){
            index_of_post = 0;
            for (i = 0; i < $scope.post_list.length; i++){
                if ($scope.post_list[i]._id == post_id){
                    $scope.post_list[i].hate ++;
                    index_of_post = i;
                    break;
                }
            }
            $http.put('/api/post/'+post_id, $scope.post_list[index_of_post], {headers: {'Content-Type': 'application/json'}}).then(
                function(res){
                    $scope.action_pull_data();
                },
                function(res){
                    $scope.data = "failed";
                }
            );
        }
        $scope.action_upvote = function(post_id){
            index_of_post = 0;
            for (i = 0; i < $scope.post_list.length; i++){
                if ($scope.post_list[i]._id == post_id){
                    $scope.post_list[i].like ++;
                    index_of_post = i;
                    break;
                }
            }
            $scope.data = i + ' ' + angular.toJson($scope.post_list[i]);
            $http.put('/api/post/'+post_id, $scope.post_list[index_of_post], {headers: {'Content-Type': 'application/json'}}).then(
                function(res){
                    $scope.action_pull_data();
                },
                function(res){
                    $scope.data = "failed";
                }
            );
        };
        $scope.action_pull_data = function(){
            $http(data_query).then(function (res){
            // on success
                $scope.post_list = res.data;
            }, function(req){
            // on fail
                
            });
        };
        $scope.action_push_data = function(){
            $http.post('/api/post_list', {title:$scope.push_data}, {headers: {'Content-Type': 'application/json'}}).then(
                function(res){
                    $scope.action_pull_data();
                }, 
                function(res){
                    $scope.data = "failed";
                }
            )
        }
	}]);

