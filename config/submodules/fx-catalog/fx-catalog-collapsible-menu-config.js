/* global define */

define(function () {

    'use strict';

    return {
        "panels": [
            {
                "title": {
                    "EN": "CONTENT"
                },
                "popover": {
                    "data-container": "body",
                    "data-toggle": "popover",
                    "data-placement": "left",
                    "data-content": "Vivamus sagittis lacus vel augue laoreet rutrum faucibus.",
                    "data-trigger": "hover"

                },
                "modules": [
                    {
                        "module": "resourceType",
                        "label": {
                            "EN": "Resource Type"
                        },
                        "icon": "fa fa-database fa-lg fa-fw"
                    },
                    {
                        "module": "referencePeriod",
                        "label": {
                            "EN": "Reference Period"
                        },
                        "icon": "fa fa-clock-o fa-lg fa-fw"
                    },
                    {
                        "module": "referenceArea",
                        "label": {
                            "EN": "Reference Area"
                        },
                        "icon": "fa fa-clock-o fa-lg fa-fw"
                    },
                    {
                        "module": "sector",
                        "label": {
                            "EN": "Data Domain"
                        },
                        "icon": "fa fa-clock-o fa-lg fa-fw"
                    },
                    {
                        "module": "region",
                        "label": {
                            "EN": "Region"
                        },
                        "icon": "fa fa-globe fa-lg fa-fw"
                    }
                ]
            },
            {
                "title": {
                    "EN": "ACCESSIBILITY"
                },
                "popover": {
                    "data-container": "body",
                    "data-toggle": "popover",
                    "data-placement": "left",
                    "data-content": "Vivamus sagittis lacus vel augue laoreet rutrum faucibus.",
                    "data-trigger": "hover"

                },
                "modules": [
                    {
                        "module": "context",
                        "label": {
                            "EN": "Dissemination System"
                        },
                        "icon": "fa fa-database fa-lg fa-fw"
                    },
                    {
                        "module": "statusOfConfidentiality",
                        "label": {
                            "EN": "Status of Confidentiality"
                        },
                        "icon": "fa fa-globe fa-lg fa-fw"
                    }
                ]
            },
            {
                "title": {
                    "EN": "SEARCH BY ID"
                },
                "popover": {
                    "data-container": "body",
                    "data-toggle": "popover",
                    "data-placement": "left",
                    "data-content": "Vivamus sagittis lacus vel augue laoreet rutrum faucibus.",
                    "data-trigger": "hover"

                },
                "modules": [
                    {
                        "module": "uid",
                        "label": {
                            "EN": "Uid"
                        },
                        "icon": "fa fa-slack fa-lg fa-fw"
                    }
                ]
            }
        ]
    };

});


