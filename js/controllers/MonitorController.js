angular.module('Onbus').controller('MonitorController', function($scope, ngDialog, MonitorService) {
    ngDialog.close();
    $scope.cadastroMonitor = function(monitor){
      delete $scope.monitor;
      MonitorService.novoMonitor(monitor).success(function(data){
        if(data.erro == "existente"){
          alert('Esse e-mail já está cadastrado. Escolha outro');
        }else{
          alert('Monitor cadastrado');
        }
      });
    }
});
