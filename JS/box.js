let mommy = document.getElementById("bigGrid")
let Boxes = [
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
        this.Boxes = ["",
        ["",new eBox(this,1,1),new eBox(this,1,2),new eBox(this,1,3)],
        ["",new eBox(this,2,1),new eBox(this,2,2),new eBox(this,2,3)],
        ["",new eBox(this,3,1),new eBox(this,3,2),new eBox(this,3,3)]
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
        this.column = (parent.column-1)*3 + localRow
        Boxes[this.column][this.row]= this
        this.element.appendChild(this.input)
        parent.element.appendChild(this.element)   
        this.potetnialValues =  [null,1,2,3,4,5,6,7,8,9]     
    }
    getValue() {
        return this.input.value
    }
    setValue(number) {
        this.potetnialValues = [number]
        this.input.value = number
    }
    elimateValueNearby() {
        let Row = Boxes[this.row]
        let Column = [
            Boxes[1][this.column],
            Boxes[2][this.column],
            Boxes[3][this.column],
            Boxes[4][this.column],            
            Boxes[5][this.column],
            Boxes[6][this.column],
            Boxes[7][this.column],
            Boxes[8][this.column],
            Boxes[9][this.column]
        ]
        let Grid = this.parent.Boxes
        Row.forEach(box=> {
            if (!box.getValue()){
              box.potetnialValues[this.getValue()] = null  
            }
        })
        Column.forEach(box=> {
            if (!box.getValue()){
              box.potetnialValues[this.getValue()] = null  
            }
        })
        Grid.forEach(box=> {
            if (!box.getValue()){
              box.potetnialValues[this.getValue()] = null  
            }
        })
    }
}

export let Grid = eGrid, Box = eBox