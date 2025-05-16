'use strict'

eventListRoad.add('goToCave', checkIfPosition(22,23), ()=> {teleport('mapCave', 5, 8)})
eventListRoad.addNpc('birthdayKiller', nonPlayableCharacters.birthdayKillerLookingRight, 8, 25)

bName = 'birthdayKillerSpeech'
bCondition = function(){
    if (checkIfPosition(9, 25)() === true){
        return true;
    }
    return false
}
bAction = function(){
    bText = `Bonjour, je suis le tueur d'anniversaire.\nJe tue les gens dont c'est l'anniversaire.`
    addSpeech(`[Tété le Tueur d'Anniversaire]`, 'darkblue', bText, 'black', ['anniversaire'], birthdayKillerImg, false) 
    bText = `Et sans prévenir plus que ça, il tua Jeanne.`
    addNarration2(bText, false, 'black', 'lightblue')
    bText = `\n\n\n----- FIN ----- \n\n\n`
    addNarration3(bText, false, 'red', 'white')
    bText = `Oups pardon merde j'ai totalement oublié de mentionner que c'était l'anniversaire de Jeanne.\nEn vrai sinon elle s'est faite tuée sans raison...`
    addNarration4(bText, false, 'white', 'black')
    bText = `Alors euh... on va dire que Jeanne, quasiment morte mais pas tout à fait, arriva à se trainer jusqu'à la cave juste à côté.\nA l'intérieur, il y a avait une machine qui servait, euh, euh..., je sais !\nA REMONTER LE TEMPS !`
    addNarration5(bText, false, 'white', 'black')
    bText = `On recommence...\n(désolé pardon j'avais oublié ce petit détail d'histoire d'anniversaire)`
    addNarration6(bText, true, 'white', 'black')
    CACHE.eventTracker['isItYourBirthday'] = true
    CACHE.heldObject.update('money', imgFlyingMoney)
    teleport('mapLimogesBis', 32, 36)
}
eventListRoad.add(bName, bCondition, bAction)

bName = 'smoothGoTalkToBirthdayKiller'
bCondition = function(){
    if (CACHE.targetTile.x <= 10){
        return true
    }
    return false
}
bAction = function(){
    CACHE.targetTile = {
        x: 9,
        y: 25
    }
}
eventListRoad.add(bName, bCondition, bAction)
