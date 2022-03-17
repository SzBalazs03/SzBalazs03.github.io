

function initializeCards() {
    algCard.changeData()

    
    let algSelect = document.getElementById("algorithm")
    algSelect.addEventListener("click", function(){ changeValue()})

}

const textValues = [
    ["A* search",
    "is a best-first search, meaning that it is formulated in terms of weighted graphs: starting from a specific starting node of a graph, it aims to find a path to the given goal node having the smallest cost (least distance travelled, shortest time, etc.)."
    
],
    ["Breadth-first search",
    "is an algorithm for searching a tree data structure. It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level."
],
    ["",
    ""
]
]

function changeValue(){
    let algSelect = document.getElementById("algorithm")
    switch (algSelect.value) {
        case "dfs":
            algCard.changeData(textValues[2][0], textValues[2][1])
            break;
        case "aStar":
            algCard.changeData(textValues[0][0], textValues[0][1])
            break;
        case "bfs":
            algCard.changeData(textValues[1][0], textValues[1][1])
            break;
        default:
            console.log("algorithm not selected")
            break;
    }
}


class bootStrapCard {
    constructor(card, title, text) {
        this.card = card
        this.title = title
        this.text = text


        this.changeData = function(title, text) {
            if (title != undefined) {
                this.title = title
            }
    
            if (text != undefined) {
                this.text = text
            }
    
            this.init()
        }        
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
        }
    }

   
}

const algCard = new bootStrapCard(document.getElementById("algCard"), textValues[0][0], textValues[0][1])