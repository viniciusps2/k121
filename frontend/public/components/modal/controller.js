;(function () {
  'use strict'

  angular.module('secret-friend').controller('ModalCtrl', ModalCtrl)

  ModalCtrl.$inject = ['$uibModalInstance', 'modalContext']

  function ModalCtrl ($uibModalInstance, modalContext) {
    var modal = this

    modal.title = modalContext.title
    modal.data = modalContext.data

    modal.save = function () {
      modal.errorMessage = ''

      return modalContext.saveFunction(modal.data)
        .then(function () {
          $uibModalInstance.close(true)
        })
        .catch(function (error) {
          modal.errorMessage = error.data.message
        })
    }

    modal.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }
  }
})()
