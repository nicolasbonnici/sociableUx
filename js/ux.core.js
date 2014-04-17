/**
 * User Experience client component jQuery plugin
 * @author Nico <nicolasbonnici@gmail.com>
 */

(function($) {
        $.fn.userExperience = function(params) {
            var Ux = {
                initAppLayout: function() {
                    //*************************************************** @layout *************************************************
                    // @see init layout application level (aka BO)
                    if ($('body').hasClass('layout') && !$('body').data('ui-layout-loaded')) {

                        $('body').data('ui-layout-loaded', true);
                        
                        this.appLayout = $('body').layout({
                            useStateCookie: true,
                            cookie: {
                                name:   "sociable.ux.layout", // optional
                                expires: 90 // days
                            },
                            defaults: {
                                applyDefaultStyles: false,
                                fxName: 'drop',
                                fxSpeed: 300,
                                spacing_closed: 50,
                                spacing_open: 10,
                                resizerTip: 'Ouvrir/fermer',
                                sliderTip: 'Redimmensionner',
                                fxSettings_open: { easing: 'easeOutBounce' },
                                fxSettings_close: { easing: 'easeOutBounce' },
                                enableCursorHotkey: false
                            },
                            center: {
                                applyDefaultStyles: false,
                                spacing_closed: 0,
                                spacing_open: 0,
                                size: '100%'
                            },
                            north: {
                                applyDefaultStyles: false,
                                showOverflowOnHover: true,
                                spacing_closed: 0,
                                spacing_open: 0,
                                togglerLength_open: 0,
                                size: 50,
                                initClosed: false
                            },
                            south: {
                                applyDefaultStyles: false,
                                spacing_closed: 0,
                                spacing_open: 0,
                                size: 90,
                                togglerLength_closed: "100%",
                                togglerLength_open: 50,
                                initClosed:    true,
                                onopen_end: function() {
                                    return false;
                                },
                                onclose_end: function() {
                                    return false;
                                }
                            },
                            east: {
                                size:  150,
                                applyDefaultStyles: false,
                                initClosed: true,
                                togglerLength_closed: 0,
                                togglerLength_open: 0,
                                spacing_open: 0,
                                spacing_closed: 0,
                                onopen_end: function() {
                                },
                                onclose_end: function() {
                                }
                            },
                            west: {
                                size: 320,
                                applyDefaultStyles: false,
                                spacing_open: 0,
                                spacing_closed: 0,
                                togglerLength_closed: 0,
                                initClosed: true,
                                slideTrigger_close: 'mouseout',
                                slideTrigger_open: 'mouseover',                                             
                                onopen_end: function() {
                                },
                                onclose_end: function() {
                                }                                    
                            }                                    
                        });
                        // toggle panes
                        $('body').on('click', '.ui-pane-toggle', function() {
                            
                            if (typeof($(this).attr('data-pane')) !== 'undefined') {
                                Ux.appLayout.toggle($(this).attr('data-pane'));
                            }
                        });                           
                        // open panes
                        $('body').on('click', '.ui-pane-open', function() {
                            
                            if (typeof($(this).attr('data-pane')) !== 'undefined') {
                                Ux.appLayout.open($(this).attr('data-pane'));
                            }
                        });                           
                        // close panes
                        $('body').on('click', '.ui-pane-close', function() {
                            
                            if (typeof($(this).attr('data-pane')) !== 'undefined') {
                                Ux.appLayout.close($(this).attr('data-pane'));
                            }
                            
                        });                           
                        // show panes
                        $('body').on('click', '.ui-pane-show', function() {
                            if (typeof($(this).attr('data-pane')) !== 'undefined') {
                                alert('ok');
                                Ux.appLayout.show($(this).attr('data-pane')); 
                            }
                            
                        });                           
                        // Pin button
                        if ( $('.ui-pane-pin').size() != 0 ) {    
                            this.appLayout.addPinBtn('.ui-pane-pin', $('.ui-pane-pin').attr('data-pane'));
                        }
                    }   
                        
                },
                
                toggle: function($oItem) {
                    $oItem.togglrClass('hide');
                },
                
                /**
                 * Send a notification
                 * 
                 * @param string sText        Notification content
                 * @param string sType        info|warning|error|success
                 * @param string sIcon        Icon class
                 * @param bCustom
                 * 
                 * @return $.pnotify          pnotify jQuery plugin object
                 */
                sendNotification: function(sText, sType, sIcon, bCustom) {
                    var sClass = '';
                    if (bCustom === true) {
                        sClass = 'ui-notification';
                    }
                    return $.pnotify({
                        text : sText,
                        type : sType,
                        icon : sIcon,
                        opacity: 1,
                        nonblock: true,
                        nonblock_opacity: .2,
                        history: false,
                        addclass: ((sClass.length > 0) ? (' ' + sClass) : ''),
                        //stack: stack_bottomright
                    });                    
                },     
                
                hideNotifications: function() {
                    $.pnotify_remove_all();
                },
                
                /**
                 * Format timestamp to date dynamicaly
                 * @todo i18n support
                 */
                formatTimestamps: function() {
                    $('.ui-timestamp').each(function() {   
                        if (!$(this).data('formatTimestampFired')) {
                            
                            var iTimestamp = parseInt($(this).attr('data-timestamp'));
                            var oDate = new Date(iTimestamp*1000);
                            var sFormatedDateTime = '<span class="glyphicon glyphicon-calendar"></span> ' + oDate.toLocaleDateString() + ' <span class="glyphicon glyphicon-time"></span> ' + oDate.toLocaleTimeString();
                            $(this).empty().append(sFormatedDateTime).data('iTimestamp', iTimestamp);
                            
                            $(this).data('formatTimestampFired', true);
                        }
                    });
                },                
                
                /**
                 * wysiwyg editor
                 * @todo test $.fn.summernote first
                 */ 
                initEditors: function() {
                    if ($('.ui-editor').size() > 0) {
                        $('.ui-editor').summernote({
                            height: 350,
                            focus: true
                        });
                    }
                },                              
                
                /**
                 * @dependancy bootstrap-editable plugin
                 * @todo debugger et passer proprement les params en fonctions des differents types d'instance du plugin
                 */
                initEditableElements: function() {
                    if ($('.ui-editable').size() > 0 && typeof($.fn.editable) !== 'undefined') {
                        
                        // @see setup editable plugin
                        $.fn.editable.defaults.mode = 'inline';
                        $.fn.editable.inputs = '<form class="form-inline editableform margin">' +
                                                    '<div class="control-group">' +
                                                        '<div class="editable-input input-lg form-control"></div>' +
                                                        '<div class="editable-buttons"></div></div>'+
                                                        '<div class="editable-error-block"></div>' +
                                                   '</div>'+
                                               '</form>';
                        $.fn.editableform.buttons = '<button type="submit" class="btn btn-lg btn-primary editable-submit">Ok</button><button type="button" class="btn btn-lg btn-default editable-cancel">Annuler</button>';
                        
                        $('.ui-editable').each(function() {
                            var sUrl = '';
                            if (
                                typeof($(this).data('bundle')) !== 'undefined' && 
                                typeof($(this).data('controller')) !== 'undefined' && 
                                typeof($(this).data('action')) !== 'undefined' 
                            ) {
                                sUrl = '/'+$(this).data('bundle')+'/'+$(this).data('controller')+'/'+$(this).data('action');
                            } else if (typeof($(this).data('url')) !== 'undefined') {
                                sUrl = $(this).data('url');
                            } else {
                                sUrl = $(this).attr('href');
                            }
                            
                            var oOpts = {
                                    ajaxOptions: {
                                        dataType: 'json'
                                    },
                                    params: function (params) {
                                        params.entity = $(this).data('entity');
                                        return params;
                                    },
                                    url: sUrl,
                                    placement: 'bottom',
                                    placeholder: $(this).data('placeholder'),
                                    inputclass: 'form-control input-lg',
                                    success: function(rep) {
                                        switch(rep.status) {
                                            case 1:
                                                Ux.sendNotification(rep.content, 'success', 'glyphicon glyphicon-ok', false);
                                                break;
                                            case 2:
                                                Ux.sendNotification(rep.content, 'error', 'glyphicon glyphicon-exclamation-sign', false);
                                                break;
                                            case 3:
                                                Ux.sendNotification(rep.content, 'warning', 'glyphicon glyphicon-time', false);
                                                break;
                                            default:
                                                Ux.sendNotification(rep.content, 'info', 'glyphicon glyphicon-info', true);
                                            break;                                                
                                        }
                                        Ux.loadView();
                                    },
                                    error: function() {
                                        Ux.sendNotification('Unable to reach server...', 'error', 'glyphicon glyphicon-exclamation-sign', false);
                                    }
                            };
                            
                            // @todo
                            if ($(this).hasClass('ui-editable-date')) {
                                var oOpts = {
                                    format: 'yyyy-mm-dd',    
                                    viewformat: 'dd/mm/yyyy',    
                                    datepicker: {
                                       weekStart: 1
                                    }
                                };
                            }                            
                            
                            $(this).editable(oOpts);
                            
                        });
                    }
                },
                
                /**
                 * Preload a dom node
                 * @param string sSelector
                 */
                preload: function(sSelector) {
                    if ($.fn.queryLoader2) {
                        if ($(sSelector).size() > 0) {
                            sSelector = 'body';
                        }
                        $(sSelector).queryLoader2({
                            barColor: "#000",
                            backgroundColor: "#fff",
                            percentage: true,
                            barHeight: 50,
                            completeAnimation: "grow",
                            deepSearch: true
                        });                              
                    }          
                },

                closeModal: function() {
                    $('.modal.in').modal('hide');
                },
                
                /**
                 * @todo
                 * @param repWrap
                 * @param request
                 */
                load: function(repWrap, request) {
                    $(repWrap).fadeOut(300).empty().load('/'+request['controller']+'/'+request['action']).fadeIn(150);
                    this.hideNotif();        
                },

                /**
                 * Load data as the user sroll down
                 * @param $obj            scrolled div dom node jQuery object
                 */
                loadScroll: function($obj) {

                    var sSelector = '#'+$obj.attr('id');                            
                    var iOffSet = $(sSelector).data('ioffset', $(sSelector + ' .ui-grid-item').length);                                                        
                    var aData = $(sSelector).data();
                    $.ajax({
                        type: 'POST',
                        url: '/'+$obj.attr('data-bundle')+'/'+$obj.attr('data-controller')+'/'+$obj.attr('data-action'),
                        data: aData,
                        beforeSend : function(preload) {
                            Ux.sendNotification('Chargement en cours...', 'info', 'glyphicon glyphicon-warning-sign', true);
                            $obj.data('initialContent', $obj.html());
                        },
                        success: function(rep){
                            if (rep.status === 1) { // @see if XHR_STATUS_OK                                                                                                   
                                $obj.append(rep.content);
                                $('#activityDebug').append(rep.debug);   // @todo selecteur en config                             
                            }
                        },
                        error: function(rep){                            
                            // Restore cached content
                            $obj.append($(sSelector).data('initialContent'));  
                            $('#activityDebug').append(rep.debug);   // @todo selecteur en config                                                         
                        },
                        complete: function(){
                            $.pnotify_remove_all();
                            $obj.removeData('initialContent');
                        }
                    });    
                },

                /**
                 * A simple XHR request
                 * @param oHandler            scrolled div dom node jQuery object
                 */
                sendXHR: function(oHandler) {

                    var sUrl = '';
                    if (
                        typeof(oHandler.data('bundle')) !== 'undefined' && 
                        typeof(oHandler.data('controller')) !== 'undefined' && 
                        typeof(oHandler.data('action')) !== 'undefined' 
                    ) {
                        sUrl = '/'+oHandler.data('bundle')+'/'+oHandler.data('controller')+'/'+oHandler.data('action');
                    } else if (typeof(oHandler.data('url')) !== 'undefined') {
                        sUrl = oHandler.data('url');
                    } else {
                        sUrl = oHandler.attr('href');
                    }

                    var $domTarget = $(oHandler.attr('data-selector'));
                    if (typeof($domTarget) === 'undefined') {
                        $domTarget = $(oHandler.attr('href'));
                    }
                    
                    var oParams = oHandler.data();
                    
                    $.ajax({
                        type: 'POST',
                        data: oParams,
                        url: sUrl,
                        beforeSend : function(preload) {
                            // Mettre en cache et vider l'objet qui contiendra la reponse
                            $domTarget.data('initialContent', $domTarget.html());                                    
                            if (!oHandler.hasClass('sendNotificationOnCallback')) {
                                $domTarget.empty();    
                                Ux.preload($domTarget.attr('id')); // @todo bug
                            }

                        },
                        success: function(rep){
                            if (!oHandler.hasClass('sendNotificationOnCallback')) {
                                $domTarget.append(rep.content);
                            } else {
                                switch(rep.status) {
                                    case 1:
                                        Ux.sendNotification(rep.content, 'success', 'glyphicon glyphicon-check');
                                        break;
                                    case 2:
                                        Ux.sendNotification(rep.content, 'error', 'glyphicon glyphicon-warning-sign');
                                        break;
                                    case 3:
                                        Ux.sendNotification(rep.content, 'error', 'glyphicon glyphicon-warning-sign');
                                        break;
                                    case 4:
                                        Ux.sendNotification(rep.content, 'info', 'glyphicon glyphicon-warning-sign');
                                        break;
                                        
                                }
                            }
                        },
                        error: function(err){                            
                            // Restore cached content
                            $domTarget.append($domTarget.data('initialContent'));    
                            $('#activityDebug').append(rep.debug);   // @todo selecteur en config                             
                            
                        },
                        complete: function(){
                            $domTarget.removeData('initialContent');
                            
                            if (oHandler.hasClass('loadOnCallback')) {
                                Ux.loadView($($(oHandler).data('load-selector')));
                            }
                            
                            if (oHandler.hasClass('refreshOnCallback')) {
                                Ux.loadView();
                            }
                            
                        }
                    });
                },
                
                // Envoyer un formulaire en asynchrone
                sendForm: function(obj) {

                    var sFormSelector = obj.data('form');
                    if (typeof(sFormSelector) === 'undefined') {
                        sFormSelector = obj.attr('href');
                    }
                    var $formTarget = $(sFormSelector);
                    var $domTarget = $(sFormSelector).parent();
                    if ($formTarget.data('sendform-reponse-selector')) {
                        $domTarget = $($formTarget.data('sendform-reponse-selector'));
                    }
                    
                    // Serialiser le formulaire, ses attributs data et les contenteditable qu'il contient
                    var aFormInputs = $formTarget.serializeArray();
                    oParams = $.extend($formTarget.data(), obj.data());
                    if($(sFormSelector+' div[contenteditable=true]').size() != 0) {
                        $(sFormSelector+' .ui-editor').each(function() {
                            aFormInputs.push({'name' : $(this).attr('data-name'), 'value' : $(this).parent().find('div[contenteditable=true]:first').html()});
                        });
                    }    
 
                    oParams.parameters = JSON.stringify(aFormInputs);

                    $.ajax({
                        type: 'POST',
                        url: $formTarget.attr('action'),
                        dataType: 'json',
                        data: oParams,
                        beforeSend : function(preload) {
                            // Mettre en cache et vider l'objet qui contiendra la reponse
                            $domTarget.data('initialContent', $domTarget.html());
                        },
                        success: function(rep){
                            if (!obj.hasClass('sendNotificationOnCallback')) {
                                $domTarget.append(rep.content);
                            } else {
                                switch(rep.status) {
                                    case 1:
                                        Ux.sendNotification(rep.content, 'success', 'glyphicon glyphicon-check');
                                        break;
                                    case 2:
                                        Ux.sendNotification(rep.content, 'error', 'glyphicon glyphicon-warning-sign');
                                        break;
                                    case 3:
                                        Ux.sendNotification(rep.content, 'error', 'glyphicon glyphicon-warning-sign');
                                        break;
                                    case 4:
                                        Ux.sendNotification(rep.content, 'info', 'glyphicon glyphicon-warning-sign');
                                        break;
                                        
                                }
                            }
                        },
                        error: function(err){                            
                            // Restore cached content
                            $domTarget.append($domTarget.data('initialContent'));                            
                        },
                        complete: function(){
                            $domTarget.removeData('initialContent');
                            
                            if (obj.hasClass('loadOnCallback')) {
                                Ux.loadView($($(obj).data('load-selector')));
                            }
                            
                            if (obj.hasClass('refreshOnCallback')) {
                                Ux.loadView();
                            }
                            if (obj.hasClass('closeModalOnCallback')) {
                                Ux.closeModal();
                            }
                        }
                    });
                },
                
                // Load some part of the view asynch to boost loadtime and simplify view refresh process
                loadView: function() {
                    if ($('.ui-loadable').size() > 0) {
                        
                        $('.ui-loadable').each(function() {

                            var sUrlTarget = '';
                            if (
                                typeof($(this).data('bundle')) !== 'undefined' && 
                                typeof($(this).data('controller')) !== 'undefined' && 
                                typeof($(this).data('action')) !== 'undefined' 
                            ) {
                                sUrlTarget = '/'+$(this).data('bundle')+'/'+$(this).data('controller')+'/'+$(this).data('action');
                            } else if (typeof($(this).data('url')) !== 'undefined') {
                                sUrlTarget = $(this).data('url');
                            } else {
                                Ux.sendNotification('No url specified to load ui-loadable div #' + $(this).attr('id'), 'error', 'glyphicon glyphicon-warning', false);
                                return false;
                            }

                            var sSelector = '#'+$(this).attr('id');

                            var aData = $(sSelector).data();
                            $.ajax({
                                type: 'POST',
                                url: sUrlTarget,
                                data: aData,
                                beforeSend : function(preload) {
                                    // Mettre en cache et vider l'objet qui contiendra la reponse
                                    $(this).data('initialContent', $(this).html());                                     
                                    $(sSelector).empty();                                                            
                                },
                                success: function(rep){
                                    $(sSelector).append(rep.content);                                              
                                    $('#activityDebug').append(rep.debug);   // @todo selecteur en config                             
                                },
                                error: function(err){                            
                                    // Restore cached content
                                    $(sSelector).append($(sSelector).data('initialContent'));                            
                                },
                                complete: function(){
                                    $(sSelector).removeData('initialContent');
                                }
                            });                             
                        });
                        
                    } else {
                        // Fire all Ux components
                        this.fireUx();
                    }
                },             
                
                reload: function(oItem) {                         
                    
                    var sUrlTarget = '';
                    if (
                            typeof(oItem.data('bundle')) !== 'undefined' && 
                            typeof(oItem.data('controller')) !== 'undefined' && 
                            typeof(oItem.data('action')) !== 'undefined' 
                    ) {
                        sUrlTarget = '/'+oItem.data('bundle')+'/'+oItem.data('controller')+'/'+oItem.data('action');
                    } else if (typeof(oItem.data('url')) !== 'undefined') {
                        sUrlTarget = oItem.data('url');
                    } else {
                        Ux.sendNotification('No url specified to load ui-loadable div #' + oItem.attr('id'), 'error', 'glyphicon glyphicon-warning', false);
                        return false;
                    }
                    
                    var sSelector = '#'+oItem.attr('id');
                    
                    var aData = $(sSelector).data();
                    
                    $.ajax({
                        type: 'POST',
                        url: sUrlTarget,
                        data: aData,                        
                        beforeSend : function(preload) {
                            // Mettre en cache et vider l'objet qui contiendra la reponse
                            oItem.data('initialContent', oItem.html());                                   
                            $(sSelector).empty();
                            $container.data('grid-loaded', false);
                            Ux.sendNotification('Chargement en cours...', 'info', 'glyphicon glyphicon-info-sign');
                        },
                        success: function(rep){
                            if (rep.status === 1) { // @see if XHR_STATUS_OK                                                                                                   
                                $(sSelector).append(rep.content);                                              
                                $('#activityDebug').append(rep.debug);   // @todo selecteur en config                             
                            }
                        },
                        error: function(err){                            
                            // Restore cached content
                            $(sSelector).append($(sSelector).data('initialContent'));                            
                        },
                        complete: function(){
                            $(sSelector).removeData('initialContent');
                            Ux.hideNotifications();
                        }
                    });                       
                },
                
                /**
                 * Vue en grid
                 * @todo Faire un plugin de ca
                 * @todo Ajouter un type de colonne hybride qui cale tout en largeur
                 */
                initGrids: function() {
                    var iColumnsIndex = 0;
                    var iColumnsCount = 6; 
                    var iTwitterBootstrapGridClass = 2; // %12
                    $('.ui-grid').each(function() {
                        var sGridSelector = '#' + $(this).attr('id');
                        if (!$(this).data('grid-loaded')) {
                            if (parseInt($(this).data('columns')) > 0) {
                                iColumnsCount  = parseInt($(this).data('columns'));
                                iTwitterBootstrapGridClass = 12 % iColumnsCount;
                            }
                            
                            var sColumnTemplate = '<div class="column ui-grid-column col-xs-6 col-md-' + iTwitterBootstrapGridClass +'"></div>';
                            for (var i = 0; i < iColumnsCount; i++) {
                                $(this).append(sColumnTemplate);
                            }
                            
                            $(this).data('curCol',0);
                            $(this).data('grid-loaded', true);
                        }
                        $(sGridSelector + ' .ui-grid-item').each(function() {
                            
                            if ((iColumnsIndex + 1)  > iColumnsCount) {
                                iColumnsIndex = 0;
                            }
                            $(sGridSelector + ' .ui-grid-column').eq(iColumnsIndex).append($(this));
                            iColumnsIndex++;
                            $(this).data('curCol', iColumnsIndex);
                        });
                    });
                },
                
                /**
                 * Init forms element
                 */
                initForms: function() {
                    $('form').each(function() {
                        if (!$(this).data('HasChangesListnenerFired')) {
                            $(this).data('bHasChange', false);
                            $('body').on('change', $(this).attr('id'), function() {
                               $(this).data('bHasChange', true); 
                            });
                            $(this).data('HasChangesListnenerFired', true);
                        } 
                     });
                    
                    // Init bootstrap editable elements
                    this.initEditableElements();
                    
                    // Init editors
                    this.initEditors();
                    
                    // Init toggle checkbox
                    this.initCheckbox();
                    
                    // Init Datepicker
                    this.initDatepicker();
                },
                
                /**
                 * Toggle button
                 */
                initCheckbox: function() {
                    $('.ui-checkbox').each(function() {
                        if (!$(this).data('ui-checkbox-fired')) {
                            $(this).data('ui-checkbox-fired', true);
                            $(this).bootstrapSwitch();
                        }
                    });
                },
                
                /**
                 * Init date picker
                 */
                initDatepicker: function() {
                    $('.ui-datetimepicker').each(function() {
                        if (!$(this).data('uiDateTimePickerFired')) {
                            $('.ui-datetimepicker').datetimepicker();
                            $(this).data('uiDateTimePickerFired', true);
                        }
                    });
                },
                
                /**
                 * Init carousel component
                 */
                initCarousels: function() {
                    // init carousel
                    $('.ui-carousel').each(function() {
                        if (!$(this).data('carouselFired')) {
                            var iAutoplay = (($(this).hasClass('noAutoplay')) ? 0 : 5000);
                            $(this).carousel({
                                interval: iAutoplay,
                                duration: 500
                            });
                            $(this).data('carouselFired', true);
                        }
                    });
                },
                
                /**
                 * Ux event listeners (call once on the onLoad() hook)
                 */
                registerBodyListeners: function() {
                    if (!$('body').data('UxListened')) {
                        
                        // Ux form helpers
                        $('body').on('focus', '[placeholder]', function() {
                            Ux.sendNotification($(this).attr('placeholder'), 'info', 'glyphicon glyphicon-info-sign');
                        });                                      
                        $('body').on('blur', '[placeholder]', function() {
                            Ux.hideNotifications();
                        });
                        
                        /**
                         * ************* Events  ****************
                         * Asynchrone request
                         */ 
                        
                        // Envoyer une requete XHR lors d'un clic ou d'un change sur un select
                        $('body').on('click', '.ui-sendxhr', function(){
                            Ux.sendXHR($(this));
                        });
                        $('body').on('change', '.ui-sendxhronchange', function(){
                            Ux.sendXHR($(this));
                        });
                        
                        // Envoyer des formulaires en asynchrone
                        $('body').on('click', '.ui-sendform', function() {      
                            Ux.sendForm($(this));       
                        });        
                        
                        // Envoyer des formulaires en asynchrone
                        $('.ui-reload').on('click', function() {    
                            if (typeof($(this).data('sreloadtarget')) !== 'undefined') {
                                Ux.loadView($($(this).data('sreloadtarget')));      
                            } else {
                                Ux.loadView();
                            }
                            return false;
                        });        
                        
                        // Flip effect
                        $('body').on('mouseenter mouseleave', '.ui-flip', function(){
                            $(this).toggleClass('flip');
                        });
                        
                        // ui confirm @todo afficher une modale au lieu des dialogs natifs
                        $('body').on('click', '.ui-confirm', function() {
                            if (!confirm('Etes vous sure?')) {
                                return false;
                            }
                        });
                        
                        // ui-select-All and ui-select checkbox managment
                        $('body').on('click', '.ui-select-all', function() {
                            var sCheckboxSelector = $(this).data('checkbox-class');
                            var bCheckState = $(this).is(':checked');
                            if (typeof(sCheckboxSelector) !== 'undefined') {
                                $('.ui-select.' + sCheckboxSelector).prop('checked', bCheckState);
                                if ($($(this).data('select-parent') + ' .ui-select:checked').size() > 1) {
                                    $($(this).data('delete-selector')).removeClass('hide');
                                } else {
                                    $($(this).data('delete-selector')).addClass('hide');
                                }
                            }
                        });
                        $('body').on('click', '.ui-select', function() {
                            if ($(this).data('delete-selector') !== 'undefined' && $(this).data('select-parent') !== 'undefined') {
                                if ($($(this).data('select-parent') + ' .ui-select:checked').size() > 1) {
                                    $($(this).data('delete-selector')).removeClass('hide');
                                } else {
                                    $($(this).data('delete-selector')).addClass('hide');
                                }
                            }
                        });
                        
                        // toggle elements
                        $('body').on('click', '.ui-toggle', function() {
                            if ($($(this).data('toggle-selector')).size() !== 0) {
                                $($(this).data('toggle-selector')).toggleClass('hide');
                            }   
                        });
                        
                        // Modal close event with a updated form on it
                        $('.modal').on('hide', function() {
                            var sSelector = $(this).attr('id');
                            if ($(sSelector + ' form').size() !== 0) {
                                $.each($(sSelector + ' form'), function() {
                                    if ($(this).data('bHasChange')) {
                                        alert('Warning!');
                                    }
                                });
                            }
                        });
                        
                        // Toggle items
                        $('body').on('.ui-toggle', 'click', function() {
                           Ux.toggle($($(this).data('toggle-selector'))); 
                        });
                        
                        // popover
                        $('.ui-toggle-popover').popover({
                            container: 'body', 
                            placement : 'auto', 
                            html: true, 
                            animation: true,
                            content : function() {
                                return $($(this).data('popover')).html();
                            }
                        });
                        
                        // Tooltip
                        $('.ui-tip').tooltip({
                            placement: 'auto',
                            delay: { show: 0, hide: 0 }
                        });
                        
                        // Give focus to a selector
                        $('body').on('click', '.ui-focus', function() {
                           $($(this).data('focus-selector')).focus(); 
                        });
                        
                        // Global search
                        $('body').on('submit', 'form#general-search', function() {
                            $('.ui-sendform[data-form=#app-global-search]').trigger('click');
                            return false;
                         });
                        
                        // Flag body
                        $('body').data('UxListened', true);
                    }
                    
                },
                
                registerListeners: function() {
                    
                    // Equalize dom node childrens height
                    $('.ui-equalize-height').each(function(){
                        var maxHeight = 0;
                        $('.ui-equalize').each(function() {
                            if ($(this).height() > maxHeight) {
                                maxHeight = $(this).height();
                            }
                        });
                     });
                    
                    // load on scroll
                    $('.ui-loadscroll').scroll(function(){
                        if ($(this).scrollTop() === ($(this).prop('scrollHeight') - $(this).outerHeight())){
                            if ($(this).find('.ui-scroll-loadable')) {
                                $('.ui-scroll-loadable').each(function() {
                                    Ux.loadScroll($(this));
                                });
                            }
                        }
                        return false;
                    });
                },
                
                /**
                 * App load hook
                 * Call when app is fully loaded
                 */
                onLoad: function() {
                    // Init events bindings
                    this.registerBodyListeners();
                    this.registerListeners();
                    
                    // Lauch all asynch calls
                    this.loadView();
                },
                
                /**
                 * App ajax stop event hook
                 * Call just after an asynch call
                 */
                onAjaxStop: function() {
                    // Fire new Ux components from an asynch call response
                    this.fireUx();
                },
                
                /**
                 * App unload event hook
                 * Call at page unload
                 */
                onUnload: function() {
                    // Sauvegarder l'organisation du layout
                    this.appLayout.save();  
                },
                
                /**
                 * Fire all ux components
                 */
                fireUx: function() {
                    
                    // Fire app layout
                    this.initAppLayout();
                    
                    // Init grids layout
                    this.initGrids();
                    
                    // Init forms
                    this.initForms();
                    
                    // format timestamps to date
                    this.formatTimestamps();

                    // Init carroussel
                    this.initCarousels();
                    
                }
            };

            //~ // Permettre le chainage par jQuery
            return Ux;
        };
})(jQuery);

