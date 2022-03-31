

function initializeCards() {     
    let algSelect = document.getElementById("algorithm")
    algSelect.addEventListener("click", function(){ changeValue(algSelect, algCard, algTextValues)})

    let mazeGenSelect = document.getElementById("mazeGenAlg")
    mazeGenSelect.addEventListener("click", function(){ changeValue(mazeGenSelect, mazeCard, mazeGenTextValues)})

}

function changeValue(button, card, textArray){
    let key = button.value    
    card.changeData(textArray[key].title, textArray[key].body, textArray[key].href)
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
            if (cNodes[i].id == "readMoreButton") {
                cNodes[i].href = this.href
            }
        }
    }

   
}

const algTextValues = {
    aStar: {
        title : "A* search",
        body: "is a best-first search, meaning that it is formulated in terms of weighted graphs: starting from a specific starting node of a graph, it aims to find a path to the given goal node having the smallest cost (least distance travelled, shortest time, etc.).",
        href: "https://en.wikipedia.org/wiki/A*_search_algorithm"
    },
    bfs: {
        title: "Breadth-first search",
        body: "is an algorithm for searching a tree data structure. It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level.",
        href: "https://en.wikipedia.org/wiki/Breadth-first_search"
    },
    dfs: {
        title: "Depth-first search",
        body: "is an algorithm for traversing or searching tree or graph data structures. It starts at the root node and explores as far as possible along each branch before backtracking.",
        href: "https://en.wikipedia.org/wiki/Depth-first_search"
    },
    biBfs: {
        title: "Bidirectional search",
        body: "It runs two simultaneous searches: one forward from the initial state, and one backward from the goal, stopping when the two meet.",
        href: "https://en.wikipedia.org/wiki/Bidirectional_search"
    }
}

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
const mazeCard = new bootStrapCard(document.getElementById("mazeGenCard"), mazeGenTextValues.backTrack.title, mazeGenTextValues.backTrack.body, mazeGenTextValues.backTrack.href)

