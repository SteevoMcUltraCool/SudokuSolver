import {Grid,Box} from "./box.js"
import { Methods } from "./methods.js"
import { Move } from "./moves.js"
const DOM = {
    solveButton: document.getElementById("solveBu"),
    moves : document.getElementById("moves")
}
let Grids = {}
Grids.Grid1 = new Grid(1,1)
Grids.Grid2 = new Grid(2,1)
Grids.Grid3 = new Grid(3,1)
Grids.Grid4 = new Grid(1,2)
Grids.Grid5 = new Grid(2,2)
Grids.Grid6 = new Grid(3,2)
Grids.Grid7 = new Grid(1,3)
Grids.Grid8 = new Grid(2,3)
Grids.Grid9 = new Grid(3,3)

Grids.Grid1.boxify()
Grids.Grid2.boxify()
Grids.Grid3.boxify()
Grids.Grid4.boxify()
Grids.Grid5.boxify()
Grids.Grid6.boxify()
Grids.Grid7.boxify()
Grids.Grid8.boxify()
Grids.Grid9.boxify()

DOM.solveButton.addEventListener("click",function(){
    let Boxes = Box.prototype.getBoxes()
    let FilledBoxes = []
    let UnfilledBoxes = []
    Boxes.forEach(row=>row && row.filter(box => box && box.getValue()).forEach(box => FilledBoxes.push(box)))
    FilledBoxes.forEach(box=>{
        box.input.disabled = true
        box.elimateValueNearby()
    })
    Boxes.forEach(row=>row && row.filter(box => box && !box.getValue()).forEach(box => UnfilledBoxes.push(box)))
    let suspense = false
    new Move("Mark Potential Values: ", [], DOM.moves)
    do {
        suspense = false
        Object.values(Methods).forEach(method => {
            let change = false
            do {
                let b = method.operate(FilledBoxes,UnfilledBoxes,Grids)
                FilledBoxes = b[0]
                UnfilledBoxes = b[1]
                change = b[2]
                suspense = suspense || change
            } while(change)         
        })
    }while(UnfilledBoxes.length>0 && suspense)
    console.log(UnfilledBoxes.length, Boxes)
})

window.addEventListener("keydown", function(event){
    let focus = document.activeElement 
    if (focus){
        let row = focus.row
        let column = focus.column
        let Boxes = Box.prototype.getBoxes()
        if (row && column){
            if (event.key == "w" || event.key == "ArrowUp" ){
                    row = row  - 1
                    if (row == 0){row = 9}
                    Boxes[row][column].input.focus()
                    console.log(Boxes[row][column].input)
            }else if (event.key == "s" || event.key == "ArrowDown"){
                    row = row  + 1
                    if (row == 10){row = 1}
                    Boxes[row][column].input.focus()
            }else if (event.key == "a" || event.key == "ArrowLeft"){
                    column = column  - 1
                    if (column == 0){column = 9}
                    Boxes[row][column].input.focus()
            }else if (event.key=="d" || event.key == "ArrowRight"){
                    column = column  + 1
                    if (column == 10){column = 1}
                    Boxes[row][column].input.focus()
            }
        }
        
    }
})
function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
}
if (iOS()){
    
}