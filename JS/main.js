import {Box, Grid} from "./box.js"
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

function LastNumberRemaining(FilledBoxes, UnfilledBoxes){
    let change = false
    UnfilledBoxes.forEach(box =>{
        let pot = box.potetnialValues.filter(value => value)// any null values ignored
        if (pot.length == 1) {
            box.setValue(pot[0])
            box.input.readOnly = true
            box.input.className = "solved"
            UnfilledBoxes = UnfilledBoxes.filter(item => {
                return (item.column != box.column ||  item.row != box.row)
            }) // item!=box
            FilledBoxes.push(box)
            box.elimateValueNearby()
            change = true
        }else if (pot.length == 0) {
            console.error("puzzle unsolvable");
        }
    })
    return [FilledBoxes, UnfilledBoxes, change]
}
function LastCellRemainingInGrid(FilledBoxes, UnfilledBoxes){
    let change = false
    Object.values(Grids).forEach(grid => {
        for (let i = 1; i<=9; i++){
            let boxesWith = grid.Boxes.filter(box=>box && box.potetnialValues.includes(i)&& !box.getValue())
            if (boxesWith.length==1){
                let box = boxesWith[0]
                box.setValue(i)
                box.input.readOnly = true
                box.input.className = "solved"
                UnfilledBoxes = UnfilledBoxes.filter(item => {
                    return (item.column != box.column ||  item.row != box.row)
                }) // item!=box
                FilledBoxes.push(box)
                change = true
                box.elimateValueNearby()
            }
        }

    })
    return [FilledBoxes, UnfilledBoxes, change]
}
function LastCellRemainingInRow(FilledBoxes, UnfilledBoxes){ //for some reason, rows are vertical
    let change = false
    let Boxes = Box.prototype.getBoxes()
    Boxes.filter(row=>row).forEach(row => {
        for (let i = 1; i<=9; i++){
            let boxesWith = row.filter(box=>box && box.potetnialValues.includes(i)&& !box.getValue())
            if (boxesWith.length==1){
                let box = boxesWith[0]
                box.setValue(i)
                box.input.readOnly = true
                box.input.className = "solved"
                UnfilledBoxes = UnfilledBoxes.filter(item => {
                    return (item.column != box.column ||  item.row != box.row)
                }) // item!=box
                FilledBoxes.push(box)
                change = true
                box.elimateValueNearby()
            }
        }

    })
    return [FilledBoxes, UnfilledBoxes, change]
}
function LastCellRemainingInColumn(FilledBoxes, UnfilledBoxes){ //for some reason, columns are horizontal
    let change = false
    let Boxes = Box.prototype.getBoxes()
    let Columns = Grid.prototype.rotate(Boxes)
    Columns.filter(column=>column).forEach(column => {
        for (let i = 1; i<=9; i++){
            let boxesWith = column.filter(box=>box && box.potetnialValues.includes(i)&& !box.getValue())
            if (boxesWith.length==1){
                let box = boxesWith[0]
                box.setValue(i)
                box.input.readOnly = true
                box.input.className = "solved"
                UnfilledBoxes = UnfilledBoxes.filter(item => {
                    return (item.column != box.column ||  item.row != box.row)
                }) // item!=box
                FilledBoxes.push(box)
                change = true
                box.elimateValueNearby()
            }
        }
    })
    return [FilledBoxes, UnfilledBoxes, change]
}
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
        let change = false
        suspense = false
        do {
            let b = LastNumberRemaining(FilledBoxes, UnfilledBoxes)
            FilledBoxes = b[0]
            UnfilledBoxes = b[1]
            change = b[2]
            suspense = suspense || change
        } while(change)
        change = false
        do {
            let b = LastCellRemainingInGrid(FilledBoxes, UnfilledBoxes)
            FilledBoxes = b[0]
            UnfilledBoxes = b[1]
            change = b[2]
            suspense = suspense || change
        } while(change)
        do {
            let b = LastCellRemainingInRow(FilledBoxes, UnfilledBoxes)
            FilledBoxes = b[0]
            UnfilledBoxes = b[1]
            change = b[2]
            suspense = suspense || change
        } while(change)
        do {
            let b = LastCellRemainingInColumn(FilledBoxes, UnfilledBoxes)
            FilledBoxes = b[0]
            UnfilledBoxes = b[1]
            change = b[2]
            suspense = suspense || change
        } while(change)
    }while(UnfilledBoxes.length>0 && suspense)
})
