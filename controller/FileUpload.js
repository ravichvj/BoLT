sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function (
    ManagedObject,
    JSONModel,
    Fragment,
    MessageToast
) {
    "use strict";

    return ManagedObject.extend("sap/ui/demo/walkthrough.controller.FileUpload", {
        constructor: function (oView) {
            this._oView = oView;
            //this._oDialog = oDialog;
        },
        exit: function () {
            delete this._oView;
        },
        open: function () {
            var oView = this._oView;
            // create the simpleform lazily
            // create the dialog lazily
            if (!oView.byId("idBRfileuploadform")) {
                var oFragmentController = {
                    onCloseDialog: function () {
                        oView.byId("idBRfileuploadform").close();
                    },
                    onBRUploadDialog: function (oEvent) {
                        // Get the controls
                        // set sample oData to table
                        //get BR number
                        var BoLT_Brno = oView.byId("iduploadBRno").getValue();
                        if (!BoLT_Brno) {
                            MessageToast.show("Please provide the Workpackage number");
                        } else {
                            //MessageToast.show(BoLT_Brno);
                            var BoLT_techspec_file = oView.byId("idBRfileupload").getValue();
                            if (!BoLT_techspec_file) {
                                MessageToast.show("Please upload file");
                            } else {
                                var file_uploader = oView.byId("idBRfileupload");
                                file_uploader.checkFileReadable().then(function () {
                                    file_uploader.upload();
                                }, function (error) {
                                    MessageToast.show("The file cannot be read. It may have changed.");
                                }).then(function () {
                                    var upl_domRef = file_uploader.getFocusDomRef();
                                    var upl_file = upl_domRef.files[0];
                                    var file_reader = new FileReader();
                                    // to catch the read event and post process
                                    file_reader.onload = function (e) {
                                        var csv_data = e.currentTarget.result;
                                        console.log(csv_data);
                                        csv_data = csv_data.replace(/\r\n/g, ",");  
                                        var arrCSV = csv_data.split(",");
                                        // the number of columns variable must be the uploaded CSV columns
                                        // This must be a centralized versioning value
                                        var noOfCols = 33;
                                        console.log(arrCSV);
                                        // remove the header 
                                        //var row = arrCSV.splice(0, noOfCols)
                                        // var hdrRow = arrCSV.splice(0, noOfCols);
                                        // Header data
                                        var BWCHA_hdr = ['BWOBJ','IOBJ','IOBJCATALOG','VERSION','OBJTYPE','DATATYPE','OWNER','SHDESC','LGDESC','INFOAREA','INLENGTH','LCASE','REFIOBJ','CONVROUT','OUTLENGTH','IOBJSIZCAT','IOBJDATCLS','BEXDESC','BEXSEL','TXTTIMFL','LANGU','TXTSHFL','TXTMDFL','TXTLGFL','HIETABFL','HIEVERFL','HIENMTFL','HIENDTFL','HIEINTFL','HIETJOINFL','HIESIGNCH','CMPSTA','COMPIOBJ','ATTRFLG'];
                                        var BWKYF_hdr = ['BWOBJ','IOBJ','IOBJCATALOG','VERSION','OBJTYPE','DATATYPE','OWNER','SHDESC','LGDESC','INFOAREA','SDATATYPE','FIXCURR','FIXUOM','UNIT','TXTDEF','AGGR','EXCEPAGGR','REFCHAAGGR','NCUMFLG','HIGHPRECFLG','DECPLACES','BEXDISP'];
                                        var BWISRC_hdr = ['BWOBJ','OBJ','NAME','INFOAREA','SEQUENCE','REFERENCE_OBJ','KEY','','','','','','','','','','','','','','','',''];
                                        var BWDSO_hdr = ['BWOBJ','OBJ','NAME_SEQUENCE','INFOAREA_KEY','FIELDS','','','','','','','','','','','','','','','','','',''];
                                        var BWCUBE_hdr = ['BWOBJ','OBJ','SEQUENCE','NAME_DIMENSION_FIELD','INFOAREA_MAP','','','','','','','','','','','','','','','','','',''];
                                        var BWHCPR_hdr = ['BWOBJ','OBJ','NAME_DIMENSION_SEQUENCE_FIELDS','INFOAREA_NAME_FIELDS_SEQUENCE_INFOPROVIDER','FIELDS_OBJECTTYPE','','','','','','','','','','','','','','','','','',''];
                                        var BWDTPA_hdr = ['BWOBJ','SRCTYP','SRCNAME','','TGTTYP','TGTNAME','','','','','','','','','','','','','','','','',''];
                                        var BWTRFN_hdr = ['BWOBJ','SRCTYP','SRCNAME','','TGTTYP','TGTNAME','','FIELD','','','','','','','','','','','','','','',''];
                                        var BWPRCS_hdr = ['BWOBJ','PROCESSCHAIN','PROCESSTYPE','PROCESSTYPNAME','ACTIVITYTYPE','SIGN','CONDITION','OBJECT_TEXT','','PRECEDINGPROCESSTYP','PRECEDINGPROCESSNAME','SETTING','','','','','','','','','','',''];
                                        // Actual data
                                        var BWCHA_data = [];
                                        var BWKYF_data = [];
                                        var BWISRC_data = [];
                                        var BWDSO_data = [];
                                        var BWCUBE_data = [];
                                        var BWHCPR_data = [];
                                        var BWDTPA_data = [];
                                        var BWTRFN_data = [];
                                        var BWPRCS_data = [];
                                        // Loop through for the data from CSV
                                        while (arrCSV.length > 0) {
                                            //console.log(arrCSV.length);
                                            var obj = {};
                                            // extract remaining rows one by one
                                            var row = arrCSV.splice(0, noOfCols)
                                            if (row[0] == 'OBJINF') {
                                                for (var i = 1; i < row.length; i++) {
                                                        obj[BWCHA_hdr[i]] = row[i].trim()
                                                    }
                                                BWCHA_data.push(obj);
                                            }
                                            if (row[0] == 'IOBJKYF') {
                                                for (var i = 1; i < row.length; i++) {
                                                        obj[BWKYF_hdr[i]] = row[i].trim()
                                                    }
                                                BWKYF_data.push(obj);
                                            }
                                            if (row[0] == 'INFS') {
                                                for (var i = 1; i < row.length; i++) {
                                                        obj[BWISRC_hdr[i]] = row[i].trim()
                                                    }
                                                BWISRC_data.push(obj);
                                            }                                            
                                            if (row[0] == 'DSOC' || row[0] == 'DSOF') {
                                                for (var i = 1; i < row.length; i++) {
                                                        obj[BWDSO_hdr[i]] = row[i].trim()
                                                    }
                                                BWDSO_data.push(obj);
                                            }
                                            if (row[0] == 'CUBEC' || row[0] == 'CUBEF') {
                                                for (var i = 1; i < row.length; i++) {
                                                        obj[BWCUBE_hdr[i]] = row[i].trim()
                                                    }
                                                BWCUBE_data.push(obj);
                                            }
                                            if (row[0] == 'MPRC' || row[0] == 'MPRE' || row[0] == 'MPRF' || row[0] == 'MPRI' || row[0] == 'MPRM' || row[0] == 'MPRD') {
                                                for (var i = 1; i < row.length; i++) {
                                                        obj[BWHCPR_hdr[i]] = row[i].trim()
                                                    }
                                                BWHCPR_data.push(obj);
                                            }
                                            if (row[0] == 'DTPA') {
                                                for (var i = 1; i < row.length; i++) {
                                                        obj[BWDTPA_hdr[i]] = row[i].trim()
                                                    }
                                                BWDTPA_data.push(obj);
                                            }
                                            if (row[0] == 'TRFN') {
                                                for (var i = 1; i < row.length; i++) {
                                                        obj[BWTRFN_hdr[i]] = row[i].trim()
                                                    }
                                                BWTRFN_data.push(obj);
                                            }
                                            if (row[0] == 'PRCS') {
                                                for (var i = 1; i < row.length; i++) {
                                                        obj[BWPRCS_hdr[i]] = row[i].trim()
                                                    }
                                                BWPRCS_data.push(obj);
                                            }
                                        }                                                    
                                        // Bind the data to the Table
                                        // InfoObject characteristic
                                        var oModel1 = new sap.ui.model.json.JSONModel();
                                        oModel1.setData(BWCHA_data);
                                        var oTable1 = oView.byId("TabBRListupl1");
                                        oTable1.setModel(oModel1);  
                                        // InfoObject keyfigure
                                        var oModel2 = new sap.ui.model.json.JSONModel();
                                        oModel2.setData(BWKYF_data);
                                        var oTable2 = oView.byId("TabBRListupl2");
                                        oTable2.setModel(oModel2);    
                                        // InfoSource
                                        var oModel3 = new sap.ui.model.json.JSONModel();
                                        oModel3.setData(BWISRC_data);
                                        var oTable3 = oView.byId("TabBRListupl3");
                                        oTable3.setModel(oModel3); 
                                        // DSO  
                                        var oModel4 = new sap.ui.model.json.JSONModel();
                                        oModel4.setData(BWDSO_data);
                                        var oTable4 = oView.byId("TabBRListupl4");
                                        oTable4.setModel(oModel4);        
                                        // CUBE                                  
                                        var oModel5 = new sap.ui.model.json.JSONModel();
                                        oModel5.setData(BWCUBE_data);
                                        var oTable5 = oView.byId("TabBRListupl5");
                                        oTable5.setModel(oModel5);   
                                        // HCPR                                  
                                        var oModel5 = new sap.ui.model.json.JSONModel();
                                        oModel5.setData(BWHCPR_data);
                                        var oTable5 = oView.byId("TabBRListupl6");
                                        oTable5.setModel(oModel5);  
                                        // DTPA                                  
                                        var oModel5 = new sap.ui.model.json.JSONModel();
                                        oModel5.setData(BWDTPA_data);
                                        var oTable5 = oView.byId("TabBRListupl7");
                                        oTable5.setModel(oModel5);  
                                        // TRFN                                  
                                        var oModel5 = new sap.ui.model.json.JSONModel();
                                        oModel5.setData(BWTRFN_data);
                                        var oTable5 = oView.byId("TabBRListupl8");
                                        oTable5.setModel(oModel5);  
                                        // PRCS                                  
                                        var oModel5 = new sap.ui.model.json.JSONModel();
                                        oModel5.setData(BWPRCS_data);
                                        var oTable5 = oView.byId("TabBRListupl9");
                                        oTable5.setModel(oModel5);  

                                    };
                                    // for the file read to start reading
                                    file_reader.readAsText(upl_file);
                                });
                            }
                        }
                    },
                    onuplsettable: function (filecontent_json) {
                        //var oModel_upl = oView.getModel("techspec_uploadsample");
                    },
                    onuplfilepost: function (oEvent) {
                        oView.byId("idBRfileuploadform").close();
                    }
                }
                // load asyncronously XML fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.walkthrough.view.FileUpload",
                    controller: oFragmentController
                }).then(function (oDialog) {                   
                    // connect the dialog to the root view of this component
                    oView.addDependent(oDialog);
                    oDialog.open();
                })
            } else {
                oView.byId("idBRfileuploadform").open();
            }
        }
    });
});