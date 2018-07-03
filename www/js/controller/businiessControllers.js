/**
 * Created by dmneeoll on 2016-06-23.
 */
angular.module('evaluationApp.businiessControllers', ['ngSanitize'])
    .controller('GoldidealistCtrl',function($scope,$rootScope,$ionicHistory,CacheFactory,$state,goldIdeaService,commonServices,alertService){
        $scope.goldIdeaList = [];
        var paras= commonServices.getBaseParas();
        //获取金点子类型List
        goldIdeaService.getGoldIdeaType(paras).then(function (response) {
            if(data=="Token is TimeOut")
            {
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.goldIdeaList=response;
        }, function(data) {
            // 处理错误 .reject
            alertService.showAlert(data.template);
        });

    })
    .controller('GoldideaCtrl',function($scope,$rootScope,$state,$ionicHistory,CacheFactory,goldIdeaService,commonServices,alertService){

        $scope.goldIdeaType = [];

        var paras= commonServices.getBaseParas();
        //获取金点子类型List
        goldIdeaService.getGoldIdeaType(paras).then(function (response) {
            $scope.goldIdeaType=response;
            if ($scope.goldIdeaType[0].msg!=null) {
                alertService.showAlert($scope.goldIdeaType[0].msg);
            }
        }, function(data) {
            // 处理错误 .reject
            alertService.showAlert(data.template);
        });
        $scope.goldInputIdea = {
            ideaType:"",
            text: ''
        }
        $scope.CheckChang=function(t){
            $scope.goldInputIdea.ideaType= t.ideaType;
        };
        $scope.Submit=function(){
            if($scope.accessEmployee.Organization=='PCBA-B13'||$scope.accessEmployee.Organization=='Campus Resource B15'||$scope.accessEmployee.Organization=='Regional Resource B15'||$scope.accessEmployee.Organization=='PCBA-B11')
            {
                if($scope.goldInputIdea.text.length>0){
                    if($scope.goldInputIdea.ideaType.length==0){
                        alertService.showLoading('金点子请选择一种类型');
                        return;
                    }
                    if($scope.goldInputIdea.text.length<10){
                        alertService.showLoading('员工金点子不少于10个字');
                        return;
                    }
                    var paras= commonServices.getBaseParas();
                    paras.goldIdeaType=$scope.goldInputIdea.ideaType;
                    paras.goldIdeaContent=$scope.goldInputIdea.text;
                   // var paras={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,goldIdeaType:$scope.goldInputIdea.ideaType,goldIdeaContent:$scope.goldInputIdea.text};
                    commonServices.submit(paras,API.SubmitGoldIdea).then(function(data){
                        if(data.success){
                            alertService.showAlert('谢谢提交，金点子已经收到');

                            $ionicHistory.goBack();
                            $rootScope.updateSlideBox();
                        }
                        else{
                            alertService.showAlert(data.message);
                        }
                    });
                }
            }
            else
            {
                alertService.showLoading('你的事业部还未开通金点子功能');
                return;
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
    .controller('MyGoldideaCtrl',function($scope,$state,$ionicHistory,goldIdeaService,commonServices,CacheFactory){

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
        var paras= commonServices.getBaseParas();
        //获取金点子类型List
        goldIdeaService.getGoldIdeaRecode(paras).then(function (response) {
            $scope.goldIdea=response;
        }, function(data) {
            // 处理错误 .reject

        });
    })
    .controller('GoldIdeaShowCtrl',function($scope,$state,$ionicHistory,commonServices ,goldIdeaService,CacheFactory){

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
        var paras= commonServices.getBaseParas();


        goldIdeaService.getGoldIdeaShow(paras).then(function (response) {

            $scope.goldIdeaShow=response;

        }, function(data) {
            // 处理错误 .reject

        });
    })
    .controller('GoodJobCtrl',function($scope,$rootScope,$ionicHistory,CacheFactory,goldIdeaService,commonServices,alertService,goodJobService){


        //记录点击
        var paras1= commonServices.getBaseParas();
        paras1.opType='为TA点赞';
        paras1.opContent='点击进入';

        if(paras1.Organization=='Campus Resource B15'){
            $scope.imgUrl='img/B15Like.jpg';
        }else if(paras1.Organization=='Regional Resource B15'){
            $scope.imgUrl='img/B15Like.jpg';
        }
//        else if(paras1.Organization=='PCBA 57'){
//            $scope.imgUrl='img/B15Like.jpg';
//        }
        else
        {
            $scope.imgUrl='img/goodJob.png';
        }

        commonServices.operationLog(paras1).then(function(data){
            $scope.sucess==data;
        });
        //获取优秀员工
        var paras2= commonServices.getBaseParas();

        goodJobService.getGoodEmployee(paras2).then(function(data){
            $scope.GoodEmployee=data;



        });

        //已点赞的缓存
        $scope.likeInfo = JSON.parse(CacheFactory.get('likeInfo'));
        //点赞
        $scope.like=function(items){
            var isLike=false;
            if ($scope.likeInfo){
                for(var i=0;i<$scope.likeInfo.length;i++){
                    if($scope.likeInfo[i].ID==items.ID&&$scope.likeInfo[i].WorkDayNo==$scope.accessEmployee.WorkdayNO){
                        alertService.showAlert("你已经点过赞了");
                        isLike=true;
                        break;
                    }
                }
            }else{
                $scope.likeInfo=[];
            }

            if(!isLike){
                var paras3={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,GoodEmployeeId:items.ID};
                commonServices.submit(paras3,API.addGoodEmployeeLike).then(function(data){
                    if(data.success){
                        //刷新
                        goodJobService.getGoodEmployee(paras2).then(function(data1){
                            $scope.GoodEmployee=data1;

                        });
                        $scope.likeInfo.push({ID:items.ID,WorkDayNo:$scope.accessEmployee.WorkdayNO});
                        CacheFactory.save("likeInfo",$scope.likeInfo);
                    }
                })
            }
        }

        $scope.Submit=function(goodJob){
//            if($scope.accessEmployee.Segment_ID!='PCBA-B13')
//            {
//                alertService.showLoading('你的事业部还未开通为他点赞功能');
//                return;
//            }

            if(typeof (goodJob.toWorkdayNo)=="undefined"){
                alertService.showLoading('请填写被推荐人的工号');
                return;
            }
            if(typeof(goodJob.name)=="undefined"){
                alertService.showLoading('请填写被推荐人的姓名');
                return;
            }
            if(typeof(goodJob.department)=="undefined"){
                alertService.showLoading('请填写被推荐人的部门');
                return;
            }
            if(typeof(goodJob.text)=="undefined"){
                alertService.showLoading('请详细填写主要事迹（不少于50字符）');
                return;
            }
            if(goodJob.text.length>0){
                if(goodJob.text.length<50){
                    alertService.showLoading('请详细填写主要事迹（不少于50字符）');
                    return;
                }
                var paras={ WorkdayNO: $scope.accessEmployee.WorkdayNO,
                    Token:$scope.accessEmployee.Token,
                    name:goodJob.name,
                    toWorkdayNo:goodJob.toWorkdayNo,
                    department:goodJob.department,
                    specialPropose:goodJob.text};
                // var paras={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,specialPropose:goodJob.text};

                commonServices.submit(paras,API.SubmitSpecialPropose).then(function(data){
                    if(data.success){
                        alertService.showAlert('提交成功，谢谢弘扬正能量');

                        $ionicHistory.goBack();

                    }
                    else{
                        alertService.showAlert(data.message);
                    }
                });
            }
        }

    })
    .controller('KqjlCtrl', function($scope,$ionicHistory,$state,$ionicLoading,kqService,alertService,CacheFactory) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
//        $scope.days = [{day:'三天'},{day:'五天'},{day:'七天'},{day:'一个月'},{day:'两个月'}];

        $scope.getKQ=function(params){
            $scope.kqjl=null;
            kqService.getKq(params).then(function(data){
                if(data=="Token is TimeOut")
                {
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                $scope.kqjl=data;
                $scope.kqcount=$scope.kqjl.length;
            });
        };

        $scope.day= "三天";
        //默认加载三天记录
        $scope.getKQ({ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,day:$scope.day});

        $scope.selday=function(day){

            var params={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,day:day};
            $scope.getKQ(params);
        };

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
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
    .controller('CustCtrl', function($scope,$location,$ionicLoading,custService,alertService,CacheFactory) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        var params1={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token};
        custService.getCustOddfare(params1).then(function(data){
            if(data.success)
            {
                $scope.oddfare=data.obj.Oddfare;
            }
            else
            {
                if(data.message=="Token is TimeOut"){
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                $scope.oddfare='暂时查询不到';
            }

        });

        $scope.getCost=function(params){
            $scope.custList=null;
            custService.getCust(params).then(function(data){
                if(data.success)
                {

                    $scope.custList=data.list;
                    $scope.custCount=$scope.custList.length;
                    $scope.oddfare=data[0].Oddfare;
                }
                else
                {
                    if(data.message=="Token is TimeOut"){
                        alertService.showAlert("登录失效，请重新登录");
                        $state.transitionTo('signin');
                    }
                }

            });
        };

        $scope.day= "三天";
        //默认加载三天记录
        $scope.getCost({ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,day:$scope.day});

        $scope.selday=function(day){

            var params={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,day:day};
            $scope.getCost(params);
        };


    })
    .controller('NoticeListCtrl', function($scope,$ionicScrollDelegate,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices) {

        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));

        $scope.$on("$ionicView.beforeEnter", function() {
            var clearHistoryForIndexPage = function() {
                var history = $ionicHistory.forwardView();
                if (!history) {
                    var params= commonServices.getBaseParas();
                    $scope.GetDateList();

                    $ionicScrollDelegate.scrollTop();
                }
            };
            clearHistoryForIndexPage();
        });

        $scope.GetDateList=function(){
            var params= commonServices.getBaseParas();
            var url=commonServices.getUrl("MsgService.ashx","GetNoticeList");
            commonServices.getDataList(params,url).then(function(data){
                if(data=="Token is TimeOut"){
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                $scope.noticeList=data;


                for(var i=0;i<$scope.noticeList.length;i++){

                    if($scope.noticeList[i].ImgPath==null||$scope.noticeList[i].ImgPath== "undefined"){
                        $scope.noticeList[i].ImgPath='img/user-100.png'
                    }
                }

            });
        };

        $scope.open=function(notice){
            CacheFactory.remove('noticeID');
            CacheFactory.save('noticeID',notice.NoticeID);
            $state.go('noticeHtml');
        };

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('NoticeHtmlCtrl', function($scope,$rootScope,commonServices,$ionicModal,CacheFactory,noticeService,alertService,$state,$ionicHistory,$location) {

        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        var noticeID=CacheFactory.get('noticeID');

        var strHtml='';
        $scope.ReadCount=0;
        $scope.LikeCount=0;
        var params={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,NoticeID:noticeID};

        commonServices.getDataList(params,API.GetNoticeHTML).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            strHtml=data[0].NoticeHtml;
            $('#div_html').html(strHtml);
            CacheFactory.remove('noticeID');
            $scope.ReadCount=data[0].ReadCount;
            $scope.LikeCount=data[0].LikeCount;
            $scope.getComments();

        });

        $scope.like=function(){

            var url=commonServices.getUrl("MsgService.ashx","AddLike");
            commonServices.submit(params,url).then(function(data){
                if(data.success){
                    $scope.LikeCount=  $scope.LikeCount+1;
                }

            });
        };



        $ionicModal.fromTemplateUrl('templates/modalWriteMsg.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal
        })
        $scope.writeMsg = function() {

            $scope.modal.show();

        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });


        $scope.submit=function(){

            var Comments = $("#Comments").val(); //获取
            if(Comments.length==0)
            {
                console.log(Comments);
                return;
            }


            params.SID=noticeID;
            params.Model='Notice';
            params.Comments=Comments;

            var url=commonServices.getUrl("MsgService.ashx","AddComments");
            commonServices.submit(params,url).then(function(data){
                if(data.success){
                    $scope.modal.hide();
                    $scope.getComments();
                }
                else{
                    alertService.showAlert(data.message);
                }
            });

        }

        $scope.getComments=function(){
            var url=commonServices.getUrl("MsgService.ashx","GetReplyComments");
            commonServices.getDataList(params,url).then(function(data){
                 $scope.replyList=data;

            });
        }

        $scope.closePass=function(){
            $rootScope.fromHome='';
            //CacheFactory.remove('noticeID');
//            $ionicHistory.nextViewOptions({
//                disableAnimate: true,
//                disableBack: true
//            });
            $state.go('tab.home');
        }

//        noticeService.getNoticeHTML(params).then(function(data){
//
//            if(data=="Token is TimeOut"){
//                alertService.showAlert("登录失效，请重新登录");
//                $state.transitionTo('signin');
//            }
//            strHtml=data;
//
//
//            $('#div_html').html(strHtml);
//            CacheFactory.remove('noticeID');
//        });



    })
    .controller('EarthdayNoticeListCtrl', function($scope,$ionicScrollDelegate,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices) {

        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));

        $scope.$on("$ionicView.beforeEnter", function() {
            var clearHistoryForIndexPage = function() {
                var history = $ionicHistory.forwardView();
                if (!history) {
                    var params= commonServices.getBaseParas();
                    $scope.GetDateList();

                    $ionicScrollDelegate.scrollTop();
                }
            };
            clearHistoryForIndexPage();
        });

        $scope.GetDateList=function(){
            var params= commonServices.getBaseParas();
            var url=commonServices.getUrl("MsgService.ashx","GetEarthWeekNoticeList");
            commonServices.getDataList(params,url).then(function(data){
                if(data=="Token is TimeOut"){
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                $scope.noticeList=data;


                for(var i=0;i<$scope.noticeList.length;i++){

                    if($scope.noticeList[i].ImgPath==null||$scope.noticeList[i].ImgPath== "undefined"){
                        $scope.noticeList[i].ImgPath='img/user-100.png'
                    }
                }

            });
        };

        $scope.open=function(notice){
            CacheFactory.remove('noticeID');
            CacheFactory.save('noticeID',notice.NoticeID);
            $state.go('noticeHtml');
        };

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('ApplyCtrl', function($scope,$rootScope,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices) {

//        $scope.test='45625824057432332842230066245823423270784587322300590560598210008624961232332842240574345625823328424582344576622405743456258588953';
//
//        if($scope.test.indexOf( $rootScope.accessEmployee.WorkdayNO)!=-1)
//        {
//            $scope.testSee=true;
//        }
//        else
//        {
//            $scope.testSee=false;
//        }
//
//        console.log($scope.testSee);
        var paras= commonServices.getBaseParas();
        var url=commonServices.getUrl("ApplySubmitService.ashx","GetApplyList");
        commonServices.getDataList(paras,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.applyList=data;


        });

        $scope.open=function(apply){
            CacheFactory.remove('applyID');
            CacheFactory.save('applyID',apply.NoticeID);

            $state.go('applyHtml');
        };

        $scope.openTicket=function(apply){

            $state.go('applyTicket');
        };

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('ApplyHtmlCtrl', function($scope,CacheFactory,noticeService,alertService,$state,$ionicPopup,$ionicHistory,$location,commonServices) {


        $scope.applyItem=JSON.parse(CacheFactory.get('applyID'));
        var applyID=$scope.applyItem.NoticeID;


        var strHtml='';
        var paras= commonServices.getBaseParas();
        paras.ApplyID=applyID;


       var  url=commonServices.getUrl("ApplySubmitService.ashx","GetApplyHTML");
        commonServices.getData(paras,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            strHtml=data;
            $('#Apply_html').html(strHtml);

        });


        $scope.Submit=function() {
            $ionicPopup.confirm({
                title: '提示',
                template: '确定报名吗？',
                okText:"OK"
            }) .then(function(res) {
                if(res) {
                    var url=commonServices.getUrl("ApplySubmitService.ashx","SubmitApply");
                    commonServices.submit(paras, url).then(function (data) {
                        if (data.success) {
                            alertService.showAlert('提交成功');

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
    .controller('ApplyTicketCtrl', function($scope,$rootScope,CacheFactory,noticeService,alertService,$state,$ionicPopup,$ionicHistory,$location,commonServices) {

        var myPopup = $ionicPopup.show({
            templateUrl: 'templates/applySubmit/ticketProtocolHtml.html',
            cssClass:'my-custom-popup-Alter',
            title: '免责声明',
            subTitle: '',
            scope: $scope,
            buttons: [
                {
                    text: '<b>确定</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        return ;
                    }
                }
            ]
        });
        var strHtml='';
        var paras= commonServices.getBaseParas();





        $scope.selDateList=[{date:'请选择'},{date:'2018-02-10'},{date:'2018-02-11'},{date:'2018-02-12'},{date:'2018-02-13'},{date:'2018-02-14'},{date:'2018-02-15'}];



        $scope.Submitdata ={
            selectedDate:"请选择",
            selectedLine : "",
            selectedStation: "",
            MobileNoByUser: $rootScope.accessEmployee.MobileNo
        }

        $scope.selDate=function(selectedDate){
            $scope.Linelist='';
            $scope.Stationlist='';
            $scope.Submitdata.selectedLine='';
            $scope.Submitdata.selectedStation='';
            $scope.Submitdata.selectedDate=selectedDate;
            paras.selDate=selectedDate;
            var  url=commonServices.getUrl("ApplySubmitService.ashx","GetApplyTickeLine");
            commonServices.getDataList(paras,url).then(function(data){

                if(data=="Token is TimeOut"){
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                $scope.Linelist=data;
            });

        }

        $scope.other='false';

        $scope.selLine=function(selectedLine){
            $scope.Submitdata.selectedLine=selectedLine;



            if(selectedLine=='其他线路'){
                $scope.other='true';
            }else{
                $scope.other='false';
                paras.selline=selectedLine;
                paras.selDate=$scope.Submitdata.selectedDate;
                var  url=commonServices.getUrl("ApplySubmitService.ashx","GetApplyTickeStation");
                commonServices.getDataList(paras,url).then(function(data){

                    if(data=="Token is TimeOut"){
                        alertService.showAlert("登录失效，请重新登录");
                        $state.transitionTo('signin');
                    }
                    $scope.Stationlist=data;
                });
            }

        }


        $scope.selStation=function(selectedStation){
             $scope.Submitdata.selectedStation=selectedStation;

        }




        $scope.Submit=function() {
            if($scope.Submitdata.selectedDate=="请选择"){
                alertService.showAlert('请选择一个日期');
                return;
            }

            if($scope.Submitdata.selectedLine==""){
                alertService.showAlert('请选择一个线路');
                return;
            }
            if($scope.Submitdata.selectedStation==""){
                alertService.showAlert('请选择或者填写一个站点');
                return;
            }


            $ionicPopup.confirm({
                title: '提示',
                template: '确定报名吗？',
                okText:"OK"
            }) .then(function(res) {
                if(res) {
                    paras.submitDate=$scope.Submitdata.selectedDate;
                    paras.submitLine=$scope.Submitdata.selectedLine;
                    paras.submitStation=$scope.Submitdata.selectedStation;
                    paras.submitMobileNo=$scope.Submitdata.MobileNoByUser;


                    console.log( paras);

                    var url=commonServices.getUrl("ApplySubmitService.ashx","SubmitApplyTicke");
                    commonServices.submit(paras, url).then(function (data) {
                        if (data.success) {
                            alertService.showAlert('提交成功,后续会有工作人员联系购票事宜');

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
    .controller('InsuranceCtrl', function($scope,CacheFactory,noticeService,alertService,$state,$ionicHistory,commonServices) {

        var paras= commonServices.getBaseParas();
        var url=commonServices.getUrl("InsuranceService.ashx","GetInsuranceList");
        commonServices.getDataList(paras,url).then(function(data){
            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.InsuranceList=data;
        });

        $scope.open=function(insurance){

            CacheFactory.remove('Insurance_ID');
            CacheFactory.save('Insurance_ID',insurance.Insurance_ID);

            $state.go('insuranceHtml');
        };

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('InsuranceHtmlCtrl', function($scope,CacheFactory,noticeService,alertService,$state,$ionicPopup,$ionicHistory,$location,commonServices) {

        var Insurance_ID=CacheFactory.get('Insurance_ID');

        var strHtml='';
        var paras= commonServices.getBaseParas();
        paras.Insurance_ID=Insurance_ID;


        var  url=commonServices.getUrl("InsuranceService.ashx","GetInsuranceHTML");
        commonServices.getData(paras,url).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            strHtml=data;
            $('#Insurance_html').html(strHtml);

        });


        $scope.Submit=function() {
            $ionicPopup.confirm({
                title: '提示',
                template: '确定报名吗？',
                okText:"OK"
            }) .then(function(res) {
                if(res) {
                    var url=commonServices.getUrl("ApplySubmitService.ashx","SubmitApply");
                    commonServices.submit(paras, url).then(function (data) {
                        if (data.success) {
                            alertService.showAlert('提交成功');

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
    .controller('HomeNoticeCtrl', function($scope,CacheFactory,noticeService,alertService,$state,$ionicHistory,$location) {

        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        var HomeNoticeID=CacheFactory.get('HomeNoticeID');


        var strHtml='';

        var params={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,NoticeID:HomeNoticeID};
        noticeService.getNoticeHTML(params).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            strHtml=data;
            $('#HomeHtml').html(strHtml);
            CacheFactory.remove('HomeNoticeID');
        });
        $scope.closePass=function(){
            CacheFactory.remove('HomeNoticeID');
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }

//        $scope.closePass=function(){
//            $ionicHistory.nextViewOptions({
//                disableAnimate: true,
//                disableBack: true
//            });
////            $location.path("tab/noticeList");
//            $ionicHistory.goBack();
//        };
    })
    .controller('ActivityListCtrl', function($scope,CacheFactory,noticeService,alertService,eHSActService,
        $state,$ionicHistory,commonServices,$location,actionVisitServices) 
    {

        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));

        var params=commonServices.getBaseParas();
        //获取一般活动列表
        noticeService.getActivityList(params).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.activityList=data;

            if(typeof ($scope.activityList) == 'undefined'||$scope.activityList!=null){
                for(var i=0;i<$scope.activityList.length;i++){

                    if($scope.activityList[i].ImgPath==null||$scope.activityList[i].ImgPath== "undefined"){
                        $scope.activityList[i].ImgPath='img/user-100.png'
                    }
                }
            }
        });
        $scope.ChoujiangWorkday='4582342332842470745';
        $scope.shouCj=$scope.ChoujiangWorkday.indexOf( $scope.accessEmployee.WorkdayNO)!=-1;
        //获取是否有抽奖活动列表权限
//        noticeService.getChoujiangList(params).then(function(data){
//
//
//            if(data=="Token is TimeOut"){
//                alertService.showAlert("登录失效，请重新登录");
//                $state.transitionTo('signin');
//            }
//           if(data.success){
//               $scope.shouCj=true;
//               console.log($scope.shouCj);
//           }
//        });

        $scope.openCJ=function(){
            $location.path("choujiang");
        }

//        获取有奖调查列表
//        commonServices.getDataList(params,API.GetResearchList).then(function(data){
//
//            if(data=="Token is TimeOut"){
//                alertService.showAlert("登录失效，请重新登录");
//                $state.transitionTo('signin');
//            }
//            $scope.researchList=data;
//        });
        $scope.openDC=function(research){
            CacheFactory.remove('researchID');
            CacheFactory.remove('ResearchName');
            CacheFactory.save('researchID',research.ID);
            CacheFactory.save('ResearchName',research.ResearchName);
            $state.go('researchHtml');
        };

        $scope.open=function(activity){
            CacheFactory.remove('activityID');
            CacheFactory.save('activityID',activity.ActivityID);
            actionVisitServices.visit(activity.ActivityID); //save state
            console.log(activity.ActivityID);
            $state.go('activityHtml');
        };

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }

        //下线的活动
        $scope.openOfflineAct = function(){
            alertService.showAlert('该活动已下线，欢迎下次参与!');
        };

        //2018-05-23 活动点赞
        $scope.activityGoodName="手语海报设计大赛";
        $scope.activityGoodImg="img/other/handSign.png";
        $scope.openActivityGood = function(){
            $state.go('activityGood');
        };
        
        //2018-06-20 EHS有奖答题活动
        $scope.canShow = !isMultek($scope.accessEmployee.Organization); /*&& IsTestAccount($scope.accessEmployee.WorkdayNO);*/
        eHSActService.getEHSActList(params).then(function(data){
            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }

            $scope.ehsActList=data;
            // if(typeof ($scope.ehsActList) == 'undefined'||$scope.ehsActList!=null){
            //     for(var i=0;i<$scope.ehsActList.length;i++){
            //         if($scope.ehsActList[i].ImageUrl==null||$scope.ehsActList[i].ImageUrl== "undefined"){
            //             $scope.ehsActList[i].ImageUrl='img/user-100.png'
            //         }
            //     }
            // }
        });
        $scope.openEHS=function(activity){
            CacheFactory.remove('ehsAct');
            CacheFactory.save('ehsAct', activity);            
            actionVisitServices.visit(activity.ActID); //save state
            $state.go('activityEHS');
        };

        //历史活动列表
        $scope.outDateActivities=[];
        actionVisitServices.getOutDateActivity($scope);        
    })
    .controller('ActivityGoodCtrl',function($scope,CacheFactory,activityGoodService,alertService,$state,$ionicHistory,commonServices,$location) {
        //2018-05-23 活动点赞
        $scope.imgUrl='img/other/diversity.jpg';

        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        var loginInfo=commonServices.getBaseParas();
        loginInfo.opType='活动点赞';
        loginInfo.opContent='点击进入';
        commonServices.operationLog(loginInfo).then(function(data){
            $scope.sucess==data;
        });

        var MAX_CLICK = 3;
        var KEY_ACT_GOOD='ActivityGood';
        var TActivityGoodEntry = function(itemID, WorkDayNo){
            var self=this;
            self.RefActivityGoodID=0;
            self.WorkdayNo=0;
        }

        //重新加载刷新
        function RefreshActivityGoodList(){
            var loginInfo= commonServices.getBaseParas();
            activityGoodService.getActivityGoods(loginInfo).then(function(resp){
                $scope.Activities=resp.list;
                var arr = JSON.parse(resp.data);
                CacheFactory.save(KEY_ACT_GOOD, arr);
            });
        }
        function GetActivityGoodCache(){
            return JSON.parse(CacheFactory.get(KEY_ACT_GOOD)) || []; //数组
        }

        RefreshActivityGoodList();

        $scope.like = function(item){
            var likeInfo = GetActivityGoodCache();
            var nClick = likeInfo.length;
            if(nClick >= MAX_CLICK){
                alertService.showAlert("最多只能点赞"+MAX_CLICK+"次");
                return;
            }
            var hasClicked=false;
            for(var i=0; i<likeInfo.length; i++){
                var entry = likeInfo[i];
                if(item.ID==entry.RefActivityGoodID
                    && entry.WorkdayNo==$scope.accessEmployee.WorkdayNO
                   ){
                    alertService.showAlert("你已经点过赞了");
                    hasClicked=true;
                    break;
                }
            }
            if(!hasClicked){
                var para={
                    WorkdayNO: $scope.accessEmployee.WorkdayNO,
                    CName: $scope.accessEmployee.CName,
                    Token:$scope.accessEmployee.Token,
                    ItemID:item.ID
                };
                commonServices.submit(para, API.addActivityGoods).then(function(data){
                    if(data.success){
                        var likeInfo = GetActivityGoodCache();
                        likeInfo.push(new TActivityGoodEntry(item.ID, $scope.accessEmployee.WorkdayNO));
                        CacheFactory.save(KEY_ACT_GOOD, likeInfo);
                        //刷新
                        RefreshActivityGoodList();
                    }
                })
            }
        };
    })
    .controller('ActivityEHSCtrl',function($scope,$rootScope,$ionicPopup,
                CacheFactory,alertService,$state,$ionicHistory,commonServices,$location) 
    {
        //2018-06-20 EHS有奖答题活动
        var ehsAct = JSON.parse(CacheFactory.get('ehsAct'));
        $scope.imgUrl = ehsAct.ImageUrl;
        $scope.htmlConent = ehsAct.HtmlConent;

        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));

        var url = commonServices.getUrl("EHSActService.ashx", "GetEHSActDetails");
        var params = { ActID: ehsAct.ActID };
        commonServices.getDataList(params, url).then(function (data) {
            if (data == "Token is TimeOut") {
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }

            if (!data) {
                alertService.showAlert("该活动还没有题目");
                $state.transitionTo('activityList');
                return;
            }
            $scope.researchDetailList = data;
        });
        function CalcFullScore(items){
            var fullScore=0;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                for(var j=0; j<item.Items.length; j++){
                    fullScore += item.Items[j].ItemScore;
                }
            }
            return fullScore;
        }

        $scope.isSumbiting = false;
        $scope.Submit = function () {
            if ($scope.isSumbiting) { return; }
            $scope.isSumbiting = true;

            var SubmitList = [];
            var sumScore = 0;
            var nDoItem = 0;
            var fullScore = CalcFullScore($scope.researchDetailList);

            for (var i = 0; i < $scope.researchDetailList.length; i++) {
                var item = $scope.researchDetailList[i];
                var qChecks = $("input[name='Item" + item.Sort + "'" + "]:checked");
                if (qChecks.length > 0) {
                    nDoItem++;
                }
                for (var j = 0; j < qChecks.length; j++) {
                    var selVaule = $(qChecks[j]).val();
                    if (typeof (selVaule) == 'undefined') {
                        continue;
                    }
                    var sScore = selVaule.split("^")[1];
                    sumScore += parseInt(sScore);
                    SubmitList.push({ Item: item.Sort, ItemResult: selVaule });
                }
            }

            if(fullScore>0 && (sumScore/fullScore < 0.60)){
                alertService.showAlert("分数尚未及格，仍需继续努力!");
                $scope.isSumbiting = false;
                return;
            }

            if (nDoItem != $scope.researchDetailList.length) {
                alertService.showAlert("还有未选择的项目，请选择完成后再提交");
                $scope.isSumbiting = false;
                return;
            }
            else {
                params.WorkdayNo = $scope.accessEmployee.WorkdayNO;
                params.ActID = ehsAct.ActID;
                params.SumScore = sumScore;
                params.SubmitResult = angular.toJson(SubmitList);
                var url = commonServices.getUrl("EHSActService.ashx", "SubmitActResult");
                try {
                    commonServices.submit(params, url).then(function (data) {
                        if (data.success) {
                            var x = parseFloat(data.data)
                            if (x > 0) {
                                $rootScope.money = '红包金额:' + data.data + '元';
                                $rootScope.rebagPopup = $ionicPopup.show({
                                    cssClass: 'er-popup',
                                    templateUrl: 'hongbao.html',
                                    scope: $rootScope
                                });
                                $rootScope.rebagPopup.then(function (res) {
                                    $scope.isSumbiting = false;
                                    //$state.go('activityList');
                                    $state.go('myAccountMoney');
                                });
                            }
                            else {
                                $scope.isSumbiting = false;
                                alertService.showAlert('谢谢你的参与!');
                                $ionicHistory.goBack();
                                $rootScope.updateSlideBox();
                            }
                        }
                        else {
                            $scope.isSumbiting = false;
                            alertService.showAlert(data.message);
                        }
                    }
                    );
                } finally {
                    $scope.isSumbiting = false;
                }
            };
        }
    })    
    .controller('ActivityHtmlCtrl', function($scope,CacheFactory,noticeService,alertService,$state,$ionicHistory,$location,commonServices) {

        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        var activityID=CacheFactory.get('activityID');

        var strHtml='';

        var params={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,ActivityID:activityID};
        noticeService.getActivityHTML(params).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            strHtml=data;

            $('#Activity_html').html(strHtml);
            CacheFactory.remove('activityID');
        });

        noticeService.getActivityDetails(params).then(function(data){

            if(data=="Token is TimeOut"){
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.activityDetailsList=data;

            //总人数
            $scope.activityCount=$scope.activityDetailsList[0].ActivityCount;

            //我的选择
            $scope.MySelItems=$scope.activityDetailsList[0].MySelItems;

            //柱状图
            $scope.labels=[];
            $scope.SelCount=[];
            for(var i=0; i<$scope.activityDetailsList.length;i++){
                $scope.labels.push($scope.activityDetailsList[i].Items);
                $scope.SelCount.push($scope.activityDetailsList[i].Count);
            }

            $scope.series = ['人数'];
            $scope.data = [];
            $scope.data.push($scope.SelCount);
        });

        $scope.CheckChang=function(t){
            $scope.detailsID= t.ID;

            for(var i=0;i<$scope.activityDetailsList.length;i++){

                if($scope.activityDetailsList[i]!=t){
                    $scope.activityDetailsList[i].check=false;
                }
            }
        };
        $scope.Submit=function() {
            if ($scope.detailsID.length > 0) {
                if ($scope.detailsID.length == 0) {
                    alertService.showLoading('请选择后再提交');
                    return;
                }

                var paras = commonServices.getBaseParas();
                paras.ActivityID = activityID;
                paras.detailsID = $scope.detailsID;
                // var paras={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,goldIdeaType:$scope.goldInputIdea.ideaType,goldIdeaContent:$scope.goldInputIdea.text};
                commonServices.submit(paras, API.SubmitActivity).then(function (data) {
                    if (data.success) {
                        alertService.showAlert('提交成功');

                        $ionicHistory.goBack();

                    }
                    else {
                        alertService.showAlert(data.message);
                    }
                });

            }

        }

    })
    .controller('HotPhoneCtrl', function($scope,$window,commonServices,CacheFactory,$ionicHistory,$state) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));

        //记录点击
        var paras1={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,opType:'免费热线电话',opContent:'点击进入'};
        commonServices.operationLog(paras1).then(function(data){
            $scope.sucess=data;
        });

        $scope.Hotline='4001099899';
        $scope.callPhone=function(){
            $window.location.href="tel:"+$scope.Hotline+"";

        }

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }

        $scope.open=function(itmes){
            CacheFactory.save('hotItems', itmes);
            $state.go('hotPhoneDetails');
        }

    })
    .controller('B15HotPhoneCtrl', function($scope,$window,commonServices,CacheFactory,$ionicHistory,$state) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));

        //记录点击
        var paras1={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,opType:'免费热线电话',opContent:'点击进入'};
        commonServices.operationLog(paras1).then(function(data){
            $scope.sucess=data;
        });

        $scope.Hotline='4001099899';
        $scope.callPhone=function(){
            $window.location.href="tel:"+$scope.Hotline+"";

        }

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }
    })
    .controller('HotPhoneDetailsCtrl', function($scope,$window,commonServices,CacheFactory,$ionicHistory,$state) {
        $scope.hotItems =CacheFactory.get('hotItems');
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        if($scope.hotItems==1){
            // 园区热线
            $scope.items=[{description:"400员工服务热线",phone:"4001099899",bz:"24小时值班电话"},
                {description:"工会热线",phone:"18926985395",bz:"24小时值班电话"},
                {description:"心灵热线",phone:"18926985442",bz:"24小时值班电话"},
                {description:"医务室",phone:"18926985310",bz:"24小时值班电话"},
                {description:"园区安全部",phone:"18926988110",bz:"24小时值班电话"},
                {description:"餐厅饭卡",phone:"18926980035",bz:"正常工作日8:30~17:30"},
                {description:"宿舍管理",phone:"18926985305",bz:"24小时值班电话"},
                {description:"园区DL招聘热线",phone:"4001662221",bz:"正常工作日8:30~17:30"} ];
        }
        else if($scope.hotItems==2){
            // B13热线
            $scope.items=[
                {description:"事业部安全部（门禁卡、手机标签）",phone:"5186489",bz:"正常工作日8:30~17:30"},
                {description:"工衣柜管理",phone:"5186335",bz:"24小时值班电话"},
                {description:"在职考勤咨询",phone:"5189082",bz:"正常工作日8:30~17:30"},
                {description:"在职薪资咨询",phone:"5188140",bz:"正常工作日8:30~17:30"},
                {description:"薪酬福利咨询",phone:"5188006",bz:"正常工作日8:30~17:30"},
                {description:"DL新员工咨询热线",phone:"5186137",bz:"正常工作日8:30~17:30"},
                {description:"社会保险咨询",phone:"5188140",bz:"正常工作日8:30~17:30"},
                {description:"工伤事故咨询",phone:"5186629 5189489",bz:"正常工作日8:30~17:30"},
                {description:"离职考勤咨询",phone:"5186300",bz:"正常工作日8:30~17:30"},
                {description:"离职薪资&住房公积金咨询",phone:"5189541",bz:"正常工作日8:30~17:30"},
                {description:"HR沟通热线",phone:"5186026 5186656",bz:"正常工作日8:30~17:30"}];
        }
        else{
            $scope.items=[
                {description:"收集中",phone:"",bz:""}
            ];
        }



        $scope.callB13Phone=function(item){
            $window.location.href="tel:"+item.phone+"";

        }

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }

    })
    .controller('MyMsgCtrl', function($scope,$rootScope,$location,$state,$ionicLoading,myMsgService,alertService,CacheFactory,commonServices) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        var params={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token};

        $rootScope.updateMsgCount=function(){
            commonServices.getMsgCount(params).then(function(data){
                $rootScope.MsgCount=data.MyMsgCount>0?data.MyMsgCount:'';
                $scope.NoticeCount=data.MyNoticeCount>0?data.MyNoticeCount:'';

            });
        };
        myMsgService.getMsgList(params).then(function(data){
            if(data=="Token is TimeOut")
            {
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
            $scope.msgList=data;
        });

        $rootScope.updateMsgCount();
        $scope.open=function(msg){
            CacheFactory.remove('MsgDetails');
            CacheFactory.save('MsgDetails', msg);
            $state.go('tab.myMsgDetail');
        }

    })
    .controller('MyMsgDetailCtrl', function($scope,$location,$ionicLoading,myMsgService,alertService,CacheFactory) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        $scope.MsgDetails = JSON.parse(CacheFactory.get('MsgDetails'));


        var params={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,Msg_ID:$scope.MsgDetails.Msg_ID};
        myMsgService.updateMsgStatus(params).then(function(data){
            if(data=="Token is TimeOut")
            {
                alertService.showAlert("登录失效，请重新登录");
                $state.transitionTo('signin');
            }
        });

    })
    .controller('CarPictureCtrl', function($scope,CacheFactory,commonServices,$state,$ionicHistory) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        //记录点击
        var paras1={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,opType:'班车查询',opContent:'点击进入'};
        commonServices.operationLog(paras1).then(function(data){
            $scope.sucess=data;
        });

        $("#auto-loop").lightGallery({
            mobileSrc         : false, // If "data-responsive-src" attr. should be used for mobiles.
            mobileSrcMaxWidth : 640,   // Max screen resolution for alternative images to be loaded for.
            swipeThreshold    : 50,    // How far user must swipe for the next/prev image (in px).
            hideControlOnEnd : false,
            closable:false
        });

        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }

    })
    .controller('AskAndAnswerCtrl', function($scope,CacheFactory,commonServices,AskAndAnswerService,$state,$ionicHistory) {
//        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
//        //记录点击
//        var paras1={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,opType:'问与答',opContent:'点击进入'};
//        commonServices.operationLog(paras1).then(function(data){
//            $scope.sucess=data;
//        });

        $scope.selKeyword=null;
        function GetList(paras){
            AskAndAnswerService.getAskAndAnswer(paras).then(function(resp){
                $scope.listAskAndAnswer = resp.list;
                $scope.keywords = JSON.parse(resp.data);
            });
        }
        var paras= commonServices.getBaseParas();
        GetList(paras);

        $scope.filterKeyword = function(selKeyword){
            console.log("*** filterKeyword: "+ selKeyword);
            paras.keyword = selKeyword;
            GetList(paras);
        };
        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        }

    })
    .controller('ChartRoomCtrl', function($scope,CacheFactory,commonServices,$state,$ionicHistory,$interval) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));

        //记录点击
        var paras1={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,opType:'聊天室',opContent:'点击进入'};
        commonServices.operationLog(paras1).then(function(data){
            $scope.sucess=data;
        });

        var socket;
        var isSocketConnect = false;

        //建立socket连接
        $scope.socketConnect=function (){
            if (isSocketConnect && (socket.readyState == 1 || socket.readyState == 0)) {
//                $scope.sendSocketMessage(event, "离开聊天室");
                socket.close();
//                $("#btnWs").val("连接");
                // $("#btnWs").ena
                return;
            }
            try {
//                socket = new WebSocket("wss://zhmobile.flextronics.com/chatroom/Socket/SupperWebSocketHandle.ashx"); //socket连接服务端地址
//                socket = new WebSocket("ws://218.213.76.1:8077"); //socket连接服务端地址
                           socket = new WebSocket("wss://zhmobile.flextronics.com/chatroom/Socket/SocketHandler.ashx"); //socket连接服务端地址
//                   socket =new WebSocket("ws://echo.websocket.org/");

            }
            catch (ex) {

                log("系统消息^您的浏览器不支持WebSocket");
                return;
            }

            $scope.timer = $interval(function(){
                $scope.sendSocketMessage(Event, "$$keeplive");
            },30000);

            function reconnect (){
                $scope.socketConnect();
            }

            //相应的socket事件
            //socket建立连接
            socket.onopen = function () {
                //连接成功，将消息广播出去
                isSocketConnect = true;
                $scope.sendSocketMessage(Event, "进入聊天室");


            }
            //socket得到服务端广播的消息
            socket.onmessage = function (event) {
                Log(event.data);
            }
            //socket连接关闭
            socket.onclose = function (event) {

                if(isSocketConnect){
                    Log("系统消息^掉线正在重连");
                    $scope.reconect=$interval(function(){
                        $scope.socketConnect();
                        if (socket.readyState == WebSocket.OPEN){
                            $interval.clear($scope.reconect);
                        }
                    },5000);
                }


            }
            //socket连接出现错误
            socket.onerror = function (event) {

                Log("系统消息^socket connect error"+event.data);
            }
        }

        $scope.socketConnect();

        $scope.sendMsg=function(chat){
            $scope.sendSocketMessage(Event, chat);
        }

        $scope.sendSocketMessage=function(event, msg) {
            if (socket.readyState == WebSocket.OPEN) {
                if ($("#txtMsg").val() == "") {
                    if (!msg) {
                        return; //空文本不发送消息
                    }
                }
                if (!msg) {
                    msg = $scope.accessEmployee.CName+"^"+ $("#txtMsg").val();
                }
                else {
                    msg =  $scope.accessEmployee.CName+"^"+msg;
                }
                socket.send(msg);
                $("#txtMsg").val(""); //清空已输入的数据
                $("#txtMsg").focus();
            }
            else {
                Log("系统消息^你的手机暂时不支持聊天室");
            }
        }



        function Log(msg) {

            $scope.mytime = new Date().toLocaleTimeString();

            var div = document.getElementById("msgContainer1");

            console.log(msg);

            var sMsg= msg.split('^');

            var sName=sMsg[0];
            msg=sMsg[1];

            var sender="sender";
            var triangle="left_triangle";
            if(sName==$scope.accessEmployee.CName){
                sender="receiver";
                triangle="right_triangle";
            }


            msg="<div style=\"width: 40%; margin: auto;\"><p style='font-size: 9px'>"+$scope.mytime+"</p></div><div class=\""+sender+"\"><div><img src=\"img/user.jpg\"> <p>"+sName+"</p></div><div style=\"width: 250px\"><div class=\""+triangle+"\"></div><p>"+msg+"</p></div></div>"

            if(div.innerHTML.length>20000)
            {
                div.innerHTML="";
            }

            msg = div.innerHTML + msg;

            div.innerHTML =msg;

            div.scrollTop = div.scrollHeight;
        }


        $scope.closePass=function(){
            $interval.cancel($scope.timer);
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            isSocketConnect=false;
            socket.close();

            $state.go('tab.home');
        }

    })
    .controller('LightPowerCtrl', function($scope,$rootScope,$ionicSlideBoxDelegate ,$timeout,$state,$location,alertService, CacheFactory ,commonServices,externalLinksService) {
        $rootScope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        if ($rootScope.accessEmployee) {

            $scope.closePass=function(){

                $state.go('tab.home');
            }
            var parameter = commonServices.getBaseParas();

            $scope.ledup=function(){
                parameter.op="led_up";
                commonServices.setLed(parameter).then(function (data) {

                });
            }
            $scope.leddown=function(){
                parameter.op="led_down";
                console.log(parameter);
                commonServices.setLed(parameter).then(function (data) {

                });
            }

        }

    })
    .controller('CJCtrl', function($scope,$rootScope,CacheFactory,commonServices,$state,$ionicHistory,$interval,$ionicPopup,alertService,noticeService) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
     console.log("cj");
        var params= commonServices.getBaseParas();
        var submitParams= params;
        $scope.InitSelect=function(){
            noticeService.getChoujiangGuestList(params).then(function(data){
                if(data.success){
                    console.log("choujiang");
                    $scope.listGuest=data.list;

                }
            });
        }
        $scope.InitSelect();

        $scope.showGuest=function(){

            var html1='';
            for(var i=0;i<$scope.listGuest.length;i++){
                html1=html1+ $scope.listGuest[i].WorkdayNo+" "+$scope.listGuest[i].CName+'<br/>';
                if(i==2) break;
            }

            var html2='<section class="editor selected">'+
                ' <section style="border: 0px none;">'+
//                '<section style="padding: 10px">'+
                '<section>'+
                '<section style="width: 330px;height: 330px;margin:0 auto; border-radius:50%;background-image: url(http://newcdn.96weixin.com/c/mmbiz.qlogo.cn/mmbiz_png/uN1LIav7oJicb1xwsm8bcFPB7HFvv8Ze5y1lJWBfYPnoEfQaqIiaywMib0EK46dmD2LX9ibeoibvhXBMfRspFgjMwwQ/0?wx_fmt=png);background-size: 100% auto;background-repeat: no-repeat;background-position: center; overflow: hidden;color: #db214c;text-align: center;display: flex;display: -webkit-flex;justify-content: center;-webkit-justify-content: center;align-items: center;-webkit-align-items:  center;">'+
                '<section><p style="margin: 0;font-size: 20px;letter-spacing: 3px;line-height: 30px">'+
                '<strong>'+html1+'</strong></p><br/>'+
                '<p style="margin: 0;border: 1px solid #db214c;font-size: 14px;padding: 0 10px"> <strong>吉 祥 如 意</strong></p> </section> </section> </section> </section> </section>';



            $ionicPopup.show({
                template:html2,
                cssClass:'my-custom-popup-Alter',
                title: '抽奖人员',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            return ;
                        }
                    }
                ]
            });
        }


        $scope.selGuest=function(guest){

            submitParams.sumbmitWorkdayNo=guest;

        };




        $scope.isSumbiting=false;

        $scope.Submit=function() {

            if($scope.listGuest.length==0) return;
            if($scope.isSumbiting==true) return;
            $scope.isSumbiting=true;
            try{
                commonServices.submit(submitParams, API.Choujiang).then(function (response) {
                    if (response.success) {
                        $scope.isSumbiting=false;
                        $rootScope.money=''+response.data;
                        $rootScope.rebagPopup=$ionicPopup.show({
                            cssClass:'my-custom-popup',
                            templateUrl: 'hongbaoChoujiang.html',
                            scope: $rootScope
                        });
                        $rootScope.rebagPopup.then(function(res) {

//                    $state.go('tabPoints.points');
                        });

                    }
                    else {
                        $scope.isSumbiting=false;
                        alertService.showAlert('提示',response.message);
                    }
                    // submitParams.sumbmitWorkdayNo='';

                    $scope.InitSelect();
                });
            }
            catch (ex){

            }

        }




        $scope.closePass=function(){
            $interval.cancel($scope.timer);
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });


            $state.go('tab.home');
        }

    })
    .controller('ChoujiangNameCtrl', function($scope,$rootScope,CacheFactory,commonServices,$state,$ionicHistory,$interval,$ionicPopup,alertService,noticeService) {

        $scope.userInput = {
            Employee_ID:'',
            CName:''
        };



        $scope.isSumbiting=false;

        $scope.Submit=function() {

            if($scope.userInput.Employee_ID.length==0) return;
            if($scope.userInput.CName.length==0) return;
            $scope.isSumbiting=true;

            var url=commonServices.getUrl("ChoujiangService.ashx","SubmitName");

            commonServices.submit($scope.userInput,url).then(function(data){
                alertService.showAlert(data.message);

            });
        }



    })
    .controller('ChoujiangGameCtrl', function($scope,$rootScope,CacheFactory,commonServices,$state,$ionicHistory,$interval,$ionicPopup,alertService,noticeService) {

        $scope.userInput = {
            Employee_ID:''

        };



        $scope.isSumbiting=false;

        $scope.Submit=function() {

            if($scope.userInput.Employee_ID.length==0) return;

            $scope.isSumbiting=true;



            var url=commonServices.getUrl("ChoujiangService.ashx","Choujiang_Game");

            try{
                commonServices.submit($scope.userInput,url).then(function(data){
                    if (data.success) {
                        $scope.isSumbiting=false;
                        $rootScope.money=''+data.data;
                        $rootScope.rebagPopup=$ionicPopup.show({
                            cssClass:'my-custom-popup',
                            templateUrl: 'hongbaoChoujiang.html',
                            scope: $rootScope
                        });
                        $rootScope.rebagPopup.then(function(res) {

//                    $state.go('tabPoints.points');
                        });

                    }
                    else {
                        $scope.isSumbiting=false;
                        alertService.showAlert('提示',data.message);
                    }

                    $scope.userInput.Employee_ID="";

                });
            }
            catch(ex){

            }


        }


        $scope.showGuest=function(){
            if($scope.userInput.Employee_ID.length==0) return;
            var html1='';

            var url=commonServices.getUrl("ChoujiangService.ashx","Choujiang_GameResult");
            commonServices.submit($scope.userInput,url).then(function(data){
                if (data.success) {

                    var html2='<section class="editor selected">'+
                        ' <section style="border: 0px none;">'+
                        '<section>'+
                        '<section style="width: 330px;height: 330px;margin:0 auto; border-radius:50%;background-image: url(http://newcdn.96weixin.com/c/mmbiz.qlogo.cn/mmbiz_png/uN1LIav7oJicb1xwsm8bcFPB7HFvv8Ze5y1lJWBfYPnoEfQaqIiaywMib0EK46dmD2LX9ibeoibvhXBMfRspFgjMwwQ/0?wx_fmt=png);background-size: 100% auto;background-repeat: no-repeat;background-position: center; overflow: hidden;color: #db214c;text-align: center;display: flex;display: -webkit-flex;justify-content: center;-webkit-justify-content: center;align-items: center;-webkit-align-items:  center;">'+
                        '<section><p style="margin: 0;font-size: 20px;letter-spacing: 3px;line-height: 30px">'+
                        '<strong>'+data.message+'</strong></p><br/>'+
                        '<p style="margin: 0;border: 1px solid #db214c;font-size: 14px;padding: 0 10px"> <strong>吉 祥 如 意</strong></p> </section> </section> </section> </section> </section>';

                    $ionicPopup.show({
                        template:html2,
                        cssClass:'my-custom-popup-Alter',
                        title: '中奖查询',
                        subTitle: '',
                        scope: $scope,
                        buttons: [
                            {
                                text: '<b>确定</b>',
                                type: 'button-positive',
                                onTap: function(e) {
                                    return ;
                                }
                            }
                        ]
                    });



                }
                else {

                    alertService.showAlert('提示',data.message);
                }

                $scope.userInput.Employee_ID="";

            });


        }

        $scope.txtChange=function(){
            console.log('11');
            if($scope.userInput.Employee_ID.length==0) return;
            if($scope.userInput.Employee_ID.length>=10){
                console.log('aa');
                var url=commonServices.getUrl("AccountService.ashx","GetOneCartID");

                try{
                    commonServices.getData($scope.userInput,url).then(function(data){
                        if(data=='读取不到工号数据'){
                            alertService.showAlert(data);
                        }
                        else{
                            $scope.userInput.Employee_ID=data;
                        }
                    });
                }
                catch(ex){

                }



            }
        }


    })

    .controller('PhotoCtrl', function($scope,$rootScope,$ionicSlideBoxDelegate ,$timeout,$state,$location,alertService, CacheFactory ,commonServices,externalLinksService) {
        $rootScope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        if ($rootScope.accessEmployee) {

            $scope.closePass=function(){

                $state.go('tab.home');
            }
            var parameter = commonServices.getBaseParas();

            var video=document.getElementById("video");
            var context=canvas.getContext("2d");
              var errocb=function(){
                console.log("sth srong");
                 }
            if(navigator.getUserMedia){
               navigator.getUserMedia({
                   "video":{
                   'optional': [{
                       'sourceId': exArray[1] //0为前置摄像头，1为后置
                   }]
               }},function(stream){
                    video.src=stream;
                     video.play();
                   },errocb);
                }else if(navigator.webkitGetUserMedia){
                navigator.webkitGetUserMedia({"video":true},function(stream){
                   video.src=window.webkitURL.createObjectURL(stream);
                    video.play();
                     },errocb);
               }
            document.getElementById("paizhao").addEventListener("click",function(){
                 context.drawImage(video,0,0,480,640);
                });

        }

    })
;