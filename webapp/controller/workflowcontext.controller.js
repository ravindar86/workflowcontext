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
                new JSONModel({}),
                "purchaseHeader"
            );

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

            this.getView().setModel(
                new JSONModel({}), 
                "custom");

            this.getView().setModel(
                    new JSONModel({
                        items: []
                    }), "commentTable");

            this.byId("commentTable").setVisibleRowCount(0);
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
                this._loadPurchaseHeader();
                this._loadCustom();
                this._loadComments();
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

                this.getView()
                    .getModel("custom")
                    .setData({});

                this.getView()
                    .getModel("commentTable")
                    .setData({ items: [] });

                this.byId("commentTable").setVisibleRowCount(0);

                this.getView()
                    .getModel("purchaseHeader")
                    .setData({});
            }
        },
        _loadPurchaseHeader: function () {

            var oItems = this.getView()
                .getModel("items")
                .getData();

            var oPurchaseHeader = {};

            if (
                oItems.action_get_getCegHeaderId_1 &&
                oItems.action_get_getCegHeaderId_1.result &&
                oItems.action_get_getCegHeaderId_1.result.d
            ) {
                oPurchaseHeader =
                    oItems.action_get_getCegHeaderId_1.result.d;
            }

            this.getView()
                .getModel("purchaseHeader")
                .setData(oPurchaseHeader);

        },
        _buildHeaderFields: function (oHeader) {
           
            this.getView()
                     .getModel("selectedHeader")
                     .setData(oHeader);
        },
        _loadApprovalTable: function () {

             this._loadTable(
                "action_get_PO_APP_list_1",
                "approvalTable1",
                "approvalTable1"
            );

            this._loadTable(
                "action_get_PO_APP_list_2",
                "approvalTable2",
                "approvalTable2"
            );

        },
        _loadTable: function (sAction,sModel,sTableId) {

            var oItems = this.getView()
                .getModel("items")
                .getData();

            var aResults = [];

            if (
                oItems[sAction] &&
                oItems[sAction].result &&
                oItems[sAction].result.d &&
                oItems[sAction].result.d.results
            ) {
                aResults =
                    oItems[sAction].result.d.results;
            }

            this.getView()
                .getModel(sModel)
                .setProperty("/results", aResults);

            this.byId(sTableId)
                .setVisibleRowCount(
                    Math.min(aResults.length, 10)
                );

        },        
        _loadCustom: function () {

            var oItems = this.getView()
                .getModel("items")
                .getData();

            if (oItems.custom) {
                this.getView()
                    .getModel("custom")
                    .setData(oItems.custom);
            } else {
                this.getView()
                    .getModel("custom")
                    .setData({});
            }
        },
        _loadComments: function () {

            var oItems = this.getView()
                .getModel("items")
                .getData();

            var aComments = [];

            if (
                oItems.action_get_comment_api_1 &&
                oItems.action_get_comment_api_1.result &&
                oItems.action_get_comment_api_1.result.d &&
                oItems.action_get_comment_api_1.result.d.results &&
                oItems.action_get_comment_api_1.result.d.results.length > 0 &&
                oItems.action_get_comment_api_1.result.d.results[0].item
            ) {
                aComments = oItems.action_get_comment_api_1.result.d.results[0].item;
            }

            this.getView()
                .getModel("commentTable")
                .setProperty("/items", aComments);

            this.byId("commentTable")
                .setVisibleRowCount(Math.min(aComments.length, 10));
        },
        onCommentChange: function (oEvent) {

            var sComment = oEvent.getParameter("value");
            var oContext = oEvent.getSource().getBindingContext("commentTable");
            var oRow = oContext.getObject();

            console.log(oRow);

            console.log("New Comment :", sComment);
        },
        onSaveComments: function () {

            var aComments = this.getView()
                .getModel("commentTable")
                .getProperty("/items");

            console.log(aComments);

            // Later:
            // oModel.update(...)
        },
        isCommentEditable: function (sStatus) {
            if (!sStatus) {
                return true;
            }
            return sStatus.trim().toUpperCase() !== "APPROVED";
        }
    });
});