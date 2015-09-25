/*global define*/

define(function () {

    'use strict';

    return {

        "trade": {
            filter :[
                {
                    "type": "static",
                    "containerType": "baseContainer",
                    "title": "Year",
                    "components": [
                        {
                            "type": "time",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            "name": "year",
                            config: {
                                "defaultsource": [
                                    {"value": "2011", "label": "2011", "selected": true},
                                    {"value": "2010", "label": "2010", "selected": false},
                                    {"value": "2009", "label": "2009", "selected": false},
                                    {"value": "2008", "label": "2008", "selected": false},
                                    {"value": "2007", "label": "2007", "selected": false},
                                    {"value": "2006", "label": "2006", "selected": false},
                                    {"value": "2005", "label": "2005", "selected": false},
                                    {"value": "2004", "label": "2004", "selected": false},
                                    {"value": "2003", "label": "2003", "selected": false},
                                    {"value": "2002", "label": "2002", "selected": false},
                                    {"value": "2001", "label": "2001", "selected": false},
                                    {"value": "2000", "label": "2000", "selected": false},
                                    {"value": "1999", "label": "1999", "selected": false},
                                    {"value": "1998", "label": "1998", "selected": false},
                                    {"value": "1997", "label": "1997", "selected": false},
                                    {"value": "1996", "label": "1996", "selected": false},
                                    {"value": "1995", "label": "1995", "selected": false},
                                    {"value": "1994", "label": "1994", "selected": false},
                                    {"value": "1993", "label": "1993", "selected": false},
                                    {"value": "1992", "label": "1992", "selected": false},
                                    {"value": "1991", "label": "1991", "selected": false},
                                    {"value": "1990", "label": "1990", "selected": false}
                                ]
                            }
                        }
                    ]
                }
            ],

            dashboard : {
                //data cube's uid
                uid: "FLUDE_TOPIC_1",

                //bridge configuration
                bridge: {

                    type: "d3p"

                },

                /*
                 * in case bridge is WDS this is the cube metadata.
                 * if bridge is D3P this is ignored
                 * */
                metadata: {},

                items: []


            }
        },

        "livestock": {
            filter : [
                {
                    "type": "static",
                    "containerType": "baseContainer",
                    "title": "Year",
                    "components": [
                        {
                            "type": "time",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            "name": "year",
                            config: {
                                "defaultsource": [
                                    {"value": "2011", "label": "2011", "selected": true},
                                    {"value": "2010", "label": "2010", "selected": false},
                                    {"value": "2009", "label": "2009", "selected": false},
                                    {"value": "2008", "label": "2008", "selected": false},
                                    {"value": "2007", "label": "2007", "selected": false},
                                    {"value": "2006", "label": "2006", "selected": false},
                                    {"value": "2005", "label": "2005", "selected": false},
                                    {"value": "2004", "label": "2004", "selected": false},
                                    {"value": "2003", "label": "2003", "selected": false},
                                    {"value": "2002", "label": "2002", "selected": false},
                                    {"value": "2001", "label": "2001", "selected": false},
                                    {"value": "2000", "label": "2000", "selected": false},
                                    {"value": "1999", "label": "1999", "selected": false},
                                    {"value": "1998", "label": "1998", "selected": false},
                                    {"value": "1997", "label": "1997", "selected": false},
                                    {"value": "1996", "label": "1996", "selected": false},
                                    {"value": "1995", "label": "1995", "selected": false},
                                    {"value": "1994", "label": "1994", "selected": false},
                                    {"value": "1993", "label": "1993", "selected": false},
                                    {"value": "1992", "label": "1992", "selected": false},
                                    {"value": "1991", "label": "1991", "selected": false},
                                    {"value": "1990", "label": "1990", "selected": false}
                                ]
                            }
                        }
                    ]
                },
                {
                    "type": "codelist-codes",
                    "containerType": "baseContainer",
                    "title": "Item",
                    "defaultCodes": ["1717"],
                    "components": [
                        {
                            "type": "codelist-codes",
                            "uid": "FAOSTAT_Items",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            // name is the ID output in tehe filter getValues()
                            "name": "item",
                            "config": {
                                "defaultsource": [ ],
                                filter :  {
                                    "uid": "FLUDE_FAOSTAT_ITEM",
                                    "version": null,
                                    "codes" : ["QC"]
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "codelist-codes",
                    "containerType": "baseContainer",
                    "title": "Elements",
                    "defaultCodes": ["5312"],
                    "components": [
                        {
                            "type": "codelist-codes",
                            "uid": "FAOSTAT_Elements",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            // name is the ID output in the filter getValues()
                            "name": "element",
                            "config": {
                                "defaultsource": [ ],
                                filter :  {
                                    "uid": "FAOSTAT_Elements",
                                    "version": null,
                                    "codes" : ["QC"]
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "codelist",
                    "containerType": "baseContainer",
                    "title": "Country",
                    "defaultCodes": ["33"],
                    "components": [
                        {
                            "type": "codelist",
                            "uid": "FAOSTAT_Countries",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            // name is the ID output in the filter getValues()
                            "name": "country",
                            "config": {
                                "defaultsource": [ ]
                            }
                        }
                    ]
                }
            ],

            dashboard : {
                //data cube's uid
                uid: "UNECA_Population",

                //bridge configuration
                bridge: {

                    type: "d3p"

                },

                /*
                 * in case bridge is WDS this is the cube metadata.
                 * if bridge is D3P this is ignored
                 * */
                metadata: {},

                items: [
                    {
                        //Time series
                        id: 'item-1',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#population-1",
                        config: {
                            container: "#population-1",
                            adapter: {
                                type: "standard",
                                xDimensions: 'time',
                                yDimensions: 'item',
                                valueDimensions: 'value',
                                seriesDimensions: ['AgeRangeCode']
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {
                                chartObj: {
                                    chart: {
                                        type: "column"
                                    }
                                }
                            }
                        },

                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "01010104"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    },

                    {
                        //Time series
                        id: 'item-2',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#population-2",
                        config: {
                            container: "#population-2",
                            adapter: {
                                type: "standard",
                                xDimensions: 'time',
                                yDimensions: 'item',
                                valueDimensions: 'value',
                                seriesDimensions: ['GenderCode']
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {
                                chartObj: {
                                    chart: {
                                        type: "column"
                                    }
                                }
                            }
                        },


                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "01010101"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        //Time series
                        id: 'item-3',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#population-3",
                        config: {
                            container: "#population-3",
                            adapter: {
                                type: "standard",
                                xDimensions: 'time',
                                yDimensions: 'item',
                                valueDimensions: 'value',
                                seriesDimensions: []
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {}
                        },


                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "010104"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    },


                    {
                        //Time series
                        id: 'item-4',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#population-4",
                        config: {
                            container: "#population-4",
                            adapter: {
                                type: "standard",
                                xDimensions: 'time',
                                yDimensions: 'item',
                                valueDimensions: 'value',
                                seriesDimensions: []
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {}
                        },


                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "010105"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    },


                    {
                        //Time series
                        id: 'item-5',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#population-5",
                        config: {
                            container: "#population-5",
                            adapter: {
                                type: "standard",
                                xDimensions: 'time',
                                yDimensions: 'item',
                                valueDimensions: 'value',
                                seriesDimensions: []
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {
                                chartObj: {
                                    chart: {
                                        type: "column"
                                    }
                                }
                            }
                        },


                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "010103"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    },


                    {
                        //Time series
                        id: 'item-6',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#population-6",
                        config: {
                            container: "#population-6",
                            adapter: {
                                type: "standard",
                                xDimensions: 'time',
                                yDimensions: 'item',
                                valueDimensions: 'value',
                                seriesDimensions: []
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {}
                        },


                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "010101"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    }


                ]


            }
        },

        "crops": {
            filter : [
                {
                    "type": "static",
                    "containerType": "baseContainer",
                    "title": "Year",
                    "components": [
                        {
                            "type": "time",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            "name": "year",
                            config: {
                                "defaultsource": [
                                    {"value": "2011", "label": "2011", "selected": true},
                                    {"value": "2010", "label": "2010", "selected": false},
                                    {"value": "2009", "label": "2009", "selected": false},
                                    {"value": "2008", "label": "2008", "selected": false},
                                    {"value": "2007", "label": "2007", "selected": false},
                                    {"value": "2006", "label": "2006", "selected": false},
                                    {"value": "2005", "label": "2005", "selected": false},
                                    {"value": "2004", "label": "2004", "selected": false},
                                    {"value": "2003", "label": "2003", "selected": false},
                                    {"value": "2002", "label": "2002", "selected": false},
                                    {"value": "2001", "label": "2001", "selected": false},
                                    {"value": "2000", "label": "2000", "selected": false},
                                    {"value": "1999", "label": "1999", "selected": false},
                                    {"value": "1998", "label": "1998", "selected": false},
                                    {"value": "1997", "label": "1997", "selected": false},
                                    {"value": "1996", "label": "1996", "selected": false},
                                    {"value": "1995", "label": "1995", "selected": false},
                                    {"value": "1994", "label": "1994", "selected": false},
                                    {"value": "1993", "label": "1993", "selected": false},
                                    {"value": "1992", "label": "1992", "selected": false},
                                    {"value": "1991", "label": "1991", "selected": false},
                                    {"value": "1990", "label": "1990", "selected": false}
                                ]
                            }
                        }
                    ]
                },
                {
                    "type": "codelist-codes",
                    "containerType": "baseContainer",
                    "title": "Item",
                    "defaultCodes": ["1717"],
                    "components": [
                        {
                            "type": "codelist-codes",
                            "uid": "FAOSTAT_Items",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            // name is the ID output in tehe filter getValues()
                            "name": "item",
                            "config": {
                                "defaultsource": [ ],
                                filter :  {
                                    "uid": "FLUDE_FAOSTAT_ITEM",
                                    "version": null,
                                    "codes" : ["QC"]
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "codelist-codes",
                    "containerType": "baseContainer",
                    "title": "Elements",
                    "defaultCodes": ["5312"],
                    "components": [
                        {
                            "type": "codelist-codes",
                            "uid": "FAOSTAT_Elements",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            // name is the ID output in the filter getValues()
                            "name": "element",
                            "config": {
                                "defaultsource": [ ],
                                filter :  {
                                    "uid": "FAOSTAT_Elements",
                                    "version": null,
                                    "codes" : ["QC"]
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "codelist",
                    "containerType": "baseContainer",
                    "title": "Country",
                    "defaultCodes": ["33"],
                    "components": [
                        {
                            "type": "codelist",
                            "uid": "FAOSTAT_Countries",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            // name is the ID output in the filter getValues()
                            "name": "country",
                            "config": {
                                "defaultsource": [ ]
                            }
                        }
                    ]
                }
            ],
            dashboard :  {
                //data cube's uid
                uid: "UNECA_Education",

                //bridge configuration
                bridge: {

                    type: "d3p"

                },

                /*
                 * in case bridge is WDS this is the cube metadata.
                 * if bridge is D3P this is ignored
                 * */
                metadata: {},

                items: [
                    {
                        //Time series
                        id: 'item-1',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#education-1",
                        config: {
                            container: "#education-1",
                            adapter: {
                                type: "timeserie",
                                xDimensions: 'time',
                                yDimensions: 'item',
                                valueDimensions: 'value',
                                seriesDimensions: []
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {}
                        },

                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "010201"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        //Time series
                        id: 'item-2',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#education-2",
                        config: {
                            container: "#education-2",
                            adapter: {
                                type: "standard",
                                xDimensions: 'time',
                                yDimensions: 'item',
                                valueDimensions: 'value',
                                seriesDimensions: ['GenderCode']
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {}
                        },

                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "01020301"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        id: 'item-3',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#education-3",
                        config: {
                            container: "#education-3",
                            adapter: {
                                type: "standard",
                                xDimensions: 'time',
                                yDimensions: 'item',
                                valueDimensions: 'value',
                                seriesDimensions: ['GenderCode']
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {
                                chartObj: {
                                    chart: {
                                        type: "column"
                                    }
                                }
                            }
                        },

                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "01020401"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]


            }
        }
    };
});