angular.module('myapp')
    .controller('commodityCtrl', function ($scope, $state,$stateParams, $ionicViewSwitcher, dataFactory) {
        $scope.data = dataFactory.query();
        $scope.toDetail = function (item) {
                    $state.go("tabs.share.shoplist.product", {id: item.id});
                    // 将go有动画效果
                    $ionicViewSwitcher.nextDirection("forward");// "forward","back"



        };
    })