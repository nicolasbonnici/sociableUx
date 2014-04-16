$(document).ready(function() {
    // Load Ux component plugin
    var Ux = $.fn.userExperience();
    Ux.onLoad();
    
    $(document).ajaxStop(function() {
        Ux.onAjaxStop();
    });
    
    $(window).unload(function() { 
        Ux.onUnload();
    }); 
});