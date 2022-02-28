async function genMaze(){       
    disableInteraction(true)
    makeMazeInteractable(false)
    
    resetNodesTo("Full")

    let startlocation = [0, ySize - 1, (ySize - 1) * xSize, (ySize * xSize) - 1 ]

    let chosenStart = startlocation[Math.floor(Math.random(0, startlocation.length))]   

    await recursiveBacktracker(chosenStart)


    solved = false
    makeMazeInteractable(true)
    disableInteraction(false)
}

async function recursiveBacktracker(current){
    let moves = [1, xSize, -xSize, -1]  //right || down || up ||left

    let possible = []

    nodes[current].className = "node nodeEmpty"

    let emptyCount = 0
    for(let i = 0; i < moves.length; i++){
        let next = current + moves[i]

        if(next <= 0 || next >= nodes.length) {continue} // outside nodes top-bottom

        if((i == 0 && next % xSize == 0) || (i == 3 && current % xSize == 0)) {continue} // outside nodes left-right

        if(nodes[next].className.includes("Empty")) {   //already traversed by alg
            emptyCount++
            if(emptyCount > 1)  // current node should be a wall
            {
                return -1
            }
            continue}  
        if(nodes[next].className.includes("Anim"))  {continue}  //already chosen as a wall  


        possible.push(next)
    }

    if(possible.length == 0){return 0}

    possible = shuffle(possible)

    for(let i = 0; i < possible.length; i++){        
        retValue = await recursiveBacktracker(possible[i])

        if(retValue == 0) {continue}
        if(retValue == -1){            
            nodes[possible[i]].className = "node nodeFull nodeAnim"
            await new Promise(r => setTimeout(r, 1));
        }
    }   

    return 0
}

// array randomizer from:
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }