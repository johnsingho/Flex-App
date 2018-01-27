angular.module('evaluationApp.appControllers', [])

    .controller('AppCtrl', function($scope,$rootScope,$ionicSideMenuDelegate, $state,$location, CacheFactory,$ionicHistory, SettingFactory, alertService, commonServices) {


        $scope.ver=CacheFactory.get('version');
        $scope.user = JSON.parse(CacheFactory.get('accessUser'));

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
        $scope.checkWorkday='2332842';
        $scope.checkIDNO='23328424582344576622405743456258588953';


        var parameter= commonServices.getBaseParas();

        if ($rootScope.accessEmployee) {

            $scope.showPopup = function () {
                $scope.data = {}

                var myPopup = $ionicPopup.show({
                    templateUrl: 'templates/realNameRegistration/IDNOFilling.html',
                    title: '请进行实名制认证',
                    subTitle: '以免无法使用新功能',
                    scope: $scope,
                    buttons: [
                        { text: 'Cancel' },
                        {
                            text: '<b>Save</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                if (!$scope.data.IDNO) {
                                    //不允许用户关闭，除非他键入wifi密码
                                    e.preventDefault();
                                }
                                else if($scope.data.IDNO.length!=18) {
                                    alertService.showAlert("身份证信息必须是18位");
                                    e.preventDefault();
                                }else {
                                    $scope.submitIDNO($scope.data.IDNO);
                                    return ;
                                }
                            }
                        }
                    ]
                });
            }

            $scope.submitIDNO=function(IDNO){
                parameter.IDNO=IDNO;
                var url=commonServices.getUrl("EvaluationAppService.ashx","RealNameRegistration");
                commonServices.submit(parameter,url).then(function(data){
                    if(data.success){
                        $rootScope.accessEmployee.strIsHRConfirm='WaitRegistration';
                        CacheFactory.save('accessEmployee', $rootScope.accessEmployee);

                        alertService.showAlert('谢谢你的提交，身份证信息需要等待HR确认后，Flex+账户才正式生效');

                    }

                });
            }

            if($rootScope.accessEmployee.strIsHRConfirm=='UnRegistration'||$rootScope.accessEmployee.strIsHRConfirm=='FailedRegistration') {
                $scope.showPopup();

            }

//            if($scope.checkIDNO.indexOf( $rootScope.accessEmployee.WorkdayNO)!=-1)
//            {
//
//            }





            $scope.Scan=function(){
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        if (result.wasCancelled) {
                            popup.loadMsg("返回按钮回到这个页面");
                        }
                        if(result.text.indexOf('http')>=0){
                            externalLinksService.openUr(result.text);
                        }
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    },
                    {
                        preferFrontCamera: false, // iOS and Android
                        showFlipCameraButton: true, // iOS and Android
                        showTorchButton: true, // iOS and Android 显示开起手电筒的按钮
                        torchOn: false, // Android, launch with the torch switched on (if available)  默认开启手电筒
                        prompt: "请将二维码放在扫描框中", // Android 提示信息
                        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 多久开始识别
                        formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                        orientation: "portrait"// Android only (portrait|landscape), default unset so it rotates with the device 垂直还是水平
                        // disableAnimations : true // iOS
                    }
                );
            };




            commonServices.getHomeSlideImg(parameter).then(function(data) {
                if(data=="Token is TimeOut")
                {
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                $scope.homeSlideImg = data;


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

//               CacheFactory.save('HomeNoticeID',homeImg.NoticeID);
//               $location.path('HomeNotice');
               $rootScope.fromHome='home';
                console.log(homeImg.NoticeID);
              // CacheFactory.remove('noticeID');
               CacheFactory.save('noticeID',homeImg.NoticeID);
               $location.path('noticeHtml');
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
                case "choujiang":

                    $state.go("luckyGame");
                    break;
                case "chunwan":

                    $state.go("chunwan");
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
//                $location.path("carPicture");
                $state.go("tabCar.carlist");
            }
            else if(action=="活动"){

                if($rootScope.accessEmployee.Segment_ID=='EF922594-5FB1-409E-A3D8-F7BC940AACD9'){
                    $state.go("luckyGame");
                }

//                else if($scope.checkWorkday.indexOf( $rootScope.accessEmployee.WorkdayNO)!=-1)
//                {
//                    $state.go("luckyGame");
//                }
                else
                {
                    $location.path("activityList");
                }


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
                    cssClass:'my-custom-popup-Alter',
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
                    cssClass:'my-custom-popup-Alter',
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
            CName:null,
            IDNO:null,
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
            if(passmodels.workdayNo.length==0) {
                alertService.showAlert('请输入工号');
                return false;
            };
            if(passmodels.CName.length==0) {
                alertService.showAlert('请输入姓名');
                return false;
            };


            commonServices.getSecurityCode({WorkdayNo:passmodels.workdayNo,CName:passmodels.CName,Mobile:passmodels.mobile}).then(function (response) {

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

            if($scope.passmodels.IDNO ==null){
                alertService.showAlert("身份证号码必须是18位")
                return;
            }
            if(typeof ($scope.passmodels.IDNO) == 'undefined'){
                alertService.showAlert("身份证号码必须是18位")
                return;
            }

            if($scope.passmodels.IDNO.length!=18){
                alertService.showAlert("身份证号码必须是18位")
                return;;
            }

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

            commonServices.register({WorkdayNo:passmodels.workdayNo,IDNO:passmodels.IDNO,Password:passmodels.newPassword}).then(function (response) {
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
    .controller('AccountCtrl', function($scope,$rootScope,$location,$state,$cordovaAppVersion,$ionicHistory,CacheFactory) {

        $cordovaAppVersion.getVersionNumber().then(function (version) {
            $scope.version= version;
        });
        $scope.realName="";
        switch ($rootScope.accessEmployee.strIsHRConfirm){
            case 'UnRegistration':
                $scope.realName='未认证';
                break;
            case 'WaitRegistration':
                $scope.realName='等待HR认证';
                break;
            case 'Registration':
                $scope.realName='已认证';
                break;
            case 'FailedRegistration':
                $scope.realName='认证不通过';
                break;
        }
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
