;(function () {
  'use strict'

  angular.module('secret-friend').controller('SecretFriendModalCtrl', SecretFriendModalCtrl)

  SecretFriendModalCtrl.$inject = ['$uibModalInstance']

  function SecretFriendModalCtrl ($uibModalInstance) {
    var modal = this

    modal.save = function () {
      $uibModalInstance.close(modal.title)
    }

    modal.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }
  }
})()
