/**
 * Created by dmneeoll on 2017-08-15.
 */
angular.module('evaluationApp.B11WorkShopController', [])
    .controller('B11WorkShopHomeCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory,alertService){
        $scope.open=function(action){
            if(action=='Agenda'){
                $state.go('agenda');
            }else if(action=='Hotel'){
                $state.go("hotel");
            }
            else if(action=="Contact"){
                $state.go("contact");
            }
            else if(action=="Volunteer"){
                $state.go("volunteer");
            }
            else if(action=="transport"){
                $state.go("transport");
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
    .controller('AgendaCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory,alertService){
        $(".timeline").eq(0).animate({
            height:'2000px'
        },3000);
        $scope.closePass=function(){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('b11WorkShopHome');
        }
    })

    .controller('VolunteerCtrl', function($scope,CacheFactory,commonServices,$state,$ionicHistory) {


        $("#auto-loop").lightGallery({
            mobileSrc         : false, // If "data-responsive-src" attr. should be used for mobiles.
            mobileSrcMaxWidth : 640,   // Max screen resolution for alternative images to be loaded for.
            swipeThreshold    : 50,    // How far user must swipe for the next/prev image (in px).
            hideControlOnEnd : false,
            closable:false
        });



    })

    .controller('RransportCtrl',function($scope,$state,$ionicHistory,commonServices,CacheFactory,alertService){
        var params="";
        var url=commonServices.getUrl("VolunteersService.ashx","GetB11WorkShopCarInof");
        commonServices.getDataList(params,url).then(function(data){

            $scope.carInfoList=data;

        });
    })
;
