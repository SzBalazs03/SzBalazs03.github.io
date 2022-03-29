async function genMaze(){       
    disableInteraction(true)
    makeMazeInteractable(false)

    waitTime = 0
    if(!document.getElementById("isInstantSolve").checked){     //if instant is unchecked then start sampling speed
        stopSample = false                                      //otherwise waittime stays 0;
        sampleWaitTime()
    } 
    
    resetNodesTo("Full")    
    

    let chosenStart = Math.floor(Math.random() * xSize * ySize)    
    


    await recursiveBacktracker(chosenStart)


    stopSample = true
    isSolved = false
    makeMazeInteractable(true)
    disableInteraction(false)
}

