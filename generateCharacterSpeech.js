'use strict'

let generateCharacterSpeech = function(){}
let generateCharacterSpeech2 = function(){}

function* gen_generateCharacterSpeech(characterName, characterNameColor, characterText, characterTextColor, emphasizedWords, characterImage, bubbleSpeechImage = bubbleSpeechImg, timeInterval = 25){
    let r = document.createElement('div')
    const TIME_INTERVAL = timeInterval
    let timeStamp = Date.now()
    let counter = 0
    const fontNeutral = `3vh Garamond`
    const text = characterText

    function update(text, n, color1, color2){
        let r = text
        r = `<span style = 'color:${color1}'>` + r.slice(0,n) + `</span> `+ `<span style = 'color:${color2}'>` + r.slice(n) + `</span> `
        r = `<span style = 'color:${characterNameColor}'>` + characterName + ` :</span> \n\n`+ r

        return r
    }

    function enrich(r){
        let text1 = `<div style = "height: 40vh; width: 100vw; background-image: url(${bubbleSpeechImage.src}); background-position: center; background-size: contain; background-repeat: no-repeat; display: grid; align-items:center; text-align: left; text-wrap:pretty;"><p style = "font: ${fontNeutral}; margin-right: 10vw ; margin-left: 10vw; margin-bottom: 8vh">${r}</p></div>`
        let text2 = `<div style = "height: 40vh; width: 100vw; background-image: url(${characterImage.src}) ; background-position: center;background-size: contain; background-repeat: no-repeat"></div>`
        return text1 + text2
    }

    while (true){
        if (counter <= text.length ){
            if (Date.now() - timeStamp >= TIME_INTERVAL){
                r.innerHTML = update(text, counter, characterTextColor, 'white')
                emphasizedWords.forEach((n) =>{r.innerHTML = r.innerHTML.replace (n, '<b>' + n + '</b>')})
                r.innerHTML = r.innerHTML.replaceAll('\n', '<br/>')
                timeStamp = Date.now()
                counter++
                r.innerHTML = enrich(r.innerHTML)
                yield r;
            }
            else {
                yield r;
            }
        }
        else {
            yield r;
        }
    }
}