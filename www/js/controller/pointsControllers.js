/**
 * Created by dmneeoll on 2016/6/15.
 */
angular.module('evaluationApp.pointsControllers', [])
    .controller('RulesCtrl', function($scope ,$rootScope,$window,$stateParams,$ionicSlideBoxDelegate,$ionicPopup, $state,$ionicHistory,CacheFactory, SettingFactory, alertService, pointsService,IonicService) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        if (!$scope.accessEmployee) {
            alertService.showAlert('凭证过时，请重新登录');
            $state.go('signin');
        }
//        alertService.showAlert('由于Flex+地球日活动开启，红包活动暂停至3月24号');
        $scope.BgCSS="background:url(img/point1.jpg);background-repeat:round;background-size:cover";
        $scope.showSlide=false;
        $scope.showFirst=true;

        $scope.Start=function(){

            $scope.showFirst=false;
            $scope.showSlide=true;
            $scope.BgCSS="";
//            $ionicSlideBoxDelegate.next();
            $ionicSlideBoxDelegate.$getByHandle("slideImg").update();
        };
        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }


        $scope.evaluate_ID ='0286491B-F773-4517-868D-FCD6DFFD8689';
        if(CacheFactory.get('evaluate_Name')=="做更好的自己 员工自我评估"){
            $scope.evaluate_name = CacheFactory.get('evaluate_Name').split(' ')[1];
        }
        else {
            $scope.evaluate_name = CacheFactory.get('evaluate_Name');
        }

        var parameter={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,Evaluate_ID:$scope.evaluate_ID };
        pointsService.getPointsRuls(parameter).then(function(data) {
            if(data=="Token is TimeOut")
            {
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.rules = data;
        });

        $scope.isShowSubmit=false;
        $scope.showdescription=false;
        //radio选择事件，记录并显示分数，记录选择的Item名，以便写入分数明细表
        $scope.CheckChang=function(rule,sorce) {
            rule.Points=sorce.ItemSorce;
            rule.SelItem=sorce.Item;
            rule.ItemName=sorce.ItemName;
            if(rule.Sort<$scope.rules.length){
                $ionicSlideBoxDelegate.next();
            }
//            PCBA B13
            if(rule.Sort==$scope.rules.length&&$scope.accessEmployee.Segment_ID=='EF922594-5FB1-409E-A3D8-F7BC940AACD9')  $scope.isShowSubmit=true;
            else if(rule.Sort==$scope.rules.length&&$scope.accessEmployee.Segment_ID!='EF922594-5FB1-409E-A3D8-F7BC940AACD9'&&$scope.accessEmployee.WorkdayNO=='2332842')  $scope.isShowSubmit=true;

            else if(rule.Sort==$scope.rules.length&&$scope.accessEmployee.Segment_ID!='EF922594-5FB1-409E-A3D8-F7BC940AACD9'){ $scope.showdescription=true;}
        };

        $scope.Submit=function(){
            $scope.totleDetailScore=0;
            for(var i=0;i<$scope.rules.length;i++){
                if($scope.rules[i].Points==null){
                    alertService.showAlert('第'+$scope.rules[i].Sort+'项还未评分');
                    return;
                }
                $scope.totleDetailScore=$scope.totleDetailScore+$scope.rules[i].Points;
            }
            $scope.isSumbiting=false;
            $ionicPopup.confirm({
                title: '提示',
//                template: '您的分数是：基础分'+$scope.totleDetailScore+',特殊意见分'+ $scope.SpecialProposeSorce+',金点子分'+ $scope.goldIdeaSorce+'，确定提交吗？',
                template: '您的分数是：'+$scope.totleDetailScore+'，请提交',
                okText:"OK"
            }) .then(function(res) {
                if(res) {
                    $scope.SubmitToService($scope.rules);
                }
            });
        };


        $scope.SubmitToService=function(rules){

            if($scope.isSumbiting==true) return;

            $scope.isSumbiting=true;

            $scope.submitDetails = [];
            for(var i=0;i<rules.length;i++){
                $scope.submitDetails.push({EvaluateDetails_ID:rules[i].EvaluateDetails_ID,
                    Points:rules[i].Points,
                    SelItem:rules[i].SelItem,
                    ItemName:rules[i].ItemName});
            }

            $scope.JsonSubmit=angular.toJson($scope.submitDetails);
            var submitParams={ WorkdayNO: $scope.accessEmployee.WorkdayNO,
                Segment_ID: $scope.accessEmployee.Segment_ID,
                Grade: $scope.accessEmployee.Grade,
                Token:$scope.accessEmployee.Token,
                specialPropose:null,
                goldIdeaType:null,
                goldIdeaContent:null,
                Evaluate_ID:rules[0].Evaluate_ID,
                sSubmitDetails:$scope.JsonSubmit };

            pointsService.submit(submitParams).then(function(response) {
                if (response.success) {
                    $scope.isSumbiting=false;
                    var x = parseFloat(response.data)
                    if(x>0)
                    {
                        $rootScope.money='红包金额:'+response.data+'元';
                        $rootScope.rebagPopup=$ionicPopup.show({
                            cssClass:'er-popup',
                            templateUrl: 'templates/comm/hongbao.html',
                            scope: $rootScope
                        });
                        $rootScope.rebagPopup.then(function(res) {

                            $state.go('tabPoints.points');
                        });
                    }
                    else
                    {
                        alertService.showAlert('提示','提交成功');
                        $state.go('tabPoints.points');
                    }

//                    alertService.showAlert('提示','提交成功，获得红包一个：'+response.data+'元');
//                    CacheFactory.save('UserScore_ID', response.message);//记录本次评分ID 用于首页获取本次评分
                }
                else  {
                    $scope.isSumbiting=false;
                    alertService.showAlert('提交失败',response.message);
                }
            }, function(data) {  // 处理错误 .reject
                $scope.isSumbiting=false;
                alertService.showAlert(data.template);
            });
        }

    })
//    .controller('38ActivityCtrl', function($scope ,commonServices,$rootScope,$window,$stateParams,$ionicSlideBoxDelegate,$ionicPopup, $state,$ionicHistory,CacheFactory, SettingFactory, alertService, pointsService,IonicService) {
//        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
//        if (!$scope.accessEmployee) {
//            alertService.showAlert('凭证过时，请重新登录');
//            $state.go('signin');
//        }
////        alertService.showAlert('由于Flex+地球日活动开启，红包活动暂停至3月24号');
//        $scope.BgCSS="background:url(img/nvshenjie.jpg);background-repeat:round;background-size:cover";
//        $scope.showSlide=false;
//        $scope.showFirst=true;

//        $scope.Start=function(){

//            $scope.showFirst=false;
//            $scope.showSlide=true;
//            $scope.BgCSS="";
////            $ionicSlideBoxDelegate.next();
//            $ionicSlideBoxDelegate.$getByHandle("slideImg").update();
//        };
//        $scope.closePass=function(){
//            $ionicHistory.nextViewOptions({
//                disableAnimate: true,
//                disableBack: true
//            });
//            $state.go('tab.home');
//        }


//        $scope.evaluate_ID ='AEB99986-3E5D-4A2A-96C1-C3BA40F02609';
//        if(CacheFactory.get('evaluate_Name')=="做更好的自己 员工自我评估"){
//            $scope.evaluate_name = CacheFactory.get('evaluate_Name').split(' ')[1];
//        }
//        else {
//            $scope.evaluate_name = CacheFactory.get('evaluate_Name');
//        }

//        var parameter={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,Evaluate_ID:$scope.evaluate_ID,Employee_ID:$scope.accessEmployee.WorkdayNO };
//        pointsService.getPointsRuls(parameter).then(function(data) {
//            if(data=="Token is TimeOut")
//            {
//                alertService.showAlert("登录失效，请重新登录");
//                $state.transitionTo('signin');
//            }
//            $scope.rules = data;
//        });

//        $scope.isShowSubmit=false;
//        $scope.showdescription=false;
//        //radio选择事件，记录并显示分数，记录选择的Item名，以便写入分数明细表
//        $scope.CheckChang=function(rule,sorce) {
//            rule.Points=sorce.ItemSorce;
//            rule.SelItem=sorce.Item;
//            rule.ItemName=sorce.ItemName;
//            if(rule.Points!=10)
//            {
//                alertService.showLoading("答案没选对呢");
//                return;
//            }
//            if(rule.Sort<$scope.rules.length){
//                $ionicSlideBoxDelegate.next();
//            }

//            if(rule.Sort==$scope.rules.length&&$rootScope.Power)
//            $scope.isShowSubmit=true;
//        };

//        $scope.Submit=function() {

//            $scope.isSumbiting=true;
//            var url=commonServices.getUrl("ChoujiangService.ashx","Choujiang_Game");

//            try{
//                commonServices.submit(parameter,url).then(function(data){
//                    if (data.success) {
//                        $scope.isSumbiting=false;
//                        $rootScope.money=''+data.data;
//                        $rootScope.rebagPopup=$ionicPopup.show({
//                            cssClass:'my-custom-popup',
//                            templateUrl: 'templates/comm/hongbaoChoujiang.html',
//                            scope: $rootScope
//                        });
//                        $rootScope.rebagPopup.then(function(res) {
////                    $state.go('tabPoints.points');
//                        });
//                    }
//                    else {
//                        $scope.isSumbiting=false;
//                        alertService.showAlert('提示',data.message);
//                    }
//                });
//            }
//            catch(ex){
//            }
//        }
//    })
    .controller('PointsCtrl', function($scope,$rootScope,$stateParams,$ionicHistory,$state,alertService,IonicService,CacheFactory) {

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }

        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        if (! $scope.accessEmployee) {
            alertService.showAlert('凭证过时，请重新登录');
            $state.go('signin');
        }
        IonicService.postToServer({ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token },API.PointsHistory).then(function (response) {
            if (response.success) {
                $scope.pointsHistory=[];
                for(var i=0;i<response.list.length;i++){
                    //主列表
                    $scope.pointsHistory.push({Redbag:response.list[i].redbag,
                        Score:response.list[i].Score,
                        CreateDate:response.list[i].CreateDate
                    });
                }
            }
            else  {
//                alertService.showAlert(response.message);
            }
        });
    })
    .controller('RankingCtrl', function($scope,$rootScope,$location,$ionicHistory,$state, CacheFactory,pointsService,alertService) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        };
        var params={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token };

        pointsService.getChartRank(params).then(function(data){
            if(data=="Token is TimeOut")
            {
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }

            $scope.Rank=data;
            $scope.labels = ["最低分", "我的位置", "最高分"];

            $scope.yearData = [
                [0, $scope.Rank.yearMySum, $scope.Rank.yearMax]
            ];
            $scope.monthData = [
                [0, $scope.Rank.monthMySum, $scope.Rank.monthMax]
            ];

        });
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

//        $scope.accessToken = CacheFactory.get('accessToken');
//        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
//
//
//        $scope.scoreOrderDetails=[];
//        $scope.selEvaluateUpdate=function(){
//            $scope.scoreOrderList=[];
//            $scope.scoreOrderDetails=[];
//            IonicService.postToServer({ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessToken,selEvaName:$scope.items.item.name },API.RankHead).then(function (response) {
//                if (response.success) {
//                    for(var i=0;i<response.list.length;i++){
//                        //主列表
//                        $scope.scoreOrderList.push({LotDate:response.list[i].LotDate });
//                    }
//                }
//                else  {
//                    alertService.showAlert('无此数据');
//                }
//            });
//        };
//
//        $scope.selOrderUpdate=function(){
//            $scope.scoreOrderDetails=[];
//            IonicService.postToServer({ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessToken,sLotDate:$scope.scoreOrderList.item.LotDate },API.RankDetails).then(function (response) {
//                if (response.success) {
//
//                    for(var i=0;i<response.list.length;i++){
//                        //主列表
//                        $scope.scoreOrderDetails.push({WorkdayNO:response.list[i].WorkdayNO,
//                            CName:response.list[i].CName,
//                            SumScore:response.list[i].SumScore,
//                            Count:response.list[i].Count
//                        });
//                    }
//                }
//                else  {
//                    alertService.showAlert('无此数据');
//                }
//            });
//        };


    })
    .controller('PointsAccountCtrl', function($scope,pointsService,$ionicHistory,$state, CacheFactory,alertService) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        };
        var params={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token };
        //刷新员工信息
        pointsService.getPointInfo(params).then(function (response) {
            if(response=="Token is TimeOut")
            {
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.pointInfo=response;
        });

        pointsService.GetRedEnvelopLog(params).then(function(data){
            $scope.RedEnvelopLog=data;
            $scope.RedEnvelopSum=$scope.RedEnvelopLog[0].RedEnvelopSum;
        });

    })
;