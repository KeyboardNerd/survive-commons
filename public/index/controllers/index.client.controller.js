angular.module('index').controller('indexController', ['$scope', '$http',
	function($scope, $http){
        var data_query = { method: 'GET',url: '/api/post_list'};
        // user view data:
        $scope.userinput_title_error = false;
        $scope.userinput_title = "";
        $scope.userinput_content = "";
        $scope.sorting = "-time_create";

        $scope.action_change_sorting = function(value){
            if (value == 1){
                $scope.sorting = "-time_create";
            }else if (value == 2){
                $scope.sorting = "-title";
            }else if (value == 3){
                $scope.sorting = "-like";
            }
            $http.get('api/post_list/', {sort_type: $scope.sorting}, {headers: {'Content-Type': 'application/json'}}).then(
                function(res){
                    $scope.post_list = res.data;
                },
                function(res){
                    $scope.data = "failed";
                }
            );
        }

        $scope.action_push_data = function(){
            if ($scope.userinput_title.length < 10){
                $scope.userinput_title_error = true;
                return;
            }
            $http.post('/api/post_list', {title:$scope.userinput_title, description:$scope.userinput_content}, {headers: {'Content-Type': 'application/json'}}).then(
                function(res){
                    $scope.action_pull_data();
                }, 
                function(res){

                }
            )
        }

        $scope.view_title = "";
        $scope.view_context = "";
        $scope.data = "the data is here";
        $scope.post_list = new Array();
        $scope.push_data = "";
        $scope.action_delete = function(post_id){
                        index_of_post = 0;
            for (i = 0; i < $scope.post_list.length; i++){
                if ($scope.post_list[i]._id == post_id){
                    $scope.post_list[i].hate ++;
                    index_of_post = i;
                    break;
                }
            }
            $http.delete('/api/post/'+post_id, $scope.post_list[index_of_post], {headers: {'Content-Type': 'application/json'}}).then(
                function(res){
                    $scope.action_pull_data();
                },
                function(res){
                    $scope.data = "failed";
                }
            );
        }
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

        // on start
        $scope.action_pull_data();
	}]);

