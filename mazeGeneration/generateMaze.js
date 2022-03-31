async function genMaze(){       
    disableInteraction(true)
    makeMazeInteractable(false)

    waitTime = 0
    stopSample = false                                      
    sampleWaitTime()
    
    resetNodesTo("Full")    
    

    let chosenStart = Math.floor(Math.random() * xSize * ySize)    
    

    algSelect = document.getElementById("mazeGenAlg")     
    switch (algSelect.value) {
        case "backTrack":
            await recursiveBacktracker(chosenStart);
            break;
        case "prim":
            await randomizedPrim(chosenStart);
            break;        
        default:
            console.log("algorithm not selected")
            break;
    }

    


    stopSample = true
    isSolved = false
    makeMazeInteractable(true)
    disableInteraction(false)
}

