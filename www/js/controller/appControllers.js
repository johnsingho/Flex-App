angular.module('evaluationApp.appControllers', [])

    .controller('AppCtrl', function($scope,$rootScope,$ionicSideMenuDelegate, $state,$location, CacheFactory,$ionicHistory, SettingFactory, alertService, commonServices) {


        $scope.ver=CacheFactory.get('version');
        $scope.user = JSON.parse(CacheFactory.get('accessUser'));

        console.log($scope.user);
        $scope.login = function (user) {

            if (typeof (user) == 'undefined') {
                alertService.showAlert('工号或密码不能为空');
                return false;
            }
            commonServices.login(user).then(function(data) {
                var result = data;
                if(result.success){
                    CacheFactory.save('accessUser', user);
                   $state.go('tab.home');
                   // $location.path("tab/home");
                }else{
                   alertService.showAlert(result.msg);
//                    alertService.showAlert('6月25号星期天8:00-20:30，系统服务器进行维护，预计12个小时，暂时无法登陆，对此造成的不便，敬请谅解');
                }
            });
        };

        $scope.register=function(){
            $state.go('register');
        };
        $scope.forgetPsw=function(){
            $state.go('forgetPsw');
        }



    })
    .controller('HomeCtrl', function($scope,$rootScope,$ionicSlideBoxDelegate ,$timeout,$state,$ionicPopup,$location,alertService, CacheFactory ,commonServices,externalLinksService) {
        $rootScope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        $scope.checkWorkday='45617446284458895346835046239423328424562588036439086348619594622105851805669585877102405743';


        if ($rootScope.accessEmployee) {

//            var arrayObj = new Array($rootScope.accessEmployee.Organization.replace(/\s+/g, ""));
//            window.plugins.jPushPlugin.setTags(arrayObj);

//           var parameter={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token };
            var parameter= commonServices.getBaseParas();


            commonServices.getHomeSlideImg(parameter).then(function(data) {
                if(data=="Token is TimeOut")
                {
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                $scope.homeSlideImg = data


                $ionicSlideBoxDelegate.$getByHandle("homeSlide").update();
                $timeout(function(){
                    $ionicSlideBoxDelegate.$getByHandle("homeSlide").update();
                }, 10000);
                $timeout(function(){
                    $ionicSlideBoxDelegate.$getByHandle("homeSlide").loop(true);
                }, 10000);

            });

            $rootScope.updateMsgCount=function(){
                commonServices.getMsgCount(parameter).then(function(data){
                    $rootScope.MsgCount=data.MyMsgCount>0?data.MyMsgCount:'';
                    $scope.NoticeCount=data.MyNoticeCount>0?data.MyNoticeCount:'';

                });
            };

            $rootScope.updateMsgCount();

            $rootScope.updateSlideBox=function(){
                $ionicSlideBoxDelegate.$getByHandle("homeSlide").next();
            }


        } else {
            alertService.showAlert('凭证过时，请重新登录');
            $state.go('signin');
        }

        $scope.openNotice=function(homeImg){
           if(homeImg.NoticeID.length>0) {

               CacheFactory.save('HomeNoticeID',homeImg.NoticeID);
               $location.path('HomeNotice');
           }

        };



        $scope.open=function(action){

            switch (action)
            {
                case "自评":
                      $state.go('tabPoints.rules');
                    break;
                case "金点子":
                    $state.go("tabGoldIdea.goldidea");
//                    $location.path("handbook_item1");
                    break;
                case "train":
                    try {
                        externalLinksService.openUr('https://zhmobile.flextronics.com/EvaluationApp/course/course/1.html');
                    }
                    catch (ex) {
                        alertService.showAlert(ex.message);
                    }
                    break;
                case "E-gate":
                try {

                    externalLinksService.openUr('https://zhmobile.flextronics.com/egate/Login/Signin.aspx');
                }
                catch (ex) {
                    alertService.showAlert(ex.message);
                }
                break;
                case "员工手册":

                    $state.go("handbook_lg");
                    break;
                case "报名":

                    $state.go("apply");
                    break;
                case "map":

                    $state.go("baiduMap");
                    break;
                case "保险":

                    $state.go("insurance");
                    break;
            }


            if(action=='自评'){
                $state.go('tabPoints.rules');
            }else if(action=='金点子'){
                $state.go("tabGoldIdea.goldidea");
            }
            else if(action=="为TA点赞"){
                $location.path("tab/goodJob");
            }
            else if(action=="考勤查询"){
                $location.path("tab/kqjl");
            }
            else if(action=="消费查询"){
                $location.path("tab/cust");
            }
            else if(action=="内部招聘"){

//                try {
////                    window.open('https://appcentermobile.flextronics.com/mobileac/www/login.html', '_blank', 'location=no');
////                    window.cordova.InAppBrowser.open('https://appcentermobile.flextronics.com/mobileac/www/login.html');
//
//                        //window.cordova.InAppBrowser.open('http://insight.flextronics.com/t/LASI/views/ZhuhaiVoluntary/ZhuhaiVoluntary?:embed=y&:showShareOptions=true&:display_count=no&:showVizHome=no','_blank','location=no');
//                    externalLinksService.openUr('https://zhmobile.flextronics.com/EvaluationApp/download/13.pdf');
//                }
//                catch (ex) {
//                    alertService.showAlert(ex.message);
//                }



                var timestamp = Date.parse(new Date());
                externalLinksService.openUr('https://zhmobile.flextronics.com/InterHiringApp/www/interhr.html?workdayNo='+$scope.accessEmployee.WorkdayNO+'&timestamp='+timestamp);

                //记录点击
                var paras1= commonServices.getBaseParas();
                paras1.opType='内部招聘';
                paras1.opContent='点击进入';
               var paras1={ WorkdayNO: $scope.accessEmployee.WorkdayNO,Token:$scope.accessEmployee.Token,opType:'内部招聘',opContent:'点击进入'};
                commonServices.operationLog(paras1).then(function(data){
                    $scope.sucess=data;
                });

            }
            else if(action=="园区公告"){
                $location.path("noticeList");

            }
            else if(action=="热线电话"){
                if($rootScope.accessEmployee.Organization=='Campus Resource B15'){
                    $location.path("b15hotPhone");
                }
                else if($rootScope.accessEmployee.Organization=='Regional Resource B15'){
                    $location.path("b15hotPhone");
                }
//                else if($rootScope.accessEmployee.Organization=='PCBA 57'){
//                    $location.path("b15hotPhone");
//                }
                else
                {
                    $location.path("hotPhone");
                }

            }
            else if(action=="班车信息"){
                $location.path("carPicture");
            }
            else if(action=="活动"){
                $location.path("activityList");

            }
            else if(action=="聊天室"){
                $location.path("chartRoom");

            }
            else if(action=="问与答"){
                $location.path("askAndAnswer");

            }
            else if(action=="灯光控制"){
                $location.path("lightPower");

            }
            else if(action=="抽奖"){
                $location.path("choujiang");

            }
            else if(action=="拍照"){
                $location.path("Photo");

            }
            else if(action=="问卷调查"){
               $location.path("researchList");
                //$state.go("tab.404");

            }
            else if(action=="点餐"){
               $state.go("tabMealOrder.mealList");
                //$state.go("tab.404");
                var myPopup = $ionicPopup.show({
                    templateUrl: 'templates/mealOrder/mealProtocolHtml.html',
                    cssClass:'my-custom-popup',
                    title: '订餐须知',
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
            else if(action=="我要求助"){

                $state.go("tabAskForHelp.askForHelp");
            }
            else if(action=="shareCar"){
                $state.go("tab_ShareCar.List");
                $ionicPopup.show({
                    title: 'Flex汽车共享信息服务协议',
                    cssClass:'my-custom-popup',
                    templateUrl: 'templates/shareCar/protocolHtml.html',
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
            else if(action=="B11Workshop"){
                $state.go("b11WorkShopHome");
            }




        }
    })
    .controller('RegCtrl', function($scope,$location,$ionicLoading,commonServices,alertService) {
        $scope.passmodels = {
            workdayNo:null,
            mobile: null,
            securityCode: null,
            newPassword: null,
            newPasswordAgain: null
        };
        $scope.closePass = function () {
            $location.path('signin');
        };
        $scope.btnText='获取验证码';
        $scope.myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        $scope.getSecurityCode=function(passmodels){

            if(! $scope.myreg.test(passmodels.mobile)) {
                alertService.showAlert('请输入正确的手机号');
                return false;
            };

            commonServices.getSecurityCode({WorkdayNo:passmodels.workdayNo,Mobile:passmodels.mobile}).then(function (response) {

                if (response.success) {
                    var oBtn = document.getElementById('btnSecurity');
                    oBtn.disabled = 'disabled';
                    var i=60;
                    $ionicLoading.show({ template: '验证码已发送', noBackdrop: true, duration: 2000 });
                    var id= setInterval(function(){
                        i=i-1;
                        $scope.$apply(function(){
                            $scope.btnText=i+'秒后重新获取';
                        });
                        if(i==0){
                            $scope.$apply(function(){
                                $scope.btnText='获取验证码';
                            });
                            oBtn.disabled=false;
                            clearInterval(id);
                        };
                    },1000);//1000为1秒钟

                }
                else  {
                    alertService.showAlert( response.message);
                }
            });
        };

        $scope.checkSecurityCode=function(passmodels){
            commonServices.checkSecurityCode({WorkdayNo:passmodels.workdayNo,Mobile:passmodels.mobile,SecurityCode:passmodels.securityCode}).then(function (response) {
                if (response.success) {
                    document.getElementById("message").style.display="none";//显示
                    document.getElementById("reg").style.display="";//显示
                }
                else  {
                    alertService.showAlert( response.message);
                }
            });
        }

        $scope.register=function(passmodels){

            if(passmodels.newPassword==null){
                alertService.showAlert( '密码不能为空！');

                return;
            }

            if(passmodels.newPassword.replace(""," ").length==0){
                alertService.showAlert( '密码不能为空！');
                return;
            }

            if(passmodels.newPassword!=passmodels.newPasswordAgain){
                alertService.showAlert( '两次密码不一致！');
                return;
            }

            commonServices.register({WorkdayNo:passmodels.workdayNo,Password:passmodels.newPassword}).then(function (response) {
                if (response.success) {
                    alertService.showAlert( '注册成功，请重新登录！');

                    $location.path('signin');
                }
                else  {
                    alertService.showAlert( response.message);
                }
            })
        };

    })
    .controller('ForgetPswCtrl',  function($scope,$location,$ionicLoading,alertService,commonServices) {
        $scope.passmodels = {
            workdayNo:null,
            mobile: null,
            securityCode: null,
            newPassword: null,
            newPasswordAgain: null
        };
        $scope.btnText='获取验证码';
        $scope.closePass = function () {
            console.log($scope.passmodels);
            $location.path('signin');
        };

        $scope.myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        $scope.getSecurityCode=function(passmodels){

            commonServices.getForgetPswSecurityCode({WorkdayNo:passmodels.workdayNo,Mobile:passmodels.mobile}).then(function (response) {
                if (response.success) {
                    var oBtn = document.getElementById('btnSecurity');
                    oBtn.disabled=true;
                    var i=60;
                    $ionicLoading.show({ template: '已发送验证码到登记的手机号码上！', noBackdrop: true, duration: 2000 });
                    var id= setInterval(function(){
                        i=i-1;
                        $scope.$apply(function(){
                            $scope.btnText=i+'秒后重新获取';
                        });

                        if(i==0){
                            $scope.$apply(function(){
                                $scope.btnText='获取验证码';
                            });
                            oBtn.disabled=false;
                            clearInterval(id);
                        };
                    },1000);//1000为1秒钟
                }
                else  {
                    alertService.showAlert(  response.message);
                }
            });
        };


        $scope.checkSecurityCode=function(passmodels){
            commonServices.checkSecurityCode({WorkdayNo:passmodels.workdayNo,Mobile:passmodels.mobile,SecurityCode:passmodels.securityCode}).then(function (response) {
                if (response.success) {
                    document.getElementById("message").style.display="none";//显示
                    document.getElementById("reg").style.display="";//显示

                }
                else  {
                    alertService.showAlert(  response.message);
                }
            });
        }

        $scope.register=function(passmodels){

            if(passmodels.newPassword==null){
                alertService.showAlert( '密码不能为空！');

                return;
            }
            if(passmodels.newPassword.replace(""," ").length==0){
                alertService.showAlert( '密码不能为空！');
                return;
            }
            if(passmodels.newPassword!=passmodels.newPasswordAgain){
                alertService.showAlert('两次密码不一致！');

                return;
            }

            commonServices.register({WorkdayNo:passmodels.workdayNo,Password:passmodels.newPassword}).then(function (response) {
                if (response.success) {
                    alertService.showAlert('密码修改成功，请重新登录');
                    $location.path('signin');
                }
                else  {
                    alertService.showAlert( response.message);
                }
            })
        };
    })
    .controller('PassCtrl', function($scope,$state,$location,$ionicPopup,IonicService,CacheFactory) {
        $scope.passmodels = {
            workdayNo:null,
            mobile: null,
            securityCode: null,
            newPassword: null,
            newPasswordAgain: null
        };
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        $scope.closePass = function () {
            console.log($scope.passmodels);
            $state.transitionTo('menu.tab.home');
        };
        $scope.setPass=function(passmodels){

            if (passmodels.password == null) {
                warningForm(null, "当前密码不能为空！");
                return ;
            }
            if (passmodels.newPassword == null) {
                warningForm(null, "新密码不能为空！");
                return;
            }
            if (passmodels.newPasswordAgain == null) {
                warningForm(null, "重复密码和新密码输入不同！");
                return;
            }

            IonicService.postToServer({WorkdayNO: $scope.accessEmployee.WorkdayNO,OldPassword:passmodels.password,Password:passmodels.newPassword},API.RestPassword).then(function (response) {
                if (response.success) {
                    $ionicPopup.alert({title:'提示',template: '修改完成，请重新登录'
                    });
                    $location.path('signin');
                }
                else  {
                    $ionicPopup.alert({title:'提示',template:  response.message
                    });
                }
            })
        };

    })
    .controller('AccountCtrl', function($scope,$location,$state,$cordovaAppVersion,$ionicHistory,CacheFactory) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        $cordovaAppVersion.getVersionNumber().then(function (version) {
            $scope.version= version;
        });
        // 退出
        $scope.signOut = function () {
//            CacheFactory.remove('accessToken');
//            CacheFactory.remove('accessEmployee');
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $location.path('signin');
            //$state.go("signin");

        };
        $scope.quit = function () {
            ionic.Platform.exitApp();
        }
        $scope.modifyPsw=function(){
            $state.go('tab.password');
        }
        $scope.Money=function(){
            $state.go('myAccountMoney');
        }

    })
;
