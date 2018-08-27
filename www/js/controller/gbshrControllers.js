/**
 * 用于人事综合及相关子菜单
 * 2018-07-11 johnsing he 整理
 */
angular.module('evaluationApp.gbshrControllers', [])
    .controller('GBSListCtrl', function ($scope, $rootScope, $state, $ionicHistory, 
                                        commonServices, CacheFactory, alertService, externalLinksService,actionVisitServices) 
    {
        $scope.canUseAction = function (action) {
            return actionVisitServices.canUseAction(action, $rootScope.accessEmployee.WorkdayNO);
        };

        $scope.open = function (action) {
            switch (action) {
                case "KQAbnormal":
                    $state.go('kqyc');
                    break;
                case "Certificate":
                    $state.go('certificate');
                    break;
                case "员工手册":
                    $state.go("handbook_lg");
                    break;
                case "LTP":
                    try {
                        externalLinksService.openUr('https://appcenter.flextronics.com/GMIS/Template/LTPPasswordReset_Mobile.html');
                    }
                    catch (ex) {
                        alertService.showAlert(ex.message);
                    }
                    break;
                case "保险":
                    $state.go("insurance");
                    break;                    
                case "菜鸟手册":
                    $state.go("basicGuide");
                    break;
                case "社会保险":
                case "公积金信息":
                    CacheFactory.remove('gnAction');
                    CacheFactory.save('gnAction', action);
                    $state.go("generalNotice");
                    break;
                case "离职须知":
                    $state.go("employeeDismiss");
                    break;
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
    .controller('CertificateCtrl', function ($scope, $rootScope, $state, CacheFactory) {
        var accessEmployee = $rootScope.accessEmployee;
        //var bTestAccount = IsTestAccount(accessEmployee.WorkdayNO);
        //屏蔽multek
        //var bIsNotMultek = accessEmployee.Organization.toLowerCase().indexOf("multek")<0;
        $scope.canShow = !isMultek(accessEmployee.Organization);

        $scope.open = function (action) {
            switch (action) {
                case "visaApply":
                    $state.go('visaApply');
                    break;
                case "CP": /*厂牌补办*/
                    $state.go('reissueWorkingCard');
                    break;
                default:
                    CacheFactory.save('action', action);
                    $state.go('certificateSubmit');
            }

        }

    })
    .controller('CertificateSubmit', function ($scope, $rootScope, $state, $ionicHistory, commonServices, CacheFactory, alertService, $ionicPopup) {
        var action = CacheFactory.get('action');
        if (action == 'SR') {
            $scope.title = $rootScope.Language.certificate.incomeCertificate;
            $scope.listUse = [
                { name: "购房", value: "购房" },
                { name: "购车", value: "购车" },
                { name: "贷款装修", value: "贷款装修" },
                { name: "保险理赔", value: "保险理赔" },
                { name: "申请补助", value: "申请补助" },
                { name: "司法诉讼", value: "司法诉讼" }
            ];
        }
        if (action == 'ZZ') {
            $scope.title = $rootScope.Language.certificate.certificateOfEmployment;
            $scope.listUse = [
                { name: "Visa申请", value: "Visa申请" },
                { name: "资格考试", value: "资格考试" },
                { name: "居住证", value: "居住证" },
                { name: "子女入学", value: "子女入学" }
            ];
        }
        if (action == 'XJ') {
            $scope.title = $rootScope.Language.certificate.certificateOfTakingLeave;
            $scope.listUse = [
                { name: "商业保险申报", value: "商业保险申报" }

            ];
        }

        var paras = commonServices.getBaseParas();

        $scope.apply = {
            WorkdayNO: paras.WorkdayNO,
            CName: paras.CName,
            MobileNo: paras.MobileNo,
            Organization: paras.Organization,
            Use: null
        };

        $scope.Submit = function () {
            if ($scope.apply.Use == null) {
                alertService.showAlert('请填写用途');
                return;
            }

            if ($scope.apply.Use == "") {
                alertService.showAlert('请填写用途');
                return;
            }

            $ionicPopup.confirm({
                title: '提示',
                template: '确定提交办证申请吗？',
                okText: "OK"
            }).then(function (res) {
                if (res) {
                    paras.MobileNo = $scope.apply.MobileNo;
                    paras.Use = $scope.apply.Use.name;
                    paras.ApplyType = action;

                    var url = commonServices.getUrl("GBSHRService.ashx", "SubmitCertificateApply");
                    commonServices.submit(paras, url).then(function (data) {
                        if (data.success) {
                            alertService.showAlert('您的申请已提交，请注意在“我的信息”查收最新进度通知，谢谢！');
                            $ionicHistory.goBack();
                        }
                        else {
                            alertService.showAlert(data.message);
                        }
                    });
                }
            });
        }

        $scope.closePass = function () {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('reissueWorkingCard', function ($scope, $rootScope, $state, $ionicHistory, commonServices, CacheFactory, alertService, $ionicPopup) 
    {
        //厂牌补办
        $scope.title = $rootScope.Language.certificate.reissueWorkingCard;
        $scope.listReason = [
            { name: "厂牌丢失（扣款10元/次）", value: "厂牌丢失" },
            { name: "自然损坏", value: "自然损坏" }
        ];

        var action = "CP";
        var paras = commonServices.getBaseParas();

        $scope.apply = {
            WorkdayNO: paras.WorkdayNO,
            CName: paras.CName,
            MobileNo: paras.MobileNo,
            Organization: paras.Organization,
            Use: null
        };

        $scope.Submit = function () {
            if (!$scope.apply.Use || $scope.apply.Use == "") {
                alertService.showAlert('请填写原因');
                return;
            }

            if ("" == $.trim($scope.apply.MobileNo)) {
                alertService.showAlert('请填写联系电话');
                return;
            }

            $ionicPopup.confirm({
                title: '提示',
                template: '确定提交办证申请吗？',
                okText: "OK"
            }).then(function (res) {
                if (res) {
                    paras.MobileNo = $.trim($scope.apply.MobileNo);
                    paras.Use = $scope.apply.Use.name;
                    paras.ApplyType = action;

                    var url = commonServices.getUrl("GBSHRService.ashx", "SubmitCertificateApply");
                    commonServices.submit(paras, url).then(function (data) {
                        if (data.success) {
                            alertService.showAlert('您的申请已提交，请注意在“我的信息”查收最新进度通知，谢谢！');
                            $ionicHistory.goBack();
                        }
                        else {
                            alertService.showAlert(data.message);
                        }
                    });
                }
            });
        }

        $scope.closePass = function () {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('VisaApplyCtrl', function ($scope, $rootScope, $state, $ionicHistory, commonServices, CacheFactory, alertService, $ionicPopup) 
    {
        $scope.listVisaType = [
            { name: "1 Year Multiple Entries", value: "1 Year Multiple Entries" },
            { name: "6 Months Double Entries", value: "6 Months Double Entries" },
            { name: "3 Months Single Entry", value: "3 Months Single Entry" },
            { name: "10 Years Multiple Entries", value: "10 Years Multiple Entries" }
        ];
        $scope.Gender = [
            { name: "Male", value: "Male" },
            { name: "Female", value: "Female" }
        ];

        setTimeout(function () {
            var now = new Date();
            var nowAddHour = new Date();
            nowAddHour.setHours(nowAddHour.getHours() + 3);
            var str = now.getFullYear() + "-" + fix((now.getMonth() + 1), 2) + "-" + fix(now.getDate(), 2);
            $("#IssuedDate").val(str);
            $("#PassportDateIssue").val(str);
            $("#PassportDateExpiry").val(str);
            $("#BirthDate").val(str);
            $("#ChinaArrivalDate").val(str);
            $("#DepartureDateFromChina").val(str);
        }, 500);
        function fix(num, length) {
            return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
        }


        var paras = commonServices.getBaseParas();

        $scope.visa = {
            CName: paras.CName,
            WorkdayNO: paras.WorkdayNO,
            Organization: paras.Organization,
            MobileNo: paras.MobileNo,
            IssuedDate: null,
            FullNameInPassport: null,
            PassportNo: null,
            PassportDateIssue: null,
            PassportDateExpiry: null,
            BirthDate: null,
            Nationality: null,
            Gender: null,
            JobTitle: null,
            CompanyName: null,
            PurposeOfVisit: null,
            ChinaArrivalDate: null,
            DepartureDateFromChina: null,
            VisaType: null,
            ContactpersonName: null,
            ContactPersonJobtitle: null,
            ContactPersonTelephone: null,
            ContactPersonEmail: null,
            ExpenseAfford: null
        };

        $scope.Submit = function () {

            $scope.visa.IssuedDate = $("#IssuedDate").val();
            $scope.visa.PassportDateIssue = $("#PassportDateIssue").val();
            $scope.visa.PassportDateExpiry = $("#PassportDateExpiry").val();
            $scope.visa.BirthDate = $("#BirthDate").val();
            $scope.visa.ChinaArrivalDate = $("#ChinaArrivalDate").val();
            $scope.visa.DepartureDateFromChina = $("#DepartureDateFromChina").val();

            $scope.visa.Gender = $scope.visa.Gender.name;
            $scope.visa.VisaType = $scope.visa.VisaType.name;

            console.log($scope.visa);
            var check = true;
            angular.forEach($scope.visa, function (value, key) {

                if (check) {
                    if (value == null || value == '') {
                        alertService.showAlert('Some information is not filled, please check');
                        check = false;
                    }
                }
            });

            if (!check) return;

            $ionicPopup.confirm({
                title: 'Prompt',
                template: 'Do you decide to apply for the application？',
                okText: "OK"
            }).then(function (res) {
                if (res) {
                    paras.visaDetail = $scope.visa;
                    var url = commonServices.getUrl("GBSHRService.ashx", "SubmitVisa");
                    commonServices.submit(paras, url).then(function (data) {
                        if (data.success) {
                            alertService.showAlert('Your application has been submitted, please pay attention to "my information", check the latest progress notice, thank you.');
                            $ionicHistory.goBack();
                        }
                        else {
                            alertService.showAlert(data.message);
                        }
                    });
                }
            });

        }
    })
    .controller('KqAbnormalCtrl', function($scope,$ionicHistory,alertService,commonServices,$state) {

        var params=commonServices.getBaseParas();
        var url=commonServices.getUrl("KqcxService.ashx","GetKQ_Attendance_Abnormal");
        console.log(params);

        commonServices.getDataList(params,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            console.log(data);
            $scope.KqAbnormalList=data;
        });
        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }

    })
    .controller('Handbook_lgCtrl', function($scope,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices) {

        var paras= commonServices.getBaseParas();
        var url=commonServices.getUrl("HandBookService.ashx","GetLgList");
        commonServices.getDataList(paras,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.handBookList=data;
        });


        $scope.open=function(info){
            CacheFactory.remove('ItemLanguage');
            CacheFactory.save('ItemLanguage',info.Language);

            $state.go('HandbookItemOne');
        };

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('HandbookItemOneCtrl', function($scope,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices) {

        $scope.ItemLanguage=CacheFactory.get('ItemLanguage');
        var paras= commonServices.getBaseParas();
        paras.where=" and Language=N'"+$scope.ItemLanguage+"'";
        paras.item="Item1";

        var url=commonServices.getUrl("HandBookService.ashx","GetItemList");
        commonServices.getDataList(paras,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }

            $scope.handBookItem1List=data;
        });


        $scope.open=function(info){
            CacheFactory.remove('Item1');
            CacheFactory.save('Item1',info.Item1);

            $state.go('handbookitemTwo');
        };

    })
    .controller('HandbookItemTwoCtrl', function($scope,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices,$location) {
        var Item1=CacheFactory.get('Item1');
        var paras= commonServices.getBaseParas();
        paras.where=" and Item1=N'"+Item1+"'";
        paras.item="Item2";
        var url=commonServices.getUrl("HandBookService.ashx","GetItemList");
        commonServices.getDataList(paras,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.handBookItem2List=data;
        });


        $scope.open=function(activity){
            CacheFactory.remove('Item2');
            CacheFactory.save('Item2',activity.Item2);

            $state.go('handbookitemThree');
        };

    })
    .controller('HandbookItemThreeCtrl', function($scope,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices,$location) {
        var Item2=CacheFactory.get('Item2');
        var paras= commonServices.getBaseParas();
        paras.where=" and Item2=N'"+Item2+"'";
        paras.item="Item3";
        var url=commonServices.getUrl("HandBookService.ashx","GetItemList");
        commonServices.getDataList(paras,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.DataList=data;
           $scope.handBookItem3List=$scope.DataList;
//            if($scope.DataList.length==1)  $('#Item_html').html($scope.DataList[0].Item3);
//            if($scope.DataList.length>1) $scope.handBookItem3List=$scope.DataList;
        });


        $scope.open=function(activity){
            CacheFactory.remove('Item3');
            CacheFactory.save('Item3',activity.Item3);

            $state.go('handbookitemFour');
        };

    })
    .controller('HandbookItemFourCtrl', function($scope,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices,$location) {
        var Item3=CacheFactory.get('Item3');
        var paras= commonServices.getBaseParas();
        paras.where=" and Item3=N'"+Item3+"'";
        paras.item="Item4";
        var url=commonServices.getUrl("HandBookService.ashx","GetItemList");
        commonServices.getDataList(paras,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.DataList=data;

            $('#Item4_html').html($scope.DataList[0].Item4);

            console.log($scope.DataList[0].Item4);
        });

    })
    .controller('BasicGuideCtrl',function($scope,$rootScope,$state,$ionicHistory,commonServices,CacheFactory,alertService,$ionicPopup)
    {
        //菜鸟手册
        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        };

    })
    .controller('GeneralNoticeCtrl',function($scope,$rootScope,$state,$ionicHistory,
                commonServices,CacheFactory,alertService,$ionicPopup, 
                externalLinksService)
    {
        //GeneralNotice
        //var baseInfo = commonServices.getBaseParas();
        var gnAction=CacheFactory.get('gnAction');
        $scope.gnTitle = gnAction;
        $scope.gnHasImg = true; //使用图标

        function InitInfo() {
            var url = commonServices.getUrl("GeneralNoticeService.ashx", "GetList");            
            var paras = {
                actName: gnAction,
                Extra: ""
            };
            commonServices.submit(paras, url).then(function (resp) {
                if (resp) {
                    if (!resp.success) {
                        alertService.showAlert("获取信息失败，请稍后再试。"+resp.message);
                        $ionicHistory.goBack();
                    } else {
                        var lst = resp.list;
                        if(!lst || 0==lst.length){
                            alertService.showAlert("没有相关数据");
                            $ionicHistory.goBack();
                        }
                        $scope.list = lst;
                    }
                }
            });
        }
        InitInfo();

        $scope.openGeneralNotice = function(isUrlHtml, id, html){
            if(isUrlHtml){
                //打开外链
                try {
                    externalLinksService.openUr(html);
                }
                catch (ex) {
                    alertService.showAlert(ex.message);
                }
            }else{
                CacheFactory.remove('gnID');
                CacheFactory.save('gnID', id);
                $state.go("generalNoticeDetial");
            }
        };

    })
    .controller('GeneralNoticeDetialCtrl',function($scope,$rootScope,$state,$ionicHistory,
                                                   commonServices,CacheFactory,alertService,$ionicPopup)
    {
    //GeneralNotice 详细
    var baseInfo = commonServices.getBaseParas();
    var gnID=CacheFactory.get('gnID');

    function InitInfo() {
        var url = commonServices.getUrl("GeneralNoticeService.ashx", "GetDetail");            
        var paras = {
            id: gnID,
            WorkdayNO: baseInfo.WorkdayNO,
            Extra: ""
        };
        commonServices.submit(paras, url).then(function (resp) {
            if (resp) {
                if (!resp.success) {
                    alertService.showAlert("获取信息失败，请稍后再试。"+resp.message);
                    $ionicHistory.goBack();
                } else {
                    var obj = resp.obj;
                    $scope.gnTitle = obj.title;
                    $scope.html = obj.html;
                }
            }
        });
    }
    InitInfo();

    })
    .controller('EmployeeDismissCtrl', function ($scope, $rootScope, $state, $ionicHistory,$ionicPopup,
                                                 commonServices, CacheFactory, alertService, actionVisitServices)
    {
        //离职须知
        $scope.canUseAction = function (action) {
            return actionVisitServices.canUseAction(action, $rootScope.accessEmployee.WorkdayNO);
        };

        $scope.open = function (action) {
            switch (action) {
                case "离职手续简介":
                    $state.go('dismissIntro');
                    break;
                case "离职手续状态查询":
                    $state.go('dismissStatus');
                    break;
                default: break;
            }
        };
    })
    .controller('DismissIntroCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
                                                 commonServices, CacheFactory, alertService, actionVisitServices) {
        //离职手续简介
        $scope.open = function (action) {
            switch (action) {
                case "南厂":
                    $scope.openGeneralNotice(0, '07FEA336-C85E-4B45-BB3F-F5587D3B6A02');
                    break;
                case "北厂":
                    $scope.openGeneralNotice(0, '165B122C-108F-475E-9B3B-DDB5C4247D93');
                    break;
                case "外籍":
                    $scope.openGeneralNotice(0, '8DF15700-B6BF-4BEB-9796-7D6D0EFA213E');
                    break;
                default: break;
            }
        };
        $scope.openGeneralNotice = function (isUrlHtml, id, html) {
            if (isUrlHtml) {
                //打开外链
                try {
                    externalLinksService.openUr(html);
                }
                catch (ex) {
                    alertService.showAlert(ex.message);
                }
            } else {
                CacheFactory.remove('gnID');
                CacheFactory.save('gnID', id);
                $state.go("generalNoticeDetial");
            }
        };

    })
    .controller('DismissStatusCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
                                               commonServices, CacheFactory, alertService)
    {
        //离职手续状态
        function InitInfo() {
            var url = commonServices.getUrl("EmployeeDismissService.ashx", "GetStatus");
            var paras = commonServices.getBaseParas();
            $scope.model = paras;
            commonServices.submit(paras, url).then(function (resp) {
                if (resp) {
                    if (!resp.success) {
                        alertService.showAlert("获取信息失败，请稍后再试。" + resp.message);
                        $ionicHistory.goBack();
                    } else {
                        var dismiss = resp.obj;
                        if (!dismiss) {
                            return;
                        }
                        $scope.list = dismiss.dismissSteps;
                        var dismissTim = dismiss.dismissTime;
                        if (dismissTim) {
                            $scope.lastWorkingDay = dismissTim.lastWorkingDay || '';
                            $scope.dismissBeginDay = dismissTim.dismissBeginDay || '';
                        }                        
                    }
                }
            });
        }
        InitInfo();

        $scope.HasStatus = function () {
            return $scope.list && $scope.list.length > 0;
        }
        $scope.GetStatusText = function (st) {
            return st ? $rootScope.Language.GBSHR.Done : $rootScope.Language.GBSHR.Required;
        }

    })
    
;        