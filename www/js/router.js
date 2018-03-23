/**
 * Created by DMNeeoll on 2016/3/22.
 */
/**
 * 路由
 */
angular.module('evaluationApp.router', [])
    .config(['$provide', '$stateProvider', '$urlRouterProvider', function ($provide, $stateProvider, $urlRouterProvider) {

        $stateProvider
//            .state('menu', {
//                url: "/menu",
//                abstract: true,
//                templateUrl: "templates/menu.html",
//                controller: 'AppCtrl'
//            })
            .state('signin', {
                url: '/signin',
                templateUrl: 'templates/tab-signin.html',
                controller: 'AppCtrl'
            })
//            .state('signin', {
//                url: '/signin',
//                templateUrl: 'templates/choujiang/choujiangInPutName.html',
//                controller: 'ChoujiangNameCtrl'
//            })
//            .state('signin', {
//                url: '/signin',
//                templateUrl: 'templates/choujiangForGame/choujiangGame.html',
//                controller: 'ChoujiangGameCtrl'
//            })
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('tab.home', {
                url: '/home',
                views: {
                    'home': {
                        templateUrl: 'templates/tab-home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('tab.goodJob', {
                url: '/goodJob',
                views: {
                    'home': {
                        templateUrl: 'templates/tab-goodJob.html',
                        controller: 'GoodJobCtrl'
                    }
                }
            })
            .state('tab.kqjl', {
                url: '/kqjl',
                views: {
                    'home': {
                        templateUrl: 'templates/tab-kqjl.html',
                        controller: 'KqjlCtrl'
                    }
                }
            })

            .state('tabKQCX', {
                url: "/tabKQCX",
                abstract: true,
                templateUrl: "templates/kqcx/tabkqcx.html"
            })
            .state('tabKQCX.kqjl', {
                url: '/kqjl',
                views: {
                    'kqjl': {
                        templateUrl: 'templates/kqcx/kqjl.html',
                        controller: 'KqjlCtrl'
                    }
                }
            })
            .state('tabKQCX.kqyc', {
                url: '/kqyc',
                views: {
                    'kqyc': {
                        templateUrl: 'templates/kqcx/kqyc.html',
                        controller: 'KqAbnormalCtrl'
                    }
                }
            })
            .state('kqyc', {
                url: '/kqyc',
                templateUrl: 'templates/kqcx/kqyc.html',
                controller: 'KqAbnormalCtrl'
            })
//            .state('tabAskForHelp.myHelp', {
//                url: '/myHelp',
//                views: {
//                    'myHelp': {
//                        templateUrl: 'templates/askForHelp/tab-myHelp.html',
//                        controller: 'MyHelpCtrl'
//                    }
//                }
//            })


            .state('tab.cust', {
                url: '/cust',
                views: {
                    'home': {
                        templateUrl: 'templates/cust/tab-cust.html',
                        controller: 'CustCtrl'
                    }
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('tab.password', {
                url: '/password',
                views: {
                    'account': {
                        templateUrl: 'templates/account/account_password.html',
                        controller: 'PassCtrl'
                    }
                }
            })
            .state('hotPhone', {
                url: '/hotPhone',
                templateUrl: 'templates/hotPhone/tab-hotPhone.html',
                controller: 'HotPhoneCtrl'
            })

            .state('38Activity', {
                url: '/38activity',
                templateUrl: 'templates/38/38activity.html',
                controller: '38ActivityCtrl'
            })

            .state('tabPoints', {
                url: "/tabPoints",
                abstract: true,
                templateUrl: "templates/points/tabPoints.html"
            })
            .state('tabPoints.rules', {
                url: '/rules/:ID',
                views: {
                    'rules': {
                        templateUrl: 'templates/points/tab-rules.html',
                        controller: 'RulesCtrl'
                    }
                }
            })
            .state('tabPoints.points', {
                url: '/points',
                views: {
                    'points': {
                        templateUrl: 'templates/points/tab-points.html',
                        controller: 'PointsCtrl'
                    }
                }
            })
            .state('tabPoints.ranking', {
                url: '/ranking',
                views: {
                    'ranking': {
                        templateUrl: 'templates/points/tab-ranking.html',
                        controller: 'RankingCtrl'
                    }
                }
            })
            .state('tabPoints.account', {
                url: '/PointsAccount',
                views: {
                    'pointsAccount': {
                        templateUrl: 'templates/points/tab-account.html',
                        controller: 'PointsAccountCtrl'
                    }
                }
            })

            .state('tabGoldIdea', {
                url: "/tabGoldIdea",
                abstract: true,
                templateUrl: "templates/goldIdea/tabGoldIdea.html"
            })
            .state('tabGoldIdea.goldIdeaShow', {
                url: '/goldIdeaShow',
                views: {
                    'goldIdeaShow': {
                        templateUrl: 'templates/goldIdea/tab-goldIdeaShow.html',
                        controller: 'GoldIdeaShowCtrl'
                    }
                }
            })
            .state('tabGoldIdea.goldidea', {
                url: '/goldidea',
                views: {
                    'goldIdea': {
                        templateUrl: 'templates/goldIdea/tab-goldIdea.html',
                        controller: 'GoldideaCtrl'
                    }
                }
            })
            .state('tabGoldIdea.myGoldIdea', {
                url: '/myGoldIdea',
                views: {
                    'myGoldIdea': {
                        templateUrl: 'templates/goldIdea/tab-myGoldIdea.html',
                        controller: 'MyGoldideaCtrl'
                    }
                }
            })

            .state('b15hotPhone', {
                url: '/b15hotPhone',
                templateUrl: 'templates/hotPhone/tab-B15hotPhone.html',
                controller: 'B15HotPhoneCtrl'
            })
            .state('hotPhoneDetails', {
                url: '/hotPhoneDetails',
                templateUrl: 'templates/hotPhone/hotPhoneDetails.html',
                controller: 'HotPhoneDetailsCtrl'
            })

            .state('tab.myMsg', {
                url: '/myMsg',
                views: {
                    'msg': {
                        templateUrl: 'templates/myMsg/tab-myMsg.html',
                        controller: 'MyMsgCtrl'
                    }
                }
            })
            .state('tab.myMsgDetail', {
                url: '/myMsgDetail',
                views: {
                    'msg': {
                        templateUrl: 'templates/myMsg/myMsgDetail.html',
                        controller: 'MyMsgDetailCtrl'
                    }
                }
            })

            .state('tab.404', {
                url: '/404',
                views: {
                    'home': {
                        templateUrl: 'templates/404.html'

                    }
                }
            })
            .state('noticeList', {
                url: '/noticeList',
                templateUrl: 'templates/notice/notice-list.html',
                controller: 'NoticeListCtrl'
            })
            .state('noticeHtml', {
                url: '/noticeHtml',
                templateUrl: 'templates/notice/noticeHtml.html',
                controller: 'NoticeHtmlCtrl'
            })
            .state('homeNotice', {
                url: '/HomeNotice',
                templateUrl: 'templates/HomeNotice.html',
                controller: 'HomeNoticeCtrl'
            })

            .state('activityList', {
                url: '/activityList',
                templateUrl: 'templates/activity/activity-list.html',
                controller: 'ActivityListCtrl'
            })
            .state('activityHtml', {
                url: '/activityHtml',
                templateUrl: 'templates/activity/activityHtml.html',
                controller: 'ActivityHtmlCtrl'
            })

            .state('register', {
                url: '/register',
                templateUrl: 'templates/account/account_register.html',
                controller: 'RegCtrl'
            })
            .state('forgetPsw', {
                url: '/forgetPsw',
                templateUrl: 'templates/account/account_forgetPasswordNoMobile.html',
                controller: 'ForgetPswCtrl'
            })

            .state('tabCar', {
                url: "/tabCar",
                abstract: true,
                templateUrl: "templates/carGps/tabCar.html"
            })
            .state('tabCar.carlist', {
                url: '/carlist',
                views: {
                    'carlist': {
                        templateUrl: 'templates/carGps/tab-carList.html',
                        controller: 'CarListCtrl'
                    }
                }
            })
            .state('tabCar.map', {
                url: '/map',
                views: {
                    'map': {
                        templateUrl: 'templates/carGps/tab-map.html',
                        controller: 'BaiduMapCtrl'
                    }
                }
            })
            .state('tabCar.carPicture', {
                url: '/carPicture',
                views: {
                    'carPicture': {
                        templateUrl: 'templates/carGps/tab-carPicture.html',
                        controller: 'CarPictureCtrl'
                    }
                }
            })

            .state('carPicture', {
                url: '/carPicture',
                templateUrl: 'templates/carPicture.html',
                controller: 'CarPictureCtrl'
            })
            .state('chartRoom', {
                url: '/chartRoom',
                templateUrl: 'templates/chartRoom/tab-chartRoom.html',
                controller: 'ChartRoomCtrl'
            })
            .state('askAndAnswer', {
                url: '/askAndAnswer',
                templateUrl: 'templates/askAndAnswer/tab-askAndAnswer.html',
                controller: 'AskAndAnswerCtrl'
            })
            .state('lightPower', {
                url: '/lightPower',
                templateUrl: 'templates/lightPower.html',
                controller: 'LightPowerCtrl'
            })
            .state('Photo', {
                url: '/Photo',
                templateUrl: 'templates/Photo.html',
                controller: 'PhotoCtrl'
            })
            .state('choujiang', {
                url: '/choujiang',
                templateUrl: 'templates/choujiang/choujiangNew.html',
                controller: 'CJCtrl'
            })
            .state('choujiangName', {
                url: '/choujiangName',
                templateUrl: 'templates/choujiang/choujiangInPutName.html',
                controller: 'ChoujiangNameCtrl'
            })

            .state('researchList', {
                url: '/researchList',
                templateUrl: 'templates/research/research-list.html',
                controller: 'ResearchCtrl'
            })
            .state('researchHtml', {
                url: '/researchHtml',
                templateUrl: 'templates/research/researchHtml.html',
                controller: 'ResearchDetailsCtrl'
            })

            .state('tabMealOrder', {
                url: "/tabMealOrder",
                abstract: true,
                templateUrl: "templates/mealOrder/tabMealOrder.html"
            })
            .state('tabMealOrder.mealList', {
                url: '/mealList',
                views: {
                    'mealList': {
                        templateUrl: 'templates/mealOrder/tab-mealList.html',
                        controller: 'MealListCtrl'
                    }
                }
            })
            .state('tabMealOrder.mealLinkMan', {
                url: '/mealLinkMan',
                views: {
                    'mealLinkMan': {
                        templateUrl: 'templates/mealOrder/tab-mealLinkMan.html',
                        controller: 'MealLinkManCtrl'
                    }
                }
            })
            .state('tabMealOrder.myOrder', {
                url: '/myOrder',
                views: {
                    'myOrder': {
                        templateUrl: 'templates/mealOrder/tab-myOrder.html',
                        controller: 'MyOrderCtrl'
                    }
                }
            })

            .state('myAccountMoney', {
                url: '/myAccountMoney',
                templateUrl: 'templates/account/myAccountMoney.html',
                controller: 'MyAccountMoneyCtrl'
            })
            .state('tabAskForHelp', {
                url: "/tabAskForHelp",
                abstract: true,
                templateUrl: "templates/askForHelp/tabAskForHelp.html"
            })
            .state('tabAskForHelp.askForHelp', {
                url: '/askForHelp',
                views: {
                    'askForHelp': {
                        templateUrl: 'templates/askForHelp/tab-askForHelp.html',
                        controller: 'AskForHelpCtrl'
                    }
                }
            })
            .state('tabAskForHelp.myHelp', {
                url: '/myHelp',
                views: {
                    'myHelp': {
                        templateUrl: 'templates/askForHelp/tab-myHelp.html',
                        controller: 'MyHelpCtrl'
                    }
                }
            })

            .state('b11WorkShopHome', {
                url: '/b11WorkShopHome',
                templateUrl: 'templates/b11Workshop/HomePage.html',
                controller: 'B11WorkShopHomeCtrl'
            })
            .state('agenda', {
                url: '/agenda',
                templateUrl: 'templates/b11Workshop/agenda.html',
                controller: 'AgendaCtrl'
            })
            .state('hotel', {
                url: '/hotel',
                templateUrl: 'templates/b11Workshop/hotel.html'

            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'templates/b11Workshop/contact.html'

            })
            .state('volunteer', {
                url: '/volunteer',
                templateUrl: 'templates/b11Workshop/volunteer.html',
                controller: 'VolunteerCtrl'
            })
            .state('transport', {
                url: '/transport',
                templateUrl: 'templates/b11Workshop/transport.html',
                controller: 'RransportCtrl'
            })

            .state('tab_ShareCar', {
                url: "/tab_ShareCar",
                abstract: true,
                templateUrl: "templates/shareCar/tab_ShareCar.html"
            })
            .state('tab_ShareCar.List', {
                url: '/sharcarList',
                views: {
                    'sharcarList': {
                        templateUrl: 'templates/shareCar/tab-shareCarList.html',
                        controller: 'ShareCarListCtrl'
                    }
                }
            })
            .state('tab_ShareCar.Detail', {
                url: '/shareCarDetail',
                views: {
                    'sharcarList': {
                        templateUrl: 'templates/shareCar/shareCarDetail.html',
                        controller: 'ShareCarDetailCtrl'
                    }
                }

            })
            .state('tab_ShareCar.MyShareCar', {
                url: '/myShareCar',
                views: {
                    'myShareCar': {
                        templateUrl: 'templates/shareCar/tab-myOrder.html',
                        controller: 'ShareMyOrderCtrl'
                    }
                }
            })
            .state('handbook_lg', {
                url: '/handbook_lg',
                templateUrl: 'templates/handBook/handbook_lg.html',
                controller: 'Handbook_lgCtrl'
            })
            .state('HandbookItemOne', {
                url: '/HandbookItemOne',
                templateUrl: 'templates/handBook/handbookItemOne.html',
                controller: 'HandbookItemOneCtrl'
            })
            .state('handbookitemTwo', {
                url: '/handbookitemTwo',
                templateUrl: 'templates/handBook/handbookitemTwo.html',
                controller: 'HandbookItemTwoCtrl'
            })
            .state('handbookitemThree', {
                url: '/handbookitemThree',
                templateUrl: 'templates/handBook/handbookitemThree.html',
                controller: 'HandbookItemThreeCtrl'
            })
            .state('handbookitemFour', {
                url: '/handbookitemFour',
                templateUrl: 'templates/handBook/handbookitemFour.html',
                controller: 'HandbookItemFourCtrl'
            })
            .state('apply', {
                url: '/apply',
                templateUrl: 'templates/applySubmit/apply-list.html',
                controller: 'ApplyCtrl'
            })
            .state('applyHtml', {
                url: '/applyHtml',
                templateUrl: 'templates/applySubmit/apply-Html.html',
                controller: 'ApplyHtmlCtrl'
            })
            .state('applyTicket', {
                url: '/applyTicket',
                templateUrl: 'templates/applySubmit/applyTicket.html',
                controller: 'ApplyTicketCtrl'
            })
            .state('baiduMap', {
                url: '/baiduMap',
                templateUrl: 'templates/baiduMap/gps.html',
                controller: 'BaiduMapCtrl'
            })
            .state('insurance', {
                url: '/insurance',
                templateUrl: 'templates/insurance/insurance-list.html',
                controller: 'InsuranceCtrl'
            })
            .state('insuranceHtml', {
                url: '/insuranceHtml',
                templateUrl: 'templates/insurance/insurance-Html.html',
                controller: 'InsuranceHtmlCtrl'
            })

            .state('luckyGame', {
                url: '/luckyGame',
                templateUrl: 'templates/luckyDrawGame/lucyGame.html',
                controller: 'LuckyGameCtrl'
            })
            .state('chunwan', {
                url: '/chunwan',
                templateUrl: 'templates/chunwan/chunwan-list.html',
                controller: 'ChunwanCtrl'
            })
            .state('chunwanjiangpin', {
                url: '/chunwanjiangpin',
                templateUrl: 'templates/chunwan/chunwanjiangpinHtml.html',
            })
            .state('chunwanjiemu', {
                url: '/chunwanjiemu',
                templateUrl: 'templates/chunwan/chunwanjiemuHtml.html',
            })
            .state('chunwanNameListHtml', {
                url: '/chunwanNameListHtml',
                templateUrl: 'templates/chunwan/chunwanNameListHtml.html'
            })
            .state('chunwanZJ', {
                url: '/chunwanZJ',
                templateUrl: 'templates/chunwan/chunwanZJ.html',
                controller: 'ChunwanZJCtrl'
            })
            .state('chunwanZJName', {
                url: '/chunwanZJName',
                templateUrl: 'templates/chunwan/chunwanZJName.html',
                controller: 'ChunwanZJNameCtrl'
            })
//            .state('GBS', {
//                url: '/GBS',
//                templateUrl: 'templates/GBS/gbs-list.html'
//
//            })

            .state('GBS', {
                url: '/GBS',
                templateUrl: 'templates/GBS/gbs-list.html',
                controller: 'GBSListCtrl'
            })


        $urlRouterProvider.otherwise('signin');

    }])