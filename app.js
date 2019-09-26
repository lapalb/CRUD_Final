const app = angular.module('crud', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngRoute']);

app.controller("crudController", ["$scope", function($scope){
    $scope.welcomebanner="Welcome to Crud Operation";
    $scope.emp=[];
}])


app.controller("addController",["$scope","$timeout", function($scope,$timeout){
    $scope.addEmp = function(){
        b={};
        b["id"]=$scope.empid;
        b["name"]=$scope.empname;
        b["salary"]=$scope.empsalary;
        b["designation"]=$scope.empdes;
        $scope.emp.push(b);
        $scope.alertshow=true;
        $timeout(function () { $scope.alertshow = false; }, 2000);
    }


}])

app.controller("infoController",["$scope", function ($scope) {
$scope.info=["Add Employee","Update Employee Details", "Delete Employee", "Pagination View", "Mobile Friendly View"];

}])


app.controller("viewController",["$scope", function($scope){
    $scope.filteredemp = [];
    $scope.ar = [];
    $scope.pagination = {
        currentPage :1,
        numPerPage :10,
        maxSize:5};
    $scope.numPages = function () {
        return Math.ceil($scope.emp.length / $scope.pagination.numPerPage);
    };
    $scope.pagination.currentPage = $scope.numPages();
    var begin = (($scope.pagination.currentPage - 1) * 10);
    var end = begin + 10;
    for (let x=0;x<$scope.emp.length;x++){$scope.ar[x]=false}
    $scope.filteredemp = $scope.emp.slice(begin, end);
    $scope.pageChanged = function() {
        let  begin = (($scope.pagination.currentPage - 1) * 10);
        let end = begin + 10;
        $scope.filteredemp = $scope.emp.slice(begin, end);
    };

    $scope.upd =function(x){
        $scope.upda=true;
        x=x + 10*($scope.pagination.currentPage - 1)
        $scope.empidu=$scope.emp[x].id;
        $scope.empnameu=$scope.emp[x].name
        $scope.empsalaryu=$scope.emp[x].salary
        $scope.empdesu=$scope.emp[x].designation
        $scope.rid=x;

    }

    $scope.delSel =function(x){
        for(let x=0;x<$scope.emp.length;x++){
            if($scope.ar[x]==true){ delete $scope.emp.splice(x,1); delete $scope.ar.splice(x,1);--x;}

        }
        var begin = (($scope.pagination.currentPage - 1) * $scope.pagination.numPerPage);
        var end = begin + $scope.pagination.numPerPage;
        $scope.filteredemp = $scope.emp.slice(begin, end);

    }



    $scope.upEmp =function(x){
        x=x + 10*($scope.pagination.currentPage - 1)
        $scope.emp[$scope.rid].name=$scope.empnameu;
        $scope.emp[$scope.rid].salary=$scope.empsalaryu;
        $scope.emp[$scope.rid].designation=$scope.empdesu;
        $scope.upda=false;
    }

    $scope.del =function(x){
        x=x+10*($scope.pagination.currentPage - 1)
        delete $scope.emp.splice(x,1);
        var begin = (($scope.pagination.currentPage - 1) * $scope.pagination.numPerPage);
        var end = begin + $scope.pagination.numPerPage;
        $scope.filteredemp = $scope.emp.slice(begin, end);
        

    }
}])


app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when("/add",{
            templateUrl:"add.html",
            controller:"addController"
        })

        .when("/view",{
            templateUrl:"view.html",
            controller:"viewController"
        })
        .when("/info",{
            templateUrl:"info.html",
            controller:"infoController"
        })
})

