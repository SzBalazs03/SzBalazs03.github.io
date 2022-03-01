async function aStar()
{
    
    let openSet = [start]   //discovered nodes that might need to re rechecked

    let cameFrom = []   //cameFrom[n] is the node preceding n on the cheapest path

    let gScore = [] //gScore[n] is the cost of cheapest path from n to start
    gScore[start] = 0

    let fScore = [] //fScore[n] = gScore[n] + distance(n, end) which is the cost of a path 
    fScore[start] = distance(start, end)  //from start to finish that goes through n

    let moves = [1, xSize, -xSize, -1] //-xSize up || +1 right || +xSize down || -1 left

    while(openSet.length != 0)
    {
        let current = openSet[0]
        let currentOpenSetIndex = 0
        for(let i = 1; i < openSet.length; i++){
            if(fScore[openSet[i]] < fScore[current]){
                current = openSet[i]
                currentOpenSetIndex = i
            }
        }
        // current is the node having the lowest fScore in openSet

        if(current == end){
            await shortestPath(cameFrom, cameFrom[current])
            return 0
        }

        if(current != start){ //color current unless it is start
            if(nodes[current].className.includes("nodeAnim")){  // if it was already animated reset it
    
                nodes[current].className = "node nodeTried"
                await new Promise(r => setTimeout(r, 8)); // wait for html to reset animation
                nodes[current].classList.add("nodeAnim")
    
            }else{
                nodes[current].className = "node nodeTried nodeAnim"
            }
            
        }

        await new Promise(r => setTimeout(r, waitTime));

        openSet.splice(currentOpenSetIndex, 1)  //remove current from openSet

        for(let i = 0; i < moves.length; i++){
            let next = current + moves[i]

            if(map[next] != 1) {continue} // not empty node

            if(next == start) {continue} // dont go over start node           

            if(next < 0 || next >= map.length) {continue} // outside map top-bottom

            if((i == 0 && next % xSize == 0) || (i == 3 && current % xSize == 0)) {continue} // outside map left-right    
            
            if(nodes[next].className.includes("Tried")) {continue} //already tried

            if(next != end){
                nodes[next].className = "node nodePossiblePath nodeAnim"
            }            
            await new Promise(r => setTimeout(r, waitTime));

            if(gScore[current] + 1  < gScore[next] || gScore[next] == undefined){
                //path from start to current + 1 is better than previous path from start to next
                cameFrom[next] = current

                gScore[next] = gScore[current] + 1
                fScore[next] = 0.75 * gScore[next] + distance(next, end) * 1.667
                
                let isInOpenSet = false
                for(let j = 0; j < openSet.length; j++){
                    if(openSet[j] == next){
                        isInOpenSet = true
                        break
                    }
                }
                if(!isInOpenSet){
                    openSet.push(next)
                }
            }

        }


    }
} 

