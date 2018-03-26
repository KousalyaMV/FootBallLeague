football.config(['$routeProvider',function($routeProvider){ 
$routeProvider 
        .when('/',{ 
            // location of the template 
            templateUrl     : 'views/AllMatches-view.html', 
            // Which controller it should use 
            controller      :  'allMatchController', 
            // what is the alias of that controller. 
            controllerAs    :  'footballLeague' 
        })
         .when('/Date/:date/Team1Name/:Team1Name/Team2Name/:Team2Name/Team1Score/:Team1Score/Team2Score/:Team2Score',{

            templateUrl     : 'views/SingleMatches-view.html',
            controller      : 'SingleMatchController',
            controllerAs    : 'SingleMatch'
        })

          .when('/TeamStatistics',{

            templateUrl     : 'views/TeamWiseStatistics-view.html',
            controller      : 'TeamWiseStatisticsController',
            controllerAs    : 'TeamWiseStatistics'
        })
        .otherwise( 
            { 
                //redirectTo:'/' 
                template   : '<h1>404 page not found</h1>' 
            } 
        ); 
}]);