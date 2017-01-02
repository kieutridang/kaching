(function(){
    'use strict';

    angular.module('panelApp')
        .controller( 'campaignsCtrl', [
            '$scope',
            '$alert',
            '$modal',
            'errorHandler',
            'campaignsService',
            '$state',
            'utils',
        function (
            $scope,
            $alert,
            $modal,
            errorHandler,
            campaignsService,
            $state,
            utils
        ) {

            var itemsPerPage = 10;

            $scope.view = {
                initialLoadComplete: false,
                busy: true,
                itemsPerPage: itemsPerPage,
                currentPage: 1,
                maxSize: 10,
                filtersActive: false,
                campaignStatuses: [
                    {code: -1, label: 'Any status'},
                    {code: 0, label: 'Incomplete'},
                    // {code: 1, label: 'Billing'},
                    // {code: 2, label: 'Prepared'},
                    {code: 3, label: 'Live'},
                    // {code: 4, label: 'Completed'},
                    {code: 5, label: 'Stopped'}
                ]
            };

            $scope.view.statusFilterModel = $scope.view.campaignStatuses[0];

            $scope.data = {
                campaignsCount: 0,
                campaigns: []
            };

            $scope.filters = {};

            $scope.daterange = {
                dates: {
                    startDate: null,
                    endDate:   null
                },
                min: moment().format('YYYY-MM-DD')
            };

            $scope.campaignTypes = [
                {code: -1, label: 'Create New Campaign'},
                {code: 0, label: 'Billboards'},
                {code: 1, label: 'Instore Campaign'},
                {code: 2, label: 'Magazine Ads'},
                {code: 3, label: 'Radio Ads'},
                {code: 4, label: 'TV Ads'}
            ];

            var init = function() {
                initFilters();
                getCampaigns();
            };

            function initFilters () {
                $scope.filters = {
                    name: '',
                    client: '',
                    media_title: '',
                    start_date: '',
                    end_date: '',
                    status: undefined
                };
            }

            var defaultOption = {
                templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/billboards/billboards-popup-tmpl.html',
                controller: 'billboardsCtrl',
                animation: 'am-fade-and-scale',
                // placement: 'center',
                backdrop: 'static',
                title: 'Billboards',
                onShow: function(){
                    angular.element('html').css('overflow','hidden');
                },
                onBeforeHide: function() {
                    angular.element('html').css('overflow','initial');
                },
                resolve: {
                    campaignId: function(){
                        // return campaign.id;
                        return undefined;
                    },
                    viewDetail: function(){
                        return undefined;
                    }
                },
                onHide: function() {
                    $scope.reloadCampaigns($scope.view.currentPage);
                }
            };

            var instoreOption = {
                templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/instore-campaign/instore-campaign-popup-tmpl.html',
                controller: 'instoreCampaignCtrl',
                title: 'Instore Campaign'
            };

            var magazineOption = {
                templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/magazine-ads/magazine-ads-popup-tmpl.html',
                controller: 'magazineAdsCtrl',
                title: 'Magazine Ads'
            };

            var radioOption = {
                templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/radio-ads/radio-ads-popup-tmpl.html',
                controller: 'radioAdsCtrl',
                title: 'Radio Ads'
            };

            var tvOption = {
                templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/tv-ads/tv-ads-popup-tmpl.html',
                controller: 'tvAdsCtrl',
                title: 'TV Ads'
            };

            $scope.changePage = function() {
                getCampaigns();
            };

            $scope.reloadCampaigns = function(page) {
                if (page) {
                    $scope.view.currentPage = page;
                } else {
                    $scope.view.currentPage = 1;
                }

                getCampaigns();
            };

            function getCampaigns ( argsObj ) {

                var params = {
                    limit: itemsPerPage,
                    offset: itemsPerPage * ($scope.view.currentPage - 1)
                };

                if ( $scope.filters.name.length > 0 ) {
                    params.name = $scope.filters.name;
                }
                if ( $scope.filters.client.length > 0 ) {
                    params.client = $scope.filters.client;
                }
                if ( $scope.filters.media_title.length > 0 ) {
                    params.media_title = $scope.filters.media_title;
                }
                if ( $scope.filters.start_date.length >0 ) {
                    params.start_date = $scope.filters.start_date;
                }
                if ( $scope.filters.end_date.length >0 ) {
                    params.end_date = $scope.filters.end_date;
                }
                if ( typeof $scope.filters.status !== 'undefined' ) {
                    params.status = $scope.filters.status;
                }

                campaignsService.getCampaigns( params ).then(
                    function( campaigns ) {
                        $scope.data.campaignsCount = campaigns.count;
                        $scope.data.campaigns = campaigns.items;
                        $scope.view.initialLoadComplete = true;
                        $scope.view.busy = false;
                    },
                    function( response ) {
                        $scope.view.busy = true;
                        errorHandler.processApiResponse( response );
                    }
                );
            }

            var deleteCampaign = function( campaign ) {
                var name = campaign.name;
                campaignsService.deleteCampaign( campaign.id ).then(
                    function() {
                        $alert({
                            title: 'Campagin deleted.',
                            content: 'Campaign "' + name + '" has been deleted.',
                            container: '#alerts-container',
                            placement: 'top',
                            duration: 3,
                            type: 'success',
                            show: true
                        });
                        getCampaigns();
                    },
                    function( response ) {
                        errorHandler.processApiResponse( response );
                    }
                );
            };

            $scope.startCampaign = function( campaign ) {
                var name = campaign.name;
                campaignsService.startCampaign( campaign.id ).then(
                    function() {

                        $alert({
                            title: 'Campagin started.',
                            content: 'Campaign "' + name + '" is now live.',
                            container: '#alerts-container',
                            placement: 'top',
                            duration: 3,
                            type: 'success',
                            show: true
                        });

                        getCampaigns();

                    },
                    function( response ) {

                        var processingError = _.findWhere( response.data.errorDetails.logicProcessing.processingErrors, { code: 3 } ) ||
                                            _.findWhere( response.data.errorDetails.logicProcessing.processingErrors, { code: 40 } );

                        if ( typeof processingError !== 'undefined' ) {
                            var errorMsg = 'Please review your campaign settings then start the campaign';
                            if (processingError.code === 40) {
                                errorMsg = processingError.message;
                            }
                            $alert({
                                title: 'Incorrect campaign settings.',
                                content: errorMsg,
                                container: '#alerts-container',
                                placement: 'top',
                                duration: 3,
                                type: 'danger',
                                show: true
                            });
                        } else {
                            errorHandler.processApiResponse( response );
                        }
                    }
                );
            };

            var stopCampaign = function( campaign ) {
                var name = campaign.name;
                campaignsService.stopCampaign( campaign.id ).then(
                    function() {
                        $alert({
                            title: 'Campagin stopped.',
                            content: 'Campaign "' + name + '" has been stopped.',
                            container: '#alerts-container',
                            placement: 'top',
                            duration: 3,
                            type: 'success',
                            show: true
                        });
                        getCampaigns();
                    },
                    function( response ) {
                        errorHandler.processApiResponse( response );
                    }
                );
            };

            $scope.showDeleteCampaignDialog = function( campaign ) {
                var options = {
                    delete: function( campaign ) {
                        console.log('delete camapgin', campaign);
                        deleteCampaign( campaign );
                    }
                };
                $modal({
                    // templateUrl: 'panel-module/components/campaignDeleteModal/modalTmpl.html',
                    templateUrl: templateDirUri + '/assets/kaching/panel-module/components/campaignDeleteModal/modalTmpl.html',
                    controller: 'campaignDeleteModalCtrl',
                    animation: 'am-fade-and-scale',
                    placement: 'center',
                    resolve: {
                        modalOptions: function() {
                            return options;
                        },
                        campaign: function () {
                            return campaign;
                        }
                    }
                });
            };

            $scope.checkCampaignActive = function(e, campaign){
                e.preventDefault();
                if(campaign.status === 3){
                    $scope.showStopCampaignDialog(campaign);
                }else if(campaign.status === 2 || campaign.status === 5){
                    $scope.showStartCampaignDialog(campaign);
                }
           };

            $scope.showStopCampaignDialog = function( campaign ) {
                var callbacks = {
                    stopCampaign: function( campaign ) {
                        console.log('stop camapgin', campaign);
                        stopCampaign( campaign );
                    }
                };
                $modal({
                    templateUrl: templateDirUri + '/assets/kaching/panel-module/components/campaignStopModal/modalTmpl.html',
                    controller: 'campaignStopModalCtrl',
                    animation: 'am-fade-and-scale',
                    placement: 'center',
                    resolve: {
                        callbacks: function() {
                            return callbacks;
                        },
                        campaign: function () {
                            return campaign;
                        }
                    }
                });
            };

            $scope.showStartCampaignDialog = function( campaign ) {
                var callbacks = {
                    startCampaign: function( campaign ) {
                        $scope.startCampaign(campaign);
                    }
                };
                $modal({
                    templateUrl: templateDirUri + '/assets/kaching/panel-module/components/campaignStartModal/modalTmpl.html',
                    controller: 'campaignStartModalCtrl',
                    animation: 'am-fade-and-scale',
                    placement: 'center',
                    resolve: {
                        callbacks: function() {
                            return callbacks;
                        },
                        campaign: function () {
                            return campaign;
                        }
                    }
                });
            };

            $scope.updateFilters = function() {
                $scope.filters.status = ( $scope.view.statusFilterModel.code === -1 ) ? undefined : $scope.view.statusFilterModel.code;
                $scope.reloadCampaigns();
            };

            $scope.$watch('daterange.dates.startDate', function(newValue, oldValue) {
                if ( newValue === null ) {
                    return;
                }
                $scope.filters.start_date = moment( $scope.daterange.dates.startDate ).format('YYYY-MM-DD');
                $scope.filters.end_date = moment( $scope.daterange.dates.endDate ).format('YYYY-MM-DD');
                $scope.updateFilters();
            });

            $scope.toggleFilters = function() {
                if ( $scope.view.filtersActive ) {
                    $scope.clearFilters();
                } else {
                    $scope.view.filtersActive = true;
                }
            };

            $scope.clearFilters = function() {
                $scope.view.filtersActive = false;
                initFilters();
                $scope.reloadCampaigns();
            };

            $scope.showCampaignPopup = function(campaign, viewDetail) {

                utils.setCampaignId(campaign.id);

                if (viewDetail) {
                    utils.setViewDetail(true);
                    $state.go('kaching.campaigns.view', { campaignId: campaign.id });
                } else {
                    utils.setViewDetail(false);
                    $state.go('kaching.campaigns.edit', { campaignId: campaign.id });
                }
            };

            $scope.$on('reload-campaigns', function() {
                $scope.reloadCampaigns();
            });

            $scope.createCampaign = function() {
                utils.setCampaignId(undefined);
                utils.setViewDetail(false);
                $state.go('kaching.campaigns.newCampaign');
            };


            // $scope.campaignTypes = [
            //     {code: -1, label: 'Create New Campaign'},
            //     {code: 0, label: 'Billboards'},
            //     {code: 1, label: 'Instore Campaign'},
            //     {code: 2, label: 'Magazine Ads'},
            //     {code: 3, label: 'Radio Ads'},
            //     {code: 4, label: 'TV Ads'}
            // ];

            init();
        }]);
})();
