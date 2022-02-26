

function mazeBuilder(){
    resetNodes()
    makeMazeInteractable(true)

    document.getElementById("saveButton").style.display = "block"
}

function makeMazeInteractable(bool){
    if(bool){
        for(var i = 0; i< nodes.length; i++){   

            nodes[i].addEventListener("mouseenter", mEnter)

            nodes[i].addEventListener("click", click)

            nodes[i].addEventListener("contextmenu", ctMenu)

        }
    }
    else{
        for(var i = 0; i< nodes.length; i++){
            nodes[i].removeEventListener("mouseenter", mEnter)
            nodes[i].removeEventListener("click", click)
            nodes[i].removeEventListener("contextmenu", ctMenu)
        }
    }    
}

function removeStartOrFinish(str){    
    for(var i = 0; i< nodes.length; i++){
        if(nodes[i].className == "node node".concat(str)){
            nodes[i].className = "node nodeEmpty"
        }
    }
}

function uploadMaze(){  
    
    if(map == "")
    {
        getMapFromNodes()
    }    

    if(start == -1 || end == -1){
        map = ""
        alert("No start or finish node selected.")
        return -1
    }    

    let xhr = new XMLHttpRequest();  

    xhr.open('POST', 'insMaze.php?');        
    
    xhr.onload = function(){
        if (xhr.status != 200)  // analyze HTTP status of the response
        { 
            alert(`Error ${xhr.status}: ${xhr.statusText}`)
        } else{
            alert(`${xhr.response}`)
        }
    }
    
    var params = [
        map,
        start,
        end
    ]

    xhr.send(params)
}

function mEnter(e){    
    if(e.buttons != 1) {return}
    this.className = "node nodeFull"            
}

function click(){                
    removeStartOrFinish("Start")
    this.className = "node nodeStart"
}
function ctMenu(){
    removeStartOrFinish("Finish")
    this.className = "node nodeFinish"
}
