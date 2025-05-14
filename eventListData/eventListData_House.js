'use strict'

eventListHouse1.add('goToLimoges', checkIfPosition(4,8), ()=> {teleport('mapLimoges', 42,43)})

bName = 'smoothGetOutOfHouse'
bCondition = function(){
    if (CACHE.targetTile.x >= 8){
        return true
    }
    return false
}
bAction = function(){
    CACHE.targetTile = {x: 4, y: 8}
}