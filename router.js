/**
 * Created by DMNeeoll on 2016/3/22.
 */
/**
 * 路由
 */
angular.module('evaluationApp.router', [])
    .config(['$provide', '$stateProvider', '$urlRouterProvider', function ($provide, $stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('menu', {
                url: "/menu",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })
            .state('menu.tab', {
                url: "/tab",
                templateUrl: "templates/tabs.html"
            })
            .state('signin', {
                url: '/signin',
                templateUrl: 'templates/tab-signin.html',
                controller: 'AppCtrl'
            })
            .state('mian', {
                url: '/main',
                templateUrl: 'templates/main.html',
                controller: 'MainCtrl'
            })
            .state('menu.tab.rules', {
                url: '/rules/:ID',
                views: {
                    'rules': {
                        templateUrl: 'templates/tab-rules.html',
                        controller: 'RulesCtrl'
                    }
                }
            })
            .state('menu.tab.points', {
                url: '/points',
                views: {
                    'points': {
                        templateUrl: 'templates/tab-points.html',
                        controller: 'PointsCtrl'
                    }
                }
            })
            .state('menu.tab.ranking', {
                url: '/ranking',
                views: {
                    'ranking': {
                        templateUrl: 'templates/tab-ranking.html',
                        controller: 'RankingCtrl'
                    }
                }
            })
            .state('menu.tab.home', {
                url: '/home',
                views: {
                    'home': {
                        templateUrl: 'templates/tab-home.html',
                        controller: 'HomeCtrl'
                    }
                },
                resolve: {
                    validater: ['$location', 'CacheFactory', function ($location, CacheFactory) {
                        var loginInfo = CacheFactory.get('accessToken');
                        if (!loginInfo) {
                            $location.path('menu/tab/login');
                        }
                    }]
                }
            })
            .state('menu.tab.account', {
                url: '/account',
                views: {
                    'account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                },
                resolve: {
                    validater: ['$location', 'CacheFactory', function ($location, CacheFactory) {
                        var loginInfo = CacheFactory.get('accessToken');
                        if (!loginInfo) {
                            $location.path('menu/tab/login');
                        }
                    }]
                }
            })
            .state('password', {
                url: '/password',
                templateUrl: 'templates/account_password.html',
                controller: 'PassCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/account_register.html',
                controller: 'RegCtrl'
            })
            .state('forgetPsw', {
                url: '/forgetPsw',
                templateUrl: 'templates/account_forgetPasswordNoMobile.html',
                controller: 'ForgetPswCtrl'
            })

        $urlRouterProvider.otherwise('signin');
    }])