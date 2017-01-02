(function() {
    'use strict';
    angular.module('panelApp')
        .directive('adDollars', [
            '$state',
            '$stateParams',
            '$timeout',
            'campaignsService',
            'errorHandler',
            'utils',
            function(
                $state,
                $stateParams,
                $timeout,
                campaignsService,
                errorHandler,
                utils
            ) {
                return {
                    restrict: 'E',
                    scope: {
                        medias: '=',
                        campaign: '=',
                        selectedMedia: '='
                    },
                    templateUrl: templateDirUri + '/assets/kaching/panel-module/directives/adDollars/adDollarsTmpl.html',
                    link: function(scope, ele, attrs) {
                        ele.on('click','.media-preview-collapsed',function() {
                            var $storeArea = angular.element(this).closest('.store-header-area');
                            var $expandItem = $storeArea.find('.media-preview-expanded');

                            $storeArea.find('.glyphicon').toggleClass('glyphicon-menu-down').toggleClass('glyphicon-menu-right');
                            $storeArea.toggleClass('has-darkgray');
                            $expandItem.slideToggle();

                            var $others = angular.element('.store-header-area').not($storeArea);
                            $others.find('.glyphicon').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-right');
                            $others.find('.media-preview-expanded').slideUp();
                            $others.removeClass('has-darkgray');
                            scope.showShareMessage = false;
                        });
                    },
                    controller: function($scope) {
                        $scope.grandTotal = 0;
                        $scope.increaseRewardSetting = function($event, media, setting, value) {
                            $event.stopPropagation();
                            media.reward[setting] = 1*value + 1;
                            $scope.updateAmount();
                            $scope.updateMediaItem(media);
                        };
                        $scope.decreaseRewardSetting = function($event, media, setting, value) {
                            $event.stopPropagation();
                            if (media.reward[setting] > 0) {
                                media.reward[setting] = 1*value - 1;
                                $scope.updateAmount();
                                $scope.updateMediaItem(media);
                            }
                        };

                        $scope.increaseSetting = function($event, campaign, setting, value) {
                            $event.stopPropagation();
                            campaign[setting] = 1*value + 1;
                            $scope.updateAmount();
                            $scope.updateMediaItem(campaign);
                        };
                        $scope.decreaseSetting = function($event, campaign, setting, value) {
                            $event.stopPropagation();
                            if (campaign[setting] > 0) {
                                campaign[setting] = 1*value - 1;
                                $scope.updateAmount();
                                $scope.updateMediaItem(campaign);
                            }
                        };
                        $scope.updateAmount = function() {
                            $scope.grandTotal = 0;

                            angular.forEach($scope.medias, function(value, key) {
                                $scope.grandTotal += 1 * value.bets_per_view;

                                var totalSetting = 0;

                                // totalSetting = totalSetting + 1*value.reward.send_information;
                                totalSetting = totalSetting + 1*value.reward.share;
                                totalSetting = totalSetting + 1*value.reward.product;

                                $scope.grandTotal += totalSetting;
                            });

                            if ($scope.campaign) {
                                $scope.grandTotal += 1*$scope.campaign.register;
                            }
                        };
                        $scope.updateMediaItem = function(media) {
                            media.subTotal = 1*media.bets_per_view;
                            // media.subTotal += (1*media.reward.send_information);
                            media.subTotal += (1*media.reward.share);
                            media.subTotal += (1*media.reward.product);
                        };
                        $scope.toggleSelectedMedia = function(media) {
                            if (!!!media.reward.share_message) {
                                media.showShareMessage = false;
                            }
                            if (!$scope.selectedMedia) {
                                $scope.selectedMedia = media;
                            } else {
                                if ($scope.selectedMedia.id !== media.id) {
                                    $scope.selectedMedia = media;
                                } else {
                                    $scope.selectedMedia = null;
                                }
                            }
                        };
                        $scope.removeProduct = function(media, product) {
                            product.selected = false;
                            media.products = _.without(media.products, _.findWhere(media.products, {id:product.id}));
                        };

                        $scope.stopEvent = function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        };
                    }
                };
            }
        ]);
})();
