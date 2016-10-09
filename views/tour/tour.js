angular.module("myapp")
    .controller("tourCtrl", function ($scope,$ionicSlideBoxDelegate,$state) {

        $scope.config={enter:false}
        $scope.onSlideChanged=function(){
            if($ionicSlideBoxDelegate.currentIndex()==$ionicSlideBoxDelegate.slidesCount()-1){
                $scope.config.enter=true;
                $state.go("tabs.home")
            }else {
                $scope.config.enter=false;
            }
        }





    })