(function() {
    'use strict';

    console.log('apiUlabService loaded');

    angular.module('kachingCore')
        .factory('apiUlabService', [
            '$http',
            '$cookies',
            '$q',
            '$window',
            'ulabApiUrl',
            'ulabService',
            function(
                $http,
                $cookies,
                $q,
                $window,
                ulabApiUrl,
                ulabService
            ) {

                console.log('in apiUlabService');

                return {
                    get: getRequest,
                    put: putRequest,
                    post: postRequest,
                    patch: patchRequest,
                    delete: deleteRequest
                };

                function makeRequest(method, path, data, authRequired) {

                    console.log('in makeRequest()', method, path, data, authRequired);

                    var deferred = $q.defer();

                    var request = {
                        method: method,
                        url: ulabApiUrl + path
                    };

                    if (data) {
                        if (method === 'GET') {
                            request.params = data;
                        } else {
                            request.data = data;
                            request.data.email = 'kachingmail@ulab.com';
                            request.data.password = '12345678';
                        }
                    }

                    if (authRequired) {
                        request.headers = {
                            'Accept':           'application/vnd.ulab.v0+json',
                            'Authorization':    'Bearer ' + ulabService.getUlabToken()
                        };
                    }

                    $http(request).then(
                        function(response) {
                            console.log('makeRequest() success - response, status', response);
                            deferred.resolve(response.data);
                        },
                        function(response) {
                            console.log('makeRequest() failure - response, status', response);
                            if (response.status === 403 && request.url.match(/\/auth\/logout\/$/) === null) {
                                $window.location.href = kachingAppConfig.panelUrl + '#expired';
                            }
                            deferred.reject(response);
                        }
                    );

                    return deferred.promise;
                }

                function getRequest(path, data, authRequired) {
                    console.log('in get()');
                    data = (typeof data !== 'object') ? false : data;
                    authRequired = (authRequired === true) ? true : false;
                    return makeRequest('GET', path, data, authRequired);
                }

                function putRequest(path, data, authRequired) {
                    console.log('in put()');
                    data = (typeof data !== 'object') ? false : data;
                    authRequired = (authRequired === true) ? true : false;
                    return makeRequest('PUT', path, data, authRequired);
                }

                function postRequest(path, data, authRequired) {
                    console.log('in post()');
                    data = (typeof data !== 'object') ? false : data;
                    authRequired = (authRequired === true) ? true : false;
                    return makeRequest('POST', path, data, authRequired);
                }

                function patchRequest(path, data, authRequired) {
                    console.log('in patch()');
                    data = (typeof data !== 'object') ? false : data;
                    authRequired = (authRequired === true) ? true : false;
                    return makeRequest('PATCH', path, data, authRequired);
                }

                function deleteRequest(path, data, authRequired) {
                    console.log('in delete()');
                    data = (typeof data !== 'object') ? false : data;
                    authRequired = (authRequired === true) ? true : false;
                    return makeRequest('DELETE', path, data, authRequired);
                }

            }
        ]);
})();
