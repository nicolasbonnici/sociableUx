/**
 * Charts client component jQuery plugin
 * @author Nico <nicolasbonnici@gmail.com>
 */

(function($) {
        $.fn.Charts = function(params) {

            var oCharts = {
                /**
                 * Charts color sheme
                 * @var array
                 */
                chartColours: ['#88bbc8', '#ed7a53', '#9FC569', '#bbdce3', '#9a3b1b', '#5a8022', '#2c7282'],
                
                /**
                 * initCharts
                 */
                initCharts: function() {

                    $('.ui-chart').each(function() {
                        
                        if (! $(this).data('chartsFired')) {
                            
                            //graph options
                            var options = {
                                grid: {
                                    show: true,
                                    aboveData: true,
                                    color: "#3f3f3f" ,
                                    labelMargin: 5,
                                    axisMargin: 0, 
                                    borderWidth: 0,
                                    borderColor:null,
                                    minBorderMargin: 5 ,
                                    clickable: true, 
                                    hoverable: true,
                                    autoHighlight: true,
                                    mouseActiveRadius: 20
                                },
                                series: {
                                    grow: {
                                        active: false,
                                        stepMode: "linear",
                                        steps: 50,
                                        stepDelay: true
                                    },
                                    lines: {
                                        show: true,
                                        fill: true,
                                        lineWidth: 4,
                                        steps: false
                                        },
                                    points: {
                                        show:true,
                                        radius: 5,
                                        symbol: "circle",
                                        fill: true,
                                        borderColor: "#fff"
                                    }
                                },
                                legend: { 
                                    position: "ne", 
                                    margin: [0,-25], 
                                    noColumns: 0,
                                    labelBoxBorderColor: null,
                                    labelFormatter: function(label, series) {
                                        // just add some space to labes
                                        return label+'&nbsp;&nbsp;';
                                     }
                                },
                                yaxis: { min: 0 },
                                xaxis: {ticks:11, tickDecimals: 0},
                                colors: oCharts.chartColours,
                                shadowSize:1,
                                tooltip: true, //activate tooltip
                                tooltipOpts: {
                                    content: "%s : %y.0",
                                    shifts: {
                                        x: -30,
                                        y: -50
                                    }
                                }
                            };   
    
                            $.plot($(this), [ 
                                {
                                    label: "Visits", 
                                    data: [[1, 3 + oCharts.randNum()], [2, 6 + oCharts.randNum()], [3, 9 + oCharts.randNum()], [4, 12 + oCharts.randNum()],[5, 15 + oCharts.randNum()],[6, 18 + oCharts.randNum()],[7, 21 + oCharts.randNum()],[8, 15 + oCharts.randNum()],[9, 18 + oCharts.randNum()],[10, 21 + oCharts.randNum()],[11, 24 + oCharts.randNum()],[12, 27 + oCharts.randNum()],[13, 30 + oCharts.randNum()],[14, 33 + oCharts.randNum()],[15, 24 + oCharts.randNum()],[16, 27 + oCharts.randNum()],[17, 30 + oCharts.randNum()],[18, 33 + oCharts.randNum()],[19, 36 + oCharts.randNum()],[20, 39 + oCharts.randNum()],[21, 42 + oCharts.randNum()],[22, 45 + oCharts.randNum()],[23, 36 + oCharts.randNum()],[24, 39 + oCharts.randNum()],[25, 42 + oCharts.randNum()],[26, 45 + oCharts.randNum()],[27,38 + oCharts.randNum()],[28, 51 + oCharts.randNum()],[29, 55 + oCharts.randNum()], [30, 60 + oCharts.randNum()]],
                                    lines: {fillColor: "#f2f7f9"},
                                    points: {fillColor: "#88bbc8"}
                                }, 
                                {   
                                    label: "Unique Visits", 
                                    data: [[1, oCharts.randNum()-5], [2, oCharts.randNum()-4], [3, oCharts.randNum()-4], [4, oCharts.randNum()],[5, 4 + oCharts.randNum()],[6, 4 + oCharts.randNum()],[7, 5 + oCharts.randNum()],[8, 5 + oCharts.randNum()],[9, 6 + oCharts.randNum()],[10, 6 + oCharts.randNum()],[11, 6 + oCharts.randNum()],[12, 2 + oCharts.randNum()],[13, 3 + oCharts.randNum()],[14, 4 + oCharts.randNum()],[15, 4 + oCharts.randNum()],[16, 4 + oCharts.randNum()],[17, 5 + oCharts.randNum()],[18, 5 + oCharts.randNum()],[19, 2 + oCharts.randNum()],[20, 2 + oCharts.randNum()],[21, 3 + oCharts.randNum()],[22, 3 + oCharts.randNum()],[23, 3 + oCharts.randNum()],[24, 2 + oCharts.randNum()],[25, 4 + oCharts.randNum()],[26, 4 + oCharts.randNum()],[27,5 + oCharts.randNum()],[28, 2 + oCharts.randNum()],[29, 2 + oCharts.randNum()], [30, 3 + oCharts.randNum()]],
                                    lines: {fillColor: "#fff8f2"},
                                    points: {fillColor: "#ed7a53"}
                                } 

                            ], options);
                            $(this).data('chartsFired', true);
                        }
                        
                    });

                },
                
                /**
                 * Temprary method to return randomNumber
                 * @return integer
                 */
                randNum: function(){
                    return (Math.floor( Math.random()* (1+40-20) ) ) + 20;
                }

            };

            //~ // Permettre le chainage par jQuery
            return oCharts;
        };
})(jQuery);

