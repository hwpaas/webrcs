angular.module( 'webrcs', [
  'templates-app',
  'templates-common',
  'ui.bootstrap',
  'webrcs.home',
  'webrcs.login',
  'ui.router',
  'services.opencom'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/login' );
})

.run( function run () {
})

.controller( 'AppCtrl', ['$scope','$location','$rootScope','opencom', function AppCtrl ( $scope,$location,$rootScope,opencom ) {

}])

;

