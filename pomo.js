var app = angular.module('clock',[]);
app.controller('MainCtrl', function($scope, $interval){
  //variables;
  $scope.breaktime = 5;
  $scope.sessiontime= 15;
  $scope.remainingTime = $scope.sessiontime;
  $scope.sessionName = 'Session';
  $scope.currentTotal;
  
  var runClock = false;
  var totalSec = 60 * $scope.remainingTime;
  $scope.startingTime = $scope.sessiontime;
  
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    ); 
  }
  
  $scope.sessionTime = function(time){
    if(!runClock){
      if($scope.sessionName ==='Session'){
        $scope.sessiontime += time;
        if($scope.sessiontime < 1){
          $scope.sessiontime = 1;
        }
        $scope.remainingTime = $scope.sessiontime;
        $scope.startingTime = $scope.sessiontime;
        totalSec = 60 * $scope.sessiontime;
      }
    }
  }
  
  $scope.breakTime = function(time){
    if(!runClock){
      $scope.breaktime += time;
      if($scope.breaktime < 1){
        $scope.breaktime = 1;
      }
      if($scope.sessionName === 'Break'){
        $scope.timeLeft = $scope.breaktime;
        $scope.startingTime = $scope.breaktime;
        totalSec = 60 * $scope.breaktime;
      }
    }
  }
  
  $scope.startTimer = function() {
    if(!runClock){
      if($scope.currentName === 'Session'){
        $scope.currentTime = $scope.sessiontime;
      }else {
        $scope.currentTime = $scope.breaktime;
      }
      
      updateClock();
      runClock = $interval(updateClock, 1000);
    } else {
      $interval.cancel(runClock);
      runClock = false;
    }
  }
  
  function updateClock(){
    totalSec -= 1;
    if(totalSec < 0){
      if($scope.sessionName === 'Break'){
        $scope.sessionName = 'Session';
        $scope.currentTime = $scope.sessiontime;
        $scope.remainingTime = 60 * $scope.sessiontime;
        $scope.startingTime = $scope.sessiontime;
        totalSec = 60 * $scope.sessiontime;
      } else {
        $scope.sessionName = 'Break';
        $scope.currentTime = $scope.breaktime;
        $scope.remainingTime = 60 * $scope.breaktime;
        $scope.startingTime = $scope.breaktime;
        totalSec = 60 * $scope.breaktime;
      }
    } else {
      $scope.remainingTime = secondsToHms(totalSec);
      
      var denom = 60 * $scope.originalTime;
      var perc = Math.abs((totalSec / denom) * 100 - 100);
      
    }
  }
});