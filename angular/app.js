// first we have to declare th e module. note that [] is where we will declare the dependecies later. Right now we are leaving it blank
var football = angular.module('FootballApp',['ngRoute','angularUtils.directives.dirPagination','angular.filter']

  ); 

football.controller('allMatchController',['$http',function($http) {
  var main=this;
  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';

  this.baseUrl1 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
// i knew the result is going to be array, so i declared an empty array to initialize
  this.year=[];
  this.getMatchDetails=[];
  this.headers=[];

  this.loadAllMatches = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        angular.forEach(response.data.rounds, function(value) {
          angular.forEach(value.matches, function(matchData) {
            //main.getMatchDetails.push(matchData);
 main.getMatchDetails.push({
              Date: matchData.date,
         Team1Score: matchData.score1,
         Team2Score: matchData.score2,
         Team1Name:matchData.team1.name,
         Team2Name:matchData.team2.name
       });
        });
     });
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server   returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });

       $http({
        method: 'GET',
        url: main.baseUrl1
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        angular.forEach(response.data.rounds, function(value) {
          angular.forEach(value.matches, function(matchData,key) {
           // main.getMatchDetails.push(matchData);
           main.getMatchDetails.push({
              Date: matchData.date,
         Team1Score: matchData.score1,
         Team2Score: matchData.score2,
         Team1Name:matchData.team1.name,
         Team2Name:matchData.team2.name
       });
           
        });     
     });
  }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server   returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });

      main.headers = ["Date","Team1Name","Team2Name","Team1Score","Team2Score"];

  }// end load all matches

  this.loadAllMatches();

}]); // end controller


football.controller('SingleMatchController',['$http','$routeParams',function($http,$routeParams) {

     this.DateHeld = $routeParams.date;
     this.Team1_Name =$routeParams.Team1Name;
     this.Team2_Name=$routeParams.Team2Name;
     this.Team1_Score=$routeParams.Team1Score;
     this.Team2_Score=$routeParams.Team2Score;
     if(this.Team1_Score>this.Team2_Score)
     {
      this.WonBy=$routeParams.Team1Name;
     }
     else
     {
      this.WonBy=$routeParams.Team2Name;
     }

}]); // end controller


football.controller('TeamWiseStatisticsController',['$http','$scope',function($http,$scope) {
  var main=this;
  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';

  this.baseUrl1 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
// i knew the result is going to be array, so i declared an empty array to initialize
  this.TotalWon = [];
  this.TotalMatchesPlayed=[];
  this.TeamName=[];
  this.TotalLost = [];
  this.counts=0; 
  this.getTeamDetails=[];
this.TotalTeam=[];
  this.loadTeamStatistics = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        angular.forEach(response.data.rounds, function(value) {
          angular.forEach(value.matches, function(matchData) {
            //main.getMatchDetails.push(matchData);
 main.getTeamDetails.push({
              Date: matchData.date,
         Team1Score: matchData.score1,
         Team2Score: matchData.score2,
         Team1Name:matchData.team1.name,
         Team2Name:matchData.team2.name
       });
        });
     });

        angular.forEach(main.getTeamDetails, function(value) {
            main.TeamName.push(value.Team1Name);
            main.TeamName.push(value.Team2Name);
          
         });
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server   returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });

       $http({
        method: 'GET',
        url: main.baseUrl1
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        angular.forEach(response.data.rounds, function(value) {
          angular.forEach(value.matches, function(matchData,key) {
           // main.getMatchDetails.push(matchData);
           main.getTeamDetails.push({
              Date: matchData.date,
         Team1Score: matchData.score1,
         Team2Score: matchData.score2,
         Team1Name:matchData.team1.name,
         Team2Name:matchData.team2.name
       });
           
        });     
     });
   angular.forEach(main.getTeamDetails, function(value) {
            main.TeamName.push(value.Team1Name);
            main.TeamName.push(value.Team2Name);
          
         });
  main.TeamName = main.TeamName.filter( function( item, index, inputArray ) {
           return inputArray.indexOf(item) == index;
    });

angular.forEach(main.getTeamDetails, function(value) {
          if(value.Team1Score>value.Team2Score) 
          { 
                main.TotalWon.push({Teams:value.Team1Name}); 
                 main.TotalLost.push({Teams1:value.Team2Name});                     
          }
           if(value.Team1Score<value.Team2Score) 
          { 
                main.TotalWon.push({Teams:value.Team2Name}); 
                 main.TotalLost.push({Teams1:value.Team1Name});                     
          }
            if(value.Team1Score>=0 && value.Team2Score>=0) 
          { 
                  main.TotalMatchesPlayed.push({TeamTotal:value.Team1Name});
                main.TotalMatchesPlayed.push({TeamTotal:value.Team2Name});                  
          }
                    
          });

  }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server   returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
});
}
  this.loadTeamStatistics();



}]); // end controller

        