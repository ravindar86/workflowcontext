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
             this.getView().setModel(
                new sap.ui.model.json.JSONModel({}),
                "selectedHeader"
            );

            this.getView().setModel(
                new JSONModel({
                    type: "",
                    data: {}
                }),
                "contextView"
            );

            var oApprovalTable = new JSONModel({
                results: []
            });

            this.getView().setModel(oApprovalTable, "approvalTable");
        },
        onInstanceSelect : function (oEvent) {
            var oInstance = oEvent.getParameter("listItem")
                .getBindingContext("instances")
                .getObject();

            var oHeader = this.getView()
                .getModel("header")
                .getData();

            MessageToast.show("Selected : " + oInstance.businessKey);

            // Load Header
            this._loadHeader(oInstance);
        },
        _loadHeader: function (oInstance) {

            var oHeader = this.getView()
                .getModel("header")
                .getData();

            if (oInstance.businessKey === oHeader.businessKey) {
                this._buildHeaderFields(oHeader);
                this._loadApprovalTable();
            } else {
                this.getView()
                    .getModel("selectedHeader")
                    .setData({});

                this.getView()
                .getModel("approvalTable")
                .setProperty("/results", []);
                this.byId("approvalTable").setVisibleRowCount(0);
            }
        },
        _buildHeaderFields: function (oHeader) {
           
            this.getView()
                     .getModel("selectedHeader")
                     .setData(oHeader);
        },
        _loadApprovalTable: function () {

            var oItems = this.getView()
                .getModel("items")
                .getData();

            var aResults = [];

            if (
                oItems.action_get_PO_APP_list_1 &&
                oItems.action_get_PO_APP_list_1.result &&
                oItems.action_get_PO_APP_list_1.result.d &&
                oItems.action_get_PO_APP_list_1.result.d.results
            ) {
                aResults = oItems.action_get_PO_APP_list_1.result.d.results;
            }

            this.getView()
                .getModel("approvalTable")
                .setProperty("/results", aResults);

            this.byId("approvalTable").setVisibleRowCount(aResults.length);

        }
    });
});