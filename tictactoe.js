function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

const gameBoard = (() => {
    let gameOver = false;
    
    const startGame = () => {
        gameOver = false;
    };

    const endGame = () => {
        gameOver = true;
    };

    const updateHeader = (newMessage) => {
        $("#gameHeader").text(newMessage);
    };

    const cells = {
        "topLeft":"",       "topMiddle":"",     "topRight":"",
        "middleLeft":"",     "middle":"",       "middleRight":"",
        "bottomLeft":"",    "bottomMiddle":"",  "bottomRight":""
    };

    const getCells = () => {
        return cells;
    }

    const updateCell = (cellName, cellMarker) => {
        if (gameOver == true) {
            return 0;
        }
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
        startGame,
        endGame,
        updateHeader,
        getCells,
        updateCell,
        clearCell,
        writeBoard,
        clearAll,
    }
})();

const Player = (newMarker, newName) => {
    let marker = newMarker;
    let name = newName;
    const getMarker = () => marker;
    const getName = () => name;
    const setMarker = (newMarker) => {
        marker = newMarker;
    };
    const setName = (newName) => {
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
    let p1Name = "Player1";
    let p1Marker = "X";
    let p2Name = "Player2";
    let p2Marker = "O";
    let currentPlayer;
    const playerOne = Player(p1Marker, p1Name);
    const playerTwo = Player(p2Marker, p2Name);
    const players = {"p1": playerOne, "p2": playerTwo};

    const getCurrentPlayer = () => {
        return players[currentPlayer];
    };

    const updatePlayers = (p1_name, p1_marker, p2_name, p2_marker) => {
        players["p1"].setName(p1_name);
        players["p1"].setMarker(p1_marker);
        players["p2"].setName(p2_name);
        players["p2"].setMarker(p2_marker);
        var coinflip = (Math.floor(Math.random() * 2) == 0);
        if (coinflip) {
            currentPlayer = "p1";
        }
        else {
            currentPlayer = "p2";
        };
        gameBoard.updateHeader(players[currentPlayer].getName()+", you go first...");
    };

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
                gameBoard.updateHeader(players[currentPlayer].getName()+" WINS!!!");
                gameBoard.endGame();
                return players[currentPlayer].getName();
            }
        }
        nextTurn();
        return false;
    };

    const nextTurn = () => {
        if (currentPlayer == "p1") {
            currentPlayer = "p2";
        }
        else {
            currentPlayer = "p1";
        };
        var newHeader = players[currentPlayer].getName()+", it is your turn...";
        console.log(newHeader);
        gameBoard.updateHeader(newHeader);
    };

    const newGame = () => {
        gameBoard.clearAll();
        gameBoard.startGame();
    };

    return {
        updatePlayers,
        getCurrentPlayer,
        newGame,
        checkForWin,
    }
})();

$(() => {
    game.updatePlayers("Player1", "X", "Player2", "O");
    game.newGame();
    let win = false;
    gameBoard.writeBoard();
    $("p").fitText(0.2);
    $(".cell").click(function() {
        gameBoard.updateCell($(this).attr("id"), game.getCurrentPlayer().getMarker());
        win = game.checkForWin()
        console.log(win)
    });
    $("#newGame").click(function(){
        gameBoard.clearAll();
        openForm();
    });
    $('#myForm').submit(function(event) {
        var $inputs = $('#myForm :input');
        var myInput = {};
        $inputs.each(function() {
            myInput[this.name] = $(this).val();
        });
        p1Name = myInput["player1Name"];
        p1Marker = myInput["player1Marker"];
        p2Name = myInput["player2Name"];
        p2Marker = myInput["player2Marker"];
        console.log(myInput);
        game.updatePlayers(p1Name, p1Marker, p2Name, p2Marker);
        closeForm();
        game.newGame();
        event.preventDefault();
    });
    $("#newGameForm").submit(function(event){
        var myInput = $(this).serialize();
        p1Name = myInput["player1Name"];
        p1Marker = myInput["player1Marker"];
        p2Name = myInput["player2Name"];
        p2Marker = myInput["player2Marker"];
        console.log(myInput);
        game.updatePlayers(p1Name, p1Marker, p2Name, p2Marker);
        closeForm();
        game.newGame();
        event.preventDefault();
    });
});