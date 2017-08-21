;(function () {
  'use strict'

  angular.module('secret-friend').controller('HomeCtrl', HomeCtrl)

  HomeCtrl.$inject = ['SecretFriendCreateService']

  function HomeCtrl (SecretFriendCreateService) {
    var vm = this
    vm.createSecretFriend = SecretFriendCreateService.create
  }
})()
