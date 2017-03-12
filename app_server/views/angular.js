angular.module('myApp', []);

var myController = function($scope) {
    $scope.myInput = "world!";
};

angular
    .module('myApp')
    .controller('myController', myController);
