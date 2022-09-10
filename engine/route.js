app.config(function($routeProvider, $locationProvider,$httpProvider,Config) {
     
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common.obickey = Config.token;

    
    $routeProvider.when('/', {
        templateUrl: 'templates/Auth.html',
        controller:"Auth"
    })
       
    
    // $routeProvider.when('/register', {
    //     templateUrl: 'templates/register.html',
    //     controller:"Auth"
    // })
       
    $routeProvider.when('/reset', {
        templateUrl: 'templates/reset.html',
        controller:"Auth"
    })
       
       
    
    $routeProvider.when('/dashboard', {
        templateUrl: 'templates/admin/dashboard.html',
        controller:"admin"
    })
       
    $routeProvider.when('/assets', {
        templateUrl: 'templates/admin/assets.html',
        controller:"admin"
    })
       
    $routeProvider.when('/customers', {
        templateUrl: 'templates/admin/customers.html',
        controller:"admin"
    })


    $routeProvider.when('/agents', {
        templateUrl: 'templates/admin/agents.html',
        controller:"admin"
    })
       
    $routeProvider.when('/transactions', {
        templateUrl: 'templates/admin/transactions.html',
        controller:"admin"
    })
       
    $routeProvider.when('/pool', {
        templateUrl: 'templates/admin/pool.html',
        controller:"admin"
    })
    $routeProvider.when('/requests', {
        templateUrl: 'templates/admin/requests.html',
        controller:"admin"
    })
       
       
    $routeProvider.when('/peers', {
        templateUrl: 'templates/admin/peers.html',
        controller:"admin"
    })
    $routeProvider.when('/backup', {
        templateUrl: 'templates/admin/backup.html',
        controller:"admin"
    })
       
    
    $routeProvider.when('/crypto', {
        templateUrl: 'templates/admin/crypto.html',
        controller:"admin"
    })
    
    
    $routeProvider.when('/jobs', {
        templateUrl: 'templates/admin/jobs.html',
        controller:"admin"
    })
    
    $routeProvider.when('/settings', {
        templateUrl: 'templates/admin/settings.html',
        controller:"admin"
    })
       
    
    $routeProvider.when('/team', {
        templateUrl: 'templates/admin/team.html',
        controller:"admin"
    })
       
    
    $routeProvider.when('/access/:token', {
        templateUrl: 'templates/admin/access.html',
        controller:"Auth"
    })
       
    
    $routeProvider.when('/create_admin', {
        templateUrl: 'templates/admin/create_admin.html',
        controller:"admin"
    })
       
    
  .otherwise({ 
    redirectTo: '/' 
  }); 
    
  $locationProvider
  .html5Mode(true);
    
   
    
     });
    