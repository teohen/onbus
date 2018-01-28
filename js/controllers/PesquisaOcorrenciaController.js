angular.module('Onbus').controller('PesquisaOcorrenciaController', function($scope, ngDialog, MarcadorService, CategoriaService, OnibusService, MapaService){
$scope.ocorrencia = {};
$scope.tabela = false;
$scope.pesquisa = {};
$scope.pesquisa.todaslinhas = false;
$scope.tam = 0;

$scope.buscaLinhasDeOnibus = function(linhaOnibus){
    ligaTabela();
    OnibusService.linhaOnibus(linhaOnibus).success(function (data){
        $scope.linhas = data;
      }).error(function(data){
        alert("ocorreu um erro ao buscar");
      });
}
var buscaTodosTiposDeOcorrencia = function(){
  CategoriaService.todasCategorias().success(function (data){
        $scope.tipos = data;
      }).error(function(data){
        alert("ocorreu um erro ao buscar");
      });
}
$scope.pesquisaOcorrencia = function(ocorrencia){
  if(ocorrencia.onibus == undefined){
    ocorrencia.onibus = {};
    ocorrencia.onibus.id = 0;
  }
  if(ocorrencia.tipoOcorrencia == undefined){
    ocorrencia.tipoOcorrencia = {};
    ocorrencia.tipoOcorrencia.id = 0;
  }
  ocorrencia.dataInicioFinal = ocorrencia.dataInicio.getFullYear()+"-"+(ocorrencia.dataInicio.getMonth()+1)+"-"+ocorrencia.dataInicio.getDate();
  ocorrencia.dataFimFinal = ocorrencia.dataFim.getFullYear()+"-"+(ocorrencia.dataFim.getMonth()+1)+"-"+ocorrencia.dataFim.getDate();
  MarcadorService.marcadoresComFiltro(ocorrencia).success(function (data){
    $scope.ocorrencias = data;
    MapaService.retiraMarkers();
    $scope.markers = MapaService.adicionaMarkers($scope.ocorrencias);
  }).error(function(data){
    alert("ocorreu um erro ao buscar");
  });
  ngDialog.close();
}

var ligaTabela = function(){
  $scope.tabela = true;
}
var desligaTabela = function(){
  $scope.tabela = false;
}
$scope.enviaPraLinhaDoOnibus = function(valor){
  desligaTabela();
  $scope.pesquisa.onibus = valor;
  $scope.pesquisa.linha = valor.linhaOnibus;
}
});
