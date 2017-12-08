/**
 * Created by dmneeoll on 2017-03-03.
 */
angular.module('evaluationApp.businiess2Controllers', [])
    .controller('ResearchCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory,alertService){
        var params=commonServices.getBaseParas();
        var url=commonServices.getUrl("ResearchService.ashx","GetResearchList");
        //获取一般活动列表
        commonServices.getDataList(params,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.researchList=data;
        });
        $scope.open=function(research){
            CacheFactory.remove('researchID');
            CacheFactory.remove('ResearchName');
            CacheFactory.save('researchID',research.ID);
            CacheFactory.save('ResearchName',research.ResearchName);
          $state.go('researchHtml');
        };
        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('ResearchDetailsCtrl',function($scope,$rootScope,$state,$ionicPopup,$ionicHistory,commonServices,CacheFactory,alertService){
        var researchID=CacheFactory.get('researchID');
        $scope.ResearchName=CacheFactory.get('ResearchName');
        var params=commonServices.getBaseParas();
        params.researchID=researchID;
        var url=commonServices.getUrl("ResearchService.ashx","GetResearchHTML");

        var strHtml='';
        commonServices.getData(params,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            strHtml=data;
            $('#html').html(strHtml);
        });
        url=commonServices.getUrl("ResearchService.ashx","GetsResearchDetails");
        commonServices.getDataList(params,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.researchDetailList=data;
            console.log($scope.researchDetailList);
            //是否激活启动
            $scope.isActivate=data[0].IsActivate;
            //启动日期
            $scope.activateDate=data[0].ActivateDate;
        });
        $scope.isSumbiting=false;

        $scope.Submit=function() {

            if($scope.isSumbiting==true) return;
            $scope.isSumbiting=true;

            $scope.SubmitList=[];
            $scope.sumScore=0;
            for (var i = 0; i < $scope.researchDetailList.length; i++) {
                var rname=$scope.researchDetailList[i].sort;

                var selVaule= $("input[name='"+rname+"'"+"]:checked").val();
                console.log(i+":"+selVaule);
                if(typeof (selVaule)!='undefined'){
                    var sScore=selVaule.split("^")[2];
                    $scope.sumScore=$scope.sumScore+parseInt(sScore);
                    if(selVaule.split("^")[0]=='OtherItem')
                    {
                        selVaule='OtherItem'+'^'+$scope.researchDetailList[i].OtherText+'^'+sScore;

                        if($scope.researchDetailList[i].OtherText==null)
                        {
                            alertService.showAlert("请填写你的意见后再提交");
                            $scope.isSumbiting=false;
                            return;
                        }
                    }
                    $scope.SubmitList.push({ResearchID:researchID,ResearchDetailsID:$scope.researchDetailList[i].DetailsID,SelItem:selVaule,Comments:$scope.researchDetailList[i].Comments});
                }
                else
                {
                    if( $scope.researchDetailList[i].listItem.length==1&&$scope.researchDetailList[i].listItem[0].Type=='Comments'){
                        var Comments= $("input[name='"+rname+"'"+"]").val();
                        $scope.SubmitList.push({ResearchID:researchID,ResearchDetailsID:$scope.researchDetailList[i].DetailsID,Comments:Comments});
                    }

                }

            }

            console.log($scope.SubmitList);


            if($scope.SubmitList.length!=$scope.researchDetailList.length){
//                alertService.showLoading("还有未选择的项目，请选择完成后再提交");
                 alertService.showAlert("还有未选择的项目，请选择完成后再提交");
                $scope.isSumbiting=false;
            }
//            else if($scope.sumScore!=100){
//                alertService.showAlert("答案还没有全对哦！再想想...");
//                $scope.isSumbiting=false;
//            }
            else{
                $scope.SubmitList=angular.toJson($scope.SubmitList);
                params.SubmitResult=$scope.SubmitList;
                params.ResearchName=$scope.ResearchName;
                commonServices.submit(params,API.ResearchSubmit).then(function(data){
                    if(data.success){
                        var x = parseFloat(data.data)
                        if(x>0)
                        {
                            $rootScope.money='红包金额:'+data.data+'元';
                            $rootScope.rebagPopup=$ionicPopup.show({
                                cssClass:'er-popup',
                                templateUrl: 'hongbao.html',
                                scope: $rootScope
                            });
                            $rootScope.rebagPopup.then(function(res) {
                                $scope.isSumbiting=false;
                                $state.go('myAccountMoney');
                            });
                        }
                        else
                        {
                            $scope.isSumbiting=false;
                            alertService.showAlert('问卷调查提交成功，谢谢你的参与');
                            $ionicHistory.goBack();
                            $rootScope.updateSlideBox();
                        }
//                        alertService.showAlert('问卷调查提交成功，谢谢你的参与');
//
//                        $ionicHistory.goBack();
//                        $rootScope.updateSlideBox();
                    }
                    else{
                        $scope.isSumbiting=false;
                        alertService.showAlert(data.message);
                    }
                });

            }
        }
    })
    .controller('MealListCtrl',function($scope,$rootScope,$state,$ionicModal,$ionicHistory,commonServices,CacheFactory,alertService,$ionicPopup){
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
            $state.go('tab.home');
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
            $state.go('tab.home');
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
            $state.go('tab.home');
        }
    })
    .controller('MyAccountMoneyCtrl', function($scope,pointsService,commonServices,$ionicHistory,$state, CacheFactory,alertService) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        };
        var params={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token };

        commonServices.getDataList(params,API.GetMyRedEnvelopLog).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            console.log(data);
            $scope.myRedEnvelopLog=data;
            $scope.myRedEnvelopSum=$scope.myRedEnvelopLog[0].RedEnvelopSum;

        });

    })
    .controller('AskForHelpCtrl',function($scope,$rootScope,$state,$ionicHistory,CacheFactory,goldIdeaService,commonServices,alertService,goodJobService){
        var paras= commonServices.getBaseParas();

        $scope.MobileNo=$rootScope.accessEmployee.MobileNo;

        $scope.Submit=function(helpContent){

            if(typeof($scope.MobileNo)=="undefined"){
                alertService.showLoading('请填写联系电话');
                return;
            }
            if(typeof(helpContent)=="undefined"){
                alertService.showLoading('具体描述遇到困难或问题');
                return;
            }
            if(helpContent.length>0){
                if(helpContent.length<10){
                    alertService.showLoading('具体描述遇到困难或问题（不少于10字符）');
                    return;
                }
                paras.sContent=helpContent;
                paras.sMobile=$scope.MobileNo;
                var url=commonServices.getUrl("EvaluationAppService.ashx","SubmitAskForHlep");
                commonServices.submit(paras,url).then(function(data){
                    if(data.success){
                        alertService.showAlert('已经收到，我们会尽快回复你的求助');

                        $state.go('tabAskForHelp.myHelp');

                    }
                    else{
                        alertService.showAlert(data.message);
                    }
                });
            }
        };

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        };

    })
    .controller('MyHelpCtrl',function($scope,$state,$ionicHistory,goldIdeaService,commonServices){

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
        var paras= commonServices.getBaseParas();
        var url=commonServices.getUrl("EvaluationAppService.ashx","GetMyHelp");
        commonServices.getDataList(paras,url).then(function(data){
           $scope.myHelp=data;
        });
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
    .controller('CarListCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory,alertService){
        var params=commonServices.getBaseParas();
        var url=commonServices.getUrl("MapService.ashx","GetCarList");
        //获取一般活动列表
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
            $state.go("tabCar.map");
        };
        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('BaiduMapCtrl', function($scope,$interval,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices,$location) {

        $scope.map;

        setTimeout(function () {
            // 百度地图API功能
            $scope.map = new BMap.Map("allmap");
            $scope.map.centerAndZoom(new BMap.Point(113.273383,22.170500),18);
            $scope.map.enableScrollWheelZoom(true);
            $scope.theLocation();
        }, 300)

        var timer1= $interval(function(){
            $scope.theLocation();

        },5000);   //间隔5秒定时执行

        $scope.$on(
            "$destroy",
            function( event ) {
                $interval.cancel(timer1);
            }
        );

        // 用经纬度设置地图中心点
        $scope.theLocation=function (){
            $scope.getGPS();
            $scope.map.clearOverlays();
            var icon = new BMap.Icon('./img/car.png', new BMap.Size(25, 25), {      //20，30是图片大小
                anchor: new BMap.Size(12, 30)
            });
            var new_point = new BMap.Point($scope.bgGPS[0],$scope.bgGPS[1]);

            var marker = new BMap.Marker(new_point,{
                icon: icon
            });  // 创建标注

            var marker1 = new BMap.Marker(new_point);  // 创建标注

            $scope.map.addOverlay(marker);              // 将标注添加到地图中
//            $scope.map.addOverlay(marker1);
            $scope.map.panTo(new_point);

        }

        var paras= commonServices.getBaseParas();
        var car=JSON.parse(CacheFactory.get('car'));

        paras.plate=car.plate;
        $scope.carName=car.Name;

        var url=commonServices.getUrl("MapService.ashx","GetGPS");

        $scope.getGPS=function(){
            commonServices.getDataListNoMask(paras,url).then(function(data){

                if(data=="Token is TimeOut"){
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                $scope.GPS=data;
                $scope.changWGS84ToBg($scope.GPS);
            });
        }

        $scope.changWGS84ToBg=function(gps){

            //wgs84转国测局坐标
            var wgs84togcj02 = coordtransform.wgs84togcj02(gps[0].lng, gps[0].lat);

            //国测局坐标转百度经纬度坐标
            var gcj02tobd09 = coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);
            $scope.bgGPS=gcj02tobd09;
        }

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tabCar.carlist');
        }
    })



;
