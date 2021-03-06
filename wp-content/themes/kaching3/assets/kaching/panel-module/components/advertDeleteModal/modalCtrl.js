(function(){
    'use strict';

    console.log('advertDeleteModalCtrl loaded');

    angular.module('panelApp')
        .controller( 'advertDeleteModalCtrl', [
            '$scope',
            'modalOptions',
            'advert',
        function (
            $scope,
            modalOptions,
            advert
        ) {

            $scope.advert = advert;

            $scope.delete = function() {
                modalOptions.delete( advert );
                $scope.$hide();
            };
        }]);
})();
