(function() {
    'use strict';

    angular.module('panelApp')
        .controller('step2Ctrl', [
            '$scope',
            '$state',
            'apiUrl',
            'authToken',
            'utils',
            'mediaService',
            'FileUploader',
            'countryService',
            'campaignEditorService',
            'campaignsService',
            '$http',
            '$q',
            'errorHandler',
            '$anchorScroll',
            '$location',
            'kachingZonesHelpers',
            'kachingZonecampaignEditorService',
            function(
                $scope,
                $state,
                apiUrl,
                authToken,
                utils,
                mediaService,
                FileUploader,
                countryService,
                campaignEditorService,
                campaignsService,
                $http,
                $q,
                errorHandler,
                $anchorScroll,
                $location,
                kachingZonesHelpers,
                kachingZonecampaignEditorService
            ) {
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
                var geocodePosition = function(marker) {
                    marker.icon.url = $scope.updateLogoIcon();
                    $scope.position = marker.getPosition();
                    $scope.$apply();
                    $scope.geocoder.geocode({
                        latLng: $scope.position
                    }, function(responses) {
                        if (responses && responses.length > 0) {
                            $scope.address = responses[0].formatted_address;
                        } else {
                            $scope.address = 'Cannot determine address at this location.';
                        }
                        var dumpImage = '/wp-content/themes/kaching3/assets/images/billboards/media-thumb.png';
                        var dumpLogo = '/wp-content/themes/kaching3/assets/images/logo.png';
                        var mapPopup =
                            `<div class='popup'>
                            <img class="popup-logo" src="${dumpLogo}">
                            <label class="popup-name">${$scope.campaign.name}</label>
                            <h6 class="popup-address">${responses[0].formatted_address}</h6>
                        </div>`;

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

                $scope.magezines = ['Tatler','GQ','Time','The Economist','Cosmopolitan','National Geographic','Sports Illustrated','Glamour','Other'];

                // Check other values of selected
                $scope.changeSelect = function() {
                    if ($scope.selectedMagezine.toUpperCase() === 'OTHER') {
                        if (!$scope.magazineOther) {
                            $scope.magazineOther = '';
                        }
                        $scope.isOther = true;
                    } else {
                        $scope.isOther = false;
                    }
                }

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
                },
                {
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
                $scope.changeStation = function() {
                    if ($scope.selectedStation.name.toUpperCase() === 'OTHER') {
                        if (!$scope.stationOther) {
                            $scope.stationOther = '';
                        }
                        $scope.isOther = true;
                    } else {
                        $scope.isOther = false;
                    }
                }

                var mapOptions = {
                    zoom: 4,
                    center: new google.maps.LatLng(40.0000, -98.0000),
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                };

                var placeMarker = function(location, keepAddress) {
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
                    }, function(responses) {
                        var address = 'Cannot determine address at this location.';
                        if (!keepAddress) {
                            if (responses && responses.length > 0) {
                                $scope.address = address = responses[0].formatted_address;
                                if (!$scope.previewMediaId) {
                                    $scope.data.display_address = '';
                                    if (!$scope.data.display_address ) {
                                        $scope.data.display_address = responses[0].formatted_address;
                                    }
                                } else {
                                    if (!$scope.data.display_address ) {
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
                        var mapPopup =
                            `<div class='popup'>
                            <img class="popup-logo" src="${dumpLogo}">
                            <label class="popup-name">${$scope.campaign.name}</label>
                            <h6 class="popup-address">${address}</h6>
                        </div>`;

                        $scope.infoWindow.setContent(mapPopup);
                        $scope.infoWindow.open($scope.map, marker);
                        $scope.map.setZoom(16);
                        $scope.map.setCenter($scope.selectedMarker.getPosition());
                    });

                    google.maps.event.addListener(marker, 'dragend', function(event) {
                        $scope.position = event.latLng;
                        $scope.latitude = $scope.position.lat();
                        $scope.longitude = $scope.position.lng();
                        $scope.searchBoxMarker.forEach(function(marker) {
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
                $scope.updateLogoIcon = function(useDefault) {
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
                google.maps.event.addListenerOnce($scope.map, 'mouseover', () => {
                    // This method is a trick to re-render map for the first time map renders.
                    google.maps.event.trigger($scope.map, 'resize');
                });
                google.maps.event.addListenerOnce($scope.map, 'idle', () => {
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
                $scope.map.addListener('bounds_changed', function() {
                    searchBox.setBounds($scope.map.getBounds());
                });

                $scope.searchBoxMarker = [];
                // Listen for the event fired when the user selects a prediction and retrieve
                // more details for that place.
                searchBox.addListener('places_changed', function() {
                    $scope.updateLogoIcon();
                    var places = searchBox.getPlaces();

                    if (places.length === 0) {
                        return;
                    }
                    // Clear out the old markers.
                    $scope.searchBoxMarker.forEach(function(marker) {
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
                            if (!$scope.data.display_address ) {
                                $scope.data.display_address = places[0].formatted_address;
                            }
                        } else {
                            if (!$scope.data.display_address ) {
                                $scope.data.display_address = places[0].formatted_address;
                            }
                        }
                        $scope.latitude = $scope.position.lat();
                        $scope.longitude = $scope.position.lng();
                        $scope.$apply();
                    }

                    placeMarker(places[0].geometry.location);

                    places.forEach(function(place) {
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

                        google.maps.event.addListener(newMarker, 'dragend', function() {
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

                google.maps.event.addListener($scope.map, 'click', function(event) {
                    $scope.position = event.latLng;
                    $scope.latitude = $scope.position.lat();
                    $scope.longitude = $scope.position.lng();
                    placeMarker(event.latLng);
                    $scope.searchBoxMarker.forEach(function(marker) {
                        marker.setMap(null);
                    });
                    $scope.searchBoxMarker = [];
                    $scope.$apply();
                });

                $scope.updateMapManually = function() {
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
                    $scope.searchBoxMarker.forEach(function(marker) {
                        marker.setMap(null);
                    });
                    $scope.searchBoxMarker = [];
                };

                var imageFilter = { imageFilter: ['image/png', 'image/jpg', 'image/jpeg']};

                utils.addUploaderTypeFilter( uploader, 'brandImage', imageFilter);
                utils.addUploaderTypeFilter( uploader, 'imageFile', imageFilter);

                utils.addUploaderTypeFilter( uploader, 'video', {
                    videoFilter: ['video/mp4', 'video/ogg', 'video/webm', 'video/mov', 'video/avi', 'video/quicktime']
                });

                utils.addUploaderTypeFilter( uploader, 'audio', {
                    audioFilter: ['audio/mp3']
                });

                uploader.onAfterAddingFile = function(newItem) {
                    utils.cleanupUploaderQueue(uploader);
                    if (newItem.alias === 'arDisplay') {
                        $scope.data.arImageFile = newItem._file;
                        var arType = newItem._file.type;
                        $scope.isAnimationField = arType === '' ? true : false;
                    }
                    if (newItem.alias === 'brandImage') {
                        $scope.data.brandImageFile = newItem._file;
                        setTimeout(function() {
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

                $scope.showErrors = function() {
                    return ($scope.mediaList && $scope.mediaList.length === 0 && editor.stepGet('step2', 'submitted')) || $scope.validateError;
                };

                $scope.videoHasError = function() {
                    return (typeof $scope.data.videoFile !== 'object');
                };

                $scope.imageHasError = function() {
                    if (typeof $scope.data.imageFile !== 'object') {
                        return true;
                    } else {
                        return false;
                    }
                };
                $scope.arImageHasError = function() {
                    if (typeof $scope.data.arImageFile !== 'object') {
                        return true;
                    } else {
                        return false;
                    }
                };

                $scope.viewMedia = function() {
                    $scope.$hide();
                    $state.go('media.view', {
                        mediaId: $scope.data.mediaId
                    });
                };

                var getSixDigit = function(num) {
                    var number = '' + num;
                    var dotIndex = number.indexOf('.');
                    var intStr = number.substr(0, dotIndex + 1);
                    var decimalStr = number.substr(dotIndex + 1, 6);
                    return 1 * (intStr.concat(decimalStr));
                };

                $scope.changeFormat = function() {
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

                  var blob = new Blob(byteArrays, {type: contentType});
                  return blob;
                }

                var saveMedia = function() {

                    var deferred = $q.defer();
                    // var hasAr = $scope.data.arImageFile !== null && typeof($scope.data.arImageFile) === 'object';
                    var hasAr = !!$scope.data.arImageFile;

                    var formValid = false;
                    var targetFormat = undefined;

                    switch ($scope.campaign.type) {
                        case 'magazine':
                            formValid = $scope.form1.$valid && hasAr
                            targetFormat = 'magazine';
                            break;
                        case 'radio':
                            formValid = $scope.form1.$valid && !!$scope.data.imageFile;
                            targetFormat = 'radio';
                            break;
                        case 'billboard':
                            formValid = $scope.form1.$valid && (hasAr || ($scope.mediaList ? $scope.mediaList.length > 0 : false )) && ($scope.latitude || $scope.longitude);
                            targetFormat = 'bill_board';
                            break;
                        case 'in_store':
                        case 'store_front':
                            formValid = $scope.form1.$valid && (hasAr || ($scope.mediaList ? $scope.mediaList.length > 0 : false ))  && ($scope.latitude || $scope.longitude);
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
                        if ($scope.data.arImageFile && typeof($scope.data.arImageFile) === 'object') {
                            mediaData.ar_resource = $scope.data.arImageFile;
                        } else {
                            if (typeof($scope.data.arImageFile) === 'string' && $scope.data.arImageFile.indexOf('base64') > -1) {
                                var ar_resource_blob = b64toBlob($scope.data.arImageFile, 'image/jpeg');
                                var ar_resource_file = new File([ar_resource_blob], 'arImageFile.jpeg');
                                mediaData.ar_resource = ar_resource_file;
                            }
                        }

                        if ($scope.data.imageFile && typeof($scope.data.imageFile) === 'object') {
                            mediaData.target = $scope.data.imageFile;
                            mediaData.radio = $scope.data.imageFile;
                        } else {
                            if (typeof($scope.data.imageFile) === 'string' && $scope.data.imageFile.indexOf('base64') > -1) {
                                var imageFile_blob = b64toBlob($scope.data.imageFile, 'image/jpeg');
                                var imageFile_file = new File([imageFile_blob], 'imageFile.jpeg');
                                mediaData.target = imageFile_file;
                            } else {
                                if (!$scope.data.imageFile) {
                                    mediaData.target = '';
                                }
                            }
                        }

                        if ($scope.data.brandImageFile && typeof($scope.data.brandImageFile) === 'object') {
                            mediaData.brand_image = $scope.data.brandImageFile;
                        } else {
                            if (typeof($scope.data.brandImageFile) === 'string' && $scope.data.brandImageFile.indexOf('base64') > -1) {
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

                        mediaService.saveKachingZoneMedia(mediaData).then(
                            function(data) {
                                deferred.resolve(data);
                            },
                            function(response) {
                                deferred.reject(response);
                            }
                        );
                    } else {
                        $scope.validateError = true;
                        $scope.formSummited = true;
                        editor.stepSet('step2', 'valid', false);
                        setTimeout(function() {
                            $scope.scrollToFirstError();
                        }, 100);
                        deferred.reject();
                    }
                    return deferred.promise;
                };

                $scope.submitMedia = function() {

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
                        saveMedia().then(
                            function(data) {
                                if ($scope.form1) {
                                    $scope.form1.$setPristine();
                                }
                                if ($scope.editMode) {
                                    $scope.editMode = false;
                                    helper.alert('success', 'Media has been updated.');
                                } else {
                                    editor.dataSet('mediaList', $scope.mediaList);
                                }
                                $scope.refreshMediaList().then(
                                    () => {
                                        deferred.resolve();
                                        $scope.clearForm();
                                        if ($scope.form1) {
                                            $scope.form1.$setPristine();
                                        }
                                        $scope.view.busy = false;
                                    },
                                    () => {
                                        deferred.resolve();
                                        $scope.clearForm();
                                        if ($scope.form1) {
                                            $scope.form1.$setPristine();
                                        }
                                        $scope.view.busy = false;
                                    }
                                );

                                // $scope.form1.$setPristine();
                                // $scope.view.busy = false;
                                // deferred.resolve();
                            },
                            function(response) {
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
                            }
                        );
                    } else {
                        helper.scrollToFirstError($scope);
                        helper.alert('danger', 'Please, fill all required fields.');
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.clearImageUploader = function(string) {
                    if ( string === 'geo' ) {
                        $scope.data.imageFile = '';
                        helper.clearFileUploader('#imageFile');
                    }
                    if ( string === 'default' ) {
                        $scope.data.brandImageFile = '';
                        helper.clearFileUploader('#brandImageFile');
                        $scope.reviewMarker = kachingCrownIconStyle;
                    }
                };

                $scope.clearForm = function() {
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

                $scope.cancelEdit = function() {
                    $scope.clearForm();
                    $scope.editMode = false;
                    $scope.isAnimationField = false;
                    $scope.magazineOther = '';
                    $scope.stationOther = '';
                    $scope.validateError = false;
                };

                $scope.editMedia = function(mediaId) {
                    $scope.clearForm();
                    helper.alert('info', 'You are in edit mode!');
                    $scope.editMode = true;
                    helper.resetAngularFields($scope);
                    $scope.previewMediaId = mediaId.id;
                    $scope.stationOther = '';
                    mediaService.getMediaItem($scope.previewMediaId).then(
                        function(response) {
                            $scope.data.arImageFile     = helper.getMediaPreviewFromUrl(response.ar_resource);
                            $scope.data.imageFile       = helper.getMediaPreviewFromUrl(response.target);
                            $scope.latitude             = response.latitude;
                            $scope.longitude            = response.longitude;
                            $scope.inclusionZone        = _.findWhere($scope.distances, { value: response.inclusion_zone }) || $scope.distances[0];
                            $scope.address              = response.address;
                            $scope.data.brandImageFile  = helper.getMediaPreviewFromUrl(response.brand_image);
                            $scope.shape                = _.findWhere($scope.shapes, { value: response.marker_shape }) || $scope.shapes[0];
                            $scope.markerStand          = _.findWhere($scope.markerStands, { value: response.marker_stand }) || $scope.markerStands[0];
                            $scope.markerSize          = _.findWhere($scope.markerSizes, { value: response.marker_size }) || $scope.markerSizes[0];
                            $scope.selectedDimension    = _.findWhere($scope.dimensions, {value: response.marker_dimension}) || $scope.dimensions[0];
                            $scope.data.url             = response.target_url;
                            $scope.selectedStoreType    = response.type;
                            $scope.selectedStore        = _.find($scope.mediaList,{id: response.in_store_shop});
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
                                currentStation =  _.find($scope.stations, {
                                    name: response.radio_station
                                });
                            } else {
                                if ($scope.campaign.type === 'tv-ads') {
                                    currentStation =  _.find($scope.stations, {
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

                                    if (_.find($scope.magezines,function(item) {return item == $scope.selectedMagezine})) {
                                        $scope.isOther = false;
                                    } else {
                                        $scope.isOther = true;
                                        $scope.magazineOther = $scope.selectedMagezine;
                                        $scope.selectedMagezine = 'Other';
                                    }
                                }
                            }
                        }
                    );
                    $scope.editMediaMode = true;
                };

                $scope.deleteMedia = function(media) {
                    $scope.cancelEdit();
                    $scope.previewMediaId = media.id;
                    campaignsService.deleteMedia($scope.previewMediaId).then(
                        function(response) {
                            console.log(response);
                            helper.alert('success', 'Media has been deleted.');
                            $scope.refreshMediaList();
                        },
                        function(response) {
                            console.log(response);
                            helper.alert('danger', 'Media has not been deleted');
                        }
                    );
                };

                $scope.refreshMediaList = function() {
                    var deferred = $q.defer();

                    if (editor.dataGet().campaignId !== undefined) {
                        campaignsService.getCampaign(editor.dataGet().campaignId).then(function(response) {
                            // $scope.mediaList = response.media;
                            initMediaList(response);
                            deferred.resolve();
                        },
                    () => {deferred.reject();});
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };
                $scope.updateMap = function(data) {
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

                $scope.scrollToFirstError = function() {
                    if (angular.element('.has-error').length > 0) {
                        var firstErrorId = angular.element('.has-error')[0].id;
                        $location.hash(firstErrorId);
                        $anchorScroll();
                    }
                };

                var initMediaMarker = function() {
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

                $scope.init = function() {
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
                            $scope.selectedStation = $scope.stations[0]
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

                var initMediaList = function(data) {
                    // $scope.mediaList = [];
                    $scope.mediaList = [];
                    if (data.type === 'in_store') {
                        if (data.media.length > 0) {
                            angular.forEach( data.media, function( item, id ){
                                if (item.type === 'store_front') {
                                    var storefrontItem = {
                                        id: item.id,
                                        name: item.in_store_shop_name || 'undefined',
                                        media: _.where(data.media,{in_store_shop:item.id})
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

                $scope.initEditMode = function(id) {
                    var id = id || $scope.editId;
                    campaignsService.getCampaign(id).then(
                        function(data) {
                            $scope.campaign = data;
                            // $scope.selectedStoreType = $scope.campaign.type;
                            if (data.type === 'tv-ads') {
                                $scope.stations = tvStations;
                                $scope.selectedStation = $scope.stations[0]
                            }
                            $scope.validateError = false;

                            initMediaList(data);

                            $scope.view.busy = false;
                        },
                        function() {
                            $scope.view.busy = false;
                        }
                    );
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

                $scope.nextStep = function() {
                    $scope.form1.$setSubmitted();
                    if (checkFormPristine() && $scope.mediaList.length > 0) {
                        editor.stepSet('step2', 'submitted', true);
                        if ($scope.mediaList.length > 0) {
                            editor.stepSet('step2', 'valid', true);
                            $scope.goNext();
                        } else {
                            editor.stepSet('step2', 'valid', false);
                            setTimeout(function() {
                                $scope.scrollToFirstError();
                            }, 100);
                            helper.alert('danger', 'Please add at least one AR');
                        }
                    } else {
                        $scope.submitMedia().then(
                            function(){
                                editor.stepSet('step2', 'submitted', true);
                                if ($scope.mediaList.length > 0) {
                                    editor.stepSet('step2', 'valid', true);
                                    $scope.goNext();
                                } else {
                                    editor.stepSet('step2', 'valid', false);
                                    setTimeout(function() {
                                        $scope.scrollToFirstError();
                                    }, 100);
                                    helper.alert('danger', 'Please add at least one AR');
                                }
                            },
                            function(){

                            }
                        );
                    }
                };

                $scope.goPrev = function() {
                    $scope.updateStep(1);
                };

                $scope.$on('fund-broadcast', function() {
                    if ($scope.editId) {
                        $scope.nextStep();
                    }
                });

                $scope.needBasicValidateZone = function() {
                    if (!$scope.campaign || !$scope.campaign.type) {
                        return true;
                    }

                    if ($scope.data.imageFile && $scope.campaign.type != 'radio') {
                        return true;
                    } else {
                        return false;
                    }
                };

                $scope.needBrandValidationZone = function() {
                    if($scope.data.brandImageFile) {
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

                $scope.$watch('selectedStore', function() {
                    if ($scope.selectedStore) {
                        $scope.form1.$setPristine();
                    }
                });

                $scope.$watch('reviewMarker', function() {
                    if ($scope.data.brandImageFile) {
                        var $review = angular.element('#brandImageFile.uploader-dropzone.image-selected');
                        $scope.reviewMarker = $review.attr('style');
                    } else {
                        $scope.reviewMarker = kachingCrownIconStyle;
                    }
                });

                $scope.$watch('data.brandImageFile', function() {
                    setTimeout(function() {
                        var $review = angular.element('#brandImageFile.uploader-dropzone.image-selected');
                        $scope.reviewMarker = $review.attr('style');
                        $scope.$apply();
                    }, 100);
                });

                $scope.$watch('mediaList', function(newVal, oldVal) {
                    if (newVal && newVal.length === 0) {
                        $scope.selectedStoreType = 'store_front'
                    }
                });

                $scope.$watch('data.url', function(newVal, oldVal) {
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
            }
        ]);
})();
