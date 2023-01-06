import { Grid, Box } from "./box.js";
let PerformedOperations = []
const methods = {
  LastNumberRemaining: {
    name: "Last Number Remaining",
    getDescription: (n) =>
      `Pay attention to the highlighted cells. Since all numbers except ${n} can be eliminated, we know this box must be ${n}`,
    difficulty: 1,
    difficultyDepracatives: [],
    operate: function (FilledBoxes, UnfilledBoxes, Grids) {
      let change = false;
      UnfilledBoxes.forEach((box) => {
        let pot = box.potetnialValues.filter((value) => value); // any null values ignored
        if (pot.length == 1) {
          box.setValue(pot[0]);
          console.log("LNR:", box, pot[0])
          box.input.readOnly = true;
          box.input.className = "solved";
          UnfilledBoxes = UnfilledBoxes.filter((item) => {
            return item.column != box.column || item.row != box.row;
          }); // item!=box
          FilledBoxes.push(box);
          box.elimateValueNearby();
          change = true;
        } else if (pot.length == 0) {
          console.error(box,"puzzle unsolvable");
        }
      });
      return [FilledBoxes, UnfilledBoxes, change];
    },
  },
  LastCellRemainingInGrid: {
    name: "Last Cell In Grid Remaining",
    getDescription: (n) =>
      `Pay attention to the highlighted rows and columns. Since no other box in the grid can be ${n}, this box must be ${n}`,
    difficulty: 2,
    difficultyDepracatives: [
      "LastCellRemainingInRow",
      "LastCellRemainingInColumn",
    ],
    operate: function (FilledBoxes, UnfilledBoxes, Grids) {
      let change = false;
      Object.values(Grids).forEach((grid) => {
        for (let i = 1; i <= 9; i++) {
          let boxesWith = grid.Boxes.filter(
            (box) => box && box.potetnialValues.includes(i) && !box.getValue()
          );
          if (boxesWith.length == 1) {
            console.log("LCR Grid:", boxesWith[0], i)
            let box = boxesWith[0];
            box.setValue(i);
            box.input.readOnly = true;
            box.input.className = "solved";
            UnfilledBoxes = UnfilledBoxes.filter((item) => {
              return item.column != box.column || item.row != box.row;
            }); // item!=box
            FilledBoxes.push(box);
            change = true;
            box.elimateValueNearby();
          }
        }
      });
      return [FilledBoxes, UnfilledBoxes, change];
    },
  },
  LastCellRemainingInRow: {
    name: "Last Cell In Row Remaining",
    getDescription: (n) =>
      `Pay attention to the highlighted columns and grids. Since no other box in the row can be ${n}, this box must be ${n}`,
    difficulty: 2,
    difficultyDepracatives: [
      "LastCellRemainingInGrid",
      "LastCellRemainingInColumn",
    ],
    operate: function (FilledBoxes, UnfilledBoxes, Grids) {
      let change = false;
      let Boxes = Box.prototype.getBoxes();
      Boxes.filter((row) => row).forEach((row) => {
        for (let i = 1; i <= 9; i++) {
          let boxesWith = row.filter((box) => box && box.potetnialValues.includes(i) && !box.getValue());
          if (boxesWith.length == 1) {
            let box = boxesWith[0];
            console.log("LNR Row:",boxesWith[0], i)
            box.setValue(i);
            box.input.readOnly = true;
            box.input.className = "solved";
            UnfilledBoxes = UnfilledBoxes.filter((item) => {
              return item.column != box.column || item.row != box.row;
            }); // item!=box
            FilledBoxes.push(box);
            change = true;
            box.elimateValueNearby();
          }
        }
      });
      return [FilledBoxes, UnfilledBoxes, change];
    },
  },
  LastCellRemainingInColumn: {
    name: "Last Cell In Column Remaining",
    getDescription: (n) =>
      `Pay attention to the highlighted rows and grids. Since no other box in the column can be ${n}, this box must be ${n}`,
    difficulty: 2,
    difficultyDepracatives: [
      "LastCellRemainingInGrid",
      "LastCellRemainingInRow",
    ],
    operate: function (FilledBoxes, UnfilledBoxes, Grids) {
      let change = false;
      let Boxes = Box.prototype.getBoxes();
      let Columns = Grid.prototype.rotate(Boxes);
      Columns.filter((column) => column).forEach((column) => {
        for (let i = 1; i <= 9; i++) {
          let boxesWith = column.filter((box) => box && box.potetnialValues.includes(i) && !box.getValue());
          if (boxesWith.length == 1) {
            let box = boxesWith[0];
            console.log("LNR Column:", boxesWith[0],i)
            box.setValue(i);
            box.input.readOnly = true;
            box.input.className = "solved";
            UnfilledBoxes = UnfilledBoxes.filter((item) => {
              return item.column != box.column || item.row != box.row;
            }); // item!=box
            FilledBoxes.push(box);
            change = true;
            box.elimateValueNearby();
          }
        }
      });
      return [FilledBoxes, UnfilledBoxes, change];
    },
  },
  DoubleEliminationInGrid: {
    name: "Double Elimination in Grid",
    getDescription: (n1,n2) =>
      `Pay attention to the highlighted boxes. Since no other box in the grid can be ${n1} or ${n2}, we know these boxes must be ${n1} and ${n2}, so we can eliminate these values from surrounding boxes/rows.`,
    difficulty: 3,
    difficultyDepracatives: ["DoubleEliminationInRow", "DoubleEliminationInColumn"],
    operate: function (FilledBoxes, UnfilledBoxes, Grids) {
      let change = false;
      let Boxes = Box.prototype.getBoxes();
      let Columns = Grid.prototype.rotate(Boxes);
      Object.values(Grids).filter((grid) => grid).forEach((grid) => {
        let valuesRemaining = [null,1,2,3,4,5,6,7,8,9]
        let localFilledBoxes = grid.Boxes.filter(box=> box && box.getValue())
        let localunfilledBoxes = grid.Boxes.filter(box=>box && !box.getValue())
        localFilledBoxes.forEach(box => valuesRemaining[box.getValue()]=null)
        valuesRemaining = valuesRemaining.filter(value =>value)
        valuesRemaining.forEach(function(v){
          let boxesWith = localunfilledBoxes.filter(box =>box.potetnialValues.includes(v))
          if (boxesWith.length == 2){
            valuesRemaining.filter(val => val != v).forEach(function(val){
              boxesWith = boxesWith.filter(box =>box.potetnialValues.includes(val))
              let boxWithReduced = localunfilledBoxes.filter(box =>box.potetnialValues.includes(val))
              if (boxesWith.length==2 && boxWithReduced.length == 2){
                //elimination time
                if (PerformedOperations.includes("DEIG"+ boxesWith[0].row + boxesWith[0].column+boxesWith[1].row+boxesWith[1].column)){
                  return [FilledBoxes, UnfilledBoxes, change]
                }
                PerformedOperations.push(("DEIG"+ boxesWith[0].row + boxesWith[0].column+boxesWith[1].row+boxesWith[1].column))
                change = true
                if (boxesWith[0].row==boxesWith[1].row){
                  let row = boxesWith[0].row
                  Boxes[row].filter(box => box && !box.getValue()).forEach(box => {box.potetnialValues[v]=null; box.potetnialValues[val]=null}) 
                }else if (boxesWith[0].column == boxesWith[0].column){
                  let column = boxesWith[0].column
                  Columns[column].filter(box => box && !box.getValue()).forEach(box => {box.potetnialValues[v]=null; box.potetnialValues[val]=null})                 
                }
                console.log("Double Elimination:",boxesWith[0],boxesWith[1],v, val)
                localunfilledBoxes.filter(box => box && !box.getValue()).forEach(box => {box.potetnialValues[v]=null; box.potetnialValues[val]=null})
                boxesWith[0].potetnialValues = [null,null,null,null,null,null,null,null,null,null]
                boxesWith[1].potetnialValues = [null,null,null,null,null,null,null,null,null,null]
                boxesWith[0].potetnialValues[v] = v
                boxesWith[1].potetnialValues[v] = v
                boxesWith[0].potetnialValues[val] = val
                boxesWith[1].potetnialValues[val] = val
                console.log(boxesWith[0].potetnialValues.toString(),boxesWith[1].potetnialValues.toString())
                //elimination time
              }
            })
          }
        })
      });
      return [FilledBoxes, UnfilledBoxes, change];
    },   
  }
};
export let Methods = methods;
