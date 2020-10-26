/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * us module
 */
define(['ojs/ojbootstrap', 'knockout', 'jquery',
    'ojs/ojcore', 'ojs/ojarraydataprovider', 'ojs/ojcontext', 'ojs/ojinputtext',
    'ojs/ojselectsingle', 'ojs/ojlabel', 'ojs/ojbutton'],
        function (Bootstrap, ko, $, oj, ArrayDataProvider, Context) {
            function UsContentViewModel() {
                var self = this;
                self.selectVal = ko.observable('1');
                self.inputValue = ko.observable();
                self.dynamicInputText = ko.observable();
                self.selectNumber = ko.observable(1);
                self.submittedValue = ko.observable();
                self.iObject = ko.observable();
                self.iObject = {value1: "", value2: "", value3: "", value4: "", value5: "", value6: ""};
                /*self.value2 = ko.observable();
                 self.value3 = ko.observable();
                 self.value4 = ko.observable();
                 self.value5 = ko.observable();
                 self.value6 = ko.observable();*/
                //self.selectedNumber = parseInt(self.selectNumber);
                var browsers = [
                    {value: '1', label: 'One'},
                    {value: '2', label: 'Two'},
                    {value: '3', label: 'Three'},
                    {value: '4', label: 'Four'},
                    {value: '5', label: 'Five'},
                    {value: '6', label: 'Six'},
                ];
                self.browsersDP = new ArrayDataProvider(browsers, {keyAttributes: 'value'});
                onChangeHandler = (function () {
                    self.selectedNumber = parseInt(self.selectVal);
                });

                self.buttonClick = function (event) {
                    if (event.currentTarget.id === 'Submit') {
                        /*
                         Get the values from the web form and send them to the bot
                         */
                        let data = {};
                        /*data.value1 = self.value1();
                         data.value2 = self.value2();
                         data.value3 = self.value3();
                         data.value4 = self.value4();
                         data.value5 = self.value5();
                         data.value6 = self.value6();*/
                        self.submittedValue(JSON.stringify(self.iObject));
                        //JQuery post call          
                        //$.post(webViewCallback, JSON.stringify(data));
                    } else {
                        /*
                         In case of cancel, return data object that has a status property for cancel only 
                         */
                        let data = {};
                        data.status = "cancel"
                        //JQuery post call          
                        //$.post(webViewCallback, JSON.stringify(data));
                    }
                    return true;
                }

                this.employees = ko.observableArray();

                /**
                 * @param {CustomEvent} event triggered when the button is selected 
                 */
                this.showEmployees = function (event) {
                    var buttonElement = event.target;
                    //buttonElement.disabled = true;
                    this.employees([]);
                    var busyContext = Context.getPageContext().getBusyContext();
                    var resolveBusyState = busyContext.addBusyState({description: "Fetching employees"});
                    var service = new EmployeeService();
                    service.getEmployees().then(function (list) {
                        this.employees(list)
                        buttonElement.disabled = false; //  it disables till it completes
                        resolveBusyState();
                    }.bind(this));
                     buttonElement.disabled = true;
                }.bind(this);

                /**
                 * Simulates an async remote service call
                 */
                function EmployeeService() {
                    /**
                     * @param {Promise} returns an array of employees
                     */
                    this.getEmployees = function () {
                        return new Promise(function (resolve) {
                            window.setTimeout(function () {
                                resolve([{name: 'Scooby-Doo'},
                                    {name: 'Shaggy Rogers'},
                                    {name: 'Fred Jones'},
                                    {name: 'Daphne Blake'},
                                    {name: 'Velma Dinkley'}]);
                            }, 4000);
                        });
                    }
                }
            }
            return UsContentViewModel;
        }
);

/*
 /*var userIdCount = 0;
 var users = ko.observableArray([
 {name: "Bert"},
 {name: "Charles"},
 {name: "Denise"}
 ]);
 self.dataProvider = new ArrayDataProvider(users, {keyAttributes: 'name'});
 this.removeUser = function (current) {
 users.remove(current.data);
 };
 this.addUser = function () {
 users.push({name: "User " + userIdCount++});
 };
 var model = new addUser();
 Bootstrap.whenDocumentReady().then(
 function () {
 ko.applyBindings(model, document.getElementById('form-container'));
 }
 );*/
/*$(document).ready(function () {
 self.dynamicInputText('<oj-label>Value:</oj-label><oj-input-text value="{{inputValue}}" id="dynInput"></oj-input-text>');
 });
 appController.jsko.bindingHandlers['dynamicHtml'] = {
 update: function (element, valueAccessor, bindingContext) {
 ko.utils.setHtml(element, valueAccessor());
 ko.applyBindingsToDescendants(bindingContext, element);
 }
 };
 Bootstrap.whenDocumentReady().then(
 function () {
 ko.applyBindings(new UsContentViewModel(), document.getElementById('dynContainer'));
 }
 );
 
 require(['ojs/ojbootstrap', 'knockout', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojbutton'],
 function (Bootstrap, ko, ArrayDataProvider) {
 function UsContentViewModel()        {
 var userIdCount = 0;
 var users = ko.observableArray([
 { name: "Bert" },
 { name: "Charles" },
 { name: "Denise" }
 ]);
 this.dataProvider = new ArrayDataProvider(users, {keyAttributes: 'name'});
 this.removeUser = function(event, current, bindingContext) {
 users.remove(current.data);
 };
 this.addUser = function() {
 users.push({ name: "User " + userIdCount++ });
 };
 };
 Bootstrap.whenDocumentReady().then(
 function () {
 ko.applyBindings(new UsContentViewModel(), document.getElementById('form-container'));
 }
 );
 });*/
