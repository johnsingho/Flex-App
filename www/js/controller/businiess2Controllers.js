/**
 * Created by dmneeoll on 2017-03-03.
 */
angular.module('evaluationApp.businiess2Controllers', [])
    .controller('ResearchCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory,alertService,externalLinksService){
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
    

        $scope.openGH=function(){
            try {
                externalLinksService.openUr('http://cn.mikecrm.com/pSIKpIJ');
            }
            catch (ex) {
                alertService.showAlert(ex.message);
            }
        };
        $scope.openMECH=function(){

            $scope.isNotMECH=$scope.accessEmployee.Organization.toUpperCase().indexOf('MECH')==-1;

            if($scope.isNotMECH)
            {
                alertService.showAlert("本项调查只开放给Mech员工");
                return;
            }

            if($scope.accessEmployee.Organization.toUpperCase()=='MECH-PCBA')
            {
                alertService.showAlert("本项调查只开放给Mech（非PCBA）员工");
                return;
            }

            try {
                externalLinksService.openUr('https://www.wjx.top/jq/25582325.aspx');
            }
            catch (ex) {
                alertService.showAlert(ex.message);
            }
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
            if(data=="抱歉！本次调查的对象是2018-6-14前入职的住宿员工，谢谢你的关注！"){
                alertService.showAlert("抱歉！本次调查的对象是2018-6-14前入职的住宿员工，谢谢你的关注！");
                return;
            }
            $scope.researchDetailList=data;

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

    .controller('LuckyGameCtrl', function($scope,$rootScope,$ionicPopup,$interval,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices) {


        $scope.openDog=function(){

            $('#btnChai').addClass('animated shake');

            var params=commonServices.getBaseParas();
            var url=commonServices.getUrl("LuckyGameService.ashx","GetLuckyGame");
            //获取一般活动列表
            commonServices.getData(params,url).then(function(data){
                if(data=="Token is TimeOut"){
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                if(data.indexOf('^')!=-1){
                    alertService.showLoading(data.split('^')[1])
                    return;
                }
                var dogNo=data.split(',')[0];
                var haveFive=data.split(',')[1];
                switch(dogNo)
                {
                    case "1":$rootScope.dog='guowangfu.png'; break;
                    case "2":$rootScope.dog='jiawangfu.png'; break;
                    case "3":$rootScope.dog='fuwangfu.png'; break;
                    case "4":$rootScope.dog='caiwangfu.png'; break;
                    case "5":$rootScope.dog='wangwangfu.png'; break;
                }

                console.log($rootScope.dog);

                $rootScope.rebagPopup=$ionicPopup.show({
                    cssClass:'my-custom-popup',
                    templateUrl: 'templates/luckyDrawGame/luckydog.html',
                    scope: $rootScope
                });
                $rootScope.rebagPopup.then(function(res) {
                    $('#btnChai').removeClass('animated shake');
                    $scope.getDogCount();
                    if(haveFive=='true'){
                        $rootScope.dog='congratulate.png';
                        $rootScope.rebagPopup=$ionicPopup.show({
                            cssClass:'my-custom-popup',
                            templateUrl: 'templates/luckyDrawGame/luckydog.html',
                            scope: $rootScope
                        });
                        $rootScope.rebagPopup.then(function(res) {
                            $('#btnChai').removeClass('animated shake');
                            $scope.getDogCount();
                            if(haveFive=='true'){

                            }
                        });
                    }
                });

            });


        }

        $scope.getDogCount=function(){
            var params=commonServices.getBaseParas();
            var url=commonServices.getUrl("LuckyGameService.ashx","GetLuckyDogCount");
            commonServices.getDataListNoMask(params,url).then(function(data){

                if(data=="Token is TimeOut"){
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                console.log(data);
                $scope.dogList=data;
                if($scope.dogList.length>0){
                    for(var i=0;i<$scope.dogList.length;i++){
                        if($scope.dogList[i].dog==1)  $scope.dog1=$scope.dogList[i].dogCount;
                        if($scope.dogList[i].dog==2)  $scope.dog2=$scope.dogList[i].dogCount;
                        if($scope.dogList[i].dog==3)  $scope.dog3=$scope.dogList[i].dogCount;
                        if($scope.dogList[i].dog==4)  $scope.dog4=$scope.dogList[i].dogCount;
                        if($scope.dogList[i].dog==5)  $scope.dog5=$scope.dogList[i].dogCount;
                    }
                }
            });
        }

        $scope.getDogCount();

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }

    })

    .controller('ChunwanZJCtrl', function($scope,$rootScope,externalLinksService,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices) {
        $scope.checkIDNO='23328424582344576622405743456258588953';

        var paras= commonServices.getBaseParas();
        var url=commonServices.getUrl("ResearchService.ashx","GetChunwanZJListByWorkdayNo");
        $scope.Msg='';
        commonServices.getDataList(paras,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }

            $scope.zjList=data;

            if($scope.zjList.length==0)
            {
                $scope.Msg='您没有中奖';
            }


        });





        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('ChunwanCtrl', function($scope,$rootScope,externalLinksService,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices) {
        $scope.checkIDNO='23328424582344576622405743456258588953';

//        var paras= commonServices.getBaseParas();
//        var url=commonServices.getUrl("ApplySubmitService.ashx","GetChunwanApplyList");
//        commonServices.getDataList(paras,url).then(function(data){
//
//            if(data=="Token is TimeOut"){
//                alertService.showAlert("登录失效，请重新登录");
//                $state.transitionTo('signin');
//            }
//            $scope.applyList=data;
//
//
//        });

        $scope.open=function(apply){
            CacheFactory.remove('applyID');
            CacheFactory.save('applyID',apply);

            console.log(apply);
            $state.go('applyHtml');
        };

        $scope.openZhibo=function(){

            try {
                externalLinksService.openUr('http://zklive-aliyun.myzaker.com/xlive/al151658441329265809c05_sd.m3u8');
            }
            catch (ex) {
                alertService.showAlert(ex.message);
            }
        };

        $scope.openHudong=function(){

            try {
                externalLinksService.openUr('https://yun.aiyaopai.com/live/20180130wcl?from=singlemessage&isappinstalled=0');
            }
            catch (ex) {
                alertService.showAlert(ex.message);
            }
        };

        $scope.openNamelist=function(){

            $state.go('chunwanNameListHtml');
        };


        $scope.openjiangpin=function(){

            $state.go('chunwanjiangpin');
        };
        $scope.openjiemu=function(){

            $state.go('chunwanjiemu');
        };
        $scope.openZJ=function(){
            $state.go('chunwanZJ');
        }

        $scope.chunwanZJName=function(){
            $state.go('chunwanZJName');
        }

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('ChunwanZJNameCtrl', function($scope,$rootScope,externalLinksService,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices) {

        var paras= commonServices.getBaseParas();
        var url=commonServices.getUrl("ResearchService.ashx","GetChunwanZJList");

        commonServices.getDataList(paras,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }

            $scope.zjList=data;


        });


        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('GBSListCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory,alertService,externalLinksService){

        $scope.open=function(action){
            switch (action)
            {
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
            }
        }
        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('CertificateCtrl',function($scope,$rootScope,$state,CacheFactory){
        var accessEmployee = $rootScope.accessEmployee;
        var bTestAccount = IsTestAccount(accessEmployee.WorkdayNO);
        //屏蔽multek
        //var bIsNotMultek = accessEmployee.Organization.toLowerCase().indexOf("multek")<0;
        $scope.canShow = !isMultek(accessEmployee.Organization) && bTestAccount;

        $scope.open=function(action){
            switch (action)
            {
                case "visaApply":
                    $state.go('visaApply');
                    break;
                case "CP": /*厂牌补办*/
                    $state.go('reissueWorkingCard');
                    break;
                default :
                    CacheFactory.save('action', action);
                    $state.go('certificateSubmit');

            }

        }

    })
    .controller('CertificateSubmit',function($scope,$rootScope,$state,$ionicHistory,commonServices,CacheFactory,alertService,$ionicPopup){
        var action= CacheFactory.get('action');
        if(action=='SR'){
            $scope.title=$rootScope.Language.certificate.incomeCertificate;
            $scope.listUse = [
                { name: "购房", value: "购房" },
                { name: "购车", value: "购车" },
                { name: "贷款装修", value: "贷款装修" },
                { name: "保险理赔", value: "保险理赔" },
                { name: "申请补助", value: "申请补助" },
                { name: "司法诉讼", value: "司法诉讼" }
            ];
        }
        if(action=='ZZ'){
            $scope.title=$rootScope.Language.certificate.certificateOfEmployment;
            $scope.listUse = [
                { name: "Visa申请", value: "Visa申请" },
                { name: "资格考试", value: "资格考试" },
                { name: "居住证", value: "居住证" },
                { name: "子女入学", value: "子女入学" }
            ];
        }
        if(action=='XJ'){
            $scope.title=$rootScope.Language.certificate.certificateOfTakingLeave;
            $scope.listUse = [
                { name: "商业保险申报", value: "商业保险申报" }

            ];
        }

        var paras= commonServices.getBaseParas();

        $scope.apply= {
            WorkdayNO:paras.WorkdayNO,
            CName:paras.CName,
            MobileNo: paras.MobileNo,
            Organization:paras.Organization,
            Use:null
        };

        $scope.Submit=function() {
            if($scope.apply.Use==null){
                alertService.showAlert('请填写用途');
                return;
            }

            if($scope.apply.Use==""){
                alertService.showAlert('请填写用途');
                return;
            }

            $ionicPopup.confirm({
                title: '提示',
                template: '确定提交办证申请吗？',
                okText:"OK"
            }) .then(function(res) {
                if(res) {
                    paras.MobileNo=$scope.apply.MobileNo;
                    paras.Use=$scope.apply.Use.name;
                    paras.ApplyType=action;

                    var url=commonServices.getUrl("GBSHRService.ashx","SubmitCertificateApply");
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

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('reissueWorkingCard',function($scope,$rootScope,$state,$ionicHistory,commonServices,CacheFactory,alertService,$ionicPopup){
        //厂牌补办
        $scope.title=$rootScope.Language.certificate.reissueWorkingCard;
        $scope.listReason = [
            { name: "厂牌丢失（扣款10元/次）", value: "厂牌丢失" },
            { name: "自然损坏", value: "自然损坏" }
        ];

        var action = "CP";
        var paras = commonServices.getBaseParas();

        $scope.apply= {
            WorkdayNO:paras.WorkdayNO,
            CName:paras.CName,
            MobileNo: paras.MobileNo,
            Organization:paras.Organization,
            Use:null
        };

        $scope.Submit=function() {
            if( !$scope.apply.Use || $scope.apply.Use==""){
                alertService.showAlert('请填写原因');
                return;
            }

            if(""==$.trim($scope.apply.MobileNo)){
                alertService.showAlert('请填写联系电话');
                return;
            }

            $ionicPopup.confirm({
                title: '提示',
                template: '确定提交办证申请吗？',
                okText:"OK"
            }) .then(function(res) {
                if(res) {
                    paras.MobileNo = $.trim($scope.apply.MobileNo);
                    paras.Use=$scope.apply.Use.name;
                    paras.ApplyType=action;

                    var url=commonServices.getUrl("GBSHRService.ashx","SubmitCertificateApply");
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

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('VisaApplyCtrl',function($scope,$rootScope,$state,$ionicHistory,commonServices,CacheFactory,alertService,$ionicPopup){
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

        setTimeout( function (){
            var now = new Date();
            var nowAddHour = new Date();
            nowAddHour.setHours(nowAddHour.getHours()+3);
            var str = now.getFullYear() + "-" + fix((now.getMonth() + 1),2) + "-" + fix(now.getDate(),2) ;
            $("#IssuedDate").val(str);
            $("#PassportDateIssue").val(str);
            $("#PassportDateExpiry").val(str);
            $("#BirthDate").val(str);
            $("#ChinaArrivalDate").val(str);
            $("#DepartureDateFromChina").val(str);



        },500);
        function fix(num, length) {
            return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
        }


        var paras= commonServices.getBaseParas();

        $scope.visa= {
            CName:paras.CName,
            WorkdayNO:paras.WorkdayNO,
            Organization:paras.Organization,
            MobileNo:paras.MobileNo,
            IssuedDate:null,
            FullNameInPassport:null,
            PassportNo:null,
            PassportDateIssue:null,
            PassportDateExpiry:null,
            BirthDate:null,
            Nationality:null,
            Gender:null,
            JobTitle:null,
            CompanyName:null,
            PurposeOfVisit:null,
            ChinaArrivalDate:null,
            DepartureDateFromChina:null,
            VisaType:null,
            ContactpersonName:null,
            ContactPersonJobtitle:null,
            ContactPersonTelephone:null,
            ContactPersonEmail:null,
            ExpenseAfford:null
        };

        $scope.Submit=function() {

            $scope.visa.IssuedDate=$("#IssuedDate").val();
            $scope.visa.PassportDateIssue=$("#PassportDateIssue").val();
            $scope.visa.PassportDateExpiry=$("#PassportDateExpiry").val();
            $scope.visa.BirthDate=$("#BirthDate").val();
            $scope.visa.ChinaArrivalDate=$("#ChinaArrivalDate").val();
            $scope.visa.DepartureDateFromChina=$("#DepartureDateFromChina").val();

            $scope.visa.Gender=$scope.visa.Gender.name;
            $scope.visa.VisaType=$scope.visa.VisaType.name;

            console.log($scope.visa);
            var check=true;
            angular.forEach($scope.visa, function(value, key){

                if(check){
                    if(value==null||value==''){
                        alertService.showAlert('Some information is not filled, please check');
                        check=false;
                    }
                }
            });

           if(!check) return;

            $ionicPopup.confirm({
                title: 'Prompt',
                template: 'Do you decide to apply for the application？',
                okText:"OK"
            }) .then(function(res) {
                if(res) {
                    paras.visaDetail=$scope.visa;
                    var url=commonServices.getUrl("GBSHRService.ashx","SubmitVisa");
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
    .controller('CserDateCtrl',function($scope,$rootScope,$state,$ionicHistory,commonServices,CacheFactory,alertService,externalLinksService){
        var paras= commonServices.getBaseParas();
        var url=commonServices.getUrl("CSERSevice.ashx","GetCSERDate");

        commonServices.getDataList(paras,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("Token is TimeOut");
                $state.transitionTo('signin');
            }

            $scope.CserDateList=data;


        });

        $scope.open=function(cserDate){
            try {

                externalLinksService.openUr(cserDate.URL);
            }
            catch (ex) {
                alertService.showAlert(ex.message);
            }
        };

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }

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

    
;
