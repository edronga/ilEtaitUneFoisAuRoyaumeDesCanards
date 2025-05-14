'use strict'

eventListMart.add('goToLimoges', checkIfPosition(5,8), () => {teleport('mapLimoges', 39, 26)})

eventListMart.addNpc('martLady', nonPlayableCharacters.martLadyLookingRight, 2, 2)

bName = 'smoothGetOutOfMart'
bCondition = function(){
    if (CACHE.targetTile.y >= 8){
        return true
    }
    return false;
}
bAction = function(){
    CACHE.targetTile = {
        x: 5,
        y: 8
    }
}
eventListMart.add(bName, bCondition, bAction)

bName = 'lookAtTheGuy'
bCondition = function (){
    if (CACHE.player.tilePosition.x === 4 && CACHE.player.tilePosition.y === 2){
        return true
    }
    return false
}
bAction = function(){
    baseSprite = baseFormLookingLeft
}
eventListMart.add(bName, bCondition, bAction)

bCondition = function (){
    if (CACHE.player.tilePosition.x === 4 && CACHE.player.tilePosition.y === 2){
        return false
    }
    return true
}
eventListMart.add('tryAndLookNormal', bCondition, ()=>{
    baseSprite = baseFormLookingDown
})

bName = 'smoothTalkAndStopToMartGirl'
bCondition = function(){
    if (CACHE.eventTracker['hasMetMartGirl'] === undefined){
        return false
    }
    if (checkIfPosition(4,3)() || checkIfPosition(5,2)()){
        return true
    }
    if (checkIfPosition(4,2)() && CACHE.targetTile.y === 2 && [2,3].includes(CACHE.targetTile.x)){
        return true
    }
    return false
}
bAction = function(){
    CACHE.eventTracker['stopTalkingToMartGirl'] = false
}
eventListMart.add(bName, bCondition, bAction)

bName = 'martGirlSpeech'
bCondition = function(){
    if (checkIfPosition(4,2)() === true && CACHE.eventTracker['stopTalkingToMartGirl'] !== true && CACHE.targetTile.y === 2 && [2,3].includes(CACHE.targetTile.x)){
        return true;
    }
    return false
}
bAction = function(){
    if (CACHE.eventTracker['hasMetMartGirl'] === undefined){
        bText = `Je suis un peu triste...\n Mon chat et malade. Je lui ai demandé ce qu'il avait et il m'a répondu "Tais-toi, t'es moche et t'es débile".\nJ'espère que mon chat à un cancer.`
        addSpeech('???', 'darkMagenta', bText, 'black', [], martLadyImg, false) 
        bText = `Jeanne s'en foutait totalement de la vie de la vendeuse. \n- C'est trop triste les chats malades, dit-elle d'un air compatissant avec un sourire chaleureux.\nLa vendeuse lui offrit un sourire en retour.\nJeanne leva (intérieurement) les yeux au ciel.`
        addNarration2(bText, true, 'black', 'lightCyan')
        CACHE.eventTracker['hasMetMartGirl'] = true
        CACHE.eventTracker['stopTalkingToMartGirl'] = true
        return;
    }
    switch (CACHE.heldObject.value){
        case 'money':
            bText = `Coucou encore !.\nQu'est-ce que ce sera aujourd'hui ?\nUn piège à chat ? Une muselière pour chat ? Du poison pour euthanasier son chat ? Du beurre ?`
            addSpeech('Sarah Masse', 'darkMagenta', bText, 'black', ['beurre'], martLadyImg, false) 
            bText = `Curieuse coincidence, pensa Jeanne. Il se trouvait justement qu'elle avait tout juste assez d'argent pour acheter du beurre. Et elle n'avait (encore) de chat.`
            addNarration2(bText, true, 'black', 'lightCyan')
            CACHE.eventTracker['wasButterObtained'] = true
            break;
        default:
            bText = `J'espère que mon chat ne s'ennuie pas trop sans moi à la maison.\nLa dernière fois que je l'ai laissé trop longtemps, il en a profité pour faire caca dans mon lit.  `
            addSpeech('Sarah Masse', 'darkMagenta', bText, 'black', ['beurre'], martLadyImg, false)
            bText = `Jeanne se fit intérieurement la remarque que les gens qui avait des chats semblaient généralement mentallement instables voire fous à lier. Elle hésistait d'ailleurs elle même à adopter un petit chaton.`
            addNarration2(bText, true, 'black', 'lightCyan')
    }
    CACHE.eventTracker['stopTalkingToMartGirl'] = true
    
}
eventListMart.add(bName, bCondition, bAction)

bName = 'smoothGoTalkToMartGirl'
bCondition = function(){
    if (CACHE.targetTile.x === 2 && CACHE.targetTile.y === 2){
        return true
    }
    if (CACHE.targetTile.x === 3 && CACHE.targetTile.y === 2){
        return true
    }
    if (CACHE.targetTile.x === 3 && CACHE.targetTile.y === 3){
        return true
    }
    return false
}
bAction = function(){
    CACHE.targetTile = {
        x: 4,
        y: 2
    }
}
eventListMart.add(bName, bCondition, bAction)

bCondition = function(){
    if (CACHE.eventTracker['wasButterObtained'] === true && CACHE.slideQueue.nextValue === undefined){
        CACHE.eventTracker['wasButterObtained'] = undefined
        return true;
    }
    return false
}
eventListMart.add('checkIfButterWasObtained', bCondition, () =>{CACHE.heldObject.update('butter', imgButter)})