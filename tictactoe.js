const gameBoard = (() => {
    const cells = {
        "topLeft":"",       "topMiddle":"",     "topRight":"",
        "middleLeft":"",    "middle":"",        "middleRight":"",
        "bottomLeft":"",    "bottomMiddle":"",  "bottomRight":""
    };

    const updateCell = (cellName, cellMarker) => {
        var cell = cells[cellName];
        if (cell != "") {
            alert("Cell is already taken. Choose an empty cell.");
        }
        else {
            cell = cellMarker;
        } 
    };
})();

const Player = (marker, name) => {
    const marker = marker;
    const name = name;
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

});