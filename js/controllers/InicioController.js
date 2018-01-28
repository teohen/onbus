angular.module('Onbus').controller('InicioController', function($scope, ngDialog){
	angular.extend($scope, {
    SLuis: {
      lat: -2.52501,
      lng: -44.20898,
      zoom: 12
    },
    events: {},
    defaults:{
      zoomControl: false,
    }
  });
  $scope.markers = new Array();
});
