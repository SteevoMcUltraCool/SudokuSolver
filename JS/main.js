import {Grid,Box} from "./box.js"
import { Methods } from "./methods.js"
const DOM = {
    solveButton: document.getElementById("solveBu")
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
})
