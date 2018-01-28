angular.module('Onbus').factory('DescricoesService', function($http){
	var _getTodasDescricoes = function(id){
		return $http.get("php/DAO/descricoesDAO.php?acao=buscaTodosComentarios&idMarcador="+id);
	}
	var _saveComentario = function(descricao){
		return $http.post("php/DAO/descricoesDAO.php?acao=novaDescricao", descricao);
	}
	return {
		todasDescricoes: _getTodasDescricoes,
		enviarComentario: _saveComentario
	}
});