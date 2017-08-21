;(function () {
  'use strict'

  angular.module('secret-friend').factory('Friend', Friend)

  Friend.$inject = ['$resource', 'environment']

  function Friend ($resource, environment) {
    var rootUrl = environment.secretFriendApi + '/friend'

    var resource = $resource(rootUrl + '/:id', { id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    })

    return {
      findBySecretFriend: findBySecretFriend,
      update: update,
      remove: remove,
      create: create
    }

    function findBySecretFriend (secretFriendId) {
      return resource.query({secretFriend: secretFriendId}).$promise
    }

    function create (secretFriendId, friendData) {
      friendData.secretFriend = secretFriendId
      return resource.save(friendData).$promise
    }

    function update (friend) {
      return resource.update(friend).$promise
    }

    function remove (friend) {
      var param = {id: friend._id}
      return resource.delete(param).$promise
    }
  }
})()
