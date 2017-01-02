'use strict';

(function () {
    'use strict';

    angular.module('panelApp', ['underscore', 'ngSanitize', 'ngCookies', 'ngAnimate', 'ngTouch', 'ui.router', 'ui.bootstrap', 'mgcrea.ngStrap', 'daterangepicker', 'com.2fdevs.videogular', 'infinite-scroll', 'angularFileUpload', 'chart.js', 'ui.mask', 'ngImgCrop', 'ngMap', 'ngCsv']).constant('apiUrl', kachingAppConfig.apiUrl).constant('ulabApiUrl', kachingAppConfig.ulabApiUrl).constant('sessionDays', 30).constant('statePermissions', {
        advertiser: ['expired', 'kaching.account', 'kaching.cards', 'kaching.funds', 'kaching.activeList', 'kaching.archivedFund', 'billing', 'billing.paymentRequest', 'billing.paymentRequest.edit', 'kaching.campaigns', 'kaching.campaigns.edit', 'kaching.campaigns.view', 'campaigns.new', 'campaigns.new.step1', 'campaigns.new.step2', 'campaigns.new.step3', 'campaigns.new.step4', 'campaigns.new.step5', 'campaigns.new.step6', 'kaching.campaigns.newCampaign', 'media', 'media.view', 'media.edit', 'kaching.products', 'kaching.products.view', 'kaching.products.edit', 'kaching.dashboard', 'advertisements', 'advertisements.new', 'advertisements.edit', 'zones', 'kaching.analytics', 'kaching.orderHistory', 'kaching.orderHistory.edit', 'kaching.lottery', 'kaching.coinMapping', 'kaching'],
        developer: ['expired', 'account', 'apikeys']
    });

    angular.module('panelApp').config(['$stateProvider', '$urlRouterProvider', 'statePermissions', 'highchartsNGProvider', function ($stateProvider, $urlRouterProvider, statePermissions, highchartsNGProvider) {

        var controllersPath = kachingAppConfig.wpTemplateUri + '/assets/kaching/panel-module/controllers/';
        highchartsNGProvider.basePath('/js/');
        var globalHeaderView = {
            controller: 'headerCtrl',
            templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/panel-module/components/header/headerTmpl.html'
        };

        $urlRouterProvider.otherwise('/kaching');

        $stateProvider
        // Kaching
        .state('kaching', {
            url: '/kaching',
            data: { title: 'Home' },
            views: {
                'header@': globalHeaderView,
                'main@': {
                    controller: 'campaignsCtrl',
                    templateUrl: controllersPath + 'campaigns/campaignsTmpl.html'
                }
            }
        })
        // Session expired
        .state('expired', {
            url: '/expired',
            data: { title: 'Session Expired' },
            views: {
                'header@': globalHeaderView,
                'main@': {
                    controller: 'expiredCtrl',
                    templateUrl: controllersPath + 'expired/expiredTmpl.html'
                }
            }
        })
        // Account settings
        .state('kaching.account', {
            url: '/account',
            data: { title: 'Account Settings' },
            views: {
                'main@': {
                    controller: 'profileCtrl',
                    templateUrl: controllersPath + 'profile/profileTmpl.html'
                }
            }
        })
        // Credit cards
        .state('kaching.cards', {
            url: '/credit-cards',
            data: { title: 'Credit Cards' },
            views: {
                'main@': {
                    controller: 'creditCardsCtrl',
                    templateUrl: controllersPath + 'creditCards/creditCardsTmpl.html'
                }
            }
        })
        // Analytics
        .state('kaching.analytics', {
            url: '/analytics',
            data: { title: 'Analytics' },
            views: {
                'main@': {
                    controller: 'analyticsCtrl',
                    templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/analytics/analyticsTmpl.html'
                }
            }
        })
        // Add funds
        .state('kaching.funds', {
            url: '/add-funds',
            data: { title: 'Add Funds' },
            views: {
                'main@': {
                    controller: 'addFundsCtrl',
                    templateUrl: controllersPath + 'addFunds/addFundsTmpl.html'
                }
            }
        }).state('kaching.coinMapping', {
            url: '/coin-mapping',
            data: { title: 'Coin Mapping' },
            views: {
                'main@': {
                    controller: 'coinMappingCtrl',
                    templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/coin-mapping/coinMappingTmpl.html'
                }
            }
        }).state('kaching.activeList', {
            url: '/active-list',
            data: { title: 'Active Fund Lists' },
            views: {
                'main@': {
                    controller: 'activeFundCtrl',
                    templateUrl: controllersPath + 'addFunds/activeFundTmpl.html'
                }
            }
        }) //archivedFund
        .state('kaching.archivedFund', {
            url: '/archived-fund',
            data: { title: 'Archived Fund Lists' },
            views: {
                'main@': {
                    controller: 'archivedFundCtrl',
                    templateUrl: controllersPath + 'addFunds/archivedFundTmpl.html'
                }
            }
        })
        // Billing
        .state('billing', {
            url: '/billing',
            data: { title: 'Billing' },
            views: {
                'header@': globalHeaderView,
                'main@': {
                    controller: 'billingCtrl',
                    templateUrl: controllersPath + 'billing/billingTmpl.html'
                }
            }
        }).state('billing.paymentRequest', {
            url: '/payment-request',
            data: { title: 'Payment Request' },
            views: {
                'main@': {
                    controller: 'paymentRequestCtrl',
                    templateUrl: controllersPath + 'billing/paymentRequestTmpl.html'
                }
            }
        }).state('billing.paymentRequest.edit', {
            url: '/edit/:paymentId',
            data: { title: 'Payment Request' },
            views: {
                'main@': {
                    controller: 'editPaymentRequestCtrl',
                    templateUrl: controllersPath + 'billing/editPaymentRequestTmpl.html'
                }
            }
        })
        // Dashboard
        .state('kaching.dashboard', {
            url: '/dashboard',
            data: { title: 'Dashboard' },
            views: {
                'main@': {
                    controller: 'dashboardCtrl',
                    templateUrl: controllersPath + 'dashboard/dashboard-tmpl.html'
                }
            }
        })
        ////////////
        // Campaigns
        ////////////
        .state('kaching.campaigns', {
            url: '/campaigns',
            data: { title: 'Campaigns' },
            views: {
                'main@': {
                    controller: 'campaignsCtrl',
                    templateUrl: controllersPath + 'campaigns/campaignsTmpl.html'
                }
            }
        }).state('kaching.campaigns.edit', {
            url: '/edit/:campaignId',
            data: { title: 'Edit Campaign' },
            views: {
                'main@': {
                    // controller: 'editCampaignCtrl',
                    // templateUrl: controllersPath + 'campaignEditor/editCampaignTmpl.html'
                    controller: 'newCampaignEditorCtrl',
                    templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/newCampaignEditor/newCampaignEditorTmpl.html'
                }
            }
        }).state('kaching.campaigns.view', {
            url: '/view/:campaignId',
            data: { title: 'Edit Campaign' },
            views: {
                'main@': {
                    controller: 'newCampaignEditorCtrl',
                    templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/newCampaignEditor/newCampaignEditorTmpl.html'
                }
            }
        }).state('kaching.campaigns.newCampaign', {
            url: '/create-new-campaign',
            data: { title: 'New Campaign' },
            views: {
                'main@': {
                    controller: 'newCampaignEditorCtrl',
                    templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/newCampaignEditor/newCampaignEditorTmpl.html'
                }
            },
            resolve: {
                campaignId: function campaignId(utils) {
                    return utils.getCampaignId();
                }
            }
        }).state('campaigns.new', {
            url: '/new-campaign',
            data: { title: 'New Campaign' },
            views: {
                'main@': {
                    controller: 'campaignEditorCtrl',
                    templateUrl: controllersPath + 'campaignEditor/campaignEditorTmpl.html'
                }
            }
        }).state('campaigns.new.step1', {
            views: {
                'campaignEditorMain': {
                    controller: 'campaignEditorStep1Ctrl',
                    templateUrl: controllersPath + 'campaignEditor/steps/step1Tmpl.html'
                }
            }
        }).state('campaigns.new.step2', {
            views: {
                'campaignEditorMain': {
                    controller: 'campaignEditorStep2Ctrl',
                    templateUrl: controllersPath + 'campaignEditor/steps/step2Tmpl.html'
                }
            }
        }).state('campaigns.new.step3', {
            views: {
                'campaignEditorMain': {
                    controller: 'campaignEditorStep3Ctrl',
                    templateUrl: controllersPath + 'campaignEditor/steps/step3Tmpl.html'
                }
            }
        }).state('campaigns.new.step4', {
            views: {
                'campaignEditorMain': {
                    controller: 'campaignEditorStep4Ctrl',
                    templateUrl: controllersPath + 'campaignEditor/steps/step4Tmpl.html'
                }
            }
        }).state('campaigns.new.step5', {
            views: {
                'campaignEditorMain': {
                    controller: 'campaignEditorStep5Ctrl',
                    templateUrl: controllersPath + 'campaignEditor/steps/step5Tmpl.html'
                }
            }
        }).state('campaigns.new.step6', {
            views: {
                'campaignEditorMain': {
                    controller: 'campaignEditorStep6Ctrl',
                    templateUrl: controllersPath + 'campaignEditor/steps/step6Tmpl.html'
                }
            }
        }).state('advertisements', {
            url: '/advertisements',
            data: { title: 'Advertisement' },
            views: {
                'header@': globalHeaderView,
                'main@': {
                    controller: 'advertisementsCtrl',
                    templateUrl: controllersPath + 'advertisement/advertisement-tmpl.html'
                }
            }
        }).state('advertisements.new', {
            url: '/new-advertisement',
            data: { title: 'Advertisement' },
            views: {
                'header@': globalHeaderView,
                'main@': {
                    controller: 'editAdvertisementCtrl',
                    templateUrl: controllersPath + 'advertisementEditor/advertisement-editor-tmpl.html'
                }
            }
        }).state('advertisements.edit', {
            url: '/edit/:advertId',
            data: { title: 'Edit Advertisement' },
            views: {
                'main@': {
                    controller: 'editAdvertisementCtrl',
                    templateUrl: controllersPath + 'advertisementEditor/advertisement-editor-tmpl.html'
                }
            }
        })

        /////////
        // Media
        /////////
        .state('media', {
            url: '/media',
            data: { title: 'Media' },
            views: {
                'header@': globalHeaderView,
                'main@': {
                    controller: 'mediaCtrl',
                    templateUrl: controllersPath + 'media/mediaTmpl.html'
                }
            }
        }).state('media.view', {
            url: '/view/:mediaId',
            data: { title: 'View Media' },
            views: {
                'main@': {
                    controller: 'mediaViewCtrl',
                    templateUrl: controllersPath + 'mediaView/mediaViewTmpl.html'
                }
            }
        }).state('media.edit', {
            url: '/edit/:mediaId',
            data: { title: 'Edit Media' },
            views: {
                'main@': {
                    controller: 'mediaEditCtrl',
                    templateUrl: controllersPath + 'mediaEdit/mediaEditTmpl.html'
                }
            }
        })

        ///////////
        // Products
        ///////////
        .state('kaching.products', {
            url: '/products',
            data: { title: 'Products' },
            views: {
                'header@': globalHeaderView,
                'main@': {
                    controller: 'productsCtrl',
                    templateUrl: controllersPath + 'products/productsTmpl.html'
                }
            }
        }).state('kaching.products.view', {
            url: '/view/:productId',
            data: { title: 'View Product' },
            views: {
                'main@': {
                    controller: 'productViewCtrl',
                    templateUrl: controllersPath + 'productView/productViewTmpl.html'
                }
            }
        }).state('kaching.products.edit', {
            url: '/edit/:productId',
            data: { title: 'Edit Product' },
            views: {
                'main@': {
                    controller: 'productEditCtrl',
                    templateUrl: controllersPath + 'productEdit/productEditTmpl.html'
                }
            }
        })
        ////////////////
        // API keys page
        ////////////////
        .state('apikeys', {
            url: '/api-keys',
            data: { title: 'API Keys' },
            views: {
                'header@': globalHeaderView,
                'main@': {
                    controller: 'apiKeysCtrl',
                    templateUrl: controllersPath + 'apiKeys/apiKeysTmpl.html'
                }
            }
        })
        ////////////////
        // Order History
        ////////////////
        .state('kaching.orderHistory', {
            url: '/order-history',
            data: { title: 'Order History' },
            params: { updatingId: null },
            views: {
                'main@': {
                    controller: 'orderHistoryCtrl',
                    templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/order-history/orderHistoryTmpl.html'
                }
            }
        })
        /////////////////////
        // Order History Edit
        /////////////////////
        .state('kaching.orderHistory.edit', {
            url: '/order-detail/:orderNumber',
            data: { title: 'Order History Detail' },
            params: { order: null },
            views: {
                'main@': {
                    controller: 'orderHistoryDetailCtrl',
                    templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/order-history/orderHistoryDetailTmpl.html'
                }
            }
        })
        /////////////////////
        // Lottery List
        /////////////////////
        .state('kaching.lottery', {
            url: '/lottery',
            data: { title: 'Lottery List' },
            params: { order: null },
            views: {
                'main@': {
                    controller: 'lotteryCtrl',
                    templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/lottery/lotteryTmpl.html'
                }
            }
        })
        /////////
        // Zone
        /////////
        .state('zones', {
            url: '/kaching-zones',
            data: { title: 'Kaching zones' },
            views: {
                'header@': globalHeaderView
            }
        });
    }]);

    angular.module('panelApp').run(['$rootScope', '$location', '$state', 'authService', 'permissionsService', function ($rootScope, $location, $state, authService, permissionsService) {
        // Handle unknown URLs
        // This is a replacement for the '$urlRouterProvider.otherwise' block in module config
        if (authService.isAdvertiser()) {
            $state.transitionTo('kaching');
        } else if (authService.isDeveloper()) {
            $state.transitionTo('apikeys');
        }

        $rootScope.$on('stateNotFound', function (event, unfoundState, fromState, fromParams) {
            if (authService.isAdvertiser()) {
                $state.transitionTo('kaching');
            } else if (authService.isDeveloper()) {
                $state.transitionTo('apikeys');
            }
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

            if (toState.name === 'expired') {
                return;
            }

            if (!authService.isLoggedIn()) {
                $state.transitionTo('expired');
                event.preventDefault();
                return;
            }

            if (!permissionsService.userHasAccess(toState.name)) {
                if (authService.isAdvertiser()) {
                    $state.transitionTo('kaching');
                } else if (authService.isDeveloper()) {
                    $state.transitionTo('apikeys');
                }
                event.preventDefault();
                return;
            }
        });
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('panelNav', ['utils', 'authService', '$window', function (utils, authService, $window) {
        return {
            restrict: 'AE',
            replace: 'true',
            scope: {
                'loggedIn': '='
            },
            templateUrl: templateDirUri + '/assets/kaching/directives/panelNav/panelNavTmpl.html',
            link: function link(scope, element, attrs) {
                var ele = element;

                ele.on('click', 'a.item-level-1', function (event) {
                    event.preventDefault();

                    var $item = angular.element(this);

                    var $selectorItem = $item.closest('ul.panel-nav > li');
                    var $subNavigation = $selectorItem.find('.sub-navigation-kaching');

                    $subNavigation.slideToggle();

                    var $others = angular.element('ul.panel-nav > li').not($selectorItem);
                    $others.find('a.item-level-1').removeClass('active');
                    $others.find('a.item-level-2').removeClass('active');
                    $others.find('.sub-navigation-kaching').slideUp();

                    $item.addClass('active');
                });

                ele.on('click', 'a.item-level-2', function (event) {
                    event.preventDefault();

                    var $item = angular.element(this);
                    var $selectorItem = $item.closest('ul.sub-navigation-kaching > li');
                    var $others = angular.element('ul.sub-navigation-kaching > li').not($selectorItem);

                    $others.find('a.item-level-2').removeClass('active');
                    $item.addClass('active');
                });
            },
            controller: ['$rootScope', '$scope', '$state', '$modal', function ($rootScope, $scope, $state, $modal) {
                $scope.$state = $state;
                $scope.isPanel = kachingAppConfig.isPanelPage;

                $scope.urls = {
                    campaigns: kachingAppConfig.panelUrl + '#/campaigns',
                    media: kachingAppConfig.panelUrl + '#/media',
                    products: kachingAppConfig.panelUrl + '#/products',
                    billing: kachingAppConfig.panelUrl + '#/billing',
                    apikeys: kachingAppConfig.panelUrl + '#/api-keys',
                    dashboard: kachingAppConfig.panelUrl + '#/dashboard'
                };

                $scope.isAdvertiser = function () {
                    return authService.isAdvertiser();
                };

                $scope.isDeveloper = function () {
                    return authService.isDeveloper();
                };

                var defaultOption = {
                    templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/billboards/billboards-popup-tmpl.html',
                    controller: 'billboardsCtrl',
                    animation: 'am-fade-and-scale',
                    // placement: 'center',
                    backdrop: 'static',
                    title: 'Billboards',
                    onShow: function onShow() {
                        angular.element('html').css('overflow', 'hidden');
                    },
                    onBeforeHide: function onBeforeHide() {
                        angular.element('html').css('overflow', 'initial');
                    },
                    resolve: {
                        campaignId: function campaignId() {
                            return undefined;
                        },
                        viewDetail: function viewDetail() {
                            return undefined;
                        }
                    },
                    onHide: function onHide() {
                        $rootScope.$broadcast('reload-campaigns');
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

                $scope.showKachingZonePopup = function (type) {

                    var option = {};

                    switch (type) {
                        case 'billboards':
                            angular.extend(option, defaultOption);
                            break;
                        case 'instore':
                            angular.extend(option, defaultOption, instoreOption);
                            break;
                        case 'magazine-ads':
                            angular.extend(option, defaultOption, magazineOption);
                            break;
                        case 'radio-ads':
                            angular.extend(option, defaultOption, radioOption);
                            break;
                        case 'tv-ads':
                            angular.extend(option, defaultOption, tvOption);
                            break;
                        default:
                            break;
                    }

                    $modal(option);
                };

                $scope.logout = function () {
                    authService.logout().then(function () {
                        $window.location.href = kachingAppConfig.homeUrl;
                    });
                };
            }]
        };
    }]);
})();
'use strict';

//
// A patch for the ngFileUpload module.
// It's a replacement for the nvFileOver directive, which has multiple bugs.
// Usage - simply add the 'ifm-over-class' attribute to the nv-file-drop element:
// <div nv-file-drop uploader="uploader" ifm-over-class="fileover"></div>
//

(function () {
    'use strict';

    angular.module('panelApp').config(function ($provide) {
        $provide.decorator('nvFileDropDirective', function ($delegate) {
            var directive = $delegate[0],
                link = directive.link;

            directive.compile = function () {
                return function (scope, element, attrs) {
                    var overClass = attrs.ifmOverClass || 'fileover';
                    link.apply(this, arguments);
                    element.on('dragover', function () {
                        element.addClass(overClass);
                    });
                    element.on('dragleave', function () {
                        element.removeClass(overClass);
                    });
                    element.on('drop', function () {
                        element.removeClass(overClass);
                    });
                };
            };

            return $delegate;
        });
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('ifmClipboard', ['$tooltip', function ($tooltip) {
        return {
            restrict: 'A',
            scope: {
                clipboardSuccess: '&',
                clipboardError: '&',
                tooltipTitle: '@',
                tooltipPlacement: '@',
                tooltipAnimation: '@'
            },
            link: function link(scope, el) {

                var tooltipTitle = typeof scope.tooltipTitle === 'undefined' ? 'Copied' : scope.tooltipTitle;
                var tooltipPlacement = typeof scope.tooltipPlacement === 'undefined' ? 'top' : scope.tooltipPlacement;
                var tooltipAnimation = typeof scope.tooltipAnimation === 'undefined' ? 'am-fade-and-scale' : scope.tooltipAnimation;

                var myTooltip = $tooltip(el, { title: tooltipTitle, placement: tooltipPlacement, animation: tooltipAnimation, trigger: 'manual' });

                el.on('mouseout', function () {
                    myTooltip.hide();
                });

                var clipboard = new Clipboard(el[0]);

                clipboard.on('success', function (e) {
                    myTooltip.show();
                    scope.$apply(function () {
                        scope.clipboardSuccess({
                            e: e
                        });
                    });
                });

                clipboard.on('error', function (e) {
                    scope.$apply(function () {
                        scope.clipboardError({
                            e: e
                        });
                    });
                });
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('headerCtrl', ['$scope', '$state', 'authService', '$window', function ($scope, $state, authService, $window) {
        $scope.loggedIn = authService.isLoggedIn();

        $scope.logoSrc = kachingAppConfig.wpTemplateUri + '/assets/images/logo.png';

        $scope.logoClick = function () {
            if (authService.isAdvertiser()) {
                $state.go('kaching');
            } else if (authService.isDeveloper()) {
                $state.go('apikeys');
            } else {
                $window.location.href = kachingAppConfig.homeUrl;
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    console.log('advertDetailsModalCtrl loaded');

    angular.module('panelApp').controller('advertDetailsModalCtrl', ['$scope', 'errorHandler', '$sce', 'advertisementEditorService', 'advertId', function ($scope, errorHandler, $sce, advertisementEditorService, advertId) {

        $scope.videogularApi = null;

        $scope.view = {
            busy: false
        };

        $scope.advert = {};
        $scope.media = {};
        $scope.products = [];
        $scope.videogular = { sources: [] };

        $scope.view.busy = true;
        $scope.externalLink = null;

        advertisementEditorService.getAdvertisments(advertId).then(function (advert) {
            $scope.advert = advert;
            if (advert.category.length > 0) {
                $scope.category = advert.category;
            }
            if (advert.media.length > 0) {
                $scope.media = advert.media[0];
                $scope.setVideo();
            }
            $scope.view.busy = false;
        }, function (response) {
            $scope.view.busy = false;
            errorHandler.processApiResponse(response);
            $scope.$hide();
        });

        $scope.hasMedia = function () {
            return _.isEmpty($scope.media) ? false : true;
        };

        $scope.hasProducts = function () {
            return $scope.products.length > 0 ? true : false;
        };

        $scope.onPlayerReady = function (API) {
            $scope.videogularApi = API;
        };

        $scope.setVideo = function () {
            var videoLink = $scope.media.video || $scope.media.video_external_link;
            if ($scope.media.video === null) {
                $scope.externalLink = $sce.trustAsResourceUrl(videoLink);
            } else {
                $scope.videogular.sources = [{ src: $sce.trustAsResourceUrl(videoLink), type: 'video/mp4' }];
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    console.log('advertDeleteModalCtrl loaded');

    angular.module('panelApp').controller('advertDeleteModalCtrl', ['$scope', 'modalOptions', 'advert', function ($scope, modalOptions, advert) {

        $scope.advert = advert;

        $scope.delete = function () {
            modalOptions.delete(advert);
            $scope.$hide();
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    console.log('campaignDetailsModalCtrl loaded');

    angular.module('panelApp').controller('campaignDetailsModalCtrl', ['$scope', 'errorHandler', '$sce', 'campaignsService', 'campaignId', function ($scope, errorHandler, $sce, campaignsService, campaignId) {

        $scope.videogularApi = null;

        $scope.view = {
            busy: false
        };

        $scope.campaign = {};
        $scope.media = {};
        $scope.products = [];
        $scope.videogular = { sources: [] };

        $scope.view.busy = true;

        $scope.externalLink = null;

        campaignsService.getCampaign(campaignId).then(function (campaign) {
            $scope.campaign = campaign;
            if (campaign.products.length > 0) {
                $scope.products = campaign.products;
            }
            if (campaign.media.length > 0) {
                $scope.media = campaign.media[0];
                $scope.setVideo();
            }
            $scope.view.busy = false;
        }, function (response) {
            $scope.view.busy = false;
            errorHandler.processApiResponse(response);
            $scope.$hide();
        });

        $scope.hasMedia = function () {
            return _.isEmpty($scope.media) ? false : true;
        };

        $scope.hasProducts = function () {
            return $scope.products.length > 0 ? true : false;
        };

        $scope.onPlayerReady = function (API) {
            $scope.videogularApi = API;
        };

        $scope.setVideo = function () {
            // $scope.videogular.sources = [
            //     {src: $sce.trustAsResourceUrl($scope.media.video), type: 'video/mp4'}
            // ];

            var videoLink = $scope.media.video || $scope.media.video_external_link;
            if ($scope.media.video === null) {
                $scope.externalLink = $sce.trustAsResourceUrl(videoLink);
            } else {
                $scope.videogular.sources = [{ src: $sce.trustAsResourceUrl(videoLink), type: 'video/mp4' }];
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    console.log('campaignDeleteModalCtrl loaded');

    angular.module('panelApp').controller('campaignDeleteModalCtrl', ['$scope', '$alert', 'campaignsService', 'modalOptions', 'campaign', function ($scope, $alert, campaignsService, modalOptions, campaign) {

        console.log('in campaignDeleteModalCtrl', campaign);

        $scope.campaign = campaign;

        $scope.delete = function () {
            modalOptions.delete(campaign);
            $scope.$hide();
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('campaignStopModalCtrl', ['$scope', '$alert', 'campaignsService', 'callbacks', 'campaign', function ($scope, $alert, campaignsService, callbacks, campaign) {

        $scope.campaign = campaign;

        $scope.stopCampaign = function () {
            callbacks.stopCampaign(campaign);
            $scope.$hide();
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('campaignStartModalCtrl', ['$scope', '$alert', 'campaignsService', 'callbacks', 'campaign', function ($scope, $alert, campaignsService, callbacks, campaign) {

        $scope.campaign = campaign;

        $scope.activateCampaign = function () {
            callbacks.startCampaign(campaign);
            $scope.$hide();
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    console.log('mediaDeleteModalCtrl loaded');

    angular.module('panelApp').controller('mediaDeleteModalCtrl', ['$scope', '$alert', 'mediaService', 'modalOptions', 'media', function ($scope, $alert, mediaService, modalOptions, media) {

        console.log('in mediaDeleteModalCtrl', media);

        $scope.media = media;

        $scope.delete = function () {
            modalOptions.delete(media);
            $scope.$hide();
        };
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    console.log('mediaLibraryModalCtrl loaded');

    angular.module('panelApp').controller('mediaLibraryModalCtrl', ['$scope', 'errorHandler', 'modalOptions', 'mediaService', function ($scope, errorHandler, modalOptions, mediaService) {

        console.log('in mediaLibraryModalCtrl');

        var itemsPerPage = 6;

        $scope.view = {
            busy: true,
            currentPage: 1,
            mediaCount: 0,
            media: [],
            maxSize: 10,
            searchPhrase: '',
            searchInput: '',
            orderByOptions: [{
                'value': 'name',
                'label': 'Order by title'
            }, {
                'value': '-date_added',
                'label': 'Newest first'
            }],
            orderBy: '-date_added',
            itemsPerPage: itemsPerPage,
            selectItem: false
        };

        $scope.selectMedia = function () {
            modalOptions.submit($scope.view.selectItem);
            $scope.$hide();
        };

        $scope.search = function () {
            $scope.view.currentPage = 1;
            $scope.view.searchPhrase = $scope.view.searchInput;
            getMedia();
        };

        $scope.changeOrder = function () {
            getMedia();
        };

        $scope.changePage = function () {
            getMedia();
        };

        $scope.toggleItem = function (item) {
            if (item.selected) {
                item.selected = false;
                $scope.view.selectItem = false;
            } else {
                if (_typeof($scope.view.selectItem) === 'object') {
                    $scope.view.selectItem.selected = false;
                }
                item.selected = true;
                $scope.view.selectItem = item;
            }
        };

        var init = function init() {
            getMedia();
        };

        function getMedia(argsObj) {

            var params = {
                limit: itemsPerPage,
                offset: itemsPerPage * ($scope.view.currentPage - 1),
                ordering: $scope.view.orderBy
            };

            if ($scope.view.searchPhrase.length > 0) {
                params.name = $scope.view.searchPhrase;
            }

            $scope.view.busy = true;
            mediaService.getMedia(params).then(function (media) {
                $scope.view.mediaCount = media.count;
                $scope.view.media = media.items;
                $scope.view.busy = false;
            }, function (response) {
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
                $scope.$hide();
            });
        }

        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('producstLibraryModalCtrl', ['$scope', 'errorHandler', 'modalOptions', 'productsService', function ($scope, errorHandler, modalOptions, productsService) {

        var itemsPerPage = 8;

        $scope.view = {
            busy: true,
            currentPage: 1,
            productsCount: 0,
            products: [],
            maxSize: 10,
            searchPhrase: '',
            searchInput: '',
            orderByOptions: [{
                'value': 'name',
                'label': 'Order by title'
            }, {
                'value': '-date_added',
                'label': 'Newest first'
            }],
            orderBy: '-date_added',
            itemsPerPage: itemsPerPage,
            selectItem: false
        };

        $scope.selectProduct = function () {
            modalOptions.submit($scope.view.selectItem);
            $scope.$hide();
        };

        $scope.search = function () {
            $scope.view.currentPage = 1;
            $scope.view.searchPhrase = $scope.view.searchInput;
            getProducts();
        };

        $scope.changeOrder = function () {
            getProducts();
        };

        $scope.changePage = function () {
            getProducts();
        };

        $scope.toggleItem = function (item) {
            if (item.selected) {
                item.selected = false;
                $scope.view.selectItem = false;
            } else {
                if (_typeof($scope.view.selectItem) === 'object') {
                    $scope.view.selectItem.selected = false;
                }
                item.selected = true;
                $scope.view.selectItem = item;
            }
        };

        var init = function init() {
            getProducts();
        };

        function getProducts(argsObj) {

            var params = {
                limit: itemsPerPage,
                offset: itemsPerPage * ($scope.view.currentPage - 1),
                ordering: $scope.view.orderBy
            };

            if ($scope.view.searchPhrase.length > 0) {
                params.title = $scope.view.searchPhrase;
            }

            $scope.view.busy = true;
            productsService.getProducts(params).then(function (products) {
                $scope.view.productsCount = products.count;
                $scope.view.products = products.items;
                $scope.view.busy = false;
            }, function (response) {
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
                $scope.$hide();
            });
        }

        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('newMediaModalCtrl', ['$scope', '$state', '$alert', 'apiUrl', 'authToken', 'utils', 'mediaService', 'FileUploader', 'modalOptions', function ($scope, $state, $alert, apiUrl, authToken, utils, mediaService, FileUploader, modalOptions) {

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/media/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });

        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            uploading: false,
            submitted: false,
            mediaCreated: false,

            videoUploadStarted: false,
            videoUploadProgress: 0,
            videoUploadComplete: false,

            imageUploadStarted: false,
            imageUploadProgress: 0,
            imageUploadComplete: false
        };

        $scope.data = {
            videoFile: '',
            imageFile: '',
            mediaName: '',
            mediaId: ''
        };

        $scope.mediaTypeProp = { 'type': 'select',
            'name': 'media_type',
            'mediaTypeSelect': 'Upload Media',
            'values': ['Upload Media', 'External Link']
        };

        $scope.errors = {
            video: {},
            image: {}
        };

        var init = function init() {

            utils.addUploaderTypeFilter(uploader, 'video', {
                videoFilter: ['video/mp4', 'video/ogg', 'video/webm', 'video/mov', 'video/avi', 'video/quicktime']
            });
            utils.addUploaderTypeFilter(uploader, 'display', {
                imageFilter: ['image/png', 'image/jpg', 'image/jpeg']
            });
        };

        uploader.onAfterAddingFile = function (newItem) {

            utils.cleanupUploaderQueue(uploader);

            if (newItem.alias === 'video') {
                $scope.data.videoFile = newItem._file;
            }

            if (newItem.alias === 'display') {

                $scope.data.imageFile = newItem._file;

                // mediaService.imageSizeHelper( newItem._file ).then(function( size ){
                //     if ( ! mediaService.imageSizeValid( size.width, size.height ) ) {
                //         $scope.errors.image.size = true;
                //     } else {
                //         delete $scope.errors.image.size;
                //     }
                // });
            }
        };

        uploader.onBeforeUploadItem = function (item) {
            if (item.alias === 'video') {
                $scope.view.videoUploadStarted = true;
            }
            if (item.alias === 'display') {
                $scope.view.imageUploadStarted = true;
            }
            item.url = apiUrl + '/media/' + $scope.data.mediaId + '/';
        };

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            if (fileItem.alias === 'video') {
                $scope.view.videoUploadComplete = true;
            }
            if (fileItem.alias === 'display') {
                $scope.view.imageUploadComplete = true;
            }
        };

        uploader.onProgressItem = function (fileItem, progress) {
            if (fileItem.alias === 'video') {
                $scope.view.videoUploadProgress = progress;
            }
            if (fileItem.alias === 'display') {
                $scope.view.imageUploadProgress = progress;
            }
        };

        uploader.onCompleteAll = function () {
            $scope.view.mediaCreated = true;

            if (modalOptions.mode === 'campaignEditor') {
                $scope.closeModal();
            }
        };

        $scope.showErrors = function () {
            return $scope.view.submitted;
        };

        $scope.videoHasError = function () {
            return _typeof($scope.data.videoFile) !== 'object';
        };

        $scope.imageHasError = function () {
            // if ( typeof $scope.data.imageFile !== 'object' || $scope.errors.image.size ) {
            if (_typeof($scope.data.imageFile) !== 'object') {
                return true;
            } else {
                return false;
            }
        };

        $scope.viewMedia = function () {
            $scope.$hide();
            $state.go('media.view', { mediaId: $scope.data.mediaId });
        };

        $scope.saveMedia = function () {
            $scope.view.submitted = true;

            var mediaValid = false;

            if ($scope.mediaTypeProp.mediaTypeSelect === 'Upload Media') {
                mediaValid = $scope.form1.$valid && !$scope.imageHasError() && !$scope.videoHasError();
            } else {
                mediaValid = $scope.form1.$valid && !$scope.imageHasError();
            }

            // if ( $scope.form1.$valid && !$scope.imageHasError() && !$scope.videoHasError() ) {
            if (mediaValid) {
                $scope.view.uploading = true;
                mediaService.createMedia($scope.data.mediaName, $scope.data.mediaLink).then(function (media) {
                    $scope.data.mediaId = media.id;
                    uploader.uploadAll();
                }, function () {
                    // Show error message
                    // $scope.$hide();
                });
            }
        };

        $scope.closeModal = function () {
            if ($scope.view.mediaCreated && _.isFunction(modalOptions.submit)) {
                modalOptions.submit($scope.data.mediaId);
            }
            $scope.$hide();
        };

        $scope.setFile = function (element) {
            /*console.log(element.files);*/
            // $scope.inCorrectFormat = false;
            for (var i = 0; i < element.files.length; i++) {
                var reader = new FileReader();
                var file = element.files[i];
                reader.onload = function (event) {
                    // checkTypeTrigger(element, file, event.target.result);
                    $scope.resizeImage(event.target.result);
                };
                // when the file is read it triggers the onload event above.
                reader.readAsDataURL(file);
            }
        };

        $scope.resizeImage = function (trigger) {
            var img = new Image();
            img.onload = function () {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var ratio = 1;
                if (this.width > this.height) {
                    if (this.height < 1200) {
                        ratio = 1200 / this.height;
                    } else if (this.width < 1280) {
                        ratio = 1280 / this.width;
                    }
                } else {
                    if (this.width < 1200) {
                        ratio = 1200 / this.width;
                    } else if (this.height < 1280) {
                        ratio = 1280 / this.height;
                    }
                }
                canvas.width = this.width * ratio;
                canvas.height = this.height * ratio;
                ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

                // var index = $scope.triggerItems.indexOf(trigger);
                // if (index >= 0) {
                //     $scope.triggerItems[index].content = canvas.toDataURL();
                //     $scope.triggerItems[index].contentBase64 = canvas.toDataURL();
                //     $scope.triggerItems[index].isScale = true;
                //     $scope.$apply();
                //     PopupMessageService.showAlertMessage('Resize image successeful!', true);
                //     validateUploadImages();
                // } else {
                //     PopupMessageService.showAlertMessage('Resize image fail!', false);
                // }
            };
            img.src = trigger.content;
            img.crossOrigin = 'Anonymous';
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('newProductModalCtrl', ['$scope', '$state', 'errorHandler', 'apiUrl', 'authToken', 'utils', 'productsService', 'FileUploader', 'modalOptions', function ($scope, $state, errorHandler, apiUrl, authToken, utils, productsService, FileUploader, modalOptions) {

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/products/',
            method: 'POST',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });

        $scope.fieldHasError = utils.fieldHasError;
        $scope.urlRegex = utils.urlRegex();

        $scope.view = {
            uploading: false,
            submitted: false,
            uploadStarted: false,
            uploadProgress: 0,
            uploadComplete: false,
            productCreated: false,
            externalProducts: []
        };

        $scope.data = {
            productId: undefined,
            title: '',
            url: '',
            price: '',
            description: '',
            image: '',
            imageFile: '',
            external: false
        };

        var init = function init() {
            utils.addUploaderTypeFilter(uploader, 'image', {
                imageFilter: ['image/png', 'image/jpg', 'image/jpeg']
            });
        };

        uploader.onAfterAddingFile = function (item) {
            utils.cleanupUploaderQueue(uploader);
            $scope.data.imageFile = item._file;
        };

        uploader.onBeforeUploadItem = function (item) {

            var formData = {
                title: $scope.data.title,
                url: $scope.data.url,
                price: $scope.data.price,
                description: $scope.data.description
            };

            if (formData.url.match(/^http[s]?:\/\//i) === null) {
                formData.url = 'http://' + formData.url;
            }

            if ($scope.data.image_url) {
                formData.image_url = $scope.data.image_url;
            }
            if ($scope.data.external_id) {
                formData.external_id = $scope.data.external_id;
            }

            item.formData.push(formData);
            $scope.view.uploading = true;
            $scope.view.uploadStarted = true;
        };

        uploader.onProgressItem = function (fileItem, progress) {
            $scope.view.uploadProgress = progress;
        };

        uploader.onSuccessItem = function (item, response, status, headers) {
            console.log('onSuccessItem', item, response, status, headers);

            $scope.data.productId = response.id;
            $scope.data.image = response.image;
            $scope.data.date_added = response.date_added;
            $scope.data.is_active = response.is_active;

            $scope.view.productCreated = true;

            if (modalOptions.mode === 'campaignEditor') {
                $scope.closeModal();
            }
        };

        uploader.onCompleteAll = function () {
            $scope.view.uploadComplete = true;
        };

        $scope.showErrors = function () {
            return $scope.view.submitted;
        };
        $scope.imageHasError = function () {
            return !$scope.data.imageFile;
        };

        $scope.viewProduct = function () {
            $scope.$hide();
            $state.go('products.view', { productId: $scope.data.productId });
        };

        $scope.saveProduct = function () {
            $scope.view.submitted = true;
            if ($scope.form1.$valid) {
                if ($scope.data.external === true) {
                    $scope.createProductFromExternal();
                } else {
                    uploader.uploadAll();
                }
            }
        };

        $scope.closeModal = function () {
            if ($scope.view.productCreated && _.isFunction(modalOptions.submit)) {
                modalOptions.submit({
                    id: $scope.data.productId,
                    title: $scope.data.title,
                    url: $scope.data.url,
                    price: $scope.data.price,
                    description: $scope.data.description,
                    image: $scope.data.image,
                    date_added: $scope.data.date_added,
                    is_active: $scope.data.is_active
                });
            }
            $scope.$hide();
        };

        $scope.searchExternalProducts = function () {
            $scope.view.busy = true;
            productsService.searchExternalProducts({ search: $scope.view.externalProductsSearchInput }).then(function (products) {
                $scope.view.externalProducts = products;
                $scope.view.busy = false;
            }, function (response) {
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
                $scope.$hide();
            });
        };

        $scope.resetExternalProducts = function () {
            $scope.view.externalProducts = [];
        };

        $scope.addExternalProduct = function (product) {

            $scope.data.external = true;
            $scope.data.title = product.name;
            $scope.data.url = product.medium_image;
            $scope.data.price = product.price_min;
            $scope.data.description = product.description ? product.description : product.name;
            $scope.data.image_url = product.medium_image;
            $scope.data.external_id = product.asin;
            $scope.data.imageFile = product.medium_image;
            $scope.data.image = product.medium_image;

            $scope.resetExternalProducts();
        };

        $scope.createProductFromExternal = function () {

            productsService.createProductFromExternal($scope.data).then(function (response) {

                $scope.data.productId = response.id;
                $scope.view.productCreated = true;

                if (modalOptions.mode === 'campaignEditor') {
                    $scope.closeModal();
                }
            }, function (response) {
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
                $scope.$hide();
            });
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    console.log('productDeleteModalCtrl loaded');

    angular.module('panelApp').controller('productDeleteModalCtrl', ['$scope', 'modalOptions', 'product', 'index', function ($scope, modalOptions, product, index) {

        $scope.product = product;

        $scope.delete = function () {
            modalOptions.delete(product, index);
            $scope.$hide();
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('passwordChangeModalCtrl', ['$scope', '$alert', 'errorHandler', 'utils', 'userService', function ($scope, $alert, errorHandler, utils, userService) {

        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            sending: false,
            submitted: false
        };

        $scope.data = {
            currentPassword: '',
            newPassword: '',
            newPasswordRepeat: ''
        };

        $scope.showErrors = function () {
            return $scope.view.submitted;
        };

        $scope.changePassword = function () {
            $scope.view.submitted = true;
            if ($scope.form1.$valid) {
                $scope.view.sending = true;
                userService.changePassword($scope.data.currentPassword, $scope.data.newPassword).then(function () {
                    $scope.view.sending = false;
                    $alert({
                        title: 'Your password has been changed.',
                        content: '',
                        container: '#alerts-container',
                        placement: 'top',
                        duration: 3,
                        type: 'success',
                        show: true
                    });
                    $scope.$hide();
                }, function (response) {
                    console.log('changePassword response', response);
                    if (response.status === 400 && typeof response.data.current_password !== 'undefined') {
                        $scope.form1.current_password.$setValidity('password', false);
                        $scope.view.sending = false;
                    } else {
                        errorHandler.processApiResponse(response);
                        $scope.$hide();
                    }
                });
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('appDeleteModalCtrl', ['$scope', '$alert', 'campaignsService', 'modalOptions', 'app', function ($scope, $alert, campaignsService, modalOptions, app) {

        $scope.app = app;

        $scope.delete = function () {
            modalOptions.delete(app);
            $scope.$hide();
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('newAppModalCtrl', ['$scope', 'errorHandler', 'utils', 'modalOptions', 'applicationsService', function ($scope, errorHandler, utils, modalOptions, applicationsService) {

        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            loading: true,
            sending: false,
            showErrors: false,
            categoriesError: false
        };

        $scope.data = {
            appName: '',
            categories: [],
            selectedCategories: []
        };

        var init = function init() {

            $scope.view.loading = true;

            applicationsService.getCategories().then(function (response) {
                $scope.data.categories = response;
                $scope.setSelectedCategories();
                $scope.view.loading = false;
            }, function (response) {
                errorHandler.processApiResponse(response);
                $scope.$hide();
            });
        };

        $scope.setSelectedCategories = function () {

            $scope.data.selectedCategories = [];

            angular.forEach($scope.data.categories, function (category) {
                if (category.selected) {
                    $scope.data.selectedCategories.push(category.id);
                }
            });

            $scope.view.categoriesError = $scope.data.selectedCategories.length === 0 ? true : false;
        };

        $scope.clearCustomErrors = function () {
            $scope.form1.key_name.$setValidity('nameUnique', true);
        };

        var hasNameError = function hasNameError(response) {
            var error = _.findWhere(response.data.errorDetails.paramsMistake.mistakenParams, { name: 'name' });
            return typeof error !== 'undefined' ? true : false;
        };

        $scope.formSubmit = function () {

            $scope.view.sending = true;

            if ($scope.form1.$valid && $scope.view.categoriesError === false) {

                applicationsService.addApp($scope.data.appName, $scope.data.selectedCategories).then(function (app) {
                    modalOptions.submit(app);
                    $scope.$hide();
                }, function (response) {

                    if (response.status === 400 && hasNameError(response)) {
                        $scope.form1.key_name.$setValidity('nameUnique', false);
                        $scope.view.sending = false;
                        $scope.view.showErrors = true;
                    } else {
                        errorHandler.processApiResponse(response);
                        $scope.$hide();
                    }
                });
            } else {
                $scope.view.sending = false;
                $scope.view.showErrors = true;
            }
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('newCardModalCtrl', ['$scope', 'errorHandler', 'utils', 'callbacks', 'billingService', function ($scope, errorHandler, utils, callbacks, billingService) {

        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            braintreeLoading: true,
            braintreeReady: false,
            nonceReceived: false,
            savingCard: false,
            cardSaved: false
        };

        var init = function init() {

            billingService.getClientToken().then(function (clientToken) {

                var btIntegration;

                braintree.setup(clientToken, 'dropin', {
                    container: 'braintree-form',
                    onReady: function onReady(integration) {
                        $scope.view.braintreeLoading = false;
                        btIntegration = integration;
                        $scope.view.braintreeReady = true;
                        $scope.$apply();
                    },
                    onPaymentMethodReceived: function onPaymentMethodReceived(response) {
                        console.log('onPaymentMethodReceived', response);
                        $scope.view.nonceReceived = true;
                        $scope.view.savingCard = true;

                        btIntegration.teardown(function () {
                            btIntegration = null;
                        });

                        var data = {
                            payment_method_nonce: response.nonce
                        };
                        billingService.addCard(data).then(function () {
                            $scope.view.savingCard = false;
                            $scope.view.cardSaved = true;
                            callbacks.cardAdded();
                        }, function (response) {
                            errorHandler.processApiResponse(response);
                            $scope.$hide();
                        });
                    }
                });
            }, function (response) {
                errorHandler.processApiResponse(response);
                $scope.$hide();
            });
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('cardDeleteModalCtrl', ['$scope', '$alert', 'callbacks', 'card', function ($scope, $alert, callbacks, card) {

        $scope.card = card;

        $scope.delete = function () {
            callbacks.delete(card);
            $scope.$hide();
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('appKeyModalCtrl', ['$scope', 'app', function ($scope, app) {
        $scope.app = app;
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('appEditModalCtrl', ['$scope', 'app', 'utils', 'modalOptions', 'errorHandler', 'applicationsService', function ($scope, app, utils, modalOptions, errorHandler, applicationsService) {

        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            loading: true,
            sending: false,
            showErrors: false,
            categoriesError: false
        };

        $scope.data = {
            appName: app.name,
            categories: [],
            selectedCategories: app.app_categories
        };

        var init = function init() {

            $scope.view.loading = true;

            applicationsService.getCategories(app.app_categories).then(function (response) {
                $scope.data.categories = response;
                $scope.setSelectedCategories();
                $scope.view.loading = false;
            }, function (response) {
                errorHandler.processApiResponse(response);
                $scope.$hide();
            });
        };

        $scope.setSelectedCategories = function () {

            $scope.data.selectedCategories = [];

            angular.forEach($scope.data.categories, function (category) {
                if (category.selected) {
                    $scope.data.selectedCategories.push(category.id);
                }
            });

            $scope.view.categoriesError = $scope.data.selectedCategories.length === 0 ? true : false;
        };

        $scope.clearCustomErrors = function () {
            $scope.form1.key_name.$setValidity('nameUnique', true);
        };

        var hasNameError = function hasNameError(response) {
            var error = _.findWhere(response.data.errorDetails.paramsMistake.mistakenParams, { name: 'name' });
            return typeof error !== 'undefined' ? true : false;
        };

        $scope.formSubmit = function () {

            $scope.view.sending = true;

            if ($scope.form1.$valid && $scope.view.categoriesError === false) {

                applicationsService.updateApp(app.id, $scope.data.appName, $scope.data.selectedCategories).then(function (app) {
                    modalOptions.submit(app);
                    $scope.$hide();
                }, function (response) {

                    if (response.status === 400 && hasNameError(response)) {
                        $scope.form1.key_name.$setValidity('nameUnique', false);
                        console.log('>>>> name error');
                        $scope.view.sending = false;
                        $scope.view.showErrors = true;
                    } else {
                        errorHandler.processApiResponse(response);
                        $scope.$hide();
                    }
                });
            } else {
                $scope.view.sending = false;
                $scope.view.showErrors = true;
            }
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    console.log('expiredCtrl loaded');

    angular.module('panelApp').controller('expiredCtrl', ['$scope', '$state', 'authService', function ($scope, $state, authService) {

        console.log('in expiredCtrl');

        $scope.view = {
            busy: false,
            formError: false
        };

        $scope.loginFormData = {
            email: '',
            password: ''
        };

        $scope.signinFormSubmit = function () {

            console.log('in signinFormSubmit()', $scope.loginFormData.email, $scope.loginFormData.password);

            $scope.view.busy = true;
            $scope.view.formError = false;

            authService.login($scope.loginFormData.email, $scope.loginFormData.password).then(function (user) {
                $scope.view.busy = false;
                if (user.usertype === 1) {
                    $state.go('campaigns');
                } else {
                    $state.go('apikeys');
                }
            }, function () {
                $scope.view.busy = false;
                $scope.view.formError = true;
            });
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('campaignsCtrl', ['$scope', '$alert', '$modal', 'errorHandler', 'campaignsService', '$state', 'utils', function ($scope, $alert, $modal, errorHandler, campaignsService, $state, utils) {

        var itemsPerPage = 10;

        $scope.view = {
            initialLoadComplete: false,
            busy: true,
            itemsPerPage: itemsPerPage,
            currentPage: 1,
            maxSize: 10,
            filtersActive: false,
            campaignStatuses: [{ code: -1, label: 'Any status' }, { code: 0, label: 'Incomplete' },
            // {code: 1, label: 'Billing'},
            // {code: 2, label: 'Prepared'},
            { code: 3, label: 'Live' },
            // {code: 4, label: 'Completed'},
            { code: 5, label: 'Stopped' }]
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
                endDate: null
            },
            min: moment().format('YYYY-MM-DD')
        };

        $scope.campaignTypes = [{ code: -1, label: 'Create New Campaign' }, { code: 0, label: 'Billboards' }, { code: 1, label: 'Instore Campaign' }, { code: 2, label: 'Magazine Ads' }, { code: 3, label: 'Radio Ads' }, { code: 4, label: 'TV Ads' }];

        var init = function init() {
            initFilters();
            getCampaigns();
        };

        function initFilters() {
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
            onShow: function onShow() {
                angular.element('html').css('overflow', 'hidden');
            },
            onBeforeHide: function onBeforeHide() {
                angular.element('html').css('overflow', 'initial');
            },
            resolve: {
                campaignId: function campaignId() {
                    // return campaign.id;
                    return undefined;
                },
                viewDetail: function viewDetail() {
                    return undefined;
                }
            },
            onHide: function onHide() {
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

        $scope.changePage = function () {
            getCampaigns();
        };

        $scope.reloadCampaigns = function (page) {
            if (page) {
                $scope.view.currentPage = page;
            } else {
                $scope.view.currentPage = 1;
            }

            getCampaigns();
        };

        function getCampaigns(argsObj) {

            var params = {
                limit: itemsPerPage,
                offset: itemsPerPage * ($scope.view.currentPage - 1)
            };

            if ($scope.filters.name.length > 0) {
                params.name = $scope.filters.name;
            }
            if ($scope.filters.client.length > 0) {
                params.client = $scope.filters.client;
            }
            if ($scope.filters.media_title.length > 0) {
                params.media_title = $scope.filters.media_title;
            }
            if ($scope.filters.start_date.length > 0) {
                params.start_date = $scope.filters.start_date;
            }
            if ($scope.filters.end_date.length > 0) {
                params.end_date = $scope.filters.end_date;
            }
            if (typeof $scope.filters.status !== 'undefined') {
                params.status = $scope.filters.status;
            }

            campaignsService.getCampaigns(params).then(function (campaigns) {
                $scope.data.campaignsCount = campaigns.count;
                $scope.data.campaigns = campaigns.items;
                $scope.view.initialLoadComplete = true;
                $scope.view.busy = false;
            }, function (response) {
                $scope.view.busy = true;
                errorHandler.processApiResponse(response);
            });
        }

        var deleteCampaign = function deleteCampaign(campaign) {
            var name = campaign.name;
            campaignsService.deleteCampaign(campaign.id).then(function () {
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
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.startCampaign = function (campaign) {
            var name = campaign.name;
            campaignsService.startCampaign(campaign.id).then(function () {

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
            }, function (response) {

                var processingError = _.findWhere(response.data.errorDetails.logicProcessing.processingErrors, { code: 3 }) || _.findWhere(response.data.errorDetails.logicProcessing.processingErrors, { code: 40 });

                if (typeof processingError !== 'undefined') {
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
                    errorHandler.processApiResponse(response);
                }
            });
        };

        var _stopCampaign = function _stopCampaign(campaign) {
            var name = campaign.name;
            campaignsService.stopCampaign(campaign.id).then(function () {
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
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.showDeleteCampaignDialog = function (_campaign) {
            var options = {
                delete: function _delete(campaign) {
                    console.log('delete camapgin', campaign);
                    deleteCampaign(campaign);
                }
            };
            $modal({
                // templateUrl: 'panel-module/components/campaignDeleteModal/modalTmpl.html',
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/campaignDeleteModal/modalTmpl.html',
                controller: 'campaignDeleteModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    },
                    campaign: function campaign() {
                        return _campaign;
                    }
                }
            });
        };

        $scope.checkCampaignActive = function (e, campaign) {
            e.preventDefault();
            if (campaign.status === 3) {
                $scope.showStopCampaignDialog(campaign);
            } else if (campaign.status === 2 || campaign.status === 5) {
                $scope.showStartCampaignDialog(campaign);
            }
        };

        $scope.showStopCampaignDialog = function (_campaign2) {
            var _callbacks = {
                stopCampaign: function stopCampaign(campaign) {
                    console.log('stop camapgin', campaign);
                    _stopCampaign(campaign);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/campaignStopModal/modalTmpl.html',
                controller: 'campaignStopModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    callbacks: function callbacks() {
                        return _callbacks;
                    },
                    campaign: function campaign() {
                        return _campaign2;
                    }
                }
            });
        };

        $scope.showStartCampaignDialog = function (_campaign3) {
            var _callbacks2 = {
                startCampaign: function startCampaign(campaign) {
                    $scope.startCampaign(campaign);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/campaignStartModal/modalTmpl.html',
                controller: 'campaignStartModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    callbacks: function callbacks() {
                        return _callbacks2;
                    },
                    campaign: function campaign() {
                        return _campaign3;
                    }
                }
            });
        };

        $scope.updateFilters = function () {
            $scope.filters.status = $scope.view.statusFilterModel.code === -1 ? undefined : $scope.view.statusFilterModel.code;
            $scope.reloadCampaigns();
        };

        $scope.$watch('daterange.dates.startDate', function (newValue, oldValue) {
            if (newValue === null) {
                return;
            }
            $scope.filters.start_date = moment($scope.daterange.dates.startDate).format('YYYY-MM-DD');
            $scope.filters.end_date = moment($scope.daterange.dates.endDate).format('YYYY-MM-DD');
            $scope.updateFilters();
        });

        $scope.toggleFilters = function () {
            if ($scope.view.filtersActive) {
                $scope.clearFilters();
            } else {
                $scope.view.filtersActive = true;
            }
        };

        $scope.clearFilters = function () {
            $scope.view.filtersActive = false;
            initFilters();
            $scope.reloadCampaigns();
        };

        $scope.showCampaignPopup = function (campaign, viewDetail) {

            utils.setCampaignId(campaign.id);

            if (viewDetail) {
                utils.setViewDetail(true);
                $state.go('kaching.campaigns.view', { campaignId: campaign.id });
            } else {
                utils.setViewDetail(false);
                $state.go('kaching.campaigns.edit', { campaignId: campaign.id });
            }
        };

        $scope.$on('reload-campaigns', function () {
            $scope.reloadCampaigns();
        });

        $scope.createCampaign = function () {
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
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('dashboardCtrl', ['$scope', function ($scope) {
        $scope.chartConfig = {
            'options': {
                'chart': {
                    'type': 'areaspline'
                },
                'xAxis': {
                    'categories': [],
                    'title': {
                        'text': null
                    },

                    'labels': {
                        'enabled': false
                    },
                    'minorTickLength': 0,
                    'tickLength': 0,
                    'tickWidth': 0,
                    'minPadding': 0,
                    'maxPadding': 0,
                    'pointPadding': 0,
                    'groupPadding': 0,
                    'lineColor': '',
                    'lineWidth': ''
                },
                'yAxis': {
                    'categories': [],
                    'title': {
                        'text': null
                    },
                    'labels': {
                        'enabled': false
                    },
                    'minorTickLength': 0,
                    'tickLength': 0,
                    'gridLineColor': 'transparent',
                    'tickWidth': 0,
                    'minPadding': 0,
                    'maxPadding': 0,
                    'pointPadding': 0,
                    'groupPadding': 0,
                    'lineColor': '',
                    'lineWidth': ''
                },
                'pane': {},
                'tooltip': {},
                'plotOptions': {
                    'series': {
                        'stacking': '',
                        'marker': {
                            'enabled': false
                        }
                    },
                    'pie': {
                        'size': 500
                    }
                },
                'exporting': {
                    'enabled': false
                }
            },
            'series': [{
                'showInLegend': false,
                'data': [],
                'color': '',
                'name': ''

            }, {
                'showInLegend': false,
                'data': [],
                'color': '',
                'name': ''
            }],
            'title': {
                'text': ''
            },
            'credits': {
                'enabled': false
            },
            'loading': false,
            'size': {
                'height': 130
            },
            'tooltip': {},
            'useHighStocks': false,
            func: function func(chart) {}
        };

        $scope.chartConfig2 = angular.copy($scope.chartConfig);
        $scope.chartConfig2.series[0].color = '#62d194';
        $scope.chartConfig2.series[0].data = [5, 20, 15, 2, 7, 10, 4, 11, 15, 10, 21];
        $scope.chartConfigGender = angular.copy($scope.chartConfig);

        //chart gender
        $scope.chartConfigGender.options.chart.type = 'bar';
        $scope.chartConfigGender.options.xAxis.categories = ['24:00', '18:00', '12:00', '06:00', '00:00'];
        $scope.chartConfigGender.options.xAxis.labels.enabled = true;
        $scope.chartConfigGender.options.xAxis.lineWidth = 1;
        $scope.chartConfigGender.options.xAxis.lineColor = '#E6EAEE';
        $scope.chartConfigGender.options.plotOptions.series.pointWidth = 18;
        $scope.chartConfigGender.options.yAxis = {
            'title': {
                'text': null
            },
            'labels': {
                'enabled': true
            },
            'lineColor': '#E6EAEE',
            'lineWidth': 1,
            'min': 0,
            'minRange': 100000,
            'max': 100000,
            'minPadding': 100000,
            'gridLineWidth': 0

        };
        $scope.chartConfigGender.series = [{
            name: 'female',
            showInLegend: false,
            data: [20000, 20000, 30000, 20000, 10000],
            color: '#FFBC00'
        }, {
            name: 'male',
            showInLegend: false,
            data: [53000, 34000, 40000, 70000, 20000],
            color: '#2DA1F8'
        }];
        $scope.chartConfigGender.options.plotOptions.series.stacking = 'normal';
        $scope.chartConfigGender.size.height = 250;

        // Age Timeline
        $scope.chartConfigAgeTimeline = angular.copy($scope.chartConfig);
        $scope.chartConfigAgeTimeline.options.chart.type = 'column';
        $scope.chartConfigAgeTimeline.options.xAxis.categories = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00'];
        $scope.chartConfigAgeTimeline.options.xAxis.labels.enabled = true;
        $scope.chartConfigAgeTimeline.size.height = 281;
        $scope.chartConfigAgeTimeline.options.yAxis.lineWidth = 1;
        $scope.chartConfigAgeTimeline.options.yAxis.lineColor = '#E6EAEE';
        $scope.chartConfigAgeTimeline.options.plotOptions.series.stacking = 'normal';
        $scope.chartConfigAgeTimeline.options.plotOptions.series.pointWidth = 18;
        $scope.chartConfigAgeTimeline.options.xAxis.lineWidth = 1;
        $scope.chartConfigAgeTimeline.options.xAxis.lineColor = '#E6EAEE';
        $scope.chartConfigAgeTimeline.options.yAxis = {
            'title': {
                'text': null
            },
            'labels': {
                'enabled': true
            },
            'lineColor': '#E6EAEE',
            'lineWidth': 1,
            'min': 0,
            'minRange': 100000,
            'max': 100000,
            'minPadding': 100000,
            'gridLineWidth': 0

        };
        $scope.chartConfigAgeTimeline.series = [{
            name: '65+',
            showInLegend: false,
            data: [20000, 20000, 30000, 20000, 10000, 10000],
            color: '#8567E6'
        }, {
            name: '55-64',
            showInLegend: false,
            data: [53000, 34000, 40000, 70000, 20000, 10000],
            color: '#40557D'
        }, {
            name: '45-54',
            showInLegend: false,
            data: [53000, 34000, 40000, 70000, 20000, 10000],
            color: '#289DF5'
        }, {
            name: '35-44',
            showInLegend: false,
            data: [53000, 34000, 40000, 70000, 20000, 10000],
            color: '#39BF23'
        }, {
            name: '25-34',
            showInLegend: false,
            data: [53000, 34000, 40000, 70000, 20000, 10000],
            color: '#FFD400'
        }, {
            name: '0-24',
            showInLegend: false,
            data: [53000, 34000, 40000, 70000, 20000, 10000],
            color: '#F0B499'
        }];

        // Customers
        $scope.chartconfigCustomer = angular.copy($scope.chartConfig);
        $scope.chartconfigCustomer.options.chart.type = 'pie';
        $scope.chartconfigCustomer.options.plotOptions.pie.size = 140;
        $scope.chartconfigCustomer.options.plotOptions.pie.colors = ['#289DF5', '#40557D', '#FFD400'];
        $scope.chartconfigCustomer.size.height = 150;
        $scope.chartconfigCustomer.series = [{
            name: 'Customers',
            data: [['Returning', 6], ['New', 4], ['Referrals', 7]],
            innerSize: '70%',
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }];

        // product spending
        $scope.chartconfigProductSpending = angular.copy($scope.chartConfig);
        $scope.chartconfigProductSpending.options.chart.type = 'pie';
        $scope.chartconfigProductSpending.options.plotOptions.pie.size = 150;
        $scope.chartconfigProductSpending.options.plotOptions.pie.colors = ['#40557D', '#3373B3', '#F0B499', '#72C4B9', '#FFD60D', '#1AA6D6'];
        $scope.chartconfigProductSpending.size.height = 200;
        $scope.chartconfigProductSpending.series = [{
            name: 'Product',
            data: [['Nike', 6], ['Nike', 4], ['Nike', 7], ['Nike', 6], ['Nike', 6], ['Nike', 6]],
            innerSize: '70%',
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }];

        // age
        $scope.chartconfigAge = angular.copy($scope.chartConfig);
        $scope.chartconfigAge.options.chart.type = 'pie';
        $scope.chartconfigAge.options.plotOptions.pie.size = 150;
        $scope.chartconfigAge.options.plotOptions.pie.colors = ['#F0B499', '#FFD400', '#39BF23', '#289DF5', '#40557D', '#8567E6'];
        $scope.chartconfigAge.size.height = 180;
        $scope.chartconfigAge.series = [{
            name: 'Product',
            data: [['0-24', 6], ['25-34', 4], ['35-44', 7], ['45-54', 6], ['55-64', 6], ['65+', 6]],
            innerSize: '70%',
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }];

        // Daily Sale
        $scope.chartconfigDailySale = angular.copy($scope.chartConfig);
        $scope.chartconfigDailySale.options.chart.type = 'column';
        $scope.chartconfigDailySale.options.plotOptions.series.pointWidth = 8;
        $scope.chartconfigDailySale.size.height = 179;
        $scope.chartconfigDailySale.series = [{
            name: 'Thang 1',
            showInLegend: false,
            data: [20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000],
            color: '#1A91EB'
        }];

        // Hour
        $scope.chartconfigHour = angular.copy($scope.chartConfig);
        $scope.chartconfigHour.options.chart.type = 'area';
        $scope.chartconfigHour.options.xAxis = {
            'categories': ['Jan', 'Feb', 'March', 'April', 'May'],
            'title': {
                'text': null
            },
            'labels': {
                'enabled': true
            },
            'lineColor': '#E6EAEE',
            'lineWidth': 1,
            'gridLineWidth': 0

        };
        $scope.chartconfigHour.series = [{
            name: '',
            showInLegend: false,
            data: [20000, 20000, 30000, 20000, 10000],
            color: '#1A91EB'
        }];

        //Genre
        $scope.chartconfigGenres = angular.copy($scope.chartConfig);
        $scope.chartconfigGenres.options.chart.type = 'column';
        $scope.chartconfigGenres.size.height = 180;
        $scope.chartconfigGenres.options.xAxis = {
            'categories': ['21/9', '22/9', '23/9', '24/9', '25/9', '26/9', '27/9'],
            'title': {
                'text': null
            },
            'labels': {
                'enabled': true
            },
            'lineColor': '#E6EAEE',
            'lineWidth': 1,
            'gridLineWidth': 0

        };
        $scope.chartconfigGenres.series = [{
            name: 'Male',
            showInLegend: false,
            data: [20000, 20000, 30000, 20000, 10000, 10000, 10000],
            color: '#337BBF'
        }, {
            name: 'Female',
            showInLegend: false,
            data: [20000, 20000, 30000, 20000, 10000, 10000, 10000],
            color: '#2297F0'
        }];
        $scope.chartconfigGenres.options.yAxis = {
            'title': {
                'text': null
            },
            'labels': {
                'enabled': true
            },
            'lineColor': '#E6EAEE',
            'lineWidth': 1,
            'min': 0,
            'minRange': 100,
            'max': 3000,
            'minPadding': 1,
            'gridLineWidth': 0

        };

        //Community Type
        $scope.chartconfigCommunity = angular.copy($scope.chartConfig);
        $scope.chartconfigCommunity.options.chart.type = 'solidgauge';
        $scope.chartconfigCommunity.size.height = 250;
        $scope.chartconfigCommunity.options.tooltip = {
            'borderWidth': 0,
            'backgroundColor': 'none',
            'shadow': false,
            'style': {
                'fontSize': '16px'
            },
            'pointFormat': '{series.name}<br><span style=\'font-size:2em; color: {point.color}; font-weight: bold\'>{point.y}%</span>',
            'useHTML': true,
            positioner: function positioner(labelWidth, labelHeight) {
                return {
                    x: 104 - labelWidth / 2,
                    y: 104
                };
            }
        };
        Highcharts.getOptions().colors = ['#1F96EF', '#8668E6', '#FAC83F'];
        $scope.chartconfigCommunity.options.pane = {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '109%',
                innerRadius: '91%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.2).get(),
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '66%',
                innerRadius: '85%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.2).get(),
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '40%',
                innerRadius: '59%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.2).get(),
                borderWidth: 0
            }]
        };
        $scope.chartconfigCommunity.options.yAxis = {
            'min': 0,
            'max': 100,
            'lineWidth': 0,
            'tickPositions': []
        };
        $scope.chartconfigCommunity.options.plotOptions = {
            solidgauge: {
                borderWidth: '18px',
                dataLabels: {
                    y: 0,
                    borderWidth: 0,
                    useHTML: true,
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false,
                innerRadius: '0%'
            },
            series: {
                pointWidth: 0
            }
        };
        $scope.chartconfigCommunity.series = [{
            name: 'Urban',
            borderColor: '#1F96EF',
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '100%',
                innerRadius: '100%',
                y: 50
            }]
        }, {
            name: 'Suburban',
            borderColor: Highcharts.getOptions().colors[1],
            data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '75%',
                innerRadius: '75%',
                y: 35
            }]
        }, {
            name: 'Rural',
            borderColor: Highcharts.getOptions().colors[2],
            data: [{
                color: Highcharts.getOptions().colors[2],
                radius: '50%',
                innerRadius: '50%',
                y: 15
            }]
        }];
        // Platform
        $scope.chartconfigPlatform = angular.copy($scope.chartConfig);
        $scope.chartconfigPlatform.options.chart.type = 'pie';
        $scope.chartconfigPlatform.options.plotOptions.pie.size = 200;
        $scope.chartconfigPlatform.options.plotOptions.pie.colors = ['#289DF5', '#F9C943'];
        $scope.chartconfigPlatform.size.height = 250;
        $scope.chartconfigPlatform.series = [{
            name: '',
            data: [['IOS', 6], ['Android', 4]],
            innerSize: '70%',
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }];
        $scope.chartconfigPlatform.options.tooltip = {
            'borderWidth': 0,
            'backgroundColor': 'none',
            'shadow': false,
            'style': {
                'fontSize': '20px'
            },
            'pointFormat': '<span style=\'font-size:2em; color: {point.color}; font-weight: bold;\'>{point.y}%</span>',
            'useHTML': true,
            positioner: function positioner(labelWidth, labelHeight) {
                return {
                    x: 100 - labelWidth / 2,
                    y: 80
                };
            }
        };

        //campaignDown
        $scope.campaignDown = angular.copy($scope.chartConfig);
        $scope.campaignDown.options.chart.margin = 0;
        $scope.campaignDown.options.chart.padding = 0;
        $scope.campaignDown.options.xAxis = {
            'categories': [],
            'title': {
                'text': null
            },
            'lineWidth': 0,
            'lineColor': 'transparent',
            'labels': {
                'enabled': false
            },
            'minorTickLength': 0,
            'tickLength': 0,
            'tickWidth': 0,
            'minPadding': 0,
            'maxPadding': 0,
            'pointPadding': 0,
            'groupPadding': 0
        };
        $scope.campaignDown.options.yAxis = {
            'lineWidth': 0,
            'lineColor': 'transparent',
            'labels': {
                'enabled': false
            },
            'minorTickLength': 0,
            'tickLength': 0,
            'gridLineColor': 'transparent',
            'tickWidth': 0,
            'minPadding': 0,
            'maxPadding': 0,
            'pointPadding': 0,
            'groupPadding': 0
        };

        $scope.campaignUp = angular.copy($scope.campaignDown);
        $scope.campaignUp.series[0].color = '#62d194';
        $scope.campaignUp.series[0].data = [5, 20, 15, 2, 7, 10, 4, 11, 15, 10, 21];

        // Age Timeline
        $scope.chartNetIncome = angular.copy($scope.chartConfig);
        $scope.chartNetIncome.options.chart.type = 'column';
        $scope.chartNetIncome.options.xAxis.categories = ['21/9/2016', '22/9/2016', '23/9/2016', '24/9/2016', '25/9/2016', '26/9/2016', '27/9/2016'];
        $scope.chartNetIncome.options.xAxis.labels.enabled = true;
        $scope.chartNetIncome.size.height = 250;
        $scope.chartNetIncome.options.yAxis.lineWidth = 1;
        $scope.chartNetIncome.options.yAxis.lineColor = '#E6EAEE';
        $scope.chartNetIncome.options.plotOptions.series.stacking = 'normal';
        $scope.chartNetIncome.options.plotOptions.series.pointWidth = 40;
        $scope.chartNetIncome.options.plotOptions.series.borderRadius = 3;
        $scope.chartNetIncome.options.xAxis.lineWidth = 1;
        $scope.chartNetIncome.options.xAxis.lineColor = '#E6EAEE';
        $scope.chartNetIncome.options.yAxis = {
            'title': {
                'text': null
            },
            'labels': {
                'enabled': true
            },
            'lineColor': '#E6EAEE',
            'lineWidth': 1,
            'min': -200000,
            'minRange': -200000,
            'max': 200000,
            'minPadding': 100000,
            'gridLineWidth': 1

        };
        $scope.chartNetIncome.series = [{
            name: '65+',
            showInLegend: false,
            data: [20000, 40000, 30000, 40000, 30000, 20000],
            color: '#51B4FF'
        }, {
            name: '55-64',
            showInLegend: false,
            data: [53000, 34000, 40000, 70000, 80000, 10000],
            color: '#337BBF'
        }, {
            name: '45-54',
            showInLegend: false,
            data: [-53000, -34000, -40000, -70000, -50000, -30000],
            color: '#E2E7EE'
        }];

        // Age Timeline
        $scope.chartconfigHouseholdIncome = angular.copy($scope.chartConfig);
        $scope.chartconfigHouseholdIncome.options.chart.polar = true;
        $scope.chartconfigHouseholdIncome.options.pane.size = '80%';
        $scope.chartconfigHouseholdIncome.options.xAxis.categories = ['0-10K 15%', '20-30K 15%', '30-40K 17%', '40-50K 17%', '50-60K 45%', '60-70K', '70-80K 45%', '80K+ 45%'];
        $scope.chartconfigHouseholdIncome.options.xAxis.labels.enabled = true;
        $scope.chartconfigHouseholdIncome.size.height = 250;
        $scope.chartconfigHouseholdIncome.options.yAxis.lineWidth = 1;
        $scope.chartconfigHouseholdIncome.options.yAxis.lineColor = '#E6EAEE';
        $scope.chartconfigHouseholdIncome.options.plotOptions.series.stacking = 'normal';
        $scope.chartconfigHouseholdIncome.options.plotOptions.series.pointWidth = 40;
        $scope.chartconfigHouseholdIncome.options.plotOptions.series.borderRadius = 3;
        $scope.chartconfigHouseholdIncome.options.plotOptions.series.marker.enabled = true;
        $scope.chartconfigHouseholdIncome.options.xAxis.lineWidth = 1;
        $scope.chartconfigHouseholdIncome.options.xAxis.lineColor = '#E6EAEE';
        $scope.chartconfigHouseholdIncome.series = [{
            showInLegend: false,
            type: 'area',
            data: [10000, 80000, 20000, 70000, 30000, 60000, 40000, 50000]
        }];
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('profileCtrl', ['$scope', '$alert', '$modal', '$q', 'utils', 'errorHandler', 'userService', function ($scope, $alert, $modal, $q, utils, errorHandler, userService) {

        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            loading: true,
            sending: false,
            submitted: false
        };

        $scope.data = {
            user: {},
            countries: []
        };

        var init = function init() {

            var deferred1 = $q.defer();
            var deferred2 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise];

            userService.getUser().then(function (user) {
                $scope.data.user = user;
                deferred1.resolve(user);
            }, function (response) {
                deferred1.reject(response);
            });

            userService.getCountries().then(function (countries) {
                console.log('countries', countries);
                $scope.data.countries = countries;
                deferred2.resolve(countries);
            }, function (response) {
                deferred2.reject(response);
            });

            $q.all(promisses).then(function () {
                $scope.view.loading = false;
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.showErrors = function () {
            return $scope.view.submitted;
        };

        $scope.showPasswordChangeDialog = function () {
            $modal({
                // templateUrl: 'panel-module/components/passwordChangeModal/modalTmpl.html',
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/passwordChangeModal/modalTmpl.html',
                controller: 'passwordChangeModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                backdrop: 'static'
            });
        };

        $scope.saveProfile = function () {
            $scope.view.submitted = true;
            if ($scope.form1.$valid) {
                $scope.view.sending = true;
                userService.updateUser($scope.data.user).then(function () {
                    $scope.view.sending = false;
                    $alert({
                        title: 'Account settings saved.',
                        content: '',
                        container: '#alerts-container',
                        placement: 'top',
                        duration: 3,
                        type: 'success',
                        show: true
                    });
                }, function (response) {
                    errorHandler.processApiResponse(response);
                });
            }
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('creditCardsCtrl', ['$scope', '$alert', '$modal', 'errorHandler', 'billingService', function ($scope, $alert, $modal, errorHandler, billingService) {

        var itemsPerPage = 10;

        $scope.view = {
            busy: true
        };

        $scope.data = {
            cards: []
        };

        var init = function init() {
            $scope.view.busy = true;
            getCards();
        };

        function getCards() {
            billingService.getCards().then(function (cards) {
                $scope.data.cards = cards;
                $scope.view.busy = false;
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        }

        var deleteCard = function deleteCard(card) {
            billingService.deleteCard(card.payment_method_id).then(function () {
                $alert({
                    title: 'Your credit card has been deleted.',
                    content: '',
                    container: '#alerts-container',
                    placement: 'top',
                    duration: 3,
                    type: 'success',
                    show: true
                });
                getCards();
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.setMainCard = function (card) {
            billingService.setMainCard(card.payment_method_id).then(function (cards) {
                getCards();
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.showDeleteCardDialog = function (_card) {
            var _callbacks = {
                delete: function _delete(card) {
                    console.log('delete card', card);
                    deleteCard(card);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/cardDeleteModal/modalTmpl.html',
                // templateUrl: 'panel-module/components/cardDeleteModal/modalTmpl.html',
                controller: 'cardDeleteModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    callbacks: function callbacks() {
                        return _callbacks;
                    },
                    card: function card() {
                        return _card;
                    }
                }
            });
        };

        $scope.showNewCardDialog = function () {
            var _callbacks2 = {
                cardAdded: function cardAdded(card) {
                    console.log('new card', card);
                    getCards();
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/newCardModal/modalTmpl.html',
                // templateUrl: 'panel-module/components/newCardModal/modalTmpl.html',
                controller: 'newCardModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    callbacks: function callbacks() {
                        return _callbacks2;
                    }
                }
            });
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('addFundsCtrl', ['$q', 'utils', '$scope', '$rootScope', 'errorHandler', '$modal', 'billingService', 'userService', function ($q, utils, $scope, $rootScope, errorHandler, $modal, billingService, userService) {

        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            loading: true,
            sending: false,
            submitted: false,
            checkoutSuccess: false,
            checkoutFailure: false,
            paymentDeclined: false,
            mainCardError: false,
            showBillingDetailsForm: false
        };

        $scope.data = {
            card: {
                masked_number: '',
                expiration_date: null
            },
            countries: [],
            user: {
                firstName: '',
                lastName: '',
                company: '',
                country: undefined,
                city: '',
                address: '',
                postalCode: ''
            },
            amountsList: [500, 250, 100, 50],
            creditsCustomAmount: null,
            checkoutCredits: 0,
            checkoutTotal: 0,
            creditValue: null
        };

        var init = function init() {

            $scope.view.loading = true;

            var deferred1 = $q.defer();
            var deferred2 = $q.defer();
            var deferred3 = $q.defer();
            var deferred4 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise, deferred3.promise, deferred4.promise];

            billingService.getMainCard().then(function (card) {
                $scope.data.card = card;
                deferred1.resolve(card);
            }, function (response) {
                $scope.view.mainCardError = true;
                deferred1.reject(response);
            });

            userService.getBalance().then(function (response) {
                $scope.data.creditValue = 1 / response.cash_to_credits_conversion_ratio;
                deferred2.resolve($scope.data.creditValue);
            }, function (response) {
                deferred2.reject(response);
            });

            userService.getUser().then(function (user) {
                $scope.data.user = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    company: user.company,
                    country: user.country,
                    city: user.city,
                    address: user.address,
                    postalCode: user.postalCode
                };
                deferred3.resolve(user);
            }, function (response) {
                deferred3.reject(response);
            });

            userService.getCountries().then(function (countries) {
                $scope.data.countries = countries;
                deferred4.resolve(countries);
            }, function (response) {
                deferred4.reject(response);
            });

            $q.all(promisses).then(function () {
                if (!hasBillingDetails()) {
                    $scope.view.showBillingDetailsForm = true;
                }
                $scope.view.loading = false;
            }, function (response) {
                if ($scope.view.mainCardError === true) {
                    $scope.view.loading = false;
                } else {
                    errorHandler.processApiResponse(response);
                }
            });
        };

        function hasBillingDetails() {
            if ($scope.data.user.firstName === '') {
                return false;
            }
            if ($scope.data.user.lastName === '') {
                return false;
            }
            if ($scope.data.user.company === '') {
                return false;
            }
            if ($scope.data.user.country === undefined) {
                return false;
            }
            if ($scope.data.user.city === '') {
                return false;
            }
            if ($scope.data.user.address === '') {
                return false;
            }
            if ($scope.data.user.postalCode === '') {
                return false;
            }
            return true;
        }

        var resetData = function resetData() {
            $scope.data.creditsCustomAmount = null;
            $scope.data.checkoutCredits = 0;
            $scope.data.checkoutTotal = 0;
        };

        var resetCheckoutStatus = function resetCheckoutStatus() {
            $scope.view.checkoutSuccess = false;
            $scope.view.checkoutFailure = false;
        };

        $scope.$watch(function () {
            return $scope.data.checkoutCredits;
        }, function () {
            $scope.data.checkoutTotal = $scope.data.checkoutCredits * $scope.data.creditValue;
            if ($scope.data.checkoutTotal > 0) {
                resetCheckoutStatus();
            }
        });

        $scope.showErrors = function () {
            return $scope.view.submitted;
        };

        $scope.changeBillingDetails = function () {
            $scope.view.showBillingDetailsForm = true;
        };

        $scope.selectCreditsPreset = function (amount) {
            $scope.data.checkoutCredits = amount;
            $scope.data.creditsCustomAmount = null;
        };

        $scope.selectCreditsCustom = function (amount) {
            $scope.data.checkoutCredits = amount;
        };

        $scope.checkoutCancel = function () {
            resetData();
        };

        $scope.checkoutCconfirm = function () {

            if ($scope.view.showBillingDetailsForm && !$scope.form1.$valid) {

                $scope.view.submitted = true;
            } else {

                $scope.view.sending = true;
                $scope.view.showBillingDetailsForm = false;

                userService.updateUser($scope.data.user).then(function () {
                    billingService.buyCredits($scope.data.card.payment_method_id, $scope.data.checkoutCredits).then(function (response) {
                        $scope.view.sending = false;
                        $scope.view.checkoutSuccess = true;
                        $rootScope.$broadcast('accountBalanceChanged');
                        resetData();
                    }, function (response) {
                        $scope.view.sending = false;
                        if (response.status === 400 && typeof response.data.error_code !== 'undefined') {
                            if (response.data.error_code === 1) {
                                $scope.view.checkoutFailure = true;
                            } else if (response.data.error_code === 2) {
                                $scope.view.paymentDeclined = true;
                            }
                        } else {
                            errorHandler.processApiResponse(response);
                        }
                        resetData();
                    });
                }, function (response) {
                    $scope.view.sending = false;
                    errorHandler.processApiResponse(response);
                });
            }
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('activeFundCtrl', ['$scope', function ($scope) {

        var dataFundDetails = [{
            srcImg: 'https://www.ccep.com/system/image_block/2941/Coca-Cola.jpg',
            title: 'Coca Cola',
            subTitle: 'Coke Studio Season 8',
            totalFund: '1,000,000',
            totalPayout: '190,000',
            refiledFund: '300,000',
            totalCurrentFund: '920,000',
            status: 'status-green'
        }, {
            srcImg: 'http://theshoegame.com/wp-content/uploads/2015/01/nike-logo-copy.jpg',
            title: 'Nike',
            subTitle: 'Nike Air Max Campaign',
            totalFund: '3,000,000',
            totalPayout: '210,400',
            refiledFund: '1,300,000',
            totalCurrentFund: '2,300,000',
            status: 'status-green'
        }, {
            srcImg: 'http://www.kowalskis.com/sites/kowalskis.com/files/images/departments/starbucks-logo-trans.png',
            title: 'Starbucks',
            subTitle: 'Nitro Cold Brew',
            totalFund: '425,000',
            totalPayout: '19,400',
            refiledFund: '100,000',
            totalCurrentFund: '250,000',
            status: 'status-organce'
        }, {
            srcImg: 'http://vector.me/files/images/7/3/73419/nikon.png',
            title: 'Nikon',
            subTitle: 'Nikon 1 J5 Product Launch',
            totalFund: '17,000,000',
            totalPayout: '721,200',
            refiledFund: '5,000,000',
            totalCurrentFund: '6,300,500',
            status: 'status-gray'
        }, {
            srcImg: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQRlV2lijfvgaPUFrfCrp0l4lxiT_dYcj_6El3HGaS50i_yz1EFEg',
            title: 'LG',
            subTitle: 'LG G5',
            totalFund: '800,000',
            totalPayout: '120,000',
            refiledFund: '1,000,000',
            totalCurrentFund: '350,000',
            status: 'status-organce'
        }, {
            srcImg: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRI5hwT454_ibBEE1HoYkSvJfRI2PS8jQ07-a9EJegFistqkSer',
            title: 'Leica',
            subTitle: 'Leica M-D Launch',
            totalFund: '2,800,000',
            totalPayout: '710,000',
            refiledFund: '900,000',
            totalCurrentFund: '1,100,000',
            status: 'status-green'
        }];

        $scope.dataFundDetails = dataFundDetails;

        var revenuePieProduct = {
            id: 'revenuePieProduct',
            title: {
                text: 'Top Funds by <strong>Campaign</strong>'
            },
            series: [{
                data: [['<strong>Nike</strong><br/>USD 3000000', 3000000], ['<strong>Coca Cola</strong><br/>USD 1000000', 1000000], ['<strong>Leica</strong><br/>USD 2800000', 2800000]]
            }]
        };
        var revenuePieSource = {
            id: 'revenuePieSource',
            title: {
                text: 'Top Funds by <strong>Payout</strong>'
            },
            series: [{
                data: [['<strong>Nike</strong><br/>USD 210000', 210000], ['<strong>Leica</strong><br/>USD 120000', 120000], ['<strong>Coca Cola</strong><br/>USD 190000', 190000]]
            }]
        };
        var revenuePieCountry = {
            id: 'revenuePieCountry',
            title: {
                text: 'Top Funds by <strong>Refill</strong>'
            },
            series: [{
                data: [['<strong>Nike</strong><br/>USD 210000', 210000], ['<strong>Leica</strong><br/>USD 120000', 120000], ['<strong>Coca Cola</strong><br/>USD 190000', 190000]]
            }]
        };

        function init() {
            drawPieChart(revenuePieProduct);
            drawPieChart(revenuePieSource);
            drawPieChart(revenuePieCountry);
        }

        function drawPieChart(chart) {
            var c = chart;
            var pieChart = Highcharts.chart(c.id, {
                title: {
                    text: c.title.text,
                    align: 'left',
                    // verticalAlign: 'middle',
                    y: 20
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false
                        },
                        // startAngle: 0,
                        // endAngle: 360,
                        // center: ['50%', '65%'],
                        showInLegend: true,
                        colors: ['#289df5', '#39bf23', '#8567e6'],
                        size: 220
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical',
                    symbolRadius: 100,
                    symbolPadding: 5,
                    // itemMarginBottom: 10,
                    itemStyle: {
                        fontWeight: 100
                    }
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    type: 'pie',
                    name: c.series[0].name,
                    innerSize: '70%',
                    data: c.series[0].data
                }]
            });
        }
        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('archivedFundCtrl', ['$scope', function ($scope) {

        var dataFundDetails = [{
            srcImg: 'https://www.ccep.com/system/image_block/2941/Coca-Cola.jpg',
            title: 'Coca Cola',
            subTitle: 'Coke Studio Season 8',
            totalFund: '1,000,000',
            totalPayout: '190,000',
            refiledFund: '300,000',
            totalCurrentFund: '920,000',
            status: 'status-gray'
        }, {
            srcImg: 'http://theshoegame.com/wp-content/uploads/2015/01/nike-logo-copy.jpg',
            title: 'Nike',
            subTitle: 'Nike Air Max Campaign',
            totalFund: '3,000,000',
            totalPayout: '210,400',
            refiledFund: '1,300,000',
            totalCurrentFund: '2,300,000',
            status: 'status-gray'
        }, {
            srcImg: 'http://www.kowalskis.com/sites/kowalskis.com/files/images/departments/starbucks-logo-trans.png',
            title: 'Starbucks',
            subTitle: 'Nitro Cold Brew',
            totalFund: '425,000',
            totalPayout: '19,400',
            refiledFund: '100,000',
            totalCurrentFund: '250,000',
            status: 'status-gray'
        }, {
            srcImg: 'http://vector.me/files/images/7/3/73419/nikon.png',
            title: 'Nikon',
            subTitle: 'Nikon 1 J5 Product Launch',
            totalFund: '17,000,000',
            totalPayout: '721,200',
            refiledFund: '5,000,000',
            totalCurrentFund: '6,300,500',
            status: 'status-gray'
        }, {
            srcImg: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQRlV2lijfvgaPUFrfCrp0l4lxiT_dYcj_6El3HGaS50i_yz1EFEg',
            title: 'LG',
            subTitle: 'LG G5',
            totalFund: '800,000',
            totalPayout: '120,000',
            refiledFund: '1,000,000',
            totalCurrentFund: '350,000',
            status: 'status-gray'
        }, {
            srcImg: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRI5hwT454_ibBEE1HoYkSvJfRI2PS8jQ07-a9EJegFistqkSer',
            title: 'Leica',
            subTitle: 'Leica M-D Launch',
            totalFund: '2,800,000',
            totalPayout: '710,000',
            refiledFund: '900,000',
            totalCurrentFund: '1,100,000',
            status: 'status-gray'
        }];

        $scope.dataFundDetails = dataFundDetails;

        var revenuePieProduct = {
            id: 'revenuePieProduct',
            title: {
                text: 'Top Funds by <strong>Campaign</strong>'
            },
            series: [{
                data: [['<strong>Nike</strong><br/>USD 3000000', 3000000], ['<strong>Coca Cola</strong><br/>USD 1000000', 1000000], ['<strong>Leica</strong><br/>USD 2800000', 2800000]]
            }]
        };
        var revenuePieSource = {
            id: 'revenuePieSource',
            title: {
                text: 'Top Funds by <strong>Payout</strong>'
            },
            series: [{
                data: [['<strong>Nike</strong><br/>USD 210000', 210000], ['<strong>Leica</strong><br/>USD 120000', 120000], ['<strong>Coca Cola</strong><br/>USD 190000', 190000]]
            }]
        };
        var revenuePieCountry = {
            id: 'revenuePieCountry',
            title: {
                text: 'Top Funds by <strong>Refill</strong>'
            },
            series: [{
                data: [['<strong>Nike</strong><br/>USD 210000', 210000], ['<strong>Leica</strong><br/>USD 120000', 120000], ['<strong>Coca Cola</strong><br/>USD 190000', 190000]]
            }]
        };

        function init() {
            drawPieChart(revenuePieProduct);
            drawPieChart(revenuePieSource);
            drawPieChart(revenuePieCountry);
        }

        function drawPieChart(chart) {
            var c = chart;
            var pieChart = Highcharts.chart(c.id, {
                title: {
                    text: c.title.text,
                    align: 'left',
                    // verticalAlign: 'middle',
                    y: 20
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false
                        },
                        // startAngle: 0,
                        // endAngle: 360,
                        // center: ['50%', '65%'],
                        showInLegend: true,
                        colors: ['#289df5', '#39bf23', '#8567e6'],
                        size: 220
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical',
                    symbolRadius: 100,
                    symbolPadding: 5,
                    // itemMarginBottom: 10,
                    itemStyle: {
                        fontWeight: 100
                    }
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    type: 'pie',
                    name: c.series[0].name,
                    innerSize: '70%',
                    data: c.series[0].data
                }]
            });
        }
        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('analyticsCtrl', ['$scope', '$alert', '$modal', 'errorHandler', 'billingService', function ($scope, $alert, $modal, errorHandler, billingService) {
        $scope.tab = {
            SCANS: 'scans',
            SALES: 'sales',

            CAMPAIGN_OVERVIEW: 'overview',
            CAMPAIGN_PAYOUT: 'payout',
            PRODUCT_REVENUE: 'revenue',
            PRODUCT_TRAFFIC: 'traffic',
            PURCHASE_FUNNEL: 'funnel'
        };

        var templateFolder = kachingAppConfig.wpTemplateUri + '/assets/kaching/analytics/tabs/';

        $scope.analyticsTab = {
            scans: templateFolder + '/scans/scans-tab.html',
            sales: templateFolder + '/sales/sales-tab.html',

            overview: templateFolder + 'overview-tab.html',
            payout: templateFolder + 'payout-tab.html',
            revenue: templateFolder + '/productRevenue/revenue-tab.html',
            traffic: templateFolder + 'traffic-tab.html',
            funnel: templateFolder + 'funnel-tab.html'
        };

        $scope.updateTab = function (tab) {
            $scope.activedTab = tab;
        };

        var init = function init() {
            $scope.activedTab = $scope.tab.SCANS;
        };

        init();
    }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('panelApp').controller('overviewCtrl', ['$scope', function ($scope) {
    var dataViewDetails = [{
      srcImg: 'https://www.ccep.com/system/image_block/2941/Coca-Cola.jpg',
      title: 'Coca Cola',
      subTitle: 'Coke Studio Season 8',
      hours: '23:13',
      date: '20 Oct 2016',
      name: 'John Appleseed',
      sex: 'Male',
      age: '18-24',
      device: 'iOS',
      type: 'Video',
      country: 'Beattyhaven Isle of Man',
      coin: '1',
      hrefReview: 'http://www.coca-colacompany.com/'
    }, {
      srcImg: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQufBXIrA6QaW6NSnnmjWq5vWXu2jrQtvPvUb1gEEjoU6ilf2Gt5w',
      title: 'Nike',
      subTitle: 'Nike Air Max Campaign',
      hours: '12:24',
      date: '16 Oct 2016',
      name: 'Ricardo Hall',
      sex: 'Male',
      age: '45-44',
      device: 'iOS',
      type: 'Video/Image',
      country: 'South Aditya Seychelles',
      coin: '1',
      hrefReview: 'http://www.nike.com/us/en_us/'
    }, {
      srcImg: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRAJ2Nofpu6L6uSLW9raOXiBgOE4k-2XrKpH0qLCQxnPDbStW30ww',
      title: 'Starbucks',
      subTitle: 'Nitro Cold Brew',
      hours: '02:25',
      date: '24 Nov 2016',
      name: 'Viola Wade',
      sex: 'Female',
      age: '18-24',
      device: 'Android',
      type: 'Video/Image',
      country: 'Port Erickmouth Syria Arab Republic',
      coin: '1',
      hrefReview: 'http://www.starbucks.vn/'
    }, {
      srcImg: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT6rXmlwvAqpGTFBKg6KmZf7u31_FEeWKAsL6Z2YjjxFT6_Maj7Uw',
      title: 'Nikon',
      subTitle: 'Nikon 1 J5 Product Launch',
      hours: '12:54',
      date: '05 Oct 2016',
      name: 'Mario Hardy',
      sex: 'Male',
      age: '18-24',
      device: 'Android',
      type: 'Video/Image',
      country: 'North Annie Aruba',
      coin: '1',
      hrefReview: 'http://www.nikon.com.vn/vi_VN'
    }, {
      srcImg: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQRlV2lijfvgaPUFrfCrp0l4lxiT_dYcj_6El3HGaS50i_yz1EFEg',
      title: 'LG',
      subTitle: 'LG G5',
      hours: '23:13',
      date: '15 Feb 2016',
      name: 'Lida Valdez',
      sex: 'Female',
      age: '25-34',
      device: 'iOS',
      type: 'Video',
      country: 'Danstad Maili',
      coin: '1',
      hrefReview: 'http://www.lg.com/vn'
    }, {
      srcImg: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRI5hwT454_ibBEE1HoYkSvJfRI2PS8jQ07-a9EJegFistqkSer',
      title: 'Leica',
      subTitle: 'Leica M-D Launch',
      hours: '12:24',
      date: '18 Dec 2016',
      name: 'Ricardo Hall',
      sex: 'Male',
      age: '35-44',
      device: 'iOS',
      type: 'Video',
      country: 'East Ruben Mexico',
      coin: '1',
      hrefReview: 'https://us.leica-camera.com/'
    }];
    // {
    //     srcImg: 'xxx',
    //     title: 'xxx',
    //     subTitle: 'xxx',
    //     hours: 'xxx',
    //     date: 'xxx',
    //     name: 'xxx',
    //     sex: 'xxx',
    //     age: 'xxx',
    //     device: 'xxx',
    //     type: 'xxx',
    //     country: 'xxx',
    //     coin: 'xxx',
    //     hrefReview: 'xxx'
    // },

    $scope.dataViewDetails = dataViewDetails;

    $scope.chartConfig = {
      'options': {
        'chart': {
          'type': 'areaspline'
        },
        'xAxis': {
          'categories': [],
          'title': {
            'text': null
          },

          'labels': {
            'enabled': false
          },
          'minorTickLength': 0,
          'tickLength': 0,
          'tickWidth': 0,
          'minPadding': 0,
          'maxPadding': 0,
          'pointPadding': 0,
          'groupPadding': 0,
          'lineColor': '',
          'lineWidth': ''
        },
        'yAxis': {
          'categories': [],
          'title': {
            'text': null
          },
          'labels': {
            'enabled': false
          },
          'minorTickLength': 0,
          'tickLength': 0,
          'gridLineColor': 'transparent',
          'tickWidth': 0,
          'minPadding': 0,
          'maxPadding': 0,
          'pointPadding': 0,
          'groupPadding': 0,
          'lineColor': '',
          'lineWidth': ''
        },
        'pane': {},
        'tooltip': {},
        'plotOptions': {
          'series': {
            'stacking': '',
            'marker': {
              'enabled': false
            }
          },
          'pie': {
            'size': 500
          }
        },
        'exporting': {
          'enabled': false
        }
      },
      'series': [{
        'showInLegend': false,
        'data': [],
        'color': '',
        'name': ''

      }, {
        'showInLegend': false,
        'data': [],
        'color': '',
        'name': ''
      }],
      'title': {
        'text': ''
      },
      'credits': {
        'enabled': false
      },
      'loading': false,
      'size': {
        'height': 130
      },
      'tooltip': {},
      'useHighStocks': false,
      func: function func(chart) {}
    };

    $scope.chartConfig2 = angular.copy($scope.chartConfig);
    $scope.chartConfig2.series[0].color = '#62d194';
    $scope.chartConfig2.series[0].data = [5, 20, 15, 2, 7, 10, 4, 11, 15, 10, 21];
    $scope.chartConfigGender = angular.copy($scope.chartConfig);

    //chart gender
    $scope.chartConfigGender.options.chart.type = 'bar';
    $scope.chartConfigGender.options.xAxis.categories = ['24:00', '18:00', '12:00', '06:00', '00:00'];
    $scope.chartConfigGender.options.xAxis.labels.enabled = true;
    $scope.chartConfigGender.options.xAxis.lineWidth = 1;
    $scope.chartConfigGender.options.xAxis.lineColor = '#E6EAEE';
    $scope.chartConfigGender.options.plotOptions.series.pointWidth = 18;
    $scope.chartConfigGender.options.yAxis = {
      'title': {
        'text': null
      },
      'labels': {
        'enabled': true
      },
      'lineColor': '#E6EAEE',
      'lineWidth': 1,
      'min': 0,
      'minRange': 100000,
      'max': 100000,
      'minPadding': 100000,
      'gridLineWidth': 0

    };
    $scope.chartConfigGender.series = [{
      name: 'female',
      showInLegend: false,
      data: [20000, 20000, 30000, 20000, 10000],
      color: '#FFBC00'
    }, {
      name: 'male',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 20000],
      color: '#2DA1F8'
    }];
    $scope.chartConfigGender.options.plotOptions.series.stacking = 'normal';
    $scope.chartConfigGender.size.height = 250;

    // Age Timeline
    $scope.chartConfigAgeTimeline = angular.copy($scope.chartConfig);
    $scope.chartConfigAgeTimeline.options.chart.type = 'column';
    $scope.chartConfigAgeTimeline.options.xAxis.categories = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00'];
    $scope.chartConfigAgeTimeline.options.xAxis.labels.enabled = true;
    $scope.chartConfigAgeTimeline.size.height = 281;
    $scope.chartConfigAgeTimeline.options.yAxis.lineWidth = 1;
    $scope.chartConfigAgeTimeline.options.yAxis.lineColor = '#E6EAEE';
    $scope.chartConfigAgeTimeline.options.plotOptions.series.stacking = 'normal';
    $scope.chartConfigAgeTimeline.options.plotOptions.series.pointWidth = 18;
    $scope.chartConfigAgeTimeline.options.xAxis.lineWidth = 1;
    $scope.chartConfigAgeTimeline.options.xAxis.lineColor = '#E6EAEE';
    $scope.chartConfigAgeTimeline.options.yAxis = {
      'title': {
        'text': null
      },
      'labels': {
        'enabled': true
      },
      'lineColor': '#E6EAEE',
      'lineWidth': 1,
      'min': 0,
      'minRange': 100000,
      'max': 100000,
      'minPadding': 100000,
      'gridLineWidth': 0

    };
    $scope.chartConfigAgeTimeline.series = [{
      name: '65+',
      showInLegend: false,
      data: [20000, 20000, 30000, 20000, 10000, 10000],
      color: '#8567E6'
    }, {
      name: '55-64',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 20000, 10000],
      color: '#40557D'
    }, {
      name: '45-54',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 20000, 10000],
      color: '#289DF5'
    }, {
      name: '35-44',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 20000, 10000],
      color: '#39BF23'
    }, {
      name: '25-34',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 20000, 10000],
      color: '#FFD400'
    }, {
      name: '0-24',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 20000, 10000],
      color: '#F0B499'
    }];

    // Customers
    $scope.chartconfigCustomer = angular.copy($scope.chartConfig);
    $scope.chartconfigCustomer.options.chart.type = 'pie';
    $scope.chartconfigCustomer.options.plotOptions.pie.size = 140;
    $scope.chartconfigCustomer.options.plotOptions.pie.colors = ['#289DF5', '#40557D', '#FFD400'];
    $scope.chartconfigCustomer.size.height = 150;
    $scope.chartconfigCustomer.series = [{
      name: 'Customers',
      data: [['Returning', 6], ['New', 4], ['Referrals', 7]],
      innerSize: '70%',
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }];

    // product spending
    $scope.chartconfigProductSpending = angular.copy($scope.chartConfig);
    $scope.chartconfigProductSpending.options.chart.type = 'pie';
    $scope.chartconfigProductSpending.options.plotOptions.pie.size = 150;
    $scope.chartconfigProductSpending.options.plotOptions.pie.colors = ['#40557D', '#3373B3', '#F0B499', '#72C4B9', '#FFD60D', '#1AA6D6'];
    $scope.chartconfigProductSpending.size.height = 200;
    $scope.chartconfigProductSpending.series = [{
      name: 'Product',
      data: [['Nike', 6], ['Nike', 4], ['Nike', 7], ['Nike', 6], ['Nike', 6], ['Nike', 6]],
      innerSize: '70%',
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }];

    // age
    $scope.chartconfigAge = angular.copy($scope.chartConfig);
    $scope.chartconfigAge.options.chart.type = 'pie';
    $scope.chartconfigAge.options.plotOptions.pie.size = 150;
    $scope.chartconfigAge.options.plotOptions.pie.colors = ['#F0B499', '#FFD400', '#39BF23', '#289DF5', '#40557D', '#8567E6'];
    $scope.chartconfigAge.size.height = 180;
    $scope.chartconfigAge.series = [{
      name: 'Product',
      data: [['0-24', 6], ['25-34', 4], ['35-44', 7], ['45-54', 6], ['55-64', 6], ['65+', 6]],
      innerSize: '70%',
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }];

    // Daily Sale
    $scope.chartconfigDailySale = angular.copy($scope.chartConfig);
    $scope.chartconfigDailySale.options.chart.type = 'column';
    $scope.chartconfigDailySale.options.plotOptions.series.pointWidth = 8;
    $scope.chartconfigDailySale.size.height = 179;
    $scope.chartconfigDailySale.series = [{
      name: 'Thang 1',
      showInLegend: false,
      data: [20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000],
      color: '#1A91EB'
    }];

    // Hour
    $scope.chartconfigHour = angular.copy($scope.chartConfig);
    $scope.chartconfigHour.options.chart.type = 'area';
    $scope.chartconfigHour.options.xAxis = {
      'categories': ['Jan', 'Feb', 'March', 'April', 'May'],
      'title': {
        'text': null
      },
      'labels': {
        'enabled': true
      },
      'lineColor': '#E6EAEE',
      'lineWidth': 1,
      'gridLineWidth': 0

    };
    $scope.chartconfigHour.series = [{
      name: '',
      showInLegend: false,
      data: [20000, 20000, 30000, 20000, 10000],
      color: '#1A91EB'
    }];

    //Genre
    $scope.chartconfigGenres = angular.copy($scope.chartConfig);
    $scope.chartconfigGenres.options.chart.type = 'column';
    $scope.chartconfigGenres.size.height = 180;
    $scope.chartconfigGenres.options.xAxis = {
      'categories': ['21/9', '22/9', '23/9', '24/9', '25/9', '26/9', '27/9'],
      'title': {
        'text': null
      },
      'labels': {
        'enabled': true
      },
      'lineColor': '#E6EAEE',
      'lineWidth': 1,
      'gridLineWidth': 0

    };
    $scope.chartconfigGenres.series = [{
      name: 'Male',
      showInLegend: false,
      data: [20000, 20000, 30000, 20000, 10000, 10000, 10000],
      color: '#337BBF'
    }, {
      name: 'Female',
      showInLegend: false,
      data: [20000, 20000, 30000, 20000, 10000, 10000, 10000],
      color: '#2297F0'
    }];
    $scope.chartconfigGenres.options.yAxis = {
      'title': {
        'text': null
      },
      'labels': {
        'enabled': true
      },
      'lineColor': '#E6EAEE',
      'lineWidth': 1,
      'min': 0,
      'minRange': 100,
      'max': 3000,
      'minPadding': 1,
      'gridLineWidth': 0

    };

    //Community Type
    $scope.chartconfigCommunity = angular.copy($scope.chartConfig);
    $scope.chartconfigCommunity.options.chart.type = 'solidgauge';
    $scope.chartconfigCommunity.size.height = 250;
    $scope.chartconfigCommunity.options.tooltip = {
      'borderWidth': 0,
      'backgroundColor': 'none',
      'shadow': false,
      'style': {
        'fontSize': '16px'
      },
      'pointFormat': '{series.name}<br><span style=\'font-size:2em; color: {point.color}; font-weight: bold\'>{point.y}%</span>',
      'useHTML': true,
      positioner: function positioner(labelWidth, labelHeight) {
        return {
          x: 104 - labelWidth / 2,
          y: 104
        };
      }
    };
    Highcharts.getOptions().colors = ['#1F96EF', '#8668E6', '#FAC83F'];
    $scope.chartconfigCommunity.options.pane = {
      startAngle: 0,
      endAngle: 360,
      background: [{ // Track for Move
        outerRadius: '109%',
        innerRadius: '91%',
        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.2).get(),
        borderWidth: 0
      }, { // Track for Exercise
        outerRadius: '66%',
        innerRadius: '85%',
        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.2).get(),
        borderWidth: 0
      }, { // Track for Stand
        outerRadius: '40%',
        innerRadius: '59%',
        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.2).get(),
        borderWidth: 0
      }]
    };
    $scope.chartconfigCommunity.options.yAxis = {
      'min': 0,
      'max': 100,
      'lineWidth': 0,
      'tickPositions': []
    };
    $scope.chartconfigCommunity.options.plotOptions = {
      solidgauge: {
        borderWidth: '18px',
        dataLabels: {
          y: 0,
          borderWidth: 0,
          useHTML: true,
          enabled: false
        },
        linecap: 'round',
        stickyTracking: false,
        innerRadius: '0%'
      },
      series: {
        pointWidth: 0
      }
    };
    $scope.chartconfigCommunity.series = [{
      name: 'Urban',
      borderColor: '#1F96EF',
      data: [{
        color: Highcharts.getOptions().colors[0],
        radius: '100%',
        innerRadius: '100%',
        y: 50
      }]
    }, {
      name: 'Suburban',
      borderColor: Highcharts.getOptions().colors[1],
      data: [{
        color: Highcharts.getOptions().colors[1],
        radius: '75%',
        innerRadius: '75%',
        y: 35
      }]
    }, {
      name: 'Rural',
      borderColor: Highcharts.getOptions().colors[2],
      data: [{
        color: Highcharts.getOptions().colors[2],
        radius: '50%',
        innerRadius: '50%',
        y: 15
      }]
    }];
    // Platform
    $scope.chartconfigPlatform = angular.copy($scope.chartConfig);
    $scope.chartconfigPlatform.options.chart.type = 'pie';
    $scope.chartconfigPlatform.options.plotOptions.pie.size = 200;
    $scope.chartconfigPlatform.options.plotOptions.pie.colors = ['#289DF5', '#F9C943'];
    $scope.chartconfigPlatform.size.height = 250;
    $scope.chartconfigPlatform.series = [{
      name: '',
      data: [['IOS', 6], ['Android', 4]],
      innerSize: '70%',
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }];
    $scope.chartconfigPlatform.options.tooltip = {
      'borderWidth': 0,
      'backgroundColor': 'none',
      'shadow': false,
      'style': {
        'fontSize': '20px'
      },
      'pointFormat': '<span style=\'font-size:2em; color: {point.color}; font-weight: bold;\'>{point.y}%</span>',
      'useHTML': true,
      positioner: function positioner(labelWidth, labelHeight) {
        return {
          x: 100 - labelWidth / 2,
          y: 80
        };
      }
    };

    //campaignDown
    $scope.campaignDown = angular.copy($scope.chartConfig);
    $scope.campaignDown.options.chart.margin = 0;
    $scope.campaignDown.options.chart.padding = 0;
    $scope.campaignDown.options.xAxis = {
      'categories': [],
      'title': {
        'text': null
      },
      'lineWidth': 0,
      'lineColor': 'transparent',
      'labels': {
        'enabled': false
      },
      'minorTickLength': 0,
      'tickLength': 0,
      'tickWidth': 0,
      'minPadding': 0,
      'maxPadding': 0,
      'pointPadding': 0,
      'groupPadding': 0
    };
    $scope.campaignDown.options.yAxis = {
      'lineWidth': 0,
      'lineColor': 'transparent',
      'labels': {
        'enabled': false
      },
      'minorTickLength': 0,
      'tickLength': 0,
      'gridLineColor': 'transparent',
      'tickWidth': 0,
      'minPadding': 0,
      'maxPadding': 0,
      'pointPadding': 0,
      'groupPadding': 0
    };

    $scope.campaignUp = angular.copy($scope.campaignDown);
    $scope.campaignUp.series[0].color = '#62d194';
    $scope.campaignUp.series[0].data = [5, 20, 15, 2, 7, 10, 4, 11, 15, 10, 21];

    // Age Timeline
    $scope.chartNetIncome = angular.copy($scope.chartConfig);
    $scope.chartNetIncome.options.chart.type = 'column';
    $scope.chartNetIncome.options.xAxis.categories = ['21/9/2016', '22/9/2016', '23/9/2016', '24/9/2016', '25/9/2016', '26/9/2016', '27/9/2016'];
    $scope.chartNetIncome.options.xAxis.labels.enabled = true;
    $scope.chartNetIncome.size.height = 250;
    $scope.chartNetIncome.options.yAxis.lineWidth = 1;
    $scope.chartNetIncome.options.yAxis.lineColor = '#E6EAEE';
    $scope.chartNetIncome.options.plotOptions.series.stacking = 'normal';
    $scope.chartNetIncome.options.plotOptions.series.pointWidth = 40;
    $scope.chartNetIncome.options.plotOptions.series.borderRadius = 3;
    $scope.chartNetIncome.options.xAxis.lineWidth = 1;
    $scope.chartNetIncome.options.xAxis.lineColor = '#E6EAEE';
    $scope.chartNetIncome.options.yAxis = {
      'title': {
        'text': null
      },
      'labels': {
        'enabled': true
      },
      'lineColor': '#E6EAEE',
      'lineWidth': 1,
      'min': -200000,
      'minRange': -200000,
      'max': 200000,
      'minPadding': 100000,
      'gridLineWidth': 1

    };
    $scope.chartNetIncome.series = [{
      name: '65+',
      showInLegend: false,
      data: [20000, 40000, 30000, 40000, 30000, 20000],
      color: '#51B4FF'
    }, {
      name: '55-64',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 80000, 10000],
      color: '#337BBF'
    }, {
      name: '45-54',
      showInLegend: false,
      data: [-53000, -34000, -40000, -70000, -50000, -30000],
      color: '#E2E7EE'
    }];

    // Age Timeline
    $scope.chartconfigHouseholdIncome = angular.copy($scope.chartConfig);
    $scope.chartconfigHouseholdIncome.options.chart.polar = true;
    $scope.chartconfigHouseholdIncome.options.pane.size = '80%';
    $scope.chartconfigHouseholdIncome.options.xAxis.categories = ['0-10K 15%', '20-30K 15%', '30-40K 17%', '40-50K 17%', '50-60K 45%', '60-70K', '70-80K 45%', '80K+ 45%'];
    $scope.chartconfigHouseholdIncome.options.xAxis.labels.enabled = true;
    $scope.chartconfigHouseholdIncome.size.height = 250;
    $scope.chartconfigHouseholdIncome.options.yAxis.lineWidth = 1;
    $scope.chartconfigHouseholdIncome.options.yAxis.lineColor = '#E6EAEE';
    $scope.chartconfigHouseholdIncome.options.plotOptions.series.stacking = 'normal';
    $scope.chartconfigHouseholdIncome.options.plotOptions.series.pointWidth = 40;
    $scope.chartconfigHouseholdIncome.options.plotOptions.series.borderRadius = 3;
    $scope.chartconfigHouseholdIncome.options.plotOptions.series.marker.enabled = true;
    $scope.chartconfigHouseholdIncome.options.xAxis.lineWidth = 1;
    $scope.chartconfigHouseholdIncome.options.xAxis.lineColor = '#E6EAEE';
    $scope.chartconfigHouseholdIncome.series = [{
      showInLegend: false,
      type: 'area',
      data: [10000, 80000, 20000, 70000, 30000, 60000, 40000, 50000]
    }];
  }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('payoutCtrl', ['$scope', 'analyticsService', function ($scope, analyticsService) {

        var dataPayoutDetails = [{
            srcImg: 'https://www.ccep.com/system/image_block/2941/Coca-Cola.jpg',
            title: 'Coca Cola',
            subTitle: 'Coke Studio Season 8',
            hours: '23:13',
            date: '20 Oct 2016',
            name: 'John Appleseed',
            coin: '1',
            totalCoin: '5',
            dollars: '100',
            month: '',
            hrefReview: 'http://www.coca-colacompany.com/'
        }, {
            srcImg: 'http://theshoegame.com/wp-content/uploads/2015/01/nike-logo-copy.jpg',
            title: 'Nike',
            subTitle: 'Nike Air Max Campaign',
            hours: '12:24',
            date: '16 Oct 2016',
            name: 'Ricardo Hall',
            coin: '1',
            totalCoin: '1',
            dollars: '',
            month: '',
            hrefReview: 'http://www.nike.com/us/en_us/'
        }, {
            srcImg: 'http://www.kowalskis.com/sites/kowalskis.com/files/images/departments/starbucks-logo-trans.png',
            title: 'Starbucks',
            subTitle: 'Nitro Cold Brew',
            hours: '02:25',
            date: '24 Nov 2016',
            name: 'Viola Wade',
            coin: '1',
            totalCoin: '12',
            dollars: '100',
            month: '',
            hrefReview: 'http://www.starbucks.vn/'
        }, {
            srcImg: 'http://vector.me/files/images/7/3/73419/nikon.png',
            title: 'Nikon',
            subTitle: 'Nikon 1 J5 Product Launch',
            hours: '12:54',
            date: '05 Oct 2016',
            name: 'Mario Hardy',
            coin: '1',
            totalCoin: '8',
            dollars: '200',
            month: '',
            hrefReview: 'http://www.nikon.com.vn/vi_VN'
        }, {
            srcImg: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQRlV2lijfvgaPUFrfCrp0l4lxiT_dYcj_6El3HGaS50i_yz1EFEg',
            title: 'LG',
            subTitle: 'LG G5',
            hours: '23:13',
            date: '15 Feb 2016',
            name: 'Lida Valdez',
            coin: '1',
            totalCoin: '7',
            dollars: '10,000',
            month: '',
            hrefReview: 'http://www.lg.com/vn'
        }, {
            srcImg: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRI5hwT454_ibBEE1HoYkSvJfRI2PS8jQ07-a9EJegFistqkSer',
            title: 'Leica',
            subTitle: 'Leica M-D Launch',
            hours: '12:24',
            date: '18 Dec 2016',
            name: 'Ricardo Hall',
            coin: '1',
            totalCoin: '5',
            dollars: '100',
            month: '',
            hrefReview: 'https://us.leica-camera.com/'
        }];

        var itemsPerPage = 10;
        var maxSize = 10;

        $scope.view = {
            itemsPerPage: itemsPerPage,
            maxSize: maxSize,
            currentPage: 1
        };

        $scope.data = {
            campaignsCount: 0,
            campaigns: []
        };

        $scope.changePage = function () {
            getStatisticCampaigns();
        };

        var getStatisticCampaigns = function getStatisticCampaigns() {

            var params = {
                page_size: itemsPerPage,
                page: $scope.view.currentPage
            };

            analyticsService.getStatisticCampaigns(params).then(function (data) {
                $scope.data.campaignsCount = data.count;
                $scope.data.campaigns = [];
                angular.forEach(data.items, function (value, key) {
                    var item = dataPayoutDetails[Math.floor(Math.random() * dataPayoutDetails.length)];
                    var dataItem = {
                        srcImg: item.srcImg,
                        title: item.title,
                        subTitle: item.subTitle,
                        recent_view_on: value.recent_view_on === null ? '-' : moment(value.recent_view_on).format('H:mm:ss D MMM YYYY'),
                        recent_user: value.recent_user,
                        coin_earned: value.coin_earned,
                        totalCoin: item.totalCoin,
                        dollars: item.dollars,
                        month: '',
                        hrefReview: item.hrefReview
                    };
                    $scope.data.campaigns.push(dataItem);
                });
            }, function (response) {});
        };

        var init = function init() {
            getStatisticCampaigns();
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('revenueCtrl', ['$scope', function ($scope) {

        $scope.chartConfig = {
            'options': {
                'chart': {
                    'type': 'areaspline'
                },
                'xAxis': {
                    'categories': [],
                    'title': {
                        'text': null
                    },

                    'labels': {
                        'enabled': false
                    },
                    'minorTickLength': 0,
                    'tickLength': 0,
                    'tickWidth': 0,
                    'minPadding': 0,
                    'maxPadding': 0,
                    'pointPadding': 0,
                    'groupPadding': 0,
                    'lineColor': '',
                    'lineWidth': ''
                },
                'yAxis': {
                    'categories': [],
                    'title': {
                        'text': null
                    },
                    'labels': {
                        'enabled': false
                    },
                    'minorTickLength': 0,
                    'tickLength': 0,
                    'gridLineColor': 'transparent',
                    'tickWidth': 0,
                    'minPadding': 0,
                    'maxPadding': 0,
                    'pointPadding': 0,
                    'groupPadding': 0,
                    'lineColor': '',
                    'lineWidth': ''
                },
                'pane': {},
                'tooltip': {},
                'plotOptions': {
                    'series': {
                        'stacking': '',
                        'marker': {
                            'enabled': false
                        }
                    },
                    'pie': {
                        'size': 500
                    }
                },
                'exporting': {
                    'enabled': false
                }
            },
            'series': [{
                'showInLegend': false,
                'data': [],
                'color': '',
                'name': ''

            }, {
                'showInLegend': false,
                'data': [],
                'color': '',
                'name': ''
            }],
            'title': {
                'text': ''
            },
            'credits': {
                'enabled': false
            },
            'loading': false,
            'size': {
                'height': 130
            },
            'tooltip': {},
            'useHighStocks': false,
            func: function func(chart) {}
        };

        // product spending
        $scope.chartconfigProductSpending = angular.copy($scope.chartConfig);
        $scope.chartconfigProductSpending.options.chart.type = 'pie';
        $scope.chartconfigProductSpending.options.plotOptions.pie.size = 150;
        $scope.chartconfigProductSpending.options.plotOptions.pie.colors = ['#40557D', '#3373B3', '#F0B499', '#72C4B9', '#FFD60D', '#1AA6D6'];
        $scope.chartconfigProductSpending.size.height = 200;
        $scope.chartconfigProductSpending.series = [{
            name: 'Product',
            data: [['Nike', 6], ['Nike', 4], ['Nike', 7], ['Nike', 6], ['Nike', 6], ['Nike', 6]],
            innerSize: '70%',
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }];

        // Daily Sale
        $scope.chartconfigDailySale = angular.copy($scope.chartConfig);
        $scope.chartconfigDailySale.options.chart.type = 'column';
        $scope.chartconfigDailySale.options.plotOptions.series.pointWidth = 8;
        $scope.chartconfigDailySale.size.height = 179;
        $scope.chartconfigDailySale.series = [{
            name: 'Thang 1',
            showInLegend: false,
            data: [20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000],
            color: '#1A91EB'
        }];

        // Customers
        $scope.chartconfigCustomer = angular.copy($scope.chartConfig);
        $scope.chartconfigCustomer.options.chart.type = 'pie';
        $scope.chartconfigCustomer.options.plotOptions.pie.size = 140;
        $scope.chartconfigCustomer.options.plotOptions.pie.colors = ['#289DF5', '#40557D', '#FFD400'];
        $scope.chartconfigCustomer.size.height = 150;
        $scope.chartconfigCustomer.series = [{
            name: 'Customers',
            data: [['Returning', 6], ['New', 4], ['Referrals', 7]],
            innerSize: '70%',
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }];

        // Hour
        $scope.chartconfigHour = angular.copy($scope.chartConfig);
        $scope.chartconfigHour.options.chart.type = 'area';
        $scope.chartconfigHour.options.xAxis = {
            'categories': ['Jan', 'Feb', 'March', 'April', 'May'],
            'title': {
                'text': null
            },
            'labels': {
                'enabled': true
            },
            'lineColor': '#E6EAEE',
            'lineWidth': 1,
            'gridLineWidth': 0

        };
        $scope.chartconfigHour.series = [{
            name: '',
            showInLegend: false,
            data: [20000, 20000, 30000, 20000, 10000],
            color: '#1A91EB'
        }];

        // Data Prduct Revenue Details
        var dataProductRevenueDetails = [{
            srcImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa_pyRU_WvbQ0QtxuyPYZq_5G5Pf_XxkCuYLmg3mNzfGwPrvpk',
            title: 'Rabbit hole London',
            subTitle: 'Oversized Hoodie',
            price: 'USD 230.00',
            payment: 'Credit Card',
            hoursOfView: '23:13',
            dateOfView: '24 Nov 2016',
            hoursOfSale: '23:13',
            dateOfSale: '24 Nov 2016',
            userName: 'John Appleseed',
            sex: 'Male',
            age: '18-24',
            country: 'Beattyhaven Canada',
            companyName: 'Nike',
            hrefReview: 'http://www.nike.com/us/en_us/'
        }, {
            srcImg: 'https://cdn.shopify.com/s/files/1/1202/6102/products/stussy-world-tour-t-shirt-fa15-navy-1_1_grande.jpeg?v=1462801097',
            title: 'Stussy',
            subTitle: 'Bills T-shirt',
            price: 'USD 150.00',
            payment: 'Credit Card',
            hoursOfView: '12:24',
            dateOfView: '24 Nov 2016',
            hoursOfSale: '12:24',
            dateOfSale: '24 Nov 2016',
            userName: 'Ricardo Hall',
            sex: 'Male',
            age: '45-50',
            country: 'South Aditya French Guiana',
            companyName: 'Nike',
            hrefReview: 'http://www.nike.com/us/en_us/'
        }, {
            srcImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXBBjCCRVbMx6LeQMzYKSDq1C-NAlOpTF6FXWMfZe-e69_eDFm',
            title: 'Billionaire Boys Club',
            subTitle: 'Motm Starfield T-Shirt',
            price: 'USD 80.00',
            payment: 'Paypal',
            hoursOfView: '02:25',
            dateOfView: '24 Nov 2016',
            hoursOfSale: '02:25',
            dateOfSale: '24 Nov 2016',
            userName: 'Viola Wade',
            sex: 'Female',
            age: '18-24',
            country: 'Port Erickmouth Sweden',
            companyName: 'Coke',
            hrefReview: 'http://www.coca-colacompany.com/'
        }, {
            srcImg: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQC7B1qC3EfAnnCqE-Ku58xyN0cN03s9sHGdkOl-IJwS-7P7wHYsA',
            title: 'A.P.C',
            subTitle: 'Petit New Standard',
            price: 'USD 180.00',
            payment: 'Credit Card',
            hoursOfView: '12:54',
            dateOfView: '05 Oct 2016',
            hoursOfSale: '12:54',
            dateOfSale: '05 Oct 2016',
            userName: 'Mario Hardy',
            sex: 'Male',
            age: '18-24',
            country: 'North Annie Aruba',
            companyName: 'Nikon',
            hrefReview: 'http://www.nikon.com.vn/vi_VN'
        }, {
            srcImg: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhUQEhIPEBAQEhUQEBISFQ8QDxUVFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGisfHR0tLS0tLS0tKy0rLSsrLS0tMC0tKy0rLSsxLS0tLysrLTcrLSstLS4tKysuLS0tMCsuN//AABEIAOAAugMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYBBwj/xAA/EAABAwIDBQUGBAUCBwEAAAABAAIDBBEFEiEGMUFRcRMiYYGRBzJSobHBFCNC0WJygpLxU7IWJTNjouHwFf/EABoBAQADAQEBAAAAAAAAAAAAAAABAwQCBQb/xAAkEQEAAgIBAwUBAQEAAAAAAAAAAQIDETEEEiEFIjJBUSMUE//aAAwDAQACEQMRAD8A9lSSSQJJJJAkkkkCWa25ib2TXnTK7LflcfTQLSoLtjDnpJf4QHjyK5v8Zd4/lDyyWUA+9x8lNHJ4qkW3URzDdovPntl6cd0NFTVNuaJRVTSL33LKwMkcN6JU9Gd5JPgq7dsO475FJKy+g9Uf2SlJkcD8P3WagiARzZaQNmsSBmaRyTDf+kfiM+P+c/rZpJJL1njkkkkgSSSSBJJJIEkkkgSSSSBJJJIEko6ioZGLvcGjx+3NZXEcelkJbH3Gbgf1kc78FzNohOmknxKFhLXSNDhvG8rCbVbYOkz0sceRhIBeTdzmkX0Fu7r13JRQb+ZVevwpsoGuV7fddv8AI+CpvaZjwsx6i25ZyNvFSSQX1VybDJIxq06cRqEymlB7pWG0TD1aWrbiUVKSCi0blTbT63CtM0sOKonzK+PELsbdF17PmpoaaQ2s13pb6q6zDC73zYDgNSfPgrKYrT9KcuelY5S7MvkijeAe4ZCWA6gCwBtyGYFG6fFdbPFuGYfsh9wBlAsALADcmkr0azNY08i0907aGOdjtzgfr6KRZdX4MUeNHDN47irIv+uNDKSpw4ix2+7equAruJiUEkkkpCSSSQJJJDMTxlkPdFnycuA6qJnQIyyNaLuIaOZNggeJbQAd2LU/Gd3kEGmnfK7M8kk+g8AuNiVc3/HUQgkcXnM8lxPEm66D4KyGBPFlWlVsTwKlYx3JWAnAIIuzT2Q66gealAUrUDOxZxa30CcyNo3NaOgAUoXUTtxoKd2fMrgKeiDcoXOzCekgbkXCxOXQEDMqlp6pzPEcQkAuFinegXp6hrxcb+I4qVAoXFjrjgjcbw4AjcVdW23MwckkkukA+0GKdkOzZ/1Hj+0fus1Eznv4ldY4yvc92pOqc4aKi07l3EJ2MTgxR0kl9FYLVyGZQu2TrLrQgTWp4anAJwCBoCe0JWTmhA4BdsupBBwBPTU4IEuWTlxByycEgugIECn2TQF21kEZVnDqixyncToq7hqel01u/wA1MToHUk2J1wD4Jy0OGHw5u/yTpRYFMw92tualrAsztWpnWeOqLvag1Kc0g5ZrIrUvJOUcN5QRk3KlaE1gAUjUD2hZHbfbf/8APkjp44HVFRKzO1t3NaASWjRoJe4kHQW6rXBdDRcGwuNAbC4vyPAKYHjeM+0PGIC0Sww0pe3O1j4jnLb2vZzrjdxRWDHNpxlf+EjkY4Bw/Lj1B1G59ws9UA4xjWUaxdrlvvAggPe9bH+4L3Vo8hw6cF3adfSIQ4e+R0THSsEcrmNMjAcwa4jVoPHVZ/avbKKiPZMb209gS2+VjL/E7n4D5LSVMwjjfId0bHyH+lpd9l4BUTukc6Rxu97i9x8XalZ8ltcPX9K6GvUWm1+KtvT+0yXN+ZTxOZfXI5zXgcxe4PyW+wfFoauITROuzc4HRzSNSHDgV4KFco8SliZLGxxa2oZ2cg5i/wDkdCq65Jjl6vU+kYskfy9svRcc9osUTjHTxictNjI5xbFfk0AXd10VfC/aUC4NqIQxh07SNznZfEtO8dCvOF1R/wBLL6+kdN2dsx5/ft9CwyNe0PaQ5rgHNI1BBGhCkWK9lNa59NJETcQydzwa8Xt0uD6rb2Wis7jb5TqcE4ctsf4bZdCRCSlQa7imgJZt6QQX6CT9PmFcQiF+VwKLgq6k+HMvO4ybgjfwV18wkaHcRofAqhA/d4FTzDI4n9Lh3h9wqXSPCX+6evrqiLpbaDfxKDYVJYkcnH57lbbIb3QEoypgVRilVpjkE4Qna/ETTUVRMDZzYnBn87hlb8yCigKwftlq8lGyL/WnaD0YC76gKa+ZJ4DvYbhYtUVR4FtMzyGd/wBWr1hoWR9ldJ2WGQc5c8x/rebfIBa5TafJDlRAJGOjPuyMcw9HAg/VeCYth0lNK6CQWew28HDg4eBC+gWoPtDgVPWMyyt7wBySNsJGdDy8Doqr07np+m9d/mtMW+MvCU4LQbR7IT0d3j86EamRoIc0fxt4ddyzwWeYmOX1WHNTLXupO4OXVdwjCZquTsoW5nb3Hcxo5uPAL0/ZrYaCltJKRUTjUEi0TD/C07yOZ+SmtJsp6rr8XTx7p3b8P9m2DPpqYvkBa+ocJMp0c1gFm38TqfMLWprTcJXWmI1Gnx2fNObJOS3Mk5RmTUDmnA/JUah/5jB1KlSsE+8pVWjd8zb5qy5AjwVhtQeZ9FAUlIyLmFriOCuzHMwO4jTzTq6C/eCrwu3s+IadVAFseI5jGTYvGZnI+HkrTpdQAqtQxr8sh0dCSfI77qSgGa7z0CC7E8q9E9C5Jg3QKzTSG2qAXtrj1bTdlHR0xnknzd/K57GZbWBA0ubnUkDRZCv2Wx7EyBUyQNDDmaxzmNDSRbcwHh4r0qKoAV7DBvdzK6i2jTzWm2O2hp2NjhrmNYwZWMEjg0DkLt3Ld7JQ18dPlr5GSz5yWuZY2ZYWDiALm+bgjTk13JJtsWYjoo5k6neCNC11tDlIdbrZNmXIquWG2g2E7Wdj6bLHHK60zeEfEvaOII/Tz+W5sbqeBRasTy0dP1OTBbupKLCcKipYhDC3K0ak/qceLnHiVaKeE1ymPCm1rWnutO5koiupkW9Pcjk0b0Nvec8mN+yIXQqY5ZZB8eUjoR/lBYhdq0cyT/8AfNX3bkOpTmfpuYLefJE37kHUkgnIBUg0Q2qp7i7d41RVyquCDM4kRe59yYFrvB1tfXeocLleY2RC2do/MdwB3eqIY5S543tG+2Zvg4ahB9lnF3aSX0e5pA5HIL/NAaZS21JuVNeyksm5LlAomXWgp2ZWgeCF0bLuHgi4QV8RrY4InzSuyxxNL3nfYDkOJ5DxWOosPqcZAmqnS01C7WKjjcWySs4PneOBH6QrHtUa51A+wLmskifKBxjDxm+ysYhs+7EezIrJIsPfG0up4WhplBF7Olv7pFhay7jhAZszhlKMVL8ObkpaWndFVvY5xhkmcSQwE6EtFiT4LXVuN0zIH1faskgYHEvjIeHFpy5W23uzaW5pTYPSNpjhzctPFPG+JrIy1khBHfLb+8628679ViMTfTwyR0kLC6kwwtEcDTd1VXvuY4vHLfO48zc7k5FV1BUVWIUck0kjagPFa+Bh/JpaZh7kZ5yPOhPUbgvUoljsPlhw2N1RXTxtqat/aTPJOptpFGN5Ywaep4rV0dZFJG2Zj2uic3O2S/cy781+A3qJSupj1mm+0DDDIIhOXFzxEHtZI6DOdze0tZad4UakRMOqkcoeKmUCElBsfdle1wNiWZR1udeuqMSaFDsbhDuycf0vt6/4QWMMiyMA4nUog7h6qlTPueNrK41A9qfZNCiNXF/qR/3NRKlfn+yrygoNTYrUD3jG/q0tPqD9lO/FhbvMI/lIcPsuYvWVk4bx9Iq+UNB1Wd2Ol1mZwEl2+d9PorWK4lG7QPGvB2h+adgeHljTJawmcXtO+4Hdv8iulQ7ZduoY3FOBugJ4ezS6bj+LxUUD6iW+SMXs22ZxOga3xJ0VqkZZoQfavCW10ElM5xZ2gGV41yuabtNuIvwUwOYNXS1dOX1NMKcS3aIi8S5onNGrtBa4J0QzYGU0k9Vhb3l0VLaop3uOrYXi5Y7wbv8AMqr/AM8awQ2w92UBgqC6TMQBYEs5q3SbGyto6prZhLX17ck1RIMjcp0LGgbm5b9b8F14Qgo8UzR1e0Eou1kb4MNjdcWjabNd4GSQ+gKqbN4fDhxz1L3TV0lPJX1D7XZBGe88eDnEHXe7LyAWn2j2X/EUDKGGQQdl2RjcW5m/lWtdo6XVL/hgfh56d8zpaisY4VFU9ozueW2acoOjG6WaDu6qdwMvUVGSldic7I5K/Ej+HoI3gPbDE/usa0OvqAS4m28hFNpoBFhjsPidJK7D46d9aGggGK+aRmbdewLrckx2wtWYY5HVEdTXUr4XUucFlOyOFwcIwObiLlx32A4IlVYNicc8tTSuox+OjZ+JimzubFKGZS6Nw99vVNwLlHgP4vsZX1DH4fG5lRRUkEYiiFheMyuuS8jkLXK1pQnZTBhQ0kVKHGTsmkF+67nOLnWHAXcbIsuJlKtJoVMDoo5wuxOuFAbUjS6oYtYwPJNstnX6EIm8XCH1bM0UjPijeP8AxKAbhmLsOl3PI4gfW6JmtcfdAZ17x9FisDlWngkus+TJaPEN2PBXWyrGOkHfc5w5E2b6DRVm0jbbgiBF1FmVHdM8tMViI8AYdZV6uTRPmdZDqubRWVhzbwGCnM0zYxqXOA9V6ntBRCJkDW7o2mL5D9isTsHR9rWsPCMF58t3zsvRdqx+SDyePoVviPY83LPuZQ2Ckpm3IHioL3V7D2a35KtwKXsFUmIU8rtFSkcg451yEYphYINALuCNsGiBSnRD26uVyd2irU41QXGjRdukVwIJWJyawrt0Eco0UdOd4Uz1WYbO6oLCq21tzCslQP3jqg84w1+V7h8LiPQ2WgpKhAjTkSSuG4SP8u8Vbw15uAs2Su5ejjtqIaiJ9wuqGA2CkzLPK+Gar9EIqGGyN1zbkckLxF9hYakrRRTfhovZWz86Y8ox/uWu2rP5I8Xj6FZL2WA9rMf+2P8AcFq9rT+Wwc3/AGK3R8HnX+TKMaitE2wQ+NqI3sLKpBTPVVxT5HKIFBboG3d0RZUcOZpfmrjyggqCuUzUx2pViIIHvK4Fx6TSgmaurjU5BwqrMNbqyVDKEEnionjVdjOnRNeba8tUHnYflmkcDo57wRw3lXMPbr5obBJmJPNzj6lFqAcVTf7ehj+huI6J1vBRxKWyx25a4BqxqBV60NYFmsTK1Y/LPkbj2WU1mTS/E5rB5XJ+oWg2pZdjP5/sVFsLT9nRR/x3efMq7tA28V/hN/qt0/F5dp3ZlIW69FM9yij3LpVKTXlcYFx6no2XI8NUBWBtgFyUp99FXBugcwKdqiCkCBPKTE1yTEFgJyaCnBBwqNykKY4IGR8lUxebs4ZZPgje70aVbG9T0tOJC5p1Ba4HzFvupgeUUWjR0CN0AQqSHs3mM72OLfQ2RfD1Tl8N+HyLRBPzJse5NKxWbIU6oaLLYq3vAc9Fp6l2iH4Xh34irjZ+kOzO6DUrXhjcsuedQ9Swqn7KGOP4I2jztqqu0kwbCRxeQB9UVWM2uxAOkEYOkY16nf8AZbrTqHmRyrAJjih7ay3ipfxd1Q6Tk3RKgbbVC6cEm6KxOsgtucokwzJB6CZqlaq7SpG2QddvSamudr8ko3ILTU5MYnIOpjk5NcgYUQwtu8+FkOKvYXJrbmuq8kvP9sqbs6t/J9pB/UBf53XMORn2j0/fik5tLD5G4+pQTCzp0VeeG3pp2NNOiWVciFwnXXny3BNY6yN+zyku6Wc+Ebfqft6rOVZ/Zeh7K0nZU0Y4uGc9Xa/Sy9Dp6/bB1VtRpJjmJCBmnvuBy+VtfmF547NI4niTcrR7WSZpw3g1uX11QuNllZedyxQijpQOqlbCFJZdXKU1O0BTlQMaSrAaBxQdapQ5Q3SHVBYaeikFuZCrNupmuQPc3xCawWK48pNKC2xPBTIypLIEVxKybdAnhKnflcD4rqjLkEO38Oama/4Hg+Tgf/SyGFBbrGW9pRSj4W3/ALSHfRYXC9LKM/xaul5GotxTLqSMaJui8+Xov//Z',
            title: 'Silas',
            subTitle: 'Tokyo/London Print Yoke…',
            price: 'USD 170.00',
            payment: 'Apple Pay',
            hoursOfView: '23:13',
            dateOfView: '05 Oct 2016',
            hoursOfSale: '23:13',
            dateOfSale: '05 Oct 2016',
            userName: 'Ricardo Hall',
            sex: 'Male',
            age: '35-44',
            country: 'Danstad Russian Federation',
            companyName: 'Nike',
            hrefReview: 'http://www.nike.com/us/en_us/'
        }];

        // Begin: variable zone //
        var revenueSeries = {
            id: 'revenueChart',
            name: 'Revenue',
            data: [2000, 1000, 4000, 3500, 10000, 6000, 5500, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750],
            pointStart: Date.UTC(2016, 0, 1),
            pointInterval: 24 * 3600 * 1000
        };
        var revenueData = [{
            title: 'REVENUE',
            value: '$37.5k'
        }, {
            title: 'UNIT SOLD',
            value: '890'
        }, {
            title: 'ORDERS',
            value: '381'
        }, {
            title: 'VIEWS',
            value: '13.2k'
        }, {
            title: 'CONV.RATE',
            value: '4.32%'
        }, {
            title: 'AOV',
            value: '$24.9'
        }, {
            title: 'RPV',
            value: '$8.9'
        }];
        var revenuePieProduct = {
            id: 'revenuePieProduct',
            title: {
                text: 'Revenue by <strong>Product</strong>'
            },
            series: [{
                name: 'Revenue by Product',
                data: [['<strong>Hoodie</strong><br/>USD 3689.80', 3689.80], ['<strong>T-Shirt</strong><br/>USD 980.20', 980.20], ['<strong>Skate T-Shirt</strong><br/>USD 770.20', 770.20]]
            }],
            credits: {
                enabled: false
            }
        };
        var revenuePieSource = {
            id: 'revenuePieSource',
            title: {
                text: 'Revenue by <strong>Source</strong>'
            },
            series: [{
                name: 'Revenue by Source',
                data: [['<strong>Amazon</strong><br/>USD 339.80', 339.80], ['<strong>Walmart</strong><br/>USD 680.20', 680.20], ['<strong>Ebay</strong><br/>USD 120.20', 120.20]]
            }],
            credits: {
                enabled: false
            }
        };
        var revenuePieCountry = {
            id: 'revenuePieCountry',
            title: {
                text: 'Revenue by <strong>Country</strong>'
            },
            series: [{
                name: 'Revenue by Country',
                data: [['<strong>Canada</strong><br/>USD 2358.85', 2358.85], ['<strong>Sweden</strong><br/>USD 7583.10', 7583.10], ['<strong>Singapore</strong><br/>USD 5461.28', 5461.28]]
            }],
            credits: {
                enabled: false
            }
        };
        var productViewRate = {
            id: 'productViewRate',
            title: 'Product View Rate',
            categories: ['<strong>UNDEFEATED</strong> Full Zip Jacket', '<strong>STUSSY</strong> T-Shirt', '<strong>HUF</strong> T-Shirt', '<strong>STAMPD</strong> Warm Up Pants'],
            logos: ['https://image.freepik.com/free-icon/domain_318-32028.jpg', 'http://www.albany.edu/ims/Images/youtubelink.png', 'https://maxcdn.icons8.com/Share/icon/Network//domain1600.png', 'http://static.wixstatic.com/media/1a7da0_4c725e80c78c4e9893caf308e1a389c5.png'],
            series: {
                data: [{
                    y: 500,
                    color: '#2097f0'
                }, {
                    y: 300,
                    color: '#8d74e5'
                }, {
                    y: 400,
                    color: '#3FC42A'
                }, {
                    y: 700,
                    color: '#FAC739'
                }]
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            }
        };
        var productSpending = {
            id: 'productSpending',
            title: {
                text: 'Product Spending'
            },
            series: [{
                name: 'Product Spending',
                data: [['<strong>ROLEX</strong> USD ', 1396], ['<strong>VANS</strong> USD ', 501], ['<strong>INCASE</strong> USD ', 465], ['<strong>GUCCI</strong> USD ', 430], ['<strong>LV</strong> USD ', 215], ['<strong>INCASE</strong> USD ', 573]]
            }],
            credits: {
                enabled: false
            }
        };
        var dailySaleData = [{
            y: 50
        }, {
            y: 30
        }, {
            y: 10
        }, {
            y: 25
        }, {
            y: 60
        }, {
            y: 75
        }, {
            y: 45
        }, {
            y: 70
        }, {
            y: 50
        }, {
            y: 45
        }, {
            y: 90
        }, {
            y: 80
        }, {
            y: 76
        }, {
            y: 21
        }, {
            y: 80
        }, {
            y: 45
        }, {
            y: 30
        }, {
            y: 24
        }, {
            y: 15
        }, {
            y: 45
        }];
        var maxDailySale = findMaxDailySale(dailySaleData);
        var dailySale = {
            id: 'dailySale',
            title: 'Daily Sale',
            series: {
                data: dailySaleData
            },
            maxValue: maxDailySale,
            increaseValue: '+32'
        };
        var customer = {
            id: 'customerPie',
            title: {
                text: 'Customer'
            },
            series: [{
                name: 'Revenue by Product',
                data: [['NEW', 3689.80], ['RETURNING', 1280.20], ['REFERRALS', 770.20]]
            }],
            maxValue: 271,
            increaseValue: '+9.3',
            total: function total() {
                var sum = 0;
                var data = this.series[0].data;
                for (var i = 1; i < data.length; i++) {
                    sum += data[i][1];
                }
                return sum;
            }
        };
        var monthRevenue = {
            id: 'monthRevenue',
            name: 'Month',
            data: [[Date.UTC(2016, 1), 1000, '12'], [Date.UTC(2016, 2), 4000, '-4'], [Date.UTC(2016, 3), 2500, '21'], [Date.UTC(2016, 4), 6500, '7'], [Date.UTC(2016, 5), 1500, '4.3']],
            total: function total() {
                var sum = 0;
                var data = this.data;
                for (var i = 0; i < data.length; i++) {
                    sum += data[i][1];
                }
                return sum;
            },
            increaseValue: '+32',
            pointStart: Date.UTC(2016, 0, 1),
            pointInterval: 24 * 3600 * 1000 * 30
        };
        // End: variable zone //

        // Begin: Angular Scope zone //
        $scope.dataProductRevenueDetails = dataProductRevenueDetails;
        $scope.revenueSeries = revenueSeries;
        $scope.revenueData = revenueData;
        $scope.revenuePieProduct = revenuePieProduct;
        $scope.revenuePieSource = revenuePieSource;
        $scope.revenuePieCountry = revenuePieCountry;
        $scope.productViewRate = productViewRate;
        $scope.productSpending = productSpending;
        $scope.dailySale = dailySale;
        $scope.customer = customer;
        $scope.monthRevenue = monthRevenue;
        // End: Angular Scope zone //

        // Begin: Function Zone //
        function init() {

            drawLineChart($scope.revenueSeries);
            drawPieChart($scope.revenuePieProduct);
            drawPieChart($scope.revenuePieSource);
            drawPieChart($scope.revenuePieCountry);
            // drawVerticalBarChart($scope.productViewRate);
            // drawPieTwoLegendColumnChart($scope.productSpending);
            // drawBarChart($scope.dailySale);
            // drawCustomerPieChart($scope.customer);
            // drawMonthRevenueLineChart($scope.monthRevenue);
        }

        function drawLineChart(chart) {
            var c = chart;
            var lineChart = Highcharts.stockChart(c.id, {
                title: {
                    text: ''
                },
                xAxis: {
                    tickmarkPlacement: 'on',
                    type: 'datetime',
                    tickInterval: 24 * 3600 * 1000
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    opposite: false
                },
                rangeSelector: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                rangeSelectorZoom: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                series: [{
                    name: c.name,
                    data: c.data,
                    pointStart: c.pointStart,
                    pointInterval: c.pointInterval
                }],
                credits: {
                    enabled: false
                }
            });
        }

        function drawPieChart(chart) {
            var c = chart;
            var pieChart = Highcharts.chart(c.id, {
                title: {
                    text: c.title.text, //'Browser<br>shares<br>2015',
                    align: 'center', //'center',
                    verticalAlign: 'middle', //'middle',
                    y: -130 //40
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' //'{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false, //true,
                            distance: -50, //-50,
                            style: {
                                fontWeight: 'bold', //'bold',
                                color: 'white'
                            }
                        },
                        startAngle: 0, //0,
                        endAngle: 360, //360,
                        center: ['50%', '65%'],
                        showInLegend: true
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical',
                    symbolRadius: 100,
                    symbolPadding: 5,
                    itemMarginBottom: 10,
                    itemStyle: {
                        fontWeight: 100
                    },
                    symbolWidth: 16,
                    symbolHeight: 16,
                    y: 50
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    type: 'pie',
                    name: c.series[0].name, //'Browser share',
                    innerSize: '70%',
                    data: c.series[0].data
                }],
                credits: {
                    enabled: false
                }
            });
        }

        function drawVerticalBarChart(chart) {
            var c = chart;
            var barChart = Highcharts.chart(c.id, {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: c.title
                },
                xAxis: {
                    categories: c.categories,
                    labels: {
                        x: 5,
                        y: -25,
                        align: 'left'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ' '
                    },
                    gridLineWidth: 0,
                    stackLabels: {
                        enabled: true,
                        x: -40,
                        style: {
                            color: 'white',
                            textShadow: undefined
                        }
                    }
                },
                legend: {
                    reversed: true,
                    enabled: false
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    },
                    bar: {
                        zones: [{
                            fillColor: 'red'
                        }]
                    }
                },
                series: [{
                    name: 'Price',
                    data: c.series.data,
                    borderRadius: 25
                }],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            });
        }

        function drawPieTwoLegendColumnChart(chart) {
            var c = chart;
            var pieChart = Highcharts.chart(c.id, {
                title: {
                    text: c.title.text,
                    align: 'center',
                    verticalAlign: 'middle',
                    y: -150
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        startAngle: 0,
                        endAngle: 360,
                        center: ['50%', '65%'],
                        showInLegend: true
                    }
                },
                legend: {
                    labelFormatter: function labelFormatter() {
                        var total = 0;
                        var percentage;
                        var data = this.series.data;
                        for (var key in data) {
                            if (data[key]) {
                                total += data[key].y;
                            }
                        }
                        percentage = (this.y / total * 100).toFixed(2);
                        return this.name + ' ' + this.y + '<br/>' + percentage + '%' + '<br/><span style="color:#B0B0B0;">______________________</span>';
                    },
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'horizontal',
                    symbolRadius: 100,
                    symbolPadding: 5,
                    itemMarginBottom: 14,
                    itemDistance: 50,
                    width: 300,
                    maxHeight: 500,
                    itemWidth: 130,
                    itemStyle: {
                        fontWeight: 100
                    },
                    symbolWidth: 16,
                    symbolHeight: 16,
                    y: 50
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    type: 'pie',
                    name: c.series[0].name,
                    innerSize: '70%',
                    data: c.series[0].data
                }],
                credits: {
                    enabled: false
                }
            });
        }

        function drawBarChart(chart) {
            var c = chart;
            var barChart = Highcharts.chart(c.id, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ' '
                },
                xAxis: {
                    categories: c.categories,
                    labels: {
                        formatter: function formatter() {
                            return ' ';
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ' '
                    },
                    labels: {
                        formatter: function formatter() {
                            return ' ';
                        }
                    },
                    gridLineWidth: 0
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    },
                    bar: {
                        zones: [{
                            fillColor: 'red'
                        }]
                    }
                },
                series: [{
                    name: 'Price',
                    data: c.series.data
                }],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            });
        }

        function findMaxDailySale(arr) {
            var max = arr[0].y;
            var indexOfMax = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].y >= max) {
                    max = arr[i].y;
                    indexOfMax = i;
                }
            }
            arr[indexOfMax].color = '#F7BE00';
            return max;
        }

        function drawCustomerPieChart(chart) {
            var c = chart;
            var pieChart = Highcharts.chart(c.id, {
                title: {
                    text: ' ',
                    align: 'center', //'center',
                    verticalAlign: 'middle', //'middle',
                    y: -100 //40
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' //'{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false, //true,
                            distance: -50, //-50,
                            style: {
                                fontWeight: 'bold', //'bold',
                                color: 'white'
                            }
                        },
                        startAngle: 0, //0,
                        endAngle: 360, //360,
                        center: ['25%', '65%'],
                        showInLegend: true,
                        size: '50%'
                    }
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal',
                    symbolRadius: 100,
                    symbolPadding: 5,
                    itemMarginBottom: 10,
                    itemStyle: {
                        fontWeight: 100
                    },
                    symbolWidth: 16,
                    symbolHeight: 16
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    type: 'pie',
                    name: c.series[0].name, //'Browser share',
                    innerSize: '70%',
                    data: c.series[0].data
                }]
            });
        }

        function drawMonthRevenueLineChart(chart) {
            var c = chart;
            var lineChart = Highcharts.chart(c.id, {
                chart: {
                    type: 'area'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    tickmarkPlacement: 'on',
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    gridLineWidth: 0,
                    opposite: false,
                    labels: {
                        enabled: false
                    }
                },
                rangeSelector: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                rangeSelectorZoom: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                series: [{
                    name: c.name,
                    data: c.data,
                    pointStart: c.pointStart,
                    pointInterval: c.pointInterval,
                    fillColor: {
                        linearGradient: [0, 0, 0, 500],
                        stops: [[0, Highcharts.getOptions().colors[0]], [1, 'rgba(255,255,255,0)']]
                    }
                }],
                credits: {
                    enabled: false
                }
            });
        }
        // End: Function Zone //

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('trafficCtrl', ['$scope', function ($scope) {

        var dataProductTrafficeDetails = [{
            srcImg: 'https://www.ccep.com/system/image_block/2941/Coca-Cola.jpg',
            title: 'Coca Cola',
            dollars: '23,197.20',
            unitSold: '1724',
            order: '471',
            numView: '58,910',
            coinRate: '5.10',
            dollarAVO: '65.90',
            dollarRPV: '21.10',
            status: 'status-green'
        }, {
            srcImg: 'http://theshoegame.com/wp-content/uploads/2015/01/nike-logo-copy.jpg',
            title: 'Nike',
            dollars: '11,203.20',
            unitSold: '985',
            order: '432',
            numView: '42,892',
            coinRate: '3.25',
            dollarAVO: '34.10',
            dollarRPV: '12.60',
            status: 'status-green'
        }, {
            srcImg: 'http://www.kowalskis.com/sites/kowalskis.com/files/images/departments/starbucks-logo-trans.png',
            title: 'Starbucks',
            dollars: '4,289.90',
            unitSold: '89',
            order: '211',
            numView: '8,991',
            coinRate: '1.11',
            dollarAVO: '18.30',
            dollarRPV: '3.10',
            status: 'status-organce'
        }, {
            srcImg: 'http://vector.me/files/images/7/3/73419/nikon.png',
            title: 'Nikon',
            dollars: '9,190.30',
            unitSold: '166',
            order: '99',
            numView: '13,991',
            coinRate: '1.98',
            dollarAVO: '43.10',
            dollarRPV: '21.60',
            status: 'status-gray'
        }, {
            srcImg: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQRlV2lijfvgaPUFrfCrp0l4lxiT_dYcj_6El3HGaS50i_yz1EFEg',
            title: 'LG',
            dollars: '12,890.20',
            unitSold: '221',
            order: '210',
            numView: '31,900',
            coinRate: '2.11',
            dollarAVO: '32.80',
            dollarRPV: '10.90',
            status: 'status-organce'
        }, {
            srcImg: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRI5hwT454_ibBEE1HoYkSvJfRI2PS8jQ07-a9EJegFistqkSer',
            title: 'Leica',
            dollars: '15,560.50',
            unitSold: '321',
            order: '350',
            numView: '68,500',
            coinRate: '5.88',
            dollarAVO: '40.70',
            dollarRPV: '20.10',
            status: 'status-green'
        }
        // {
        //     srcImg: 'xxx',
        //     title: 'xxx',
        //     dollars: 'xxx',
        //     unitSold: 'xxx',
        //     order: 'xxx',
        //     numView: 'xxx',
        //     coinRate: 'xxx',
        //     dollarAVO: 'xxx',
        //     dollarRPV: 'xxx',
        //     status: 'xxx'
        // }
        ];

        $scope.dataProductTrafficeDetails = dataProductTrafficeDetails;

        $scope.chartConfig = {
            'options': {
                'chart': {
                    'type': 'areaspline'
                },
                'xAxis': {
                    'categories': [],
                    'title': {
                        'text': null
                    },

                    'labels': {
                        'enabled': false
                    },
                    'minorTickLength': 0,
                    'tickLength': 0,
                    'tickWidth': 0,
                    'minPadding': 0,
                    'maxPadding': 0,
                    'pointPadding': 0,
                    'groupPadding': 0,
                    'lineColor': '',
                    'lineWidth': ''
                },
                'yAxis': {
                    'categories': [],
                    'title': {
                        'text': null
                    },
                    'labels': {
                        'enabled': false
                    },
                    'minorTickLength': 0,
                    'tickLength': 0,
                    'gridLineColor': 'transparent',
                    'tickWidth': 0,
                    'minPadding': 0,
                    'maxPadding': 0,
                    'pointPadding': 0,
                    'groupPadding': 0,
                    'lineColor': '',
                    'lineWidth': ''
                },
                'pane': {},
                'tooltip': {},
                'plotOptions': {
                    'series': {
                        'stacking': '',
                        'marker': {
                            'enabled': false
                        }
                    },
                    'pie': {
                        'size': 500
                    }
                },
                'exporting': {
                    'enabled': false
                }
            },
            'series': [{
                'showInLegend': false,
                'data': [],
                'color': '',
                'name': ''

            }, {
                'showInLegend': false,
                'data': [],
                'color': '',
                'name': ''
            }],
            'title': {
                'text': ''
            },
            'credits': {
                'enabled': false
            },
            'loading': false,
            'size': {
                'height': 130
            },
            'tooltip': {},
            'useHighStocks': false,
            func: function func(chart) {}
        };

        // Traffic Source chart
        $scope.trafficSource = angular.copy($scope.chartConfig);
        $scope.trafficSource.options.chart.type = 'area';
        $scope.trafficSource.options.xAxis = {
            allowDecimals: false,
            title: {
                text: null
            },
            labels: {
                enabled: false,
                formatter: function formatter() {
                    return this.value; // clean, unformatted number for year
                }
            }
        };
        $scope.trafficSource.options.yAxis = {
            title: {
                text: null
            },
            labels: {
                formatter: function formatter() {
                    return this.value / 1000 + 'k';
                }
            }
        };
        $scope.trafficSource.options.tooltip = {
            pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
        };
        $scope.trafficSource.options.plotOptions = {
            area: {
                pointStart: 1940,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        };
        $scope.trafficSource.series = [{
            name: 'Top Revenue',
            data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605, 24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
        }, {
            name: 'Top Converation Rate',
            data: [null, null, null, null, null, null, null, null, null, null, 5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000, 21000, 20000, 19000, 18000, 18000, 17000, 16000]
        }];
        $scope.trafficSource.size.height = 400;

        // Traffic Rate Chart
        $scope.trafficRateChart = angular.copy($scope.chartConfig);
        $scope.trafficRateChart.options.chart.type = 'pie';
        $scope.trafficRateChart.tooltip = {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        };
        $scope.trafficRateChart.options.plotOptions = {
            pie: {
                dataLabels: {
                    enabled: false,
                    distance: 0,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: 0,
                endAngle: 360,
                center: ['50%', '50%'],
                showInLegend: true
            }
        };
        $scope.trafficRateChart.options.legend = {
            labelFormatter: function labelFormatter() {
                var total = 0;
                var percentage;
                var data = this.series.data;
                for (var key in data) {
                    if (data[key]) {
                        total += data[key].y;
                    }
                }
                percentage = (this.y / total * 100).toFixed(2);
                return this.name + ' ' + this.y + '<br/>' + percentage + '%' + '<br/><span style="color:#B0B0B0;">______________________</span>';
            },
            align: 'right',
            verticalAlign: 'middle',
            layout: 'horizontal',
            symbolRadius: 100,
            symbolPadding: 5,
            itemMarginBottom: 10,
            itemDistance: 10,
            width: 300,
            height: 250,
            itemWidth: 130,
            itemStyle: {
                fontWeight: 100
            },
            symbolWidth: 14,
            symbolHeight: 14,
            y: 60
        };
        $scope.trafficRateChart.series = [{
            innerSize: '50%',
            data: [['<strong>ROLEX</strong> USD ', 1396], ['<strong>VANS</strong> USD ', 501], ['<strong>INCASE</strong> USD ', 465], ['<strong>GUCCI</strong> USD ', 430], ['<strong>LV</strong> USD ', 215], ['<strong>INCASE</strong> USD ', 573]]
        }];
        $scope.trafficRateChart.size.height = 299;
    }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('panelApp').controller('funnelCtrl', ['$scope', function ($scope) {

    var dataProductFunnelDetails = [{
      srcImg: 'https://www.ccep.com/system/image_block/2941/Coca-Cola.jpg',
      title: 'Coca Cola',
      dollars: '23,197.20',
      numVist: '58,910',
      numView: '471',
      numCart: '5.10',
      purchase: '65.90',
      status: 'status-green'
    }, {
      srcImg: 'http://theshoegame.com/wp-content/uploads/2015/01/nike-logo-copy.jpg',
      title: 'Nike',
      dollars: '11,203.20',
      numVist: '42,892',
      numView: '432',
      numCart: '3.25',
      purchase: '34.10',
      status: 'status-green'
    }, {
      srcImg: 'http://www.kowalskis.com/sites/kowalskis.com/files/images/departments/starbucks-logo-trans.png',
      title: 'Starbucks',
      dollars: '4,289.90',
      numVist: '8,991',
      numView: '211',
      numCart: '1.11',
      purchase: '18.30',
      status: 'status-organce'
    }, {
      srcImg: 'http://vector.me/files/images/7/3/73419/nikon.png',
      title: 'Nikon',
      dollars: '9,190.30',
      numVist: '13,991',
      numView: '99',
      numCart: '1.98',
      purchase: '43.10',
      status: 'status-gray'
    }, {
      srcImg: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQRlV2lijfvgaPUFrfCrp0l4lxiT_dYcj_6El3HGaS50i_yz1EFEg',
      title: 'LG',
      dollars: '12,890.20',
      numVist: '31,900',
      numView: '210',
      numCart: '2.11',
      purchase: '32.80',
      status: 'status-organce'
    }, {
      srcImg: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRI5hwT454_ibBEE1HoYkSvJfRI2PS8jQ07-a9EJegFistqkSer',
      title: 'Leica',
      dollars: '15,560.50',
      numVist: '68,500',
      numView: '350',
      numCart: '5.88',
      purchase: '40.70',
      status: 'status-green'
    }];

    $scope.dataProductFunnelDetails = dataProductFunnelDetails;

    $scope.chartConfig = {
      'options': {
        'chart': {
          'type': 'areaspline'
        },
        'xAxis': {
          'categories': [],
          'title': {
            'text': null
          },

          'labels': {
            'enabled': false
          },
          'minorTickLength': 0,
          'tickLength': 0,
          'tickWidth': 0,
          'minPadding': 0,
          'maxPadding': 0,
          'pointPadding': 0,
          'groupPadding': 0,
          'lineColor': '',
          'lineWidth': ''
        },
        'yAxis': {
          'categories': [],
          'title': {
            'text': null
          },
          'labels': {
            'enabled': false
          },
          'minorTickLength': 0,
          'tickLength': 0,
          'gridLineColor': 'transparent',
          'tickWidth': 0,
          'minPadding': 0,
          'maxPadding': 0,
          'pointPadding': 0,
          'groupPadding': 0,
          'lineColor': '',
          'lineWidth': ''
        },
        'pane': {},
        'tooltip': {},
        'plotOptions': {
          'series': {
            'stacking': '',
            'marker': {
              'enabled': false
            }
          },
          'pie': {
            'size': 500
          }
        },
        'exporting': {
          'enabled': false
        }
      },
      'series': [{
        'showInLegend': false,
        'data': [],
        'color': '',
        'name': ''

      }, {
        'showInLegend': false,
        'data': [],
        'color': '',
        'name': ''
      }],
      'title': {
        'text': ''
      },
      'credits': {
        'enabled': false
      },
      'loading': false,
      'size': {
        'height': 130
      },
      'tooltip': {},
      'useHighStocks': false,
      func: function func(chart) {}
    };

    $scope.chartConfig2 = angular.copy($scope.chartConfig);
    $scope.chartConfig2.series[0].color = '#62d194';
    $scope.chartConfig2.series[0].data = [5, 20, 15, 2, 7, 10, 4, 11, 15, 10, 21];
    $scope.chartConfigGender = angular.copy($scope.chartConfig);

    //chart gender
    $scope.chartConfigGender.options.chart.type = 'bar';
    $scope.chartConfigGender.options.xAxis.categories = ['24:00', '18:00', '12:00', '06:00', '00:00'];
    $scope.chartConfigGender.options.xAxis.labels.enabled = true;
    $scope.chartConfigGender.options.xAxis.lineWidth = 1;
    $scope.chartConfigGender.options.xAxis.lineColor = '#E6EAEE';
    $scope.chartConfigGender.options.plotOptions.series.pointWidth = 18;
    $scope.chartConfigGender.options.yAxis = {
      'title': {
        'text': null
      },
      'labels': {
        'enabled': true
      },
      'lineColor': '#E6EAEE',
      'lineWidth': 1,
      'min': 0,
      'minRange': 100000,
      'max': 100000,
      'minPadding': 100000,
      'gridLineWidth': 0

    };
    $scope.chartConfigGender.series = [{
      name: 'female',
      showInLegend: false,
      data: [20000, 20000, 30000, 20000, 10000],
      color: '#FFBC00'
    }, {
      name: 'male',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 20000],
      color: '#2DA1F8'
    }];
    $scope.chartConfigGender.options.plotOptions.series.stacking = 'normal';
    $scope.chartConfigGender.size.height = 250;

    // Age Timeline
    $scope.chartConfigAgeTimeline = angular.copy($scope.chartConfig);
    $scope.chartConfigAgeTimeline.options.chart.type = 'column';
    $scope.chartConfigAgeTimeline.options.xAxis.categories = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00'];
    $scope.chartConfigAgeTimeline.options.xAxis.labels.enabled = true;
    $scope.chartConfigAgeTimeline.size.height = 250;
    $scope.chartConfigAgeTimeline.options.yAxis.lineWidth = 1;
    $scope.chartConfigAgeTimeline.options.yAxis.lineColor = '#E6EAEE';
    $scope.chartConfigAgeTimeline.options.plotOptions.series.stacking = 'normal';
    $scope.chartConfigAgeTimeline.options.plotOptions.series.pointWidth = 18;
    $scope.chartConfigAgeTimeline.options.xAxis.lineWidth = 1;
    $scope.chartConfigAgeTimeline.options.xAxis.lineColor = '#E6EAEE';
    $scope.chartConfigAgeTimeline.options.yAxis = {
      'title': {
        'text': null
      },
      'labels': {
        'enabled': true
      },
      'lineColor': '#E6EAEE',
      'lineWidth': 1,
      'min': 0,
      'minRange': 100000,
      'max': 100000,
      'minPadding': 100000,
      'gridLineWidth': 0

    };
    $scope.chartConfigAgeTimeline.series = [{
      name: '65+',
      showInLegend: false,
      data: [20000, 20000, 30000, 20000, 10000, 10000],
      color: '#8567E6'
    }, {
      name: '55-64',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 20000, 10000],
      color: '#40557D'
    }, {
      name: '45-54',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 20000, 10000],
      color: '#289DF5'
    }, {
      name: '35-44',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 20000, 10000],
      color: '#39BF23'
    }, {
      name: '25-34',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 20000, 10000],
      color: '#FFD400'
    }, {
      name: '0-24',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 20000, 10000],
      color: '#F0B499'
    }];

    // Customers
    $scope.chartconfigCustomer = angular.copy($scope.chartConfig);
    $scope.chartconfigCustomer.options.chart.type = 'pie';
    $scope.chartconfigCustomer.options.plotOptions.pie.size = 140;
    $scope.chartconfigCustomer.options.plotOptions.pie.colors = ['#289DF5', '#40557D', '#FFD400'];
    $scope.chartconfigCustomer.size.height = 150;
    $scope.chartconfigCustomer.series = [{
      name: 'Customers',
      data: [['Returning', 6], ['New', 4], ['Referrals', 7]],
      innerSize: '70%',
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }];

    // product spending
    $scope.chartconfigProductSpending = angular.copy($scope.chartConfig);
    $scope.chartconfigProductSpending.options.chart.type = 'pie';
    $scope.chartconfigProductSpending.options.plotOptions.pie.size = 150;
    $scope.chartconfigProductSpending.options.plotOptions.pie.colors = ['#40557D', '#3373B3', '#F0B499', '#72C4B9', '#FFD60D', '#1AA6D6'];
    $scope.chartconfigProductSpending.size.height = 200;
    $scope.chartconfigProductSpending.series = [{
      name: 'Product',
      data: [['Nike', 6], ['Nike', 4], ['Nike', 7], ['Nike', 6], ['Nike', 6], ['Nike', 6]],
      innerSize: '70%',
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }];

    // age
    $scope.chartconfigAge = angular.copy($scope.chartConfig);
    $scope.chartconfigAge.options.chart.type = 'pie';
    $scope.chartconfigAge.options.plotOptions.pie.size = 150;
    $scope.chartconfigAge.options.plotOptions.pie.colors = ['#F0B499', '#FFD400', '#39BF23', '#289DF5', '#40557D', '#8567E6'];
    $scope.chartconfigAge.size.height = 180;
    $scope.chartconfigAge.series = [{
      name: 'Product',
      data: [['0-24', 6], ['25-34', 4], ['35-44', 7], ['45-54', 6], ['55-64', 6], ['65+', 6]],
      innerSize: '70%',
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }];

    // Daily Sale
    $scope.chartconfigDailySale = angular.copy($scope.chartConfig);
    $scope.chartconfigDailySale.options.chart.type = 'column';
    $scope.chartconfigDailySale.options.plotOptions.series.pointWidth = 8;
    $scope.chartconfigDailySale.size.height = 150;
    $scope.chartconfigDailySale.series = [{
      name: 'Thang 1',
      showInLegend: false,
      data: [20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000, 20000, 20000, 30000, 20000, 10000, 10000],
      color: '#1A91EB'
    }];

    // Hour
    $scope.chartconfigHour = angular.copy($scope.chartConfig);
    $scope.chartconfigHour.options.chart.type = 'area';
    $scope.chartconfigHour.options.xAxis = {
      'categories': ['Jan', 'Feb', 'March', 'April', 'May'],
      'title': {
        'text': null
      },
      'labels': {
        'enabled': true
      },
      'lineColor': '#E6EAEE',
      'lineWidth': 1,
      'gridLineWidth': 0

    };
    $scope.chartconfigHour.series = [{
      name: '',
      showInLegend: false,
      data: [20000, 20000, 30000, 20000, 10000],
      color: '#1A91EB'
    }];

    //Genre
    $scope.chartconfigGenres = angular.copy($scope.chartConfig);
    $scope.chartconfigGenres.options.chart.type = 'column';
    $scope.chartconfigGenres.size.height = 150;
    $scope.chartconfigGenres.options.xAxis = {
      'categories': ['21/9', '22/9', '23/9', '24/9', '25/9', '26/9', '27/9'],
      'title': {
        'text': null
      },
      'labels': {
        'enabled': true
      },
      'lineColor': '#E6EAEE',
      'lineWidth': 1,
      'gridLineWidth': 0

    };
    $scope.chartconfigGenres.series = [{
      name: 'Male',
      showInLegend: false,
      data: [20000, 20000, 30000, 20000, 10000, 10000, 10000],
      color: '#337BBF'
    }, {
      name: 'Female',
      showInLegend: false,
      data: [20000, 20000, 30000, 20000, 10000, 10000, 10000],
      color: '#2297F0'
    }];
    $scope.chartconfigGenres.options.yAxis = {
      'title': {
        'text': null
      },
      'labels': {
        'enabled': true
      },
      'lineColor': '#E6EAEE',
      'lineWidth': 1,
      'min': 0,
      'minRange': 100,
      'max': 3000,
      'minPadding': 1,
      'gridLineWidth': 0

    };

    //Community Type
    $scope.chartconfigCommunity = angular.copy($scope.chartConfig);
    $scope.chartconfigCommunity.options.chart.type = 'solidgauge';
    $scope.chartconfigCommunity.size.height = 250;
    $scope.chartconfigCommunity.options.tooltip = {
      'borderWidth': 0,
      'backgroundColor': 'none',
      'shadow': false,
      'style': {
        'fontSize': '16px'
      },
      'pointFormat': '{series.name}<br><span style=\'font-size:2em; color: {point.color}; font-weight: bold\'>{point.y}%</span>',
      'useHTML': true,
      positioner: function positioner(labelWidth, labelHeight) {
        return {
          x: 104 - labelWidth / 2,
          y: 104
        };
      }
    };
    Highcharts.getOptions().colors = ['#1F96EF', '#8668E6', '#FAC83F'];
    $scope.chartconfigCommunity.options.pane = {
      startAngle: 0,
      endAngle: 360,
      background: [{ // Track for Move
        outerRadius: '109%',
        innerRadius: '91%',
        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.2).get(),
        borderWidth: 0
      }, { // Track for Exercise
        outerRadius: '66%',
        innerRadius: '85%',
        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.2).get(),
        borderWidth: 0
      }, { // Track for Stand
        outerRadius: '40%',
        innerRadius: '59%',
        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.2).get(),
        borderWidth: 0
      }]
    };
    $scope.chartconfigCommunity.options.yAxis = {
      'min': 0,
      'max': 100,
      'lineWidth': 0,
      'tickPositions': []
    };
    $scope.chartconfigCommunity.options.plotOptions = {
      solidgauge: {
        borderWidth: '18px',
        dataLabels: {
          y: 0,
          borderWidth: 0,
          useHTML: true,
          enabled: false
        },
        linecap: 'round',
        stickyTracking: false,
        innerRadius: '0%'
      },
      series: {
        pointWidth: 0
      }
    };
    $scope.chartconfigCommunity.series = [{
      name: 'Urban',
      borderColor: '#1F96EF',
      data: [{
        color: Highcharts.getOptions().colors[0],
        radius: '100%',
        innerRadius: '100%',
        y: 50
      }]
    }, {
      name: 'Suburban',
      borderColor: Highcharts.getOptions().colors[1],
      data: [{
        color: Highcharts.getOptions().colors[1],
        radius: '75%',
        innerRadius: '75%',
        y: 35
      }]
    }, {
      name: 'Rural',
      borderColor: Highcharts.getOptions().colors[2],
      data: [{
        color: Highcharts.getOptions().colors[2],
        radius: '50%',
        innerRadius: '50%',
        y: 15
      }]
    }];
    // Platform
    $scope.chartconfigPlatform = angular.copy($scope.chartConfig);
    $scope.chartconfigPlatform.options.chart.type = 'pie';
    $scope.chartconfigPlatform.options.plotOptions.pie.size = 200;
    $scope.chartconfigPlatform.options.plotOptions.pie.colors = ['#289DF5', '#F9C943'];
    $scope.chartconfigPlatform.size.height = 250;
    $scope.chartconfigPlatform.series = [{
      name: '',
      data: [['IOS', 6], ['Android', 4]],
      innerSize: '70%',
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }];
    $scope.chartconfigPlatform.options.tooltip = {
      'borderWidth': 0,
      'backgroundColor': 'none',
      'shadow': false,
      'style': {
        'fontSize': '20px'
      },
      'pointFormat': '<span style=\'font-size:2em; color: {point.color}; font-weight: bold;\'>{point.y}%</span>',
      'useHTML': true,
      positioner: function positioner(labelWidth, labelHeight) {
        return {
          x: 100 - labelWidth / 2,
          y: 80
        };
      }
    };

    //campaignDown
    $scope.campaignDown = angular.copy($scope.chartConfig);
    $scope.campaignDown.options.chart.margin = 0;
    $scope.campaignDown.options.chart.padding = 0;
    $scope.campaignDown.options.xAxis = {
      'categories': [],
      'title': {
        'text': null
      },
      'lineWidth': 0,
      'lineColor': 'transparent',
      'labels': {
        'enabled': false
      },
      'minorTickLength': 0,
      'tickLength': 0,
      'tickWidth': 0,
      'minPadding': 0,
      'maxPadding': 0,
      'pointPadding': 0,
      'groupPadding': 0
    };
    $scope.campaignDown.options.yAxis = {
      'lineWidth': 0,
      'lineColor': 'transparent',
      'labels': {
        'enabled': false
      },
      'minorTickLength': 0,
      'tickLength': 0,
      'gridLineColor': 'transparent',
      'tickWidth': 0,
      'minPadding': 0,
      'maxPadding': 0,
      'pointPadding': 0,
      'groupPadding': 0
    };

    $scope.campaignUp = angular.copy($scope.campaignDown);
    $scope.campaignUp.series[0].color = '#62d194';
    $scope.campaignUp.series[0].data = [5, 20, 15, 2, 7, 10, 4, 11, 15, 10, 21];

    // Age Timeline
    $scope.chartNetIncome = angular.copy($scope.chartConfig);
    $scope.chartNetIncome.options.chart.type = 'column';
    $scope.chartNetIncome.options.xAxis.categories = ['21/9/2016', '22/9/2016', '23/9/2016', '24/9/2016', '25/9/2016', '26/9/2016', '27/9/2016'];
    $scope.chartNetIncome.options.xAxis.labels.enabled = true;
    $scope.chartNetIncome.size.height = 250;
    $scope.chartNetIncome.options.yAxis.lineWidth = 1;
    $scope.chartNetIncome.options.yAxis.lineColor = '#E6EAEE';
    $scope.chartNetIncome.options.plotOptions.series.stacking = 'normal';
    $scope.chartNetIncome.options.plotOptions.series.pointWidth = 40;
    $scope.chartNetIncome.options.plotOptions.series.borderRadius = 3;
    $scope.chartNetIncome.options.xAxis.lineWidth = 1;
    $scope.chartNetIncome.options.xAxis.lineColor = '#E6EAEE';
    $scope.chartNetIncome.options.yAxis = {
      'title': {
        'text': null
      },
      'labels': {
        'enabled': true
      },
      'lineColor': '#E6EAEE',
      'lineWidth': 1,
      'min': -200000,
      'minRange': -200000,
      'max': 200000,
      'minPadding': 100000,
      'gridLineWidth': 1

    };
    $scope.chartNetIncome.series = [{
      name: '65+',
      showInLegend: false,
      data: [20000, 40000, 30000, 40000, 30000, 20000],
      color: '#51B4FF'
    }, {
      name: '55-64',
      showInLegend: false,
      data: [53000, 34000, 40000, 70000, 80000, 10000],
      color: '#337BBF'
    }, {
      name: '45-54',
      showInLegend: false,
      data: [-53000, -34000, -40000, -70000, -50000, -30000],
      color: '#E2E7EE'
    }];

    // Age Timeline
    $scope.chartconfigHouseholdIncome = angular.copy($scope.chartConfig);
    $scope.chartconfigHouseholdIncome.options.chart.polar = true;
    $scope.chartconfigHouseholdIncome.options.pane.size = '80%';
    $scope.chartconfigHouseholdIncome.options.xAxis.categories = ['0-10K 15%', '20-30K 15%', '30-40K 17%', '40-50K 17%', '50-60K 45%', '60-70K', '70-80K 45%', '80K+ 45%'];
    $scope.chartconfigHouseholdIncome.options.xAxis.labels.enabled = true;
    $scope.chartconfigHouseholdIncome.size.height = 250;
    $scope.chartconfigHouseholdIncome.options.yAxis.lineWidth = 1;
    $scope.chartconfigHouseholdIncome.options.yAxis.lineColor = '#E6EAEE';
    $scope.chartconfigHouseholdIncome.options.plotOptions.series.stacking = 'normal';
    $scope.chartconfigHouseholdIncome.options.plotOptions.series.pointWidth = 40;
    $scope.chartconfigHouseholdIncome.options.plotOptions.series.borderRadius = 3;
    $scope.chartconfigHouseholdIncome.options.plotOptions.series.marker.enabled = true;
    $scope.chartconfigHouseholdIncome.options.xAxis.lineWidth = 1;
    $scope.chartconfigHouseholdIncome.options.xAxis.lineColor = '#E6EAEE';
    $scope.chartconfigHouseholdIncome.series = [{
      showInLegend: false,
      type: 'area',
      data: [10000, 80000, 20000, 70000, 30000, 60000, 40000, 50000]
    }];
  }]);
})();
'use strict';

(function (_) {
    'use strict';

    angular.module('panelApp').controller('scans', ['$scope', 'scansService', function ($scope, scansService) {
        var service = scansService;
        var WEEK = 'week';
        var MONTH = 'month';

        var BY_AGE = 'byAge';
        var BY_DEVICE_OS = 'byDeviceOS';
        var BY_COUNTRY = 'byCountry';
        var BY_GENDER = 'byGender';
        var TRIGGER_ACTION = 'triggerAction';
        var TOP_CAMPAIGN_BY_SPEND = 'topCampaignBySpend';
        var ACTIVE_USER_HOURS = 'activeUserByHours';
        var ACTIVE_USER_BY_DAY = 'activeUserByDay';
        var TOP_CAMPAIGN_BY_TRIGGER = 'topCampaignByTrigger';
        var ACTIVE_CAMPAIGN_IN_PERIOD = 'activeCampaignInPeriod';
        var SCAN_IN_PERIOD = 'scanInPeriod';

        var period = WEEK;

        $scope.chartConfig = {
            'options': {
                'chart': {
                    'type': 'areaspline'
                },
                'xAxis': {
                    'categories': [],
                    'title': {
                        'text': null
                    },

                    'labels': {
                        'enabled': false
                    },
                    'minorTickLength': 0,
                    'tickLength': 0,
                    'tickWidth': 0,
                    'minPadding': 0,
                    'maxPadding': 0,
                    'pointPadding': 0,
                    'groupPadding': 0,
                    'lineColor': '',
                    'lineWidth': ''
                },
                'yAxis': {
                    'categories': [],
                    'title': {
                        'text': null
                    },
                    'labels': {
                        'enabled': false
                    },
                    'minorTickLength': 0,
                    'tickLength': 0,
                    'gridLineColor': 'transparent',
                    'tickWidth': 0,
                    'minPadding': 0,
                    'maxPadding': 0,
                    'pointPadding': 0,
                    'groupPadding': 0,
                    'lineColor': '',
                    'lineWidth': ''
                },
                'pane': {},
                'tooltip': {},
                'plotOptions': {
                    'series': {
                        'stacking': '',
                        'marker': {
                            'enabled': false
                        }
                    },
                    'pie': {
                        'size': 500
                    }
                },
                'exporting': {
                    'enabled': false
                }
            },
            'series': [{
                'showInLegend': false,
                'data': [],
                'color': '',
                'name': ''

            }, {
                'showInLegend': false,
                'data': [],
                'color': '',
                'name': ''
            }],
            'title': {
                'text': ''
            },
            'credits': {
                'enabled': false
            },
            'loading': false,
            'size': {
                'height': 130
            },
            'tooltip': {},
            'useHighStocks': false,
            func: function func(chart) {}
        };

        // ScanThisWeek
        var increaseColor = '#0fbd66';
        var decreaseColor = '#E6315E';
        $scope.$watch('analytic.filter', function (newVal, oldVal) {
            init();
        });

        // ActiveTriggers
        $scope.chartconfigActiveTriggers = angular.copy($scope.chartConfig);
        $scope.chartconfigActiveTriggers.options.chart.type = 'line';
        $scope.chartconfigActiveTriggers.size.height = 50;
        $scope.chartconfigActiveTriggers.options.xAxis = {
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            lineColor: '#FFFFFF',
            lineWidth: 1,
            gridLineWidth: 0,
            tickColor: '#FFFFFF',
            tickWidth: 0
        };
        $scope.chartconfigActiveTriggers.series = [{
            name: '',
            showInLegend: false,
            data: [2, 2, 3, 2, 1, 4, 5, 7, 1, 5, 4],
            color: decreaseColor
        }];

        // // topCamapaign
        // service.getDataOf(TOP_CAMPAIGN_BY_SPEND, period).then((response) => {
        //
        //     let topCampaigns = response.reduce((data, element) => {
        //         data.push({
        //             title:      element.campaign_name,
        //             percent:    element.percentage
        //         });
        //         return data;
        //     }, []);
        //     $scope.topCampaigns = topCampaigns;
        // });
        // var topCampaigns = [{
        //     title: 'RayBan Glasses RB7056',
        //     percent: '70',
        //     no_searches: '4',
        //     start_date: '2016-12-01',
        //     end_date: '2016-12-07',
        //     // nowDateLive:    '7'
        // }, {
        //     title: 'Drake - Hotline Bling.Mp4',
        //     percent: '50',
        //     no_searches: '2',
        //     start_date: '2016-12-01',
        //     end_date: '2016-12-07',
        //     // nowDateLive:    '7'
        // }, {
        //     title: '3 Hpbd Minion.Mp4',
        //     percent: '25',
        //     no_searches: '1',
        //     start_date: '2016-12-01',
        //     end_date: '2016-12-07',
        //     // nowDateLive:    '7'
        // }, {
        //     title: 'RayBan Glasses RB7056',
        //     percent: '10',
        //     no_searches: '3',
        //     start_date: '2016-12-01',
        //     end_date: '2016-12-07',
        //     // nowDateLive:    '7'
        // }];
        // $scope.topCampaigns = topCampaigns;

        // // topWorstCampaign
        // var topWorstCampaigns = [{
        //     title: 'RayBan Glasses RB7056',
        //     percent: '12',
        //     no_searches: '4',
        //     start_date: '2016-12-01',
        //     end_date: '2016-12-07',
        //     // nowDateLive:    '7'
        // }, {
        //     title: 'Drake - Hotline Bling.Mp4',
        //     percent: '23',
        //     no_searches: '2',
        //     start_date: '2016-12-01',
        //     end_date: '2016-12-07',
        //     // nowDateLive:    '7'
        // }, {
        //     title: '3 Hpbd Minion.Mp4',
        //     percent: '26',
        //     no_searches: '1',
        //     start_date: '2016-12-01',
        //     end_date: '2016-12-07',
        //     // nowDateLive:    '7'
        // }, {
        //     title: 'RayBan Glasses RB7056',
        //     percent: '36',
        //     no_searches: '3',
        //     start_date: '2016-12-01',
        //     end_date: '2016-12-07',
        //     // nowDateLive:    '7'
        // }];
        // $scope.topWorstCampaigns = topWorstCampaigns;

        // Begin: Function Zone //
        function init() {
            switch ($scope.analytic.filter) {
                case 'Last 7 days':
                    period = WEEK;
                    break;
                case 'Last month':
                    period = MONTH;
                    break;
                default:
                    break;
            }
            service.getDataOf(SCAN_IN_PERIOD, period).then(function (response) {
                $scope.chartconfigScanThisWeek = angular.copy($scope.chartConfig);
                $scope.chartconfigScanThisWeek.options.chart.type = 'line';
                $scope.chartconfigScanThisWeek.size.height = 50;
                $scope.chartconfigScanThisWeek.options.xAxis = {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    lineColor: '#FFFFFF',
                    lineWidth: 1,
                    gridLineWidth: 0,
                    tickColor: '#FFFFFF',
                    tickWidth: 0
                };
                $scope.scanThisWeek = {};
                $scope.scanThisWeek.data = response.by_days.map(function (element) {
                    return element.amount;
                });
                response.percentage ? $scope.scanThisWeek.percentage = response.percentage.toFixed(2) : $scope.scanThisWeek.percentage = 100;
                $scope.scanThisWeek.total = response.total;

                $scope.chartconfigScanThisWeek.series = [{
                    name: '',
                    showInLegend: false,
                    data: $scope.scanThisWeek.data,
                    color: $scope.scanThisWeek.percentage > 0 ? increaseColor : decreaseColor
                }];
                $scope.view.busy = false;
            }, function (error) {
                console.error(error);
                $scope.view.busy = false;
            });

            service.getDataOf(ACTIVE_USER_BY_DAY, period).then(function (response) {
                // ActiveUser
                $scope.chartconfigActiveUser = angular.copy($scope.chartConfig);
                $scope.chartconfigActiveUser.options.chart.type = 'line';
                $scope.chartconfigActiveUser.size.height = 50;
                $scope.chartconfigActiveUser.options.xAxis = {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    lineColor: '#FFFFFF',
                    lineWidth: 1,
                    gridLineWidth: 0,
                    tickColor: '#FFFFFF',
                    tickWidth: 0
                };
                $scope.activeUser = {};
                $scope.activeUser.data = response.by_days.map(function (element) {
                    return element.amount;
                });
                response.percentage ? $scope.activeUser.percentage = response.percentage.toFixed(2) : $scope.activeUser.percentage = 100;
                $scope.activeUser.total = response.total;
                $scope.chartconfigActiveUser.series = [{
                    name: '',
                    showInLegend: false,
                    data: $scope.activeUser.data,
                    color: $scope.activeUser.percentage > 0 ? increaseColor : decreaseColor
                }];
            });

            service.getDataOf(ACTIVE_CAMPAIGN_IN_PERIOD, period).then(function (response) {
                // ActiveCampaigns
                $scope.chartconfigActiveCampaigns = angular.copy($scope.chartConfig);
                $scope.chartconfigActiveCampaigns.options.chart.type = 'line';
                $scope.chartconfigActiveCampaigns.size.height = 50;
                $scope.chartconfigActiveCampaigns.options.xAxis = {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    lineColor: '#FFFFFF',
                    lineWidth: 1,
                    gridLineWidth: 0,
                    tickColor: '#FFFFFF',
                    tickWidth: 0
                };
                $scope.activeCampaignInPeriod = {};
                $scope.activeCampaignInPeriod.data = response.by_days.map(function (element) {
                    return element.amount;
                });
                response.percentage ? $scope.activeCampaignInPeriod.percentage = response.percentage.toFixed(2) : $scope.activeCampaignInPeriod.percentage = 100;
                $scope.activeCampaignInPeriod.total = response.total;
                $scope.chartconfigActiveCampaigns.series = [{
                    name: '',
                    showInLegend: false,
                    data: $scope.activeCampaignInPeriod.data,
                    color: $scope.activeCampaignInPeriod.percentage > 0 ? increaseColor : decreaseColor
                }];
            });

            service.getDataOf(BY_AGE, period).then(function (response) {
                // agePie
                var data = response.reduce(function (data, element) {
                    data.push(['Age: ' + element.age[0] + '-' + element.age[1], element.count]);
                    return data;
                }, []);
                var maxText = _.max(response, function (item) {
                    return item.count;
                }).age;
                maxText = maxText[0] + '-' + maxText[1];
                var agePie = {
                    id: 'agePie',
                    title: {
                        text: 'AGE'
                    },
                    series: [{
                        name: 'Percent',
                        data: data
                    }],
                    credits: {
                        enabled: false
                    },
                    image: '/assets/images/analytics/pieImages/birthday_icon.svg',
                    max: maxText ? maxText : 'None'
                };
                $scope.agePie = agePie;
                // genderPie
                drawPieChart($scope.agePie);
            });

            service.getDataOf(BY_DEVICE_OS, period).then(function (response) {
                // devicePie
                var data = response.reduce(function (data, element) {
                    data.push([element.participant__device_os, element.total]);
                    return data;
                }, []);
                var maxText = _.max(response, 'total').participant__device_os;
                var maxImage = void 0;
                switch (maxText) {
                    case 'iOS':
                        maxImage = '/assets/images/analytics/pieImages/apple_icon.svg';
                        break;
                    case 'Android':
                        maxImage = '/assets/images/analytics/pieImages/android_icon.svg';
                        break;
                    default:
                        maxImage = '/assets/images/analytics/pieImages/apple_icon.svg';
                        break;
                }
                var devicePie = {
                    id: 'devicePie',
                    title: {
                        text: 'DEVICE'
                    },
                    series: [{
                        name: 'Percent',
                        data: data
                    }],
                    credits: {
                        enabled: false
                    },
                    image: maxImage,
                    max: maxText ? maxText : 'None',
                    x: 126
                };
                $scope.devicePie = devicePie;
                drawPieChart($scope.devicePie);
            });

            service.getDataOf(BY_COUNTRY, period).then(function (response) {
                // countryPie
                var data = response.reduce(function (data, element) {
                    data.push([element.participant__country__short_name, element.total]);
                    return data;
                }, []);
                var maxText = _.max(response, 'total').participant__country__short_name;
                var countryPie = {
                    id: 'countryPie',
                    title: {
                        text: 'COUNTRY'
                    },
                    series: [{
                        name: 'Percent',
                        data: data
                    }],
                    credits: {
                        enabled: false
                    },
                    image: '/assets/images/analytics/pieImages/globe_icon.svg',
                    max: maxText ? maxTextCountry(maxText) : 'None'
                };
                $scope.countryPie = countryPie;
                drawPieChart($scope.countryPie);
            });

            // Change sort country for the USA and the UK
            function maxTextCountry(maxText) {
                var country = '';
                switch (maxText) {
                    case 'United Kingdom of Great Britain and Northern Ireland':
                        country = 'The UK';
                        break;
                    case 'United States of America':
                        country = 'The USA';
                        break;
                    default:
                        country = maxText;
                }
                return country;
            }
            // End change sort country for the USA and the UK

            service.getDataOf(BY_GENDER, period).then(function (response) {
                // genderPie
                var data = [['Male', response.male], ['Female', response.female]];
                var maxText = response.male >= response.female ? 'Male' : 'Female';
                var maleImage = '/assets/images/analytics/pieImages/male_icon.svg';
                var femaleImage = '/assets/images/analytics/pieImages/female_icon.svg';
                var maxImage = response.male >= response.female ? maleImage : femaleImage;
                var genderPie = {
                    id: 'genderPie',
                    title: {
                        text: 'GENDER'
                    },
                    series: [{
                        name: 'Percent',
                        data: data
                    }],
                    credits: {
                        enabled: false
                    },
                    image: maxImage,
                    max: maxText ? maxText : 'None'
                };
                $scope.genderPie = genderPie;
                drawPieChart($scope.genderPie);
            });

            service.getDataOf(ACTIVE_USER_HOURS, period).then(function (response) {
                // activeUsersLineChart
                var reverseResponse = response.reverse();
                var yearStart = reverseResponse[0].hour.split('T')[0].split('-')[0];
                var monthStart = reverseResponse[0].hour.split('T')[0].split('-')[1] - 1;
                var dayStart = reverseResponse[0].hour.split('T')[0].split('-')[2];
                var hourStart = reverseResponse[0].hour.split('T')[1].split(':')[0];
                var pointStart = Date.UTC(yearStart, monthStart, dayStart, hourStart);
                var data = reverseResponse.reduce(function (data, element) {
                    data.push(element.amount);
                    return data;
                }, []);
                var activeUsers = {
                    id: 'activeUsersLineChart',
                    name: 'Weekly Users',
                    data: data,
                    pointStart: pointStart,
                    pointInterval: 3600 * 1000
                };
                $scope.activeUsers = activeUsers;
                drawLineChart($scope.activeUsers);
            });

            service.getDataOf(TOP_CAMPAIGN_BY_SPEND, period).then(function (response) {

                var topCampaigns = response.reduce(function (data, element) {
                    data.push({
                        title: element.campaign_name,
                        percent: element.percentage ? element.percentage.toFixed(2) : 0
                    });
                    return data;
                }, []);
                $scope.topCampaigns = topCampaigns;
            });

            service.getDataOf(TOP_CAMPAIGN_BY_SPEND, period).then(function (response) {
                var reverseResponse = response.reverse();
                var topWorstCampaigns = reverseResponse.reduce(function (data, element) {
                    data.push({
                        title: element.campaign_name,
                        percent: element.percentage ? element.percentage.toFixed(2) : 0
                    });
                    return data;
                }, []);
                $scope.topWorstCampaigns = topWorstCampaigns;
            });

            service.getDataOf(TRIGGER_ACTION, period).then(function (response) {
                var triggerAction = response.reduce(function (data, element) {
                    data.push({
                        action: element.action,
                        total: element.total,
                        percentage: element.percentage ? element.percentage.toFixed(2) : 0
                    });
                    return data;
                }, []);
                triggerAction.map(function (action) {
                    switch (action.action) {
                        case 'share':
                            action.icon = 'fa fa-share';
                            break;
                        case 'scan':
                            action.icon = 'fa fa-qrcode';
                            break;
                        case 'buy_product':
                            action.icon = 'fa fa-cubes';
                            break;
                        default:
                    }
                    return action;
                });
                $scope.triggerAction = triggerAction;
            });

            service.getDataOf(TOP_CAMPAIGN_BY_TRIGGER, period).then(function (response) {
                var topTriggers = response.reduce(function (data, element) {
                    data.push({
                        image: element.campaign_header_image,
                        title: element.campaign_name,
                        percent: element.percentage ? element.percentage.toFixed(2) : 0,
                        total: element.total
                    });
                    return data;
                }, []);
                $scope.topTriggers = topTriggers;
            });
        }

        function drawLineChart(chart) {
            var c = chart;
            var lineChart = Highcharts.stockChart(c.id, {
                title: {
                    text: ''
                },
                xAxis: {
                    tickmarkPlacement: 'on',
                    type: 'datetime',
                    tickInterval: 24 * 3600 * 1000
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    opposite: false
                },
                rangeSelector: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                rangeSelectorZoom: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                series: [{
                    name: c.name,
                    data: c.data,
                    pointStart: c.pointStart,
                    pointInterval: c.pointInterval
                }],
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: true
                }
            });
        }

        function drawPieChart(chart) {
            var c = chart;
            var pieChart = Highcharts.chart(c.id, {
                chart: {
                    marginTop: -90,
                    height: 200
                },
                title: {
                    text: c.title.text, //'Browser<br>shares<br>2015',
                    align: 'center', //'center',
                    verticalAlign: 'bottom', //'bottom',
                    y: -5 //40
                },
                subtitle: {
                    text: '<div class="box-icon-pie" style="width:25%;"><img src="' + kachingAppConfig.wpTemplateUri + c.image + '" /></div><div class="box-num-pie align-center">' + c.max + '</div>',
                    align: 'center',
                    verticalAlign: 'middle',
                    useHTML: true,
                    y: -30
                },
                tooltip: {
                    // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                    useHTML: true,
                    formatter: function formatter() {
                        return '<div>' + this.point.name + ' : ' + this.point.percentage.toFixed(2) + '%' + '</div>';
                    }
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false, //true,
                            distance: -50, //-50,
                            style: {
                                fontWeight: 'bold', //'bold',
                                color: 'white'
                            }
                        },
                        startAngle: 0, //0,
                        endAngle: 360, //360,
                        center: ['50%', '65%'],
                        showInLegend: true,
                        size: '50%'
                    }
                },
                legend: {
                    enabled: false
                    //     align: 'right',
                    //     verticalAlign: 'middle',
                    //     layout: 'vertical',
                    //     symbolRadius: 100,
                    //     symbolPadding: 5,
                    //     itemMarginBottom: 10,
                    //     itemStyle: {
                    //         fontWeight: 100
                    //     },
                    //     symbolWidth: 16,
                    //     symbolHeight: 16,
                    //     y: 50
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    type: 'pie',
                    name: c.series[0].name, //'Browser share',
                    innerSize: '70%',
                    data: c.series[0].data
                }],
                credits: {
                    enabled: false
                }
            });
        }

        init();
    }]);
})(_);
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('sales', ['$scope', 'salesService', function ($scope, salesService) {

        var service = salesService;
        var WEEK = 'week';
        var MONTH = 'month';

        var BY_AGE = 'saleByAge';
        var BY_DEVICE_OS = 'saleByDeviceOS';
        var BY_COUNTRY = 'saleByCountry';
        var BY_GENDER = 'saleByGender';

        var REVENUE_IN_PERIOD = 'revenueInPeriod';
        var AVG_PER_TRANS_IN_PERIOD = 'avgPerTransInPeriod';
        var TRANSACTION_IN_PERIOD = 'transactionInPeriod';

        // const ACTIVE_USER_BY_DAY = 'activeUserByDay';
        // const TOP_CAMPAIGN_BY_TRIGGER = 'topCampaignByTrigger';
        // const ACTIVE_CAMPAIGN_IN_PERIOD = 'activeCampaignInPeriod';
        // const SCAN_IN_PERIOD = 'scanInPeriod';

        var period = WEEK;

        $scope.chartConfig = {
            'options': {
                'chart': {
                    'type': 'areaspline'
                },
                'xAxis': {
                    'categories': [],
                    'title': {
                        'text': null
                    },

                    'labels': {
                        'enabled': false
                    },
                    'minorTickLength': 0,
                    'tickLength': 0,
                    'tickWidth': 0,
                    'minPadding': 0,
                    'maxPadding': 0,
                    'pointPadding': 0,
                    'groupPadding': 0,
                    'lineColor': '',
                    'lineWidth': ''
                },
                'yAxis': {
                    'categories': [],
                    'title': {
                        'text': null
                    },
                    'labels': {
                        'enabled': false
                    },
                    'minorTickLength': 0,
                    'tickLength': 0,
                    'gridLineColor': 'transparent',
                    'tickWidth': 0,
                    'minPadding': 0,
                    'maxPadding': 0,
                    'pointPadding': 0,
                    'groupPadding': 0,
                    'lineColor': '',
                    'lineWidth': ''
                },
                'pane': {},
                'tooltip': {},
                'plotOptions': {
                    'series': {
                        'stacking': '',
                        'marker': {
                            'enabled': false
                        }
                    },
                    'pie': {
                        'size': 500
                    }
                },
                'exporting': {
                    'enabled': false
                }
            },
            'series': [{
                'showInLegend': false,
                'data': [],
                'color': '',
                'name': ''

            }, {
                'showInLegend': false,
                'data': [],
                'color': '',
                'name': ''
            }],
            'title': {
                'text': ''
            },
            'credits': {
                'enabled': false
            },
            'loading': false,
            'size': {
                'height': 130
            },
            'tooltip': {},
            'useHighStocks': false,
            func: function func(chart) {}
        };

        var increaseColor = '#0fbd66';
        var decreaseColor = '#E6315E';
        $scope.$watch('analytic.filter', function (newVal, oldVal) {
            init();
        });

        // ActiveTriggers
        $scope.chartconfigSalesVsScans = angular.copy($scope.chartConfig);
        $scope.chartconfigSalesVsScans.options.chart.type = 'line';
        $scope.chartconfigSalesVsScans.size.height = 50;
        $scope.chartconfigSalesVsScans.options.xAxis = {
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            lineColor: '#FFFFFF',
            lineWidth: 1,
            gridLineWidth: 0,
            tickColor: '#FFFFFF',
            tickWidth: 0
        };
        $scope.chartconfigSalesVsScans.series = [{
            name: '',
            showInLegend: false,
            data: [2, 2, 3, 2, 1, 4, 5, 7, 1, 5, 4],
            color: decreaseColor
        }];

        // totalRevenueLineChar
        var activeUsers = {
            id: 'totalRevenueLineChar',
            name: 'Weekly Users',
            data: [1000, 1000, 2000, 2000, 3000, 3000, 4500, 4000, 4500, 5000, 6000, 5500, 4000, 3000, 4000, 4500, 4575, 4700, 5000, 5500, 5550, 5555, 4554, 6923, 3000, 3000, 3000, 3100, 3100, 3150, 3400, 3300, 3570, 3333, 3586, 3867, 3860, 3051, 3054, 3768, 3451, 3856, 3949, 3222, 3333, 3210, 3462, 3678, 2000, 1000, 4000, 3500, 10000, 6000, 5500, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 2222, 2000, 3200, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 3000, 2000, 1200, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 1000, 2000, 2400, 3300, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 2000, 6000, 5500, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923],
            pointStart: Date.UTC(2016, 0, 1),
            pointInterval: 3600 * 1000
        };
        $scope.activeUsers = activeUsers;

        // conversionLineChar
        var conversion = {
            id: 'conversionLineChar',
            name: 'Weekly Users',
            data: [1000, 1000, 2000, 2000, 3000, 3000, 4500, 4000, 4500, 5000, 6000, 5500, 4000, 3000, 4000, 4500, 4575, 4700, 5000, 5500, 5550, 5555, 4554, 6923, 3000, 3000, 3000, 3100, 3100, 3150, 3400, 3300, 3570, 3333, 3586, 3867, 3860, 3051, 3054, 3768, 3451, 3856, 3949, 3222, 3333, 3210, 3462, 3678, 2000, 1000, 4000, 3500, 10000, 6000, 5500, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 2222, 2000, 3200, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 3000, 2000, 1200, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 1000, 2000, 2400, 3300, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 2000, 6000, 5500, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923],
            pointStart: Date.UTC(2016, 0, 1),
            pointInterval: 3600 * 1000
        };
        $scope.conversion = conversion;

        // conversionLineChar
        var daytimesSales = {
            id: 'daytimesSalesLineChar',
            name: 'Weekly Users',
            data: [1000, 1000, 2000, 2000, 3000, 3000, 4500, 4000, 4500, 5000, 6000, 5500, 4000, 3000, 4000, 4500, 4575, 4700, 5000, 5500, 5550, 5555, 4554, 6923, 3000, 3000, 3000, 3100, 3100, 3150, 3400, 3300, 3570, 3333, 3586, 3867, 3860, 3051, 3054, 3768, 3451, 3856, 3949, 3222, 3333, 3210, 3462, 3678, 2000, 1000, 4000, 3500, 10000, 6000, 5500, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 2222, 2000, 3200, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 3000, 2000, 1200, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 1000, 2000, 2400, 3300, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 2000, 6000, 5500, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923],
            pointStart: Date.UTC(2016, 0, 1),
            pointInterval: 3600 * 1000
        };
        $scope.daytimesSales = daytimesSales;

        // daytimesTransactionsLineChar
        var daytimesTransactions = {
            id: 'daytimesTransactionsLineChar',
            name: 'Weekly Users',
            data: [1000, 1000, 2000, 2000, 3000, 3000, 4500, 4000, 4500, 5000, 6000, 5500, 4000, 3000, 4000, 4500, 4575, 4700, 5000, 5500, 5550, 5555, 4554, 6923, 3000, 3000, 3000, 3100, 3100, 3150, 3400, 3300, 3570, 3333, 3586, 3867, 3860, 3051, 3054, 3768, 3451, 3856, 3949, 3222, 3333, 3210, 3462, 3678, 2000, 1000, 4000, 3500, 10000, 6000, 5500, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 2222, 2000, 3200, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 3000, 2000, 1200, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 1000, 2000, 2400, 3300, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923, 2000, 1000, 4000, 3500, 2000, 6000, 5500, 7500, 4500, 6750, 8540, 9000, 8000, 6500, 4000, 4750, 2750, 8750, 9432, 1234, 5461, 2378, 3462, 6923],
            pointStart: Date.UTC(2016, 0, 1),
            pointInterval: 3600 * 1000
        };
        $scope.daytimesTransactions = daytimesTransactions;

        // Begin: Function Zone //
        function init() {
            switch ($scope.analytic.filter) {
                case 'Last 7 days':
                    period = WEEK;
                    break;
                case 'Last month':
                    period = MONTH;
                    break;
                default:
                    break;
            }

            // REVENUE_IN_PERIOD
            service.getDataOf(REVENUE_IN_PERIOD, period).then(function (response) {
                $scope.chartconfigTotalRevenue = angular.copy($scope.chartConfig);
                $scope.chartconfigTotalRevenue.options.chart.type = 'line';
                $scope.chartconfigTotalRevenue.size.height = 50;
                $scope.chartconfigTotalRevenue.options.xAxis = {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    lineColor: '#FFFFFF',
                    lineWidth: 1,
                    gridLineWidth: 0,
                    tickColor: '#FFFFFF',
                    tickWidth: 0
                };
                $scope.totalRevenue = {};
                $scope.totalRevenue.data = response.by_days.map(function (element) {
                    return element.amount;
                });
                response.percentage ? $scope.totalRevenue.percentage = response.percentage.toFixed(2) : $scope.totalRevenue.percentage = 100;
                $scope.totalRevenue.total = response.total.toFixed(2);

                $scope.chartconfigTotalRevenue.series = [{
                    name: '',
                    showInLegend: false,
                    data: $scope.totalRevenue.data,
                    color: $scope.totalRevenue.percentage > 0 ? increaseColor : decreaseColor
                }];
            });

            // TRANSACTION_IN_PERIOD
            service.getDataOf(TRANSACTION_IN_PERIOD, period).then(function (response) {
                $scope.chartconfigTransaction = angular.copy($scope.chartConfig);
                $scope.chartconfigTransaction.options.chart.type = 'line';
                $scope.chartconfigTransaction.size.height = 50;
                $scope.chartconfigTransaction.options.xAxis = {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    lineColor: '#FFFFFF',
                    lineWidth: 1,
                    gridLineWidth: 0,
                    tickColor: '#FFFFFF',
                    tickWidth: 0
                };
                $scope.transaction = {};
                $scope.transaction.data = response.by_days.map(function (element) {
                    return element.amount;
                });
                response.percentage ? $scope.transaction.percentage = response.percentage.toFixed(2) : $scope.transaction.percentage = 100;
                $scope.transaction.total = response.total.toFixed(2);
                $scope.chartconfigTransaction.series = [{
                    name: '',
                    showInLegend: false,
                    data: $scope.transaction.data,
                    color: $scope.transaction.percentage > 0 ? increaseColor : decreaseColor
                }];
            });

            // AVG_PER_TRANS_IN_PERIOD
            service.getDataOf(AVG_PER_TRANS_IN_PERIOD, period).then(function (response) {
                $scope.chartconfigAvgRevenueSale = angular.copy($scope.chartConfig);
                $scope.chartconfigAvgRevenueSale.options.chart.type = 'line';
                $scope.chartconfigAvgRevenueSale.size.height = 50;
                $scope.chartconfigAvgRevenueSale.options.xAxis = {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    lineColor: '#FFFFFF',
                    lineWidth: 1,
                    gridLineWidth: 0,
                    tickColor: '#FFFFFF',
                    tickWidth: 0
                };
                $scope.avgRevenueSale = {};
                $scope.avgRevenueSale.data = response.by_days.map(function (element) {
                    return element.amount;
                });
                response.percentage ? $scope.avgRevenueSale.percentage = response.percentage.toFixed(2) : $scope.avgRevenueSale.percentage = 100;
                $scope.avgRevenueSale.total = response.total.toFixed(2);
                $scope.chartconfigAvgRevenueSale.series = [{
                    name: '',
                    showInLegend: false,
                    data: $scope.avgRevenueSale.data,
                    color: $scope.avgRevenueSale.percentage > 0 ? increaseColor : decreaseColor
                }];
            });

            service.getDataOf(BY_AGE, period).then(function (response) {
                var data = response.reduce(function (data, element) {
                    data.push(['Age: ' + element.age[0] + '-' + element.age[1], element.count]);
                    return data;
                }, []);
                var maxText = _.max(response, function (item) {
                    return item.count;
                }).age;
                maxText = maxText[0] + '-' + maxText[1];
                var agePie = {
                    id: 'agePie',
                    title: {
                        text: 'AGE'
                    },
                    series: [{
                        name: 'Percent',
                        data: data
                    }],
                    credits: {
                        enabled: false
                    },
                    image: '/assets/images/analytics/pieImages/birthday_icon.svg',
                    max: maxText ? maxText : 'None'
                };
                $scope.agePie = agePie;
                // genderPie
                drawPieChart($scope.agePie);
            });

            service.getDataOf(BY_GENDER, period).then(function (response) {
                // genderPie
                var data = [['Male', response.male], ['Female', response.female]];
                var maxText = response.male >= response.female ? 'Male' : 'Female';
                var maleImage = '/assets/images/analytics/pieImages/male_icon.svg';
                var femaleImage = '/assets/images/analytics/pieImages/female_icon.svg';
                var maxImage = response.male >= response.female ? maleImage : femaleImage;
                var genderPie = {
                    id: 'genderPie',
                    title: {
                        text: 'GENDER'
                    },
                    series: [{
                        name: 'Percent',
                        data: data
                    }],
                    credits: {
                        enabled: false
                    },
                    image: maxImage,
                    max: maxText ? maxText : 'None'
                };
                $scope.genderPie = genderPie;
                drawPieChart($scope.genderPie);
            });

            service.getDataOf(BY_COUNTRY, period).then(function (response) {
                // countryPie
                var data = response.reduce(function (data, element) {
                    data.push([element.owner__country__short_name, element.total]);
                    return data;
                }, []);
                var maxText = _.max(response, 'total').owner__country__short_name;
                var countryPie = {
                    id: 'countryPie',
                    title: {
                        text: 'COUNTRY'
                    },
                    series: [{
                        name: 'Percent',
                        data: data
                    }],
                    credits: {
                        enabled: false
                    },
                    image: '/assets/images/analytics/pieImages/globe_icon.svg',
                    max: maxText ? maxTextCountry(maxText) : 'None'
                };
                $scope.countryPie = countryPie;
                drawPieChart($scope.countryPie);
            });

            // Change sort country for the USA and the UK
            function maxTextCountry(maxText) {
                var country = '';
                switch (maxText) {
                    case 'United Kingdom of Great Britain and Northern Ireland':
                        country = 'The UK';
                        break;
                    case 'United States of America':
                        country = 'The USA';
                        break;
                    default:
                        country = maxText;
                }
                return country;
            }
            // End change sort country for the USA and the UK

            service.getDataOf(BY_DEVICE_OS, period).then(function (response) {
                // devicePie
                var data = response.reduce(function (data, element) {
                    data.push([element.phone_type, element.total]);
                    return data;
                }, []);
                var maxText = _.max(response, 'total').phone_type;
                var maxImage = void 0;
                switch (maxText) {
                    case 'iOS':
                        maxImage = '/assets/images/analytics/pieImages/apple_icon.svg';
                        break;
                    case 'Android':
                        maxImage = '/assets/images/analytics/pieImages/android_icon.svg';
                        break;
                    default:
                        maxImage = '/assets/images/analytics/pieImages/apple_icon.svg';
                        break;
                }
                var devicePie = {
                    id: 'devicePie',
                    title: {
                        text: 'DEVICE'
                    },
                    series: [{
                        name: 'Percent',
                        data: data
                    }],
                    credits: {
                        enabled: false
                    },
                    image: maxImage,
                    max: maxText ? maxText : 'None',
                    x: 126
                };
                $scope.devicePie = devicePie;
                drawPieChart($scope.devicePie);
            });

            drawLineChart($scope.activeUsers);
            drawLineChart($scope.conversion);
            drawLineChart($scope.daytimesSales);
            drawLineChart($scope.daytimesTransactions);

            // drawPieChart($scope.agePie);
            // drawPieChart($scope.genderPie);
            // drawPieChart($scope.countryPie);
            // drawPieChart($scope.devicePie);
        }

        function drawLineChart(chart) {
            var c = chart;
            var lineChart = Highcharts.stockChart(c.id, {
                title: {
                    text: ''
                },
                xAxis: {
                    tickmarkPlacement: 'on',
                    type: 'datetime',
                    tickInterval: 24 * 3600 * 1000
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    opposite: false
                },
                rangeSelector: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                rangeSelectorZoom: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                series: [{
                    name: c.name,
                    data: c.data,
                    pointStart: c.pointStart,
                    pointInterval: c.pointInterval
                }],
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: true
                }
            });
        }

        function drawPieChart(chart) {
            var c = chart;
            var pieChart = Highcharts.chart(c.id, {
                chart: {
                    marginTop: -90,
                    height: 200
                },
                title: {
                    text: c.title.text, //'Browser<br>shares<br>2015',
                    align: 'center', //'center',
                    verticalAlign: 'bottom', //'bottom',
                    y: -5 //40
                },
                subtitle: {
                    text: '<div class="box-icon-pie" style="width:25%;"><img src="' + kachingAppConfig.wpTemplateUri + c.image + '" /></div><div class="box-num-pie align-center">' + c.max + '</div>',
                    align: 'center',
                    verticalAlign: 'middle',
                    useHTML: true,
                    y: -30
                },
                tooltip: {
                    // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                    useHTML: true,
                    formatter: function formatter() {
                        var name = this.point.name !== 'Slice' ? this.point.name : 'Other';
                        return '<div>' + name + ' : ' + this.point.percentage.toFixed(2) + '%' + '</div>';
                    }
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false, //true,
                            distance: -50, //-50,
                            style: {
                                fontWeight: 'bold', //'bold',
                                color: 'white'
                            }
                        },
                        startAngle: 0, //0,
                        endAngle: 360, //360,
                        center: ['50%', '65%'],
                        showInLegend: true,
                        size: '50%'
                    }
                },
                legend: {
                    enabled: false
                    //     align: 'right',
                    //     verticalAlign: 'middle',
                    //     layout: 'vertical',
                    //     symbolRadius: 100,
                    //     symbolPadding: 5,
                    //     itemMarginBottom: 10,
                    //     itemStyle: {
                    //         fontWeight: 100
                    //     },
                    //     symbolWidth: 16,
                    //     symbolHeight: 16,
                    //     y: 50
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    type: 'pie',
                    name: c.series[0].name, //'Browser share',
                    innerSize: '70%',
                    data: c.series[0].data
                }],
                credits: {
                    enabled: false
                }
            });
        }

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('orderHistoryCtrl', ['$scope', '$state', '$q', 'orderService', function ($scope, $state, $q, orderService) {
        $scope.updatingId = $state.params.updatingId;

        $scope.data = {
            orderHistorys: []
        };

        function getOrderListHistory() {
            var deferred = $q.defer();

            $scope.data.orderHistorys = JSON.parse(localStorage.getItem('orderHistory'));
            orderService.getOrderList().then(function (response) {
                $scope.updatingId = null;
                var localOrderLists = [];
                $scope.data.orderHistorys = [];
                $scope.data.orderHistorysCount = response.orders.length;
                $scope.view.busy = false;
                $scope.orderHistoryList = [];
                var orderLists = response.orders;
                angular.forEach(orderLists, function (value, key) {
                    var dataItem = {
                        orderNumber: value.id ? value.id : '',
                        date: value.created_at === undefined ? '-' : moment(value.created_at).format('MM-DD-YYYY hh:mm'),
                        buyer: value.user && value.user.first_name ? value.user.first_name : '',
                        shippingAddress: value.shipping_address ? value.shipping_address : '',
                        totalMount: value.total_amount ? parseFloat(value.total_amount.toFixed(2)) : '',
                        totalItem: value.products && value.products.product_quantity ? value.products.product_quantity : '',
                        status: value.process_status ? value.process_status : '',
                        zipCode: value.shipping_zipcode ? value.shipping_zipcode : '',
                        userEmail: value.user && value.user.email ? value.user.email : '',
                        shippingCity: value.shipping_city ? value.shipping_city : '',
                        shippingPhoneNumber: value.shipping_phone ? value.shipping_phone : '',
                        shippingCountry: value.shipping_country ? value.shipping_country : '',
                        products: value.products ? value.products : ''
                    };

                    if (value.products) {
                        angular.forEach(value.products, function (item, key) {
                            dataItem.totalItem += item.product_quantity;
                        });
                    }

                    $scope.data.orderHistorys.push(dataItem);
                    localOrderLists.push(dataItem);

                    var csvItem = {
                        orderNumber: dataItem.orderNumber,
                        date: dataItem.date,
                        buyer: dataItem.buyer,
                        shippingAddress: dataItem.shippingAddress,
                        totalMount: dataItem.totalMount,
                        totalItem: dataItem.totalItem,
                        status: dataItem.status
                    };
                    $scope.orderHistoryList.push(csvItem);
                });
                var localOrderListsString = JSON.stringify(localOrderLists);
                localStorage.setItem('orderHistory', localOrderListsString);
                deferred.resolve();
            }, function (response) {
                $scope.view.busy = false;
                deferred.reject();
            });

            return deferred.promise;
        }

        // Filter Zone
        $scope.daterange = {
            dates: {
                startDate: null,
                endDate: null
            },
            min: moment().format('MM-DD-YYYY'),
            display: 'Select date range'
        };
        $scope.$watch(function () {
            return $scope.daterange.dates;
        }, function (newValue, oldValue) {
            if (newValue === undefined || newValue.startDate === null || newValue.endDate === null) {
                return;
            }
            $scope.daterange.display = newValue.startDate.format('MM-DD-YYYY') + ' - ' + newValue.endDate.format('MM-DD-YYYY');
        });

        // End Filter Zone

        // Pagination Zone
        var itemsPerPage = 8;

        $scope.view = {
            initialLoadComplete: false,
            itemsPerPage: itemsPerPage,
            currentPage: 1,
            maxSize: 10,
            filtersActive: false
        };

        $scope.changePage = function () {
            getOrderListHistory();
        };
        // End Pagination Zone

        $scope.editOrder = function (orderItem) {
            $state.go('kaching.orderHistory.edit', { order: orderItem, orderNumber: orderItem.orderNumber });
        };

        function init() {
            getOrderListHistory();
        }

        init();
    }]);
})();

/**
 * API kaching
 */

// (function(){
//     'use strict';
//
//     angular.module('panelApp')
//         .controller( 'orderHistoryCtrl', [
//             '$scope',
//             '$state',
//             '$q',
//             'orderService',
//         function (
//             $scope,
//             $state,
//             $q,
//             orderService
//         ) {
//             $scope.updatingId = $state.params.updatingId;
//
//             $scope.data = {
//                 orderHistorys: []
//             };
//
//             function getOrderListHistory() {
//                 var deferred = $q.defer();
//
//                 $scope.data.orderHistorys = JSON.parse(localStorage.getItem('orderHistory'));
//                 orderService.getOrderList().then(
//                     function(response) {
//                         $scope.updatingId = null;
//                         var localOrderLists = [];
//                         $scope.data.orderHistorys = [];
//                         // $scope.data.orderHistorysCount = response.orders.length;
//                         $scope.data.orderHistorysCount = response.count;
//                         $scope.view.busy = false;
//                         $scope.orderHistoryList = [];
//                         var orderLists = response.orders;
//                         angular.forEach(orderLists, function (value, key) {
//                             var dataItem = {
//                                 orderNumber:            value.id                                            ? value.id : '',
//                                 date:                   value.created_at === undefined                      ? '-' : moment(value.created_at).format('MM-DD-YYYY hh:mm'),
//                                 buyer:                  value.owner && value.owner.name                     ? value.owner.name : '',
//                                 shippingAddress:        value.shipping_address                              ? value.shipping_address : '',
//                                 totalMount:             value.total_amount                                  ? '$' + parseFloat( value.total_amount.toFixed(2) ) : '-',
//                                 totalItem:              value.products && value.products.product_quantity   ? value.products.product_quantity : '',
//                                 status:                 value.process_status                                ? value.process_status : '',
//                                 zipCode:                value.shipping_zipcode                              ? value.shipping_zipcode : '',
//                                 userEmail:              value.owner && value.owner.email                      ? value.owner.email : '',
//                                 shippingCity:           value.shipping_city                                 ? value.shipping_city : '',
//                                 shippingPhoneNumber:    value.shipping_phone                                ? value.shipping_phone : 0,
//                                 shippingCountry:        value.shipping_country                              ? value.shipping_country : '',
//                                 products:               value.products                                      ? value.products : ''
//                             };
//
//                             if (value.products) {
//                                 angular.forEach(value.products, function(item, key) {
//                                     dataItem.totalItem += item.product_quantity;
//                                 });
//                             }
//
//                             $scope.data.orderHistorys.push(dataItem);
//                             localOrderLists.push(dataItem);
//
//                             var csvItem = {
//                                 orderNumber: dataItem.orderNumber,
//                                 date: dataItem.date,
//                                 buyer: dataItem.buyer,
//                                 shippingAddress: dataItem.shippingAddress,
//                                 totalMount: dataItem.totalMount,
//                                 totalItem: dataItem.totalItem,
//                                 status: dataItem.status
//                             }
//                             $scope.orderHistoryList.push(csvItem);
//                         });
//                         var localOrderListsString = JSON.stringify(localOrderLists);
//                         localStorage.setItem('orderHistory', localOrderListsString);
//                         deferred.resolve();
//                     },
//                     function(response) {
//                         $scope.view.busy = false;
//                         deferred.reject();
//                     }
//                 );
//
//                 return deferred.promise;
//             }
//
//             // Filter Zone
//             $scope.daterange = {
//                 dates: {
//                     startDate: null,
//                     endDate: null
//                 },
//                 min: moment().format('MM-DD-YYYY'),
//                 display: 'Select date range'
//             };
//             $scope.$watch(function() {
//                 return $scope.daterange.dates;
//             }, function(newValue, oldValue) {
//                 if (newValue === undefined || newValue.startDate === null || newValue.endDate === null) {
//                     return;
//                 }
//                 $scope.daterange.display = newValue.startDate.format('MM-DD-YYYY') + ' - ' + newValue.endDate.format('MM-DD-YYYY');
//             });
//
//             // End Filter Zone
//
//             // Pagination Zone
//             var itemsPerPage = 8;
//
//             $scope.view = {
//                 initialLoadComplete: false,
//                 itemsPerPage: itemsPerPage,
//                 currentPage: 1,
//                 maxSize: 10,
//                 filtersActive: false,
//             };
//
//             $scope.changePage = function() {
//                 getOrderListHistory();
//             };
//             // End Pagination Zone
//
//             $scope.editOrder = function(orderItem) {
//                 $state.go('kaching.orderHistory.edit', {order: orderItem, orderNumber: orderItem.orderNumber});
//             };
//
//             function init() {
//                 getOrderListHistory();
//             }
//
//             init();
//
//         }]);
// })();

/**
 *  End API kaching
 */
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('orderHistoryDetailCtrl', ['$scope', 'analyticsService', '$state', '$stateParams', 'orderService', 'kachingZonesHelpers', function ($scope, analyticsService, $state, $stateParams, orderService, kachingZonesHelpers) {
        var helpers = kachingZonesHelpers;
        $scope.goToOrderLists = goToOrderLists;

        $scope.saveOrderItem = saveOrderItem;

        $scope.changeOrderStatus = changeOrderStatus;

        init();

        function init() {
            getOrderItem();
        }

        function getOrderItem() {

            if (!$stateParams.order) {
                $scope.orderData = JSON.parse(localStorage.getItem('orderItemHistory'));
            } else {
                $scope.orderData = $stateParams.order;
            }

            $scope.status = $scope.orderData.status;

            // Save localStorage
            var localStoreOrderItem = $scope.orderData;
            var localOrderItemString = JSON.stringify(localStoreOrderItem);
            localStorage.setItem('orderItemHistory', localOrderItemString);
        }

        function saveOrderItem() {
            var orderData = this.orderData;
            var data = {
                cartID: orderData.orderNumber ? orderData.orderNumber : '',
                shipping_address: orderData.shippingAddress ? orderData.shippingAddress : '',
                user: {
                    first_name: orderData.buyer ? orderData.buyer : ''
                },
                total_amount: orderData.totalMount ? orderData.totalMount : '',
                products: orderData.products ? orderData.products : '',
                process_status: orderData.status ? orderData.status : '',
                shipping_zipcode: orderData.zipCode ? orderData.zipCode : '',
                shipping_city: orderData.shippingCity ? orderData.shippingCity : '',
                shipping_phone: orderData.shippingPhoneNumber ? orderData.shippingPhoneNumber : '',
                shipping_country: orderData.shippingCountry ? orderData.shippingCountry : ''
            };
            orderService.updateOrder(data).then(function (response) {
                helpers.alert('success', 'Order has been updated.');
                $state.go('kaching.orderHistory', { updatingId: orderData.orderNumber });
            }, function (error) {
                helpers.alert('danger', 'Order has not been updated.');
            });
        }

        function goToOrderLists() {
            $state.go('kaching.orderHistory');
        }

        function changeOrderStatus(status) {
            if ($scope.orderData && $scope.orderData.status) {
                $scope.orderData.status = status;
            }
        }
    }]);
})();

/**
 * API kaching
 */

// (function(){
//     'use strict';
//
//     angular.module('panelApp')
//         .controller( 'orderHistoryDetailCtrl', [
//             '$scope',
//             'analyticsService',
//             '$state',
//             '$stateParams',
//             'orderService',
//             'kachingZonesHelpers',
//         function (
//             $scope,
//             analyticsService,
//             $state,
//             $stateParams,
//             orderService,
//             kachingZonesHelpers
//         ) {
//             var helpers = kachingZonesHelpers;
//
//             $scope.onlyNumbers = '/^[a-zA-Z]*$/';
//             $scope.regex = RegExp('^((https?|ftp)://)?([a-z]+[.])?[a-z0-9-]+([.][a-z]{1,4}){1,2}(/.*[?].*)?$', 'i');
//
//             $scope.goToOrderLists = goToOrderLists;
//
//             $scope.saveOrderItem = saveOrderItem;
//
//             $scope.changeOrderStatus = changeOrderStatus;
//
//             init();
//
//             function init() {
//                 getOrderItem();
//             }
//
//             function getOrderItem() {
//
//                 if(!$stateParams.order) {
//                     $scope.orderData = JSON.parse(localStorage.getItem('orderItemHistory'));
//                 } else {
//                     $scope.orderData = $stateParams.order;
//                 }
//
//                 $scope.status = $scope.orderData.status;
//
//                 // Save localStorage
//                 var localStoreOrderItem = $scope.orderData;
//                 var localOrderItemString = JSON.stringify(localStoreOrderItem);
//                 localStorage.setItem('orderItemHistory', localOrderItemString);
//             }
//
//             function saveOrderItem() {
//                 let orderData = this.orderData;
//                 let data = {
//                     id:                 orderData.orderNumber ? orderData.orderNumber : '',
//                     shipping_address:   orderData.shippingAddress ? orderData.shippingAddress : '',
//                     // total_amount:       orderData.totalMount ? orderData.totalMount : '',
//                     process_status:     orderData.status ? orderData.status : '',
//                     shipping_zipcode:   orderData.zipCode ? orderData.zipCode : '',
//                     shipping_city:      orderData.shippingCity ? orderData.shippingCity :'',
//                     shipping_phone:     orderData.shippingPhoneNumber ? orderData.shippingPhoneNumber : 0,
//                     shipping_country:   orderData.shippingCountry ? orderData.shippingCountry : ''
//                 };
//
//                 if (orderData.products) {
//                     angular.forEach(orderData.products, function(product, key) {
//                         data.products = {
//                             product: product.product ? product.product : '',
//                             cart: product.cart ? product.cart : '',
//                             product_quantity: product.product_quantity ? product.product_quantity : '',
//                             product_price: product.product_price ? product.product_price : '',
//                             product_name: product.product_name ? product.product_name : '',
//                             product_description: product.product_description ? product.product_description : '',
//                             product_image: product.product_image ? product.product_image : '',
//                             product_url: product.product_url ? product.product_url : '',
//                             product_currency: product.product_currency ? product.product_currency : ''
//                         }
//                     });
//                 }
//
//                 orderService.saveOrder(data).then(
//                     (response) => {
//                         helpers.alert('success', 'Order has been updated.');
//                         $state.go('kaching.orderHistory', { updatingId: orderData.orderNumber });
//                     },
//                     (error) => {
//                         helpers.alert('danger', 'Order has not been updated.');
//                     }
//                 );
//             }
//
//             function goToOrderLists() {
//                 $state.go('kaching.orderHistory');
//             }
//
//             function changeOrderStatus(status) {
//                 if ($scope.orderData && $scope.orderData.status) {
//                     $scope.orderData.status = status;
//                 }
//             }
//         }]);
// })();

/**
 *  End API kaching
 */
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('billingCtrl', ['$scope', '$modal', '$filter', 'errorHandler', 'billingService', 'userService', function ($scope, $modal, $filter, errorHandler, billingService, userService) {

        var itemsPerPage = 10;

        $scope.view = {
            initialLoadComplete: false,
            itemsPerPage: itemsPerPage,
            currentPage: 1,
            maxSize: 10
        };

        $scope.data = {
            transactionsCount: 0,
            transactions: [],
            user: {
                hasBillingDetails: false
            }
        };

        $scope.filters = {};

        $scope.daterange = {
            dates: {
                startDate: null,
                endDate: null
            },
            datepickerLabel: 'Select date range'
        };

        var init = function init() {

            userService.getUser().then(function (user) {

                $scope.data.user.firstName = user.firstName;
                $scope.data.user.lastName = user.lastName;
                $scope.data.user.company = user.company;
                $scope.data.user.country = user.country;
                $scope.data.user.city = user.city;
                $scope.data.user.address = user.address;
                $scope.data.user.postalCode = user.postalCode;
                $scope.data.user.hasBillingDetails = userHasBillingDetails();

                getTransactions();
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        function userHasBillingDetails() {
            if ($scope.data.user.firstName === '') {
                return false;
            }
            if ($scope.data.user.lastName === '') {
                return false;
            }
            if ($scope.data.user.company === '') {
                return false;
            }
            if ($scope.data.user.country === undefined) {
                return false;
            }
            if ($scope.data.user.city === '') {
                return false;
            }
            if ($scope.data.user.address === '') {
                return false;
            }
            if ($scope.data.user.postalCode === '') {
                return false;
            }
            return true;
        }

        $scope.changePage = function () {
            getTransactions();
        };

        $scope.reloadTransactions = function () {
            $scope.view.currentPage = 1;
            getTransactions();
        };

        function getTransactions() {

            var params = {
                limit: itemsPerPage,
                offset: itemsPerPage * ($scope.view.currentPage - 1)
            };

            if ($scope.filters.start_date) {
                params.start_date = $scope.filters.start_date;
            }
            if ($scope.filters.end_date) {
                params.end_date = $scope.filters.end_date;
            }

            billingService.getTransactions(params).then(function (transactions) {
                $scope.data.transactionsCount = transactions.count;
                $scope.data.transactions = transactions.results;
                $scope.view.initialLoadComplete = true;
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        }

        $scope.updateFilters = function () {
            $scope.reloadTransactions();
        };

        $scope.getInvoicePdf = function (transactionId) {

            var modal = $modal({
                templateUrl: '/panel-module/components/invoiceDownloadModal/modalTmpl.html',
                animation: 'am-fade-and-scale',
                placement: 'center'
            });

            billingService.getInvoicePdf(transactionId).then(function (response) {
                modal.$promise.then(modal.hide);
            }, function (response) {
                errorHandler.processApiResponse(response);
                modal.$promise.then(modal.hide);
            });
        };

        $scope.$watch('daterange.dates.startDate', function (newValue, oldValue) {
            if (newValue === null) {
                return;
            }
            $scope.filters.start_date = moment.utc($scope.daterange.dates.startDate).hour(0).minute(0).second(0).format('YYYY-MM-DD');
            $scope.filters.end_date = moment.utc($scope.daterange.dates.endDate).hour(23).minute(59).second(59).format('YYYY-MM-DD');
            $scope.daterange.datepickerLabel = $filter('date')($scope.filters.start_date, 'yyyy-MM-dd') + ' - ' + $filter('date')($scope.filters.end_date, 'yyyy-MM-dd');
            $scope.updateFilters();
        });

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('paymentRequestCtrl', ['$scope', 'errorHandler', 'billingService', 'userService', '$filter', '$modal', function ($scope, errorHandler, billingService, userService, $filter, $modal) {
        var itemsPerPage = 10;

        $scope.view = {
            initialLoadComplete: false,
            itemsPerPage: itemsPerPage,
            currentPage: 1,
            maxSize: 10
        };

        $scope.data = {
            paymentCount: 0,
            payments: []
        };

        $scope.filters = {};

        $scope.daterange = {
            dates: {
                startDate: null,
                endDate: null
            },
            datepickerLabel: 'Select date range'
        };

        var init = function init() {

            getPaymentRequest();
        };

        function getPaymentRequest() {
            var params = {
                limit: itemsPerPage,
                offset: itemsPerPage * ($scope.view.currentPage - 1)
            };

            if ($scope.filters.start_date) {
                params.start_date = $scope.filters.start_date;
            }
            if ($scope.filters.end_date) {
                params.end_date = $scope.filters.end_date;
            }

            billingService.getPaymentRequest(params).then(function (response) {
                console.log('payments: ', response);
                $scope.data.paymentCount = response.count;
                $scope.data.payments = response.results;
                $scope.view.initialLoadComplete = true;
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        }

        $scope.updateFilters = function () {
            $scope.reloadPayments();
        };

        $scope.reloadPayments = function () {
            $scope.view.currentPage = 1;
            getPaymentRequest();
        };

        $scope.$watch('daterange.dates.startDate', function (newValue, oldValue) {
            if (newValue === null) {
                return;
            }
            $scope.filters.start_date = moment.utc($scope.daterange.dates.startDate).hour(0).minute(0).second(0).format('YYYY-MM-DD');
            $scope.filters.end_date = moment.utc($scope.daterange.dates.endDate).hour(23).minute(59).second(59).format('YYYY-MM-DD');
            $scope.daterange.datepickerLabel = $filter('date')($scope.filters.start_date, 'yyyy-MM-dd') + ' - ' + $filter('date')($scope.filters.end_date, 'yyyy-MM-dd');
            $scope.updateFilters();
        });

        $scope.showEditPaymentPopup = function (_paymentId) {
            $modal({
                // templateUrl: 'panel-module/components/campaignDetailsModal/modalTmpl.html',
                templateUrl: templateDirUri + '/assets/kaching/panel-module/controllers/billing/editPaymentRequestTmpl.html',
                controller: 'editPaymentRequestCtrl',
                animation: 'am-fade-and-scale',
                resolve: {
                    paymentId: function paymentId() {
                        return _paymentId;
                    }
                }
            });
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('editPaymentRequestCtrl', ['$scope', 'errorHandler', 'billingService', 'userService', '$filter', '$stateParams', '$state', 'paymentId', '$window', function ($scope, errorHandler, billingService, userService, $filter, $stateParams, $state, paymentId, $window) {

        $scope.viewBusy = false;

        $scope.data = null;

        $scope.statusProp = {
            'value': 1,
            'status': [1, 2, 3]
        };

        $scope.saveForm = function () {

            $scope.viewBusy = true;

            billingService.updatePaymentRequestItem(paymentId, $scope.statusProp.value).then(function (response) {
                $scope.viewBusy = false;
                // $scope.$hide();
                $window.location.reload();
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        var init = function init() {
            var cache = $stateParams;
            getPaymentRequestItem();
        };

        function getPaymentRequestItem() {
            $scope.viewBusy = true;

            billingService.getPaymentRequestItem(paymentId).then(function (response) {
                $scope.viewBusy = false;
                $scope.payment = response;
                $scope.statusProp.value = response.status;
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        }

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('apiKeysCtrl', ['$scope', '$alert', '$modal', 'errorHandler', 'applicationsService', function ($scope, $alert, $modal, errorHandler, applicationsService) {

        var itemsPerPage = 10;

        $scope.view = {
            busy: true,
            currentPage: 1,
            maxSize: 10,
            itemsPerPage: itemsPerPage,
            filtersActive: false,
            initialLoadComplete: false
        };

        $scope.data = {
            appsCount: 0,
            apps: []
        };

        $scope.filters = {};

        var init = function init() {
            initFilters();
            getApps();
        };

        function initFilters() {
            $scope.filters = {
                name: '',
                api_key: ''
            };
        }

        $scope.changePage = function () {
            getApps();
        };

        $scope.reloadApps = function () {
            $scope.view.currentPage = 1;
            getApps();
        };

        function getApps(argsObj) {

            var params = {
                limit: itemsPerPage,
                offset: itemsPerPage * ($scope.view.currentPage - 1)
            };

            if ($scope.filters.name.length > 0) {
                params.name = $scope.filters.name;
            }
            if ($scope.filters.api_key.length > 0) {
                params.api_key = $scope.filters.api_key;
            }

            $scope.view.busy = true;
            applicationsService.getApps(params).then(function (apps) {
                $scope.data.appsCount = apps.count;
                $scope.data.apps = apps.items;
                $scope.view.busy = false;
                $scope.view.initialLoadComplete = true;
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        }

        var deleteApp = function deleteApp(app) {
            var name = app.name;
            applicationsService.deleteApp(app.id).then(function () {
                $alert({
                    title: 'Application deleted.',
                    content: 'Application "' + name + '" has been deleted.',
                    container: '#alerts-container',
                    placement: 'top',
                    duration: 3,
                    type: 'success',
                    show: true
                });
                getApps();
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.showDeleteAppDialog = function (_app) {
            var options = {
                delete: function _delete(app) {
                    console.log('delete app', app);
                    deleteApp(app);
                }
            };
            $modal({
                templateUrl: 'panel-module/components/appDeleteModal/modalTmpl.html',
                controller: 'appDeleteModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    },
                    app: function app() {
                        return _app;
                    }
                }
            });
        };

        $scope.showNewAppDialog = function () {
            var options = {
                submit: function submit(app) {
                    $alert({
                        title: 'Application added.',
                        content: 'Application "' + app.name + '" has been added.',
                        container: '#alerts-container',
                        placement: 'top',
                        duration: 3,
                        type: 'success',
                        show: true
                    });
                    $scope.reloadApps();
                }
            };
            $modal({
                templateUrl: 'panel-module/components/newAppModal/modalTmpl.html',
                controller: 'newAppModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    }
                }
            });
        };

        $scope.showAppEditDialog = function (_app2) {
            var options = {
                submit: function submit(app) {
                    $alert({
                        title: 'Application updated.',
                        content: '',
                        container: '#alerts-container',
                        placement: 'top',
                        duration: 3,
                        type: 'success',
                        show: true
                    });
                    $scope.reloadApps();
                }
            };
            $modal({
                templateUrl: 'panel-module/components/appEditModal/modalTmpl.html',
                controller: 'appEditModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    },
                    app: function app() {
                        return _app2;
                    }
                }
            });
        };

        $scope.showAppKeyDialog = function (_app3) {
            $modal({
                templateUrl: 'panel-module/components/appKeyModal/modalTmpl.html',
                controller: 'appKeyModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    app: function app() {
                        return _app3;
                    }
                }
            });
        };

        $scope.updateFilters = function () {
            $scope.reloadApps();
        };

        $scope.toggleFilters = function () {
            if ($scope.view.filtersActive) {
                $scope.clearFilters();
            } else {
                $scope.view.filtersActive = true;
            }
        };

        $scope.clearFilters = function () {
            $scope.view.filtersActive = false;
            initFilters();
            $scope.reloadApps();
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('mediaCtrl', ['$scope', '$alert', '$modal', 'errorHandler', 'mediaService', function ($scope, $alert, $modal, errorHandler, mediaService) {

        var itemsPerPage = 9;

        $scope.view = {
            busy: true,
            currentPage: 1,
            media: [],
            maxSize: 10,
            searchPhrase: '',
            searchInput: '',
            orderByOptions: [{
                value: 'name',
                label: 'Order by title'
            }, {
                value: '-date_added',
                label: 'Newest first'
            }],
            orderBy: '-date_added',
            itemsPerPage: itemsPerPage,
            selectItem: false
        };

        $scope.data = {
            mediaCount: 0,
            media: []
        };

        var init = function init() {
            getMedia();
        };

        $scope.reloadMedia = function () {
            $scope.view.currentPage = 1;
            getMedia();
        };

        $scope.changeOrder = function () {
            $scope.view.currentPage = 1;
            getMedia();
        };

        $scope.search = function () {
            $scope.view.currentPage = 1;
            $scope.view.searchPhrase = $scope.view.searchInput;
            getMedia();
        };

        $scope.nextPage = function () {
            //console.log("SCROLL",$scope.data.media.length, $scope.data.mediaCount, $scope.view.currentPage)
            if ($scope.view.busy || $scope.data.media.length === $scope.data.mediaCount) {
                return;
            }
            $scope.view.currentPage++;
            getMedia();
        };

        function getMedia(argsObj) {

            var params = {
                limit: itemsPerPage,
                offset: itemsPerPage * ($scope.view.currentPage - 1),
                ordering: $scope.view.orderBy
            };

            if ($scope.view.searchPhrase.length > 0) {
                params.name = $scope.view.searchPhrase;
            }

            $scope.view.busy = true;
            mediaService.getMedia(params).then(function (media) {
                $scope.data.mediaCount = media.count;
                if ($scope.view.currentPage === 1) {
                    $scope.data.media = media.items;
                } else {
                    $scope.data.media = $scope.data.media.concat(media.items);
                }
                $scope.view.busy = false;
            }, function (response) {
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
                $scope.$hide();
            });
        }

        var deleteMedia = function deleteMedia(media) {
            var name = media.name;
            mediaService.deleteMedia(media.id).then(function () {
                $alert({
                    title: 'Media deleted.',
                    content: 'Media collection "' + name + '" has been deleted.',
                    container: '#alerts-container',
                    placement: 'top',
                    duration: 3,
                    type: 'success',
                    show: true
                });
                $scope.reloadMedia();
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.showNewMediaDialog = function () {
            var options = {
                submit: function submit(mediaId) {
                    console.log('mediaId', mediaId);
                    $scope.reloadMedia();
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/newMediaModal/modalTmpl.html',
                // templateUrl: 'panel-module/components/newMediaModal/modalTmpl.html',
                controller: 'newMediaModalCtrl',
                animation: 'am-fade-and-scale',
                backdrop: 'static',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    }
                }
            });
        };

        $scope.showDeleteMediaDialog = function (_media) {
            var options = {
                delete: function _delete(media) {
                    console.log('delete media', media);
                    deleteMedia(media);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/mediaDeleteModal/modalTmpl.html',
                // templateUrl: 'panel-module/components/mediaDeleteModal/modalTmpl.html',
                controller: 'mediaDeleteModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    },
                    media: function media() {
                        return _media;
                    }
                }
            });
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('mediaViewCtrl', ['$scope', '$state', '$stateParams', '$alert', '$modal', '$sce', 'errorHandler', 'mediaService', function ($scope, $state, $stateParams, $alert, $modal, $sce, errorHandler, mediaService) {

        $scope.view = {
            busy: false
        };

        $scope.data = {
            mediaId: $stateParams.mediaId,
            mediaItem: {}
        };

        $scope.videogular = { sources: [] };

        $scope.externalLink = null;

        var init = function init() {
            $scope.view.busy = true;
            mediaService.getMediaItem($scope.data.mediaId).then(function (mediaItem) {
                $scope.data.mediaItem = mediaItem;
                $scope.setVideo();
                $scope.view.mediaLoaded = true;
                $scope.view.busy = false;
            }, function (response) {
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
                $scope.$hide();
            });
        };

        var deleteMedia = function deleteMedia(media) {
            var name = media.name;
            mediaService.deleteMedia(media.id).then(function () {
                $alert({
                    title: 'Media deleted.',
                    content: 'Media collection "' + name + '" has been deleted.',
                    container: '#alerts-container',
                    placement: 'top',
                    duration: 3,
                    type: 'success',
                    show: true
                });
                $state.go('media');
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.setVideo = function () {
            var videoLink = $scope.data.mediaItem.video || $scope.data.mediaItem.video_external_link;
            if ($scope.data.mediaItem.video === null) {
                $scope.externalLink = $sce.trustAsResourceUrl(videoLink);
            } else {
                $scope.videogular.sources = [
                // {src: $sce.trustAsResourceUrl($scope.data.mediaItem.video), type: "video/mp4"}
                { src: $sce.trustAsResourceUrl(videoLink), type: 'video/mp4' }];
            }
        };

        $scope.showDeleteMediaDialog = function (_media) {
            var options = {
                delete: function _delete(media) {
                    console.log('delete media', media);
                    deleteMedia(media);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/mediaDeleteModal/modalTmpl.html',
                // templateUrl: 'panel-module/components/mediaDeleteModal/modalTmpl.html',
                controller: 'mediaDeleteModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    },
                    media: function media() {
                        return _media;
                    }
                }
            });
        };

        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('mediaEditCtrl', ['$scope', '$state', '$stateParams', '$alert', 'errorHandler', 'apiUrl', 'authToken', 'utils', 'mediaService', 'FileUploader', function ($scope, $state, $stateParams, $alert, errorHandler, apiUrl, authToken, utils, mediaService, FileUploader) {

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/media/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });

        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            busy: false,
            uploading: false,
            submitted: false,
            mediaCreated: false,

            videoUploadStarted: false,
            videoUploadProgress: 0,
            videoUploadComplete: false,

            imageUploadStarted: false,
            imageUploadProgress: 0,
            imageUploadComplete: false
        };

        $scope.data = {
            mediaId: $stateParams.mediaId,
            mediaItem: {},
            videoFile: '',
            imageFile: '',
            newVideoAdded: false,
            newImageAdded: false
        };

        $scope.mediaTypeProp = { 'type': 'select',
            'name': 'media_type',
            'mediaTypeSelect': 'Upload Media',
            'values': ['Upload Media', 'External Link']
        };

        $scope.errors = {
            video: {},
            image: {}
        };

        var init = function init() {

            utils.addUploaderTypeFilter(uploader, 'video', {
                videoFilter: ['video/mp4', 'video/ogg', 'video/webm', 'video/mov', 'video/avi', 'video/quicktime']
            });
            utils.addUploaderTypeFilter(uploader, 'display', {
                imageFilter: ['image/png', 'image/jpg', 'image/jpeg']
            });

            $scope.view.busy = true;
            mediaService.getMediaItem($scope.data.mediaId).then(function (mediaItem) {
                $scope.data.mediaItem = mediaItem;
                $scope.data.imageFile = mediaItem.display;
                $scope.view.hasVideo = true;
                $scope.view.mediaLoaded = true;
                $scope.view.busy = false;
            }, function (response) {
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
            });
        };

        uploader.onAfterAddingFile = function (newItem) {

            utils.cleanupUploaderQueue(uploader);

            if (newItem.alias === 'video') {
                $scope.data.videoFile = newItem._file;
                $scope.data.newVideoAdded = true;
            }
            if (newItem.alias === 'display') {
                $scope.data.imageFile = newItem._file;
                $scope.data.newImageAdded = true;

                // mediaService.imageSizeHelper( newItem._file ).then(function( size ){
                //     if ( ! mediaService.imageSizeValid( size.width, size.height ) ) {
                //         $scope.errors.image.size = true;
                //     } else {
                //         delete $scope.errors.image.size;
                //     }
                // });
            }
        };

        uploader.onBeforeUploadItem = function (item) {
            if (item.alias === 'video') {
                $scope.view.videoUploadStarted = true;
            }
            if (item.alias === 'display') {
                $scope.view.imageUploadStarted = true;
            }
            item.url = apiUrl + '/media/' + $scope.data.mediaId + '/';
        };

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            if (fileItem.alias === 'video') {
                $scope.view.videoUploadComplete = true;
            }
            if (fileItem.alias === 'display') {
                $scope.view.imageUploadComplete = true;
            }
        };

        uploader.onProgressItem = function (fileItem, progress) {
            if (fileItem.alias === 'video') {
                $scope.view.videoUploadProgress = progress;
            }
            if (fileItem.alias === 'display') {
                $scope.view.imageUploadProgress = progress;
            }
        };

        uploader.onCompleteAll = function () {
            $scope.view.mediaCreated = true;
            $alert({
                title: 'Media saved.',
                content: '',
                container: '#alerts-container',
                placement: 'top',
                duration: 3,
                type: 'success',
                show: true
            });
            $state.go('media');
        };

        $scope.showErrors = function () {
            return $scope.view.submitted;
        };
        $scope.videoHasError = function () {
            return $scope.data.newVideoAdded && _typeof($scope.data.videoFile) !== 'object';
        };
        $scope.imageHasError = function () {
            // if ( $scope.data.newImageAdded && ( typeof $scope.data.imageFile !== 'object' || $scope.errors.image.size ) ) {
            if ($scope.data.newImageAdded && _typeof($scope.data.imageFile) !== 'object') {
                return true;
            } else {
                return false;
            }
        };

        $scope.saveMedia = function () {
            $scope.view.submitted = true;

            var mediaValid = false;

            if ($scope.mediaTypeProp.mediaTypeSelect === 'Upload Media') {
                mediaValid = $scope.form1.$valid && !$scope.imageHasError() && !$scope.videoHasError();
            } else {
                mediaValid = $scope.form1.$valid && !$scope.imageHasError();
            }

            // if ( $scope.form1.$valid && !$scope.imageHasError() && !$scope.videoHasError() ) {
            if (mediaValid) {
                $scope.view.uploading = true;
                // mediaService.updateMedia( $scope.data.mediaItem ).then(
                mediaService.updateMedia($scope.data.mediaItem, $scope.data.mediaLink).then(function () {
                    if ($scope.data.newVideoAdded || $scope.data.newImageAdded) {
                        uploader.uploadAll();
                    } else {
                        $alert({
                            title: 'Media saved.',
                            content: '',
                            container: '#alerts-container',
                            placement: 'top',
                            duration: 3,
                            type: 'success',
                            show: true
                        });
                        $state.go('media');
                    }
                }, function () {
                    // Show error message
                    // $scope.$hide();
                });
            }
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('productsCtrl', ['$scope', '$alert', '$modal', '$http', 'apiUrl', 'authToken', 'errorHandler', 'productsService', function ($scope, $alert, $modal, $http, apiUrl, authToken, errorHandler, productsService) {

        var itemsPerPage = 12;

        $scope.view = {
            busy: true,
            currentPage: 1,
            media: [],
            maxSize: 10,
            searchPhrase: '',
            searchInput: '',
            orderByOptions: [{
                'value': 'title',
                'label': 'Order by title'
            }, {
                'value': '-date_added',
                'label': 'Newest first'
            }],
            orderBy: '-date_added',
            itemsPerPage: itemsPerPage,
            selectItem: false
        };

        $scope.data = {
            deletedCount: 0,
            productsCount: 0,
            products: []
        };

        var init = function init() {
            getProducts();
        };

        $scope.reloadProducts = function () {
            $scope.view.currentPage = 1;
            getProducts();
        };

        $scope.search = function () {
            $scope.view.currentPage = 1;
            $scope.view.searchPhrase = $scope.view.searchInput;
            getProducts();
        };

        $scope.nextPage = function () {
            if ($scope.view.busy || $scope.data.products.length === $scope.data.productsCount) {
                return;
            }
            $scope.view.currentPage++;
            getProducts();
        };

        function getProducts(argsObj) {

            var params = {
                limit: itemsPerPage,
                offset: itemsPerPage * ($scope.view.currentPage - 1) - $scope.data.deletedCount,
                ordering: $scope.view.orderBy
            };

            if ($scope.view.searchPhrase.length > 0) {
                params.title = $scope.view.searchPhrase;
            }

            $scope.view.busy = true;
            productsService.getProducts(params).then(function (products) {
                $scope.data.productsCount = products.count;
                if ($scope.view.currentPage === 1) {
                    $scope.data.products = products.items;
                } else {
                    $scope.data.products = $scope.data.products.concat(products.items);
                }
                $scope.view.busy = false;
            }, function (response) {
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
                $scope.$hide();
            });
        }

        var deleteProduct = function deleteProduct(product, index) {
            var title = product.title;

            productsService.deleteProduct(product.id).then(function () {
                $alert({
                    title: 'Product deleted.',
                    content: '"' + title + '" has been deleted.',
                    container: '#alerts-container',
                    placement: 'top',
                    duration: 3,
                    type: 'success',
                    show: true
                });
                $scope.data.products.splice(index, 1);
                $scope.data.productsCount--;
                $scope.data.deletedCount++;
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.showNewProductDialog = function () {
            var options = {
                submit: function submit(newProduct) {
                    console.log('newProduct', newProduct);
                    $scope.reloadProducts();
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/newProductModal/modalTmpl.html',
                // templateUrl: 'panel-module/components/newProductModal/modalTmpl.html',
                controller: 'newProductModalCtrl',
                animation: 'am-fade-and-scale',
                backdrop: 'static',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    }
                }
            });
        };

        $scope.showDeleteProductDialog = function (_product, _index) {
            var options = {
                delete: function _delete(product, index) {
                    deleteProduct(product, index);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/productDeleteModal/modalTmpl.html',
                // templateUrl: 'panel-module/components/productDeleteModal/modalTmpl.html',
                controller: 'productDeleteModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    },
                    product: function product() {
                        return _product;
                    },
                    index: function index() {
                        return _index;
                    }
                }
            });
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('productViewCtrl', ['$scope', '$state', '$stateParams', '$alert', '$modal', 'errorHandler', 'productsService', function ($scope, $state, $stateParams, $alert, $modal, errorHandler, productsService) {

        $scope.view = {
            busy: false
        };

        $scope.data = {
            productId: $stateParams.productId,
            product: {}
        };

        var init = function init() {
            $scope.view.busy = true;
            productsService.getProduct($scope.data.productId).then(function (product) {
                console.log(product);
                $scope.data.product = product;
                $scope.view.busy = false;
            }, function (response) {
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
                $scope.$hide();
            });
        };

        var deleteProduct = function deleteProduct(product) {
            debugger;
            var title = product.title;
            productsService.deleteProduct(product.id).then(function () {
                $alert({
                    title: 'Product deleted.',
                    content: '"' + title + '" has been deleted.',
                    container: '#alerts-container',
                    placement: 'top',
                    duration: 3,
                    type: 'success',
                    show: true
                });
                $state.go('kaching.products');
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.showDeleteProductDialog = function (_product, _index) {
            var options = {
                delete: function _delete(product, index) {
                    deleteProduct(product, index);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/productDeleteModal/modalTmpl.html',
                // templateUrl: 'panel-module/components/productDeleteModal/modalTmpl.html',
                controller: 'productDeleteModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    },
                    product: function product() {
                        return _product;
                    },
                    index: function index() {
                        return _index;
                    }
                }
            });
        };

        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('productEditCtrl', ['$scope', '$state', '$stateParams', '$alert', 'apiUrl', 'utils', 'authToken', 'errorHandler', 'FileUploader', 'productsService', function ($scope, $state, $stateParams, $alert, apiUrl, utils, authToken, errorHandler, FileUploader, productsService) {

        var uploader = $scope.uploader = new FileUploader({
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });

        $scope.fieldHasError = utils.fieldHasError;
        $scope.urlRegex = utils.urlRegex();

        $scope.view = {
            busy: false,
            submitted: false,
            uploading: false,
            uploadStarted: false,
            uploadProgress: 0,
            uploadComplete: false
        };

        $scope.data = {
            productId: $stateParams.productId,
            product: {},
            imageFile: '',
            newImageAdded: false
        };

        var init = function init() {

            utils.addUploaderTypeFilter(uploader, 'image', {
                imageFilter: ['image/png', 'image/jpg', 'image/jpeg']
            });

            $scope.view.busy = true;
            productsService.getProduct($scope.data.productId).then(function (product) {
                $scope.data.product = product;
                $scope.data.imageFile = product.image || product.image_url;
                $scope.view.busy = false;
            }, function (response) {
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
                $scope.$hide();
            });
        };

        var success = function success() {
            $alert({
                title: 'Product saved.',
                content: '',
                container: '#alerts-container',
                placement: 'top',
                duration: 3,
                type: 'success',
                show: true
            });
            $state.go('kaching.products');
        };

        uploader.onAfterAddingFile = function (item) {
            utils.cleanupUploaderQueue(uploader);
            $scope.data.imageFile = item._file;
            $scope.data.newImageAdded = true;
        };

        uploader.onBeforeUploadItem = function (item) {
            $scope.view.uploading = true;
            $scope.view.uploadStarted = true;
            item.url = apiUrl + '/products/' + $scope.data.productId + '/';
        };

        uploader.onProgressItem = function (fileItem, progress) {
            $scope.view.uploadProgress = progress;
        };

        uploader.onSuccessItem = function (item, response, status, headers) {
            $scope.view.uploadComplete = true;
            success();
        };

        $scope.showErrors = function () {
            return $scope.view.submitted;
        };

        $scope.imageHasError = function () {
            return $scope.data.newImageAdded && _typeof($scope.data.imageFile) !== 'object';
        };

        $scope.saveProduct = function () {
            $scope.view.submitted = true;
            if ($scope.form1.$valid) {
                $scope.view.uploading = true;
                productsService.updateProduct($scope.data.product).then(function () {
                    if ($scope.data.newImageAdded) {
                        uploader.uploadAll();
                    } else {
                        success();
                    }
                }, function () {});
            }
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('campaignEditorCtrl', ['$scope', '$state', '$stateParams', 'campaignEditorService', function ($scope, $state, $stateParams, campaignEditorService) {

        var editor = campaignEditorService;

        $scope.logData = function () {
            editor.logData();
        };

        editor.init($stateParams.campaignId);
        $scope.currentStep = editor.currentStep;

        $scope.states = {
            step1: 'campaigns.' + editor.mode() + '.step1',
            step2: 'campaigns.' + editor.mode() + '.step2',
            step3: 'campaigns.' + editor.mode() + '.step3',
            step4: 'campaigns.' + editor.mode() + '.step4',
            step5: 'campaigns.' + editor.mode() + '.step5',
            step6: 'campaigns.' + editor.mode() + '.step6'
        };

        $state.go($scope.states.step1);
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('newCampaignEditorCtrl', ['$scope', '$state', '$stateParams',
    // 'campaignId',
    function ($scope, $state, $stateParams
    // campaignId
    ) {

        $scope.campaignTemplate = kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/billboards/billboards-popup-tmpl.html';
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('editCampaignCtrl', ['$scope', '$state', '$stateParams', 'campaignEditorService', 'campaignsService', 'errorHandler', '$alert', function ($scope, $state, $stateParams, campaignEditorService, campaignsService, errorHandler, $alert) {

        var editor = campaignEditorService;

        editor.init($stateParams.campaignId);

        $scope.view = {
            currentTab: 'details'
        };

        $scope.data = {
            campaign: {}
        };

        campaignsService.getCampaign($stateParams.campaignId).then(function (campaign) {
            if (campaign.status === 3) {
                $state.go('campaigns');
            }
            $scope.data.campaign = campaign;
        }, function (response) {
            errorHandler.processApiResponse(response);
        });

        $scope.switchTab = function (tab) {
            $scope.view.currentTab = tab;
        };

        $scope.isCurrentTab = function (tab) {
            return $scope.view.currentTab === tab;
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('campaignEditorStep1Ctrl', ['$scope', '$state', '$stateParams', 'errorHandler', 'campaignEditorService', 'utils', function ($scope, $state, $stateParams, errorHandler, campaignEditorService, utils) {

        var editor = campaignEditorService;
        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            busy: true
        };

        $scope.campaign = {};

        $scope.daterange = {
            dates: {
                startDate: null,
                endDate: null
            },
            min: moment().format('YYYY-MM-DD'),
            display: 'Select date range'
        };

        var init = function init() {

            editor.currentStep('step1');
            editor.previousState('campaigns.' + editor.mode() + '.step1');

            $scope.campaign = editor.dataGet('campaign');

            if (typeof $scope.campaign.start_date !== 'undefined' && typeof $scope.campaign.end_date !== 'undefined') {
                $scope.daterange.dates.startDate = moment($scope.campaign.start_date);
                $scope.daterange.dates.endDate = moment($scope.campaign.end_date);
                $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
            }

            $scope.view.busy = false;
        };

        $scope.$watch(function () {
            return $scope.daterange.dates;
        }, function (newValue, oldValue) {
            if (newValue === undefined || newValue.startDate === null || newValue.endDate === null) {
                return;
            }
            $scope.daterange.display = newValue.startDate.format('YYYY-MM-DD') + ' - ' + newValue.endDate.format('YYYY-MM-DD');
        });

        $scope.showErrors = function () {
            return editor.stepGet('step1', 'submitted');
        };

        $scope.nextStep = function () {

            editor.stepSet('step1', 'submitted', true);

            if ($scope.form1.$valid) {

                editor.stepSet('step1', 'valid', true);

                $scope.campaign.start_date = moment($scope.daterange.dates.startDate).format('YYYY-MM-DD') + 'T00:00:00.000Z';
                $scope.campaign.end_date = moment($scope.daterange.dates.endDate).format('YYYY-MM-DD') + 'T23:59:59.999Z';
                editor.dataSet('campaign', $scope.campaign);

                editor.save('step1').then(function () {
                    $state.go('campaigns.' + editor.mode() + '.step2');
                }, function (response) {
                    errorHandler.processApiResponse(response);
                });
            } else {
                editor.stepSet('step1', 'valid', false);
            }
        };

        $scope.logControllerData = function () {
            console.log('campaignEditorStep1Ctrl - campaign', angular.copy($scope.campaign));
        };

        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('campaignEditorStep2Ctrl', ['$scope', '$state', '$sce', 'utils', '$modal', 'errorHandler', 'campaignsService', 'campaignEditorService', function ($scope, $state, $sce, utils, $modal, errorHandler, campaignsService, campaignEditorService) {

        var editor = campaignEditorService;
        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            busy: false,
            showErrors: false,
            errors: {},
            ageRanges: []
        };

        $scope.data = {
            allCategories: true,
            allLocations: true,
            categories: [],
            locations: [],
            gender: {
                male: true,
                female: true
            },
            os: {
                ios: true,
                android: true
            },
            ageRange: undefined
        };

        var init = function init() {

            if (!editor.stepGet('step1', 'valid')) {
                $state.go(editor.previousState());
            }

            editor.currentStep('step2');
            editor.previousState('campaigns.' + editor.mode() + '.step2');

            var targetingData = editor.dataGet('targeting');
            if (!_.isEmpty(targetingData)) {

                $scope.data = targetingData;
            } else {

                $scope.view.busy = true;

                campaignsService.getTargeting().then(function (response) {
                    $scope.data.allCategories = response.allCategories;
                    $scope.data.allLocations = response.allLocations;
                    $scope.data.categories = response.categories;
                    $scope.data.locations = response.locations;
                    $scope.data.gender = response.gender;
                    $scope.data.os = response.os;
                    $scope.data.ageRange = response.ageRange;
                    $scope.view.ageRanges = response.ageRanges;
                    $scope.view.busy = false;
                }, function (response) {
                    errorHandler.processApiResponse(response);
                });
            }
        };

        $scope.nextStep = function () {

            $scope.view.busy = true;
            editor.stepSet('step2', 'submitted', true);

            campaignsService.saveTargeting(editor.dataGet('campaignId'), $scope.data).then(function (response) {
                editor.stepSet('step2', 'valid', true);
                editor.dataSet('targeting', $scope.data);
                $state.go('campaigns.' + editor.mode() + '.step3');
            }, function (response) {
                $scope.view.busy = false;
                editor.stepSet('step2', 'valid', false);
                if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object' && !_.isEmpty(response.validationErrors)) {
                    $scope.view.showErrors = true;
                    $scope.view.errors = response.validationErrors;
                } else {
                    errorHandler.processApiResponse(response);
                }
            });
        };

        $scope.previousStep = function () {
            $state.go('campaigns.' + editor.mode() + '.step1');
        };

        $scope.resetError = function (errorName) {
            if (typeof $scope.view.errors[errorName] !== 'undefined') {
                delete $scope.view.errors[errorName];
            }
        };

        $scope.updateDataModel = function (e, obj) {
            e.preventDefault();
            obj.selected = !obj.selected;
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('campaignEditorStep3Ctrl', ['$scope', '$state', 'utils', 'errorHandler', 'campaignsService', 'campaignEditorService', '$timeout', function ($scope, $state, utils, errorHandler, campaignsService, campaignEditorService, $timeout) {

        var editor = campaignEditorService;
        $scope.fieldHasError = utils.fieldHasError;

        $scope.hasBudget = false;

        $scope.view = {
            busy: false,
            showCharts: false
        };

        $scope.data = {
            budgetType: 'ongoing',
            bidAmount: undefined,
            budgetAmount: undefined
        };

        $scope.estViews = {
            daily: { percentage: 0, min: 0, max: 0 },
            total: { percentage: 0, min: 0, max: 0 }
        };

        $scope.estDailyViewsChart = {
            data: [$scope.estViews.daily.percentage, 100 - $scope.estViews.daily.percentage],
            labels: ['', ''],
            colours: ['#f9cd3f', '#dae2e5'],
            options: {
                animationEasing: 'easeOutQuart',
                showTooltips: false,
                segmentShowStroke: false,
                percentageInnerCutout: 85
            }
        };

        $scope.estTotalViewsChart = {
            data: [$scope.estViews.total.percentage, 100 - $scope.estViews.total.percentage],
            labels: ['', ''],
            colours: ['#343b45', '#dae2e5'],
            options: {
                animationEasing: 'easeOutQuart',
                showTooltips: false,
                segmentShowStroke: false,
                percentageInnerCutout: 85
            }
        };

        var mapBudgetType = function mapBudgetType(type) {
            var types = ['ongoing', 'fixed', 'daily'];
            if (typeof type === 'number') {
                return types[type - 1];
            } else if (typeof type === 'string') {
                type = types.indexOf(type);
                return type + 1;
            }
        };

        var init = function init() {

            if (!editor.stepGet('step1', 'valid') || !editor.stepGet('step2', 'valid')) {
                $state.go(editor.previousState());
            }

            editor.currentStep('step3');
            editor.previousState('campaigns.' + editor.mode() + '.step3');

            var budgetingData = editor.dataGet('budgeting');

            if (!_.isEmpty(budgetingData)) {

                $scope.data = budgetingData;
                $scope.hasBudget = true;

                $timeout(function () {
                    updateEstimatedViews();
                }, 300);
            } else {

                $timeout(function () {
                    updateEstimatedViews();
                }, 300);
            }
        };

        $scope.changedBid = function () {
            updateEstimatedViews();
        };

        function updateEstimatedViews() {
            if (typeof $scope.data.bidAmount === 'undefined') {
                $scope.estViews = {
                    daily: { percentage: 0, min: 0, max: 0 },
                    total: { percentage: 0, min: 0, max: 0 }
                };
                updateCharts();
                $scope.view.showCharts = true;
            } else {
                campaignsService.getEstimatedViews(editor.dataGet('campaignId'), $scope.data.bidAmount).then(function (response) {
                    $scope.estViews = response;
                    updateCharts();
                    $scope.view.showCharts = true;
                }, function (response) {
                    errorHandler.processApiResponse(response);
                });
            }
        }

        function updateCharts() {
            $scope.estDailyViewsChart.data = [$scope.estViews.daily.percentage, 100 - $scope.estViews.daily.percentage];
            $scope.estTotalViewsChart.data = [$scope.estViews.total.percentage, 100 - $scope.estViews.total.percentage];
        }

        $scope.showErrors = function () {
            return editor.stepGet('step3', 'submitted');
        };

        $scope.previousStep = function () {
            $state.go('campaigns.' + editor.mode() + '.step2');
        };

        $scope.nextStep = function () {

            editor.stepSet('step3', 'submitted', true);

            if ($scope.form1.$valid) {

                $scope.view.busy = true;

                var data = {
                    cost_per_view: $scope.data.bidAmount,
                    amount: $scope.data.budgetAmount,
                    type: mapBudgetType($scope.data.budgetType)
                };

                if ($scope.data.budgetType === 'ongoing') {
                    data.amount = 0;
                }

                campaignsService.saveCampaignBudget(editor.dataGet('campaignId'), data, $scope.hasBudget).then(function (response) {
                    editor.stepSet('step3', 'valid', true);
                    editor.dataSet('budgeting', $scope.data);
                    $state.go('campaigns.' + editor.mode() + '.step4');
                }, function (response) {
                    errorHandler.processApiResponse(response);
                });
            }
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('campaignEditorStep4Ctrl', ['$scope', '$state', '$sce', 'utils', '$modal', 'errorHandler', 'mediaService', 'campaignEditorService', function ($scope, $state, $sce, utils, $modal, errorHandler, mediaService, campaignEditorService) {

        var editor = campaignEditorService;

        $scope.fieldHasError = utils.fieldHasError;
        $scope.videogular = { sources: [] };
        $scope.videogularApi = null;

        $scope.externalLink = null;

        var init = function init() {

            if (!editor.stepGet('step1', 'valid') || !editor.stepGet('step2', 'valid') || !editor.stepGet('step3', 'valid')) {
                $state.go(editor.previousState());
            }

            editor.currentStep('step4');
            editor.previousState('campaigns.' + editor.mode() + '.step4');

            $scope.media = editor.dataGet('media');

            $scope.view = {
                busy: false,
                busyMedia: false,
                mediaLoaded: false,
                playerReady: false,
                videoSet: false
            };

            if (hasVideo()) {
                $scope.view.mediaLoaded = true;
                if ($scope.view.playerReady) {
                    $scope.setVideo();
                }
            }
        };

        function hasVideo() {
            // if ( typeof $scope.media.video === 'string' ) {
            if (typeof $scope.media.video === 'string' || typeof $scope.media.video_external_link === 'string') {
                return true;
            } else {
                return false;
            }
        }

        $scope.hasMedia = function () {
            if (Object.getOwnPropertyNames($scope.media).length === 0) {
                return false;
            } else {
                return true;
            }
        };

        $scope.onPlayerReady = function (API) {
            $scope.videogularApi = API;
            if (hasVideo() && !$scope.view.videoSet) {
                $scope.setVideo();
            }
        };

        $scope.setVideo = function () {
            // $scope.videogularApi.stop();
            // var videoLink = $scope.media.video || $scope.media.video_external_link;
            // $scope.videogular.sources = [
            //     {src: $sce.trustAsResourceUrl(videoLink), type: 'video/mp4'}
            // ];
            // $scope.view.videoSet = true;

            $scope.videogularApi.stop();

            var videoLink = $scope.media.video || $scope.media.video_external_link;
            if ($scope.media.video === null) {
                $scope.externalLink = $sce.trustAsResourceUrl(videoLink);
            } else {
                $scope.videogular.sources = [{ src: $sce.trustAsResourceUrl(videoLink), type: 'video/mp4' }];
            }

            $scope.view.videoSet = true;
        };

        $scope.showMediaLibrary = function () {
            var options = {
                submit: function submit(selectedMedia) {
                    $scope.getMedia(selectedMedia.id);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/mediaLibraryModal/modalTmpl.html',
                // templateUrl: 'panel-module/components/mediaLibraryModal/modalTmpl.html',
                controller: 'mediaLibraryModalCtrl',
                animation: 'am-fade-and-scale',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    }
                }
            });
        };

        $scope.showNewMediaDialog = function () {
            var options = {
                mode: 'campaignEditor',
                submit: function submit(mediaId) {
                    console.log('mediaId', mediaId);
                    $scope.getMedia(mediaId);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/newMediaModal/modalTmpl.html',
                // templateUrl: 'panel-module/components/newMediaModal/modalTmpl.html',
                controller: 'newMediaModalCtrl',
                animation: 'am-fade-and-scale',
                backdrop: 'static',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    }
                }
            });
        };

        $scope.getMedia = function (mediaId) {
            $scope.view.busyMedia = true;
            mediaService.getMediaItem(mediaId).then(function (mediaItem) {
                $scope.media = mediaItem;
                $scope.view.busyMedia = false;
                $scope.setVideo();
                $scope.view.mediaLoaded = true;
            }, function () {
                $scope.view.busyMedia = false;
            });
        };

        $scope.showErrors = function () {
            return editor.stepGet('step4', 'submitted');
        };

        $scope.previousStep = function () {
            $state.go('campaigns.' + editor.mode() + '.step3');
        };

        $scope.nextStep = function () {

            editor.stepSet('step4', 'submitted', true);

            if ($scope.form1.$valid) {

                editor.stepSet('step4', 'valid', true);
                editor.dataSet('media', $scope.media);

                editor.save('step4').then(function () {
                    $state.go('campaigns.' + editor.mode() + '.step5');
                }, function (response) {
                    errorHandler.processApiResponse(response);
                });
            } else {
                editor.stepSet('step4', 'valid', false);
            }
        };

        $scope.logControllerData = function () {
            console.log('campaignEditorStep1Ctrl - media', angular.copy($scope.media));
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('campaignEditorStep5Ctrl', ['$scope', '$state', 'utils', '$modal', 'errorHandler', 'campaignsService', 'campaignEditorService', 'productsService', function ($scope, $state, utils, $modal, errorHandler, campaignsService, campaignEditorService, productsService) {

        var editor = campaignEditorService;

        $scope.fieldHasError = utils.fieldHasError;
        $scope.urlRegex = utils.urlRegex();

        $scope.products = [];
        $scope.recommendedProducts = [];

        $scope.carouselOptions = {
            nav: true,
            dots: false,
            navText: ['<span class="glyphicon glyphicon-chevron-left"></span>', '<span class="glyphicon glyphicon-chevron-right"></span>'],
            navRewind: false,
            loop: false,
            items: 4
        };

        var init = function init() {

            if (!editor.stepGet('step1', 'valid') || !editor.stepGet('step2', 'valid') || !editor.stepGet('step3', 'valid') || !editor.stepGet('step4', 'valid')) {
                $state.go(editor.previousState());
            }

            editor.currentStep('step5');
            editor.previousState('campaigns.' + editor.mode() + '.step5');

            $scope.products = editor.dataGet('products');

            productsService.getProducts({ limit: 16, offset: 0, ordering: '-last_used_date' }).then(function (products) {
                $scope.recommendedProducts = products.items;
            });

            $scope.view = {
                busy: false,
                submitted: false
            };
        };

        $scope.hasProducts = function () {
            return !_.isEmpty($scope.products);
        };

        $scope.showErrors = function () {
            return editor.stepGet('step5', 'submitted');
        };

        $scope.skipStep = function () {
            editor.stepSet('step5', 'submitted', true);
            editor.stepSet('step5', 'valid', true);
            $state.go('campaigns.' + editor.mode() + '.step6');
        };

        $scope.previousStep = function () {
            $state.go('campaigns.' + editor.mode() + '.step4');
        };

        $scope.nextStep = function () {

            editor.stepSet('step5', 'submitted', true);

            if ($scope.form1.$valid) {

                editor.stepSet('step5', 'valid', true);
                editor.dataSet('products', $scope.products);

                editor.save('step5').then(function () {
                    $state.go('campaigns.' + editor.mode() + '.step6');
                }, function (response) {
                    errorHandler.processApiResponse(response);
                });
            } else {
                editor.stepSet('step5', 'valid', false);
            }
        };

        $scope.selectRecommendedProduct = function (selectedProduct) {

            // var index = _.findIndex( $scope.recommendedProducts, function( product ) { return  product.id == selectedProduct.id });
            // console.log('index', index);
            // $scope.recommendedProducts.splice( index, 1 )

            $scope.products.unshift(selectedProduct);
        };

        $scope.showProductsLibrary = function () {
            var options = {
                submit: function submit(selectedProduct) {
                    $scope.products.unshift(selectedProduct);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/producstLibraryModal/modalTmpl.html',
                // templateUrl: '/panel-module/components/producstLibraryModal/modalTmpl.html',
                controller: 'producstLibraryModalCtrl',
                animation: 'am-fade-and-scale',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    }
                }
            });
        };

        $scope.showNewProductDialog = function () {
            var options = {
                mode: 'campaignEditor',
                submit: function submit(newProduct) {
                    console.log('newProduct', newProduct);
                    $scope.products.unshift(newProduct);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/newProductModal/modalTmpl.html',
                // templateUrl: '/panel-module/components/newProductModal/modalTmpl.html',
                controller: 'newProductModalCtrl',
                animation: 'am-fade-and-scale',
                backdrop: 'static',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    }
                }
            });
        };

        $scope.removeProduct = function (index) {
            $scope.products.splice(index, 1);
            return;
        };

        $scope.logControllerData = function () {
            console.log('campaignEditorStep1Ctrl - products', angular.copy($scope.products));
            return;
        };

        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('campaignEditorStep6Ctrl', ['$scope', '$state', '$sce', 'utils', '$modal', 'campaignsService', 'campaignEditorService', 'errorHandler', function ($scope, $state, $sce, utils, $modal, campaignsService, campaignEditorService, errorHandler) {

        var editor = campaignEditorService;

        $scope.videogularApi = null;

        $scope.campaign = {};
        $scope.media = {};
        $scope.products = [];
        $scope.videogular = { sources: [] };

        $scope.view = {
            loading: true,
            playerReady: false,
            videoSet: false
        };

        $scope.externalLink = null;

        var init = function init() {

            if (!editor.stepGet('step1', 'valid') || !editor.stepGet('step2', 'valid') || !editor.stepGet('step3', 'valid') || !editor.stepGet('step4', 'valid') || !editor.stepGet('step5', 'valid')) {
                $state.go(editor.previousState());
            }

            editor.currentStep('step6');
            editor.previousState('campaigns.' + editor.mode() + '.step6');

            $scope.campaignId = editor.dataGet('campaignId');

            $scope.view.loading = true;

            campaignsService.getCampaign($scope.campaignId).then(function (campaign) {

                $scope.campaign = campaign;

                if (campaign.media.length > 0 && _typeof(campaign.media[0]) === 'object') {
                    $scope.media = campaign.media[0];
                    $scope.setVideo();
                }

                if (campaign.products.length > 0) {
                    $scope.products = campaign.products;
                }

                $scope.view.loading = false;
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.onPlayerReady = function (API) {
            $scope.videogularApi = API;
            $scope.view.playerReady = true;
            $scope.setVideo();
        };

        $scope.setVideo = function () {
            // $scope.videogularApi.stop();
            // $scope.videogular.sources = [
            //     {src: $sce.trustAsResourceUrl($scope.media.video), type: 'video/mp4'}
            // ];
            // $scope.view.videoSet = true;

            $scope.videogularApi.stop();

            var videoLink = $scope.media.video || $scope.media.video_external_link;
            if ($scope.media.video === null) {
                $scope.externalLink = $sce.trustAsResourceUrl(videoLink);
            } else {
                $scope.videogular.sources = [{ src: $sce.trustAsResourceUrl(videoLink), type: 'video/mp4' }];
            }

            $scope.view.videoSet = true;
        };

        $scope.previousStep = function () {
            $state.go('campaigns.' + editor.mode() + '.step5');
        };

        $scope.finish = function () {
            campaignsService.setPrepared($scope.campaignId).then(function (response) {
                $state.go('campaigns');
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.hasProducts = function () {
            return $scope.products.length > 0 ? true : false;
        };

        $scope.logControllerData = function () {
            console.log('campaignEditorStep1Ctrl - media', angular.copy($scope.campaign), angular.copy($scope.media), angular.copy($scope.products));
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').factory('permissionsService', ['statePermissions', 'authService', function (statePermissions, authService) {
        return {
            userHasAccess: userHasAccess
        };
        function userHasAccess(stateName) {
            var usertype = authService.getUsertype();
            return _.contains(statePermissions[usertype], stateName);
        }
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').factory('campaignEditorService', ['$q', 'campaignsService', 'clientsService', 'productsService', function ($q, campaignsService, clientsService, productsService) {
        var view = {};
        var data = {};
        var flags = {};

        return {
            init: init,
            flag: flag,
            mode: mode,
            save: save,
            currentStep: currentStep,
            previousState: previousState,
            stepGet: stepGet,
            stepSet: stepSet,
            dataGet: dataGet,
            dataSet: dataSet,
            logData: logData
        };

        function init(campaignId) {

            view = {
                currentStep: 'step1',
                previousState: 'campaigns.new.step1',
                'step1': {
                    valid: false,
                    submitted: false
                },
                'step2': {
                    valid: false,
                    submitted: false
                },
                'step3': {
                    valid: false,
                    submitted: false
                },
                'step4': {
                    valid: false,
                    submitted: false
                },
                'step5': {
                    valid: false,
                    submitted: false
                },
                'step6': {
                    valid: false,
                    submitted: false
                }
            };

            data = {
                campaignId: undefined,
                campaign: {
                    name: undefined,
                    start_date: undefined,
                    end_date: undefined,
                    budget: undefined
                },
                targeting: {},
                media: [],
                products: []
            };

            flags = {
                mode: 'new',
                campaignLoaded: false
            };

            if (typeof campaignId !== 'undefined') {
                flag('mode', 'edit');
                dataSet('campaignId', campaignId);
            }
        }

        function mode() {
            return flags.mode;
        }

        function flag(name, val) {
            if (typeof val !== 'undefined') {
                flags[name] = val;
            } else {
                if (typeof flags[name] !== 'undefined') {
                    return flags[name];
                } else {
                    return false;
                }
            }
        }

        function currentStep(step) {
            if (typeof step === 'string') {
                view.currentStep = step;
            } else {
                return view.currentStep;
            }
        }

        function previousState(state) {
            if (typeof state === 'string') {
                view.previousState = state;
            } else {
                return view.previousState;
            }
        }

        function stepGet(step, prop) {
            if (typeof step !== 'string') {
                return false;
            }
            if (typeof prop === 'string') {
                return angular.copy(view[step][prop]);
            }
            return angular.copy(view[step]);
        }

        function stepSet(step, prop, val) {
            if (typeof step !== 'string' || typeof prop !== 'string' || typeof val === 'undefined') {
                return false;
            }
            view[step][prop] = val;
            return stepGet(step);
        }

        function dataGet(prop) {
            if (typeof prop !== 'undefined') {
                if (typeof data[prop] !== 'undefined') {
                    return angular.copy(data[prop]);
                } else {
                    return false;
                }
            }
            return angular.copy(data);
        }

        function dataSet(prop, val) {
            if (typeof prop !== 'string' || typeof val === 'undefined') {
                return false;
            }
            data[prop] = val;
            return dataGet();
        }

        function save(step) {
            if (step === 'step1') {
                return saveStep1();
            } else if (step === 'step2') {
                return saveStep2();
            } else if (step === 'step3') {
                return saveStep3();
            } else if (step === 'step4') {
                return saveStep4();
            } else if (step === 'step5') {
                return saveStep5();
            }
        }

        function saveStep1() {

            var deferred = $q.defer();

            var campaign = dataGet('campaign');

            saveCampagin(deferred);

            return deferred.promise;
        }

        function saveCampagin(deferred) {

            var campaign = dataGet('campaign');

            var campaignData = {
                name: campaign.name,
                start_date: campaign.start_date,
                end_date: campaign.end_date,
                budget: campaign.budget
            };

            if (dataGet('campaignId')) {
                campaignData.id = dataGet('campaignId');
            }

            campaignsService.saveCampagin(campaignData).then(function (campaign) {
                dataSet('campaignId', campaign.id);
                deferred.resolve(dataGet('campaign'));
            }, function (response) {
                deferred.reject(response);
            });
        }

        function saveStep2() {

            var deferred = $q.defer();

            saveCampagin(deferred);

            return deferred.promise;
        }

        function saveStep3() {

            var deferred = $q.defer();

            saveCampagin(deferred);

            return deferred.promise;
        }

        function saveStep4() {

            var deferred = $q.defer();

            var media = dataGet('media');

            var mediaData = {
                campaignId: dataGet('campaignId'),
                media: media.id,
                media_title: 'empty',
                media_description: 'empty'
            };

            campaignsService.saveMedia(mediaData).then(function () {
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function saveStep5() {

            var deferred = $q.defer();

            var campaignId = dataGet('campaignId');
            var products = dataGet('products');

            productsService.updateProducts(products).then(function () {
                campaignsService.saveProducts(campaignId, products).then(function (campaign) {
                    deferred.resolve(campaign);
                }, function (response) {
                    deferred.reject(response);
                });
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function logData() {
            console.log('campaignEditorService - data', angular.copy(data));
        }
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').factory('kachingZonecampaignEditorService', ['$q', 'campaignsService', 'clientsService', 'productsService', function ($q, campaignsService, clientsService, productsService) {

        var view = {};
        var data = {};
        var flags = {};

        return {
            init: init,
            flag: flag,
            mode: mode,
            save: save,
            currentStep: currentStep,
            previousState: previousState,
            stepGet: stepGet,
            stepSet: stepSet,
            dataGet: dataGet,
            dataSet: dataSet,
            logData: logData
        };

        // Public function

        function init(campaignId) {

            view = {
                currentStep: 1,
                previousState: 1,
                'step1': {
                    valid: false,
                    submitted: false
                },
                'step2': {
                    valid: false,
                    submitted: false
                },
                'step3': {
                    valid: false,
                    submitted: false
                },
                'step4': {
                    valid: false,
                    submitted: false
                }
            };

            data = {
                campaignId: undefined,
                campaign: {
                    type: undefined,
                    name: undefined,
                    client: '',
                    start_date: undefined,
                    end_date: undefined,
                    // budget: undefined,
                    logo_image: undefined,
                    header_image: undefined,
                    description: '',
                    logo_description: '',
                    header_description: ''
                },
                targeting: {
                    // os: undefined,
                    // gender: undefined,
                    // ageRange: undefined,
                    // locations: undefined,
                    // categories: undefined
                },
                // media: {},
                media: [],
                products: []
            };

            flags = {
                mode: 'new'
            };

            if (typeof campaignId !== 'undefined') {
                flag('mode', 'edit');
                dataSet('campaignId', campaignId);
            }
        }

        function flag(name, val) {
            if (typeof val !== 'undefined') {
                flags[name] = val;
            } else {
                if (typeof flags[name] !== 'undefined') {
                    return flags[name];
                } else {
                    return false;
                }
            }
        }

        function mode() {
            return flags.mode;
        }

        function save(step) {
            if (step === 'step1') {
                return saveStep1();
            } else if (step === 'step2') {
                return saveStep2();
            } else if (step === 'step3') {
                return saveStep3();
            } else if (step === 'step4') {
                return saveStep4();
            }
        }

        function currentStep(step) {
            if (typeof step === 'string') {
                view.currentStep = step;
            } else {
                return view.currentStep;
            }
        }

        function previousState(state) {
            if (typeof state === 'string') {
                view.previousState = state;
            } else {
                return view.previousState;
            }
        }

        function stepGet(step, prop) {
            if (typeof step !== 'string') {
                return false;
            }
            if (typeof prop === 'string') {
                return angular.copy(view[step][prop]);
            }
            return angular.copy(view[step]);
        }

        function stepSet(step, prop, val) {
            if (typeof step !== 'string' || typeof prop !== 'string' || typeof val === 'undefined') {
                return false;
            }
            view[step][prop] = val;
            return stepGet(step);
        }

        function dataGet(prop) {
            if (typeof prop !== 'undefined') {
                if (typeof data[prop] !== 'undefined') {
                    // return angular.copy(data[prop]);
                    return _.clone(data[prop]);
                } else {
                    return false;
                }
            }
            // return angular.copy(data);
            return _.clone(data);
        }

        function dataSet(prop, val) {
            if (typeof prop !== 'string' || typeof val === 'undefined') {
                return false;
            }
            data[prop] = val;
            return dataGet();
        }

        function logData() {
            console.log('campaignEditorService - data', angular.copy(data));
        }

        // Private function

        function b64toBlob(b64Data, contentType, sliceSize) {
            b64Data = b64Data.substring(22);
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, { type: contentType });
            return blob;
        }

        function saveCampagin() {

            var deferred = $q.defer();
            var campaign = dataGet('campaign');
            var campaignData = {
                id: dataGet('campaignId') || campaign.id,
                type: campaign.type,
                name: campaign.name,
                // client: campaign.customerName,
                start_date: campaign.start_date,
                end_date: campaign.end_date,
                fund: campaign.fund,
                // description: campaign.description,
                register: campaign.register || 0,
                newFund: campaign.newFund
            };

            campaignData.client = campaign.client || '';
            campaignData.description = campaign.description || '';
            campaignData.logo_description = campaign.logo_description || '';
            campaignData.header_description = campaign.header_description || '';

            if (campaign.logo_image !== null && _typeof(campaign.logo_image) === 'object') {
                campaignData.logo_image = campaign.logo_image;
            } else {
                if (typeof campaign.logo_image === 'string' && campaign.logo_image.indexOf('base64') > -1) {
                    var blob = b64toBlob(campaign.logo_image, 'image/jpeg');
                    var file = new File([blob], 'logo_image.jpeg');
                    campaignData.logo_image = file;
                }
            }

            if (campaign.header_image !== null && _typeof(campaign.header_image) === 'object') {
                campaignData.header_image = campaign.header_image;
            } else {
                if (typeof campaign.header_image === 'string' && campaign.header_image.indexOf('base64') > -1) {
                    var headerBlob = b64toBlob(campaign.header_image, 'image/jpeg');
                    var headerFile = new File([headerBlob], 'header_image.jpeg');
                    campaignData.header_image = headerFile;
                }
            }

            campaignsService.saveKachingZoneCampagin(campaignData).then(function (campaign) {
                dataSet('campaignId', campaign.id);
                dataSet('campaign', campaign);
                deferred.resolve(dataGet('campaign'));
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function saveTargeting() {

            var deferred = $q.defer();
            var targetingData = dataGet('targeting');
            var selectedCountry = dataGet('selectedCountry');

            campaignsService.saveTargeting(dataGet('campaignId'), targetingData).then(function (targeting) {
                // dataSet('targeting', targeting);
                deferred.resolve(dataGet('targeting'));
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function saveCampaignBudget() {

            var deferred = $q.defer();

            var budgeting = dataGet('budgeting');

            campaignsService.saveCampaignBudget(dataGet('campaignId'), budgeting, budgeting.hasBudget, budgeting.id).then(function (budgeting) {
                dataSet('budgeting', budgeting);
                deferred.resolve(dataGet('budgeting'));
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        // function updateFund(id) {
        //
        //     var deferred = $q.defer();
        //
        //     // campaignsService.saveTargeting(dataGet('campaignId'), targetingData).then(
        //     //     function(targeting) {
        //     //         // dataSet('targeting', targeting);
        //     //         deferred.resolve(dataGet('targeting'));
        //     //     },
        //     //     function(response) {
        //     //         deferred.reject(response);
        //     //     }
        //     // );
        //
        //     return deferred.promise;
        // }

        function saveStep1() {

            var deferred = $q.defer();
            var deferred1 = $q.defer();
            var deferred2 = $q.defer();
            var deferred3 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise, deferred3.promise];

            var campaign = dataGet('campaign');
            var data = {};

            saveCampagin().then(function (campaign) {
                data.campaign = campaign;
                deferred1.resolve();
                saveTargeting().then(function (targeting) {
                    data.targeting = targeting;
                    deferred2.resolve();
                }, function (response) {
                    deferred2.reject(response);
                });
                saveCampaignBudget().then(function (budgeting) {
                    data.budgeting = budgeting;
                    deferred3.resolve();
                }, function (response) {
                    deferred3.reject(response);
                });
            }, function (response) {
                deferred1.reject(response);
            });

            $q.all(promisses).then(function () {
                deferred.resolve(data);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function saveStep2() {

            var deferred = $q.defer();

            var media = dataGet('media');

            var mediaData = {
                campaignId: dataGet('campaignId'),
                media: media.id,
                // media_title:  media.media_title,
                // media_description:  media.media_description
                media_title: 'empty',
                media_description: 'empty'
            };

            campaignsService.saveMedia(mediaData).then(function () {
                //dataSet('campaignId', campaign.id );
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function saveStep3() {

            var deferred = $q.defer();

            saveCampagin(deferred);

            return deferred.promise;
        }

        function saveStep4() {}
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').factory('campaignsService', ['$q', 'apiService', function ($q, apiService) {

        return {
            getCampaigns: getCampaigns,
            getCampaign: getCampaign,
            saveCampagin: saveCampagin,
            deleteCampaign: deleteCampaign,
            saveProducts: saveProducts,
            saveMedia: saveMedia,
            stopCampaign: stopCampaign,
            startCampaign: startCampaign,
            setPrepared: setPrepared,
            saveTargeting: saveTargeting,
            getTargeting: getTargeting,
            getEstimatedViews: getEstimatedViews,
            getCampaignBudget: getCampaignBudget,
            saveCampaignBudget: saveCampaignBudget,
            updateMedia: updateMedia,
            deleteMedia: deleteMedia,
            saveKachingZoneCampagin: saveKachingZoneCampagin,
            updateMediaProduct: updateMediaProduct
        };

        function getCampaigns(params) {

            var deferred = $q.defer();

            var requestParams = {
                limit: 10,
                offset: 0,
                ordering: '-id'
            };

            if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                if ('limit' in params) {
                    requestParams.limit = params.limit;
                }
                if ('offset' in params) {
                    requestParams.offset = params.offset;
                }
                if ('ordering' in params) {
                    requestParams.ordering = params.ordering;
                }
                if ('name' in params) {
                    requestParams.name = params.name;
                }
                if ('client' in params) {
                    requestParams.client = params.client;
                }
                if ('media_title' in params) {
                    requestParams.media_title = params.media_title;
                }
                if ('start_date' in params) {
                    requestParams.start_date = params.start_date;
                }
                if ('end_date' in params) {
                    requestParams.end_date = params.end_date;
                }
                if ('status' in params) {
                    requestParams.status = params.status;
                }
            }

            apiService.get('/campaigns/', requestParams, true).then(function (response) {
                console.log('getCampaigns() success', response);
                deferred.resolve({
                    count: response.count,
                    items: response.results
                });
            }, function (response) {
                console.log('getCampaigns() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getCampaign(campaignId) {

            var deferred = $q.defer();

            apiService.get('/campaigns/' + campaignId + '/', false, true).then(function (response) {
                console.log('getCampaign() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('getCampaign() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function deleteCampaign(campaignId) {

            var deferred = $q.defer();

            apiService.delete('/campaigns/' + campaignId + '/', false, true).then(function (response) {
                console.log('deleteCampaign() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('deleteCampaign() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function stopCampaign(campaignId) {
            return changeCampaignStatus(campaignId, 5);
        }

        function startCampaign(campaignId) {
            return changeCampaignStatus(campaignId, 3);
        }

        function setPrepared(campaignId) {
            return changeCampaignStatus(campaignId, 2);
        }

        function changeCampaignStatus(campaignId, status) {

            var deferred = $q.defer();

            var data = { status: status };

            apiService.put('/campaigns/' + campaignId + '/status/', data, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function saveCampagin(campaign) {

            var deferred = $q.defer();

            if (typeof campaign.id === 'undefined') {
                apiService.post('/campaigns/', campaign, true).then(function (response) {
                    console.log('saveCampaign() success', response);
                    deferred.resolve(response);
                }, function (response) {
                    console.log('saveCampaign() failure', response);
                    deferred.reject(response);
                });
            } else {
                apiService.patch('/campaigns/' + campaign.id + '/', campaign, true).then(function (response) {
                    console.log('saveCampaign() success', response);
                    deferred.resolve(response);
                }, function (response) {
                    console.log('saveCampaign() failure', response);
                    deferred.reject(response);
                });
            }
            return deferred.promise;
        }

        function saveKachingZoneCampagin(campaign) {

            var deferred = $q.defer();

            if (typeof campaign.id === 'undefined') {
                apiService.postMultiPart('/campaigns/', campaign, true).then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
            } else {
                var campaignData = undefined;

                apiService.patchMultiPart('/campaigns/' + campaign.id + '/', campaign, true).then(function (response) {
                    campaignData = response;
                    var fundData = {
                        fund: campaign.newFund || 0
                    };
                    apiService.post('/campaigns/' + campaign.id + '/addFund/', fundData, true).then(function (response) {
                        deferred.resolve(campaignData);
                    }, function (response) {
                        deferred.reject(response);
                    });
                }, function (response) {
                    deferred.reject(response);
                });
            }
            return deferred.promise;
        }

        function saveMedia(data) {

            var deferred = $q.defer();

            var campaignId = data.campaignId;
            delete data.campaignId;

            apiService.patch('/campaigns/' + campaignId + '/media/', data, true).then(function (response) {
                console.log('saveMedia() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('saveMedia() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function saveProducts(campaignId, products) {

            var deferred = $q.defer();

            var productsData = {
                products: []
            };

            angular.forEach(products, function (product) {
                productsData.products.push(product.id);
            });

            apiService.patch('/campaigns/' + campaignId + '/products/', productsData, true).then(function (response) {
                console.log('saveProducts() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('saveProducts() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getTargetingLocations(selectedLocations) {

            var deferred = $q.defer();

            apiService.get('/countries/', null, true).then(function (response) {

                // var allLocations = true;
                // var locations = [];
                //
                // angular.forEach( response, function( name, id ){
                //
                //     // id = parseInt( id );
                //     id = parseInt(name.id);
                //     var item = { id: id, name: name, selected: true };
                //
                //     if ( typeof selectedLocations !== 'undefined'  && selectedLocations.indexOf( id ) === -1 ) {
                //         item.selected = false;
                //         allLocations = false;
                //     }
                //
                //     locations.push( item );
                // });
                //
                // deferred.resolve({
                //     allLocations: allLocations,
                //     locations: locations
                // });
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getTargetingCategories(selectedCategories) {

            var deferred = $q.defer();

            apiService.get('/campaigns/categories/', null, true).then(function (response) {

                var allCategories = true;
                var categories = [];

                angular.forEach(response, function (name, id) {

                    id = parseInt(id);
                    var item = { id: id, name: name, selected: true };

                    if (typeof selectedCategories !== 'undefined' && selectedCategories.indexOf(id) === -1) {
                        item.selected = false;
                        allCategories = false;
                    }

                    categories.push(item);
                });

                deferred.resolve({
                    allCategories: allCategories,
                    categories: categories
                });
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getAgeRanges() {
            return [{ value: 0, label: 'Any' }, { value: 2130, label: '21 - 30' }, { value: 3145, label: '31 - 45' }, { value: 4660, label: '46 - 60' }, { value: 6180, label: '61 - 80' }];
        }

        function getTargeting(campaignId) {

            var deferred = $q.defer();
            var deferred1 = $q.defer();
            var deferred2 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise];

            var data = {
                gender: {},
                os: {}
            };

            if (typeof campaignId === 'undefined') {

                getTargetingCategories().then(function (response) {
                    data.allCategories = response.allCategories;
                    data.categories = response.categories;
                    deferred1.resolve();
                }, function (response) {
                    deferred1.reject(response);
                });

                getTargetingLocations().then(function (response) {
                    data.allLocations = response.allLocations;
                    data.locations = response;
                    // data.selectedCountry = response.selectedCountry || response[0];
                    data.selectedCountry = response.selectedCountry || _.findWhere(response, { alpha2_code: kachingAppConfig.localeData.country }) || _.findWhere(response, { alpha2_code: 'SG' });
                    deferred2.resolve();
                }, function (response) {
                    deferred2.reject(response);
                });

                $q.all(promisses).then(function () {
                    data.gender = { male: true, female: true };
                    data.os = { android: true, ios: true };
                    data.ageRanges = getAgeRanges();
                    data.ageRange = data.ageRanges[0];
                    deferred.resolve(data);
                }, function (response) {
                    deferred.reject(response);
                });
            } else {

                apiService.get('/campaigns/' + campaignId + '/targeting_options/', false, true).then(function (targetingData) {
                    data.selectedCountry = targetingData.location[0] || undefined;

                    getTargetingCategories(targetingData.app_categories).then(function (response) {
                        data.allCategories = response.allCategories;
                        data.categories = response.categories;
                        deferred1.resolve();
                    }, function (response) {
                        deferred1.reject(response);
                    });

                    getTargetingLocations().then(function (response) {
                        // data.allLocations = response.allLocations;
                        // data.locations    = response.locations;
                        data.locations = response;

                        if (!data.selectedCountry) {
                            data.selectedCountry = _.findWhere(response, { alpha2_code: kachingAppConfig.localeData.country }) || _.findWhere(response, { alpha2_code: 'SG' });
                        } else {
                            data.selectedCountry = _.findWhere(response, { id: data.selectedCountry });
                        }
                        deferred2.resolve();
                    }, function (response) {
                        deferred2.reject(response);
                    });

                    $q.all(promisses).then(function () {

                        // gender: 'F', 'M', 'A' (M+F)
                        data.gender.male = targetingData.gender === 'M' || targetingData.gender === 'A' ? true : false;
                        data.gender.female = targetingData.gender === 'F' || targetingData.gender === 'A' ? true : false;

                        // os: 0 - any, 1 - android, 2 - ios
                        data.os.android = targetingData.os === 1 || targetingData.os === 0 ? true : false;
                        data.os.ios = targetingData.os === 2 || targetingData.os === 0 ? true : false;

                        // Age ranges
                        data.ageRanges = getAgeRanges();

                        if (targetingData.age_range.length > 1) {
                            data.ageRange = data.ageRanges[0];
                        } else {
                            var selectedAgeRange = targetingData.age_range[0];
                            data.ageRange = _.findWhere(data.ageRanges, { value: selectedAgeRange });
                        }

                        deferred.resolve(data);
                    }, function (response) {
                        deferred.reject(response);
                    });
                }, function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        }

        function saveTargeting(campaignId, settings) {

            var deferred = $q.defer();
            var data = {};
            var error = {
                validationErrors: {}
            };

            // Operating system
            if (settings.os.android === true && settings.os.ios === true) {
                data.os = 0;
            } else if (settings.os.android === true) {
                data.os = 1;
            } else if (settings.os.ios === true) {
                data.os = 2;
            } else {
                error.validationErrors.os = true;
            }

            // Gender
            if (settings.gender.male === true && settings.gender.female === true) {
                data.gender = 'A';
            } else if (settings.gender.male === true) {
                data.gender = 'M';
            } else if (settings.gender.female === true) {
                data.gender = 'F';
            } else {
                error.validationErrors.gender = true;
            }

            // Age range
            if (settings.ageRange.value === 0) {
                data.age_range = [];
                angular.forEach(getAgeRanges(), function (range) {
                    if (range.value !== 0) {
                        data.age_range.push(range.value);
                    }
                });
            } else {
                data.age_range = [settings.ageRange.value];
            }

            // Locations
            // data.location = [];
            // angular.forEach( settings.locations, function( location ){
            //     if ( settings.allLocations === true || location.selected === true ) {
            //         data.location.push( location.id );
            //     }
            // });
            data.location = [];
            data.location.push(settings.locations.id);
            if (data.location.length === 0) {
                error.validationErrors.locations = true;
            }

            // Categories
            data.app_categories = [];
            angular.forEach(settings.categories, function (category) {
                if (settings.allCategories === true || category.selected === true) {
                    data.app_categories.push(category.id);
                }
            });
            if (data.app_categories.length === 0) {
                error.validationErrors.categories = true;
            }

            if (_.isEmpty(error.validationErrors)) {
                // Save data in the backend
                apiService.put('/campaigns/' + campaignId + '/targeting_options/', data, true).then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
            } else {
                deferred.reject(error);
            }

            return deferred.promise;
        }

        function getEstimatedViews(campaignId, cpv) {

            var deferred = $q.defer();
            var requestParams = {};

            if (typeof cpv !== 'undefined') {
                requestParams.cpv = cpv;
            }

            apiService.get('/campaigns/' + campaignId + '/estimated_views/', requestParams, true).then(function (response) {
                console.log('getEstimatedViews() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('getEstimatedViews() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getCampaignBudget(campaignId) {

            var deferred = $q.defer();

            apiService.get('/campaigns/' + campaignId + '/budget/', null, true).then(function (response) {
                console.log('getCampaignBudget() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('getCampaignBudget() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function saveCampaignBudget(campaignId, data, hasBudget, budgetId) {

            var deferred = $q.defer();

            if (hasBudget) {
                apiService.put('/campaigns/' + campaignId + '/budget/' + budgetId + '/', data, true).then(function (response) {
                    console.log('saveCampaignBudget() success', response);
                    deferred.resolve(response);
                }, function (response) {
                    console.log('saveCampaignBudget() failure', response);
                    deferred.reject(response);
                });
            } else {
                apiService.post('/campaigns/' + campaignId + '/budget/', data, true).then(function (response) {
                    console.log('saveCampaignBudget() success', response);
                    deferred.resolve(response);
                }, function (response) {
                    console.log('saveCampaignBudget() failure', response);
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        }

        function campaignHasBudget(campaignId) {

            var deferred = $q.defer();

            apiService.get('/campaigns/' + campaignId + '/budget/', null, true).then(function (response) {
                console.log('campaignHasBudget() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('getCampaignBudget() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function updateMedia(media) {

            var deferred = $q.defer();

            apiService.patch('/media/' + media.id + '/', media, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function deleteMedia(campaignId) {

            var deferred = $q.defer();

            apiService.delete('/media/' + campaignId + '/', false, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function updateMediaProduct(media) {

            var deferred = $q.defer();

            apiService.patch('/media/' + media.id + '/products/', media, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').factory('analyticsService', ['$q', 'apiService', function ($q, apiService) {

        return {
            getStatisticCampaigns: getStatisticCampaigns
        };

        function getStatisticCampaigns(params) {

            var deferred = $q.defer();

            var requestParams = {
                page_size: 10,
                page: 1
            };

            if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                if ('page_size' in params) {
                    requestParams.page_size = params.page_size;
                }
                if ('page' in params) {
                    requestParams.page = params.page;
                }
            }

            apiService.get('/users/profile/statistic-campaigns/', requestParams, true).then(function (response) {
                deferred.resolve({
                    count: response.count,
                    items: response.results,
                    next: response.next,
                    previous: response.previous
                });
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').factory('clientsService', ['$q', 'apiService', function ($q, apiService) {
        return {
            getClients: getClients,
            saveClient: saveClient
        };
        function getClients() {

            var deferred = $q.defer();

            apiService.get('/clients/', false, true).then(function (response) {
                console.log('getClients() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('getClients() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function saveClient(name) {

            var deferred = $q.defer();

            var data = { name: name };

            apiService.post('/clients/', data, true).then(function (client) {
                console.log('saveClient() success', client);
                getClients().then(function (clients) {
                    deferred.resolve(client, clients);
                }, function (response) {
                    deferred.reject(response);
                });
            }, function (response) {
                console.log('saveClient() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').factory('mediaService', ['$q', 'apiService', function ($q, apiService) {
        return {
            getMedia: getMedia,
            getMediaItem: getMediaItem,
            deleteMedia: deleteMedia,
            createMedia: createMedia,
            updateMedia: updateMedia,
            imageSizeHelper: imageSizeHelper,
            imageSizeValid: imageSizeValid,
            createMediaNew: createMediaNew,
            saveKachingZoneMedia: saveKachingZoneMedia,
            getShapes: getShapes,
            getMarkerStand: getMarkerStand,
            getMarkerSize: getMarkerSize,
            getMaterials: getMaterials,
            updateReward: updateReward,
            getMakerDimension: getMakerDimension,
            getDistance: getDistance
        };

        function getMedia(params) {

            var deferred = $q.defer();

            var requestParams = {
                limit: 6,
                offset: 0,
                ordering: 'name'
            };

            if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                if ('limit' in params) {
                    requestParams.limit = params.limit;
                }
                if ('offset' in params) {
                    requestParams.offset = params.offset;
                }
                if ('ordering' in params) {
                    requestParams.ordering = params.ordering;
                }
                if ('name' in params) {
                    requestParams.name = params.name;
                }
            }

            apiService.get('/media/', requestParams, true).then(function (response) {
                console.log('getMedia() success', response);
                deferred.resolve({
                    count: response.count,
                    items: response.results
                });
            }, function (response) {
                console.log('getMedia() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getMediaItem(mediaId) {

            var deferred = $q.defer();

            apiService.get('/media/' + mediaId + '/', false, true).then(function (response) {
                console.log('getMediaItem() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('getMediaItem() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function deleteMedia(mediaId) {

            var deferred = $q.defer();

            apiService.delete('/media/' + mediaId + '/', false, true).then(function (response) {
                console.log('deleteMedia() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('deleteMedia() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function createMedia(mediaName, externalLink) {

            var deferred = $q.defer();

            var data = {
                name: mediaName
            };
            if (externalLink) {
                data.video_external_link = externalLink;
            }

            apiService.post('/media/', data, true).then(function (response) {
                console.log('getMediaItem() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('getMediaItem() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function createMediaNew(media) {

            var deferred = $q.defer();

            var mediaData = {
                name: media.name,
                description: media.description,
                ar_name: media.ar_name,
                ar_appearance: 2,
                image_name: media.image_name,
                image_format: 'bill_board',
                latitude: 10.123223,
                longitude: 11.22322,
                inclusion_zone: 100.4,
                inclusion_zone_unit: 'KM',
                ar_resource_type: 'image',
                ar_resource: media.arResource,
                display: media.display
            };

            var data = new FormData();
            data.append('name', mediaData.name);
            data.append('description', mediaData.description);
            data.append('ar_name', mediaData.ar_name);
            data.append('ar_appearance', mediaData.ar_appearance);
            data.append('image_name', mediaData.image_name);
            data.append('image_format', mediaData.image_format);
            data.append('latitude', mediaData.latitude);
            data.append('longitude', mediaData.longitude);
            data.append('inclusion_zone', mediaData.inclusion_zone);
            data.append('inclusion_zone_unit', mediaData.inclusion_zone_unit);
            data.append('ar_resource_type', mediaData.ar_resource_type);
            data.append('ar_resource', mediaData.ar_resource);
            data.append('display', mediaData.display);

            apiService.postMultiPartForm('/media/', data, true).then(function (response) {
                console.log('getMediaItem() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('getMediaItem() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function updateMedia(mediaItem, externalLink, id) {

            var deferred = $q.defer();

            // var data = {
            //     name: mediaItem.name
            // };
            var data = mediaItem;
            if (externalLink) {
                data.video_external_link = externalLink;
            }

            apiService.patch('/media/' + id + '/', data, true).then(function (response) {
                console.log('updateMedia() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('updateMedia() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function imageSizeHelper(imageFile) {

            var deferred = $q.defer();

            var reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    deferred.resolve({
                        width: this.width,
                        height: this.height
                    });
                };
            };

            return deferred.promise;
        }

        function imageSizeValid(width, height) {
            if (width !== 1280) {
                return false;
            }
            if (height !== 1200) {
                return false;
            }
            return true;
        }

        function saveKachingZoneMedia(media) {

            var deferred = $q.defer();

            if (typeof media.id === 'undefined') {
                apiService.postMultiPart('/media/', media, true).then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
            } else {
                apiService.patchMultiPart('/media/' + media.id + '/', media, true).then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        }

        function getShapes() {
            return [{
                value: 'circle',
                label: 'Circle'
            }, {
                value: 'rectangle',
                label: 'Rectangle'
            }, {
                value: 'square',
                label: 'Square'
            }];
        }

        function getMarkerStand() {
            return [{
                value: 0,
                label: 'None'
            }, {
                value: 1,
                label: 'Medium'
            }, {
                value: 2,
                label: 'High'
            }];
        }

        function getMarkerSize() {
            return [{
                value: 2,
                label: 'Large'
            }, {
                value: 1,
                label: 'Medium'
            }, {
                value: 0,
                label: 'Small'
            }];
        }

        function getMaterials() {
            return ['wood', 'steel', 'aluminium'];
        }

        function getMakerDimension() {
            return [{
                label: 'Small',
                value: '100,100'
            }, {
                label: 'Medium',
                value: '150,150'
            }, {
                label: 'Large',
                value: '257,257'
            }];
        }

        function getDistance() {
            return [{
                label: 'Very close (< 5m)',
                value: 1
            }, {
                label: 'Close (< 20m)',
                value: 10
            }, {
                label: 'Near by (100m)',
                value: 100
            }, {
                label: 'Far (500m)',
                value: 500
            }, {
                label: 'Very far away (1 km)',
                value: 1000
            }, {
                label: '5km (developer mode only)',
                value: 5000
            }];
        }

        function updateReward(mediaId, data) {

            var deferred = $q.defer();

            apiService.post('/media/' + mediaId + '/reward/', data, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').factory('productsService', ['$http', '$q', 'apiService', function ($http, $q, apiService) {
        return {
            getProduct: getProduct,
            getProducts: getProducts,
            deleteProduct: deleteProduct,
            updateProduct: updateProduct,
            updateProducts: updateProducts,
            searchExternalProducts: searchExternalProducts,
            createProductFromExternal: createProductFromExternal,
            createProduct: createProduct
        };

        function getProducts(params) {

            var deferred = $q.defer();

            var requestParams = {
                limit: 6,
                offset: 0,
                ordering: 'title'
            };

            if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                if ('limit' in params) {
                    requestParams.limit = params.limit;
                }
                if ('offset' in params) {
                    requestParams.offset = params.offset;
                }
                if ('ordering' in params) {
                    requestParams.ordering = params.ordering;
                }
                if ('title' in params) {
                    requestParams.title = params.title;
                }
            }

            apiService.get('/products/', requestParams, true).then(function (response) {
                console.log('getProducts() success', response);
                deferred.resolve({
                    count: response.count,
                    items: response.results
                });
            }, function (response) {
                console.log('getProducts() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getProduct(productId) {

            var deferred = $q.defer();

            apiService.get('/products/' + productId + '/', false, true).then(function (response) {
                console.log('getProduct() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('getProduct() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function searchExternalProducts(params) {

            var deferred = $q.defer();

            $http({
                url: 'http://search.ulab.com/wrapper/get_data',
                method: 'POST',
                data: {
                    url: 'http://staging.shopide.com/api/v1/products?search=' + encodeURIComponent(params.search) + '&page=' + params.page + '&per=' + params.per,
                    type: 'GET'
                },
                headers: {
                    Accept: 'application/vnd.ulab.v0+json'
                }
            }).then(function (response) {
                console.log('searchExternalProducts() success', response);
                deferred.resolve(JSON.parse(response.data.data));
            }, function (response) {
                console.log('searchExternalProducts() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function deleteProduct(productId) {

            var deferred = $q.defer();

            apiService.delete('/products/' + productId + '/', false, true).then(function (response) {
                console.log('deleteProduct() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('deleteProduct() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function updateProduct(product) {

            var deferred = $q.defer();

            var data = {
                title: product.title,
                url: product.url,
                price: product.price,
                description: product.description
            };

            if (data.url.match(/^http[s]?:\/\//i) === null) {
                data.url = 'http://' + data.url;
            }

            apiService.patch('/products/' + product.id + '/', data, true).then(function (response) {
                console.log('updateProduct() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('updateProduct() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function updateProducts(products) {

            var deferred = $q.defer();

            var promisses = [];

            angular.forEach(products, function (product) {

                var prodDeferred = $q.defer();

                promisses.push(prodDeferred.promise);

                updateProduct(product).then(function (response) {
                    prodDeferred.resolve(response);
                }, function (response) {
                    prodDeferred.reject(response);
                });
            });

            $q.all(promisses).then(function () {
                deferred.resolve();
            });

            return deferred.promise;
        }

        function createProductFromExternal(product) {

            var deferred = $q.defer();

            var data = {
                title: product.title,
                description: product.description,
                price: product.price,
                image_url: product.image_url,
                url: product.url,
                external_id: product.external_id,
                product: product.external_id + '.png'
            };

            if (data.url.match(/^http[s]?:\/\//i) === null) {
                data.url = 'http://' + data.url;
            }

            apiService.post('/products/', data, true).then(function (response) {
                console.log('createProductFromExternal() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('createProductFromExternal() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function createProduct(product) {

            var deferred = $q.defer();

            if (typeof product.id === 'undefined') {
                apiService.postMultiPart('/products/', product, true).then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
            } else {
                apiService.patchMultiPart('/products/' + product.id + '/', product, true).then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        }
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').factory('orderService', ['$http', '$q', 'ulabService', 'apiUlabService', function ($http, $q, ulabService, apiUlabService) {
        return {
            getOrderList: getOrderList,
            updateOrder: updateOrder
        };

        function getOrderList() {
            var deferred = $q.defer();

            apiUlabService.post('/order/list', {}, true).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function updateOrder(params) {
            var deferred = $q.defer();

            apiUlabService.post('/order/update?', params, true).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }]);
})();

/**
 * API kaching
 */

// (function() {
//     'use strict';
//
//     angular.module('panelApp')
//         .factory('orderService', [
//             '$http',
//             '$q',
//             'apiService',
//             function(
//             $http,
//             $q,
//             apiService
//             ) {
//                 return {
//                     getOrderList: getOrderList,
//                     saveOrder: saveOrder
//                 };
//
//                 function getOrderList ( params ) {
//
//                     var deferred = $q.defer();
//
//                     var requestParams = {
//                         page_size: 10,
//                         page: 1,
//                         limit: 10,
//                         offset: 0
//                     };
//
//                     if ( typeof params === 'object' ) {
//                         if ( 'page_size' in params ) {
//                             requestParams.page_size = params.page_size;
//                         }
//                         if ( 'page' in params ) {
//                             requestParams.page = params.page;
//                         }
//                         if ( 'limit' in params ) {
//                             requestParams.limit = params.limit;
//                         }
//                         if ( 'offset' in params ) {
//                             requestParams.offset = params.offset;
//                         }
//                     }
//
//                     apiService.get( '/cart/', requestParams, true ).then(
//                         function( response ) {
//                             deferred.resolve({
//                                 count: response.count,
//                                 orders: response.results,
//                                 next: response.next,
//                                 previous: response.previous
//                             });
//                         },
//                         function( response ) {
//                             deferred.reject( response );
//                         }
//                     );
//
//                     return deferred.promise;
//                 }
//
//                 function saveOrder (order) {
//                     var deferred = $q.defer(),
//                         deferred1 = $q.defer(),
//                         deferred2 = $q.defer();
//
//                     var promisses = [
//                         deferred1.promise,
//                         deferred2.promise
//                     ];
//
//                     if (order) {
//                         saveOrderStatus(order).then(
//                             function (response) {
//                                 deferred1.resolve(response);
//                             },
//                             function (response) {
//                                 deferred1.reject(response)
//                             }
//                         );
//                         saveCartProduct(order.products).then(
//                             function (response) {
//                                 deferred2.resolve(response);
//                             },
//                             function (response) {
//                                 deferred2.reject(response)
//                             }
//                         );
//                     }
//
//                     $q.all( promisses ).then(
//                         function(response) {
//                             deferred.resolve(response);
//                         },
//                         function(response) {
//                             deferred.reject(response);
//                         }
//                     );
//
//                     return deferred.promise;
//                 }
//
//                 function saveOrderStatus (orderData) {
//
//                     var deferred = $q.defer();
//
//                     var data = {
//                         id:                 orderData.id,
//                         shipping_address:   orderData.shipping_address,
//                         process_status:     orderData.process_status,
//                         shipping_zipcode:   orderData.shipping_zipcode,
//                         shipping_city:      orderData.shipping_city,
//                         shipping_phone:     orderData.shipping_phone,
//                         shipping_country:   orderData.shipping_country
//                     };
//
//                     apiService.put('/cart/' + data.id + '/', data, true).then(
//                         function(response) {
//                             deferred.resolve(response);
//                         },
//                         function(response) {
//                             deferred.reject(response);
//                         }
//                     );
//
//                     return deferred.promise;
//                 }
//
//                 function saveCartProduct (orderProduct) {
//
//                     var deferred = $q.defer();
//
//                     var data = {};
//                     data.products = [];
//                     data.products.push(orderProduct);
//
//                     apiService.put('/cart/updateCartProducts/', data, true).then(
//                         function(response) {
//                             deferred.resolve(response);
//                         },
//                         function(response) {
//                             deferred.reject(response);
//                         }
//                     );
//
//                     return deferred.promise;
//                 }
//
//             }
//         ]);
// })();

/**
 *  End API kaching
 */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').factory('applicationsService', ['$q', 'apiService', 'userService', function ($q, apiService, userService) {
        return {
            getApps: getApps,
            deleteApp: deleteApp,
            addApp: addApp,
            updateApp: updateApp,
            getCategories: getCategories
        };
        function getApps(params) {

            var deferred = $q.defer();

            var requestParams = {
                limit: 10,
                offset: 0
            };

            if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                if ('limit' in params) {
                    requestParams.limit = params.limit;
                }
                if ('offset' in params) {
                    requestParams.offset = params.offset;
                }
                if ('name' in params) {
                    requestParams.name = params.name;
                }
                if ('api_key' in params) {
                    requestParams.api_key = params.api_key;
                }
            }

            apiService.get('/applications/', requestParams, true).then(function (data) {
                console.log('getApps() success', data);
                deferred.resolve({
                    count: data.count,
                    items: data.results
                });
            }, function (response) {
                console.log('getApps() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function deleteApp(appId) {

            var deferred = $q.defer();

            apiService.delete('/applications/' + appId + '/', false, true).then(function (data) {
                console.log('deleteApp() success', data);
                deferred.resolve(data);
            }, function (response) {
                console.log('deleteApp() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function addApp(appName, selectedCategories) {

            var deferred = $q.defer();

            userService.getUser().then(function (user) {

                var data = {
                    name: appName,
                    publisher: user.id,
                    app_categories: selectedCategories
                };

                apiService.post('/applications/', data, true).then(function (data) {
                    console.log('addApp() success', data);
                    deferred.resolve(data);
                }, function (response) {
                    console.log('addApp() failure', response);
                    deferred.reject(response);
                });
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function updateApp(id, appName, selectedCategories) {

            var deferred = $q.defer();

            var data = {
                name: appName,
                app_categories: selectedCategories
            };

            apiService.patch('/applications/' + id + '/', data, true).then(function (data) {
                console.log('updateApp() success', data);
                deferred.resolve(data);
            }, function (response) {
                console.log('updateApp() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getCategories(selectedCategories) {

            var deferred = $q.defer();

            apiService.get('/campaigns/categories/', null, true).then(function (response) {

                var categories = [];

                angular.forEach(response, function (name, id) {

                    id = parseInt(id);
                    var item = { id: id, name: name, selected: false };

                    if (typeof selectedCategories !== 'undefined' && selectedCategories.indexOf(id) !== -1) {
                        item.selected = true;
                    }

                    categories.push(item);
                });

                deferred.resolve(categories);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').factory('billingService', ['$q', 'apiService', '$timeout', '$http', 'apiUrl', 'authToken', function ($q, apiService, $timeout, $http, apiUrl, authToken) {
        return {
            getCards: getCards,
            addCard: addCard,
            deleteCard: deleteCard,
            setMainCard: setMainCard,
            getMainCard: getMainCard,
            getClientToken: getClientToken,
            buyCredits: buyCredits,
            getTransactions: getTransactions,
            getInvoicePdf: getInvoicePdf,
            getPaymentRequest: getPaymentRequest,
            getPaymentRequestItem: getPaymentRequestItem,
            updatePaymentRequestItem: updatePaymentRequestItem
        };
        function getCards() {

            var deferred = $q.defer();

            apiService.get('/payments/cards/', false, true).then(function (response) {
                var cards = response.results;
                if (cards.length > 0) {
                    apiService.get('/payments/cards/default/', false, true).then(function (response) {
                        angular.forEach(cards, function (card) {
                            card.default = card.payment_method_id === response.payment_method_id ? true : false;
                        });
                        deferred.resolve(cards);
                    }, function (response) {
                        angular.forEach(cards, function (card) {
                            card.default = false;
                        });
                        deferred.resolve(cards);
                    });
                } else {
                    deferred.resolve(cards);
                }
            }, function (response) {
                console.log('getCards() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function addCard(data) {

            var deferred = $q.defer();

            apiService.post('/payments/cards/', data, true).then(function (response) {
                console.log('addCard() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('addCard() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function deleteCard(id) {

            var deferred = $q.defer();

            apiService.delete('/payments/cards/' + id + '/', false, true).then(function (response) {
                console.log('deleteCard() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('deleteCard() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function setMainCard(id) {

            var deferred = $q.defer();

            apiService.post('/payments/cards/' + id + '/default/', false, true).then(function (response) {
                console.log('setMainCard() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('setMainCard() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getMainCard() {

            var deferred = $q.defer();

            apiService.get('/payments/cards/default/', false, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getClientToken() {

            var deferred = $q.defer();

            apiService.get('/payments/cards/client_token/', false, true).then(function (response) {
                console.log('getClientToken() success', response);
                deferred.resolve(response.client_token);
            }, function (response) {
                console.log('getClientToken() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function buyCredits(paymentMethodId, credits) {

            var deferred = $q.defer();

            var data = {
                credits: credits
            };

            apiService.post('/payments/cards/' + paymentMethodId + '/buy_credits/', data, true).then(function (response) {
                console.log('buyCredits() success', response);
                deferred.resolve(response.client_token);
            }, function (response) {
                console.log('buyCredits() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getTransactions(params) {

            var deferred = $q.defer();

            var requestParams = {
                limit: 10,
                offset: 0,
                ordering: '-id'
            };

            if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                if ('limit' in params) {
                    requestParams.limit = params.limit;
                }
                if ('offset' in params) {
                    requestParams.offset = params.offset;
                }
                if ('start_date' in params) {
                    requestParams.start_date = params.start_date;
                }
                if ('end_date' in params) {
                    requestParams.end_date = params.end_date;
                }
            }

            apiService.get('/payments/transactions/', requestParams, true).then(function (response) {
                console.log('getTransactions() success', response);
                deferred.resolve(response);
            }, function (response) {
                console.log('getTransactions() failure', response);
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getInvoicePdf(transactionId) {

            var deferred = $q.defer();

            var request = {
                method: 'GET',
                responseType: 'blob',
                url: apiUrl + '/payments/transactions/' + transactionId + '/invoice/',
                headers: {
                    'Authorization': 'Token ' + authToken.get(true)
                }
            };

            $http(request).then(function (response) {
                var blob = new Blob([response.data], {
                    type: 'application/pdf'
                });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'kaching_transaction_' + transactionId + '.pdf';
                link.click();
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getPaymentRequest(params) {

            var deferred = $q.defer();

            var requestParams = {
                limit: 10,
                offset: 0,
                ordering: '-id'
            };

            if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                if ('limit' in params) {
                    requestParams.limit = params.limit;
                }
                if ('offset' in params) {
                    requestParams.offset = params.offset;
                }
                if ('start_date' in params) {
                    requestParams.start_date = params.start_date;
                }
                if ('end_date' in params) {
                    requestParams.end_date = params.end_date;
                }
            }

            apiService.get('/payments/admin/withdraw/', requestParams, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getPaymentRequestItem(id) {

            var deferred = $q.defer();

            var requestUrl = '/payments/admin/withdraw/' + id + '/';

            apiService.get(requestUrl, false, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function updatePaymentRequestItem(id, status) {
            var deferred = $q.defer();

            var requestUrl = '/payments/admin/withdraw/' + id + '/status/';

            var param = {
                'status': status
            };

            apiService.patch(requestUrl, param, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').factory('scansService', ['$q', 'apiService', function ($q, apiService) {

        var WITH = '/';

        return {
            getDataOf: get
        };

        function get(taskName, period) {
            switch (period.toLowerCase()) {
                case 'week':
                    period = '?statistic_range=7';
                    break;
                case 'month':
                    period = '?statistic_range=30';
                    break;
                default:
                    break;
            }
            var deferred = $q.defer();
            var params = {};
            var request = '/statistic/';
            request += taskName + WITH + period;
            apiService.get(request, '', true).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').factory('salesService', ['$q', 'apiService', function ($q, apiService) {

        var WITH = '/';

        return {
            getDataOf: get
        };

        function get(taskName, period) {
            switch (period.toLowerCase()) {
                case 'week':
                    period = '?statistic_range=7';
                    break;
                case 'month':
                    period = '?statistic_range=30';
                    break;
                default:
                    break;
            }
            var deferred = $q.defer();
            var params = {};
            var request = '/statistic/';
            request += taskName + WITH + period;
            apiService.get(request, '', true).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('siteNav', function () {
        return {
            restrict: 'AE',
            // replace: true,
            templateUrl: kachingAppConfig.mainMenuTmpls
        };
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('owlCarousel', function () {
        return {
            restrict: 'EA',
            transclude: false,
            link: function link(scope, element, attrs) {
                scope.initCarousel = function () {

                    var defaultOptions = {};
                    var customOptions = scope.$eval(angular.element(element).attr('data-options'));

                    for (var key in customOptions) {
                        if (customOptions.hasOwnProperty(key)) {
                            defaultOptions[key] = customOptions[key];
                        }
                    }

                    var $owl = angular.element(element);
                    $owl.trigger('destroy.owl.carousel');
                    $owl.owlCarousel(defaultOptions);
                    $owl.on('changed.owl.carousel', function (event) {
                        var owlStageOuter = event.currentTarget.children[0];
                        var owlStage = owlStageOuter.children[0];
                        if (event.item.index != null) {
                            if (owlStage.children === undefined) {
                                return;
                            }
                            var owlItem = owlStage.children[event.item.index + 1];
                            if (owlItem !== undefined && owlItem.children.length === 0) {
                                $owl.trigger('prev.owl.carousel');
                            }
                        }
                    });
                };

                scope.destroyCarousel = function () {
                    angular.element(element).owlCarousel('destroy');
                };
            }
        };
    });

    angular.module('panelApp').directive('owlCarouselItem', [function () {
        return {
            restrict: 'A',
            transclude: false,
            link: function link(scope, element) {
                // wait for the last item in the ng-repeat then call init
                if (scope.$last) {
                    scope.initCarousel();
                }
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('campaignProduct', ['utils', function (utils) {
        return {
            restrict: 'A',
            scope: {
                product: '=campaignProduct',
                index: '=productIndex',
                showLabels: '=showLabels',
                onRemove: '&'
            },
            templateUrl: templateDirUri + '/assets/kaching/panel-module/directives/campaignProduct/campaignProductTmpl.html',
            // templateUrl: 'panel-module/directives/campaignProduct/campaignProductTmpl.html',
            controller: ['$scope', function ($scope) {

                $scope.urlRegex = utils.urlRegex();

                $scope.remove = function (index) {
                    $scope.onRemove({ index: index });
                };
            }]
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('ifmUploaderPreviewImage', ['$window', '$parse', function ($window, $parse) {
        var helper = {
            support: !!$window.FileReader,
            isFile: function isFile(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function isImage(file) {
                var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|'.indexOf(type) !== -1;
            },
            isAudio: function isAudio(file) {
                var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|mp3|'.indexOf(type) !== -1;
            },
            isVideo: function isVideo(file) {
                var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|mkv|flv|vob|ogv|ogg|avi|wmv|mpg|m4v|mp4|mov|'.indexOf(type) !== -1;
            }
        };
        return {
            restrict: 'A',
            link: function link(scope, el, attr, ctrl) {

                var reader;

                if (!helper.support) {
                    return;
                }

                scope.$watch(attr.ifmUploaderPreviewImage, function (newValue, oldValue) {
                    if (!newValue) return;
                    if (typeof newValue === 'string' && newValue.length > 0) {
                        var url = $parse(attr.ifmUploaderPreviewImage)(scope);
                        el.css('background-image', 'url(' + url + ')').addClass('image-selected');
                    } else {
                        // check wikitude file -- .wt3
                        if (newValue === undefined || newValue === null || newValue === '') {
                            return;
                        } else if (newValue.type === '' && newValue.name.indexOf('.wt3') > -1) {
                            var newUrl = kachingAppConfig.wpTemplateUri + '/assets/images/wikitude_logo.jpg';
                            el.css('background-image', 'url(' + newUrl + ')').addClass('image-selected');
                        } else if (helper.isAudio(newValue)) {
                            var audioUrl = kachingAppConfig.wpTemplateUri + '/assets/images/audio_icon.jpg';
                            el.css('background-image', 'url(' + audioUrl + ')').addClass('image-selected');
                        } else if (helper.isVideo(newValue)) {
                            var videoUrl = kachingAppConfig.wpTemplateUri + '/assets/images/video-play.png';
                            el.css('background-image', 'url(' + videoUrl + ')').addClass('image-selected');
                        } else {
                            if (!helper.isFile(newValue)) {
                                return;
                            }
                            if (!helper.isImage(newValue)) {
                                return;
                            }
                            reader = new FileReader();
                            reader.onload = function (e) {
                                el.css('background-image', 'url(' + e.target.result + ')').addClass('image-selected');
                            };
                            reader.readAsDataURL(newValue);
                        }
                    }
                });
            }
        };
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').directive('ifmUploaderPreviewVideo', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function link(scope, el, attr, ctrl) {

                scope.$watch(attr.ifmUploaderPreviewVideo, function (newValue, oldValue) {
                    console.log('ifmUploaderPreviewVideo - newValue', newValue);
                    if ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object') {
                        el.addClass('video-selected');
                    }
                });
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    console.log('ifmMin loaded');

    angular.module('panelApp').directive('ifmMin', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function link(scope, el, attr, ctrl) {
                var minVal = parseFloat(attr.ifmMin);
                ctrl.$validators.ifmMin = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    var val = parseFloat(viewValue);
                    if (isNaN(val)) {
                        return false;
                    }
                    return val >= minVal;
                };
            }
        };
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('ifmMax', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function link(scope, el, attr, ctrl) {
                var maxVal = parseFloat(attr.ifmMax);
                ctrl.$validators.ifmMax = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    var val = parseFloat(viewValue);
                    if (isNaN(val)) {
                        return false;
                    }
                    return val <= maxVal;
                };
            }
        };
    });
})();
'use strict';

(function () {
    'use strict';

    console.log('ifmNumber loaded');

    angular.module('panelApp').directive('ifmNumber', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function link(scope, el, attr, ctrl) {
                ctrl.$validators.ifmNumber = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    return !isNaN(parseFloat(viewValue)) && isFinite(viewValue);
                };
            }
        };
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('campaignEditDetails', ['$alert', '$state', '$stateParams', '$filter', 'utils', 'errorHandler', 'campaignsService', function ($alert, $state, $stateParams, $filter, utils, errorHandler, campaignsService) {
        return {
            restrict: 'A',
            scope: {},
            // templateUrl: 'panel-module/directives/campaignEditDetails/campaignEditDetailsTmpl.html',
            templateUrl: templateDirUri + '/assets/kaching/panel-module/directives/campaignEditDetails/campaignEditDetailsTmpl.html',
            controller: function controller($scope) {

                $scope.fieldHasError = utils.fieldHasError;

                $scope.view = {
                    busy: false,
                    submitted: false
                };

                $scope.data = {
                    campaignId: $stateParams.campaignId,
                    campaign: {}
                };

                $scope.daterange = {
                    dates: {
                        startDate: null,
                        endDate: null
                    },
                    min: moment().format('YYYY-MM-DD'),
                    display: 'Select date range'
                };

                var init = function init() {

                    $scope.view.busy = true;

                    campaignsService.getCampaign($scope.data.campaignId).then(function (campaign) {
                        $scope.data.campaign = campaign;

                        if (typeof campaign.start_date !== 'undefined' && typeof campaign.end_date !== 'undefined') {
                            $scope.daterange.dates.startDate = moment.utc(campaign.start_date);
                            $scope.daterange.dates.endDate = moment.utc(campaign.end_date);
                            $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
                        }

                        $scope.view.busy = false;
                    }, function (response) {
                        errorHandler.processApiResponse(response);
                    });
                };

                $scope.$watch(function () {
                    return $scope.daterange.dates;
                }, function (newValue, oldValue) {
                    if (newValue === undefined || newValue.startDate === null || newValue.endDate === null) {
                        return;
                    }
                    $scope.daterange.display = newValue.startDate.format('YYYY-MM-DD') + ' - ' + newValue.endDate.format('YYYY-MM-DD');
                });

                $scope.showErrors = function () {
                    return $scope.view.submitted;
                };

                $scope.saveForm = function () {

                    $scope.view.submitted = true;

                    if ($scope.form1.$valid) {

                        var data = {
                            id: $scope.data.campaignId,
                            name: $scope.data.campaign.name,
                            start_date: moment($scope.daterange.dates.startDate).format('YYYY-MM-DD') + 'T00:00:00.000Z',
                            end_date: moment($scope.daterange.dates.endDate).format('YYYY-MM-DD') + 'T23:59:59.999Z'
                        };

                        console.log('save', data);

                        campaignsService.saveCampagin(data).then(function () {
                            $alert({
                                title: 'Campaign details have been saved.',
                                content: '',
                                container: '#alerts-container',
                                placement: 'top',
                                duration: 3,
                                type: 'success',
                                show: true
                            });
                            campaignsService.setPrepared($scope.data.campaignId);
                        }, function (response) {
                            errorHandler.processApiResponse(response);
                        });
                    }
                };

                $scope.cancelEdit = function () {
                    $state.go('campaigns');
                };

                init();
            }
        };
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').directive('campaignEditTargeting', ['$q', '$alert', '$state', '$stateParams', 'campaignsService', 'errorHandler', 'utils', function ($q, $alert, $state, $stateParams, campaignsService, errorHandler, utils) {
        return {
            restrict: 'A',
            scope: {},
            // templateUrl: 'panel-module/directives/campaignEditTargeting/campaignEditTargetingTmpl.html',
            templateUrl: templateDirUri + '/assets/kaching/panel-module/directives/campaignEditTargeting/campaignEditTargetingTmpl.html',
            controller: function controller($scope) {

                $scope.fieldHasError = utils.fieldHasError;

                $scope.view = {
                    busy: false,
                    showErrors: false,
                    errors: {},
                    ageRanges: []
                };

                $scope.data = {
                    allCategories: true,
                    allLocations: true,
                    categories: [],
                    locations: [],
                    gender: {
                        male: true,
                        female: true
                    },
                    os: {
                        ios: true,
                        android: true
                    },
                    ageRange: undefined
                };

                $scope.campaignId = $stateParams.campaignId;

                var init = function init() {

                    $scope.view.busy = true;

                    campaignsService.getTargeting($scope.campaignId).then(function (response) {
                        $scope.data.allCategories = response.allCategories;
                        $scope.data.allLocations = response.allLocations;
                        $scope.data.categories = response.categories;
                        $scope.data.locations = response.locations;
                        $scope.data.gender = response.gender;
                        $scope.data.os = response.os;
                        $scope.data.ageRange = response.ageRange;
                        $scope.view.ageRanges = response.ageRanges;
                        $scope.view.busy = false;
                    }, function (response) {
                        errorHandler.processApiResponse(response);
                    });
                };

                $scope.saveForm = function () {

                    $scope.view.busy = true;

                    campaignsService.saveTargeting($scope.campaignId, $scope.data).then(function (response) {
                        $scope.view.showErrors = false;
                        $scope.view.busy = false;
                        $alert({
                            title: 'Campaign details have been saved.',
                            content: '',
                            container: '#alerts-container',
                            placement: 'top',
                            duration: 3,
                            type: 'success',
                            show: true
                        });
                        campaignsService.setPrepared($scope.data.campaignId);
                    }, function (response) {
                        $scope.view.busy = false;
                        if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object' && !_.isEmpty(response.validationErrors)) {
                            $scope.view.showErrors = true;
                            $scope.view.errors = response.validationErrors;
                        } else {
                            errorHandler.processApiResponse(response);
                        }
                    });
                };

                $scope.resetError = function (errorName) {
                    if (typeof $scope.view.errors[errorName] !== 'undefined') {
                        delete $scope.view.errors[errorName];
                    }
                };

                $scope.cancelEdit = function () {
                    $state.go('campaigns');
                };

                init();
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('campaignEditBudgeting', ['$alert', '$state', '$stateParams', '$timeout', 'campaignsService', 'errorHandler', 'utils', function ($alert, $state, $stateParams, $timeout, campaignsService, errorHandler, utils) {
        return {
            restrict: 'A',
            scope: {},
            // templateUrl: 'panel-module/directives/campaignEditBudgeting/campaignEditBudgetingTmpl.html',
            templateUrl: templateDirUri + '/assets/kaching/panel-module/directives/campaignEditBudgeting/campaignEditBudgetingTmpl.html',
            controller: function controller($scope) {

                $scope.fieldHasError = utils.fieldHasError;

                $scope.hasBudget = true;

                $scope.view = {
                    busy: false,
                    showCharts: false,
                    submitted: false
                };

                $scope.data = {
                    campaignId: $stateParams.campaignId,
                    budgetId: undefined,
                    budgetType: 'ongoing',
                    bidAmount: undefined,
                    budgetAmount: undefined
                };

                $scope.estViews = {
                    daily: { percentage: 0, min: 0, max: 0 },
                    total: { percentage: 0, min: 0, max: 0 }
                };

                $scope.estDailyViewsChart = {
                    data: [$scope.estViews.daily.percentage, 100 - $scope.estViews.daily.percentage],
                    labels: ['', ''],
                    colours: ['#f9cd3f', '#dae2e5'],
                    options: {
                        animationEasing: 'easeOutQuart',
                        showTooltips: false,
                        segmentShowStroke: false,
                        percentageInnerCutout: 85
                    }
                };

                $scope.estTotalViewsChart = {
                    data: [$scope.estViews.total.percentage, 100 - $scope.estViews.total.percentage],
                    labels: ['', ''],
                    colours: ['#343b45', '#dae2e5'],
                    options: {
                        animationEasing: 'easeOutQuart',
                        showTooltips: false,
                        segmentShowStroke: false,
                        percentageInnerCutout: 85
                    }
                };

                var mapBudgetType = function mapBudgetType(type) {
                    var types = ['ongoing', 'fixed', 'daily'];
                    if (typeof type === 'number') {
                        return types[type - 1];
                    } else if (typeof type === 'string') {
                        type = types.indexOf(type);
                        return type + 1;
                    }
                };

                var init = function init() {

                    $scope.view.busy = true;

                    campaignsService.getCampaignBudget($scope.data.campaignId).then(function (response) {
                        if (typeof response === 'undefined') {
                            $scope.hasBudget = false;
                        } else {
                            // $scope.data.budgetId = response.id;
                            // $scope.data.bidAmount = response.cost_per_view;
                            // $scope.data.budgetAmount = response.amount;
                            // $scope.data.budgetType = mapBudgetType( response.type );
                            if (response.results && response.results[0]) {
                                var data = response.results[0];
                                $scope.data.budgetId = data.id;
                                $scope.data.bidAmount = data.cost_per_view;
                                $scope.data.budgetAmount = data.amount;
                                $scope.data.budgetType = mapBudgetType(data.type);
                            }
                        }
                        $scope.view.busy = false;
                        updateEstimatedViews();
                    }, function (response) {
                        errorHandler.processApiResponse(response);
                    });
                };

                $scope.changedBid = function () {
                    updateEstimatedViews();
                };

                function updateEstimatedViews() {
                    if (typeof $scope.data.bidAmount === 'undefined') {
                        $scope.estViews = {
                            daily: { percentage: 0, min: 0, max: 0 },
                            total: { percentage: 0, min: 0, max: 0 }
                        };
                        updateCharts();
                        $scope.view.showCharts = true;
                    } else {
                        campaignsService.getEstimatedViews($scope.data.campaignId, $scope.data.bidAmount).then(function (response) {
                            $scope.estViews = response;
                            updateCharts();
                            $scope.view.showCharts = true;
                        }, function (response) {
                            errorHandler.processApiResponse(response);
                        });
                    }
                }

                function updateCharts() {
                    $scope.estDailyViewsChart.data = [$scope.estViews.daily.percentage, 100 - $scope.estViews.daily.percentage];
                    $scope.estTotalViewsChart.data = [$scope.estViews.total.percentage, 100 - $scope.estViews.total.percentage];
                }

                $scope.showErrors = function () {
                    return $scope.view.submitted;
                };

                $scope.saveForm = function () {

                    $scope.view.submitted = true;

                    if ($scope.form1.$valid) {

                        var data = {
                            cost_per_view: $scope.data.bidAmount,
                            amount: $scope.data.budgetAmount,
                            type: mapBudgetType($scope.data.budgetType)
                        };

                        if ($scope.data.budgetType === 'ongoing') {
                            data.amount = 0;
                        }

                        campaignsService.saveCampaignBudget($scope.data.campaignId, data, $scope.hasBudget, $scope.data.budgetId).then(function (response) {
                            $alert({
                                title: 'Campaign details have been saved.',
                                content: '',
                                container: '#alerts-container',
                                placement: 'top',
                                duration: 3,
                                type: 'success',
                                show: true
                            });

                            campaignsService.setPrepared($scope.data.campaignId);
                        }, function (response) {
                            errorHandler.processApiResponse(response);
                        });
                    }
                };

                $scope.cancelEdit = function () {
                    $state.go('campaigns');
                };

                init();
            }
        };
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').directive('campaignEditMedia', ['$state', '$stateParams', '$alert', '$sce', 'apiUrl', 'utils', '$modal', 'errorHandler', 'mediaService', 'campaignsService', function ($state, $stateParams, $alert, $sce, apiUrl, utils, $modal, errorHandler, mediaService, campaignsService) {
        return {
            restrict: 'A',
            scope: {},
            templateUrl: templateDirUri + '/assets/kaching/panel-module/directives/campaignEditMedia/campaignEditMediaTmpl.html',
            // templateUrl: 'panel-module/directives/campaignEditMedia/campaignEditMediaTmpl.html',
            controller: function controller($scope) {

                $scope.fieldHasError = utils.fieldHasError;
                $scope.videogular = { sources: [] };
                $scope.videogularApi = null;

                $scope.view = {
                    loading: false,
                    submitted: false,
                    loadingMedia: false,
                    mediaLoaded: false,
                    playerReady: false,
                    videoSet: false
                };

                $scope.data = {
                    campaignId: $stateParams.campaignId,
                    campaign: {},
                    media: {},
                    mediaTitle: '',
                    mediaDesc: ''
                };

                $scope.externalLink = null;

                var init = function init() {

                    $scope.view.loading = true;
                    campaignsService.getCampaign($scope.data.campaignId).then(function (campaign) {
                        $scope.data.campaign = campaign;
                        if (campaign.media.length > 0 && _typeof(campaign.media[0]) === 'object') {
                            $scope.data.media = campaign.media[0];
                            $scope.data.mediaTitle = campaign.media[0].media_title;
                            $scope.data.mediaDesc = campaign.media[0].media_description;
                        }
                        $scope.view.loading = false;

                        if (hasVideo()) {
                            $scope.view.mediaLoaded = true;
                            if ($scope.view.playerReady) {
                                $scope.setVideo();
                            }
                        }
                    });
                };

                function hasVideo() {
                    if (typeof $scope.data.media.video === 'string' || typeof $scope.data.media.video_external_link === 'string') {
                        return true;
                    } else {
                        return false;
                    }
                }

                $scope.hasMedia = function () {
                    if (Object.getOwnPropertyNames($scope.data.media).length === 0) {
                        return false;
                    } else {
                        return true;
                    }
                };

                $scope.onPlayerReady = function (API) {
                    $scope.view.playerReady = true;
                    $scope.videogularApi = API;
                    if (hasVideo() && !$scope.view.videoSet) {
                        $scope.setVideo();
                    }
                };

                $scope.setVideo = function () {
                    $scope.videogularApi.stop();

                    var videoLink = $scope.data.media.video || $scope.data.media.video_external_link;
                    if ($scope.data.media.video === null) {
                        $scope.externalLink = $sce.trustAsResourceUrl(videoLink);
                    } else {
                        $scope.videogular.sources = [{ src: $sce.trustAsResourceUrl(videoLink), type: 'video/mp4' }];
                    }

                    $scope.view.videoSet = true;
                };

                $scope.showMediaLibrary = function () {
                    var options = {
                        submit: function submit(selectedMedia) {
                            $scope.getMedia(selectedMedia.id);
                        }
                    };
                    $modal({
                        templateUrl: templateDirUri + '/assets/kaching/panel-module/components/mediaLibraryModal/modalTmpl.html',
                        // templateUrl: 'panel-module/components/mediaLibraryModal/modalTmpl.html',
                        controller: 'mediaLibraryModalCtrl',
                        animation: 'am-fade-and-scale',
                        resolve: {
                            modalOptions: function modalOptions() {
                                return options;
                            }
                        }
                    });
                };

                $scope.showNewMediaDialog = function () {
                    var options = {
                        mode: 'campaignEditor',
                        submit: function submit(mediaId) {
                            console.log('mediaId', mediaId);
                            $scope.getMedia(mediaId);
                        }
                    };
                    $modal({
                        templateUrl: templateDirUri + '/assets/kaching/panel-module/components/newMediaModal/modalTmpl.html',
                        // templateUrl: 'panel-module/components/newMediaModal/modalTmpl.html',
                        controller: 'newMediaModalCtrl',
                        animation: 'am-fade-and-scale',
                        backdrop: 'static',
                        resolve: {
                            modalOptions: function modalOptions() {
                                return options;
                            }
                        }
                    });
                };

                $scope.getMedia = function (mediaId) {
                    $scope.view.loadingMedia = true;
                    $scope.view.mediaLoaded = false;
                    mediaService.getMediaItem(mediaId).then(function (media) {
                        $scope.data.media = media;
                        $scope.setVideo();
                        $scope.view.loadingMedia = false;
                        $scope.view.mediaLoaded = true;
                    }, function () {
                        $scope.view.loadingMedia = false;
                    });
                };

                $scope.showErrors = function () {
                    return $scope.view.submitted;
                };

                $scope.saveForm = function () {

                    $scope.view.submitted = true;

                    if ($scope.form1.$valid) {

                        var mediaData = {
                            campaignId: $scope.data.campaignId,
                            media: $scope.data.media.id,
                            media_title: $scope.data.mediaTitle,
                            media_description: $scope.data.mediaDesc
                        };

                        console.log('save : mediaData', mediaData);

                        campaignsService.saveMedia(mediaData).then(function () {
                            $alert({
                                title: 'Campaign details have been saved.',
                                content: '',
                                container: '#alerts-container',
                                placement: 'top',
                                duration: 3,
                                type: 'success',
                                show: true
                            });
                            campaignsService.setPrepared($scope.data.campaignId);
                        }, function (response) {
                            errorHandler.processApiResponse(response);
                        });
                    }
                };

                $scope.cancelEdit = function () {
                    $state.go('campaigns');
                };

                init();
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('campaignEditProducts', ['$state', '$stateParams', '$alert', '$sce', 'apiUrl', 'utils', '$modal', 'errorHandler', 'productsService', 'campaignsService', function ($state, $stateParams, $alert, $sce, apiUrl, utils, $modal, errorHandler, productsService, campaignsService) {
        return {
            restrict: 'A',
            scope: {},
            // templateUrl: 'panel-module/directives/campaignEditProducts/campaignEditProductsTmpl.html',
            templateUrl: templateDirUri + '/assets/kaching/panel-module/directives/campaignEditProducts/campaignEditProductsTmpl.html',
            controller: function controller($scope) {

                $scope.fieldHasError = utils.fieldHasError;
                $scope.videogular = { sources: [] };
                $scope.videogularApi = null;

                $scope.view = {
                    loading: false,
                    submitted: false,
                    loadingMedia: false,
                    mediaLoaded: false,
                    playerReady: false,
                    videoSet: false
                };

                $scope.data = {
                    campaignId: $stateParams.campaignId,
                    campaign: {},
                    products: []
                };

                var init = function init() {

                    $scope.view.loading = true;
                    campaignsService.getCampaign($scope.data.campaignId).then(function (campaign) {
                        $scope.data.campaign = campaign;
                        if (campaign.products.length > 0) {
                            $scope.data.products = campaign.products;
                        }
                        $scope.view.loading = false;
                    });
                };

                $scope.hasProducts = function () {
                    return !_.isEmpty($scope.data.products);
                };

                $scope.removeProduct = function (index) {
                    $scope.data.products.splice(index, 1);
                    return;
                };

                $scope.showErrors = function () {
                    return $scope.view.submitted;
                };

                $scope.showProductsLibrary = function () {
                    var options = {
                        submit: function submit(selectedProduct) {
                            $scope.data.products.unshift(selectedProduct);
                        }
                    };
                    $modal({
                        // templateUrl: 'panel-module/components/producstLibraryModal/modalTmpl.html',
                        templateUrl: templateDirUri + '/assets/kaching/panel-module/components/producstLibraryModal/modalTmpl.html',
                        controller: 'producstLibraryModalCtrl',
                        animation: 'am-fade-and-scale',
                        resolve: {
                            modalOptions: function modalOptions() {
                                return options;
                            }
                        }
                    });
                };

                $scope.showNewProductDialog = function () {
                    var options = {
                        mode: 'campaignEditor',
                        submit: function submit(newProduct) {
                            console.log('newProduct', newProduct);
                            $scope.data.products.unshift(newProduct);
                        }
                    };
                    $modal({
                        // templateUrl: 'panel-module/components/newProductModal/modalTmpl.html',
                        templateUrl: templateDirUri + '/assets/kaching/panel-module/components/newProductModal/modalTmpl.html',
                        controller: 'newProductModalCtrl',
                        animation: 'am-fade-and-scale',
                        backdrop: 'static',
                        resolve: {
                            modalOptions: function modalOptions() {
                                return options;
                            }
                        }
                    });
                };

                $scope.saveForm = function () {

                    $scope.view.submitted = true;

                    if ($scope.form1.$valid) {

                        console.log('save : data', $scope.data.campaignId, $scope.data.products);

                        productsService.updateProducts($scope.data.products).then(function () {
                            campaignsService.saveProducts($scope.data.campaignId, $scope.data.products).then(function (response) {
                                $alert({
                                    title: 'Campaign details have been saved.',
                                    content: '',
                                    container: '#alerts-container',
                                    placement: 'top',
                                    duration: 3,
                                    type: 'success',
                                    show: true
                                });

                                campaignsService.setPrepared($scope.data.campaignId);
                            }, function (response) {
                                errorHandler.processApiResponse(response);
                            });
                        }, function (response) {
                            errorHandler.processApiResponse(response);
                        });
                    }
                };

                $scope.cancelEdit = function () {
                    $state.go('campaigns');
                };

                init();
            }
        };
    }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('panelApp').directive('campaignActionSettings', ['$state', '$stateParams', '$timeout', 'campaignsService', 'errorHandler', 'utils', function ($state, $stateParams, $timeout, campaignsService, errorHandler, utils) {
    return {
      restrict: 'E',
      scope: {
        data: '=injectedData'
      },
      templateUrl: templateDirUri + '/assets/kaching/panel-module/directives/campaignActionSettings/campaignActionSettingsTmpl.html',
      controller: function controller($scope) {}
    };
  }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('adDollars', ['$state', '$stateParams', '$timeout', 'campaignsService', 'errorHandler', 'utils', function ($state, $stateParams, $timeout, campaignsService, errorHandler, utils) {
        return {
            restrict: 'E',
            scope: {
                medias: '=',
                campaign: '=',
                selectedMedia: '='
            },
            templateUrl: templateDirUri + '/assets/kaching/panel-module/directives/adDollars/adDollarsTmpl.html',
            link: function link(scope, ele, attrs) {
                ele.on('click', '.media-preview-collapsed', function () {
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
            controller: function controller($scope) {
                $scope.grandTotal = 0;
                $scope.increaseRewardSetting = function ($event, media, setting, value) {
                    $event.stopPropagation();
                    media.reward[setting] = 1 * value + 1;
                    $scope.updateAmount();
                    $scope.updateMediaItem(media);
                };
                $scope.decreaseRewardSetting = function ($event, media, setting, value) {
                    $event.stopPropagation();
                    if (media.reward[setting] > 0) {
                        media.reward[setting] = 1 * value - 1;
                        $scope.updateAmount();
                        $scope.updateMediaItem(media);
                    }
                };

                $scope.increaseSetting = function ($event, campaign, setting, value) {
                    $event.stopPropagation();
                    campaign[setting] = 1 * value + 1;
                    $scope.updateAmount();
                    $scope.updateMediaItem(campaign);
                };
                $scope.decreaseSetting = function ($event, campaign, setting, value) {
                    $event.stopPropagation();
                    if (campaign[setting] > 0) {
                        campaign[setting] = 1 * value - 1;
                        $scope.updateAmount();
                        $scope.updateMediaItem(campaign);
                    }
                };
                $scope.updateAmount = function () {
                    $scope.grandTotal = 0;

                    angular.forEach($scope.medias, function (value, key) {
                        $scope.grandTotal += 1 * value.bets_per_view;

                        var totalSetting = 0;

                        // totalSetting = totalSetting + 1*value.reward.send_information;
                        totalSetting = totalSetting + 1 * value.reward.share;
                        totalSetting = totalSetting + 1 * value.reward.product;

                        $scope.grandTotal += totalSetting;
                    });

                    if ($scope.campaign) {
                        $scope.grandTotal += 1 * $scope.campaign.register;
                    }
                };
                $scope.updateMediaItem = function (media) {
                    media.subTotal = 1 * media.bets_per_view;
                    // media.subTotal += (1*media.reward.send_information);
                    media.subTotal += 1 * media.reward.share;
                    media.subTotal += 1 * media.reward.product;
                };
                $scope.toggleSelectedMedia = function (media) {
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
                $scope.removeProduct = function (media, product) {
                    product.selected = false;
                    media.products = _.without(media.products, _.findWhere(media.products, { id: product.id }));
                };

                $scope.stopEvent = function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                };
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('productList', ['productsService', 'errorHandler', function (productsService, errorHandler) {
        return {
            restrict: 'E',
            scope: {
                selectedMedia: '='
            },
            templateUrl: templateDirUri + '/assets/kaching/panel-module/directives/productList/productListTmpl.html',
            controller: function controller($scope, errorHandler, productsService) {
                var itemsPerPage = 8;

                $scope.view = {
                    busyProduct: true,
                    currentPage: 1,
                    productsCount: 0,
                    products: [],
                    maxSize: 10,
                    searchPhrase: '',
                    searchInput: '',
                    orderByOptions: [{
                        'value': 'name',
                        'label': 'Order by title'
                    }, {
                        'value': '-date_added',
                        'label': 'Newest first'
                    }],
                    orderBy: '-date_added',
                    itemsPerPage: itemsPerPage,
                    selectItem: false
                };

                $scope.search = function () {
                    $scope.view.currentPage = 1;
                    $scope.view.searchPhrase = $scope.view.searchInput;
                    getProducts();
                };

                $scope.changePage = function () {
                    getProducts();
                };

                $scope.toggleItem = function (item) {
                    if (!$scope.selectedMedia.products) {
                        $scope.selectedMedia.products = [];
                    }
                    if (item.selected) {
                        item.selected = false;
                        $scope.selectedMedia.products = _.without($scope.selectedMedia.products, _.findWhere($scope.selectedMedia.products, { id: item.id }));
                    } else {
                        item.selected = true;
                        $scope.selectedMedia.products.push(item);
                    }
                };

                var init = function init() {
                    getProducts();
                };

                var mapSelectedProduct = function mapSelectedProduct() {
                    if ($scope.view.products && $scope.view.products.length > 0) {
                        $scope.view.products.forEach(function (item) {
                            item.selected = false;
                        });

                        if ($scope.selectedMedia && $scope.selectedMedia.products && $scope.selectedMedia.products.length > 0) {
                            $scope.selectedMedia.products.forEach(function (item) {
                                var matchedItem = _.findWhere($scope.view.products, { id: item.id });
                                if (matchedItem) {
                                    matchedItem.selected = true;
                                }
                            });
                        }
                    }
                };

                function getProducts(argsObj) {

                    var params = {
                        limit: itemsPerPage,
                        offset: itemsPerPage * ($scope.view.currentPage - 1),
                        ordering: $scope.view.orderBy
                    };

                    if ($scope.view.searchPhrase.length > 0) {
                        params.title = $scope.view.searchPhrase;
                    }

                    $scope.view.busyProduct = true;
                    productsService.getProducts(params).then(function (products) {
                        $scope.view.productsCount = products.count;
                        $scope.view.products = products.items;
                        $scope.view.busyProduct = false;
                        mapSelectedProduct();
                    }, function (response) {
                        $scope.view.busyProduct = false;
                        errorHandler.processApiResponse(response);
                        $scope.$hide();
                    });
                }

                init();

                $scope.$watch('selectedMedia', function (newVal, oldVal) {
                    if (newVal) {
                        mapSelectedProduct();
                    }
                });
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('arPreview', ['errorHandler', 'utils', '$sce', function (errorHandler, utils, $sce) {
        return {
            restrict: 'E',
            scope: {
                media: '='
            },
            templateUrl: templateDirUri + '/assets/kaching/panel-module/directives/arPreview/arPreviewTmpl.html',
            link: function link(scope, ele, attrs) {},
            controller: function controller($scope) {
                $scope.arType = false;

                $scope.$watch('media', function (newVal, oldVal) {
                    if (!newVal) {
                        $scope.arType = false;
                        return false;
                    }

                    var previewItem = newVal.ar_resource;
                    if (!newVal.ar_resource) {
                        previewItem = newVal.target;
                    }

                    $scope.arType = utils.getArType(previewItem);

                    if ($scope.arType === false) {
                        return false;
                    }

                    $scope.arResource = previewItem;

                    if ($scope.arType == 'video') {
                        $scope.arResource = $sce.trustAsResourceUrl(previewItem);
                    }

                    if ($scope.arType == 'audio') {
                        $scope.arResource = $sce.trustAsResourceUrl(previewItem);
                    }
                });
            }
        };
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').directive('cropperImage', ['$uibModal', function ($uibModal) {
        var cropperModal;

        return {
            restrict: 'E',
            scope: {
                imageNeedCrop: '=',
                canvasName: '='
            },
            templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/panel-module/directives/cropper-image/cropper-image.html',
            link: function link(scope, element, attr) {
                scope.canvas = document.getElementsByTagName('CANVAS')[0];
                scope.$watch('imageNeedCrop', function (newValue, preValue) {
                    // scope.hasImage = scope.imageNeedCrop ? true : false;
                    if (!scope.imageNeedCrop) {
                        scope.hasImage = false;
                    } else {
                        if (_typeof(scope.imageNeedCrop) === 'object') {
                            if (scope.imageNeedCrop.type.indexOf('image') > -1) {
                                scope.hasImage = true;
                            } else {
                                scope.hasImage = false;
                            }
                        } else {
                            if (typeof scope.imageNeedCrop === 'string' && scope.imageNeedCrop.indexOf('data:image') > -1) {
                                scope.hasImage = true;
                            } else {
                                var type = '|' + scope.imageNeedCrop.slice(scope.imageNeedCrop.lastIndexOf('.') + 1) + '|';
                                scope.hasImage = '|jpg|png|jpeg|'.indexOf(type) !== -1;
                            }
                        }
                    }
                });
                scope.openCropper = function () {
                    var imageNeedCrop = scope.imageNeedCrop;
                    openModal(imageNeedCrop, scope);
                };
                scope.closeModal = closeModal;
            }
        };

        function openModal(imageNeedCrop, scope) {
            cropperModal = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/panel-module/directives/cropper-image/image-cropper-modal/image-cropper-modal.html',
                controller: 'cropperImageController',
                scope: scope
            });
            cropperModal.rendered.then(function () {

                function getRectangleCanvas(sourceCanvas) {
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    var width = sourceCanvas.width;
                    var height = sourceCanvas.height;
                    context.imageSmoothingEnabled = true;

                    canvas.width = width;
                    canvas.height = height;

                    context.drawImage(sourceCanvas, 0, 0, width, height);
                    context.globalCompositeOperation = 'destination-in';
                    context.beginPath();
                    context.rect(0, 0, width, height);
                    context.fill();

                    return canvas;
                }

                var image = document.getElementById('image');

                if (typeof imageNeedCrop === 'string') {
                    if (image.src.indexOf('base64') === -1) {
                        image.src += '?cache=false';
                    }
                    init();
                } else {
                    if ((typeof imageNeedCrop === 'undefined' ? 'undefined' : _typeof(imageNeedCrop)) === 'object') {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            image.src = e.target.result;
                            init();
                        };
                        reader.readAsDataURL(imageNeedCrop);
                    }
                }

                function init() {
                    var cropButton = document.getElementById('crop-button');
                    var saveButton = document.getElementById('save-button');
                    var cancelButton = document.getElementById('cancel-button');

                    var result = document.getElementById('result');
                    var minAspectRatio = 0.5;
                    var maxAspectRatio = 1.5;

                    var cropper = new window.Cropper(image, {
                        ready: function ready() {
                            var cropper = this.cropper;
                            var containerData = cropper.getContainerData();
                            var cropBoxData = cropper.getCropBoxData();
                            var aspectRatio = cropBoxData.width / cropBoxData.height;
                            var newCropBoxWidth;

                            if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
                                newCropBoxWidth = cropBoxData.height * ((minAspectRatio + maxAspectRatio) / 2);

                                cropper.setCropBoxData({
                                    left: (containerData.width - newCropBoxWidth) / 2,
                                    width: newCropBoxWidth
                                });
                            }
                        },
                        cropmove: function cropmove() {
                            var cropper = this.cropper;
                            var cropBoxData = cropper.getCropBoxData();
                            var aspectRatio = cropBoxData.width / cropBoxData.height;

                            if (aspectRatio < minAspectRatio) {
                                cropper.setCropBoxData({
                                    width: cropBoxData.height * minAspectRatio
                                });
                            } else if (aspectRatio > maxAspectRatio) {
                                cropper.setCropBoxData({
                                    width: cropBoxData.height * maxAspectRatio
                                });
                            }
                        }
                    });

                    cropButton.onclick = function () {
                        var croppedCanvas;
                        var rectangleCanvas;
                        var rectangleImage;
                        // Crop
                        croppedCanvas = cropper.getCroppedCanvas();

                        // Rectangle
                        rectangleCanvas = getRectangleCanvas(croppedCanvas);

                        // Show
                        rectangleImage = document.createElement('img');
                        rectangleImage.src = rectangleCanvas.toDataURL();
                        result.innerHTML = '';
                        result.appendChild(rectangleImage);
                    };

                    cancelButton.onclick = function () {
                        closeModal();
                    };

                    saveButton.onclick = function () {
                        scope.imageNeedCrop = result.childNodes[0].src;
                        closeModal();
                    };
                };
            });
        }

        function closeModal() {
            cropperModal.close();
        }
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('cropperImageController', ['$scope', 'kachingZonesHelpers', '$uibModal', function ($scope, kachingZonesHelpers, $uibModal) {}]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').filter('campaignStatus', function () {
        return function (statusCode) {
            var statusMap = ['Incomplete', 'Billing', // campaign that was created but the payment has to been yet processed
            'Prepared', // campaign created and waiting to go LIVE in their planned lottery
            'Live', // campaign currently available in KaChing
            'Completed', 'Stopped'];
            return statusMap[parseInt(statusCode)];
        };
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').filter('transactionStatus', function () {
        return function (statusCode) {
            var statusMap = ['Pending', 'Completed', 'Failed'];
            return statusMap[parseInt(statusCode) - 1];
        };
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').filter('transactionType', function () {
        return function (code) {
            var statusMap = ['One time pay'];
            return statusMap[parseInt(code) - 1];
        };
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').filter('budgetType', function () {
        return function (type) {
            var types = ['Ongoing', 'Fixed', 'Daily'];
            return types[type - 1];
        };
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').filter('trustUrl', ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').filter('mediaType', function () {

        var isAudio = function isAudio(fileType) {
            var type = '|' + fileType + '|';
            return '|mp3|'.indexOf(type) !== -1;
        };

        var isVideo = function isVideo(fileType) {
            var type = '|' + fileType + '|';
            return '|mkv|flv|vob|ogv|ogg|avi|wmv|mpg|m4v|mp4|mov|'.indexOf(type) !== -1;
        };

        var isWikiTude = function isWikiTude(fileType) {
            var type = '|' + fileType + '|';
            return '|wt3|'.indexOf(type) !== -1;
        };

        var audioUrl = kachingAppConfig.wpTemplateUri + '/assets/images/audio_icon.jpg';
        var videoUrl = kachingAppConfig.wpTemplateUri + '/assets/images/video-play.png';
        var wikiTudeUrl = kachingAppConfig.wpTemplateUri + '/assets/images/wikitude_logo.jpg';

        return function (media) {

            if (!media) {
                return;
            }

            var mediaType = media.substr(media.lastIndexOf('.') + 1);

            if (isVideo(mediaType)) {
                return videoUrl;
            }

            if (isAudio(mediaType)) {
                return audioUrl;
            }

            if (isWikiTude(mediaType)) {
                return wikiTudeUrl;
            }

            return media;
        };
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').filter('paymentRequestStatus', function () {
        return function (statusCode) {
            var statusMap = ['Pending', 'Completed', 'Cancel'];
            return statusMap[parseInt(statusCode) - 1];
        };
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').filter('orderHistoryFilter', ['$window', function ($window) {
        return function (items, from, to, orderNo, buyerName) {
            var fromDate = new Date(from).getTime();
            var toDate = new Date(to).getTime();
            var dataFilterDate = from && to ? items.filter(function (item) {
                var itemTime = new Date(item.date.split(' ')[0]).getTime();
                return itemTime >= fromDate && itemTime <= toDate;
            }) : items;

            var dataFilterOrder = orderNo ? dataFilterDate.filter(function (item) {
                return item.orderNumber.indexOf(orderNo) > -1 ? true : false;
            }) : dataFilterDate;

            var dataFilterBuyer = buyerName ? dataFilterOrder.filter(function (item) {
                return item.buyer.toLowerCase().indexOf(buyerName.toLowerCase()) > -1 ? true : false;
            }) : dataFilterOrder;

            var filteredData = dataFilterBuyer;
            return filteredData;
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('advertisementsCtrl', ['$scope', '$alert', '$modal', 'errorHandler', 'advertisementEditorService', 'campaignsService', function ($scope, $alert, $modal, errorHandler, advertisementEditorService, campaignsService) {
        var itemsPerPage = 10;
        $scope.view = {
            initialLoadComplete: false,
            itemsPerPage: itemsPerPage,
            currentPage: 1,
            maxSize: 10,
            filtersActive: false,
            advertTypes: []
        };

        // $scope.view.statusFilterModel = $scope.view.advertTypes[0];

        $scope.data = {
            campaignsCount: 0,
            campaigns: []
        };

        $scope.filters = {};

        $scope.daterange = {
            dates: {
                startDate: null,
                endDate: null
            },
            min: moment().format('YYYY-MM-DD')
        };

        var init = function init() {
            initFilters();
            getAdvertList();
        };

        function initFilters() {
            $scope.filters = {
                name: '',
                client: '',
                media_title: '',
                start_date: '',
                end_date: '',
                status: undefined
            };
        }

        $scope.changePage = function () {
            getAdvertList();
        };

        $scope.reloadCampaigns = function () {
            $scope.view.currentPage = 1;
            getAdvertList();
        };

        function getAdvertList(argsObj) {

            var params = {
                limit: itemsPerPage,
                offset: itemsPerPage * ($scope.view.currentPage - 1)
            };

            if ($scope.filters.name.length > 0) {
                params.name = $scope.filters.name;
            }
            if ($scope.filters.client.length > 0) {
                params.client = $scope.filters.client;
            }
            if ($scope.filters.media_title.length > 0) {
                params.media_title = $scope.filters.media_title;
            }
            if ($scope.filters.start_date.length > 0) {
                params.start_date = $scope.filters.start_date;
            }
            if ($scope.filters.end_date.length > 0) {
                params.end_date = $scope.filters.end_date;
            }
            if (typeof $scope.filters.status !== 'undefined') {
                params.status = $scope.filters.status;
            }

            advertisementEditorService.getAdvertismentsByCategory().then(function (data) {
                var newArrays = [];
                var firstItem = { 'id': 0, 'name': 'All', 'visibility': true };
                newArrays.push(firstItem);

                for (var i = 0; i < data.results.length; i++) {
                    newArrays.push(data.results[i]);
                }

                $scope.view.advertTypes = newArrays;

                if ($scope.view.statusFilterModel === undefined) {
                    $scope.view.statusFilterModel = newArrays[0];
                }

                if ($scope.view.statusFilterModel.id === 0) {
                    advertisementEditorService.getAdvertisments().then(function (data) {
                        updateAdvertList(data);
                    });
                } else {
                    advertisementEditorService.getAdvertismentsByCategoryId($scope.view.statusFilterModel.id).then(function (data) {
                        updateAdvertList(data);
                    });
                }

                $scope.view.initialLoadComplete = true;
            });
        }

        function updateAdvertList(data) {
            var arrays = [];

            for (var i = 0; i < data.length; i++) {
                var categoryResults = data[i].items;

                for (var j = 0; j < categoryResults.length; j++) {
                    arrays.push(categoryResults[j]);
                }
            }

            $scope.data.advertListCount = arrays.length;
            $scope.data.advertList = arrays;
        }

        // var deleteCampaign = function( advert ) {
        //     var name = campaign.name;
        //     advertisementEditorService.deleteAdvert( advert.id ).then(
        //         function() {
        //             $alert({
        //                 title: 'Advertisement deleted.',
        //                 content: 'Advertisement '' + name + '' has been deleted.',
        //                 container: '#alerts-container',
        //                 placement: 'top',
        //                 duration: 3,
        //                 type: 'success',
        //                 show: true
        //             });
        //             getAdvertList();
        //         },
        //         function( response ) {
        //             errorHandler.processApiResponse( response );
        //         }
        //     );
        // };

        function deleteAdvert(advert) {
            var name = advert.name;
            advertisementEditorService.deleteAdvert(advert.id).then(function () {
                $alert({
                    title: 'Advertisement deleted.',
                    content: 'Advertisement "' + name + '" has been deleted.',
                    container: '#alerts-container',
                    placement: 'top',
                    duration: 3,
                    type: 'success',
                    show: true
                });
                getAdvertList();
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        }

        $scope.startCampaign = function (campaign) {
            var name = campaign.name;
            campaignsService.startCampaign(campaign.id).then(function () {

                $alert({
                    title: 'Advertisement started.',
                    content: 'Advertisement "' + name + '" is now live.',
                    container: '#alerts-container',
                    placement: 'top',
                    duration: 3,
                    type: 'success',
                    show: true
                });

                getAdvertList();
            }, function (response) {

                var processingError = _.findWhere(response.data.errorDetails.logicProcessing.processingErrors, { code: 3 });

                if (typeof processingError !== 'undefined') {
                    $alert({
                        title: 'Incorrect advert settings.',
                        content: 'Please review your advertisement settings then start the advertisement!',
                        container: '#alerts-container',
                        placement: 'top',
                        duration: 3,
                        type: 'danger',
                        show: true
                    });
                } else {
                    errorHandler.processApiResponse(response);
                }
            });
        };

        var _stopCampaign = function _stopCampaign(campaign) {
            var name = campaign.name;
            campaignsService.stopCampaign(campaign.id).then(function () {
                $alert({
                    title: 'Advertisement stopped.',
                    content: 'Advertisement "' + name + '" has been stopped.',
                    container: '#alerts-container',
                    placement: 'top',
                    duration: 3,
                    type: 'success',
                    show: true
                });
                getAdvertList();
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        $scope.showAdvertDetails = function (_advertId) {
            $modal({
                // templateUrl: 'panel-module/components/campaignDetailsModal/modalTmpl.html',
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/advertDetailsModal/modalTmpl.html',
                controller: 'advertDetailsModalCtrl',
                animation: 'am-fade-and-scale',
                resolve: {
                    advertId: function advertId() {
                        return _advertId;
                    }
                }
            });
        };

        $scope.showDeleteAdvertDialog = function (_advert) {
            var options = {
                delete: function _delete(advert) {
                    deleteAdvert(advert);
                }
            };
            $modal({
                // templateUrl: 'panel-module/components/campaignDeleteModal/modalTmpl.html',
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/advertDeleteModal/modalTmpl.html',
                controller: 'advertDeleteModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    },
                    advert: function advert() {
                        return _advert;
                    }
                }
            });
        };

        $scope.checkCampaignActive = function (e, campaign) {
            e.preventDefault();
            if (campaign.status === 3) {
                $scope.showStopCampaignDialog(campaign);
            } else if (campaign.status === 5) {
                $scope.startCampaign(campaign);
            }
        };

        $scope.showStopCampaignDialog = function (_campaign) {
            var _callbacks = {
                stopCampaign: function stopCampaign(campaign) {
                    console.log('stop advertisement', campaign);
                    _stopCampaign(campaign);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/advertStopModal/modalTmpl.html',
                controller: 'advertStopModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    callbacks: function callbacks() {
                        return _callbacks;
                    },
                    campaign: function campaign() {
                        return _campaign;
                    }
                }
            });
        };

        $scope.updateFilters = function () {
            $scope.filters.status = $scope.view.statusFilterModel.id === 0 ? undefined : $scope.view.statusFilterModel.id;
            $scope.reloadCampaigns();
        };

        $scope.$watch('daterange.dates.startDate', function (newValue, oldValue) {
            if (newValue === null) {
                return;
            }
            $scope.filters.start_date = moment($scope.daterange.dates.startDate).format('YYYY-MM-DD');
            $scope.filters.end_date = moment($scope.daterange.dates.endDate).format('YYYY-MM-DD');
            $scope.updateFilters();
        });

        $scope.toggleFilters = function () {
            if ($scope.view.filtersActive) {
                $scope.clearFilters();
            } else {
                $scope.view.filtersActive = true;
            }
        };

        $scope.clearFilters = function () {
            $scope.view.filtersActive = false;
            initFilters();
            $scope.reloadCampaigns();
        };

        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('editAdvertisementCtrl', ['$scope', '$state', '$stateParams', 'advertisementEditorService', '$modal', 'mediaService', '$sce', 'utils', 'errorHandler', function ($scope, $state, $stateParams, advertisementEditorService, $modal, mediaService, $sce, utils, errorHandler) {

        // $scope.fieldHasError = utils.fieldHasError;

        $scope.daterange = {
            dates: {
                startDate: null,
                endDate: null
            },
            min: moment().format('YYYY-MM-DD'),
            display: 'Select date range'
        };

        $scope.advertisement = {
            id: undefined,
            name: undefined,
            start_date: undefined,
            end_date: undefined
        };

        $scope.data = {
            allCategories: true,
            categories: []
        };

        $scope.view = {
            busy: false,
            busyMedia: false,
            mediaLoaded: false,
            playerReady: false,
            videoSet: false
        };

        $scope.externalLink = null;
        $scope.videogularApi = null;
        $scope.videogular = { sources: [] };

        $scope.showMediaLibrary = function () {
            var options = {
                submit: function submit(selectedMedia) {
                    $scope.getMedia(selectedMedia.id);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/mediaLibraryModal/modalTmpl.html',
                // templateUrl: 'panel-module/components/mediaLibraryModal/modalTmpl.html',
                controller: 'mediaLibraryModalCtrl',
                animation: 'am-fade-and-scale',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    }
                }
            });
        };

        $scope.showNewMediaDialog = function () {
            var options = {
                mode: 'campaignEditor',
                submit: function submit(mediaId) {
                    console.log('mediaId', mediaId);
                    $scope.getMedia(mediaId);
                }
            };
            $modal({
                templateUrl: templateDirUri + '/assets/kaching/panel-module/components/newMediaModal/modalTmpl.html',
                // templateUrl: 'panel-module/components/newMediaModal/modalTmpl.html',
                controller: 'newMediaModalCtrl',
                animation: 'am-fade-and-scale',
                backdrop: 'static',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    }
                }
            });
        };

        var hasVideo = function hasVideo() {
            // if ( typeof $scope.media.video === 'string' ) {
            if (typeof $scope.media.video === 'string' || typeof $scope.media.video_external_link === 'string') {
                return true;
            } else {
                return false;
            }
        };

        $scope.hasMedia = function () {
            // if ( Object.getOwnPropertyNames( $scope.media ).length === 0 ) {
            //     return false;
            // } else {
            //     return true;
            // }
            return _.isEmpty($scope.media) ? false : true;
        };

        $scope.getMedia = function (mediaId) {
            $scope.view.busyMedia = true;
            mediaService.getMediaItem(mediaId).then(function (mediaItem) {
                $scope.media = mediaItem;
                $scope.view.busyMedia = false;
                $scope.setVideo();
                $scope.view.mediaLoaded = true;
            }, function () {
                $scope.view.busyMedia = false;
            });
        };

        $scope.updateDataModel = function (e, obj) {
            e.preventDefault();
            obj.selected = !obj.selected;
        };

        $scope.showErrors = function () {
            // return editor.stepGet('step4', 'submitted');
            return true;
        };

        $scope.onPlayerReady = function (API) {
            $scope.videogularApi = API;
            if (hasVideo() && !$scope.view.videoSet) {
                $scope.setVideo();
            }
        };

        $scope.setVideo = function () {

            $scope.videogularApi.stop();

            var videoLink = $scope.media.video || $scope.media.video_external_link;
            if ($scope.media.video === null) {
                $scope.externalLink = $sce.trustAsResourceUrl(videoLink);
            } else {
                $scope.videogular.sources = [{ src: $sce.trustAsResourceUrl(videoLink), type: 'video/mp4' }];
            }

            $scope.view.videoSet = true;
        };

        $scope.finish = function () {

            if ($scope.advertisement.id === undefined) {
                if ($scope.form1.$valid) {
                    console.log(true);

                    $scope.advertisement.start_date = moment($scope.daterange.dates.startDate).format('YYYY-MM-DD') + 'T00:00:00.000Z';
                    $scope.advertisement.end_date = moment($scope.daterange.dates.endDate).format('YYYY-MM-DD') + 'T23:59:59.999Z';

                    advertisementEditorService.saveAdvertisement($scope.advertisement).then(function (response) {
                        console.log(response);
                        $scope.advertisement.id = response.id;
                        // update categories
                        updateCategories();
                    }, function (response) {
                        errorHandler.processApiResponse(response);
                    });
                } else {
                    console.log(false);
                }
            } else {
                // pass step 1: advertisement existed
                // update categories and media
                updateCategories();
            }
        };

        function updateCategories() {
            advertisementEditorService.updateCategories($scope.advertisement.id, $scope.data).then(function (response) {
                updateMedia();
            }, function (response) {
                // $scope.view.busy = false;
                // editor.stepSet('step2', 'valid', false);
                if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object' && !_.isEmpty(response.validationErrors)) {
                    $scope.view.showErrors = true;
                    $scope.view.errors = response.validationErrors;
                } else {
                    errorHandler.processApiResponse(response);
                }
            });
        }

        function updateMedia() {

            if ($scope.form3.$valid) {
                if ($scope.media.id) {
                    var mediaData = {
                        media: $scope.media.id,
                        media_title: $scope.media.media_title,
                        media_description: $scope.media.media_description
                    };

                    advertisementEditorService.updateMedia($scope.advertisement.id, mediaData).then(function (response) {
                        $state.go('advertisements');
                    }, function (response) {
                        // $scope.view.busy = false;
                        // editor.stepSet('step2', 'valid', false);
                        if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object' && !_.isEmpty(response.validationErrors)) {
                            $scope.view.showErrors = true;
                            $scope.view.errors = response.validationErrors;
                        } else {
                            errorHandler.processApiResponse(response);
                        }
                    });
                }
            }
        }

        var initNew = function initNew() {
            $scope.advertTitle = 'New Advertisement';

            if (typeof $scope.advertisement.start_date !== 'undefined' && typeof $scope.advertisement.end_date !== 'undefined') {
                $scope.daterange.dates.startDate = moment($scope.advertisement.start_date);
                $scope.daterange.dates.endDate = moment($scope.advertisement.end_date);
                $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
            }

            // $scope.view.busy = false;

            advertisementEditorService.getCategories().then(function (response) {
                $scope.data.allCategories = response.allCategories;
                $scope.data.categories = response.categories;
            }, function (response) {
                errorHandler.processApiResponse(response);
            });

            // $scope.media = editor.dataGet('media');

            $scope.media = {};
        };

        var initUpdate = function initUpdate() {
            $scope.view.busy = true;
            $scope.advertTitle = 'Update Advertisement';

            $scope.media = {};

            advertisementEditorService.getCategories().then(function (response) {
                $scope.data.allCategories = response.allCategories;
                $scope.data.categories = response.categories;

                // get advert
                advertisementEditorService.getAdvertisments($stateParams.advertId).then(function (advert) {
                    if (typeof advert.start_date !== 'undefined' && typeof advert.end_date !== 'undefined') {
                        $scope.daterange.dates.startDate = moment(advert.start_date);
                        $scope.daterange.dates.endDate = moment(advert.end_date);
                        $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
                    }

                    $scope.view.mediaLoaded = false;

                    if (advert.media.length > 0) {
                        $scope.media = advert.media[0];
                        $scope.setVideo();
                        $scope.view.mediaLoaded = true;
                    }

                    $scope.advertisement = advert;

                    angular.forEach($scope.data.categories, function (category) {
                        category.selected = false;
                        angular.forEach(advert.category, function (item) {
                            if (item.id === category.id) {
                                category.selected = true;
                            }
                        });
                    });

                    $scope.data.allCategories = advert.category.length > 0 ? false : true;
                }, function (response) {
                    $scope.view.busy = false;
                    errorHandler.processApiResponse(response);
                    $scope.$hide();
                });
                // end of get advert
            }, function (response) {
                errorHandler.processApiResponse(response);
            });
        };

        var init = function init() {
            if ($stateParams.advertId) {
                initUpdate();
            } else {
                initNew();
            }
        };

        $scope.$watch(function () {
            return $scope.daterange.dates;
        }, function (newValue, oldValue) {
            if (newValue === undefined || newValue.startDate === null || newValue.endDate === null) {
                return;
            }
            $scope.daterange.display = newValue.startDate.format('YYYY-MM-DD') + ' - ' + newValue.endDate.format('YYYY-MM-DD');
        });

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('format', ['$filter', function ($filter) {
        return {
            require: '?ngModel',
            link: function link(scope, elem, attrs, ctrl) {
                if (!ctrl) {
                    return;
                }

                ctrl.$formatters.unshift(function (a) {
                    return $filter(attrs.format)(ctrl.$modelValue);
                });

                ctrl.$parsers.unshift(function (viewValue) {
                    var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                    elem.val($filter(attrs.format)(plainNumber));
                    return plainNumber;
                });
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').factory('advertisementEditorService', ['$q', 'apiService', function ($q, apiService) {
        return {
            getAdvertisments: getAdvertisments,
            getAdvertismentsByCategory: getAdvertismentsByCategory,
            getAdvertismentsByCategoryId: getAdvertismentsByCategoryId,
            getCategories: getCategories,
            saveAdvertisement: saveAdvertisement,
            updateCategories: updateCategories,
            updateMedia: updateMedia,
            deleteAdvert: deleteAdvert
        };
        function getAdvertisments(advertId) {
            var deferred = $q.defer();
            var url = '/advertisement/';

            if (advertId) {
                url = url + advertId + '/';
            }

            apiService.get(url, null, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getAdvertismentsByCategory() {
            var deferred = $q.defer();

            apiService.get('/advertisement/category/', null, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getAdvertismentsByCategoryId(id) {
            var deferred = $q.defer();

            apiService.get('/advertisement/?category=' + id, null, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function getCategories(selectedCategories) {

            var deferred = $q.defer();

            apiService.get('/advertisement/category/', null, true).then(function (response) {

                var allCategories = true;
                var categories = [];

                angular.forEach(response.results, function (name, id) {

                    name.selected = true;
                    categories.push(name);
                });

                deferred.resolve({
                    allCategories: allCategories,
                    categories: categories
                });
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function saveAdvertisement(advertisement) {

            var deferred = $q.defer();

            if (typeof advertisement.id === 'undefined') {
                apiService.post('/advertisement/', advertisement, true).then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        }

        function updateCategories(advertisementId, settings) {

            var deferred = $q.defer();
            var data = {};
            var error = {
                validationErrors: {}
            };

            // Categories
            data.app_categories = [];
            angular.forEach(settings.categories, function (category) {
                if (settings.allCategories === true || category.selected === true) {
                    data.app_categories.push(category.id);
                }
            });
            if (data.app_categories.length === 0) {
                error.validationErrors.categories = true;
            }

            if (_.isEmpty(error.validationErrors)) {
                // Save data in the backend
                //  http://127.0.0.1:8080/cms-api/advertisement/1/category/
                apiService.patch('/advertisement/' + advertisementId + '/category/', data.app_categories, true).then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
            } else {
                deferred.reject(error);
            }

            return deferred.promise;
        }

        function updateMedia(advertisementId, media) {

            var deferred = $q.defer();

            // Categories
            apiService.patch('/advertisement/' + advertisementId + '/media/', media, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function deleteAdvert(advertId) {

            var deferred = $q.defer();

            //http://54.179.156.207/cms-api/advertisement/9
            apiService.delete('/advertisement/' + advertId + '/', false, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').factory('kachingZonesHelpers', ['$q', 'apiService', '$alert', '$anchorScroll', '$location', function ($q, apiService, $alert, $anchorScroll, $location) {
        return {
            clearForm: clearForm,
            alert: alert,
            resetAngularFields: resetAngularFields,
            clearFileUploader: clearFileUploader,
            getMediaPreviewFromUrl: getMediaPreviewFromUrl,
            scrollToFirstError: scrollToFirstError,
            preventDefaultByPressingEnter: preventDefaultByPressingEnter
        };

        function clearForm() {
            angular.element('input[type="text"], textarea').val(null);
            var imageElements = angular.element('.image-selected');
            angular.forEach(imageElements, function (imageElement) {
                if (imageElement.style.backgroundImage) {
                    imageElement.style.backgroundImage = null;
                }
            });
            imageElements.removeClass('image-selected');
        }

        function alert(type, title) {
            $alert({
                title: title,
                content: '',
                container: '#alerts-container',
                placement: 'top-right',
                duration: 3,
                type: type,
                show: true
            });
        }

        function resetAngularFields(scope) {
            return true;
            for (var key in scope) {
                if (scope.hasOwnProperty(key)) {
                    if (typeof scope[key] === 'string') {
                        scope[key] = '';
                    }
                    if (key === 'data') {
                        for (var item in scope[key]) {
                            if (scope[key].hasOwnProperty(item)) {
                                scope[key][item] = null;
                            }
                        }
                    }
                }
            }
        }

        function clearFileUploader(selector) {
            angular.element(selector).removeClass('image-selected');
            angular.element(selector).removeAttr('style');
        }

        function isAudio(fileType) {
            var type = '|' + fileType + '|';
            return '|mp3|'.indexOf(type) !== -1;
        }

        function isVideo(fileType) {
            var type = '|' + fileType + '|';
            return '|mkv|flv|vob|ogv|ogg|avi|wmv|mpg|m4v|mp4|mov|'.indexOf(type) !== -1;
        }

        function isWikiTude(fileType) {
            var type = '|' + fileType + '|';
            return '|wt3|'.indexOf(type) !== -1;
        }

        function getMediaPreviewFromUrl(media) {
            var audioUrl = kachingAppConfig.wpTemplateUri + '/assets/images/audio_icon.jpg';
            var videoUrl = kachingAppConfig.wpTemplateUri + '/assets/images/video-play.png';
            var wikiTudeUrl = kachingAppConfig.wpTemplateUri + '/assets/images/wikitude_logo.jpg';

            if (!media) {
                return;
            }

            var mediaType = media.substr(media.lastIndexOf('.') + 1);

            if (isVideo(mediaType)) {
                return videoUrl;
            }

            if (isAudio(mediaType)) {
                return audioUrl;
            }

            if (isWikiTude(mediaType)) {
                return wikiTudeUrl;
            }

            return media;
        }

        function scrollToFirstError(scope) {
            if (scope.form1.$error.required && scope.form1.$error.required[0]) {
                var elementName = scope.form1.$error.required[0].$name;
                var firstErrorId = document.getElementsByName(elementName)[0].id;
                $location.hash(firstErrorId);
                $anchorScroll();
            }
        }

        function preventDefaultByPressingEnter() {
            document.getElementById('form1').onkeypress = function (e) {
                var key = e.charCode || e.keyCode || 0;
                if (key === 13) {
                    e.preventDefault();
                }
            };
        }
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('billboardsCtrl', ['$scope', '$state', '$stateParams', 'campaignEditorService', '$timeout',
    // 'campaignId',
    // 'viewDetail',
    'kachingZonecampaignEditorService', 'campaignsService', '$q', 'utils', function ($scope, $state, $stateParams, campaignEditorService, $timeout,
    // campaignId,
    // viewDetail,
    kachingZonecampaignEditorService, campaignsService, $q, utils) {
        var editor = kachingZonecampaignEditorService;

        $scope.logData = function () {
            editor.logData();
        };

        var campaignId = $stateParams.campaignId;
        var viewDetail = utils.getViewDetail() || $state.current.name === 'kaching.campaigns.view';

        editor.init(campaignId);

        $scope.step = 1;

        if (viewDetail) {
            $scope.step = 4;
            $scope.viewDetail = viewDetail;
        }

        $scope.progress = 1;
        $scope.balance = undefined;
        $scope.availableCoin = undefined;
        $scope.selectedCountry = undefined;
        $scope.isCreated = false;
        $scope.countryList = [];

        if (campaignId !== undefined) {
            $scope.editId = campaignId;
            $scope.loadEditMode = false;
            $scope.progress = 4;
        } else {
            $scope.createMode = true;
        }

        var templateFolder = kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/billboards/steps/';
        $scope.billboardsStep = {
            step1: templateFolder + 'step1.html',
            step2: templateFolder + 'step2.html',
            step3: templateFolder + 'step3.html',
            step4: templateFolder + 'step4.html'
        };

        $scope.goNext = function () {
            $scope.step += 1;
            $scope.progress += 1;
        };

        $scope.goPrev = function () {
            $scope.step -= 1;
        };

        $scope.updateStep = function (newVal) {
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

        $scope.updateCreated = function () {
            $scope.isCreated = true;
        };

        $scope.activateCampaign = function () {
            var deferred = $q.defer();
            var campaignStatus = editor.dataGet('campaignStatus');
            // var campaign = editor.dataGet('campaign');
            var campaignId = editor.dataGet('campaignId');

            campaignsService.getCampaign(campaignId).then(function (data) {
                if (data.media && data.media.length > 0) {
                    if (campaignStatus === 'start' || campaignStatus === false || !$scope.editId && !campaignStatus) {
                        $scope.campaignId = editor.dataGet('campaignId');
                        campaignsService.setPrepared($scope.campaignId).then(function (response) {
                            deferred.resolve(response);
                        }, function (response) {
                            deferred.reject(response);
                        });
                    }
                } else {
                    deferred.reject();
                }
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        $scope.showMapFunds = function () {
            $scope.isShowMapFunds = true;
        };

        $scope.hideMapFunds = function () {
            $timeout(function () {
                $scope.isShowMapFunds = false;
            }, 1000);
        };

        $scope.updateBalance = function (value) {
            $scope.balance = value;
            $scope.updateAvailableCoin();
        };

        $scope.updateSelectedCountry = function (value) {
            $scope.selectedCountry = value;
            $scope.updateAvailableCoin();
        };

        $scope.updateAvailableCoin = function () {
            if ($scope.balance && $scope.selectedCountry) {
                var rate = $scope.selectedCountry.rate_exchange;
                if (rate && rate == 0) {
                    rate = 1;
                }
                $scope.availableCoin = Math.floor($scope.balance / rate);
            }
        };

        $scope.updateCountryList = function (value) {
            $scope.countryList = value;
        };

        $scope.campaignType = '';
        $scope.updateCampaignType = function (value) {

            if (value === 'billboard') {
                $scope.campaignType = 'billboard';
            }

            if (value === 'in_store') {
                $scope.campaignType = 'instore';
            }

            if (value === 'magazine') {
                $scope.campaignType = 'magazine ads';
            }

            if (value === 'radio') {
                $scope.campaignType = 'radio ads';
            }

            if (value === 'tv-ads') {
                $scope.campaignType = 'tv ads';
            }
        };
        $scope.goToFund = function (modal) {
            $scope.$broadcast('fund-broadcast');
            // modal.$hide();
            $state.go('funds');
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('step1Ctrl', ['$scope', '$state', '$stateParams', 'apiUrl', 'authToken', 'errorHandler', 'campaignEditorService', 'utils', 'FileUploader', 'campaignsService', '$q', '$http', '$location', '$anchorScroll', 'kachingZonesHelpers', 'kachingZonecampaignEditorService', 'userService', '$uibModal', function ($scope, $state, $stateParams, apiUrl, authToken, errorHandler, campaignEditorService, utils, FileUploader, campaignsService, $q, $http, $location, $anchorScroll, kachingZonesHelpers, kachingZonecampaignEditorService, userService, $uibModal) {
        var helper = kachingZonesHelpers;
        // var editor = campaignEditorService;
        var editor = kachingZonecampaignEditorService;

        if (!$state.params.campaignId) {
            $scope.campaignId = utils.getCampaignId();
        } else {
            $scope.campaignId = $state.params.campaignId;
        }

        $scope.view = {
            busy: true
        };
        $scope.fieldHasError = utils.fieldHasError;

        $scope.campaignTypes = [{ value: 'billboard', label: 'Billboard' }, { value: 'in_store', label: 'Instore Campaign' }, { value: 'magazine', label: 'Magazine Ads' }, { value: 'radio', label: 'Radio Ads' }, { value: 'tv-ads', label: 'Tv Ads' }];

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/media/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });

        var imageFilter = { imageFilter: ['image/png', 'image/jpg', 'image/jpeg'] };

        utils.addUploaderTypeFilter(uploader, 'customerLogo', imageFilter);
        utils.addUploaderTypeFilter(uploader, 'backgroundImage', imageFilter);

        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            if (newItem.alias === 'customerLogo') {
                $scope.campaign.logo_image = newItem._file;
            }
            if (newItem.alias === 'backgroundImage') {
                $scope.campaign.header_image = newItem._file;
            }
        };

        $scope.campaign = {};
        $scope.targeting = {};
        $scope.budgeting = {};
        $scope.daterange = {
            dates: {
                startDate: null,
                endDate: null
            },
            min: moment().format('YYYY-MM-DD'),
            display: 'Select date range'
        };

        $scope.data = {
            campaign: $scope.campaign,
            targeting: $scope.targeting,
            budgeting: $scope.budgeting,
            daterange: $scope.daterange
        };
        $scope.hasBudget = false;

        // campaign status
        // INCOMPLETE = 0
        // BILLING = 1
        // PREPARED = 2
        // LIVE = 3
        // COMPLETED = 4
        // STOPPED = 5
        $scope.campaignStatus = {
            status: 'start'
        };

        var initCampaign = function initCampaign() {
            var deferred = $q.defer();
            if ($scope.editId !== undefined) {
                campaignsService.getCampaign($scope.editId).then(function (campaign) {
                    $scope.campaign = campaign;
                    $scope.campaign.logo_image = campaign.logo_image;
                    $scope.campaign.header_image = campaign.header_image;
                    $scope.campaign.client = campaign.client;
                    $scope.campaign.description = campaign.description;
                    $scope.campaign.spentCoins = campaign.spent;
                    $scope.campaign.remainningCoins = campaign.fund - campaign.spent;

                    if (typeof $scope.campaign.start_date !== 'undefined' && typeof $scope.campaign.end_date !== 'undefined') {
                        $scope.daterange.dates = {
                            startDate: moment($scope.campaign.start_date),
                            endDate: moment($scope.campaign.end_date)
                        };
                        $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
                    }
                    // $scope.campaign.type = 'billboard';
                    $scope.selectedCampaignType = _.findWhere($scope.campaignTypes, { value: $scope.campaign.type });
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            } else {
                $scope.campaign = editor.dataGet('campaign');
                if (typeof $scope.campaign.start_date !== 'undefined' && typeof $scope.campaign.end_date !== 'undefined') {
                    $scope.daterange.dates.startDate = moment($scope.campaign.start_date);
                    $scope.daterange.dates.endDate = moment($scope.campaign.end_date);
                    $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
                }
                // if ($scope.campaign.id) {
                //     $scope.editId = $scope.campaign.id;
                // }
                // $scope.campaign.type = 'billboard';
                if ($scope.campaign.type) {
                    $scope.selectedCampaignType = _.findWhere($scope.campaignTypes, { value: $scope.campaign.type });
                } else {
                    $scope.selectedCampaignType = $scope.campaignTypes[0];
                }
                deferred.resolve();
            }
            return deferred.promise;
        };

        var initTargetings = function initTargetings() {
            var deferred = $q.defer();
            var targetingData = editor.dataGet('targeting');
            if (!_.isEmpty(targetingData)) {
                $scope.targeting = targetingData;
                $scope.selectedLocation = $scope.targeting.locations;
                $scope.locations = $scope.targeting.locationList;
                $scope.locations = _.sortBy($scope.locations, function (o) {
                    return o.short_name;
                });
                $scope.updateCountryList($scope.locations);
                deferred.resolve();
            } else {
                var id = $scope.editId || undefined;
                campaignsService.getTargeting(id).then(function (response) {
                    $scope.targeting.categories = response.categories;
                    $scope.locations = response.locations;
                    $scope.locations = _.sortBy($scope.locations, function (o) {
                        return o.short_name;
                    });
                    $scope.updateCountryList($scope.locations);
                    $scope.selectedLocation = response.selectedCountry;
                    $scope.updateSelectedCountry($scope.selectedLocation);
                    $scope.targeting.gender = response.gender;
                    $scope.targeting.os = response.os;
                    $scope.targeting.ageRange = response.ageRange;
                    $scope.targeting.ageRanges = response.ageRanges;
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };
        var initBudgeting = function initBudgeting() {
            var deferred = $q.defer();
            var budgetingData = editor.dataGet('budgeting');
            if (!_.isEmpty(budgetingData)) {
                $scope.budgeting = budgetingData;
                $scope.hasBudget = true;
            } else {
                if ($scope.editId) {
                    campaignsService.getCampaignBudget($scope.editId).then(function (data) {
                        $scope.budgeting = data.results[0];
                        $scope.hasBudget = true;
                        deferred.resolve();
                    }, function (response) {
                        errorHandler.processApiResponse(response);
                        deferred.reject();
                    });
                }
            }
            deferred.resolve();
            return deferred.promise;
        };
        var initBalance = function initBalance() {
            var deferred = $q.defer();
            userService.getBalance().then(function (response) {
                $scope.balance = response.credits_balance / response.cash_to_credits_conversion_ratio;
                console.log('balance: ', $scope.balance);
                $scope.updateBalance($scope.balance);
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };
        var initData = function initData() {
            var deferred = $q.defer();
            var deferred1 = $q.defer();
            var deferred2 = $q.defer();
            var deferred3 = $q.defer();
            var deferred4 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise, deferred3.promise, deferred4.promise];

            initCampaign().then(function () {
                $scope.updateCampaignType($scope.campaign.type);
                deferred1.resolve();
            }, function () {
                deferred1.reject();
            });
            initTargetings().then(function () {
                deferred2.resolve();
            }, function () {
                deferred2.reject();
            });
            initBudgeting().then(function () {
                deferred3.resolve();
            }, function () {
                deferred3.reject();
            });

            initBalance().then(function () {
                deferred4.resolve();
            }, function () {
                deferred4.reject();
            });

            $q.all(promisses).then(function () {
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var init = function init() {
            $scope.selectedCountry = null;
            editor.currentStep(1);
            editor.previousState(1);
            $scope.fundError = false;

            $scope.catAccordionStatus = {
                open: true
            };

            $scope.countriesAccordionStatus = {
                open: true
            };

            $scope.view.busy = true;
            initData().then(function () {
                if ($scope.editId) {
                    $scope.campaign.id = $scope.editId;
                    // $scope.hasBudget = true;
                }
                $scope.view.busy = false;
            }, function () {
                $scope.view.busy = false;
            });
        };

        $scope.changeStatusGender = function (isMale) {
            if (!$scope.targeting.gender.male && !$scope.targeting.gender.female) {
                if (isMale) {
                    $scope.targeting.gender.male = true;
                } else {
                    $scope.targeting.gender.female = true;
                }
                helper.alert('danger', 'Please choose at least one Gender.');
            }
        };

        $scope.changeStatusOS = function (iOS) {
            if (!$scope.targeting.os.ios && !$scope.targeting.os.android) {
                if (iOS) {
                    $scope.targeting.os.ios = true;
                } else {
                    $scope.targeting.os.android = true;
                }
                helper.alert('danger', 'Please choose at least one OS.');
            }
        };

        $scope.$watch(function () {
            return $scope.daterange.dates;
        }, function (newValue, oldValue) {
            if (newValue === undefined || newValue.startDate === null || newValue.endDate === null) {
                return;
            }
            $scope.daterange.display = newValue.startDate.format('YYYY-MM-DD') + ' - ' + newValue.endDate.format('YYYY-MM-DD');
        });
        $scope.showErrors = function () {
            return editor.stepGet('step1', 'submitted');
        };

        $scope.scrollToFirstError = function () {
            if (angular.element('.has-error').length > 0) {
                var firstErrorId = angular.element('.has-error')[0].id;

                // angular.element()
                $location.hash(firstErrorId);
                $anchorScroll();
            }
        };

        $scope.nextStep = function () {
            editor.stepSet('step1', 'submitted', true);

            editor.dataSet('campaignStatus', $scope.campaignStatus.status);
            if ($scope.form1.$valid) {
                $scope.view.busy = true;
                editor.stepSet('step1', 'valid', true);

                $scope.campaign.start_date = $scope.daterange.dates.startDate.toISOString();
                $scope.campaign.end_date = $scope.daterange.dates.endDate.toISOString();

                $scope.campaign.client = 'test';
                $scope.campaign.type = $scope.selectedCampaignType.value;
                // update fund
                var total = 1 * $scope.campaign.spentCoins + 1 * $scope.campaign.remainningCoins;
                var newFund = 1 * $scope.campaign.fund - total;

                $scope.campaign.newFund = newFund;
                editor.dataSet('campaign', $scope.campaign);

                $scope.targeting.locations = $scope.selectedLocation;
                $scope.targeting.locationList = $scope.locations;
                editor.dataSet('targeting', $scope.targeting);
                editor.dataSet('selectedCountry', $scope.selectedCountry);

                // dummy budgeting data - TODO: replace this with real data
                if ($scope.editId === undefined && !$scope.hasBudget) {
                    $scope.budgeting = {
                        cost_per_view: 12,
                        amount: 0,
                        type: 1
                    };
                }
                $scope.budgeting.hasBudget = $scope.hasBudget;

                editor.dataSet('budgeting', $scope.budgeting);

                $scope.fundError = false;
                editor.save('step1').then(function (data) {
                    $scope.goNext();
                    $scope.view.busy = false;
                    if ($scope.editId !== undefined && editor.stepGet('step1', 'submitted')) {
                        helper.alert('success', 'Campaign has been updated.');
                    } else {
                        helper.alert('success', 'Campaign has been created.');
                    }
                    // $scope.activateCampaign();
                    $scope.updateCreated();
                }, function (response) {
                    if (response.status === 400 && response.data.errorDetails.logicProcessing.processingErrors[0].code === 44) {
                        helper.alert('danger', response.data.errorDetails.logicProcessing.processingErrors[0].message);
                        $scope.fundError = true;
                    } else {
                        errorHandler.processApiResponse(response);
                    }
                    $scope.view.busy = false;
                    console.log('create campaign error');
                });
            } else {
                editor.stepSet('step1', 'valid', false);
                if (angular.element('.ng-invalid').length > 0) {
                    angular.element('.ng-invalid').focus();
                }
                if (angular.element('.image-error').length > 0) {
                    angular.element('.image-error').focus();
                }
                setTimeout(function () {
                    $scope.scrollToFirstError();
                }, 100);
            }
        };
        $scope.logControllerData = function () {
            console.log('campaignEditorStep1Ctrl - campaign', angular.copy($scope.campaign));
        };

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.nextStep();
            }
        });

        $scope.$watch('selectedLocation', function (newValue, oldValue) {
            console.log(newValue);
            $scope.updateSelectedCountry(newValue);
        });

        //
        // var url = 'http://ipinfo.io?callback=jsonp_callback';
        // debugger;
        // $http.jsonp(url).
        //     success(function(data, status, headers, config) {
        //         //what do I do here?
        //         debugger;
        //     }).
        //     error(function(data, status, headers, config) {
        //         // $scope.error = true;
        //         debugger;
        //     });
        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('step2Ctrl', ['$scope', '$state', 'apiUrl', 'authToken', 'utils', 'mediaService', 'FileUploader', 'countryService', 'campaignEditorService', 'campaignsService', '$http', '$q', 'errorHandler', '$anchorScroll', '$location', 'kachingZonesHelpers', 'kachingZonecampaignEditorService', function ($scope, $state, apiUrl, authToken, utils, mediaService, FileUploader, countryService, campaignEditorService, campaignsService, $http, $q, errorHandler, $anchorScroll, $location, kachingZonesHelpers, kachingZonecampaignEditorService) {
        var editor = kachingZonecampaignEditorService;
        var helper = kachingZonesHelpers;
        var kachingCrownIconUrl = kachingAppConfig.wpTemplateUri + '/assets/images/crowblackedit.png';
        var kachingCrownIconStyle = 'background-image: url("' + kachingCrownIconUrl + '")';

        $scope.onlyNumbers = /^\d+$/;
        $scope.urlRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;

        helper.preventDefaultByPressingEnter();
        $scope.formSummited = false;
        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/media/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });
        var geocodePosition = function geocodePosition(marker) {
            marker.icon.url = $scope.updateLogoIcon();
            $scope.position = marker.getPosition();
            $scope.$apply();
            $scope.geocoder.geocode({
                latLng: $scope.position
            }, function (responses) {
                if (responses && responses.length > 0) {
                    $scope.address = responses[0].formatted_address;
                } else {
                    $scope.address = 'Cannot determine address at this location.';
                }
                var dumpImage = '/wp-content/themes/kaching3/assets/images/billboards/media-thumb.png';
                var dumpLogo = '/wp-content/themes/kaching3/assets/images/logo.png';
                var mapPopup = '<div class=\'popup\'>\n                            <img class="popup-logo" src="' + dumpLogo + '">\n                            <label class="popup-name">' + $scope.campaign.name + '</label>\n                            <h6 class="popup-address">' + responses[0].formatted_address + '</h6>\n                        </div>';

                $scope.infoWindow.setContent(mapPopup);
                $scope.infoWindow.open($scope.map, marker);
                $scope.map.setZoom(16);
                $scope.map.setCenter($scope.selectedMarker.getPosition());
                $scope.$apply();
            });
        };
        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            busy: true,
            uploading: false,
            submitted: false,
            mediaCreated: false
        };

        $scope.data = {
            arImageFile: '',
            imageFile: '',
            mediaId: '',
            brandImageFile: ''
        };

        $scope.position = null;
        $scope.measures = [{
            name: 'Meters',
            code: 'meter'
        }, {
            name: 'Kilometres',
            code: 'kilometre'
        }];
        var imageStyle = 'background-image: none;border-color: #ccc;';

        $scope.selectedMarker = null;
        $scope.searchBoxMarker = [];
        $scope.fieldHasError = utils.fieldHasError;

        $scope.magezines = ['Tatler', 'GQ', 'Time', 'The Economist', 'Cosmopolitan', 'National Geographic', 'Sports Illustrated', 'Glamour', 'Other'];

        // Check other values of selected
        $scope.changeSelect = function () {
            if ($scope.selectedMagezine.toUpperCase() === 'OTHER') {
                if (!$scope.magazineOther) {
                    $scope.magazineOther = '';
                }
                $scope.isOther = true;
            } else {
                $scope.isOther = false;
            }
        };

        var tvStations = [{
            id: 'ABC',
            name: 'ABC'
        }, {
            id: 'CNN',
            name: 'CNN'
        }, {
            id: 'DBS',
            name: 'DBS'
        }, {
            id: 'HTK',
            name: 'HTK'
        }, {
            id: 'SKY',
            name: 'SKY'
        }, {
            id: 'BBC',
            name: 'BBC'
        }, {
            id: 'TV_NEWS',
            name: 'TV NEWS'
        }, {
            id: 'other',
            name: 'Other'
        }];

        var radioStation = [{
            id: 'Z100_FM',
            name: 'FZ 100'
        }, {
            id: 'Z200_AM',
            name: 'FZ_200'
        }, {
            id: 'Jazz_FM',
            name: 'Jazz FM'
        }, {
            id: '101.9_FM',
            name: '101.9 FM'
        }, {
            id: 'KISS_FM',
            name: 'KISS FM'
        }, {
            id: '95_FM',
            name: '95 FM'
        }, {
            id: 'other',
            name: 'Other'
        }];
        $scope.stations = radioStation;
        $scope.selectedStation = $scope.stations[0];
        $scope.changeStation = function () {
            if ($scope.selectedStation.name.toUpperCase() === 'OTHER') {
                if (!$scope.stationOther) {
                    $scope.stationOther = '';
                }
                $scope.isOther = true;
            } else {
                $scope.isOther = false;
            }
        };

        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        var placeMarker = function placeMarker(location, keepAddress) {
            $scope.updateLogoIcon();
            if (!!$scope.selectedMarker) {
                $scope.selectedMarker.setMap(null);
            }

            $scope.selectedMarker = new google.maps.Marker({
                position: location,
                map: $scope.map,
                draggable: true,
                icon: $scope.iconMarker
            });

            var marker = $scope.selectedMarker;
            var pos = marker.getPosition();

            $scope.geocoder.geocode({
                latLng: pos
            }, function (responses) {
                var address = 'Cannot determine address at this location.';
                if (!keepAddress) {
                    if (responses && responses.length > 0) {
                        $scope.address = address = responses[0].formatted_address;
                        if (!$scope.previewMediaId) {
                            $scope.data.display_address = '';
                            if (!$scope.data.display_address) {
                                $scope.data.display_address = responses[0].formatted_address;
                            }
                        } else {
                            if (!$scope.data.display_address) {
                                $scope.data.display_address = responses[0].formatted_address;
                            }
                        }
                    }
                } else {
                    if (responses[0]) {
                        address = responses[0].formatted_address;
                    }
                }

                $scope.$apply();
                var dumpImage = '/wp-content/themes/kaching3/assets/images/billboards/media-thumb.png';
                var dumpLogo = '/wp-content/themes/kaching3/assets/images/logo.png';
                var mapPopup = '<div class=\'popup\'>\n                            <img class="popup-logo" src="' + dumpLogo + '">\n                            <label class="popup-name">' + $scope.campaign.name + '</label>\n                            <h6 class="popup-address">' + address + '</h6>\n                        </div>';

                $scope.infoWindow.setContent(mapPopup);
                $scope.infoWindow.open($scope.map, marker);
                $scope.map.setZoom(16);
                $scope.map.setCenter($scope.selectedMarker.getPosition());
            });

            google.maps.event.addListener(marker, 'dragend', function (event) {
                $scope.position = event.latLng;
                $scope.latitude = $scope.position.lat();
                $scope.longitude = $scope.position.lng();
                $scope.searchBoxMarker.forEach(function (marker) {
                    marker.setMap(null);
                });
                $scope.searchBoxMarker = [];
                $scope.$apply();
                geocodePosition(marker);
            });
        };

        $scope.iconMarker = {
            url: kachingCrownIconUrl,
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(50, 50)
        };
        $scope.updateLogoIcon = function (useDefault) {
            var imageUrl = '';
            if (useDefault) {
                $scope.data.brandImageFile = '';
                helper.clearFileUploader('#brandImageFile');
            }
            if ($scope.data.brandImageFile) {
                imageUrl = document.getElementById('brandImageFile').style.backgroundImage.replace('url(', '').replace(')', '').replace(/\"/gi, '');
                if (!imageUrl) {
                    var idx = $scope.data.brandImageFile.lastIndexOf('.');
                    if (idx !== -1) {
                        if ('|jpg|png|jpeg|'.indexOf($scope.data.brandImageFile.substr(idx + 1)) !== -1) {
                            imageUrl = $scope.data.brandImageFile;
                        }
                    }
                }
            }

            if (!imageUrl) {
                imageUrl = kachingCrownIconUrl;
            }

            $scope.iconMarker = {
                url: imageUrl,
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(50, 50)
            };

            return imageUrl;
        };

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        google.maps.event.addListenerOnce($scope.map, 'mouseover', function () {
            // This method is a trick to re-render map for the first time map renders.
            google.maps.event.trigger($scope.map, 'resize');
        });
        google.maps.event.addListenerOnce($scope.map, 'idle', function () {
            // This method is a trick to re-render map for the first time map renders.
            google.maps.event.trigger($scope.map, 'resize');
        });
        $scope.geocoder = new google.maps.Geocoder();

        $scope.infoWindow = new google.maps.InfoWindow();

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        $scope.map.addListener('bounds_changed', function () {
            searchBox.setBounds($scope.map.getBounds());
        });

        $scope.searchBoxMarker = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            $scope.updateLogoIcon();
            var places = searchBox.getPlaces();

            if (places.length === 0) {
                return;
            }
            // Clear out the old markers.
            $scope.searchBoxMarker.forEach(function (marker) {
                marker.setMap(null);
            });
            $scope.searchBoxMarker = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();

            if (places.length > 0) {
                $scope.position = places[0].geometry.location;
                $scope.address = places[0].formatted_address;
                if (!$scope.previewMediaId) {
                    $scope.data.display_address = '';
                    if (!$scope.data.display_address) {
                        $scope.data.display_address = places[0].formatted_address;
                    }
                } else {
                    if (!$scope.data.display_address) {
                        $scope.data.display_address = places[0].formatted_address;
                    }
                }
                $scope.latitude = $scope.position.lat();
                $scope.longitude = $scope.position.lng();
                $scope.$apply();
            }

            placeMarker(places[0].geometry.location);

            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log('Returned place contains no geometry');
                    return;
                }
                var newMarker = new google.maps.Marker({
                    map: $scope.map,
                    icon: $scope.iconMarker,
                    title: place.name,
                    position: place.geometry.location
                });

                google.maps.event.addListener(newMarker, 'dragend', function () {
                    geocodePosition(newMarker);
                });

                $scope.searchBoxMarker.push(newMarker);

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            $scope.map.fitBounds(bounds);
            $scope.$apply();
        });

        google.maps.event.addListener($scope.map, 'click', function (event) {
            $scope.position = event.latLng;
            $scope.latitude = $scope.position.lat();
            $scope.longitude = $scope.position.lng();
            placeMarker(event.latLng);
            $scope.searchBoxMarker.forEach(function (marker) {
                marker.setMap(null);
            });
            $scope.searchBoxMarker = [];
            $scope.$apply();
        });

        $scope.updateMapManually = function () {
            if (isNaN($scope.latitude)) {
                if ($scope.latitude === '-') {
                    return;
                } else {
                    $scope.latitude = 0;
                }
            }
            if (isNaN($scope.longitude)) {
                if ($scope.longitude === '-') {
                    return;
                } else {
                    $scope.longitude = 0;
                }
            }
            $scope.position = {
                lat: Number($scope.latitude),
                lng: Number($scope.longitude)
            };
            placeMarker($scope.position);
            $scope.searchBoxMarker.forEach(function (marker) {
                marker.setMap(null);
            });
            $scope.searchBoxMarker = [];
        };

        var imageFilter = { imageFilter: ['image/png', 'image/jpg', 'image/jpeg'] };

        utils.addUploaderTypeFilter(uploader, 'brandImage', imageFilter);
        utils.addUploaderTypeFilter(uploader, 'imageFile', imageFilter);

        utils.addUploaderTypeFilter(uploader, 'video', {
            videoFilter: ['video/mp4', 'video/ogg', 'video/webm', 'video/mov', 'video/avi', 'video/quicktime']
        });

        utils.addUploaderTypeFilter(uploader, 'audio', {
            audioFilter: ['audio/mp3']
        });

        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            if (newItem.alias === 'arDisplay') {
                $scope.data.arImageFile = newItem._file;
                var arType = newItem._file.type;
                $scope.isAnimationField = arType === '' ? true : false;
            }
            if (newItem.alias === 'brandImage') {
                $scope.data.brandImageFile = newItem._file;
                setTimeout(function () {
                    var $review = angular.element('#brandImageFile.uploader-dropzone.image-selected');
                    $scope.reviewMarker = $review.attr('style');
                    $scope.$apply();
                }, 100);
            }
            if (newItem.alias === 'imageFile') {
                $scope.data.imageFile = newItem._file;
            }
            if (newItem.alias === 'video') {
                $scope.data.imageFile = newItem._file;
            }
            if (newItem.alias === 'audio') {
                $scope.data.imageFile = newItem._file;
            }
        };

        $scope.showErrors = function () {
            return $scope.mediaList && $scope.mediaList.length === 0 && editor.stepGet('step2', 'submitted') || $scope.validateError;
        };

        $scope.videoHasError = function () {
            return _typeof($scope.data.videoFile) !== 'object';
        };

        $scope.imageHasError = function () {
            if (_typeof($scope.data.imageFile) !== 'object') {
                return true;
            } else {
                return false;
            }
        };
        $scope.arImageHasError = function () {
            if (_typeof($scope.data.arImageFile) !== 'object') {
                return true;
            } else {
                return false;
            }
        };

        $scope.viewMedia = function () {
            $scope.$hide();
            $state.go('media.view', {
                mediaId: $scope.data.mediaId
            });
        };

        var getSixDigit = function getSixDigit(num) {
            var number = '' + num;
            var dotIndex = number.indexOf('.');
            var intStr = number.substr(0, dotIndex + 1);
            var decimalStr = number.substr(dotIndex + 1, 6);
            return 1 * intStr.concat(decimalStr);
        };

        $scope.changeFormat = function () {
            if ($scope.selectedStoreType && $scope.selectedStoreType === 'in_store') {
                $scope.selectedStore = $scope.mediaList[0];
                $scope.latitude = $scope.selectedStore.media[0].latitude;
                $scope.longitude = $scope.selectedStore.media[0].longitude;
            } else {
                $scope.latitude = null;
                $scope.longitude = null;
            }
        };

        // Private function
        function b64toBlob(b64Data, contentType, sliceSize) {
            b64Data = b64Data.substring(22);
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, { type: contentType });
            return blob;
        }

        var saveMedia = function saveMedia() {

            var deferred = $q.defer();
            // var hasAr = $scope.data.arImageFile !== null && typeof($scope.data.arImageFile) === 'object';
            var hasAr = !!$scope.data.arImageFile;

            var formValid = false;
            var targetFormat = undefined;

            switch ($scope.campaign.type) {
                case 'magazine':
                    formValid = $scope.form1.$valid && hasAr;
                    targetFormat = 'magazine';
                    break;
                case 'radio':
                    formValid = $scope.form1.$valid && !!$scope.data.imageFile;
                    targetFormat = 'radio';
                    break;
                case 'billboard':
                    formValid = $scope.form1.$valid && (hasAr || ($scope.mediaList ? $scope.mediaList.length > 0 : false)) && ($scope.latitude || $scope.longitude);
                    targetFormat = 'bill_board';
                    break;
                case 'in_store':
                case 'store_front':
                    formValid = $scope.form1.$valid && (hasAr || ($scope.mediaList ? $scope.mediaList.length > 0 : false)) && ($scope.latitude || $scope.longitude);
                    targetFormat = 'in_store';
                    $scope.campaign.type = $scope.selectedStoreType;
                    break;
                case 'tv-ads':
                    formValid = $scope.form1.$valid && !!$scope.data.imageFile;
                    targetFormat = 'tv-ads';
                    break;
                default:
                    break;
            }

            if (formValid) {
                $scope.validateError = false;
                $scope.formSummited = false;

                var mediaData = {
                    description: $scope.data.description || '',
                    // type: 'billboard',
                    type: $scope.campaign.type,
                    // target_format: 'bill_board',
                    target_format: targetFormat,
                    // latitude: $scope.latitude,
                    // longitude: $scope.longitude,
                    // inclusion_zone_unit: $scope.measure.code,
                    // address: $scope.address,
                    marker_shape: $scope.shape && $scope.shape.value ? $scope.shape.value : null,
                    marker_stand: $scope.markerStand.value,
                    marker_size: $scope.markerSize.value,
                    marker_dimension: $scope.selectedDimension.value,
                    campaign: $scope.campaign.id || editor.dataGet('campaignId'),
                    shop_name: $scope.data.display_address // TODO: replace this with shop_name
                };
                if ($scope.editMode) {
                    mediaData.id = $scope.previewMediaId;
                }

                // Add display_address
                mediaData.address = $scope.data.display_address ? $scope.data.display_address : $scope.address;

                if ($scope.selectedStore && $scope.selectedStore.id) {
                    mediaData.in_store_shop = $scope.selectedStore.id;
                }

                if ($scope.inclusionZone) {
                    mediaData.inclusion_zone = $scope.inclusionZone.value || 0;
                }

                if ($scope.latitude) {
                    mediaData.latitude = getSixDigit($scope.latitude);
                }

                if ($scope.longitude) {
                    mediaData.longitude = getSixDigit($scope.longitude);
                }

                if ($scope.data.animation) {
                    mediaData.animation_type = $scope.data.animation;
                }

                // Apply base64 image
                if ($scope.data.arImageFile && _typeof($scope.data.arImageFile) === 'object') {
                    mediaData.ar_resource = $scope.data.arImageFile;
                } else {
                    if (typeof $scope.data.arImageFile === 'string' && $scope.data.arImageFile.indexOf('base64') > -1) {
                        var ar_resource_blob = b64toBlob($scope.data.arImageFile, 'image/jpeg');
                        var ar_resource_file = new File([ar_resource_blob], 'arImageFile.jpeg');
                        mediaData.ar_resource = ar_resource_file;
                    }
                }

                if ($scope.data.imageFile && _typeof($scope.data.imageFile) === 'object') {
                    mediaData.target = $scope.data.imageFile;
                    mediaData.radio = $scope.data.imageFile;
                } else {
                    if (typeof $scope.data.imageFile === 'string' && $scope.data.imageFile.indexOf('base64') > -1) {
                        var imageFile_blob = b64toBlob($scope.data.imageFile, 'image/jpeg');
                        var imageFile_file = new File([imageFile_blob], 'imageFile.jpeg');
                        mediaData.target = imageFile_file;
                    } else {
                        if (!$scope.data.imageFile) {
                            mediaData.target = '';
                        }
                    }
                }

                if ($scope.data.brandImageFile && _typeof($scope.data.brandImageFile) === 'object') {
                    mediaData.brand_image = $scope.data.brandImageFile;
                } else {
                    if (typeof $scope.data.brandImageFile === 'string' && $scope.data.brandImageFile.indexOf('base64') > -1) {
                        var brandImageFile_blob = b64toBlob($scope.data.brandImageFile, 'image/jpeg');
                        var brandImageFile_file = new File([brandImageFile_blob], 'brandImageFile.jpeg');
                        mediaData.brand_image = brandImageFile_file;
                    } else {
                        if (!$scope.data.imageFile) {
                            mediaData.target = '';
                        }
                    }
                }
                // End apply base64 image

                if ($scope.selectedMagezine) {
                    if ($scope.selectedMagezine.toUpperCase() === 'OTHER') {
                        mediaData.magazine_name = $scope.magazineOther;
                        $scope.magazineOther = '';
                    } else {
                        mediaData.magazine_name = $scope.selectedMagezine;
                    }
                }

                if ($scope.selectedStation) {
                    if ($scope.selectedStation.name.toUpperCase() === 'OTHER') {
                        mediaData.radio_station = $scope.stationOther;
                        mediaData.tv_station = $scope.stationOther;
                        $scope.stationOther = '';
                    } else {
                        mediaData.radio_station = $scope.selectedStation.name;
                        mediaData.tv_station = $scope.selectedStation.name;
                    }
                }

                if ($scope.data.url) {
                    mediaData.target_url = $scope.data.url;

                    if (mediaData.target_url.indexOf('http://') === -1) {
                        mediaData.target_url = 'http://' + mediaData.target_url;
                    }
                }

                mediaService.saveKachingZoneMedia(mediaData).then(function (data) {
                    deferred.resolve(data);
                }, function (response) {
                    deferred.reject(response);
                });
            } else {
                $scope.validateError = true;
                $scope.formSummited = true;
                editor.stepSet('step2', 'valid', false);
                setTimeout(function () {
                    $scope.scrollToFirstError();
                }, 100);
                deferred.reject();
            }
            return deferred.promise;
        };

        $scope.submitMedia = function () {

            var deferred = $q.defer();

            if ($scope.form1.$valid) {
                if ($scope.form1.$pristine) {
                    deferred.resolve();
                } else {
                    // if ($scope.form1) {
                    //     $scope.form1.$setPristine();
                    // }
                }
                $scope.view.busy = true;
                saveMedia().then(function (data) {
                    if ($scope.form1) {
                        $scope.form1.$setPristine();
                    }
                    if ($scope.editMode) {
                        $scope.editMode = false;
                        helper.alert('success', 'Media has been updated.');
                    } else {
                        editor.dataSet('mediaList', $scope.mediaList);
                    }
                    $scope.refreshMediaList().then(function () {
                        deferred.resolve();
                        $scope.clearForm();
                        if ($scope.form1) {
                            $scope.form1.$setPristine();
                        }
                        $scope.view.busy = false;
                    }, function () {
                        deferred.resolve();
                        $scope.clearForm();
                        if ($scope.form1) {
                            $scope.form1.$setPristine();
                        }
                        $scope.view.busy = false;
                    });

                    // $scope.form1.$setPristine();
                    // $scope.view.busy = false;
                    // deferred.resolve();
                }, function (response) {
                    if ($scope.form1) {
                        $scope.form1.$setPristine();
                    }
                    $scope.view.busy = false;
                    if (response) {
                        var errorObj = response.data.errorDetails.logicProcessing.processingErrors[0];
                        if (errorObj.code === 49) {
                            // helper.alert('danger', 'Fail to upload wikiTude.');
                            helper.alert('danger', 'The target image already exists in your target collection. Please use a different target.');
                            helper.alert('warning', "Wikitude supports only jpg's for image uploads or png's without transparent pixels");
                        } else {
                            helper.alert('danger', errorObj.message);
                        }
                    } else {
                        helper.scrollToFirstError($scope);
                        helper.alert('danger', 'Please, fill all required fields.');
                    }

                    deferred.reject();
                    $scope.view.busy = false;
                });
            } else {
                helper.scrollToFirstError($scope);
                helper.alert('danger', 'Please, fill all required fields.');
                deferred.reject();
            }

            return deferred.promise;
        };

        $scope.clearImageUploader = function (string) {
            if (string === 'geo') {
                $scope.data.imageFile = '';
                helper.clearFileUploader('#imageFile');
            }
            if (string === 'default') {
                $scope.data.brandImageFile = '';
                helper.clearFileUploader('#brandImageFile');
                $scope.reviewMarker = kachingCrownIconStyle;
            }
        };

        $scope.clearForm = function () {
            helper.clearForm();

            $scope.data = {
                arImageFile: null,
                imageFile: null,
                mediaId: '',
                brandImageFile: '',
                display_address: ''
            };
            $scope.shape = $scope.shapes[0] || undefined;
            $scope.markerStand = $scope.markerStands[0] || undefined;
            $scope.markerSize = $scope.markerSizes[0] || undefined;
            $scope.selectedDimension = $scope.dimensions[0] || undefined;

            helper.clearFileUploader('#imageFile');
            helper.clearFileUploader('#arImageFile');
            helper.clearFileUploader('#brandImageFile');

            if (!!$scope.selectedMarker) {
                $scope.selectedMarker.setMap(null);
                $scope.position = null;
                $scope.latitude = null;
                $scope.longitude = null;
                $scope.address = null;
            }

            $scope.reviewMarker = kachingCrownIconStyle;
            // if ($scope.form1) {
            //     $scope.form1.$setPristine();
            // }
            // $scope.form.$setValidity();
        };

        $scope.cancelEdit = function () {
            $scope.clearForm();
            $scope.editMode = false;
            $scope.isAnimationField = false;
            $scope.magazineOther = '';
            $scope.stationOther = '';
            $scope.validateError = false;
        };

        $scope.editMedia = function (mediaId) {
            $scope.clearForm();
            helper.alert('info', 'You are in edit mode!');
            $scope.editMode = true;
            helper.resetAngularFields($scope);
            $scope.previewMediaId = mediaId.id;
            $scope.stationOther = '';
            mediaService.getMediaItem($scope.previewMediaId).then(function (response) {
                $scope.data.arImageFile = helper.getMediaPreviewFromUrl(response.ar_resource);
                $scope.data.imageFile = helper.getMediaPreviewFromUrl(response.target);
                $scope.latitude = response.latitude;
                $scope.longitude = response.longitude;
                $scope.inclusionZone = _.findWhere($scope.distances, { value: response.inclusion_zone }) || $scope.distances[0];
                $scope.address = response.address;
                $scope.data.brandImageFile = helper.getMediaPreviewFromUrl(response.brand_image);
                $scope.shape = _.findWhere($scope.shapes, { value: response.marker_shape }) || $scope.shapes[0];
                $scope.markerStand = _.findWhere($scope.markerStands, { value: response.marker_stand }) || $scope.markerStands[0];
                $scope.markerSize = _.findWhere($scope.markerSizes, { value: response.marker_size }) || $scope.markerSizes[0];
                $scope.selectedDimension = _.findWhere($scope.dimensions, { value: response.marker_dimension }) || $scope.dimensions[0];
                $scope.data.url = response.target_url;
                $scope.selectedStoreType = response.type;
                $scope.selectedStore = _.find($scope.mediaList, { id: response.in_store_shop });
                placeMarker({
                    lat: Number($scope.latitude),
                    lng: Number($scope.longitude)
                }, true);

                // Add display_address
                $scope.data.display_address = response.address;

                $scope.targetOption = response.target ? 'scan' : 'geo';
                $scope.markerOption = response.brand_image ? 'custom' : 'default';
                if (response.ar_resource) {
                    $scope.isAnimationField = response.ar_resource.split('.wt3').length > 1 ? true : false;
                }

                if ($scope.isAnimationField) {
                    $scope.data.animation = response.animation_type;
                }

                if ($scope.data.brandImageFile) {
                    $scope.reviewMarker = 'background-image: url("' + $scope.data.brandImageFile + '")';
                } else {
                    $scope.reviewMarker = kachingCrownIconStyle;
                }

                var currentStation = undefined;

                if ($scope.campaign.type === 'radio') {
                    currentStation = _.find($scope.stations, {
                        name: response.radio_station
                    });
                } else {
                    if ($scope.campaign.type === 'tv-ads') {
                        currentStation = _.find($scope.stations, {
                            name: response.tv_station
                        });
                    }
                }

                if (currentStation) {
                    $scope.isOther = false;
                    $scope.selectedStation = currentStation;
                } else {
                    $scope.isOther = true;
                    if ($scope.campaign.type === 'radio') {
                        $scope.stationOther = response.radio_station;
                    } else {
                        if ($scope.campaign.type === 'tv-ads') {
                            $scope.stationOther = response.tv_station;
                        }
                    }

                    $scope.selectedStation = _.find($scope.stations, {
                        name: 'Other'
                    });
                }

                // Response magazine name
                if ($scope.campaign.type === 'magazine') {
                    if ($scope.selectedMagezine) {
                        $scope.selectedMagezine = response.magazine_name;

                        if (_.find($scope.magezines, function (item) {
                            return item == $scope.selectedMagezine;
                        })) {
                            $scope.isOther = false;
                        } else {
                            $scope.isOther = true;
                            $scope.magazineOther = $scope.selectedMagezine;
                            $scope.selectedMagezine = 'Other';
                        }
                    }
                }
            });
            $scope.editMediaMode = true;
        };

        $scope.deleteMedia = function (media) {
            $scope.cancelEdit();
            $scope.previewMediaId = media.id;
            campaignsService.deleteMedia($scope.previewMediaId).then(function (response) {
                console.log(response);
                helper.alert('success', 'Media has been deleted.');
                $scope.refreshMediaList();
            }, function (response) {
                console.log(response);
                helper.alert('danger', 'Media has not been deleted');
            });
        };

        $scope.refreshMediaList = function () {
            var deferred = $q.defer();

            if (editor.dataGet().campaignId !== undefined) {
                campaignsService.getCampaign(editor.dataGet().campaignId).then(function (response) {
                    // $scope.mediaList = response.media;
                    initMediaList(response);
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            } else {
                deferred.reject();
            }

            return deferred.promise;
        };
        $scope.updateMap = function (data) {
            var info = {
                lat: data.lat,
                lng: data.lng,
                title: data.name
            };

            if (!!$scope.selectedMarker) {
                $scope.selectedMarker.setMap(null);
            }
            $scope.map.setCenter(new google.maps.LatLng(info.lat, info.lng));
            $scope.map.setZoom(17);
        };

        $scope.scrollToFirstError = function () {
            if (angular.element('.has-error').length > 0) {
                var firstErrorId = angular.element('.has-error')[0].id;
                $location.hash(firstErrorId);
                $anchorScroll();
            }
        };

        var initMediaMarker = function initMediaMarker() {
            $scope.shapes = mediaService.getShapes();
            $scope.shape = $scope.shapes[0] || undefined;
            $scope.markerStands = mediaService.getMarkerStand();
            $scope.markerStand = $scope.markerStands[0] || undefined;
            $scope.markerSizes = mediaService.getMarkerSize();
            $scope.markerSize = $scope.markerSizes[0] || undefined;
            $scope.dimensions = mediaService.getMakerDimension();
            $scope.selectedDimension = $scope.dimensions[0];
            $scope.distances = mediaService.getDistance();
            $scope.inclusionZone = $scope.distances[0];
        };

        $scope.init = function () {
            $scope.markerSizeClass = 'marker-preview-small';
            $scope.markerShapeClass = 'marker-preview-circle';
            $scope.targetOption = 'geo';
            $scope.markerOption = 'default';
            $scope.reviewMarker = kachingCrownIconStyle;
            initMediaMarker();
            $scope.validateError = false;
            if (!$scope.editId) {
                if (!editor.stepGet('step1', 'valid')) {
                    $scope.updateStep(editor.currentStep());
                }
            }
            editor.currentStep(2);
            editor.previousState(2);
            // $scope.mediaList = [];
            // $scope.mediaList = [];
            $scope.selectedStoreType = 'store_front';

            if (editor.dataGet('campaignId')) {
                $scope.initEditMode(editor.dataGet('campaignId'));
            } else {
                $scope.campaign = editor.dataGet('campaign');
                if ($scope.campaign.type === 'tv-ads') {
                    $scope.stations = tvStations;
                    $scope.selectedStation = $scope.stations[0];
                }
                var mediaListData = editor.dataGet('mediaList');
                if (!_.isEmpty(mediaListData)) {
                    $scope.mediaList = mediaListData;
                }
                $scope.view.busy = false;
            }

            // if ($scope.editId) {
            //     $scope.initEditMode($scope.editId);
            // } else {
            //     $scope.campaign = editor.dataGet('campaign');
            //     if ($scope.campaign.type === 'tv-ads') {
            //         $scope.stations = tvStations;
            //         $scope.selectedStation = $scope.stations[0]
            //     }
            //     var mediaListData = editor.dataGet('mediaList');
            //     if (!_.isEmpty(mediaListData)) {
            //         $scope.mediaList = mediaListData;
            //     }
            //     $scope.view.busy = false;
            // }
            $scope.editMediaMode = false;
            $scope.editMode = false;
        };

        var initMediaList = function initMediaList(data) {
            // $scope.mediaList = [];
            $scope.mediaList = [];
            if (data.type === 'in_store') {
                if (data.media.length > 0) {
                    angular.forEach(data.media, function (item, id) {
                        if (item.type === 'store_front') {
                            var storefrontItem = {
                                id: item.id,
                                name: item.in_store_shop_name || 'undefined',
                                media: _.where(data.media, { in_store_shop: item.id })
                            };

                            // storefrontItem.name = $scope.data.display_address ? $scope.data.display_address : item.in_store_shop_name;

                            storefrontItem.media.unshift(item);
                            $scope.mediaList.push(storefrontItem);
                        }
                    });

                    $scope.selectedStore = $scope.mediaList[0];
                }
            } else {
                $scope.mediaList = data.media;
            }
        };

        $scope.initEditMode = function (id) {
            var id = id || $scope.editId;
            campaignsService.getCampaign(id).then(function (data) {
                $scope.campaign = data;
                // $scope.selectedStoreType = $scope.campaign.type;
                if (data.type === 'tv-ads') {
                    $scope.stations = tvStations;
                    $scope.selectedStation = $scope.stations[0];
                }
                $scope.validateError = false;

                initMediaList(data);

                $scope.view.busy = false;
            }, function () {
                $scope.view.busy = false;
            });
        };

        function checkFormPristine() {
            if (!$scope.form1.$pristine) {
                return false;
            } else {
                if ($scope.latitude || $scope.longitude) {
                    return false;
                }
                for (var property in $scope.data) {
                    if ($scope.data[property]) {
                        return false;
                    }
                }
                return true;
            }
        }

        $scope.nextStep = function () {
            $scope.form1.$setSubmitted();
            if (checkFormPristine() && $scope.mediaList.length > 0) {
                editor.stepSet('step2', 'submitted', true);
                if ($scope.mediaList.length > 0) {
                    editor.stepSet('step2', 'valid', true);
                    $scope.goNext();
                } else {
                    editor.stepSet('step2', 'valid', false);
                    setTimeout(function () {
                        $scope.scrollToFirstError();
                    }, 100);
                    helper.alert('danger', 'Please add at least one AR');
                }
            } else {
                $scope.submitMedia().then(function () {
                    editor.stepSet('step2', 'submitted', true);
                    if ($scope.mediaList.length > 0) {
                        editor.stepSet('step2', 'valid', true);
                        $scope.goNext();
                    } else {
                        editor.stepSet('step2', 'valid', false);
                        setTimeout(function () {
                            $scope.scrollToFirstError();
                        }, 100);
                        helper.alert('danger', 'Please add at least one AR');
                    }
                }, function () {});
            }
        };

        $scope.goPrev = function () {
            $scope.updateStep(1);
        };

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.nextStep();
            }
        });

        $scope.needBasicValidateZone = function () {
            if (!$scope.campaign || !$scope.campaign.type) {
                return true;
            }

            if ($scope.data.imageFile && $scope.campaign.type != 'radio') {
                return true;
            } else {
                return false;
            }
        };

        $scope.needBrandValidationZone = function () {
            if ($scope.data.brandImageFile) {
                return true;
            } else {
                return false;
            }
        };

        $scope.$watch('markerSize', function (newVal, oldVal) {
            switch (newVal.label) {
                case 'Small':
                    $scope.markerSizeClass = 'marker-preview-small';
                    break;
                case 'Medium':
                    $scope.markerSizeClass = 'marker-preview-medium';
                    break;
                case 'Large':
                    $scope.markerSizeClass = 'marker-preview-large';
                    break;
                default:
                    $scope.markerSizeClass = 'marker-preview-small';
                    break;

            }
        });

        $scope.$watch('shape', function (newVal, oldVal) {
            switch (newVal.label) {
                case 'Circle':
                    $scope.markerShapeClass = 'marker-preview-circle';
                    break;
                case 'Rectangle':
                    $scope.markerShapeClass = 'marker-preview-rectangle';
                    break;
                case 'Square':
                    $scope.markerShapeClass = 'marker-preview-square';
                    break;
                default:
                    $scope.markerShapeClass = 'marker-preview-circle';
                    break;

            }
        });

        $scope.$watch('selectedStore', function () {
            if ($scope.selectedStore) {
                $scope.form1.$setPristine();
            }
        });

        $scope.$watch('reviewMarker', function () {
            if ($scope.data.brandImageFile) {
                var $review = angular.element('#brandImageFile.uploader-dropzone.image-selected');
                $scope.reviewMarker = $review.attr('style');
            } else {
                $scope.reviewMarker = kachingCrownIconStyle;
            }
        });

        $scope.$watch('data.brandImageFile', function () {
            setTimeout(function () {
                var $review = angular.element('#brandImageFile.uploader-dropzone.image-selected');
                $scope.reviewMarker = $review.attr('style');
                $scope.$apply();
            }, 100);
        });

        $scope.$watch('mediaList', function (newVal, oldVal) {
            if (newVal && newVal.length === 0) {
                $scope.selectedStoreType = 'store_front';
            }
        });

        $scope.$watch('data.url', function (newVal, oldVal) {
            if (newVal) {
                if ($scope.urlRegex.test($scope.data.url)) {
                    $scope.showUrlError = false;
                } else {
                    $scope.showUrlError = true;
                }
            } else {
                $scope.showUrlError = false;
            }
        });

        $scope.init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('step3Ctrl', ['$scope', 'productsService', 'campaignEditorService', 'campaignsService', 'utils', 'FileUploader', 'apiUrl', 'authToken', '$http', '$q', 'errorHandler', 'kachingZonesHelpers', 'kachingZonecampaignEditorService', 'mediaService', function ($scope, productsService, campaignEditorService, campaignsService, utils, FileUploader, apiUrl, authToken, $http, $q, errorHandler, kachingZonesHelpers, kachingZonecampaignEditorService, mediaService) {
        var helper = kachingZonesHelpers;
        var editor = kachingZonecampaignEditorService;

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/products/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });
        function addProductToCampaign(product) {
            var deferred = $q.defer();

            campaignsService.saveProducts($scope.campaignId, product).then(function (data) {
                helper.alert('success', 'Product has been added');
                deferred.resolve(data);
            }, function (response) {
                // $scope.view.busy = false;
                deferred.reject(response);
                errorHandler.processApiResponse(response);
            });

            return deferred.promise;
        }

        function createProduct() {

            if ($scope.data.url.match(/^http[s]?:\/\//i) === null) {
                $scope.data.url = 'http://' + $scope.data.url;
            }

            var productData = {
                title: $scope.data.title,
                description: $scope.data.description,
                price: $scope.data.price,
                url: $scope.data.url
            };

            if (_typeof($scope.data.productImageFile) === 'object') {
                productData.image = $scope.data.productImageFile;
            }

            if ($scope.editMode === true) {
                productData.id = $scope.data.productIdInEdit;
            }

            var deferred = $q.defer();

            productsService.createProduct(productData).then(function (data) {
                deferred.resolve(data);
                $scope.data.productIdInEdit = undefined;
                $scope.editMode = false;
            }, function (response) {
                deferred.reject(response);
                errorHandler.processApiResponse(response);
            });

            return deferred.promise;
        }

        $scope.previewData = {
            isInstore: false,
            followIBeacon: { enabled: false },
            scanReceipt: { enabled: false },
            issueQR: { enabled: false },
            buyProducts: { enabled: false },
            sendInformation: { enabled: false },
            register: { enabled: false },
            share: { enabled: false },
            openMicrophone: { enabled: false },
            watchVideo: { enabled: false }
        };

        $scope.view = {
            busy: true,
            productImageUploadStarted: false,
            productImageUploadProgress: 0,
            productImageUploadComplete: false
        };

        $scope.data = {
            'title': '',
            'description': '',
            'pirce': '',
            'url': ''
        };

        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            $scope.data.productImageFile = newItem._file;
        };
        $scope.recommendedProducts = [];
        $scope.carouselOptions = {
            nav: true,
            dots: false,
            navText: ['<span class="glyphicon glyphicon-triangle-left"></span>', '<span class="glyphicon glyphicon-triangle-right"></span>'],
            navRewind: false,
            loop: false,
            items: 4
        };
        $scope.products = editor.dataGet('products');

        var getRecommendedProducts = function getRecommendedProducts() {
            productsService.getProducts({ limit: 16, offset: 0, ordering: '-last_used_date' }).then(function (products) {
                $scope.recommendedProducts = products.items;
            });
        };

        var myArr = [{
            type: 'type',
            perDollarPerClick: 3
        }, {
            type: 'another type',
            perDollarPerClick: 2
        }];
        $scope.purchaseAds = myArr;
        $scope.saveProduct = function () {
            var deferred = $q.defer();
            createProduct().then(function (data) {
                if (data && data.id) {
                    addProductToCampaign($scope.addedProducts.concat([data])).then(function () {
                        campaignsService.getCampaign($scope.campaignId).then(function (campaign) {
                            $scope.addedProducts = campaign.products;
                        }, function (response) {});
                    }, function () {});
                }
            }, function (response) {
                errorHandler.processApiResponse(response);
                $scope.view.busy = false;
            });
            return deferred.promise;
        };
        $scope.selectRecommendedProduct = function (product) {
            $scope.editMode = true;
            $scope.data.productIdInEdit = product.id;
            $scope.data.title = product.title;
            $scope.data.description = product.description;
            $scope.data.price = product.price;
            $scope.data.url = product.url;
            $scope.data.productImageFile = product.image;
            helper.alert('info', 'Product in edit mode!');
        };
        $scope.fieldHasError = utils.fieldHasError;
        $scope.showErrors = function () {
            return editor.stepGet('step3', 'submitted');
        };
        $scope.nextStep = function () {
            editor.stepSet('step3', 'submitted', true);

            $scope.view.busy = true;
            editor.stepSet('step3', 'valid', true);
            $scope.updateAllMedia($scope.medias).then(function () {
                $scope.goNext();
                helper.alert('success', 'All media has been updated');
                $scope.view.busy = false;
                // $scope.activateCampaign();
            }, function (response) {
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
            });
        };
        $scope.updateAllMedia = function (medias) {
            var deferred = $q.defer();
            var promisses = [];

            angular.forEach(medias, function (media) {
                var prodDeferred = $q.defer();
                promisses.push(prodDeferred.promise);

                var mediaData = {
                    id: media.id,
                    bets_per_view: media.bets_per_view,
                    type: media.type
                };

                campaignsService.updateMedia(mediaData).then(function (response) {
                    prodDeferred.resolve(response);
                }, function (response) {
                    prodDeferred.reject(response);
                });

                var mediaProdDeferred = $q.defer();
                promisses.push(mediaProdDeferred.promise);

                var productIds = [];
                media.products.forEach(function (item) {
                    productIds.push(item.id);
                });

                campaignsService.updateMediaProduct({ id: media.id, products: productIds }).then(function (response) {
                    mediaProdDeferred.resolve(response);
                }, function (response) {
                    mediaProdDeferred.reject(response);
                });

                // update media
                var rewardDeferred = $q.defer();
                promisses.push(rewardDeferred.promise);
                var rewardData = {
                    // send_information: media.reward.send_information,
                    share: media.reward.share,
                    product: media.reward.product,
                    share_message: media.reward.share_message
                };
                mediaService.updateReward(media.id, rewardData).then(function (response) {
                    rewardDeferred.resolve(response);
                }, function (response) {
                    rewardDeferred.reject(response);
                });

                // update register
                var registerDeferred = $q.defer();
                promisses.push(registerDeferred.promise);
                var campaign = {
                    id: $scope.campaignId,
                    register: $scope.campaign.register
                };

                campaignsService.saveKachingZoneCampagin(campaign).then(function () {
                    registerDeferred.resolve();
                }, function () {
                    registerDeferred.reject();
                });
            });

            $q.all(promisses).then(function () {
                deferred.resolve();
            });
            return deferred.promise;
        };

        var init = function init() {

            $scope.selectedMedia = null;

            if (!$scope.editId) {
                if (!editor.stepGet('step1', 'valid') || !editor.stepGet('step2', 'valid')) {
                    $scope.updateStep(editor.currentStep());
                }
            }

            editor.currentStep(3);
            editor.previousState(3);

            if ($scope.editId) {
                $scope.campaignId = $scope.editId;
            } else {
                $scope.campaignId = editor.dataGet('campaignId');
            }

            $scope.addedProducts = [];
            getRecommendedProducts();
            utils.addUploaderTypeFilter(uploader, 'image', {
                imageFilter: ['image/png', 'image/jpg', 'image/jpeg']
            });
            $scope.grandTotal = 0;
            campaignsService.getCampaign($scope.campaignId).then(function (campaign) {
                $scope.addedProducts = campaign.products;
                $scope.campaign = campaign;
                if (!$scope.campaign.register) {
                    $scope.campaign.register = 0;
                }
                if (campaign.media.length > 0) {
                    $scope.medias = campaign.media;
                    angular.forEach($scope.medias, function (value, key) {
                        $scope.grandTotal += 1 * value.bets_per_view;
                        if (!value.reward) {
                            value.reward = {
                                share: 0,
                                // send_information: 0,
                                product: 0
                            };
                        }
                    });
                }
                $scope.view.busy = false;
            }, function (response) {
                errorHandler.processApiResponse(response);
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
            });
        };

        init();

        $scope.$watchCollection('medias', function (newVal, oldVal) {});

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.saveProduct();
                $scope.nextStep();
            }
        });
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('step4Ctrl', ['$scope', 'productsService', 'campaignsService', 'campaignEditorService', 'kachingZonecampaignEditorService', '$q', '$modal', 'errorHandler', '$state', 'NgMap', function ($scope, productsService, campaignsService, campaignEditorService, kachingZonecampaignEditorService, $q, $modal, errorHandler, $state, NgMap) {
        // NgMap.getMap().then(function(map) {
        // });
        var editor = kachingZonecampaignEditorService;
        var flags = ['CA', 'ES', 'FR', 'GB', 'HK', 'JP', 'SG', 'US'];
        var flagUrl = kachingAppConfig.wpTemplateUri + '/assets/images/flag/';

        $scope.flagUrl = flagUrl + 'SG.png';
        $scope.view = {
            busy: true
        };

        $scope.locations = {};
        $scope.categories = {};

        $scope.loadSubmittedProducts = function () {
            if (editor.dataGet().campaignId !== undefined) {
                campaignsService.getCampaign(editor.dataGet().campaignId).then(function (response) {
                    $scope.recommendedProducts = response.products;
                });
            }
        };

        $scope.goToCampaign = function () {
            $state.go('kaching.campaigns');
        };

        var initCampaign = function initCampaign() {
            var deferred = $q.defer();
            var mediaListData = editor.dataGet('mediaList');
            if (!_.isEmpty(mediaListData)) {
                $scope.mediaList = mediaListData;
                if ($scope.mediaList.length > 0) {
                    $scope.noMedia = false;
                }
                $scope.campaignId = editor.dataGet('campaignId');
                $scope.media = editor.dataGet('media');
                campaignsService.getCampaign($scope.campaignId).then(function (response) {
                    $scope.campaign = response;
                    initMediaList($scope.campaign);
                    deferred.resolve($scope.campaign);
                }, function () {
                    deferred.reject();
                });
            } else {
                campaignsService.getCampaign($scope.campaignId).then(function (data) {
                    if ($scope.viewDetail) {
                        $scope.updateCampaignType(data.type);
                    }
                    $scope.mediaList = data.media;
                    if ($scope.mediaList.length > 0) {
                        $scope.noMedia = false;
                    }
                    $scope.campaign = data;
                    initMediaList($scope.campaign);
                    angular.forEach($scope.mediaList, function (value, key) {
                        $scope.grandTotal += 1 * value.bets_per_view;
                    });
                    deferred.resolve($scope.campaign);
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };

        var initTargetings = function initTargetings() {
            var deferred = $q.defer();
            var targetingData = editor.dataGet('targeting');
            if (!_.isEmpty(targetingData)) {
                $scope.targeting = targetingData;
                var arrLocations = [],
                    arrCategories = [];
                // Get a location have selected true
                angular.forEach($scope.targeting.locations, function (item, id) {
                    if (item.selected === true) {
                        arrLocations.push(item);
                    }
                });
                // Get a category have selected true
                angular.forEach($scope.targeting.categories, function (item, id) {
                    if (item.selected === true) {
                        arrCategories.push(item);
                    }
                });
                $scope.locations = arrLocations;
                $scope.categories = arrCategories;
                deferred.resolve();
            } else {
                // $scope.view.busy = true;
                // var id = editor.dataGet('campaignId') || $scope.editId || undefined;
                campaignsService.getTargeting($scope.campaignId).then(function (response) {
                    $scope.targeting = response;
                    var arrLocations = [],
                        arrCategories = [];
                    // Get a location have selected true
                    angular.forEach($scope.targeting.locations, function (item, id) {
                        if (item.selected === true) {
                            arrLocations.push(item);
                        }
                    });
                    // Get a category have selected true
                    angular.forEach($scope.targeting.categories, function (item, id) {
                        if (item.selected === true) {
                            arrCategories.push(item);
                        }
                    });
                    $scope.locations = arrLocations;
                    $scope.categories = arrCategories;
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };

        var initMediaList = function initMediaList(data) {
            // $scope.mediaList = [];
            $scope.mediaList = [];
            if (data.type === 'in_store') {
                if (data.media.length > 0) {
                    angular.forEach(data.media, function (item, id) {
                        if (item.type === 'store_front') {
                            var storefrontItem = {
                                id: item.id,
                                name: item.in_store_shop_name || 'undefined',
                                media: _.where(data.media, { in_store_shop: item.id })
                            };

                            storefrontItem.media.unshift(item);
                            $scope.mediaList.push(storefrontItem);
                        }
                    });

                    $scope.selectedStore = $scope.mediaList[0];
                }
            } else {
                $scope.mediaList = data.media;
            }
        };

        var initData = function initData() {
            var deferred = $q.defer();
            var deferred1 = $q.defer();
            var deferred2 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise];

            initCampaign().then(function () {
                initMap();
                deferred1.resolve();
            }, function () {
                deferred1.reject();
            });

            initTargetings().then(function () {
                deferred2.resolve();
            }, function () {
                deferred2.reject();
            });

            $q.all(promisses).then(function () {
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var init = function init() {
            $scope.view.busy = true;
            $scope.selectedMedia = null;

            if (!$scope.editId) {
                if (!editor.stepGet('step1', 'valid') || !editor.stepGet('step2', 'valid') || !editor.stepGet('step3', 'valid')) {
                    $scope.updateStep(editor.currentStep());
                }
            }

            editor.currentStep(4);
            editor.previousState(4);

            $scope.loadSubmittedProducts();
            // $scope.view.busy = false;

            $scope.noMedia = true;

            $scope.mediaList = [];
            $scope.grandTotal = 0;
            $scope.campaignId = $scope.editId || editor.dataGet('campaignId');

            var flagIndex;
            if ($scope.selectedCountry) {
                flagIndex = flags.indexOf($scope.selectedCountry.alpha2_code);
                if (flagIndex >= 0) {
                    $scope.flagUrl = flagUrl + flags[flagIndex] + '.png';
                }
            } else {
                campaignsService.getTargeting($scope.campaignId).then(function (response) {
                    $scope.selectedCountry = response.selectedCountry;
                    flagIndex = flags.indexOf($scope.selectedCountry.alpha2_code);
                    if (flagIndex >= 0) {
                        $scope.flagUrl = flagUrl + flags[flagIndex] + '.png';
                    }
                });
            }

            initData().then(function () {
                $scope.view.busy = false;
            }, function () {
                $scope.view.busy = false;
            });
        };

        var initMap = function initMap() {
            $scope.points = [];
            if ($scope.campaign && $scope.campaign.media) {
                angular.forEach($scope.campaign.media, function (value, key) {
                    var item = {
                        latitude: value.latitude,
                        longitude: value.longitude,
                        customIcon: {
                            "scaledSize": [32, 32],
                            "url": value.brand_image || kachingAppConfig.wpTemplateUri + '/assets/images/crowblackedit.png'
                        }

                    };
                    $scope.points.push(item);
                });

                $scope.mapCenter = [];

                if ($scope.points.length > 0) {
                    $scope.mapCenter.push($scope.points[0].latitude);
                    $scope.mapCenter.push($scope.points[0].longitude);
                }
            }
        };

        $scope.showFinishPopup = function (campaign) {
            var options = {
                activateCampaign: $scope.activateCampaign
            };
            $modal({
                templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/billboards/steps/finish.html',
                controller: 'campaignFinishModalCtrl',
                animation: 'am-fade-and-scale',
                placement: 'center',
                resolve: {
                    modalOptions: function modalOptions() {
                        return options;
                    }
                },
                onHide: function onHide() {
                    $scope.goToCampaign();
                }
            });
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('campaignFinishModalCtrl', ['$scope', '$alert', 'campaignsService', 'modalOptions', function ($scope, $alert, campaignsService, modalOptions) {

        $scope.activate = function () {
            modalOptions.activateCampaign().then(function () {
                $scope.$hide();
                $alert({
                    // title: 'Campagin deleted.',
                    content: 'Activation successful',
                    container: '#alerts-container',
                    placement: 'top',
                    duration: 3,
                    type: 'success',
                    show: true
                });
            }, function () {

                $scope.$hide();
                $alert({
                    // title: 'Campagin deleted.',
                    content: 'Cannot activation this campaign',
                    container: '#alerts-container',
                    placement: 'top',
                    duration: 3,
                    type: 'error',
                    show: true
                });
            });
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('magazineAdsCtrl', ['$scope', '$state', '$stateParams', 'campaignEditorService', 'campaignId', 'viewDetail', 'kachingZonecampaignEditorService', 'campaignsService', '$q', function ($scope, $state, $stateParams, campaignEditorService, campaignId, viewDetail, kachingZonecampaignEditorService, campaignsService, $q) {
        var editor = kachingZonecampaignEditorService;

        $scope.logData = function () {
            editor.logData();
        };

        editor.init(campaignId);

        $scope.step = 2;
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
            $scope.createMode = false;
        } else {
            $scope.createMode = true;
        }

        var templateFolder = kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/magazine-ads/steps/';
        $scope.magazineAdsStep = {
            step1: templateFolder + 'step1.html',
            step2: templateFolder + 'step2.html',
            step3: templateFolder + 'step3.html',
            step4: templateFolder + 'step4.html'
        };

        $scope.goNext = function () {
            $scope.step += 1;
            $scope.progress += 1;
        };

        $scope.goPrev = function () {
            $scope.step -= 1;
        };

        $scope.updateStep = function (newVal) {
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

        $scope.updateBalance = function (value) {
            $scope.balance = value;
        };

        $scope.activeCampaign = function () {
            var deferred = $q.defer();
            var campaignStatus = editor.dataGet('campaignStatus');

            var campaignId = editor.dataGet('campaignId');
            campaignsService.getCampaign(campaignId).then(function (data) {
                if (data.media && data.media.length > 0) {
                    if (campaignStatus === 'start' || campaignStatus === false || !$scope.editId && !campaignStatus) {
                        $scope.campaignId = editor.dataGet('campaignId');
                        campaignsService.setPrepared($scope.campaignId).then(function (response) {
                            deferred.resolve(response);
                        }, function (response) {
                            deferred.reject(response);
                        });
                    }
                } else {
                    deferred.reject();
                }
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        $scope.goToFund = function (modal) {
            $scope.$broadcast('fund-broadcast');
            modal.$hide();
            $state.go('funds');
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('magStep1Ctrl', ['$scope', '$state', '$stateParams', 'apiUrl', 'authToken', 'errorHandler', 'campaignEditorService', 'utils', 'FileUploader', 'campaignsService', '$q', '$http', '$location', '$anchorScroll', 'kachingZonesHelpers', 'kachingZonecampaignEditorService', 'userService', function ($scope, $state, $stateParams, apiUrl, authToken, errorHandler, campaignEditorService, utils, FileUploader, campaignsService, $q, $http, $location, $anchorScroll, kachingZonesHelpers, kachingZonecampaignEditorService, userService) {
        var helper = kachingZonesHelpers;
        // var editor = campaignEditorService;
        var editor = kachingZonecampaignEditorService;

        $scope.view = {
            busy: true
        };
        $scope.fieldHasError = utils.fieldHasError;

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/media/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });
        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            if (newItem.alias === 'customerLogo') {
                $scope.campaign.logo_image = newItem._file;
            }
            if (newItem.alias === 'backgroundImage') {
                $scope.campaign.header_image = newItem._file;
            }
        };

        $scope.campaign = {};
        $scope.targeting = {};
        $scope.budgeting = {};
        $scope.daterange = {
            dates: {
                startDate: null,
                endDate: null
            },
            min: moment().format('YYYY-MM-DD'),
            display: 'Select date range'
        };

        $scope.data = {
            campaign: $scope.campaign,
            targeting: $scope.targeting,
            budgeting: $scope.budgeting,
            daterange: $scope.daterange
        };
        $scope.hasBudget = false;

        $scope.campaignStatus = {
            status: 'start'
        };

        // flatform
        $scope.allFlatform = {
            all: 'true'
        };
        $scope.flatform = {
            os: 'ios'
        };

        $scope.$watch('allFlatform.all', function (newValue, oldValue) {
            if (newValue === 'true' || newValue === true) {
                $scope.flatform.os = null;
            } else {
                if ($scope.flatform.os === null) {
                    $scope.flatform.os = 'ios';
                }
            }
        });

        $scope.$watch('flatform.os', function (newValue, oldValue) {
            if (newValue !== null) {
                $scope.allFlatform.all = 'false';
            }
        });

        // gender
        $scope.allGender = {
            all: 'true'
        };
        $scope.gender = {
            sex: 'male'
        };

        $scope.$watch('allGender.all', function (newValue, oldValue) {
            if (newValue === 'true' || newValue === true) {
                $scope.gender.sex = null;
            } else {
                if ($scope.gender.sex === null) {
                    $scope.gender.sex = 'male';
                }
            }
        });

        $scope.$watch('gender.sex', function (newValue, oldValue) {
            if (newValue !== null) {
                $scope.allGender.all = 'false';
            }
        });

        // community

        $scope.communityOption = {
            all: true
        };
        $scope.unSelectAllCommunities = function () {
            $scope.targeting.selectedCommunity = [];
        };
        $scope.firstSelectCommunity = function () {
            if ($scope.data.selectedCommunity.length === 0) {
                $scope.data.selectedCommunity = ['Urban'];
            }
        };
        $scope.toggleCommunity = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }

            $scope.communityOption.all = false;
        };
        $scope.communityExists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.updateDataModel = function (e, obj) {
            e.preventDefault();
            obj.selected = !obj.selected;
            console.log($scope.data);
        };
        var initCampaign = function initCampaign() {
            var deferred = $q.defer();
            if ($scope.editId !== undefined) {
                campaignsService.getCampaign($scope.editId).then(function (campaign) {
                    $scope.campaign = campaign;
                    $scope.campaign.logo_image = campaign.logo_image;
                    $scope.campaign.header_image = campaign.header_image;
                    // $scope.campaign.amount = campaign.fund;
                    $scope.campaign.customerName = campaign.client;
                    $scope.campaign.description = campaign.description;
                    $scope.campaign.logo_description = campaign.logo_description;
                    $scope.campaign.header_description = campaign.header_description;

                    if (typeof $scope.campaign.start_date !== 'undefined' && typeof $scope.campaign.end_date !== 'undefined') {
                        $scope.daterange.dates.startDate = moment($scope.campaign.start_date);
                        $scope.daterange.dates.endDate = moment($scope.campaign.end_date);
                        $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
                    }
                    $scope.campaign.type = 'magazine';
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            } else {
                $scope.campaign = editor.dataGet('campaign');
                if (typeof $scope.campaign.start_date !== 'undefined' && typeof $scope.campaign.end_date !== 'undefined') {
                    $scope.daterange.dates.startDate = moment($scope.campaign.start_date);
                    $scope.daterange.dates.endDate = moment($scope.campaign.end_date);
                    $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
                }
                $scope.campaign.type = 'magazine';
                deferred.resolve();
            }
            return deferred.promise;
        };

        var updateGender = function updateGender() {
            if ($scope.targeting.gender.male && $scope.targeting.gender.female) {
                $scope.allGender.all = 'true';
                $scope.gender.sex = null;
            } else {
                if ($scope.targeting.gender.male) {
                    $scope.gender.sex = 'male';
                } else {
                    $scope.gender.sex = 'female';
                }
                $scope.allGender.all = 'false';
            }
        };

        var updatePlatform = function updatePlatform() {
            if ($scope.targeting.os.ios && $scope.targeting.os.android) {
                $scope.allFlatform.all = 'true';
                $scope.flatform.os = null;
            } else {
                if ($scope.targeting.os.ios) {
                    $scope.flatform.os = 'ios';
                } else {
                    $scope.flatform.os = 'android';
                }
                $scope.allFlatform.all = 'false';
            }
        };

        var initTargetings = function initTargetings() {
            var deferred = $q.defer();
            var targetingData = editor.dataGet('targeting');
            if (!_.isEmpty(targetingData)) {
                $scope.targeting = targetingData;
                updateGender();
                updatePlatform();
                deferred.resolve();
            } else {
                // $scope.view.busy = true;
                var id = $scope.editId || undefined;
                campaignsService.getTargeting(id).then(function (response) {
                    $scope.targeting.allCategories = response.allCategories;
                    $scope.targeting.allLocations = response.allLocations;
                    $scope.targeting.categories = response.categories;
                    $scope.targeting.locations = response.locations;
                    $scope.targeting.gender = response.gender;
                    $scope.targeting.os = response.os;
                    $scope.targeting.ageRange = response.ageRange;
                    $scope.targeting.ageRanges = response.ageRanges;
                    // $scope.view.busy = false;
                    updateGender();
                    updatePlatform();
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };
        var initBudgeting = function initBudgeting() {
            var deferred = $q.defer();
            var budgetingData = editor.dataGet('budgeting');
            if (!_.isEmpty(budgetingData)) {
                $scope.budgeting = budgetingData;
                $scope.hasBudget = true;
            } else {
                if ($scope.editId) {
                    campaignsService.getCampaignBudget($scope.editId).then(function (data) {
                        $scope.budgeting = data.results[0];
                        $scope.hasBudget = true;
                        deferred.resolve();
                    }, function (response) {
                        errorHandler.processApiResponse(response);
                        deferred.reject();
                    });
                }
            }
            deferred.resolve();
            return deferred.promise;
        };
        var initBalance = function initBalance() {
            var deferred = $q.defer();
            userService.getBalance().then(function (response) {
                $scope.balance = response.credits_balance / response.cash_to_credits_conversion_ratio;
                console.log('balance: ', $scope.balance);
                $scope.updateBalance($scope.balance);
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };
        var initData = function initData() {
            var deferred = $q.defer();
            var deferred1 = $q.defer();
            var deferred2 = $q.defer();
            var deferred3 = $q.defer();
            var deferred4 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise, deferred3.promise, deferred4.promise];

            initCampaign().then(function () {
                deferred1.resolve();
            }, function () {
                deferred1.reject();
            });
            initTargetings().then(function () {
                deferred2.resolve();
            }, function () {
                deferred2.reject();
            });
            initBudgeting().then(function () {
                deferred3.resolve();
            }, function () {
                deferred3.reject();
            });

            initBalance().then(function () {
                deferred4.resolve();
            }, function () {
                deferred4.reject();
            });

            $q.all(promisses).then(function () {
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var init = function init() {
            editor.currentStep(1);
            editor.previousState(1);
            $scope.fundError = false;

            $scope.catAccordionStatus = {
                open: true
            };

            $scope.countriesAccordionStatus = {
                open: true
            };

            $scope.view.busy = true;
            initData().then(function () {
                if ($scope.editId) {
                    $scope.campaign.id = $scope.editId;
                    // $scope.hasBudget = true;
                }
                $scope.view.busy = false;
            }, function () {
                $scope.view.busy = false;
            });
        };

        $scope.$watch(function () {
            return $scope.daterange.dates;
        }, function (newValue, oldValue) {
            if (newValue === undefined || newValue.startDate === null || newValue.endDate === null) {
                return;
            }
            $scope.daterange.display = newValue.startDate.format('YYYY-MM-DD') + ' - ' + newValue.endDate.format('YYYY-MM-DD');
        });
        $scope.showErrors = function () {
            return editor.stepGet('step1', 'submitted');
        };
        function checkAllOption(allVal, arrVal) {
            var all = true;
            angular.forEach(arrVal, function (item, index) {
                if (item.selected === false) {
                    all = false;
                    return;
                }
            });
            return all;
        }

        $scope.scrollToFirstError = function () {
            if (angular.element('.has-error').length > 0) {
                var firstErrorId = angular.element('.has-error')[0].id;

                // angular.element()
                $location.hash(firstErrorId);
                $anchorScroll();
            }
        };

        $scope.nextStep = function () {
            editor.stepSet('step1', 'submitted', true);
            editor.dataSet('campaignStatus', $scope.campaignStatus.status);

            $scope.targeting.allCategories = checkAllOption($scope.targeting.allCategories, $scope.targeting.categories);
            $scope.targeting.allLocations = checkAllOption($scope.targeting.allLocations, $scope.targeting.locations);

            if ($scope.form1.$valid) {
                $scope.view.busy = true;
                editor.stepSet('step1', 'valid', true);

                $scope.campaign.start_date = $scope.daterange.dates.startDate.toISOString();
                $scope.campaign.end_date = $scope.daterange.dates.endDate.toISOString();
                // Store data to model in kaching zone campaign editor service.
                editor.dataSet('campaign', $scope.campaign);

                if ($scope.allFlatform.all === 'true') {
                    $scope.targeting.os.android = true;
                    $scope.targeting.os.ios = true;
                } else {
                    if ($scope.flatform.os === 'ios') {
                        $scope.targeting.os.ios = true;
                        $scope.targeting.os.android = false;
                    } else {
                        $scope.targeting.os.ios = false;
                        $scope.targeting.os.android = true;
                    }
                }

                if ($scope.allGender.all === 'true') {
                    $scope.targeting.gender.male = true;
                    $scope.targeting.gender.female = true;
                } else {
                    if ($scope.gender.sex === 'male') {
                        $scope.targeting.gender.male = true;
                        $scope.targeting.gender.female = false;
                    } else {
                        $scope.targeting.gender.male = false;
                        $scope.targeting.gender.female = true;
                    }
                }

                // Store data to model in kaching zone campaign editor service.
                editor.dataSet('targeting', $scope.targeting);

                // dummy budgeting data - TODO: replace this with real data
                if ($scope.editId === undefined && !$scope.hasBudget) {
                    $scope.budgeting = {
                        cost_per_view: 12,
                        amount: 0,
                        type: 1
                    };
                }
                $scope.budgeting.hasBudget = $scope.hasBudget;

                editor.dataSet('budgeting', $scope.budgeting);

                $scope.fundError = false;
                editor.save('step1').then(function (data) {
                    $scope.goNext();
                    $scope.view.busy = false;
                    if ($scope.editId !== undefined && editor.stepGet('step1', 'submitted')) {
                        helper.alert('success', 'Campaign has been updated.');
                    } else {
                        helper.alert('success', 'Campaign has been created.');
                    }
                    $scope.activeCampaign();
                }, function (response) {
                    if (response.status == 400 && response.data.errorDetails.logicProcessing.processingErrors[0].code == 44) {
                        helper.alert('danger', response.data.errorDetails.logicProcessing.processingErrors[0].message);
                        $scope.fundError = true;
                    } else {
                        errorHandler.processApiResponse(response);
                    }
                    $scope.view.busy = false;
                    console.log('create campaign error');
                });
            } else {
                editor.stepSet('step1', 'valid', false);
                if (angular.element('.ng-invalid').length > 0) {
                    angular.element('.ng-invalid').focus();
                }
                if (angular.element('.image-error').length > 0) {
                    angular.element('.image-error').focus();
                }
                setTimeout(function () {
                    $scope.scrollToFirstError();
                }, 100);
            }
        };
        $scope.logControllerData = function () {
            console.log('campaignEditorStep1Ctrl - campaign', angular.copy($scope.campaign));
        };

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.nextStep();
            }
        });

        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('magStep2Ctrl', ['$scope', '$state', 'apiUrl', 'authToken', 'utils', 'mediaService', 'FileUploader', 'countryService', 'kachingZonecampaignEditorService', 'campaignsService', '$http', '$q', 'errorHandler', 'kachingZonesHelpers', '$anchorScroll', '$location', function ($scope, $state, apiUrl, authToken, utils, mediaService, FileUploader, countryService, kachingZonecampaignEditorService, campaignsService, $http, $q, errorHandler, kachingZonesHelpers, $anchorScroll, $location) {
        var helper = kachingZonesHelpers;
        var editor = kachingZonecampaignEditorService;
        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/media/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });

        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            busy: true,
            uploading: false,
            submitted: false,
            mediaCreated: false,

            videoUploadStarted: false,
            videoUploadProgress: 0,
            videoUploadComplete: false,

            imageUploadStarted: false,
            imageUploadProgress: 0,
            imageUploadComplete: false,

            arImageUploadStarted: false,
            arImageUploadProgress: 0,
            arImageUploadComplete: false,

            brandImageUploadStarted: false,
            brandImageUploadProgress: 0,
            brandImageUploadComplete: false
        };

        $scope.data = {
            arImageFile: '',
            imageFile: '',
            mediaName: '',
            mediaId: '',
            imageName: '',
            arImageName: '',
            description: '',
            brandImageFile: '',
            brandDescription: '',
            animation: ''
        };

        $scope.magezines = ['Tatler', 'GQ', 'Time', 'The Economist', 'Cosmopolitan', 'National Geographic', 'Sports Illustrated', 'Glamour', 'Other'];

        // Check other values of selected
        $scope.changeSelect = function () {
            if ($scope.selectedMagezine.toUpperCase() === 'OTHER') {
                if (!$scope.magazineOther) {
                    $scope.magazineOther = '';
                }
                $scope.isOther = true;
            } else {
                $scope.isOther = false;
            }
        };

        $scope.mediaTypeProp = {
            'type': 'select',
            'name': 'media_type',
            'mediaTypeSelect': 'Upload Media',
            'values': ['Upload Media', 'External Link']
        };

        $scope.errors = {
            video: {},
            image: {},
            arImage: {}
        };

        var imageStyle = 'background-image: none;border-color: #ccc;';
        $scope.imageList = [imageStyle, imageStyle, imageStyle, imageStyle];
        $scope.imageFileList = [];
        $scope.imageReviewIdx = 0;

        $scope.mediaList = [];

        var checkFormPristine = function checkFormPristine() {
            if (!$scope.form1.$pristine) {
                return false;
            } else {
                // if ($scope.latitude || $scope.longitude) {
                //     return false;
                // }
                for (var property in $scope.data) {
                    if ($scope.data[property]) {
                        return false;
                    }
                }
                return true;
            }
        };

        $scope.nextStep = function () {
            $scope.form1.$setSubmitted();
            if (checkFormPristine() && $scope.mediaList.length > 0) {
                editor.stepSet('step2', 'submitted', true);
                if ($scope.mediaList.length > 0) {
                    editor.stepSet('step2', 'valid', true);
                    $scope.finish().then(function () {
                        $scope.goNext();
                    });
                } else {
                    editor.stepSet('step2', 'valid', false);
                    setTimeout(function () {
                        $scope.scrollToFirstError();
                    }, 100);
                    helper.alert('danger', 'Please add at least one AR');
                }
            } else {
                $scope.saveMedia().then(function () {
                    editor.stepSet('step2', 'submitted', true);
                    if ($scope.mediaList.length > 0) {
                        editor.stepSet('step2', 'valid', true);
                        $scope.finish().then(function () {
                            $scope.goNext();
                        });
                    } else {
                        editor.stepSet('step2', 'valid', false);
                        setTimeout(function () {
                            $scope.scrollToFirstError();
                        }, 100);
                        helper.alert('danger', 'Please add at least one AR');
                    }
                }, function () {});
            }
        };

        $scope.goPrev = function () {
            $scope.updateStep(1);
        };

        $scope.updateReviewIndex = function (idx) {
            $scope.imageReviewIdx = idx;
            $scope.data.imageFile = $scope.imageFileList[$scope.imageReviewIdx];
            console.log($scope.data.imageFile);
        };

        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            if (newItem.alias === 'arDisplay') {
                $scope.data.arImageFile = newItem._file;
            }
            if (newItem.alias === 'brandImage') {
                $scope.data.brandImageFile = newItem._file;
            }
            if (newItem.alias === 'display') {
                $scope.data.imageFile = newItem._file;
                setTimeout(function () {
                    var $review = angular.element('.uploader-dropzone.image-selected');
                    var imgStyle = $review.attr('style');
                    $scope.imageList[$scope.imageReviewIdx] = imgStyle;
                    $scope.imageFileList[$scope.imageReviewIdx] = $scope.data.imageFile;
                    $scope.imageReviewIdx++;
                    if ($scope.imageReviewIdx === 4) {
                        $scope.imageReviewIdx = 0;
                    }
                    $scope.$apply();
                }, 100);
            }
        };

        uploader.onBeforeUploadItem = function (item) {
            if (item.alias === 'arDisplay') {
                $scope.view.arImageUploadStarted = true;
            }
            if (item.alias === 'display') {
                $scope.view.imageUploadStarted = true;
            }
            if (item.alias === 'brandImage') {
                $scope.view.brandImageUploadStarted = true;
            }
            item.url = apiUrl + '/media/' + $scope.data.mediaId + '/';
        };

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            if (fileItem.alias === 'arDisplay') {
                $scope.view.arImageUploadComplete = true;
            }
            if (fileItem.alias === 'display') {
                $scope.view.imageUploadComplete = true;
            }
            if (fileItem.alias === 'display') {
                $scope.view.brandImageUploadComplete = true;
            }
        };

        uploader.onProgressItem = function (fileItem, progress) {
            if (fileItem.alias === 'arDisplay') {
                $scope.view.arImageUploadProgress = progress;
            }
            if (fileItem.alias === 'display') {
                $scope.view.imageUploadProgress = progress;
            }
            if (fileItem.alias === 'brandImage') {
                $scope.view.brandImageUploadProgress = progress;
            }
        };

        uploader.onCompleteAll = function () {
            $scope.view.mediaCreated = true;
        };

        $scope.showErrors = function () {
            return $scope.view.submitted;
        };

        $scope.videoHasError = function () {
            return _typeof($scope.data.videoFile) !== 'object';
        };

        $scope.imageHasError = function () {
            if (_typeof($scope.data.imageFile) !== 'object') {
                return true;
            } else {
                return false;
            }
        };

        $scope.viewMedia = function () {
            $scope.$hide();
            $state.go('media.view', {
                mediaId: $scope.data.mediaId
            });
        };

        $scope.editMedia = function (mediaId) {
            helper.alert('info', 'You are in edit mode!');
            $scope.editMode = true;
            helper.resetAngularFields($scope);
            $scope.previewMediaId = mediaId.id;
            mediaService.getMediaItem($scope.previewMediaId).then(function (response) {
                $scope.data.description = response.description;
                $scope.data.arImageFile = helper.getMediaPreviewFromUrl(response.ar_resource);
                $scope.data.arImageName = response.ar_name;
                $scope.appearance = response.ar_appearance;
                $scope.imageType = response.ar_resource_type;
                $scope.data.imageName = response.target_name;
                $scope.data.url = response.target_url;
                $scope.data.imageFile = response.target;
                $scope.data.brandImageFile = response.brand_image;
                $scope.selectedGender = response.gender;
                $scope.selectedCategory = response.category;
                $scope.data.animation = response.animation_type;
                $scope.selectedMagezine = response.magazine_name;

                if (_.find($scope.magezines, function (item) {
                    return item == $scope.selectedMagezine;
                })) {
                    $scope.isOther = false;
                } else {
                    $scope.isOther = true;
                    $scope.magazineOther = $scope.selectedMagezine;
                    $scope.selectedMagezine = 'Other';
                }

                $scope.imageList = [];
                $scope.imageFileList = [];
                $scope.imageReviewIdx = 0;
                if ($scope.data.imageFile) {
                    setTimeout(function () {
                        var $review = angular.element('.uploader-dropzone.image-selected');
                        var imgStyle = $review.attr('style');
                        $scope.imageList.push(imgStyle);
                        $scope.imageFileList.push(imgStyle);
                        $scope.imageReviewIdx = 1;
                        var emptyImageStyle = 'background-image: none;border-color: #ccc;';
                        while ($scope.imageList.length < 4) {
                            $scope.imageList.push(emptyImageStyle);
                        }
                        if ($scope.imageList.length > 0) {
                            $scope.isAddImage = true;
                        }
                    }, 100);
                } else {
                    var emptyImageStyle = 'background-image: none;border-color: #ccc;';
                    while ($scope.imageList.length < 4) {
                        $scope.imageList.push(emptyImageStyle);
                    }
                }
            });
        };

        var saveMedia = function saveMedia() {

            var deferred = $q.defer();

            if ($scope.form1.$valid && $scope.data.arImageFile !== null) {
                $scope.validateError = false;
                $scope.isAddImage = false;

                var mediaData = {
                    description: $scope.data.description,
                    type: 'magazine',
                    ar_name: $scope.data.arImageName,
                    ar_appearance: $scope.appearance,
                    ar_resource_type: $scope.imageType,
                    target_name: $scope.data.imageName,
                    target_format: 'magazine'
                    // target_url: $scope.data.url,
                };
                if ($scope.selectedMagezine) {
                    if ($scope.selectedMagezine.toUpperCase() === 'OTHER') {
                        mediaData.magazine_name = $scope.magazineOther;
                        $scope.magazineOther = '';
                    } else {
                        mediaData.magazine_name = $scope.selectedMagezine;
                    }
                }

                if ($scope.data.url) {
                    mediaData.target_url = $scope.data.url;

                    if (mediaData.target_url.indexOf('http://') === -1) {
                        mediaData.target_url = 'http://' + mediaData.target_url;
                    }
                } else {
                    if (!$scope.data.url) {
                        mediaData.target_url = '';
                    }
                }

                if ($scope.editMode) {
                    mediaData.id = $scope.previewMediaId;
                }

                if ($scope.data.arImageFile !== null && _typeof($scope.data.arImageFile) === 'object') {
                    mediaData.ar_resource = $scope.data.arImageFile;
                }
                if ($scope.data.imageFile !== null && _typeof($scope.data.imageFile) === 'object') {
                    mediaData.target = $scope.data.imageFile;
                } else {
                    if (!$scope.data.imageFile) {
                        mediaData.target = '';
                    }
                }

                mediaService.saveKachingZoneMedia(mediaData).then(function (data) {
                    deferred.resolve(data);
                }, function (response) {
                    deferred.reject(response);
                });
            } else {
                $scope.validateError = true;
                editor.stepSet('step2', 'valid', false);
                setTimeout(function () {
                    $scope.scrollToFirstError();
                }, 100);
                deferred.reject();
            }
            return deferred.promise;
        };

        $scope.saveMedia = function () {
            var deferred = $q.defer();
            if ($scope.form1.$valid) {
                $scope.view.busy = true;
                saveMedia().then(function (data) {
                    $scope.form1.$setPristine();
                    if ($scope.editMode) {
                        $scope.editMode = false;
                        helper.alert('success', 'Media has been updated.');
                        $scope.view.busy = false;
                        $scope.clearForm();
                        $scope.loadSubmittedMedia();
                        deferred.resolve();
                    } else {
                        $scope.mediaList.push(data);
                        editor.dataSet('mediaList', $scope.mediaList);
                        $scope.getMedia(data.id).then(function () {
                            deferred.resolve();
                        }, function () {
                            deferred.reject();
                        });
                        $scope.clearForm();
                    }
                }, function (response) {
                    $scope.form1.$setPristine();
                    $scope.view.busy = false;
                    deferred.reject();
                });
            } else {
                $scope.scrollToFirstError();
                helper.alert('danger', 'Please, fill all required fields');
                deferred.reject();
            }
            return deferred.promise;
        };

        $scope.deleteMedia = function (mediaId) {
            $scope.previewMediaId = mediaId.id;
            campaignsService.deleteMedia($scope.previewMediaId).then(function (response) {
                console.log(response);
                helper.alert('success', 'Media has been deleted');
                $scope.loadSubmittedMedia();
            }, function (response) {
                console.log(response);
                helper.alert('danger', 'Media has not been deleted.');
            });
        };

        $scope.removeAddImageForm = function () {
            $scope.data.description = '';
            $scope.data.imageName = '';
            $scope.data.imageFile = '';
            $scope.data.url = '';
            $scope.selectedMagezine = $scope.magezines[0];
            $scope.magazineOther = '';

            helper.clearFileUploader('#imageFile');
            helper.clearFileUploader('.image-review-list');
            $scope.imageList = [];
            $scope.imageReviewIdx = 0;
            var imageStyle = 'background-image: none;border-color: #ccc;';
            $scope.imageList = [imageStyle, imageStyle, imageStyle, imageStyle];

            var mediaData = {
                description: '',
                target: '',
                target_name: '',
                target_format: '',
                target_url: '',
                magazine_name: ''
            };

            $scope.isAddImage = false;
            $scope.isOther = false;
            $scope.form1.description.$pristine;
            $scope.form1.imageName.$pristine;
            $scope.form1.imageFile.$pristine;
            $scope.form1.url.$pristine;
        };

        $scope.clearForm = function () {
            helper.clearForm();

            $scope.data = {
                arImageFile: '',
                imageFile: '',
                mediaName: '',
                mediaId: '',
                imageName: '',
                arImageName: '',
                description: '',
                brandImageFile: '',
                brandDescription: '',
                animation: ''
            };

            helper.clearFileUploader('#imageFile');
            helper.clearFileUploader('#arImageFile');
            helper.clearFileUploader('.image-review-list');

            $scope.imageList = [];
            var emptyImageStyle = 'background-image: none;border-color: #ccc;';
            while ($scope.imageList.length < 4) {
                $scope.imageList.push(emptyImageStyle);
            }
            $scope.imageFileList = [];
            $scope.imageReviewIdx = 0;
        };

        $scope.cancelEdit = function () {
            $scope.clearForm();
            $scope.editMode = false;
            $scope.magazineOther = '';
            $scope.isAddImage = false;
        };

        $scope.getMedia = function (mediaId) {
            var deferred = $q.defer();
            // $scope.view.busyMedia = true;
            $scope.view.busy = true;
            mediaService.getMediaItem(mediaId).then(function (mediaItem) {
                $scope.view.busy = false;
                $scope.media = mediaItem;
                editor.dataSet('media', $scope.media);

                editor.save('step2').then(function () {
                    $scope.campaignId = editor.dataGet('campaignId');
                    campaignsService.getCampaign($scope.campaignId);
                    // show notification
                    helper.alert('success', 'Media has been created.');
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }, function () {
                // $scope.view.busyMedia = false;
                $scope.view.busy = false;
                deferred.reject();
            });
            return deferred.promise;
        };
        $scope.getFormats = function () {
            $scope.formats = ['Commercial'];
        };

        $scope.getFormats();

        $scope.loadSubmittedMedia = function () {
            if (editor.dataGet().campaignId !== undefined) {
                campaignsService.getCampaign(editor.dataGet().campaignId).then(function (response) {
                    $scope.mediaList = response.media;
                });
            }
        };

        $scope.finish = function () {

            var deferred = $q.defer();

            var campaignStatus = editor.dataGet('campaignStatus');
            var campaign = editor.dataGet('campaign');

            if (campaignStatus === 'start' && !campaign.status || $scope.editId) {
                // $scope.view.busy = true;
                // $scope.campaignId = editor.dataGet( 'campaignId' );
                // campaignsService.setPrepared( $scope.campaignId ).then(
                //     function( response ) {
                //         $scope.view.busy = false;
                //         deferred.resolve(response);
                //     },
                //     function( response ) {
                //         errorHandler.processApiResponse( response );
                //         $scope.view.busy = false;
                //         deferred.reject(response);
                //     }
                // );
                $scope.activeCampaign().then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        };

        $scope.scrollToFirstError = function () {
            var elementName = $scope.form1.$error.required[0].$name;
            var firstErrorId = document.getElementsByName(elementName)[0].id;
            $location.hash(firstErrorId);
            $anchorScroll();
        };

        $scope.needBasicValidateZone = function () {
            if ($scope.data.imageName || $scope.data.imageFile) {
                return true;
            } else {
                return false;
            }
        };

        $scope.init = function () {
            // //BEGIN: fake data
            // $scope.data.imageName       = "image name";
            // $scope.data.description     = "description";
            // $scope.data.arImageName     = "ar image name";
            // $scope.data.url             = "http://abc.com";
            // $scope.inclusionZone        = 10;
            // $scope.address              = "14/2 Trường Chinh, Phường 15, Tân Bình, Hồ Chí Minh, Vietnam";
            // //END: fake data
            $scope.editMode = false;
            $scope.isAddImage = false;
            $scope.loadSubmittedMedia();
            var targetingData = editor.dataGet('targeting');
            $scope.view.busy = false;
        };

        function checkMediaValidation() {
            if ($scope.data.arImageName === '') {
                helper.alert('danger', 'Please, fill all required fields');
                return false;
            }
            return true;
        }
        function checkCampaignValidation() {
            if ($scope.mediaList.length !== 0) {
                return true;
            }
            helper.alert('danger', 'Please, submit at least one media');
            return false;
        }

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.nextStep();
            }
        });

        $scope.init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('magStep3Ctrl', ['$scope', 'productsService', 'kachingZonecampaignEditorService', 'campaignsService', 'mediaService', 'utils', 'FileUploader', 'apiUrl', 'authToken', '$http', '$q', 'errorHandler', 'kachingZonesHelpers', function ($scope, productsService, kachingZonecampaignEditorService, campaignsService, mediaService, utils, FileUploader, apiUrl, authToken, $http, $q, errorHandler, kachingZonesHelpers) {
        var helper = kachingZonesHelpers;
        var editor = kachingZonecampaignEditorService;

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/products/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });

        $scope.view = {
            busy: true,
            productImageUploadStarted: false,
            productImageUploadProgress: 0,
            productImageUploadComplete: false
        };

        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            $scope.data.productImageFile = newItem._file;
        };

        uploader.onBeforeUploadItem = function (item) {
            $scope.view.productImageUploadStarted = true;
            item.url = apiUrl + '/media/' + $scope.data.mediaId + '/';
        };

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.view.productImageUploadComplete = true;
        };

        uploader.onProgressItem = function (fileItem, progress) {
            $scope.view.productImageUploadProgress = progress;
        };

        uploader.onCompleteAll = function () {
            $scope.view.mediaCreated = true;
        };

        $scope.data = {
            'title': '',
            'description': '',
            'pirce': '',
            'url': ''
        };

        $scope.previewData = {
            isInstore: false,
            followIBeacon: { enabled: false },
            scanReceipt: { enabled: false },
            issueQR: { enabled: false },
            buyProducts: { enabled: false },
            sendInformation: { enabled: false },
            register: { enabled: false },
            share: { enabled: false },
            openMicrophone: { enabled: false },
            watchVideo: { enabled: false }
        };

        $scope.recommendedProducts = [];
        $scope.carouselOptions = {
            nav: true,
            dots: false,
            navText: ['<span class="glyphicon glyphicon-triangle-left"></span>', '<span class="glyphicon glyphicon-triangle-right"></span>'],
            navRewind: false,
            loop: false,
            items: 4
        };
        $scope.products = editor.dataGet('products');

        var myArr = [{
            type: 'type',
            perDollarPerClick: 3
        }, {
            type: 'another type',
            perDollarPerClick: 2
        }];
        $scope.purchaseAds = myArr;

        $scope.fieldHasError = utils.fieldHasError;
        $scope.showErrors = function () {
            return editor.stepGet('step3', 'submitted');
        };

        $scope.nextStep = function () {
            editor.stepSet('step3', 'submitted', true);
            if ($scope.form1.$valid) {
                $scope.view.busy = true;
                editor.stepSet('step3', 'valid', true);
                $scope.updateAllMedia($scope.medias).then(function () {
                    $scope.goNext();
                    helper.alert('success', 'All media has been updated');
                    $scope.view.busy = false;
                    $scope.activeCampaign();
                }, function (response) {
                    $scope.view.busy = false;
                    errorHandler.processApiResponse(response);
                });
            }
        };

        $scope.selectRecommendedProduct = function (product) {
            $scope.editMode = true;
            $scope.data.productIdInEdit = product.id;
            $scope.data.title = product.title;
            $scope.data.description = product.description;
            $scope.data.price = product.price;
            $scope.data.url = product.url;
            $scope.data.productImageFile = product.image;
            helper.alert('info', 'Product in edit mode!');
        };

        $scope.updateAllMedia = function (medias) {
            var deferred = $q.defer();
            var promisses = [];

            angular.forEach(medias, function (media) {
                var prodDeferred = $q.defer();
                promisses.push(prodDeferred.promise);
                var mediaData = {
                    id: media.id,
                    bets_per_view: media.bets_per_view,
                    type: 'magazine'
                };
                campaignsService.updateMedia(mediaData).then(function (response) {
                    prodDeferred.resolve(response);
                }, function (response) {
                    prodDeferred.reject(response);
                });

                // Update Media
                var rewardDeferred = $q.defer();
                promisses.push(rewardDeferred.promise);
                var rewardData = {
                    send_information: media.reward.send_information,
                    share: media.reward.share,
                    product: media.reward.product
                };
                mediaService.updateReward(media.id, rewardData).then(function (response) {
                    rewardDeferred.resolve(response);
                }, function (response) {
                    rewardDeferred.reject(response);
                });

                // Update Campaign
                var registerDeferred = $q.defer();
                promisses.push(registerDeferred.promise);
                var campaign = {
                    id: $scope.campaignId,
                    register: $scope.campaign.register
                };
                campaignsService.saveKachingZoneCampagin(campaign).then(function (response) {
                    registerDeferred.resolve(response);
                }, function (response) {
                    registerDeferred.reject(response);
                });
            });
            $q.all(promisses).then(function () {
                deferred.resolve();
            });
            return deferred.promise;
        };

        $scope.saveProduct = function () {
            if ($scope.data.url.match(/^http[s]?:\/\//i) === null) {
                $scope.data.url = 'http://' + $scope.data.url;
            }
            var productData = {
                title: $scope.data.title,
                description: $scope.data.description,
                price: $scope.data.price,
                url: $scope.data.url,
                image: $scope.data.productImageFile
            };

            var deferred = $q.defer();
            productsService.createProduct(productData).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
                errorHandler.processApiResponse(response);
            });

            return deferred.promise;
        };

        $scope.updateProduct = function (productId) {
            if ($scope.data.url.match(/^http[s]?:\/\//i) === null) {
                $scope.data.url = 'http://' + $scope.data.url;
            }
            var productData = {
                id: productId,
                title: $scope.data.title,
                description: $scope.data.description,
                price: $scope.data.price,
                url: $scope.data.url
            };
            if (_typeof($scope.data.productImageFile) === 'object' && $scope.data.productImageFile != null) {
                productData.image = $scope.data.productImageFile;
            }
            var deferred = $q.defer();
            productsService.createProduct(productData).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
                errorHandler.processApiResponse(response);
            });
            return deferred.promise;
        };

        $scope.submitProduct = function () {
            if ($scope.editMode) {
                $scope.updateProduct($scope.data.productIdInEdit).then(function (response) {
                    helper.alert('success', 'Product have been updated');
                    $scope.loadSubmittedProducts();
                    $scope.editMode = false;
                }, function (error) {
                    errorHandler.processApiResponse(error);
                    $scope.editMode = false;
                });
            } else {
                $scope.view.busy = true;
                $scope.saveProduct().then(function (response) {
                    console.log(response);
                    productsService.getProduct(response.id).then(function (product) {
                        $scope.recommendedProducts.push(product);
                        campaignsService.saveProducts($scope.campaignId, $scope.recommendedProducts).then(function (reponse) {
                            $scope.view.busy = false;
                            helper.alert('success', 'Product have been added');
                        }, function (error) {
                            errorHandler.processApiResponse(error);
                        });
                    }, function (error) {
                        errorHandler.processApiResponse(error);
                    });
                }, function (error) {
                    console.log(error);
                    $scope.view.busy = false;
                });
            }
        };

        $scope.loadSubmittedProducts = function () {
            if (editor.dataGet().campaignId !== undefined) {
                campaignsService.getCampaign(editor.dataGet().campaignId).then(function (response) {
                    $scope.recommendedProducts = response.products;
                });
            }
        };

        var init = function init() {
            // //BEGIN: fake data
            // $scope.data.title = 'product title';
            // $scope.data.url = 'testProduct.com';
            // $scope.data.price = '12';
            // $scope.data.description ='product description';
            // //END: fake data

            $scope.loadSubmittedProducts();
            utils.addUploaderTypeFilter(uploader, 'image', {
                imageFilter: ['image/png', 'image/jpg', 'image/jpeg']
            });
            $scope.campaignId = editor.dataGet('campaignId');
            $scope.grandTotal = 0;
            campaignsService.getCampaign($scope.campaignId).then(function (campaign) {
                $scope.campaign = campaign;

                if (!$scope.campaign.register) {
                    $scope.campaign.register = 0;
                }

                if (campaign.media.length > 0) {
                    $scope.medias = campaign.media;
                    angular.forEach($scope.medias, function (value, key) {
                        $scope.grandTotal += 1 * value.bets_per_view;
                        if (!value.reward) {
                            value.reward = {
                                send_information: 0,
                                share: 0,
                                product: 0
                            };
                        }
                    });
                }
                $scope.view.busy = false;
            }, function (response) {
                errorHandler.processApiResponse(response);
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
            });
        };

        init();

        $scope.$watchCollection('medias', function (newVal, oldVal) {});

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.saveProduct();
                $scope.nextStep();
            }
        });
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('magStep4Ctrl', ['$scope', 'productsService', 'campaignsService', 'campaignEditorService', 'kachingZonecampaignEditorService', '$q', 'errorHandler', function ($scope, productsService, campaignsService, campaignEditorService, kachingZonecampaignEditorService, $q, errorHandler) {
        var editor = kachingZonecampaignEditorService;
        $scope.view = {
            busy: true
        };

        $scope.locations = {};
        $scope.categories = {};

        $scope.loadSubmittedProducts = function () {
            if (editor.dataGet().campaignId !== undefined) {
                campaignsService.getCampaign(editor.dataGet().campaignId).then(function (response) {
                    $scope.recommendedProducts = response.products;
                });
            }
        };

        var initCampaign = function initCampaign() {
            var deferred = $q.defer();
            var mediaListData = editor.dataGet('mediaList');
            if (!_.isEmpty(mediaListData)) {
                $scope.mediaList = mediaListData;
                $scope.campaignId = editor.dataGet('campaignId');
                $scope.media = editor.dataGet('media');
                campaignsService.getCampaign($scope.campaignId).then(function (response) {
                    $scope.campaign = response;
                });
                deferred.resolve();
            } else {
                campaignsService.getCampaign($scope.editId).then(function (data) {
                    $scope.mediaList = data.media;
                    $scope.campaign = data;
                    angular.forEach($scope.mediaList, function (value, key) {
                        $scope.grandTotal += 1 * value.bets_per_view;
                    });
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };

        var initTargetings = function initTargetings() {
            var deferred = $q.defer();
            var targetingData = editor.dataGet('targeting');
            if (!_.isEmpty(targetingData)) {
                $scope.targeting = targetingData;
                var arrLocations = [],
                    arrCategories = [];
                // Get a location have selected true
                angular.forEach($scope.targeting.locations, function (item, id) {
                    if (item.selected === true) {
                        arrLocations.push(item);
                    }
                });
                // Get a category have selected true
                angular.forEach($scope.targeting.categories, function (item, id) {
                    if (item.selected === true) {
                        arrCategories.push(item);
                    }
                });
                $scope.locations = arrLocations;
                $scope.categories = arrCategories;
                deferred.resolve();
            } else {
                // $scope.view.busy = true;
                var id = $scope.editId || undefined;
                campaignsService.getTargeting(id).then(function (response) {
                    $scope.targeting = response;
                    var arrLocations = [],
                        arrCategories = [];
                    // Get a location have selected true
                    angular.forEach($scope.targeting.locations, function (item, id) {
                        if (item.selected === true) {
                            arrLocations.push(item);
                        }
                    });
                    // Get a category have selected true
                    angular.forEach($scope.targeting.categories, function (item, id) {
                        if (item.selected === true) {
                            arrCategories.push(item);
                        }
                    });
                    $scope.locations = arrLocations;
                    $scope.categories = arrCategories;
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };

        var initData = function initData() {
            var deferred = $q.defer();
            var deferred1 = $q.defer();
            var deferred2 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise];

            initCampaign().then(function () {
                deferred1.resolve();
            }, function () {
                deferred1.reject();
            });

            initTargetings().then(function () {
                deferred2.resolve();
            }, function () {
                deferred2.reject();
            });

            $q.all(promisses).then(function () {
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var init = function init() {
            $scope.view.busy = true;

            if (!$scope.editId) {
                if (!editor.stepGet('step1', 'valid') || !editor.stepGet('step2', 'valid') || !editor.stepGet('step3', 'valid')) {
                    $scope.updateStep(editor.currentStep());
                }
            }

            editor.currentStep(4);
            editor.previousState(4);

            $scope.loadSubmittedProducts();
            $scope.mediaList = [];
            $scope.grandTotal = 0;

            initData().then(function () {
                $scope.view.busy = false;
            }, function () {
                $scope.view.busy = false;
            });
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('instoreCampaignCtrl', ['$scope', '$state', '$stateParams', 'campaignId', 'viewDetail', 'campaignEditorService', 'kachingZonecampaignEditorService', 'campaignsService', '$q', function ($scope, $state, $stateParams, campaignId, viewDetail, campaignEditorService, kachingZonecampaignEditorService, campaignsService, $q) {
        var editor = kachingZonecampaignEditorService;

        $scope.logData = function () {
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

        var templateFolder = kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/instore-campaign/steps/';
        $scope.instoreCampaignStep = {
            step1: templateFolder + 'step2.html',
            step2: templateFolder + 'step2.html',
            step3: templateFolder + 'step3.html',
            step4: templateFolder + 'step4.html'
        };

        $scope.goNext = function () {
            $scope.step += 1;
            $scope.progress += 1;
        };

        $scope.goPrev = function () {
            $scope.step -= 1;
        };

        $scope.updateStep = function (newVal) {
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

        $scope.updateBalance = function (value) {
            $scope.balance = value;
        };

        $scope.activeCampaign = function () {
            var deferred = $q.defer();
            var campaignStatus = editor.dataGet('campaignStatus');
            var campaignId = editor.dataGet('campaignId');
            // var campaign = editor.dataGet('campaign');
            campaignsService.getCampaign(campaignId).then(function (data) {
                if (data.media && data.media.length > 0) {
                    if (campaignStatus === 'start' || campaignStatus === false || !$scope.editId && !campaignStatus) {
                        $scope.campaignId = editor.dataGet('campaignId');
                        campaignsService.setPrepared($scope.campaignId).then(function (response) {
                            deferred.resolve(response);
                        }, function (response) {
                            deferred.reject(response);
                        });
                    }
                } else {
                    deferred.reject();
                }
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        $scope.goToFund = function (modal) {
            $scope.$broadcast('fund-broadcast');
            modal.$hide();
            $state.go('funds');
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('instoreStep1Ctrl', ['$scope', '$state', '$stateParams', 'apiUrl', 'authToken', 'errorHandler', 'campaignEditorService', 'utils', 'FileUploader', 'campaignsService', '$q', '$http', '$location', '$anchorScroll', 'kachingZonesHelpers', 'kachingZonecampaignEditorService', 'userService', function ($scope, $state, $stateParams, apiUrl, authToken, errorHandler, campaignEditorService, utils, FileUploader, campaignsService, $q, $http, $location, $anchorScroll, kachingZonesHelpers, kachingZonecampaignEditorService, userService) {
        var helper = kachingZonesHelpers;
        // var editor = campaignEditorService;
        var editor = kachingZonecampaignEditorService;

        $scope.view = {
            busy: true
        };
        $scope.fieldHasError = utils.fieldHasError;

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/media/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });
        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            if (newItem.alias === 'customerLogo') {
                $scope.campaign.logo_image = newItem._file;
            }
            if (newItem.alias === 'backgroundImage') {
                $scope.campaign.header_image = newItem._file;
            }
        };

        $scope.campaign = {};
        $scope.targeting = {};
        $scope.budgeting = {};
        $scope.daterange = {
            dates: {
                startDate: null,
                endDate: null
            },
            min: moment().format('YYYY-MM-DD'),
            display: 'Select date range'
        };

        $scope.data = {
            campaign: $scope.campaign,
            targeting: $scope.targeting,
            budgeting: $scope.budgeting,
            daterange: $scope.daterange
        };
        $scope.hasBudget = false;

        $scope.campaignStatus = {
            status: 'start'
        };

        // flatform
        $scope.allFlatform = {
            all: 'true'
        };
        $scope.flatform = {
            os: 'ios'
        };

        $scope.$watch('allFlatform.all', function (newValue, oldValue) {
            if (newValue === 'true' || newValue === true) {
                $scope.flatform.os = null;
            } else {
                if ($scope.flatform.os === null) {
                    $scope.flatform.os = 'ios';
                }
            }
        });

        $scope.$watch('flatform.os', function (newValue, oldValue) {
            if (newValue !== null) {
                $scope.allFlatform.all = 'false';
            }
        });

        // gender
        $scope.allGender = {
            all: 'true'
        };
        $scope.gender = {
            sex: 'male'
        };

        $scope.$watch('allGender.all', function (newValue, oldValue) {
            if (newValue === 'true' || newValue === true) {
                $scope.gender.sex = null;
            } else {
                if ($scope.gender.sex === null) {
                    $scope.gender.sex = 'male';
                }
            }
        });

        $scope.$watch('gender.sex', function (newValue, oldValue) {
            if (newValue !== null) {
                $scope.allGender.all = 'false';
            }
        });

        // community

        $scope.communityOption = {
            all: true
        };
        $scope.unSelectAllCommunities = function () {
            $scope.targeting.selectedCommunity = [];
        };
        $scope.firstSelectCommunity = function () {
            if ($scope.data.selectedCommunity.length === 0) {
                $scope.data.selectedCommunity = ['Urban'];
            }
        };
        $scope.toggleCommunity = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }

            $scope.communityOption.all = false;
        };
        $scope.communityExists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.updateDataModel = function (e, obj) {
            e.preventDefault();
            obj.selected = !obj.selected;
            console.log($scope.data);
        };
        var initCampaign = function initCampaign() {
            var deferred = $q.defer();
            if ($scope.editId !== undefined) {
                campaignsService.getCampaign($scope.editId).then(function (campaign) {
                    $scope.campaign = campaign;
                    $scope.campaign.logo_image = campaign.logo_image;
                    $scope.campaign.header_image = campaign.header_image;
                    // $scope.campaign.amount = campaign.fund;
                    $scope.campaign.customerName = campaign.client;
                    $scope.campaign.description = campaign.description;
                    $scope.campaign.logo_description = campaign.logo_description;
                    $scope.campaign.header_description = campaign.header_description;

                    if (typeof $scope.campaign.start_date !== 'undefined' && typeof $scope.campaign.end_date !== 'undefined') {
                        $scope.daterange.dates.startDate = moment($scope.campaign.start_date);
                        $scope.daterange.dates.endDate = moment($scope.campaign.end_date);
                        $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
                    }
                    $scope.campaign.type = 'in_store';
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            } else {
                $scope.campaign = editor.dataGet('campaign');
                if (typeof $scope.campaign.start_date !== 'undefined' && typeof $scope.campaign.end_date !== 'undefined') {
                    $scope.daterange.dates.startDate = moment($scope.campaign.start_date);
                    $scope.daterange.dates.endDate = moment($scope.campaign.end_date);
                    $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
                }
                $scope.campaign.type = 'in_store';
                deferred.resolve();
            }
            return deferred.promise;
        };

        var updateGender = function updateGender() {
            if ($scope.targeting.gender.male && $scope.targeting.gender.female) {
                $scope.allGender.all = 'true';
                $scope.gender.sex = null;
            } else {
                if ($scope.targeting.gender.male) {
                    $scope.gender.sex = 'male';
                } else {
                    $scope.gender.sex = 'female';
                }
                $scope.allGender.all = 'false';
            }
        };

        var updatePlatform = function updatePlatform() {
            if ($scope.targeting.os.ios && $scope.targeting.os.android) {
                $scope.allFlatform.all = 'true';
                $scope.flatform.os = null;
            } else {
                if ($scope.targeting.os.ios) {
                    $scope.flatform.os = 'ios';
                } else {
                    $scope.flatform.os = 'android';
                }
                $scope.allFlatform.all = 'false';
            }
        };

        var initTargetings = function initTargetings() {
            var deferred = $q.defer();
            var targetingData = editor.dataGet('targeting');
            if (!_.isEmpty(targetingData)) {
                $scope.targeting = targetingData;
                updateGender();
                updatePlatform();
                deferred.resolve();
            } else {
                // $scope.view.busy = true;
                var id = $scope.editId || undefined;
                campaignsService.getTargeting(id).then(function (response) {
                    $scope.targeting.allCategories = response.allCategories;
                    $scope.targeting.allLocations = response.allLocations;
                    $scope.targeting.categories = response.categories;
                    $scope.targeting.locations = response.locations;
                    $scope.targeting.gender = response.gender;
                    $scope.targeting.os = response.os;
                    $scope.targeting.ageRange = response.ageRange;
                    $scope.targeting.ageRanges = response.ageRanges;
                    // $scope.view.busy = false;
                    updateGender();
                    updatePlatform();
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };
        var initBudgeting = function initBudgeting() {
            var deferred = $q.defer();
            var budgetingData = editor.dataGet('budgeting');
            if (!_.isEmpty(budgetingData)) {
                $scope.budgeting = budgetingData;
                $scope.hasBudget = true;
            } else {
                if ($scope.editId) {
                    campaignsService.getCampaignBudget($scope.editId).then(function (data) {
                        $scope.budgeting = data.results[0];
                        $scope.hasBudget = true;
                        deferred.resolve();
                    }, function (response) {
                        errorHandler.processApiResponse(response);
                        deferred.reject();
                    });
                }
            }
            deferred.resolve();
            return deferred.promise;
        };
        var initBalance = function initBalance() {
            var deferred = $q.defer();
            userService.getBalance().then(function (response) {
                $scope.balance = response.credits_balance / response.cash_to_credits_conversion_ratio;
                console.log('balance: ', $scope.balance);
                $scope.updateBalance($scope.balance);
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };
        var initData = function initData() {
            var deferred = $q.defer();
            var deferred1 = $q.defer();
            var deferred2 = $q.defer();
            var deferred3 = $q.defer();
            var deferred4 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise, deferred3.promise, deferred4.promise];

            initCampaign().then(function () {
                deferred1.resolve();
            }, function () {
                deferred1.reject();
            });
            initTargetings().then(function () {
                deferred2.resolve();
            }, function () {
                deferred2.reject();
            });
            initBudgeting().then(function () {
                deferred3.resolve();
            }, function () {
                deferred3.reject();
            });

            initBalance().then(function () {
                deferred4.resolve();
            }, function () {
                deferred4.reject();
            });

            $q.all(promisses).then(function () {
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var init = function init() {
            editor.currentStep(1);
            editor.previousState(1);
            $scope.fundError = false;

            $scope.catAccordionStatus = {
                open: true
            };

            $scope.countriesAccordionStatus = {
                open: true
            };

            $scope.view.busy = true;
            initData().then(function () {
                if ($scope.editId) {
                    $scope.campaign.id = $scope.editId;
                    // $scope.hasBudget = true;
                }
                $scope.view.busy = false;
            }, function () {
                $scope.view.busy = false;
            });
        };

        $scope.$watch(function () {
            return $scope.daterange.dates;
        }, function (newValue, oldValue) {
            if (newValue === undefined || newValue.startDate === null || newValue.endDate === null) {
                return;
            }
            $scope.daterange.display = newValue.startDate.format('YYYY-MM-DD') + ' - ' + newValue.endDate.format('YYYY-MM-DD');
        });
        $scope.showErrors = function () {
            return editor.stepGet('step1', 'submitted');
        };
        function checkAllOption(allVal, arrVal) {
            var all = true;
            angular.forEach(arrVal, function (item, index) {
                if (item.selected === false) {
                    all = false;
                    return;
                }
            });
            return all;
        }

        $scope.scrollToFirstError = function () {
            if (angular.element('.has-error').length > 0) {
                var firstErrorId = angular.element('.has-error')[0].id;

                // angular.element()
                $location.hash(firstErrorId);
                $anchorScroll();
            }
        };

        $scope.nextStep = function () {
            editor.stepSet('step1', 'submitted', true);

            editor.dataSet('campaignStatus', $scope.campaignStatus.status);

            $scope.targeting.allCategories = checkAllOption($scope.targeting.allCategories, $scope.targeting.categories);
            $scope.targeting.allLocations = checkAllOption($scope.targeting.allLocations, $scope.targeting.locations);

            if ($scope.form1.$valid) {
                $scope.view.busy = true;
                editor.stepSet('step1', 'valid', true);

                $scope.campaign.start_date = $scope.daterange.dates.startDate.toISOString();
                $scope.campaign.end_date = $scope.daterange.dates.endDate.toISOString();
                // Store data to model in kaching zone campaign editor service.
                editor.dataSet('campaign', $scope.campaign);

                if ($scope.allFlatform.all === 'true') {
                    $scope.targeting.os.android = true;
                    $scope.targeting.os.ios = true;
                } else {
                    if ($scope.flatform.os === 'ios') {
                        $scope.targeting.os.ios = true;
                        $scope.targeting.os.android = false;
                    } else {
                        $scope.targeting.os.ios = false;
                        $scope.targeting.os.android = true;
                    }
                }

                if ($scope.allGender.all === 'true') {
                    $scope.targeting.gender.male = true;
                    $scope.targeting.gender.female = true;
                } else {
                    if ($scope.gender.sex === 'male') {
                        $scope.targeting.gender.male = true;
                        $scope.targeting.gender.female = false;
                    } else {
                        $scope.targeting.gender.male = false;
                        $scope.targeting.gender.female = true;
                    }
                }

                // Store data to model in kaching zone campaign editor service.
                editor.dataSet('targeting', $scope.targeting);

                // dummy budgeting data - TODO: replace this with real data
                if ($scope.editId === undefined && !$scope.hasBudget) {
                    $scope.budgeting = {
                        cost_per_view: 12,
                        amount: 0,
                        type: 1
                    };
                }
                $scope.budgeting.hasBudget = $scope.hasBudget;

                editor.dataSet('budgeting', $scope.budgeting);

                $scope.fundError = false;
                editor.save('step1').then(function (data) {
                    $scope.goNext();
                    $scope.view.busy = false;
                    if ($scope.editId !== undefined && editor.stepGet('step1', 'submitted')) {
                        helper.alert('success', 'Campaign has been updated.');
                    } else {
                        helper.alert('success', 'Campaign has been created.');
                    }
                    $scope.editId = data.campaign.id; // in case create new campaign
                    $scope.activeCampaign();
                }, function (response) {
                    if (response.status == 400 && response.data.errorDetails.logicProcessing.processingErrors[0].code == 44) {
                        helper.alert('danger', response.data.errorDetails.logicProcessing.processingErrors[0].message);
                        $scope.fundError = true;
                    } else {
                        errorHandler.processApiResponse(response);
                    }
                    $scope.view.busy = false;
                    console.log('create campaign error');
                });
            } else {
                editor.stepSet('step1', 'valid', false);
                if (angular.element('.ng-invalid').length > 0) {
                    angular.element('.ng-invalid').focus();
                }
                if (angular.element('.image-error').length > 0) {
                    angular.element('.image-error').focus();
                }
                setTimeout(function () {
                    $scope.scrollToFirstError();
                }, 100);
            }
        };
        $scope.logControllerData = function () {
            console.log('campaignEditorStep1Ctrl - campaign', angular.copy($scope.campaign));
        };

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.nextStep();
            }
        });

        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('instoreStep2Ctrl', ['$scope', '$state', 'apiUrl', 'authToken', 'utils', 'mediaService', 'FileUploader', 'countryService', 'campaignEditorService', 'campaignsService', '$http', '$q', 'errorHandler', '$anchorScroll', '$location', 'kachingZonesHelpers', 'kachingZonecampaignEditorService', function ($scope, $state, apiUrl, authToken, utils, mediaService, FileUploader, countryService, campaignEditorService, campaignsService, $http, $q, errorHandler, $anchorScroll, $location, kachingZonesHelpers, kachingZonecampaignEditorService) {
        var helper = kachingZonesHelpers;
        var editor = kachingZonecampaignEditorService;
        helper.preventDefaultByPressingEnter();
        $scope.formSummited = false;
        $scope.fieldHasError = utils.fieldHasError;
        $scope.$watch('selectedStore', function (newVal, oldVal) {
            $scope.form1.$setPristine();
        });

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/media/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });
        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            if (newItem.alias === 'arDisplay') {
                $scope.data.arImageFile = newItem._file;
            }
            if (newItem.alias === 'brandImage') {
                $scope.data.brandImageFile = newItem._file;
            }
            if (newItem.alias === 'display') {
                $scope.data.imageFile = newItem._file;
                setTimeout(function () {
                    var $review = angular.element('.uploader-dropzone.image-selected');
                    var imgStyle = $review.attr('style');
                    $scope.imageList[$scope.imageReviewIdx] = imgStyle;
                    $scope.imageFileList[$scope.imageReviewIdx] = $scope.data.imageFile;
                    $scope.imageReviewIdx++;
                    if ($scope.imageReviewIdx === 4) {
                        $scope.imageReviewIdx = 0;
                    }

                    $scope.$apply();
                }, 100);
            }
        };

        function geocodePosition(marker) {
            marker.icon.url = $scope.updateLogoIcon();
            $scope.position = marker.getPosition();
            $scope.$apply();
            $scope.geocoder.geocode({
                latLng: $scope.position
            }, function (responses) {
                if (responses && responses.length > 0) {
                    $scope.address = responses[0].formatted_address;
                } else {
                    $scope.address = 'Cannot determine address at this location.';
                }
                var dumpImage = '/wp-content/themes/kaching3/assets/images/billboards/media-thumb.png';
                var dumpLogo = '/wp-content/themes/kaching3/assets/images/logo.png';
                var mapPopup = '<div class=\'popup\'>\n                            <img class="popup-logo" src="' + dumpLogo + '">\n                            <label class="popup-name">' + $scope.campaign.name + '</label>\n                            <h6 class="popup-address">' + responses[0].formatted_address + '</h6>\n                        </div>';

                $scope.infoWindow.setContent(mapPopup);
                $scope.infoWindow.open($scope.map, marker);
                $scope.map.setZoom(16);
                $scope.map.setCenter($scope.selectedMarker.getPosition());
                $scope.$apply();
            });
        }
        function getSixDigit(num) {
            var number = '' + num;
            var dotIndex = number.indexOf('.');
            var intStr = number.substr(0, dotIndex + 1);
            var decimalStr = number.substr(dotIndex + 1, 6);
            return 1 * intStr.concat(decimalStr);
        }
        function saveMedia() {

            var deferred = $q.defer();
            var hasAr = $scope.data.arImageFile !== null && _typeof($scope.data.arImageFile) === 'object';

            if ($scope.form1.$valid && (hasAr || $scope.storeList.length > 0) || $scope.selectedFormat.value === 'In-Store' && $scope.lastLocation !== undefined) {
                $scope.validateError = false;
                $scope.isAddImage = false;

                var mediaData = {
                    description: $scope.data.description,
                    type: $scope.selectedFormat.value,
                    ar_name: $scope.data.arImageName,
                    ar_appearance: $scope.appearance,
                    ar_resource_type: $scope.imageType,
                    target_name: $scope.data.imageName,
                    target_format: 'in_store',
                    inclusion_zone_unit: $scope.measure.code,
                    gender: $scope.selectedGender,
                    category: $scope.selectedCategory,
                    animation_type: $scope.data.animation,
                    marker_shape: $scope.shape && $scope.shape.value ? $scope.shape.value : null,
                    marker_material: $scope.material,
                    shop_name: $scope.address,
                    address: $scope.address
                };

                mediaData.inclusion_zone = $scope.inclusionZone || 0;

                if ($scope.selectedStore && $scope.selectedStore.id) {
                    mediaData.in_store_shop = $scope.selectedStore.id;
                }

                if ($scope.selectedFormat.value === 'In-Store' && !$scope.latitude && !$scope.longitude && $scope.lastLocation !== undefined) {
                    mediaData.address = $scope.lastLocation.address;
                    mediaData.latitude = $scope.lastLocation.latitude;
                    mediaData.longitude = $scope.lastLocation.longitude;
                } else {
                    mediaData.latitude = $scope.latitude;
                    mediaData.longitude = $scope.longitude;
                }

                if ($scope.data.url) {
                    mediaData.target_url = $scope.data.url;

                    if (mediaData.target_url.indexOf('http://') === -1) {
                        mediaData.target_url = 'http://' + mediaData.target_url;
                    }
                }

                if ($scope.editMode) {
                    mediaData.id = $scope.previewMediaId;
                }

                mediaData.latitude = getSixDigit(mediaData.latitude);
                mediaData.longitude = getSixDigit(mediaData.longitude);

                if ($scope.data.arImageFile && _typeof($scope.data.arImageFile) === 'object') {
                    mediaData.ar_resource = $scope.data.arImageFile;
                }
                if ($scope.data.imageFile && _typeof($scope.data.imageFile) === 'object') {
                    mediaData.target = $scope.data.imageFile;
                } else {
                    if (!$scope.data.imageFile) {
                        mediaData.target = '';
                    }
                }
                if ($scope.data.brandImageFile && _typeof($scope.data.brandImageFile) === 'object') {
                    mediaData.brand_image = $scope.data.brandImageFile;
                }
                if ($scope.dimensionWidth && $scope.dimensionHeight) {
                    mediaData.marker_dimension = $scope.dimensionWidth + ',' + $scope.dimensionHeight;
                    mediaData.marker_shape = $scope.shape && $scope.shape.value ? $scope.shape.value : null;
                }

                mediaService.saveKachingZoneMedia(mediaData).then(function (data) {
                    deferred.resolve(data);
                }, function (response) {
                    deferred.reject(response);
                });
            } else {
                $scope.validateError = true;
                editor.stepSet('step2', 'valid', false);
                setTimeout(function () {
                    helper.scrollToFirstError();
                }, 100);
                deferred.reject();
            }
            return deferred.promise;
        }
        function clearForm() {
            helper.clearForm();

            $scope.data = {
                arImageFile: '',
                imageFile: '',
                mediaName: '',
                mediaId: '',
                imageName: '',
                arImageName: '',
                description: '',
                brandImageFile: '',
                brandDescription: '',
                animation: ''
            };

            $scope.dimensionWidth = undefined;
            $scope.dimensionHeight = undefined;
            $scope.shape = $scope.shapes[0] || undefined;

            helper.clearFileUploader('#imageFile');
            helper.clearFileUploader('#arImageFile');
            helper.clearFileUploader('#brandImageFile');
            helper.clearFileUploader('.image-review-list');

            $scope.imageList = [];
            var emptyImageStyle = 'background-image: none;border-color: #ccc;';
            while ($scope.imageList.length < 4) {
                $scope.imageList.push(emptyImageStyle);
            }
            $scope.imageFileList = [];
            $scope.imageReviewIdx = 0;

            if (!!$scope.selectedMarker) {
                $scope.selectedMarker.setMap(null);
            }

            $scope.position = null;
            $scope.latitude = null;
            $scope.longitude = null;
            $scope.address = null;
        }
        function getMedia(mediaId) {
            var deferred = $q.defer();
            $scope.view.busy = true;
            mediaService.getMediaItem(mediaId).then(function (mediaItem) {
                $scope.view.busy = false;
                $scope.media = mediaItem;
                editor.dataSet('media', $scope.media);

                editor.save('step2').then(function () {
                    $scope.campaignId = editor.dataGet('campaignId');
                    // show notification
                    helper.alert('success', 'Media has been created.');
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }, function () {
                $scope.view.busy = false;
                deferred.reject();
            });
            return deferred.promise;
        }
        function getCities(cities) {
            angular.forEach(cities, function (item, id) {
                countryService.getCities(item).then(function (data) {
                    $scope.cityList = $scope.cityList.concat(data.geonames);
                    $scope.selectedCity = $scope.cityList[0];
                });
            });
        }
        function getFormats() {
            $scope.formats = [{ value: 'store_front', label: 'Storefront' }];
            $scope.selectedFormat = $scope.formats[0];
        }
        function finish() {

            var deferred = $q.defer();
            var campaignStatus = editor.dataGet('campaignStatus');
            var campaign = editor.dataGet('campaign');

            if (campaignStatus === 'start' && !campaign.status || $scope.editId) {
                $scope.activeCampaign().then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        }
        function initTargetings() {
            var deferred = $q.defer();
            var targetingData = editor.dataGet('targeting');

            if (!_.isEmpty(targetingData)) {
                var cities = [];
                angular.forEach(targetingData.locations, function (item, id) {
                    if (item.selected) {
                        cities.push(item.name.alpha2_code);
                    }
                });
                deferred.resolve(cities);
            } else {
                var id = $scope.editId || undefined;
                campaignsService.getTargeting(id).then(function (data) {
                    var cities = [];
                    angular.forEach(data.locations, function (item, id) {
                        if (item.selected) {
                            cities.push(item.name.alpha2_code);
                        }
                    });
                    deferred.resolve(cities);
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        }
        function initShapeDimension() {
            $scope.dimensionWidth = undefined;
            $scope.dimensionHeight = undefined;
            $scope.shapes = mediaService.getShapes();
            $scope.shape = $scope.shapes[0] || undefined;
        }
        function init() {

            if ($scope.form1) {
                $scope.form1.$setPristine();
            }

            $scope.storeList = [];
            $scope.editId = $scope.editId || editor.dataGet('campaignId');
            $scope.validateError = false;
            $scope.isAddImage = false;
            getFormats();
            initShapeDimension();
            $scope.materials = mediaService.getMaterials();
            initStorefrontData();

            if (!$scope.editId) {
                if (!editor.stepGet('step1', 'valid')) {
                    $scope.updateStep(editor.currentStep());
                }
            }

            editor.currentStep(2);
            editor.previousState(2);

            $scope.storeList = [];
            if ($scope.editId) {
                initStorefrontData($scope.editId);
            } else {
                var storeListData = editor.dataGet('storeList');
                if (!_.isEmpty(storeListData)) {
                    $scope.storeList = storeListData;
                }
            }

            $scope.districtList = [];
            $scope.cityList = [];

            initTargetings().then(function (data) {
                getCities(data);
                $scope.view.busy = false;
            }, function () {
                $scope.view.busy = false;
            });

            $scope.editMediaMode = false;
            $scope.editMode = false;
        }
        function initStorefrontData() {
            var deferred = $q.defer();
            campaignsService.getCampaign($scope.editId).then(function (data) {
                $scope.campaign = data;
                $scope.storeList = data.media;
                $scope.storeList = [];

                if (data.media.length > 0) {
                    angular.forEach(data.media, function (item, id) {
                        if (item.type === 'store_front') {
                            var storefrontItem = {
                                id: item.id,
                                name: item.in_store_shop_name || 'undefined',
                                media: _.where(data.media, { in_store_shop: item.id })
                            };

                            if (item.ar_resource_type === 'video') {
                                storefrontItem.hasVideo = true;
                                storefrontItem.hasImage = _.find(storefrontItem.media, { ar_resource_type: 'image' }) ? true : false;
                            } else {
                                if (item.ar_resource_type === 'image') {
                                    storefrontItem.hasImage = true;
                                    storefrontItem.hasVideo = _.find(storefrontItem.media, { ar_resource_type: 'video' }) ? true : false;
                                } else {
                                    storefrontItem.hasVideo = _.find(storefrontItem.media, { ar_resource_type: 'video' }) ? true : false;
                                    storefrontItem.hasImage = _.find(storefrontItem.media, { ar_resource_type: 'image' }) ? true : false;
                                }
                            }
                            storefrontItem.media.unshift(item);
                            $scope.storeList.push(storefrontItem);
                        }
                    });

                    $scope.selectedStore = $scope.storeList[0];
                    if ($scope.storeList.length > 0) {
                        $scope.formats = [{ value: 'store_front', label: 'Storefront' }, { value: 'in_store', label: 'In-Store' }];
                    } else {
                        $scope.formats = [{ value: 'store_front', label: 'Storefront' }];
                    }

                    deferred.resolve();
                } else {
                    $scope.formats = [{ value: 'store_front', label: 'Storefront' }];
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        function checkFormPristine() {
            if (!$scope.form1.$pristine) {
                return false;
            } else {
                if ($scope.latitude || $scope.longitude) {
                    return false;
                }
                for (var property in $scope.data) {
                    if ($scope.data[property]) {
                        return false;
                    }
                }
                return true;
            }
        }
        function placeMarker(location, keepAddress) {
            $scope.updateLogoIcon();
            if (!!$scope.selectedMarker) {
                $scope.selectedMarker.setMap(null);
            }

            $scope.selectedMarker = new google.maps.Marker({
                position: location,
                map: $scope.map,
                draggable: true,
                icon: $scope.iconMarker
            });

            var marker = $scope.selectedMarker;
            var pos = marker.getPosition();

            $scope.geocoder.geocode({
                latLng: pos
            }, function (responses) {
                var address = 'Cannot determine address at this location.';
                if (!keepAddress) {
                    if (responses && responses.length > 0) {
                        $scope.address = address = responses[0].formatted_address;
                    }
                } else {
                    address = responses[0].formatted_address;
                }

                $scope.$apply();
                var dumpImage = '/wp-content/themes/kaching3/assets/images/billboards/media-thumb.png';
                var dumpLogo = '/wp-content/themes/kaching3/assets/images/logo.png';
                var mapPopup = '<div class=\'popup\'>\n                            <img class="popup-logo" src="' + dumpLogo + '">\n                            <label class="popup-name">' + $scope.campaign.name + '</label>\n                            <h6 class="popup-address">' + address + '</h6>\n                        </div>';

                $scope.infoWindow.setContent(mapPopup);
                $scope.infoWindow.open($scope.map, marker);
                $scope.map.setZoom(16);
                $scope.map.setCenter($scope.selectedMarker.getPosition());
            });

            google.maps.event.addListener(marker, 'dragend', function (event) {
                $scope.position = event.latLng;
                $scope.latitude = $scope.position.lat();
                $scope.longitude = $scope.position.lng();
                $scope.searchBoxMarker.forEach(function (marker) {
                    marker.setMap(null);
                });
                $scope.searchBoxMarker = [];
                $scope.$apply();
                geocodePosition(marker);
            });
        }

        var imageStyle = 'background-image: none;border-color: #ccc;';
        $scope.imageList = [imageStyle, imageStyle, imageStyle, imageStyle];
        $scope.imageFileList = [];
        $scope.imageReviewIdx = 0;
        $scope.selectedMarker = null;
        $scope.searchBoxMarker = [];

        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        $scope.updateLogoIcon = function (useDefault) {
            var imageUrl = '';
            if (useDefault) {
                $scope.data.brandImageFile = '';
                helper.clearFileUploader('#brandImageFile');
            }
            if ($scope.data.brandImageFile) {
                imageUrl = document.getElementById('brandImageFile').style.backgroundImage.replace('url(', '').replace(')', '').replace(/\"/gi, '');
                if (!imageUrl) {
                    var idx = $scope.data.brandImageFile.lastIndexOf('.');
                    if (idx !== -1) {
                        if ('|jpg|png|jpeg|'.indexOf($scope.data.brandImageFile.substr(idx + 1)) !== -1) {
                            imageUrl = $scope.data.brandImageFile;
                        }
                    }
                }
            }

            if (!imageUrl) {
                imageUrl = kachingAppConfig.wpTemplateUri + '/assets/images/crowblackedit.png';
            }

            $scope.iconMarker = {
                url: imageUrl,
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(50, 50)
            };

            return imageUrl;
        };

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        google.maps.event.addListenerOnce($scope.map, 'mouseover', function () {
            // This method is a trick to re-render map for the first time map renders.
            google.maps.event.trigger($scope.map, 'resize');
        });
        google.maps.event.addListenerOnce($scope.map, 'idle', function () {
            // This method is a trick to re-render map for the first time map renders.
            google.maps.event.trigger($scope.map, 'resize');
        });
        $scope.geocoder = new google.maps.Geocoder();
        $scope.infoWindow = new google.maps.InfoWindow();

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        $scope.map.addListener('bounds_changed', function () {
            searchBox.setBounds($scope.map.getBounds());
        });

        // var markers = [];
        $scope.searchBoxMarker = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            $scope.updateLogoIcon();
            // searchBox.set($scope.map, null);
            var places = searchBox.getPlaces();

            if (places.length === 0) {
                return;
            }
            // Clear out the old markers.
            $scope.searchBoxMarker.forEach(function (marker) {
                marker.setMap(null);
            });
            $scope.searchBoxMarker = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();

            if (places.length > 0) {
                $scope.position = places[0].geometry.location;
                $scope.address = places[0].formatted_address;
                $scope.latitude = $scope.position.lat();
                $scope.longitude = $scope.position.lng();
                $scope.$apply();
            }

            placeMarker(places[0].geometry.location);

            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log('Returned place contains no geometry');
                    return;
                }
                var newMarker = new google.maps.Marker({
                    map: $scope.map,
                    icon: $scope.iconMarker,
                    title: place.name,
                    position: place.geometry.location
                });

                google.maps.event.addListener(newMarker, 'dragend', function () {
                    geocodePosition(newMarker);
                });

                $scope.searchBoxMarker.push(newMarker);

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            $scope.map.fitBounds(bounds);
            $scope.$apply();
        });

        google.maps.event.addListener($scope.map, 'click', function (event) {
            $scope.position = event.latLng;
            $scope.latitude = $scope.position.lat();
            $scope.longitude = $scope.position.lng();
            placeMarker(event.latLng);
            $scope.searchBoxMarker.forEach(function (marker) {
                marker.setMap(null);
            });
            $scope.searchBoxMarker = [];
            $scope.$apply();
        });

        $scope.view = {
            busy: true,
            uploading: false,
            submitted: false,
            mediaCreated: false
        };
        $scope.data = {
            arImageFile: '',
            imageFile: '',
            mediaName: '',
            mediaId: '',
            imageName: '',
            arImageName: '',
            description: '',
            brandImageFile: '',
            brandDescription: '',
            animation: ''
        };
        $scope.genders = ['Male', 'Female'];
        $scope.categories = ['T-shirt'];
        $scope.position = null;
        $scope.measures = [{ name: 'Meters', code: 'meter' }, { name: 'Kilometres', code: 'kilometre' }];
        $scope.mediaTypeProp = {
            'type': 'select',
            'name': 'media_type',
            'mediaTypeSelect': 'Upload Media',
            'values': ['Upload Media', 'External Link']
        };
        $scope.iconMarker = {
            url: kachingAppConfig.wpTemplateUri + '/assets/images/crowblackedit.png',
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(50, 50)
        };
        $scope.errors = {
            video: {},
            image: {},
            arImage: {}
        };

        $scope.updateMapManually = function () {
            if (isNaN($scope.latitude)) {
                if ($scope.latitude === '-') {
                    return;
                } else {
                    $scope.latitude = 0;
                }
            }
            if (isNaN($scope.longitude)) {
                if ($scope.longitude === '-') {
                    return;
                } else {
                    $scope.longitude = 0;
                }
            }
            $scope.position = { lat: Number($scope.latitude), lng: Number($scope.longitude) };
            placeMarker($scope.position);
            $scope.searchBoxMarker.forEach(function (marker) {
                marker.setMap(null);
            });
            $scope.searchBoxMarker = [];
        };
        $scope.updateReviewIndex = function (idx) {
            $scope.imageReviewIdx = idx;
            $scope.data.imageFile = $scope.imageFileList[$scope.imageReviewIdx];
            console.log($scope.data.imageFile);
        };
        $scope.showErrors = function () {
            return $scope.storeList.length === 0 && editor.stepGet('step2', 'submitted') || $scope.validateError;
        };
        $scope.imageHasError = function () {
            if (_typeof($scope.data.imageFile) !== 'object') {
                return true;
            } else {
                return false;
            }
        };
        $scope.arImageHasError = function () {
            if (_typeof($scope.data.arImageFile) !== 'object') {
                return true;
            } else {
                return false;
            }
        };
        $scope.changeFormat = function () {
            if ($scope.selectedFormat && $scope.selectedFormat.value === 'in_store') {
                $scope.latitude = $scope.selectedStore.media[0].latitude;
                $scope.longitude = $scope.selectedStore.media[0].longitude;
            } else {
                $scope.latitude = null;
                $scope.longitude = null;
            }
        };
        $scope.submitMedia = function () {
            var deferred = $q.defer();

            if ($scope.form1.$valid) {
                $scope.view.busy = true;
                saveMedia().then(function (data) {
                    $scope.form1.$setPristine();
                    if ($scope.editMode) {
                        $scope.editMode = false;
                        helper.alert('success', 'Media has been updated.');
                        $scope.view.busy = false;
                        clearForm();
                        initStorefrontData();
                        deferred.resolve();
                    } else {
                        $scope.storeList.push(data);
                        editor.dataSet('storeList', $scope.storeList);
                        getMedia(data.id).then(function () {
                            initStorefrontData();
                            deferred.resolve();
                        }, function () {
                            deferred.reject();
                        });
                        clearForm();
                    }

                    $scope.lastLocation = {
                        address: data.address,
                        latitude: data.latitude,
                        longitude: data.longitude
                    };
                    $scope.form1.$setPristine();
                }, function (response) {
                    $scope.form1.$setPristine();
                    $scope.view.busy = false;
                    deferred.reject();
                });
            } else {
                helper.scrollToFirstError($scope);
                helper.alert('danger', 'Please, fill all required fields');
                deferred.reject();
            }
            return deferred.promise;
        };
        $scope.removeAddImageForm = function () {
            $scope.data.description = '';
            $scope.data.imageName = '';
            $scope.data.imageFile = '';
            helper.clearFileUploader('#imageFile');
            helper.clearFileUploader('.image-review-list');
            $scope.imageList = [];
            $scope.imageReviewIdx = 0;
            var imageStyle = 'background-image: none;border-color: #ccc;';
            $scope.imageList = [imageStyle, imageStyle, imageStyle, imageStyle];

            var mediaData = {
                description: '',
                target: '',
                target_name: '',
                target_format: ''
            };

            $scope.isAddImage = false;
        };
        $scope.cancelEdit = function () {
            clearForm();
            $scope.editMode = false;
            $scope.isAddImage = false;
        };
        $scope.editMedia = function (mediaId) {
            clearForm();
            helper.alert('info', 'You are in edit mode!');
            $scope.editMode = true;
            helper.resetAngularFields($scope);
            $scope.previewMediaId = mediaId.id;
            $scope.dimensionWidth = undefined;
            $scope.dimensionHeight = undefined;
            mediaService.getMediaItem($scope.previewMediaId).then(function (response) {
                $scope.data.description = response.description;
                $scope.data.arImageFile = helper.getMediaPreviewFromUrl(response.ar_resource);
                $scope.data.arImageName = response.ar_name;
                $scope.appearance = response.ar_appearance;
                $scope.imageType = response.ar_resource_type;
                $scope.data.imageName = response.target_name;
                $scope.data.url = response.target_url;
                $scope.data.imageFile = response.target;
                $scope.latitude = response.latitude;
                $scope.longitude = response.longitude;
                $scope.inclusionZone = response.inclusion_zone;
                $scope.measure.code = response.inclusion_zone_unit;
                $scope.address = response.in_store_shop_name;
                $scope.data.brandImageFile = response.brand_image;
                $scope.selectedGender = response.gender;
                $scope.selectedCategory = response.category;
                $scope.data.animation = response.animation_type;
                $scope.material = response.marker_material;
                $scope.shape = _.findWhere($scope.shapes, { value: response.marker_shape });
                $scope.selectedFormat = _.find($scope.formats, { value: response.type });
                $scope.selectedStore = _.find($scope.storeList, { id: response.in_store_shop });

                if (response.marker_dimension) {
                    $scope.dimensionWidth = response.marker_dimension.split(',')[0];
                    $scope.dimensionHeight = response.marker_dimension.split(',')[1];
                }
                placeMarker({ lat: Number($scope.latitude), lng: Number($scope.longitude) }, true);

                $scope.imageList = [];
                $scope.imageFileList = [];
                $scope.imageReviewIdx = 0;
                if ($scope.data.imageFile) {
                    setTimeout(function () {
                        var $review = angular.element('.uploader-dropzone.image-selected');
                        var imgStyle = $review.attr('style');
                        $scope.imageList.push(imgStyle);
                        $scope.imageFileList.push(imgStyle);
                        $scope.imageReviewIdx = 1;
                        var emptyImageStyle = 'background-image: none;border-color: #ccc;';
                        while ($scope.imageList.length < 4) {
                            $scope.imageList.push(emptyImageStyle);
                        }
                        if ($scope.imageList.length > 0) {
                            $scope.isAddImage = true;
                        }
                    }, 100);
                } else {
                    var emptyImageStyle = 'background-image: none;border-color: #ccc;';
                    while ($scope.imageList.length < 4) {
                        $scope.imageList.push(emptyImageStyle);
                    }
                }
            });
            $scope.editMediaMode = true;
        };
        $scope.deleteMedia = function (media) {
            $scope.previewMediaId = media.id;
            campaignsService.deleteMedia($scope.previewMediaId).then(function (response) {
                console.log(response);
                helper.alert('success', 'Media has been deleted.');
                initStorefrontData();
            }, function (response) {
                console.log(response);
                helper.alert('danger', 'Media has not been deleted');
            });
        };
        $scope.lastLocation = undefined;
        $scope.updateDistrict = function () {
            $scope.updateMap($scope.selectedCity);
            countryService.getDistricts($scope.selectedCity.countryCode, $scope.selectedCity.name).then(function (data) {
                $scope.districtList = data.geonames;
                $scope.selectedDistrict = $scope.districtList[0];
            });
        };
        $scope.updateMap = function (data) {
            var info = {
                lat: data.lat,
                lng: data.lng,
                title: data.name
            };

            if (!!$scope.selectedMarker) {
                $scope.selectedMarker.setMap(null);
            }
            $scope.map.setCenter(new google.maps.LatLng(info.lat, info.lng));
            $scope.map.setZoom(17);
        };
        $scope.nextStep = function () {
            $scope.form1.$setSubmitted();
            if (checkFormPristine() && $scope.storeList.length > 0) {
                editor.stepSet('step2', 'submitted', true);
                if ($scope.storeList.length > 0) {
                    editor.stepSet('step2', 'valid', true);
                    finish().then(function () {
                        $scope.goNext();
                    });
                } else {
                    editor.stepSet('step2', 'valid', false);
                    setTimeout(function () {
                        helper.scrollToFirstError();
                    }, 100);
                    helper.alert('danger', 'Please add at least one AR');
                }
            } else {
                $scope.submitMedia().then(function () {
                    editor.stepSet('step2', 'submitted', true);
                    if ($scope.storeList.length > 0) {
                        editor.stepSet('step2', 'valid', true);
                        finish().then(function () {
                            $scope.goNext();
                        });
                    } else {
                        editor.stepSet('step2', 'valid', false);
                        setTimeout(function () {
                            helper.scrollToFirstError();
                        }, 100);
                        helper.alert('danger', 'Please add at least one AR');
                    }
                });
            }
        };
        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.nextStep();
            }
        });
        $scope.needBasicValidateZone = function () {
            return $scope.data.imageFile || $scope.data.imageName || $scope.data.url || $scope.data.description;
        };
        $scope.needBrandValidationZone = function () {
            return $scope.data.brandImageFile || $scope.data.shoppingMall || $scope.data.shopNumber || $scope.data.brandIconLogo || $scope.dimensionWidth || $scope.dimensionHeight;
        };

        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('instoreStep3Ctrl', ['$scope', 'productsService', 'campaignEditorService', 'campaignsService', 'utils', 'FileUploader', 'apiUrl', 'authToken', '$http', '$q', '$element', 'errorHandler', 'kachingZonesHelpers', 'kachingZonecampaignEditorService', 'mediaService', function ($scope, productsService, campaignEditorService, campaignsService, utils, FileUploader, apiUrl, authToken, $http, $q, $element, errorHandler, kachingZonesHelpers, kachingZonecampaignEditorService, mediaService) {
        var helper = kachingZonesHelpers;
        var editor = kachingZonecampaignEditorService;

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/products/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });
        function addProductToCampaign(product) {
            var deferred = $q.defer();

            campaignsService.saveProducts($scope.campaignId, product).then(function (data) {
                helper.alert('success', 'Product has been added');
                deferred.resolve(data);
            }, function (response) {
                // $scope.view.busy = false;
                deferred.reject(response);
                errorHandler.processApiResponse(response);
            });

            return deferred.promise;
        }

        function createProduct() {

            if ($scope.data.url.match(/^http[s]?:\/\//i) === null) {
                $scope.data.url = 'http://' + $scope.data.url;
            }

            var productData = {
                title: $scope.data.title,
                description: $scope.data.description,
                price: $scope.data.price,
                url: $scope.data.url
            };

            if ($scope.data.arImageFile !== null && _typeof($scope.data.productImageFile) === 'object') {
                productData.image = $scope.data.productImageFile;
            }

            if ($scope.editMode === true) {
                productData.id = $scope.data.productIdInEdit;
            }

            var deferred = $q.defer();

            productsService.createProduct(productData).then(function (data) {
                deferred.resolve(data);
                $scope.data.productIdInEdit = undefined;
                $scope.editMode = false;
            }, function (response) {
                deferred.reject(response);
                errorHandler.processApiResponse(response);
            });

            return deferred.promise;
        }

        $scope.view = {
            busy: true,
            productImageUploadStarted: false,
            productImageUploadProgress: 0,
            productImageUploadComplete: false
        };

        $scope.data = {
            'title': '',
            'description': '',
            'pirce': '',
            'url': ''
        };

        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            $scope.data.productImageFile = newItem._file;
        };
        $scope.recommendedProducts = [];
        $scope.carouselOptions = {
            nav: true,
            dots: false,
            navText: ['<span class="glyphicon glyphicon-triangle-left"></span>', '<span class="glyphicon glyphicon-triangle-right"></span>'],
            navRewind: false,
            loop: false,
            items: 4
        };
        $scope.products = editor.dataGet('products');

        var myArr = [{
            type: 'type',
            perDollarPerClick: 3
        }, {
            type: 'another type',
            perDollarPerClick: 2
        }];
        $scope.purchaseAds = myArr;

        // $scope.increaseAmount = function(media) {
        //     media.bets_per_view = 1*media.bets_per_view + 1;
        //     $scope.updateAmount();
        // };
        // $scope.decreaseAmount = function(media) {
        //     if (media.bets_per_view > 1) {
        //         media.bets_per_view = 1*media.bets_per_view - 1;
        //         $scope.updateAmount();
        //     }
        // };
        $scope.increaseSetting = function (store, setting, value) {
            store[setting] = 1 * value + 1;
            $scope.updateAmount();
        };
        $scope.decreaseSetting = function (store, setting, value) {
            if (store[setting] > 0) {
                store[setting] = 1 * value - 1;
                $scope.updateAmount();
            }
        };
        $scope.updateAmount = function (media) {
            $scope.grandTotal = 0;
            angular.forEach($scope.storeList, function (storefront, key) {
                var totalSetting = 0;

                totalSetting = totalSetting + storefront.follow_beacon;
                totalSetting = totalSetting + storefront.scan_receipt;
                totalSetting = totalSetting + storefront.issue_qr;
                totalSetting = totalSetting + storefront.send_information;
                totalSetting = totalSetting + storefront.share;
                totalSetting = totalSetting + storefront.product;

                $scope.grandTotal += totalSetting;

                angular.forEach(storefront.media, function (inStore, key) {
                    $scope.grandTotal += 1 * inStore.bets_per_view;
                });
            });
            if ($scope.campaign) {
                $scope.grandTotal += 1 * $scope.campaign.register;
            }
        };

        $scope.saveProduct = function () {
            if ($scope.data.url.match(/^http[s]?:\/\//i) === null) {
                $scope.data.url = 'http://' + $scope.data.url;
            }
            var productData = {
                title: $scope.data.title,
                description: $scope.data.description,
                price: $scope.data.price,
                url: $scope.data.url,
                image: $scope.data.productImageFile
            };

            var deferred = $q.defer();
            productsService.createProduct(productData).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
                errorHandler.processApiResponse(response);
            });

            return deferred.promise;
        };

        $scope.updateProduct = function (productId) {
            if ($scope.data.url.match(/^http[s]?:\/\//i) === null) {
                $scope.data.url = 'http://' + $scope.data.url;
            }
            var productData = {
                id: productId,
                title: $scope.data.title,
                description: $scope.data.description,
                price: $scope.data.price,
                url: $scope.data.url
            };
            if (_typeof($scope.data.productImageFile) === 'object' && $scope.data.productImageFile != null) {
                productData.image = $scope.data.productImageFile;
            }
            var deferred = $q.defer();
            productsService.createProduct(productData).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
                errorHandler.processApiResponse(response);
            });
            return deferred.promise;
        };

        $scope.submitProduct = function () {
            if ($scope.editMode) {
                $scope.updateProduct($scope.data.productIdInEdit).then(function (response) {
                    helper.alert('success', 'Product have been updated');
                    $scope.loadSubmittedProducts();
                    $scope.editMode = false;
                }, function (error) {
                    errorHandler.processApiResponse(error);
                    $scope.editMode = false;
                });
            } else {
                $scope.view.busy = true;
                $scope.saveProduct().then(function (response) {
                    productsService.getProduct(response.id).then(function (product) {
                        $scope.recommendedProducts.push(product);
                        campaignsService.saveProducts($scope.campaignId, $scope.recommendedProducts).then(function (reponse) {
                            $scope.view.busy = false;
                            helper.alert('success', 'Product have been added');
                        }, function (error) {
                            errorHandler.processApiResponse(error);
                        });
                    }, function (error) {
                        errorHandler.processApiResponse(error);
                    });
                }, function (error) {
                    console.log(error);
                    $scope.view.busy = false;
                });
            }
        };

        $scope.selectRecommendedProduct = function (product) {
            $scope.editMode = true;
            $scope.data.productIdInEdit = product.id;
            $scope.data.title = product.title;
            $scope.data.description = product.description;
            $scope.data.price = product.price;
            $scope.data.url = product.url;
            $scope.data.productImageFile = product.image;
            helper.alert('info', 'Product in edit mode!');
        };
        $scope.fieldHasError = utils.fieldHasError;
        $scope.showErrors = function () {
            return editor.stepGet('step3', 'submitted');
        };
        $scope.nextStep = function () {
            editor.stepSet('step3', 'submitted', true);

            $scope.view.busy = true;
            editor.stepSet('step3', 'valid', true);
            $scope.updateAllMedia().then(function () {
                $scope.goNext();
                helper.alert('success', 'All media has been updated');
                $scope.view.busy = false;
                $scope.activeCampaign();
            }, function (error) {
                $scope.view.busy = false;
                errorHandler.processApiResponse(error);
            });
        };
        $scope.updateAllMedia = function () {
            var deferred = $q.defer();
            var promisses = [];

            angular.forEach($scope.storeList, function (store) {
                angular.forEach(store.media, function (media) {
                    var prodDeferred = $q.defer();
                    promisses.push(prodDeferred.promise);
                    var mediaData = {
                        id: media.id,
                        bets_per_view: media.bets_per_view,
                        type: 'in_store'
                    };
                    campaignsService.updateMedia(mediaData).then(function (response) {
                        prodDeferred.resolve(response);
                    }, function (response) {
                        prodDeferred.reject(response);
                    });
                });

                // update media
                var rewardDeferred = $q.defer();
                promisses.push(rewardDeferred.promise);
                var rewardData = {
                    follow_beacon: store.follow_beacon,
                    scan_receipt: store.scan_receipt,
                    issue_qr: store.issue_qr,
                    send_information: store.send_information,
                    share: store.share,
                    product: store.product
                };
                mediaService.updateReward(store.id, rewardData).then(function (response) {
                    rewardDeferred.resolve(response);
                }, function (response) {
                    rewardDeferred.reject(response);
                });

                // update register
                var registerDeferred = $q.defer();
                promisses.push(registerDeferred.promise);
                var campaign = {
                    id: $scope.campaignId,
                    register: $scope.campaign.register
                };

                campaignsService.saveKachingZoneCampagin(campaign).then(function () {
                    registerDeferred.resolve();
                }, function () {
                    registerDeferred.reject();
                });
            });
            $q.all(promisses).then(function () {
                deferred.resolve();
            });
            return deferred.promise;
        };

        $scope.loadSubmittedProducts = function () {
            if (editor.dataGet().campaignId !== undefined) {
                campaignsService.getCampaign(editor.dataGet().campaignId).then(function (response) {
                    $scope.recommendedProducts = response.products;
                });
            }
        };

        $scope.toggleExpand = function (event) {
            var target = angular.element(event.target);
            var $storeArea = angular.element(target).closest('.store-header-area');
            var $expandItem = $storeArea.find('.media-preview-expanded');

            $expandItem.slideToggle();

            var $others = angular.element('.store-header-area').not($storeArea);
            $others.find('.media-preview-expanded').slideUp();
        };

        var init = function init() {

            if (!$scope.editId) {
                if (!editor.stepGet('step1', 'valid') || !editor.stepGet('step2', 'valid')) {
                    $scope.updateStep(editor.currentStep());
                }
            }

            editor.currentStep(3);
            editor.previousState(3);

            if ($scope.editId) {
                $scope.campaignId = $scope.editId;
            } else {
                $scope.campaignId = editor.dataGet('campaignId');
            }

            $scope.addedProducts = [];
            $scope.loadSubmittedProducts();
            utils.addUploaderTypeFilter(uploader, 'image', {
                imageFilter: ['image/png', 'image/jpg', 'image/jpeg']
            });

            $scope.initStorefrontData($scope.campaignId).then(function () {
                $scope.view.busy = false;
            }, function (response) {
                errorHandler.processApiResponse(response);
                $scope.view.busy = false;
            });
        };

        $scope.initStorefrontData = function (campaignId) {
            var deferred = $q.defer();

            campaignsService.getCampaign(campaignId).then(function (data) {

                $scope.campaign = data;
                if (!$scope.campaign.register) {
                    $scope.campaign.register = 0;
                }

                $scope.mediaList = data.media;
                $scope.storeList = [];
                if (data.media.length > 0) {
                    angular.forEach(data.media, function (item, id) {
                        if (item.type === 'store_front') {
                            var storefrontItem = {
                                id: item.id,
                                name: item.in_store_shop_name || 'undefined',
                                media: _.where(data.media, { in_store_shop: item.id }),
                                // action setting
                                follow_beacon: 0,
                                scan_receipt: 0,
                                issue_qr: 0,
                                send_information: 0,
                                share: 0,
                                product: 0
                            };

                            if (item.reward) {
                                storefrontItem.follow_beacon = item.reward.follow_beacon;
                                storefrontItem.scan_receipt = item.reward.scan_receipt;
                                storefrontItem.issue_qr = item.reward.issue_qr;
                                storefrontItem.send_information = item.reward.send_information;
                                storefrontItem.share = item.reward.share;
                                storefrontItem.product = item.reward.product;
                            }
                            storefrontItem.media.unshift(item);
                            $scope.storeList.push(storefrontItem);
                        }
                    });

                    $scope.updateAmount();
                }
                deferred.resolve();
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.saveProduct();
                $scope.nextStep();
            }
        });

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('instoreStep4Ctrl', ['$scope', 'productsService', 'campaignsService', 'campaignEditorService', 'kachingZonecampaignEditorService', '$q', 'errorHandler', function ($scope, productsService, campaignsService, campaignEditorService, kachingZonecampaignEditorService, $q, errorHandler) {
        var editor = kachingZonecampaignEditorService;
        $scope.view = {
            busy: true
        };

        $scope.locations = {};
        $scope.categories = {};

        $scope.loadSubmittedProducts = function () {
            if (editor.dataGet().campaignId !== undefined) {
                campaignsService.getCampaign(editor.dataGet().campaignId).then(function (response) {
                    $scope.recommendedProducts = response.products;
                });
            }
        };

        var initCampaign = function initCampaign() {
            var deferred = $q.defer();
            var storeListData = editor.dataGet('storeList');

            if (!_.isEmpty(storeListData)) {
                $scope.campaignId = editor.dataGet('campaignId');
                campaignsService.getCampaign($scope.campaignId).then(function (response) {
                    $scope.campaign = response;
                });
                deferred.resolve();
            } else {
                campaignsService.getCampaign($scope.editId).then(function (data) {
                    $scope.mediaList = data.media;
                    $scope.storeList = [];
                    $scope.campaign = data;

                    if (data.media.length > 0) {
                        angular.forEach(data.media, function (item, id) {
                            if (item.type === 'store_front') {
                                var storefrontItem = {
                                    id: item.id,
                                    name: item.in_store_shop_name || 'undefined',
                                    media: _.where(data.media, { in_store_shop: item.id })
                                };
                                storefrontItem.media.unshift(item);
                                $scope.storeList.push(storefrontItem);
                            }
                        });

                        $scope.selectedStore = $scope.storeList[0];
                    }
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };

        var initTargetings = function initTargetings() {
            var deferred = $q.defer();
            var targetingData = editor.dataGet('targeting');
            if (!_.isEmpty(targetingData)) {
                $scope.targeting = targetingData;
                var arrLocations = [],
                    arrCategories = [];
                // Get a location have selected true
                angular.forEach($scope.targeting.locations, function (item, id) {
                    if (item.selected === true) {
                        arrLocations.push(item);
                    }
                });
                // Get a category have selected true
                angular.forEach($scope.targeting.categories, function (item, id) {
                    if (item.selected === true) {
                        arrCategories.push(item);
                    }
                });
                $scope.locations = arrLocations;
                $scope.categories = arrCategories;
                deferred.resolve();
            } else {
                // $scope.view.busy = true;
                var id = $scope.editId || undefined;
                campaignsService.getTargeting(id).then(function (response) {
                    $scope.targeting = response;
                    var arrLocations = [],
                        arrCategories = [];
                    // Get a location have selected true
                    angular.forEach($scope.targeting.locations, function (item, id) {
                        if (item.selected === true) {
                            arrLocations.push(item);
                        }
                    });
                    // Get a category have selected true
                    angular.forEach($scope.targeting.categories, function (item, id) {
                        if (item.selected === true) {
                            arrCategories.push(item);
                        }
                    });
                    $scope.locations = arrLocations;
                    $scope.categories = arrCategories;
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };

        var initData = function initData() {
            var deferred = $q.defer();
            var deferred1 = $q.defer();
            var deferred2 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise];

            initCampaign().then(function () {
                deferred1.resolve();
            }, function () {
                deferred1.reject();
            });

            initTargetings().then(function () {
                deferred2.resolve();
            }, function () {
                deferred2.reject();
            });

            $q.all(promisses).then(function () {
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var init = function init() {
            $scope.view.busy = true;

            // if (!$scope.editId) {
            //     if (! editor.stepGet('step1', 'valid') || ! editor.stepGet('step2', 'valid') || ! editor.stepGet('step3', 'valid')) {
            //         $scope.updateStep(editor.currentStep());
            //     }
            // }

            if (!$scope.editId) {
                $scope.editId = editor.dataGet('campaignId');
            }

            editor.currentStep(4);
            editor.previousState(4);

            $scope.campaignId = editor.dataGet('campaignId');
            $scope.media = editor.dataGet('media');

            $scope.loadSubmittedProducts();

            $scope.storeList = [];
            $scope.grandTotal = 0;

            initData().then(function () {
                $scope.view.busy = false;
            }, function () {
                $scope.view.busy = false;
            });
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('radioAdsCtrl', ['$scope', '$state', '$stateParams', 'campaignEditorService', 'campaignId', 'viewDetail', 'kachingZonecampaignEditorService', 'campaignsService', '$q', function ($scope, $state, $stateParams, campaignEditorService, campaignId, viewDetail, kachingZonecampaignEditorService, campaignsService, $q) {
        var editor = kachingZonecampaignEditorService;

        $scope.logData = function () {
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

        var templateFolder = kachingAppConfig.wpTemplateUri + '/assets/kaching/kaching-zones/radio-ads/steps/';
        $scope.radioAdsStep = {
            step1: templateFolder + 'step1.html',
            step2: templateFolder + 'step2.html',
            step3: templateFolder + 'step3.html',
            step4: templateFolder + 'step4.html'
        };

        $scope.goNext = function () {
            $scope.step += 1;
            $scope.progress += 1;
        };

        $scope.goPrev = function () {
            $scope.step -= 1;
        };

        $scope.updateStep = function (newVal) {
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

        $scope.updateBalance = function (value) {
            $scope.balance = value;
        };

        $scope.activeCampaign = function () {
            var deferred = $q.defer();
            var campaignStatus = editor.dataGet('campaignStatus');
            // var campaign = editor.dataGet('campaign');

            var campaignId = editor.dataGet('campaignId');
            campaignsService.getCampaign(campaignId).then(function (data) {
                if (data.media && data.media.length > 0) {
                    if (campaignStatus === 'start' || campaignStatus === false || !$scope.editId && !campaignStatus) {
                        $scope.campaignId = editor.dataGet('campaignId');
                        campaignsService.setPrepared($scope.campaignId).then(function (response) {
                            deferred.resolve(response);
                        }, function (response) {
                            deferred.reject(response);
                        });
                    }
                } else {
                    deferred.reject();
                }
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        $scope.goToFund = function (modal) {
            $scope.$broadcast('fund-broadcast');
            modal.$hide();
            $state.go('funds');
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('radioStep1Ctrl', ['$scope', '$state', '$stateParams', 'apiUrl', 'authToken', 'errorHandler', 'campaignEditorService', 'utils', 'FileUploader', 'campaignsService', '$q', '$http', '$location', '$anchorScroll', 'kachingZonesHelpers', 'kachingZonecampaignEditorService', 'userService', function ($scope, $state, $stateParams, apiUrl, authToken, errorHandler, campaignEditorService, utils, FileUploader, campaignsService, $q, $http, $location, $anchorScroll, kachingZonesHelpers, kachingZonecampaignEditorService, userService) {
        var helper = kachingZonesHelpers;
        // var editor = campaignEditorService;
        var editor = kachingZonecampaignEditorService;

        $scope.view = {
            busy: true
        };
        $scope.fieldHasError = utils.fieldHasError;

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/media/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });
        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            if (newItem.alias === 'customerLogo') {
                $scope.campaign.logo_image = newItem._file;
            }
            if (newItem.alias === 'backgroundImage') {
                $scope.campaign.header_image = newItem._file;
            }
        };

        $scope.campaign = {};
        $scope.targeting = {};
        $scope.budgeting = {};
        $scope.daterange = {
            dates: {
                startDate: null,
                endDate: null
            },
            min: moment().format('YYYY-MM-DD'),
            display: 'Select date range'
        };

        $scope.data = {
            campaign: $scope.campaign,
            targeting: $scope.targeting,
            budgeting: $scope.budgeting,
            daterange: $scope.daterange
        };
        $scope.hasBudget = false;

        $scope.campaignStatus = {
            status: 'start'
        };

        // flatform
        $scope.allFlatform = {
            all: 'true'
        };
        $scope.flatform = {
            os: 'ios'
        };

        $scope.$watch('allFlatform.all', function (newValue, oldValue) {
            if (newValue === 'true' || newValue === true) {
                $scope.flatform.os = null;
            } else {
                if ($scope.flatform.os === null) {
                    $scope.flatform.os = 'ios';
                }
            }
        });

        $scope.$watch('flatform.os', function (newValue, oldValue) {
            if (newValue !== null) {
                $scope.allFlatform.all = 'false';
            }
        });

        // gender
        $scope.allGender = {
            all: 'true'
        };
        $scope.gender = {
            sex: 'male'
        };

        $scope.$watch('allGender.all', function (newValue, oldValue) {
            if (newValue === 'true' || newValue === true) {
                $scope.gender.sex = null;
            } else {
                if ($scope.gender.sex === null) {
                    $scope.gender.sex = 'male';
                }
            }
        });

        $scope.$watch('gender.sex', function (newValue, oldValue) {
            if (newValue !== null) {
                $scope.allGender.all = 'false';
            }
        });

        // community

        $scope.communityOption = {
            all: true
        };
        $scope.unSelectAllCommunities = function () {
            $scope.targeting.selectedCommunity = [];
        };
        $scope.firstSelectCommunity = function () {
            if ($scope.data.selectedCommunity.length === 0) {
                $scope.data.selectedCommunity = ['Urban'];
            }
        };
        $scope.toggleCommunity = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }

            $scope.communityOption.all = false;
        };
        $scope.communityExists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.updateDataModel = function (e, obj) {
            e.preventDefault();
            obj.selected = !obj.selected;
            console.log($scope.data);
        };
        var initCampaign = function initCampaign() {
            var deferred = $q.defer();
            if ($scope.editId !== undefined) {
                campaignsService.getCampaign($scope.editId).then(function (campaign) {
                    $scope.campaign = campaign;
                    $scope.campaign.logo_image = campaign.logo_image;
                    $scope.campaign.header_image = campaign.header_image;
                    // $scope.campaign.amount = campaign.fund;
                    $scope.campaign.customerName = campaign.client;
                    $scope.campaign.description = campaign.description;
                    $scope.campaign.logo_description = campaign.logo_description;
                    $scope.campaign.header_description = campaign.header_description;

                    if (typeof $scope.campaign.start_date !== 'undefined' && typeof $scope.campaign.end_date !== 'undefined') {
                        $scope.daterange.dates.startDate = moment($scope.campaign.start_date);
                        $scope.daterange.dates.endDate = moment($scope.campaign.end_date);
                        $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
                    }
                    $scope.campaign.type = 'radio';
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            } else {
                $scope.campaign = editor.dataGet('campaign');
                if (typeof $scope.campaign.start_date !== 'undefined' && typeof $scope.campaign.end_date !== 'undefined') {
                    $scope.daterange.dates.startDate = moment($scope.campaign.start_date);
                    $scope.daterange.dates.endDate = moment($scope.campaign.end_date);
                    $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
                }
                $scope.campaign.type = 'radio';
                deferred.resolve();
            }
            return deferred.promise;
        };

        var updateGender = function updateGender() {
            if ($scope.targeting.gender.male && $scope.targeting.gender.female) {
                $scope.allGender.all = 'true';
                $scope.gender.sex = null;
            } else {
                if ($scope.targeting.gender.male) {
                    $scope.gender.sex = 'male';
                } else {
                    $scope.gender.sex = 'female';
                }
                $scope.allGender.all = 'false';
            }
        };

        var updatePlatform = function updatePlatform() {
            if ($scope.targeting.os.ios && $scope.targeting.os.android) {
                $scope.allFlatform.all = 'true';
                $scope.flatform.os = null;
            } else {
                if ($scope.targeting.os.ios) {
                    $scope.flatform.os = 'ios';
                } else {
                    $scope.flatform.os = 'android';
                }
                $scope.allFlatform.all = 'false';
            }
        };

        var initTargetings = function initTargetings() {
            var deferred = $q.defer();
            var targetingData = editor.dataGet('targeting');
            if (!_.isEmpty(targetingData)) {
                $scope.targeting = targetingData;
                updateGender();
                updatePlatform();
                deferred.resolve();
            } else {
                // $scope.view.busy = true;
                var id = $scope.editId || undefined;
                campaignsService.getTargeting(id).then(function (response) {
                    $scope.targeting.allCategories = response.allCategories;
                    $scope.targeting.allLocations = response.allLocations;
                    $scope.targeting.categories = response.categories;
                    $scope.targeting.locations = response.locations;
                    $scope.targeting.gender = response.gender;
                    $scope.targeting.os = response.os;
                    $scope.targeting.ageRange = response.ageRange;
                    $scope.targeting.ageRanges = response.ageRanges;
                    // $scope.view.busy = false;
                    updateGender();
                    updatePlatform();
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };
        var initBudgeting = function initBudgeting() {
            var deferred = $q.defer();
            var budgetingData = editor.dataGet('budgeting');
            if (!_.isEmpty(budgetingData)) {
                $scope.budgeting = budgetingData;
                $scope.hasBudget = true;
            } else {
                if ($scope.editId) {
                    campaignsService.getCampaignBudget($scope.editId).then(function (data) {
                        $scope.budgeting = data.results[0];
                        $scope.hasBudget = true;
                        deferred.resolve();
                    }, function (response) {
                        errorHandler.processApiResponse(response);
                        deferred.reject();
                    });
                }
            }
            deferred.resolve();
            return deferred.promise;
        };
        var initBalance = function initBalance() {
            var deferred = $q.defer();
            userService.getBalance().then(function (response) {
                $scope.balance = response.credits_balance / response.cash_to_credits_conversion_ratio;
                console.log('balance: ', $scope.balance);
                $scope.updateBalance($scope.balance);
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };
        var initData = function initData() {
            var deferred = $q.defer();
            var deferred1 = $q.defer();
            var deferred2 = $q.defer();
            var deferred3 = $q.defer();
            var deferred4 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise, deferred3.promise, deferred4.promise];

            initCampaign().then(function () {
                deferred1.resolve();
            }, function () {
                deferred1.reject();
            });
            initTargetings().then(function () {
                deferred2.resolve();
            }, function () {
                deferred2.reject();
            });
            initBudgeting().then(function () {
                deferred3.resolve();
            }, function () {
                deferred3.reject();
            });

            initBalance().then(function () {
                deferred4.resolve();
            }, function () {
                deferred4.reject();
            });

            $q.all(promisses).then(function () {
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var init = function init() {
            editor.currentStep(1);
            editor.previousState(1);
            $scope.fundError = false;

            $scope.catAccordionStatus = {
                open: true
            };

            $scope.countriesAccordionStatus = {
                open: true
            };

            $scope.view.busy = true;
            initData().then(function () {
                if ($scope.editId) {
                    $scope.campaign.id = $scope.editId;
                    // $scope.hasBudget = true;
                }
                $scope.view.busy = false;
            }, function () {
                $scope.view.busy = false;
            });
        };

        $scope.$watch(function () {
            return $scope.daterange.dates;
        }, function (newValue, oldValue) {
            if (newValue === undefined || newValue.startDate === null || newValue.endDate === null) {
                return;
            }
            $scope.daterange.display = newValue.startDate.format('YYYY-MM-DD') + ' - ' + newValue.endDate.format('YYYY-MM-DD');
        });
        $scope.showErrors = function () {
            return editor.stepGet('step1', 'submitted');
        };
        function checkAllOption(allVal, arrVal) {
            var all = true;
            angular.forEach(arrVal, function (item, index) {
                if (item.selected === false) {
                    all = false;
                    return;
                }
            });
            return all;
        }

        $scope.scrollToFirstError = function () {
            if (angular.element('.has-error').length > 0) {
                var firstErrorId = angular.element('.has-error')[0].id;

                // angular.element()
                $location.hash(firstErrorId);
                $anchorScroll();
            }
        };

        $scope.nextStep = function () {
            editor.stepSet('step1', 'submitted', true);

            editor.dataSet('campaignStatus', $scope.campaignStatus.status);

            $scope.targeting.allCategories = checkAllOption($scope.targeting.allCategories, $scope.targeting.categories);
            $scope.targeting.allLocations = checkAllOption($scope.targeting.allLocations, $scope.targeting.locations);

            if ($scope.form1.$valid) {
                $scope.view.busy = true;
                editor.stepSet('step1', 'valid', true);

                $scope.campaign.start_date = $scope.daterange.dates.startDate.toISOString();
                $scope.campaign.end_date = $scope.daterange.dates.endDate.toISOString();
                // Store data to model in kaching zone campaign editor service.
                editor.dataSet('campaign', $scope.campaign);

                if ($scope.allFlatform.all === 'true') {
                    $scope.targeting.os.android = true;
                    $scope.targeting.os.ios = true;
                } else {
                    if ($scope.flatform.os === 'ios') {
                        $scope.targeting.os.ios = true;
                        $scope.targeting.os.android = false;
                    } else {
                        $scope.targeting.os.ios = false;
                        $scope.targeting.os.android = true;
                    }
                }

                if ($scope.allGender.all === 'true') {
                    $scope.targeting.gender.male = true;
                    $scope.targeting.gender.female = true;
                } else {
                    if ($scope.gender.sex === 'male') {
                        $scope.targeting.gender.male = true;
                        $scope.targeting.gender.female = false;
                    } else {
                        $scope.targeting.gender.male = false;
                        $scope.targeting.gender.female = true;
                    }
                }

                // Store data to model in kaching zone campaign editor service.
                editor.dataSet('targeting', $scope.targeting);

                // dummy budgeting data - TODO: replace this with real data
                if ($scope.editId === undefined && !$scope.hasBudget) {
                    $scope.budgeting = {
                        cost_per_view: 12,
                        amount: 0,
                        type: 1
                    };
                }
                $scope.budgeting.hasBudget = $scope.hasBudget;

                editor.dataSet('budgeting', $scope.budgeting);

                $scope.fundError = false;
                editor.save('step1').then(function (data) {
                    $scope.goNext();
                    $scope.view.busy = false;
                    if ($scope.editId !== undefined && editor.stepGet('step1', 'submitted')) {
                        helper.alert('success', 'Campaign has been updated.');
                    } else {
                        helper.alert('success', 'Campaign has been created.');
                    }
                    $scope.activeCampaign();
                }, function (response) {
                    if (response.status == 400 && response.data.errorDetails.logicProcessing.processingErrors[0].code == 44) {
                        helper.alert('danger', response.data.errorDetails.logicProcessing.processingErrors[0].message);
                        $scope.fundError = true;
                    } else {
                        errorHandler.processApiResponse(response);
                    }
                    $scope.view.busy = false;
                    console.log('create campaign error');
                });
            } else {
                editor.stepSet('step1', 'valid', false);
                if (angular.element('.ng-invalid').length > 0) {
                    angular.element('.ng-invalid').focus();
                }
                if (angular.element('.image-error').length > 0) {
                    angular.element('.image-error').focus();
                }
                setTimeout(function () {
                    $scope.scrollToFirstError();
                }, 100);
            }
        };
        $scope.logControllerData = function () {
            console.log('campaignEditorStep1Ctrl - campaign', angular.copy($scope.campaign));
        };

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.nextStep();
            }
        });

        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('radioStep2Ctrl', ['$scope', '$state', 'apiUrl', 'authToken', 'utils', 'mediaService', 'FileUploader', 'countryService', 'campaignEditorService', 'campaignsService', '$http', '$q', 'errorHandler', '$anchorScroll', '$location', 'kachingZonesHelpers', 'kachingZonecampaignEditorService', function ($scope, $state, apiUrl, authToken, utils, mediaService, FileUploader, countryService, campaignEditorService, campaignsService, $http, $q, errorHandler, $anchorScroll, $location, kachingZonesHelpers, kachingZonecampaignEditorService) {
        var helper = kachingZonesHelpers;
        var editor = kachingZonecampaignEditorService;

        $scope.formSummited = false;

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/media/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });

        $scope.view = {
            busy: true
        };

        $scope.data = {
            arImageFile: '',
            imageFile: '',
            mediaName: '',
            mediaId: '',
            imageName: '',
            arImageName: '',
            description: ''
        };

        $scope.mediaTypeProp = {
            'type': 'select',
            'name': 'media_type',
            'mediaTypeSelect': 'Upload Media',
            'values': ['Upload Media', 'External Link']
        };

        $scope.errors = {
            video: {},
            image: {},
            arImage: {}
        };

        var imageStyle = 'background-image: none;border-color: #ccc;';

        $scope.imageList = [imageStyle, imageStyle, imageStyle, imageStyle];
        $scope.imageFileList = [];
        $scope.imageReviewIdx = 0;
        $scope.fieldHasError = utils.fieldHasError;

        $scope.updateReviewIndex = function (idx) {
            $scope.imageReviewIdx = idx;
            $scope.data.imageFile = $scope.imageFileList[$scope.imageReviewIdx];
            console.log($scope.data.imageFile);
        };

        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            if (newItem.alias === 'arDisplay') {
                $scope.data.arImageFile = newItem._file;
            }
            if (newItem.alias === 'display') {
                $scope.data.imageFile = newItem._file;
                setTimeout(function () {
                    var $review = angular.element('.uploader-dropzone.image-selected');
                    var imgStyle = $review.attr('style');
                    $scope.imageList[$scope.imageReviewIdx] = imgStyle;
                    $scope.imageFileList[$scope.imageReviewIdx] = $scope.data.imageFile;
                    $scope.imageReviewIdx++;
                    if ($scope.imageReviewIdx === 4) {
                        $scope.imageReviewIdx = 0;
                    }
                    $scope.$apply();
                }, 100);
            }
        };

        $scope.showErrors = function () {
            return $scope.mediaList.length === 0 && editor.stepGet('step2', 'submitted') || $scope.validateError;
        };

        $scope.videoHasError = function () {
            return _typeof($scope.data.videoFile) !== 'object';
        };

        $scope.viewMedia = function () {
            $scope.$hide();
            $state.go('media.view', {
                mediaId: $scope.data.mediaId
            });
        };

        var saveMedia = function saveMedia() {

            var deferred = $q.defer();

            if ($scope.form1.$valid && $scope.data.imageFile !== null) {
                var mediaData = {
                    description: $scope.data.description,
                    type: 'radio',
                    target_name: $scope.data.imageName,
                    target_format: 'radio'
                    // radio_station: $scope.selectedStation.name
                };

                if ($scope.selectedStation) {
                    if ($scope.selectedStation.name.toUpperCase() === 'OTHER') {
                        mediaData.radio_station = $scope.stationOther;
                        $scope.stationOther = '';
                    } else {
                        mediaData.radio_station = $scope.selectedStation.name;
                    }
                }

                if ($scope.data.radioUrl) {
                    mediaData.target_url = $scope.data.radioUrl;

                    if (mediaData.target_url.indexOf('http://') === -1) {
                        mediaData.target_url = 'http://' + mediaData.target_url;
                    }
                }

                if ($scope.editMode) {
                    mediaData.id = $scope.previewMediaId;
                }
                if ($scope.data.imageFile !== null && _typeof($scope.data.imageFile) === 'object') {
                    mediaData.radio = $scope.data.imageFile;
                }

                mediaService.saveKachingZoneMedia(mediaData).then(function (data) {
                    deferred.resolve(data);
                }, function (response) {
                    deferred.reject(response);
                });
            } else {
                $scope.validateError = true;
                editor.stepSet('step2', 'valid', false);
                setTimeout(function () {
                    helper.scrollToFirstError($scope);
                }, 100);
                deferred.reject();
            }
            return deferred.promise;
        };

        $scope.saveMedia = function () {
            var deferred = $q.defer();
            if ($scope.form1.$valid) {
                $scope.view.busy = true;
                saveMedia().then(function (data) {
                    $scope.form1.$setPristine();
                    if ($scope.editMode) {
                        $scope.editMode = false;
                        helper.alert('success', 'Media has been updated.');
                        $scope.view.busy = false;
                        $scope.clearForm();
                        $scope.loadSubmittedMedia();
                        deferred.resolve();
                    } else {
                        $scope.mediaList.push(data);
                        editor.dataSet('mediaList', $scope.mediaList);
                        data.target = kachingAppConfig.wpTemplateUri + '/assets/images/audio_icon.jpg';
                        $scope.getMedia(data.id).then(function () {
                            deferred.resolve();
                        }, function () {
                            deferred.reject();
                        });
                        $scope.clearForm();
                    }
                }, function (response) {
                    $scope.form1.$setPristine();
                    $scope.view.busy = false;
                    deferred.reject();
                });
            } else {
                helper.scrollToFirstError($scope);
                helper.alert('danger', 'Please fill all required fields.');
                deferred.reject();
            }
            return deferred.promise;
        };

        $scope.clearForm = function () {
            helper.clearForm();

            $scope.data = {
                arImageFile: '',
                imageFile: '',
                mediaName: '',
                mediaId: '',
                imageName: '',
                arImageName: '',
                description: '',
                brandImageFile: '',
                brandDescription: '',
                animation: ''
            };

            helper.clearFileUploader('#imageFile');
            helper.clearFileUploader('.image-review-list');

            $scope.imageList = [];
            var emptyImageStyle = 'background-image: none;border-color: #ccc;';
            while ($scope.imageList.length < 4) {
                $scope.imageList.push(emptyImageStyle);
            }
            $scope.imageFileList = [];
            $scope.imageReviewIdx = 0;
        };

        $scope.cancelEdit = function () {
            $scope.clearForm();
            $scope.editMode = false;
            $scope.stationOther = '';
        };

        $scope.getMedia = function (mediaId) {
            var deferred = $q.defer();
            $scope.view.busy = true;
            mediaService.getMediaItem(mediaId).then(function (mediaItem) {
                $scope.view.busy = false;
                $scope.media = mediaItem;
                editor.dataSet('media', $scope.media);

                editor.save('step2').then(function () {
                    $scope.campaignId = editor.dataGet('campaignId');
                    campaignsService.getCampaign($scope.campaignId);
                    // show notification
                    helper.alert('success', 'Media has been created.');
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }, function () {
                // $scope.view.busyMedia = false;
                $scope.view.busy = false;
                deferred.reject();
            });
            return deferred.promise;
        };

        $scope.editMedia = function (mediaId) {
            helper.alert('info', 'You are in edit mode!');
            $scope.editMode = true;
            helper.resetAngularFields($scope);
            $scope.previewMediaId = mediaId.id;
            mediaService.getMediaItem($scope.previewMediaId).then(function (response) {
                $scope.data.description = response.description;
                $scope.data.imageName = response.target_name;
                $scope.data.imageFile = kachingAppConfig.wpTemplateUri + '/assets/images/audio_icon.jpg';
                $scope.data.radioUrl = response.target_url;

                var currentStation = _.find($scope.stations, {
                    name: response.radio_station
                });

                if (currentStation) {
                    $scope.isOther = false;
                    $scope.selectedStation = currentStation;
                } else {
                    $scope.isOther = true;
                    $scope.stationOther = response.radio_station;
                    $scope.selectedStation = _.find($scope.stations, {
                        name: 'Other'
                    });
                }

                $scope.imageList = [];
                $scope.imageFileList = [];
                $scope.imageReviewIdx = 0;
                if ($scope.data.imageFile) {
                    setTimeout(function () {
                        var $review = angular.element('.uploader-dropzone.image-selected');
                        var imgStyle = $review.attr('style');
                        $scope.imageList.push(imgStyle);
                        $scope.imageFileList.push(imgStyle);
                        $scope.imageReviewIdx = 1;
                        var emptyImageStyle = 'background-image: none;border-color: #ccc;';
                        while ($scope.imageList.length < 4) {
                            $scope.imageList.push(emptyImageStyle);
                        }
                    }, 100);
                } else {
                    var emptyImageStyle = 'background-image: none;border-color: #ccc;';
                    while ($scope.imageList.length < 4) {
                        $scope.imageList.push(emptyImageStyle);
                    }
                }
            });
            $scope.editMediaMode = true;
        };

        $scope.deleteMedia = function (media) {
            $scope.previewMediaId = media.id;
            campaignsService.deleteMedia($scope.previewMediaId).then(function (response) {
                console.log(response);
                helper.alert('success', 'Media has been deleted.');
                $scope.loadSubmittedMedia();
            }, function (response) {
                console.log(response);
                helper.alert('danger', 'Media has not been deleted.');
            });
        };

        $scope.loadSubmittedMedia = function () {
            if (editor.dataGet().campaignId !== undefined) {
                campaignsService.getCampaign(editor.dataGet().campaignId).then(function (response) {
                    var mediaTemplate = [];
                    angular.forEach(response.media, function (item, id) {
                        if (!item.target) {
                            item.target = kachingAppConfig.wpTemplateUri + '/assets/images/audio_icon.jpg';
                            mediaTemplate.push(item);
                        }
                    });
                    $scope.mediaList = mediaTemplate;
                });
            }
        };

        $scope.getFormats = function () {
            $scope.formats = ['Commercial'];
        };
        $scope.getFormats();

        $scope.stations = [{
            id: 'Z100_FM',
            name: 'FZ 100'
        }, {
            id: 'Z200_AM',
            name: 'FZ_200'
        }, {
            id: 'Jazz_FM',
            name: 'Jazz FM'
        }, {
            id: '101.9_FM',
            name: '101.9 FM'
        }, {
            id: 'KISS_FM',
            name: 'KISS FM'
        }, {
            id: '95_FM',
            name: '95 FM'
        }, {
            id: 'other',
            name: 'Other'
        }];
        $scope.selectedStation = $scope.stations[0];

        // Check other values of selected
        $scope.changeSelect = function () {
            if ($scope.selectedStation.name.toUpperCase() === 'OTHER') {
                if (!$scope.stationOther) {
                    $scope.stationOther = '';
                }
                $scope.isOther = true;
            } else {
                $scope.isOther = false;
            }
        };

        $scope.finish = function () {

            var deferred = $q.defer();

            var campaignStatus = editor.dataGet('campaignStatus');
            var campaign = editor.dataGet('campaign');

            if (campaignStatus === 'start' && !campaign.status || $scope.editId) {
                // $scope.view.busy = true;
                // $scope.campaignId = editor.dataGet( 'campaignId' );
                // campaignsService.setPrepared( $scope.campaignId ).then(
                //     function( response ) {
                //         $scope.view.busy = false;
                //         deferred.resolve(response);
                //     },
                //     function( response ) {
                //         errorHandler.processApiResponse( response );
                //         $scope.view.busy = false;
                //         deferred.reject(response);
                //     }
                // );
                $scope.activeCampaign().then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        };

        $scope.init = function () {

            $scope.validateError = false;
            $scope.loadSubmittedMedia();

            if (!$scope.editId) {
                if (!editor.stepGet('step1', 'valid')) {
                    $scope.updateStep(editor.currentStep());
                }
            }

            editor.currentStep(2);
            editor.previousState(2);

            $scope.mediaList = [];

            if ($scope.editId) {
                $scope.initEditMode($scope.editId);
            } else {
                var mediaListData = editor.dataGet('mediaList');
                if (!_.isEmpty(mediaListData)) {
                    $scope.mediaList = mediaListData;
                }
            }

            $scope.view.busy = false;
            $scope.editMediaMode = false;
            $scope.editMode = false;
        };

        $scope.initEditMode = function () {
            // $scope.view.busy = true;
            campaignsService.getCampaign($scope.editId).then(function (data) {
                // $scope.campaign
                $scope.validateError = false;
                $scope.mediaList = data.media;
                angular.forEach($scope.mediaList, function (value, key) {
                    if (value.target === null) {
                        value.target = kachingAppConfig.wpTemplateUri + '/assets/images/audio_icon.jpg';
                    }
                });
            }, function () {});
        };

        var checkFormPristine = function checkFormPristine() {
            if (!$scope.form1.$pristine) {
                return false;
            } else {
                // if ($scope.latitude || $scope.longitude) {
                //     return false;
                // }
                for (var property in $scope.data) {
                    if ($scope.data[property]) {
                        return false;
                    }
                }
                return true;
            }
        };

        $scope.nextStep = function () {
            $scope.form1.$setSubmitted();
            if (checkFormPristine() && $scope.mediaList.length > 0) {
                editor.stepSet('step2', 'submitted', true);
                if ($scope.mediaList.length > 0) {
                    editor.stepSet('step2', 'valid', true);
                    $scope.finish().then(function () {
                        $scope.goNext();
                    });
                } else {
                    editor.stepSet('step2', 'valid', false);
                    setTimeout(function () {
                        helper.scrollToFirstError($scope);
                    }, 100);
                    helper.alert('danger', 'Please add at least one Audio');
                }
            } else {
                $scope.saveMedia().then(function () {
                    editor.stepSet('step2', 'submitted', true);
                    if ($scope.mediaList.length > 0) {
                        editor.stepSet('step2', 'valid', true);
                        $scope.finish().then(function () {
                            $scope.goNext();
                        });
                    } else {
                        editor.stepSet('step2', 'valid', false);
                        setTimeout(function () {
                            helper.scrollToFirstError($scope);
                        }, 100);
                        helper.alert('danger', 'Please add at least one Audio');
                    }
                }, function () {});
            }
        };

        $scope.goPrev = function () {
            $scope.updateStep(1);
        };

        $scope.needBasicValidateZone = function () {
            if ($scope.data.imageFile || $scope.data.imageName || $scope.data.url || $scope.data.description) {
                return true;
            } else {
                return false;
            }
        };

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.nextStep();
            }
        });

        $scope.init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('radioStep3Ctrl', ['$scope', 'productsService', 'campaignEditorService', 'campaignsService', 'mediaService', 'utils', 'FileUploader', 'apiUrl', 'authToken', '$http', '$q', 'errorHandler', 'kachingZonesHelpers', 'kachingZonecampaignEditorService', function ($scope, productsService, campaignEditorService, campaignsService, mediaService, utils, FileUploader, apiUrl, authToken, $http, $q, errorHandler, kachingZonesHelpers, kachingZonecampaignEditorService) {
        var helper = kachingZonesHelpers;
        var editor = kachingZonecampaignEditorService;

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/products/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });

        $scope.view = {
            busy: true,
            productImageUploadStarted: false,
            productImageUploadProgress: 0,
            productImageUploadComplete: false
        };

        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            $scope.data.productImageFile = newItem._file;
        };

        uploader.onBeforeUploadItem = function (item) {
            $scope.view.productImageUploadStarted = true;
            item.url = apiUrl + '/media/' + $scope.data.mediaId + '/';
        };

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.view.productImageUploadComplete = true;
        };

        uploader.onProgressItem = function (fileItem, progress) {
            $scope.view.productImageUploadProgress = progress;
        };

        uploader.onCompleteAll = function () {
            $scope.view.mediaCreated = true;
        };

        $scope.data = {
            'title': '',
            'description': '',
            'pirce': '',
            'url': ''
        };

        $scope.previewData = {
            isInstore: false,
            followIBeacon: { enabled: false },
            scanReceipt: { enabled: false },
            issueQR: { enabled: false },
            buyProducts: { enabled: false },
            sendInformation: { enabled: false },
            register: { enabled: false },
            share: { enabled: false },
            openMicrophone: { enabled: false },
            watchVideo: { enabled: false }
        };

        $scope.recommendedProducts = [];
        $scope.carouselOptions = {
            nav: true,
            dots: false,
            navText: ['<span class="glyphicon glyphicon-triangle-left"></span>', '<span class="glyphicon glyphicon-triangle-right"></span>'],
            navRewind: false,
            loop: false,
            items: 4
        };
        $scope.products = editor.dataGet('products');

        var getRecommendedProducts = function getRecommendedProducts() {
            productsService.getProducts({ limit: 16, offset: 0, ordering: '-last_used_date' }).then(function (products) {
                $scope.recommendedProducts = products.items;
            });
        };

        var myArr = [{
            type: 'type',
            perDollarPerClick: 3
        }, {
            type: 'another type',
            perDollarPerClick: 2
        }];
        $scope.purchaseAds = myArr;

        $scope.saveProduct = function () {
            var deferred = $q.defer();
            createProduct().then(function (data) {
                if (data && data.id) {
                    addProductToCampaign($scope.addedProducts.concat([data])).then(function () {
                        campaignsService.getCampaign($scope.campaignId).then(function (campaign) {
                            $scope.addedProducts = campaign.products;
                        }, function (response) {});
                    }, function () {});
                }
            }, function (response) {
                errorHandler.processApiResponse(response);
                $scope.view.busy = false;
            });
            return deferred.promise;
        };

        function createProduct() {

            if ($scope.data.url.match(/^http[s]?:\/\//i) === null) {
                $scope.data.url = 'http://' + $scope.data.url;
            }

            var productData = {
                title: $scope.data.title,
                description: $scope.data.description,
                price: $scope.data.price,
                url: $scope.data.url
            };

            if (_typeof($scope.data.productImageFile) === 'object') {
                productData.image = $scope.data.productImageFile;
            }

            if ($scope.editMode === true) {
                productData.id = $scope.data.productIdInEdit;
            }

            var deferred = $q.defer();

            productsService.createProduct(productData).then(function (data) {
                deferred.resolve(data);
                $scope.data.productIdInEdit = undefined;
                $scope.editMode = false;
            }, function (response) {
                deferred.reject(response);
                errorHandler.processApiResponse(response);
            });

            return deferred.promise;
        }

        // campaignsService.saveProducts
        function addProductToCampaign(product) {
            var deferred = $q.defer();

            campaignsService.saveProducts($scope.campaignId, product).then(function (data) {
                // $scope.view.busy = false;
                helper.alert('success', 'Product has been added');
                deferred.resolve(data);
            }, function (response) {
                // $scope.view.busy = false;
                deferred.reject(response);
                errorHandler.processApiResponse(response);
            });

            return deferred.promise;
        }

        $scope.selectRecommendedProduct = function (product) {
            $scope.editMode = true;
            $scope.data.productIdInEdit = product.id;
            $scope.data.title = product.title;
            $scope.data.description = product.description;
            $scope.data.price = product.price;
            $scope.data.url = product.url;
            $scope.data.productImageFile = product.image;
            helper.alert('info', 'Product in edit mode!');
        };

        $scope.fieldHasError = utils.fieldHasError;
        $scope.showErrors = function () {
            return editor.stepGet('step3', 'submitted');
        };

        $scope.nextStep = function () {
            editor.stepSet('step3', 'submitted', true);
            if ($scope.form1.$valid) {
                $scope.view.busy = true;
                editor.stepSet('step3', 'valid', true);
                $scope.updateAllMedia($scope.medias).then(function () {
                    $scope.goNext();
                    helper.alert('success', 'All media has been updated');
                    $scope.view.busy = false;
                    $scope.activeCampaign();
                }, function (response) {
                    $scope.view.busy = false;
                    errorHandler.processApiResponse(response);
                });
            }
        };

        $scope.updateAllMedia = function (medias) {
            var deferred = $q.defer();
            var promisses = [];

            angular.forEach(medias, function (media) {
                var prodDeferred = $q.defer();
                promisses.push(prodDeferred.promise);
                var mediaData = {
                    id: media.id,
                    bets_per_view: media.bets_per_view,
                    type: 'radio'
                };
                campaignsService.updateMedia(mediaData).then(function (response) {
                    prodDeferred.resolve(response);
                }, function (response) {
                    prodDeferred.reject(response);
                });

                // Update media
                var rewardDeferred = $q.defer();
                promisses.push(rewardDeferred.promise);
                var rewardData = {
                    send_information: media.reward.send_information,
                    share: media.reward.share,
                    product: media.reward.product
                };
                mediaService.updateReward(media.id, rewardData).then(function (response) {
                    rewardDeferred.resolve(response);
                }, function (response) {
                    rewardDeferred.reject(response);
                });

                // Update Register
                var registerDeferred = $q.defer();
                promisses.push(registerDeferred.promise);
                var campaign = {
                    id: $scope.campaignId,
                    register: $scope.campaign.register
                };
                campaignsService.saveKachingZoneCampagin(campaign).then(function (response) {
                    registerDeferred.resolve();
                }, function (response) {
                    registerDeferred.reject();
                });
            });
            $q.all(promisses).then(function () {
                deferred.resolve();
            });
            return deferred.promise;
        };

        var init = function init() {

            if (!$scope.editId) {
                if (!editor.stepGet('step1', 'valid') || !editor.stepGet('step2', 'valid')) {
                    $scope.updateStep(editor.currentStep());
                }
            }

            editor.currentStep(3);
            editor.previousState(3);

            if ($scope.editId) {
                $scope.campaignId = $scope.editId;
            } else {
                $scope.campaignId = editor.dataGet('campaignId');
            }

            $scope.addedProducts = [];
            getRecommendedProducts();
            utils.addUploaderTypeFilter(uploader, 'image', {
                imageFilter: ['image/png', 'image/jpg', 'image/jpeg']
            });
            $scope.grandTotal = 0;
            campaignsService.getCampaign($scope.campaignId).then(function (campaign) {
                $scope.addedProducts = campaign.products;
                angular.forEach(campaign.media, function (media, index) {
                    if (media.target === null && media.type === 'radio') {
                        media.target = kachingAppConfig.wpTemplateUri + '/assets/images/audio_icon.jpg';
                    }
                });

                $scope.campaign = campaign;

                if (!$scope.campaign.register) {
                    $scope.campaign.register = 0;
                }

                if (campaign.media.length > 0) {
                    $scope.medias = campaign.media;
                    angular.forEach($scope.medias, function (value, key) {
                        $scope.grandTotal += 1 * value.bets_per_view;
                        if (!value.reward) {
                            value.reward = {
                                send_information: 0,
                                share: 0,
                                product: 0
                            };
                        }
                    });
                }
                $scope.view.busy = false;
            }, function (response) {
                errorHandler.processApiResponse(response);
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
            });
        };

        init();

        $scope.$watchCollection('medias', function (newVal, oldVal) {});

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.saveProduct();
                $scope.nextStep();
            }
        });
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('radioStep4Ctrl', ['$scope', 'productsService', 'campaignsService', 'campaignEditorService', 'kachingZonecampaignEditorService', '$q', 'errorHandler', function ($scope, productsService, campaignsService, campaignEditorService, kachingZonecampaignEditorService, $q, errorHandler) {
        var editor = kachingZonecampaignEditorService;
        $scope.view = {
            busy: true
        };

        $scope.locations = {};
        $scope.categories = {};

        var initCampaign = function initCampaign() {
            var deferred = $q.defer();
            var mediaListData = editor.dataGet('mediaList');
            if (!_.isEmpty(mediaListData)) {
                $scope.mediaList = mediaListData;
                $scope.campaignId = editor.dataGet('campaignId');
                $scope.media = editor.dataGet('media');
                campaignsService.getCampaign($scope.campaignId).then(function (response) {
                    $scope.campaign = response;
                });
                deferred.resolve();
            } else {
                campaignsService.getCampaign($scope.editId).then(function (data) {
                    $scope.mediaList = data.media;
                    $scope.campaign = data;
                    angular.forEach($scope.mediaList, function (value, key) {
                        $scope.grandTotal += 1 * value.bets_per_view;
                    });
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };

        var initTargetings = function initTargetings() {
            var deferred = $q.defer();
            var targetingData = editor.dataGet('targeting');
            if (!_.isEmpty(targetingData)) {
                $scope.targeting = targetingData;
                var arrLocations = [],
                    arrCategories = [];
                // Get a location have selected true
                angular.forEach($scope.targeting.locations, function (item, id) {
                    if (item.selected === true) {
                        arrLocations.push(item);
                    }
                });
                // Get a category have selected true
                angular.forEach($scope.targeting.categories, function (item, id) {
                    if (item.selected === true) {
                        arrCategories.push(item);
                    }
                });
                $scope.locations = arrLocations;
                $scope.categories = arrCategories;
                deferred.resolve();
            } else {
                // $scope.view.busy = true;
                var id = $scope.editId || undefined;
                campaignsService.getTargeting(id).then(function (response) {
                    $scope.targeting = response;
                    var arrLocations = [],
                        arrCategories = [];
                    // Get a location have selected true
                    angular.forEach($scope.targeting.locations, function (item, id) {
                        if (item.selected === true) {
                            arrLocations.push(item);
                        }
                    });
                    // Get a category have selected true
                    angular.forEach($scope.targeting.categories, function (item, id) {
                        if (item.selected === true) {
                            arrCategories.push(item);
                        }
                    });
                    $scope.locations = arrLocations;
                    $scope.categories = arrCategories;
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };

        var initData = function initData() {
            var deferred = $q.defer();
            var deferred1 = $q.defer();
            var deferred2 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise];

            initCampaign().then(function () {
                deferred1.resolve();
            }, function () {
                deferred1.reject();
            });

            initTargetings().then(function () {
                deferred2.resolve();
            }, function () {
                deferred2.reject();
            });

            $q.all(promisses).then(function () {
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var init = function init() {
            $scope.view.busy = true;

            if (!$scope.editId) {
                if (!editor.stepGet('step1', 'valid') || !editor.stepGet('step2', 'valid') || !editor.stepGet('step3', 'valid')) {
                    $scope.updateStep(editor.currentStep());
                }
            }

            editor.currentStep(4);
            editor.previousState(4);

            $scope.campaignId = editor.dataGet('campaignId');
            $scope.media = editor.dataGet('media');
            campaignsService.getCampaign($scope.campaignId).then(function (response) {
                $scope.dataFromApi = response;
            });

            $scope.mediaList = [];
            $scope.grandTotal = 0;

            initData().then(function () {
                $scope.view.busy = false;
            }, function () {
                $scope.view.busy = false;
            });
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('tvAdsCtrl', ['$scope', '$state', '$stateParams', 'campaignEditorService', 'campaignId', 'viewDetail', 'kachingZonecampaignEditorService', 'campaignsService', '$q', function ($scope, $state, $stateParams, campaignEditorService, campaignId, viewDetail, kachingZonecampaignEditorService, campaignsService, $q) {
        var editor = kachingZonecampaignEditorService;

        $scope.logData = function () {
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

        $scope.goNext = function () {
            $scope.progress += 1;
            $scope.step += 1;
        };

        $scope.goPrev = function () {
            $scope.step -= 1;
        };

        $scope.updateStep = function (newVal) {
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

        $scope.activeCampaign = function () {
            var deferred = $q.defer();
            var campaignStatus = editor.dataGet('campaignStatus');
            // var campaign = editor.dataGet('campaign');

            var campaignId = editor.dataGet('campaignId');
            campaignsService.getCampaign(campaignId).then(function (data) {
                if (data.media && data.media.length > 0) {
                    if (campaignStatus === 'start' || campaignStatus === false || !$scope.editId && !campaignStatus) {
                        $scope.campaignId = editor.dataGet('campaignId');
                        campaignsService.setPrepared($scope.campaignId).then(function (response) {
                            deferred.resolve(response);
                        }, function (response) {
                            deferred.reject(response);
                        });
                    }
                } else {
                    deferred.reject();
                }
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        $scope.updateBalance = function (value) {
            $scope.balance = value;
        };

        $scope.goToFund = function (modal) {
            $scope.$broadcast('fund-broadcast');
            modal.$hide();
            $state.go('funds');
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('tvStep1Ctrl', ['$scope', '$state', '$stateParams', 'apiUrl', 'authToken', 'errorHandler', 'campaignEditorService', 'utils', 'FileUploader', 'campaignsService', '$q', '$http', '$location', '$anchorScroll', 'kachingZonesHelpers', 'kachingZonecampaignEditorService', 'userService', function ($scope, $state, $stateParams, apiUrl, authToken, errorHandler, campaignEditorService, utils, FileUploader, campaignsService, $q, $http, $location, $anchorScroll, kachingZonesHelpers, kachingZonecampaignEditorService, userService) {

        var helper = kachingZonesHelpers;
        var editor = kachingZonecampaignEditorService;

        $scope.view = {
            busy: true
        };

        $scope.fieldHasError = utils.fieldHasError;

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/media/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });
        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            if (newItem.alias === 'customerLogo') {
                $scope.campaign.logo_image = newItem._file;
            }
            if (newItem.alias === 'backgroundImage') {
                $scope.campaign.header_image = newItem._file;
            }
        };

        $scope.campaign = {};
        $scope.targeting = {};
        $scope.budgeting = {};
        $scope.daterange = {
            dates: {
                startDate: null,
                endDate: null
            },
            min: moment().format('YYYY-MM-DD'),
            display: 'Select date range'
        };

        $scope.data = {
            campaign: $scope.campaign,
            targeting: $scope.targeting,
            budgeting: $scope.budgeting,
            daterange: $scope.daterange
        };
        $scope.hasBudget = false;

        // campaign status
        // INCOMPLETE = 0
        // BILLING = 1
        // PREPARED = 2
        // LIVE = 3
        // COMPLETED = 4
        // STOPPED = 5
        $scope.campaignStatus = {
            status: 'start'
        };

        // flatform
        $scope.allFlatform = {
            all: 'true'
        };
        $scope.flatform = {
            os: 'ios'
        };

        $scope.$watch('allFlatform.all', function (newValue, oldValue) {
            if (newValue === 'true' || newValue === true) {
                $scope.flatform.os = null;
            } else {
                if ($scope.flatform.os === null) {
                    $scope.flatform.os = 'ios';
                }
            }
        });

        $scope.$watch('flatform.os', function (newValue, oldValue) {
            if (newValue !== null) {
                $scope.allFlatform.all = 'false';
            }
        });

        // gender
        $scope.allGender = {
            all: 'true'
        };
        $scope.gender = {
            sex: 'male'
        };

        $scope.$watch('allGender.all', function (newValue, oldValue) {
            if (newValue === 'true' || newValue === true) {
                $scope.gender.sex = null;
            } else {
                if ($scope.gender.sex === null) {
                    $scope.gender.sex = 'male';
                }
            }
        });

        $scope.$watch('gender.sex', function (newValue, oldValue) {
            if (newValue !== null) {
                $scope.allGender.all = 'false';
            }
        });

        // community

        $scope.communityOption = {
            all: true
        };
        $scope.unSelectAllCommunities = function () {
            $scope.targeting.selectedCommunity = [];
        };
        $scope.firstSelectCommunity = function () {
            if ($scope.data.selectedCommunity.length === 0) {
                $scope.data.selectedCommunity = ['Urban'];
            }
        };
        $scope.toggleCommunity = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }

            $scope.communityOption.all = false;
        };
        $scope.communityExists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.updateDataModel = function (e, obj) {
            e.preventDefault();
            obj.selected = !obj.selected;
            console.log($scope.data);
        };
        var initCampaign = function initCampaign() {
            var deferred = $q.defer();
            if ($scope.editId !== undefined) {
                campaignsService.getCampaign($scope.editId).then(function (campaign) {
                    $scope.campaign = campaign;
                    $scope.campaign.logo_image = campaign.logo_image;
                    $scope.campaign.header_image = campaign.header_image;
                    // $scope.campaign.amount = campaign.fund;
                    $scope.campaign.customerName = campaign.client;
                    $scope.campaign.description = campaign.description;
                    $scope.campaign.logo_description = campaign.logo_description;
                    $scope.campaign.header_description = campaign.header_description;

                    if (typeof $scope.campaign.start_date !== 'undefined' && typeof $scope.campaign.end_date !== 'undefined') {
                        $scope.daterange.dates.startDate = moment($scope.campaign.start_date);
                        $scope.daterange.dates.endDate = moment($scope.campaign.end_date);
                        $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
                    }
                    $scope.campaign.type = 'tv-ads';
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            } else {
                $scope.campaign = editor.dataGet('campaign');
                if (typeof $scope.campaign.start_date !== 'undefined' && typeof $scope.campaign.end_date !== 'undefined') {
                    $scope.daterange.dates.startDate = moment($scope.campaign.start_date);
                    $scope.daterange.dates.endDate = moment($scope.campaign.end_date);
                    $scope.daterange.display = $scope.daterange.dates.startDate.format('YYYY-MM-DD') + ' - ' + $scope.daterange.dates.endDate.format('YYYY-MM-DD');
                }
                $scope.campaign.type = 'tv-ads';
                deferred.resolve();
            }
            return deferred.promise;
        };

        var updateGender = function updateGender() {
            if ($scope.targeting.gender.male && $scope.targeting.gender.female) {
                $scope.allGender.all = 'true';
                $scope.gender.sex = null;
            } else {
                if ($scope.targeting.gender.male) {
                    $scope.gender.sex = 'male';
                } else {
                    $scope.gender.sex = 'female';
                }
                $scope.allGender.all = 'false';
            }
        };

        var updatePlatform = function updatePlatform() {
            if ($scope.targeting.os.ios && $scope.targeting.os.android) {
                $scope.allFlatform.all = 'true';
                $scope.flatform.os = null;
            } else {
                if ($scope.targeting.os.ios) {
                    $scope.flatform.os = 'ios';
                } else {
                    $scope.flatform.os = 'android';
                }
                $scope.allFlatform.all = 'false';
            }
        };

        var initTargetings = function initTargetings() {
            var deferred = $q.defer();
            var targetingData = editor.dataGet('targeting');
            if (!_.isEmpty(targetingData)) {
                $scope.targeting = targetingData;
                updateGender();
                updatePlatform();
                deferred.resolve();
            } else {
                // $scope.view.busy = true;
                var id = $scope.editId || undefined;
                campaignsService.getTargeting(id).then(function (response) {
                    $scope.targeting.allCategories = response.allCategories;
                    $scope.targeting.allLocations = response.allLocations;
                    $scope.targeting.categories = response.categories;
                    $scope.targeting.locations = response.locations;
                    $scope.targeting.gender = response.gender;
                    $scope.targeting.os = response.os;
                    $scope.targeting.ageRange = response.ageRange;
                    $scope.targeting.ageRanges = response.ageRanges;
                    // $scope.view.busy = false;
                    updateGender();
                    updatePlatform();
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };
        var initBudgeting = function initBudgeting() {
            var deferred = $q.defer();
            var budgetingData = editor.dataGet('budgeting');
            if (!_.isEmpty(budgetingData)) {
                $scope.budgeting = budgetingData;
                $scope.hasBudget = true;
            } else {
                if ($scope.editId) {
                    campaignsService.getCampaignBudget($scope.editId).then(function (data) {
                        $scope.budgeting = data.results[0];
                        $scope.hasBudget = true;
                        deferred.resolve();
                    }, function (response) {
                        errorHandler.processApiResponse(response);
                        deferred.reject();
                    });
                }
            }
            deferred.resolve();
            return deferred.promise;
        };
        var initBalance = function initBalance() {
            var deferred = $q.defer();
            userService.getBalance().then(function (response) {
                $scope.balance = response.credits_balance / response.cash_to_credits_conversion_ratio;
                console.log('balance: ', $scope.balance);
                $scope.updateBalance($scope.balance);
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };
        var initData = function initData() {
            var deferred = $q.defer();
            var deferred1 = $q.defer();
            var deferred2 = $q.defer();
            var deferred3 = $q.defer();
            var deferred4 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise, deferred3.promise, deferred4.promise];

            initCampaign().then(function () {
                deferred1.resolve();
            }, function () {
                deferred1.reject();
            });
            initTargetings().then(function () {
                deferred2.resolve();
            }, function () {
                deferred2.reject();
            });
            initBudgeting().then(function () {
                deferred3.resolve();
            }, function () {
                deferred3.reject();
            });

            initBalance().then(function () {
                deferred4.resolve();
            }, function () {
                deferred4.reject();
            });

            $q.all(promisses).then(function () {
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var init = function init() {
            editor.currentStep(1);
            editor.previousState(1);
            $scope.fundError = false;

            $scope.catAccordionStatus = {
                open: true
            };

            $scope.countriesAccordionStatus = {
                open: true
            };

            $scope.view.busy = true;
            initData().then(function () {
                if ($scope.editId) {
                    $scope.campaign.id = $scope.editId;
                    // $scope.hasBudget = true;
                }
                $scope.view.busy = false;
            }, function () {
                $scope.view.busy = false;
            });
        };

        $scope.$watch(function () {
            return $scope.daterange.dates;
        }, function (newValue, oldValue) {
            if (newValue === undefined || newValue.startDate === null || newValue.endDate === null) {
                return;
            }
            $scope.daterange.display = newValue.startDate.format('YYYY-MM-DD') + ' - ' + newValue.endDate.format('YYYY-MM-DD');
        });
        $scope.showErrors = function () {
            return editor.stepGet('step1', 'submitted');
        };
        function checkAllOption(allVal, arrVal) {
            var all = true;
            angular.forEach(arrVal, function (item, index) {
                if (item.selected === false) {
                    all = false;
                    return;
                }
            });
            return all;
        }

        $scope.scrollToFirstError = function () {
            if (angular.element('.has-error').length > 0) {
                var firstErrorId = angular.element('.has-error')[0].id;

                // angular.element()
                $location.hash(firstErrorId);
                $anchorScroll();
            }
        };

        $scope.nextStep = function () {
            editor.stepSet('step1', 'submitted', true);

            // $scope.campaignStatus
            editor.dataSet('campaignStatus', $scope.campaignStatus.status);

            $scope.targeting.allCategories = checkAllOption($scope.targeting.allCategories, $scope.targeting.categories);
            $scope.targeting.allLocations = checkAllOption($scope.targeting.allLocations, $scope.targeting.locations);

            if ($scope.form1.$valid) {
                $scope.view.busy = true;
                editor.stepSet('step1', 'valid', true);

                $scope.campaign.start_date = $scope.daterange.dates.startDate.toISOString();
                $scope.campaign.end_date = $scope.daterange.dates.endDate.toISOString();
                // Store data to model in kaching zone campaign editor service.
                editor.dataSet('campaign', $scope.campaign);

                if ($scope.allFlatform.all === 'true') {
                    $scope.targeting.os.android = true;
                    $scope.targeting.os.ios = true;
                } else {
                    if ($scope.flatform.os === 'ios') {
                        $scope.targeting.os.ios = true;
                        $scope.targeting.os.android = false;
                    } else {
                        $scope.targeting.os.ios = false;
                        $scope.targeting.os.android = true;
                    }
                }

                if ($scope.allGender.all === 'true') {
                    $scope.targeting.gender.male = true;
                    $scope.targeting.gender.female = true;
                } else {
                    if ($scope.gender.sex === 'male') {
                        $scope.targeting.gender.male = true;
                        $scope.targeting.gender.female = false;
                    } else {
                        $scope.targeting.gender.male = false;
                        $scope.targeting.gender.female = true;
                    }
                }

                // Store data to model in kaching zone campaign editor service.
                editor.dataSet('targeting', $scope.targeting);

                // dummy budgeting data - TODO: replace this with real data
                if ($scope.editId === undefined && !$scope.hasBudget) {
                    $scope.budgeting = {
                        cost_per_view: 12,
                        amount: 0,
                        type: 1
                    };
                }
                $scope.budgeting.hasBudget = $scope.hasBudget;

                editor.dataSet('budgeting', $scope.budgeting);

                $scope.fundError = false;
                editor.save('step1').then(function (data) {
                    $scope.goNext();
                    $scope.view.busy = false;
                    if ($scope.editId !== undefined && editor.stepGet('step1', 'submitted')) {
                        helper.alert('success', 'Campaign has been updated.');
                    } else {
                        helper.alert('success', 'Campaign has been created.');
                    }
                    $scope.activeCampaign();
                }, function (response) {
                    if (response.status == 400 && response.data.errorDetails.logicProcessing.processingErrors[0].code == 44) {
                        helper.alert('danger', response.data.errorDetails.logicProcessing.processingErrors[0].message);
                        $scope.fundError = true;
                    } else {
                        errorHandler.processApiResponse(response);
                    }
                    $scope.view.busy = false;
                    console.log('create campaign error');
                });
            } else {
                editor.stepSet('step1', 'valid', false);
                if (angular.element('.ng-invalid').length > 0) {
                    angular.element('.ng-invalid').focus();
                }
                if (angular.element('.image-error').length > 0) {
                    angular.element('.image-error').focus();
                }
                setTimeout(function () {
                    $scope.scrollToFirstError();
                }, 100);
            }
        };
        $scope.logControllerData = function () {
            console.log('campaignEditorStep1Ctrl - campaign', angular.copy($scope.campaign));
        };

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.nextStep();
            }
        });

        init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('tvStep2Ctrl', ['$scope', '$state', 'apiUrl', 'authToken', 'utils', 'mediaService', 'FileUploader', 'countryService', 'kachingZonecampaignEditorService', 'campaignsService', '$http', '$q', 'errorHandler', 'kachingZonesHelpers', '$anchorScroll', '$location', function ($scope, $state, apiUrl, authToken, utils, mediaService, FileUploader, countryService, kachingZonecampaignEditorService, campaignsService, $http, $q, errorHandler, kachingZonesHelpers, $anchorScroll, $location) {
        var helper = kachingZonesHelpers;
        var editor = kachingZonecampaignEditorService;
        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/media/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });

        $scope.fieldHasError = utils.fieldHasError;

        $scope.view = {
            busy: true,
            uploading: false,
            submitted: false,
            mediaCreated: false,

            videoUploadStarted: false,
            videoUploadProgress: 0,
            videoUploadComplete: false,

            imageUploadStarted: false,
            imageUploadProgress: 0,
            imageUploadComplete: false,

            arImageUploadStarted: false,
            arImageUploadProgress: 0,
            arImageUploadComplete: false,

            brandImageUploadStarted: false,
            brandImageUploadProgress: 0,
            brandImageUploadComplete: false
        };

        $scope.data = {
            arImageFile: '',
            imageFile: '',
            mediaName: '',
            mediaId: '',
            imageName: '',
            arImageName: '',
            description: '',
            brandImageFile: '',
            brandDescription: '',
            animation: ''
        };

        $scope.tvStations = ['ABC', 'CNN', 'DBS', 'HTK', 'SKY', 'BBC', 'TV NEWS', 'Other'];

        // Check other values of selected
        $scope.changeSelect = function () {
            if ($scope.selectedTvStation.toUpperCase() === 'OTHER') {
                if (!$scope.stationOther) {
                    $scope.stationOther = '';
                }
                $scope.isOther = true;
            } else {
                $scope.isOther = false;
            }
        };

        $scope.mediaTypeProp = {
            'type': 'select',
            'name': 'media_type',
            'mediaTypeSelect': 'Upload Media',
            'values': ['Upload Media', 'External Link']
        };

        $scope.errors = {
            video: {},
            image: {},
            arImage: {}
        };

        var imageStyle = 'background-image: none;border-color: #ccc;';
        $scope.imageList = [imageStyle, imageStyle, imageStyle, imageStyle];
        $scope.imageFileList = [];
        $scope.imageReviewIdx = 0;

        $scope.mediaList = [];

        var checkFormPristine = function checkFormPristine() {
            if (!$scope.form1.$pristine) {
                return false;
            } else {
                // if ($scope.latitude || $scope.longitude) {
                //     return false;
                // }
                for (var property in $scope.data) {
                    if ($scope.data[property]) {
                        return false;
                    }
                }
                return true;
            }
        };

        $scope.nextStep = function () {
            $scope.form1.$setSubmitted();
            if (checkFormPristine() && $scope.mediaList.length > 0) {
                editor.stepSet('step2', 'submitted', true);
                if ($scope.mediaList.length > 0) {
                    editor.stepSet('step2', 'valid', true);
                    $scope.finish().then(function () {
                        $scope.goNext();
                    });
                } else {
                    editor.stepSet('step2', 'valid', false);
                    setTimeout(function () {
                        $scope.scrollToFirstError();
                    }, 100);
                    helper.alert('danger', 'Please add at least one AR');
                }
            } else {
                $scope.saveMedia().then(function () {
                    editor.stepSet('step2', 'submitted', true);
                    if ($scope.mediaList.length > 0) {
                        editor.stepSet('step2', 'valid', true);
                        $scope.finish().then(function () {
                            $scope.goNext();
                        });
                    } else {
                        editor.stepSet('step2', 'valid', false);
                        setTimeout(function () {
                            $scope.scrollToFirstError();
                        }, 100);
                        helper.alert('danger', 'Please add at least one AR');
                    }
                }, function () {});
            }
        };

        $scope.goPrev = function () {
            $scope.updateStep(1);
        };

        $scope.updateReviewIndex = function (idx) {
            $scope.imageReviewIdx = idx;
            $scope.data.imageFile = $scope.imageFileList[$scope.imageReviewIdx];
            console.log($scope.data.imageFile);
        };

        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            if (newItem.alias === 'arDisplay') {
                $scope.data.arImageFile = newItem._file;
            }
            if (newItem.alias === 'brandImage') {
                $scope.data.brandImageFile = newItem._file;
            }
            if (newItem.alias === 'display') {
                $scope.data.imageFile = newItem._file;
                setTimeout(function () {
                    var $review = angular.element('.uploader-dropzone.image-selected');
                    var imgStyle = $review.attr('style');
                    $scope.imageList[$scope.imageReviewIdx] = imgStyle;
                    $scope.imageFileList[$scope.imageReviewIdx] = $scope.data.imageFile;
                    $scope.imageReviewIdx++;
                    if ($scope.imageReviewIdx === 4) {
                        $scope.imageReviewIdx = 0;
                    }
                    $scope.$apply();
                }, 100);
            }
        };

        uploader.onBeforeUploadItem = function (item) {
            if (item.alias === 'arDisplay') {
                $scope.view.arImageUploadStarted = true;
            }
            if (item.alias === 'display') {
                $scope.view.imageUploadStarted = true;
            }
            if (item.alias === 'brandImage') {
                $scope.view.brandImageUploadStarted = true;
            }
            item.url = apiUrl + '/media/' + $scope.data.mediaId + '/';
        };

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            if (fileItem.alias === 'arDisplay') {
                $scope.view.arImageUploadComplete = true;
            }
            if (fileItem.alias === 'display') {
                $scope.view.imageUploadComplete = true;
            }
            if (fileItem.alias === 'display') {
                $scope.view.brandImageUploadComplete = true;
            }
        };

        uploader.onProgressItem = function (fileItem, progress) {
            if (fileItem.alias === 'arDisplay') {
                $scope.view.arImageUploadProgress = progress;
            }
            if (fileItem.alias === 'display') {
                $scope.view.imageUploadProgress = progress;
            }
            if (fileItem.alias === 'brandImage') {
                $scope.view.brandImageUploadProgress = progress;
            }
        };

        uploader.onCompleteAll = function () {
            $scope.view.mediaCreated = true;
        };

        $scope.showErrors = function () {
            return $scope.view.submitted;
        };

        $scope.videoHasError = function () {
            return _typeof($scope.data.videoFile) !== 'object';
        };

        $scope.imageHasError = function () {
            if (_typeof($scope.data.imageFile) !== 'object') {
                return true;
            } else {
                return false;
            }
        };

        $scope.viewMedia = function () {
            $scope.$hide();
            $state.go('media.view', {
                mediaId: $scope.data.mediaId
            });
        };

        $scope.editMedia = function (mediaId) {
            helper.alert('info', 'You are in edit mode!');
            $scope.editMode = true;
            helper.resetAngularFields($scope);
            $scope.previewMediaId = mediaId.id;
            mediaService.getMediaItem($scope.previewMediaId).then(function (response) {
                $scope.data.description = response.description;
                $scope.data.arImageFile = helper.getMediaPreviewFromUrl(response.ar_resource);
                $scope.data.arImageName = response.ar_name;
                $scope.appearance = response.ar_appearance;
                $scope.imageType = response.ar_resource_type;
                $scope.data.imageName = response.target_name;
                $scope.data.url = response.target_url;
                $scope.data.imageFile = response.target;
                $scope.data.brandImageFile = response.brand_image;
                $scope.selectedGender = response.gender;
                $scope.selectedCategory = response.category;
                $scope.data.animation = response.animation_type;
                $scope.selectedTvStation = response.tv_station;

                if (_.find($scope.tvStations, function (item) {
                    return item == $scope.selectedTvStation;
                })) {
                    $scope.isOther = false;
                } else {
                    $scope.isOther = true;
                    $scope.stationOther = $scope.selectedTvStation;
                    $scope.selectedTvStation = 'Other';
                }

                $scope.imageList = [];
                $scope.imageFileList = [];
                $scope.imageReviewIdx = 0;
                if ($scope.data.imageFile) {
                    setTimeout(function () {
                        var $review = angular.element('.uploader-dropzone.image-selected');
                        var imgStyle = $review.attr('style');
                        $scope.imageList.push(imgStyle);
                        $scope.imageFileList.push(imgStyle);
                        $scope.imageReviewIdx = 1;
                        var emptyImageStyle = 'background-image: none;border-color: #ccc;';
                        while ($scope.imageList.length < 4) {
                            $scope.imageList.push(emptyImageStyle);
                        }
                        if ($scope.imageList.length > 0) {
                            $scope.isAddImage = true;
                        }
                    }, 100);
                } else {
                    var emptyImageStyle = 'background-image: none;border-color: #ccc;';
                    while ($scope.imageList.length < 4) {
                        $scope.imageList.push(emptyImageStyle);
                    }
                }
            });
        };

        var saveMedia = function saveMedia() {

            var deferred = $q.defer();

            if ($scope.form1.$valid && $scope.data.arImageFile !== null) {
                $scope.validateError = false;
                $scope.isAddImage = false;

                var mediaData = {
                    description: $scope.data.description,
                    type: 'tv-ads',
                    ar_name: $scope.data.arImageName,
                    ar_appearance: $scope.appearance,
                    ar_resource_type: $scope.imageType,
                    target_name: $scope.data.imageName,
                    target_format: 'tv-ads'
                    // target_url: $scope.data.url,
                };

                if ($scope.selectedTvStation) {
                    if ($scope.selectedTvStation.toUpperCase() === 'OTHER') {
                        mediaData.tv_station = $scope.stationOther;
                        $scope.stationOther = '';
                    } else {
                        mediaData.tv_station = $scope.selectedTvStation;
                    }
                }

                if ($scope.data.url) {
                    mediaData.target_url = $scope.data.url;

                    if (mediaData.target_url.indexOf('http://') === -1) {
                        mediaData.target_url = 'http://' + mediaData.target_url;
                    }
                } else {
                    if (!$scope.data.url) {
                        mediaData.target_url = '';
                    }
                }

                if ($scope.editMode) {
                    mediaData.id = $scope.previewMediaId;
                }

                if ($scope.data.arImageFile !== null && _typeof($scope.data.arImageFile) === 'object') {
                    mediaData.ar_resource = $scope.data.arImageFile;
                }
                if ($scope.data.imageFile !== null && _typeof($scope.data.imageFile) === 'object') {
                    mediaData.target = $scope.data.imageFile;
                } else {
                    if (!$scope.data.imageFile) {
                        mediaData.target = '';
                    }
                }

                mediaService.saveKachingZoneMedia(mediaData).then(function (data) {
                    deferred.resolve(data);
                }, function (response) {
                    deferred.reject(response);
                });
            } else {
                $scope.validateError = true;
                editor.stepSet('step2', 'valid', false);
                setTimeout(function () {
                    $scope.scrollToFirstError();
                }, 100);
                deferred.reject();
            }
            return deferred.promise;
        };

        $scope.saveMedia = function () {
            var deferred = $q.defer();
            if ($scope.form1.$valid) {
                $scope.view.busy = true;
                saveMedia().then(function (data) {
                    $scope.form1.$setPristine();
                    if ($scope.editMode) {
                        $scope.editMode = false;
                        helper.alert('success', 'Media has been updated.');
                        $scope.view.busy = false;
                        $scope.clearForm();
                        $scope.loadSubmittedMedia();
                        deferred.resolve();
                    } else {
                        $scope.mediaList.push(data);
                        editor.dataSet('mediaList', $scope.mediaList);
                        $scope.getMedia(data.id).then(function () {
                            deferred.resolve();
                        }, function () {
                            deferred.reject();
                        });
                        $scope.clearForm();
                    }
                }, function (response) {
                    $scope.form1.$setPristine();
                    $scope.view.busy = false;
                    deferred.reject();
                });
            } else {
                $scope.scrollToFirstError();
                helper.alert('danger', 'Please, fill all required fields');
                deferred.reject();
            }
            return deferred.promise;
        };

        $scope.deleteMedia = function (mediaId) {
            $scope.previewMediaId = mediaId.id;
            campaignsService.deleteMedia($scope.previewMediaId).then(function (response) {
                console.log(response);
                helper.alert('success', 'Media has been deleted');
                $scope.loadSubmittedMedia();
            }, function (response) {
                console.log(response);
                helper.alert('danger', 'Media has not been deleted.');
            });
        };

        $scope.removeAddImageForm = function () {
            $scope.data.description = '';
            $scope.data.imageName = '';
            $scope.data.imageFile = '';
            $scope.data.url = '';
            $scope.selectedTvStation = $scope.tvStations[0];
            $scope.stationOther = '';

            helper.clearFileUploader('#imageFile');
            helper.clearFileUploader('.image-review-list');
            $scope.imageList = [];
            $scope.imageReviewIdx = 0;
            var imageStyle = 'background-image: none;border-color: #ccc;';
            $scope.imageList = [imageStyle, imageStyle, imageStyle, imageStyle];

            var mediaData = {
                description: '',
                target: '',
                target_name: '',
                target_format: '',
                target_url: '',
                tv_station: ''
            };

            $scope.isAddImage = false;
            $scope.isOther = false;
            $scope.form1.description.$pristine;
            $scope.form1.imageName.$pristine;
            $scope.form1.imageFile.$pristine;
            $scope.form1.url.$pristine;
        };

        $scope.clearForm = function () {
            helper.clearForm();

            $scope.data = {
                arImageFile: '',
                imageFile: '',
                mediaName: '',
                mediaId: '',
                imageName: '',
                arImageName: '',
                description: '',
                brandImageFile: '',
                brandDescription: '',
                animation: ''
            };

            helper.clearFileUploader('#imageFile');
            helper.clearFileUploader('#arImageFile');
            helper.clearFileUploader('.image-review-list');

            $scope.imageList = [];
            var emptyImageStyle = 'background-image: none;border-color: #ccc;';
            while ($scope.imageList.length < 4) {
                $scope.imageList.push(emptyImageStyle);
            }
            $scope.imageFileList = [];
            $scope.imageReviewIdx = 0;
        };

        $scope.cancelEdit = function () {
            $scope.clearForm();
            $scope.editMode = false;
            $scope.stationOther = '';
            $scope.isAddImage = false;
        };

        $scope.getMedia = function (mediaId) {
            var deferred = $q.defer();
            // $scope.view.busyMedia = true;
            $scope.view.busy = true;
            mediaService.getMediaItem(mediaId).then(function (mediaItem) {
                $scope.view.busy = false;
                $scope.media = mediaItem;
                editor.dataSet('media', $scope.media);

                editor.save('step2').then(function () {
                    $scope.campaignId = editor.dataGet('campaignId');
                    campaignsService.getCampaign($scope.campaignId);
                    // show notification
                    helper.alert('success', 'Media has been created.');
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }, function () {
                // $scope.view.busyMedia = false;
                $scope.view.busy = false;
                deferred.reject();
            });
            return deferred.promise;
        };
        $scope.getFormats = function () {
            $scope.formats = ['Commercial'];
        };

        $scope.getFormats();

        $scope.loadSubmittedMedia = function () {
            if (editor.dataGet().campaignId !== undefined) {
                campaignsService.getCampaign(editor.dataGet().campaignId).then(function (response) {
                    $scope.mediaList = response.media;
                });
            }
        };

        $scope.finish = function () {

            var deferred = $q.defer();

            var campaignStatus = editor.dataGet('campaignStatus');
            var campaign = editor.dataGet('campaign');

            if (campaignStatus === 'start' && !campaign.status || $scope.editId) {
                $scope.activeCampaign().then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        };

        $scope.scrollToFirstError = function () {
            var elementName = $scope.form1.$error.required[0].$name;
            var firstErrorId = document.getElementsByName(elementName)[0].id;
            $location.hash(firstErrorId);
            $anchorScroll();
        };

        $scope.needBasicValidateZone = function () {
            if ($scope.data.imageName || $scope.data.imageFile) {
                return true;
            } else {
                return false;
            }
        };

        $scope.init = function () {
            $scope.editMode = false;
            $scope.isAddImage = false;
            $scope.loadSubmittedMedia();
            var targetingData = editor.dataGet('targeting');
            $scope.view.busy = false;
        };

        function checkMediaValidation() {
            if ($scope.data.arImageName === '') {
                helper.alert('danger', 'Please, fill all required fields');
                return false;
            }
            return true;
        }
        function checkCampaignValidation() {
            if ($scope.mediaList.length !== 0) {
                return true;
            }
            helper.alert('danger', 'Please, submit at least one media');
            return false;
        }

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.nextStep();
            }
        });

        $scope.init();
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').controller('tvStep3Ctrl', ['$scope', 'productsService', 'kachingZonecampaignEditorService', 'campaignsService', 'mediaService', 'utils', 'FileUploader', 'apiUrl', 'authToken', '$http', '$q', 'errorHandler', 'kachingZonesHelpers', function ($scope, productsService, kachingZonecampaignEditorService, campaignsService, mediaService, utils, FileUploader, apiUrl, authToken, $http, $q, errorHandler, kachingZonesHelpers) {
        var helper = kachingZonesHelpers;
        var editor = kachingZonecampaignEditorService;

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + '/products/',
            method: 'PATCH',
            headers: {
                'Authorization': 'Token ' + authToken.get()
            }
        });

        $scope.view = {
            busy: true,
            productImageUploadStarted: false,
            productImageUploadProgress: 0,
            productImageUploadComplete: false
        };

        uploader.onAfterAddingFile = function (newItem) {
            utils.cleanupUploaderQueue(uploader);
            $scope.data.productImageFile = newItem._file;
        };

        uploader.onBeforeUploadItem = function (item) {
            $scope.view.productImageUploadStarted = true;
            item.url = apiUrl + '/media/' + $scope.data.mediaId + '/';
        };

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.view.productImageUploadComplete = true;
        };

        uploader.onProgressItem = function (fileItem, progress) {
            $scope.view.productImageUploadProgress = progress;
        };

        uploader.onCompleteAll = function () {
            $scope.view.mediaCreated = true;
        };

        $scope.data = {
            'title': '',
            'description': '',
            'pirce': '',
            'url': ''
        };

        $scope.previewData = {
            isInstore: false,
            followIBeacon: { enabled: false },
            scanReceipt: { enabled: false },
            issueQR: { enabled: false },
            buyProducts: { enabled: false },
            sendInformation: { enabled: false },
            register: { enabled: false },
            share: { enabled: false },
            openMicrophone: { enabled: false },
            watchVideo: { enabled: false }
        };

        $scope.recommendedProducts = [];
        $scope.carouselOptions = {
            nav: true,
            dots: false,
            navText: ['<span class="glyphicon glyphicon-triangle-left"></span>', '<span class="glyphicon glyphicon-triangle-right"></span>'],
            navRewind: false,
            loop: false,
            items: 4
        };
        $scope.products = editor.dataGet('products');

        var myArr = [{
            type: 'type',
            perDollarPerClick: 3
        }, {
            type: 'another type',
            perDollarPerClick: 2
        }];
        $scope.purchaseAds = myArr;
        $scope.increaseAmount = function (media) {
            media.bets_per_view = 1 * media.bets_per_view + 1;
            $scope.grandTotal = 0;
            angular.forEach($scope.medias, function (value, key) {
                $scope.grandTotal += 1 * value.bets_per_view;
            });
        };

        $scope.decreaseAmount = function (media) {
            if (media.bets_per_view > 1) {
                media.bets_per_view = 1 * media.bets_per_view - 1;
                $scope.grandTotal = 0;
                angular.forEach($scope.medias, function (value, key) {
                    $scope.grandTotal += 1 * value.bets_per_view;
                });
            }
        };

        $scope.updateAmount = function (media) {
            $scope.grandTotal = 0;
            angular.forEach($scope.medias, function (value, key) {
                $scope.grandTotal += 1 * value.bets_per_view;
            });
        };

        $scope.fieldHasError = utils.fieldHasError;
        $scope.showErrors = function () {
            return editor.stepGet('step3', 'submitted');
        };

        $scope.nextStep = function () {
            editor.stepSet('step3', 'submitted', true);
            if ($scope.form1.$valid) {
                $scope.view.busy = true;
                editor.stepSet('step3', 'valid', true);
                $scope.updateAllMedia($scope.medias).then(function () {
                    $scope.goNext();
                    helper.alert('success', 'All media has been updated');
                    $scope.view.busy = false;
                    $scope.activeCampaign();
                }, function (response) {
                    $scope.view.busy = false;
                    errorHandler.processApiResponse(response);
                });
            }
        };

        $scope.selectRecommendedProduct = function (product) {
            $scope.editMode = true;
            $scope.data.productIdInEdit = product.id;
            $scope.data.title = product.title;
            $scope.data.description = product.description;
            $scope.data.price = product.price;
            $scope.data.url = product.url;
            $scope.data.productImageFile = product.image;
            helper.alert('info', 'Product in edit mode!');
        };

        $scope.updateAllMedia = function (medias) {
            var deferred = $q.defer();
            var promisses = [];

            angular.forEach(medias, function (media) {
                var prodDeferred = $q.defer();
                promisses.push(prodDeferred.promise);
                var mediaData = {
                    id: media.id,
                    bets_per_view: media.bets_per_view,
                    type: 'tv-ads'
                };
                campaignsService.updateMedia(mediaData).then(function (response) {
                    prodDeferred.resolve(response);
                }, function (response) {
                    prodDeferred.reject(response);
                });

                // Update Media
                var rewardDeferred = $q.defer();
                promisses.push(rewardDeferred.promise);
                var rewardData = {
                    send_information: media.reward.send_information,
                    share: media.reward.share,
                    product: media.reward.product
                };
                mediaService.updateReward(media.id, rewardData).then(function (response) {
                    rewardDeferred.resolve(response);
                }, function (response) {
                    rewardDeferred.reject(response);
                });

                // Update Register
                var registerDeferred = $q.defer();
                promisses.push(registerDeferred.promise);
                var campaign = {
                    id: $scope.campaignId,
                    register: $scope.campaign.register
                };
                campaignsService.saveKachingZoneCampagin(campaign).then(function (response) {
                    registerDeferred.resolve(response);
                }, function (response) {
                    registerDeferred.reject(response);
                });
            });
            $q.all(promisses).then(function () {
                deferred.resolve();
            });
            return deferred.promise;
        };

        $scope.saveProduct = function () {
            if ($scope.data.url.match(/^http[s]?:\/\//i) === null) {
                $scope.data.url = 'http://' + $scope.data.url;
            }
            var productData = {
                title: $scope.data.title,
                description: $scope.data.description,
                price: $scope.data.price,
                url: $scope.data.url,
                image: $scope.data.productImageFile
            };

            var deferred = $q.defer();
            productsService.createProduct(productData).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
                errorHandler.processApiResponse(response);
            });

            return deferred.promise;
        };

        $scope.updateProduct = function (productId) {
            if ($scope.data.url.match(/^http[s]?:\/\//i) === null) {
                $scope.data.url = 'http://' + $scope.data.url;
            }
            var productData = {
                id: productId,
                title: $scope.data.title,
                description: $scope.data.description,
                price: $scope.data.price,
                url: $scope.data.url
            };
            if (_typeof($scope.data.productImageFile) === 'object' && $scope.data.productImageFile != null) {
                productData.image = $scope.data.productImageFile;
            }
            var deferred = $q.defer();
            productsService.createProduct(productData).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
                errorHandler.processApiResponse(response);
            });
            return deferred.promise;
        };

        $scope.submitProduct = function () {
            if ($scope.editMode) {
                $scope.updateProduct($scope.data.productIdInEdit).then(function (response) {
                    helper.alert('success', 'Product have been updated');
                    $scope.loadSubmittedProducts();
                    $scope.editMode = false;
                }, function (error) {
                    errorHandler.processApiResponse(error);
                    $scope.editMode = false;
                });
            } else {
                $scope.view.busy = true;
                $scope.saveProduct().then(function (response) {
                    console.log(response);
                    productsService.getProduct(response.id).then(function (product) {
                        $scope.recommendedProducts.push(product);
                        campaignsService.saveProducts($scope.campaignId, $scope.recommendedProducts).then(function (reponse) {
                            $scope.view.busy = false;
                            helper.alert('success', 'Product have been added');
                        }, function (error) {
                            errorHandler.processApiResponse(error);
                        });
                    }, function (error) {
                        errorHandler.processApiResponse(error);
                    });
                }, function (error) {
                    console.log(error);
                    $scope.view.busy = false;
                });
            }
        };

        $scope.loadSubmittedProducts = function () {
            if (editor.dataGet().campaignId !== undefined) {
                campaignsService.getCampaign(editor.dataGet().campaignId).then(function (response) {
                    $scope.recommendedProducts = response.products;
                });
            }
        };

        var init = function init() {
            $scope.loadSubmittedProducts();
            utils.addUploaderTypeFilter(uploader, 'image', {
                imageFilter: ['image/png', 'image/jpg', 'image/jpeg']
            });
            $scope.campaignId = editor.dataGet('campaignId');
            $scope.grandTotal = 0;
            campaignsService.getCampaign($scope.campaignId).then(function (campaign) {
                $scope.campaign = campaign;

                if (!$scope.campaign.register) {
                    $scope.campaign.register = 0;
                }

                if (campaign.media.length > 0) {
                    $scope.medias = campaign.media;
                    angular.forEach($scope.medias, function (value, key) {
                        $scope.grandTotal += 1 * value.bets_per_view;
                        if (!value.reward) {
                            value.reward = {
                                send_information: 0,
                                share: 0,
                                product: 0
                            };
                        }
                    });
                }
                $scope.view.busy = false;
            }, function (response) {
                errorHandler.processApiResponse(response);
                $scope.view.busy = false;
                errorHandler.processApiResponse(response);
            });
        };

        init();

        $scope.$watchCollection('medias', function (newVal, oldVal) {});

        $scope.$on('fund-broadcast', function () {
            if ($scope.editId) {
                $scope.saveProduct();
                $scope.nextStep();
            }
        });
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('tvStep4Ctrl', ['$scope', 'productsService', 'campaignsService', 'campaignEditorService', 'kachingZonecampaignEditorService', '$q', 'errorHandler', function ($scope, productsService, campaignsService, campaignEditorService, kachingZonecampaignEditorService, $q, errorHandler) {
        var editor = kachingZonecampaignEditorService;
        $scope.view = {
            busy: true
        };

        $scope.locations = {};
        $scope.categories = {};

        $scope.loadSubmittedProducts = function () {
            if (editor.dataGet().campaignId !== undefined) {
                campaignsService.getCampaign(editor.dataGet().campaignId).then(function (response) {
                    $scope.recommendedProducts = response.products;
                });
            }
        };

        var initCampaign = function initCampaign() {
            var deferred = $q.defer();
            var mediaListData = editor.dataGet('mediaList');
            if (!_.isEmpty(mediaListData)) {
                $scope.mediaList = mediaListData;
                $scope.campaignId = editor.dataGet('campaignId');
                $scope.media = editor.dataGet('media');
                campaignsService.getCampaign($scope.campaignId).then(function (response) {
                    $scope.campaign = response;
                });
                deferred.resolve();
            } else {
                campaignsService.getCampaign($scope.editId).then(function (data) {
                    $scope.mediaList = data.media;
                    $scope.campaign = data;
                    angular.forEach($scope.mediaList, function (value, key) {
                        $scope.grandTotal += 1 * value.bets_per_view;
                    });
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };

        var initTargetings = function initTargetings() {
            var deferred = $q.defer();
            var targetingData = editor.dataGet('targeting');
            if (!_.isEmpty(targetingData)) {
                $scope.targeting = targetingData;
                var arrLocations = [],
                    arrCategories = [];
                // Get a location have selected true
                angular.forEach($scope.targeting.locations, function (item, id) {
                    if (item.selected === true) {
                        arrLocations.push(item);
                    }
                });
                // Get a category have selected true
                angular.forEach($scope.targeting.categories, function (item, id) {
                    if (item.selected === true) {
                        arrCategories.push(item);
                    }
                });
                $scope.locations = arrLocations;
                $scope.categories = arrCategories;
                deferred.resolve();
            } else {
                // $scope.view.busy = true;
                var id = $scope.editId || undefined;
                campaignsService.getTargeting(id).then(function (response) {
                    $scope.targeting = response;
                    var arrLocations = [],
                        arrCategories = [];
                    // Get a location have selected true
                    angular.forEach($scope.targeting.locations, function (item, id) {
                        if (item.selected === true) {
                            arrLocations.push(item);
                        }
                    });
                    // Get a category have selected true
                    angular.forEach($scope.targeting.categories, function (item, id) {
                        if (item.selected === true) {
                            arrCategories.push(item);
                        }
                    });
                    $scope.locations = arrLocations;
                    $scope.categories = arrCategories;
                    deferred.resolve();
                }, function (response) {
                    errorHandler.processApiResponse(response);
                    deferred.reject();
                });
            }
            return deferred.promise;
        };

        var initData = function initData() {
            var deferred = $q.defer();
            var deferred1 = $q.defer();
            var deferred2 = $q.defer();

            var promisses = [deferred1.promise, deferred2.promise];

            initCampaign().then(function () {
                deferred1.resolve();
            }, function () {
                deferred1.reject();
            });

            initTargetings().then(function () {
                deferred2.resolve();
            }, function () {
                deferred2.reject();
            });

            $q.all(promisses).then(function () {
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var init = function init() {
            $scope.view.busy = true;

            if (!$scope.editId) {
                if (!editor.stepGet('step1', 'valid') || !editor.stepGet('step2', 'valid') || !editor.stepGet('step3', 'valid')) {
                    $scope.updateStep(editor.currentStep());
                }
            }

            editor.currentStep(4);
            editor.previousState(4);

            $scope.loadSubmittedProducts();
            $scope.mediaList = [];
            $scope.grandTotal = 0;

            initData().then(function () {
                $scope.view.busy = false;
            }, function () {
                $scope.view.busy = false;
            });
        };

        init();
    }]);
})();

// (function() {
//     'use strict';
//
//     angular.module('panelApp')
//         .controller('tvStep4Ctrl', [
//             '$scope',
//             'productsService',
//             'campaignsService',
//             'campaignEditorService',
//             function(
//                 $scope,
//                 productsService,
//                 campaignsService,
//                 campaignEditorService
//             ) {
//                 var editor = campaignEditorService;
//                 $scope.view = {
//                     busy: true
//                 };
//                 $scope.loadSubmittedProducts = function() {
//                     if (editor.dataGet().campaignId !== undefined) {
//                         campaignsService.getCampaign(editor.dataGet().campaignId).then(function(response) {
//                             $scope.recommendedProducts = response.products;
//                         });
//                     }
//                 };
//                 var init = function() {
//                     var editor = campaignEditorService;
//                     $scope.campaignId = editor.dataGet('campaignId');
//                     $scope.media = editor.dataGet('media');
//                     campaignsService.getCampaign($scope.campaignId).then(function(response) {
//                         $scope.dataFromApi = response;
//                     });
//                     $scope.loadSubmittedProducts();
//                     $scope.view.busy = false;
//
//                     $scope.mediaList = [];
//                     if ($scope.editId) {
//                         // $scope.initEditMode($scope.editId);
//                         campaignsService.getCampaign( $scope.editId ).then(
//                             function(data){
//                                 // $scope.campaign
//                                 $scope.mediaList = data.media;
//                                 angular.forEach($scope.mediaList, function (value, key) {
//                                     $scope.grandTotal += 1*value.bets_per_view;
//                                 });
//                             },
//                             function(){
//                             }
//                         );
//                     } else {
//                         var mediaListData = editor.dataGet('mediaList');
//                         if (  ! _.isEmpty( mediaListData ) ) {
//
//                             $scope.mediaList = mediaListData;
//
//                         }
//                     }
//                 };
//
//                 init();
//             }
//         ]);
// })();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('mediaPreview', ['$modal', function ($modal) {
        return {
            restrict: 'E',
            scope: {
                mediaList: '=mediaList',
                itemEdit: '&',
                itemDelete: '&',
                showEdit: '=showEdit',
                showDelete: '=showDelete',
                viewMedia: '=viewMedia',
                review: '=',
                viewTab: '=',
                selectedMedia: '=',
                hasAr: '='
            },
            templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/directives/mediaPreview/media-preview.tmpl.html',
            link: function link(scope, ele, attrs) {
                ele.on('click', '.glyphicon', function (event) {
                    var $mediaItem = angular.element(this).closest('li.media-preview');
                    var $expandedItem = $mediaItem.find('.media-preview-expanded');

                    $mediaItem.toggleClass('actived');
                    $mediaItem.find('.glyphicon').toggleClass('glyphicon-menu-down').toggleClass('glyphicon-menu-right');
                    $expandedItem.slideToggle();

                    var $others = angular.element('li.media-preview').not($mediaItem);
                    $others.find('.glyphicon').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-right');
                    $others.find('.media-preview-expanded').slideUp();
                    $others.removeClass('actived');
                });
                // scope.delete = function(mediaId) {
                //     scope.itemDelete({mediaId: mediaId});
                // };
                scope.edit = function (mediaId) {
                    scope.itemEdit({ mediaId: mediaId });
                };
                scope.filter = function (item) {
                    var type = 'all';
                    if (scope.tab === 'video') {
                        type = 'video';
                    } else if (scope.tab === 'image') {
                        type = 'image';
                    } else {
                        return true;
                    }
                    return item.ar_resource_type === type ? true : false;
                };
            },
            controller: function controller($scope) {
                $scope.previewMedia = function (event, media) {
                    media.selected = false;
                    if (event.target.tagName === 'SPAN') {
                        return false;
                    }
                    if (!$scope.selectedMedia) {
                        $scope.selectedMedia = media;
                        media.selected = true;
                    } else {
                        if ($scope.selectedMedia.id !== media.id) {
                            if ($scope.selectedMedia.id) {
                                $scope.selectedMedia.selected = false;
                            }
                            $scope.selectedMedia = media;
                            media.selected = true;
                        } else {
                            media.selected = false;
                            $scope.selectedMedia = null;
                        }
                    }
                };

                $scope.showDeleteMediaDialog = function (_media) {
                    var options = {
                        delete: function _delete(media) {
                            $scope.itemDelete({ media: media });
                        }
                    };
                    $modal({
                        templateUrl: templateDirUri + '/assets/kaching/panel-module/components/mediaDeleteModal/modalTmpl.html',
                        controller: 'mediaDeleteModalCtrl',
                        animation: 'am-fade-and-scale',
                        placement: 'center',
                        resolve: {
                            modalOptions: function modalOptions() {
                                return options;
                            },
                            media: function media() {
                                return _media;
                            }
                        }
                    });
                };
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').factory('countryService', ['$q', '$http', function ($q, $http) {
        return {
            getCities: getCities,
            getDistricts: getDistricts
        };
        function getCities(countryCode, city) {
            var url = 'http://api.geonames.org/searchJSON?country=' + countryCode + '&fcode=PPLA&fcode=PPLC&username=ulabvn';

            if (!!city) {
                url += '&q=' + city;
            }

            console.log(url);

            return makeRequest('GET', url);
        }

        function getDistricts(countryCode, city) {
            var url = 'http://api.geonames.org/searchJSON?country=' + countryCode + '&q=' + city + '&fcode=PPLA2&fcode=PPLC&username=ulabvn';
            if (!!city) {
                url += '&q=' + city;
            }

            console.log(url);

            return makeRequest('GET', url);
        }

        function makeRequest(method, url) {

            var deferred = $q.defer();

            var request = {
                method: method,
                url: url
            };

            $http(request).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('balanceInput', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                balance: '@'
            },
            link: function link(scope, elem, attr, ngModel) {
                //For DOM -> model validation
                ngModel.$parsers.unshift(function (value) {
                    var spentCoins = attr.spentCoins || 1;
                    var valid = 1 * value >= 1 * spentCoins && 1 * value <= 1 * attr.balance;
                    ngModel.$setValidity('balanceInput', valid);
                    return value;
                });

                //For model -> DOM validation
                ngModel.$formatters.unshift(function (value) {
                    return value;
                });
            }
        };
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('instoreMediaPreview', ['$modal', function ($modal) {
        return {
            restrict: 'E',
            scope: {
                storeList: '=storeList',
                itemEdit: '&',
                itemDelete: '&',
                showEdit: '=showEdit',
                showDelete: '=showDelete',
                viewMedia: '=viewMedia',
                review: '=',
                viewTab: '=',
                selectedMedia: '='
            },
            templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/directives/instoreMediaPreview/instore-media-preview.tmpl.html',
            link: function link(scope, ele, attrs) {
                ele.on('click', '.glyphicon', function () {

                    var $mediaItem = angular.element(this).closest('li.media-preview');
                    var $expandedItem = $mediaItem.find('.media-preview-expanded');

                    $mediaItem.toggleClass('actived');
                    $mediaItem.find('.glyphicon').toggleClass('glyphicon-menu-down').toggleClass('glyphicon-menu-right');
                    $expandedItem.slideToggle();

                    var $others = angular.element('li.media-preview').not($mediaItem);
                    $others.find('.glyphicon').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-right');
                    $others.find('.media-preview-expanded').slideUp();
                    $others.removeClass('actived');
                });
                // scope.delete = function(mediaId) {
                //     scope.itemDelete({mediaId: mediaId});
                // };
                scope.edit = function (mediaId) {
                    scope.itemEdit({ mediaId: mediaId });
                };
                scope.filter = function (item) {
                    var type = 'all';
                    if (scope.tab === 'video') {
                        type = 'video';
                    } else if (scope.tab === 'image') {
                        type = 'image';
                    } else {
                        return true;
                    }
                    return item.ar_resource_type === type ? true : false;
                };

                scope.storeFilter = function (item) {
                    if (scope.tab === 'video') {
                        return item.hasVideo;
                    } else if (scope.tab === 'image') {
                        return item.hasImage;
                    } else {
                        return true;
                    }
                };

                // if(!scope.review) {
                //     scope.review = false;
                // }
            },
            controller: function controller($scope) {
                $scope.previewMedia = function (event, media) {
                    media.selected = false;
                    if (event.target.tagName === 'SPAN') {
                        return false;
                    }
                    if (!$scope.selectedMedia) {
                        $scope.selectedMedia = media;
                        media.selected = true;
                    } else {
                        if ($scope.selectedMedia.id !== media.id) {
                            if ($scope.selectedMedia.id) {
                                $scope.selectedMedia.selected = false;
                            }
                            $scope.selectedMedia = media;
                            media.selected = true;
                        } else {
                            media.selected = false;
                            $scope.selectedMedia = null;
                        }
                    }
                };

                $scope.showDeleteMediaDialog = function (_media) {
                    var options = {
                        delete: function _delete(media) {
                            $scope.itemDelete({ media: media });
                        }
                    };
                    $modal({
                        templateUrl: templateDirUri + '/assets/kaching/panel-module/components/mediaDeleteModal/modalTmpl.html',
                        controller: 'mediaDeleteModalCtrl',
                        animation: 'am-fade-and-scale',
                        placement: 'center',
                        resolve: {
                            modalOptions: function modalOptions() {
                                return options;
                            },
                            media: function media() {
                                return _media;
                            }
                        }
                    });
                };
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').filter('lotteryFilter', ['$window', function ($window) {
        return function (items, from, to, winnerName) {
            var fromDate = new Date(from).getTime();
            var toDate = new Date(to).getTime();
            var dataFilterDate = from && to ? items.filter(function (item) {
                var itemTime = new Date(item.date.split(' ')[0]).getTime();
                return itemTime >= fromDate && itemTime <= toDate;
            }) : items;

            var dataFilterWinner = winnerName ? dataFilterDate.filter(function (item) {
                return item.winner.toLowerCase().indexOf(winnerName.toLowerCase()) > -1 ? true : false;
            }) : dataFilterDate;

            var filteredData = dataFilterWinner;
            return filteredData;
        };
    }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    angular.module('panelApp').factory('lotteryService', ['$q', 'apiService', function ($q, apiService) {

        return {
            getLotteryList: getLotteryList
        };

        function getLotteryList(params) {

            var deferred = $q.defer();

            var requestParams = {
                page_size: 10,
                page: 1
            };

            if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                if ('page_size' in params) {
                    requestParams.page_size = params.page_size;
                }
                if ('page' in params) {
                    requestParams.page = params.page;
                }
            }

            apiService.get('/draws/', requestParams, true).then(function (response) {
                deferred.resolve({
                    count: response.count,
                    items: response.results,
                    next: response.next,
                    previous: response.previous
                });
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('lotteryCtrl', ['$scope', '$state', '$q', 'lotteryService', function ($scope, $state, $q, lotteryService) {
        var itemsPerPage = 8;

        $scope.view = {
            itemsPerPage: itemsPerPage,
            currentPage: 1,
            maxSize: 10
        };

        $scope.data = {
            lotteryListsCount: 0,
            lotteryLists: []
        };

        $scope.changePage = function () {
            getLotteryList();
        };

        var getLotteryList = function getLotteryList(all) {

            var params = {
                page_size: itemsPerPage,
                page: $scope.view.currentPage
            };

            lotteryService.getLotteryList({ page: 1, page_size: 9999999 }).then(function (data) {
                // List for CSV
                $scope.lotteryList = [];
                // End list for CSV
                $scope.data.lotteryLists = [];
                $scope.view.busy = false;
                var data = _.filter(data.items, function (item) {
                    return item.participant_draws.length > 0;
                });

                angular.forEach(data, function (item, key) {

                    var dataItem = {
                        date: item.winsel_date === null ? '-' : moment(item.winsel_date).format('MM-DD-YYYY hh:mm')
                    };

                    angular.forEach(item.participant_draws, function (subItem, subKey) {
                        dataItem.photo = subItem.participant.avatar, dataItem.winner = subItem.participant.name, dataItem.dollars = subItem.winning_amount ? '$ ' + subItem.winning_amount : '-';
                    });

                    $scope.data.lotteryLists.push(dataItem);
                    $scope.lotteryList.push({
                        photo: dataItem.photo,
                        winner: dataItem.winner,
                        date: dataItem.date,
                        dollars: dataItem.dollars
                    });
                });
            }, function (response) {
                $scope.view.busy = false;
            });
        };

        // Filter Zone
        $scope.daterange = {
            dates: {
                startDate: null,
                endDate: null
            },
            min: moment().format('MM-DD-YYYY'),
            display: 'Select date range'
        };
        $scope.$watch(function () {
            return $scope.daterange.dates;
        }, function (newValue, oldValue) {
            if (newValue === undefined || newValue.startDate === null || newValue.endDate === null) {
                return;
            }
            $scope.daterange.display = newValue.startDate.format('MM-DD-YYYY') + ' - ' + newValue.endDate.format('MM-DD-YYYY');
        });

        var init = function init() {
            getLotteryList();
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').controller('coinMappingCtrl', ['$scope', '$state', '$q', 'coinMappingService', 'kachingZonesHelpers', function ($scope, $state, $q, coinMappingService, kachingZonesHelpers) {

        var helper = kachingZonesHelpers;
        var itemsPerPage = 8;
        var maxSize = 10;

        $scope.view = {
            itemsPerPage: itemsPerPage,
            maxSize: maxSize,
            currentPage: 1
        };

        $scope.data = {
            coinMappingListCount: 0,
            coinMappingList: []
        };

        $scope.changePage = function () {
            getCoinMappingList();
        };

        $scope.changeRate = function (item) {
            if (!item.rate) {
                item.hasChanged = false;
                return;
            }
            if (item.rate != item.oldRate) {
                item.hasChanged = true;
            } else {
                item.hasChanged = false;
            }
            // item.oldRate = item.rate;
        };

        $scope.checkRate = function (item) {
            if (!item.rate) {
                item.rate = item.oldRate;
            }
        };

        $scope.updateRate = function (item) {
            coinMappingService.updateRateExchange(item).then(function (response) {
                helper.alert('success', 'Coin mapping has been updated successfully.');
                item.oldRate = response.rate_exchange;
                item.hasChanged = false;
                $scope.$apply();
            }, function (response) {
                helper.alert('danger', 'Cannot update coin mapping now. Please try later.');
            });
        };

        var getCoinMappingList = function getCoinMappingList() {

            coinMappingService.getCountries().then(function (data) {
                $scope.data.coinMappingListCount = data.count;
                $scope.data.coinMappingList = [];
                $scope.view.busy = false;
                angular.forEach(data.items, function (value, key) {
                    var dataItem = {
                        id: value.id,
                        country: value.short_name,
                        rate: value.rate_exchange,
                        oldRate: value.rate_exchange,
                        hasChanged: false
                    };
                    $scope.data.coinMappingList.push(dataItem);
                });
            }, function (response) {
                $scope.view.busy = false;
                deferred.reject();
            });
        };

        var init = function init() {
            getCoinMappingList();
        };

        init();
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').factory('coinMappingService', ['$q', 'apiService', function ($q, apiService) {

        return {
            getCountries: getCountries,
            updateRateExchange: updateRateExchange
        };

        function getCountries(params) {

            var deferred = $q.defer();

            apiService.get('/countries/', null, true).then(function (response) {
                deferred.resolve({
                    count: response.length,
                    items: response
                });
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        function updateRateExchange(item) {

            var deferred = $q.defer();

            var data = { rate_exchange: item.rate };

            // http://{{domain}}/cms-api/countries/41/changeRateExchange/

            apiService.put('/countries/' + item.id + '/changeRateExchange/', data, true).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').filter('coinMappingFilter', ['$window', function ($window) {
        return function (items, country) {

            if (country) {
                var data = items.filter(function (item) {
                    return item.country.toLowerCase().indexOf(country.toLowerCase()) > -1 ? true : false;
                });

                return data;
            } else {
                return items;
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('btnClearUploadFile', ['kachingZonesHelpers', function (kachingZonesHelpers) {
        return {
            restrict: 'EA',
            scope: {
                currentFile: '=',
                imageName: '='
            },
            templateUrl: kachingAppConfig.wpTemplateUri + '/assets/kaching/directives/btnClearUploadFile/btnClearUploadFileTmpl.html',
            link: function link(scope, ele, attrs) {
                scope.$watch('currentFile', function (newValue, preValue) {
                    scope.hasFile = scope.currentFile ? true : false;
                });

                scope.clearCurrentFile = function () {
                    kachingZonesHelpers.clearFileUploader('#' + scope.imageName);
                    scope.currentFile ? scope.currentFile = null : scope.currentFile = scope.currentFile;
                };
            }
        };
    }]);
})();
'use strict';

(function () {
    'use strict';

    angular.module('panelApp').directive('validNumber', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function link(scope, element, attrs, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }

                ngModelCtrl.$parsers.push(function (val) {
                    if (angular.isUndefined(val)) {
                        var val = '';
                    }

                    var clean = val.replace(/[^-0-9\.]/g, '');
                    var negativeCheck = clean.split('-');
                    var decimalCheck = clean.split('.');
                    if (!angular.isUndefined(negativeCheck[1])) {
                        negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                        clean = negativeCheck[0] + '-' + negativeCheck[1];
                        if (negativeCheck[0].length > 0) {
                            clean = negativeCheck[0];
                        }
                    }

                    if (!angular.isUndefined(decimalCheck[1])) {
                        decimalCheck[1] = decimalCheck[1].slice(0, 2);
                        clean = decimalCheck[0] + '.' + decimalCheck[1];
                    }

                    if (val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                element.bind('keypress', function (event) {
                    if (event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        };
    });
})();
//# sourceMappingURL=panelApp.js.map
