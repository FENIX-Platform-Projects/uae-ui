define([
    'fenix-ui-topmenu/main',
    'root/DataEdit'
], function(  TopMenu, DataEdit ){

    function Host(){}

    Host.prototype.initFenixComponent = function(){

        new TopMenu({ 
            url : 'json/fenix-ui-topmenu_config.json'
            , active: "administration"
        });

        DataEdit.init();

    };

    return Host;
	
});