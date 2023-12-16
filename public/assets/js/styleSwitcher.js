"use strict";
function addSwitcher() {
    var dlabSwitcher =
        '<div class="sidebar-right"><div class="bg-overlay"></div><a class="sidebar-right-trigger wave-effect wave-effect-x" data-bs-toggle="tooltip" data-placement="right" data-original-title="Change Layout" href="javascript:void(0);"><span><i class="fa fa-cog fa-spin"></i></span></a><a class="sidebar-close-trigger" href="javascript:void(0);"><span><i class="la-times las"></i></span></a><div class="sidebar-right-inner"><h4>Pick your style<a href="javascript:void(0);" onclick="deleteAllCookie()" class="btn btn-primary btn-sm pull-right">Delete All Cookie</a></h4><div class="card-tabs"><ul class="nav nav-tabs" role="tablist"><li class="nav-item"><a class="nav-link active" href="#tab1" data-bs-toggle="tab">Theme</a></li><li class="nav-item"><a class="nav-link" href="#tab2" data-bs-toggle="tab">Header</a></li><li class="nav-item"><a class="nav-link" href="#tab3" data-bs-toggle="tab">Content</a></li></ul></div><div class="tab-content tab-content-default tabcontent-border"><div class="fade tab-pane active show" id="tab1"><div class="admin-settings"><div class="row"><div class="col-xl-12"><p>Set Theme Colour</p><div class="themecolor-bg"><span><input class="chk-col-primary filled-in" id="themecolor_1" name="themecolor_bg" type="radio" value="theme_1"><label for="themecolor_1" class="theme-bg" style="background-image:url(assets/images/theme-image/1.jpg)"></label></span><span><input class="chk-col-primary filled-in" id="themecolor_2" name="themecolor_bg" type="radio" value="theme_2"><label for="themecolor_2" class="theme-bg" style="background-image:url(assets/images/theme-image/2.jpg)"></label></span><span><input class="chk-col-primary filled-in" id="themecolor_4" name="themecolor_bg" type="radio" value="theme_4"><label for="themecolor_4" class="theme-bg" style="background-image:url(assets/images/theme-image/4.jpg)"></label></span></div></div><div class="col-sm-12"><p>Set Sidebar Image</p><div class="navigation-bg flex-wrap"><span><input class="chk-col-primary filled-in" id="sidebar_img_1" name="sidebar_img_bg" type="radio" value="assets/images/sidebar-img/1.jpg"><label for="sidebar_img_1" class="bg-image-sidebar" style="background-image:url(assets/images/sidebar-img/1.jpg)"></label></span><span><input class="chk-col-primary filled-in" id="sidebar_img_2" name="sidebar_img_bg" type="radio" value="assets/images/sidebar-img/2.jpg"><label for="sidebar_img_2" class="bg-image-sidebar" style="background-image:url(assets/images/sidebar-img/2.jpg)"></label></span><span><input class="chk-col-primary filled-in" id="sidebar_img_3" name="sidebar_img_bg" type="radio" value="assets/images/sidebar-img/3.jpg"><label for="sidebar_img_3" class="bg-image-sidebar" style="background-image:url(assets/images/sidebar-img/3.jpg)"></label></span><span><input class="chk-col-primary filled-in" id="sidebar_img_5" name="sidebar_img_bg" type="radio" value="assets/images/sidebar-img/5.jpg"><label for="sidebar_img_5" class="bg-image-sidebar" style="background-image:url(assets/images/sidebar-img/5.jpg)"></label></span><a href="javascript:void(0)" class="btn btn-primary btn-sm remove-img">Remove Image</a></div></div></div></div></div><div class="fade tab-pane" id="tab2"><div class="admin-settings"><div class="row"><div class="col-sm-6"><p>Layout</p><select class="default-select form-control wide" id="theme_layout" name="theme_layout"><option value="Choose Layout">Choose Layout</option><option value="vertical">Vertical</option><option value="horizontal">Horizontal</option></select></div><div class="col-sm-6"><p>Header position</p><select class="default-select form-control wide" id="header_position" name="header_position"><option value="Choose Header Positon">Choose Header Positon</option><option value="static">Static</option><option value="fixed">Fixed</option></select></div><div class="col-sm-6"><p>Sidebar</p><select class="default-select form-control wide" id="sidebar_style" name="sidebar_style"><option value="Choose Sidebar">Choose Sidebar</option><option value="full">Full</option><option value="mini">Mini</option><option value="compact">Compact</option><option value="modern">Modern</option><option value="overlay">Overlay</option><option value="icon-hover">Icon-hover</option></select></div><div class="col-sm-6"><p>Sidebar position</p><select class="default-select form-control wide" id="sidebar_position" name="sidebar_position"><option value="Choose Sidebar Position">Choose Sidebar Position</option><option value="static">Static</option><option value="fixed">Fixed</option></select></div></div></div></div><div class="fade tab-pane" id="tab3"><div class="admin-settings"><div class="row"><div class="col-sm-6"><p>Container</p><select class="default-select form-control wide" id="container_layout" name="container_layout"><option value="Choose Container">Choose Container</option><option value="wide">Wide</option><option value="boxed">Boxed</option><option value="wide-boxed">Wide Boxed</option></select></div><div class="col-sm-6"><p>Body Font</p><select class="default-select form-control wide" id="typography" name="typography"><option value="Choose Font">Choose Font</option><option value="roboto">Roboto</option><option value="poppins">Poppins</option><option value="opensans">Open Sans</option><option value="HelveticaNeue">HelveticaNeue</option></select></div></div></div></div></div></div>';

    var demoPanel =
        '<div class="dz-demo-panel"><div class="bg-close"></div><a class="dz-demo-trigger" data-toggle="tooltip" data-placement="right" data-original-title="Check out more demos" href="javascript:void(0)"><span><i class="las la-tint"></i></span></a><div class="dz-demo-inner"><a href="javascript:void(0);" class="btn btn-primary btn-sm px-2 py-1 mb-3" onclick="deleteAllCookie()">Delete All Cookie</a><div class="dz-demo-header"><h4>Select A Theme</h4><a class="dz-demo-close" href="javascript:void(0)"><span><i class="las la-times"></i></span></a></div><div class="dz-demo-content"><div class="dz-wrapper"><div class="overlay-bx dz-demo-bx demo-active"><div class="overlay-wrapper"><img src="assets/images/theme-image/1.jpg" alt="" class="w-100"></div><div class="overlay-layer"><a href="javascript:void(0);" data-theme="1" class="btn dlab_theme_demo btn-secondary btn-sm mr-2">Theme 1</a></div></div><h5 class="text-white mb-3">Theme 1</h5><hr><div class="overlay-bx dz-demo-bx"><div class="overlay-wrapper"><img src="assets/images/theme-image/4.jpg" alt="" class="w-100"></div><div class="overlay-layer"><a href="javascript:void(0);" data-theme="2" class="btn dlab_theme_demo btn-secondary btn-sm mr-2">Theme 2</a></div></div><h5 class="text-white mb-3">Theme 2</h5></div></div>';

    if ($("#dlabSwitcher").length == 0) {
        jQuery("body").append(dlabSwitcher + demoPanel);

        //const ps = new PerfectScrollbar('.sidebar-right-inner');
        //console.log(ps.reach.x);
        //ps.isRtl = false;

        $(".sidebar-right-trigger").on("click", function () {
            $(".sidebar-right").toggleClass("show");
        });
        $(".sidebar-close-trigger,.bg-overlay").on("click", function () {
            $(".sidebar-right").removeClass("show");
        });
    }
}

(function ($) {
    "use strict";
    addSwitcher();

    const body = $("body");
    const html = $("html");

    //get the DOM elements from right sidebar
    const typographySelect = $("#typography");
    //const versionSelect = $('#theme_version');
    const themeSelect = $("#theme_data");
    const layoutSelect = $("#theme_layout");
    const sidebarStyleSelect = $("#sidebar_style");
    const sidebarPositionSelect = $("#sidebar_position");
    const headerPositionSelect = $("#header_position");
    const containerLayoutSelect = $("#container_layout");
    const themeDirectionSelect = $("#theme_direction");

    //change the theme typography controller
    typographySelect.on("change", function () {
        body.attr("data-typography", this.value);

        setCookie("typography", this.value);
    });

    //change the theme version controller
    // versionSelect.on('change', function() {
    //body.attr('data-theme-version', this.value);

    /* if(this.value === 'dark'){
			//jQuery(".nav-header .logo-abbr").attr("src", "./images/logo-white.png");
			jQuery(".nav-header .logo-compact").attr("src", "images/logo-text-white.png");
			jQuery(".nav-header .brand-title").attr("src", "images/logo-text-white.png");
			
			setCookie('logo_src', './images/logo-white.png');
			setCookie('logo_src2', 'images/logo-text-white.png');
		}else{
			jQuery(".nav-header .logo-abbr").attr("src", "./images/logo.png");
			jQuery(".nav-header .logo-compact").attr("src", "images/logo-text.png");
			jQuery(".nav-header .brand-title").attr("src", "images/logo-text.png");
			
			setCookie('logo_src', './images/logo.png');
			setCookie('logo_src2', 'images/logo-text.png');
		} */

    //setCookie('version', this.value);
    //});

    //change the sidebar position controller
    sidebarPositionSelect.on("change", function () {
        this.value === "fixed" && body.attr("data-sidebar-style") === "modern" && body.attr("data-layout") === "vertical"
            ? alert("Sorry, Modern sidebar layout dosen't support fixed position!")
            : body.attr("data-sidebar-position", this.value);
        setCookie("sidebarPosition", this.value);
    });

    //change the header position controller
    headerPositionSelect.on("change", function () {
        body.attr("data-header-position", this.value);
        setCookie("headerPosition", this.value);
    });

    //change the theme direction (rtl, ltr) controller
    themeDirectionSelect.on("change", function () {
        html.attr("dir", this.value);
        html.attr("class", "");
        html.addClass(this.value);
        body.attr("direction", this.value);
        setCookie("direction", this.value);
    });

    //change the theme layout controller
    layoutSelect.on("change", function () {
        if (body.attr("data-sidebar-style") === "overlay") {
            body.attr("data-sidebar-style", "full");
            body.attr("data-layout", this.value);
            return;
        }

        body.attr("data-layout", this.value);
        setCookie("layout", this.value);
    });

    //change the container layout controller
    containerLayoutSelect.on("change", function () {
        if (this.value === "boxed") {
            if (body.attr("data-layout") === "vertical" && body.attr("data-sidebar-style") === "full") {
                body.attr("data-sidebar-style", "overlay");
                body.attr("data-container", this.value);

                setTimeout(function () {
                    $(window).trigger("resize");
                }, 200);

                return;
            }
        }

        body.attr("data-container", this.value);

        setTimeout(function () {
            window.dispatchEvent(new Event("resize"));
        }, 500);

        setCookie("containerLayout", this.value);
    });

    //change the sidebar style controller
    sidebarStyleSelect.on("change", function () {
        if (body.attr("data-layout") === "horizontal") {
            if (this.value === "overlay") {
                alert("Sorry! Overlay is not possible in Horizontal layout.");
                return;
            }
        }

        if (body.attr("data-layout") === "vertical") {
            if (body.attr("data-container") === "boxed" && this.value === "full") {
                alert("Sorry! Full menu is not available in Vertical Boxed layout.");
                return;
            }

            if (this.value === "modern" && body.attr("data-sidebar-position") === "fixed") {
                alert("Sorry! Modern sidebar layout is not available in the fixed position. Please change the sidebar position into Static.");
                return;
            }
        }

        body.attr("data-sidebar-style", this.value);

        if (body.attr("data-sidebar-style") === "icon-hover") {
            $(".dlabnav").hover(
                function () {
                    $("#main-wrapper").addClass("iconhover-toggle");
                },
                function () {
                    $("#main-wrapper").removeClass("iconhover-toggle");
                }
            );
        }

        setCookie("sidebarStyle", this.value);
    });

    /* jQuery("#nav_header_color_1").on('click',function(){
		jQuery(".nav-header .logo-abbr").attr("src", "./images/logo.png");
		setCookie('logo_src', './images/logo.png');
		return false;
    }); */

    /* jQuery("#sidebar_color_2, #sidebar_color_3, #sidebar_color_4, #sidebar_color_5, #sidebar_color_6, #sidebar_color_7, #sidebar_color_8, #sidebar_color_9, #sidebar_color_10, #sidebar_color_11, #sidebar_color_12, #sidebar_color_13, #sidebar_color_14, #sidebar_color_15").on('click',function(){
		jQuery(".nav-header .logo-abbr").attr("src", "./images/logo-white.png");
		jQuery(".nav-header .brand-title").attr("src", "./images/logo-text-white.png");
		setCookie('logo_src', './images/logo-white.png');
		return false;
    }); */

    /* jQuery("#nav_header_color_3").on('click',function(){
		jQuery(".nav-header .logo-abbr").attr("src", "./images/logo-white.png");
		setCookie('logo_src', './images/logo-white.png');
		return false;
    }); */

    //change the nav-header background controller
    $('input[name="navigation_header"]').on("click", function () {
        body.attr("data-nav-headerbg", this.value);
        setCookie("navheaderBg", this.value);
    });

    //change the header background controller
    $('input[name="header_bg"]').on("click", function () {
        body.attr("data-headerbg", this.value);
        setCookie("headerBg", this.value);
    });

    //change the primary color controller
    $('input[name="primary_bg"]').on("click", function () {
        body.attr("data-primary", this.value);
        setCookie("primary", this.value);
    });

    //change the primary color controller
    $('input[name="sidebar_img_bg"]').on("click", function () {
        var sidebarBgImg = this.value;
        $(".dlabnav").css("background-image", "url(" + sidebarBgImg + ")");
        $(".nav-header").css("background-image", "url(" + sidebarBgImg + ")");
        $("body").attr("data-navigationbarimg", sidebarBgImg);
        $(".nav-header").addClass("nav-header-brand");
        $(".dlabnav").addClass("dz-bg");

        setCookie("navigationBarImg", this.value);
    });

    //change the theme color controller
    $('input[name="themecolor_bg"]').on("click", function () {
        body.attr("data-theme", this.value);
        setCookie("themeBg", this.value);
    });

    //remove the sidebar image
    $(".remove-img").on("click", function () {
        $(".dlabnav, .nav-header").removeAttr("style");
        $("body").attr("data-navigationbarimg", "");
        jQuery(".chk-col-primary").prop("checked", false);
        setCookie("navigationBarImg", "");
    });
})(jQuery);
