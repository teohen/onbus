angular.module('Onbus').factory('MarcadorService', function($http){
	var _getTodosMarcadores = function(){
		return $http.get("php/DAO/marcadorDAO.php?acao=buscaTodasAsOcorrencias&dataInicio=2000-01-01&dataFim=3000-01-01&todaslinhas=true&todasocorrencias=true");
	}
	var _getMarcadoresComFiltro = function(filtro){
		return $http.get("php/DAO/marcadorDAO.php?acao=buscaTodasAsOcorrencias&dataInicio="+filtro.dataInicioFinal+"&dataFim="+filtro.dataFimFinal+"&todaslinhas="+filtro.todaslinhas+"&todasocorrencias="+filtro.todasocorrencias+"&idOnibus="+filtro.onibus.id+"&idCategoria="+filtro.tipoOcorrencia.id);
	}
	var _getMarcadoresPorLinha = function(idLinha){
		return $http.get("php/DAO/marcadorDAO.php?acao=buscaTodasAsOcorrenciasPorLinha&id="+idLinha);
	}
	var _saveMarcador = function(ocorrencia){
		return $http.post("php/DAO/marcadorDAO.php?acao=novaOcorrencia", ocorrencia);
	}
	var _getMarcadorPorId = function(id){
		return $http.get("php/DAO/marcadorDAO.php?acao=buscaOcorrenciaPorId&id="+id);
	}
	return {
		todosMarcadores: _getTodosMarcadores,
		todosMarcadoresPorLinha: _getMarcadoresPorLinha,
		marcadoresComFiltro: _getMarcadoresComFiltro,
		ocorrenciaPorId: _getMarcadorPorId,
		salvarOcorrencia: _saveMarcador
	}
});