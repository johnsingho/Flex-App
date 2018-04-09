/**
 * Created by dmneeoll on 2017-08-19.
 */
angular.module('evaluationApp.sharCarController', [])
    .controller('ShareCarListCtrl',function($scope,$rootScope,$state,$ionicPopup,$ionicModal,$ionicHistory,commonServices,CacheFactory,alertService,$ionicScrollDelegate){
        var params=commonServices.getBaseParas();
        //$scope.MobileNo=$rootScope.accessEmployee.MobileNo;

        $scope.$on("$ionicView.beforeEnter", function() {
            var clearHistoryForIndexPage = function() {
                var history = $ionicHistory.forwardView();
                if (!history) {
                    $scope.GetDateList();
                }
            };
            clearHistoryForIndexPage();
        });


        $scope.GetDateList=function(){
            var url=commonServices.getUrl("ShareCarService.ashx","GetCarOrderList");
            commonServices.getDataList(params,url).then(function(data){
                if(data=="Token is TimeOut"){
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                $scope.carInfoList=data;
                $ionicScrollDelegate.scrollTop();

            });
        };

        $scope.flexCarAuthentication;
        $scope.GetCarAuthentication=function(){
            var url=commonServices.getUrl("ShareCarService.ashx","GetFlexCarInfo");
            commonServices.getDataList(params,url).then(function(data){
                if(data=="Token is TimeOut"){
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                $scope.flexCarAuthentication=data;

            });
        };

        $scope.GetCarAuthentication();



        $scope.open=function(carInfo){

            CacheFactory.remove('CarInfo');
            CacheFactory.save('CarInfo', carInfo);
            $state.go('tab_ShareCar.Detail');
        }


        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        };


        $ionicModal.fromTemplateUrl('templates/modalCar.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal
        })
        $scope.openModal = function() {

            $scope.modal.show();



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



        $scope.typeList=[{type:'我是车主',values:1},{type:'我是乘客',values:0}];
        $scope.isHaveCar=-1;

        $scope.selType=function(sel){
            $scope.isHaveCar=-1;
            if(sel.type=='我是车主'){

                if(angular.isObject($scope.flexCarAuthentication)){
                    $scope.Submitdata.CarNo=$scope.flexCarAuthentication[0].CarNo;
                }else
                {
                    alertService.showAlert("非伟创力认证车主，请到APPCenter系统中申请车位认证");
                    return;
                }
            }
            $scope.isHaveCar=sel.values;
            setTimeout( function (){
                var now = new Date();
                var nowAddHour = new Date();
                 nowAddHour.setHours(nowAddHour.getHours()+3);
                var str = now.getFullYear() + "-" + fix((now.getMonth() + 1),2) + "-" + fix(now.getDate(),2) + "T" + fix(now.getHours(),2) + ":" + fix(now.getMinutes(),2)+ ":" + fix(now.getSeconds(),2);
                var strAddHour = nowAddHour.getFullYear() + "-" + fix((nowAddHour.getMonth() + 1),2) + "-" + fix(nowAddHour.getDate(),2) + "T" + fix(nowAddHour.getHours(),2) + ":" + fix(nowAddHour.getMinutes(),2)+ ":" + fix(nowAddHour.getSeconds(),2);
                $("#stTime").val(str);
                $("#eTime").val(strAddHour);
                $("#startTime2").val(str);
                $("#endTime2").val(strAddHour);
            },500);

        }


        $scope.seatNumber="请选择";
        $scope.selSeatNumber=function(seatNumber){

            $scope.seatNumber=seatNumber;
        };

        $scope.Submitdata ={
            CarNo : "",
            StartPoint: "",
            EndPoint : "",
            MidPoint: "",
            Description : "",
            MobileNo: $rootScope.accessEmployee.MobileNo
        }



        $scope.submit=function(){


            if($scope.seatNumber=="请选择"){
                alertService.showLoading("请选择座位数");
                return;
            }
            params.MobileNo=$scope.Submitdata.MobileNo;
            params.CarNo=$scope.Submitdata.CarNo;
            params.StartPoint=$scope.Submitdata.StartPoint;
            params.IsHaveCar=$scope.isHaveCar;
            params.EndPoint=$scope.Submitdata.EndPoint;
            params.MidPoint=$scope.Submitdata.MidPoint;

            if($scope.isHaveCar==1){
                params.TimeStart=$("#stTime").val();
                params.EndTime=$("#eTime").val();
            }else
            {
                params.TimeStart=$("#startTime2").val();
                params.EndTime=$("#endTime2").val();
            }

            params.Description=$scope.Submitdata.Description;
            params.SeatNumber=$scope.seatNumber;


            var url=commonServices.getUrl("ShareCarService.ashx","SubmitOder");
            commonServices.submit(params,url).then(function(data){
                if(data.success){
                    $scope.modal.hide();
                    $state.go("tab_ShareCar.List");
                    $scope.GetDateList();

                }
                else{
                    alertService.showAlert(data.message);
                }
            });

        }



    })
    .controller('ShareCarDetailCtrl', function($scope,$state,$location,$ionicLoading,commonServices,alertService,CacheFactory,$ionicPopup,$ionicScrollDelegate) {
        $scope.accessEmployee = JSON.parse(CacheFactory.get('accessEmployee'));
        $scope.carInfo = JSON.parse(CacheFactory.get('CarInfo'));

        var params=commonServices.getBaseParas();
        $scope.doRefresh = function(){
            $scope.getReplyList();
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.getReplyList=function(){
            params.MainID= $scope.carInfo.IID;

            var url=commonServices.getUrl("ShareCarService.ashx","GetReplyList");
            commonServices.getDataList(params,url).then(function(data){
                if(data=="Token is TimeOut"){
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }
                $scope.replyList=data;

            });
        }

        $scope.getReplyList();

        $scope.Submitdata ={
            ReplyContent : "",
            Reply_All : "",
            MainID: $scope.carInfo.IID,
            ReplyWorkdayNo : $scope.accessEmployee.WorkdayNO
        };


        $scope.submitReply=function(){
            if($scope.Submitdata.ReplyContent==""){
                alertService.showLoading("请先填写内容");
                return;
            }
            params.ReplyContent=$scope.Submitdata.ReplyContent;
            params.MainID=$scope.Submitdata.MainID;
            params.ReplyWorkdayNo=$scope.Submitdata.ReplyWorkdayNo;

            var url=commonServices.getUrl("ShareCarService.ashx","SubmitReply");
            commonServices.submit(params,url).then(function(data){
                if(data.success){
                    $scope.getReplyList();
                    $scope.Submitdata.ReplyContent="";
                    alertService.showLoading("提交成功");
                    $ionicScrollDelegate.scrollBottom();
                }
                else{
                    alertService.showAlert(data.message);
                }
            });

        };



        $scope.replyTo=function(reply){
            params.ReplyID=reply.ID;
            params.MainID= $scope.carInfo.IID;
            var myPopup = $ionicPopup.show({
                template: '<textarea rows="5" style="font-size:80%" placeholder="发表回帖"  ng-model="Submitdata.Reply_All"></textarea>',
                title: '回复',
                subTitle: '发表回复',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {

                            if ($scope.Submitdata.Reply_All==""||typeof ($scope.Submitdata.Reply_All)=="undefined") {
                                //为空不允许用户关闭


                                alertService.showLoading("请填写回复内容");

                                e.preventDefault();
                            } else {

                                return $scope.accessEmployee.CName+"回复：" +$scope.Submitdata.Reply_All;
                            }
                        }
                    },
                ]
            });

            myPopup.then(function(res) {
                if (typeof (res)=="undefined") {
                    return;
                }
                params.Reply_All=res;
                var url=commonServices.getUrl("ShareCarService.ashx","UpdateReplyALL");
                commonServices.submit(params,url).then(function(data){
                    if(data.success){
                        $scope.getReplyList();
                        $scope.Submitdata.ReplyContent="";
                        $scope.Submitdata.Reply_All="";
                        alertService.showLoading("提交成功");

                    }
                    else{
                        alertService.showAlert(data.message);
                    }
                });
            });
        }



    })
    .controller('ShareMyOrderCtrl',function($scope,$rootScope,$state,$ionicPopup,$ionicModal,$ionicHistory,commonServices,CacheFactory,alertService,$ionicScrollDelegate){
        var params=commonServices.getBaseParas();

        $scope.GetDateList=function(){
            var url=commonServices.getUrl("ShareCarService.ashx","GetMyCarOrderList");
            commonServices.getDataList(params,url).then(function(data){
                if(data=="Token is TimeOut"){
                    alertService.showAlert("登录失效，请重新登录");
                    $state.transitionTo('signin');
                }

                $scope.carInfoList=data;

                $ionicScrollDelegate.scrollTop();

            });
        };

        $scope.GetDateList();

        $scope.open=function(carInfo){
            CacheFactory.remove('CarInfo');
            CacheFactory.save('CarInfo', carInfo);
            $state.go('tab_ShareCar.Detail');
        }


        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tab.home');
        };


        $ionicModal.fromTemplateUrl('templates/modifyCar.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal
        })
        $scope.modifyCarInfo;

        $scope.modifyOrder = function(carInfo) {
            $scope.modifyCarInfo=carInfo;

                setTimeout( function (){
                    $("#stTime").val($scope.modifyCarInfo.TimeStart);
                    $("#eTime").val($scope.modifyCarInfo.EndTime);
                    $("#startTime2").val($scope.modifyCarInfo.TimeStart);
                    $("#endTime2").val($scope.modifyCarInfo.EndTime);
                    $("#selSeat1").val($scope.modifyCarInfo.SeatNumber);
                    $("#selSeat2").val($scope.modifyCarInfo.SeatNumber);
            },600);


            $scope.modal.show();

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


        $scope.selSeatNumber=function(seatNumber){

            $scope.modifyCarInfo.SeatNumber=seatNumber;
        };

        $scope.submit=function(){

            params.MobileNo=$scope.modifyCarInfo.MobileNo;
            params.StartPoint=$scope.modifyCarInfo.StartingPoint;
            params.EndPoint=$scope.modifyCarInfo.EndPoint;
            params.MidPoint=$scope.modifyCarInfo.MidPoint;
            params.IID=$scope.modifyCarInfo.IID;

            if($scope.modifyCarInfo.IsHaveCar==1){
                params.TimeStart=$("#stTime").val();
                params.EndTime=$("#eTime").val();
            }else
            {
                params.TimeStart=$("#startTime2").val();
                params.EndTime=$("#endTime2").val();
            }

            params.Description=$scope.modifyCarInfo.Description;
            params.SeatNumber=$scope.modifyCarInfo.SeatNumber;


            var url=commonServices.getUrl("ShareCarService.ashx","ModifyOrder");
            commonServices.submit(params,url).then(function(data){
                if(data.success){
                    $scope.modal.hide();
//                    $state.go("tab_ShareCar.List");
                    $scope.GetDateList();

                }
                else{
                    alertService.showAlert(data.message);
                }
            });

        }


        $scope.cancelOrder=function(carInfo){


          var confirmPopup=  $ionicPopup.confirm({
                title: '取消订单',
                template: '你确定取消这个订单?'
            });
            confirmPopup.then(function(res) {
                if(res) {

                    params.IID=carInfo.IID;

                    var url=commonServices.getUrl("ShareCarService.ashx","CancelOrder");
                    commonServices.submit(params,url).then(function(data){
                        if(data.success){
                            $scope.modal.hide();

                            $scope.GetDateList();

                        }
                        else{
                            alertService.showAlert(data.message);
                        }
                    });
                } else {
                    return;
                }
            });


        }

    })
;
