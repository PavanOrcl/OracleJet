/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * employees module
 */
define(['ojs/ojcore', 'knockout',
    'ojs/ojarraydataprovider',
    'ojs/ojanimation',
    'ojs/ojpictochart',
    'ojs/ojradioset',
    'ojs/ojselectcombobox', 
    'ojs/ojchart',
    'ojs/ojinputText',
    'ojs/ojbutton',
    'ojs/ojdialog'],
        function (oj, ko, ArrayDataProvider, AnimationUtils) {
            /**
             * The view model for the main content view template
             */
            function employeesContentViewModel() {
                var self = this;
                var data = [{name: "Have Sleep Problems", shape: "human", count: 7, colour: "#ed6647"},
                    {name: "Sleep Well", shape: "human", count: 3}];

                self.getColor = function (index) {
                    return index === 0 ? '#ed6647' : '';
                };
                //self.dataProvider = ko.observableArray(data);
                self.dataProvider = new ArrayDataProvider(data, {keyAttributes: 'value'});

                self.handleNestedOpen = function () {
                    document.querySelector('#outerDialog').open();
                };
                self.handleOpen = function (event) {
                    var ui = event.detail;
                    //AnimationUtils['slideIn'](ui.element).then(ui.endCallback);
                    document.querySelector('#innerDialog').open();
                };
                self.handleOKClose = function () {
                    document.querySelector('#outerDialog').close();
                };
                self.handleOKClose2 = function () {
                    document.querySelector('#innerDialog').close();
                };


                self.fuelTypes = [{name: 'Bio-Diesel', abbr: 'BD'},
                    {name: 'Compressed Natural Gas', abbr: 'CNG'},
                    {name: 'Electric Charging', abbr: 'ELEC'},
                    {name: 'Ethanol', abbr: 'E85'},
                    {name: 'Hydrogen & Fuel Cell', abbr: 'HY'},
                    {name: 'Liquefied Natural Gas', abbr: 'LNG'},
                    {name: 'Liquefied Petroleum Gas', abbr: 'LPG'}
                ];

                //self.handleActivated = function (info) {
                    self.cityVal = ko.observable('San Jose');
                    self.chartType = ko.observable('pie');
                    self.selectVal = ko.observableArray(['CA']);
                    self.pieSeriesValue = ko.observableArray([]);
                    self.groupsValue = ko.observableArray(['Fuel Types']);
                    self.seriesValue = ko.observable();

                    // provide list of states for use in the select pulldown
                    self.States = [
                        {label: 'ALABAMA', value: 'AL'},
                        {label: 'ALASKA', value: 'AK'},
                        {label: 'AMERICAN SAMOA', value: 'AS'},
                        {label: 'ARIZONA', value: 'AZ'},
                        {label: 'ARKANSAS', value: 'AR'},
                        {label: 'CALIFORNIA', value: 'CA'},
                        {label: 'COLORADO', value: 'CO'},
                        {label: 'CONNECTICUT', value: 'CT'},
                        {label: 'DELAWARE', value: 'DE'},
                        {label: 'DISTRICT OF COLUMBIA', value: 'DC'},
                        {label: 'FEDERATED STATES OF MICRONESIA', value: 'FM'},
                        {label: 'FLORIDA', value: 'FL'},
                        {label: 'GEORGIA', value: 'GA'},
                        {label: 'GUAM', value: 'GU'},
                        {label: 'HAWAII', value: 'HI'},
                        {label: 'IDAHO', value: 'ID'},
                        {label: 'ILLINOIS', value: 'IL'},
                        {label: 'INDIANA', value: 'IN'},
                        {label: 'IOWA', value: 'IA'},
                        {label: 'KANSAS', value: 'KS'},
                        {label: 'KENTUCKY', value: 'KY'},
                        {label: 'LOUISIANA', value: 'LA'},
                        {label: 'MAINE', value: 'ME'},
                        {label: 'MARSHALL ISLANDS', value: 'MH'},
                        {label: 'MARYLAND', value: 'MD'},
                        {label: 'MASSACHUSETTS', value: 'MA'},
                        {label: 'MICHIGAN', value: 'MI'},
                        {label: 'MINNESOTA', value: 'MN'},
                        {label: 'MISSISSIPPI', value: 'MS'},
                        {label: 'MISSOURI', value: 'MO'},
                        {label: 'MONTANA', value: 'MT'},
                        {label: 'NEBRASKA', value: 'NE'},
                        {label: 'NEVADA', value: 'NV'},
                        {label: 'NEW HAMPSHIRE', value: 'NH'},
                        {label: 'NEW JERSEY', value: 'NJ'},
                        {label: 'NEW MEXICO', value: 'NM'},
                        {label: 'NEW YORK', value: 'NY'},
                        {label: 'NORTH CAROLINA', value: 'NC'},
                        {label: 'NORTH DAKOTA', value: 'ND'},
                        {label: 'NORTHERN MARIANA ISLANDS', value: 'MP'},
                        {label: 'OHIO', value: 'OH'},
                        {label: 'OKLAHOMA', value: 'OK'},
                        {label: 'OREGON', value: 'OR'},
                        {label: 'PALAU', value: 'PW'},
                        {label: 'PENNSYLVANIA', value: 'PA'},
                        {label: 'PUERTO RICO', value: 'PR'},
                        {label: 'RHODE ISLAND', value: 'RI'},
                        {label: 'SOUTH CAROLINA', value: 'SC'},
                        {label: 'SOUTH DAKOTA', value: 'SD'},
                        {label: 'TENNESSEE', value: 'TN'},
                        {label: 'TEXAS', value: 'TX'},
                        {label: 'UTAH', value: 'UT'},
                        {label: 'VERMONT', value: 'VT'},
                        {label: 'VIRGIN ISLANDS', value: 'VI'},
                        {label: 'VIRGINIA', value: 'VA'},
                        {label: 'WASHINGTON', value: 'WA'},
                        {label: 'WEST VIRGINIA', value: 'WV'},
                        {label: 'WISCONSIN', value: 'WI'},
                        {label: 'WYOMING', value: 'WY'}
                    ];

                    self.getData = function () {
                        // using a Promise to allow the chart to render only once the data is available.
                        self.seriesValue(new Promise(function (resolve, reject) {
                            var url = "https://api.data.gov/nrel/alt-fuel-stations/v1/nearest.json?location=" + self.cityVal() + "+" + self.selectVal() + "&api_key=<your api key goes here>"
                            $.getJSON(url).then(function (data) {
                                var fuels = data.station_counts.fuels;
                                var seriesData = [];
                                for (var prop in fuels) {
                                    if (fuels[prop].total > 0) {
                                        seriesData.push({name: getFuelName(prop), items: [fuels[prop].total]})
                                    }
                                }
                                resolve(seriesData);
                            });
                        }))
                    };

                    // get the long name of the fuel type from the abbreviate returned by the REST service
                    var getFuelName = function (prop) {
                        for (var i in fuelTypes) {
                            if (fuelTypes[i].abbr === prop)
                                return fuelTypes[i].name;
                        }
                    }
                //};


                self.handleAttached = function (info) {
                    // once the DOM is available, call the getData to load defaults
                    self.getData();
                };


            }
            return employeesContentViewModel;
        });
