angular.module('myapp')
    .controller('themeCtrl', function ($scope, $stateParams, dataFactory) {
        var data = dataFactory.query();
        var id = $stateParams.id;

        angular.forEach(data.productList.community, function (item) {

            if (item.id == id) {
                $scope.item = item;

                return false;   // 中断forEach循环 <=> break
            }
        });
        $scope.like = function (item) {
            item.likenum++;
        }

        $scope.likef = function (it) {
            it.likenuk++;
        }

    })