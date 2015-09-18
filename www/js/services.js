angular.module('starter.services', [])

.factory('Chats', function() {
  var chats = [{
    id: 0,
    name: 'Homes',
    lastText: '7 Places',
    face: 'img/icons/android-home.svg',
    item_bg: 'home'
  }, {
    id: 1,
    name: 'Clubs',
    lastText: '23 Places',
    face: 'img/icons/android-bar.svg',
    item_bg: 'club'
  }, {
    id: 2,
    name: 'Garage',
    lastText: '3 Places',
    face: 'img/icons/android-car.svg',
    item_bg: 'garage'
  }, {
    id: 3,
    name: 'Restaurants',
    lastText: '14 Places',
    face: 'img/icons/fork.svg',
    item_bg: 'rest'
  }, {
    id: 4,
    name: 'Parks',
    lastText: '9 Places',
    face: 'img/icons/android-bicycle.svg',
    item_bg: 'park'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
