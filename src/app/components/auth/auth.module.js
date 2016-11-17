angular
  .module('components.auth', [
    'ui.router',
    'firebase'
  ])
  .config(function ($firebaseRefProvider) {

    var config = {
    apiKey: "AIzaSyBVqoYMsPaYBc7JQEVJ3HCvyAeI0scpu4s",
    authDomain: "contacts-manager-608d7.firebaseapp.com",
    databaseURL: "https://contacts-manager-608d7.firebaseio.com",
    storageBucket: "contacts-manager-608d7.appspot.com",
    messagingSenderId: "652684942872"
  };

    $firebaseRefProvider
      .registerUrl({
        default: config.databaseURL,
        contacts: config.databaseURL + '/contacts'
      });

    firebase.initializeApp(config);
  })
  .run(function ($transitions, $state, AuthService) {
    $transitions.onStart({
      to: function (state) {
        return !!(state.data && state.data.requiredAuth);
      }
    }, function() {
      return AuthService
        .requireAuthentication()
        .catch(function () {
          return $state.target('auth.login');
        });
    });
    $transitions.onStart({
      to: 'auth.*'
    }, function () {
      if (AuthService.isAuthenticated()) {
        return $state.target('app');
      }
    });
  });
