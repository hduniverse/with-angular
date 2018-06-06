(function() {
	'use strict';

	angular.module('scrumboard.demo')	
		.directive('scrumCard', ScrumCard);


	function ScrumCard() {
		return {
			templateUrl: '/static/scrumboard/card.html',
			restrict: 'E',
			controller: ['$scope', '$http', function ($scope, $http) {
				var url = '/scrumboard/cards/' + $scope.card.id + '/';
				$scope.update = function() {
					$http.put(url,$scope.card);
				};
				$scope.delete = function(){
					$http.delete(url).then(
						function() {
							var cards = $scope.list.cards;
							cards.splice(
								cards.indexOf($scope.card),1
							);
						}
					);
				};
				$scope.modelOptions = {
					debounce: 500
				};
			}]
		};
	}
})();