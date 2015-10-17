var app = angular.module('dwmApp', []);
//var urlPath = "http://192.168.0.5:9090/DWM2015/api/pessoa/";
var urlPath = "http://localhost:9090/DWM2015/api/pessoa/";
app.controller('pessoaCtrl', function ($scope, $http, $timeout) {
    $scope.pessoas = [];
    $scope.loadPessoaApp = function () {
        $http.get(urlPath, {cache: false})
                .success(function (response) {
                    //console.log(response);
                    $scope.pessoas = response;
                });
        $scope.config = {
            itemsPerPage: 5,
            fillLastPage: true
        }
    };

    $scope.delete = function (idPessoa) {
        console.log("tentar delete em: "+idPessoa);
        $http({            
            url: urlPath+idPessoa,             
            method: 'DELETE'            
        }).success(function(status) {
            console.log("Success: ");
            console.log(status);            
        }).error(function(status) {
            console.log("Error: ");
            console.log(status);
        });
    };

    var interval = setInterval(function(){
       $scope.loadPessoaApp()
    }, 2000);
    //$scope.loadPessoaApp();
});

app.controller('formCtrl', function($scope, $http, $timeout) {    
    $scope.save = function(pessoa) {  
        var values = JSON.stringify(pessoa);     
        console.log(values);
        $http({            
            url: urlPath,             
            method: 'POST',         
            data: values,
            headers: {'Content-Type':'application/json; charset=utf-8'}           
        }).success(function(status) {
            console.log("Success: ");
            console.log(status);  
            $scope.pessoa.nome="";
            $scope.pessoa.email="";
        }).error(function(status) {
            console.log("Error: ");
            console.log(status);
        });
    };
});
