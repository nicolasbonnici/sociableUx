$(document).ready(function() {
    // Load Ux component plugin
    var Ux = $.fn.userExperience();
    // Asynch load the view
    Ux.loadView();
    
    // Fire the Ux and also after XHR requests
    Ux.fireUx();
    $(document).ajaxStop(function() {
        Ux.fireUx();
    });
});