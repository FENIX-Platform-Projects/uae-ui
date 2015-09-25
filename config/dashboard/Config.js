/*global define*/

define(function () {

    'use strict';

    return {

        "trade": {
            filter: [
                {
                    "type": "static",
                    "column": "item",
                    "containerType": "baseContainer",
                    "title": "Commodity",
                    "defaultCodes": ["0102"],
                    "components": [
                        {
                            "type": "distinct",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            //"uid": "HS",
                            //"version": "2012",
                            "title": {"EN": "Distinct"},
                            // name is the ID output in tehe filter getValues()
                            "name": "item",
                            "config": {
                                "defaultsource": [
                                    {"value":"0101","label":"LIVE HORSES, ASSES,  MULES AND HINNIES.","selected":false},
                                    {"value":"0102","label":"LIVE BOVINE ANIMALS","selected":false},
                                    {"value":"0103","label":"LIVE SWINE.","selected":false},
                                    {"value":"0104","label":"LIVE SHEEP AND GOATS.","selected":false},
                                    {"value":"0105","label":"LIVE POULTRY, THAT IS TO SAY, FOWLS OF THE SPECIES GALLUS DOMESTICUS, DUCKS, GEESE, TURKEYS AND GUINEA FOWLS.","selected":false},
                                    {"value":"0106","label":"OTHER LIVE ANIMALS","selected":false},
                                    {"value":"0301","label":"LIVE FISH.","selected":false},
                                    {"value":"0201","label":"MEAT OF BOVINE ANIMALS, FRESH OR CHILLED.","selected":false},
                                    {"value":"0202","label":"MEAT OF BOVINE ANIMALS,FROZEN","selected":false},
                                    {"value":"0203","label":"MEAT OF SWINE,FRESH, CHILLED OR FORZEN. .","selected":false},
                                    {"value":"0204","label":"MEAT OF SHEEP OR GOATS, FRESH,CHILLED OR FROZEN.","selected":false},
                                    {"value":"0205","label":"MEAT OF HORSES, ASSES, MULES OR HINNIES, FRESH, CHILLED OR FROZEN.","selected":false},
                                    {"value":"0206","label":"EDIBLE OFFAL OF BOVINE ANIMALS, SWINE,SHEEP,GOATS, HORSES, ASSES, MULES OR HINNIES, FRESH, CHILLED OR FROZEN.","selected":false},
                                    {"value":"0207","label":"MEAT AND EDIBLE OFFAL, OF THE POULTRY OF HEADING NO. 01.05, FRESH, CHILLED OR FROZEN","selected":false},
                                    {"value":"0208","label":"OTHER MEAT AND EDIBLE MEAT OFAL,FRESH,CHILLED OR FROZEN.","selected":false},
                                    {"value":"0209","label":"PIG FAT, FREE OF LEAN MEAT, AND  POULTRY FAT NOT RENDERED OR OTHERWISE EXTRACTED,FRESH, CHILLED,FROZEN, SALTED, IN BRINE, DRIED AND SMOKED.","selected":false},
                                    {"value":"0210","label":"MEAT AND EDIBLE MEAT OFFAL, SALTED, IN BRINE, DRIED OR SMOKED; EDIBLE FLOURS AND MEALS OF MEAT OR MEAT OFFAL.","selected":false},
                                    {"value":"0302","label":"FISH, FRESH OR CHILLED EXCLUDING FISH FILLETS AND OTHER FISH MEAT OF HEADING NO. 03.04","selected":false},
                                    {"value":"0303","label":"FISH FROZEN, EXCLUDING FISH FILLETS AND OTHER FISH MEAT OF HEADING NO. 03.04","selected":false},
                                    {"value":"0304","label":"FISH FILLETS AND OTHER FISH MEAT (WHETHER OR NOT MINCED), FRESH,  CHILLED  OR FROZEN.","selected":false},
                                    {"value":"0305","label":"FISH,DRIED, SALTED OR IN BRINE; SMOKED FISH, WHETHER  OR NOT COOKED BEFORE OR DURING THE SMOKING  PROCESS; FLOURS, MEALSAND  PELLETS OF FISH, FIT FOR HUMAN CONSUMPTION","selected":false},
                                    {"value":"0306","label":"CRUSTACEANS, WHETHER IN SHELL OR NOT,LIVE,FRESH, CHILLED FROZEN DRIED, SALTED OR IN BRINE; CRUSTACEANS, IN SHELL, COOKED BY STEAMINGOR BY BOILING IN WATER, WHETHER OR NOT CHILLED,FORZEN,DRIED,SALTED","selected":false},
                                    {"value":"0307","label":"MOLLUSCS, WHETHER IN SHELL OR NOT LIVE FRESH, CHILLED,.FROZEN,DRIED,SALTED OR IN BRINE; ACQUATIC INVERTEBRATES OTHER THAN CRUSTACEANS AND MOLLUSCS, LIVE FRESH, CHILLED, FROZEN, DRIED, SALTED OR IN","selected":false},
                                    {"value":"0401","label":"MILK AND CREAM NOT CONCENTRATED NOR CONTAINING ADDEDSUGAR OR OTHER SWEETENING MATTER.","selected":false},
                                    {"value":"0402","label":"MILK AND CREAM, CONCENTRATED OR CONTAINING ADDED SUGAR OR OTHER SWEETING MATTER.","selected":false},
                                    {"value":"0403","label":"BUTTERMILK, CURDLED MILK AND CREAM,YOGURT, KEPHIR AND OTHER FERMENTED OR ACIDIFIED MILK AND CREAM, WHETHER OR NOT CONCENTRATED OR CONTAINING ADDED SURAR OR OTHER SWEETENING MATTER OR FLAVOURED OR","selected":false},
                                    {"value":"0404","label":"WHEY, WHETHER OR NOT CONCENTRATED OR CONTAINING ADDED SUGAR OR OTHER SWEETENING MATTER; PRODUCTS CONSISTING OF NATURAL MILK CONSTITUENTS, WHETHER  OR NOT CONTAINING ADDED SUGAR OR OTHER SWEETENING","selected":false},
                                    {"value":"0405","label":"BUTTER AND OTHER FATS AND OILS  DERIVED FROM MILK; DAIRY SPREADS.","selected":false},
                                    {"value":"0406","label":"CHEESE AND CURD","selected":false},
                                    {"value":"0407","label":"BIRDS'S EGGS,IN SHELL,FRESH,  PRESERVED OR COOKED","selected":false},
                                    {"value":"0408","label":"BIRDS' EGGS,NOT IN SHELL AND EGG YOLKS, FRESH, DRIED,  COOKED BY STEAMING OR BY BOILING INWATER, MOULDED,  FROZEN OR OTHERWISE PRESERVED, WHETHER OR NOT CONTAINING ADDED SUGAR OR OTHER SWEETENING","selected":false},
                                    {"value":"0409","label":"NATURAL HONEY","selected":false},
                                    {"value":"0410","label":"EDIBLE PRODUCTS OF ANIMAL ORIGIN,NOT ELSEWHERE SPECIFIED  OR INCLUDED.","selected":false},
                                    {"value":"0501","label":"HUMAN HAIR, UNWORKED,WHETHER OR NOT WASHED OR SCOURED; WASTE OF HUMAN HAIR.","selected":false},
                                    {"value":"0502","label":"PIGS' HOGS' BOARS'BRISTLES AND HAIR BADGER HAIR AND OTHER BRUSH MAKING HAIR  WASTE OF SUCH BRISTLES OR HAIR.","selected":false},
                                    {"value":"0503","label":"HORSEHAIR AND HORSEHAIR WASTE, WHETHER OR NOT  PUT UP AS A LAYER WITH OR WITHOUT SUPPORTING MATERIAL.","selected":false},
                                    {"value":"0504","label":"GUTS BLADDERS AND STOMACHS OF ANIMALS (OTHER THAN FISH), WHOLE AND PIECES THEREOF, FRESH, CHILLED, FROZEN, SALTED, IN BRINE, DRIED OR SMOKED.","selected":false},
                                    {"value":"0505","label":"SKINS AND OTHER PARTS OF BIRDS, WITH THEIR FEATHERS OR DOWN, FEATHERS AND PARTS OF FEATHERS (WHETHER OR NOT WITH TRIMMED EDGES) AND DOWN, NOT FURTHER WORKED THAN CLEANED, DISINFECTED OR TREATED","selected":false},
                                    {"value":"0507","label":"IVORY,TORTOISE-SHELL, WHALEBONE AND WHALEBONE HAIR, HORNS, ANTLERS, HOOVES, NAILS, CLAWS AND BEAKS, UNWORKED OR SIMPLY PREPARED BUT NOT CUT TO SHAPE; POWDER AND WASTE OF THESE PRODUCTS.","selected":false},
                                    {"value":"0508","label":"CORAL AND SIMILAR MATERIAL, UNWORKED OR SIMPLY PREPARED BUT NOT OTHERWISE WORKED;SHELLS  OF MOLLUSCS, CRUSTACEANS OR ECHINODERMS AND CUTTLE-BONE, UNWORKED OR SIMPLY PREPARED BUT NOT CUT TO SHAPE","selected":false},
                                    {"value":"0509","label":"NATRUAL SPONGES  OF ANIMAL  ORIGIN","selected":false},
                                    {"value":"0510","label":"AMBERGRIS, CASTOREUM,CIVET AND MUSK;CANTHARIDES;BILE, WHETHER  OR NOT DRIED; GLANDS AND  OTHER ANIMAL PRODUCTS USED IN THE PREARATION OF PHARMACEUTICAL PRODUCTS, FRESH CHILLED, FROZEN OR OTHERWISE","selected":false},
                                    {"value":"0511","label":"ANIMAL PRODUCTS NOT ELSEWHERE SPECIFIED OR INCLUDED; DEAD ANIMALS  OF CHAPTER 1 OR 3, UNFIT FOR HUMAN CONSUMPTION.","selected":false},
                                    {"value":"0601","label":"BULBS, TUBERS, TUBEROUS ROOTS CORMS, CROWNS AND RHIZOMES, DORMANT, IN GROWTH OR IN FLOWER; CHICORY PLANTS AND ROOTS OTHER THAN ROOTS   OF HEADING NO. 12.12","selected":false},
                                    {"value":"0602","label":"OTHER LIVE PLANTS (INCLUDING THEIR ROOTS ) CUTTINGS AND SLIPS; MUSHROOM SPAWN.","selected":false},
                                    {"value":"0603","label":"CUT FLOWERS AND FLOWER BUDS OF A KIND SUITABLE FOR BOUQUETS OR FOR ORNAMENTAL PURPOSES, FRESH, DRIED, DYED, BLEACHED, IMPREGNATED OR OTHERWISE PREPARED.","selected":false},
                                    {"value":"0604","label":"FOLIAGE,BRANCHES AND OTHER  PARTS OF PLANTS, WITHOUT  FLOWERS   OF FLOWER BUDS, AND GRASSES, MOSSES AND LICHENS, BEING GOODS OF A KIND SUITABLE FOR BOUQUETS OR FOR ORNAMENTAL PURPOSES,FRESH,DYED,","selected":false},
                                    {"value":"0701","label":"POTATOES,FRESH OR CHILLED.","selected":false},
                                    {"value":"0702","label":"TOMATOES, FRESH OR CHILLED","selected":false},
                                    {"value":"0703","label":"ONIONS, SHALLOT, GARLIC, LEEKS AND OTHER ALLIACEOUS VEGETABLES, FRESH OR CHILLED.","selected":false},
                                    {"value":"0704","label":"CABBAGES CAULIFOWERES,KOHLRABI, KALE ANDSIMILAR EDIBLE BRASSICAS, FRESH OR CHILLED.","selected":false},
                                    {"value":"0705","label":"LETTUCE  (LACTUCA SATIVA ) AND CHICORY ( CICHORIUM SPP.) FRESH OR CHILLED.","selected":false},
                                    {"value":"0706","label":"CARROTS,TURNIPS, SALAD BEETROOT, SALSIFY,CELERIAC, RADISHES AND SIMILAR EDIBLE ROOTS, FRESH OR CHILLED.","selected":false},
                                    {"value":"0707","label":"CUCUMBERS AND GHERKINS, FRESH OR CHILLED","selected":false},
                                    {"value":"0708","label":"LEGUMINOUS VEGETABLES, SHELLED  OR UNSHELLED, FRESH OR CHILLED.","selected":false},
                                    {"value":"0709","label":"OTHER VEGETABLES, FRESH OR CHILLED","selected":false},
                                    {"value":"0710","label":"VEGETABLES (UNCOOKED OR COOKED BY STEAMING OR BOILING IN WATER), FROZEN.","selected":false},
                                    {"value":"0711","label":"VEGETABLES PROVISIONALLY PRESERVED (FOR EXAMPLE, BY SULPHUR DIOXIDE GAS, IN BRINE, IN SULPHUR WATER  OR IN OTHER PRESERVATIVE SOLUTIONS), BUT UNSUITABLE IN THAT STATE FOR IMMEDIATE CONSUMPTION","selected":false},
                                    {"value":"0712","label":"Dried vegetables, whole, cut, sliced, broken or in powder, but not further prepared. .","selected":false},
                                    {"value":"0713","label":"DRIED LEGUMINOUS VEGETABLES, SHELLED, WHETHER OR NOT SKIMMED OR SPLIT.","selected":false},
                                    {"value":"0714","label":"MANIOC, ARROWROOT, SALEP, JERUSALEM ARTICHOKES, SWEET POTATOES AND SIMILAR ROOTS AND TUBERS WITH HIGH STARCH OR INSULIN CONTENT,FRESH,CHILLED,FROZEN OR DRIED, WHETHER OR NOT SLICED OR IN THE FORM OF","selected":false},
                                    {"value":"0801","label":"COCONUTS, BRAZIL NUTS AND CASHEW NUTS, FRESH OR DRIED, WHETHER  OR NOT SHELLED   OR PEELED.","selected":false},
                                    {"value":"0802","label":"OTHER NUTS  FRESH OR DRIED, WHETHER OR NOT SHELLED  OR PEELED.","selected":false},
                                    {"value":"0803","label":"BANANAS, INCLUDING PLANTAINS, FRESH OR DRIED.","selected":false},
                                    {"value":"0804","label":"DATES,FIGS, PINEAPPLES, AVOCADOS, GUAVAS, MANGOES AND MANGOSTEENS, FRESH OR DRIED.","selected":false},
                                    {"value":"0805","label":"CITRUS FRUIT, FRESH OR DRIED","selected":false},
                                    {"value":"0806","label":"GRAPES, FRESH OR DRIED.","selected":false},
                                    {"value":"0807","label":"MELONS (INCLUDING WATERMELONS) AND  PAPAWS )PAPAYAS) FRESH.","selected":false},
                                    {"value":"0808","label":"APPLES, PEARS KAND QUINCES, FRESH","selected":false},
                                    {"value":"0809","label":"APPRICOTS, CHERRIES,  PEACHES (INCLUDING NECTARINES) PLUMS AND SOLES, FRESH.","selected":false},
                                    {"value":"0810","label":"OTHER FRUITS, FRESH","selected":false},
                                    {"value":"0811","label":"FRUIT AND NUTS, UNCOOKED OR BOILING  IN WATER, FROZEN WHETHER  OR NOT CONTAINIG ADDED SUGAR OR OTHER SWEETENING MATTER.","selected":false},
                                    {"value":"0812","label":"FRUIT AND NUTS, PROVISIONALLY PRESERVED (FOR EXAMPLE, BY SULPHUR DIOXIDE GAS, IN BRINE, IN SULPHUR WATER  OR IN OTHER PRESERVATIVE SOLUTIONS), BUT UNSUITABLE IN THAT STATE FOR IMMEDIATE CONSUMPTION","selected":false},
                                    {"value":"0813","label":"FRUIT, DRIED, OTHER THAN THAT OF HEADING NOS. 08.01 TO 08.06; MIXTURES OF NUTS OR DRIED FRUITS  OF THIS CHAPTER","selected":false},
                                    {"value":"0814","label":"PEEL OF CITRUS FRUIT OR MELONS (INCLUDING WATERMELONS), FRESH, FROZEN DRIED  OR PROVISIONALLY PRESERVED IN BRINE, IN SULPHUR WATER OR IN OTHER PRESERVATIVE SOLUTIONS","selected":false},
                                    {"value":"0901","label":"COFFEE, WHETHER OR NOT ROASTED OR DECAFFEINATED; COFFEE HUSKS AND SKINS, COFFEE SUBSTITUTES  CONTAINING COFFEE I ANY PROPORTION","selected":false},
                                    {"value":"0902","label":"TEA, WHETHER  OR NOT FLAVOURED","selected":false},
                                    {"value":"0903","label":"MATE.","selected":false},
                                    {"value":"0904","label":"PEPPER OF THE GENUS PIPER; DRIED OR CRUSHED OR GROUND FRUITS OF THE GENUS  CAPSICUM OR OF THE GENUS PIMENTA.","selected":false},
                                    {"value":"0905","label":"VANILLA.","selected":false},
                                    {"value":"0906","label":"CINNAMON AND CINNAMON-TREE FLOWERS","selected":false},
                                    {"value":"0907","label":"CLOVES (WHOLE FRUIT, CLOVES AND STEMS)","selected":false},
                                    {"value":"0908","label":"NUTMEG, MACE AND CARDAMOMS.","selected":false},
                                    {"value":"0909","label":"SEEDS OF ANISE, BADIAN,FENNEL,CORIANDER, CUMIN OR CARAWAY; JUNIPER BERRIES.","selected":false},
                                    {"value":"0910","label":"GINGER,SAFFRON, TURMERIC (CURCUMA),THYME, BAY LEAVES, CURRY AND OTHER SPICES.","selected":false},
                                    {"value":"1001","label":"WHEAT AND MESLIN","selected":false},
                                    {"value":"1002","label":"RYE","selected":false},
                                    {"value":"1003","label":"BARLEY","selected":false},
                                    {"value":"1004","label":"OATS","selected":false},
                                    {"value":"1005","label":"MAIZE (CORN).","selected":false},
                                    {"value":"1006","label":"RICE","selected":false},
                                    {"value":"1007","label":"GRAIN SORGHUM","selected":false},
                                    {"value":"1008","label":"BUCKWHEAT, MILLET AND CANARY SEED; OTHER CEREALS.","selected":false},
                                    {"value":"1101","label":"WHEAT  OR MESLIN FLOUR","selected":false},
                                    {"value":"1102","label":"CREAL FLOURS OTHER  THAN  OF WHEAT OR MESLIN.","selected":false},
                                    {"value":"1103","label":"CEREAL GROATS, MEAL AND PELLETS","selected":false},
                                    {"value":"1104","label":"CEREAL GRAINS OTHERWISE WORKED ( FOR EXAMPLE,  HULLED, ROLLED, FLAKED, PEARLED, SLICED   OR KIBBLED), EXCEPT RICE OF HEADING  NO. 10.06 GERM OF CEREALS, WHOLE, ROLLED, FLAKED OR GROUND.","selected":false},
                                    {"value":"1105","label":"FLOUR, MEAL, POWDER,FLAKES, GRANULES AND PELLETS OF POTATOES.","selected":false},
                                    {"value":"1106","label":"FLOUR, MEAL AND POWDER   OF THE DRIED LEGUMINOUS VEGETABLES OF HEADING NO. 07.13, OF SAGO OR OF ROOTS OR TUBERS OF HEADING NO.07.14 OR THE PRODUCTS OF CHAPTER 8","selected":false},
                                    {"value":"1107","label":"MALT, WHETHER OR NOT ROSTED.","selected":false},
                                    {"value":"1108","label":"STARCHES; INULIN","selected":false},
                                    {"value":"1109","label":"WHEAT GLUTEN,WHETHER OR NOT DRIED.","selected":false},
                                    {"value":"1201","label":"SOYA BEANS, WHETHER NOT BROKEN","selected":false},
                                    {"value":"1202","label":"GROUND-NUTS, NOT ROASTED OR OTHERWISE COOKED, WHETHER OR NOT SHELLED OR BROKEN.","selected":false},
                                    {"value":"1203","label":"COPRA","selected":false},
                                    {"value":"1204","label":"LINSEED, WHETHER OR NOT BROKEN","selected":false},
                                    {"value":"1205","label":"RAPE OR COLZA SEEDS, WHETHER OR NOT BROKEN.","selected":false},
                                    {"value":"1206","label":"SUNFLOWER SEEDS, WHETHER OR NOT BROKEN.","selected":false},
                                    {"value":"1207","label":"OTHER OIL SEEDS AND OLEAGINOUS FRUITS, WHETHER OR NOT BROKEN","selected":false},
                                    {"value":"1208","label":"FLOURS AND MEALS OF OIL SEEDS OF OLEAGINOUS FRUITS, WHETHER OR NOT BROKEN.","selected":false},
                                    {"value":"1209","label":"SEEDS FRUIT AND SPORES, OF A KIND USED FOR SOWING.","selected":false},
                                    {"value":"1210","label":"HOP CONES, FRESH OR DRIED, WHETHER OR NOT GROUND,POWDERED OR IN THE FORM OF PELLETS; LUPULIN.","selected":false},
                                    {"value":"1211","label":"PLANTS AND PARTS (INCLUDING SEEDS AND FRUITS ), OF A KIND USED PRIMARILY IN PERFUMERY, IN PHARMACY OR FOR INSECICIDAL, FUNGICIDAL OR SIMILAR PURPOSES, FRESH OR DRIED, WHETHER OR NOT CUT, CRUSHED","selected":false},
                                    {"value":"1212","label":"LOCUST BEANS, SEAWEED AND OTHER ALGAE, SUGR CANE,  FRESH, CHILLED FROZEN OR DRIED, WHETHER OR NOT GROUND; FRUIT STONES AND KERNELS AND OTHER  VEGETABLE PRODUCTS (INCLUDING UNROASTED CHICORY ROOTS OF","selected":false},
                                    {"value":"1213","label":"CEREAL STRAW AND HUSKS, UNPREPARED, WHETHER OR NOT CHOPPED, GROUND,  PRESSED OR IN THE FORM OF PELLETS","selected":false},
                                    {"value":"1214","label":"SWEDES,MANGOLDS, FODDER ROOTS,HAY, LUCERNE (ALFALFA), CLOVER, SAINFOIN,FORAGE KALE, LUPINES, VETCHES AND SIMILAR JFORAGE PRODUCTS, WHETHER OR NOT IN THE FORM  OF PELLETS","selected":false},
                                    {"value":"1301","label":"LAC; NATURAL GUMS, RESINS,  GUM RESINS AND OLEORSESINS ( FOR EXAMPLE, BALSAMS).","selected":false},
                                    {"value":"1302","label":"VEGETABLE SAPS AND EXTRACTS; PECTIC SUBSTANCES, PECTINATES AND PECTATES; AGAR-AGAR AND OTHER MUCILAGES AND THICKENERS,  WHETHER OR NOT MODIFIED, DERIVED FROM VEGETABLE PRODUCTS","selected":false},
                                    {"value":"1401","label":"VEGETABLE MATERIALS  OF A KIND USED PRIMARILY FOR PLAITING ( FOR EXAMPLE, BAMBOOS, RATTANS, REEDS, RUSHES, OSIER, RAFFIA, CLEANED, BLEACHED  OR DYED CEREAL STRAW, AND LIME BARK).","selected":false},
                                    {"value":"1402","label":"VEGETABLE MATERIALS OF KIND USED  PRIMARILY AS STUFFING OR AS PADDING ( FOR EXAMPLE, KAPOK, VEGETABLE HAIR AND  EEL-GRASS) WHETHER  OR NOT PUT UP AS A LAYER WITH  OR WITHOUT SUPPORTING","selected":false},
                                    {"value":"1403","label":"VEGETABLE MATERIALS OF A KIND USED PRIMARILY IN BROOMS OR INBRUSHES (FOR EXAMPLE, BROOM-CORN,  PIASSAVA, COUCH-GRASS AND ISTLE), WHETHER OR NOT IN HANKS   OR BUNDLES","selected":false},
                                    {"value":"1404","label":"VEGETABLE PRODUCTS NOT ELSEWHERE SPECIFIED OR INCLUDED.","selected":false},
                                    {"value":"1501","label":"PIG FAT ( INCLUDING LARD) AND POULTRY FAT, OTHER THAN THAT OF HEADING NO.02.09 OR 15.03","selected":false},
                                    {"value":"1502","label":"FATS  OF BOVINE ANIMALS, SHEEP OR GOATS, OTHER THAN THOSE  OF HEADING NO. 15.03","selected":false},
                                    {"value":"1503","label":"LARD STEARIN,LARD OIL,OLEOSTEARIN, OLEO-OIL AND TALLOW OIL NOT EMULSIFIED OR MIXED OR OTHERWISE PREPARED.","selected":false},
                                    {"value":"1504","label":"FATS AND OILS AND THEIR FRACTIONS, OF FISH OR MARINE MAMMALS, WHETHER OR NOT REFINED, BUT NOT CHEMICALLY MODIFIED.","selected":false},
                                    {"value":"1505","label":"WOOL GREASE AND FATTY SUBSTANCES DERIVED THEREFROM (INCLUDING LANOLIN).","selected":false},
                                    {"value":"1506","label":"OTHER ANIMALS FATS AND OILS  AND THEIR FRACTIONS, WHETHER  OR NOT REFIENED BUT NOT CHEMICALLY MODIFIED.","selected":false},
                                    {"value":"1507","label":"SOYA BEAN OIL AND ITS FRACTIONS, WHETHER OR NOT REFINED, BUT NOT CHEMICALLY MODIFIED.","selected":false},
                                    {"value":"1508","label":"GROUND-NUT OIL AND  ITS FRACTIONS, WHETHER OR NOT REFINED, BUT NOT CHEMICALLY MODIFIED.","selected":false},
                                    {"value":"1509","label":"OLIVE OIL AND ITS FRACTIONS, WHETHER  OR NOT REFINED, BUT NOT CHEMICALLY MODIFIED.","selected":false},
                                    {"value":"1510","label":"OTHER OILS AND THEIR FRACTIONS, OBTAINEDSOLELY FROM OLIVES, WHETHER  OR NOT REFINED, BUT NOT CHEMICALLY MODIFIED,   INCLUDING BLENDS, OF THESE OILS  OR FRACTIONS WITH OILS   OR FRACTIONS OF HEADING","selected":false},
                                    {"value":"1511","label":"PALM OIL AND ITS FRACTION WHETHER  OR NOT REFINED, BUT NOT CHEMICALLY MODIFIED","selected":false},
                                    {"value":"1512","label":"SUNFLOWER-SEED, SAFFLOWER  OR COTTON SEED OIL AND FRACTIONS THEREOF, WHETHER OR NOT REFINED,BUT NOT CHEMICALLY MODIFIED.","selected":false},
                                    {"value":"1513","label":"COCONUT (COPRA), PALM KERNEL OR BABASSU OIL AND  FRACTIONS THEREOF, WHETHER OR   NOT REFINED BUT NOT CHEMICALLY MODIFIED.","selected":false},
                                    {"value":"1514","label":"RAPE, COLZA OR MUSTAR OIL AND FRACTION THEREOF, WHETHER OR NOT REFINED, BUT NOT CHEMICALLY MODIFIED.","selected":false},
                                    {"value":"1515","label":"OTHER FIXED VEGETABLE FATS AND OILS ( INCLUDING  JOJOBA OIL) AND THEIR FRACTIONS, WHETHER OR NOT REFINED, BUT NOT CHEMICALLY MODIFIED.","selected":false},
                                    {"value":"1516","label":"ANIMALS  OR VEGETABLE FATS AND OILS AND THEIR FRACTIONS, PARTLY OR WHOLLY HYDROGENATED, INTER-ESTERIFIED, RE-ESTERIFIED OR ELAIDINISED,WHETHER OR NOT REFINED, BUT NOT FURTHER PREPARED.","selected":false},
                                    {"value":"1517","label":"MARGARINE; EDIBLE MIXTURES OR PREPARATIONS OF ANIMAL OR VEGETABLE FATS OR OILS OR OF FRACTIONS OF DIFFERENT  FATS  OR OILS  OF THIS CHAPTER, OTHER THAN EDIBLE FATS OR OILS  OR THEIR FRACTIONS OF","selected":false},
                                    {"value":"1518","label":"ANIMAL OR VEGETABLE FATS AND OILS AND THEIR FRACTIONS BOILED OXIDISED, DEHYDRATED, SULPHURISED, BLOWN, POLYMERISED BY HEAT IN VACUUM OR IN INERT GAS OR OTHERWISE CHEMICALLY MODIFIED, EXCLUDING THOSE","selected":false},
                                    {"value":"1520","label":"GLYCEROL, CRUDE; GLYCEROL WATERS AND GLYCEROL LYES.","selected":false},
                                    {"value":"1521","label":"VEGETABLE WAXES  OTHER(THAN TRIGLYCERID ES),BEESWAX, OTHER INSECT WAXES AND SPERMACETI, WHETHER OR NOT REFINED OR COLOURED.","selected":false},
                                    {"value":"1522","label":"DEGRAS; RESIDUES RESULTING FROM THE TREATMENT OF FATTY SUBSTANCES OR ANIMAL OR VEGETABLE WAXES.","selected":false},
                                    {"value":"0506","label":"BONES AND HORN CORES, UNWORKED,DEFATTED, SIMPLY PREPARED (BUT NOT CUT TO SHAPE),TREATED WITH ACID OR DEGELATINISED; POWDER AND WASTE OF THESE PRODUCTS.","selected":false}
                                ]
                            }

                        }
                    ]
                }
            ],

            dashboard: {
                //data cube's uid
                uid: "UAE_FT",

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
                        id: 'TR-item-1',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#TR-item-1",
                        config: {
                            container: "#TR-item-1",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: 'Element',
                                valueDimensions: 'Value',
                                seriesDimensions: ['Element']
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {
                                chartObj: {
                                    chart: {
                                        type: "column"
                                    },
                                    tooltip: {
                                        valueSuffix: ' 1000 HA'
                                    }
                                }
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: ['indicator', 'year', 'domain', 'incomes', 'subregion'],
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {

                                        "Element": {
                                            "codes": [
                                                {
                                                    "uid": "UAE_Elements",
                                                    "codes": [
                                                        "5622",
                                                        "5922"
                                                    ]
                                                }
                                            ]
                                        },
                                        "ItemCODE": {
                                            "codes": [
                                                {
                                                    "uid": "HS",
                                                    "version" : "2012",
                                                    "codes": ["0102"]

                                                }
                                            ]
                                        }


                                    }
                                }
                            }

                        ]

                    },

/*
                    {
                        id: 'TR-item-2',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#TR-item-2",
                        config: {
                            container: "#TR-item-2",
                            adapter: {
                                type: "standard",
                                xDimensions: 'year',
                                yDimensions: 'element',
                                valueDimensions: 'value',
                                seriesDimensions: ['element']
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {
                                chartObj: {
                                    chart: {
                                        type: "column"
                                    },
                                    tooltip: {
                                        valueSuffix: ' 1000 HA'
                                    }
                                }
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: ['indicator', 'year', 'domain', 'incomes', 'subregion'],
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {

                                        "element": {
                                            "codes": [
                                                {
                                                    "uid": "UAE_Elements",
                                                    "codes": [
                                                        "5610",
                                                        "5910"
                                                    ]
                                                }
                                            ]
                                        },
                                        "item": {
                                            "codes": [
                                                {
                                                    "uid": "HS",
                                                    "version" : "2012",
                                                    "codes": ["0102"]

                                                }
                                            ]
                                        }


                                    }
                                }
                            }

                        ]

                    },

                    {
                        id: 'TR-item-3',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#TR-item-3",
                        config: {
                            container: "#TR-item-3",
                            adapter: {
                                type: "standard",
                                xDimensions: 'year',
                                yDimensions: 'element',
                                valueDimensions: 'value',
                                seriesDimensions: ['element']
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {
                                chartObj: {
                                    chart: {
                                        type: "column"
                                    },
                                    tooltip: {
                                        valueSuffix: ' 1000 HA'
                                    }
                                }
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: ['indicator', 'year', 'domain', 'incomes', 'subregion'],
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {

                                        "element": {
                                            "codes": [
                                                {
                                                    "uid": "UAE_Elements",
                                                    "codes": [
                                                        "5610",
                                                        "5710"
                                                    ]
                                                }
                                            ]
                                        },
                                        "item": {
                                            "codes": [
                                                {
                                                    "uid": "HS",
                                                    "version" : "2012",
                                                    "codes": ["0102"]

                                                }
                                            ]
                                        }


                                    }
                                }
                            }

                        ]

                    },

                    {
                        id: 'TR-item-4',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#TR-item-4",
                        config: {
                            container: "#TR-item-4",
                            adapter: {
                                type: "standard",
                                xDimensions: 'year',
                                yDimensions: 'element',
                                valueDimensions: 'value',
                                seriesDimensions: ['element']
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {
                                chartObj: {
                                    chart: {
                                        type: "column"
                                    },
                                    tooltip: {
                                        valueSuffix: ' 1000 HA'
                                    }
                                }
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: ['indicator', 'year', 'domain', 'incomes', 'subregion'],
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {

                                        "element": {
                                            "codes": [
                                                {
                                                    "uid": "UAE_Elements",
                                                    "codes": [
                                                        "5622",
                                                        "5722"
                                                    ]
                                                }
                                            ]
                                        },
                                        "item": {
                                            "codes": [
                                                {
                                                    "uid": "HS",
                                                    "version" : "2012",
                                                    "codes": ["0102"]

                                                }
                                            ]
                                        }


                                    }
                                }
                            }

                        ]
                    }*/
                ]
            }
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
    };

});