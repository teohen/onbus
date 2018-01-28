$(document).ready(function(){
  $("header a").click(function(){
    $('.wrapper').toggleClass('show-menu')
  })
});
angular.module('Onbus', ['leaflet-directive', 'ngRoute', 'ngDialog']);