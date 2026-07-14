sap.ui.define([
    "sap/ui/core/format/DateFormat"
], function (DateFormat) {
    "use strict";

    return {

        formatDateTime: function (sDate) {

            if (!sDate) {
                return "";
            }

            var oDate = new Date(sDate);

            return DateFormat.getDateTimeInstance({
                //pattern: "dd-MMM-yyyy HH:mm:ss"
                style: "medium"
            }).format(oDate);

        },
        formatSAPDate: function (sDate) {

            if (!sDate) {
                return "";
            }

            var aMatch = /\/Date\((\d+)/.exec(sDate);

            if (!aMatch) {
                return "";
            }

            var oDate = new Date(parseInt(aMatch[1], 10));

            return DateFormat.getDateTimeInstance({
                pattern: "dd-MMM-yyyy hh:mm:ss a"
            }).format(oDate);

        }

    };
});