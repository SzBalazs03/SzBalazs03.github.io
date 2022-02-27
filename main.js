document.body.onload = init;

function init() {
    tableArea = document.getElementById("tableArea")  
    nodes = tableArea.children    
    map = "" 
    xSize = 45
    ySize = 23 
    
    generateNodes()
    initializeButtons()
}

function initializeButtons() { 
    let solveButton = document.getElementById("solveButton")       
    let resetButton = document.getElementById("resetButton")       
    
    disableInteraction(false)
    
    solveButton.addEventListener("click", function(){ solveMaze() })
    resetButton.addEventListener("click", function(){ resetNodes() })

    mazeBuilder()    
}

function resetNodes(){     
    for(var i = 0; i< nodes.length; i++){
        nodes[i].className = "node nodeEmpty"
    }   
    start = -1
    end = -1
    map = ""     
}

function generateNodes() {    
    lastDiv = document.getElementById("end");
    for (i = 0; i < xSize * ySize; i++) {
        // create a new div element
        const newDiv = document.createElement("div");

        newDiv.className = "node nodeEmpty"
        
        //add new element and its content into the DOM
        
        document.getElementById("tableArea").insertBefore(newDiv, lastDiv);
    }
    lastDiv.remove()
}

function disableInteraction(bool){
    if(bool){
        array = Array.from(document.getElementsByTagName("button"))
        array.forEach(element => {
            element.disabled = true
        });        
    }
    else{
        array = Array.from(document.getElementsByTagName("button"))
        array.forEach(element => {
            element.disabled = false
        });        
    }
}