const Main = (function Main(){
    'use strict';

    const main = function(){
        Modules.FetchStages.fetchMostRecentStage()
            .then(Modules.UpdatePage.updatePage);
    };
    main();

}());
