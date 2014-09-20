/**
 * Geolocation client component
 * 
 * @author Nico <nicolasbonnici@gmail.com>
 */

(function($) {
    $.fn.Geolocation = function(params) {
        return {
            
            /**
             * Geolocation map container id 
             * @var string
             */
            sGeoMapId: 'geolocation_map',
            
            /**
             * Geolocation logs container id 
             * @var string
             */
            sGeoLogId: 'geolocation_log',
                    
            /**
             * Instance constructor
             */
            construct: function() {
                $('ux-content').append('<div class="container-fluid">' +
                                            '<div class="row">' +
                                                '<div id="' + this.sGeoMapId + '" class="col-md-12"></div>' +
                                            '</div' +
                                            '<div id="' + this.geolocation_log + '" class="col-md-12 hidden"></div>'
                                       '</div>');
                $('ux-content').append();
                
                this.getLocation();
            },
    
            /**
             * Render a location on a google map
             */
            showPosition(position) {
                var sLatLong = position.coords.latitude + "," + position.coords.longitude;
                var sImgUrl = "http://maps.googleapis.com/maps/api/staticmap?center=" + sLatLong + "&zoom=14&size=400x300&sensor=false";
                document.getElementById( this.sGeoMapId ).innerHTML = "<img src='" + sImgUrl + "'>";
            },
            
            /**
             * Geolocalize user
             */
            getLocation: function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition,showError);
                } else {
                    // @todo modal
                    alert("Geolocation is not supported by this browser.");
                }
            },
            
            /**
             * Geolocation error handling
             */
            showError: function(error) {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        $()"User denied the request for Geolocation."
                        break;
                    case error.POSITION_UNAVAILABLE:
                        x.innerHTML = "Location information is unavailable."
                        break;
                    case error.TIMEOUT:
                        x.innerHTML = "The request to get user location timed out."
                        break;
                    case error.UNKNOWN_ERROR:
                        x.innerHTML = "An unknown error occurred."
                        break;
                }
            }
        
        };

    };
})(jQuery);
