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

        }

    };
});