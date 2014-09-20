/**
 * Asynchrone upload client component
 * 
 * @author Nico <nicolasbonnici@gmail.com>
 */

(function($) {
    $.fn.upload = function(params) {
        var uploader =  {
            init: function() {
                
                // Init file input
                $('.ui-fileinput').bootstrapFileInput();
            }
        };

        return uploader;
    };
})(jQuery);
