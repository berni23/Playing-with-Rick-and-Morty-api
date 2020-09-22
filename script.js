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
    var loadChapters = $(".loadChapters")

    var currentChapterPage = 1;

    openNavBtn.click(function () {

        if (sidebar.hasClass("displaySidebar")) closeNav()
        else openNav()
    })

    function openNav() {

        title.animate({
            left: "+=250"
        }, 0.3, "linear")
        //  else title.css("left", "-=250")
        sidebar.addClass("displaySidebar")
        main.addClass("mainSidebar")

    }

    function closeNav() {
        sidebar.removeClass("displaySidebar")
        main.removeClass("mainSidebar")
        title.animate({
            left: "-=250"
        }, 0.3, "linear") //css("left", "-=250")
    }


    loadChapters.click(function () {

        currentChapterPage++;
        getChapterPage(currentChapterPage)


    })

    sidebar.click(function (event) {

        if ($(event.target).hasClass('closebtn')) closeNav()
        else if ($(event.target).hasClass('episode')) {

            loading.removeClass("hidden")
            var episode = episodes[$(event.target).data("episode") - 1]
            chapterName.text(episode.name)
            chapterInfo.text(episode.air_date + " | " + episode.episode)
            console.log("EPISODE", episode)
            charsContainer.empty();
            var charLinks = episode.characters
            var charNum = 0 // in order to hide the loading icon at the end, we need to know if the async task is the last one or not
            var currentCharList = storedChars.slice()

            for (var i = 0; i < charLinks.length; i++) {

                var charId = idFromUrl(charLinks[i])
                var char = currentCharList[charId - 1] // arrays start at 0, id's do not
                if (char) { // if character was displayed in the past, its data is already stored
                    displayCharacter(char)
                    charNum++
                    if (charNum == charLinks.length) loading.addClass("hidden");

                } else {
                    charNum++
                    getCharacter(charLinks[i], charId, charNum, charLinks.length)
                }

            }

        }
    })

    // initialize

    getChapterPage(currentChapterPage);
    setTimeout(loading.removeClass("hidden"), 100)

    function getChapterPage(page) {

        loading.removeClass("hidden")
        axios.get(HOME + "episode?page=" + page).then(function (data) {

            var results = data.data.results
            results.forEach(function (episode) {
                addEpisodeSidebar(episode.id);
                episodes.push(episode);
            })
        }).catch(function (error) {
            console.log("no more episodes to load")
        }).finally(loading.addClass("hidden"))

    }

    function getCharacter(link, id, charNum, maxChar) {
        axios.get(link).then(function (data) {
            // console.log("char data:",data.data)
            displayCharacter(data.data)
            return data.data
        }).then(function (data) {

            storedChars[id - 1] = data
            console.log(storedChars);
            if (charNum == maxChar) loading.addClass("hidden")
        })

    }

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

    function addEpisodeSidebar(id) {
        sidebar.append($("<p class = 'episode' data-episode = '" + id + "'>Episode " + id + "</p>"));

    }

    function idFromUrl(url) {
        var last3 = url.slice(-3);
        if (last3[0] === "/") return url.slice(-2)
        if (last3[1] === "/") return url.slice(-1);
        return last3;

    }

    //var requests = [axios.get(url), axios.get(url), axios.get(url)]​
    //axios.all(requests)


})