async function solveMaze(){ 
    if(map == ""){        
        getMapFromNodes()
    }

    if(start == -1 || end == -1){
        alert("No start or finish node selected.")
        map = ""
        return -1
    }
           
    disableInteraction(true)
    waitTime = 25
    stopSample = false
    sampleWaitTime()

    await dfs(start) 

    stopSample = true
    disableInteraction(false)      
    
}

async function dfs(current){        //-xSize up || +xSize down || -1 left || +1 right
    var moves = [1, xSize, -xSize, -1]
    var possible = [] 
    
    if(nodes[current].className.includes("nodeTried")){ //current is already tried
        return -1
    }

    if(current == end){ //current is the end
        nodes[current].className = "node nodeFinish nodeAnim"        
        return 0
    }

    if(current != start){ //dont recolor start
        if(nodes[current].className.includes("nodeAnim")){  // if it was already animated reset it

            nodes[current].className = "node nodeTried"
            await new Promise(r => setTimeout(r, 8)); // wait for html to reset animation
            nodes[current].classList.add("nodeAnim")

        }else{
            nodes[current].className = "node nodeTried nodeAnim"
        }
        
    }
    await new Promise(r => setTimeout(r, waitTime));
    
    var i = 0
    for(var j = 0; j < 4; j++) //fill possible array
    {
        next = current + moves[j]

        if(map[next] != 1) {continue} // not empty node

        if(next == start) {continue} // dont go over start node

        if(nodes[next].className.includes("Tried")) {continue} //already tried

        if(next <= 0 || next >= map.length) {continue} // outside map top-bottom

        if((j == 0 && next % xSize == 0) || (j == 3 && current % xSize == 0)) {continue} // outside map left-right        

        possible[i] = next
        i++
        nodes[next].className = "node nodePossiblePath nodeAnim"
        await new Promise(r => setTimeout(r, waitTime));
    }
    
    for(var i = possible.length - 1; i >= 0; i--){   //sort possible moves based on distance from endNode
        for(var j = 0; j < i; j++){
            if(distance(possible[j], end) > distance(possible[j+1], end)){
                //swap them
                var temp = possible[j]
                possible[j] = possible[j+1]
                possible[j+1] = temp
            }
        }
    }

    for(var i = 0; i < possible.length; i++){   //recursive call
        if(await dfs(possible[i]) == 0){            
            if(current != start && current != end){                
                nodes[current].className = "node nodeCorrect"
                await new Promise(r => setTimeout(r, 8)); // wait for html to reset animation
                nodes[current].classList.add("nodeAnim")
            }
            
            await new Promise(r => setTimeout(r, waitTime));            
            return 0
        }
    }    

    return -1
}

function distance(a, b){
    aX = a % xSize
    aY = Math.floor(a / xSize)
    bX = b % xSize
    bY = Math.floor(b / xSize)

    cX = bX - aX
    cY = bY - aY
    return Math.sqrt(cX * cX + cY * cY)
}

function getMapFromNodes(){
    for(var i = 0; i < nodes.length; i++){
        if(nodes[i].className.includes("Empty")){
            map += '1'
        }
        else if(nodes[i].className.includes("Full")){
            map += '0'
        }
        else if(nodes[i].className.includes("Start")){
            map += '1'
            start = i
        }
        else if(nodes[i].className.includes("Finish")){
            map += '1'
            end = i
        }        
    }
}

async function sampleWaitTime(){
    while(!stopSample){
        waitTime = document.getElementById("slider").value
        await new Promise(r => setTimeout(r, 100));
    }
}