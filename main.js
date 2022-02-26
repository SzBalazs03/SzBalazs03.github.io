document.body.onload = init;

function init() {
    generateNodes()
    initializeButtons()

    tableArea = document.getElementById("tableArea")  
    nodes = tableArea.children    
    map = ""   

}

function initializeButtons() {    
    let saveButton = document.getElementById("saveButton")    
    let genButton = document.getElementById("genButton")    
    let solveButton = document.getElementById("solveButton")
    let creButton = document.getElementById("creButton") 
    
    saveButton.style.display = "none"
    disableInteraction(false)

    genButton.addEventListener("click", function(){ requestMaze() })
    solveButton.addEventListener("click", function(){ solveMaze() })
    creButton.addEventListener("click", function(){ mazeBuilder()})
    saveButton.addEventListener("click", function(){ uploadMaze()})    
}

function requestMaze(){
    saveButton.style.display = "none"
    
    let xhr = new XMLHttpRequest();    
    xhr.open('GET', 'getMaze.php');        
    
    xhr.onload = function() {  
        
        if (xhr.status != 200)  // analyze HTTP status of the response
        { 
            alert(`Error ${xhr.status}: ${xhr.statusText}`)
        } 
        else 
        { 
            resetNodes()

            json = JSON.parse(`${xhr.response}`)[0]
            map = json.maze 
            start = parseInt(json.startNum)
            end = parseInt(json.endNum)
            
            drawMaze(map)
        }
    };    
    
    xhr.send();
    
       
}

async function drawMaze(map){    
    disableInteraction(true)    
    makeMazeInteractable(false)

    for (i = 0; i < map.length; i++) {
        await new Promise(r => setTimeout(r, 1));

        if (map[i] == 0) {
            nodes[i].className = "node nodeFull"
        }   

    }
    nodes[start].className = "node nodeStart" 
    nodes[end].className = "node nodeFinish" 
    disableInteraction(false)
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