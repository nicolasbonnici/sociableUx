/**
 * Carousel client component jQuery plugin
 * 
 * @author Nico <nicolasbonnici@gmail.com>
 */

(function($) {
    $.fn.Carousel = function(params) {
        return {
            /**
             * ContentFlow carousel
             * @see contentflow plugin
             */
            initContentFlow: function() {
                $('.ui-contentflow').each( function() {
                    if ($(this).attr('id') === 'undefined') {
//                        Ux.sendNotification(
//                                        'No id attribute on a ui-contentflow widget!',
//                                        'error',
//                                        'glyphicon glyphicon-error-sign',
//                                        false);
                    } else {
                        var sNodeId = $(this).attr('id');

                        var sConnectedCarousel = null;
                        if (typeof $(this).data('connected-carousel') !== 'undefined') {
                            sConnectedCarousel = $(this).data('connected-carousel');
                        }

                        var oContentFlow = new ContentFlow(
                                sNodeId,
                                {
                                    visibleItems : 10,
                                    endOpacity : 0.6,
                                    startItem : $(
                                            '#'
                                                    + sNodeId
                                                    + ' div[data-carousel=2]')
                                            .index(),
                                    maxItemHeight : 240,
                                    scaleFactorLandscape : 1,
                                    onReachTarget : function(item) {
                                        // Show details
                                        $('.details')
                                                .addClass(
                                                        'hide');
                                        $(
                                                $(
                                                        '#'
                                                                + sNodeId
                                                                + ' div.item')
                                                        .eq(
                                                                item.index)
                                                        .data(
                                                                'toggle-selector'))
                                                .toggleClass(
                                                        'hide');
                                    },
                                    onclickActiveItem : function(item) {
                                        if (sConnectedCarousel !== null) {
                                            $(
                                                    sConnectedCarousel)
                                                    .carousel(
                                                            $(
                                                                    '#'
                                                                            + sNodeId
                                                                            + ' div.item')
                                                                    .eq(
                                                                            item.index)
                                                                    .data(
                                                                            'carousel'));
                                        }
                                    },
                                    onclickInactiveItem : function(item) {
                                        if (sConnectedCarousel !== null) {
                                            $(
                                                    sConnectedCarousel)
                                                    .carousel(
                                                            $(
                                                                    '#'
                                                                            + sNodeId
                                                                            + ' div.item')
                                                                    .eq(
                                                                            item.index)
                                                                    .data(
                                                                            'carousel'));
                                        }

                                    }
                                });

                        if (typeof $(this).data('connected-carousel') !== 'undefined') {
                            $(sConnectedCarousel).data('contentflow', oContentFlow);
                        }

                    }
                });
            }
        }
    
    };
})(jQuery);
