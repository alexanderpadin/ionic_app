var app = angular.module('starter.controllers', [])

app.controller('DashCtrl', function($scope, $ionicLoading, $compile, $stateParams, $window, Chats) {
     $scope.chat = [{
        id: 0,
        name: 'Home',
        lastText: '27 Jackson St',
        face: "img/icons/ios-home.svg"
      }, {
        id: 1,
        name: 'Work',
        lastText: '39 Burlington rd',
        face: "img/icons/ios-briefcase.svg"
      }];
      
      $scope.search = false;
      $scope.geocoder;
      $scope.searchAddressText = "";

      function initialize() {
        $scope.geocoder = new google.maps.Geocoder();
        var styles = [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
        var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };

        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        
        //Marker + infowindow + angularjs compiled ng-click
        // var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        // var compiled = $compile(contentString)($scope);

        // var infowindow = new google.maps.InfoWindow({
        //   content: compiled[0]
        // });

        // var marker = new google.maps.Marker({
        //   position: myLatlng,
        //   map: map,
        //   title: 'Uluru (Ayers Rock)'
        // });

        // google.maps.event.addListener(marker, 'click', function() {
        //   infowindow.open(map,marker);
        // });

        google.maps.event.addListener(map, 'idle', function() { 
          document.getElementById("change_icon").className = "map_pin_placed";
          document.getElementById("change_icon").src="img/pin_icon_placed.png";
        } );
        google.maps.event.addListener(map, 'dragstart', function() {
          document.getElementById("change_icon").className = "map_pin";
          document.getElementById("change_icon").src="img/pin_icon.png";
        } );

        $scope.map = map;

      }
      ionic.Platform.ready(initialize);

      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };  

      $scope.goto = function ( path ) {
         $window.location.href = path;
      };

      $scope.centerOnMe();   
})

app.controller('ChatsCtrl', function($scope, $window, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.goto = function ( path ) {
     $window.location.href = path;
  };
});

app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});
