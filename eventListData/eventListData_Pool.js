'use strict'

eventListPool.add('goToLimoges', checkIfPosition(6,23), () => {teleport('mapLimoges', 23, 43)})

bName = 'smoothGetOutOfPool'
bCondition = function(){
    if (CACHE.targetTile.y >= 23){
        return true
    }
    return false;
}
bAction = function(){
    CACHE.targetTile = {
        x: 6,
        y: 23
    }
}
eventListPool.add(bName, bCondition, bAction)

bName = 'lookAtTheGuy'
bCondition = function (){
    if (CACHE.player.tilePosition.x === 7 && CACHE.player.tilePosition.y === 10){
        return true
    }
    return false
}
bAction = function(){
    baseSprite = baseFormLookingUp
}
eventListPool.add(bName, bCondition, bAction)

bCondition = function (){
    if (CACHE.player.tilePosition.x === 7 && CACHE.player.tilePosition.y === 10){
        return false
    }
    return true
}
eventListPool.add('tryAndLookNormal', bCondition, ()=>{
    baseSprite = baseFormLookingDown
})

bName = 'smoothTalkAndStopToPoolVendor'
bCondition = function(){
    if (CACHE.eventTracker['hasMetPoolVendor'] === undefined){
        return false
    }
    if (checkIfPosition(7,11)() || checkIfPosition(8,10)() || checkIfPosition(6,10)()){
        return true
    }
    let condition = function() {
        let r = false;
        [[7,7], [7,8], [8,7], [8,8]].forEach((t)=>{
        if (t[0] === CACHE.targetTile.x && t[1] === CACHE.targetTile.y){
            r = true
        }
        })
        return r;
    }()
    if (checkIfPosition(7,10)() && condition){
        return true
    }
    return false
}
bAction = function(){
    CACHE.eventTracker['stopTalkingToPoolVendor'] = false
}
eventListPool.add(bName, bCondition, bAction)

bName = 'poolVendorSpeech'
bCondition = function(){
    let condition = function() {
        let r = false;
        [[7,7], [7,8], [8,7], [8,8]].forEach((t)=>{
        if (t[0] === CACHE.targetTile.x && t[1] === CACHE.targetTile.y){
            r = true
        }
        })
        return r;
    }()
    if (checkIfPosition(7,10)() === true && CACHE.eventTracker['stopTalkingToPoolVendor'] !== true && condition){
        return true;
    }
    return false
}
bAction = function(){
    if (CACHE.eventTracker['hasMetPoolVendor'] === undefined){
        bText = `Pour répondre à votre question avant que vous ne la posiez : je ne sais pas qui est l'abruti qui a eu l'idée d'installer un stand à hot dogs en plein milieu d'une piscine municipale.`
        addSpeech('???', 'black', bText, 'black', [], poolVendorImg, false) 
        bText = `Jeanne trouvait pourtant que c'était une excellente idée.\n- Non mais c'est vrai qu'on est entouré d'idiots, dit-elle, se permettant même un grand sourire béat.\nElle leva les yeux au ciel pour mieux ponctuer sa réaction.`
        addNarration2(bText, false, 'black', 'lightblue')
        bText = `La logique, et je souligne que Jeanne est d'accord avec moi : () les gens ont envie de se faire plaisir après avoir fait du sport (plaisir genre MacDo ou HotDog pour ne pas faire de pub)/ (2) Les gens ont des calories à perdre après avoir mangé dégueulasse.\n=> Solutions = stand de hotdog dans une piscine. CQFD.`
        addNarration3(bText, true, 'white', 'black')
        CACHE.eventTracker['hasMetPoolVendor'] = true
        CACHE.eventTracker['stopTalkingToPoolVendor'] = true
        return;
    }
    switch (CACHE.heldObject.value){
        case 'butter':
            bText = `Si vous voulez un sandwich, c'est mort soit dit en passant.\n On a du jambon, mais on n'a plus de beurre.`
            addSpeech('[Nellie Logique]', 'black', bText, 'black', ['beurre'], poolVendorImg, false) 
            bText = `Coup de bol, le monde est bien fait.\nJeanne, notre héroïne préférée avait de son côté du beurre, mais pas de jambon. Un échange s'imposait.`
            addNarration2(bText, true, 'black', 'lightblue')
            CACHE.eventTracker['wasHamObtained'] = true
            break;
        case 'money':
            bText = `Si vous voulez un sandwich, c'est mort soit dit en passant.\n On a du jambon, mais on n'a plus de beurre.`
            addSpeech('[Nellie Logique]', 'black', bText, 'black', ['beurre'], poolVendorImg, false) 
            bText = `Jeanne n'avait pas assez pour acheter du jambon. Pourtant elle adorait ça.`
            addNarration2(bText, true, 'black', 'lightblue')
            break;
        default:
            bText = `On n'a plus de pain non plus... Cette entreprise de stands de hots dogs en piscine va couler. Au moins on est au bon endroit pour ça....`
            addSpeech('[Nellie Logique]', 'black', bText, 'black', ['beurre'], poolVendorImg, true)
    }
    CACHE.eventTracker['stopTalkingToPoolVendor'] = true
    
}
eventListPool.add(bName, bCondition, bAction)

bCondition = function(){
    if (CACHE.eventTracker['wasHamObtained'] === true && CACHE.slideQueue.nextValue === undefined){
        CACHE.eventTracker['wasHamObtained'] = undefined
        return true;
    }
    return false
}
eventListPool.add('checkIfHamWasObtained', bCondition, () =>{CACHE.heldObject.update('ham', imgHam)})

bName = 'smoothGoTalkToPoolVendor'
bCondition = function(){
    let condition = function() {
        let r = false;
        [[7,7], [7,8], [8,7], [8,8]].forEach((t)=>{
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
        y: 10
    }
}
eventListPool.add(bName, bCondition, bAction)