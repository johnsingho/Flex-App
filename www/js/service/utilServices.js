/**
 * 工具类
 * johnsing he 2018-09-11
 */
angular.module('evaluationApp.utilServices', ['ngCordova'])
  .service('UrlServices', function ($state,alertService,CacheFactory) 
  {
    //打开外链
    var openForeignUrl = function(url){        
        url = url.toLocaleLowerCase();
        if(0!=url.indexOf("http")){
            url = "http://"+url;
        }
        try {
            //externalLinksService.openUr(url);
            cordova.InAppBrowser.open(url, '_system', 'location=yes');
        }
        catch (ex) {
            alertService.showAlert(ex.message);
        }
    }
    var openGeneralNotice = function (isUrlHtml, id, html) {
        if(isUrlHtml){
            openForeignUrl(html);
        }else{
            CacheFactory.remove('gnID');
            CacheFactory.save('gnID', id);
            $state.go("generalNoticeDetail");
        }
    };

    return {
        openForeignUrl: openForeignUrl,
        openGeneralNotice: openGeneralNotice,
    };
  })

;