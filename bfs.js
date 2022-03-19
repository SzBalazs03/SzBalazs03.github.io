async function bfs(){
    let queue = []
    queue.push(start)

    let moves = [1, xSize, -xSize, -1]

    let prev = []

    while(queue.length != 0){
        let current = queue.shift() // take first element out of array

        if(current == end){
            await shortestPath(prev, prev[end])
            return 0
        }

        if(nodes[current].className.includes("Tried")){
            continue
        }

        if (current != start){
            if(nodes[current].className.includes("nodeAnim")){  // if it was already animated reset it

                nodes[current].className = "node nodeTried"
                await new Promise(r => setTimeout(r, 8)); // wait for html to reset animation
                nodes[current].classList.add("nodeAnim")
    
            }else{
                nodes[current].className = "node nodeTried nodeAnim"
            }
        }

        if(waitTime!=0) {await new Promise(r => setTimeout(r, waitTime));}

        for(let i = 0; i < moves.length; i++){  // find neighbors of current element
            let next = current + moves[i]

            if(map[next] != 1) {continue} // not empty node

            if(next == start) {continue} // dont go over start node           

            if(next < 0 || next >= map.length) {continue} // outside map top-bottom

            if((moves[i] == 1 && next % xSize == 0) || (moves[i] == -1 && current % xSize == 0)) {continue} // outside map left-right    
            
            if(nodes[next].className.includes("Tried")) {continue} //already explored
            

            if(next != end && !nodes[next].className.includes("PossiblePath")){
                nodes[next].className = "node nodePossiblePath nodeAnim"
            }   
            queue.push(next)    //put available neighbor into the array

            prev[next] = current    // next was reached from current

            if(waitTime!=0) {await new Promise(r => setTimeout(r, waitTime));}
        }
    }
}
