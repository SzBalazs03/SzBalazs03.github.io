async function dfs(current){        //-xSize up || +xSize down || -1 left || +1 right
    let moves = [1, xSize, -xSize, -1]
    let possible = [] 
    
    if(nodes[current].className.includes("nodeTried")){ //current is already tried
        return -1
    }

    if(current == end){ //current is the end
        nodes[current].className = "node nodeFinish nodeAnim"        
        return 0
    }

    if(current != start){ //dont recolor start
        if(waitTime != 0) {
            await animateNode(nodes[current], "nodeTried", true)
        }
        else {
            animateNode(nodes[current], "nodeTried", false)
        } 
        
    }
    if(waitTime != 0) {await new Promise(r => setTimeout(r, waitTime));}
    
    let i = 0
    for(let j = 0; j < 4; j++) //fill possible array
    {
        let next = current + moves[j]

        if(map[next] != 1) {continue} // not empty node

        if(next == start) {continue} // dont go over start node        

        if(next < 0 || next >= map.length) {continue} // outside map top-bottom

        if((j == 0 && next % xSize == 0) || (j == 3 && current % xSize == 0)) {continue} // outside map left-right    
        
        if(nodes[next].className.includes("Tried")) {continue} //already tried

        possible[i] = next
        i++
        if(next != end){
            if(waitTime != 0) {
                await animateNode(nodes[next], "nodePossiblePath", true)
            }
            else {
                animateNode(nodes[next], "nodePossiblePath", false)
            }
        }
        
        if(waitTime != 0) {await new Promise(r => setTimeout(r, waitTime));}
    }
    /*
    for(let i = possible.length - 1; i >= 0; i--){   //sort possible moves based on distance from endNode
        for(let j = 0; j < i; j++){
            if(distance(possible[j], end) > distance(possible[j+1], end)){
                //swap them
                let temp = possible[j]
                possible[j] = possible[j+1]
                possible[j+1] = temp
            }
        }
    }
    */
    for(let i = 0; i < possible.length; i++){   //recursive call
        if(await dfs(possible[i]) == 0){            
            if(current != start && current != end){                
                if(waitTime != 0) {
                    await animateNode(nodes[current], "nodeCorrect", true)
                }
                else {
                    animateNode(nodes[current], "nodeCorrect", false)
                }
            }
            
            if(waitTime != 0) {await new Promise(r => setTimeout(r, waitTime)); }           
            return 0
        }
    }    

    return -1
}