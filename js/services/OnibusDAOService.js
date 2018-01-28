angular.module('Onbus').factory('OnibusDAOService', function(OnibusService){
	var linhas = [];
	var caminho = "php/DAO/onibusDAO.php?acao=";
	var _getLinhaOnibus = function(linha){
		OnibusService.linhaOnibus(linha).success(function (data){
        	linhas = data;
      	}).error(function(data){
	        alert("ocorreu um erro ao buscar");
      });
		return linhas;
	}
	var _getDezLinhaOnibus = function(linha){
		return $http.get(caminho+"buscaDezLinhasDeOnibus&linha="+linha);
	}
	var _saveLinhaOnibus = function(linha){
		return $http.post(caminho+"novaLinha", linha);
	}
	return {
		linhaOnibus: _getLinhaOnibus,
		DezlinhasOnibus: _getDezLinhaOnibus,
		sugerirLinha: _saveLinhaOnibus
	}
});