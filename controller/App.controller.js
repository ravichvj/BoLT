sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict"
    return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
        onOpenLoginDialog: function () {
            this.getOwnerComponent().openLoginDialog();
        },
        onOpenProductInfo: function () {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var infomsg = oBundle.getText('ProductVersion') + " , " + oBundle.getText('ProductReleasedate');
            MessageToast.show(infomsg);
        },
        onOpenProductsystemInfo: function () {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var infomsg = oBundle.getText('ProductSystemSupport');
            MessageToast.show(infomsg);
        },
        onOpenCalendar: function () {
            MessageToast.show("Calendar search is not integrated to the Application");
        }, 
        onOpenProjectList: function () {
            this.getOwnerComponent().openProjectListDialog();
        }
    });
});