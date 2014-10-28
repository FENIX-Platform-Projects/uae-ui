define([
    'jquery',
    'structure/structure',
    'fenix-ui-topmenu/main',
    //'highcharts.export',
    'highstocks',
    'jqwidgets',
    /*'pivot/configuration',
    'pivot/countriesAgg',
    'pivot/gchart_renderers',
    'pivot/jquery-ui',
    'pivot/pivot',*/
    'i18n'
], function ($, Structure, TopMenu) {

    function Host() {
    }

    Host.prototype.initFenixComponent = function () {

        var self = this;

        var callbacks = {
            "callback 1": function () {
                console.log("Callback One")
            },
            "callback 2": function () {
                self.initChats();
                self.initStocks();
            },
            "callback 3": function () {
                console.log("Callback Three")
            },
            "callback 4": function () {
                self.initGrid();
            },
            "callback 5": function () {
                //self.initPivot();
            }
        };

        $.getJSON("json/fenix_interface_view_conf.json", function (conf) {
            new Structure().initialize(conf, callbacks);
        });

        new TopMenu({
            url: 'json/fenix-ui-topmenu_config.json', active: "view"
        });

    };

    Host.prototype.initChats = function () {

        var conf = {
            'chart-1': {

                //Line chart

                chart: {
                    type: 'area', //Tipo di grafico:  area, areaspline, boxplot, bubble, column, line, pie, scatter, spline

                    alignTicks: false,
                    backgroundColor: '#FFFFFF', //Colore di background
                    //borderColor: '#3fa8da', //Colore bordo intorno
                    //borderWidth: 1, //Spessore bordo intorno
                    //borderRadius: 0, //Smusso bordo intorno
                    //margin: [5,5,5,5], //Margine intorno (vince sullo spacing)
                    spacing: [20, 1, 1, 1],//Spacing intorno (molto simile al margin - Di default il bottom è 15, qui l'ho messo a 10 per essere uguale agli altri)
                    //plotBackgroundColor: 'red', //Colore di background solo area chart
                    plotBorderColor: '#ffffff', //Colore bordo intorno solo area chart
                    plotBorderWidth: 0, //Spessore bordo intorno solo area chart
                    //showAxes: false, //Mostra gli assi quando le serie sono aggiunte dinamicamente
                    style: {
                        fontFamily: 'Roboto Condensed', // Font di tutto
                        fontSize: '12px', // La dimensione qui vale solo per i titoli
                        fontWeight: 300 // Con Roboto è molto bello giocare con i pesi
                    },
                    zoomType: 'xy', //Attiva lo zoom e stabilisce in quale dimensione
                    //selectionMarkerFill: 'rgba(0,0,0,0.25)',//Colore di fonfo della selezione per lo zoom (trasparente per far vedere sotto)
                    resetZoomButton: {
                        position: {
                            align: 'right', //Allineamento zoom orizzontale
                            //verticalAlign:'middle' //Allineamento zoom verticale
                            x: -10 //Posizione del pulsante rispetto all'allineamento (valori positivi > destra) e al PLOT

                        },
                        theme: {
                            fill: '#FFFFFF', //Colore di background pulsante reset zoom
                            stroke: '#666666', //Colore di stroke pulsante reset zoom
                            width: 60, //Larghezza del pulsante reset
                            //r:0, //Smusso pulsante reset zoom
                            style: {
                                textAlign: 'center', //CSS style aggiunto da me per centrare il testo
                                fontSize: 10
                            },
                            states: {
                                hover: {
                                    fill: '#e6e6e6', //Colore di background hover pulsante reset zoom
                                    stroke: '#666666', //Colore di stroke hover pulsante reset zoom
                                    style: {
                                        //color: 'white' //Colore testo hover pulsante reset zoom
                                    }
                                }
                            }
                        }

                    }
                },
                colors: [ //Colori delle charts
                    '#ca1a33',
                    '#76BE94',
                    '#744490',
                    '#E10079',
                    '#2D1706',
                    '#F1E300',
                    '#F7AE3C',
                    '#DF3328'
                ],
                credits: {
                    enabled: false //Attiva o disattiva il link di HighCharts dalla chart
                },
                exporting: {
                    enabled: false
                },
                navigation: { //Modifica lo stile dei bottoni e spesso del solo bottone dell'esportazione (lo sfondo)
                    buttonOptions: {
                        theme: {
                            'stroke-width': 1, // Peso stroke del bottone
                            stroke: '#666666', // Colore stroke del bottone
                            r: 0, // Smusso stroke del bottone,
                            states: {
                                hover: {
                                    stroke: '#666666', // Press stroke del bottone
                                    fill: '#e6e6e6' // Rollover del bottone
                                },
                                select: {
                                    stroke: '#666666', // Press stroke del bottone
                                    fill: '#e6e6e6' // Press Fill del bottone
                                }
                            }
                        }
                    }
                },
                legend: { //Modifica style della legenda
                    enabled: true, //Attiva la legenda
                    floating: false, // IMPORTANTE - Permette alla plot area di stare sotto alla legenda - si guadagna molto spazio

                    //margin: 100, //Margine dell'intero blocco legenda dall'area di PLOT (Solo quando non è floating)
                    //padding: 20, //Padding del box legenda (Ingrandisce il box)
                    backgroundColor: '#FFFFFF', //Colore di sfondo della legenda
                    //layout: 'horizontal', //Tipologia di legenda
                    align: 'center', //Allineamento orizzontale del box della legenda (left, center, right)
                    verticalAlign: 'bottom', //allineamento verticale della legenda (top, middle, bottom)
                    //width: 200, //Larghezza della legenda (Aggiunge Margini e padding)
                    //x: -8,//Offset della posizione della legenda rispetto all'allineamento (valori positivi > destra)
                    //y: -8,//Offset della posizione della legenda rispetto all'allineamento (valori positivi > verso il basso)
                    //maxHeight: 90, //IMPORTANTE - Indica l'altezza massima della legenda, se superata, mostra la paginazione (vedi sotto)
                    //borderColor: '#666666', //Colore del bordo della legenda
                    borderWidth: 0, //Spessore bordo della legenda
                    //borderRadius: 3, //Smusso della legenda
                    //itemDistance: 10, //Distanza X degli elementi quando la legenda è in verticale
                    //symbolWidth: 20, //Larghezza del simbolo rettangolo quando la legenda ne ha uno (accanto al nome - default 16)
                    //symbolHeight: 20, //Altezza del simbolo rettangolo quando la legenda ne ha uno (accanto al nome - default 12)
                    //symbolRadius: 3, //Smusso del simbolo rettangolo quando la legenda ne ha uno (default 2)
                    symbolPadding: 10, //Distanza tra simbolo e legenda (default 5)
                    //itemMarginBottom: 5, //Margine inferiore di ogni elemento della legenda
                    //itemMarginTop: 5, //Margine superiore di ogni elemento della legenda
                    //lineHeight: 20, //Altezza di ogni elemento della legenda (il valore di default è 16)
                    itemStyle: {
                        cursor: 'pointer',
                        color: '#666666',
                        fontSize: '14px',
                        fontWeight: 300
                    },
                    itemHiddenStyle: { //Colore dell'elemento legenda quando è disattivato
                        color: '#eeeeee'
                    },
                    itemHoverStyle: { //Colore dell'elemento legenda in rollover
                        color: '#3ca7da'
                    },
                    navigation: { //Paginazione Legenda - stilizzazione
                        activeColor: '#3ca7da', //Colore freccia attiva legenda
                        inactiveColor: '#666666', //Colore freccia disattiva legenda
                        arrowSize: 8, //Dimensioni freccia
                        animation: true, //Attiva/Disattiva animazione
                        style: { //Stile CSS applicato solo alla navigazione della legenda
                            color: '#666666',
                            fontSize: '10px'
                        }
                    }
                },
                plotOptions: {
                    series: {
                        allowPointSelect: true, //Permette di selezionare i punti della chart
                        //pointPlacement: "on", Per partire dall'origine
                        animation: { // Configura l'animazione di entrata
                            duration: 1000,
                            easing: 'swing'
                        },
                        connectNulls: true,
                        cropThreshold: 3,
                        lineWidth: 1, // IMPORTANTE - Cambia lo spessore delle linee della chart
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        fillColor: {
                            linearGradient: [0, 0, 0, 350],
                            stops: [
                                [0, 'rgba(55, 155, 205,0.5)'],
                                [1, 'rgba(255,255,255,0)']
                            ]
                        },
                        marker: {
                            enabled: true, //Attiva o disattiva i marker
                            //symbol: 'url(http://www.mentaltoy.com/resources/logoChart.png)', //Questo paramentro carica un simbolo personalizzato. Si può anche avere una chart con marker diverse sulle linee
                            symbol: 'circle', // Tipologia di marker
                            radius: 4,
                            lineWidth: 1,
                            lineColor: '#ca1a33',
                            fillColor: '#FFFFFF',
                            states: {
                                hover: {
                                    enabled: true, // Attiva o disattiva il marker quando si passa sopra la chart
                                    symbol: 'circle',
                                    fillColor: '#FFFFFF',
                                    lineColor: '#ca1a33',
                                    radius: 5,
                                    lineWidth: 2
                                }
                            }
                        }
                        //cursor: 'cell',// Cambia il cursore on rollover del grafico
                        //dashStyle: 'ShortDash', //Tipologia di linea (Solid ShortDash ShortDot ShortDashDot ShortDashDotDot Dot Dash LongDash DashDot LongDashDot LongDashDotDot)
                        /*dataLabels: {
                         enabled: true, //Attiva le label sopra i punti nel grafico
                         backgroundColor: '#FFFFFF',
                         borderRadius: 3,
                         borderWidth: 1,
                         borderColor: '#666666'

                         },*/
                        /*events: {// Aggiunge eventi alla chart
                         show: function(event) { //Aggiunge evento di quando un elemnto ricompare cliccandolo dalla legenda
                         alert ('The series was just shown');
                         }
                         },*/

                    }
                },
                //END


                title: {
                    enabled: false,
                    text: null,
                    x: -20 //center
                },
                subtitle: {
                    text: null,
                    x: -20
                },
                xAxis: {
                    categories: ['1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'],
                    gridLineWidth: 1, // IMPORTANTE - Attiva le linee verticali
                    lineColor: '#e0e0e0',
                    tickColor: '#e0e0e0',
                    gridLineColor: '#eeeeee',
                    tickLength: 7,
                    //tickmarkPlacement: 'on', Per partire dall'origine
                    labels: {
                        y: 25,
                        style: {
                            color: '#666666',
                            fontWeight: '300',
                            fontSize: 12
                        }
                    }
                    /*plotLines: [{ //linea custom possono essere anche più di una, è un array
                     color: '#666666',
                     width: 1,
                     value: 11.5,
                     dashStyle: 'dash',
                     zIndex: 3
                     }, { //linea custom possono essere anche più di una, è un array
                     color: '#FFFFFF',
                     width: 1,
                     value: 11.5,
                     zIndex: 2
                     }]*/
                },
                yAxis: {
                    floor: 800,
                    ceiling: 1100,
                    gridLineWidth: 1, // IMPORTANTE - Attiva le linee verticali
                    lineWidth: 1,
                    //tickWidth: 1,
                    lineColor: '#e0e0e0',
                    gridLineColor: '#eeeeee',
                    labels: {
                        style: {
                            color: '#666666',
                            fontWeight: '300',
                            fontSize: 12
                        }
                    },
                    title: {
                        enabled: false,
                        text: 'null'
                    },
                    plotLines: [
                        {
                            value: 0,
                            width: 1
                        }
                    ]
                },
                tooltip: {
                    valueSuffix: 'M',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderWidth: 1,
                    shadow: false
                },
                series: [
                    {
                        name: 'Number of undernourished declining',
                        data: [1015, 1030, 1026, 1010, 973, 949, 944, 932, 933, 940, 957, 949, 944, 934, 931, 907, 890, 883, 878, 870, 854, 842]
                    }
                ]
            },
            'chart-2': {

                //MTY ®

                chart: {
                    type: 'pie', //Tipo di grafico:  area, areaspline, boxplot, bubble, column, line, pie, scatter, spline

                    alignTicks: false,
                    backgroundColor: '#FFFFFF', //Colore di background
                    //borderColor: '#3fa8da', //Colore bordo intorno
                    //borderWidth: 1, //Spessore bordo intorno
                    //borderRadius: 0, //Smusso bordo intorno
                    //margin: [5,5,5,5], //Margine intorno (vince sullo spacing)
                    spacing: [20, 1, 1, 1],//Spacing intorno (molto simile al margin - Di default il bottom è 15, qui l'ho messo a 10 per essere uguale agli altri)
                    //plotBackgroundColor: 'red', //Colore di background solo area chart
                    plotBorderColor: '#ffffff', //Colore bordo intorno solo area chart
                    plotBorderWidth: 0, //Spessore bordo intorno solo area chart
                    //showAxes: false, //Mostra gli assi quando le serie sono aggiunte dinamicamente
                    style: {
                        fontFamily: 'Roboto', // Font di tutto
                        fontSize: '12px', // La dimensione qui vale solo per i titoli
                        fontWeight: 300 // Con Roboto è molto bello giocare con i pesi
                    },
                    zoomType: 'xy', //Attiva lo zoom e stabilisce in quale dimensione
                    //selectionMarkerFill: 'rgba(0,0,0,0.25)',//Colore di fonfo della selezione per lo zoom (trasparente per far vedere sotto)
                    resetZoomButton: {
                        position: {
                            align: 'right', //Allineamento zoom orizzontale
                            //verticalAlign:'middle' //Allineamento zoom verticale
                            x: -10 //Posizione del pulsante rispetto all'allineamento (valori positivi > destra) e al PLOT

                        },
                        theme: {
                            fill: '#FFFFFF', //Colore di background pulsante reset zoom
                            stroke: '#666666', //Colore di stroke pulsante reset zoom
                            width: 60, //Larghezza del pulsante reset
                            //r:0, //Smusso pulsante reset zoom
                            style: {
                                textAlign: 'center', //CSS style aggiunto da me per centrare il testo
                                fontSize: 10
                            },
                            states: {
                                hover: {
                                    fill: '#e6e6e6', //Colore di background hover pulsante reset zoom
                                    stroke: '#666666', //Colore di stroke hover pulsante reset zoom
                                    style: {
                                        //color: 'white' //Colore testo hover pulsante reset zoom
                                    }
                                }
                            }
                        }

                    }
                },
                colors: [ //Colori delle charts
                    '#71a7d1',
                    '#b6d2e9',
                    '#dbeaf5',
                    '#b6d2e9',
                    '#95bddd'
                ],
                credits: {
                    enabled: false //Attiva o disattiva il link di HighCharts dalla chart
                },
                exporting: {
                    enabled: false
                },
                navigation: { //Modifica lo stile dei bottoni e spesso del solo bottone dell'esportazione (lo sfondo)
                    buttonOptions: {
                        theme: {
                            'stroke-width': 1, // Peso stroke del bottone
                            stroke: '#666666', // Colore stroke del bottone
                            r: 0, // Smusso stroke del bottone,
                            states: {
                                hover: {
                                    stroke: '#666666', // Press stroke del bottone
                                    fill: '#e6e6e6' // Rollover del bottone
                                },
                                select: {
                                    stroke: '#666666', // Press stroke del bottone
                                    fill: '#e6e6e6' // Press Fill del bottone
                                }
                            }
                        }
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical',

                    itemMarginTop: 5,
                    itemMarginBottom: 5,
                    itemStyle: {
                        cursor: 'pointer',
                        color: '#666666',
                        fontSize: '11px',
                        fontWeight: 300
                    },
                    itemWidth: 150,
                    itemHiddenStyle: { //Colore dell'elemento legenda quando è disattivato
                        color: '#eeeeee'
                    },
                    itemHoverStyle: { //Colore dell'elemento legenda in rollover
                        color: '#3ca7da'
                    }
                },
                plotOptions: {
                    pie: {
                        borderWidth: 1,
                        startAngle: -45,
                        dataLabels: {
                            softConnector: false
                        }
                    }
                },
                //END


                title: {
                    enabled: false,
                    text: null,
                    x: -20 //center
                },
                subtitle: {
                    text: null,
                    x: -20
                },
                tooltip: {
                    valueSuffix: 'M',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderWidth: 1,
                    shadow: false
                },
                series: [
                    {
                        name: 'Number of undernourished declining',
                        showInLegend: true,
                        data: [
                            ['Asia', 43],
                            ['Europe', 14],
                            ['Oceania', 4],
                            ['Africa', 14],
                            ['Americas', 25]

                        ]
                    }
                ]
            },
            'chart-3': {

                //Line chart

                chart: {
                    type: 'line', //Tipo di grafico:  area, areaspline, boxplot, bubble, column, line, pie, scatter, spline

                    alignTicks: false,
                    backgroundColor: '#FFFFFF', //Colore di background
                    spacing: [20, 1, 1, 1],//Spacing intorno (molto simile al margin - Di default il bottom è 15, qui l'ho messo a 10 per essere uguale agli altri)
                    //plotBackgroundColor: 'red', //Colore di background solo area chart
                    plotBorderColor: '#ffffff', //Colore bordo intorno solo area chart
                    plotBorderWidth: 0, //Spessore bordo intorno solo area chart
                    //showAxes: false, //Mostra gli assi quando le serie sono aggiunte dinamicamente
                    style: {
                        fontFamily: 'Roboto', // Font di tutto
                        fontSize: '12px', // La dimensione qui vale solo per i titoli
                        fontWeight: 300 // Con Roboto è molto bello giocare con i pesi
                    },
                    zoomType: 'xy', //Attiva lo zoom e stabilisce in quale dimensione
                    //selectionMarkerFill: 'rgba(0,0,0,0.25)',//Colore di fonfo della selezione per lo zoom (trasparente per far vedere sotto)
                    resetZoomButton: {
                        position: {
                            align: 'right', //Allineamento zoom orizzontale
                            //verticalAlign:'middle' //Allineamento zoom verticale
                            x: -10 //Posizione del pulsante rispetto all'allineamento (valori positivi > destra) e al PLOT

                        },
                        theme: {
                            fill: '#FFFFFF', //Colore di background pulsante reset zoom
                            stroke: '#666666', //Colore di stroke pulsante reset zoom
                            width: 60, //Larghezza del pulsante reset
                            //r:0, //Smusso pulsante reset zoom
                            style: {
                                textAlign: 'center', //CSS style aggiunto da me per centrare il testo
                                fontSize: 10
                            },
                            states: {
                                hover: {
                                    fill: '#e6e6e6', //Colore di background hover pulsante reset zoom
                                    stroke: '#666666', //Colore di stroke hover pulsante reset zoom
                                    style: {
                                        //color: 'white' //Colore testo hover pulsante reset zoom
                                    }
                                }
                            }
                        }

                    }
                },
                colors: [ //Colori delle charts
                    '#379bcd',
                    '#76BE94',
                    '#744490',
                    '#E10079',
                    '#2D1706',
                    '#F1E300',
                    '#F7AE3C',
                    '#DF3328'
                ],
                credits: {
                    enabled: false //Attiva o disattiva il link di HighCharts dalla chart
                },
                exporting: {
                    enabled: false
                },
                navigation: { //Modifica lo stile dei bottoni e spesso del solo bottone dell'esportazione (lo sfondo)
                    buttonOptions: {
                        theme: {
                            'stroke-width': 1, // Peso stroke del bottone
                            stroke: '#666666', // Colore stroke del bottone
                            r: 0, // Smusso stroke del bottone,
                            states: {
                                hover: {
                                    stroke: '#666666', // Press stroke del bottone
                                    fill: '#e6e6e6' // Rollover del bottone
                                },
                                select: {
                                    stroke: '#666666', // Press stroke del bottone
                                    fill: '#e6e6e6' // Press Fill del bottone
                                }
                            }
                        }
                    }
                },
                legend: { //Modifica style della legenda
                    enabled: true, //Attiva la legenda
                    floating: false, // IMPORTANTE - Permette alla plot area di stare sotto alla legenda - si guadagna molto spazio


                    backgroundColor: '#FFFFFF', //Colore di sfondo della legenda

                    align: 'center', //Allineamento orizzontale del box della legenda (left, center, right)
                    verticalAlign: 'bottom', //allineamento verticale della legenda (top, middle, bottom)

                    borderWidth: 0, //Spessore bordo della legenda

                    symbolPadding: 10, //Distanza tra simbolo e legenda (default 5)


                    itemStyle: {
                        cursor: 'pointer',
                        color: '#666666',
                        fontSize: '14px',
                        fontWeight: 300
                    },
                    itemHiddenStyle: { //Colore dell'elemento legenda quando è disattivato
                        color: '#eeeeee'
                    },
                    itemHoverStyle: { //Colore dell'elemento legenda in rollover
                        color: '#3ca7da'
                    },
                    navigation: { //Paginazione Legenda - stilizzazione
                        activeColor: '#3ca7da', //Colore freccia attiva legenda
                        inactiveColor: '#666666', //Colore freccia disattiva legenda
                        arrowSize: 8, //Dimensioni freccia
                        animation: true, //Attiva/Disattiva animazione
                        style: { //Stile CSS applicato solo alla navigazione della legenda
                            color: '#666666',
                            fontSize: '10px'
                        }
                    }
                },
                plotOptions: {
                    series: {
                        allowPointSelect: true, //Permette di selezionare i punti della chart
                        pointPlacement: "on", //Per partire dall'origine
                        animation: { // Configura l'animazione di entrata
                            duration: 1000,
                            easing: 'swing'
                        },
                        connectNulls: true,
                        cropThreshold: 3,
                        lineWidth: 1, // IMPORTANTE - Cambia lo spessore delle linee della chart
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        fillColor: {
                            linearGradient: [0, 0, 0, 350],
                            stops: [
                                [0, 'rgba(55, 155, 205,0.5)'],
                                [1, 'rgba(255,255,255,0)']
                            ]
                        },
                        marker: {
                            enabled: false, //Attiva o disattiva i marker
                            //symbol: 'url(http://www.mentaltoy.com/resources/logoChart.png)', //Questo paramentro carica un simbolo personalizzato. Si può anche avere una chart con marker diverse sulle linee
                            symbol: 'circle', // Tipologia di marker
                            radius: 4,
                            lineWidth: 1,
                            lineColor: '#379bcd',
                            fillColor: '#FFFFFF',
                            states: {
                                hover: {
                                    enabled: true, // Attiva o disattiva il marker quando si passa sopra la chart
                                    symbol: 'circle',
                                    fillColor: '#FFFFFF',
                                    lineColor: '#3ca7da',
                                    radius: 5,
                                    lineWidth: 2
                                }
                            }
                        }

                    }
                },
                //END


                title: {
                    enabled: false,
                    text: null,
                    x: -20 //center
                },
                subtitle: {
                    text: null,
                    x: -20
                },
                xAxis: {
                    categories: ['1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040', '2041'],
                    gridLineWidth: 1, // IMPORTANTE - Attiva le linee verticali
                    lineColor: '#e0e0e0',
                    tickColor: '#e0e0e0',
                    gridLineColor: '#eeeeee',
                    minTickInterval: 10,
                    tickmarkPlacement: 'on',
                    labels: {
                        y: 25,
                        style: {
                            color: '#666666',
                            fontWeight: '300',
                            fontSize: 12
                        },
                        step: 10
                    }
                    /*plotLines: [{ //linea custom possono essere anche più di una, è un array
                     color: '#666666',
                     width: 1,
                     value: 11.5,
                     dashStyle: 'dash',
                     zIndex: 3
                     }, { //linea custom possono essere anche più di una, è un array
                     color: '#FFFFFF',
                     width: 1,
                     value: 11.5,
                     zIndex: 2
                     }]*/
                },
                yAxis: {
                    gridLineWidth: 1, // IMPORTANTE - Attiva le linee verticali
                    lineWidth: 1,
                    //tickWidth: 1,
                    lineColor: '#e0e0e0',
                    gridLineColor: '#eeeeee',
                    labels: {
                        style: {
                            color: '#666666',
                            fontWeight: '300',
                            fontSize: 12
                        },
                        formatter: function () {
                            return this.value / 1000000 + ' B';
                        }
                    },
                    title: {
                        enabled: false,
                        text: 'null'
                    },
                    plotLines: [
                        {
                            value: 0,
                            width: 1
                        }
                    ]
                },
                tooltip: {
                    valueSuffix: ' B',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderWidth: 1,
                    shadow: false
                },
                series: [
                    {
                        name: 'Rural Population',
                        data: [2032117, 2056987, 2082481, 2109462, 2143789, 2180156, 2218232, 2257601, 2297684, 2337903, 2378672, 2418779, 2457562, 2494631, 2532819, 2569173, 2604763, 2636680, 2665788, 2695109, 2724460, 2755416, 2788505, 2822272, 2856962, 2892361, 2928812, 2964145, 2999543, 3033038, 3063709, 3092959, 3120234, 3145797, 3169730, 3191525, 3211512, 3230308, 3247571, 3263424, 3275614, 3284540, 3292974, 3300961, 3308517, 3315917, 3323190, 3329532, 3335553, 3341208, 3346595, 3352038, 3357429, 3362513, 3367068, 3371092, 3374555, 3377440, 3379737, 3381455, 3382538, 3382991, 3382805, 3381986, 3380551, 3378501, 3375835, 3372548, 3368635, 3364121, 3358995, 3353230, 3346917, 3340045, 3332572, 3324216, 3314996, 3304896, 3293917, 3282074, 3269382]
                    },
                    {
                        name: 'Urban Population',
                        data: [1050714, 1084083, 1118703, 1154274, 1185333, 1217319, 1250283, 1284071, 1318425, 1353269, 1388088, 1424099, 1461630, 1500668, 1538207, 1576970, 1616056, 1658997, 1705736, 1753940, 1803781, 1853542, 1903064, 1954118, 2006647, 2061020, 2116504, 2174065, 2230918, 2287778, 2345207, 2401938, 2458635, 2515302, 2572099, 2629492, 2687176, 2745013, 2803909, 2864280, 2928531, 2996312, 3065022, 3134739, 3205581, 3277312, 3349914, 3424110, 3499170, 3574974, 3651401, 3728022, 3804673, 3881272, 3957705, 4033887, 4109774, 4185318, 4260504, 4335295, 4409674, 4483594, 4557080, 4630160, 4702870, 4775178, 4847096, 4918646, 4989882, 5060824, 5131479, 5201831, 5271863, 5341532, 5410873, 5480185, 5549446, 5618616, 5687687, 5756609, 5825359],
                        marker: {
                            enabled: false, //Attiva o disattiva i marker
                            //symbol: 'url(http://www.mentaltoy.com/resources/logoChart.png)', //Questo paramentro carica un simbolo personalizzato. Si può anche avere una chart con marker diverse sulle linee
                            symbol: 'circle', // Tipologia di marker
                            radius: 4,
                            lineWidth: 1,
                            lineColor: '#379bcd',
                            fillColor: '#FFFFFF',
                            states: {
                                hover: {
                                    enabled: true, // Attiva o disattiva il marker quando si passa sopra la chart
                                    symbol: 'circle',
                                    fillColor: '#FFFFFF',
                                    lineColor: '#76BE94',
                                    radius: 5,
                                    lineWidth: 2
                                }
                            }

                        }
                    }
                ]
            },
            'chart-4': {

                //Line chart

                chart: {
                    type: 'column', //Tipo di grafico:  area, areaspline, boxplot, bubble, column, line, pie, scatter, spline
                    alignTicks: false,
                    backgroundColor: '#FFFFFF', //Colore di background
                    spacing: [20, 1, 1, 1],//Spacing intorno (molto simile al margin - Di default il bottom è 15, qui l'ho messo a 10 per essere uguale agli altri)
                    //plotBackgroundColor: 'red', //Colore di background solo area chart
                    plotBorderColor: '#ffffff', //Colore bordo intorno solo area chart
                    plotBorderWidth: 0, //Spessore bordo intorno solo area chart
                    //showAxes: false, //Mostra gli assi quando le serie sono aggiunte dinamicamente
                    style: {
                        fontFamily: 'Roboto', // Font di tutto
                        fontSize: '12px', // La dimensione qui vale solo per i titoli
                        fontWeight: 300 // Con Roboto è molto bello giocare con i pesi
                    },
                    zoomType: 'xy', //Attiva lo zoom e stabilisce in quale dimensione
                    //selectionMarkerFill: 'rgba(0,0,0,0.25)',//Colore di fonfo della selezione per lo zoom (trasparente per far vedere sotto)
                    resetZoomButton: {
                        position: {
                            align: 'right', //Allineamento zoom orizzontale
                            //verticalAlign:'middle' //Allineamento zoom verticale
                            x: -10 //Posizione del pulsante rispetto all'allineamento (valori positivi > destra) e al PLOT

                        },
                        theme: {
                            fill: '#FFFFFF', //Colore di background pulsante reset zoom
                            stroke: '#666666', //Colore di stroke pulsante reset zoom
                            width: 60, //Larghezza del pulsante reset
                            //r:0, //Smusso pulsante reset zoom
                            style: {
                                textAlign: 'center', //CSS style aggiunto da me per centrare il testo
                                fontSize: 10
                            },
                            states: {
                                hover: {
                                    fill: '#e6e6e6', //Colore di background hover pulsante reset zoom
                                    stroke: '#666666', //Colore di stroke hover pulsante reset zoom
                                    style: {
                                        //color: 'white' //Colore testo hover pulsante reset zoom
                                    }
                                }
                            }
                        }

                    }
                },
                colors: [ //Colori delle charts
                    '#F1E300',
                    '#DF3328',
                    '#E10079',
                    '#F7AE3C',
                    '#76BE94'
                ],
                credits: {
                    enabled: false //Attiva o disattiva il link di HighCharts dalla chart
                },
                exporting: {
                    enabled: false
                },
                navigation: { //Modifica lo stile dei bottoni e spesso del solo bottone dell'esportazione (lo sfondo)
                    buttonOptions: {
                        theme: {
                            'stroke-width': 1, // Peso stroke del bottone
                            stroke: '#666666', // Colore stroke del bottone
                            r: 0, // Smusso stroke del bottone,
                            states: {
                                hover: {
                                    stroke: '#666666', // Press stroke del bottone
                                    fill: '#e6e6e6' // Rollover del bottone
                                },
                                select: {
                                    stroke: '#666666', // Press stroke del bottone
                                    fill: '#e6e6e6' // Press Fill del bottone
                                }
                            }
                        }
                    }
                },
                legend: { //Modifica style della legenda
                    enabled: true, //Attiva la legenda
                    floating: false, // IMPORTANTE - Permette alla plot area di stare sotto alla legenda - si guadagna molto spazio


                    backgroundColor: '#FFFFFF', //Colore di sfondo della legenda

                    align: 'center', //Allineamento orizzontale del box della legenda (left, center, right)
                    verticalAlign: 'bottom', //allineamento verticale della legenda (top, middle, bottom)

                    borderWidth: 0, //Spessore bordo della legenda

                    symbolPadding: 10, //Distanza tra simbolo e legenda (default 5)


                    itemStyle: {
                        cursor: 'pointer',
                        color: '#666666',
                        fontSize: '11px',
                        fontWeight: 300
                    },
                    itemHiddenStyle: { //Colore dell'elemento legenda quando è disattivato
                        color: '#eeeeee'
                    },
                    itemHoverStyle: { //Colore dell'elemento legenda in rollover
                        color: '#3ca7da'
                    },
                    navigation: { //Paginazione Legenda - stilizzazione
                        activeColor: '#3ca7da', //Colore freccia attiva legenda
                        inactiveColor: '#666666', //Colore freccia disattiva legenda
                        arrowSize: 8, //Dimensioni freccia
                        animation: true, //Attiva/Disattiva animazione
                        style: { //Stile CSS applicato solo alla navigazione della legenda
                            color: '#666666',
                            fontSize: '10px'
                        }
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'},
                    series: {
                        allowPointSelect: true, //Permette di selezionare i punti della chart
                        //pointPlacement: "on", //Per partire dall'origine
                        animation: { // Configura l'animazione di entrata
                            duration: 1000,
                            easing: 'swing'
                        },
                        connectNulls: false,
                        cropThreshold: 3,
                        lineWidth: 1, // IMPORTANTE - Cambia lo spessore delle linee della chart
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        fillColor: {
                            linearGradient: [0, 0, 0, 350],
                            stops: [
                                [0, 'rgba(55, 155, 205,0.5)'],
                                [1, 'rgba(255,255,255,0)']
                            ]
                        },
                        marker: {
                            enabled: false, //Attiva o disattiva i marker
                            //symbol: 'url(http://www.mentaltoy.com/resources/logoChart.png)', //Questo paramentro carica un simbolo personalizzato. Si può anche avere una chart con marker diverse sulle linee
                            symbol: 'circle', // Tipologia di marker
                            radius: 4,
                            lineWidth: 1,
                            lineColor: '#379bcd',
                            fillColor: '#FFFFFF',
                            states: {
                                hover: {
                                    enabled: true, // Attiva o disattiva il marker quando si passa sopra la chart
                                    symbol: 'circle',
                                    fillColor: '#FFFFFF',
                                    lineColor: '#3ca7da',
                                    radius: 5,
                                    lineWidth: 2
                                }
                            }
                        }

                    }
                },
                //END


                title: {
                    enabled: false,
                    text: null,
                    x: -20 //center
                },
                subtitle: {
                    text: null,
                    x: -20
                },
                xAxis: {
                    categories: ['1990s', '2000s'],
                    gridLineWidth: 1, // IMPORTANTE - Attiva le linee verticali
                    lineColor: '#e0e0e0',
                    tickColor: '#e0e0e0',
                    gridLineColor: '#eeeeee',
                    minTickInterval: 5,
                    tickmarkPlacement: 'on',
                    labels: {
                        y: 25,
                        style: {
                            color: '#666666',
                            fontWeight: '300',
                            fontSize: 12
                        }
                    }
                    /*plotLines: [{ //linea custom possono essere anche più di una, è un array
                     color: '#666666',
                     width: 1,
                     value: 11.5,
                     dashStyle: 'dash',
                     zIndex: 3
                     }, { //linea custom possono essere anche più di una, è un array
                     color: '#FFFFFF',
                     width: 1,
                     value: 11.5,
                     zIndex: 2
                     }]*/
                },
                yAxis: {
                    gridLineWidth: 1, // IMPORTANTE - Attiva le linee verticali
                    lineWidth: 1,
                    //tickWidth: 1,
                    lineColor: '#e0e0e0',
                    gridLineColor: '#eeeeee',
                    labels: {
                        style: {
                            color: '#666666',
                            fontWeight: '300',
                            fontSize: 11
                        }
                    },
                    title: {
                        enabled: false,
                        text: 'null'
                    },
                    plotLines: [
                        {
                            value: 0,
                            width: 1
                        }
                    ]
                },
                tooltip: {
                    valueSuffix: ' B',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderWidth: 1,
                    shadow: false
                },
                series: [
                    {
                        name: 'Agriculture',
                        data: [4613.44434369, 4983.83650388]
                    },
                    {
                        name: 'Cultivation of Organic Soils and Peat Fires',
                        data: [914.594537429834, 914.594537429834]
                    },
                    {
                        name: 'Biomass Fires',
                        data: [316.299397989412, 283.031380957249]
                    },
                    {
                        name: 'Net Forest Conversion',
                        data: [4568.07452098443, 3789.39134251719]
                    },
                    {
                        name: 'Forest',
                        data: [-2915.4070717, -1867.96246778]
                    }
                ]
            },
            'chart-5': {

                //Line chart

                chart: {
                    type: 'area', //Tipo di grafico:  area, areaspline, boxplot, bubble, column, line, pie, scatter, spline

                    alignTicks: false,
                    backgroundColor: '#FFFFFF', //Colore di background
                    spacing: [20, 1, 1, 1],//Spacing intorno (molto simile al margin - Di default il bottom è 15, qui l'ho messo a 10 per essere uguale agli altri)
                    //plotBackgroundColor: 'red', //Colore di background solo area chart
                    plotBorderColor: '#ffffff', //Colore bordo intorno solo area chart
                    plotBorderWidth: 0, //Spessore bordo intorno solo area chart
                    //showAxes: false, //Mostra gli assi quando le serie sono aggiunte dinamicamente
                    style: {
                        fontFamily: 'Roboto', // Font di tutto
                        fontSize: '12px', // La dimensione qui vale solo per i titoli
                        fontWeight: 300 // Con Roboto è molto bello giocare con i pesi
                    },
                    zoomType: 'xy', //Attiva lo zoom e stabilisce in quale dimensione
                    //selectionMarkerFill: 'rgba(0,0,0,0.25)',//Colore di fonfo della selezione per lo zoom (trasparente per far vedere sotto)
                    resetZoomButton: {
                        position: {
                            align: 'right', //Allineamento zoom orizzontale
                            //verticalAlign:'middle' //Allineamento zoom verticale
                            x: -10 //Posizione del pulsante rispetto all'allineamento (valori positivi > destra) e al PLOT

                        },
                        theme: {
                            fill: '#FFFFFF', //Colore di background pulsante reset zoom
                            stroke: '#666666', //Colore di stroke pulsante reset zoom
                            width: 60, //Larghezza del pulsante reset
                            //r:0, //Smusso pulsante reset zoom
                            style: {
                                textAlign: 'center', //CSS style aggiunto da me per centrare il testo
                                fontSize: 10
                            },
                            states: {
                                hover: {
                                    fill: '#e6e6e6', //Colore di background hover pulsante reset zoom
                                    stroke: '#666666', //Colore di stroke hover pulsante reset zoom
                                    style: {
                                        //color: 'white' //Colore testo hover pulsante reset zoom
                                    }
                                }
                            }
                        }

                    }
                },
                colors: [ //Colori delle charts
                    '#379bcd',
                    '#76BE94',
                    '#744490',
                    '#E10079',
                    '#2D1706',
                    '#F1E300',
                    '#F7AE3C',
                    '#DF3328'
                ],
                credits: {
                    enabled: false //Attiva o disattiva il link di HighCharts dalla chart
                },
                exporting: {
                    enabled: false
                },
                navigation: { //Modifica lo stile dei bottoni e spesso del solo bottone dell'esportazione (lo sfondo)
                    buttonOptions: {
                        theme: {
                            'stroke-width': 1, // Peso stroke del bottone
                            stroke: '#666666', // Colore stroke del bottone
                            r: 0, // Smusso stroke del bottone,
                            states: {
                                hover: {
                                    stroke: '#666666', // Press stroke del bottone
                                    fill: '#e6e6e6' // Rollover del bottone
                                },
                                select: {
                                    stroke: '#666666', // Press stroke del bottone
                                    fill: '#e6e6e6' // Press Fill del bottone
                                }
                            }
                        }
                    }
                },
                legend: { //Modifica style della legenda
                    enabled: true, //Attiva la legenda
                    floating: false, // IMPORTANTE - Permette alla plot area di stare sotto alla legenda - si guadagna molto spazio


                    backgroundColor: '#FFFFFF', //Colore di sfondo della legenda

                    align: 'center', //Allineamento orizzontale del box della legenda (left, center, right)
                    verticalAlign: 'bottom', //allineamento verticale della legenda (top, middle, bottom)

                    borderWidth: 0, //Spessore bordo della legenda

                    symbolPadding: 10, //Distanza tra simbolo e legenda (default 5)


                    itemStyle: {
                        cursor: 'pointer',
                        color: '#666666',
                        fontSize: '11px',
                        fontWeight: 300
                    },
                    itemHiddenStyle: { //Colore dell'elemento legenda quando è disattivato
                        color: '#eeeeee'
                    },
                    itemHoverStyle: { //Colore dell'elemento legenda in rollover
                        color: '#3ca7da'
                    },
                    navigation: { //Paginazione Legenda - stilizzazione
                        activeColor: '#3ca7da', //Colore freccia attiva legenda
                        inactiveColor: '#666666', //Colore freccia disattiva legenda
                        arrowSize: 8, //Dimensioni freccia
                        animation: true, //Attiva/Disattiva animazione
                        style: { //Stile CSS applicato solo alla navigazione della legenda
                            color: '#666666',
                            fontSize: '10px'
                        }
                    }
                },
                plotOptions: {
                    series: {
                        allowPointSelect: true, //Permette di selezionare i punti della chart
                        pointPlacement: "on", //Per partire dall'origine
                        animation: { // Configura l'animazione di entrata
                            duration: 1000,
                            easing: 'swing'
                        },
                        connectNulls: true,
                        cropThreshold: 3,
                        lineWidth: 1, // IMPORTANTE - Cambia lo spessore delle linee della chart
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        fillColor: {
                            linearGradient: [0, 0, 0, 350],
                            stops: [
                                [0, 'rgba(55, 155, 205,0.5)'],
                                [1, 'rgba(255,255,255,0)']
                            ]
                        },
                        marker: {
                            enabled: false, //Attiva o disattiva i marker
                            //symbol: 'url(http://www.mentaltoy.com/resources/logoChart.png)', //Questo paramentro carica un simbolo personalizzato. Si può anche avere una chart con marker diverse sulle linee
                            symbol: 'circle', // Tipologia di marker
                            radius: 4,
                            lineWidth: 1,
                            lineColor: '#379bcd',
                            fillColor: '#FFFFFF',
                            states: {
                                hover: {
                                    enabled: true, // Attiva o disattiva il marker quando si passa sopra la chart
                                    symbol: 'circle',
                                    fillColor: '#FFFFFF',
                                    lineColor: '#3ca7da',
                                    radius: 5,
                                    lineWidth: 2
                                }
                            }
                        }

                    }
                },
                //END


                title: {
                    enabled: false,
                    text: null,
                    x: -20 //center
                },
                subtitle: {
                    text: null,
                    x: -20
                },
                xAxis: {
                    categories: ['1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'],
                    gridLineWidth: 1, // IMPORTANTE - Attiva le linee verticali
                    lineColor: '#e0e0e0',
                    tickColor: '#e0e0e0',
                    gridLineColor: '#eeeeee',
                    minTickInterval: 10,
                    tickmarkPlacement: 'on',
                    labels: {
                        y: 25,
                        style: {
                            color: '#666666',
                            fontWeight: '300',
                            fontSize: 12
                        }
                    }
                    /*plotLines: [{ //linea custom possono essere anche più di una, è un array
                     color: '#666666',
                     width: 1,
                     value: 11.5,
                     dashStyle: 'dash',
                     zIndex: 3
                     }, { //linea custom possono essere anche più di una, è un array
                     color: '#FFFFFF',
                     width: 1,
                     value: 11.5,
                     zIndex: 2
                     }]*/
                },
                yAxis: {
                    gridLineWidth: 1, // IMPORTANTE - Attiva le linee verticali
                    lineWidth: 1,
                    //tickWidth: 1,
                    lineColor: '#e0e0e0',
                    gridLineColor: '#eeeeee',
                    labels: {
                        style: {
                            color: '#666666',
                            fontWeight: '300',
                            fontSize: 12
                        },
                        formatter: function () {
                            return this.value / 1000000000 + ' B';
                        }
                    },
                    title: {
                        enabled: false,
                        text: 'null'
                    },
                    plotLines: [
                        {
                            value: 0,
                            width: 1
                        }
                    ]
                },
                tooltip: {
                    valueSuffix: ' B',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderWidth: 1,
                    shadow: false
                },
                series: [
                    {
                        name: 'Asia',
                        data: [325722780, 343443583, 366573358, 386867823, 382213774, 399995097, 423153982, 435156803, 444996071, 477083953, 487031647, 474858060, 508257068, 511410397, 555697337, 560956934, 569189101, 614411982, 618942059, 629460417, 654774680, 673260250, 741874500, 765969525, 750443777, 770213202, 759830107, 798435431, 827475171, 870189416, 866354791, 927918356, 937993717, 920711372, 941647923, 994054048, 990474355, 1014623391, 1033479484, 994071379, 1000753199, 982753719, 998270233, 1036336991, 1085053240, 1116306012, 1153465662, 1179974735, 1202829956, 1230421429, 1291742689, 1297650399]
                    },
                    {
                        name: 'World',
                        data: [873057116, 929382247, 945416012, 997351526, 994783290, 1074427349, 1119658371, 1156256767, 1166708949, 1188615945, 1296321541, 1254832189, 1353296484, 1322785717, 1355776620, 1460158416, 1452337154, 1578781983, 1534423182, 1547388039, 1629726997, 1689877849, 1624258111, 1783727797, 1818230769, 1831021917, 1768793573, 1725066722, 1868697354, 1949761802, 1887332936, 1971213785, 1904354764, 1953819687, 1895057231, 2069661450, 2093234263, 2082270229, 2082983035, 2058174536, 2108112804, 2030503296, 2089948439, 2277999630, 2265981957, 2233796905, 2353560330, 2524996473, 2498439035, 2476480583, 2591642990, 2545002598],
                        fillColor: {
                            linearGradient: [0, 0, 0, 350],
                            stops: [
                                [0, 'rgba(118, 190, 148,0.5)'],
                                [1, 'rgba(255,255,255,0)']
                            ]
                        }
                    }
                ]
            }
        };

        var charts = Object.keys(conf);

        for (var i = 0; i < charts.length; i++) {
            $('#' + charts[i]).highcharts(conf[charts[i]]);
        }

    };

    Host.prototype.initGrid = function () {

        var theme = 'fenix';

        //DEFAULT
        var url = "sampledata/view/products.xml";
        // prepare the data
        var source = {
            datatype: "xml",
            datafields: [
                { name: 'ProductName', type: 'string' },
                { name: 'QuantityPerUnit', type: 'int' },
                { name: 'UnitPrice', type: 'float' },
                { name: 'UnitsInStock', type: 'float' },
                { name: 'Discontinued', type: 'bool' }
            ],
            root: "Products",
            record: "Product",
            id: 'ProductID',
            url: url
        };
        var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
            if (value < 20) {
                return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
            }
            else {
                return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
            }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, {
            downloadComplete: function (data, status, xhr) {
            },
            loadComplete: function (data) {
            },
            loadError: function (xhr, status, error) {
            }
        });
        // initialize jqxGrid
        $("#jqxgrid-1").jqxGrid({
            width: "100%",
            source: dataAdapter,
            pageable: true,
            autoheight: true,
            sortable: true,
            altrows: true,
            enabletooltips: true,
            editable: true,
            theme: theme,
            selectionmode: 'multiplecellsadvanced',
            columns: [
                { text: 'Product Name', columngroup: 'ProductDetails', datafield: 'ProductName' },
                { text: 'Quantity per Unit', columngroup: 'ProductDetails', datafield: 'QuantityPerUnit', cellsalign: 'right', align: 'right' },
                { text: 'Unit Price', columngroup: 'ProductDetails', datafield: 'UnitPrice', align: 'right', cellsalign: 'right', cellsformat: 'c2' },
                { text: 'Units In Stock', datafield: 'UnitsInStock', cellsalign: 'right', cellsrenderer: cellsrenderer },
                { text: 'Discontinued', columntype: 'checkbox', datafield: 'Discontinued' }
            ],
            columngroups: [
                { text: 'Product Details', align: 'center', name: 'ProductDetails' }
            ]
        });


        //SPREADSHEET
        // renderer for grid cells.
        var numberrenderer = function (row, column, value) {
            return '<div style="text-align: center; margin-top: 5px;">' + (1 + value) + '</div>';
        }
        // create Grid datafields and columns arrays.
        var datafields = [];
        var columns = [];
        for (var i = 0; i < 26; i++) {
            var text = String.fromCharCode(65 + i);
            if (i == 0) {
                var cssclass = 'jqx-widget-header';
                if (theme != '') cssclass += ' jqx-widget-header-' + theme;
                columns[columns.length] = {pinned: true, exportable: false, text: "", columntype: 'number', cellclassname: cssclass, cellsrenderer: numberrenderer };
            }
            datafields[datafields.length] = { name: text };
            columns[columns.length] = { text: text, datafield: text, width: 60, align: 'center' };
        }
        var source = {
            unboundmode: true,
            totalrecords: 100,
            datafields: datafields,
            updaterow: function (rowid, rowdata) {
                // synchronize with the server - send update command
            }
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        // initialize jqxGrid
        $("#jqxgrid-2").jqxGrid(
            {
                width: '100%',
                source: dataAdapter,
                editable: true,
                columnsresize: true,
                theme: theme,
                selectionmode: 'multiplecellsadvanced',
                columns: columns
            });
        $("#excelExport-2").click(function () {
            $("#jqxgrid-2").jqxGrid('exportdata', 'xls', 'jqxGrid', false);
        });

        //EXPORT
        // prepare the data
        var data = new Array();
        var firstNames =
            [
                "Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars", "Petra", "Martin", "Sven", "Elio", "Beate", "Cheryl", "Michael", "Guylene"
            ];
        var lastNames =
            [
                "Fuller", "Davolio", "Burke", "Murphy", "Nagase", "Saavedra", "Ohno", "Devling", "Wilson", "Peterson", "Winkler", "Bein", "Petersen", "Rossi", "Vileid", "Saylor", "Bjorn", "Nodier"
            ];
        var productNames =
            [
                "Black Tea", "Green Tea", "Caffe Espresso", "Doubleshot Espresso", "Caffe Latte", "White Chocolate Mocha", "Cramel Latte", "Caffe Americano", "Cappuccino", "Espresso Truffle", "Espresso con Panna", "Peppermint Mocha Twist"
            ];
        var priceValues =
            [
                "2.25", "1.5", "3.0", "3.3", "4.5", "3.6", "3.8", "2.5", "5.0", "1.75", "3.25", "4.0"
            ];
        for (var i = 0; i < 200; i++) {
            var row = {};
            var productindex = Math.floor(Math.random() * productNames.length);
            var price = parseFloat(priceValues[productindex]);
            var quantity = 1 + Math.round(Math.random() * 10);
            row["firstname"] = firstNames[Math.floor(Math.random() * firstNames.length)];
            row["lastname"] = lastNames[Math.floor(Math.random() * lastNames.length)];
            row["productname"] = productNames[productindex];
            row["price"] = price;
            row["quantity"] = quantity;
            row["total"] = price * quantity;
            data[i] = row;
        }
        var source =
        {
            localdata: data,
            datatype: "array",
            datafields: [
                { name: 'firstname', type: 'string' },
                { name: 'lastname', type: 'string' },
                { name: 'productname', type: 'string' },
                { name: 'quantity', type: 'number' },
                { name: 'price', type: 'number' },
                { name: 'total', type: 'number' }
            ]
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#jqxgrid-3").jqxGrid(
            {
                width: '100%',
                theme: theme,
                source: dataAdapter,
                columnsresize: true,
                columns: [
                    { text: 'Name', dataField: 'firstname' },
                    { text: 'Last Name', dataField: 'lastname' },
                    { text: 'Product', editable: false, dataField: 'productname' },
                    { text: 'Quantity', dataField: 'quantity', width: 80, cellsalign: 'right' },
                    { text: 'Unit Price', dataField: 'price', width: 90, cellsalign: 'right', cellsformat: 'c2' },
                    { text: 'Total', dataField: 'total', cellsalign: 'right', cellsformat: 'c2' }
                ]
            });
        $("#excelExport").click(function () {
            $("#jqxgrid-3").jqxGrid('exportdata', 'xls', 'jqxGrid');
        });
        $("#xmlExport").click(function () {
            $("#jqxgrid-3").jqxGrid('exportdata', 'xml', 'jqxGrid');
        });
        $("#csvExport").click(function () {
            $("#jqxgrid-3").jqxGrid('exportdata', 'csv', 'jqxGrid');
        });
        $("#tsvExport").click(function () {
            $("#jqxgrid-3").jqxGrid('exportdata', 'tsv', 'jqxGrid');
        });
        $("#htmlExport").click(function () {
            $("#jqxgrid-3").jqxGrid('exportdata', 'html', 'jqxGrid');
        });
        $("#jsonExport").click(function () {
            $("#jqxgrid-3").jqxGrid('exportdata', 'json', 'jqxGrid');
        });

    };

    Host.prototype.initStocks = function () {

        $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {

            // Create the chart
            $('#stock-1').highcharts('StockChart', {


                rangeSelector: {
                    inputEnabled: $('#stock-1').width() > 480,
                    selected: 1
                },

                title: {
                    text: 'Stock Price'
                },

                series: [
                    {
                        name: 'Stock Price',
                        data: data,
                        type: 'areaspline',
                        threshold: null,
                        tooltip: {
                            valueDecimals: 2
                        },
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        }
                    }
                ]
            });
        });

    };

    Host.prototype.initPivot = function () {

         
          mesOptions = {
             
    E:{
        derivedAttributes: {
                    "Area": function(mp)
                    {
                        if (false)
                        {
                            return "<span class=\"ordre\">" + mp["Var1Order"] + "</span><table class=\"innerCol\"><th>" + mp["Country_"] + "</th><th>" + mp["Country Code"] + "</th></table>";
                        }
                        else {
                            return  mp["Country_"];
                        }
                    },
                    "Element": function(mp)
                    {
                        if (false)
                        {
                            return "<span class=\"ordre\">" + mp["Var2Order"] + "</span><table class=\"innerCol\"><th>" + mp["Element_"] + "</th><th>" + mp["Element Code"] + "</th></table>";
                        }
                        else {
                            return mp["Element_"];
                        }
                    },
                    "Item": function(mp)
                    {
                        if (false)
                        {
                            return "<span class=\"ordre\">" + mp["Var3Order"] + "</span><table class=\"innerCol\"><th>" + mp["Item_"] + "</th><th>" + mp["Item Code"] + "</th></table>";
                        }
                        else {
                            return  mp["Item_"];
                        }
                    }
                },
                rows: ["Area", "Element", "Item"],
                cols: ["Year"],
                vals: ["Value", "Unit", "Flag"]
                }
        };
            
           
            test=[
                ["Country Code", "Country_", "Element Code", "Element_", "Item Code", "Item_", "Year", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order", "Var4Order"],
                ["1","Armenia","5510","Production","51","Beer of barley","2003","tonnes","7311.0","","","010","1","010",""],
                ["1","Armenia","5510","Production","51","Beer of barley","2004","tonnes","8834.0","","","010","1","010",""],
                ["1","Armenia","5510","Production","51","Beer of barley","2005","tonnes","10751.0","","","010","1","010",""],
                ["1","Armenia","5510","Production","51","Beer of barley","2006","tonnes","12618.0","","","010","1","010",""],
                ["1","Armenia","5510","Production","51","Beer of barley","2007","tonnes","11631.0","","","010","1","010",""],
                ["1","Armenia","5510","Production","51","Beer of barley","2008","tonnes","10527.0","","","010","1","010",""],
                ["1","Armenia","5510","Production","51","Beer of barley","2009","tonnes","10834.4","","","010","1","010",""],
                ["1","Armenia","5510","Production","51","Beer of barley","2010","tonnes","15352.7","","","010","1","010",""],
                ["1","Armenia","5510","Production","51","Beer of barley","2011","tonnes","14744.3","","","010","1","010",""],
                ["1","Armenia","5510","Production","1242","Margarine, short","2010","tonnes","237.0","","","010","1","162",""],
                ["1","Armenia","5510","Production","1242","Margarine, short","2011","tonnes","86.0","","","010","1","162",""],["3","Albania","5510","Production","51","Beer of barley","2003","tonnes","14400.0","","","002","1","010",""],["3","Albania","5510","Production","51","Beer of barley","2004","tonnes","29830.0","","","002","1","010",""],["3","Albania","5510","Production","51","Beer of barley","2005","tonnes","28630.0","","","002","1","010",""],["3","Albania","5510","Production","51","Beer of barley","2006","tonnes","34800.0","","","002","1","010",""],["3","Albania","5510","Production","51","Beer of barley","2007","tonnes","36500.0","","","002","1","010",""],["3","Albania","5510","Production","51","Beer of barley","2008","tonnes","33000.0","","","002","1","010",""],["3","Albania","5510","Production","51","Beer of barley","2009","tonnes","24900.0","","","002","1","010",""],["3","Albania","5510","Production","51","Beer of barley","2010","tonnes","45000.0","*","*","002","1","010",""],["3","Albania","5510","Production","51","Beer of barley","2011","tonnes","57500.0","*","*","002","1","010",""],["3","Albania","5510","Production","165","Molasses","2003","tonnes","1520.0","Fc","Fc","002","1","164",""],["3","Albania","5510","Production","165","Molasses","2004","tonnes","1520.0","Fc","Fc","002","1","164",""],["3","Albania","5510","Production","165","Molasses","2005","tonnes","1520.0","Fc","Fc","002","1","164",""],["3","Albania","5510","Production","165","Molasses","2006","tonnes","2000.0","Fc","Fc","002","1","164",""],["3","Albania","5510","Production","165","Molasses","2007","tonnes","1560.0","Fc","Fc","002","1","164",""],["3","Albania","5510","Production","165","Molasses","2008","tonnes","1560.0","Fc","Fc","002","1","164",""],["3","Albania","5510","Production","165","Molasses","2009","tonnes","1560.0","Fc","Fc","002","1","164",""],["3","Albania","5510","Production","165","Molasses","2010","tonnes","1560.0","Fc","Fc","002","1","164",""],["3","Albania","5510","Production","165","Molasses","2011","tonnes","1560.0","Fc","Fc","002","1","164",""],["3","Albania","5510","Production","329","Cottonseed","2003","tonnes","620.0","F","F","002","1","076",""],["3","Albania","5510","Production","329","Cottonseed","2004","tonnes","590.0","F","F","002","1","076",""],["3","Albania","5510","Production","329","Cottonseed","2005","tonnes","590.0","F","F","002","1","076",""],["3","Albania","5510","Production","329","Cottonseed","2006","tonnes","616.0","Im","Im","002","1","076",""],["3","Albania","5510","Production","329","Cottonseed","2007","tonnes","600.0","F","F","002","1","076",""],["3","Albania","5510","Production","329","Cottonseed","2008","tonnes","466.0","F","F","002","1","076",""],["3","Albania","5510","Production","329","Cottonseed","2009","tonnes","640.0","F","F","002","1","076",""],["3","Albania","5510","Production","329","Cottonseed","2010","tonnes","570.0","F","F","002","1","076",""],["3","Albania","5510","Production","329","Cottonseed","2011","tonnes","546.0","F","F","002","1","076",""],["3","Albania","5510","Production","331","Oil, cottonseed","2003","tonnes","77.32","Fc","Fc","002","1","173",""],["3","Albania","5510","Production","331","Oil, cottonseed","2004","tonnes","71.76","Fc","Fc","002","1","173",""],["3","Albania","5510","Production","331","Oil, cottonseed","2005","tonnes","71.76","Fc","Fc","002","1","173",""],["3","Albania","5510","Production","331","Oil, cottonseed","2006","tonnes","79.45","Fc","Fc","002","1","173",""],["3","Albania","5510","Production","331","Oil, cottonseed","2007","tonnes","82.11","Fc","Fc","002","1","173",""],["3","Albania","5510","Production","331","Oil, cottonseed","2008","tonnes","59.56","Fc","Fc","002","1","173",""],["3","Albania","5510","Production","331","Oil, cottonseed","2009","tonnes","88.84","Fc","Fc","002","1","173",""],["3","Albania","5510","Production","331","Oil, cottonseed","2010","tonnes","77.06","Fc","Fc","002","1","173",""],["3","Albania","5510","Production","331","Oil, cottonseed","2011","tonnes","73.02","Fc","Fc","002","1","173",""],["3","Albania","5510","Production","767","Cotton lint","2003","tonnes","300.0","F","F","002","1","072",""],["3","Albania","5510","Production","767","Cotton lint","2004","tonnes","315.0","Im","Im","002","1","072",""],["3","Albania","5510","Production","767","Cotton lint","2005","tonnes","329.0","Im","Im","002","1","072",""],["3","Albania","5510","Production","767","Cotton lint","2006","tonnes","310.0","Im","Im","002","1","072",""],["3","Albania","5510","Production","767","Cotton lint","2007","tonnes","250.0","F","F","002","1","072",""],["3","Albania","5510","Production","767","Cotton lint","2008","tonnes","190.0","F","F","002","1","072",""],["3","Albania","5510","Production","767","Cotton lint","2009","tonnes","220.0","F","F","002","1","072",""],["3","Albania","5510","Production","767","Cotton lint","2010","tonnes","230.0","Im","Im","002","1","072",""],["3","Albania","5510","Production","767","Cotton lint","2011","tonnes","230.0","F","F","002","1","072",""],["3","Albania","5510","Production","1242","Margarine, short","2003","tonnes","0.0","F","F","002","1","162",""],["3","Albania","5510","Production","1242","Margarine, short","2004","tonnes","0.0","F","F","002","1","162",""],["3","Albania","5510","Production","1242","Margarine, short","2005","tonnes","0.0","F","F","002","1","162",""],["3","Albania","5510","Production","1242","Margarine, short","2006","tonnes","0.0","F","F","002","1","162",""],["3","Albania","5510","Production","1242","Margarine, short","2007","tonnes","0.0","F","F","002","1","162",""],["3","Albania","5510","Production","1242","Margarine, short","2008","tonnes","0.0","F","F","002","1","162",""],["3","Albania","5510","Production","1242","Margarine, short","2009","tonnes","0.0","F","F","002","1","162",""],["3","Albania","5510","Production","1242","Margarine, short","2010","tonnes","0.0","F","F","002","1","162",""],["3","Albania","5510","Production","1242","Margarine, short","2011","tonnes","0.0","F","F","002","1","162",""],["4","Algeria","5510","Production","51","Beer of barley","2003","tonnes","110000.0","F","F","003","1","010",""],["4","Algeria","5510","Production","51","Beer of barley","2004","tonnes","110000.0","F","F","003","1","010",""],["4","Algeria","5510","Production","51","Beer of barley","2005","tonnes","117891.0","Im","Im","003","1","010",""],["4","Algeria","5510","Production","51","Beer of barley","2006","tonnes","125000.0","F","F","003","1","010",""],["4","Algeria","5510","Production","51","Beer of barley","2007","tonnes","130000.0","F","F","003","1","010",""],["4","Algeria","5510","Production","51","Beer of barley","2008","tonnes","141325.0","Im","Im","003","1","010",""],["4","Algeria","5510","Production","51","Beer of barley","2009","tonnes","140000.0","F","F","003","1","010",""],["4","Algeria","5510","Production","51","Beer of barley","2010","tonnes","141000.0","F","F","003","1","010",""],["4","Algeria","5510","Production","51","Beer of barley","2011","tonnes","143000.0","F","F","003","1","010",""],["4","Algeria","5510","Production","244","Oil, groundnut","2003","tonnes","19551.43","Fc","Fc","003","1","175",""],["4","Algeria","5510","Production","244","Oil, groundnut","2004","tonnes","19464.36","Fc","Fc","003","1","175",""],["4","Algeria","5510","Production","244","Oil, groundnut","2005","tonnes","23214.83","Fc","Fc","003","1","175",""],["4","Algeria","5510","Production","244","Oil, groundnut","2006","tonnes","17838.94","Fc","Fc","003","1","175",""],["4","Algeria","5510","Production","244","Oil, groundnut","2007","tonnes","19696.39","Fc","Fc","003","1","175",""],["4","Algeria","5510","Production","244","Oil, groundnut","2008","tonnes","22738.15","Fc","Fc","003","1","175",""],["4","Algeria","5510","Production","244","Oil, groundnut","2009","tonnes","22318.66","Fc","Fc","003","1","175",""],["4","Algeria","5510","Production","244","Oil, groundnut","2010","tonnes","13754.76","Fc","Fc","003","1","175",""],["4","Algeria","5510","Production","244","Oil, groundnut","2011","tonnes","19747.83","Fc","Fc","003","1","175",""],["4","Algeria","5510","Production","329","Cottonseed","2003","tonnes","32.5","F","F","003","1","076",""],["4","Algeria","5510","Production","329","Cottonseed","2004","tonnes","40.95","F","F","003","1","076",""],["4","Algeria","5510","Production","329","Cottonseed","2005","tonnes","42.25","F","F","003","1","076",""],["4","Algeria","5510","Production","329","Cottonseed","2006","tonnes","30.55","F","F","003","1","076",""],["4","Algeria","5510","Production","329","Cottonseed","2007","tonnes","31.2","F","F","003","1","076",""],["4","Algeria","5510","Production","329","Cottonseed","2008","tonnes","25.35","F","F","003","1","076",""],["4","Algeria","5510","Production","329","Cottonseed","2009","tonnes","26.0","F","F","003","1","076",""],["4","Algeria","5510","Production","329","Cottonseed","2010","tonnes","40.3","F","F","003","1","076",""],["4","Algeria","5510","Production","329","Cottonseed","2011","tonnes","45.5","F","F","003","1","076",""],["4","Algeria","5510","Production","767","Cotton lint","2003","tonnes","17.5","F","F","003","1","072",""],["4","Algeria","5510","Production","767","Cotton lint","2004","tonnes","22.05","F","F","003","1","072",""],["4","Algeria","5510","Production","767","Cotton lint","2005","tonnes","22.75","F","F","003","1","072",""],["4","Algeria","5510","Production","767","Cotton lint","2006","tonnes","16.45","F","F","003","1","072",""],["4","Algeria","5510","Production","767","Cotton lint","2007","tonnes","16.8","F","F","003","1","072",""],["4","Algeria","5510","Production","767","Cotton lint","2008","tonnes","13.65","F","F","003","1","072",""],["4","Algeria","5510","Production","767","Cotton lint","2009","tonnes","14.0","F","F","003","1","072",""],["4","Algeria","5510","Production","767","Cotton lint","2010","tonnes","21.7","F","F","003","1","072",""],["4","Algeria","5510","Production","767","Cotton lint","2011","tonnes","24.5","F","F","003","1","072",""],["4","Algeria","5510","Production","1242","Margarine, short","2003","tonnes","28000.0","F","F","003","1","162",""],["4","Algeria","5510","Production","1242","Margarine, short","2004","tonnes","30324.0","Im","Im","003","1","162",""],["4","Algeria","5510","Production","1242","Margarine, short","2005","tonnes","32000.0","F","F","003","1","162",""],["4","Algeria","5510","Production","1242","Margarine, short","2006","tonnes","28000.0","F","F","003","1","162",""],["4","Algeria","5510","Production","1242","Margarine, short","2007","tonnes","29000.0","F","F","003","1","162",""],["4","Algeria","5510","Production","1242","Margarine, short","2008","tonnes","18550.0","F","F","003","1","162",""],["4","Algeria","5510","Production","1242","Margarine, short","2009","tonnes","18550.0","F","F","003","1","162",""],["4","Algeria","5510","Production","1242","Margarine, short","2010","tonnes","10450.0","F","F","003","1","162",""],["4","Algeria","5510","Production","1242","Margarine, short","2011","tonnes","10450.0","F","F","003","1","162",""],["5","American Samoa","5510","Production","252","Oil, coconut (copra)","2003","tonnes","65.0","Fc","Fc","004","1","172",""],["5","American Samoa","5510","Production","252","Oil, coconut (copra)","2004","tonnes","65.0","Fc","Fc","004","1","172",""],["5","American Samoa","5510","Production","252","Oil, coconut (copra)","2005","tonnes","65.0","Fc","Fc","004","1","172",""],["5","American Samoa","5510","Production","252","Oil, coconut (copra)","2006","tonnes","60.0","Im","Im","004","1","172",""],["5","American Samoa","5510","Production","252","Oil, coconut (copra)","2007","tonnes","63.0","Im","Im","004","1","172",""],["5","American Samoa","5510","Production","252","Oil, coconut (copra)","2008","tonnes","71.5","Fc","Fc","004","1","172",""],["5","American Samoa","5510","Production","252","Oil, coconut (copra)","2009","tonnes","71.5","Fc","Fc","004","1","172",""],["5","American Samoa","5510","Production","252","Oil, coconut (copra)","2010","tonnes","71.5","Fc","Fc","004","1","172",""],["5","American Samoa","5510","Production","252","Oil, coconut (copra)","2011","tonnes","71.5","Fc","Fc","004","1","172",""],["7","Angola","5510","Production","51","Beer of barley","2003","tonnes","159800.0","*","*","006","1","010",""],["7","Angola","5510","Production","51","Beer of barley","2004","tonnes","205900.0","*","*","006","1","010",""],["7","Angola","5510","Production","51","Beer of barley","2005","tonnes","293100.0","*","*","006","1","010",""],["7","Angola","5510","Production","51","Beer of barley","2006","tonnes","375300.0","*","*","006","1","010",""],["7","Angola","5510","Production","51","Beer of barley","2007","tonnes","395800.0","*","*","006","1","010",""],["7","Angola","5510","Production","51","Beer of barley","2008","tonnes","532500.0","*","*","006","1","010",""],["7","Angola","5510","Production","51","Beer of barley","2009","tonnes","686900.0","*","*","006","1","010",""],["7","Angola","5510","Production","51","Beer of barley","2010","tonnes","736200.0","*","*","006","1","010",""],["7","Angola","5510","Production","51","Beer of barley","2011","tonnes","820000.0","*","*","006","1","010",""],["7","Angola","5510","Production","165","Molasses","2003","tonnes","11781.0","Fc","Fc","006","1","164",""],["7","Angola","5510","Production","165","Molasses","2004","tonnes","11290.13","Fc","Fc","006","1","164",""],["7","Angola","5510","Production","165","Molasses","2005","tonnes","11290.13","Fc","Fc","006","1","164",""],["7","Angola","5510","Production","165","Molasses","2006","tonnes","14726.25","Fc","Fc","006","1","164",""],["7","Angola","5510","Production","165","Molasses","2007","tonnes","16362.5","Fc","Fc","006","1","164",""],["7","Angola","5510","Production","165","Molasses","2008","tonnes","17017.0","Fc","Fc","006","1","164",""],["7","Angola","5510","Production","165","Molasses","2009","tonnes","16362.5","Fc","Fc","006","1","164",""],["7","Angola","5510","Production","165","Molasses","2010","tonnes","16362.5","Fc","Fc","006","1","164",""],["7","Angola","5510","Production","165","Molasses","2011","tonnes","16689.75","Fc","Fc","006","1","164",""],["7","Angola","5510","Production","244","Oil, groundnut","2003","tonnes","7066.55","Fc","Fc","006","1","175",""],["7","Angola","5510","Production","244","Oil, groundnut","2004","tonnes","5331.23","Fc","Fc","006","1","175",""],["7","Angola","5510","Production","244","Oil, groundnut","2005","tonnes","7388.14","Fc","Fc","006","1","175",""],["7","Angola","5510","Production","244","Oil, groundnut","2006","tonnes","6166.15","Fc","Fc","006","1","175",""],["7","Angola","5510","Production","244","Oil, groundnut","2007","tonnes","7227.68","Fc","Fc","006","1","175",""],["7","Angola","5510","Production","244","Oil, groundnut","2008","tonnes","10101.1","Fc","Fc","006","1","175",""],["7","Angola","5510","Production","244","Oil, groundnut","2009","tonnes","12263.57","Fc","Fc","006","1","175",""],["7","Angola","5510","Production","244","Oil, groundnut","2010","tonnes","12751.41","Fc","Fc","006","1","175",""],["7","Angola","5510","Production","244","Oil, groundnut","2011","tonnes","19307.62","Fc","Fc","006","1","175",""],["7","Angola","5510","Production","329","Cottonseed","2003","tonnes","1168.0","Im","Im","006","1","076",""],["7","Angola","5510","Production","329","Cottonseed","2004","tonnes","1532.0","Im","Im","006","1","076",""],["7","Angola","5510","Production","329","Cottonseed","2005","tonnes","2077.0","Im","Im","006","1","076",""],["7","Angola","5510","Production","329","Cottonseed","2006","tonnes","2000.0","F","F","006","1","076",""],["7","Angola","5510","Production","329","Cottonseed","2007","tonnes","2000.0","F","F","006","1","076",""],["7","Angola","5510","Production","329","Cottonseed","2008","tonnes","2000.0","F","F","006","1","076",""],["7","Angola","5510","Production","329","Cottonseed","2009","tonnes","2000.0","F","F","006","1","076",""],["7","Angola","5510","Production","329","Cottonseed","2010","tonnes","2000.0","F","F","006","1","076",""],["7","Angola","5510","Production","329","Cottonseed","2011","tonnes","3200.0","F","F","006","1","076",""],["7","Angola","5510","Production","331","Oil, cottonseed","2003","tonnes","182.33","Fc","Fc","006","1","173",""],["7","Angola","5510","Production","331","Oil, cottonseed","2004","tonnes","245.89","Fc","Fc","006","1","173",""],["7","Angola","5510","Production","331","Oil, cottonseed","2005","tonnes","341.04","Fc","Fc","006","1","173",""],["7","Angola","5510","Production","331","Oil, cottonseed","2006","tonnes","327.6","Fc","Fc","006","1","173",""],["7","Angola","5510","Production","331","Oil, cottonseed","2007","tonnes","327.6","Fc","Fc","006","1","173",""],["7","Angola","5510","Production","331","Oil, cottonseed","2008","tonnes","327.6","Fc","Fc","006","1","173",""],["7","Angola","5510","Production","331","Oil, cottonseed","2009","tonnes","326.52","Fc","Fc","006","1","173",""],["7","Angola","5510","Production","331","Oil, cottonseed","2010","tonnes","326.52","Fc","Fc","006","1","173",""],["7","Angola","5510","Production","331","Oil, cottonseed","2011","tonnes","536.04","Fc","Fc","006","1","173",""],["7","Angola","5510","Production","767","Cotton lint","2003","tonnes","1000.0","*","*","006","1","072",""],["7","Angola","5510","Production","767","Cotton lint","2004","tonnes","1000.0","*","*","006","1","072",""],["7","Angola","5510","Production","767","Cotton lint","2005","tonnes","1000.0","*","*","006","1","072",""],["7","Angola","5510","Production","767","Cotton lint","2006","tonnes","1000.0","*","*","006","1","072",""],["7","Angola","5510","Production","767","Cotton lint","2007","tonnes","1000.0","*","*","006","1","072",""],["7","Angola","5510","Production","767","Cotton lint","2008","tonnes","1000.0","*","*","006","1","072",""],["7","Angola","5510","Production","767","Cotton lint","2009","tonnes","1000.0","*","*","006","1","072",""],["7","Angola","5510","Production","767","Cotton lint","2010","tonnes","1000.0","*","*","006","1","072",""],["7","Angola","5510","Production","767","Cotton lint","2011","tonnes","1000.0","*","*","006","1","072",""],["8","Antigua and Barbuda","5510","Production","329","Cottonseed","2003","tonnes","63.0","F","F","008","1","076",""],["8","Antigua and Barbuda","5510","Production","329","Cottonseed","2004","tonnes","63.0","F","F","008","1","076",""],["8","Antigua and Barbuda","5510","Production","329","Cottonseed","2005","tonnes","63.0","F","F","008","1","076",""],["8","Antigua and Barbuda","5510","Production","329","Cottonseed","2006","tonnes","63.0","F","F","008","1","076",""],["8","Antigua and Barbuda","5510","Production","329","Cottonseed","2007","tonnes","60.0","F","F","008","1","076",""],["8","Antigua and Barbuda","5510","Production","329","Cottonseed","2008","tonnes","63.0","F","F","008","1","076",""],["8","Antigua and Barbuda","5510","Production","329","Cottonseed","2009","tonnes","44.0","F","F","008","1","076",""],["8","Antigua and Barbuda","5510","Production","329","Cottonseed","2010","tonnes","50.0","Im","Im","008","1","076",""],["8","Antigua and Barbuda","5510","Production","329","Cottonseed","2011","tonnes","54.0","F","F","008","1","076",""],["8","Antigua and Barbuda","5510","Production","331","Oil, cottonseed","2003","tonnes","6.6","Fc","Fc","008","1","173",""],["8","Antigua and Barbuda","5510","Production","331","Oil, cottonseed","2004","tonnes","6.6","Fc","Fc","008","1","173",""],["8","Antigua and Barbuda","5510","Production","331","Oil, cottonseed","2005","tonnes","6.6","Fc","Fc","008","1","173",""],["8","Antigua and Barbuda","5510","Production","331","Oil, cottonseed","2006","tonnes","6.6","Fc","Fc","008","1","173",""],["8","Antigua and Barbuda","5510","Production","331","Oil, cottonseed","2007","tonnes","6.12","Fc","Fc","008","1","173",""],["8","Antigua and Barbuda","5510","Production","331","Oil, cottonseed","2008","tonnes","6.6","Fc","Fc","008","1","173",""],["8","Antigua and Barbuda","5510","Production","331","Oil, cottonseed","2009","tonnes","3.54","Fc","Fc","008","1","173",""],["8","Antigua and Barbuda","5510","Production","331","Oil, cottonseed","2010","tonnes","4.5","Fc","Fc","008","1","173",""],["8","Antigua and Barbuda","5510","Production","331","Oil, cottonseed","2011","tonnes","5.15","Fc","Fc","008","1","173",""],["8","Antigua and Barbuda","5510","Production","767","Cotton lint","2003","tonnes","30.0","F","F","008","1","072",""],["8","Antigua and Barbuda","5510","Production","767","Cotton lint","2004","tonnes","30.0","F","F","008","1","072",""],["8","Antigua and Barbuda","5510","Production","767","Cotton lint","2005","tonnes","30.0","F","F","008","1","072",""],["8","Antigua and Barbuda","5510","Production","767","Cotton lint","2006","tonnes","30.0","F","F","008","1","072",""],["8","Antigua and Barbuda","5510","Production","767","Cotton lint","2007","tonnes","30.0","F","F","008","1","072",""],["8","Antigua and Barbuda","5510","Production","767","Cotton lint","2008","tonnes","30.0","F","F","008","1","072",""],["8","Antigua and Barbuda","5510","Production","767","Cotton lint","2009","tonnes","30.0","F","F","008","1","072",""],["8","Antigua and Barbuda","5510","Production","767","Cotton lint","2010","tonnes","30.0","Im","Im","008","1","072",""],["8","Antigua and Barbuda","5510","Production","767","Cotton lint","2011","tonnes","30.0","F","F","008","1","072",""],["9","Argentina","5510","Production","51","Beer of barley","2003","tonnes","1295000.0","","","009","1","010",""],["9","Argentina","5510","Production","51","Beer of barley","2004","tonnes","1280000.0","*","*","009","1","010",""],["9","Argentina","5510","Production","51","Beer of barley","2005","tonnes","1370000.0","*","*","009","1","010",""],["9","Argentina","5510","Production","51","Beer of barley","2006","tonnes","1400000.0","*","*","009","1","010",""],["9","Argentina","5510","Production","51","Beer of barley","2007","tonnes","1450000.0","*","*","009","1","010",""],["9","Argentina","5510","Production","51","Beer of barley","2008","tonnes","1715000.0","","","009","1","010",""],["9","Argentina","5510","Production","51","Beer of barley","2009","tonnes","1720000.0","","","009","1","010",""],["9","Argentina","5510","Production","51","Beer of barley","2010","tonnes","1750000.0","*","*","009","1","010",""],["9","Argentina","5510","Production","51","Beer of barley","2011","tonnes","1700000.0","*","*","009","1","010",""],["9","Argentina","5510","Production","165","Molasses","2003","tonnes","620000.0","*","*","009","1","164",""],["9","Argentina","5510","Production","165","Molasses","2004","tonnes","570000.0","*","*","009","1","164",""],["9","Argentina","5510","Production","165","Molasses","2005","tonnes","705000.0","F","F","009","1","164",""],["9","Argentina","5510","Production","165","Molasses","2006","tonnes","755000.0","F","F","009","1","164",""],["9","Argentina","5510","Production","165","Molasses","2007","tonnes","750000.0","*","*","009","1","164",""],["9","Argentina","5510","Production","165","Molasses","2008","tonnes","680000.0","*","*","009","1","164",""],["9","Argentina","5510","Production","165","Molasses","2009","tonnes","750000.0","*","*","009","1","164",""],["9","Argentina","5510","Production","165","Molasses","2010","tonnes","685000.0","*","*","009","1","164",""],["9","Argentina","5510","Production","165","Molasses","2011","tonnes","650000.0","*","*","009","1","164",""],["9","Argentina","5510","Production","244","Oil, groundnut","2003","tonnes","47600.0","*","*","009","1","175",""],["9","Argentina","5510","Production","244","Oil, groundnut","2004","tonnes","42000.0","*","*","009","1","175",""],["9","Argentina","5510","Production","244","Oil, groundnut","2005","tonnes","66400.0","*","*","009","1","175",""],["9","Argentina","5510","Production","244","Oil, groundnut","2006","tonnes","59100.0","*","*","009","1","175",""],["9","Argentina","5510","Production","244","Oil, groundnut","2007","tonnes","47400.0","*","*","009","1","175",""],["9","Argentina","5510","Production","244","Oil, groundnut","2008","tonnes","61860.0","","","009","1","175",""],["9","Argentina","5510","Production","244","Oil, groundnut","2009","tonnes","81027.0","","","009","1","175",""],["9","Argentina","5510","Production","244","Oil, groundnut","2010","tonnes","52945.0","","","009","1","175",""],["9","Argentina","5510","Production","244","Oil, groundnut","2011","tonnes","37700.0","*","*","009","1","175",""],["9","Argentina","5510","Production","329","Cottonseed","2003","tonnes","111000.0","*","*","009","1","076",""],["9","Argentina","5510","Production","329","Cottonseed","2004","tonnes","190000.0","F","F","009","1","076",""],["9","Argentina","5510","Production","329","Cottonseed","2005","tonnes","246400.0","F","F","009","1","076",""],["9","Argentina","5510","Production","329","Cottonseed","2006","tonnes","229773.0","F","F","009","1","076",""],["9","Argentina","5510","Production","329","Cottonseed","2007","tonnes","299960.0","F","F","009","1","076",""],["9","Argentina","5510","Production","329","Cottonseed","2008","tonnes","271500.0","F","F","009","1","076",""],["9","Argentina","5510","Production","329","Cottonseed","2009","tonnes","213700.0","F","F","009","1","076",""],["9","Argentina","5510","Production","329","Cottonseed","2010","tonnes","414450.0","F","F","009","1","076",""],["9","Argentina","5510","Production","329","Cottonseed","2011","tonnes","567898.0","F","F","009","1","076",""],["9","Argentina","5510","Production","331","Oil, cottonseed","2003","tonnes","7000.0","*","*","009","1","173",""],["9","Argentina","5510","Production","331","Oil, cottonseed","2004","tonnes","10100.0","*","*","009","1","173",""],["9","Argentina","5510","Production","331","Oil, cottonseed","2005","tonnes","19750.0","F","F","009","1","173",""],["9","Argentina","5510","Production","331","Oil, cottonseed","2006","tonnes","6800.0","*","*","009","1","173",""],["9","Argentina","5510","Production","331","Oil, cottonseed","2007","tonnes","11600.0","*","*","009","1","173",""],["9","Argentina","5510","Production","331","Oil, cottonseed","2008","tonnes","4099.0","","","009","1","173",""],["9","Argentina","5510","Production","331","Oil, cottonseed","2009","tonnes","5822.0","","","009","1","173",""],["9","Argentina","5510","Production","331","Oil, cottonseed","2010","tonnes","19943.0","","","009","1","173",""],["9","Argentina","5510","Production","331","Oil, cottonseed","2011","tonnes","23400.0","*","*","009","1","173",""],["9","Argentina","5510","Production","767","Cotton lint","2003","tonnes","65000.0","*","*","009","1","072",""],["9","Argentina","5510","Production","767","Cotton lint","2004","tonnes","112000.0","*","*","009","1","072",""],["9","Argentina","5510","Production","767","Cotton lint","2005","tonnes","160000.0","*","*","009","1","072",""],["9","Argentina","5510","Production","767","Cotton lint","2006","tonnes","145000.0","F","F","009","1","072",""],["9","Argentina","5510","Production","767","Cotton lint","2007","tonnes","170000.0","F","F","009","1","072",""],["9","Argentina","5510","Production","767","Cotton lint","2008","tonnes","166265.0","","","009","1","072",""],["9","Argentina","5510","Production","767","Cotton lint","2009","tonnes","135000.0","","","009","1","072",""],["9","Argentina","5510","Production","767","Cotton lint","2010","tonnes","230000.0","","","009","1","072",""],["9","Argentina","5510","Production","767","Cotton lint","2011","tonnes","295000.0","*","*","009","1","072",""],["9","Argentina","5510","Production","1242","Margarine, short","2003","tonnes","3462.28","Fc","Fc","009","1","162",""],["9","Argentina","5510","Production","1242","Margarine, short","2004","tonnes","4162.39","Fc","Fc","009","1","162",""],["9","Argentina","5510","Production","1242","Margarine, short","2005","tonnes","6505.55","Fc","Fc","009","1","162",""],["9","Argentina","5510","Production","1242","Margarine, short","2006","tonnes","7424.62","Fc","Fc","009","1","162",""],["9","Argentina","5510","Production","1242","Margarine, short","2007","tonnes","7470.81","Fc","Fc","009","1","162",""],["9","Argentina","5510","Production","1242","Margarine, short","2008","tonnes","7737.61","Fc","Fc","009","1","162",""],["9","Argentina","5510","Production","1242","Margarine, short","2009","tonnes","9773.75","Fc","Fc","009","1","162",""],["9","Argentina","5510","Production","1242","Margarine, short","2010","tonnes","9097.14","Fc","Fc","009","1","162",""],["9","Argentina","5510","Production","1242","Margarine, short","2011","tonnes","9987.14","Fc","Fc","009","1","162",""]];
   FAOSTATNEWOLAP.rendererV=2;
        //var derivers = $.pivotUtilities.derivers;
//var renderers = $.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers);

         $("#testinline").pivotUI(test,mesOptions.E);

    };

    return Host;

});