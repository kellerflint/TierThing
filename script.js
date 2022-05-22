let names = [
    "Skyrim",
    "Civ 5",
    "KSP",
    "Portal 2",
    "TF2",
    "RimWorld",
    "Skylines",
    "Deep Rock",
    "Fallout 4",
    "Stellaris",
    "Minecraft",
    "Satisfactory",
    "Cyberpunk",
    "Witcher 3",
    "Witcher 2",
    "Death Stranding",
    "Borderlands 2",
    "Dishonored",
    "FTL",
    "Garry's Mod",
    "Senua's Sacrifice",
    "L4D2",
    "Life is Strange",
    "No Man's Sky",
    "Shadow of Mordor",
    "Nuclear Dawn",
    "Raft",
    "Prison Architect",
    "Starbound",
    "Stardew Valley",
    "Subnautica",
    "The Long Dark",
    "Napoleon TW",
    "Empire TW",
    "Mount and Blade: Warband",
    "Mount and Blade: Bannerlord",
    "Dungeon Defenders",
    "Dungeon of the Endless",
    "Banished",
];

let games = [
    // {name: "Test GameS", rank: 0},
    // {name: "Test GameA", rank: 1},
    // {name: "Test GameB", rank: 2}
];

names.forEach(x => games.push({name: x}));

const gameInput = document.getElementById("gameInput");
const addGameButton = document.getElementById("addGame");
const tiers = document.getElementsByClassName("tier");
const unranked = document.getElementById("unranked");

addGameButton.addEventListener("click", () => {
    if (gameInput.value != null) {
        games.push({name: gameInput.value});
        render();
    }
});

const render = () => {
    clearTiers();
    addGamesToTiers();
    assignButtonEventListeners();
};

const addGamesToTiers = () => {
    games.forEach((game, index) => {
        if (game) {
            if (!isNaN(game.rank)) {
                tiers[game.rank].append(createGameElement(game.name));
            } else {
                unranked.append(createUnrankedGameElement(game.name));
            }
        }
    });
};

const assignButtonEventListeners = () => {
    const upRankButtons = [...document.getElementsByClassName("up")];
    const downRankButtons = [...document.getElementsByClassName("down")];
    const addRankButtons = [...document.getElementsByClassName("addRank")];
    const deleteButtons = [...document.getElementsByClassName("delete")];
    upRankButtons.map(x => x.addEventListener("click", uprank));
    downRankButtons.map(x => x.addEventListener("click", downrank));
    addRankButtons.map(x => x.addEventListener("click", rank));
    deleteButtons.map(x => x.addEventListener("click", remove));
};

const rank = (event) => {
    const parent = event.target.parentElement;
    const gameName = parent.getElementsByClassName("name")[0].innerHTML;
    let gameRank = parent.getElementsByClassName("rankInput")[0].value;
    if (gameRank === "S" || gameRank === "s") gameRank = 0;
    if (gameRank === "A" || gameRank === "a") gameRank = 1;
    if (gameRank === "B" || gameRank === "b") gameRank = 2;
    if (gameRank === "C" || gameRank === "c") gameRank = 3;
    if (gameRank === "D" || gameRank === "d") gameRank = 4;

    if (gameRank > 4) gameRank = 4;
    if (gameRank < 0) gameRank = 0;
    games.find(x => x.name === gameName).rank = gameRank;
    render();
};

const uprank = (event) => {
    const parent = event.target.parentElement;
    const gameName = parent.getElementsByClassName("name")[0].innerHTML;
    games.find(x => x.name === gameName).rank--;
    render();
};

const downrank = (event) => {
    const parent = event.target.parentElement;
    const gameName = parent.getElementsByClassName("name")[0].innerHTML;
    games.find(x => x.name === gameName).rank++;
    render();
};

const remove = (event) => {
    const parent = event.target.parentElement;
    const gameName = parent.getElementsByClassName("name")[0].innerHTML;
    games.splice(games.indexOf(games.find(x => x.name === gameName)), 1);
    render();
};

const createElement = (type, text, selector) => {
    const element = document.createElement(type);
    const textElement = document.createTextNode(text);
    if (selector != null) element.classList.add(selector);
    if (text != null) element.append(textElement);
    return element;
};

const createGameElement = (gameName) => {
    const gameElement = document.createElement("div");

    game = games.find(x => x.name === gameName);
    if (game.rank > 0) gameElement.append(createRankButton("up"));
    if (game.rank < 4) gameElement.append(createRankButton("down"));

    gameElement.append(createElement("p", gameName, "name"));
    return gameElement;
};

const createUnrankedGameElement = (gameName) => {
    const gameElement = document.createElement("div");

    gameElement.append(createElement("p", gameName, "name"));
    gameElement.append(createElement("input", null, "rankInput"));
    gameElement.append(createElement("button", "Rank", "addRank"));
    gameElement.append(createElement("button", "X", "delete"));
    return gameElement;
};

const createRankButton = (type) => {
    const button = document.createElement("button");
    button.classList.add(type);
    const upRankText = type === "up" ? document.createTextNode("Up") : document.createTextNode("Down");
    button.append(upRankText);
    return button;
};

const clearTiers = () => {
    for (let i = 0; i < tiers.length; i++) {
        tiers[i].innerHTML = "";
    }
    unranked.innerHTML = "";
};

render();