/**
 * Created by dmneeoll on 2016/6/14.
 */
angular.module('evaluationApp.businessServices', [])
    .service("goldIdeaService",function($http, $q, HttpFactory){
        return {
            // 获取金点子列表
            getGoldIdeaList:function(paras){
                var deferred = $q.defer();
                var goldIdeaList = [];
                HttpFactory.send({
                    url:API.GetGoldIdeaType,
                    params: paras,
                    method: 'post',
                    mask: false
                }).success(function (response) {
                    if (response.success) {
                        for(var i=0;i<response.list.length;i++){
                            goldIdeaType.push({iID:response.list[i].IID,
                                ideaType:response.list[i].GoldIdeaType,errormsg:null});
                        }
                    }
                    else{
                        goldIdeaType.push({errormsg:"网络出错，请稍后再试"});
                    }
                    deferred.resolve(goldIdeaType);
                }) .error(function(response) {
                    deferred.reject(response.template);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            },
            // 获取金点子部门列表
            getGoldIdeaType:function(paras){
                var deferred = $q.defer();
                var goldIdeaType = [];
                HttpFactory.send({
                    url:API.GetGoldIdeaType,
                    params: paras,
                    method: 'post',
                    mask: false
                }).success(function (response) {
                    if (response.success) {
                        for(var i=0;i<response.list.length;i++){
                            goldIdeaType.push({iID:response.list[i].IID,
                                ideaType:response.list[i].GoldIdeaType,errormsg:null});
                        }
                        deferred.resolve(goldIdeaType);
                    }
                    else{
                        deferred.resolve(response.message);
                    }

                }) .error(function(response) {
                    deferred.reject(response.template);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            },
            getGoldIdeaRecode:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.GetGoldIdeaRecode,
                    params: paras,
                    method: 'post',
                    mask: false
                }).success(function (response) {
                    if (response.success) {
                        deferred.resolve(response.list);
                    }
                    else{
                        deferred.resolve(response.message);
                    }
                }) .error(function(response) {
                    deferred.reject(response.template);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            },
            getGoldIdeaShow:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.GetGoldIdeaShow,
                    params: paras,
                    method: 'post',
                    mask: false
                }).success(function (response) {
                    if (response.success) {
                        deferred.resolve(response.list);
                    }
                    else{
                        deferred.resolve(response.message);
                    }
                }) .error(function(response) {
                    deferred.reject(response.template);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            }
        }
    })
    .service("goodJobService",function($http, $q, HttpFactory){
        return {
            getGoodEmployee:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.getGoodEmployee,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    if(response.success){

                        deferred.resolve(response.list);
                    } else{
                        deferred.resolve(response.message);
                    }

                }) .error(function(response) {
                    deferred.reject(response.template);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            }

        }
    })
    .service("kqService",function($http, $q, HttpFactory){
        return {
            getKq:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.getKq,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    if(response.success){
                        deferred.resolve(response.list);
                    } else{
                        deferred.resolve(response.message);
                    }

                }) .error(function(response) {
                    deferred.reject(response.template);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            }
        }
    })
    .service("custService",function($http, $q, HttpFactory){
        return {
            getCust:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.getCustRec,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    deferred.resolve(response);


                }) .error(function(response) {
                    deferred.reject(response);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            },
            getCustOddfare:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.getCustOddfare,
                    params: paras,
                    method: 'post',
                    mask: false
                }).success(function (response) {
                    deferred.resolve(response);


                }) .error(function(response) {
                    deferred.reject(response);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            }
        }
    })
    .service("myMsgService",function($http, $q, HttpFactory){
        return {
            getMsgList:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.GetMsgList,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    if(response.success){
                        deferred.resolve(response.list);
                    } else{
                        deferred.resolve(response.message);
                    }

                }) .error(function(response) {
                    deferred.reject(response);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            },
            updateMsgStatus:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.UpdateMsgStatus,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    if(response.success){
                        deferred.resolve("success");
                    } else{
                        deferred.resolve(response.message);
                    }

                }) .error(function(response) {
                    deferred.reject(response);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            }
        }
    })
    .service("noticeService",function($http, $q, HttpFactory){
        return {
            getNoticeList:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.GetNoticeList,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    if(response.success){
                        deferred.resolve(response.list);
                    } else{
                        deferred.resolve(response.message);
                    }

                }) .error(function(response) {
                    deferred.reject(response);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            },
            getNoticeHTML:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.GetNoticeHTML,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    if(response.success){

                        deferred.resolve(response.data);
                    } else{
                        deferred.resolve(response.message);
                    }

                }) .error(function(response) {
                    deferred.reject(response);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            },

            getChoujiangList:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.CheckHaveChoujiangShow,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    deferred.resolve(response);

                }) .error(function(response) {
                    deferred.reject(response);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            },
            getChoujiangGuestList:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.GetChoujiangGuestList,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    deferred.resolve(response);

                }) .error(function(response) {
                    deferred.reject(response);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            },

            getActivityList:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.GetActivityList,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    if(response.success){
                        deferred.resolve(response.list);
                    } else{
                        deferred.resolve(response.message);
                    }

                }) .error(function(response) {
                    deferred.reject(response);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            },

            getActivityHTML:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.GetActivityHTML,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    if(response.success){

                        deferred.resolve(response.data);
                    } else{
                        deferred.resolve(response.message);
                    }

                }) .error(function(response) {
                    deferred.reject(response);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            },

            getActivityDetails:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.GetActivityDetails,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    if(response.success){
                        deferred.resolve(response.list);
                    } else{
                        deferred.resolve(response.message);
                    }

                }) .error(function(response) {
                    deferred.reject(response);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            }
        }
    })
    .service('ImageResizerService', function () {

    // Create an Image, when loaded pass it on to the resizer
    var imgSelectorStr = null,

        startResize = function (imgSelector) {
            imgSelectorStr = imgSelector;
            $.when(
                createImage($(imgSelector).attr('src'))).then(resize, function () {
                    console.log('error');
                });
        };

    // Draw initial canvas on new canvas and half it's size
    var halfSize = function (i) {
        var canvas = document.createElement("canvas");
        canvas.width = i.width / 2;
        canvas.height = i.height / 2;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(i, 0, 0, canvas.width, canvas.height);
        return canvas;
    };

    // Creates a new image object from the src
    var createImage = function (src) {
        var deferred = $.Deferred(),
            img = new Image();

        img.onload = function () {
            deferred.resolve(img);
        };
        img.src = src;
        //console.log(src);
        return deferred.promise();
    };

    /*
     * Draw the image object on a new canvas and half the size of the canvas
     * Put the base64 data into the target image
     */
    var resize = function (image) {
        var mainCanvas = document.createElement("canvas");
        mainCanvas.width = image.width;
        mainCanvas.height = image.height;
        var ctx = mainCanvas.getContext("2d");
        ctx.drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);
        var size = 200;
        while (mainCanvas.width > size) {
            mainCanvas = halfSize(mainCanvas);
        }
        (angular.element(document.querySelector(imgSelectorStr))).attr('src', mainCanvas.toDataURL("image/jpeg"));
    };

    // Controller binding for image resizing
    this.resizeImage = function (imgSelector) {
        startResize(imgSelector);
    };
})
    .service('AskAndAnswerService', function ($http, $q, HttpFactory) {
        return {
            getAskAndAnswer:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.GetAskAndAnswer,
                    params: paras,
                    method: 'post',
                    mask: false
                }).success(function (response) {
                    if (response.success) {
                        deferred.resolve(response);
                    }
                    else{
                        deferred.resolve(response.message);
                    }
                }) .error(function(response) {
                    deferred.reject(response.template);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            }

        }

    })
    .service("eHSActService",function($http, $q, HttpFactory){
        //对应于 EHS有奖答题
        return {
            getEHSActList:function(paras){
                var deferred = $q.defer();
                HttpFactory.send({
                    url:API.GetEHSActList,
                    params: paras,
                    method: 'post',
                    mask: true
                }).success(function (response) {
                    if(response.success){
                        deferred.resolve(response.list);
                    } else{
                        deferred.resolve(response.message);
                    }

                }) .error(function(response) {
                    deferred.reject(response);   // 声明执行失败，即服务器返回错误
                });
                return deferred.promise;
            }
        }
    })
;