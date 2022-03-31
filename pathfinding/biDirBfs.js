async function biDirectionalBfs(){
    let queueStart = []
    queueStart.push(start)

    let queueEnd = []
    queueEnd.push(end)

    let prevStart = []
    let prevEnd = []

    modifiedBfs(queueStart, prevStart, prevEnd)
    await modifiedBfs(queueEnd, prevEnd, prevStart)  
}

async function modifiedBfs(queue, prevThis, prevThat){
    let moves = [1, xSize, -xSize, -1] 
    

    while(queue.length != 0){        
        let current = queue.shift() // take first element out of array

        if(prevThat[current] != undefined){
            await shortestPath(prevThis, current, waitTime)
            return 0
        }

        if(nodes[current].className.includes("Tried")){
            continue
        }

        if (current != start && current != end){
            if(waitTime != 0){
                await animateNode(nodes[current], "nodeTried", true)
            }
            else{
                await animateNode(nodes[current], "nodeTried", false)
            }            
        }

        if(waitTime!=0) {await new Promise(r => setTimeout(r, waitTime));}

        for(let i = 0; i < moves.length; i++){  // find neighbors of current element
            let next = current + moves[i]

            if(map[next] != 1) {continue} // not empty node

            if(next == start || next == end) {continue} // dont go over start and end node           

            if(next < 0 || next >= map.length) {continue} // outside map top-bottom

            if((moves[i] == 1 && next % xSize == 0) || (moves[i] == -1 && current % xSize == 0)) {continue} // outside map left-right    
            
            if(nodes[next].className.includes("Tried")) {       //already explored
                if(prevThat[next] != undefined){
                    await shortestPath(prevThis, current, waitTime)
                    return 0
                }
                continue
            } 
            

            if(!nodes[next].className.includes("PossiblePath")){
                if(waitTime != 0){
                    await animateNode(nodes[next], "nodePossiblePath", true)
                }
                else{
                    await animateNode(nodes[next], "nodePossiblePath", false)
                }
            }   
            queue.push(next)    //put available neighbor into the array

            prevThis[next] = current    // next was reached from current

            if(waitTime!=0) {await new Promise(r => setTimeout(r, waitTime));}
        }
    }
}
