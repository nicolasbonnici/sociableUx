/**
 * Carousel client component jQuery plugin
 * 
 * @author Nico <nicolasbonnici@gmail.com>
 */

(function($) {
    $.fn.Carousel = function(params) {
        return {

            /**
             * Init carousel component
             */
            init : function() {
                // init carousel
                $('.ui-carousel').each(function() {
                    if (!$(this).data('carouselFired')) {
                        var iAutoplay = (($(this).hasClass('noAutoplay')) ? 0 : 5000);
                        $(this).carousel({
                            interval : iAutoplay,
                            duration : 500
                        });
                        $(this).data('carouselFired', true);
                    }
                });
            }
            
        }
    
    };
})(jQuery);
