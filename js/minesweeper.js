$(document).ready(function() {

    let genForm = $(".gen__form");
    let rowInput = $("#rows");
    let colInput = $("#columns");
    let mineInput = $("#number_of_mines");

    let mineArea = $(".minesweeper__area");

    genForm.on("submit", (e) => {
        e.preventDefault;
        console.log("submitted");
        let numberOfRows = rowInput.val();
        let numberOfCols = colInput.val();
        let numberOfMines = mineInput.val();
        console.log("rows: " + numberOfRows + "cols: " + numberOfCols + "mines: " + numberOfMines);


        minesweeperGenerate(numberOfRows, numberOfCols, numberOfMines);

    });

    
    const giveCellWithStyling = (index, rows, columns) => {
        let cell = $("<div/>")
            .addClass("cell cell__" + index)
            .css({
                left: (index % columns) * 29 + "px",
                top: Math.floor(index / columns) * 29 + "px"
        });

        return cell;
    };

    const minesweeperGenerate = (rows, columns, mines) => {
        let numberOfCells = rows * columns;

        // array to contain HTML elements
        let htmlArray = [];

        // Loop to generate the right number of cells
        for (let i = 0; i < numberOfCells; i++) {
            let cell = giveCellWithStyling(i, rows, columns);
            // Add html to array for later reference
            htmlArray.push(cell);
        }
        // Map HTML array to HTML
        htmlArray.map((val, i) => {
            mineArea.append(val);
        });
        // htmlArray[0].text("X").addClass("marked");
        // htmlArray[5].text("X");

        let count = 0;
        let placementPast = [];
        while (count < mines) {
            let randomNumber = Math.floor((Math.random() * numberOfCells));
            if ($.inArray(randomNumber, placementPast) === -1) {
                placementPast.push(randomNumber);
                $(".cell__" + randomNumber)
                    .text("X")
                    .addClass("marked");
                console.log(randomNumber);
                count++;
            } else {
                continue;
            }
            
        }
    };

});