'use strict'


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
eventListLimogesPast.add(bName, bCondition, bAction)


bName ='introPast'
bCondition = function() {
    if (checkIfPosition(STARTPOSITION.x + 1, STARTPOSITION.y)()){ return true}
    if (checkIfPosition(STARTPOSITION.x-1, STARTPOSITION.y)()){ return true}
    if (checkIfPosition(STARTPOSITION.x, STARTPOSITION.y +1)()){ return true}
    if (checkIfPosition(STARTPOSITION.x, STARTPOSITION.y -1)()){ return true}
    return false;
}
bAction = function(){
    bText = `... rien ?\n- Ah ben si, commenta Jeanne. Il s'est passé quelque chose.`
    addNarration(bText, false, 'black', 'lightCyan')
    bText = `Jeanne remarqua que à part la couleur, la ville n'avait pas changé d'un poil. Elle se demanda si c'était une métaphore sur le fait que la nature humaine restait obstinément immuable malgré le temps qui s'écoulait inexorablement.\nOu si le mec qui gère les graphiques était une feignasse.`
    addNarration2(bText, false, 'black', 'lightCyan')
    bText = `Disons que c'est probablement une métaphore.`
    addNarration3(bText, true, 'white', 'black')
    eventListLimogesPast.remove('introPast')
}
eventListLimogesPast.add(bName, bCondition, bAction)

bName = 'lookAtThePanel'
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
    return condition
}
bAction = function(){
    baseSprite = baseFormLookingUp
}
eventListLimogesPast.add(bName, bCondition, bAction)

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
eventListLimogesPast.add('dontLookAtThePanel', bCondition, ()=>{
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
eventListLimogesPast.add(bName, bCondition, bAction)




bName = 'fastForWardNextChapter'
bCondition = function (){
    if (checkIfPosition(39, 25)() || checkIfPosition (7, 31)() ||  checkIfPosition(23,42)() || checkIfPosition(26,25)()|| checkIfPosition(21,18)() || checkIfPosition(42,42)() || checkIfPosition(42, 18)() || checkIfPosition(46, 25)() || checkIfPosition(32,34)()){
        return true
    }
    return false
}
bAction = function(){
    bText = `Au fait j'y pense, attention Jeanne !\nToute intéraction avec le passé doit être mûrement pesée !\n Effet papillon, paradoxe du grand-père, qui sait quelle intrigue riche et complexe va encore se révéler...`
    addNarration(bText, false, 'white','black')
    bText = `- Honnêtement, j'en ai, euh, ras-le-bol de cette histoire sans queue ni tête. A la base, moi je voulais juste repartir de zéro sur de nouvelles bases, pas partir dans des aventures cosmiques invraissemblables.`
    addNarration2(bText, false, 'black','lightCyan')
    bText = `...\nOn critique, on critique, mais bon si l'intrigue est faiblarde, c'est peut-être aussi la faute du personnage principal qui n'est pas à la hauteur !`
    addNarration3(bText, false, 'white','black')
    bText = `Jeanne ne dit rien.\nCe qui chez elle était extrêment mauvais signe et ne laissait rien présager de bon...`
    addNarration4(bText, false, 'black','lightCyan')
    bText = `Euh...\n\n\n\n Désolé ?`
    addNarration5(bText, false, 'white','black')
    bText = `J'EN AI MARRE ! s'écria Jeanne !!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`
    addNarration6(bText, false, 'black','lightCyan')
    bText = `Oui Madame tout de suite Madame.`
    addNarration7(bText, true, 'white','black')
    switchAttire('bikini')
    teleport('mapBiarritz', 11,6)
}
eventListLimogesPast.add(bName, bCondition, bAction)
