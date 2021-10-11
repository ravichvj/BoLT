sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/m/library",
    "sap/ui/core/Locale",
    "sap/ui/core/LocaleData"
], function (
    ManagedObject,
    MessageToast,
    Fragment
) {
    "use strict";

    return ManagedObject.extend("sap/ui/demo/walkthrough.controller.ProjectList", {
        constructor: function (oView) {
            this._oView = oView;
        },
        exit: function () {
            delete this._oView;
        },
        open: function () {
            var oView = this._oView;

            // create the dialog lazily
            if (!oView.byId("idProjectListDialog")) {
                var oFragmentController = {
                    onCloseDialog: function () {
                        oView.byId("idProjectListDialog").close();
                    },
                    onProjectSelectDialog: function (oEvent) {
                        //MessageToast.show(this._oView.getSelectedItem().getBindingContext().getObject());
                        var oItem = oEvent.getSource();
                        // The model that is bound to the item
                        var oContext = oItem.getBindingContext("Projectlist");
                        // A single property from the bound model
                        var sName = oContext.getProperty("Project_name");
                        MessageToast.show(sName);
                        oView.byId("idProjectListDialog").close();
                    }
                }
                // load asyncronously XML fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.walkthrough.view.ProjectList",
                    controller: oFragmentController
                }).then(function (oDialog) {
                    // connect the dialog to the root view of this component
                    oView.addDependent(oDialog);
                    oDialog.open();
                })
            } else {
                oView.byId("idProjectListDialog").open();
            }
        }
    });
});