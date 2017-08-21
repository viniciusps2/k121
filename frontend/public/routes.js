;(function () {
  'use strict'

  angular.module('secret-friend').config(routes)

  routes.$inject = ['$locationProvider', '$routeProvider']

  function routes ($locationProvider, $routeProvider) {
    function route (url, opts) {
      $routeProvider.when(url, opts)
    }

    $routeProvider.otherwise({
      redirectTo: '/not_found'
    })

    route('/', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'vm'
    })

    route('/secret-friend/:id', {
      templateUrl: 'app/secret-friend/list.html',
      controller: 'SecretFriendListCtrl',
      controllerAs: 'vm'
    })

    route('/not_found', {
      templateUrl: '404.html'
    })
  }
})()
