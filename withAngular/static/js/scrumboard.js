(function() {
	'use strict';
	angular.module('scrumboard.demo', ['ngRoute'])
           .controller('ScrumboardController', ['$scope', '$http', '$location', 'Login', ScrumboardController]);


 	function ScrumboardController($scope, $http, $location, Login) {


 		$scope.add = function(list, title) {
 			var card = {
 				parent_list: list.id,
 				title: title
 			};
 			$http.post('/scrumboard/cards/', card)
 				.then(function(response){
 					list.cards.push(response.data)
 				},
 				function() {
 					alert('Could not create card');
 				}
 			);
 		};

 		Login.redirectIfNotLoggedIn();
 		$scope.data = [];
 		$scope.logout= Login.logout;


 		$http.get('/scrumboard/lists/').then(function(response){
 			$scope.data= response.data;
 		});

 	}		




}) ();