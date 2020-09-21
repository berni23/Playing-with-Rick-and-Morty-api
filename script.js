$(function () {


    var closeNavBtn = $('.closebtn');
    var openNavBtn = $('.openbtn');
    var sidebar = $(".sidebar");
    var main = $("main");

    closeNavBtn.click(function () {
        closeNav()
    })


    openNavBtn.click(function () {
        openNav()
    })

    function openNav() {

        /* sidebar.css("width", "250px");
         main.css("marginLeft", "250px");*/

        sidebar.addClass("displaySidebar")
        main.addClass("mainSidebar")
    }

    function closeNav() {

        sidebar.removeClass("displaySidebar")
        main.removeClass("mainSidebar")
        /*sidebar.css("width", "0");
        main.css("marginLeft", "0");*/
    }




})