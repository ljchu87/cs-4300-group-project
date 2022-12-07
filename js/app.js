/*----------------------- Constants --------------------------------*/

const winningCombos = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
const buttonSound = new Audio("../audio/button-sound.wav")

/*--------------------- Variables (state) ----------------------------*/
let board, turn, winner

/*------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".board > div")
const messageEl = document.querySelector("#message")
const boardEl = document.querySelector(".board")
const resetBtnEl = document.querySelector("#reset-button")
const soundEls = document.querySelector(".board > div")

/*----------------------- Event Listeners -----------------------------*/

boardEl.addEventListener("click", handleClick)
resetBtnEl.addEventListener("click", init)

/*-------------------------- Functions --------------------------------*/
init()
function init (){
  board = [null,null,null,null,null,null,null,null,null]
  turn = 1
  winner = null
  render()
}

function render(){
  board.forEach(function(square, idx){
    if (square === 1) {
      squareEls[idx].textContent = "X"
    }else if (square === -1) {
      squareEls[idx].textContent = "O"
    }else {
      squareEls[idx].textContent = ""
    }
  
  })
  if (winner === null){
    if (turn === 1){
      messageEl.textContent = "PLAYER 1: IT'S TIME TO PLAY!"
    } else {
      messageEl.textContent = "PLAYER 2: IT'S TIME TO PLAY!"
    }
    setTimeout(function(){
      buttonSound.play()
      })
  }
  else if (winner === "T") {
    messageEl.textContent = "IT'S A TIE"
    messageEl.className = "animate__animated animate__wobble"
  } else if (winner === 1) {
    messageEl.textContent = "CONGRATS! PLAYER 1 WINS THE GAME!"
    messageEl.className = "animate__animated animate__wobble"
  } else if (winner === -1) {
    messageEl.textContent = "CONGRATS! PLAYER 2 WINS THE GAME!"
    messageEl.className = "animate__animated animate__wobble"
  }
}

function handleClick(evt){
  let sqIdx = parseInt(evt.target.id[2])
  if (winner === 1 || winner === -1 || winner === "T") {
    return
  }
  if (board[sqIdx]) {
    return
  }
  board[sqIdx] = turn
  turn = turn * -1

  winner = getWinner()
  render()
}

function getWinner(){
  let bestCombo = []
  winningCombos.forEach(function(combo){
    let comboValue = board[combo[0]] + board[combo[1]] + board[combo[2]]
  
    bestCombo.push(Math.abs(comboValue))
  })
  let winnerCombo = bestCombo.some(function(val){
    return val === 3
  })
  
  if (winnerCombo === true) {
      return turn * -1
  } else if (!board.some((value) => value === null)){
    return "T"
  }
  return null
}