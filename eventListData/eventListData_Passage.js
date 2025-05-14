'use strict'

eventListPassage.add('goToLimoges', checkIfPosition(13,5), () => {teleport('mapLimoges', 8, 31)})
eventListPassage.add('goToRoad', checkIfPosition(0,5), ()=> {
    if (CACHE.heldObject.value === 'surfingPlank') {teleport('mapRoad', 73,26)}
    else {
        bText = `Bzz Bzz\nIl faut posséder une planche de surf pour vivre à Biarritz, c'est bien connu...`
        addNarration(bText, false, 'white', 'black')
        teleport('mapPassage', 12, 5)
    }}
)
eventListPassage.addNpc('passageGuard', nonPlayableCharacters.passageGuardLookingRight, 6, 5)


bName = 'lookAtTheGuy'
bCondition = function (){
    if (CACHE.player.tilePosition.x === 7 && CACHE.player.tilePosition.y === 5){
        return true
    }
    return false
}
bAction = function(){
    baseSprite = baseFormLookingLeft
}
eventListPassage.add(bName, bCondition, bAction)

bCondition = function (){
    if (CACHE.player.tilePosition.x === 7 && CACHE.player.tilePosition.y === 5){
        return false
    }
    return true
}
eventListPassage.add('tryAndLookNormal', bCondition, ()=>{
    baseSprite = baseFormLookingDown
})


bName = 'smoothTalkAndStopToPassageGuard'
bCondition = function(){
    if (CACHE.eventTracker['hasMetPassageGuard'] === undefined){
        return false
    }
    if (checkIfPosition(8,5)()){
        return true
    }
    if (checkIfPosition(7,5)() && CACHE.targetTile.x === 6 && CACHE.targetTile.y === 5){
        return true
    }
    return false
}
bAction = function(){
    CACHE.eventTracker['stopTalkingToPassageGuard'] = false
}
eventListPassage.add(bName, bCondition, bAction)

bName = 'passageGuardSpeech'
bCondition = function(){
    if (checkIfPosition(7,5)() === true && CACHE.eventTracker['stopTalkingToPassageGuard'] !== true && CACHE.targetTile.x === 6 && CACHE.targetTile.y === 5){
        return true;
    }
    return false
}
bAction = function(){
    if (CACHE.eventTracker['hasMetPassageGuard'] === undefined){
        bText = `VOUS NE PASSEREZ PAS !\nAvant j'avais un vrai job. Un truc sérieux. Mais je me suis fais viré parce que je ne faisais pas mon travail\nMaitenant je fais le videur.`
        addSpeech('???', 'darkblue', bText, 'black', [], passageGuardImg, false) 
        bText = `Jeanne sentit comme un petit papillon dans son estomac. Le mec était extrêment photogénique. D'un autre côté il paraissait totalement déjanté.\n-Je pars vivre à Biarritz, dit-elle avec un petit sourire séducteur.\nElle avait honte de ton un peu dragueur. Si bien même qu'elle en leva les yeux au ciel.`
        addNarration2(bText, false, 'black', 'lightblue')
        bText = `Désolé mademoiselle madame, mais il vous manque un certain "je ne sais quoi".\nJe pense que vous devriez plutôt rester dans votre ville de bouseux.`
        addSpeech2('[Le Tueur de Temps]', 'darkblue', bText, 'black', [], passageGuardImg, false) 
        bText = `Le papillon se dissolva dans le suc gastrique de l'estomac de Jeanne.\nDans d'énormes et d'atroces souffrances.`
        addNarration3(bText, true, 'black', 'lightblue')
        CACHE.eventTracker['hasMetPassageGuard'] = true
        CACHE.eventTracker['stopTalkingToPassageGuard'] = true
        return;
    }
    switch (CACHE.heldObject.value){
        case 'money':
            bText = `Je ne peux pas vous laisser passer. Vous n'avez même pas assez d'argent pour me soudoyer. Vous devrier aller voir ailleurs si j'y suis.`
            addSpeech('[Tété le Tueur de Temps]', 'darkBlue', bText, 'black', ['argent'], passageGuardImg, false) 
            bText = `INDICE\nPeut-être que Jeanne devrait justement aller voire au supermarché s'il y était. Sans vouloir être trop subtile avec les indices.`
            addNarration2(bText, true, 'white', 'black')
            break;
        case 'butter':
            bText = `Je ne peux toujours pas vous laisser passer. Je vois que vous avez du beurre. Si vous voulez faire un sandwich, il vous manque quelques ingrédients clés.`
            addSpeech('[Tété le Tueur de Temps]', 'darkBlue', bText, 'black', ['beurre'], passageGuardImg, false) 
            bText = `INDICE\nPerso, et sans vouloir trop guider les choses, je pense qu'une petite visite à la piscine municipale pourrait être fructifiante. Et avec un peu de chance on pourra voir Jeanne en bikini.`
            addNarration2(bText, true, 'white', 'black')
            break;
        case 'ham':
            bText = `Vous ne pouvez toujours pas passer. Ohé! Vous m'entendez ? On dirait presque que vous avez du jambon dans les oreilles !`
            addSpeech('[Tété le Tueur de Temps]', 'darkBlue', bText, 'black', ['jambon'], passageGuardImg, false) 
            bText = `INDICE\nBon euh me demandez pas trop la logique y'en a pas.\nIl faut aller acheter un vélo.\n(J'ai dit "y'en a pas").`
            addNarration2(bText, true, 'white', 'black')
            break;
        case 'hairDo':
            bText = `Vous, euh... Ok ...\nJe dois dire que vous avez du style. Je ne suis pas indifférent à cette coiffure ridicule. Il manque encore un truc cela dit...`
            addSpeech('[Tété le Tueur de Temps]', 'darkBlue', bText, 'black', ['coiffure ridicule'], passageGuardImg, false) 
            bText = `INDICE\nIndice : j'arrête d'aider.\nIl reste genre 3 endroits et c'est évident que personne n'a jamais eu de révélation au musée de la porcelaine. De l'autre côté de la rue par contre y'a un monsieur qui a un bateau...`
            addNarration2(bText, true, 'white', 'black')
            break;
        case 'surfingPlank':
            bText = `Whouah !!\nVous avez une planche de surf ! Mais c'est-à-dire, princesse, que vous me dégagez tout de suite de cette ville de bouseux et vous allez vous rotir les miches à Biarritz !`
            addSpeech('[Tété le Tueur de Temps]', 'darkBlue', bText, 'black', ['planche de surf'], passageGuardImg, false) 
            bText = `Les miches de Jeanne frétillèrent d'impatience`
            addNarration2(bText, true, 'white', 'black')
            teleport('mapPassage', 6, 5)
            eventListPassage.removeNpc('passageGuard')
            eventListPassage.addNpc('passageGuard', nonPlayableCharacters.passageGuardLookingDown, 7, 4)
            eventListPassage.remove('smoothWalkTowardsGuard')
            eventListPassage.remove('passageGuardSpeech')
            eventListPassage.add('smoothGetToRoad', () =>{return (CACHE.targetTile.x <= 0)? true: false;}, () =>{CACHE.targetTile = {x: 0, y:5}})
            eventListPassage.add('cantGoBack', checkIfPosition(7,5), () =>{
                bText = `Jeanne hésita à repartir en arrière.\n- Ce qui est fait est fait, se dit-elle.\nElle versa une larme.\n- Le passé c'est le passé, commenta-elle.\nElle était triste de partir, et en même temps pleine d'excitation pour l'avenir.\n-T'as cliqué, t'assumes, résuma-t-elle...`
                addNarration(bText, false, 'black', 'lightCyan')
                bText = `...Bon allez on avance un peu. En gros Jeanne eu l'air folle à fond les violons devant le mec ultra-photogénique pendant 30 minutes. Et puis elle se décida (enfin) à faire avancer l'intrigue et à prendre la direction de Biarritz.`
                addNarration2(bText, true, 'white', 'black')
                teleport('mapPassage', 6, 5)
            })
            break;
        default:
            bText = `Defaut Text`
            addNarration(bText, true, 'black', 'lightblue')
    }
    CACHE.eventTracker['stopTalkingToPassageGuard'] = true
    
}
eventListPassage.add(bName, bCondition, bAction)

bName = 'smoothWalkTowardsGuard'
bCondition = function(){ 
    if (CACHE.targetTile.x <= 6){
    return true
    }
    return false
}
bAction = function (){
    CACHE.targetTile.x = 7
    CACHE.targetTile.y = 5
}
eventListPassage.add(bName, bCondition, bAction)