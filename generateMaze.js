async function genMaze(){       
    disableInteraction(true)
    makeMazeInteractable(false)

    waitTime = 0
    if(!document.getElementById("isInstantSolve").checked){     //if instant is unchecked then start sampling speed
        stopSample = false                                      //otherwise waittime stays 0;
        sampleWaitTime()
    } 
    
    resetNodesTo("Full")

    let startlocation = [0, ySize - 1, (ySize - 1) * xSize, (ySize * xSize) - 1 ]

    let chosenStart = startlocation[Math.floor(Math.random(0, startlocation.length))]   

    await recursiveBacktracker(chosenStart)


    stopSample = true
    isSolved = false
    makeMazeInteractable(true)
    disableInteraction(false)
}

