/**
 * Created by dmneeoll on 2016/6/4.
 */
var module = angular.module('evaluationApp.directives', []);
module.directive('hideTabs',function($rootScope) {
    return {
        restrict:'AE',
        link:function($scope){
            $rootScope.hideTabs = 'tabs-item-hide';
            $scope.$on('$destroy',function(){
                $rootScope.hideTabs = '';
            })
        }
    };
})