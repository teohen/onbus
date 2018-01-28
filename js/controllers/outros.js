angular.module('Onbus').controller('InicioController', function($scope, ngDialog, $http){
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

	$scope.ocorrencias = [];
  $scope.linhas=[];
  $scope.linhaOnibus; 
  $scope.tipos;
  $scope.todaslinhas = false;
  //$scope.localOcorrencia;
	$scope.markers = new Array();
  
  $scope.aler = function(ocorrencia){
    alert(aler);
  }
  $scope.setLocalOcorrencia  = function(ocorrencia){
    $scope.localOcorrencia=ocorrencia; 
    delete $scope.ocorrencia;
     
  }
$scope.linhaSelecionada = function(linha){
    for (var i = 0; i < $scope.linhas.length; i++) {
      $scope.linhas[i].selecionada = false;
    }
    linha.selecionada = true;
    $scope.linhaOnibus = linha;    
}

$scope.mensagem=function(msg){
		var dialogo = ngDialog.open({
	      template: msg,
	      plain: true,
	      className: 'ngdialog-theme-plain',
	      showClose: false
	    });
	}

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

  $scope.cadastrarOcorrencia = function(ocorrencia){
    var ocorrenciaFinal = {descricao: ocorrencia.descricao}
    if($scope.linhaOnibus == undefined){//se a lina foi digitada
        ocorrenciaFinal.linhaOnibus = $scope.linhaonibus;
        ocorrenciaFinal.idOnibus = 0;
    }else{
      ocorrenciaFinal.linhaOnibus = $scope.linhaOnibus.linhaOnibus;
      ocorrenciaFinal.idOnibus = $scope.linhaOnibus.id;
    }
    ocorrenciaFinal.idCategoria = $scope.tipo.id;
    ocorrenciaFinal.data = ocorrencia.data.getFullYear()+"-"+(ocorrencia.data.getMonth()+1)+"-"+ocorrencia.data.getDate();
    ocorrenciaFinal.lat = $scope.localOcorrencia.lat;
    ocorrenciaFinal.lng = $scope.localOcorrencia.lng;    
    console.log(ocorrenciaFinal);
    $scope.registrarOcorrencia(ocorrenciaFinal);
  }

  $scope.verOcorrenciasDeHoje = function(){

    var dialogo = ngDialog.open({
      template: '<center><h1>aguarde..<h1></center>',
      plain: true,
      className: 'ngdialog-theme-plain',
      showClose: false
    })
  }

  $scope.confirmacaoOcorrencia = function(){    
    var dialogo = ngDialog.open({
            template: 'confirmacaoOcorrencia',
            className: 'ngdialog-theme-plain',
            showClose: false,
            scope: $scope
          }); 
  }

  $scope.confirmarOcorrencia = function (desc){
      if(desc == undefined ){
        $scope.ocorrenciaDialogo.descricaoConfirmacaoOcorrencia = "n";
      }else{
        $scope.ocorrenciaDialogo.descricaoConfirmacaoOcorrencia = desc;
      }
      var ocorrencia = $scope.ocorrenciaDialogo;
      
      var url = "bd.php?tarefa=confirma";
      $http.post(url, ocorrencia).success(function(data) {
            alert(data);
            delete $scope.ocorrenciaDialogo;
      });    
  } 
  $scope.registrarOcorrencia = function(ocorrencia){
    var url = "bd.php?tarefa=cadastro";
      $http.post(url, ocorrencia).success(function() {
            delete $scope.ocorrencia;
            ngDialog.close();     
            $scope.mensagem('ocorrencia cadastrada');
      }); 
  } 
  $scope.buscaOcorrencias = function (filtro){
    $http.get("bd.php?"+filtro).success(function (data){
        if(data == null){
          console.log("Erro na busca BD");
        }else{
            $scope.ocorrencias = data; 
            $scope.adicionaMarcadores();
        }
    });
  }

                                                                                   //PAG: NUMERO DA PAGINA QUE QUER BUSCAR.AS PAGINAS SAO SEPARADAS DE 10 EM 10 
  $scope.buscaOcorrenciasPaginada = function (filtro, pag){                        //FILTRO: FILTRAR AS BUSCAS NO BANCO. EX: confirmacaoMarcador>0
    $http.get("bd.php?tarefa=buscapaginada&filtro="+filtro+"&pag="+pag).success(function (data){
        if(data == null){
          console.log("Erro na busca BD");
        }else{
            $scope.ocorrencias = data; 
        }
    });
  }
    $scope.buscaOnibus = function (filtro){
    $http.get("bd.php?tarefa=buscalinhaonibus&linhaOnibus="+filtro).success(function (data){
        if(data == null){
          console.log("Erro na busca BD");
        }else{
            $scope.linhas = data;
        }
    });
  }
  $scope.buscaTipos = function (){
    $http.get("bd.php?tarefa=buscatipo").success(function (data){
        if(data == null){
          console.log("Erro na busca BD");
        }else{
            $scope.tipos = data;
        }
    });
  }
  $scope.adicionaMarcadores = function(){
      $scope.markers = new Array();
      	for (var i = 0; i < $scope.ocorrencias.length; i++) {
      	    $scope.markers.push({
            lat: parseFloat($scope.ocorrencias[i].latMarcador),
            lng: parseFloat($scope.ocorrencias[i].lngMarcador),
            message: $scope.ocorrencias[i].descricaoCategoria
  	        }); 
      }
   }

   $scope.pesquisar = function(){
      var dialogo = ngDialog.open({
            template: 'pesquisarOcorrencia',
            className: 'ngdialog-theme-plain',
            showClose: false,
            scope: $scope
          }); 

   }
 $scope.pesquisarOcorrencia = function(pesquisa){ 
  var pesquisaFinal = {};
   pesquisaFinal.dataInicio = pesquisa.dataInicio.getFullYear()+"-"+(pesquisa.dataInicio.getMonth()+1)+"-"+pesquisa.dataInicio.getDate();
      pesquisaFinal.dataFim = pesquisa.dataFim.getFullYear()+"-"+(pesquisa.dataFim.getMonth()+1)+"-"+pesquisa.dataFim.getDate();
  if(pesquisa.todaslinhas == true){ 
    pesquisaFinal.linha = "todas";
  }else{
    pesquisaFinal.linha = $scope.linhaOnibus.id; 
  }
  if (pesquisa.todasocorrencias == true ) {
    pesquisaFinal.tipoOcorrencia = "todas";  
  }else{
    pesquisaFinal.tipoOcorrencia = pesquisa.tipoOcorrencia.id;
  }  
  $scope.buscarOcorrencias(pesquisaFinal);
 } 
 $scope.buscarOcorrencias = function(pesquisa){
  var filtro = "&dataInicio="+pesquisa.dataInicio+"&dataFim="+pesquisa.dataFim+"&linha="+pesquisa.linha+"&tipo="+pesquisa.tipoOcorrencia;
  $http.get("bd.php?tarefa=buscaocorrencias"+filtro).success(function (data){
        if(data == null){
          console.log("Erro na busca BD");
        }else{
          delete $scope.ocorrencias;
            $scope.ocorrencias = data;
            delete $scope.markers;
            $scope.adicionaMarcadores();
        }
    });   
 } 
//$scope.buscaOcorrencias("tarefa=buscadata&inicio=1200-01-01&fim=3000-01-01");
$scope.adicionaMarcadores();
//$scope.buscaOnibus($scope.buscaLinha);
//$scope.buscaTipos();
//$scope.buscaOcorrencias("tarefa=buscadata&inicio=1200-01-01&fim=3000-01-01");
//$scope.adicionaMarcadores();
}).directive('navigationMenu', function(){
  return {
    restrict: 'E',
    templateUrl: 'navigation.html'
  }
});
