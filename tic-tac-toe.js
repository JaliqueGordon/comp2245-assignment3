document.addEventListener("DOMContentLoaded", function () {
    var squares = document.querySelectorAll("#board div");
    var status = document.getElementById("status");
    var PlayerX = "X";
    var PlayerO = "O";
    var NewGameButton = document.querySelector(".btn");
    let xTurn = true;
    
    // Setting patterns player must fulfill in the game to gain win.
    var wins = [
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    // Function to see if a player has won.
    function checkForWin(symbol) {
        return wins.some(combo => {
            return combo.every(index => squares[index].classList.contains(symbol));
        });
    }
    
    // Event listener for the new game button - resets the board
    NewGameButton.addEventListener("click", function () {
        squares.forEach(square => {
            square.classList.remove(PlayerX);
            square.classList.remove(PlayerO);
            square.textContent = '';
            status.textContent = "Move your mouse over a square and click to play an X or an O.";
            status.classList.remove("you-won");
        });
    });
    
    // For the purpose of adding the squares.
    squares.forEach(square => {
        square.classList.add("square");

        square.addEventListener("click", function () {
            if (square.classList.contains(PlayerX) || square.classList.contains(PlayerO)) {
                return; 
            }

            if (xTurn) {
                square.classList.add(PlayerX);
                square.textContent = "X";
                if (checkForWin(PlayerX)) {
                    status.textContent = "Congratulations! X is the Winner!";
                    status.classList.add("you-won");
                }
            } else {
                square.classList.add(PlayerO);
                square.textContent = "O";
                if (checkForWin(PlayerO)) {
                    status.textContent = "Congratulations! O is the Winner!";
                    status.classList.add("you-won");
                }
            }
            xTurn = !xTurn;
        });

        square.addEventListener("mouseover", function () {
            if (!square.classList.contains(PlayerX) && !square.classList.contains(PlayerO)) {
                square.classList.add("hover");
            }
        });

        square.addEventListener("mouseout", function () {
            square.classList.remove("hover");
        });
    });
});
    
