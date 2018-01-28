$(window).on("resize", function(){
	$(#mapa).height($(window).height()).width($(width).width());
	mapa.invalidadeSize();
}).trigger("resize");

