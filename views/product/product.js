angular.module('myapp')
    .controller('productCtrl', function ($scope, $stateParams,$state,dataFactory) {
        var data = dataFactory.query();
        var id = $stateParams.id;
        console.log('productCtrl:'+$stateParams.id);
        angular.forEach(data.productList.shoplist, function (item) {
            if (item.id ==  $stateParams.id) {
                $scope.product = item;
              console.log($scope.product)
                return false;
            }
        });




    });

