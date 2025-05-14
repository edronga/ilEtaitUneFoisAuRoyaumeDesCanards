'use strict'


eventListHospitalHall.add('goToLimoges', checkIfPosition(15, 23), ()=> {teleport('mapLimoges', 32, 35)})
eventListHospitalHall.add('goToElevator', checkIfPosition(19, 3), ()=> {teleport('mapElevator', 2, 5)})