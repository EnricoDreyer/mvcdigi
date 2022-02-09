var channelsList = [];
var channelListLoaded = false;
var channelListShows = false;
var isRegistered = false;
var stopPropagation = false;
var urlParams = new URLSearchParams(window.location.search);
var carouselStyleBeforeExpand = {
    "transform": null,
    "width": null
}

$(window).scroll(function(e) {
    var main = $("#main").height();
    var header = $("#header-img").height();
    var total = main + header + 150;
    
    if(($(window).scrollTop() + $(window).height()) >= total) {
        $(window).scrollTop( total - ($(window).height()));
    }
});

getChannelsList();

/* Mounted */
$(document).ready(function() {
    
    feather.replace();
    // closeNav();
    isRegistered = urlParams.has('registered');
    
    $("#toggle-channels-btn").css("cursor", "auto");
    $("#channelsModal").css("cursor", "auto");

    updateContainer();
    $(window).resize(function() {
        updateContainer();
    });

    toggleSignedInContent();
    toggleUploadDiv();
    toggleSearchDiv();
    toggleProfileDiv();

    initCarousels();

    window.onscroll = function() {
        toggleScrollTopBtn();
    };

    $(".video-expand_btn").click(function() {
        var expandBtn = $(this);
        var lessBtn = expandBtn.siblings(".video-less_btn");
        document. getElementById("video_swiper"). style. display = "none";
        var carouselContainer = $(this).closest(".video-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".video-row").find(".purejscarousel-slides-container");
        var expandedVideosContainer = $(this).closest(".video-row").find(".expanded-videos");

        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');

        expandBtn.attr("style", "display: none");
        lessBtn.attr("style", "display: block");
        carouselContainer.attr("style", "display: none");
        expandedVideosContainer.attr("style", "display: inline");
    });

    $(".video-less_btn").click(function() {
        var lessBtn = $(this);
        var expandBtn = lessBtn.siblings(".video-expand_btn");
        document. getElementById("video_swiper"). style. display = "block";
        var carouselContainer = $(this).closest(".video-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".video-row").find(".purejscarousel-slides-container");
        var expandedVideosContainer = $(this).closest(".video-row").find(".expanded-videos");

        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');

        lessBtn.attr("style", "display: none");
        expandBtn.attr("style", "display: block !important");
        carouselContainer.attr("style", "display: block");
        carouselSlidesContainer.css({
            'transform': carouselStyleBeforeExpand.transform,
            'width': carouselStyleBeforeExpand.width
        });
        expandedVideosContainer.attr("style", "display: none");
    });

    $(".poster-expand_btn").click(function() {
        var expandBtn = $(this);
        var lessBtn = expandBtn.siblings(".poster-less_btn");
        var carouselContainer = $(this).closest(".poster-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".poster-row").find(".purejscarousel-slides-container");
        var expandedPostersContainer = $(this).closest(".poster-row").find(".expanded-posters");

        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');

        expandBtn.attr("style", "display: none");
        lessBtn.attr("style", "display: block");
        carouselContainer.attr("style", "display: none");
        expandedPostersContainer.attr("style", "display: inline");
    });

    $(".poster-less_btn").click(function() {
        var lessBtn = $(this);
        var expandBtn = lessBtn.siblings(".poster-expand_btn");

        var carouselContainer = $(this).closest(".poster-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".poster-row").find(".purejscarousel-slides-container");
        var expandedPostersContainer = $(this).closest(".poster-row").find(".expanded-posters");

        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');

        lessBtn.attr("style", "display: none");
        expandBtn.attr("style", "display: block !important");
        carouselContainer.attr("style", "display: block");
        carouselSlidesContainer.css({
            'transform': carouselStyleBeforeExpand.transform,
            'width': carouselStyleBeforeExpand.width
        });
        expandedPostersContainer.attr("style", "display: none");
    });


    // mobile
    $(".video-expand_btn__mobile").click(function() {
        var expandBtn = $(this);
        var lessBtn = expandBtn.siblings(".video-less_btn__mobile");
        var expandCollapseContainer = expandBtn.parent();

        var carouselContainer = expandCollapseContainer.siblings("#mobile-video-carousel");
        var carouselParent = carouselContainer.parent();

        var expandedVideosContainer = carouselParent.find(".expanded-videos");

        $("#video_swiper").css("display", "none");
        $("#mobile-video-carousel").css("display", "block");

        expandBtn.attr("style", "display: none");
        lessBtn.attr("style", "display: block");
        carouselContainer.attr("style", "display: none").data("isvisible", false);
        expandedVideosContainer.attr("style", "display: inline");

        $(".expanded-videos").css("display", "inline");
    });

    $(".video-less_btn__mobile").click(function() {
        var lessBtn = $(this);
        var expandBtn = lessBtn.siblings(".video-expand_btn__mobile");
        var expandCollapseContainer = lessBtn.parent();

        var carouselContainer = expandCollapseContainer.siblings("#mobile-video-carousel");
        var carouselParent = carouselContainer.parent();

        var expandedVideosContainer = carouselParent.find(".expanded-videos");

        $("#mobile-video-carousel").css("display", "none");
        $(".poster-expand_btn__mobile").css("display", "none");
        $("#video_swiper").css("display", "block");

        lessBtn.attr("style", "display: none");
        expandBtn.attr("style", "display: block !important");
        carouselContainer.attr("style", "display: none").data("isvisible", true);
        expandedVideosContainer.attr("style", "display: none");

        $(".expanded-videos").css("display", "none");
    });

    $(".poster-expand_btn__mobile").click(function() {
        var expandBtn = $(this);
        var lessBtn = expandBtn.siblings(".poster-less_btn__mobile");
        var expandCollapseContainer = expandBtn.parent();

        var carouselContainer = expandCollapseContainer.siblings("#mobile-poster-carousel");
        var carouselParent = carouselContainer.parent();

        var expandedPostersContainer = carouselParent.find(".expanded-posters");

        expandBtn.attr("style", "display: none");
        lessBtn.attr("style", "display: block");
        carouselContainer.attr("style", "display: none").data("isvisible", false);
        expandedPostersContainer.attr("style", "display: inline");
    });

    $(".poster-less_btn__mobile").click(function() {
        var lessBtn = $(this);
        var expandBtn = lessBtn.siblings(".poster-expand_btn__mobile");
        var expandCollapseContainer = lessBtn.parent();

        var carouselContainer = expandCollapseContainer.siblings("#mobile-poster-carousel");
        var carouselParent = carouselContainer.parent();

        var expandedPostersContainer = carouselParent.find(".expanded-posters");

        lessBtn.attr("style", "display: none");
        expandBtn.attr("style", "display: block !important");
        carouselContainer.attr("style", "display: block !important").data("isvisible", true);
        expandedPostersContainer.attr("style", "display: none");
    });

    $(".school-expand_btn").click(function() {
        var expandBtn = $(this);
        var lessBtn = expandBtn.siblings(".school-less_btn");

        document.getElementById("sub-channels"). style.display = "none";

        var carouselContainer = $(this).closest(".poster-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".poster-row").find(".expanded-posters");
        var expandedVideosContainer = $(this).closest(".expanded-posters").find(".poster-expand_0");

        
        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');
        
        carouselSlidesContainer.css({"display": "flex"});
        
        expandBtn.attr("style", "display: none");
        lessBtn.attr("style", "display: block");
        carouselContainer.attr("style", "display: none");
        expandedVideosContainer.attr("style", "display: flex");
        $("#poster-expand_0").css({"display": "flex"});
        $("#expanded-posters").css({"display": "flex"});
    });
    
    $(".school-less_btn").click(function() {
        var lessBtn = $(this);
        var expandBtn = lessBtn.siblings(".school-expand_btn");
        document. getElementById("sub-channels"). style.display = "block";
        var carouselContainer = $(this).closest(".video-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".video-row").find(".purejscarousel-slides-container");
        var expandedVideosContainer = $(this).closest(".expanded-posters").find(".poster-expand_0");
    
        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');
    
        lessBtn.attr("style", "display: none");
        expandBtn.attr("style", "display: block !important");
        carouselContainer.attr("style", "display: block");
        carouselSlidesContainer.css({
            'transform': carouselStyleBeforeExpand.transform,
            'width': carouselStyleBeforeExpand.width
        });
        expandedVideosContainer.attr("style", "display: none");

        $("#poster-expand_0").css({"display": "none"});
        $("#expanded-posters").css({"display": "none"});
    });

    $(".school-expand_btn__mobile").click(function() {
        var expandBtn = $(this);
        var lessBtn = expandBtn.siblings(".school-less_btn__mobile");

        document.getElementById("sub-channels"). style.display = "none";

        var carouselContainer = $(this).closest(".poster-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".poster-row").find(".expanded-posters");
        var expandedVideosContainer = $(this).closest(".expanded-posters").find(".poster-expand_0");

        
        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');
        
        carouselSlidesContainer.css({"display": "flex"});
        
        expandBtn.attr("style", "display: none");
        lessBtn.attr("style", "display: block !important");

        $(".school-expand_btn__mobile").css("display", "none");
        $(".school-less_btn__mobile").css("display", "block");

        carouselContainer.attr("style", "display: none");
        expandedVideosContainer.attr("style", "display: flex");
        $("#poster-expand_0").css({"display": "flex"});
        $("#expanded-posters").css({"display": "flex"});

        $(".expand-collapse-container_mobile").css("display", "block");
    });
    
    $(".school-less_btn__mobile").click(function() {
        var lessBtn = $(this);
        var expandBtn = lessBtn.siblings(".school-expand_btn__mobile");
        document. getElementById("sub-channels"). style.display = "block";
        var carouselContainer = $(this).closest(".video-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".video-row").find(".purejscarousel-slides-container");
        var expandedVideosContainer = $(this).closest(".expanded-posters").find(".poster-expand_0");
    
        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');
    
        lessBtn.attr("style", "display: none");
        expandBtn.attr("style", "display: block !important");

        $(".school-expand_btn__mobile").css("display", "block");
        $(".school-less_btn__mobile").css("display", "none");

        carouselContainer.attr("style", "display: block");
        carouselSlidesContainer.css({
            'transform': carouselStyleBeforeExpand.transform,
            'width': carouselStyleBeforeExpand.width
        });
        expandedVideosContainer.attr("style", "display: none");

        $("#poster-expand_0").css({"display": "none"});
        $("#expanded-posters").css({"display": "none"});

        $(".expand-collapse-container_mobile").css("display", "block");
    });

    $(".live-expand_btn").click(function() {
        var expandBtn = $(this);
        var lessBtn = expandBtn.siblings(".live-less_btn");

        document.getElementById("live_swiper").style.display = "none";

        var carouselContainer = $(this).closest(".live-video-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".live-video-row").find(".expanded-posters");

        var expandedVideosContainer = $(this).closest(".expanded-posters").find(".video-live-expand_0");

        
        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');
        
        carouselSlidesContainer.css({"display": "flex"});
        
        expandBtn.attr("style", "display: none");

        lessBtn.attr("style", "display: block");

        carouselContainer.attr("style", "display: none");
        expandedVideosContainer.attr("style", "display: flex");

        $("#video-live-expand_0").css({"display": "flex"});
        $(".expanded-live-videos").css({"display": "flex"});
    });

    $(".live-less_btn").click(function() {
        var lessBtn = $(this);
        var expandBtn = lessBtn.siblings(".live-expand_btn");

        document. getElementById("live_swiper"). style.display = "block";

        var carouselContainer = $(this).closest(".live-video-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".live-video-row").find(".purejscarousel-slides-container");
        var expandedVideosContainer = $(this).closest(".expanded-posters").find(".video-live-expand_0");
    
        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');
    
        lessBtn.attr("style", "display: none");

        expandBtn.attr("style", "display: block !important");

        carouselContainer.attr("style", "display: block");
        carouselSlidesContainer.css({
            'transform': carouselStyleBeforeExpand.transform,
            'width': carouselStyleBeforeExpand.width
        });
        expandedVideosContainer.attr("style", "display: none");

        $("#video-live-expand_0").css({"display": "none"});
        $(".expanded-live-videos").css({"display": "none"});
    });

    $(".live-video-expand_btn__mobile").click(function() {
        var expandBtn = $(this);
        var lessBtn = expandBtn.siblings(".live-video-less_btn__mobile");

        document.getElementById("live_swiper").style.display = "none";

        var carouselContainer = $(this).closest(".live-video-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".live-video-row").find(".expanded-posters");

        var expandedVideosContainer = $(this).closest(".expanded-posters").find(".video-live-expand_0");

        
        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');
        
        carouselSlidesContainer.css({"display": "flex"});
        
        expandBtn.attr("style", "display: none");

        lessBtn.attr("style", "display: block");
        carouselContainer.attr("style", "display: none");
        expandedVideosContainer.attr("style", "display: flex");

        $("#video-live-expand_0").css({"display": "flex"});
        $(".expanded-live-videos").css({"display": "flex"});
    });

    $(".live-video-less_btn__mobile").click(function() {
        var lessBtn = $(this);
        var expandBtn = lessBtn.siblings(".live-video-expand_btn__mobile");

        document. getElementById("live_swiper"). style.display = "block";

        var carouselContainer = $(this).closest(".live-video-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".live-video-row").find(".purejscarousel-slides-container");
        var expandedVideosContainer = $(this).closest(".expanded-posters").find(".video-live-expand_0");
    
        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');
    
        lessBtn.attr("style", "display: none");

        expandBtn.attr("style", "display: block !important");

        carouselContainer.attr("style", "display: block");
        carouselSlidesContainer.css({
            'transform': carouselStyleBeforeExpand.transform,
            'width': carouselStyleBeforeExpand.width
        });
        expandedVideosContainer.attr("style", "display: none");

        $("#video-live-expand_0").css({"display": "none"});
        $(".expanded-live-videos").css({"display": "none"});
    });

    //Other

    $(".other-expand_btn").click(function() {
        var expandBtn = $(this);
        var lessBtn = expandBtn.siblings(".other-less_btn");

        document.getElementById("other-channels").style.display = "none";

        var carouselContainer = $(this).closest(".other-video-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".other-video-row").find(".expanded-other-videos");

        var expandedVideosContainer = $(this).closest(".expanded-other-videos").find(".video-other-expand_0");
        
        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');
        
        carouselSlidesContainer.css({"display": "flex"});
        
        expandBtn.attr("style", "display: none");

        lessBtn.attr("style", "display: block");
        carouselContainer.attr("style", "display: none");
        expandedVideosContainer.attr("style", "display: flex");

        $("#video-other-expand_0").css({"display": "flex"});
        $(".expanded-other-videos").css({"display": "flex"});
    });

    $(".other-less_btn").click(function() {
        var lessBtn = $(this);
        var expandBtn = lessBtn.siblings(".other-expand_btn");

        document. getElementById("other-channels"). style.display = "block";

        var carouselContainer = $(this).closest(".other-video-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".other-video-row").find(".purejscarousel-slides-container");

        var expandedVideosContainer = $(this).closest(".expanded-other-videos").find(".video-other-expand_0");
    
        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');
    
        lessBtn.attr("style", "display: none");

        expandBtn.attr("style", "display: block !important");

        carouselContainer.attr("style", "display: block");
        carouselSlidesContainer.css({
            'transform': carouselStyleBeforeExpand.transform,
            'width': carouselStyleBeforeExpand.width
        });
        expandedVideosContainer.attr("style", "display: none");

        $("#video-other-expand_0").css({"display": "none"});
        $(".expanded-other-videos").css({"display": "none"});
    });

    $(".other-expand_btn__mobile").click(function() {
        var expandBtn = $(this);
        var lessBtn = expandBtn.siblings(".other-less_btn__mobile");

        document.getElementById("other-channels").style.display = "none";

        var carouselContainer = $(this).closest(".other-video-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".other-video-row").find(".expanded-other-videos");

        var expandedVideosContainer = $(this).closest(".expanded-other-videos").find(".video-live-expand_0");

        
        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');
        
        carouselSlidesContainer.css({"display": "flex"});
        
        expandBtn.attr("style", "display: none");

        lessBtn.attr("style", "display: block");
        carouselContainer.attr("style", "display: none");
        expandedVideosContainer.attr("style", "display: flex");

        $("#video-other-expand_0").css({"display": "flex"});
        $(".expanded-other-videos").css({"display": "flex"});
    });

    $(".other-less_btn__mobile").click(function() {
        var lessBtn = $(this);
        var expandBtn = lessBtn.siblings(".other-expand_btn__mobile");

        document. getElementById("other-channels"). style.display = "block";

        var carouselContainer = $(this).closest(".other-video-row").find(".purejscarousel");
        var carouselSlidesContainer = $(this).closest(".other-video-row").find(".purejscarousel-slides-container");

        var expandedVideosContainer = $(this).closest(".expanded-other-videos").find(".video-other-expand_0");
    
        carouselStyleBeforeExpand.transform = carouselSlidesContainer.css('transform');
        carouselStyleBeforeExpand.width = carouselSlidesContainer.css('width');
    
        lessBtn.attr("style", "display: none");

        expandBtn.attr("style", "display: block !important");

        carouselContainer.attr("style", "display: block");
        carouselSlidesContainer.css({
            'transform': carouselStyleBeforeExpand.transform,
            'width': carouselStyleBeforeExpand.width
        });
        expandedVideosContainer.attr("style", "display: none");

        $("#video-other-expand_0").css({"display": "none"});
        $(".expanded-other-videos").css({"display": "none"});
    });

});

$(document).mouseup(function(e) {
    var container = $("#profile-container");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        hideProfileDiv();
    }
});

function toggleScrollTopBtn() {
    scrollTopBtn = document.getElementById("go-to-top-btn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.visibility = "visible";
        scrollTopBtn.style.opacity = 1;
    } else {
        scrollTopBtn.style.visibility = "hidden";
        scrollTopBtn.style.opacity = 0;
    }
}

function scrollToTop() {
    try {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } catch (error) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

}

var images = ['digitv_image_master_banner.jpg'],
    index = 0, // starting index
    maxImages = images.length - 1;
var timer = null

function updateContainer() {
    if (timer) {
        clearInterval(timer);
    }
    var $containerWidth = $(window).width();
    if ($containerWidth <= 1280) {
        closeNav();
    }
    if ($containerWidth > 1281) {
        openNav();
    }

    $(".desktop-add-3").css({"margin-right" : "0px"});

    // if ($containerWidth <= 2200) {
    // $(".addWithindex2").css({"display" : "none"});
    // } else {
    //     $(".addWithindex2").css({"display" : "flex"});
    // }
    
    if($containerWidth <= 770){
        $(".addWithindex1").css({"display" : "none"});
        $(".full-ad-height").css({"height" : "310px"});
    } else {
        $(".addWithindex1").css({"display" : "flex"});
        $(".full-ad-height").css({"height" : "100%"});
    }

    if ($containerWidth <= 1101) {
        $(".full-ad-width").css({"width" : "50%"});
        $(".full-ad-height").css({"height" : "310px"});
    } else {
        $(".full-ad-width").css({"width" : "100%"});
        $(".full-ad-height").css({"height" : "100%"});
    }

    if ($containerWidth <= 1865) {
        $(".imageOfAdd").css({"width" : "337.68px"});
        $(".banner-advertisement-desktop").css({"width" : "337.68px"});
        $(".imageOfAdd").css({"height" : "90.45px"});
        $(".banner-advertisement-desktop").css({"height" : "90.45px"});
    } else {
        $(".imageOfAdd").css({"width" : "504px"});
        $(".banner-advertisement-desktop").css({"width" : "504px"});
        $(".imageOfAdd").css({"height" : "135px"});
        $(".banner-advertisement-desktop").css({"height" : "135px"});
    }

    if ($containerWidth <= 1351 && $containerWidth >= 1281) {
        $(".full-ad-width").css({"width" : "50%"});
        $(".full-ad-height").css({"height" : "310px"});
    }

    var desktopCarouselContainer = $(".video-row").find(".purejscarousel");
    var mobileCarouselContainer = $(".video-row").find("#mobile-video-carousel");

    var mobileCarouselContainerPoster = $(".poster-row").find("#mobile-poster-carousel");
    var desktopCarouselContainerPoster = $(".poster-row").find(".purejscarousel");

    // if mobile screen
    if ($containerWidth <= 767) {
        desktopCarouselContainer.attr("style", "display: none");
        if (mobileCarouselContainer.data("isvisible")) {
            mobileCarouselContainer.attr("style", "display: block");
        }

        $(".expand-collapse-container").hide();
        $(".expand-collapse-container_mobile").show();
        $(".modal-big-x").css({ "top": "30px", "right": "60px" });
        $(".modal-big-x svg").attr({ "width": 30, "height": 30 });
        $(".mini-sidenav-item").removeClass("mb-1");
        $(".mini-sidenav-item").not("#get-channel-container").not("#channels-container").addClass("mb-3");
        $("#channels-container").addClass("mb-2");
        $("#maximise-container").hide();

        $("#mobile-video-carousel").css("display", "none");

        $("#video-expand_0").css("display: flex");
        $("#video-expand_0").css("justify-content", "center");

        $("#mobile-video-carousel").css("display", "none");
        $(".poster-expand_btn__mobile").css("display", "block");
        $(".poster-expand_btn__mobile").css("width", "100% !important");

        $(".expand-collapse-container_mobile").css("display", "block");
        $(".expand-collapse-container").css("display", "none");

        $(".video-title").addClass("text-center");

        $("#video-title-row").css("justify-content", "center");

        $("#poster-expand_0").css("display: flex");
        $("#poster-expand_0").css("justify-content", "center");
        
        $("#episodes-title-row").css("justify-content", "center");
        $("#poster-title-row").css("justify-content", "center");
        $("#sub_channel-title-row").css("justify-content", "center");
        $("#sub_channel-title-other-row").css("justify-content", "center");

        $("#live-title").css({"font-size": "20px"});
        $("#episodes-title").css({"font-size": "20px"});
        $("#sub_channel-title").css({"font-size": "20px"});
        $("#sub_channel-other-title").css({"font-size": "20px"});

        $(".text-center").css({"justify-content": "center"});

        $(".arrow-image").css("height", "20px");
        $(".arrow-image").css("width", "20px");

        $("#video-title-row").css("justify-content", "center");
        $("#video-live-expand_0").css("justify-content", "center");
        $("#video-other-expand_0").css("justify-content", "center");
        $("#poster-expand_0").css("justify-content", "center");

        $(".banner-advertisement-row").css({"width" : "100%"});

        $("#main").css({"padding-top" : "30px"});
    } else {
        desktopCarouselContainer.attr("style", "display: block");
        mobileCarouselContainer.attr("style", "display: none");
        
        $(".expand-collapse-container").show();
        $(".expand-collapse-container_mobile").hide();
        $(".modal-big-x").css({ "top": "7px", "right": "20px" });
        $(".modal-big-x svg").attr({ "width": 50, "height": 50 });
        $("#channels-container").removeClass("mb-2");
        $(".mini-sidenav-item").removeClass("mb-3");
        $(".mini-sidenav-item").not("#get-channel-container").addClass("mb-1");
        $("#maximise-container").show();
        $(".video-title").removeClass("text-center");

        $("#video-title-row").css("justify-content", "flex-start");
        
        $(".text-center").css({"justify-content": "flex-start"});

        $("#live-title").css({"font-size": "28px"});
        $("#episodes-title").css({"font-size": "28px"});
        $("#sub_channel-title").css({"font-size": "28px"});
        $("#sub_channel-other-title").css({"font-size": "28px"});

        $(".arrow-image").css("height", "30px");
        $(".arrow-image").css("width", "30px");

        $("#poster-expand_0").css("display: flex");
        $("#poster-expand_0").css("justify-content", "flex-start");

        $("#video-title-row").css("justify-content", "flex-start");
        $("#episodes-title-row").css("justify-content", "flex-start");
        $("#poster-title-row").css("justify-content", "flex-start");
        $("#sub_channel-title-row").css("justify-content", "flex-start");
        $("#sub_channel-title-other-row").css("justify-content", "flex-start");

        $("#video-expand_0").css("display: flex");
        $("#video-expand_0").css("justify-content", "flex-start");
        $("#video-live-expand_0").css("justify-content", "flex-start");
        $("#video-other-expand_0").css("justify-content", "flex-start");
        $("#poster-expand_0").css("justify-content", "flex-start");

        $("#main").css({"padding-top" : "3px"});
    }
}

function getChannelsList() {
    $.getJSON("https://tv.digicentral.co.za:1339/channels?_sort=name:ASC&_where[_or][1][top_category]=Schools&_where[_or][2][top_category]=Towns", function(result) {
        channelListLoaded = true;
        $("#toggle-channels-btn").css("color", "white");
        $("#toggle-channels-btn").css("cursor", "pointer");
        $("#channelsModal").css("color", "white");
        $("#channelsModal").css("cursor", "pointer");
        channelsList = result;
    })
}

function openNav() {
    $("#mini-sidenav").hide();
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    $("#sidenav-bottom-container").show();
}

function closeNav() {
    $("#mini-sidenav").show();
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    $("#sidenav-bottom-container").hide();
}

function showChannelsOnSidenav() {
    if(channelListLoaded){

        var accordionDiv = $("#channel-accordion")[0];
        if (accordionDiv) {
            accordionDiv.remove();
        }
    
        var accordionDivNew = document.createElement('div');
        accordionDivNew.id = "channel-accordion";
        accordionDivNew.classList.add('accordion');
    
        var accordionContainer = $("#collapse-content");
        accordionContainer.append(accordionDivNew)
    
        if ($("#channelsCollapse").is(":hidden") && !channelListShows) {
            var channelTemplate = $("#dynamic-channels")[0].innerHTML;
            var optionTemplate = $("#dynamic-channel-options")[0].innerHTML;
    
            channelsList.filter(x => x.categories.length != 0).forEach((channel, index) => {
                var channelElement = channelTemplate.replace("{{channel.name}}", channel.name).replaceAll("{{index}}", index).replaceAll("{{option.channel_slug}}", channel.slug);
                var domChannelElement = $(channelElement);
    
                channel.categories.forEach(option => {
                    var optionElement = optionTemplate;
                    optionElement = optionTemplate.replaceAll("{{option.name}}", option.name).replaceAll("{{index}}", index).replaceAll("{{option.slug}}", option.slug).replaceAll("{{option.channel_slug}}", channel.slug);
                    
                    var domOptionElement = $(optionElement);
    
                    domChannelElement.find(".card-body").append(domOptionElement);
                });
                $("#channel-accordion").append(domChannelElement)
            });
            $("#collapse-content").css("display", "contents");
            $(".max_height_category").css("overflow", "auto");
            $(".max_height_category").css("max-height", "400px");
            $(".max_height_category").css("display", "contents");

            $("#channel-accordion").css("max-height", "400px");
            $("#channel-accordion").css("overflow", "auto");
            $("#toggle-channels-btn").css("margin-bottom", ".5rem");

            channelListShows = true;
        } else {
            $(".max_height_category").css("display", "none");
            $("#collapse-content").css("display", "none");
            $("#toggle-channels-btn").css("margin-bottom", "0rem");

            channelListShows = false;
        }

        // $(".max_height_category").css("max-height", "400px");
    }
}

function toggleSignedInContent() {
    if (isRegistered) {
        $("#registration").hide();
        $("#main-search-container").hide();
        $("#subscribe").show();
        $("#top-advertisment").hide();
        $("#profile-search-upload").show();
    } else {
        $("#registration").show();
        $("#main-search-container").show();
        $("#subscribe").hide();
        $("#top-advertisment").hide();
        try {
            $("#profile-search-upload").attr("style", "display: none !important;");
        } catch (error) {

        }
    }
}

//upload icon
function showUploadDiv() {
    hideSearchDiv();
    hideProfileDiv();
    $("#upload-container").addClass("expanded").removeClass("normal");
    $("#upload-extra-part").show();
}

function hideUploadDiv() {
    $("#upload-container").removeClass("expanded").addClass("normal");
    $("#upload-extra-part").hide();
}

function toggleUploadDiv() {
    if ($("#upload-extra-part").is(":visible")) {
        hideUploadDiv();
    } else {
        showUploadDiv();
    }
}

//search icon
function showSearchDiv() {
    hideUploadDiv();
    hideProfileDiv();
    $("#search-container").addClass("expanded");
    $("#search-container").removeClass("normal");
    $("#search-field").show();
}

function hideSearchDiv() {
    $("#search-container").removeClass("expanded");
    $("#search-container").addClass("normal");
    $("#search-field").hide();
}

function toggleSearchDiv() {
    if ($("#search-field").is(":visible")) {
        hideSearchDiv();
    } else {
        showSearchDiv();
    }
}

function showProfileDiv() {
    hideUploadDiv();
    hideSearchDiv();
    $("#profile-container").addClass("expanded");
    $("#profile-container").removeClass("normal");
    $("#search-container").hide();
    $("#upload-container").hide();

    $("#profile-popup").show("slide", {
        direction: "right"
    }, 300);
}

function hideProfileDiv() {
    $("#profile-container").addClass("normal");
    $("#profile-container").removeClass("expanded");
    $("#search-container").show();
    $("#upload-container").show();

    $("#profile-popup").hide("slide", {
        direction: "right"
    }, 300);
}

function toggleProfileDiv() {
    if ($("#profile-popup").is(":visible")) {
        hideProfileDiv();
    } else {
        showProfileDiv();
    }
}

function showChannelsModal() {
    if(channelListLoaded){
        $('#channel-modal').modal('show');
        setTimeout(function() {
            showChannelsOnPopup();
        }, 150)
    }
}

function closeChannelModal() {
    $('#channel-modal').modal('hide');
}

function showChannelsOnPopup() {
    var accordionDiv = $("#channel-accordion_popup")[0];
    if (accordionDiv) {
        accordionDiv.remove();
    }

    var accordionDivNew = document.createElement('div');
    accordionDivNew.id = "channel-accordion_popup";
    accordionDivNew.classList.add('accordion');

    var accordionContainer = $("#channel-accordion-container_popup");
    accordionContainer.append(accordionDivNew)

    if ($("#channel-modal").is(":visible")) {
        var channelTemplate = $("#dynamic-channels_popup")[0].innerHTML;
        var optionTemplate = $("#dynamic-channel-options_popup")[0].innerHTML;

        channelsList.forEach((channel, index) => {
            var channelElement = channelTemplate.replace("{{channel.name}}", channel.name).replaceAll("{{index}}", index).replaceAll("{{option.channel_slug}}", channel.slug);
            var domChannelElement = $(channelElement);

            channel.categories.forEach(option => {
                var optionElement = optionTemplate;
                optionElement = optionTemplate.replaceAll("{{option.name}}", option.name).replaceAll("{{index}}", index).replaceAll("{{option.slug}}", option.slug).replaceAll("{{option.channel_slug}}", channel.slug);
                    
                var domOptionElement = $(optionElement);

                domChannelElement.find(".card-body").append(domOptionElement);
            });
            $("#channel-accordion_popup").append(domChannelElement)
        });
        
        
    }
}

 function initCarousels() {
    // var carousel_1 = new PureJSCarousel({
    //     carousel: '#video-carousel_0',
    //     slide: '.slide',
    //     oneByOne: true,
    //     speed: 400,
    //     activeIndex: 0,
    //     delay: 0,
    //     effect: 'linear',
    //     autoplay: false,
    //     autoplayDelay: 1000,
    //     autoplayStartDelay: 1000,
    //     autoplayDirection: 'next',
    //     infinite: true
    // });

    // var carousel_2 = new PureJSCarousel({
    //     carousel: '#poster-carousel_0',
    //     slide: '.slide_small',
    //     oneByOne: true,
    //     speed: 400,
    //     activeIndex: 0,
    //     delay: 0,
    //     effect: 'linear',
    //     autoplay: false,
    //     autoplayDelay: 1000,
    //     autoplayStartDelay: 1000,
    //     autoplayDirection: 'next',
    //     infinite: true
    // });
}

function initCarousel_Videos() {
    var carousel_1 = new PureJSCarousel({
        carousel: '#video-carousel_0',
        slide: '.slide',
        oneByOne: true,
        speed: 400,
        activeIndex: 0,
        delay: 0,
        effect: 'linear',
        autoplay: false,
        autoplayDelay: 1000,
        autoplayStartDelay: 1000,
        autoplayDirection: 'next',
        infinite: false,
        itemsToScroll: 2
    });

    document.getElementsByClassName('purejscarousel-dots-container')[0].style.visibility = 'hidden';   
}

function initCarousel_Posters() {
    var carousel_2 = new PureJSCarousel({
        carousel: '#poster-carousel_0',
        slide: '.slide_small',
        oneByOne: true,
        speed: 400,
        activeIndex: 0,
        delay: 0,
        effect: 'linear',
        autoplay: false,
        autoplayDelay: 1000,
        autoplayStartDelay: 1000,
        autoplayDirection: 'next',
        infinite: false
    });
}

function register() {
    var currentLocation = window.location.href;
    location.href = window.location.href + '?registered=true';
}

function goToPage2() {
    location.href = 'Page2.html?registered=true';
}

function goHome() {
    location.href = window.location.href;
    console.log(window.location.href);
    // console.log('channel')
}

function goToChannel() {
    $(".channel-option-btn").on('click', function(event) {
        // event.stopPropagation();
        // $(`#${event.target.id}`)
        //     .parent()
        //     .css("background-color", "#28282E");
        console.log(event.target.id);
    });
}


var input = document.getElementById("searchBox");
input.addEventListener("input", lookForZ);
input.addEventListener("input", lookForY);

function lookForZ(e) {
    // alert('search');
  var filter = e.target.value.toUpperCase();

  var list = document.getElementById("listPrograms");
  var divs = list.getElementsByTagName("div");
  for (var i = 0; i < divs.length; i++) {
  	var a = divs[i].getElementsByTagName("z")[0];
    
    if (a) {
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        divs[i].style.display = "";
      } else {
        divs[i].style.display = "none";
      }
    }       
  }

}

input.addEventListener("input", lookForY);

function lookForY(e) {
    alert('searchY');
  var filter = e.target.value.toUpperCase();

  var list = document.getElementById("listPrograms");
  var divs = list.getElementsByTagName("div");
  for (var i = 0; i < divs.length; i++) {
  	var a = divs[i].getElementsByTagName("z")[0];
    
    if (a) {
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        divs[i].style.display = "";
      } else {
        divs[i].style.display = "none";
      }
    }       
  }

}

function setClickedOptionStyleOnPopup() {
    stopPropagation = true;
    $('.options-collapse_popup').on('show.bs.collapse', function(event) {
        $(`#${event.target.id}`)
            .parent()
            .css("background", "linear-gradient(135deg, #a0a0a0 0%, #595959 100%)");
    });

    $('.options-collapse_popup').on('hide.bs.collapse', function(event) {
        $(`#${event.target.id}`)
            .parent()
            .css("background", "transparent");
    });
}


function setClickedOptionStyle() {
    stopPropagation = true;
    $('.options-collapse').on('show.bs.collapse', function(event) {
        $(`#${event.target.id}`)
            .parent()
            .css("background-color", "#28282E");
    });

    $('.options-collapse').on('hide.bs.collapse', function(event) {
        $(`#${event.target.id}`)
            .parent()
            .css("background-color", "transparent");
    });
}

function changeChannelCategoryFromList(domain, channel, category) {
    location.href = domain + "/" + channel + "/" + category;
    stopPropagation = true;
}

function changeChannelFromList(domain, channel) {
    if(!stopPropagation){
        location.href = domain + "/" + channel;
        $(".collapse ").hide();
    } else {
        stopPropagation = false;
    }
}
