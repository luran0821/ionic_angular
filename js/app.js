var myapp = angular.module('myapp', ['ionic'])
    .controller('myCtrl', function ($scope, $state, $stateParams, $ionicViewSwitcher, $ionicSlideBoxDelegate, dataFactory) {
        $ionicSlideBoxDelegate.update();
        $ionicSlideBoxDelegate.$getByHandle("slideHandler").loop(true);
        $scope.demo=true;
        $scope.to = function (stateName) {
            $state.go(stateName)
        };

        var data = dataFactory.query();
        var productList = {data: []};
        $scope.add = function () {
            angular.forEach(data.productList.shoplist, function (item) {
                if (item.id == $stateParams.id) {
                    productList.data.push(item);
                    $scope.productList = productList;
                    $scope.badgeValue = productList.data.length;
                }
                return false;
            })

$scope.demo=false;
        };
        $scope.buyall = function () {
            $state.go("tabs.pay", {id: $stateParams.id});
            $ionicViewSwitcher.nextDirection("forward");
            var total = 0;
            if (productList.data.length != 0) {
                angular.forEach(productList.data, function (item) {
                    total += item.number * item.price;
                    console.log(item.id, total);

                    return false;
                })
            }

            $scope.total = total;
        };
        $scope.down = function (item) {
            if (item.number > 1) {
                item.number--;
            }

        };
        $scope.plus = function (item) {
            item.number++;
        };
        $scope.buy = function () {
            $state.go("tabs.pay", {id: $stateParams.id});
            angular.forEach(data.productList.shoplist, function (item) {
                if (item.id == $stateParams.id) {
                    $scope.buyit = item;
                }
                return false;
            })
        };

    })

    .filter('unique', function () {
        return function (collection, keyname) {
            var output = [],
                keys = [];
            angular.forEach(collection, function (item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });


            return output;
        }
    })


    .controller("scrollCtrl", function ($scope) {
        // 获得标题栏的高度
        var barHeight = 0;
        if (document.getElementsByTagName("ion-header-bar")[0]) {
            barHeight = document.getElementsByTagName("ion-header-bar")[0].clientHeight;
        }

        // ionScroll的高度，是窗口的总高度-标题栏的高度
        $scope.getHeight = function () {
            return parseInt(parseInt(window.innerHeight) - barHeight) + "px";
        };

        // ionScroll的宽度
        $scope.getWidth = function () {
            return parseInt(window.innerWidth) + "px";
        };

        // 获得所有页面的高度之和
        $scope.getTotalHeight = function () {
            return parseInt($scope.getHeight() * 3) + "px";
        };

        // 获得arror的left值
        $scope.getArrorLeft = function () {
            return parseInt(window.innerWidth / 2) - 20 + "px";
        };

        // 计算arror的top值
        $scope.getArrorTop = function () {
            return parseInt(window.innerHeight - 100) + "px";
        };


    })
    .directive('hideTabs', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                scope.$on('$ionicView.beforeEnter', function () {
                    scope.$watch(attributes.hideTabs, function (value) {
                        $rootScope.hideTabs = value;
                    });
                });

                scope.$on('$ionicView.beforeLeave', function () {
                    $rootScope.hideTabs = false;
                });
            }
        };
    });

/*路由*/


myapp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("tabs", {
            url: "/tabs",
            abstract: true,  // 抽象的-意思是不具体化，不真的显示它
            templateUrl: "views/tabs/tabs.html",

        })
        .state("tabs.home", {
            url: "/home",
            views: {
                "tab-home": {
                    templateUrl: "views/home/home.html",
                    controller: "homeCtrl"
                }
            }
        })
        .state("tabs.evaluation", {
            url: "/evaluation",
            views: {
                "tab-evaluation": {
                    templateUrl: "views/evaluation/evaluation.html",
                    controller: "evaluationCtrl"
                }
            }
        })
        .state("tabs.share", {
            url: "/share",
            abstract: true,
            views: {
                "tab-share": {
                    templateUrl: "views/share/share.html",
                    controller: "shareCtrl"
                }
            }
        })
        .state("tabs.share.community", {
            url: "/community",
            views: {
                "tab-community": {
                    templateUrl: "views/community/community.html",
                    controller: "communityCtrl"
                }
            }
        })
        .state("tabs.share.theme", {
            url: "/theme?id",
            views: {
                "tab-community": {
                    templateUrl: "views/theme/theme.html",
                    controller: "themeCtrl"
                }
            }
        })
        .state("tabs.share.commodity", {
            url: "/commodity",
            views: {
                "tab-commodity": {
                    templateUrl: "views/commodity/commodity.html",
                    controller: "commodityCtrl"

                }
            }
        })
        .state("tabs.share.shoplist", {
            url: "/shoplist?id",
            abstract: true,
            views: {
                "tab-commodity": {
                    templateUrl: "views/shoplist/shoplist.html",
                    controller: "productCtrl"
                }
            }
        }).state("tabs.share.shoplist.product", {
            url: "/product",
            views: {
                "tab-product": {
                    templateUrl: "views/product/product.html",
                    controller: "productCtrl"
                }
            }
        })
        .state("tabs.shopcard", {
            url: "/shopcard",
            views: {
                "tab-shopcard": {
                    templateUrl: "views/shopcard/shopcard.html",

                }
            }
        })
        .state("tabs.share.shoplist.productfeelback", {
            url: "/productfeelback",
            views: {
                "tab-productfeelback": {
                    templateUrl: "views/productfeelback/productfeelback.html",
                    controller: "productCtrl"
                }
            }
        })
        .state("tabs.share.shoplist.productdscb", {
            url: "/productdscb",
            views: {
                "tab-productdscb": {
                    templateUrl: "views/productdscb/productdscb.html",
                    controller: "productCtrl"
                }
            }
        })
        .state("tabs.evaluationtmplate", {
            url: "/evaluationtmplate?id",
            views: {
                "tab-evaluation": {
                    templateUrl: "views/evaluationtmplate/evaluationtmplate.html",
                    controller: "evaluationtmplateCtrl"
                }
            }
        })
        .state("tabs.pay", {
            url: "/pay",
            views: {
                "tab-shopcard": {
                    templateUrl: "views/pay/pay.html",
                    controller: "payCtrl"
                }
            }
        })
        .state("tour", {
            url: "/tour",
            templateUrl: "views/tour/tour.html",
            controller: "tourCtrl"
        });
    $urlRouterProvider.otherwise("/tour");

});

myapp.factory("productFactory", function ($http, $q) {
        return {
            query: function () {
                var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
                $http.get("data/data.json")
                    .success(function (data, status, headers, config) {
                        deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(data);   // 声明执行失败，即服务器返回错误
                    });
                return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
            } // end query
        };
    })

    // 使用工厂方法，创建的一个单例对象
    // 这个单例对象会被缓存
    .factory("dataFactory", function ($http) {
        var data = {productList: []};   // 一定要保存到对象中，不要直接保存到一个数组变量中
        $http.get("data/data.json").success(function (_data, status, headers, config) {
            data.productList = _data;// data.productList = _data;
        });
        return {
            query: function () {
                return data;   // 返回数据
            } // end query
        };
    })
/**/
