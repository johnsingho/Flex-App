/**
 * 用于工会及相关子菜单
 * johnsing he 2018-09-11
 */
angular.module('evaluationApp.unionControllers', [])
    .controller('UnionCtrl', function ($scope, $rootScope, $state, $ionicHistory,$ionicPopup,
        commonServices, CacheFactory, alertService, actionVisitServices, UrlServices) 
    {
        $scope.canUseAction = function (action) {
            return actionVisitServices.canUseAction(action, $rootScope.accessEmployee.WorkdayNO);
        };        

        $scope.open = function (action) {
            switch (action) {
              case "员工沟通":
                $state.go("union_commu");
                break;
              case "员工福利":
                $state.go('union_welfare');
                break;
              case "工会活动及报名":
                $state.go('union_activity');
                break;
              case "员工帮扶":
                $state.go('union_helpsupport');
                break;
              case "精彩瞬间":
                $state.go('union_wonderfulmoment');
                break;
              default:
                break;
            }
        }
        $scope.closePass = function () {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }

    })
    /*sub of UnionCtrl*/
    .controller('UnionCommuCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory)
    {
        $scope.open = function (action) {
            switch (action) {
              case "热线号码":
                $state.go("union_commu_hotline");
                break;
              case "其他沟通渠道":
                $state.go("union_commu_other");
                break;
              default:
                break;
            }
        }

    })
    .controller('CommuOtherCtrl',function($scope,$state,$ionicHistory,commonServices,UrlServices)
    {
        //其他沟通渠道
        $scope.openCanteenFeedback = function(){
            UrlServices.openForeignUrl('https://www.wjx.top/jq/18783879.aspx');
        };

        $("#auto-loop").lightGallery({
            mobileSrc         : false, // If "data-responsive-src" attr. should be used for mobiles.
            mobileSrcMaxWidth : 640,   // Max screen resolution for alternative images to be loaded for.
            swipeThreshold    : 50,    // How far user must swipe for the next/prev image (in px).
            hideControlOnEnd : false,
            closable:false
        });
    })    
    .controller('UnionWelfareCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory)
    {
        $scope.open = function (action) {
            switch (action) {
              case "年节福利":
                $state.go("union_welfare_fest");
                break;
              case "工会福利汇":
                $state.go("union_welfare_union");
                break;
              case "斗门工公众号福利汇":
                $state.go("union_welfare_dmUnion");
                break;
              case "领取通知":
                $state.go("union_welfare_notice");
                break;
              default:
                break;
            }
        }

    })
    .controller('UnionWelfareDMCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory,UrlServices)
    {
        $scope.open = function (action) {
            switch (action) {
              case "往期福利":
                $state.go("union_welfare_dm_his");
                break;
              case "关注指南":
                $state.go("union_welfare_dm_guide");
                break;
              case "幸运抽奖":
                UrlServices.openForeignUrl('https://www.wjx.top/jq/21587410.aspx');
              default:
                break;
            }
        }
    })
    

;    