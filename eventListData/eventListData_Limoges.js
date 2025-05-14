'use strict'

eventListLimoges.add('goToMart', checkIfPosition(39, 25), () => {teleport('mapMart', 5, 7)})
eventListLimoges.add('goToPassage', checkIfPosition (7, 31), function(){
    teleport('mapPassage', 12, 5)
    eventListLimoges.remove('smoothGoToPassage')
})
eventListLimoges.add('goToPool', checkIfPosition(23,42), ()=> {teleport('mapPool', 6, 22)})
eventListLimoges.add('goToBikeShop', checkIfPosition(26,25), ()=> {teleport('mapBikeShop', 5, 9)})
eventListLimoges.add('goToHarbour', checkIfPosition(21,18), ()=> {teleport('mapHarbour', 6, 9)})
eventListLimoges.add('goToHouse1', checkIfPosition(42,42), ()=> {teleport('mapHouse1', 4, 7)})
eventListLimoges.add('goToMuseum', checkIfPosition(42, 18), ()=> {teleport('mapMuseum', 11, 18)})


bName = 'smoothGoToPassage'
bCondition = function(){
    let options = [[7,29],[7,30],[7,31],[7,32],[8,29],[8,30],[8,31],[8,32],[9,29],[9,30],[9,31],[9,32],[10,29],[10,30],[10,31],[10,32],[11,29],[11,30],[11,31],[11,32]]
    let condition = function(){
        let r = false
        options.forEach((coordinates) =>{
            if(coordinates[0] === CACHE.targetTile.x && coordinates[1] === CACHE.targetTile.y){
                r = true;
            }
        })
        return r
    }()
    return condition
}
bAction = function(){
    CACHE.targetTile = {
        x: 7,
        y: 31
    }
}
eventListLimoges.add(bName, bCondition, bAction)

bName = 'dynamicallyRecreateSmoothGoToPassage'
bCondition = function(){
    if (eventListLimoges.value['smoothGoToPassage'] !== undefined){
        return false
    }
    else if (CACHE.player.tilePosition.x >= 12){
        return true
    }
    return false
}
bAction = function(){
    let cName = 'smoothGoToPassage'
    let cCondition = function(){
        let options = [[7,29],[7,30],[7,31],[7,32],[8,29],[8,30],[8,31],[8,32],[9,29],[9,30],[9,31],[9,32],[10,29],[10,30],[10,31],[10,32],[11,29],[11,30],[11,31],[11,32]]
        let condition = function(){
        let r = false
        options.forEach((coordinates) =>{
            if(coordinates[0] === CACHE.targetTile.x && coordinates[1] === CACHE.targetTile.y){
                r = true;
            }
        })
        return r
        }()
        return condition
    }
    let cAction = function(){
        CACHE.targetTile = {
        x: 7,
        y: 31
        }
    }
    eventListLimoges.add(cName, cCondition, cAction)
}
eventListLimoges.add(bName, bCondition, bAction)

bName = 'startWihoutSound'
bCondition = checkIfPosition(STARTPOSITION.x, STARTPOSITION.y)
bAction = function (){
    music.changeMusic(musicLimoges)
    eventListLimoges.remove('startWithoutSound')
}
eventListLimoges.add(bName, bCondition, bAction)

bName ='introStandard'
bCondition = function(){
    if (CACHE.eventTracker['isItYourBirthday'] === true){
        return false;
    }
    if (CACHE.touchPosition.newInput === true && CACHE.touchPosition.y <= window.innerHeight * 0.8){
        return true;
    }
    return false
}
bAction = function(){
    bText = `Il était une fois au royaume des canards, une villaine petite créature qui révait d'être un cygne.\n\n- J'en ai marre, dit-elle, de cette vie de merde.\n\n(Il faut préciser qu'en plus d'être villaine, elle était fort malpolie).`
    addNarration(bText, false, 'black', 'lightCyan')
    bText = `- J'en ai marre, dit-elle encore, de tous ces gens cons.\n(Désolé encore...)\n- J'en ai marre, renchérit-elle, de cette ville de bouseux. \n\nLa liste continue, mais je vais simplifier. En gros : "J'en ai marre, j'aime me plaindre, regardez-moi, bla bla bla".`
    addNarration2(bText, false, 'black', 'lightCyan')
    bText = `- Je pense que vais aller vivre quelque part avec du soleil, des jolies filles et de la bonne bouffe.\nGenre Hawaï ou Tahiti. \n(Il se trouvait néanmoins qu'elle était fauchée. Elle avait à peine de quoi s'acheter du beurre.\nDu coup, à la place elle décida d'aller vivre à Biarritz).`
    addNarration3(bText, true, 'black', 'lightCyan')
    eventListLimoges.remove('introStandard')
}
eventListLimoges.add(bName, bCondition, bAction)


bName = 'panelSpeechTheOneNearHospital'
bCondition = function(){
    if (checkIfPosition(28,36)() && CACHE.targetTile.x === 28 && CACHE.targetTile.y === 35){
        return true
    }
    return false
}
bAction = function (){
    bText = `Chacun sa route, chacun son chemin :\n\u21D0 Biarritz\n\u2192 Hôpital\n\u2191 Magasin de vélos\n\u2193 Piscine municipale`
    addSpeech('Popo le Panneau', 'darkGrey', bText, 'black', [], whiteWoodenSignImg, true)
    CACHE.targetTile = {x: 28, y: 36}
}
eventListLimoges.add(bName, bCondition, bAction)

bName = 'panelSpeechTheOneBetweenThePassageAndTheHospital'
bCondition = function(){
    if (checkIfPosition(17,35)() && CACHE.targetTile.x === 17 && CACHE.targetTile.y === 34){
        return true
    }
    return false
}
bAction = function (){
    bText = `La personne qui lit cela est bête comme ses pieds.`
    addSpeech('Pipeau le Poteau', 'saddleBrown', bText, 'black', [], brownWoodenSignImg, false)
    bText = 'lol \u{1F602}'
    addNarration2(bText, true, 'white', 'black')
    CACHE.targetTile = {x: 17, y: 35}
}
eventListLimoges.add(bName, bCondition, bAction)

bName = 'panelSpeechTheOneNearHarbour'
bCondition = function(){
    if (checkIfPosition(28,19)() && CACHE.targetTile.x === 28 && CACHE.targetTile.y === 18){
        return true
    }
    return false
}
bAction = function (){
    bText = `Le monsieur qui vit à \u2193 a un bâteau.\nCe qui est très cons, il n'y a pas la mer dans cette ville de bouseux.\n\u21D1 Piscine municipale`
    addSpeech('Patoche la Patate', 'saddleBrown', bText, 'black', [], whiteWoodenSignImg, false)
    CACHE.targetTile = {x: 28, y: 19}
}
eventListLimoges.add(bName, bCondition, bAction)

bName = 'panelSpeechTheOneNearMuseum'
bCondition = function(){
    if (checkIfPosition(44,19)() && CACHE.targetTile.x === 44 && CACHE.targetTile.y === 18){
        return true
    }
    return false
}
bAction = function (){
    bText = `Musée de la Porcelaine\n\nAttention à ne rien casser.`
    addSpeech('Pedro est Perdu', 'saddleBrown', bText, 'black', [], whiteWoodenSignImg, false)
    CACHE.targetTile = {x: 44, y: 19}
}
eventListLimoges.add(bName, bCondition, bAction)

bName = 'panelSpeechTheOneNearTheForbiddenHouse'
bCondition = function(){
    if (checkIfPosition(48,26)() && CACHE.targetTile.x === 48 && CACHE.targetTile.y === 25){
        return true
    }
    return false
}
bAction = function (){
    bText = `\u2190 Supermarché (il faut de l'argent c'est pas les restos du coeur)`
    addSpeech('Pludidé le Panneau', 'saddleBrown', bText, 'black', [], whiteWoodenSignImg, false)
    CACHE.targetTile = {x: 48, y: 26}
}
eventListLimoges.add(bName, bCondition, bAction)

bName = 'panelInFrontOfHouse'
bCondition = function(){
    if (checkIfPosition(39,43)() && CACHE.targetTile.x === 39 && CACHE.targetTile.y === 42){
        return true
    }
    return false
}
bAction = function (){
    bText = `Pas de pub SVP.\n (note Mr Lesjans : sauf catalogues de lingerie)`
    addSpeech('Famille Lesjans', 'saddleBrown', bText, 'black', [], letterBoxImg, false)
    CACHE.targetTile = {x: 39, y: 43}
}
eventListLimoges.add(bName, bCondition, bAction)

bName = 'panelNextToPassage'
bCondition = function(){
    if (checkIfPosition(12,30)() && CACHE.targetTile.x === 12 && CACHE.targetTile.y === 29){
        return true
    }
    return false
}
bAction = function (){
    bText = `\u2190 Biarritz.\nWesh.`
    addSpeech('Nono le NeauPa des Cités', 'saddleBrown', bText, 'black', [], whiteWoodenSignImg, false)
    CACHE.targetTile = {x: 12, y: 30}
}
eventListLimoges.add(bName, bCondition, bAction)

bName = 'lookAtThePanel'
bCondition = function (){
    let condition = function(){
        let r = false ;
        const list = [[28,19], [44,19], [48,27], [17,35], [28,36], [39,43], [12,30]]
        list.forEach((position) => {
            if (position[0] === CACHE.player.tilePosition.x && position[1] === CACHE.player.tilePosition.y){
                r = true
            }
        })
        return r
    }()
    return condition
}
bAction = function(){
    baseSprite = baseFormLookingUp
}
eventListLimoges.add(bName, bCondition, bAction)

bCondition = function (){
    let condition = function(){
        let r = false ;
        const list = [[28,19], [44,19], [48,27], [17,35], [28,36], [39,43]]
        list.forEach((position) => {
            if (position[0] === CACHE.player.tilePosition.x && position[1] === CACHE.player.tilePosition.y){
                r = true
            }
        })
        return r
    }()
    return !condition
}
eventListLimoges.add('dontLookAtThePanel', bCondition, ()=>{
    baseSprite = baseFormLookingDown
})

bName = 'goInFrontOfThePanel'
bCondition = function (){
    let condition = function(){
        let r = false ;
        const list = [[28,18], [44,18], [48,26], [17,34], [28,35], [39,42]]
        list.forEach((position) => {
            if (position[0] === CACHE.targetTile.x && position[1] === CACHE.targetTile.y){
                r = true
            }
        })
        return r
    }()
    return condition
}
bAction = function(){
    CACHE.targetTile.y = CACHE.targetTile.y + 1
}
eventListLimoges.add(bName, bCondition, bAction)

bName = 'forbiddenHouse'
bCondition = checkIfPosition(46, 25)
bAction = function () {
    bText = `Non mais ça va pas ou quoi Jeanne ?\n On rentre pas comme ça chez les gens. Je pense qu'il va falloir apprendres les bonnes manières et oublieux les habitudes de bouseux vite fait bien fait.`
    addNarration(bText, true, 'white', 'black')
    CACHE.player.tilePosition = {x: 46, y: 26}
}
eventListLimoges.add(bName, bCondition, bAction)

bName = 'goToHospital'
bCondition = checkIfPosition(32, 34)
bAction = function(){
    bText = `- Tiens et si j'allais faire un bisou à mes anciennes collègues. Je vais leur dire que je quitte cette ville de bouseux.\n Jeanne était infirmière de profession. Ses anciennes collègues bouseuses l'appréciaientt beaucoup et ne souhaitaient pas du tout qu'elle finisse dévorée par le monstre de l'ascenceur hanté`
    addNarration(bText, true, 'black','lightCyan')
    teleport('mapHospitalHall', 15, 22)
}
eventListLimoges.add(bName, bCondition, bAction)

bName = 'directionToBiarritz'
bCondition = function() {
    if (checkIfPosition(STARTPOSITION.x + 1, STARTPOSITION.y)()){ return true}
    if (checkIfPosition(STARTPOSITION.x-1, STARTPOSITION.y)()){ return true}
    if (checkIfPosition(STARTPOSITION.x, STARTPOSITION.y +1)()){ return true}
    if (checkIfPosition(STARTPOSITION.x, STARTPOSITION.y -1)()){ return true}
    return false;
}
bAction = function(){
    bText = `Juste pour info : Biarritz c'est à l'Ouest.\n\n(Et l'Ouest c'est à gauche...)\n\n(Et la gauche c'est par là \u2190...)`
    addNarration(bText, true, 'white','black')
    eventListLimoges.remove('directionToBiarritz')
}
eventListLimoges.add(bName, bCondition, bAction)



