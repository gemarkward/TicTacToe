const gameBoard = (() => {
    const cells = {
        "topLeft":"X",       "topMiddle":"",     "topRight":"",
        "middleLeft":"",    "middle":"O",        "middleRight":"X",
        "bottomLeft":"O",    "bottomMiddle":"",  "bottomRight":""
    };

    const updateCell = (cellName, cellMarker) => {
        var cell = cells[cellName];
        if (cell != "") {
            alert("Cell is already taken. Choose an empty cell.");
        }
        else {
            cell = cellMarker;
        };
    };

    const clearCell = () => {
        var cellNames = Array.from(arguments);
        for (i=0; i<cellNames.length; i+=1){
            cells[cellNames[i]] = "";
        };
    };

    const writeBoard = () => {
        for (const key in cells) {
            if (Object.hasOwnProperty.call(cells, key)) {
                const cellValue = cells[key];
                const cellElement = $("#"+key);
                cellElement.text(cellValue);
            };
        };
    };
    return {
        updateCell,
        clearCell,
        writeBoard,
    }
})();

const Player = (newMarker, newName) => {
    const marker = newMarker;
    const name = newName;
    const getMarker = () => marker;
    const getName = () => name;
    const setMarker = newMarker => {
        marker = newMarker;
    };
    const setName = newName => {
        name = newName;
    };
};

const game = (() => {

})();

$(() => {
    gameBoard.writeBoard();
});