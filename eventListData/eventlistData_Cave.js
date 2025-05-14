'use strict'

eventListCave.add('goToRoad', checkIfPosition(5,9), ()=> {
    if (CACHE.eventTracker['isItYourBirthday'] !== true){
        teleport('mapRoad', 22,24)
    }
    else if (CACHE.eventTracker['isItYourBirthday'] === true){
        bText = `Jeanne voulut sortir de la cave, mais elle se ravissa.\nOn ne pouvait pas revenir dans le passé.\nElle ferait mieux de se concentrer sur la machine à remonter le temps, pour essayer de, euh...`
        addNarration(bText, false, 'white', 'black')
        bText = `Merde!`
        addNarration2(bText, true, 'white', 'black')
        teleport('mapCave', 5,8)
    }})

bName = 'timeMachineSpeech'
bCondition = function(){
    let condition = function() {
        let r = false;
        [[6,2],[6,3],[6,4],[7,2],[7,3],[8,2],[8,3],[8,4]].forEach((t)=>{
        if (t[0] === CACHE.targetTile.x && t[1] === CACHE.targetTile.y){
            r = true
        }
        })
        return r;
    }()
    if (checkIfPosition(7, 4)() === true && condition){
        return true;
    }
    return false
}

bAction = function(){
    if (CACHE.eventTracker['isItYourBirthday'] !== true && CACHE.eventTracker['hasInteractedWithMachine'] === undefined){
        bText = `Jeanne se retrouva devant une machine impressionnante. Qui avait l'air d'avoir été oubliée là et de ne servir à rien`
        addNarration(bText, true, 'black', 'lightCyan')
    }
    else if (CACHE.eventTracker['isItYourBirthday'] === true){
        bText = `Jeanne appuya sur un bouton.\n Il ne se passa rien.`
        addNarration(bText, false, 'black', 'lightCyan')
        bText = `Il faut dire qu'une machine à remonter le temps est quelque chose de très complexe. Très clairement Jeanne n'avait pas la sophiscation mentale nécessaire à son usage.`
        addNarration2(bText, false, 'white', 'black')
        bText = `Jeanne appuya sur un autre bouton.\n Il ne se passa toujours rien.`
        addNarration3(bText, false, 'black', 'lightCyan')
        bText = `Bon. Brainstorming.\nCette histoire d'ascenceur hanté dans l'hôpital c'est sans doute une piste. Ou le musée de la porcelaine, est-ce que c'est vraiment un endroit chiant à mourir ou est-ce que...`
        addNarration4(bText, false, 'white', 'black')
        bText = `Jeanne appuya sur un troisième bouton.\nEncore une fois, il ne se passa...`
        addNarration5(bText, true, 'black', 'lightCyan')
        teleport('mapLimogesPast', STARTPOSITION.x, STARTPOSITION.y)
    }
    
}
eventListCave.add(bName, bCondition, bAction)

bName = 'smoothTalkAndStopToMachine'
bCondition = function(){
    if (CACHE.eventTracker['hasInteractedWithMachine'] === undefined){
        return false
    }
    if (checkIfPosition(5,4)() || checkIfPosition(6,5)() || checkIfPosition(7,5)()){
        return true
    }
    let condition = function() {
        let r = false;
        [[6,2],[6,3],[6,4],[7,2],[7,3],[8,2],[8,3],[8,4]].forEach((t)=>{
        if (t[0] === CACHE.targetTile.x && t[1] === CACHE.targetTile.y){
            r = true
        }
        })
        return r;
    }()
    if (checkIfPosition(7, 4)() === true && condition){
        return true
    }
    return false
}
bAction = function(){
    CACHE.eventTracker['hasInteractedWithMachine'] = false
}
eventListCave.add(bName, bCondition, bAction)

bName = 'smoothGoInFrontOfTimeMachine'
bCondition = function(){
    let condition = function() {
        let r = false;
        [[6,2],[6,3],[6,4],[7,2],[7,3],[7,4],[8,2],[8,3],[8,4]].forEach((t)=>{
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
        x: 7,
        y: 4
    }
}
eventListCave.add(bName, bCondition, bAction)


bName = 'lookAtTheMachine'
bCondition = checkIfPosition(7,4)
bAction = function(){
    baseSprite = baseFormLookingUp
}
eventListCave.add(bName, bCondition, bAction)

bName = 'tryAndLookNormal'
bCondition = function (){
    return !checkIfPosition(7,4)()
}
bAction = function(){
    baseSprite = baseFormLookingDown
}
eventListCave.add(bName, bCondition, bAction)
