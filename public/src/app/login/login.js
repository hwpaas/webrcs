angular.module( 'webrcs.login', [
	'ui.router',
	'ui.bootstrap'
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'login', {
		url: '/login',
		views: {
			"main": {
				controller: 'LoginCtrl',
				templateUrl: 'login/login.tpl.html'
			}
		}
	});
})

.controller( 'LoginCtrl', ['$rootScope', '$scope', 'opencom', '$location', function LoginCtrl( $rootScope, $scope, opencom, $location ) {
	$scope.host = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/webrcs-subscription";
	//opencom related functions
	$rootScope.opencom = $.opencom("apikey");

	$rootScope.opencom.onReady(function(){
		console.log("opencom is ready;");
	});

	$scope.login = function(){
		var token =  "token:" + $scope.username + "," + $scope.password; // Fake token, we need AuthServerDemo application to deal with this token
		var b64Token = window.btoa(unescape(encodeURIComponent( token )));
		$rootScope.opencom.phone.createChannel($scope.username, b64Token);
		$rootScope.username = $scope.username;
		$rootScope.b64Token = "Bearer " + b64Token;
		$("#btn-login").prop('disabled', true);
	};

	//event handler
	opencom.bindEvent("onChannelCreate",function (username) {
		$location.path('/call');
		$scope.$apply();
	});
	
	

	//old version
	/*
	$scope.login = function(){
		$rootScope.opencom.phone.login($scope.username, $scope.password);
	};

	//event handler
	opencom.bindEvent("onImsConnect",function (username) {
		$location.path('/chat');
		$scope.$apply();
	});
	*/
	
		
	
	opencom.bindEvent("onError",function (error) {
		alert(error);
	});

}])

;