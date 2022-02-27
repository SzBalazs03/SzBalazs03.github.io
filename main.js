document.body.onload = init;

function init() {
    generateNodes()
    initializeButtons()

    tableArea = document.getElementById("tableArea")  
    nodes = tableArea.children    
    map = ""   

}

function initializeButtons() { 
    let solveButton = document.getElementById("solveButton")
    let creButton = document.getElementById("creButton")     
    
    disableInteraction(false)
    
    solveButton.addEventListener("click", function(){ solveMaze() })
    creButton.addEventListener("click", function(){ mazeBuilder()})     
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
    for (i = 0; i < 1035; i++) {
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