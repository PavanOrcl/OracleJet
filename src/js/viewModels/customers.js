/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define(['accUtils', 
    'knockout', 
    'ojs/ojcore', 
    'ojs/ojdatetimepicker', 
    'ojs/ojnavigationlist',
    'ojs/ojswitcher',
    'ojs/ojradioset',
    'ojs/ojlabel'],
        function (accUtils, ko, oj, DateTimeRangeValidator) {
            function CustomerViewModel() {
                var self = this;
                self.date = ko.observable();
                self.selectedItem = ko.observable('blogs');
                self.currentEdge = ko.observable('top');
                this.valueChangedHandler = function (event) {
                    var value = event.detail.value;
                    var previousValue = event.detail.previousValue;
                    var demoContianer = document.getElementById('demo-container');
                    demoContianer.className = demoContianer.className.replace('demo-edge-' + previousValue, 'demo-edge-' + value);
                  };
                  // Populate some content
                self.tabContentNodes = document.querySelectorAll('.demo-tab-content');
                self.textNode = document.createElement('p');
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
                    accUtils.announce('Customers page loaded.', 'assertive');
                    document.title = "Customers";
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
            return CustomerViewModel;
        }
);
