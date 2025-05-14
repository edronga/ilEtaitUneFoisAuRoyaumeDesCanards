'use strict'


// flagMusicCanStart = true
// change images for left and right button
// modifies in main.js intializeGame

function generateTitleScreen() {}

function* gen_generateTitleScreen(backgroundImage = titleScreenBackgroundFaded, timeInterval = 25){

    flagMusicCanStart = true
    music.current = musicTitleScreen
    music.muteMusic('on')
    document.getElementById('buttonRight').style.backgroundImage = `url(${musicOnButton.src})`
    document.getElementById('buttonLeft').style.backgroundImage = `url(${imgFlyingMoney.src})`

    let r = document.createElement('div')
    const TIME_INTERVAL = timeInterval
    let timeStamp = Date.now()
    let counter = 0

    const font = `6dvh cursive`

    r.style.height = '80dvh'
    r.style.width = '100dvw'
    r.style.display = 'grid'
    r.style.alignItems = 'center'
    r.style.justifyItems = 'center'
    r.style.textAlign = 'center'
    r.style.backgroundImage = `url(${backgroundImage.src})`
    r.style.backgroundRepeat = 'no-repeat'
    r.style.backgroundSize = 'contain'
    r.style.backgroundPosition = 'center'

    let text = 'Les\nMerveilleuses\nMésaventures\nde la\nMélodramatique\n*<s>*M*</s>*\nJeanne Aymard'
    text =`*<p style = 'font: ${font}'>*` + text + `*</p>*`

    counter = `*<p style = 'font: ${font}'>**</p>*`.length

    function update(text, n, color1, color2){
        let r = ''
        let ignoreCounter = false

        for (let i = 0; i <= n; i++){
            if (text[i] === '*'){
                ignoreCounter = !ignoreCounter
            }
            if (ignoreCounter === false && text[i] !== '*'){
                r = r + `<span style = 'color:${color1}'>` + text[i] + `</span>`       
            }
            else {
                r = r + text[i]
            }  
        }

        for (let i = n +1; i < text.length; i++){
            if (text[i] === '*'){
                ignoreCounter = !ignoreCounter
            }
            if (ignoreCounter === false && text[i] !== '*'){
                r = r + `<span style = 'color:${color2}'>` + text[i] + `</span>`       
            }
            else {
                r = r + text[i]
            }
        }
        return r
    }
    
    while (true){
        if (counter < text.length ){
            if (Date.now() - timeStamp >= TIME_INTERVAL){
                r.innerHTML = update(text, counter, 'red', 'transparent')
                r.innerHTML = r.innerHTML.replaceAll('*', '')
                r.innerHTML = r.innerHTML.replaceAll('\n', '<br/>')
                timeStamp = Date.now()
                counter++
                yield r;
            }
            else yield r;
        }
        else {
            r.style.backgroundImage = ''
            r.style.backgroundColor = 'floralWhite'
            yield r;
        }
    }
}

