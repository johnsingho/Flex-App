/**
 * 用于Admin及相关子菜单
 * johnsing he 2018-06-29
 */

angular.module('evaluationApp.adminControllers', [])
    .controller('AdminCtrl', function ($scope, $rootScope, $state, $ionicHistory,
        commonServices, CacheFactory, alertService, actionVisitServices) {
        //! temp for test
        $scope.canUseAction = function (action) {
            return actionVisitServices.canUseAction(action, $rootScope.accessEmployee.WorkdayNO);
        };

        $scope.open = function (action) {
            switch (action) {
                case "icCardLost":
                    $state.go('icCardLost');
                    break;
                case "dormManage":
                    $state.go('dormManage');
                    break;
                default: break;
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
    /*sub of AdminCtrl*/
    .controller('ICCardLostCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
        commonServices, CacheFactory, alertService) {
        //挂失IC卡
        $scope.canUseAction = function (action) {
            return actionVisitServices.canUseAction(action, $rootScope.accessEmployee.WorkdayNO);
        };

        var paras = commonServices.getBaseParas();
        $scope.model = {
            CName: paras.CName,
            WorkdayNO: paras.WorkdayNO,
            MobileNo: paras.MobileNo,
            IDNO: null
        };

        function GetLastLostICCardState() {
            var paras = $scope.model;
            var url = commonServices.getUrl("AdminService.ashx", "GetLastLostICCardState");
            commonServices.submit(paras, url).then(function (resp) {
                if (resp) {
                    $scope.LastState = resp.obj; //{upDATEdt, upDATEflag}
                    switch (resp.obj.upDATEflag) {
                        case 1:
                            $scope.LastState.State = '正在执行中';
                            $scope.canSubmit = false;
                            break;
                        case 99:
                            $scope.LastState.State = '已完成';
                            $scope.canSubmit = true;
                            break;
                        default:
                            $scope.LastState.State = null;
                            $scope.canSubmit = true;
                            break;
                    }
                }
            });
        }

        GetLastLostICCardState();
        $scope.HasLastState = function () {
            return $scope.LastState && $scope.LastState.State;
        }

        $scope.isSumbiting = false;
        $scope.Submit = function () {
            $scope.isSumbiting = true;

            var idno = $.trim($scope.model.IDNO);
            if (idno.length == 18) {
                if (!CheckIdCard(idno)) {
                    alertService.showAlert("身份证号码有误，请更正!");
                    return;
                }
            }

            $scope.model.IDNO = idno;
            var confirmPopup = $ionicPopup.confirm({
                title: $rootScope.Language.admin.promptTitle,
                template: $rootScope.Language.admin.promptReportLost,
                okText: $rootScope.Language.admin.promptOK,
                cancelText: $rootScope.Language.admin.promptCancel
            });

            confirmPopup.then(function (res) {
                if (res) {
                    var paras = $scope.model;
                    var url = commonServices.getUrl("AdminService.ashx", "SubmitLostICCard");
                    commonServices.submit(paras, url).then(function (data) {
                        if (data.success) {
                            alertService.showAlert($rootScope.Language.admin.submitSucc);
                            $ionicHistory.goBack();
                        }
                        else {
                            alertService.showAlert(data.message);
                        }
                    });
                }
                $scope.isSumbiting = false;
            });
        };

        $scope.closePass = function () {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        };
    })
    .controller('DormManageCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
                commonServices, CacheFactory, alertService, actionVisitServices) 
    {        
        //宿舍管理
        $scope.canUseAction = function (action) {
            return actionVisitServices.canUseAction(action, $rootScope.accessEmployee.WorkdayNO);
        };

        $scope.open=function(action){
            switch (action) {
                case "住房津贴":
                    $state.go('housingAllowance');
                    break;
                case "宿舍申请":
                    {
                        $state.go('applyDorm');
                        //!test
                        // var myPopup = $ionicPopup.show({
                        //     title: 'Flex入住宿舍承诺书',
                        //     cssClass: 'my-custom-popup-Alter',
                        //     templateUrl: 'templates/admin/dorm/protocolDorm.html',
                        //     scope: $scope,
                        //     buttons: [
                        //         {
                        //             text: '<b>我愿意遵守</b>',
                        //             type: 'button-positive',
                        //             onTap: function (e) {
                        //                 $state.go('applyDorm');
                        //                 return;
                        //             }
                        //         }
                        //     ]
                        // });
                    }
                    break;
                case "费用查询":
                    {
                        $state.go('chargingDefine');
                    }
                    break;
                case "宿舍公告":
                    $state.go('housingAllowance');
                    break;
                case "宿舍地图":
                    $state.go('housingAllowance');
                    break;
                case "宿舍报修":
                    $state.go('housingAllowance');
                    break;
                case "补办钥匙":
                    $state.go('housingAllowance');
                    break;
                case "免费WIFI申请":
                    $state.go('housingAllowance');
                    break;
                case "宿舍常见问题":
                    $state.go('housingAllowance');
                    break;
                case "建议箱":
                    $state.go('housingAllowance');
                    break;
                default: break;
            }
        }
        $scope.closePass = function () {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        };
    })
    .controller('HousingAllowanceCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
        commonServices, CacheFactory, alertService) 
    {
        //住房津贴
        var paras= commonServices.getBaseParas();
        $scope.canSubmit=false;
        $scope.model = {
            CName: paras.CName,
            WorkdayNO: paras.WorkdayNO,
            Organization: paras.Organization,
            hiredDate: null,
            EmployeeType: null,
            checkInState: null,
            checkOutDate: "",
            memo: ""
        };

        $scope.dormStates = [
            {name:"未住宿舍", value:0},
            {name:"住宿", value:1},
            {name:"退宿", value:-1},
        ];
        function GetEmpDate() {
            var url = commonServices.getUrl("DormManageService.ashx", "GetEmpDate");
            commonServices.submit(paras, url).then(function (resp) {
                if (resp) {
                    if(!resp.success){
                        alertService.showAlert(resp.message);
                        $ionicHistory.goBack();
                    }else{                        
                        $scope.model.hiredDate = resp.obj.HireDate;
                        $scope.model.EmployeeType = resp.obj.EmployeeType;
                        var checkInState = resp.obj.CheckInState
                        if(checkInState<0){
                            $scope.model.checkOutDate = resp.obj.CheckOutDate;
                        }
                        $scope.model.checkInState = checkInState;

                        $scope.canSubmit=true;
                    }
                }
            });
        }
        GetEmpDate();

        $scope.isSumbiting = false;
        $scope.Submit = function () {
            $scope.isSumbiting = true;

            if (1 == $scope.model.checkInState) {
                alertService.showAlert("已住宿员工不能申请住房津贴!");
                $scope.isSumbiting = false;
                return;
            }
            else if (-1 == $scope.model.checkInState
                    && 0 == $scope.model.checkOutDate.length) {
                alertService.showAlert("请填写退宿日期!");
                $scope.isSumbiting = false;
                return;     
            }

            var paras = $scope.model;
            var url = commonServices.getUrl("DormManageService.ashx", "SubmitHousingAllowance");
            try {
                commonServices.submit(paras, url).then(function (resp) {
                    if (resp.success) {
                        var msg = $rootScope.Language.dormManage.allowanceSucc + resp.message;
                        alertService.showAlert(msg);
                        $ionicHistory.goBack();
                    }
                    else {
                        alertService.showAlert(resp.message);
                    }
                });
            } finally {
                $scope.isSumbiting = false;
            }
        };
    })
    .controller('ApplyDormCtrl', function ($scope, $rootScope, $state, $ionicHistory, 
                                            commonServices, CacheFactory, alertService) 
    {
        //宿舍申请
        var paras = commonServices.getBaseParas();
        $scope.canSubmit = false;
        $scope.model = {
            CName: paras.CName,
            WorkdayNO: paras.WorkdayNO,
            MobileNo: paras.MobileNo,
            Organization: paras.Organization,
            Grade: null,
            DormArea: null,
            RequireType:null,
            RequireReason:"就近工作需要",
            HasHousingAllowance:null,
            memo: ""
        };

        function InitInfo() {
            var grades=[];
            for(var i=0;i<25;i++){
                grades.push(i+1);
            }
            $scope.grades=grades;
            $scope.requireTypes=[];
            $scope.requireTypes.push({name:"新入住",value:1});
            $scope.requireTypes.push({name:"复入住",value:2});
            $scope.requireTypes.push({name:"调房",value:3});

            var yesNo=[];
            yesNo.push({name:"是",value:true});
            yesNo.push({name:"否",value:false});
            $scope.yesNo=yesNo;

            var url = commonServices.getUrl("DormManageService.ashx", "GetDormArea");
            commonServices.submit(paras, url).then(function (resp) {
                if (resp) {
                    if(!resp.success){
                        alertService.showAlert("获取宿舍区失败，无法申请");
                        $ionicHistory.goBack();
                    }else{                        
                        $scope.dormAreas = resp.list; //ID,SiteID,Name
                        $scope.canSubmit=true;
                    }
                }
            });
        }
        InitInfo();

        $scope.isSumbiting = false;
        $scope.Submit = function () {
            $scope.isSumbiting = true;

            var sMobile = $.trim($scope.model.MobileNo);
            $scope.model.MobileNo=sMobile;
            if (!sMobile || sMobile.length<5) {
                alertService.showAlert("请提供联系电话!");
                $scope.isSumbiting = false;
                return;
            }            
            if (!$scope.model.Grade) {
                alertService.showAlert("请提供你的薪资级别!");
                $scope.isSumbiting = false;
                return;     
            }
            if (!$scope.model.DormArea) {
                alertService.showAlert("请选择拟入住的宿舍区!");
                $scope.isSumbiting = false;
                return;     
            }
            if (!$scope.model.RequireType) {
                alertService.showAlert("请选择入住类型!");
                $scope.isSumbiting = false;
                return;     
            }
            if (null===$scope.model.HasHousingAllowance) {
                alertService.showAlert("是否正在享有住房补贴?");
                $scope.isSumbiting = false;
                return;     
            }
            if(!$scope.model.RequireReason || $scope.model.RequireReason.length<0){
                alertService.showAlert("请填写入住理由!");
                $scope.isSumbiting = false;
                return; 
            }

            var paras = $scope.model;
            var url = commonServices.getUrl("DormManageService.ashx", "SubmitApplyDorm");
            try {
                commonServices.submit(paras, url).then(function (resp) {
                    if (resp.success) {
                        var msg = $rootScope.Language.dormManage.applyDormSucc;
                        alertService.showAlert(msg);
                        $ionicHistory.goBack();
                    }
                    else {
                        alertService.showAlert(resp.message);
                        $ionicHistory.goBack();
                    }
                });
            } finally {
                $scope.isSumbiting = false;
            }
        };
    })
    .controller('ChargingDefineCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
                                                commonServices, CacheFactory, alertService) 
    {
        //费用查询
        var paras= commonServices.getBaseParas();
        $scope.canSubmit=false;
        


    })

;