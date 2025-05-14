'use strict'

bName ='introAndEndingBiarritz'
bCondition = function() {
    if (checkIfPosition(11+ 1, 6)()){ return true}
    if (checkIfPosition(11-1, 6)()){ return true}
    if (checkIfPosition(11, 6)()){ return true}
    if (checkIfPosition(11, 6)()){ return true}
    return false;
}
bAction = function(){
    bText = `Il était une fois au royaume des cochons, une villaine petite créature qui révait d'être un jambon.\n\n- J'en ai marre, dit-elle, de cette vie parfaite, pleine de soleil, de jolies fille et de bonne bouffe.`
    addNarration(bText, false, 'black', 'lightCyan')
    bText = `Et ainsi, notre petite princesse, qui ne faisait que râler, avait trouvé son petit coin de paradis.\n Il ne lui restait plus qu'à vivre heureuse et à avoir beaucoup d'enfants et tous ses problèmes étaients réglés !`
    addNarration2(bText, false, 'black', 'lightCyan')
    bText = `Et aussi :\n\n*<b/>*Joyeux anniversaire *<s/>*Mor*</s>*\nJEANNE !!!*</b>*`
    addNarration3(bText, true, 'white', 'black')
    eventListBiarritz.remove('introAndEndingBiarritz')
}
eventListBiarritz.add(bName, bCondition, bAction)