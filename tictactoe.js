const gameBoard = (() => {
    const cells = {
        "topLeft":"X",       "topMiddle":"",     "topRight":"",
        "middleLeft":"",    "middle":"O",        "middleRight":"X",
        "bottomLeft":"O",    "bottomMiddle":"",  "bottomRight":""
    };

    const updateCell = (cellName, cellMarker) => {
        if (cells[cellName] != "") {
            alert("Cell is already taken. Choose an empty cell.");
        }
        else {
            cells[cellName] = cellMarker;
        };
        writeBoard();
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
    return {
        getMarker,
        getName,
        setMarker,
        setName,
    }
};

const game = (() => {

})();

$(() => {
    gameBoard.writeBoard();
    $("p").fitText(0.2);
    $(".cell").click(function() {
        gameBoard.updateCell($(this).attr("id"), "Q");

    });

});