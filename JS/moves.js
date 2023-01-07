import { Box, Grid} from "./box.js";
let moveNumber = 1
class move{
    constructor(moveType, affectedBoxes,DOMmoves){
        let Boxes = Box.prototype.getBoxes()
        let board = [false,[false],[false],[false],[false],[false],[false],[false],[false],[false],[false]]
        Boxes.filter(row => row).forEach(row =>{
            row.filter(box =>box).forEach(box => {
                let row = box.row
                let column = box.column
                let obj = {
                    confirmed: Boolean(box.getValue()),
                    value: String(box.getValue()),
                    potential: box.potetnialValues.toString()
                }
                board[row][column] = obj            
            })
        })
        this.board = board
        this.type = moveType
        this.Boxes = affectedBoxes
        this.element = document.createElement("div")
        this.element.innerHTML = `<h3><span>Move ${moveNumber}:</span> ${this.type}</h3>`
        this.button = document.createElement("button")
        this.button.addEventListener("click",function(){
            {
                let Boxes = Box.prototype.getBoxes()
                Boxes.filter(row =>row).forEach(row =>{
                    row.filter(box =>box).forEach(box => {
                        let row = box.row
                        let column = box.column
                        console.log(board,row,column)
                        let miniBox = board[row][column]
                        if (miniBox.confirmed){
                            box.setValue(miniBox.value)
                            box.input.className = ""
                            box.paragraph.innerHTML = ""
                            box.paragraph.className = ""
                        }else {
                            box.setValue("")
                            box.input.className = ""
                            box.paragraph.innerHTML = miniBox.potential
                            box.paragraph.className = ""
                        }
                    })
                })
                affectedBoxes.forEach(box => {box.input.className = "solved"; box.paragraph.className = "solved" })
            }
        })
        this.button.innerHTML = "Show"
        this.element.appendChild(this.button)
        DOMmoves.appendChild(this.element)
        moveNumber = moveNumber + 1
    }

}

export let Move = move