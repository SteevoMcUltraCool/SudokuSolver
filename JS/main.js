import sheet from "../style.css" assert {type:"css"}
import {Box, Grid} from "./box.js"
const DOM = {
    solveButton: document.getElementById("solveBu")
}
document.adoptedStyleSheets = [sheet];
let Grid1 = new Grid(1,1)
let Grid2 = new Grid(2,1)
let Grid3 = new Grid(3,1)
let Grid4 = new Grid(1,2)
let Grid5 = new Grid(2,2)
let Grid6 = new Grid(3,2)
let Grid7 = new Grid(1,3)
let Grid8 = new Grid(2,3)
let Grid9 = new Grid(3,3)

Grid1.boxify()
Grid2.boxify()
Grid3.boxify()
Grid4.boxify()
Grid5.boxify()
Grid6.boxify()
Grid7.boxify()
Grid8.boxify()
Grid9.boxify()

function LastNumberRemaining(FilledBoxes, UnfilledBoxes){
    UnfilledBoxes.forEach(box =>{
        let change = false
        let pot = box.potetnialValues.filter(value => value)
        if (pot.length == 1) {
            console.log(box.potetnialValues, box.column, box.row)
            box.setValue(pot[0])
            box.input.readOnly = true
            box.input.className = "solved"
            UnfilledBoxes = UnfilledBoxes.filter(item => item != box)
            FilledBoxes.push(box)
            change = true
        }else if (pot.length == 0) {
            console.error("puzzle unsolvable");
        }
        return [FilledBoxes, UnfilledBoxes, change]
    })
}
DOM.solveButton.addEventListener("click",function(){
    let Boxes = Box.prototype.getBoxes()
    let FilledBoxes = []
    let UnfilledBoxes = []
    Boxes.forEach(row=>row && row.filter(box => box && box.getValue()).forEach(box => FilledBoxes.push(box)))
    FilledBoxes.forEach(box=>{
        console.log(box.input.value)
        box.input.disabled = true
        box.elimateValueNearby()
    })
    Boxes.forEach(row=>row && row.filter(box => box && !box.getValue()).forEach(box => UnfilledBoxes.push(box)))
    let change = true
    do {
        let b = LastNumberRemaining(FilledBoxes, UnfilledBoxes)
        console.log(b)
        FilledBoxes, UnfilledBoxes, change = b[0], b[1], b[2]
    }while(change)
})
