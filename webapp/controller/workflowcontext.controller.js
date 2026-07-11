sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "workflowcontext/model/formatter"
], (Controller, MessageToast, JSONModel, formatter) => {
    "use strict";

    return Controller.extend("workflowcontext.controller.workflowcontext", {
        formatter: formatter,
        onInit() {
            //  var oHeaderFields = new JSONModel({
            //     fields: []
            // });

            // this.getView().setModel(oHeaderFields, "headerFields");

             this.getView().setModel(
                new sap.ui.model.json.JSONModel({}),
                "selectedHeader"
            );
        },
        onInstanceSelect : function (oEvent) {
            var oInstance = oEvent.getParameter("listItem")
                .getBindingContext("instances")
                .getObject();

            var oHeader = this.getView()
                .getModel("header")
                .getData();

            // Match Instance ID with Header Root Instance ID
            if (oInstance.businessKey === oHeader.businessKey) {

                //this._buildHeaderFields(oHeader);
                this.getView()
                    .getModel("selectedHeader")
                    .setData(oHeader);

            } else {

                // Clear Header Section
                // this.getView()
                //     .getModel("headerFields")
                //     .setProperty("/fields", []);

                this.getView()
                    .getModel("selectedHeader")
                    .setData({});
            }       
        },
        _buildHeaderFields: function (oHeader) {

            var aFields = [];
            Object.keys(oHeader).forEach(function (sKey) {
                aFields.push({
                    key: sKey,
                    value: oHeader[sKey]
                });
            });

            this.getView()
                .getModel("headerFields")
                .setProperty("/fields", aFields);
        }
    });
});