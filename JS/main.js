import sheet from "../style.css" assert {type:"css"}
import {Grid} from "./box.js"
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
