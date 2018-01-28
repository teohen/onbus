angular.module('Onbus').factory('CategoriaService', function($http){
	var _getTodasCategorias = function(){
		return $http.get("php/DAO/categoriaDAO.php?acao=buscaTodosTiposDeOcorrencia");
	}
	return {
		todasCategorias: _getTodasCategorias
	}
});