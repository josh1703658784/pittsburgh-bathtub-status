const Main = (function Main(){
    'use strict';
    // Load any app-specific modules
    // with a relative require call,
    // like:
    //var messages = require('./messages');

    // Load library/vendor modules using
    // full IDs, like:
    //var print = require('print');

    //print(messages.getHello());

    const main = function(){
        Modules.FetchStages.fetchMostRecentStage()
            .then(Modules.UpdatePage.updatePage);
        
    };
    main();

}());
