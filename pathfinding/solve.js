var waitTime = 0
async function solveMaze(){ 
    
    if(isSolved){
        await drawAgain(true)
        await new Promise(r => setTimeout(r, 400));
    }

    getMapFromNodes()
    

    if(start == -1 || end == -1){
        alert("No start or finish node selected.")        
        return -1
    }
           
    disableInteraction(true)
    makeMazeInteractable(false)

    waitTime = 0
    if(!document.getElementById("isInstantSolve").checked){     //if instant is unchecked then start sampling speed
        stopSample = false                                      //otherwise waittime stays 0;
        sampleWaitTime()
    }      

    algSelect = document.getElementById("algorithm")     
    switch (algSelect.value) {
        case "dfs":
            await dfs(start) 
            break;
        case "aStar":
            await aStar()
            break;
        case "bfs":
            await bfs()
            break;
        default:
            console.log("algorithm not selected")
            break;
    }

    isSolved = true
    stopSample = true  

    makeMazeInteractable(true)
    disableInteraction(false) 

        
    
}

function distance(a, b){
    aX = a % xSize
    aY = Math.floor(a / xSize)
    bX = b % xSize
    bY = Math.floor(b / xSize)

    cX = bX - aX
    cY = bY - aY
    return Math.sqrt(cX * cX + cY * cY)
}

function getMapFromNodes(){
    if(map != ""){
        map = ""
        start = -1
        end = -1
    }
    
    for(var i = 0; i < nodes.length; i++){        
        if(nodes[i].className.includes("Full")){
            map += '0'
        }
        else if(nodes[i].className.includes("Start")){
            map += '1'
            start = i
        }
        else if(nodes[i].className.includes("Finish")){
            map += '1'
            end = i
        }else{
            map += '1'
        }        
    }
}

async function sampleWaitTime(){
    while(!stopSample){        
        if(document.getElementById("isInstantSolve").checked){
            waitTime = 0            
        }else{
            waitTime = document.getElementById("solveSpeed").value  
            
        }  
        
        await new Promise(r => setTimeout(r, 100));
    }
}

async function shortestPath(cameFrom, current, waitTime){
    while(current != start && current != end){       

        if(waitTime != 0)
        {
            await animateNode(nodes[current], "nodeCorrect", true)
        }
        else{
            animateNode(nodes[current], "nodeCorrect", false)
        }
        
        
        current = cameFrom[current]

    } 
    
}

