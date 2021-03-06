(function(){
    'use strict';

    angular.module('panelApp')
        .factory('clientsService', [ '$q', 'apiService', function( $q, apiService ) {

            var getClients = function() {

                var deferred = $q.defer();

                apiService.get( '/clients/', false, true ).then(
                    function( response ) {
                        console.log('getClients() success', response);
                        deferred.resolve( response );
                    },
                    function( response ) {
                        console.log('getClients() failure', response);
                        deferred.reject( response );
                    }
                );

                return deferred.promise;
            };

            var saveClient = function( name ) {

                var deferred = $q.defer();

                var data = { name: name };

                apiService.post( '/clients/', data, true ).then(
                    function( client ) {
                        console.log('saveClient() success', client);
                        getClients().then(
                            function( clients ) {
                                deferred.resolve( client, clients );
                            },
                            function( response ) {
                                deferred.reject( response );
                            }
                        );
                    },
                    function( response ) {
                        console.log('saveClient() failure', response);
                        deferred.reject( response );
                    }
                );

                return deferred.promise;
            };

            return {
                getClients: getClients,
                saveClient: saveClient
            };
        }]);
})();