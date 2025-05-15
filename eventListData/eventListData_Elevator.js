'use strict'

eventListElevator.add('goToHospitalHall', checkIfPosition(2, 6), ()=> {teleport('mapHospitalHall',19, 4 )})

eventListElevator.addNpc('ghost', nonPlayableCharacters.ghostLookingDown, 4,2)

bName = 'smoothGetOutOfElevator'
bCondition = function(){
    return (CACHE.targetTile.y >= 6)? true : false;
}
bAction = function (){
    CACHE.targetTile = {x: 2, y:6}
}
eventListElevator.add(bName, bCondition, bAction)

bName = 'makeGhostDisapear'
bCondition = function (){
    if (checkIfPosition(3,3)() || checkIfPosition(3,4)() || checkIfPosition(4,3)() || checkIfPosition(4,4)()){
        return true
    }
    return false
}
bAction = function (){
    eventListElevator.removeNpc('ghost')
}
eventListElevator.add(bName, bCondition, bAction)