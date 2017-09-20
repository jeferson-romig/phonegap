var app = angular.module('myapp', ['ngRoute']);

app.factory("Servicos", [function () {
    var ItemSelecionado = '';
    return {
        getPhpPage: function () {
            return ItemSelecionado;
        },
        setPhpPage: function(value) {
            ItemSelecionado = value;
        }
    };
}]);            

// Definindo Rotas
app.config(function($routeProvider){
    
  $routeProvider
    .when("/", {
      templateUrl : 'pages/home.html',
      controller  : 'HomeController'
    })
    .when('/prospect', {
      templateUrl : 'pages/prospect.php',
      controller  : 'crud'
    })
    .when('/usuarios', {
      templateUrl : 'pages/usuarios.php',
      controller  : 'crud'
    })
    .when('/about', {
      templateUrl : 'pages/about.html',
      controller  : 'AboutController'
    })
    .otherwise({redirectTo: '/'});
});

app.controller('AboutController', function($scope) {
  $scope.message = 'Sistema para controle de prospecções de clientes.';
});

app.controller("crud", function($scope, $http, $location){

    $scope.model = {};
    $scope.model.cmd = "";
    $scope.mostrarbotao = true;
    // $scope.phpPage = Servicos.getPhpPage();
    
    var aux = $location.url();
    var pag = aux.substring(1, aux.length);
    pag = pag + "-ado.php";
    $scope.phpPage = pag;    

    $scope.insertData = function() {
        $scope.model.cmd = "POST";
        $http.post($scope.phpPage, $scope.model)
        .then(function() {
            $scope.msg = "Dados inseridos";
            $scope.showData();
        }, function() {
            $scope.msg = "Erro ao inserir";
        });
    };

    $scope.showData = function() {
        $scope.model.cmd = "GET";
        $http.post($scope.phpPage, $scope.model)
        .then(function(response) {
            $scope.data = response.data;
        }, function() {
            $scope.msg = "Erro ao mostrar";
        });
    };

    $scope.deleteData = function(id) {
        $scope.model.cmd = "DEL";
        $http.post($scope.phpPage, {'id':id, 'cmd':$scope.model.cmd})
        .then(function() {
            $scope.msg = "Dados excluídos";
            $scope.showData();
        }, function() {
            $scope.msg = "Erro ao excluir";
        });
    };

    $scope.editData = function(m) {
        $scope.model = m;
        $scope.login_disabled = true;
        
        if ($scope.phpPage === "usuarios-ado.php") {
            $scope.model.senha = "";
        }
    };

    $scope.newData = function() {
        $scope.model = {};
        $scope.model.id = 0;
        $scope.login_disabled = false;
    };
    
    $scope.orderBy = function(x) {
        $scope.myOrderBy = x;
        if ($scope.reverse) {
            $scope.reverse = false;
        } else {
            $scope.reverse = true;
        }
    };
    
    $scope.showData();
    
});

$(document).ready(function(){
    $("#myModal").on('shown.bs.modal', function(){
        $(this).find('#nome').focus();
    });
}); 
