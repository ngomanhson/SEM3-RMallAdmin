"use strict";

var dlabSettingsOptions = {};

function getUrlParams(dParam) {
    var dPageURL = window.location.search.substring(1),
        dURLVariables = dPageURL.split("&"),
        dParameterName,
        i;

    for (i = 0; i < dURLVariables.length; i++) {
        dParameterName = dURLVariables[i].split("=");

        if (dParameterName[0] === dParam) {
            return dParameterName[1] === undefined ? true : decodeURIComponent(dParameterName[1]);
        }
    }
}

(function ($) {
    "use strict";

    var direction = getUrlParams("dir");

    if (direction == "rtl") {
        direction = "rtl";
    } else {
        direction = "ltr";
    }

    dlabSettingsOptions = {
        typography: "Nunito",
        version: "light",
        layout: "vertical",
        primary: "color_1",
        headerBg: "color_1",
        navheaderBg: "color_1",
        sidebarBg: "color_1",
        sidebarStyle: "full",
        themecolor: "theme_1",
        sidebarPosition: "fixed",
        headerPosition: "fixed",
        containerLayout: "full",
        navigationBarImg: "" /* image path or null*/,
    };

    new dlabSettings(dlabSettingsOptions);

    jQuery(window).on("resize", function () {
        var body = $("body");

        var dzTypography = body.data("typography");
        var dzThemeVersion = body.data("theme-version");
        var dzLayout = body.data("layout");
        var dzPrimary = body.data("primary");
        var dzHeaderBg = body.data("headerbg");
        var dzNavHeaderBg = body.data("nav-headerBg");
        var dzSidebarBg = body.data("sibebarbg");
        var dzSidebarStyle = body.data("sidebar-style");
        var dzHeaderPosition = body.data("header-position");
        var dzThemeColor = body.data("theme");
        var dzSidebarPosition = body.data("sidebar-position");
        var dzContainerLayout = body.data("container");
        var dzNavigationbarImg = body.data("navigationbarimg");

        dlabSettingsOptions = {
            typography: dzTypography != "" ? dzTypography : "Nunito",
            version: dzThemeVersion != "" ? dzThemeVersion : "light",
            layout: dzLayout != "" ? dzLayout : "vertical",
            primary: dzPrimary != "" ? dzPrimary : "color_1",
            headerBg: dzHeaderBg != "" ? dzHeaderBg : "color_1",
            navheaderBg: dzNavHeaderBg != "" ? dzNavHeaderBg : "color_1",
            sidebarBg: dzSidebarBg != "" ? dzSidebarBg : "color_1",
            sidebarStyle: dzSidebarStyle != "" ? dzSidebarStyle : "full",
            sidebarPosition: dzSidebarPosition != "" ? dzSidebarPosition : "fixed",
            headerPosition: dzHeaderPosition != "" ? dzHeaderPosition : "fixed",
            themecolor: dzThemeColor != "" ? dzThemeColor : "theme_1",
            containerLayout: dzContainerLayout != "" ? dzContainerLayout : "full",
            navigationbarImg: dzNavigationbarImg != "" ? dzNavigationbarImg : "assets/images/sidebar-img/1.jpg",
            direction: direction,
        };

        dlabSettingsOptions.containerLayout = $("#container_layout").val();
        /*Check container layout on resize END */

        new dlabSettings(dlabSettingsOptions);
    });
})(jQuery);
