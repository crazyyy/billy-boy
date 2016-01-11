jQuery.noConflict();

/**
 * let masonry do its magic!
 */
//function initMasonry() {
//  // Masonry
//  jQuery('.facts-wrapper').masonry({
//   columnWidth: 320,
//   itemSelector: '.fact-teaser'
//  });
//}

/**
 * let masonry's sister Isotope do its magic!
 */
function initIsotope() {
  // Masonry
  jQuery('.facts-wrapper').isotope({
    masonry: {
      columnWidth: 320,
    },
    itemSelector: '.fact-teaser',
    layoutMode: 'masonry',
    sortBy: [ 'random' ]
  });
}

/**
 * opens more reviews in product detail view
 */
function toggleAdditionalReviews () {
  jQuery('#single-product-ratings-module .ratings-wrapper .additional-reviews').toggleClass('hidden');
  jQuery('#single-product-ratings-module .ratings-wrapper .show-all').toggleClass('hidden');
  
}

function replaceVideoThumbByIframe(obj) {
  var img = jQuery(obj);
  var videoId = img.data("video-id");
  var iframeHtml = '<iframe class="youTubeSlide" width="480" height="270" src="//www.youtube.com/embed/'+videoId+'?wmode=transparent&rel=false&autoplay=1" frameborder="0" allowfullscreen></iframe>'
  img.replaceWith(iframeHtml);
}
/**
 * toggles between different quantities of a configurable product in product detail view
 * @param option
 */
function product_detail_toggle_configurable_option (option){
  
  
  var option_index = jQuery(option).data('id');
  
  
  var slickIndex = jQuery('.option-image-'+option_index+':not(.slick-cloned)').data("slickIndex");
  if (slickIndex != undefined) {
    jQuery('.product-image-slider').slick('slickGoTo', slickIndex);
  }
  
  jQuery('.configurable-option').removeClass('active');
  jQuery('.configurable-option[data-id = '+option_index+']').addClass('active');
  jQuery('#product-info .product-price .quantity').html(config_options[option_index].label);
  jQuery('#product-info .product-price .price').html(optionsPrice.formatPrice(config_options[option_index].price));
  jQuery('#product-details-add-to-cart').data('ids', config_options[option_index].product_id);
  jQuery('#product-details-add-to-cart').data('price', config_options[option_index].price);
  jQuery('#product-details-add-to-wishlist').attr('href', config_options[option_index].product_wishlist_url);
  //jQuery("#description-module .description-text").html(config_options[option_index].description);
  //jQuery("#product-info aside .description .short-description-text").html(config_options[option_index].short_description);
  //console.log(config_options[option_index]);  
}


function addFactsToAllTab() {
  jQuery('.is-summary').removeClass('inactive');
    //jQuery(".factsContent").each(function (index) { //alternate markup
    jQuery(".factsContent > .facts-wrapper > .fact-teaser").each(function (index) {
        if (!jQuery(this).parent().parent().hasClass('is-summary')) {//remove .parent().parent() when using factsContent //TODO maybe define an "all-teasers"-tab in typo?
            jQuery(this).clone(true).appendTo("#fact-tabs > .summary .facts-wrapper");
        }
    });

}

/**
 * for product detail view update the elevateZoom
 * necessessary whenever a different slide is made active
 */
function updateElevateZoom() {
  
  jQuery(".zoomContainer").remove();
  var activeSlide = jQuery(".product-image-slider .slick-active .zoom-reference");
  //don't try to elevate what has no zoom image defined
  if (activeSlide.data('zoom-image') != undefined) {
    activeSlide.elevateZoom({
      zoomWindowFadeIn: 400,
      zoomType:         "lens"
    });
  }
}

/****************************************************************************************************
 *                                        All Markup Loaded                                         *
 ****************************************************************************************************/
jQuery(document).ready(function(){
  var that;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    jQuery('#mainmenu > li:not(.no-dropdown) > a').click(function(e) {
      that = this;
      e.preventDefault();
    });
  }
  
  // Startpage head slider
  jQuery('.index-head-slider').slick({
    dots: true,
    //autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    infinite: true
  });
  
  jQuery('#mainmenu .level-top>ul').addClass('submenu');
  
  //Animate main menu drop down
  var mainitems = jQuery('#mainmenu > li');
  var timeout;

  mainitems.each(function(index, current) {
    $current = jQuery(current);
    
    var $sub = jQuery(current).find('.submenu');
    $current.on('mouseenter', function(e) {
      this.hoverTimeout = setTimeout(function() {
        $sub.slideDown('fast');
      }, 300);
      clearTimeout(this.timeout);
    });
    
    $current.on('mouseleave', function(e) {
      var cs = jQuery(this).find('.submenu');
      this.timeout = setTimeout(function() {
        cs.slideUp('fast');
      }, 300);
      clearTimeout(this.hoverTimeout);
    });
  });
  
  // Product image and thumbnail slider
   jQuery('.product-image-slider').slick({
    slidesToShow:    1,
    slidesToScroll:  1,
    dots:            true,
    asNavFor:        '.product-image-thumbnail-slider'
  });
  jQuery('.product-image-thumbnail-slider').slick({
    slidesToShow:    1,
    slidesToScroll:  1,
    arrows:          false,
    centerMode:      true,
    focusOnSelect:  true,
    vertical:        true,
    asNavFor:        '.product-image-slider',
  }).on('beforeChange', function(event, slick, currentSlide){
    //remove all active class
    jQuery('.product-image-thumbnail-slider .slick-slide').removeClass('slick-active');
  }).on('afterChange', function(event, slick, currentSlide){
    //remove all active class
    jQuery('.product-image-thumbnail-slider .slick-slide').removeClass('slick-active');
    jQuery('.product-image-thumbnail-slider .slick-slide').removeClass('slick-current-slide');
    jQuery('.product-image-thumbnail-slider .slick-slide').removeClass('slick-current-slide-initial');
    //set active class for current slide
    jQuery('.product-image-thumbnail-slider .slick-slide[data-slick-index='+currentSlide+']').addClass('slick-active');
    jQuery('.product-image-thumbnail-slider .slick-slide[data-slick-index='+currentSlide+']').addClass('slick-current-slide');
    
    //jQuery('.slick-slide.slick-cloned').css('margin', 0);
  });
  
  //remove all active class initialy
  jQuery('.product-image-thumbnail-slider .slick-slide').removeClass('slick-active');
  //set active class for first slide initialy
  jQuery('.product-image-thumbnail-slider .slick-slide[data-slick-index=0]').addClass('slick-active');
  jQuery('.product-image-thumbnail-slider .slick-slide[data-slick-index=0]').addClass('slick-current-slide-initial');
  
  
  // Init Fancybox
  jQuery(".fancybox-thumb").fancybox({
    padding  : 0,
    helpers  : {
      thumbs  : {
        width    : 100,
        height  : 60
      }
    }
  });
  // Call gallery with external link
  jQuery('.gallery-link').click(function(e) {
    var el, id = jQuery(this).data('open-id');
    if(id){
      el = jQuery('.fancybox-thumb[rel=' + id + ']:eq(0)');
      e.preventDefault();
      el.click();
    }
    //console.log(el);
  });
  
  jQuery(".fancybox-text").fancybox({
    autoSize  : false,
    height    : "auto",
    width      : 570,
    padding   : 50
  });

  // Product tabs
  jQuery('.tabs:not(.no-jQuery-ui-tab)').tabs();

    addFactsToAllTab();
  // Disable inactive tab
  jQuery('.ui-tabs-nav > li > a').click(function(){
    initIsotope();
  });
  jQuery('.ui-tabs-nav > .inactive > a').attr("disabled", "disabled");

  // Change URL without reloading the page on click on tabs
  /* var tabTitle;
  var tabURL;
  
  function ChangeUrl(tabTitle, tabURL) {
    if (typeof (history.pushState) != "undefined") {
      var obj = { Title: tabTitle, Url: tabURL };
      history.replaceState(obj, obj.Title, obj.Url);
    } else {
      alert("Browser does not support HTML5.");
    }
  }
  
  jQuery('.ui-tabs-nav > li > a').click(function() {
    tabTitle = jQuery(this).attr("data-title");
    tabURL = jQuery(this).attr("data-URL");
    console.log(tabTitle + " & " + tabURL);
    ChangeUrl(tabTitle, tabURL);
  }); */
  
  
  //hover for info icon (cart, whislist, ...)
  var selection = ".item-description";
  jQuery(document).on('mouseenter', '.item-info > a', function(){ 
    jQuery(this).next(selection).fadeIn("fast");
  });
  jQuery(document).on('mouseleave', '.item-info > a', function(){ 
    jQuery(this).next(selection).fadeOut("fast");
  });  
  
  
  // Add focus state to input on click on label
  jQuery('.field label').click(function() {
    jQuery(this).prev().focus();
  });

  // Reinit after rezising teaser
  jQuery('.fact-teaser.expandable').click(function() {
    jQuery(this).find('.expanding-wrapper').animate({
      height: [ "toggle", "linear" ]
    });
  });
    /* jQuery(this).toggleClass('is-expanded');
    jQuery('.facts-wrapper').masonry({
      columnWidth: 333,
      itemSelector: '.fact-teaser'
    });
  }); */  
  // Check for value in input
  var checkInputsForValueInit = function() {
    jQuery(".field input, .field textarea").on("blur", function() {
      "" !== jQuery(this).val() ? jQuery(this).next(".validation-advice").length ? (jQuery(this).next(".validation-advice").next("label").addClass("stay"),
      jQuery(this).next(".validation-advice").next(".validation-advice").next("label").addClass("stay")) : jQuery(this).next("label").addClass("stay") : jQuery(this).next(".validation-advice").length ? (jQuery(this).next(".validation-advice").next("label").removeClass("stay"),
          jQuery(this).next(".validation-advice").next(".validation-advice").next("label").removeClass("stay")) : jQuery(this).next("label").removeClass("stay");
    });
  };
  checkInputsForValueInit();
  var checkInputsForValue = function() {
    jQuery("input, textarea").each(function() {
      "" !== jQuery(this).val() ? jQuery(this).next("label").addClass("stay") : jQuery(this).next("label").removeClass("stay")
    });
  },
  checkFieldsetSelect = function() {
    jQuery(".field select").each(function() {
      "" !== jQuery(this).val() ? jQuery(this).parent().next().css("opacity", "0") : jQuery(this).parent().next().css("opacity", "1")
    });
  };

  jQuery(".field input, .field textarea").length && checkInputsForValue();
  jQuery("input").change(function() {
    checkInputsForValue();
  });
  jQuery("select").length && checkFieldsetSelect(), jQuery("select").change(function() {
    checkFieldsetSelect();
  });
  
  /* jQuery("#product-info .description > a").click(function(e) {
    e.preventDefault();
    jQuery("html, body").scrollTop(jQuery("#description-module").offset().top - 140)
  }); */
  
  // Scroll to product page modules/elements
  jQuery('a').filter(':not(.fancybox-text)').filter(function() {
    //return jQuery(this).attr('href').match(/^#[a-zA-Z]/);
  }).click(function(e) {
  e.preventDefault();
  var target = jQuery(this);
    jQuery('html, body').animate({ scrollTop: jQuery(target.attr("href")).offset().top - 140 });
  });

  
  // break characteristics in glossary properly
  jQuery(".glossary .characteristics").each(
      function(){
        if (jQuery(this).children().length > 4) {
          jQuery(this).find("li:nth-child(3n)").addClass("breakafter");
          jQuery(this).find("li:nth-child(3n-2)").addClass("breakbefore");
          jQuery(this).find("li:last-child").addClass("breakafter");
        }
      }
    );

  
  
  /*
   * init modules
   */

  // setup global js UI manipulations
  var ui = new bb.UI();
  ui.setup();
  // setup ajax (non cached) calls for shoppingcart and wishlist info / layer
  bb.Ajax.getShoppingCartQuantity('#topmenu-wrapper a.shoppingcart');
  bb.Ajax.getWishlistQuantity('#topmenu-wrapper a.wishlist');
  el.Input.SelectBoxes.create();

  // setup navigation
  var nav = new bb.Navigation({
    container: "#topmenu-wrapper li.level0 > a",
    level0: 'ul.level0'
  });
  
  
  //handles scroll events to shrink/enlarge the header section
  function _scrollHandler(e) {
    var closingThreshhold = 60;
    if (jQuery(window).scrollTop() > closingThreshhold && jQuery('header').hasClass('open')) {
      jQuery('header').removeClass('open');
    }
    if (jQuery(window).scrollTop() < closingThreshhold && !jQuery('header').hasClass('open')) {
      jQuery('header').addClass('open');
    }
  }
  jQuery(window).on('scroll', function(e){_scrollHandler(e);});

  //init "Add Comment" Button from Wishlist
  jQuery('a.add-comment').click(function() {
    jQuery(this).next().fadeToggle();
  });
  
  //remove empty link container
  jQuery(".product-infolinks").children().each(
    function(){
      if(jQuery(this).children().length == 0){
        jQuery(this).parent().addClass('hidden');
      }
    }
  );
  
  //recalculate price for product-suggestions
  jQuery("#suggestion-module div.product-teaser span.checkbox").on("click", function(e)
  {
    e.preventDefault();
    jQuery(this).toggleClass("checked");
    suggestModuleCheckboxUpdate();
    
  });
  
  

  
  jQuery("#suggestion-module aside.suggestion-summary a.cart-btn, #product-details-add-to-cart, .product-teaser .btn.more-btn.cart-btn:not(.no-ajax)").on("click", function(e)
  {
    e.preventDefault();
    suggestModuleCheckboxUpdate();
    var ids = jQuery(e.target).data('ids');
    if (ids != undefined && (ids.length == undefined || ids.length > 0)) {
      setLocationAjax('/checkout/cart/add'+prepareAjaxCartAddParameters(e.target),e.target);
    }
  });

  
  jQuery('input#search').on('keyup', function(){
    bb.Ajax.getSolrSearchSuggestions();
  });
  /*
  jQuery('input#search').on('change', function(){
    bb.Ajax.getSolrSearchSuggestions();
  });
  jQuery('input#search').on('focus', function(){
    bb.Ajax.getSolrSearchSuggestions();
  });
  */
  
}); // end document ready





/****************************************************************************************************
 *                                        All Assets Loaded                                         *
 ****************************************************************************************************/
jQuery(window).load( function() {
  initIsotope();
  if (window.location.hash != "") {
    jQuery('html, body').animate({ scrollTop: jQuery(window.location.hash).offset().top - 140 });
  }
  
  //only start slider autoplay once the page is fully loaded
  jQuery('.index-head-slider').slick('slickPlay');
  
  jQuery('.product-image-slider').on('afterChange', function(){updateElevateZoom();});
  updateElevateZoom();
});



/****************************************************************************************************
 *                                           ATO MODULES                                            *
 ****************************************************************************************************/
var bb = {};

/**
 * BILLY BOY Cart
 * @sinc 28.05.2013
 * @author Norman Meissner
 */
bb.Cart = function(options) { this.init(options); };
bb.Cart.prototype = (function() {
  
  /**
   * Config Object. Can be modified by options 
   * @property {string} updateCardId  
   * @property {string} updateUrl    
   */
  var config = {
    updateCardId: null,
    updateUrl: null,
    clickHandler: null
  };
  
  /**
   * current opened subnavigation layer
   */
  var currentSub = null;
  
  /**
   * Updates Cart
   */
  function update()
  {
    var reloadHtmlWrapper = jQuery(config.updateCardId);
    var height = reloadHtmlWrapper.height() + 5;
    reloadHtmlWrapper.prepend('<div class="reload-cart" style="height:'+height+'px;"><img src="/skin/frontend/billy_boy/default/images/ajax-loader.gif" /></div>');
    jQuery.ajax({
      type: "POST",
      url: config.updateUrl,
      data: jQuery(config.updateCardId+' > form').serialize(),
      success: function(data, status, jqXHR){
        var htmlBlock = jQuery(data);
        reloadHtmlWrapper.html(htmlBlock.find(config.updateCardId).html());
      },
      error:function(data, status, jqXHR){
      },
    });
  }
  
  return {
    init: function(options)
    {
      config.updateCardId = options.updateCardId;
      config.updateUrl = options.updateUrl;
      config.clickHandler = options.clickHandler;
      jQuery(document).one('click', config.clickHandler, function(event){ 
        event.preventDefault();
        update();
      });  
    }
  };
  
})();


var el = {};

el.Input = {};

/**
 * Create custom selectbox opener
 * @since 03.06.2013
 * @author Andreas Nieswand
 */
el.Input.SelectBoxes = (function() {
  
  var options = {
      disabledClass: "disabled",
      hoverClass: "hover"
  };
  
  var selects = {};
  
  // cycle through each select an enable if needed
  // happens, if 2 selects have dependecies to each other.
  function setEnabledStates()
  {
    for (var i in selects)
    {
       // check, if select box WAS disabled > enable and vice versa
       if (selects[i].select.attr('disabled') != selects[i].disabled)
         {
           selects[i].disabled = selects[i].select.attr('disabled');
         }
       
       switch (selects[i].disabled)
       {
         case "disabled":
           selects[i].opener.addClass(options.disabledClass);
           break;
         default:
           selects[i].opener.removeClass(options.disabledClass);
           break;
       }
    }
  }
  
  return {
    create: function()
    {
      selector = 'select';
      var select = jQuery(selector);
    
      select.each(function(idx){
        // current opener for select
        var opener = jQuery(this).next('div').children('a');
        // current select
        var current = jQuery(this);
        
        selects[idx] = {};
        // save current "disabled" state. needed to set "enabled" class in opener
        // on each change
        selects[idx].disabled = current.attr('disabled');
        // save reference to current select
        selects[idx].select = current;
        // save reference to opener
        selects[idx].opener = opener;
        
        if (selects[idx].disabled == "disabled")
        {
          opener.addClass(options.disabledClass);
        }
        
        // set content of selectbox to current selectedIndex
        opener.html('<span>'+current.context.options[current.context.selectedIndex].text+'</span>');
        
        current.on({
          change: function(e){
            opener.html('<span>'+e.target.options[e.target.selectedIndex].text+'</span>');
            setEnabledStates();
          },
          mouseenter: function(e){        
            opener.addClass('hover');
          },
          mouseleave: function(e){
            opener.removeClass('hover');
          }
        });
      });
    }
  };
})();
el.Input.SelectBoxes.create();


/**
  * BILLY BOY Navigation
  * @sinc 28.05.2013
  * @author Andreas Nieswand
  */
bb.Navigation = function(options) { this.init(options); };
bb.Navigation.prototype = (function() {
  
  /**
   * Config Object. Can be modified by options 
   * @property {string} container    Container für Hauptnavigation
   * @property {string} level0    Container für Navi Level 0
   */
  var config = {
    container: null,
    level0: null
  };
  
  /**
   * current opened subnavigation layer
   */
  var currentSub = null;
  /**
   * current listitem
   */
  var listitem = null;
  
  function deleteMiniCartItemClickFunction (event, thisItem) {
    event.preventDefault();
    //onClick change icon to loading-animation
  //jQuery(thisItem).children().first().css({'background': 'url(/skin/frontend/billy_boy/default/images/ajax-loader.gif) no-repeat scroll center center transparent'});
    jQuery(thisItem).addClass('loading');
    bb.Ajax.deleteMiniCartItem("#top-cart", jQuery(thisItem).attr("href"), function() {
      //onFinish function
      jQuery('section#top-cart a.button.delete').on('click', function(e) {
        deleteMiniCartItemClickFunction(e, this);
      });
      //Mini-Cart-Item-Anzahl aktualisieren
      jQuery(".topmenu a.shoppingcart span.badge").remove();
      bb.Ajax.getShoppingCartQuantity(".topmenu a.shoppingcart");
    });
  }
  
  /**
   * Creates Navigation / Adds Eventhandler
   */
  function create()
  {
    // quick cart opener. TODO: refactor
    jQuery('#topmenu-wrapper a.shoppingcart').on('click', function(e){
      e.preventDefault();
      var cart = jQuery('#top-cart');
      var opener = jQuery(this);
      
      if (cart.length > 0) {
        cart.fadeOut('fast', function(e) {
          opener.toggleClass('active');
          cart.remove();
          //TODO: delete mini cart item event listener entfernen
        });
      } else {
        opener.parent().append('<section style="display: none;" id="top-cart" class="block block-cart"><span class="loading" style="display: inline-block; width: 100%; height: 16px;"></span></section>');
        jQuery('#top-cart').fadeIn('fast');
        opener.toggleClass('active');
        bb.Ajax.getMiniCart('#top-cart', function(){
          jQuery('span.loading').remove();
          
          //Link 'weiter einkaufen'
          jQuery('section#top-cart a.shopOn').on('click', function(e) {
            e.preventDefault();
            jQuery('div.persist-header > header a.shoppingcart').click();
          });
          
          //Links mit Mülleimer-Icon zum Löschen von Items aus dem MiniCart
          jQuery('section#top-cart a.button.delete').on('click', function(e) {
            deleteMiniCartItemClickFunction(e, this);
          });
        });
      }
    });
    
    
    
    // if close currentSub on Clik outside navigation
    // check, if target of klick is a span (span wraps main navigation point)
    // possible problem: click on links which contains span; navigation is not
    // closed. but link is executed!
    jQuery('html').on('click', function(e){
      if (null != currentSub && "SPAN" != e.target.nodeName)
      {
        currentSub.fadeOut('fast');
        listitem.removeClass('active');
      }
    });
    
    // Click Events for Main-Navigation
    jQuery(config.container).click(function(e){
      e.preventDefault();
      
      // reference to current opener
      var opener = jQuery(this);
      listitem = opener.parent("li");
      // reference to subnavigation
      var sub = opener.next("ul");
      
      // check if clicked opener is new opener. close old sub.
      if (currentSub && currentSub[0] != sub[0])
      {
        currentSub.parent("li").removeClass("active");
        currentSub.hide();
      }
      
      if (sub.is(":visible")) {
        listitem.removeClass("active");
        currentSub.fadeOut("fast");
      } else {
        listitem.addClass("active");
        // click on same opener; close sub (if open)
        sub.fadeIn("fast");
        // remeber current sub
        currentSub = sub;
      }

      // no sub? open link.
      if (sub.length == 0)
      {
        listitem.removeClass("active");
        document.location = this.href;
      }
      
    });
  }
  
  return {
    init: function(options)
    {
      config.container = options.container;
      config.level0 = options.level0;
      create();
    }
  };
  
})();
/**
 * Provides function for AJAX Calling Magento Modules
 * @since 29.05.2013
 * @author Andreas Nieswand
 */
bb.Ajax = (function(){
  
  var config = {
      URL_getSCQuantity: '/ajx/index',
      URL_getMiniCart: '/ajx/index/minicart',
      URL_getWishlistQuantity: '/ajx/index/wishlist'
  };
  var searchAutocompleteCall;
  
  return {
    /**
     * Perform Ajax call and return Ajax Object.
     * Could be chained (eg. ajaxinstance.call(...).done(...));
     * 
     * @propery {string} URL  URL to call
     * @propery {string} method  Method so use (GET|POST|HEAD)
     */
    call: function(url, method)
    {
      return jQuery.ajax({
        url: url,
        method: method      
      });
    },
    callExtended: function(url, data, method, dataType, errorFunction, successFunction, completeFunction)
    {
      return jQuery.ajax({
        url: url,
        data: data,
        method: method,
        dataType: dataType,
        error: errorFunction,
        success: successFunction,
        complete: completeFunction
      });
    },
    getShoppingCartQuantity: function(container)
    {
      this.call(config.URL_getSCQuantity, "GET").done(
          function(data) {
            if (parseInt(data) > 0)
            {
              jQuery(container).append('<span class="badge">'+data+'</span>');          
            }
          }
      );
    },
    getWishlistQuantity: function(container)
    {
      this.call(config.URL_getWishlistQuantity, "GET").done(
          function(data) {
            if (parseInt(data) > 0)
            {
              jQuery(container).append('<span class="badge">'+data+'</span>');          
            }
          }
      );
    },
    getMiniCart: function(container, onFinish)
    {
      this.call(config.URL_getMiniCart, "GET").done(
          function(data) {
            jQuery(container).html(data);
            onFinish();
          }
      );
    },
    deleteMiniCartItem: function(container, deleteUrl, onFinish)
    {
      this.call(deleteUrl, "GET").done(
          function(data) {
            jQuery(container).html(data);
            onFinish();
          }
      );
    },
    addMiniCartItem: function(addUrl, data, dataType, errorFunction, successFunction, completeFunction, onFinish)
    {
      this.callExtended(addUrl, data, "GET", dataType, errorFunction, successFunction, completeFunction).done(
          function(data) {
            if (console && console.log) {
                //console.log("data: ", data);
              }
            onFinish();
          }
      );
    },
    /**
     * get suggestions from a solr facet search based on the current search field content
     */
    getSolrSearchSuggestions: function(){
      if (this.searchAutocompleteCall != undefined) {
        this.searchAutocompleteCall.abort();
      }
      var searchTerm = jQuery('input#search').val();
      var url = "/solr/search/suggest?q="+encodeURIComponent(searchTerm);
      var searchUrl = jQuery('#frm-search').prop('action');
      if (searchTerm.length > 2){
        try {
          this.searchAutocompleteCall = jQuery.ajax( {
            url : url,
            dataType : 'json',
            success : function(data) {
              if (JSON.stringify(data.products) != '[]' 
                || JSON.stringify(data.content) != '[]'){
                var productLabel = 'Produkte im Shop';
                var contentLabel = 'Inhalte';
                var output = '';
                if (JSON.stringify(data.products) != "[]"){
                  output += '<h2 class="autocomplete-hdl-shop">'+productLabel+'</h2>\n';
                  output += '<ul>';
                  for (var i = 0; i < data.products.length; i++) {
                    for (var key in data.products[i]) {
                      output += '<li class="ui-menu-item">\n';
                      var label = key.replace(new RegExp("(" + searchTerm.replace(/\+|\s/g, "|") + ")", "i"), "<em>$1</em>");
                      output += "<a data-key='"+key+"'>"+label+" ("+data.products[i][key]+")</a>\n";
                      output += '</li>\n';
                    }
                  }
                  output += '</ul>';
                }
                if (JSON.stringify(data.content) != "[]"){
                  output += '<h2 class="autocomplete-hdl-shop">'+contentLabel+'</h2>\n';
                  output += '<ul>';
                  for (var i = 0; i < data.content.length; i++) {
                    for (var key in data.content[i]) {
                      output += '<li class="ui-menu-item">\n';
                      var label = key.replace(new RegExp("(" + searchTerm.replace(/\+|\s/g, "|") + ")", "i"), "<em>$1</em>");
                      output += "<a data-key='"+key+"'>"+label+" ("+data.content[i][key]+")</a>\n";
                      output += '</li>\n';
                    }
                  }
                  output += '</ul>';
                }
                jQuery('#search_autocomplete').html(output);
                jQuery('#search_autocomplete>ul>li>a').on('click', function(){
                  jQuery("input#search").val(jQuery(this).data('key'));
                  jQuery("input#search").focus();
                  //bb.Ajax.getSolrSearchSuggestions();
                  bb.Ajax.hideSolrSuggest();
                });
                jQuery(document).on('click', bb.Ajax.clickedOutsideOfSearchForm);
                jQuery('#search_autocomplete').css('display', 'block');
              } else {
                bb.Ajax.hideSolrSuggest();
                //console.log("solr facet returned with empty result");
              }
            },
            
            error: function(data, status, error) {
              if (data.state() != "rejected"){
                bb.Ajax.hideSolrSuggest();
                console.log("error:");
                console.log(data);
              }
            }
          });
        } catch (e) {
        }
      } else {
        this.hideSolrSuggest();
      }
      return false;
    },
    /**
     * close the solr autocompletion popup when clicking on anything else
     * @param e
     */
    clickedOutsideOfSearchForm: function(e){
      var container = jQuery("#frm-search");
      
      if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
        bb.Ajax.hideSolrSuggest();
      }
    },
    /**
     * hide the solr suggestion field and unbind any handlers 
     * to do so when clicking outside of it.
     */
    hideSolrSuggest: function(){
      jQuery('#search_autocomplete').html("");
      jQuery('#search_autocomplete').css('display', 'none');
      jQuery(document).off( 'click', bb.Ajax.clickedOutsideOfSearchForm );
    }
  };

})();

/**
 * General UI Manipulation / Improvements
 * @since 23.07.2013
 * @author Matthias Holze / Andreas Nieswand
 */

bb.UI = function() {};
bb.UI.prototype = (function() {
  
  // tabs on product detail
  function initProductDetailTabs()
  {
    jQuery(".product-detail-tabs").tabs();
  }
  
  // layered navigation / filter
  function initLayeredNavigationFilter()
  {
    var layerFilter = jQuery("#layered-filters");
    var buttonFilter = jQuery("#btn-filter");
    var buttonFilterSpan = jQuery("#btn-filter span");
    
    // open filter-layer
    buttonFilter.on('click', function(e) {
      e.preventDefault();
      $this = jQuery(this);
      $layer = layerFilter;
      
      if($this.hasClass("active")) {
        $layer.fadeToggle('fast', 
          function() {
            $this.toggleClass('active');
          });
      } else {
        $this.toggleClass('active');
        $layer.fadeToggle('fast');
      }
      
      
      jQuery('html').on('click', function(e){
        var targetObj = jQuery(e.target);
        if (!targetObj.is(buttonFilter) && !targetObj.is(buttonFilterSpan))
        {
          layerFilter.fadeOut('fast');
          buttonFilter.removeClass('active');
        }
      });
      
    });
  }
  
  // hover for info icon (cart, whislist, ...)
  function initProductInfoLayer()
  {
    var selection = ".item-description";
    
    /*
    jQuery(".item-info a").on({
      mouseenter: function() {
        jQuery(this).next(selection).fadeIn("fast");
      },
      mouseleave: function() {
        jQuery(this).next(selection).fadeOut("fast");
      }
    });
    */
    jQuery(document).on('mouseenter', '.item-info a', function(){ 
      jQuery(this).next(selection).fadeIn("fast");
    });  
    jQuery(document).on('mouseleave', '.item-info a', function(){ 
      jQuery(this).next(selection).fadeOut("fast");
    });  
  }
  
  // message overlay (close, error)
  function initMessageOverlay()
  {
    // close messages-layer
    jQuery(document).on('click', '#overlay-layer a.button, #overlay-layer a.btn-close', function(e){
      if(this.id == "layer-cart") {
        return;
      }
      e.preventDefault();
      jQuery("#overlay-layer").fadeOut("fast");
      jQuery("#overlay").fadeOut("fast");
      //set focus on error-field
      
      var inModalWindow = jQuery(this).parents('html').hasClass('modal');
      if(inModalWindow)
      {
        
        parent.closeFancybox();
      }
    }); 
  }
  
  // fancybox / modal window handler
  function initModalHandler()
  {
    // for all links with class "fancybox"
    jQuery( "a[href$='#newletter-subscribe-form']" ).attr( "href", "#newletter-subscribe-form" ).attr( "data-type", "inline").addClass( "fancybox" );
    if(window.location.hash == "#newletter-subscribe-form") {
      var type = 'inline';
      var href = "#newletter-subscribe-form";
      var padding = [42, 10, 39, 44];
      var width = 480;
      var maxWidth = 718;
      var height = '90%';
      var autoSize = true;
      var scrolling = 'no';
      
      jQuery.fancybox({
        type: type,
        href: href,
        padding : padding,
        width : width,
        height: height,
        autoSize: autoSize,
        maxWidth : 618,
        maxHeight : '90%',
        wrapCSS : 'type-'+type,
        fixed: false,
        scrolling: scrolling,
        helpers : {
              overlay : {
                  css : {
                      'background' : 'rgba(250,246,238, 0.7)'
                  }
              }
          }
        });
    }
    jQuery(document).on('click', 'a.fancybox', function(e) {
      e.preventDefault();
      var $this = jQuery(this);
      // default type
      var type = 'image';
      var href = $this.attr("href");
      var padding = 42;
      var width = 480;
      var height = '90%';
      var autoSize = true;
      var scrolling = 'auto';
      
      // data-type realy needed? fancybox2 supports type handling by additional class name
      switch($this.attr("data-type")) {
        case 'inline':
          type = 'inline';
          padding = [42, 10, 39, 44];
          maxWidth = 718;
          scrolling = 'no';
          break;
        case 'iframe':
          type = 'iframe';
          padding = [42, 10, 39, 44];
          break;
        case 'ajax':
          type = 'ajax';
          // remove http, https, slashes and current domain from given href. 
          //do server-side validation in specific controller
          href = "/ajx/index/modal?page="+$this.attr("href").replace(document.domain, "").replace("http://", "").replace("https://").replace(/\//g,"");
          padding = [42, 10, 39, 44];
          break;
        
      }
      jQuery.fancybox({
        type: type,
        href: href,
        padding : padding,
        width : width,
        height: height,
        autoSize: autoSize,
        maxWidth : 618,
        maxHeight : '90%',
        wrapCSS : 'type-'+type,
        fixed: false,
        scrolling: scrolling,
        helpers : {
            overlay : {
                css : {
                    'background' : 'rgba(250,246,238, 0.7)'
                }
            }
        }
      });
    });
  }
  
  // init "Add Comment" Button from Wishlist
  function initAddWishlistComment()
  {
    jQuery('a.add-comment').on('click', function(e) {
      jQuery(this).next().fadeToggle();
    });
  }
  
  return {
    setup: function()
    {
      initProductDetailTabs();
      initLayeredNavigationFilter();
      initProductInfoLayer();
      initMessageOverlay();
      initModalHandler();
      initAddWishlistComment();
    }
  };
  
})();

function suggestModuleCheckboxUpdate() {
  var selectedProducts = [];
  var selectedPrices = [];
  var finalPrice = 0;
  var outputString = "0,00";

  //selectedPrices.push(parseFloat(jQuery('#product-details-add-to-cart').attr("data-price")));
  //selectedProducts.push(parseFloat(jQuery('#product-details-add-to-cart').attr("data-ids")));
  
  jQuery("#suggestion-module span.checkbox.checked").each(function()
  {
    selectedPrices.push(parseFloat(jQuery(this).attr("data-price")));
    selectedProducts.push(parseFloat(jQuery(this).attr("data-id")));
  });
  
  selectedPrices.forEach(function(price) {
    finalPrice += price;
  });
  finalPrice = Math.round(finalPrice*100)/100;
  
  outputString = finalPrice.toString().replace(".", ",");
  
  if (parseInt(outputString) == finalPrice)
  {
    outputString += ",00";
  }
  if (selectedPrices.length > 0) {
    jQuery("#suggestion-module aside.suggestion-summary .summary").addClass('hasSelected');
  } else {
    jQuery("#suggestion-module aside.suggestion-summary .summary").removeClass('hasSelected');
  }
  jQuery("#suggestion-module aside.suggestion-summary em.count").text(selectedProducts.length);
  jQuery("#suggestion-module aside.suggestion-summary p > em").text(jQuery("#suggestion-module aside.suggestion-summary p > em").text().replace(/[0-9,.]+/, outputString));
  jQuery("#suggestion-module aside.suggestion-summary a.cart-btn").data('ids', selectedProducts.join(','));
}

function prepareAjaxCartAddParameters(obj){
  var param = "";
  var ids = jQuery(obj).data('ids').toString().split(',');
  var qty = jQuery(obj).data('qty');
  if (ids != undefined && ids.length > 0){
    param += '/product/'+ids[0];
    if (qty != undefined && qty > 0){
      param += '/qty/'+qty;
    }
    if (ids.length > 1) {
      param += '/related_product/';
      param += ids.slice(1).join(',');
    }
  }
  return param;
}


/**
 * try to add a product to the shopping cart via ajax
 * @param url
 * @param origin
 * @returns {Boolean}
 */
function setLocationAjax(url,origin){
  var animationDuration = 400;
  var stayDuration = 4000;
  url += '/isAjax/1/';
  url = url.replace("checkout/cart","ajx/cart");
  var loader = jQuery(origin).find('.ajax_loader');
  loader.slideDown(animationDuration/4);
  loader.append('<span class="alert loading"></span>');
  var alert = loader.children('.alert:last-child');
  try {
    jQuery.ajax( {
      url : url,
      dataType : 'json',
      success : function(data) {
        alert.removeClass('loading');
        if (data.status == "SUCCESS") {
          alert.addClass('success');
          jQuery(".topmenu a.shoppingcart span.badge").remove();
          bb.Ajax.getShoppingCartQuantity(".topmenu a.shoppingcart");
          jQuery('#top-cart').remove();
          jQuery(".topmenu a.shoppingcart").removeClass('active')
        } else if (data.status == "ERROR") {
          alert.addClass('error');
        }
        alert.append(data.message);
        var timeout = setTimeout(function(){
          alert.slideUp(animationDuration,function(){
            alert.remove();
            if(loader.find('.alert').length == 0){
              loader.slideUp(animationDuration/4);
            }
          });
        },stayDuration);
        alert.click(function(){
          alert.slideUp(animationDuration,function(){
            alert.remove();
            if(loader.find('.alert').length == 0){
              loader.slideUp(animationDuration/4);
              clearTimeout(timeout);
            }
          });
        });
      },
      
      error: function(data, status, error) {
        loader.removeClass('loading');
        loader.addClass('error');
        alert.append('error');
        var timeout = setTimeout(function(){
          alert.slideUp(animationDuration,function(){
            alert.remove();
            if(loader.find('.alert').length == 0){
              loader.slideUp(animationDuration);
            }
          });
        },stayDuration);
        alert.click(function(){
          alert.slideUp(animationDuration,function(){
            alert.remove();
            if(loader.find('.alert').length == 0){
              loader.slideUp(animationDuration);
              clearTimeout(timeout);
            }
          });
        });
      
      }
    });
  } catch (e) {
  }
  return false;
}

function deleteMiniCartItemClickFunction(event, thisItem) {
  event.preventDefault();
  //onClick change icon to loading-animation
  //jQuery(thisItem).children().first().css({'background': 'url(/skin/frontend/billy_boy/default/images/ajax-loader.gif) no-repeat scroll center center transparent'});
  jQuery(thisItem).find('.button.delete').addClass('loading');
  bb.Ajax.deleteMiniCartItem("#top-cart", jQuery(thisItem).attr("href"), function() {
    //onFinish function
    jQuery('section#top-cart a.button.delete').on('click', function(e) {
      deleteMiniCartItemClickFunction(e, this);
    });
    //Mini-Cart-Item-Anzahl aktualisieren
    jQuery(".topmenu a.shoppingcart span.badge").remove();
    bb.Ajax.getShoppingCartQuantity(".topmenu a.shoppingcart");
  });
}

function addMiniCartItemClickFunction(event, thisItem, fromListView) {
  event.preventDefault();
  var url;
  if (fromListView) {
    if (thisItem.href) {
      url = thisItem.href;
    }
  }
  else {
    url = jQuery('#product_addtocart_form').attr('action');
  }
  
  var productDetailURL = url;
  url = url.replace("checkout", "ajx");
  var data = jQuery('#product_addtocart_form').serialize();
  var pText = "";
  
  bb.Ajax.addMiniCartItem(url, data, "json", 
    //error function
    function(jqXHR, textStatus) {
      if (fromListView) {
        //Falls man nicht auf der Produktdetailseite ist und der Artikel nicht direkt dem Warenkorb
        //hinzugefügt werden kann (weil er z.B. konfigurierbar oder nicht vorrätig ist), wird eine 
        //Weiterleitung auf die Detailseite vorgenommen. 
        window.location = productDetailURL;
      }
    },
    //success function
    function(data) {
      if (data.status != 'SUCCESS') {
        if (fromListView) {
          //Falls man nicht auf der Produktdetailseite ist und der Artikel nicht direkt dem Warenkorb
          //hinzugefügt werden kann (weil er z.B. konfigurierbar oder nicht vorrätig ist), wird eine 
          //Weiterleitung auf die Detailseite vorgenommen. 
          window.location = productDetailURL;
        }
      } else {
        //Info-Tooltip anzeigen
        var newDiv1 = jQuery("<div class='quickResponse'></div>").appendTo(jQuery(thisItem));
          newDiv1.animate({opacity:1.0}, 500);
          pText   = Translator.translate('The article was placed into the cart. ');
          var newDiv2 = jQuery("<div></div>").appendTo(newDiv1);
          var newSpan = jQuery("<span class='greenTick'></span>").appendTo(newDiv1);
          var newP    = jQuery("<p>" + pText + "</p>").appendTo(newDiv2);
          
          //Info-Tooltip entfernen
          setTimeout(function() {
          newDiv1.css({opacity:0.0});
          setTimeout(function() {
            newDiv1.remove();
          }, 1000);
        }, 3000);
          
          //Warenkorb-Button wieder klickbar machen
          thisItem.disabled = false;
      }
    },
    //complete function (called after error or success function)
    function() {
      
    },
    //onFinish function (called in ajax.done())
    function() {
      //Mini-Cart-Item-Anzahl aktualisieren
      jQuery(".topmenu a.shoppingcart span.badge").remove();
      bb.Ajax.getShoppingCartQuantity(".topmenu a.shoppingcart");
    }
  );
}
