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

           this.getView().setModel(
                new JSONModel({
                    results: []
                }),
                "approvalTable1"
            );

            this.getView().setModel(
                new JSONModel({
                    results: []
                }),
                "approvalTable2"
            );

            this.byId("approvalTable1").setVisibleRowCount(0);
            this.byId("approvalTable2").setVisibleRowCount(0);
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
                .getModel("approvalTable1")
                .setProperty("/results", []);

                this.getView()
                .getModel("approvalTable2")
                .setProperty("/results", []);

                this.byId("approvalTable1").setVisibleRowCount(0);
                this.byId("approvalTable2").setVisibleRowCount(0);
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

            this._loadApprovalTable1(oItems);

            this._loadApprovalTable2(oItems);

        },
        _loadApprovalTable1: function (oItems) {
            var aResults1 = [];

            if (
                oItems.action_get_PO_APP_list_1 &&
                oItems.action_get_PO_APP_list_1.result &&
                oItems.action_get_PO_APP_list_1.result.d &&
                oItems.action_get_PO_APP_list_1.result.d.results
            ) {
                aResults1 = oItems.action_get_PO_APP_list_1.result.d.results;
            }

            this.getView()
                .getModel("approvalTable1")
                .setProperty("/results", aResults1);

            this.byId("approvalTable1").setVisibleRowCount(aResults1.length);
        },
        _loadApprovalTable2: function (oItems) {
            var aResults2 = [];

            if (
                oItems.action_get_PO_APP_list_2 &&
                oItems.action_get_PO_APP_list_2.result &&
                oItems.action_get_PO_APP_list_2.result.d &&
                oItems.action_get_PO_APP_list_2.result.d.results
            ) {
                aResults2 = oItems.action_get_PO_APP_list_2.result.d.results;
            }

            this.getView()
                .getModel("approvalTable2")
                .setProperty("/results", aResults2);

            this.byId("approvalTable2").setVisibleRowCount(aResults2.length);
        }
    });
});