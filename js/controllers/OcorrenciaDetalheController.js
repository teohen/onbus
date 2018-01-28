angular.module('Onbus').controller('OcorrenciaDetalheController', function($scope, ngDialog, MarcadorService, DescricoesService, $routeParams) {
$scope.ocorrencia = {} 
$scope.descricoes = [];
$scope.marcadores = new Array();
$scope.comentario = {};
var buscaOcorrencia = function(idOcorrencia){
	MarcadorService.ocorrenciaPorId(idOcorrencia).success(function(data){
    	$scope.ocorrencia = data; 
    	adicionaMarcadores();
    }).error(function(data){
    	alert('erro ao buscar as ocorrencias');
    });  
}
var buscaDescricoes = function(id){
	DescricoesService.todasDescricoes(id).success(function(data){
    	$scope.descricoes = data; 
    }).error(function(data){
    	alert('erro ao buscar as descricoes');
    });  
}

var adicionaMarcadores = function(){
  var tam = $scope.marcadores.length;
  for (var i = 0; i < tam; i++) {
      $scope.marcadores.pop();
  }
  $scope.marcadores.push({
    lat: parseFloat($scope.ocorrencia.latMarcador),
    lng: parseFloat($scope.ocorrencia.lngMarcador),
    message: $scope.ocorrencia.descricaoCategoria
  }); 

  ngDialog.close();
} 
$scope.cadastrarComentario = function(comentario){
	comentario.marcador =  $routeParams.id;
	DescricoesService.enviarComentario(comentario).success(function(data){
		delete $scope.comentario;
    	alert('Comentario enviado');
    	buscaDescricoes($routeParams.id);
    }).error(function(data){
    	alert('erro ao buscar as descricoes');
    });
}
buscaOcorrencia($routeParams.id);
buscaDescricoes($routeParams.id);

angular.extend($scope, {
   marcador: {
    lat: $scope.ocorrencia.latMarcador,
    lng: $scope.ocorrencia.lngMarcador,
    zoom: 10
  },
  events: {},
  defaults:{
    zoomControl: true,
  }
});

});
