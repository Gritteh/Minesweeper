$(document).ready(function() {

    let genForm = $(".gen__form");
    let rowInput = $("#rows");
    let colInput = $("#columns");
    let mineInput = $("#number_of_mines");

    let mineArea = $(".minesweeper__area");

    // When form submitted
    genForm.on("submit", (e) => {
        // Prevent page from refreshing
        e.preventDefault;
        // Collect input values
        let numberOfRows = rowInput.val();
        let numberOfCols = colInput.val();
        let numberOfMines = mineInput.val();

        // Generate minesweeper table
        minesweeperGenerate(numberOfRows, numberOfCols, numberOfMines);
    });

    // Gives single cell with css positioning
    const giveCellWithStyling = (index, columns) => {
        let cell = $("<div/>")
            .addClass("cell cell__" + index)
            .css({
                left: (index % columns) * 29 + 20 + "px",
                top: Math.floor(index / columns) * 29 + 20 + "px"
            });

        return cell;
    };

    // Array to contain HTML elements (cells)
    let htmlArray = [];

    // Generate minesweeper table function, takes number of rows, columns and mines as params
    const minesweeperGenerate = (rows, columns, mines) => {
        // Calculate total number of cells
        let numberOfCells = rows * columns;

        // Loop to generate the right number of cells
        for (let i = 0; i < numberOfCells; i++) {
            let cell = giveCellWithStyling(i, columns);
            // Add html to array for later reference
            htmlArray.push(cell);
        }
        // Append HTML elements to HTML minesweeper area
        htmlArray.map((val, i) => {
            mineArea.append(val);
        });

        // Count for recording number of X's 
        let count = 0;
        // Array for collecting indexes of where mines are placed
        let placementPast = [];
        // Place the right number of mines
        while (count < mines) {
            // Create random number using total number of cells
            let randomNumber = Math.floor((Math.random() * numberOfCells));
            // Only use number if not already recorded in placementPast array
            if ($.inArray(randomNumber, placementPast) === -1) {
                // Add number to array to mark that as used
                placementPast.push(randomNumber);
                // Place mines
                htmlArray[randomNumber].text("X").addClass("marked");
                count++;
            } else {
                // If number already used, continue the loop
                continue;
            }
        }

        // Use mine placements to add 1 to data("clue") value of elements around mine

        // Set the data("clue") value to 0 for all cells
        htmlArray.map(val => val.data("clue", 0));

        placementPast.map((val, i) => {
            // Give placements (indexes) of mines to giveSurroundingCells, which gives addToData an array of indexes of surrounding cells
            addToData(giveSurroundingCells(val, columns, numberOfCells));
        });

        // After clues have been counted, display the numbers above 0
        displayNumbers();

    };


    // Function to give indexes of surrounding cells (3x3 around cell)
    const giveSurroundingCells = (index, columns, totalCells) => {
        let indexArray = [];

        // Row with mine
        let markedRow = Math.floor(index / columns);

        // Declaring indexes of surrounding cells
        let topLeft = index - columns - 1;
        let topMiddle = index - columns;
        let topRight = index - columns + 1;
        let left = index - 1;
        let right = index + 1;
        let bottomLeft = index + +columns - 1;
        let bottomMiddle = index + +columns;
        let bottomRight = index + +columns + 1;

        // Only add index to array if they are on the correct row in relation to the mine
        markedRow === Math.floor(topLeft / columns) + 1 ? indexArray.push(topLeft) : null;
        markedRow === Math.floor(topMiddle / columns) + 1 ? indexArray.push(topMiddle) : null;
        markedRow === Math.floor(topRight / columns) + 1 ? indexArray.push(topRight) : null;
        markedRow === Math.floor(left / columns) ? indexArray.push(left) : null;
        markedRow === Math.floor(right / columns) ? indexArray.push(right) : null;
        markedRow === Math.floor(bottomLeft / columns) - 1 ? indexArray.push(bottomLeft) : null;
        markedRow === Math.floor(bottomMiddle / columns) - 1 ? indexArray.push(bottomMiddle) : null;
        markedRow === Math.floor(bottomRight / columns) - 1 ? indexArray.push(bottomRight) : null;

        // Filter to remove negative indexes and ones that are too high (don't exist)
        let filteredArray = indexArray.filter((number) => {
            return (number >= 0 && number < totalCells);
        });
        
        return filteredArray;
    };

    // Function to add 1 to data("clue") of cells surrounding mines - takes array of indexes of cells to add 1 to
    const addToData = (arrayOfIndexes) => {
        arrayOfIndexes.map((val, i) => {
            // Add 1 to previous data("clue") value of cell
            htmlArray[val].data("clue", htmlArray[val].data("clue") + 1);
        });
    };

    // Function to go through html and display numbers when appropriate
    const displayNumbers = () => {
        htmlArray.map((val, i) => {
            if (!val.hasClass("marked") && val.data("clue") > 0) {
                let number = val.data("clue");
                val.text(number).addClass("clue__" + number);
            }
        });
    };
    

});