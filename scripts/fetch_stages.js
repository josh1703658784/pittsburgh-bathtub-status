Modules.FetchStages = (function(){
    'use strict';


    const parseObservedEntry = function(observedEntryObj){
        return {
            observedStage: parseInt(observedEntryObj.primary.__text),
            stageUnits: observedEntryObj.primary._units, 
            timezone: observedEntryObj.valid._timezone,
            time: Date.parse(observedEntryObj.valid.__text),
        };
    };


    const handleStageData = function(xmlDocument){
        const xmlString = (new XMLSerializer()).serializeToString(xmlDocument);
        const x2js = new X2JS();
        const xmlAsJson = x2js.xml_str2json( xmlString ).site.observed.datum;

        const result = _.chain(xmlAsJson)
            .map(parseObservedEntry)
            .value();

        return result;
    };


    const failureHandler = function(error, message){
        console.error(error);
    };


    const fetchStages = function(){
        console.log("fetching river stages");

        const stageDataUrl = "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=pttp1&output=xml"

        return $.ajax({
            url: stageDataUrl,
            dataType: "xml",
        }).then(handleStageData)
          .catch(failureHandler);
    };


    const fetchMostRecentStage = function(){
        return fetchStages().then(stagesArr => _.first(stagesArr));
    };


    const main = function(){
        return {
            fetchStages: fetchStages,
            fetchMostRecentStage: fetchMostRecentStage,
        };
    }
    return main();

}());



