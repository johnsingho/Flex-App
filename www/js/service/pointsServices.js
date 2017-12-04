/**
 * Created by dmneeoll on 2016/6/3.
 */
angular.module('evaluationApp.pointsService', [])
.service("pointsService",function($http, $q, HttpFactory,alertService,$state){
        return {
            // 获取评分列表
            getPointsRuls: function (data) {
                var deferred = $q.defer();
                var rules = [];
                HttpFactory.send({
                    url: API.RuleDETAIL,
                    method: 'post',
                    params: data,
                    mask: true
                }).success(function (response) {
                        if (response.success) {
                            for(var i=0;i<response.list.length;i++){
                                //评分项目中的分值列表
                                var rulesSorce = [];
                                if(response.list[i].ItemI!=null&&response.list[i].ItemI.length!=0)rulesSorce.push({Item:response.list[i].ItemI,ItemSorce:response.list[i].ItemIScore,ItemName:'ItemI'});
                                if(response.list[i].ItemII!=null&&response.list[i].ItemII.length!=0)rulesSorce.push({Item:response.list[i].ItemII,ItemSorce:response.list[i].ItemIIScore,ItemName:'ItemII'});
                                if(response.list[i].ItemIII!=null&&response.list[i].ItemIII.length!=0)rulesSorce.push({Item:response.list[i].ItemIII,ItemSorce:response.list[i].ItemIIIScore,ItemName:'ItemIII'});
                                if(response.list[i].ItemIV!=null&&response.list[i].ItemIV.length!=0)rulesSorce.push({Item:response.list[i].ItemIV,ItemSorce:response.list[i].ItemIVScore,ItemName:'ItemIV'});
                                if(response.list[i].ItemV!=null&&response.list[i].ItemV.length!=0)rulesSorce.push({Item:response.list[i].ItemV,ItemSorce:response.list[i].ItemVScore,ItemName:'ItemV'});

                                //主列表
                                rules.push({EvaluateDetails_ID:response.list[i].IID,
                                    Evaluate_ID:response.list[i].Evaluate_ID,
                                    Sort:response.list[i].Sort,
                                    CHNContent:response.list[i].Question,
                                    Img:response.list[i].Img,
                                    Points:null,
                                    SelItem:null,
                                    ItemName:null,
                                    RulesSorce:rulesSorce});
                            }
                            deferred.resolve(rules);
                        }
                        else  {

                            deferred.resolve(response.message);

                        }
                    }
                ) .error(function(response) {
                        deferred.reject(response);   // 声明执行失败，即服务器返回错误
                    });
                return deferred.promise;
            },
            //提交评分
            submit: function (params) {
                var deferred = $q.defer();
                HttpFactory.send({
                    url: API.Submit,
                    method: 'post',
                    params: params,
                    mask: true
                }).success(function (response) {
                        deferred.resolve(response);
                    }
                ) .error(function(response) {
                        deferred.reject(response);   // 声明执行失败，即服务器返回错误
                    });
                return deferred.promise;
            },

            getPointInfo:function(params){
                var PointInfo=null;
                var deferred = $q.defer();
                HttpFactory.send({
                    url: API.PointsInfo,
                    method: 'post',
                    params: params
                }).success(function (response) {
                        if (response.success) {
                            PointInfo = response.obj;
                            deferred.resolve(PointInfo);
                        }
                        else  {
                            deferred.resolve(response.message);
                        }

                    }
                ) .error(function(response) {
                        deferred.reject(response);   // 声明执行失败，即服务器返回错误
                    });
                return deferred.promise;
            },

            getChartRank:function(params){
                var ChartRank=null;
                var deferred = $q.defer();
                HttpFactory.send({
                    url: API.GetChartRank,
                    method: 'post',
                    params: params
                }).success(function (response) {
                        if (response.success) {
                            ChartRank = response.obj;
                            deferred.resolve(ChartRank);
                        }
                        else  {
                            deferred.resolve(response.message);
                        }

                    }
                ) .error(function(response) {
                        deferred.reject(response);   // 声明执行失败，即服务器返回错误
                    });
                return deferred.promise;
            },

            GetRedEnvelopLog:function(params){
                var RedEnvelopLog=null;
                var deferred = $q.defer();
                HttpFactory.send({
                    url: API.GetRedEnvelopLog,
                    method: 'post',
                    params: params
                }).success(function (response) {
                        if (response.success) {
                            RedEnvelopLog = response.list;
                            deferred.resolve(RedEnvelopLog);
                        }
                        else  {
                            deferred.resolve(response.message);
                        }


                    }
                ) .error(function(response) {
                        deferred.reject(response);   // 声明执行失败，即服务器返回错误
                    });
                return deferred.promise;
            }
        }
    });