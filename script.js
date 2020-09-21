$(function () {


    var HOME = "https://rickandmortyapi.com/api/"
    var openNavBtn = $('.openbtn');
    var sidebar = $(".sidebar");
    var main = $("main");
    var title = $("header>*");
    var episodes = []

    openNavBtn.click(function () {
        openNav()
    })

    function openNav() {
        if (!sidebar.hasClass("displaySidebar")) title.css("left", "+=250")
        else title.css("left", "-=250")
        sidebar.toggleClass("displaySidebar")
        main.toggleClass("mainSidebar")


    }

    function closeNav() {

        sidebar.removeClass("displaySidebar")
        main.removeClass("mainSidebar")
        title.css("left", "-=250")
    }

    sidebar.click(function (event) {

        if ($(event.target).hasClass('closebtn')) closeNav()

        if ($(event.target).hasClass('episode')) {

        }
    })

    // initialize
    axios.get(HOME + "episode").then(function (data) {

        var results = data.data.results;
        var keys = Object.keys(results)
        console.log(keys)
        console.log(episodes)

        keys.forEach(function (key) {
            episodes.push(results[key]);
            addEpisodeSidebar(parseInt(key) + 1);

        })

        console.log(episodes);
    })


    function addEpisodeSidebar(id) {

        sidebar.append($("<p class = 'episode' data-episode = '" + id + "'>Episode " + id + "</p>"));

    }


    //var requests = [axios.get(url), axios.get(url), axios.get(url)]​
    //axios.all(requests)



})