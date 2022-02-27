

function mazeBuilder(){
    resetNodes()
    makeMazeInteractable(true)
    
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
        if(nodes[i].className.includes(str)){
            nodes[i].className = "node nodeEmpty"
        }
    }
}

function mEnter(e){    
    if(e.buttons != 1) {return}
    this.className = "node nodeFull nodeAnim"            
}

function click(){                
    removeStartOrFinish("Start")
    this.className = "node nodeStart nodeAnim"
}
function ctMenu(){
    removeStartOrFinish("Finish")
    this.className = "node nodeFinish nodeAnim"
}
