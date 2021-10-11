sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (
    ManagedObject,
    MessageToast,
    Fragment
) {
    "use strict";
    return ManagedObject.extend("sap.ui.demo.walkthrough.controller.Login", {
        constructor: function (oView) {
            this._oView = oView;
        },
        exit: function () {
            delete this._oView;
        },
        open: function () {
            var oView = this._oView;

            // create the dialog lazily
            if (!oView.byId("loginDialog")) {
                var oFragmentController = {
                    onCloseDialog: function () {
                        oView.byId("loginDialog").close();
                    },
                    onLoginDialog: function () {
                        var BoLT_username = oView.byId("idusername").getValue();
                        oView.getModel().setProperty("/recipient/name",BoLT_username)
                        MessageToast.show("Logged in as " + BoLT_username);
                        oView.byId("loginDialog").close();
                    }
                }
                // load asyncronously XML fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.walkthrough.view.Login",
                    controller: oFragmentController
                }).then(function (oDialog) {
                    // connect the dialog to the root view of this component
                    oView.addDependent(oDialog);
                    oDialog.open();
                })
            } else {
                oView.byId("loginDialog").open();
            }
        }

    });


});