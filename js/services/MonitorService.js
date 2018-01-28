angular.module('Onbus').factory('MonitorService', function($http){
	var caminho = "php/DAO/monitorDAO.php?acao=";
	var _getMonitorPorId = function(id){
		return $http.get(caminho+"buscaLinhasDeOnibus&linha="+linha);
	}
	var _getDezLinhaOnibus = function(linha){
		return $http.get(caminho+"buscaDezLinhasDeOnibus&linha="+linha);
	}
	var _saveMonitor = function(monitor){
		return $http.post(caminho+"cadastroMonitor", monitor);
	}
	return {
		novoMonitor: _saveMonitor
	}
});