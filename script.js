let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

let ct = 0;
function addSymbol(event){
    let box = event.target
    if(box.innerText === ""){
        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;
        let winner = checkWinner();
        ct++;
        if(winner){
            msg.innerText = `Congratulations!! ${winner} is the winner`;
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
        if(ct === 9 && winner===null){
            msg.innerText = `Oops!! Game Tied`;
            msgContainer.classList.remove("hide");
        }
    }
}

function checkWinner(){
    for(pattern of winningPattern){
        let el1 = boxes[pattern[0]].innerText
        let el2 = boxes[pattern[1]].innerText;
        let el3 = boxes[pattern[2]].innerText;
        if((el1 !== "") && (el1 === el2) && (el2 === el3)){
            return el1;
        }
    }
    return null;
}

const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

boxes.forEach((box) => {
    box.addEventListener("click", addSymbol)
});

newGameBtn.addEventListener("click", resetGame);
rstBtn.addEventListener("click", resetGame);