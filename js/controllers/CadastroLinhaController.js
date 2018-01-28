angular.module('Onbus').controller('CadastroLinhaController', function($scope, ngDialog, MarcadorService, CategoriaService, OnibusService){
$scope.ocorrencia = {};
$scope.tabela = false;

$scope.buscaLinhasDeOnibus = function(linhaOnibus){
    ligaTabela();
    OnibusService.linhaOnibus(linhaOnibus).success(function (data){
        $scope.linhas = data;
      }).error(function(data){
        alert("ocorreu um erro ao buscar");
      });
}
$scope.cadastrarOcorrencia = function(ocorrencia){
  ocorrencia.categoria = ocorrencia.tipo.id;
  ocorrencia.lat = $scope.localOcorrencia.lat;
  ocorrencia.lng = $scope.localOcorrencia.lng;
  ngDialog.close();
   MarcadorService.salvarOcorrencia(ocorrencia).success(function(data) {
            delete $scope.ocorrencia;
            var dialogo = ngDialog.open({
              template: 'ocorrenciacadastrada',
              className: 'ngdialog-theme-plain',
              showClose: false,
              scope: $scope
            });
    }).error(function(data){
            alert("erro ao cadastrar");
    });
}
var buscaTodosTiposDeOcorrencia = function(){
  CategoriaService.todasCategorias().success(function (data){
        $scope.tipos = data;
      }).error(function(data){
        alert("ocorreu um erro ao buscar");
      });
}
var ligaTabela = function(){
  $scope.tabela = true;
}
var desligaTabela = function(){
  $scope.tabela = false;
}
$scope.enviaPraLinhaDoOnibus = function(valor){
  desligaTabela();
  $scope.ocorrencia.linha = valor;
}
$scope.tiraDialog = function(){
  ngDialog.close();
}
buscaTodosTiposDeOcorrencia();
});
