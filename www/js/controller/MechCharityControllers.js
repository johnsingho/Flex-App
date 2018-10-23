/**
 * 用于工会及相关子菜单
 * johnsing he 2018-10-22
 */
angular.module('evaluationApp.mechCharityControllers', [])
  .controller('MechCharityCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
    commonServices, CacheFactory, alertService, actionVisitServices) 
{
    $scope.canUseAction = function (action) {
      return actionVisitServices.canUseAction(action, $rootScope.accessEmployee.WorkdayNO);
    };

    $scope.open = function (action) {
      switch (action) {
        case "MECH基金会简介":
          $state.go("mechCharity_introduce");
          break;
        case "MECH基金会活动报名":
          $state.go('mechCharity_activity');
          break;
        case "MECH基金会活动报道":
          $state.go('mechCharity_wonderfulMoment');
          break;
        case "MECH基金会账务公示":
          $state.go('mechCharity_accountingPublic');
          break;
        case "MECH基金会问卷调查":
          $state.go('mechCharity_research');
          break;
        default:
          break;
      }
    };
    $scope.closePass = function () {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('tab.home');
    };

  })
  .controller('MechCharityIntroduceCtrl', function($scope, $rootScope, $state, $ionicHistory, commonServices, CacheFactory, alertService)
  {
    //MECH基金会简介 详情
    $scope.open = function (action) {
      switch (action) {
        case "简介":
          $state.go("mechCharity_introduce_detail");
          break;
        case "组织架构":
          $state.go('mechCharity_introduce_arch');
          break;
        case "项目体系":
          $state.go('mechCharity_introduce_proj');
          break;
        default:
          break;
      }
    };

  })
  .controller('MechCharityActivityCtrl', function($scope, $rootScope, $state, $ionicHistory, commonServices, CacheFactory, alertService)
  {
    //MECH基金会活动报名 详情

    function InitInfo() {
      var url = commonServices.getUrl("UnionService.ashx", "GetOpenSuggestDetail");
      var paras = {
        suggID: suggID
      };
      commonServices.submit(paras, url).then(function (resp) {
        if (resp) {
          if (resp.success) {
            $scope.item = resp.obj;
          }
        }
      });
    }
    InitInfo();
  })
  .controller('MechCharityWonderfulMomentCtrl', function($scope, $rootScope, $state, $ionicHistory, commonServices, CacheFactory, alertService)
  {
    //MECH基金会活动报道 详情

    function InitInfo() {
      var url = commonServices.getUrl("UnionService.ashx", "GetOpenSuggestDetail");
      var paras = {
        suggID: suggID
      };
      commonServices.submit(paras, url).then(function (resp) {
        if (resp) {
          if (resp.success) {
            $scope.item = resp.obj;
          }
        }
      });
    }
    InitInfo();
  })
  .controller('MechCharityAccountingPublicCtrl', function($scope, $rootScope, $state, $ionicHistory, commonServices, CacheFactory, alertService)
  {
    //MECH基金会账务公示 详情

    function InitInfo() {
      var url = commonServices.getUrl("UnionService.ashx", "GetOpenSuggestDetail");
      var paras = {
        suggID: suggID
      };
      commonServices.submit(paras, url).then(function (resp) {
        if (resp) {
          if (resp.success) {
            $scope.item = resp.obj;
          }
        }
      });
    }
    InitInfo();
  })
  .controller('MechCharityResearchCtrl', function($scope, $rootScope, $state, $ionicHistory, commonServices, CacheFactory, alertService)
  {
    //MECH基金会问卷调查 详情

    function InitInfo() {
      var url = commonServices.getUrl("UnionService.ashx", "GetOpenSuggestDetail");
      var paras = {
        suggID: suggID
      };
      commonServices.submit(paras, url).then(function (resp) {
        if (resp) {
          if (resp.success) {
            $scope.item = resp.obj;
          }
        }
      });
    }
    InitInfo();
  })

  ///////////////////////////////////////
  ;