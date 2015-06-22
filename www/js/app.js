// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
    })
    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab': {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })
    .state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab': {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })
    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab': {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html'
        }
      }
    })
    
  $urlRouterProvider.otherwise('/tab/home');
})

.controller('ListController', ['$scope', '$http', '$state',
  function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.artist = data.artists;
      $scope.whichartist = $state.params.aId;
      $scope.data = {
        showReorder: false,
        showDelete: false
      };

      $scope.onItemDelete = function(item) {
        $scope.artist.splice($scope.artist.indexOf(item), 1);
      }

      $scope.doRefresh = function() {
        $http.get('js/data.json').success(function(data) {
          $scope.artist = data.artists;
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.artist.splice(fromIndex, 1);
        $scope.artist.splice(toIndex, 0, item);
      }
    });
  }])

.controller('CalendarController', ['$scope', '$http', '$state',
  function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.calendar = data.calendar;
      
      $scope.onItemDelete = function(dayIndex, item) {
        $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
      }

      $scope.doRefresh = function() {
        $http.get('js/data.json').success(function(data) {
          $scope.calendar = data.calendar;
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

    });
  }])


