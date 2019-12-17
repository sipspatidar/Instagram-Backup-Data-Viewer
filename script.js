var app = angular.module('myApp', []);
app.factory('FileLoader', ['$http', '$q', function($http, $q){
 
    return {
         
    getDate: function(fileName) {
            return $http.get(fileName)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while fetching users');
                        return $q.reject(errResponse);
                    }
            );
        }
         
    };
 
}]);
app.controller('myController', function($scope,$http,FileLoader){
		$scope.showProfile = true;

		$scope.fetchMessages = function(){
              FileLoader.getDate("messages.json")
                  .then(
                               function(d) {
                                    $scope.messages = d;
                               },
                                function(errResponse){
                                    console.error('Error while fetching Currencies');
                                }
                       );
        };
		$scope.fetchProfile = function(){
				
              FileLoader.getDate("profile.json")
                  .then(
                               function(d) {
                                    $scope.profile = d;
                               },
                                function(errResponse){
                                    console.error('Error while fetching Currencies');
                                }
                       );
          };


		$scope.openChat = function(message){
			$scope.showProfile= false;
			$scope.activeChat = message;	
			//$scope.activeChat.conversation.prevDate = message.conversation[message.conversation.length-1].created_at;
			setInterval($scope.updateScroll,2000);
		}
		$scope.writeDate = function(newDate){
			if(!$scope.activeChat.conversation.prevDate){
				$scope.activeChat.conversation.prevDate = newDate;
				return true;
			}
			else if($scope.activeChat.conversation.prevDate==newDate){
				return true;
			}
			else if($scope.days($scope.activeChat.conversation.prevDate,newDate)>1){
				$scope.activeChat.conversation.prevDate = newDate;
				return true;
			}
			else{
				
				return false;
			}
		};
		$scope.days = function(date1,date2) {
				
			var date2 = new Date(date2);
			var date1 = new Date(date1);
			var timeDiff = Math.abs(date2.getTime() - date1.getTime());
			$scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
			return $scope.dayDifference;
		}
		
		$scope.updateScroll = function(){
			var element = document.getElementById("activeWindow");
			element.scrollBottom = element.scrollHeight;
		}
		$scope.fetchProfile();
		$scope.fetchMessages();



		
});