(() => {

    function selectEpisode(ep) {
        const se = document.querySelector(".selectedEpisode");
        const audio = document.querySelector("audio");
        se.textContent = ep.querySelector("title").textContent;

        audio.querySelector("source").src = ep.querySelector("enclosure").getAttribute("url");

        audio.load();
    }

    function createListItem(item) {
        let ul = document.querySelector(".episodeList");
        let li = document.createElement("li");
        li.className = "episodeItem";
        li.innerHTML = item.querySelector("title").textContent;

        li.addEventListener("click", () => {
            selectEpisode(item);
        });

        ul.appendChild(li);
    }

    fetch('https://strawstack.github.io/BlindGame/feed.xml')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(xml => {
            let items = xml.querySelectorAll("item");
            for (let item of items) {
                createListItem(item);
            }
            selectEpisode(items[0]);
        });
})();