'use strict'

function EventList() {
    this.value = {},
    this.add = function(name, condition = function(){return CACHE.nextSlide}, action = function (){CACHE.nextSlide = false}, overwrite = true){
        let o = {
            condition: condition,
            action: action
        }
        if (overwrite === true){
            this.value[name] = o
        }
        else if (overwrite === false){
            if (this.value[name] === undefined){
                this.value[name] = o;
            }
            else {
                console.log('overwrite option prevented creating new event with the same name')
            }
        } 
    },
    this.remove = function(name){
        this.value[name] = undefined
    },
    this.nonPlayableCharacters = {},
    this.addNpc = function(name, image, xPosition, yPosition){
        this.nonPlayableCharacters[name] = {}
        this.nonPlayableCharacters[name]['sprite'] = image
        this.nonPlayableCharacters[name]['xPosition'] = xPosition
        this.nonPlayableCharacters[name]['yPosition'] = yPosition
    },
    this.removeNpc = function(name){
        this.nonPlayableCharacters[name] = undefined
    }
}

// helper functions, all impure

function teleport(newMapName, xTilePosition, yTilePosition){
    switch (newMapName){
        case 'mapLimoges' :
            CACHE.currentMap = {
                image: mapLimoges,
                collisionData : collisionMapLimoges.data,
                width: collisionMapLimoges.width,
                tileSize: 48
            }
            CACHE.eventList = eventListLimoges
            music.changeMusic(musicLimoges)
            break;
        case 'mapRoad' :
            CACHE.currentMap = {
                image: mapRoad,
                collisionData : collisionMapRoad.data,
                width: collisionMapRoad.width,
                tileSize: 48
            }
            music.changeMusic(musicRoad)
            CACHE.eventList = eventListRoad
            break;
        case 'mapBiarritz' :
            CACHE.currentMap = {
                image: mapBiarritz,
                collisionData : collisionMapBiarritz.data,
                width: collisionMapBiarritz.width,
                tileSize: 48
            }
            music.changeMusic(musicBiarritz)
            CACHE.eventList = eventListBiarritz
            break;
        case 'mapMart' :
            CACHE.currentMap = {
                image: mapMart,
                collisionData : collisionMapMart.data,
                width: collisionMapMart.width,
                tileSize: 48
            }
            music.changeMusic(musicMart)
            CACHE.eventList = eventListMart
            break;
        case 'mapPassage' :
            CACHE.currentMap = {
                image: mapPassage,
                collisionData : collisionMapPassage.data,
                width: collisionMapPassage.width,
                tileSize: 48
            }
            music.changeMusic(musicPassage)
            CACHE.eventList = eventListPassage
            break;
        case 'mapPool' : 
            CACHE.currentMap = {
                image: mapPool,
                collisionData: collisionMapPool.data,
                width: collisionMapPool.width,
                tileSize: 48
            }
            music.changeMusic(musicPool)
            CACHE.eventList = eventListPool
            break;
        case 'mapBikeShop':
            CACHE.currentMap = {
                image: mapBikeShop,
                collisionData: collisionMapBikeShop.data,
                width: collisionMapBikeShop.width,
                tileSize: 48
            }
            music.changeMusic(musicBikeShop)
            CACHE.eventList = eventListBikeShop
            break;
        case 'mapHarbour':
            CACHE.currentMap = {
                image: mapHarbour,
                collisionData: collisionMapHarbour.data,
                width: collisionMapHarbour.width,
                tileSize: 48
            }
            music.changeMusic(musicHarbour)
            CACHE.eventList = eventListHarbour
            break;
        case 'mapHospitalHall':
            CACHE.currentMap = {
                image: mapHospitalHall,
                collisionData: collisionMapHospitalHall.data,
                width: collisionMapHospitalHall.width,
                tileSize: 48
            }
            music.changeMusic(musicHospital)
            CACHE.eventList = eventListHospitalHall
            break;
        case 'mapElevator':
            CACHE.currentMap = {
                image: mapElevator,
                collisionData: collisionMapElevator.data,
                width: collisionMapElevator.width,
                tileSize: 48
            }
            music.changeMusic(musicElevator)
            CACHE.eventList = eventListElevator
            break;
        case 'mapCave':
            CACHE.currentMap = {
                image: mapCave,
                collisionData: collisionMapCave.data,
                width: collisionMapCave.width,
                tileSize: 48
            }
            music.changeMusic(musicCave)
            CACHE.eventList = eventListCave
            break;
        case 'mapHouse1':
            CACHE.currentMap = {
                image: mapHouse1,
                collisionData: collisionMapHouse1.data,
                width: collisionMapHouse1.width,
                tileSize: 48
            }
            music.changeMusic(musicHouse)
            CACHE.eventList = eventListHouse1
            break;
        case 'mapMuseum':
            CACHE.currentMap = {
                image: mapMuseum,
                collisionData: collisionMapMuseum.data,
                width: collisionMapMuseum.width,
                tileSize: 48
            }
            music.changeMusic(musicMuseum)
            CACHE.eventList = eventListMuseum
            break;
        case 'mapLimogesPast':
            CACHE.currentMap = {
                image: mapLimogesPast,
                collisionData: collisionMapLimoges.data,
                width: collisionMapLimoges.width,
                tileSize: 48
            }
            music.changeMusic(musicPast)
            CACHE.eventList = eventListLimogesPast
            break;
        case 'mapLimogesBis':
            CACHE.currentMap = {
                image: mapLimoges,
                collisionData : collisionMapLimoges.data,
                width: collisionMapLimoges.width,
                tileSize: 48
            }
            CACHE.eventList = eventListLimogesBis
            music.changeMusic(musicLimoges)
            break;
        default:
            console.log('error in teleport helper function use, newMapName is unknown')
    }
   
    CACHE.player.tilePosition = {
        x: xTilePosition,
        y: yTilePosition
    }
    CACHE.player.mapPixelPosition = {
        x: xTilePosition * 48,
        y: yTilePosition * 48
    }

    CACHE.targetTile ={
        x: xTilePosition,
        y: yTilePosition
    }
}

function checkIfPosition(x, y){
    const f = function(){
        if (CACHE.player.tilePosition.x === x && CACHE.player.tilePosition.y === y){
            return true;
        }
        return false;
    }
    return f;
}

function middleButtonCorrection(){
    document.getElementById("buttonMiddle").style.border = 'solid 2px black'
    document.getElementById("buttonMiddle").style.backgroundImage = `url(${middleButtonGo.src})`
    document.getElementById("buttonMiddle").style.backgroundColor = 'lightCyan'
}

function addNarration(text, thenGoBackToMap = true, color1 = 'black', color2 = 'white'){
    generateNarration = gen_generateNarration(text, color1, color2)
    CACHE.slideQueue.currentValue = function(){return generateNarration.next().value}
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    middleButtonCorrection()
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y  
}

function addNarration2 (text, thenGoBackToMap = true, color1 = 'black', color2 = 'white'){
    generateNarration2 = gen_generateNarration(text, color1, color2)
    CACHE.slideQueue.addNext(function(){return generateNarration2.next().value})
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    middleButtonCorrection()
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y  
}

function addNarration3 (text, thenGoBackToMap = true, color1 = 'black', color2 = 'white'){
    generateNarration3 = gen_generateNarration(text, color1, color2)
    CACHE.slideQueue.addNext(function(){return generateNarration3.next().value})
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y  
}

function addNarration4 (text, thenGoBackToMap = true, color1 = 'black', color2 = 'white'){
    generateNarration4 = gen_generateNarration(text, color1, color2)
    CACHE.slideQueue.addNext(function(){return generateNarration4.next().value})
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y  
}

function addNarration5 (text, thenGoBackToMap = true, color1 = 'black', color2 = 'white'){
    generateNarration5 = gen_generateNarration(text, color1, color2)
    CACHE.slideQueue.addNext(function(){return generateNarration5.next().value})
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y  
}

function addNarration6 (text, thenGoBackToMap = true, color1 = 'black', color2 = 'white'){
    generateNarration6 = gen_generateNarration(text, color1, color2)
    CACHE.slideQueue.addNext(function(){return generateNarration6.next().value})
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y  
}

function addNarration7 (text, thenGoBackToMap = true, color1 = 'black', color2 = 'white'){
    generateNarration7 = gen_generateNarration(text, color1, color2)
    CACHE.slideQueue.addNext(function(){return generateNarration7.next().value})
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y  
}

function addNarration8 (text, thenGoBackToMap = true, color1 = 'black', color2 = 'white'){
    generateNarration8 = gen_generateNarration(text, color1, color2)
    CACHE.slideQueue.addNext(function(){return generateNarration8.next().value})
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y  
}

function addNarration9 (text, thenGoBackToMap = true, color1 = 'black', color2 = 'white'){
    generateNarration9 = gen_generateNarration(text, color1, color2)
    CACHE.slideQueue.addNext(function(){return generateNarration9.next().value})
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y  
}

function addSpeech(characterName, characterNameColor, characterText, characterTextColor, emphasizedWords, characterImg, thenGoBackToMap = true){
    generateCharacterSpeech = gen_generateCharacterSpeech(characterName, characterNameColor, characterText, characterTextColor, emphasizedWords, characterImg)
    CACHE.slideQueue.currentValue = function(){return generateCharacterSpeech.next().value}
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    middleButtonCorrection()
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y
}

function addSpeech2(characterName, characterNameColor, characterText, characterTextColor, emphasizedWords, characterImg, thenGoBackToMap = true){
    generateCharacterSpeech2 = gen_generateCharacterSpeech(characterName, characterNameColor, characterText, characterTextColor, emphasizedWords, characterImg)
    CACHE.slideQueue.addNext(function(){return generateCharacterSpeech2.next().value})
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y
}

function addSpeech3(characterName, characterNameColor, characterText, characterTextColor, emphasizedWords, characterImg, thenGoBackToMap = true){
    generateCharacterSpeech3 = gen_generateCharacterSpeech(characterName, characterNameColor, characterText, characterTextColor, emphasizedWords, characterImg)
    CACHE.slideQueue.addNext(function(){return generateCharacterSpeech3.next().value})
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y
}

function addSpeech4(characterName, characterNameColor, characterText, characterTextColor, emphasizedWords, characterImg, thenGoBackToMap = true){
    generateCharacterSpeech4 = gen_generateCharacterSpeech(characterName, characterNameColor, characterText, characterTextColor, emphasizedWords, characterImg)
    CACHE.slideQueue.addNext(function(){return generateCharacterSpeech4.next().value})
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y
}

function addSpeech5(characterName, characterNameColor, characterText, characterTextColor, emphasizedWords, characterImg, thenGoBackToMap = true){
    generateCharacterSpeech5 = gen_generateCharacterSpeech(characterName, characterNameColor, characterText, characterTextColor, emphasizedWords, characterImg)
    CACHE.slideQueue.addNext(function(){return generateCharacterSpeech5.next().value})
    if (thenGoBackToMap === true){
        CACHE.slideQueue.addNext(function(){return generateMapMode()})
    }
    CACHE.player.direction = 'neutral'
    CACHE.stepSequence.initialize()
    CACHE.targetTile.x = CACHE.player.tilePosition.x
    CACHE.targetTile.y = CACHE.player.tilePosition.y
}


