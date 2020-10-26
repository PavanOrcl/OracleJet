/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define(['accUtils', 'knockout', 'ojs/ojbootstrap', 'ojs/ojmodule-element-utils', 'ojs/ojlogger', 'ojs/ojcore',
    'ojs/ojarraydataprovider', 'ojs/ojarraytreedataprovider',
    'ojs/ojarraytabledatasource', 'factories/CountryFactory',
    'ojs/ojcollectiontabledatasource', 'ojs/ojgauge', 'ojs/ojtable',
    'ojs/ojtreeview', 'ojs/ojmenu', 'ojs/ojfilmstrip', 'ojs/ojradioset'],
        function (accUtils, ko, Bootstrap, ModuleElementUtils,
                Logger, oj, ArrayDataProvider, ArrayTreeDataProvider,
                ArrayTableDataSource, CountryFactory) {
            function AboutViewModel() {
                var self = this;
                self.value8 = ko.observable(80);
                self.label = {text: "Sales"};
                self.transientValue = ko.observable();
                var deptArray = [{DepartmentId: 3, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300},
                    {DepartmentId: 5, DepartmentName: 'BB', LocationId: 200, ManagerId: 300},
                    {DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300},
                    {DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300},
                    {DepartmentId: 6011, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300},
                    {DepartmentId: 312022, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300},
                    {DepartmentId: 313022, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300}];
                self.dataprovider = new ArrayDataProvider(deptArray, {keyAttributes: 'DepartmentId', implicitSort: [{attribute: 'DepartmentId', direction: 'ascending'}]});

                self.datas = ko.observableArray();
                $.getJSON("https://restcountries.eu/rest/v2/all").
                        then(function (countries) {
                            tempArray = [];
                            $.each(countries, function () {
                                tempArray.push({
                                    name: this.name,
                                    population: this.population,
                                    capital: this.capital
                                });
                            });
                            self.datas(tempArray);
                        });
                self.dataSourceProvider = new oj.ArrayTableDataSource(self.datas, {idAttribute: 'name'});
                //self.dataSourceProvider = new ArrayDataProvider(deptArray, {keyAttributes: 'DepartmentId', implicitSort: [{attribute: 'DepartmentId', direction: 'ascending'}]});
                // Table 3 : 
                self.countryCollection = CountryFactory.createCountryCollection();
                self.dataSourceModel = ko.observable();
                self.dataSourceModel(new oj.CollectionTableDataSource(self.countryCollection));

                // Data Source : 
                var treeData = [
                    {"title": "News", "id": "news"},
                    {"title": "Blogs", "id": "blogs",
                        "children": [{"title": "Today", "id": "today"},
                            {"title": "Yesterday", "id": "yesterday"},
                            {"title": "Archive", "id": "archive"}
                        ]
                    },
                    {"title": "Links", "id": "links",
                        "children": [{"title": "Oracle", "id": "oracle",
                                "children": [
                                    {"title": "USA", "id": "usa",
                                        "children": [
                                            {"title": "Northeast", "id": "northeast"},
                                            {"title": "Midwest", "id": "midwest"},
                                            {"title": "South", "id": "south"},
                                            {"title": "West", "id": "west"}
                                        ]
                                    },
                                    {"title": "Europe", "id": "europe"},
                                    {"title": "Asia", "id": "asia",
                                        "children": [
                                            {"title": "Japan", "id": "japan"},
                                            {"title": "China", "id": "china"},
                                            {"title": "India", "id": "india"}
                                        ]
                                    }
                                ]
                            },
                            {"title": "IBM", "id": "ibm"},
                            {"title": "Microsoft", "id": "microsoft"}
                        ]
                    }
                ];
                self.data = new ArrayTreeDataProvider(treeData, {keyAttributes: 'id'});
                self.selectedMenuItem = ko.observable('(None selected yet)');
                self.currentKey = null;
                self.menuBeforeOpen = function (event) {
                    var target = event.detail.originalEvent.target;
                    var treeView = document.getElementById('treeview');
                    var context = treeView.getContextByNode(target);
                    self.currentKey = context ? context.key : treeView.currentItem;
                }.bind(this);

                self.menuAction = function (event) {
                    var text = event.target.textContent;
                    self.data.fetchByKeys({keys: new Set([this.currentKey])}).then(function (e) {
                        if (e.results.get(this.currentKey)) {
                            this.selectedMenuItem(text + ' from ' + e.results.get(this.currentKey).data.title);
                        }
                    }.bind(this));
                }.bind(this);
                // Film Strip : 
                self.currentNavArrowPlacement = ko.observable('adjacent');
                self.currentNavArrowVisibility = ko.observable('auto');
                self.chemicals = [
                    {name: 'Hydrogen'},
                    {name: 'Helium'},
                    {name: 'Lithium'},
                    {name: 'Beryllium'},
                    {name: 'Boron'},
                    {name: 'Carbon'},
                    {name: 'Nitrogen'},
                    {name: 'Oxygen'},
                    {name: 'Fluorine'},
                    {name: 'Neon'},
                    {name: 'Sodium'},
                    {name: 'Magnesium'}
                ];
                self.getItemInitialDisplay = function (index) {
                    return index < 3 ? '' : 'none';
                };

                self.selectVal = ko.observable('pie');

                // Incidents Module : 
                //var animals = new ArrayDataProvider(JSON.parse(animalData), {keyAttributes: 'name'});
                //self.IncidentsViewModel = {animals: animals}; // view model  for the table
                // load view and update module config
                //All Files	C:\Users\pkmaturi\Desktop\Desktop\OJET\projects\myapp\src\js\views\incidents.html
                /*self.viewPromise = ModuleElementUtils.createView({'viewPath': 'views/incidents.html'});
                self.IncidentsViewModel = ModuleElementUtils.createView({'viewModelPath': 'viewModels/incidents.js'});
                this.incidentsModuleConfig = self.viewPromise.then(
                        function (incidentsView) {
                            return {'view': incidentsView, 'viewModel': self.IncidentsViewModel};
                        }.bind(this),
                        function (error) {
                            Logger.error('Error during loading view: ' + error.message);
                            return {'view': []};
                        }
                );*/
                self.ModuleElementUtils = ModuleElementUtils;
                //create oj-module config as an observable and initialize it with empty values
                //self.incidentsModuleConfig = ko.observable({'view': [], 'viewModel': null});
                //create view and view model, mutate configuration object to update oj-module content
                /*var masterPromise = Promise.all([
                 ModuleElementUtils.createView({'viewPath': 'views/incidents.htmll'}),
                 ModuleElementUtils.createViewModel({'viewModelPath': 'viewModels/incidents.js'})
                 ]);
                 masterPromise.then(
                 function (values) {
                 self.moduleConfig({'view': values[0], 'viewModel': values[1]});
                 }
                 );*/
                //self.dataprovider = new oj.ArrayTableDataSource(deptArray, {keyAttributes: 'DepartmentId', implicitSort: [{attribute: 'DepartmentId', direction: 'ascending'}]});
                // Below are a set of the ViewModel methods invoked by the oj-module component.
                // Please reference the oj-module jsDoc for additional information.

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * This method might be called multiple times - after the View is created
                 * and inserted into the DOM and after the View is reconnected
                 * after being disconnected.
                 */
                this.connected = () => {
                    accUtils.announce('About page loaded.', 'assertive');
                    document.title = "About";
                    // Implement further logic if needed
                };

                /**
                 * Optional ViewModel method invoked after the View is disconnected from the DOM.
                 */
                this.disconnected = () => {
                    // Implement if needed
                };

                /**
                 * Optional ViewModel method invoked after transition to the new View is complete.
                 * That includes any possible animation between the old and the new View.
                 */
                this.transitionCompleted = () => {
                    // Implement if needed
                };
            }

            /*
             * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
             * return a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.
             */
            /*console.log(document.getElementById('aboutDiv'));
             Bootstrap.whenDocumentReady().then(function () {
             ko.applyBindings(new AboutViewModel(), document.getElementById('filmStripDiv'));
             });*/
            return AboutViewModel;
        }
);
