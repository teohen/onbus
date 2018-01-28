angular.module("Onbus").config(function($routeProvider){
	$routeProvider.when("/home", {
		templateUrl: "view/home.html",
		controller: "HomeController"
	});
	$routeProvider.when("/teste", {
		templateUrl: "view/teste.html",
		controller: "TesteController"
	});
	$routeProvider.when("/ocorrencia/:id", {
		templateUrl: "view/ocorrencia.html",
		controller: "OcorrenciaDetalheController"
	});
	$routeProvider.when("/linha/:id", {
		templateUrl: "view/linha.html",
		controller: "LinhaController"
	});
	$routeProvider.when("/sugerirnovalinha", {
		templateUrl: "view/sugerirLinha.html",
		controller: "SugerirLinhaController"
	});
	$routeProvider.when("/info", {
		templateUrl: "view/informacoes.html",
		controller: "InformacoesController"
	});
	$routeProvider.when("/info/sobre", {
		templateUrl: "view/sobre.html"
	});
	$routeProvider.when("/info/colaboradores", {
		templateUrl: "view/colaboradores.html", 
		controller: "ColaboladoresController"
	});
	$routeProvider.when("/info/ajuda", {
		templateUrl: "view/ajuda.html" 
	});
	$routeProvider.when("/monitor", {
		templateUrl: "view/monitor.html", 
		controller: "MonitorController"
	});
	$routeProvider.when("/cadastroLinha", {
		templateUrl: "view/cadastroLinha.html", 
		controller: "CadastroLinhaController"
	});
	$routeProvider.otherwise({
		redirectTo: "/home"
	});
});