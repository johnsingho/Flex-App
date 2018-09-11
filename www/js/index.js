/**
 * Created by dmneeoll on 2016-07-05.
 */

var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind any events that are required.
    // Usually you should subscribe on 'deviceready' event to know, when you can start calling cordova modules
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('chcp_updateInstalled', this.onUpdateInstalled, false);

        document.addEventListener('chcp_updateLoadFailed', this.onUpdateFailed, false);
        document.addEventListener('chcp_updateInstallFailed', this.onUpdateFailed, false);
        document.addEventListener('chcp_assetsInstallationError', this.onUpdateFailed, false);
        
//        document.addEventListener('chcp_updateIsReadyToInstall', this.onUpdateReady, false);
    },
    showError:function(error){
        var sErr = 'Failed to update, error code:' + error.code;
        sErr += '\n';
        sErr += error.description;
        console.log(sErr);
        if (IsShowUpdateDetial) {
            alert(sErr);
        }
    },
    onDeviceReady:function(){
        app.checkForUpdate();
    },
    checkForUpdate: function () {
        // �ȼ����û�еø���
        chcp.isUpdateAvailableForInstallation(function (error, data) {
            if (error) {
                //Nothing to install
                app.showError(error);
                chcp.fetchUpdate(function(error, data) {
                    if (error) {
                        app.showError(error);
                        return;//����
                    }
                    //�и��£��������£��˴����׳���
                    chcp.installUpdate(app.installationCallback);
                });
                return;
            }

            // update is in cache and can be installed,install it
            console.log('Current version: ' + data.currentVersion);
            console.log('About to install: ' + data.readyToInstallVersion);
            chcp.installUpdate(app.installationCallback);
        });
    },
    onUpdateInstalled:function(){
        console.log('**Update Installed ok!');
        if (IsShowUpdateDetial) {
            alert('**Update Installed ok!');
        }
    },
    onUpdateFailed: function (eventData) {
        //����ʧ��
        if (eventData.details && eventData.details.error) {
            app.showError(eventData.details.error);
        }
    },
    installationCallback: function(error) {
        if (error) {
            if (IsShowUpdateDetial || IsShowUpdateInstalledErr) {
                var sErr = 'Failed to install update, error code:' + error.code;
                sErr += '\n';
                sErr += error.description;
                console.log(sErr);
                alert(sErr);
            }
        }
    }
};

app.initialize();
