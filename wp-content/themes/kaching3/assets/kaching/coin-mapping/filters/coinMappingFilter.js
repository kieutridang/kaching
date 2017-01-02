(function() {
    'use strict';

    angular.module('panelApp')
        .filter('coinMappingFilter', ['$window', function($window) {
            return (items, country) => {

                if (country) {
                    var data = items.filter((item) => {
                        return item.country.toLowerCase().indexOf(country.toLowerCase()) > -1 ? true : false;
                    });

                    return data;
                } else {
                    return items;
                }

            };
        }]);

})();
