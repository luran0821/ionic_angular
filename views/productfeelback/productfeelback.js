/*

angular.module('myapp')
    .controller('productfeelbackCtrl', function ($scope,$stateParams,dataFactory) {
      var data = dataFactory.query();
        var id=$stateParams.id;
        console.log('productfeelbackCtrl:'+id);
        angular.forEach(data.productList.shoplist, function (item) {
            if (item.id == id) {
                $scope.product = item;
                return false;
            }
        })

    })




*/
