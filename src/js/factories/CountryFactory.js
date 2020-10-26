define(['ojs/ojcore', 'ojs/ojmodel'], function (oj, Mod) {
    var CountryFactory = {
        resourceUrl: 'https://restcountries.eu/rest/v2/all',
        // Create a single country instance:
        createCountryModel: function () {
            var Country = Mod.Model.extend({
                urlRoot: this.resourceUrl,
                idAttribute: "name"
            });
            return new Country();
        },
        // Create a country collection:
        createCountryCollection: function () {
            var Countries = Mod.Collection.extend({
                url: this.resourceUrl,
                model: this.createCountryModel()
            });
            return new Countries();
        }
    };
    return CountryFactory;
});