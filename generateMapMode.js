'use strict'

// return a canvas element 
// impure, modifies cache = CACHE values


function generateMapMode(cache = CACHE){
    const canvas = document.createElement('canvas')
    canvas.height = window.innerHeight * 0.8
    canvas.width = window.innerWidth
    const ctx = canvas.getContext('2d')

    updatePlayerTilePosition ()
    drawMap()
    cache.player.sprite = updatePlayerSprite(cache.player.direction, cache.sixStepsAnimation.value)
    drawCharacter()
    drawNpcSprites()
    drawTargetTile()
    updateMiddleButtonHack()
    checkEventList()

    return canvas;


    function drawMap(){
        ctx.fillStyle = 'black'
        ctx.fillRect(0,0, canvas.width, canvas.height)
        ctx.drawImage(cache.currentMap.image, -cache.player.mapPixelPosition.x + cache.player.screenPixelPosition.x, - cache.player.mapPixelPosition.y + cache.player.screenPixelPosition.y)
    }

    function updatePlayerTilePosition(){
        switch(cache.stepSequence.value[0]){
            case 'left':
                cache.player.direction = "lookingLeft"
                if (checkCollision(cache.player.tilePosition.x, cache.player.tilePosition.y, 'left', cache.currentMap.collisionData, cache.currentMap.width)){
                    cache.stepSequence.value = [''] 
                    return;
                }
                else {
                    cache.player.mapPixelPosition.x = cache.player.mapPixelPosition.x - 8
                }
                if (cache.sixStepsAnimation.value === 5){
                    cache.player.tilePosition.x--
                    cache.stepSequence.takeOffOne()
                    if (cache.stepSequence.nextValue !== 0){
                        cache.stepSequence.value = getShortestPath(cache.currentMap.collisionData, cache.currentMap.width, cache.player.tilePosition.x, cache.player.tilePosition.y, cache.targetTile.x, cache.targetTile.y)
                        cache.stepSequence.nextValue = 0
                    }
                }        
                break;
            case 'right':
                cache.player.direction = "lookingRight"
                if (checkCollision(cache.player.tilePosition.x, cache.player.tilePosition.y, 'right', cache.currentMap.collisionData, cache.currentMap.width)){
                    cache.stepSequence.value = [''] 
                    return;
                }
                else {
                    cache.player.mapPixelPosition.x = cache.player.mapPixelPosition.x + 8
                }
                if (cache.sixStepsAnimation.value === 5){
                    cache.player.tilePosition.x++
                    cache.stepSequence.takeOffOne()
                    if (cache.stepSequence.nextValue !== 0){
                        cache.stepSequence.value = getShortestPath(cache.currentMap.collisionData, cache.currentMap.width, cache.player.tilePosition.x, cache.player.tilePosition.y, cache.targetTile.x, cache.targetTile.y)
                        cache.stepSequence.nextValue = 0
                    }
                }        
                break;
            case 'up':
                cache.player.direction = "lookingUp"
                if (checkCollision(cache.player.tilePosition.x, cache.player.tilePosition.y, 'up', cache.currentMap.collisionData, cache.currentMap.width)){
                    cache.stepSequence.value = [''] 
                    return;
                }
                else {
                    cache.player.mapPixelPosition.y = cache.player.mapPixelPosition.y - 8
                }
                if (cache.sixStepsAnimation.value === 5){
                    cache.player.tilePosition.y--
                    cache.stepSequence.takeOffOne()
                    if (cache.stepSequence.nextValue !== 0){
                        cache.stepSequence.value = getShortestPath(cache.currentMap.collisionData, cache.currentMap.width, cache.player.tilePosition.x, cache.player.tilePosition.y, cache.targetTile.x, cache.targetTile.y)
                        cache.stepSequence.nextValue = 0
                    }
                    
                }        
                break;
            case 'down':
                cache.player.direction = "lookingDown"
                if (checkCollision(cache.player.tilePosition.x, cache.player.tilePosition.y, 'down', cache.currentMap.collisionData, cache.currentMap.width)){
                    cache.stepSequence.value = [''] 
                    return;
                }
                else {
                    cache.player.mapPixelPosition.y = cache.player.mapPixelPosition.y + 8
                }
                if (cache.sixStepsAnimation.value === 5){
                    cache.player.tilePosition.y++
                    cache.stepSequence.takeOffOne()
                    if (cache.stepSequence.nextValue !== 0){
                        cache.stepSequence.value = getShortestPath(cache.currentMap.collisionData, cache.currentMap.width, cache.player.tilePosition.x, cache.player.tilePosition.y, cache.targetTile.x, cache.targetTile.y)
                        cache.stepSequence.nextValue = 0
                    }
                    
                }        
                break;
            default:
                cache.player.direction = "neutral"
                if (cache.sixStepsAnimation.value === 5){
                    cache.stepSequence.takeOffOne()
                    if (cache.stepSequence.nextValue !== 0){
                        cache.stepSequence.value = getShortestPath(cache.currentMap.collisionData, cache.currentMap.width, cache.player.tilePosition.x, cache.player.tilePosition.y, cache.targetTile.x, cache.targetTile.y)
                        cache.stepSequence.nextValue = 0
                    }        
                }  
                break;
        }
    
        function checkCollision(x,y, direction, collisionMap_Data, collisionMap_Width){
            if (typeof(direction) !== 'string'){
                console.log ('direction is not a string')
                return true
            }
            direction = direction.toLowerCase()
            if (!['up','down', 'left', 'right'].includes(direction)){
                console.log ('direction is neither "up", "down", "left" or "right"')
                return true
            }
    
            function getOneDim(x,y, mapWidth){
                return y*mapWidth + x
            }
    
            switch (direction){
                case 'up':
                    if (y === 0){
                        return true
                    }
                    if (collisionMap_Data[getOneDim(x, y - 1, collisionMap_Width)] === 1){
                        return true
                    }
                    else {
                        return false
                    }
                    break;
                case 'down':
                    const collisionMap_Height = collisionMap_Data.length/collisionMap_Width
                    if (y === collisionMap_Height -1){
                        return true
                    }
                    if (collisionMap_Data[getOneDim(x, y + 1, collisionMap_Width)] === 1){
                        return true
                    }
                    else {
                        return false
                    }
                    break;
                case 'left':
                    if (x === 0){
                        return true
                    }
                    if (collisionMap_Data[getOneDim(x -1, y, collisionMap_Width)] === 1){
                        return true
                    }
                    else {
                        return false
                    }
                    break;
                case 'right':
                    if (x === collisionMap_Width - 1){
                        return true
                    }
                    if (collisionMap_Data[getOneDim(x + 1, y, collisionMap_Width)] === 1){
                        return true
                    }
                    else {
                        return false
                    }
                    break;
                default:
                    break;
            }
        }
    }

    function updatePlayerSprite(direction = player.direction, animationFrameValue0to5 = animationFrameValue0to5){
        let n = (animationFrameValue0to5 === -1)? 0: animationFrameValue0to5; /// necessary or not ???
        switch (direction){
            case 'lookingUp':
                return characterSpritesRunningUp[n]
            case 'lookingDown':
                return characterSpritesRunningDown[n]
            case 'lookingLeft' :
                return characterSpritesRunningLeft[n]
            case 'lookingRight':
                return characterSpritesRunningRight[n]
            default:
                return baseSprite
        }
    }

    function drawCharacter(){
        ctx.drawImage(cache.player.sprite, cache.player.screenPixelPosition.x, cache.player.screenPixelPosition.y - (cache.player.sprite.height - cache.currentMap.tileSize)) 
    }

    function drawTargetTile(){
        if (Math.abs(cache.targetTile.x - cache.player.tilePosition.x) < 1 && Math.abs(cache.targetTile.y - cache.player.tilePosition.y) < 1){
            return;
        }

        const tileSize = cache.currentMap.tileSize
        let x = cache.targetTile.x * tileSize - cache.player.mapPixelPosition.x + cache.player.screenPixelPosition.x
        let y = cache.targetTile.y * tileSize - cache.player.mapPixelPosition.y + cache.player.screenPixelPosition.y

        ctx.strokeStyle = (cache.currentMap.collisionData[getOneDim(cache.targetTile.x, cache.targetTile.y, cache.currentMap.width)] === 1) ? 'red':'blue';
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(x + tileSize*0.5 , y + tileSize*0.5, tileSize*0.5, 0, 2* Math.PI)
        ctx.stroke()
    }

    function updateMiddleButtonHack(){
        if (document.getElementById("buttonMiddle").style.backgroundImage === `url(${middleButtonStandard.src})`){
            return
        }
        document.getElementById("buttonMiddle").style.borderColor = 'black'
        document.getElementById("buttonMiddle").style.backgroundImage = `url(${middleButtonStandard.src})`
        document.getElementById("buttonMiddle").style.backgroundColor = 'white'
    }

    function drawNpcSprites(){
        const tileSize = 48
        let x, y;
        let image;
        if (JSON.stringify(cache.eventList.nonPlayableCharacters) === '{}'){
            return;
        }
        for (let p in cache.eventList.nonPlayableCharacters){
            image = cache.eventList.nonPlayableCharacters[p].sprite
            x = cache.eventList.nonPlayableCharacters[p].xPosition * tileSize - CACHE.player.mapPixelPosition.x + CACHE.player.screenPixelPosition.x
            y = cache.eventList.nonPlayableCharacters[p].yPosition * tileSize - CACHE.player.mapPixelPosition.y + CACHE.player.screenPixelPosition.y - (image.height - tileSize)
            ctx.drawImage(image, x, y)
        }
        
    }

    function checkEventList(){
        for (let p in cache.eventList.value){
            if (cache.eventList.value[p] !== undefined){
                if (cache.eventList.value[p].condition() === true){
                    cache.eventList.value[p].action()
                }
            }    
        }
    }
}


function getTwoDims(n, mapWidth){
    let r = {x: 0, y: 0}
    r.x =  n % mapWidth
    r.y = (n - r.x) / mapWidth
    return r
}

function getOneDim(x,y, mapWidth){
    return y*mapWidth + x
}

function directionToCalculation(x, y, direction){
    let r = {
        x:x,
        y:y
    }
    if (typeof(direction) !== 'string'){
        console.log ('direction is not a string')
        return r
    }
    direction = direction.toLowerCase()
    if (!['up','down', 'left', 'right'].includes(direction)){
        console.log ('direction is neither "up", "down", "left" or "right"')
        return r
    }

    switch(direction){
        case'up':
            return r = {
                x: x,
                y: y -1
            }
        case 'down':
            return r = {
                x: x,
                y: y +1
            }
        case 'left':
            return r = {
                x: x - 1,
                y: y
            }
        case 'right':
            return r = {
                x: x + 1,
                y: y
            }
    }
}

function getShortestPath (collisionMap_Data, collisionMap_Width, originTile_x, originTile_y, targetTile_x, targetTile_y){
    let r = ''
    const MAX_ITERATION = 1000

    if (originTile_x === targetTile_x && originTile_y === targetTile_y){
        return r = ['']
    }
    if (collisionMap_Data[getOneDim(targetTile_x,targetTile_y, collisionMap_Width)] === 1){
        return r = ['']
    }

    function estimatedDistanceToTarget(currentTile_x, currentTile_y, targetTile_x, targetTile_y){
        return Math.abs(targetTile_x - currentTile_x) + Math.abs(targetTile_y - currentTile_y)
    }
    let visitedNodes = {
        value: {},
        initialize: function(x,y){
            const ref = `x${x}y${y}`
            this.value[ref] = {
                x: x,
                y: y,
                distanceToBase: 0,
                path: [''],
                aStarFunction: Infinity
            }
        },
        push: function(x,y, distance, previousPath, direction, targetTile_x, targetTile_y){
            const ref = `x${x}y${y}`
            if (this.value[ref] === undefined){
                this.value[ref] = {
                    x: x,
                    y: y,
                    distanceToBase: distance + 1,
                    path: function (){
                        let r = []
                        previousPath.forEach((n) =>{
                            if (n !== undefined){
                                r.push(n)
                            }
                        })
                        r.push(direction)
                        return r
                    }(),
                    aStarFunction: distance + 1 + estimatedDistanceToTarget(x,y, targetTile_x, targetTile_y)
                }
            }
            else if (this.value[ref] !== undefined && distance < this.value[ref].distanceToBase){
                this.value[ref] = {
                    x: x,
                    y: y,
                    distanceToBase: distance + 1,
                    path: function (){
                        let r = []
                        previousPath.forEach((n) =>{
                            if (n !== undefined){
                                r.push(n)
                            }
                        })
                        r.push(direction)
                        return r
                    }(),
                    aStarFunction: distance + 1 + estimatedDistanceToTarget(x,y, targetTile_x, targetTile_y)
                }
            }
        }
    }

    let openSet = {
        value: {},
        push: function(x,y){
            const ref = `x${x}y${y}`
            if (this.value[ref] !== false){
                this.value[ref] = true
            }      
        },
        pop: function(x,y){
            const ref = `x${x}y${y}`
            this.value[ref] = false
        }
    }

    function checkCollision(x,y, direction, collisionMap_Data, collisionMap_Width){
        if (typeof(direction) !== 'string'){
            console.log ('direction is not a string')
            return true
        }
        direction = direction.toLowerCase()
        if (!['up','down', 'left', 'right'].includes(direction)){
            console.log ('direction is neither "up", "down", "left" or "right"')
            return true
        }

        switch (direction){
            case 'up':
                if (y === 0){
                    return true
                }
                if (collisionMap_Data[getOneDim(x, y - 1, collisionMap_Width)] === 1){
                    return true
                }
                else {
                    return false
                }
                break;
            case 'down':
                const collisionMap_Height = collisionMap_Data.length/collisionMap_Width
                if (y === collisionMap_Height -1){
                    return true
                }
                if (collisionMap_Data[getOneDim(x, y + 1, collisionMap_Width)] === 1){
                    return true
                }
                else {
                    return false
                }
                break;
            case 'left':
                if (x === 0){
                    return true
                }
                if (collisionMap_Data[getOneDim(x -1, y, collisionMap_Width)] === 1){
                    return true
                }
                else {
                    return false
                }
                break;
            case 'right':
                if (x === collisionMap_Width - 1){
                    return true
                }
                if (collisionMap_Data[getOneDim(x + 1, y, collisionMap_Width)] === 1){
                    return true
                }
                else {
                    return false
                }
                break;
            default:
                break;
        }
    
    }

    /* description of the A* (A star) algorithm
    g(n) = g cost = distance for the start
    h(n) = h cost = estimated distance to the end
    1: from current node, create 0-4 new nodes, for each node, check if target, if not, calculate f(n) = g(n) + h(n), where g(n) is the distance from initial node, and h(n) is estimated distance to target
    2: take off the current node for the choice options
    3: pick one of the node with the lowest f(n)
    4: start again
    */

    visitedNodes.initialize(originTile_x, originTile_y)

    let currentNodeRef = `x${originTile_x}y${originTile_y}`

    for (let i = 0; i<MAX_ITERATION; i++){
        // create new nodes :
        let possibleDirections = ['up', 'down', 'left', 'right']
        let x = visitedNodes.value[currentNodeRef].x
        let y = visitedNodes.value[currentNodeRef].y
        possibleDirections.forEach((direction) => {
            if (!checkCollision(x,y, direction, collisionMap_Data, collisionMap_Width)){
                let newX = directionToCalculation(x,y, direction).x
                let newY = directionToCalculation(x,y, direction).y
                visitedNodes.push(newX, newY, visitedNodes.value[currentNodeRef].distanceToBase, visitedNodes.value[currentNodeRef].path, direction, targetTile_x, targetTile_y)
                if (newX === targetTile_x && newY === targetTile_y){
                    r = visitedNodes.value[`x${newX}y${newY}`].path
                }
                openSet.push(newX, newY)
            }
        })

        // take off the current node from the choice options
        openSet.pop(x,y)

        // 3: pick one of the node with the lowest f(n)
        let lowestNumber = Infinity
        for (let p in visitedNodes.value){
            if (visitedNodes.value[p] !== undefined && openSet.value[p] === true){
                if (visitedNodes.value[p].aStarFunction < lowestNumber){
                    lowestNumber = visitedNodes.value[p].aStarFunction
                    currentNodeRef = `x${visitedNodes.value[p].x}y${visitedNodes.value[p].y}`
                }
            }   
        }

    }

    return r.slice(1);
}