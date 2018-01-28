angular.module('Onbus').controller('LinhaController', function($scope, MarcadorService, OnibusService, $routeParams) {
var buscaLinha = function(idLinha){
  OnibusService.linhaOnibusPorId(idLinha).success(function(data){
      $scope.linha = data; 
    }).error(function(data){
      alert('erro ao buscar as linhas');
    });  
}
var buscaDadosLinha = function(idLinha){
  MarcadorService.todosMarcadoresPorLinha(idLinha).success(function(data){
      $scope.linha.dados = data; 
      console.log($scope.linha);
    }).error(function(data){
      alert('erro ao buscar as linhas');
    });  
}
buscaLinha($routeParams.id);
buscaDadosLinha($routeParams.id);
});
