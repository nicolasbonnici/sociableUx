$(document).ready(function() {
    // Load Ux component plugin
    $.fn.userExperience().onLoad();
    
    $(document).ajaxStop(function() {
        $.fn.userExperience().onAjaxStop();
    });
    
    $(window).unload(function() { 
        $.fn.userExperience().onUnload();
    }); 
});