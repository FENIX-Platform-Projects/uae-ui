/*global define*/

define(function () {

    'use strict';

    return {

        "resume": {
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


        },

        "population": {
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


        },


        









        "education": {
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
});