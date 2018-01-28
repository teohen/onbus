angular.module('Onbus').factory('OnibusService', function($http){
	var caminho = "php/DAO/onibusDAO.php?acao=";
	var _getLinhaOnibus = function(linha){
		return $http.get(caminho+"buscaLinhasDeOnibus&linha="+linha);
	}
	var _getLinhaOnibusPorId = function(id){
		return $http.get(caminho+"buscaLinhasDeOnibusPorId&id="+id);
	}
	var _getDezLinhaOnibus = function(linha){
		return $http.get(caminho+"buscaDezLinhasDeOnibus&linha="+linha);
	}
	var _saveLinhaOnibus = function(linha){
		return $http.post(caminho+"novaLinha", linha);
	}
	return {
		linhaOnibus: _getLinhaOnibus,
		linhaOnibusPorId: _getLinhaOnibusPorId,
		DezlinhasOnibus: _getDezLinhaOnibus,
		sugerirLinha: _saveLinhaOnibus
	}
});