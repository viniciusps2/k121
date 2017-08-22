;(function () {
  'use strict'

  angular.module('secret-friend').factory('SecretFriend', SecretFriend)

  SecretFriend.$inject = ['$resource', 'environment']

  function SecretFriend ($resource, environment) {
    var rootUrl = environment.secretFriendApi + '/secret-friend'

    var resource = $resource(rootUrl + '/:id', { id: '@_id', secretFriendId: '@secretFriendId' }, {
      create: {
        method: 'POST'
      },

      friends: {
        url: rootUrl + '/:id/friends',
        method: 'GET',
        isArray: true
      },

      addFriend: {
        url: rootUrl + '/:secretFriendId/friends',
        method: 'POST'
      },

      shuffle: {
        url: rootUrl + '/:id/shuffle',
        method: 'GET',
        isArray: true
      },
    })

    return {
      create: create,
      findById: findById,
      shuffle: shuffle
    }

    function findById (id) {
      return resource.get({id: id}).$promise
    }

    function create (secretFriendData) {
      return resource.create(secretFriendData).$promise
    }

    function shuffle (id) {
      return resource.shuffle({id: id}).$promise
    }
  }
})()
