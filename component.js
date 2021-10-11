sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "./controller/Login",
    "./controller/FileUpload",
    "./controller/ProjectList"
], function (UIComponent,
    Device,
	JSONModel,
	ResourceModel,
	Login,
	FileUpload,
	ProjectList) {
    "use strict"

    // set the metadata root view
    return UIComponent.extend("sap/ui/demo/walkthrough.component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // Setting a oData object
            var oData = {
                recipient: {
                    name: "",
                    project: ""
                }
            };

            // Create a JSON model
            var oModel = new JSONModel(oData);
            // Assign the JSON model to the view
            this.setModel(oModel);

            // set some models
            this.oSampleuploadmodel	= this.getModel("techspec_uploadsample");

            // set some models
            this.otechSpecModel	= this.getModel("techspec_uploadsample");

            // initialize the login dialog
            this._pleaseLogin = new Login(this.getRootControl());

            // initialize the file upload dialog
            this._BRfileupload = new FileUpload(this.getRootControl());

            // initialize the Project list dialog
            this._ProjectList = new ProjectList(this.getRootControl());

        },

        exit: function () {
            this._pleaseLogin.destroy();
            delete this._pleaseLogin;
            this._BRfileupload.destroy();
            delete this._BRfileupload;
            this._ProjectList.destroy();
            delete this._ProjectList;
        },

        openLoginDialog: function () {
            this._pleaseLogin.open();
        },

        openBRFileUploadDialog: function () {
            this._BRfileupload.open();
        },

        openProjectListDialog: function () {
            this._ProjectList.open();
        }

    });
})