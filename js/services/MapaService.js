angular.module('Onbus').factory('MapaService', function(){

	var caminho = "php/DAO/onibusDAO.php?acao=";
	var markers = new Array();
	var tamanho = 0;

	var _getMarkers = function(){
		return markers;
	}
	var _getTamanho = function(){
		return tamanho;
	}
	var _setMarkers = function(marcadores){
		markers = marcadores;
	}
	var _adicionaMarkers = function(ocorrencias){
		tamanho = 0; 	
		for (var i = 0; i < ocorrencias.length; i++) {
			tamanho++;
			markers.push({
      				lat: parseFloat(ocorrencias[i].latMarcador),
      				lng: parseFloat(ocorrencias[i].lngMarcador),
      				message: ocorrencias[i].descricaoCategoria
    		}); 	
		}
	}
	var _retiraMarkers = function(){
		var tam = markers.length;
		for (var i = 0; i < tam; i++) {
			markers.pop();	
		}
	}
	return {
		getMarkers: _getMarkers,
		getTamanho: _getTamanho,
		setMarkers: _setMarkers,
		adicionaMarkers: _adicionaMarkers,
		retiraMarkers: _retiraMarkers, 
		marcadores: markers
	}
});