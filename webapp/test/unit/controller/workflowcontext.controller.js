/*global QUnit*/

sap.ui.define([
	"workflowcontext/controller/workflowcontext.controller"
], function (Controller) {
	"use strict";

	QUnit.module("workflowcontext Controller");

	QUnit.test("I should test the workflowcontext controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
