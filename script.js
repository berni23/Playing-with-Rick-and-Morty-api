$(function () {


    var HOME = "https://rickandmortyapi.com/api/"
    var openNavBtn = $('.openbtn');
    var sidebar = $(".sidebar");
    var main = $("main");
    var title = $("header>*");
    var episodes = [] // episodes stored by id (position)
    var storedChars = [] // characters stored by id (position)
    var charsContainer = $(".characters-container");
    var linkEpisodes = $('.linkEpisodes-list');
    var chapterName = $('.chapter-name');
    var chapterInfo = $('.chapter-info');
    var loading = $('#loading-id');
    var noQuery = true;

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
        else if ($(event.target).hasClass('episode')) {

            if (noQuery) loading.addClass("hidden")

            var episode = episodes[$(event.target).data("episode") - 1]

            chapterName.text(episode.name)
            chapterInfo.text(episode.air_date + " | " + episode.episode)

            console.log("EPISODE", episode)
            charsContainer.empty();
            var charLinks = episode.characters
            for (i = 0; i < charLinks.length; i++) {

                var charId = idFromUrl(charLinks[i])
                var char = storedChars[charId - 1] // arrays start at 0

                if (char) displayCharacter(char)

                else {

                    // console.log("charLink", charLinks[i])
                    char = axios.get(charLinks[i]).then(function (data) {

                        storedChars[charId - 1] = data.data;

                        // console.log("char data:",data.data)

                        displayCharacter(data.data)
                    })
                }
            }

        }
        // displayCharacter(episodes[$(event.target).data("episode") - 1].characters[0])

    })



    function displayCharacter(char) {

        var container = $("<div></div>")

        //var imgContent = '<img src ="' + char.image + '">'

        var img = $('<img src ="' + char.image + '">');
        var ul = $("<ul></ul>");
        var name = $('<li><span class="label"> Name: </span><span>' + char.name + '</span></li>');
        var status = $('<li><span class = "label"> Status: </span><span>' + char.status + '</span> </li>');
        var species = $('<li><span class = "label"> Specie: </span><span>' + char.species + '</span> </li>');

        ul.append(name).append(status).append(species)
        container.append(img).append(ul)
        charsContainer.append(container);
    }

    // initialize

    axios.get(HOME + "episode").then(function (data) {

        var results = data.data.results;
        var keys = Object.keys(results)
        /* console.log(keys)
         console.log(episodes)
         */


        keys.forEach(function (key) {
            episodes.push(results[key]);
            addEpisodeSidebar(parseInt(key) + 1);

        })


    })


    function addEpisodeSidebar(id) {

        sidebar.append($("<p class = 'episode' data-episode = '" + id + "'>Episode " + id + "</p>"));

    }


    function idFromUrl(url) {
        var last2 = url.slice(-2);
        if (last2[0] === "/") return url.slice(-1)
        return last2


    }


    //var requests = [axios.get(url), axios.get(url), axios.get(url)]​
    //axios.all(requests)



})