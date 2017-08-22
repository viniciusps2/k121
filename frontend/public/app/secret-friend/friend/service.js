;(function () {
  'use strict'

  angular.module('secret-friend').service('FriendService', FriendService)

  FriendService.$inject = ['$uibModal', '$location', 'Friend', 'SecretFriend']

  function FriendService ($uibModal, $location, Friend, SecretFriend) {
    return {
      create: create,
      edit: edit,
      remove: remove,
      findBySecretFriend: findBySecretFriend
    }

    function create (secretFriendId) {
      var title = "Adicionar amigo"
      var friendData = {}
      return openModal(title, friendData, function saveFunction (friendData) {
        return Friend.create(secretFriendId, friendData)
      })
    }

    function edit (friend) {
      var title = "Editar amigo"
      var friendData = angular.copy(friend)

      return openModal(title, friendData, function saveFunction (friendData) {
        return Friend.update(friendData)
      })
    }

    function remove (friend) {
      return Friend.remove(friend)
    }

    function findBySecretFriend (secretFriendId) {
      return Friend.findBySecretFriend(secretFriendId)
    }

    function openModal (title, friendData, saveFunction) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/secret-friend/friend/modal.html',
        controller: 'ModalCtrl',
        controllerAs: 'modal',
        resolve: {
          modalContext: function () {
            return {
              title: title,
              data: friendData,
              saveFunction: saveFunction
            }
          }
        }
      })

      return modalInstance.result
    }
  }
})()
