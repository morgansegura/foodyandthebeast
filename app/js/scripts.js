$ = jQuery;
/*** KEEP EVERYTHING DRY **/
/* =========================== */
/* ******** SCROLL FUNCTIONS  */
/* ========================= */

$(window).scroll(function() {


    // Sticky Header
    if ($(this).scrollTop() > 1){
        $('header').addClass("sticky");
    }
    else{
        $('header').removeClass("sticky");
    }

});

/* =========================== */
/* ******** jQUERY FUNCTIONS  */
/* ========================= */

// center function
jQuery.fn.center = function(containerName) {
    var $containerName = containerName;
    this.css({
        "position": "absolute",
        "top": Math.max(0, (($containerName.height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px",
        "left": Math.max(0, (($containerName.width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px"
    });
}
// scrollTab function
jQuery.fn.scrollWindow = function(eClick, scrollTo) {
    var $eClick = eClick,
        $scrollTo = scrollTo;

}
// showHide function
jQuery.fn.showHide = function(eClick, direction) {
    var $eClick = eClick,
        $direction = direction;
    $eClick.click(function(){
       this.animate( {
           "right"   : 0,
           "width"      : "toggle"
       }, function(){

       }, 2000)
    });
}


/* Slide Window Pane's in a selected direction */
function slidePane(clickable, pane, siblingPane) {
    var $clickable      = clickable,
        $pane           = pane,
        $siblingPane    = siblingPane;

    $clickable.click(function() {
        // right
        if( $(this).hasClass('pane-right') ) {
            // right whole/none
            if( $pane.hasClass('width-half') ) {
                $pane.removeClass('width-half').addClass('width-none');
                $siblingPane.removeClass('width-half').addClass('width-whole');
            }
            // right half/half
            if( $pane.hasClass('width-whole') ) {
                $pane.removeClass('width-whole').addClass('width-half');
                $siblingPane.removeClass('width-none').addClass('width-half');
            }
            console.log('Clicked: ' + $(this).attr('class'));
        }

        // left
        if( $(this).hasClass('pane-left') ) {
            // left whole/none
            if( $pane.hasClass('width-half') ) {
                $pane.removeClass('width-half').addClass('width-whole');
                $siblingPane.removeClass('width-half').addClass('width-none');
            }
            // left half/half
            if( $pane.hasClass('width-none') ) {
                $pane.removeClass('width-none').addClass('width-half');
                $siblingPane.removeClass('width-whole').addClass('width-half');
            }

            console.log('Clicked: ' + $(this).attr('class'));
        }

    });
}

/* Slide Window Pane's in a selected direction */
function scrollPane(clickable, pane, scrollBlock) {
    var $clickable      = clickable,
        $pane           = pane,
        $scrollBlock    = $pane.children().children(scrollBlock),
        $next           = $scrollBlock.next().offset().top;

    $clickable.click(function(e) {

        if( $(this).hasClass('pane-down') ) {
            $pane.animate({
                scrollTop: $next
            }, 700);
            console.log('Scrolling down: ' + $pane.children().children());
        }
        /*
        if( $(this).hasClass('pane-up') ) {
            $pane.children().closest($scrollBlock).prev($scrollBlock);
            console.log('Scrolling up');
        }
        */
    });
}


function slidePaneDirection() {

}

function coolPop(wrapper, container, trigger) {
    var $wrapper    = wrapper,
        $container  = container,
        $trigger    = trigger;

    $trigger.click(function(){
        console.log('Clicked');
        // show coolPop
        $wrapper.fadeIn('fast');

        // close coolPop
        $('.close-modal, .modal-backdrop').click(function(){
            $wrapper.fadeOut('fast');
        });

        centerAnything("fixed",$container, $(window));

        // resize on window shift (responsive)
        $(window).resize(function(){
            centerAnything("fixed", $container, $(this))
        });

    });

}


function centerAnything(position, container, centerWrapper) {
    var $position       = position;
        $container      = container,
        $centerWrapper  = centerWrapper;

    $container.css({
        "position" : $position,
        "top"      : Math.max(0, (($centerWrapper.height() - $container.outerHeight()) / 2)) + "px",
        "left"     : Math.max(0, (($centerWrapper.width() - $container.outerWidth()) / 2) ) + "px"
    });
}

function preloadWidget() {
    $(window).on('load', function(){
        $('#status').fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(350).css({'overflow':'visible'});
    });
}






/* =========================== */
/* ********** DOCUMENT READY  */
/* ========================= */

$(document).ready(function(){

    /* Hamburger */
    var toggles = $('.c-hamburger');

    toggles.click(function(){
        $(this).toggleClass("is-active");
        $('.navigation').toggleClass("is-active");
        $('#slideContent').toggleClass("is-active");
    });

    // Hide nave on click anywhere
    $('.navigation').on('hoverOut', function (event) {

    }, function() {
        $('.slide-content, .navigation').removeClass('is-active');
    });
    $('.header-slogan').center($('.main-nav'));

    //$('.show-hide .beast-side').showHide($('.hide-right'),'right');


/* ********** RESIZE FUNCTIONS  */

    $(window).resize(function() {
        $('.header-slogan').center($('.main-nav'));
    });

    // Slide Pane
    slidePane($('.slide-pane button'), $('.contain.beast-side'), $('.contain.foody-side'));


    // Scroll Pane
    scrollPane($('.scroll-pane button'), $('.contain.beast-side'), $('.scroll-section'));

    // CollPop
    coolPop($('.coolpop.outer-wrapper'), $('.coolpop .modal-container'), $('.coolpop.trigger'));

}); // End Document Ready
