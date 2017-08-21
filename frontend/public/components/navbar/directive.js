;(function () {
  'use strict'

  angular.module('secret-friend').directive('navbar', navbar)

  function navbar () {
    return {
      templateUrl: 'components/navbar/navbar.html'
    }
  }
})()
