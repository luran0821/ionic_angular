angular.module("myapp").controller('evaluationtmplateCtrl', function ($scope, $stateParams, dataFactory) {

    var data = dataFactory.query();
    var id = $stateParams.id;
    angular.forEach(data.productList.evaluation, function (item) {
        if (item.id == id) {
            $scope.product = item;

            return false;   // 中断forEach循环 <=> break
        }
    });
})
