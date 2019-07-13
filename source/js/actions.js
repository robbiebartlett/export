/* ==========================================================================
   BusinessNZ - Main JS actions - Author: Rob Bartlett (BusinessNZ)
   ========================================================================== */

/*jslint browser: true*/
/*global $, jQuery, Maplace, google, alert*/


/* 1.  Menus                     :    line:38    */
/* 2.  Custom Scrollbar          :    line:168   */
/* 3.  Detect Scrolling          :    line:185   */
/* 4.  Hero slider               :    line:242   */
/* 5.  Google Maps               :    line:278   */
/* 6.  Events Calendar & Filter  :    line:425   */
/* 7.  Search Function           :    line:480   */
/* 8.  Lazy Loader               :    line:568   */
/* 9.  Timeline settings         :    line:588   */
/* 10. Join Now Modal            :    line:630   */
/* 11. Our People settings       :    line:663   */
/* 12. Subscribe                 :    line:723   */
/* 13. Global Actions            :    line:740   */
   /*  a. Variables              :    line:747   */
   /*  b. Accordian              :    line:765   */
   /*  d. Back to Top            :    line:787   */
   /*  e. Our Partners-footer    :    line:814   */
   /*  f. Pagescroll             :    line:828   */
   /*  g. Hide header on scroll  :    line:839   */
   /*  g. Sponsor Slider         :    line:850   */
/* Document - ready              :    line:873   */








//Menus
function menu() {

//Mobile Menu
    "use strict";
	var items = $('.menuoverlay, .slideLeft, .submenu, .primary-toggle'),
	    menucontent = $('.menucontent'),
    
        //Toggle Menu Open/Closed
	    menuopen = function () {
	        $(items).removeClass('menuclose').addClass('menuopen');
            $("body").addClass("no-scroll");
        },
	    menuclose = function () {
	        $(items).removeClass('menuopen').addClass('menuclose');
            $("body").removeClass("no-scroll");
	    };
    
	$('.primary-toggle, .menuoverlay').click(function () {
		if (menucontent.hasClass('menuopen')) {$(menuclose);
            } else {
            $(menuopen);
        }
          
        $(window).on('resize', function () {
    
            if ($(window).width() > 1200) {
                $("body").removeClass("no-scroll");
         
            } else {
         
                if ($('.menucontent').hasClass('menuopen')) {
                    $("body").addClass("no-scroll");
                }
         
            }
        
        });
  
	});
    
	menucontent.click(function () {
		if (menucontent.hasClass('menuopen')) {$(menuclose); }

	});

//Desktop Menu	

 //use dropdown-menu hide function via jquery to utilize display:flexbox

    $(".menu > ul > li > a").click(function (e) {
        $(".menu > ul > li > a").removeClass("active");
      
        $(this).addClass("active");
        $(".dropdown-menu").slideUp(5, 'linear'); //slide up all the sub divs

        if ($(this).next().is(":visible")) { // check if item is visible
            $(this).toggleClass('active'); //remove active class

            //submenu
            $(".dropdown-menu > ul > li > ul").slideUp(5, 'linear');
        } else {
            $(this).next().slideDown(5, 'linear'); // else slide the current down
        }

    });

    //Sub-submenu
    $(".dropdown-menu > ul > li > ul").hide();
    $(".dropdown-menu > ul > li > a.menu-submenu").click(function (e) {
         
        $(".dropdown-menu > ul > li > a.menu-submenu").removeClass("active");
        $(this).addClass("active");
       
        $(".dropdown-menu > ul > li > ul").slideUp(5, 'linear'); //slide up all the sub divs
              
        if ($(this).next().is(":visible")) { // check if item is visible
            $(this).next().slideUp('fast'); // slide current up
            $(this).toggleClass('active'); //remove active class
        } else {
            $(this).next().slideDown(10, 'linear');
        } // else slide the current down
         
    });
    
    
    
    
    //Secondary menu within page content - submenu
    $(".section-submenu ul li ul").hide();
    $(".submenu").click(function (e) {
      
        $(".section-submenu ul li a.submenu").removeClass("active");
        $(this).addClass("active");
      
        $(".section-submenu ul li ul").slideUp(10, 'linear'); //slide up all the submenus
        $(this).addClass("active"); // active  
        $(".dropdown-menu, .dropdown-menu > ul > li > ul").slideUp(10, 'linear');// slide up Main menu    
              
        if ($(this).next().is(":visible")) { // check if item is visible
            $(this).removeClass('active'); //remove active class
            $(this).next().slideUp('fast'); // slide current up
        } else {
            $(this).next().slideDown(10, 'linear'); // else slide the current down
        }
    });
    
 //Body click - Close Menus

    $('body').click(function () {
        $(".dropdown-menu, .dropdown-menu > ul > li > ul, .section-submenu ul li ul").slideUp(10, 'linear');
        $(".menu > ul > li > a, .dropdown-menu > ul > li > a.menu-submenu, .submenu").removeClass("active");
    });

    $(".menu > ul > li > a, .dropdown-menu > ul > li > a.menu-submenu, .submenu").click(function (e) {
        e.stopPropagation();
    });

}//menu()











//Custom Scrollbar
function customScrollBar() {
    "use strict";
    $(window).on("load", function () {
        $(".content").mCustomScrollbar();
    });
}//customScrollBar()










//Detect Scrolling
function detectScrolling() {

    "use strict";
    var triggerPoint = 90,
        scrTop = 0,
        featureDetected = false;
    
    
    function detectTrigger() {

        scrTop = $(window).scrollTop();
        featureDetected = false;

        if (scrTop >= 10) {
            $('html').addClass('moving');
        } else {
            $('html').removeClass('moving');
        }
      
        if (scrTop >= triggerPoint) {
            $('html').addClass('scrolling');
        } else {
            $('html').removeClass('scrolling');
        }
  
    }

    function onRepaint() {
        if (typeof window.requestAnimationFrame === "undefined") {
            detectTrigger();
            return;
        }

        if (!featureDetected) {
            window.requestAnimationFrame(detectTrigger);
        }
        featureDetected = true;
    }

    

    detectTrigger(); // run on page load for refresh when already scrolled
 
    $(window).on("scroll", function () {
        onRepaint();
    });
} // detectScrolling()









//Hero slider
function heroSlider() {
    "use strict";
    if ($('.hero-wrapper').length > 0) {//apply script to this specific class only   
        
        $('.inner').mousedown(function () {
            $(this).removeClass('hero-select').addClass('hero-selecting');
        });

        $('.inner').mouseup(function () {
            $(this).removeClass('hero-selecting').addClass('hero-select');
        });
           
        $('.hero-slider').slick({
            autoplay: true,
            autoplaySpeed: 30000,
            dots: true,
            appendDots: '#hero-nav',
            lazyload: 'ondemand',
            customPaging: function (slider, i) {
                var title = $(slider.$slides[i]).data('title');
                return ['<a>' + title + '</a>'];
            }
        });
  
    }
}//heroSlider()









//Google Maps
function gmaps() {
    "use strict";
    if ($('.google-maps-api').length > 0) {//apply script to this specific class within contact only

    //ExportNZ - SVG logo
        var MAP_PIN = 'M36.131,5.644c1.089,0.851 2.376,1.933 5.519,3.581c-5.591,4.44 -7.369,6.393 -11.886,11.754c-2.688,-0.912 -5.686,-2.1 -9.737,-4.251c4.979,-4.71 10.187,-8.255 16.104,-11.084Z, M42.523,9.656c3.063,1.474 4.944,2.009 7.938,2.793c-3.243,5.274 -4.498,8.006 -6.397,11.986c-6.529,-0.998 -9.246,-1.907 -13.401,-3.141c4.041,-5.204 8.224,-8.843 11.86,-11.638Z, M51.355,12.648c3.854,0.83 7.274,0.931 8.942,0.933c0.066,-0.009 -3.221,11.78 -3.221,11.78c-5.604,-0.068 -8.39,-0.36 -12.126,-0.823c2.112,-4.569 4.274,-8.461 6.405,-11.89Z, M61.196,13.578c2.757,-0.03 5.498,-0.286 8.223,-0.759c0.307,3.99 0.25,7.947 -0.128,11.874c-3.707,0.418 -7.482,0.645 -11.326,0.671c1.125,-3.927 2.203,-7.855 3.231,-11.786Z, M70.277,12.668c3.443,-0.653 6.728,-1.547 9.832,-2.755c2.572,3.419 4.361,7.316 5.427,11.655c-5.145,1.426 -10.284,2.39 -15.372,3.026c0.356,-3.888 0.442,-7.869 0.113,-11.926Z, M80.957,9.596c0.899,-0.345 1.678,-0.666 2.335,-0.964c3.731,3.371 6.317,7.136 8.146,11.161c-1.599,0.523 -3.293,1.04 -5.068,1.551c-1.149,-4.515 -2.916,-8.464 -5.413,-11.748Z, M70.201,11.797c3.171,-0.613 6.291,-1.457 9.346,-2.591c-3.337,-3.92 -7.537,-6.505 -13.036,-7.315c2.303,2.243 3.137,5.501 3.69,9.906Z, M64.449,1.733c2.707,0.785 4.249,4.565 4.892,10.22c-2.662,0.482 -5.291,0.711 -7.892,0.743c1.043,-3.831 2.037,-7.484 3,-10.963Z, M63.56,1.671l-3.024,11.05c-2.894,-0.002 -5.787,-0.309 -8.68,-0.851c4.535,-6.735 8.493,-10.435 11.704,-10.199Z, M43.329,9.07c2.322,1.115 4.87,1.975 7.624,2.601c2.97,-4.612 5.899,-7.877 8.783,-9.73c-5.402,0.773 -10.875,3.23 -16.407,7.129Z, M37.013,5.224c1.516,1.265 3.405,2.354 5.472,3.384c6.283,-4.289 13.001,-7.838 21.816,-7.828c7.794,0.484 12.393,3.918 16.116,8.099c0.764,-0.258 1.484,-0.54 2.129,-0.878c-4.064,-3.692 -10.117,-6.612 -18.483,-7.548c-9.611,-0.917 -18.669,0.992 -27.05,4.771Z, M19.397,17.388l9.764,4.32l-10.156,16.862l-12.738,-3.142l13.13,-18.04Z, M19.37,17.364c2.846,1.581 6.127,3.027 9.809,4.349c-3.49,4.536 -6.982,9.957 -10.208,16.928c-4.137,-0.824 -8.389,-1.888 -12.759,-3.204c3.431,-6.943 7.865,-12.921 13.158,-18.073Z, M30.074,22.022c4.463,1.46 9.001,2.526 13.612,3.216c0,0 -2.225,5.15 -2.246,5.162c-5.236,3.13 -7.754,5.85 -10.718,10.109c-3.754,-0.435 -7.362,-1.019 -10.87,-1.707c2.711,-5.993 6.176,-11.553 10.222,-16.78Z, M44.59,25.352c4.038,0.535 8.124,0.837 12.264,0.872l-0.134,0.42c-4.708,-0.467 -9.373,0.725 -14.009,3.053c0.604,-1.455 1.225,-2.904 1.879,-4.345, M57.609,26.778l0.151,-0.57c3.445,0.039 7.27,-0.179 11.476,-0.655c-0.255,2.713 -0.597,5.306 -0.973,7.852c-2.459,-3.256 -5.834,-5.633 -10.654,-6.627, M70.108,25.49c5.192,-0.619 10.395,-1.639 15.611,-3.06c1.161,4.913 1.489,10.424 1.002,16.518c-5.101,0.916 -10.215,1.584 -15.342,2.048c-0.48,-2.281 -1.248,-4.469 -2.416,-6.528c0.447,-2.882 0.832,-5.868 1.145,-8.978Z, M86.589,22.173c1.847,-0.495 3.61,-1.025 5.22,-1.581c2.207,5.238 3.158,10.873 3.005,16.8c-2.585,0.562 -5.001,1.025 -7.17,1.387c0.367,-5.21 0.178,-10.791 -1.055,-16.606Z, M5.847,36.189c4.072,1.328 8.318,2.413 12.721,3.275c-1.703,3.796 -3.1,7.662 -4.177,11.602l-13.348,-0.137c0.907,-4.998 2.469,-9.879 4.804,-14.74Z, M19.496,39.628c3.475,0.732 7.049,1.298 10.728,1.693c-0.202,-0.009 -3.474,6.529 -3.904,9.854l-11.001,-0.136c1.069,-3.833 2.474,-7.601 4.177,-11.411Z, M47.039,41.73l5.542,0.109l0.873,-3.166c-2.401,0.592 -4.523,1.637 -6.415,3.057Z, M53.481,41.839l0.929,-3.357c5.097,-0.881 9.086,0.199 11.983,2.92c-4.799,0.322 -9.007,0.411 -12.912,0.437Z, M45.975,42.658l6.36,0.082l-2.32,8.544l-9.118,-0.082c0.855,-3.299 2.474,-6.111 5.078,-8.544Z, M53.236,42.74c4.118,-0.004 8.546,-0.154 13.376,-0.491c-0.687,3.221 -1.43,6.271 -2.239,9.117c-4.754,-0.04 -9.391,-0.001 -13.485,-0.055l2.348,-8.571Z, M67.431,42.44c2.113,2.621 3.453,5.669 3.985,9.008l-6.087,-0.082c0.772,-2.945 1.471,-5.903 2.102,-8.926Z, M71.553,41.866c5.048,-0.534 10.047,-1.122 15.068,-1.992c-0.404,4.192 -1.082,8.018 -2.102,11.629l-12.912,-0.11c0.413,-3.244 0.407,-6.422 -0.054,-9.527Z, M87.576,39.71l7.207,-1.42c-0.34,4.642 -1.338,9.074 -3.085,13.267l-6.224,-0.027c0.971,-3.804 1.677,-7.77 2.102,-11.82Z, M0.819,51.827l13.296,0.084c-1.15,4.304 -1.936,8.71 -2.412,13.191c-3.859,0.678 -7.651,1.481 -11.342,2.354c-0.499,-5.289 -0.485,-10.336 0.458,-15.629Z, M15.017,51.953l11.052,0.042c-0.726,3.729 -0.694,7.487 0.007,11.182c-4.802,0.481 -9.172,1.048 -13.471,1.778c0.451,-4.307 1.178,-8.637 2.412,-13.002Z, M40.644,52.1l9.059,0.063l-2.726,10.045c-2.149,0.013 -4.097,0.027 -5.809,0.042c-0.97,-3.235 -1.251,-6.599 -0.524,-10.15Z, M50.626,52.184l13.611,0.063c-0.961,3.651 -2.034,7.151 -3.167,10.569c-5.19,-0.363 -9.476,-0.484 -13.212,-0.566l2.768,-10.066Z, M65.18,52.268l19.085,0.146c-1.318,4.788 -2.908,9.048 -4.677,12.961c-5.578,-1.085 -11.413,-1.948 -17.637,-2.475c1.053,-3.36 2.12,-6.836 3.229,-10.632Z, M85.187,52.435l6.124,0c-2.643,5.647 -6.002,9.983 -9.92,13.296l-0.922,-0.168c1.708,-3.877 3.319,-8.11 4.718,-13.128Z, M92.779,68.688l2.579,0.86c2.329,-4.958 4.097,-9.939 5.013,-14.953c-1.84,5.161 -4.425,9.822 -7.592,14.093Z, M80.049,66.36l0.483,0.105l-0.755,0.566l0.272,-0.671Z, M61.636,63.781c6.251,0.515 12.085,1.345 17.553,2.454l-0.901,1.908c-6.776,4.528 -13.57,6.436 -20.385,5.599c1.412,-3.498 2.688,-6.852 3.733,-9.961Z, M60.734,63.697c-1.133,3.364 -2.378,6.688 -3.711,9.982c-4.019,-0.578 -7.727,-2.049 -11.011,-4.739l1.636,-5.83c4.562,0.031 8.902,0.245 13.086,0.587Z, M46.725,63.11c-1.785,-0.043 -3.516,-0.025 -5.2,0.042c1.061,2.392 2.369,3.978 3.795,5.18l1.405,-5.222Z, M30.489,74.343c1.033,1.635 2.321,3.168 3.696,4.6l-4.23,0.359c0.129,-1.562 0.3,-3.245 0.534,-4.959Z, M26.25,64.033c-4.957,0.488 -9.477,1.112 -13.71,1.831c-0.497,5.838 -0.144,11.304 1.057,16.46c5.031,-1.347 10.179,-2.296 15.482,-2.921c0.157,-2.118 0.431,-4.195 0.694,-6.227c-1.543,-2.647 -2.78,-5.693 -3.523,-9.143Z, M11.655,66.019c-3.766,0.668 -7.487,1.422 -11.176,2.298c1.021,7.06 3.041,12.239 5.519,16.319c2.174,-0.725 4.447,-1.451 6.765,-2.079c-1.193,-5.464 -1.566,-10.975 -1.108,-16.538Z, M92.22,69.442l2.762,0.868c-3.566,7.244 -8.323,13.174 -13.748,18.369c-2.792,-1.617 -5.744,-3.093 -8.901,-4.386c6.649,-2.734 13.432,-6.68 19.887,-14.851Z, M71.122,84.762c-1.134,0.386 -2.305,0.744 -3.514,1.074c-3.703,4.294 -7.194,7.383 -10.575,9.902c2.449,1.318 4.713,2.841 6.755,4.588c6.488,-2.878 11.961,-6.6 16.766,-11c-2.94,-1.676 -6.047,-3.256 -9.432,-4.564Z, M51.627,87.133c5.106,0.567 9.932,0.114 14.546,-0.964c-2.918,3.264 -6.207,6.324 -9.996,9.128c-2.259,-1.084 -4.789,-2.013 -7.745,-2.758c1.155,-1.753 3.219,-5.386 3.195,-5.406Z, M41.807,84.342c2.954,1.431 5.922,2.207 8.897,2.67c-0.991,1.796 -2.037,3.576 -3.178,5.329c-2.545,-0.544 -5.093,-0.872 -7.647,-0.957l1.928,-7.042Z, M35.039,79.742c1.868,1.738 3.863,3.141 5.984,4.211l-2.033,7.409c-3.026,-0.085 -6.062,0.133 -9.109,0.64c-0.351,-3.645 -0.37,-7.534 0.004,-11.826c1.724,-0.186 3.442,-0.33 5.154,-0.434Z, M29.004,80.276c-5.23,0.63 -10.288,1.614 -15.203,2.892c1.1,4.325 2.862,8.223 5.484,11.568c3.209,-1.113 6.448,-2.003 9.728,-2.586c-0.333,-3.946 -0.355,-7.903 -0.009,-11.874Z, M6.442,85.398c2.141,-0.751 4.336,-1.438 6.524,-2.001c1.175,4.436 2.969,8.345 5.465,11.655l-2.578,1.033c-3.537,-2.736 -6.682,-6.334 -9.411,-10.687Z, M19.882,95.46c3.062,-1.08 6.137,-1.93 9.23,-2.446c0.694,5.418 2.183,8.304 4.15,9.668c-5.213,-0.629 -9.722,-2.921 -13.38,-7.222Z, M29.965,92.865c2.988,-0.453 5.918,-0.672 8.788,-0.645l-2.902,10.609c-3.446,-0.377 -5.13,-4.25 -5.886,-9.964Z, M39.647,92.241c2.561,0.093 5.011,0.393 7.36,0.881c-2.683,3.72 -5.687,8.21 -10.25,9.65l2.89,-10.531Z, M47.917,93.314c2.684,0.65 5.155,1.51 7.433,2.56c-5.905,4.133 -11.154,6.035 -16.046,6.72c2.764,-1.71 5.623,-4.643 8.613,-9.28Z, M19.013,95.789c-0.863,0.315 -1.641,0.628 -2.36,0.94c5.731,4.272 12.169,6.929 19.404,7.859c9.362,1.205 18.243,-0.264 26.84,-3.883c-2.139,-1.757 -4.362,-3.239 -6.641,-4.385c-7.032,4.962 -13.674,7.262 -20.138,7.414c-7.133,-0.091 -12.887,-2.711 -17.105,-7.945Z',
            
            //google map co-ordinates         
            regions = [
                {
                    lat: -41.28593513,
                    lon: 174.77719923,
                    title: 'National Office',
                    html: 'ExportNZ - National Office'
                },
                {
                    lat: -36.8653216,
                    lon: 174.7657968,
                    title: 'Auckland',
                    html: 'ExportNZ - Auckland'
                },
                {
                    lat: -37.7908218,
                    lon: 175.279071,
                    title: 'Waikato',
                    html: 'ExportNZ - Waikato'
                },
                {
                    lat: -37.6738206,
                    lon: 176.1649968,
                    title: 'Bay of Plenty',
                    html: 'ExportNZ - Bay of Plenty'
                },
                {
                    lat: -39.4827079,
                    lon: 176.8963028,
                    title: 'Hawkes Bay',
                    html: 'ExportNZ - Hawkes Bay'
                },
                {
                    lat: -41.28593513,
                    lon: 174.77719923,
                    title: 'Wellington',
                    html: 'ExportNZ - Wellington'
                },
                {
                    lat: -43.5262964,
                    lon: 172.6320359,
                    title: 'Canterbury',
                    html: 'ExportNZ - Canterbury'
                },
                {
                    lat: -45.8939381,
                    lon: 170.5019658,
                    title: 'Otago-Southland',
                    html: 'ExportNZ - Otago-Southland'
                }
            ];
  
        new Maplace({
            locations: regions,
            controls_div: '#contact-menu',
            controls_type: 'list',
            controls_on_map: false,
            view_all: false,
            start: [1],

            shared: {
                html: '%index',
                zoom: 15,
        
                icon: {
                    path: MAP_PIN,
                    fillColor: '#008ac1',
                    fillOpacity: 1,
                    strokeColor: '',
                    strokeWeight: 0,
                    scale: 1 / 3
                },
                
                map_options: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    gestureHandling: 'cooperative'
                    
                },

                listeners: {
                    click: function (map, event) {
                        map.setOptions({
                            scrollwheel: true
                        });
                    }
                },
                
                animation: google.maps.Animation.DROP
       
            }

        }).Load();
        
        
        //region specific header 
        $(".header > .province:not(:first-child)").hide();  //hide all but first  

        $('#ullist_a_1').click(function () {
            $("#National").show().siblings().hide();
        });
        $('#ullist_a_2').click(function () {
            $("#Auckland").show().siblings().hide();
        });

        $('#ullist_a_3').click(function () {
            $("#Waikato").show().siblings().hide();
        });

        $('#ullist_a_4').click(function () {
            $("#BayOfPlenty").show().siblings().hide();
        });

        $('#ullist_a_5').click(function () {
            $("#HawkesBay").show().siblings().hide();
        });

        $('#ullist_a_6').click(function () {
            $("#Wellington").show().siblings().hide();
        });

        $('#ullist_a_7').click(function () {
            $("#Canterbury").show().siblings().hide();
        });

        $('#ullist_a_8').click(function () {
            $("#OtagoSouthland").show().siblings().hide();
        });
        
    }
}//gmaps()









//Events Calendar
function eventsCalendar() {
    "use strict";
    if ($('.events-calendar').length > 0) {//apply script to this specific class only    
  
        $(window).load(function () {

		    $('#mycalendar').monthly({
			    mode: 'event',
			    xmlUrl: '../dist/events.xml'
		    });

            switch (window.location.protocol) {
            case 'http:':
            case 'https:':
            // running on a server, should be good.
                break;
            case 'file:':
                alert('Events will not work when run locally, will be fine once site is hosted');
                break;
	        }

	    });
     
    }
        
        
    //Events Filter
    $('.dropdown').hide();
        
    $('#events').click(function (event) {
        
        event.stopPropagation();
        
        $(this).toggleClass('active');
        $('.dropdown').toggle();
        
    });
    
    $(document).click(function () {
        $('#events').removeClass('active');
        $('.dropdown').hide();

    });
     
}//eventsCalendar()









//Search function  
function search() {
    "use strict";
    
    var largeScreen = 1201;

    function toggleSearch(type) {
		if (type === "close") {
			//close serach 
			$('.search, .search-trigger, .menuoverlay').removeClass('searchopen');
		} else {
			//toggle search visibility
			$('.search, .search-trigger, .menuoverlay').toggleClass('searchopen');
			if ($(window).width() > largeScreen && $('.search').hasClass('searchopen')) {
                $('.search').find('input[type="search"]').focus();
            }
		}
	}

	function checkWindowWidth() {
		//check window width (scrollbar included)
		var e = window,
            a = 'inner';
        if (window.hasOwnProperty('innerWidth')) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if (e[a + 'Width'] >= largeScreen) {
			return true;
		} else {
			return false;
		}
	}

    $('.search-trigger').on('click', function (event) {

        if (!$(this).hasClass("searchopen")) {
            $("body").addClass("no-scroll");
        } else {
            $("body").removeClass("no-scroll");
        }

        $('.page').removeClass("marginleft");
        $('.menu-submenu li a, .main-menu').removeClass('active');
        $('.menuoverlay, .slideLeft, .menu-submenu, .primary-toggle').removeClass('menuopen').addClass('menuclose');
        
       
        event.preventDefault();
	    toggleSearch();
	
	});


	$('.menuoverlay, .primary-toggle').on('click', function () {
		toggleSearch('close');
		$('.menuoverlay').removeClass('searchopen');
	});
    
     //Hiding search functions on resize
    $(window).on('resize', function () {
    
        if ($(window).width() >= 1200) {

            $('.search').find('input[type="search"]').focus();
            $('html').removeClass('search-visible show-search');
            $('body').removeClass('searchopen searchopen no-scroll');

        } else {

            if ($('.menucontent').hasClass('searchopen')) {
                $("body").addClass("no-scroll");
            }

        }

    });

}//search()









//lazyloader
function lazyloader() {
    "use strict";
    $('.lazy').Lazy({
        effect: "fadeIn",
        effectTime: 1000,
        threshold: 0
    });

}//lazyloader()










//Timeline
function timeline() {
    "use strict";
    if ($('#timeline').length > 0) {//apply script to this specific class only     
  
        jQuery(document).ready(function ($) {
	        var $timeline_block = $('.timeline-block');

	        //hide timeline blocks which are outside the viewport
	        $timeline_block.each(function () {
		        if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
			        $(this).find('.timeline-img, .timeline-content').addClass('is-hidden');
		        }
	        });

	        //on scolling, show/animate timeline blocks when enter the viewport
	        $(window).on('scroll', function () {
		        $timeline_block.each(function () {
			        if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.timeline-img').hasClass('is-hidden')) {
				        $(this).find('.timeline-img, .timeline-content').removeClass('is-hidden').addClass('bounce-in');
			        }
                });
            });
        });

    }
    
}//timeline()










//Join Now Modal
function joinModal() {
    "use strict";
    if ($('.graph').length > 0) {//apply script to this specific class only        
       
        var modalNumber;

        $(".join").on("click", function () {
            modalNumber = $(this).data("modal");
            $("#modal" + modalNumber).toggleClass('modal-show');
        });

        $(".overlay").on("click", function () {
            $("#modal" + modalNumber).toggleClass('modal-show');
        });

        $(".modal-close").on("click", function () {
            $("#modal" + modalNumber).toggleClass('modal-show');
        });

    }
    
}//joinModal()









//ourPeople
function ourPeople() {
    "use strict";
    $('.slide > a').click(function (event) {
        event.preventDefault();

        var active_person_selector = $('.slide.current > a').attr('href'),
            active_person = $('.slide.current'),
            target_person_selector = $(this).attr('href');
        
        active_person.removeClass('current');

        $(this).parents('.slide').addClass('current');

        $(active_person_selector).removeClass('current').addClass('hide');

        $(target_person_selector).removeClass('hide').addClass('current');
    });
    
    $('.slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 3,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    arrows: false,
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 3
                }
            }
        ]
    });
   
}//ourPeople() 









//Subscribe button
function subscribe() {
    "use strict";
    var removeClass = true;
    $('#mce-EMAIL').click(function () {
        $(this).addClass("active");
        $(this).attr('placeholder', 'Email Address');
        $('#mc-embedded-subscribe').addClass("show");
        $('div.mce_inline_error').show();
        $('.subscribe-button').hide();
        removeClass = false;
    });
}//subscribe()










//Global Actions
function globalActions() {
    "use strict";
    
    
    
    
//Variables
    
    //Accordian Var
    var close_accordion = function () {
            $('.accordion .accordion-title').removeClass('active');
            $('.accordion .accordion-content').slideUp(300).removeClass('open');
        },
        
        //Back to top Var
        amountScrolled = 500,
        CurrentScroll = 0,
    
        // Hide Header Var
        prev = 0,
        $window = $(window),
        nav = $('header');
    
    
    //Accordian
    $('.accordion-title').click(function (e) {
        // Grab current anchor value
        var currentAttrValue = jQuery(this).attr('href');

        if (jQuery(e.target).is('.active')) {
            close_accordion();
        } else {
            close_accordion();

            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
        }

        e.preventDefault();
    });

    
    
    
    //Back to Top
    $('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');
  
    
    $(window).scroll(function (event) {

        var NextScroll = $(this).scrollTop();

        if (NextScroll > amountScrolled) {
            $('a.back-to-top').addClass('popup');
        } else {
            $('a.back-to-top').removeClass('popup');
        }

        CurrentScroll = NextScroll;
    });

    $('a.back-to-top').click(function () {
	    $('html, body').animate({
		    scrollTop: 0
	    }, 500);
	    return false;
    });
    
    
    
    
    //Our Partners - mobile version in footer
    $('.our-partners').click(function () {
    
        if ($(window).width() < 768) {
            $(this).toggleClass('active');
            $('.partner-links').slideToggle(10, 'linear');
        }
    
    });
    
    
    
    
    
    //Page Scroll
    $(".scroll").click(function () {
        $('html, body').animate({
            scrollTop: $("#to-here").offset().top - 50//offset 60px for fixed header
        }, 900);
    });
    
    
    
    
    
    // Hide Header on on scroll down
    $(window).scroll(function (event) {
        var scrollTop = $window.scrollTop();
        nav.toggleClass('hide', scrollTop > prev);
        prev = scrollTop;
    });
    
    
    
    
    
    //sponsors slider
    $('.section-sponsors > div').slick({
        dots: false,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 8000
    });
    
    
    
    
    
}//globalActions()










//Document - load
$(document).ready(function () {
    "use strict";
    customScrollBar();
    detectScrolling();
    eventsCalendar();
    globalActions();
    gmaps();
    heroSlider();
    joinModal();
    lazyloader();
    menu();
    ourPeople();
    search();
    subscribe();
    timeline();
});