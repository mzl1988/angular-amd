require.config({

  // alias libraries paths.  Must set 'angular'
  paths: {
    'angular': 'scripts/ext/angular',
    'angular-route': 'scripts/ext/angular-route',
    'angular-ui-router': 'scripts/ext/angular-ui-router',
    'angularAMD': 'scripts/ext/angularAMD',
    'ngload': 'scripts/ext/ngload',
    'angular-resource': 'scripts/ext/angular-resource',
    'config': 'scripts/config/config'
  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    'angular-route': [ 'angular' ],
    'angularAMD': [ 'angular' ],
    'ngload': [ 'angularAMD' ],
    'angular-resource': [ 'angular' ],
    'angular-ui-router': [ 'angular' ],
    'config': [ 'angular' ]
  },

  // kick start application
  deps: ['app']
});
