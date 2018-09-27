/**
 * 用于测试
 * johnsing he 2018-09-20
 */
angular.module('evaluationApp.testControllers', [])
  .controller('TestPageCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
                                      commonServices, CacheFactory, alertService, 
                                      actionVisitServices, UrlServices, PicServices) 
  {
    // $scope.canUseAction = function (action) {
    //   return actionVisitServices.canUseAction(action, $rootScope.accessEmployee.WorkdayNO);
    // };
    $scope.closePass = function () {
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $state.go('tab.home');
      }  

    $scope.imgs = [];
    $scope.SelPic = function(bCamera){
        PicServices.selectImage(function(pic){
            PicServices.resizeImage(1024, pic, function(sdata){
                $scope.imgs.push(sdata);
            });
        }, bCamera);
    };

    var Reset=function(){
        $scope.imgs=[];
        $("#images").empty();
    };
    Reset();
    $scope.Reset=Reset;

    $scope.HasImgs = function(){
        return $scope.imgs.length > 0;
    };

    $scope.doUpload = function(){
        alertService.showOperating('Processing...');
        var url = commonServices.getUrl("UploadService.ashx","");
        UrlServices.uploadImages('testUpload', '我的测试', $scope.imgs, url, function(resp){
            alertService.hideOperating();
            if(resp){
                if(resp.success){
                    alert("success, batch no=" + resp.obj);
                }else{
                    alert("failed, " + resp.message);
                }
            }else{
                alert("Failed!");
            }
        });
    };


  })

