import { Grid, Box } from "./box.js";
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
          box.input.readOnly = true;
          box.input.className = "solved";
          UnfilledBoxes = UnfilledBoxes.filter((item) => {
            return item.column != box.column || item.row != box.row;
          }); // item!=box
          FilledBoxes.push(box);
          box.elimateValueNearby();
          change = true;
        } else if (pot.length == 0) {
          console.error("puzzle unsolvable");
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
      let Columns = Grid.prototype.rotate(Boxes);
      Columns.filter((column) => column).forEach((column) => {
        for (let i = 1; i <= 9; i++) {
          let boxesWith = column.filter(
            (box) => box && box.potetnialValues.includes(i) && !box.getValue()
          );
          if (boxesWith.length == 1) {
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
          let boxesWith = column.filter(
            (box) => box && box.potetnialValues.includes(i) && !box.getValue()
          );
          if (boxesWith.length == 1) {
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
  SimpleMultiEliminationFromGrid: {
    name: "Simple Multiple Elimination From Grid",
    getDescription: (n1, n2, n3) =>
      `Since the numbers remaining in this row of this grid must be ${n1} & ${n2}${
        (n3 && " & " + n3) || ""
      }, we can eliminate these valuse from the rest of the row.`,
    difficulty: 1.4,
    difficultyDepracatives: [
      "SimpleMultiEliminationFromRow",
      "SimpleMultiEliminationFromColumn",
    ],
    operate: function (FilledBoxes, UnfilledBoxes, Grids) {
      let change = false;
      let Boxes = Boxes.prototype.getBoxes();
      Object.values(Grids).forEach((grid) => {
        let poppy = grid.Boxes.filter((box) => box && !box.getValue());
        if (poppy.length <= 3 && poppy.length >= 2) {
          if (poppy[2]) {
            if (poppy[0].row == poppy[1].row && poppy[1].row == poppy[2].row) {
              Boxes[row]
                .filter(
                  (box) =>
                    box &&
                    box.column != poppy[0].column &&
                    box.column != poppy[1].column &&
                    box.column != poppy[2].column
                )
                .forEach((box) => box);
            } else if (
              poppy[0].column == poppy[1].column &&
              poppy[1].column == poppy[2].column
            ) {
            } else {
            }
          }
        }
      });
      return [FilledBoxes, UnfilledBoxes, change];
    },
  },
};
export let Methods = methods;
