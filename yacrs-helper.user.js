// ==UserScript==
// @name         YACRS Helper
// @namespace    https://github.com/AW8A9Z/yacrs-helper.user.js/raw/master/yacrs-helper.user.js
// @updateURL    https://github.com/AW8A9Z/yacrs-helper.user.js/raw/master/yacrs-helper.user.js
// @downloadURL  https://github.com/AW8A9Z/yacrs-helper.user.js/raw/master/yacrs-helper.user.js
// @version      1.1.1
// @description  Adds helpful tools to YACRS (Yet Another Class Response System)
// @author       AW8A9Z
// @match        *://classresponse.gla.ac.uk/*
// @match        *://learn.gla.ac.uk/yacrs/*
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var page = getYacrsPage();
    var url = getYacrsServerUrl();
    var content = $("div[id=main] div[class=container] div[id=content]");
    var logo = $("h1[class=logo]");

    logo.css("cursor", "pointer");

    logo.on("click", function() {
        window.location = url;
    });

    if(page == "vote.php" || page == "review.php") {

        // If active question
        if(content.text().indexOf("No active question") == -1 && content.text().indexOf("Invalid session") == -1) {

            // Add view chart/wordwall buttons
            $("div[id=main] div[class=container] div[id=content]").append("<div class='row'>" +
                                                                          "    <div class='col-sm-6'>" +
                                                                          "        <a id='yacrs-helper-view-chart' class='btn btn-primary btn-block yacrs-helper-btn' href='#'><i class='fa fa-bar-chart' aria-hidden='true'></i> Chart</a>" +
                                                                          "    </div>" +
                                                                          "    <div class='col-sm-6'>" +
                                                                          "        <a id='yacrs-helper-view-wordwall' class='btn btn-primary btn-block yacrs-helper-btn' href='#'><i class='fa fa-comments' aria-hidden='true'></i> Wordwall</a>" +
                                                                          "    </div>" +
                                                                          "</div>");

            $(".yacrs-helper-btn").css("margin-top", "10px");

            document.getElementById('yacrs-helper-view-chart').addEventListener('click', viewChart, false);
            document.getElementById('yacrs-helper-view-wordwall').addEventListener('click', viewWordwall, false);
        }
    }

    function getYacrsServerUrl() {
        if(window.location.href.indexOf("classresponse.gla.ac.uk") != -1) {
            return "https://classresponse.gla.ac.uk/";
        }
        else if(window.location.href.indexOf("learn.gla.ac.uk/yacrs") != -1) {
            return "https://learn.gla.ac.uk/yacrs/";
        }
        return "#";
    }

    function getYacrsPage() {
        var url = getYacrsServerUrl();
        var getVarsPos = window.location.href.indexOf("?");
        if(getVarsPos != -1)
            return window.location.href.substring(url.length, getVarsPos);
        else
            return window.location.href.substring(url.length);
    }

    function getQuestionId() {
        return $("input[name=qiID]").attr("value");
    }

    function viewChart() {
        var url = getYacrsServerUrl();
        var qiID = getQuestionId();
        window.open(url+"chart.php?qiID="+qiID, "_blank");
    }

    function viewWordwall() {
        var url = getYacrsServerUrl();
        var qiID = getQuestionId();
        window.open(url+"wordwall.php?qiID="+qiID, "_blank");
    }
})();
