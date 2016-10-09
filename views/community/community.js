angular.module('myapp')
    .controller('communityCtrl', function ($scope, $http, $state, $ionicViewSwitcher, dataFactory) {

        $scope.themego = function (item) {
            $state.go("tabs.share.theme", {id: item.id});
            $ionicViewSwitcher.nextDirection("forward");// "forward","back"
        };
        $scope.page = 0;    // 用来保存当前请求的页码
        $scope.total = 1;   // 用来保存总页数
        $scope.restaurants = [];    // 保存所有加载的餐馆信息

        // 加载餐馆的方法：每当上拉刷新时，会调用一次这个方法加载新的一页数据
        $scope.getRestaurants = function () {
            $scope.page++;  // 页数++
            var url = "data/data.json";   // 请求的url
            $http.get(url)
                .success(function (response) {
                    angular.forEach(response.community, function (community) {
                        $scope.restaurants.push(community);
                    });

                    $scope.total = response.totalPages; // 示例数据中为30页
                })
                .finally(function () {
                    $scope.$broadcast("scroll.infiniteScrollComplete");
                });
        };

        $scope.getRestaurants();    // 加载时，从API加载第一页餐馆数据

    });