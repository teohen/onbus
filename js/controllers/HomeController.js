angular.module('Onbus').controller('HomeController', function($scope, ngDialog, MarcadorService, MapaService){
	angular.extend($scope, {
    SLuis: {
      lat: -2.52501,
      lng: -44.20898,
      zoom: 10
    },
    events: {},
    defaults:{
      zoomControl: false,
    }
  });

$scope.$on("leafletDirectiveMap.click", function(event, args){
          var leafEvent = args.leafletEvent;
          $scope.localOcorrencia = leafEvent.latlng;
          var dialogo = ngDialog.open({
            template: 'dialogo',
            className: 'ngdialog-theme-plain',
            showClose: false,
            scope: $scope
          }); 
});
$scope.$on("leafletDirectiveMarker.click", function(event, args){                  
    var leafEvent = args.leafletEvent;          
    for(var i = 0; i < $scope.ocorrencias.length; i++) {     
        if(leafEvent.latlng.lat == $scope.ocorrencias[i].latMarcador && leafEvent.latlng.lng == $scope.ocorrencias[i].lngMarcador){
          $scope.ocorrenciaDialogo =  $scope.ocorrencias[i];             
        }
    }        
    ngDialog.open({            
        template: 'ocorrencia',
        className: 'ngdialog-theme-plain',
        showClose: false,
        scope: $scope
    });
});
var buscaTodasOcorrencias = function(){
    MarcadorService.todosMarcadores().success(function(data){
     $scope.ocorrencias = data; 
     MapaService.adicionaMarkers($scope.ocorrencias);
     $scope.markers = MapaService.getMarkers();
    }).error(function(data){
      alert('erro ao buscar as ocorrencias');
    });  
}
$scope.pesquisar = function(){
  ngDialog.open({            
        template: 'pesquisar',
        className: 'ngdialog-theme-plain',
        showClose: false,
        scope: $scope
    });
}
buscaTodasOcorrencias();
});

