

function initializeCards() {  

    
    let algSelect = document.getElementById("algorithm")
    algSelect.addEventListener("click", function(){ changeValue()})

}

const textValues = [
    ["A* search",
    "is a best-first search, meaning that it is formulated in terms of weighted graphs: starting from a specific starting node of a graph, it aims to find a path to the given goal node having the smallest cost (least distance travelled, shortest time, etc.).",
    "https://en.wikipedia.org/wiki/A*_search_algorithm"
],
    ["Breadth-first search",
    "is an algorithm for searching a tree data structure. It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level.",
    "https://en.wikipedia.org/wiki/Breadth-first_search"
],
    ["Depth-first search",
    "is an algorithm for traversing or searching tree or graph data structures. It starts at the root node and explores as far as possible along each branch before backtracking.",
    "https://en.wikipedia.org/wiki/Depth-first_search"
]
]

function changeValue(){
    let algSelect = document.getElementById("algorithm")
    switch (algSelect.value) {
        case "dfs":
            algCard.changeData(textValues[2][0], textValues[2][1], textValues[2][2])
            break;
        case "aStar":
            algCard.changeData(textValues[0][0], textValues[0][1], textValues[0][2])
            break;
        case "bfs":
            algCard.changeData(textValues[1][0], textValues[1][1], textValues[1][2])
            break;
        default:
            console.log("algorithm not selected")
            break;
    }
}


class bootStrapCard {
    constructor(card, title, text, href) {
        this.card = card
        this.title = title
        this.text = text
        this.href = href


        this.changeData = function(title, text, href) {
            
            this.title = title != undefined ? title : ""
            this.text = text != undefined ? text : ""
            this.href = href != undefined ? href : ""
            
    
            this.init()
        } 
        this.init()       
    }

    init() {
        var cNodes = this.card.childNodes
        for (var i = 0; i < cNodes.length; i++) {
            if (cNodes[i].className == "card-title") {
                cNodes[i].innerText = this.title
            }

            if (cNodes[i].className == "card-text") {
                cNodes[i].innerText = this.text
            }
            if (cNodes[i].id == "algCardButton") {
                cNodes[i].href = this.href
            }
        }
    }

   
}

const algCard = new bootStrapCard(document.getElementById("algCard"), textValues[0][0], textValues[0][1], textValues[0][2])const algTextValues = {
const mazeGenTextValues = {
    backTrack: {
        title: "Randomized depth-first search",
        body: "Frequently implemented with a stack, this approach is one of the simplest ways to generate a maze using a computer.",
        href: "https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_depth-first_search"
    },
    prim: {
        title: "Randomized Prim's algorithm",
        body: "Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.",
        href: "https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Prim's_algorithm"
    }
}

const algCard = new bootStrapCard(document.getElementById("algCard"), algTextValues.aStar.title, algTextValues.aStar.body, algTextValues.aStar.href)
