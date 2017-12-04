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
//        document.addEventListener('chcp_updateIsReadyToInstall', this.onUpdateReady, false);
    },
    onDeviceReady:function(){
//        alert('deviceready');
        app.checkForUpdate();
    },

    checkForUpdate: function() {
        chcp.fetchUpdate(this.fetchUpdateCallback);
    },

    fetchUpdateCallback: function(error, data) {
        if (error) {
//            alert('Failed to load the update with error code: ' + error.code);
//            alert(error.description);
        } else {
//            alert('Update is loaded');
        }
        chcp.installUpdate(this.installationCallback);
    },

    onUpdateReady: function(eventData) {
        var error = eventData.details.error;
        if (error) {
//            alert('chcp_updateIsReadyToInstall: error'+error.description);
            chcp.installUpdate(this.installationCallback);
        } else {
//            alert('chcp_updateIsReadyToInstall');
            chcp.installUpdate(this.installationCallback);
        }
    },
    installationCallback: function(error) {

        if (error) {
//            alert('installationCallback: ' + error.description);
            console.log(error.description);
        } else {
//            alert('Update installed!');

        }
    }
};

app.initialize();
