;(function () {
  'use strict'

  angular.module('secret-friend')

    .constant('environment', {
      secretFriendApi: checkInjectedVariable('/* @echo SECRETFRIEND_API */', 'http://localhost:3000')
    })

  function checkInjectedVariable (value, defaultValue) {
    return value === 'undefined' || value.indexOf('echo') >= 0 ? defaultValue : value.replace(/\/$/, '')
  }
})()
