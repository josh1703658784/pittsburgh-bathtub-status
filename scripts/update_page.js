Modules.UpdatePage = (function(){
    'use strict';

    const $$ = {
        status_div: $("#status-div"),
    };

    const isBathtubFlooded = function(stageMeasurement, measurementUnits){
        const floodStage = 25;
        const floodUnits = "ft";

        if(measurementUnits !== floodUnits){
            throw "the units do not match!"
        }

        return stageMeasurement >= floodStage 
    };


    const writeStatusToPage = function(isBathtubFlooded){
        if(isBathtubFlooded){
            $$.status_div.html("yeah");
        }else{
            $$.status_div.html("nope");
        }
        
    }

    const updatePage = function(stageObj){
        const { observedStage, stageUnits, timezone, time } = stageObj;
        const isFlooded = isBathtubFlooded(observedStage, stageUnits);
        writeStatusToPage(isFlooded);

    };



    const main = function(){
        return {
            updatePage: updatePage,
        };
    };
    return main();

}());


