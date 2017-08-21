;(function () {
  'use strict'

  angular.module('secret-friend').service('SecretFriendCreateService', SecretFriendCreateService)

  SecretFriendCreateService.$inject = ['$uibModal', '$location', 'SecretFriend']

  function SecretFriendCreateService ($uibModal, $location, SecretFriend) {
    return {
      create: create
    }

    function create () {
      var secretFriend = {}
      return openModal(secretFriend, function saveFunction (secretFriend) {
        return SecretFriend.create(secretFriend).then(function (secretFriend) {
          $location.path('/secret-friend/' + secretFriend._id)
        })
      })
    }

    function openModal (secretFriend, saveFunction) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/secret-friend/create/modal.html',
        controller: 'ModalCtrl',
        controllerAs: 'modal',
        resolve: {
          modalContext: function () {
            return {
              data: secretFriend,
              saveFunction: saveFunction
            }
          }
        }
      })
      return modalInstance.result
    }
  }
})()
