'use strict'

let generateNarration = function(){}
let generateNarration2 = function(){}
let generateNarration3 = function(){}
let generateNarration4 = function(){}
let generateNarration5 = function(){}
let generateNarration6 = function(){}
let generateNarration7 = function(){}
let generateNarration8 = function(){}
let generateNarration9 = function(){}

function* gen_generateNarration(text, color1 = 'black', color2 = 'white',timeInterval = 25){
    let r = document.createElement('div')
    const TIME_INTERVAL = timeInterval
    let timeStamp = Date.now()
    let counter = 0
    const fontNeutral = `4dvh Garamond`

    r.style.height = '80dvh'
    r.style.width = '100dvw'
    r.style.display = 'grid'
    r.style.alignItems = 'center'
    r.style.justifyItems = 'center'
    r.style.textAlign = 'left'
    r.style.textWrap = 'pretty'

    r.style.padding = '5px'
    text =`*<p style = 'font: ${fontNeutral}'>*` + text + `*</p>*`

    counter = `*<p style = 'font: ${fontNeutral}'>**</p>*`.length

    r.style.backgroundColor = color2

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
                r.innerHTML = update(text, counter, color1, color2)
                r.innerHTML = r.innerHTML.replaceAll('*', '')
                r.innerHTML = r.innerHTML.replaceAll('\n', '<br/>')
                timeStamp = Date.now()
                counter++
                yield r;
            }
            else yield r;
        }
        else {
            yield r;
        }
    }
}
