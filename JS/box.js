let mommy = document.getElementById("bigGrid")
let Boxes = [
    false,
[],
[],
[],
[], 
[],
[],
[],
[],
[]   
]
class eGrid {
    constructor(column, row){
        this.element = document.createElement("div")
        this.element.className = "grid" 
        this.element.style.gridRow = row
        this.element.style.gridColumn = column
        this.row = row
        this.column = column
        mommy.appendChild(this.element)
    }
    boxify(){
        this.Boxes = [false,
            new eBox(this,1,1),new eBox(this,1,2),new eBox(this,1,3), 
            new eBox(this,2,1),new eBox(this,2,2),new eBox(this,2,3),
            new eBox(this,3,1),new eBox(this,3,2),new eBox(this,3,3)
        ]
    }
}

class eBox {
    constructor(parent,localColumn,localRow){
        this.element = document.createElement("div")
        this.input = document.createElement("input")
        this.input.type = "number"
        this.input.min = 1
        this.input.max = 9
        this.element.className = "box " + ((localColumn==1 && "l ") || "")+ ((localColumn==3 && "r ") || "")+ ((localRow==1 && "t ") || "")+ ((localRow==3 && "b ") || "")
        this.element.style.gridRow = localRow
        this.element.style.gridColumn = localColumn
        this.parent = parent
        this.row = (parent.row-1)*3 + localRow
        this.column = (parent.column-1)*3 + localColumn
        Boxes[this.column][this.row]= this
        this.element.appendChild(this.input)
        parent.element.appendChild(this.element)   
        this.potetnialValues =  [null,1,2,3,4,5,6,7,8,9]     
    }
    getValue() {
        return Number(this.input.value)
    }
    setValue(number) {
        this.potetnialValues = [number]
        this.input.value = String(number)
    }
    elimateValueNearby() {
        let Row = Boxes[this.column]
        let Column = [
            Boxes[1][this.row],
            Boxes[2][this.row],
            Boxes[3][this.row],
            Boxes[4][this.row],            
            Boxes[5][this.row],
            Boxes[6][this.row],
            Boxes[7][this.row],
            Boxes[8][this.row],
            Boxes[9][this.row]
        ]
        let Grid = this.parent.Boxes
        Row.forEach(box=> {
            if (box && !box.getValue()){
              box.potetnialValues[this.getValue()] = null  
            }
        })
        Column.forEach(box=> {
            if (box && !box.getValue()){
              box.potetnialValues[this.getValue()] = null  
            }
        })
        Grid.forEach(box=> {
            if (box && !box.getValue()){
              box.potetnialValues[this.getValue()] = null  
            }
        })
    }
    getBoxes() {
        return Boxes
    }
}

export let Grid = eGrid, Box = eBox