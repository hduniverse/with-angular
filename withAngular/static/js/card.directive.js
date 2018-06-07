(function() {
	'use strict';

	angular.module('scrumboard.demo')	
		.directive('scrumCard', ScrumCard);


	function ScrumCard() {
		return {
			templateUrl: '/static/html/card.html',
			restrict: 'E',
			controller: ['$scope', '$http', function ($scope, $http) {
				var url = '/scrumboard/cards/' + $scope.card.id + '/';
				$scope.destList = $scope.list;

				$scope.update = function() {
					return $http.put(url,$scope.card);
				};

				function removeCardFromList(card, list) {
					var cards = list.cards;
					cards.splice(
						cards.indexOf(card),1
					);
				}

				$scope.delete = function(){
					$http.delete(url).then(
						function() {
							removeCardFromList($scope.card, $scope.list);
						}
					);
				};
				$scope.modelOptions = {
					debounce: 400
				};

				$scope.move = function(){
					if($scope.destList === undefined) {
						return;
					}
					$scope.card.parent_list = $scope.destList.id;
					$scope.update().then(function() 
						{
							removeCardFromList($scope.card,$scope.list);
							$scope.destList.cards.push($scope.card);
						}

					);  
				};

			}]
		};
	}
})();