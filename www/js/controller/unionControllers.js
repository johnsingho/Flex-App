/**
 * 用于工会及相关子菜单
 * johnsing he 2018-09-11
 */
angular.module('evaluationApp.unionControllers', [])
  .controller('UnionCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
    commonServices, CacheFactory, alertService, actionVisitServices) {
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
        case "建议留言":
          $state.go('union_suggest');
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
  .controller('UnionCommuCtrl', function ($scope, $state, $ionicHistory, commonServices, CacheFactory) {
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
  .controller('CommuOtherCtrl', function ($scope, $state, $ionicHistory, commonServices, UrlServices) {
    //其他沟通渠道
    $scope.openCanteenFeedback = function () {
      UrlServices.openForeignUrl('https://www.wjx.top/jq/18783879.aspx');
    };

    $scope.contacts = [{
        building: "Mechanical",
        basePeople: "Iris Jin",
        baseEmail: "iris.jin@flex.com",
        basePhone: "5187155"
      },
      {
        building: "PCBA-South Campus",
        basePeople: "Minhua Lu",
        baseEmail: "minhua.lu@flex.com",
        basePhone: "5186714"
      },
      {
        building: "PCBA-B11",
        basePeople: "Willa Wan",
        baseEmail: "willa.wan@flex.com",
        basePhone: "5183394"
      },
      {
        building: "CR&RR",
        basePeople: "Ellis Zhou",
        baseEmail: "ellis.zhou@flex.com",
        basePhone: "5189889"
      }
    ];

    $("#auto-loop").lightGallery({
      mobileSrc: false, // If "data-responsive-src" attr. should be used for mobiles.
      mobileSrcMaxWidth: 640, // Max screen resolution for alternative images to be loaded for.
      swipeThreshold: 50, // How far user must swipe for the next/prev image (in px).
      hideControlOnEnd: false,
      closable: false
    });
  })
  .controller('UnionWelfareCtrl', function ($scope, $state, $ionicHistory, commonServices, CacheFactory) {
    //员工福利
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
  .controller('UnionWelfareFestCtrl', function ($scope, $state, $ionicHistory) {
    //年节福利
    $scope.Items = [{
        welfare: "餐厅赠餐",
        target: "全体员工",
        detail: "春节、元宵节、端午节、中秋节在各餐厅赠餐（饺子/汤圆/粽子）",
        date: "节日当天"
      },
      {
        welfare: "生日红包",
        target: "全体员工",
        detail: "生日礼金60元（生日当月转至工资卡）",
        date: "每月"
      },
      {
        welfare: "端午节礼包",
        target: "全体员工",
        detail: "端午礼包一份",
        date: "节前一周"
      },
      {
        welfare: "夏送清凉",
        target: "全体员工",
        detail: "全园送凉茶，每月每人2罐，发放3个月",
        date: "7月-9月"
      },
      {
        welfare: "中秋节礼包",
        target: "全体员工",
        detail: "中秋大礼包一份",
        date: "节前一周"
      },
      {
        welfare: "开工红包",
        target: "全体员工",
        detail: "开工红包50元（转至工资卡）",
        date: "春节后开工之月"
      }
    ];
  })
  .controller('UnionWelfareDMCtrl', function ($scope, $state, $ionicHistory, commonServices, CacheFactory, UrlServices) {
    //斗门工公众号福利汇
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
  .controller('UnionHelpSupportCtrl', function ($scope, $state, $ionicHistory, commonServices, CacheFactory) {
    //员工帮扶
    $scope.open = function (action) {
      switch (action) {
        case "公司爱心帮扶":
          $state.go("union_helpSupport_flex");
          break;
        case "斗门总工会帮扶":
          $state.go("union_helpSupport_dm");
          break;
        case "联系方式":
          $state.go("union_helpSupport_contact");
          break;
        default:
          break;
      }
    }
  })
  .controller('UnionHelpSupportFlexCtrl', function ($scope, $state, $ionicHistory) {
    //公司爱心帮扶
    $scope.helps = [{
        ItemName: "死亡",
        Object: "职工本人",
        Memo: "一次性"
      },
      {
        ItemName: "死亡",
        Object: "配偶",
        Memo: "一次性"
      },
      {
        ItemName: "重大疾病",
        Object: "职工本人",
        Memo: "一次性"
      },
      {
        ItemName: "重大疾病",
        Object: "配偶或子女",
        Memo: "一次性"
      },
      {
        ItemName: "重大疾病",
        Object: "父母",
        Memo: "一次性"
      },
      {
        ItemName: "工伤住院",
        Object: "职工本人",
        Memo: "一次性"
      },
      {
        ItemName: "生活困难",
        Object: "一人收入照顾全家（家庭成员非主动失业且人均收入低于本地区最低生活保障线）",
        Memo: "一次性"
      },
      {
        ItemName: "灾难救助",
        Object: "职工本人",
        Memo: "一次性"
      }
    ];

    $scope.projHelps = [{
        ItemName: "阳光助学",
        Object: "职工子女",
        Memo: "不与金秋助学重复申领，不限户籍"
      },
      {
        ItemName: "金秋助学补充项目",
        Object: "职工子女",
        Memo: ""
      }
    ];
  })
  .controller('UnionHelpSupportContactCtrl', function ($scope, $state, $ionicHistory) {
    //爱心帮扶联系方式
    $scope.contacts = [{
        Building: "CR & RR",
        hrPeople: "Ellis Zhou",
        hrPhone: "5188777",
        basePeople: "Mingzhan Jia",
        basePhone: "5181699"
      },
      {
        Building: "Mechanical",
        hrPeople: "Boswell Jin",
        hrPhone: "5181017",
        basePeople: "Sirong He",
        basePhone: "5189160"
      },
      {
        Building: "PCBA-B11",
        hrPeople: "Sandy Liu",
        hrPhone: "5183914",
        basePeople: "Willa Wan",
        basePhone: "5183394"
      },
      {
        Building: "PCBA-South Campus",
        hrPeople: "Aaron Guo",
        hrPhone: "5186026",
        basePeople: "Minhua Lu",
        basePhone: "5186714"
      },
    ];
  })
  .controller('UnionActivityCtrl', function ($scope, $rootScope, $ionicPopup,
    $state, $ionicHistory, commonServices, CacheFactory, alertService, UrlServices) {
    //工会活动及报名
    var baseInfo = commonServices.getBaseParas();

    function InitInfo() {
      var url = commonServices.getUrl("UnionService.ashx", "GetActList");
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

    $scope.open = function (act) {
      if (act.Url && act.Url.length > 0) {
        //访问外链
        UrlServices.openForeignUrl(act.Url);
      } else if (act.ContentLen > 0) {
        //打开动态内容页
        var objDyn = {
          PageTitle: '活动详情',
          TabName: 'ESE_UnionActivity',
          SrcCol: 'Content',
          WhereColName: 'ID',
          WhereColVal: act.ID
        };
        CacheFactory.save(GLOBAL_INFO.KEY_DYNPAGE, JSON.stringify(objDyn));
        $state.go("dynpage");
      }
    };

    $scope.isSumbiting = false;

    function SubmitAttend(actID) {
      $scope.isSumbiting = true;
      var paras = baseInfo;
      paras.ActID = actID;
      var url = commonServices.getUrl("UnionService.ashx", "ActBook");
      try {
        commonServices.submit(paras, url).then(function (resp) {
          if (resp) {
            var msg = resp.message;
            alertService.showAlert(msg);
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
    }

    $scope.Submit = function (actID) {
      $ionicPopup.confirm({
        title: '提示',
        template: '确定报名吗？',
        okText: "OK"
      }).then(function (res) {
        if (res) {
          SubmitAttend(actID);
        }
      });
    };

  })
  .controller('UnionWonderfulmomentCtrl', function ($scope, $rootScope, $ionicPopup,
    $state, $ionicHistory, commonServices, CacheFactory, alertService, UrlServices) {
    //精彩瞬间
    var baseInfo = commonServices.getBaseParas();

    function InitInfo() {
      var url = commonServices.getUrl("UnionService.ashx", "GetWonderfulMomList");
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

    $scope.open = function (item) {
      if (item.IsOutLink) {
        UrlServices.openForeignUrl(item.Html);
        return;
      }
      CacheFactory.save(GLOBAL_INFO.KEY_WONDERFULMON_ID, item.ID);
      $state.go('union_wonderfulmoment_detail');
    };
  })
  .controller('UnionWonderfulmomentDetailCtrl', function ($scope, $rootScope, $ionicPopup, $ionicModal,
    $state, $ionicHistory, commonServices, CacheFactory, alertService, duplicateSubmitServices) {
    //精彩瞬间 详细
    var wonderfulMomID = CacheFactory.get(GLOBAL_INFO.KEY_WONDERFULMON_ID);
    var baseInfo = commonServices.getBaseParas();

    function InitInfo() {
      var url = commonServices.getUrl("UnionService.ashx", "GetWonderfulMomDetail");
      var paras = {
        "WonderfulMomID": wonderfulMomID
      };
      commonServices.submit(paras, url).then(function (resp) {
        if (resp) {
          if (!resp.success) {
            var msg = $rootScope.Language.common.CommunicationErr;
            alertService.showAlert(msg);
            $ionicHistory.goBack();
          } else {
            $scope.ret = resp.obj;
            $('#div_html').html(resp.obj.Html);
          }
        }
      });
    }
    InitInfo();

    $scope.like = function () {
      var paras = {
        //"SubmitGuid": duplicateSubmitServices.genGUID(),
        "WonderfulMomID": wonderfulMomID,
        "WorkdayNo": baseInfo.WorkdayNO,
      };
      var url = commonServices.getUrl("UnionService.ashx", "AddLike");
      commonServices.submit(paras, url).then(function (data) {
        if (data.success) {
          $scope.ret.LikeCount = $scope.ret.LikeCount + 1;
        }
      });
    };

    $ionicModal.fromTemplateUrl('templates/modalWriteMsg.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal
    })
    $scope.writeMsg = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.submitComment = function () {
      var Comments = $("#Comments").val();
      if (Comments.length == 0) {
        console.log(Comments);
        return;
      }

      var para = {
        "SubmitGuid": duplicateSubmitServices.genGUID(),
        "WonderfulMomID": wonderfulMomID,
        "WorkdayNo": baseInfo.WorkdayNO,
        "Comments": Comments
      };

      var url = commonServices.getUrl("UnionService.ashx", "AddWonderfulMomComments");
      commonServices.submit(para, url).then(function (data) {
        if (data.success) {
          $scope.modal.hide();
          InitInfo(); //refresh
        } else {
          alertService.showAlert(data.message);
        }
      });
    };

  })
  .controller('UnionSuggestCtrl', function ($scope, $rootScope, $ionicPopup,
    $state, $ionicHistory, commonServices) {
    //建议留言
    $scope.open = function (action) {
      switch (action) {
        case "我的留言":
          $state.go("union_suggest_my");
          break;
        case "留言公开":
          $state.go("union_suggest_open");
          break;
        default:
          break;
      }
    };
  })
  .controller('UnionSuggestMyCtrl', function ($scope, $rootScope, $ionicPopup,
        $state, $ionicHistory, commonServices, alertService, duplicateSubmitServices) 
  {
    //我的留言
    var baseInfo = commonServices.getBaseParas();
    $scope.hisSuggest = [];

    function InitInfo() {
      var url = commonServices.getUrl("UnionService.ashx", "GetMySuggest");
      var paras = {
        WorkdayNO: baseInfo.WorkdayNO
      };
      commonServices.submit(paras, url).then(function (resp) {
        if (resp) {
          if (resp.success) {
            $scope.hisSuggest = resp.list;
          }
        }
      });
    }
    InitInfo();

    $scope.model = {
      SubmitGuid: duplicateSubmitServices.genGUID(),
      CName: baseInfo.CName,
      WorkdayNO: baseInfo.WorkdayNO,
      MobileNo: baseInfo.MobileNo,
      Suggest: ""
    };
    $scope.GetSuggest = function () {
      var txt = $.trim($scope.model.Suggest);
      return txt;
    };

    $scope.isSumbiting = false;
    $scope.Submit = function () {
      $scope.isSumbiting = true;
      var sugg = $scope.GetSuggest();
      if (sugg.length < 3) {
        alertService.showAlert("请填写你的建议!");
        $scope.isSumbiting = false;
        return;
      }

      $scope.model.Suggest = sugg;
      var paras = $scope.model;
      var url = commonServices.getUrl("UnionService.ashx", "SubmitMySuggest");
      try {
        commonServices.submit(paras, url).then(function (resp) {
          if (resp.success) {
            var msg = $rootScope.Language.dormManage.suggestSucc;
            alertService.showAlert(msg);
            //$ionicHistory.goBack();
            InitInfo(); //refresh
          } else {
            alertService.showAlert(resp.message);
            $ionicHistory.goBack();
          }
        });
      } finally {
        $scope.isSumbiting = false;
      }
    };
  })
  .controller('UnionSuggestOpenCtrl', function ($scope, $rootScope, $ionicPopup,
        $state, $ionicHistory, commonServices, CacheFactory) 
  {
    //留言公开
    //var baseInfo = commonServices.getBaseParas();
    function InitInfo() {
      var url = commonServices.getUrl("UnionService.ashx", "GetOpenSuggest");
      var paras = {};
      commonServices.submit(paras, url).then(function (resp) {
        if (resp) {
          if (resp.success) {
            $scope.items = resp.list;
          }
        }
      });
    }
    InitInfo();

    $scope.open = function (suggID) {
      CacheFactory.save(GLOBAL_INFO.KEY_UNION_SUGGOPEN_ID, suggID);
      $state.go('union_suggest_openDetail');
    };
  })
  .controller('UnionSuggestOpenDetailCtrl', function ($scope, commonServices, CacheFactory) 
 {
    //留言公开 详情
    var suggID = CacheFactory.get(GLOBAL_INFO.KEY_UNION_SUGGOPEN_ID);
    //var baseInfo = commonServices.getBaseParas();
    function InitInfo() {
      var url = commonServices.getUrl("UnionService.ashx", "GetOpenSuggestDetail");
      var paras = {suggID: suggID};
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