Modules.FetchStages = (function(){
    'use strict';


    const parseObservedEntry = function(observedEntryObj){
        return {
              observedStage : parseInt(observedEntryObj.primary.__text)
            , stageUnits    : observedEntryObj.primary._units 
            , timezone      : observedEntryObj.valid._timezone
            , time          : Date.parse(observedEntryObj.valid.__text)
        };
    };


    const xmlDocumentToString = function(xmlDocument){
        return new XMLSerializer().serializeToString(xmlDocument);
    };


    const xmlStringToJson = function(xmlString){
        return new X2JS().xml_str2json(xmlString);
    };


    const getDatumKeyFromXmlJson = function(xmlJson){
        return xmlJson.site.observed.datum;
    };

    const parseObservedEntries = function(datum){
        return _.map(datum, parseObservedEntry);
    };


    const handleStageData = function(xmlDocument){
        const handlerFn = _.compose(  parseObservedEntries
                                    , getDatumKeyFromXmlJson
                                    , xmlStringToJson
                                    , xmlDocumentToString);

        return handlerFn(xmlDocument);
    };


    const failureHandler = function(error, message){
        console.error(error);
    };


    const fetchStages = function(){
        const ajaxOptions = {
            url: "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=pttp1&output=xml",
            dataType: "xml",
        };

        return $.ajax(ajaxOptions)
                .then(handleStageData)
                .catch(failureHandler);
    };


    const fetchMostRecentStage = function(){
        return fetchStages()
                .then(_.first);
    };


    const main = function(){
        return {
            fetchMostRecentStage: fetchMostRecentStage,
        };
    }
    return main();

}());



