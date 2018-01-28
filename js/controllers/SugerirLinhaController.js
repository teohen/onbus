angular.module('Onbus').controller('SugerirLinhaController', function($scope, OnibusService) {
$scope.linhas = [];
$scope.sugestao = {}

$scope.buscaLinhasDeOnibus = function(linhaOnibus){
    OnibusService.DezlinhasOnibus(linhaOnibus).success(function (data){
        $scope.linhas = data;
      }).error(function(data){
        alert("ocorreu um erro ao buscar");
      });
}

$scope.sugerirLinha = function(sugestao){
	console.log(sugestao);
	OnibusService.sugerirLinha(sugestao).success(function(data){
		  delete $scope.sugestao;
    	alert('Sugestão enviada');
    }).error(function(data){
    	alert('erro ao enviar a sugestão');
    });
}
$scope.transformaStatusLinha = function(status){
  if(status == 1){
    return 'ok';
  }else if (status == 0){
    return 'não';
  }
}

});
