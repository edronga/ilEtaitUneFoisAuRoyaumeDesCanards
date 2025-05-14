'use strict'

eventListMuseum.add('goToMuseum', checkIfPosition(11, 19), ()=> {teleport('mapLimoges', 42, 19)})

bName = 'smoothGetOutOfMuseum'
bCondition = function(){
    if (CACHE.targetTile.x >= 19){
        return true;
    }
    return false
}
bAction = function(){
    CACHE.targetTile = {x: 11, y: 19}
}
eventListMuseum.add(bName, bCondition, bAction)


bName = 'porcelainRockSpeech'
bCondition = function(){
    if (checkIfPosition(5, 5)() === true && CACHE.targetTile.x === 5 && CACHE.targetTile.y === 4){
        return true;
    }
    return false
}

bAction = function(){
    bText = `C'est un caillou.\n\nJeanne nota qu'il n'y avait pas grand monde aujourd'hui.`
    addNarration(bText, false, 'black', 'lightCyan')
    bText = 'Avec une visiteuse volontaire et les quelques voix dans sa tête, ce jour resta néanmoins dans les annales comme un record de fréquention du Musée de la Porcelaine.'
    addNarration2(bText, true, 'white', 'black')
    CACHE.targetTile = {x: 5, y:5}
}
eventListMuseum.add(bName, bCondition, bAction)

bName = 'smoothGoInFrontOfPorcelainRock'
bCondition = function(){
    let condition = function() {
        let r = false;
        [[4,3],[4,4],[4,5],[4,6],[4,7],[5,3],[5,4],[5,6],[5,7],[6,3],[6,4],[6,5],[6,6],[6,7]].forEach((t)=>{
        if (t[0] === CACHE.targetTile.x && t[1] === CACHE.targetTile.y){
            r = true
        }
        })
        return r;
    }()
    return condition
}
bAction = function(){
    CACHE.targetTile = {
        x: 5,
        y: 5
    }
}
eventListMuseum.add(bName, bCondition, bAction)

bName = 'lookAtTheRock'
bCondition = checkIfPosition(5,5)
bAction = function(){
    baseSprite  = baseFormLookingUp
}
eventListMuseum.add(bName, bCondition, bAction)

bName = 'tryAndLookNormal'
bCondition = function (){
    return !checkIfPosition(5,5)()
}
bAction = function(){
    baseSprite  = baseFormLookingDown
}
eventListMuseum.add(bName, bCondition, bAction)
