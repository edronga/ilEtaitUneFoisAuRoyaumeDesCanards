'use strict'


function generateStartingScreen(backgroundImage = titleScreenBackground){
    let r = document.createElement('div')
    let newGameCaption = document.createElement('div')
    r.appendChild(newGameCaption)
    const font = `15dvh Garamond`

    r.style.height = '80dvh'
    r.style.width = '100dvw'
    r.style.display = 'grid'
    r.style.gridTemplate = `'a' '.' '.' auto / auto`
    r.style.alignItems = 'center'
    r.style.justifyItems = 'center'
    r.style.textAlign = 'center'
    r.style.textWrap = 'pretty'
    r.style.backgroundImage = `url(${backgroundImage.src})`
    r.style.backgroundRepeat = 'no-repeat'
    r.style.backgroundSize = 'contain'
    r.style.backgroundPosition = 'center'

    newGameCaption.style.gridArea = 'a'
    newGameCaption.style.height = '30 dvh'
    newGameCaption.style.width = '50dvw'
    newGameCaption.style.font = '5dvh Garamond'
    newGameCaption.style.color = 'whiteSmoke'
    newGameCaption.style.backgroundColor = 'red'
    newGameCaption.style.border = 'solid 4px black'
    newGameCaption.innerHTML = 'NOUVELLE PARTIE'

    return r;

}