'use strict'

eventListHarbour.add('goToLimoges', checkIfPosition(6,10), () => {teleport('mapLimoges', 21, 19)})

eventListHarbour.addNpc('sailor', nonPlayableCharacters.sailorLookingDown, 9, 3)

bName = 'smoothGetOutOfHarbour'
bCondition = function(){
    if (CACHE.targetTile.y >= 10){
        return true
    }
    return false;
}
bAction = function(){
    CACHE.targetTile = {
        x: 6,
        y: 10
    }
}
eventListHarbour.add(bName, bCondition, bAction)

bName = 'lookInTheRightDirection'
bCondition = function() {
    if(checkIfPosition(9,4)()){
        return true
    }
    return false
}
bAction = function(){
    baseSprite = baseFormLookingUp
}
eventListHarbour.add(bName, bCondition, bAction)

bName = 'tryAndLookNormal'
bCondition = function() {
    if(checkIfPosition(9,4)()){
        return false
    }
    return true
}
bAction = function(){
    baseSprite = baseFormLookingDown
}
eventListHarbour.add(bName, bCondition, bAction)


bName = 'sailorSpeech'
bCondition = function(){
    if (checkIfPosition(9,4)() === true && CACHE.eventTracker['stopTalkingToSailor'] !== true && CACHE.targetTile.x === 9 && CACHE.targetTile.y === 3){
        return true;
    }
    return false
}
bAction = function(){
    if (CACHE.eventTracker['hasMetSailor'] === undefined){
        bText = `Pendant 20 ans tout le monde s'est moqué de moi parce que j'avais une planche de surf alors qu'il n'y a pas la mer dans cette ville de bouseux. Maintenant j'ai un bateau !`
        addSpeech('???', 'black', bText, 'black', ['planche de surf'], sailorImg, false) 
        bText = `Jeanne pensa quelque chose. \n-Tout son contraire dit-elle, avec un grand sourire.\nElle leva intérieurement les yeux au ciel`
        addNarration2(bText, true, 'black', 'lightblue')
        CACHE.eventTracker['hasMetSailor'] = true
        CACHE.eventTracker['stopTalkingToSailor'] = true
        return;
    }
    switch (CACHE.heldObject.value){
        case 'hairDo':
            bText = `Tout ce qu'il me manque c'est des cheveux, et je suis à partir à l'aventure !`
            addSpeech('[Capitaine Crochet]', 'black', bText, 'black', ['cheveux'], sailorImg, false) 
            bText = `Jeanne ferma les yeux et laisser échapper un long sourire. Sa nouvelle coiffure de cheveux était ridicule, mais c'était probablement le truc en vogue à Biarritz.\nElle sacrifia sa coupe pour une planche.`
            addNarration2(bText, true, 'black', 'lightblue')
            CACHE.eventTracker['wasSurfingPlankObtained'] = true
            CACHE.heldObject.update('surfingPlank', imgSurfingPlank)
            eventListHarbour.removeNpc('sailor')
            eventListHarbour.addNpc('sailor', nonPlayableCharacters.sailorBlondHairLookingDown, 9, 3)
            break;
        case 'surfingPlank':
            bText = `A babord toute mousaillon !`
            addSpeech('[Capitaine Crochet]', 'black', bText, 'black', ['cheveux'], sailorImg, false)
            break;
        default:
            bText = `Tout ce qu'il me manque c'est des cheveux, et je suis à partir à l'aventure !`
            addSpeech('[Capitaine Crochet]', 'black', bText, 'black', ['cheveux'], sailorImg, false) 
            bText = `Jeanne lui proposa d'aller chez le coiffeur. Il fit la moue. C'était compréhensif. Beaucoup de gens n'aimaient pas qu'on les touche.`
            addNarrationé(bText, true, 'black', 'lightblue')
    }
    CACHE.eventTracker['stopTalkingToSailor'] = true
    
}
eventListHarbour.add(bName, bCondition, bAction)

bCondition = function(){
    if (CACHE.eventTracker['wasSurfingPlankObtained'] === true && CACHE.slideQueue.nextValue === undefined){
        CACHE.eventTracker['wasSurfingPlankObtained'] = undefined
        return true;
    }
    return false
}
eventListHarbour.add('checkIfSurfingPlankWasObtained', bCondition, () =>{CACHE.heldObject.update('surfingPlank', imgSurfingPlank)})

bName = 'smoothGoTalkToSailor'
bCondition = function(){
    let condition = function() {
        let r = false;
        [[8,2], [8,3], [9,2], [9,3], [10,2], [10,3]].forEach((t)=>{
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
        x: 9,
        y: 4
    }
}
eventListHarbour.add(bName, bCondition, bAction)

bName = 'smoothTalkAndStopToSailor'
bCondition = function(){
    if (CACHE.eventTracker['hasMetSailor'] === undefined){
        return false
    }
    if (checkIfPosition(8,4)() || checkIfPosition(9,5)() || checkIfPosition(10,4)()){
        return true
    }
    let condition = function() {
        let r = false;
        [[8,2], [8,3], [9,2], [9,3], [10,2], [10,3]].forEach((t)=>{
        if (t[0] === CACHE.targetTile.x && t[1] === CACHE.targetTile.y){
            r = true
        }
        })
        return r;
    }()
    if (checkIfPosition(9,4)() && condition){
        return true
    }
    return false
}
bAction = function(){
    CACHE.eventTracker['stopTalkingToSailor'] = false
}
eventListHarbour.add(bName, bCondition, bAction)