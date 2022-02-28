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
    let againButton = document.getElementById("againButton") 
    let genButton = document.getElementById("genButton")    
    
    disableInteraction(false)
    
    solveButton.addEventListener("click", function(){ solveMaze() })
    resetButton.addEventListener("click", function(){ resetNodesTo("Empty") })
    againButton.addEventListener("click", function(){ drawAgain()})
    genButton.addEventListener("click", function(){ genMaze()})


    mazeBuilder()    
}

function resetNodesTo(str){     
    for(var i = 0; i< nodes.length; i++){
        nodes[i].className = "node node".concat(str)
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

async function drawAgain(){
    if(map == ""){return}
    if(start == -1 || end == -1){return}

    disableInteraction(true)
    for (i = 0; i < map.length; i++) {
        if (map[i] == 0) {
            nodes[i].className = "node nodeFull"
            await new Promise(r => setTimeout(r, 8));
            nodes[i].classList.add("nodeAnim")
        }else{
            nodes[i].className = "node nodeEmpty"            
        }  

    }
    nodes[start].className = "node nodeStart" 
    nodes[end].className = "node nodeFinish" 
    await new Promise(r => setTimeout(r, 8));
    nodes[start].classList.add("nodeAnim")
    nodes[end].classList.add("nodeAnim")
    disableInteraction(false)
}