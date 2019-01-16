/**
 * 用于Admin及相关子菜单
 * johnsing he 2018-06-29
 */
angular.module('evaluationApp.adminControllers', [])
    .controller('AdminCtrl', function ($scope, $rootScope, $state, $ionicHistory,$ionicPopup,
        commonServices, CacheFactory, alertService, actionVisitServices, externalLinksService) 
    {
        $scope.canUseAction = function (action) {
          return actionVisitServices.canUseAction(action, $rootScope.accessEmployee.WorkdayNO);
        };
        $scope.checkActionUpdate = function (action) {
          return actionVisitServices.checkUpdate(action);
        };

        $scope.open = function (action) {
            actionVisitServices.visit(action); //save state
            switch (action) {
                case "班车信息":
                    $state.go("Carlist");
                    break;
                case "点餐":
                    {
                        $state.go("tabMealOrder.mealList");
                        //$state.go("tab.404");
                    }
                    break;
                case "挂失IC卡":
                    $state.go('icCardLost');
                    break;
                case "dormManage":
                    $state.go('dormManage');
                    break;
                case "餐厅菜单":
                    $state.go('canteenImg');
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
                $state.go("generalNoticeDetail");
            }
        };
    })
    /*sub of AdminCtrl*/
    .controller('CarListCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory,alertService,externalLinksService)
    {
        //班车信息
        var params=commonServices.getBaseParas();
        var url=commonServices.getUrl("MapService.ashx","GetCarList");
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
                $state.go("generalNoticeDetail");
            }
        };

        //获取car列表
        commonServices.getDataList(params,url).then(function(data){
            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.carList=data;
            console.log($scope.carList)
        });
        $scope.open=function(car){            
            CacheFactory.remove('car');
            CacheFactory.save('car',car);
            $state.go("CarMap");
        };
        $scope.openBusTime=function(){
            //$state.go("carBusTime");
            $scope.openGeneralNotice(0, '51586037-E097-4080-B571-85B433DF8070');
        };
        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('admin');
        }
    })
    // .controller('CarPictureCtrl', function($scope,CacheFactory,commonServices,$state,$ionicHistory) {
    //     $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
    //     //记录点击
    //     var paras1={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,opType:'班车查询',opContent:'点击进入'};
    //     commonServices.operationLog(paras1).then(function(data){
    //         $scope.sucess=data;
    //     });

    //     $("#auto-loop").lightGallery({
    //         mobileSrc         : false, // If "data-responsive-src" attr. should be used for mobiles.
    //         mobileSrcMaxWidth : 640,   // Max screen resolution for alternative images to be loaded for.
    //         swipeThreshold    : 50,    // How far user must swipe for the next/prev image (in px).
    //         hideControlOnEnd : false,
    //         closable:false
    //     });

    //     $scope.closePass=function(){
    //         $ionicHistory.nextViewOptions({
    //             disableAnimate: true,
    //             disableBack: true
    //         });
    //         $state.go('admin');
    //     }
    // })
    .controller('MealListCtrl',function($scope,$rootScope,$state,$ionicModal,$ionicHistory,commonServices,CacheFactory,alertService,$ionicPopup)
    {
        //点餐
        var myPopup = $ionicPopup.show({
            templateUrl: 'templates/mealOrder/mealProtocolHtml.html',
            cssClass: 'my-custom-popup-Alter',
            title: '订餐须知',
            subTitle: '',
            scope: $scope,
            buttons: [
                {
                    text: '<b>确定</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        return;
                    }
                }
            ]
        });

        var params=commonServices.getBaseParas();
        $scope.MobileNo=$rootScope.accessEmployee.MobileNo;

        commonServices.getDataList(params,API.GetMealList).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.mealList=data;
            console.log( $scope.mealList);
        });

        $scope.SubmitList=[];
        $scope.MealCount=0;
        $scope.MealPay=0;

        $scope.cutDown=function(meal){
            if(meal.Count>0){
                meal.Count=meal.Count-1
                $scope.MealCount=$scope.MealCount-1;
                $scope.MealPay=$scope.MealPay-meal.Price;

                console.log(meal);
                console.log($scope.SubmitList);

                for(var i=0;i<$scope.SubmitList.length;i++){
                    if($scope.SubmitList[i].id==meal.id){
                        $scope.SubmitList[i].Count=$scope.SubmitList[i].Count-1;
                        if( $scope.SubmitList[i].Count==0){
                            $scope.SubmitList.splice(i,1);
                        }
                        break;
                    }
                    console.log($scope.SubmitList);
                }
            }
        };

        $scope.add=function(meal){
            meal.Count=meal.Count+1;
            $scope.MealCount=$scope.MealCount+1;
            $scope.MealPay=$scope.MealPay+meal.Price;
            var isOK=false;
            for(var i=0;i<$scope.SubmitList.length;i++){
                if($scope.SubmitList[i].id==meal.id){
                    $scope.SubmitList[i].Count=$scope.SubmitList[i].Count+1;
                    isOK=true;
                    break;
                }
            }

            if(isOK==false){
                $scope.SubmitList.push({id:meal.id,foodName:meal.foodName,Count:meal.Count,Price:meal.Price});
            }
            console.log($scope.SubmitList);
        };

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('admin');
        };

        $scope.like=function(meal){

            params.foodName=meal.foodName;
            params.isLike='1';
            var url=commonServices.getUrl("MealOrder.ashx","AddLike");
            commonServices.submit(params,url).then(function(data){
                if(data.success){
//                    commonServices.getDataListNoMask(params,API.GetMealList).then(function(data){
//
//                        if(data=="Token is TimeOut"){
//                            alertService.showAlert("登录失效，请重新登录");
//                            $state.transitionTo('signin');
//                        }
//                        $scope.mealList=data;
//                        console.log( $scope.mealList);

//                    });
                meal.LikeQty=meal.LikeQty+1;
                }
                else{
                    alertService.showLoading(data.message);
                }
            });
        };

        $scope.unLike=function(meal){

            params.foodName=meal.foodName;
            params.isLike='0';
            var url=commonServices.getUrl("MealOrder.ashx","AddLike");
            commonServices.submit(params,url).then(function(data){
                if(data.success){
//                    commonServices.getDataListNoMask(params,API.GetMealList).then(function(data){
//
//                        if(data=="Token is TimeOut"){
//                            alertService.showAlert("登录失效，请重新登录");
//                            $state.transitionTo('signin');
//                        }
//                        $scope.mealList=data;
//                        console.log( $scope.mealList);
//                    });
                    meal.UnLikeQty=meal.UnLikeQty+1;
                }else
                {
                    alertService.showLoading(data.message);
                }
            });
        };

        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal
        })
        $scope.openModal = function() {
            if($scope.MealCount==0){
                alertService.showAlert("请选择后再下单");
                return;
            }
            $scope.modal.show();
            var now = new Date();
            var str = now.getFullYear() + "-" + fix((now.getMonth() + 1),2) + "-" + fix(now.getDate(),2) + "T" + fix(now.getHours(),2) + ":" + fix(now.getMinutes(),2)+ ":" + fix(now.getSeconds(),2);

            $("#lcTime").val(str);
        };
        function fix(num, length) {
            return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
        }
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        $scope.mealPerson="请选择";
        $scope.selMealPerson=function(mealPerson){

            $scope.mealPerson=mealPerson;
        };

        $scope.submit=function(){

            var selTime = $("#lcTime").val(); //获取
            if(selTime.length==0)
            {
                alertService.showAlert("请选择就餐时间");
                return;
            }
            if($scope.mealPerson=="请选择"){
                alertService.showLoading("请选择就餐人数");
                return;
            }

            params.SubmitList=$scope.SubmitList;
            params.sMobile=$scope.MobileNo;
            params.MealCount=$scope.MealCount;
            params.MealPay=$scope.MealPay;
            params.MealTime=selTime;
            params.bz=$("#bz").val();
            params.mealPerson=$scope.mealPerson;
            console.log(params);
            var url=commonServices.getUrl("MealOrder.ashx","SubmitOder");
            commonServices.submit(params,url).then(function(data){
                if(data.success){
                    $scope.modal.hide();
                    $state.go("tabMealOrder.myOrder");
                }
                else{
                    alertService.showAlert(data.message);
                }
            });

        }

    })
    .controller('MealLinkManCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory,alertService){
        var params=commonServices.getBaseParas();

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('admin');
        }
    })
    .controller('MyOrderCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory,alertService){
        var params=commonServices.getBaseParas();

        $scope.load=function(){
            var url=commonServices.getUrl("MealOrder.ashx","GetMyOrderList");
            commonServices.getDataList(params,url).then(function(data){
                if(data=="Token is TimeOut"){
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                $scope.myOrderList=data;

            });
        }

        $scope.load();

        $scope.cancelOrder=function(number,mealTime){
            var url=commonServices.getUrl("MealOrder.ashx","CancelOrder");
            params.number=number;
            params.mealTime=mealTime;
            commonServices.submit(params,url).then(function(data){
                if(data.success){
                    alertService.showAlert("取消成功");
                }
                else{
                    alertService.showAlert(data.message);
                }

                $scope.load();
            });
        };

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('admin');
        }
    })
    .controller('ICCardLostCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
        commonServices, CacheFactory, alertService) 
    {
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
            else if (!idno || !idno.length) {
                alertService.showAlert( $rootScope.Language.common.InfoProvideIDNO);
                return;
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

        // $scope.closePass = function () {
        //     $ionicHistory.nextViewOptions({
        //         disableAnimate: true,
        //         disableBack: true
        //     });
        //     $state.go('tab.home');
        // };
    })
    .controller('DormManageCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
                commonServices, CacheFactory, alertService, actionVisitServices, externalLinksService) 
    {        
        //宿舍管理
        $scope.canUseAction = function (action) {
          return actionVisitServices.canUseAction(action, $rootScope.accessEmployee.WorkdayNO);
        };
        $scope.checkActionUpdate = function (action) {
          return actionVisitServices.checkUpdate(action);
        };
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
                $state.go("generalNoticeDetail");
            }
        };

        $scope.open=function(action){
            actionVisitServices.visit(action); //save state
            switch (action) {
                case "住房津贴":
                    $state.go('housingAllowance');
                    break;
                case "入住需知":
                    $state.go('dormNoticeProtocol');
                    break;                    
                case "宿舍申请":
                    $state.go('applyDorm');
                    break;
                case "费用查询":
                    $state.go('chargingDefine');
                    break;
                case "宿舍公告":
                    $state.go('dormNotice');
                    break;
                case "宿舍地图":
                    //$state.go('dormMap');
                    $scope.openGeneralNotice(0, '671705D6-DEAE-4B19-9969-ABED6400F251');
                    break;
                case "宿舍报修":
                    $state.go('repairDorm');
                    break;
                case "补办钥匙":
                    $state.go('reissueKey');
                    break;
                case "免费WIFI申请":
                    $state.go('freeDormWifi');
                    break;
                case "宿舍常见问题":
                    $state.go('dormAskAndAns');
                    break;
                case "建议箱":
                    $state.go('dormSuggest');
                    break;
                default: break;
            }
        }
        // $scope.closePass = function () {
        //     $ionicHistory.nextViewOptions({
        //         disableAnimate: true,
        //         disableBack: true
        //     });
        //     $state.go('tab.home');
        // };
    })
    .controller('HousingAllowanceCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
        commonServices, CacheFactory, alertService, duplicateSubmitServices) 
    {
        //住房津贴
        var paras= commonServices.getBaseParas();
        $scope.canSubmit=false;
        $scope.model = {
            SubmitGuid: duplicateSubmitServices.genGUID(),
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
    .controller('ApplyDormCtrl', function ($scope, $rootScope, $state, $ionicHistory,$ionicPopup, 
                                            commonServices, CacheFactory, alertService, duplicateSubmitServices) 
    {
        //宿舍申请
        var paras = commonServices.getBaseParas();
        $scope.canSubmit = false;
        $scope.model = {
            SubmitGuid: duplicateSubmitServices.genGUID(),
            CName: paras.CName,
            WorkdayNO: paras.WorkdayNO,
            MobileNo: paras.MobileNo,
            Organization: paras.Organization,
            Grade: null,
            DormArea: null,
            RequireType:null,
            RequireReason:null,
            HasHousingAllowance:null,
            memo: ""
        };
       
        $scope.protocol = {
            IsAggree:0
        };
        function InitInfo() {
            $ionicPopup.show({
                title: '入住宿舍承诺书',
                cssClass:'my-custom-popup-Alter',
                templateUrl: 'templates/admin/dorm/protocolDorm.html',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if(!$scope.protocol.IsAggree){
                                alertService.showLoading("请接受承诺书！");
                                e.preventDefault();
                            }else{
                                return;
                            }                            
                        }
                    }
                ]
            });

            var grades=[];
            for(var i=0;i<7;i++){
                grades.push(i+1);
            }
            for(var i=20;i<25;i++){
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

            var url = commonServices.getUrl("DormManageService.ashx", "BeforeApplyDorm");
            commonServices.submit(paras, url).then(function (resp) {
                if (resp) {
                    if(!resp.success){
                        alertService.showAlert("获取宿舍区失败，无法申请");
                        $ionicHistory.goBack();
                    }else{                        
                        $scope.dormAreas = resp.list; //ID,SiteID,Name
                        var hasHousingAllowance = !!resp.data;
                        if(hasHousingAllowance){
                            $scope.yesNo = [{name:"是",value:true}];
                            $scope.model.HasHousingAllowance = hasHousingAllowance;
                        }
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
            if ($scope.model.HasHousingAllowance) {
                alertService.showAlert("已享受住房津贴，不能申请宿舍!<br>请先到宿舍管理处申请取消津贴。");
                $scope.isSumbiting = false;
                return;
            }
            if(!$scope.model.RequireReason || !$scope.model.RequireReason.length){
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
        
        $scope.selday = function(day){
            //TODO
        };

        $scope.totFee={
            sum:0
        };
        $scope.hasFee = function(){
            return $scope.totFee.sum>0.0;
        }

        function InitInfo() {            
            var url = commonServices.getUrl("DormManageService.ashx", "GetCharging");
            commonServices.submit(paras, url).then(function (resp) {
                if (resp) {
                    if(!resp.success){
                        alertService.showAlert("查询费用失败，请稍候再试!<br>"+resp.message);
                        $ionicHistory.goBack();
                    }else{                        
                        $scope.totFee = resp.obj;
                    }
                }
            });
        }
        InitInfo();
    })
    .controller('DormMapCtrl', function ($scope, $rootScope, $state, $ionicHistory) 
    {
        //宿舍地图
        $("#auto-loop").lightGallery({
            mobileSrc         : false, // If "data-responsive-src" attr. should be used for mobiles.
            mobileSrcMaxWidth : 640,   // Max screen resolution for alternative images to be loaded for.
            swipeThreshold    : 50,    // How far user must swipe for the next/prev image (in px).
            hideControlOnEnd : false,
            closable:false
        });
    })
    .controller('DormNoticeCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
                                            commonServices, CacheFactory, alertService) 
    {
        //宿舍公告
        function InitInfo() {            
            var url = commonServices.getUrl("DormManageService.ashx", "GetDormNoticeList");
            var paras = {};
            commonServices.submit(paras, url).then(function (resp) {
                if (resp) {
                    if(!resp.success){
                        alertService.showAlert("最近没有宿舍公告!");
                        $ionicHistory.goBack();
                    }else{                        
                        $scope.noticeList = resp.list;
                    }
                }
            });
        }
        InitInfo();

        $scope.open = function(notice){
            CacheFactory.save(GLOBAL_INFO.KEY_DORM_NOTICE_ID, notice.ID);
            $state.go('dormNoticeDetail');
        }
    })
    .controller('DormNoticeDetailCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
                                                  commonServices, CacheFactory, alertService) 
    {
        //宿舍公告 详细
        var noticeID = CacheFactory.get(GLOBAL_INFO.KEY_DORM_NOTICE_ID);

        function InitInfo() {
            var url = commonServices.getUrl("DormManageService.ashx", "GetDormNoticeDetail");
            var baseInfo = commonServices.getBaseParas();
            var paras = {
                "WorkdayNo": baseInfo.WorkdayNO,
                "NoticeID": noticeID
            };
            commonServices.submit(paras, url).then(function (resp) {
                if (resp) {
                    if (!resp.success) {
                        alertService.showAlert("获取宿舍公告详细失败!");
                        $ionicHistory.goBack();
                    } else {
                        $scope.curNotice = resp.obj;
                        var strHtml = resp.obj.NoticeHtml;
                        $('#div_html').html(strHtml);
                    }
                }
            });
        }        
        InitInfo();
    })
    .controller('RepairDormCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
                                            commonServices, CacheFactory, alertService, duplicateSubmitServices,
                                            PicServices, UrlServices) 
    {            
        //宿舍报修
        var baseInfo = commonServices.getBaseParas();
        $scope.canSubmit=false;
        $scope.model={
            SubmitGuid: duplicateSubmitServices.genGUID(),
            CName: baseInfo.CName,
            WorkdayNO: baseInfo.WorkdayNO,
            MobileNo: baseInfo.MobileNo,
            DormArea: null,
            DormAddress: null,
            RepairTime: moment().add(1,'h').minute(0).toDate(),
            DeviceType: null,
            RepairDesc: null
        };

        function InitInfo() {
            var url = commonServices.getUrl("DormManageService.ashx", "GetDormCheckInInfo");            
            var paras = {
                WorkdayNO: baseInfo.WorkdayNO,
                Extra: "GetRepairType"
            };
            commonServices.submit(paras, url).then(function (resp) {
                if (resp && resp.obj) {
                    var curCheckInfo = resp.obj;
                    if (!resp.success) {
                        /* 不作强制检查
                        alertService.showAlert("报修失败："+resp.message);
                        $ionicHistory.goBack();
                        */
                        $scope.model.DormAddress = '';                        
                        $scope.canSubmit = true;
                    } else {
                        var checkInInfo = curCheckInfo.CheckInfo;
                        $scope.model.DormArea = checkInInfo.DormAreaID;
                        $scope.model.DormAddress = checkInInfo.DormAddress;
                        $scope.canSubmit=true;
                    }
                    var arr = JSON.parse(resp.data);
                    $scope.deviceTypes = arr;
                    $scope.dormAreas = curCheckInfo.DormAreas;
                }else{
                    alertService.showAlert("获取报修信息失败，请稍候再试!");
                    return;
                }
            });
        }
        InitInfo();

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
        };
        Reset();
        $scope.Reset = Reset;

        $scope.isSumbiting = false;
        $scope.Submit = function () {
            $scope.isSumbiting = true;

            var sTemp = $.trim($scope.model.MobileNo);
            $scope.model.MobileNo=sTemp;
            if (!sTemp || sTemp.length<5) {
                alertService.showAlert("请提供联系电话!");
                $scope.isSumbiting = false;
                return;
            }
            if (!$scope.model.DormArea) {
                alertService.showAlert("请选择宿舍区!");
                $scope.isSumbiting = false;
                return;     
            }
            sTemp = $.trim($scope.model.DormAddress);            
            if(isEmptyString(sTemp)){
                alertService.showAlert("请提供具体地址(例：北厂宿舍77栋A77房Z床)!");
                $scope.isSumbiting = false;
                return;
            }else{
                var sDormArea = $.trim($("#idDormArea option:selected").text());
                if(0!=sTemp.indexOf(sDormArea)){
                    sTemp = sDormArea + sTemp;
                }
                $scope.model.DormAddress=sTemp;
            }
            sTemp = $.trim($scope.model.RepairTime);
            if (isEmptyString(sTemp)) {
                alertService.showAlert("请填写维修时间!");
                $scope.isSumbiting = false;
                return;
            }
            sTemp = $.trim($scope.model.DeviceType);
            if (isEmptyString(sTemp)) {
                alertService.showAlert("请要维修的设备类型!");
                $scope.isSumbiting = false;
                return;
            }           
            sTemp = $.trim($scope.model.RepairDesc);
            $scope.model.RepairDesc = sTemp;
            // if (isEmptyString(sTemp)) {
            //     alertService.showAlert("请填写报修内容!");
            //     $scope.isSumbiting = false;
            //     return;     
            // }

            var paras = $scope.model;
            if(!$scope.imgs || !$scope.imgs.length){
                try {
                  DoSubmit(paras);
                } finally {
                  $scope.isSumbiting = false;
                }
            }else{
                alertService.showOperating('Processing...');
                var url = commonServices.getUrl("UploadService.ashx","");
                UrlServices.uploadImages('DormRepair', '宿舍报修', $scope.imgs, url, function(resp){
                    alertService.hideOperating();
                    if(resp){
                        if(resp.success){
                            paras.ImageBatchNo = resp.obj;
                            try{
                                DoSubmit(paras);
                            }catch(e){
                                console.log(e);
                            }                            
                        }else{
                            alertService.showAlert("上传图片失败, " + resp.message);
                        }
                    }else{
                        alertService.showAlert("上传图片失败!");
                    }
                    $scope.isSumbiting = false;
                },
                function(msg){
                    alertService.showAlert("上传图片失败, " + msg);
                });
            }
        };

        function DoSubmit(paras){            
            var url = commonServices.getUrl("DormManageService.ashx", "SubmitRepairDorm");
            commonServices.submit(paras, url).then(function (resp) {
              if (resp.success) {
                var msg = $rootScope.Language.dormManage.repairDormSucc;
                alertService.showAlert(msg);
                $ionicHistory.goBack();
              } else {
                alertService.showAlert(resp.message);
                $ionicHistory.goBack();
              }
            });
        }
    })
    .controller('ReissueKeyCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
                                            commonServices, CacheFactory, alertService, duplicateSubmitServices) 
    {
        //补办钥匙
        var baseInfo = commonServices.getBaseParas();
        $scope.canSubmit=false;
        $scope.model={
            SubmitGuid: duplicateSubmitServices.genGUID(),
            CName: baseInfo.CName,
            WorkdayNO: baseInfo.WorkdayNO,
            MobileNo: baseInfo.MobileNo,
            DormAddress: null,
            KeyTypes: null,
            Money: 0.0,
            Reason: null,
            memo: null,
        };
        $scope.KeyTypes = [
            {name:"大门钥匙", check:false},
            {name:"衣柜外门", check:false},
            {name:"衣柜抽屉", check:false}
        ];
        $scope.totalMoney=0;
        $scope.OnChangeKeyType = function(item){
            $scope.totalMoney=0;
            for(var i=0; i<$scope.KeyTypes.length; i++){
                if($scope.KeyTypes[i].check){
                    $scope.totalMoney += 10;
                }
            }
        };
        $scope.GetSelKeys = function(){
            var keys=[];
            for(var i=0; i<$scope.KeyTypes.length; i++){
                if($scope.KeyTypes[i].check){
                    keys.push($scope.KeyTypes[i].name);
                }
            }
            return keys;
        };

        function InitInfo() {
            var url = commonServices.getUrl("DormManageService.ashx", "GetDormCheckInInfo");            
            var paras = {
                WorkdayNO: baseInfo.WorkdayNO,
                Extra: ""
            };
            commonServices.submit(paras, url).then(function (resp) {
                if (resp) {
                    if (!resp.success) {
                        alertService.showAlert("补办钥匙失败："+resp.message);
                        $ionicHistory.goBack();
                    } else {
                        var checkInInfo = resp.obj;
                        $scope.model.DormAddress = checkInInfo.DormAddress;
                        var arr = JSON.parse(resp.data);                        
                        $scope.canSubmit=true;
                    }
                }
            });
        }
        InitInfo();

        $scope.isSumbiting = false;
        $scope.Submit = function () {
            $scope.isSumbiting = true;

            var sTemp = $.trim($scope.model.MobileNo);
            $scope.model.MobileNo=sTemp;
            if (!sTemp || sTemp.length<5) {
                alertService.showAlert("请提供联系电话!");
                $scope.isSumbiting = false;
                return;
            }
            sTemp = $.trim($scope.model.DormAddress);
            $scope.model.DormAddress=sTemp;
            if(isEmptyString(sTemp)){
                alertService.showAlert("请提供你的宿舍地址!");
                $scope.isSumbiting = false;
                return;     
            }
            if (0==$scope.GetSelKeys().length) {
                alertService.showAlert("请选择要补办的钥匙类型!");
                $scope.isSumbiting = false;
                return;
            }           
            sTemp = $.trim($scope.model.Reason);
            $scope.model.Reason = sTemp;
            if (isEmptyString(sTemp)) {
                alertService.showAlert("请填写原因!");
                $scope.isSumbiting = false;
                return;
            }
            
            $scope.model.KeyTypes=$scope.GetSelKeys().join(";");
            $scope.model.Money = $scope.totalMoney;
            var paras = $scope.model;
            var url = commonServices.getUrl("DormManageService.ashx", "SubmitReissueKey");
            try {
                commonServices.submit(paras, url).then(function (resp) {
                    if (resp.success) {
                        var msg = $rootScope.Language.dormManage.reissueKeySucc;
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
    .controller('FreeDormWifiCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
        commonServices, CacheFactory, alertService,externalLinksService) 
    {
        //免费Wifi
        $scope.open = function (action) {
            switch (action) {
                case "wifi_ios":
                    $state.go("freeDormWifi_ios");
                    break;
                case "wifi_android":
                    $state.go("freeDormWifi_android");
                    break;
            }
        };
        
        $scope.openApplyUrl = function(){
            try {
                var url = "http://www.189eshop.cn/catentry/catentryDetail.action?recCode=12345678&recStaff=2044029868&catentryId=1196525&storeId=13759&systemId=MINI_WAP";
                externalLinksService.openUr(url);
            }
            catch (ex) {
                alertService.showAlert(ex.message);
            }
        }
    })
    .controller('DormAskAndAnsCtrl', function ($scope, $rootScope, $state, $ionicHistory, 
                                               commonServices, AskAndAnswerService) 
    {
        //宿舍问答，使用 AskAndAnswerCtrl
        function GetList(paras){
            AskAndAnswerService.getAskAndAnswer(paras).then(function(resp){
                if(resp.success){
                    $scope.listAskAndAnswer = resp.list;
                }                
            });
        }
        var paras = commonServices.getBaseParas();
        paras.keyword = "宿舍";
        GetList(paras);
    })
    .controller('DormSuggestCtrl', function($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
                                            commonServices, CacheFactory, alertService, duplicateSubmitServices) 
    {
        //建议箱
        var baseInfo = commonServices.getBaseParas();
        $scope.hisSuggest=[];
        function InitInfo() {
            var url = commonServices.getUrl("DormManageService.ashx", "GetDormSuggest");            
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
        $scope.GetSuggest = function(){
            var txt = $.trim($scope.model.Suggest);
            return txt;
        };

        $scope.isSumbiting = false;
        $scope.Submit = function () {
            $scope.isSumbiting = true;
            var sugg = $scope.GetSuggest();
            if (sugg.length<3) {
                alertService.showAlert("请填写你的建议!");
                $scope.isSumbiting = false;
                return;
            }

            $scope.model.Suggest = sugg;
            var paras = $scope.model;
            var url = commonServices.getUrl("DormManageService.ashx", "SubmitDormSuggest");
            try {
                commonServices.submit(paras, url).then(function (resp) {
                    if (resp.success) {
                        var msg = $rootScope.Language.dormManage.suggestSucc;
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
    .controller('ProtocolDormPageCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicPopup, commonServices) 
    {
      //宿舍申请协议
      var baseInfo = commonServices.getBaseParas();

      function InitInfo() {
        var url = commonServices.getUrl("DormManageService.ashx", "AddProtocolRead");
        var paras = {
          WorkdayNO: baseInfo.WorkdayNO,
          CName: baseInfo.CName,
        };
        commonServices.submit(paras, url).then(function (resp) {
          if (resp) {
            if (resp.success) {
              $scope.ReadCount = resp.obj;
            }
          }
        });
      }
      InitInfo();
    })
    .controller('DynpageCtrl', function($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
        commonServices, CacheFactory, alertService, duplicateSubmitServices)
    {
        //动态只读页
        var baseInfo = commonServices.getBaseParas();
        function InitInfo() {
            var url = commonServices.getUrl("Common.ashx", "GetDynPage");
            var objDyn = JSON.parse(CacheFactory.get(GLOBAL_INFO.KEY_DYNPAGE));
            var paras = {
                WorkdayNO: baseInfo.WorkdayNO,
                Token: baseInfo.Token,
                TabName: objDyn.TabName,
                SrcCol: objDyn.SrcCol,
                WhereColName: objDyn.WhereColName,
                WhereColVal: objDyn.WhereColVal
            };

            $scope.pageTitle = objDyn.PageTitle;
            commonServices.submit(paras, url).then(function (resp) {
              if (resp && resp.success) {
                $scope.html = resp.data;
              }
            });
        }
        InitInfo();
    })
    .controller('CanteenImgCtrl', function($scope, $rootScope, $state, $ionicHistory, $ionicPopup,
        commonServices, CacheFactory, alertService, externalLinksService)
    {
        //餐厅菜单
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
                $state.go("generalNoticeDetail");
            }
        };
        
    })

///////////////////////////////////////////////////////    
;