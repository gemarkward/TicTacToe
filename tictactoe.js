function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

const gameBoard = (() => {

    const cells = {
        "topLeft":"",       "topMiddle":"",     "topRight":"",
        "middleLeft":"",     "middle":"",       "middleRight":"",
        "bottomLeft":"",    "bottomMiddle":"",  "bottomRight":""
    };

    const getCells = () => {
        return cells;
    }

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

    const clearAll = () => {
        for (const key in cells) {
            if (Object.hasOwnProperty.call(cells, key)) {
                cells[key] = "";
            };
        };
        writeBoard();
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
        getCells,
        updateCell,
        clearCell,
        writeBoard,
        clearAll,
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
    const checkForWin = () => {
        winOptions = [
            ["topLeft","topMiddle", "topRight"],
            ["middleLeft","middle", "middleRight"],
            ["bottomLeft","bottomMiddle", "bottomRight"],
            ["topLeft","middle", "bottomRight"],
            ["bottomLeft","middle", "topRight"],
            ["topLeft","middleLeft", "bottomLeft"],
            ["topMiddle","middle", "bottomMiddle"],
            ["topRight","middleRight", "bottomRight"]
        ]
        const currentBoard = gameBoard.getCells();
        for (i=0; i<winOptions.length; i+=1){
            let checkedMarker;
            let win = true;
            for (j=0; j<winOptions[i].length; j+=1){
                var checkedCell = currentBoard[winOptions[i][j]]
                if (checkedCell == ""){
                    win = false;
                    break;
                }
                else if (checkedMarker == null){
                    checkedMarker = checkedCell;
                }
                else if (checkedMarker != checkedCell){
                    win = false;
                    break;
                }
            }
            if (win == true){
                return checkedMarker;
            }
        }
        return false;
    };
    return {
        checkForWin,
    }
})();

$(() => {
    let win = false;
    gameBoard.writeBoard();
    $("p").fitText(0.2);
    $(".cell").click(function() {
        gameBoard.updateCell($(this).attr("id"), "Q");
        win = game.checkForWin()
        console.log(win)
    });
    $("#newGame").click(function(){
        gameBoard.clearAll();
        openForm();
    })
});