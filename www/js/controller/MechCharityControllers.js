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
        case "员工沟通":
          $state.go("union_commu");
          break;
        case "员工福利":
          $state.go('union_welfare');
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

  ///////////////////////////////////////
  ;