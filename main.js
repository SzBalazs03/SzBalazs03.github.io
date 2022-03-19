document.body.onload = init;

function init() {
    tableArea = document.getElementById("tableArea")  
    nodes = tableArea.children    
    map = "" 
    xSize = 45
    ySize = 23 
    isSolved = false
    
    generateNodes()
    initializeButtons()
}

function initializeButtons() { 
    let solveButton = document.getElementById("solveButton")       
    let resetButton = document.getElementById("resetButton")  
    // let againButton = document.getElementById("againButton") 
    let genButton = document.getElementById("genButton")   
    let solveCheckBox = document.getElementById("isInstantSolve") 
    
    disableInteraction(false)
    
    solveButton.addEventListener("click", function(){ solveMaze() })
    resetButton.addEventListener("click", function(){ resetNodesTo("Empty") })
    // againButton.addEventListener("click", function(){ drawAgain()})
    genButton.addEventListener("click", function(){ genMaze()})
    solveCheckBox.addEventListener("click", function(){ toggleSpeed(solveCheckBox.checked ,document.getElementById("solveSpeed"))})
    
    mazeBuilder()   
    initializeCards() 
}

function resetNodesTo(str){     
    for(var i = 0; i< nodes.length; i++){
        nodes[i].className = "node node".concat(str)
    }   
    start = -1
    end = -1
    map = ""   
    isSolved = false  
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

async function drawAgain(isInstant){
    getMapFromNodes()
    if(start == -1 || end == -1){return}

    disableInteraction(true)
    makeMazeInteractable(false)

    for (i = 0; i < map.length; i++) {
        if (map[i] == 0) {            

            if(!isInstant){ await animateNode(nodes[i], "nodeFull", true)}
            else{
                animateNode(nodes[i], "nodeFull", false)
            }            
            
        }else{
            nodes[i].className = "node nodeEmpty"            
        }  

    }    

    if(!isInstant){ 
        await animateNode(nodes[start], "nodeStart", true)
        await animateNode(nodes[end], "nodeFinish", true)
    }else{
        animateNode(nodes[start], "nodeStart", false)
        animateNode(nodes[end], "nodeFinish", false)
    }        

    isSolved = false
    makeMazeInteractable(true)
    disableInteraction(false)
}

function toggleSpeed(bool, sliderToToggle){
    if(bool){
        sliderToToggle.disabled = true
    }else{
        sliderToToggle.disabled = false
    }
}

async function animateNode(node, className, isAnimated){
    node.className = "node"
    node.classList.add(className)
    if(isAnimated) {await new Promise(r => setTimeout(r, 8))}; // wait for html to reset animation
    node.classList.add("nodeAnim")
}