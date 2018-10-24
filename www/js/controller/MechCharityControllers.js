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
    //MECH基金会简介
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
  .controller('MechCharityActivityCtrl', function ($scope, $rootScope, $ionicPopup, $ionicModal,
    $state, $ionicHistory, commonServices, CacheFactory, alertService, UrlServices) 
  {
    //MECH基金会活动报名
    var baseInfo = commonServices.getBaseParas();

    function InitInfo() {
      var url = commonServices.getUrl("MechCharityService.ashx", "GetActList");
      var paras = {
        WorkdayNo: baseInfo.WorkdayNO
      };
      commonServices.submit(paras, url).then(function (resp) {
        if (resp) {
          if (resp.success) {
            $scope.items = resp.list;
          }
        } else {
          var msg = $rootScope.Language.common.CommunicationErr;
          alertService.showAlert(msg);
        }
      });
    }
    InitInfo();

    $scope.open = function(act) {
      if (act.Url && act.Url.length > 0) {
        //访问外链
        UrlServices.openForeignUrl(act.Url);
      } else if (act.ContentLen > 0) {
        //打开动态内容页
        var objDyn = {
          PageTitle: '活动详情',
          TabName: 'ESE_MechCharityActivity',
          SrcCol: 'Content',
          WhereColName: 'ID',
          WhereColVal: act.ID
        };
        CacheFactory.save(GLOBAL_INFO.KEY_DYNPAGE, JSON.stringify(objDyn));
        $state.go("dynpage");
      }
    };

    function checkValid(){
      var sTemp = $.trim($scope.modal.dat.MobileNo);
      $scope.modal.dat.MobileNo = sTemp;
      if (!sTemp || sTemp.length < 5) {
        alertService.showAlert("请提供联系电话!");
        return false;
      }

      var vsex = $scope.modal.dat.sex;
      if(!vsex){
        alertService.showAlert("请选择性别!");
        return false;
      }

      sTemp = $.trim($scope.modal.dat.email);
      $scope.modal.dat.email=sTemp;
      if(sTemp && sTemp.length && !ValidateEmail(sTemp)){
        alertService.showAlert("邮箱地址格式有误!");
        return false;
      }
      sTemp = $.trim($scope.modal.dat.manageEmail);
      $scope.modal.dat.manageEmail=sTemp;
      if(sTemp && sTemp.length && !ValidateEmail(sTemp)){
        alertService.showAlert("邮箱地址格式有误!");
        return false;
      }
      return true;
    }

    $scope.isSumbiting = false;
    $scope.SubmitAttend = function (params) {      
      if(!checkValid()){return;}
      $scope.isSumbiting = true;
      var paras = $.extend({}, baseInfo);
      paras.ActID = params.actID;
      paras.nsex = $scope.modal.dat.sex;
      paras.MailAddr = $scope.modal.dat.email;
      paras.MngMailAddr = $scope.modal.dat.manageEmail;
      paras.Fav = $scope.modal.dat.favourite;
      paras.PastAct = GetSelItems($scope.pastActTypes);
      paras.FreeTime = GetSelItems($scope.freeTimeTypes);

      var url = commonServices.getUrl("MechCharityService.ashx", "ActBook");
      try {
        commonServices.submit(paras, url).then(function (resp) {
          if (resp) {
            var msg = resp.message;
            alertService.showAlert(msg);
            $scope.closeModal();
            //$ionicHistory.goBack();
          } else {
            var msg = $rootScope.Language.common.CommunicationErr;
            alertService.showAlert(msg);
            $ionicHistory.goBack();
          }
        });
      } finally {
        $scope.isSumbiting = false;
      }
    };

    $scope.pastActTypes = [
      {name:"敬老活动自愿", check:false},
      {name:"环保行动自愿", check:false},
      {name:"文体活动后勤自愿", check:false},
      {name:"亲子活动后勤自愿", check:false}
    ];
    $scope.freeTimeTypes = [
      {name:"周末", check:false},
      {name:"晚上加班时间", check:false},
      {name:"工作日", check:false}
    ];
    function GetSelItems(arr){
      var keys=[];
      for(var i=0; i<arr.length; i++){
          if(arr[i].check){
              keys.push(arr[i].name);
          }
      }
      return keys.join(";");
  };

    BindSubmitModal($scope, $ionicModal, 'submitForm.html', baseInfo);
    $scope.Submit = function (actID) {
      var para = {
        'actID':actID
      };
      $scope.openModal(para);
    };    

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