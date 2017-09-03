'use strict'

var app = angular.module('myNote', ['ui.bootstrap']);

app.controller("noteCtrl", function ($scope, $modal, $log) {
    $scope.note = [
        { 'text': 'Pay phone bill', 'colour': 'LightYellow' },
        { 'text': 'Remember to feed the dog', 'colour': 'LightBlue' },
        { 'text': 'Buy Shampoo', 'colour': 'Pink' },
        { 'text': 'Book doctors appointment', 'colour': 'LightBlue' },
        { 'text': 'Buy Tea', 'colour': 'Pink' },
        { 'text': 'Pay electircity bill', 'colour': 'LightYellow' },
        { 'text': 'Take dog to vet', 'colour': 'LightBlue' },
        { 'text': 'Pay internet bill', 'colour': 'LightYellow' }];

      
    $scope.colourIncludes = [];

    $scope.includeColour = function (colour) {
        var i = $.inArray(colour, $scope.colourIncludes);
        if (i > -1) {
            $scope.colourIncludes.splice(i, 1);
        } else {
            $scope.colourIncludes.push(colour);
        }
    };

    $scope.colourFilter = function (note) {
        if ($scope.colourIncludes.length > 0) {
            if ($.inArray(note.colour, $scope.colourIncludes) < 0)
                return;
        }

        return note;
    }

    $scope.newnote = { text: "", colour: "" }

    $scope.remove = function (index) {
        $scope.note.splice(index, 1);
    }

    $scope.clearAll = function () {
        $scope.note = [];
    }

    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (data) {
            $scope.newnote = data;
            $scope.note.push(data);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});


angular.module('myNote').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.ok = function () {
        $modalInstance.close($scope.newnote);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});