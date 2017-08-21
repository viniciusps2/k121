;(function () {
  'use strict'

  angular.module('secret-friend').controller('SecretFriendListCtrl', SecretFriendListCtrl)

  SecretFriendListCtrl.$inject = ['$routeParams', '$q', 'SecretFriend', 'FriendService']

  function SecretFriendListCtrl ($routeParams, $q, SecretFriend, FriendService) {
    var vm = this
    var id = $routeParams.id

    vm.friends = []
    vm.addFriend = addFriend
    vm.editFriend = editFriend
    vm.removeFriend = removeFriend
    vm.shuffle = shuffle

    initialize(id)

    function listFriends () {
      return FriendService.findBySecretFriend(id).then(function (friends) {
        vm.friends = friends
      })
    }

    function loadSecretFriend () {
      return SecretFriend.findById(id).then(function (secretFriend) {
        vm.title = secretFriend.title
      })
    }

    function addFriend () {
      return FriendService.create(id).then(listFriends)
    }

    function editFriend (friend) {
      return FriendService.edit(friend).then(listFriends)
    }

    function removeFriend (friend) {
      return FriendService.remove(friend).then(listFriends)
    }

    function shuffle () {
      return SecretFriend.shuffle(id)
      .then(function () {
        vm.message = {success: 'Sorteio realizado com sucesso, foi enviado um e-mail para cada um dos integrantes com a pessoa sorteada para receber o presente.'}
      })
      .catch(function (error) {
        console.log('===============logging: error ====',error);
        vm.message = {error: error.data.message}
      })
    }

    function initialize () {
      $q.all([
        loadSecretFriend(),
        listFriends(),
        addFriend()
      ])
    }
  }
})()
