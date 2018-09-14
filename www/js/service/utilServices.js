/**
 * 工具类
 */
angular.module('evaluationApp.utilServices', [])
  .service('UrlServices', function ($state,externalLinksService,alertService,CacheFactory) 
  {
    var openForeignUrl = function(url){
        //打开外链
        try {
            externalLinksService.openUr(url);
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