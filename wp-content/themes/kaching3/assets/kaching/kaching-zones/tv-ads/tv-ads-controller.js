(function() {
    'use strict';

    angular.module('panelApp')
        .controller('tvAdsCtrl', [
            '$scope',
            '$state',
            '$stateParams',
            'campaignEditorService',
            'campaignId',
            'viewDetail',
            'kachingZonecampaignEditorService',
            'campaignsService',
            '$q',
            function(
                $scope,
                $state,
                $stateParams,
                campaignEditorService,
                campaignId,
                viewDetail,
                kachingZonecampaignEditorService,
                campaignsService,
                $q
            ) {
                var editor = kachingZonecampaignEditorService;

                $scope.logData = function() {
                    editor.logData();
                };

                editor.init(campaignId);

                $scope.step = 1;

                if (viewDetail) {
                    $scope.step = 4;
                    $scope.viewDetail = viewDetail;
                }

                $scope.progress = 1;
                $scope.balance = undefined;

                if (campaignId !== undefined) {
                    $scope.editId = campaignId;
                    $scope.loadEditMode = false;
                    $scope.progress = 4;
                } else {
                    $scope.createMode = true;
                }

                $scope.currentStep = editor.currentStep;

                var templateFolder = kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/tv-ads/steps/';
                $scope.tvAdsStep = {
                    step1: templateFolder + 'step2.html',
                    step2: templateFolder + 'step2.html',
                    step3: templateFolder + 'step3.html',
                    step4: templateFolder + 'step4.html'
                };

                $scope.goNext = function() {
                    $scope.progress += 1;
                    $scope.step += 1;
                };

                $scope.goPrev = function() {
                    $scope.step -= 1;
                };

                $scope.updateStep = function(newVal) {
                    if ($scope.editId) {
                        $scope.step = newVal;
                    } else {
                        $scope.createMode = false;
                        if (newVal <= $scope.progress) {
                            $scope.step = newVal;
                        } else {
                            return;
                        }
                    }
                };

                $scope.activeCampaign = function() {
                    var deferred = $q.defer();
                    var campaignStatus = editor.dataGet('campaignStatus');
                    // var campaign = editor.dataGet('campaign');

                    var campaignId = editor.dataGet('campaignId');
                    campaignsService.getCampaign(campaignId).then(
                        function(data){
                            if (data.media && data.media.length > 0) {
                                if (campaignStatus === 'start' || campaignStatus === false || !$scope.editId && !campaignStatus) {
                                    $scope.campaignId = editor.dataGet('campaignId');
                                    campaignsService.setPrepared($scope.campaignId).then(
                                        function(response) {
                                            deferred.resolve(response);
                                        },
                                        function(response) {
                                            deferred.reject(response);
                                        }
                                    );
                                }
                            } else {
                                deferred.reject();
                            }
                        },
                        function(){
                            deferred.reject();
                        }
                    );

                    return deferred.promise;
                };

                $scope.updateBalance = function(value) {
                    $scope.balance = value;
                };

                $scope.goToFund = function(modal) {
                    $scope.$broadcast('fund-broadcast');
                    modal.$hide();
                    $state.go('funds');
                };
            }
        ]);
})();
