async function randomizedPrim(start){

    let moves = [1, xSize, -xSize, -1]
    let visited = []
    let walls = []
    //Pick a cell, mark it as part of the maze
    visited.push(start);
    nodes[start].className = "node nodePossiblePath nodeAnim"

    //Add the walls of the cell to the wall list.
    for(var i = 0; i< moves.length; i++){        
        let next = start+moves[i]
        if(next <= 0 || next >= nodes.length) {continue} // outside nodes top-bottom
        if((i == 0 && next % xSize == 0) || (i == 3 && start % xSize == 0)) {continue} // outside nodes left-right

        walls.push(next)
        nodes[next].classList.add("nodeAnim")

        if(waitTime != 0) {await new Promise(r => setTimeout(r, waitTime));}
    }

    nodes[start].className = "node nodeEmpty"
    while(walls.length != 0){
        //Pick a random wall from the list.
        let ranWallIndex = Math.floor(Math.random() * walls.length)
        let ranWall = walls[ranWallIndex]
        
        //Count the visited wall neighbours
        let visitedCounter = 0
        for(var i = 0; i< moves.length; i++){
            let next = ranWall + moves[i]
            if(next <= 0 || next >= nodes.length) {continue} // outside nodes top-bottom
            if((i == 0 && next % xSize == 0) || (i == 3 && ranWall % xSize == 0)) {continue} // outside nodes left-right

            if(visited.includes(next)){
                visitedCounter++
            }
        }

        //If only one of the cells that the wall divides is visited
        if(visitedCounter == 1){
            //Make the wall a passage            
            if(waitTime != 0) {await new Promise(r => setTimeout(r, waitTime));}
            nodes[ranWall].className = "node nodePossiblePath nodeAnim"

            //mark the unvisited cell as part of the maze.
            visited.push(ranWall)

            //Add the neighboring walls of the cell to the wall list.
            for(var i = 0; i< moves.length; i++){
                let next = ranWall + moves[i]
                if(!visited.includes(next)){
                    if(next <= 0 || next >= nodes.length) {continue} // outside nodes top-bottom
                    if((i == 0 && next % xSize == 0) || (i == 3 && ranWall % xSize == 0)) {continue} // outside nodes left-right
                    
                    walls.push(ranWall + moves[i])
                    nodes[ranWall+moves[i]].classList.add("nodeAnim")

                    if(waitTime != 0) {await new Promise(r => setTimeout(r, waitTime));}
                }
            }

            //Remove the wall from the list.
            walls.splice(ranWallIndex, 1)
            nodes[ranWall].className = "node nodeEmpty"

        }else{
            walls.splice(ranWallIndex, 1)
            //visited.push(ranWall)
        }


    }



}