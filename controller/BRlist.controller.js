sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "../model/formatter"
], function (
    Controller,
    JSONModel,
    ODataModel,
    MessageToast,
    Sorter,
    Filter,
    FilterOperator,
    FilterType,
    formatter
) {
    "use strict"

    return Controller.extend("sap/ui/demo/walkthrough.controller.BRlist", {
        //formatter: formatter,
        onInit: function () {

            //var oTable = this.byId("TabBRList");
            var oView = this.getView();
            var oTable = oView.byId("TabBRList");
            var oModel = this.getOwnerComponent().getModel("BRlist");

           /* //column list item creation
            var oTemplate = new sap.m.ColumnListItem({
                cells: [new sap.m.Text({
                    text: "{PROJECT_NAME}"
                }), new sap.m.Text({
                    text: "{BR_NO}"
                }), new sap.m.Text({
                    text: "{BR_LASTCHANGEDATE}"
                }), new sap.m.Text({
                    text: "{BR_OBJECTTYPES}"
                }), new sap.m.Text({
                    text: "{BR_STATUS}"
                })]
            });

            // binding the model with the table
            oTable.setModel(oModel);
            oTable.bindAggregation("items", {
                path: "/ZBOLT_WP_HEADERSet",
                template: oTemplate
            });*/
        },

        onBRSearch: function (oEvent) {
            var oView = this.getView();
            var oTable = oView.byId("TabBRList");
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("BR_NO",FilterOperator.EQ, sQuery));
            }
            if (sQuery) {
                MessageToast.show(sQuery);
                oTable.getBinding("items").filter(aFilter);
            } else {
                MessageToast.show("Please enter a value to search");
            }
        }, 

        onBRlistSort: function() {
            var oView = this.getView(),
                        aStates = [undefined, "asc", "desc"],
                        aStateTextIds = ["Not Sorted", "sorted Ascending", "sorted Descending"],
                        sMessage,
                        iOrder = oView.getModel("BRlist").getProperty("/order");
            iOrder = (iOrder + 1) % aStates.length;
            var sOrder = aStates[iOrder];          
            oView.getModel("BRlist").setProperty("/order", iOrder);
            oTable.getBinding("items").sort(sOrder && new Sorter("BR_ListSet>BR_LASTCHANGEDATE", sOrder === "desc"));
            sMessage = aStateTextIds[iOrder];
            MessageToast.show(sMessage);
        },

        onBRlistReset: function() {
            var oView = this.getView();
            var oTable = oView.byId("TabBRList");
            var aFilter = [];
            oTable.getBinding("items").filter(aFilter);
        },

        onBRFileUpload: function () {
            this.getOwnerComponent().openBRFileUploadDialog();
        }
    });
});