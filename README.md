# Minesweeper

The task was to generate an uncovered minesweeper board using number of rows, columns and mines.

I used Javascript, as I have the most experience with that language.

---

## Targetting

To tackle the most difficult problem of targetting the correct cells in the grid, for placing mines, targetting surrounding cells etc., I decided to keep all the elements in an array, and give class names to each element, which correspond with the index of the element in the array. 

After this, it became possible to do what I wanted.

Using index, I could place the cells in a grid, and place mines - avoiding placing in already-used spots, and recording the mine placements.


## Surrounding Cells

Figuring out the clue number to display in each cell was the most difficult part. Initially, I intended to go through each cell, and count the number of mines in surrounding cells, displaying that number on itself. However, now I had the position of each mine, it would be much more efficient to use those as points of reference, adding 1 to the surrounding cells' clue count, before displaying counts larger than 0.

The surrounding cells of an element always have the same index relative to the element's index. However, some cells are in a position where they have fewer than 8 surrounding cells...

Using index as position, and number of columns to calculate which row that cell is in, I could check if a surrounding cell actually exists where I expect on the table. For example, take a mine on the right-most column - the surrounding cell to the top-right should be on the row above. However, you would discover that the cell with that index is actually on the same row, therefore it isn't in the spot I expect, therefore it isn't actually a surrounding cell.