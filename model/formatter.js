sap.ui.define([], function () {
    "use strict";

    return {
        statusText: function (sStatus) {
            var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
            switch (sStatus) {
                case "Completed":
                    return resourceBundle.getText("BR_Completed_text");
                case "Error":
                    return resourceBundle.getText("BR_Failed_text");
                case "In Review":
                    return resourceBundle.getText("BR_Inprogress_text");
                default:
                    return sStatus;
            }
        }
    }
});