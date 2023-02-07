$(document).ready(function() {
    //gnb
    var gnb = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventCont: 'header',
            eventSel: 'header .menu_btn',
            eventToggleCont: 'header nav.depth01',
            eventDepthSel: 'header nav.depth01 .depth01_link a:not(.depth1_00)'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventSel).on('click', function(e) {
                e.preventDefault();
                _this.depth01Toggle(e);
            });
            $(_this.eventObj.eventToggleCont).on('mouseleave', 'li.on', function(e) {
                $(this).removeClass('on');
            });
            $(_this.eventObj.eventDepthSel).on('mouseenter', function(e) {
                _this.depth02Toggle(e);
            });
        },
        depth01Toggle: function(e) {
            $(e.target).removeClass('on').siblings(this.eventObj.eventSel).addClass('on');
            $(this.eventObj.eventToggleCont).toggleClass('on');
        },
        depth02Toggle: function(e) {
            $(e.target).parents('li').addClass('on');
        },
        close: function(e) {
        }
    };

    //treeMenu
    var treeMenu = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventCont: '.treemenu_list',
            eventOpen: '.treemenu_list button.open',
            eventClose: '.treemenu_list button.close'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventOpen).on('click', function(e) {
                e.preventDefault();
                _this.depthOpen(this);
            });
            $(_this.eventObj.eventClose).on('click', function(e) {
                e.preventDefault();
                _this.depthClose(this);
            });
            $(_this.eventObj.eventCont).on('click', 'a:not(.disabled)', function(e) {
                e.preventDefault();
                _this.depthOn(this);
            });
        },
        depthOpen: function(e) {
            $(e).parent().addClass('on');
        },
        depthClose: function(e) {
            $(e).parent().removeClass('on');
        },
        depthOn: function(e) {
            $(this.eventObj.eventCont).find('a').removeClass('on');
            $(e).addClass('on');
        },
        close: function(e) {
        }
    };

    //tabCont
    var tabCont = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventWrap: '.d_tab',
            eventSel: '.d_tab_select a',
            eventCont: '.d_tab_cont'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventWrap).find(_this.eventObj.eventSel).on('click', function(e) {
                e.preventDefault();
                _this.tabToggle(this);
            });
        },
        tabToggle: function(e) {
            var selIndex = $(e).parents('li').index();
            $(e).parents('li').addClass('on').siblings().removeClass('on');
            $(this.eventObj.eventWrap).find(this.eventObj.eventCont).hide();
            $(this.eventObj.eventWrap).find(this.eventObj.eventCont).eq(selIndex).show();
        }
    };

    //datepicker
    var datepicker = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventInput: '.calendar'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventInput).on('focusin focusout', function(e) {
                if (e.type == 'focusin') {
                    _this.inpFoucsIn(this);
                } else if (e.type == 'focusout') {
                    _this.inpFoucsOut(this);
                }
            });
        },
        inpFoucsIn: function(e) {
            $(e).addClass('on');
        },
        inpFoucsOut: function(e) {
            $(e).removeClass('on');
        }
    };

    if ($('body').find('.calendar').length > 0) {
        $( '.calendar' ).datepicker({
            dayNamesMin: ['일','월', '화', '수', '목', '금', '토'], 
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            nextText: '다음 달',
            prevText: '이전 달',
            dateFormat: 'yy-mm-dd',
            yearSuffix: '년',
            showMonthAfterYear: true
        });
    }

    //layerpopup
    var layerPopup = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventOpen: '.d_layer_open',
            eventClose: '.d_layer_close',
            eventDimmed: '#dimmed'
        },
        bindEvt: function() {
            var _this = this;
            $(document).on('click',_this.eventObj.eventOpen, function(e) {
                e.preventDefault();
                layerTarget = $(this);
                _this.popupOpen(e);
            });
            $(document).on('click',_this.eventObj.eventClose, function(e) {
                e.preventDefault();
                _this.popupClose(e);
            });
        },
        popupOpen: function(e) {
            this.dimmedClose();
            $('.layer_popup').hide();
            var layerId = $(e.currentTarget).attr('href');

            this.dimmedOpen();
            $(layerId).css('display','flex').focus();
        },
        popupClose: function(e) {
            var layerId = $(e.target).parents('.layer_popup').attr('id');
            layerTarget.focus();
            this.dimmedClose();
            $(e.target).parents('.layer_popup').hide();
        },
        dimmedOpen: function(e) {
            $(this.eventObj.eventDimmed).show();
        },
        dimmedClose: function(e) {
            $(this.eventObj.eventDimmed).hide();
        },
        close: function(e) {
        }
    };

    //accordion
    var accordion = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventCont: '.d_accordion li',
            eventSel: '.d_accordion_select',
            eventToggleCont: '.d_accordion_cont'
        },
        bindEvt: function() {
            var _this = this;
            $(document).on('click',_this.eventObj.eventSel, function(e) {
                e.preventDefault();
                _this.objToggle(e);
            });
        },
        objToggle: function(e) {
            $(this.eventObj.eventCont).removeClass('on');
            $(e.target).parents('li').toggleClass('on').find(this.eventObj.eventToggleCont).focus();
        }
    };

    //radioSelect
    var radioSelect = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventSel: '.d_radio_select'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventSel).on('click', function(e) {
                e.preventDefault();
                _this.objToggle(e);
            });
        },
        objToggle: function(e) {
            $(e.target).addClass('on').siblings(this.eventObj.eventSel).removeClass('on');
        }
    };

    var globalClose = {
        init: function() {
            this.bindEvt();
        },
        bindEvt: function() {
            $('html').on('click', this.closeAll);
        },
        closeAll: function(e) {
        }
    };

    gnb.init();
    treeMenu.init();
    tabCont.init();
    datepicker.init();
    layerPopup.init();
    accordion.init();
    radioSelect.init();
    globalClose.init();
});