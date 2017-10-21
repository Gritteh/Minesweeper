$(document).ready(function() {

    let genForm = $(".gen__form");
    let rowInput = $("#rows");
    let colInput = $("#columns");
    let mineInput = $("#number_of_mines");

    let mineArea = $(".minesweeper__area");

    genForm.on("submit", (e) => {
        e.preventDefault;
        let numberOfRows = rowInput.val();
        let numberOfCols = colInput.val();
        let numberOfMines = mineInput.val();
        console.log("rows: " + numberOfRows + "cols: " + numberOfCols + "mines: " + numberOfMines);


        minesweeperGenerate(numberOfRows, numberOfCols, numberOfMines);

    });

    // Gives single cell with css positioning
    const giveCellWithStyling = (index, columns) => {
        let cell = $("<div/>")
            .addClass("cell cell__" + index)
            .css({
                left: (index % columns) * 29 + "px",
                top: Math.floor(index / columns) * 29 + "px"
            });

        return cell;
    };

    // array to contain HTML elements
    let htmlArray = [];

    const minesweeperGenerate = (rows, columns, mines) => {
        let numberOfCells = rows * columns;

        

        // Loop to generate the right number of cells
        for (let i = 0; i < numberOfCells; i++) {
            let cell = giveCellWithStyling(i, columns);
            // Add html to array for later reference
            htmlArray.push(cell);
        }
        // Map HTML array to HTML
        htmlArray.map((val, i) => {
            mineArea.append(val);
        });

        // Count for recording number of X's 
        let count = 0;
        let placementPast = [];
        // Place the right number of mines
        while (count < mines) {
            // Create random number using total number of cells
            let randomNumber = Math.floor((Math.random() * numberOfCells));
            // Only use number if not already recorded in placementPast array
            if ($.inArray(randomNumber, placementPast) === -1) {
                // Add number to array to mark that as used
                placementPast.push(randomNumber);
                
                htmlArray[randomNumber].text("X").addClass("marked");
                console.log(randomNumber);
                count++;
            } else {
                // If number already used, continue the loop
                continue;
            }
        }

        // use placements to add 1 to data("clue") value of elements around X
        htmlArray.map(val => val.data("clue", 0));

        placementPast.map((val, i) => {
            addToData(giveSurroundingCells(val, columns, numberOfCells));
            
        });
        displayNumbers();

    };


    // Function to give indexes of surrounding cells
    const giveSurroundingCells = (index, columns, totalCells) => {
        let indexArray = [];

        let markedRow = Math.floor(index / columns);
        console.log("markedrow: " + markedRow);
        let topLeft = index - columns - 1;
        let topMiddle = index - columns;
        let topRight = index - columns + 1;
        let left = index - 1;
        let right = index + 1;
        let bottomLeft = index + +columns - 1;
        let bottomMiddle = index + +columns;
        let bottomRight = index + +columns + 1;


        markedRow === Math.floor(topLeft / columns) + 1 ? indexArray.push(topLeft) : null;
        markedRow === Math.floor(topMiddle / columns) + 1 ? indexArray.push(topMiddle) : null;
        markedRow === Math.floor(topRight / columns) + 1 ? indexArray.push(topRight) : null;
        markedRow === Math.floor(left / columns) ? indexArray.push(left) : null;
        markedRow === Math.floor(right / columns) ? indexArray.push(right) : null;
        markedRow === Math.floor(bottomLeft / columns) - 1 ? indexArray.push(bottomLeft) : null;
        markedRow === Math.floor(bottomMiddle / columns) - 1 ? indexArray.push(bottomMiddle) : null;
        markedRow === Math.floor(bottomRight / columns) - 1 ? indexArray.push(bottomRight) : null;

        let filteredArray = indexArray.filter((number) => {
            return (number >= 0 && number < totalCells);
        });
        
        console.log(indexArray);
        console.log(filteredArray);
        
        return filteredArray;
    };
    console.log(giveSurroundingCells(5, 10, 100));

    // Function to add to one to data("clue") of cells surrounding mines
    const addToData = (arrayOfIndexes) => {
        console.log(arrayOfIndexes);
        arrayOfIndexes.map((val, i) => {
            htmlArray[val].data("clue", htmlArray[val].data("clue") + 1);
        });
    };

    // Function to go through html and display numbers when appropriate
    const displayNumbers = () => {
        htmlArray.map((val, i) => {
            console.log(+val.data("clue"));
            if (!val.hasClass("marked") && val.data("clue") > 0) {
                val.text(val.data("clue"));
                console.log(val.data("clue"));
            }
        });
    };
    

});