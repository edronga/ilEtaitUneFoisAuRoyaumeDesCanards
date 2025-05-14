'use strict'

const area = document.getElementById('myContent')

let timeStamp = Date.now()
let flagSourcesAreLoaded = false
let flagMusicCanStart = false

let CACHE = {}
CACHE['touchPosition']= {
    newInput: false,
    x: 0,
    y: 0 
}
CACHE['sixStepsAnimation']={
    value: 0,
    update: function(){
        (this.value === 5) ? this.value = 0 : this.value++;
    }
}

CACHE['player'] = {
    tilePosition: {
        x: STARTPOSITION.x,
        y: STARTPOSITION.y
    },
    screenPixelPosition:{
        x: Math.floor(window.innerWidth * 0.5),
        y: Math.floor(window.innerHeight * 0.4)
    },
    mapPixelPosition:{
        x: STARTPOSITION.x*48,
        y: STARTPOSITION.y*48
    },
    sprite: baseSprite, 
    direction: {
        value: 'neutral',
        set: function(directionValue){
            const options = ['neutral', 'lookingUp', 'lookingDown', 'lookingLeft', 'lookingRight']
            if (typeof(directionValue) !== 'string'){
                console.log ('player.direction.value cannot be defined')
                return;
            }
            if (! options.includes(directionValue)){
                console.log ('player.direction.value cannot be defined')
                return;
            }
            this.value = directionValue
        }
    },
}

CACHE['stepSequence'] = {
    value: [''],
    nextValue: [''],
    takeOffOne: function(){
        let r = ''
        if (this.value.length === 0 || this.value === 1){
            this.value = ['']
        }
        else {
            this.value = this.value.slice(1)
        }
    },
    set: function(stringArray){
        this.value = stringArray
    },
    initialize: function(){
        this.value = ['']
        this.nextValue = ['']
    }
}

CACHE['currentMap'] = {
    image: mapLimoges,
    collisionData : collisionMapLimoges.data,
    width: collisionMapLimoges.width,
    tileSize: 48
}

CACHE['targetTile'] = {
    x: 0,
    y: 0
}

CACHE['refreshInterval'] = 50

CACHE['nextSlide'] = false

CACHE['slideQueue'] = {
    currentValue: function(){
        return generateMapMode()
    },
    nextValue: undefined, // {value: function, updateCondition: function},
    addNext: function (value, updateCondition = function(){return CACHE.nextSlide === true}){
        if (this.nextValue === undefined){
            this.nextValue = []
            this.nextValue.push ({
                value: value,
                updateCondition: updateCondition
            })
        }
        else {
            this.nextValue.push ({
                value: value,
                updateCondition: updateCondition
            })
        }
        
    },
    update: function(){
        if (this.nextValue === undefined){
            return
        }
        if (this.nextValue.length === 0){
            return
        }
        else {
            if (this.nextValue[0].updateCondition() === true){
                this.currentValue = this.nextValue[0].value
                if (this.nextValue.length > 1){
                    let l = this.nextValue.length
                    this.nextValue = function(){
                        let arr = []
                        for (let i = 1; i<l; i++){
                            arr.push(CACHE.slideQueue.nextValue[i])
                        }
                        return arr;
                    }()   
                }
                else {
                    this.nextValue = undefined
                }
                CACHE.nextSlide = false
            }
        }
    }
}

CACHE['eventList'] = eventListLimoges

const STANDARD = 1
const FIRSTSELECT = 2
CACHE['middleButton'] = {
    value: STANDARD
}

CACHE['heldObject'] = {
    value: 'money',
    image: imgFlyingMoney,
    update: function(name, image){
        this.value = name
        this.image = image
        document.getElementById('buttonLeft').style.backgroundImage = `url(${this.image.src})`
    }
}

CACHE['eventTracker'] = {}

CACHE['music'] = {
    isMusicOn: true,
    currentMusic: ''
}

function loop(){
    if (flagSourcesAreLoaded === false){
    }
    else {
        if (Date.now() - timeStamp >= CACHE.refreshInterval){
            timeStamp = Date.now()
            main()
            if (!flagMusicCanStart) {music.playMusic()}
            CACHE.sixStepsAnimation.update()
        }
    }
    
    window.requestAnimationFrame(loop) 
}

function main(){
    CACHE.slideQueue.update()

    let element =  CACHE.slideQueue.currentValue()
    area.innerHTML = ''
    area.append(element)
}

document.addEventListener('touchstart', function (e) {
    e.preventDefault();
}, {passive: false})
document.addEventListener('touchstart', function(e){
    CACHE.touchPosition.newInput = true
    CACHE.touchPosition.x = e.touches[0].clientX
    CACHE.touchPosition.y = e.touches[0].clientY

    if (CACHE.touchPosition.y >= window.innerHeight * 0.8){
        return;
    }
    if (CACHE.slideQueue.nextValue !== undefined){
        return;
    }
    
    CACHE.targetTile.x = function(){
        let d = CACHE.touchPosition.x - CACHE.player.screenPixelPosition.x
        if (d>= 0){
            return CACHE.player.tilePosition.x + Math.floor(d/CACHE.currentMap.tileSize)
        }
        else if (d< 0){
            d = -d
            return CACHE.player.tilePosition.x - Math.ceil(d/CACHE.currentMap.tileSize)
        }
    }()
    CACHE.targetTile.y = function(){
        let d = CACHE.touchPosition.y - CACHE.player.screenPixelPosition.y
        if (d>= 0){
            return CACHE.player.tilePosition.y + Math.floor(d/CACHE.currentMap.tileSize)
        }
        else if (d< 0){
            d = -d
            return CACHE.player.tilePosition.y - Math.ceil(d/CACHE.currentMap.tileSize)
        }
    }()

    CACHE.stepSequence.nextValue = 1
})
document.addEventListener('touchEnd', function(){
    CACHE.touchPosition.newInput = false
})
document.getElementById("buttonMiddle").addEventListener('touchstart', function(){
    if (!flagSourcesAreLoaded){
        return;
    }

    if (CACHE.slideQueue.nextValue === undefined){
        document.getElementById("buttonMiddle").style.borderColor = 'black'
        document.getElementById("buttonMiddle").style.backgroundImage = `url(${middleButtonStandard.src})`
        document.getElementById("buttonMiddle").style.backgroundColor = 'white'
        return;
    }

    CACHE.middleButton.value = function() {
        switch(CACHE.middleButton.value){
            case STANDARD:
                return FIRSTSELECT;
            case FIRSTSELECT : 
                CACHE.nextSlide = true
                return STANDARD;
        }
    }()
    switch(CACHE.middleButton.value){
        case STANDARD:
            document.getElementById("buttonMiddle").style.border = 'solid 2px black'
            document.getElementById("buttonMiddle").style.backgroundImage = `url(${middleButtonGo.src})`
            document.getElementById("buttonMiddle").style.backgroundColor = 'lightCyan'
            break;
        case FIRSTSELECT:
            document.getElementById("buttonMiddle").style.border = 'solid 4px green'
            document.getElementById("buttonMiddle").style.backgroundColor = 'lightGreen'
            document.getElementById("buttonMiddle").style.backgroundImage = `url(${middleButtonGo.src})`
            break;
    }
})
document.getElementById("buttonRight").addEventListener('touchstart', function(){
    if (flagMusicCanStart === false){ //a workaround so that the user has to make at least 2 interactions with the page befor the music can start playing
        return;
    }

    CACHE.music.isMusicOn = !CACHE.music.isMusicOn
    if (CACHE.music.isMusicOn){
        document.getElementById('buttonRight').style.backgroundImage = `url(${musicOnButton.src})`
        music.muteMusic('on')
    }
    else {
        document.getElementById('buttonRight').style.backgroundImage = `url(${musicOffButton.src})`
        music.muteMusic('off')
    }
    
})

window.addEventListener('load', (event)=>{
    console.log(`Ressources are fully loaded, it took ${(event.timeStamp * 0.001).toFixed(2)} seconds`)
    flagSourcesAreLoaded = true
    initializeGamePlay()

})

function initializeGamePlay(){
    CACHE.slideQueue.currentValue = function(){return generateStartingScreen()}
    generateTitleScreen = gen_generateTitleScreen()
    CACHE.slideQueue.addNext(function() {return generateTitleScreen.next().value})
    CACHE.slideQueue.addNext(function(){return generateMapMode()})
    document.getElementById("buttonMiddle").style.border = 'solid 2px black'
    document.getElementById("buttonMiddle").style.backgroundImage = `url(${middleButtonGo.src})`
    document.getElementById("buttonMiddle").style.backgroundColor = 'lightCyan'
    STARTPOSITION = {x: 32, y: 36}
}

loop()

