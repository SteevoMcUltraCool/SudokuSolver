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
    rotate(board){
        let Columns = [null]
        for (let i = 1; i<=9; i++){
            let array = [
                null,board[1][i],board[2][i],board[3][i],
                board[4][i],board[5][i],board[6][i],
                board[7][i],board[8][i],board[9][i]
            ]
            Columns.push(array)
        } 
        return Columns
    }
}

class eBox {
    constructor(parent,localColumn,localRow){
        this.element = document.createElement("div")
        this.input = document.createElement("input")
       // this.input.type = "number"
        this.input.min = 1
        this.input.max = 9
        this.element.className = "box " + ((localColumn==1 && "l ") || "")+ ((localColumn==3 && "r ") || "")+ ((localRow==1 && "t ") || "")+ ((localRow==3 && "b ") || "")
        this.element.style.gridRow = localRow
        this.element.style.gridColumn = localColumn
        this.parent = parent
        this.row = (parent.row-1)*3 + localRow
        this.column = (parent.column-1)*3 + localColumn
        Boxes[this.row][this.column]= this
        this.element.appendChild(this.input)
        parent.element.appendChild(this.element)   
        this.potetnialValues =  [null,1,2,3,4,5,6,7,8,9]     
        this.paragraph = document.createElement("p")
        this.element.appendChild(this.paragraph)
        this.input.row = this.row
        this.input.column = this.column
        this.input.oldInput = ""
        let input_ = this.input
        this.input.addEventListener("input",function(){
            let input = input_.value
            if (input == ""){input_.oldInput = ""; return true}
            let x =Number(input)
            if (x) {
                if (x%1 == 0 && x>=1 && x<=9){
                    input_.oldInput = String(x)
                    return true
                }else {
                    input_.value = input.substring(input.length-1)
                    if (Number(input_.value)>=1){
                        input_.oldInput = input_.value
                        return true
                    }
                }
            }
            
            input_.value = input_.oldInput
            return false
        })
    }
    getValue() {
        return Number(this.input.value)
    }
    setValue(number) {
        this.potetnialValues = [number]
        this.input.value = String(number)
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