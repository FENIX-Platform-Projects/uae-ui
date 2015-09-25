/*global define*/

define(function () {

    'use strict';

    return {

        "trade": {
            filter: [
                {

                            "type": "distinct",
                            "uid": "UAE_FT",
                            "column": "item",
                            "containerType": "baseContainer",
                            "title": "Commodity",
                            "defaultCodes": ["0102"],
                            "components": [
                                {
                                    "type": "codelist",
                                    "componentType": "dropDownList-FENIX",
                                    "lang": "EN",
                                    "uid": "HS_2012",
                                    "title": {"EN": "Distinct"},
                                    // name is the ID output in tehe filter getValues()
                                    "name": "item",
                                    "config": {
                                        "defaultsource": []
                                    }

                        }
                    ]
                }
            ],

            dashboard : {}

            //dashboard: {
            //    //data cube's uid
            //    uid: "UAE_FT",
            //
            //    //bridge configuration
            //    bridge: {
            //
            //        type: "d3p"
            //
            //    },
            //
            //    /*
            //     * in case bridge is WDS this is the cube metadata.
            //     * if bridge is D3P this is ignored
            //     * */
            //    metadata: {},
            //
            //    items: [
            //
            //        {
            //            id: 'TR-item-1',
            //            type: 'chart',
            //            class: "fx-timeseries-ecample",
            //            //needed if layout = injected
            //            container: "#TR-item-1",
            //            config: {
            //                container: "#TR-item-1",
            //                adapter: {
            //                    type: "standard",
            //                    xDimensions: 'year',
            //                    yDimensions: 'element',
            //                    valueDimensions: 'value',
            //                    seriesDimensions: ['element']
            //                },
            //                template: {
            //                    //"title": "Top 25..."
            //                },
            //                creator: {
            //                    chartObj: {
            //                        chart: {
            //                            type: "column"
            //                        },
            //                        tooltip: {
            //                            valueSuffix: ' 1000 HA'
            //                        }
            //                    }
            //                }
            //            },
            //            // for now it takes the id, TODO: add uid as well
            //            allowedFilter: ['indicator', 'year', 'domain', 'incomes', 'subregion'],
            //            filter: [
            //                {
            //                    "name": "filter",
            //                    "parameters": {
            //                        "rows": {
            //
            //                            "element": {
            //                                "codes": [
            //                                    {
            //                                        "uid": "UAE_Elements",
            //                                        "codes": [
            //                                            "5622",
            //                                            "5922"
            //                                        ]
            //                                    }
            //                                ]
            //                            },
            //                            "item": {
            //                                "codes": [
            //                                    {
            //                                        "uid": "HS_2012",
            //                                        "codes": ["0102"]
            //
            //                                    }
            //                                ]
            //                            }
            //
            //
            //                        }
            //                    }
            //                }
            //
            //            ]
            //
            //        },
            //
            //
            //        {
            //            id: 'TR-item-2',
            //            type: 'chart',
            //            class: "fx-timeseries-ecample",
            //            //needed if layout = injected
            //            container: "#TR-item-2",
            //            config: {
            //                container: "#TR-item-2",
            //                adapter: {
            //                    type: "standard",
            //                    xDimensions: 'year',
            //                    yDimensions: 'element',
            //                    valueDimensions: 'value',
            //                    seriesDimensions: ['element']
            //                },
            //                template: {
            //                    //"title": "Top 25..."
            //                },
            //                creator: {
            //                    chartObj: {
            //                        chart: {
            //                            type: "column"
            //                        },
            //                        tooltip: {
            //                            valueSuffix: ' 1000 HA'
            //                        }
            //                    }
            //                }
            //            },
            //            // for now it takes the id, TODO: add uid as well
            //            allowedFilter: ['indicator', 'year', 'domain', 'incomes', 'subregion'],
            //            filter: [
            //                {
            //                    "name": "filter",
            //                    "parameters": {
            //                        "rows": {
            //
            //                            "element": {
            //                                "codes": [
            //                                    {
            //                                        "uid": "UAE_Elements",
            //                                        "codes": [
            //                                            "5610",
            //                                            "5910"
            //                                        ]
            //                                    }
            //                                ]
            //                            },
            //                            "item": {
            //                                "codes": [
            //                                    {
            //                                        "uid": "HS_2012",
            //                                        "codes": ["0102"]
            //
            //                                    }
            //                                ]
            //                            }
            //
            //
            //                        }
            //                    }
            //                }
            //
            //            ]
            //
            //        },
            //
            //        {
            //            id: 'TR-item-3',
            //            type: 'chart',
            //            class: "fx-timeseries-ecample",
            //            //needed if layout = injected
            //            container: "#TR-item-3",
            //            config: {
            //                container: "#TR-item-3",
            //                adapter: {
            //                    type: "standard",
            //                    xDimensions: 'year',
            //                    yDimensions: 'element',
            //                    valueDimensions: 'value',
            //                    seriesDimensions: ['element']
            //                },
            //                template: {
            //                    //"title": "Top 25..."
            //                },
            //                creator: {
            //                    chartObj: {
            //                        chart: {
            //                            type: "column"
            //                        },
            //                        tooltip: {
            //                            valueSuffix: ' 1000 HA'
            //                        }
            //                    }
            //                }
            //            },
            //            // for now it takes the id, TODO: add uid as well
            //            allowedFilter: ['indicator', 'year', 'domain', 'incomes', 'subregion'],
            //            filter: [
            //                {
            //                    "name": "filter",
            //                    "parameters": {
            //                        "rows": {
            //
            //                            "element": {
            //                                "codes": [
            //                                    {
            //                                        "uid": "UAE_Elements",
            //                                        "codes": [
            //                                            "5610",
            //                                            "5710"
            //                                        ]
            //                                    }
            //                                ]
            //                            },
            //                            "item": {
            //                                "codes": [
            //                                    {
            //                                        "uid": "HS_2012",
            //                                        "codes": ["0102"]
            //
            //                                    }
            //                                ]
            //                            }
            //
            //
            //                        }
            //                    }
            //                }
            //
            //            ]
            //
            //        },
            //
            //        {
            //            id: 'TR-item-4',
            //            type: 'chart',
            //            class: "fx-timeseries-ecample",
            //            //needed if layout = injected
            //            container: "#TR-item-4",
            //            config: {
            //                container: "#TR-item-4",
            //                adapter: {
            //                    type: "standard",
            //                    xDimensions: 'year',
            //                    yDimensions: 'element',
            //                    valueDimensions: 'value',
            //                    seriesDimensions: ['element']
            //                },
            //                template: {
            //                    //"title": "Top 25..."
            //                },
            //                creator: {
            //                    chartObj: {
            //                        chart: {
            //                            type: "column"
            //                        },
            //                        tooltip: {
            //                            valueSuffix: ' 1000 HA'
            //                        }
            //                    }
            //                }
            //            },
            //            // for now it takes the id, TODO: add uid as well
            //            allowedFilter: ['indicator', 'year', 'domain', 'incomes', 'subregion'],
            //            filter: [
            //                {
            //                    "name": "filter",
            //                    "parameters": {
            //                        "rows": {
            //
            //                            "element": {
            //                                "codes": [
            //                                    {
            //                                        "uid": "UAE_Elements",
            //                                        "codes": [
            //                                            "5622",
            //                                            "5722"
            //                                        ]
            //                                    }
            //                                ]
            //                            },
            //                            "item": {
            //                                "codes": [
            //                                    {
            //                                        "uid": "HS_2012",
            //                                        "codes": ["0102"]
            //
            //                                    }
            //                                ]
            //                            }
            //
            //
            //                        }
            //                    }
            //                }
            //
            //            ]
            //        }]
            //}
        },


        "livestock": {
            filter: [
                {
                    "type": "codelist-codes",
                    "containerType": "baseContainer",
                    "title": "Item",
                    "defaultCodes": ["0866"],
                    "components": [
                        {
                            "type": "codelist-codes",
                            "uid": "UAE_Commodity",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            // name is the ID output in tehe filter getValues()
                            "name": "item",
                            "config": {
                                "defaultsource": [],
                                filter: {
                                    "uid": "UAE_Commodity",
                                    "version": null,
                                    "codes": ["1016", "1126", "0866", "0976"]
                                }
                            }
                        }
                    ]
                }
            ],

            dashboard: {
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
                        id: 'LS-item-1',
                        type: 'map',
                        class: "fx-map-chart",
                        //needed if layout = injected
                        container: "#LS-item-1",
                        config: {
                            container: "#LS-item-1",
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 2
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: ['item', 'year'],
                        forbiddenValues: {
                            year: {time: [{from: 2013, to: 2013}]},
                            domain: {removeFilter: true}
                        },
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "year": {
                                            "time": [
                                                {
                                                    "from": 2013,
                                                    "to": 2013
                                                }
                                            ]
                                        },
                                        "item": {
                                            "codes": [
                                                {
                                                    "uid": "UAE_Commodity",
                                                    "codes": [
                                                        "0866"
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
            filter: [

                {
                    "type": "codelist-codes",
                    "containerType": "baseContainer",
                    "title": "Item",
                    "defaultCodes": ["0388"],
                    "components": [
                        {
                            "type": "codelist-codes",
                            "uid": "UAE_Commodity",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            // name is the ID output in tehe filter getValues()
                            "name": "item",
                            "config": {
                                "defaultsource": [],
                                filter: {
                                    "uid": "UAE_Commodity",
                                    "version": null,
                                    "codes": ["0388", "0399", "0394", "0397", "0358", "0393", "0567", "0463", "0641", "0083", "0446", "0639", "0497", "0512", "0571", "0569", "0221", "0619"]
                                }
                            }
                        }
                    ]
                }
            ],
            dashboard: {
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

                items: []


            }
        }
    }

});