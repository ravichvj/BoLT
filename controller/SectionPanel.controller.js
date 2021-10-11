sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
    "use strict";

    return Controller.extend("sap/ui/demo/walkthrough.controller.SectionPanel", {

        onInit: function () {
            var oView = this.getView();
        },
        onShowHello: function () {
            // read message from the i18 model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sMsg = oBundle.getText("Sayinprogress")
            MessageToast.show(sMsg)
        },
        onOpenLoginDialog: function () {
            this.getOwnerComponent().openLoginDialog();
        },
        onBRFileUpload: function () {
            this.getOwnerComponent().openBRFileUploadDialog();
        }
    });
});