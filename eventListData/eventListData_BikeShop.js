'use strict'

eventListBikeShop.add('goToLimoges', checkIfPosition(5,10), () => {teleport('mapLimoges', 26, 26)})
eventListBikeShop.addNpc('bikeShopOwner', nonPlayableCharacters.bikeShopOwnerLookingLeft, 9, 2)
eventListBikeShop.addNpc('hairdresserGirl', nonPlayableCharacters.hairdresserLookingDown, 8, 7)

bName = 'smoothGetOutOfBikeShop'
bCondition = function(){
    if (CACHE.targetTile.y >= 10){
        return true
    }
    return false;
}
bAction = function(){
    CACHE.targetTile = {
        x: 5,
        y: 10
    }
}
eventListBikeShop.add(bName, bCondition, bAction)

bName = 'lookInTheRightDirection'
bCondition = function() {
    if(checkIfPosition(7,2)() || checkIfPosition(9,8)()){
        return true
    }
    return false
}
bAction = function(){
    baseSprite = baseFormLookingRight
}
eventListBikeShop.add(bName, bCondition, bAction)

bName = 'tryAndLookNormal'
bCondition = function() {
    if(checkIfPosition(7,2)() || checkIfPosition(9,8)()){
        return false
    }
    return true
}
bAction = function(){
    baseSprite = baseFormLookingDown
}
eventListBikeShop.add(bName, bCondition, bAction)


bName = 'smoothTalkAndStopToBikeShopGuy'
bCondition = function(){
    if (CACHE.eventTracker['hasMetBikeShopGuy'] === undefined){
        return false
    }
    if (checkIfPosition(6,3)() || checkIfPosition(7,4)()){
        return true
    }
    let condition = function() {
        let r = false;
        [[8,2], [8,3], [9,2], [9,3]].forEach((t)=>{
        if (t[0] === CACHE.targetTile.x && t[1] === CACHE.targetTile.y){
            r = true
        }
        })
        return r;
    }()
    if (checkIfPosition(7,2)() && condition){
        return true
    }
    return false
}
bAction = function(){
    CACHE.eventTracker['stopTalkingToBikeShopGuy'] = false
}
eventListBikeShop.add(bName, bCondition, bAction)

bCondition = function(){
    if (CACHE.eventTracker['wasHairDoObtained'] === true && CACHE.slideQueue.nextValue === undefined){
        CACHE.eventTracker['wasHairDoObtained'] = undefined
        return true;
    }
    return false
}
eventListBikeShop.add('checkIfHairDoWasObtained', bCondition, () =>{CACHE.heldObject.update('hairDo', imgHairdo)})


bName = 'bikeShopGuySpeech'
bCondition = function(){
    let condition = function() {
        let r = false;
        [[8,2], [8,3], [9,2], [9,3]].forEach((t)=>{
        if (t[0] === CACHE.targetTile.x && t[1] === CACHE.targetTile.y){
            r = true
        }
        })
        return r;
    }()
    if (checkIfPosition(7,2)() === true && CACHE.eventTracker['stopTalkingToBikeShopGuy'] !== true && condition){
        return true;
    }
    return false
}
bAction = function(){
    if (CACHE.eventTracker['hasMetBikeShopGuy'] === undefined){
        bText = `Moi et ma femme avons monté une boutique de vélo qui est également un salon de coiffure. Notre spécialité c'est d'utiliser la graisse de cheveux pour huiler les vélos.`
        addSpeech('???', 'black', bText, 'black', ['jambon'], bikeShopOwnerImg, false) 
        bText = `Jeanne trouva ça dégueulasse de chez dégueulasse.\n- C'est une idée ingénieuse, dit-elle, avec un faux sourire moqueur.\nElle remarqua une araignée au plafond. Elle en profita pour lever les yeux au ciel d'exaspération.`
        addNarration2(bText, true, 'black', 'lightblue')
        CACHE.eventTracker['hasMetBikeShopGuy'] = true
        CACHE.eventTracker['stopTalkingToBikeShopGuy'] = true
        return;
    }
    switch (CACHE.heldObject.value){
        case 'ham':
            bText = `Ce qui est embêtant c'est qu'on n'a plus de graisse de cheveux sous le coude. A la rigueur la graisse de jambon ça pourrrait peut-être le faire...`
            addSpeech('[Toto fait du Vélo]', 'black', bText, 'black', [], bikeShopOwnerImg, false) 
            bText = `Jeanne lui offrit sa graisse de jambon. En échange il lui proposa une coiffure gratuite. Pas vraiment gratuite puisque ça avait coûté un jambon à Jeanne. Elle accepta quand même comme c'était offert.`
            addNarration2(bText, true, 'black', 'lightblue')
            CACHE.player.tilePosition = {x:9 , y:8}
            eventListBikeShop.removeNpc('hairdresserGirl')
            eventListBikeShop.addNpc('hairdresserGirl', nonPlayableCharacters.hairdresserLookingRight, 8,8)
            teleport('mapBikeShop', 9,8)
            CACHE.targetTile = {x: 9, y: 8}
            break;
        default:
            bText = `Ce qui est embêtant c'est qu'on n'a plus de graisse de cheveux sous le coude. A la rigueur la graisse de jambon ça pourrrait peut-être le faire...`
            addSpeech('[Toto fait du Vélo]', 'black', bText, 'black', [], bikeShopOwnerImg, false) 
            bText = `Jeanne n'avait plus de jambon`
            addNarration2(bText, true, 'black', 'lightblue')
    }
    CACHE.eventTracker['stopTalkingToBikeShopGuy'] = true

}
eventListBikeShop.add(bName, bCondition, bAction)

bName = 'hairdressserSpeech'
bCondition = function(){
    if (checkIfPosition(9,8)() === true && !(CACHE.targetTile.x === 9 && CACHE.targetTile.y === 8)){
        return true;
    }
    return false
}
bAction = function(){
    bText = `Qu'est que qui te ferait plaisir comme coiffure aujourd'hui, ma petite Jeanne ?`
    addSpeech('[Coco la Coiffeuse]', 'black', bText, 'black', [], hairdresserImg, false) 
    bText = `Premio Jeanne ne la connaissait pas et elle l'a trouvait un peu trop familière. Deuzio Jeanne avait beaucoup d'a priori sur les gens roux. Genre qu'ils puaient de la...\n- Surprenez-moi ! s'exclama-t-elle avec un grand sourire.\nTercio, elle aimait vivre dangereusement.`
    addNarration2(bText, true, 'black', 'lightblue')
    CACHE.heldObject.update('hairDo', imgHairdo)
    switchAttire('hair')
    teleport('mapBikeShop', 5,7)

}
eventListBikeShop.add(bName, bCondition, bAction)

bName = 'smoothGoTalkToBikeShopGuy'
bCondition = function(){
    let condition = function() {
        let r = false;
        [[8,2], [8,3], [9,2], [9,3]].forEach((t)=>{
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
        y: 2
    }
}
eventListBikeShop.add(bName, bCondition, bAction)

