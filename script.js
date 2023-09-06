const gameBoard = document.querySelector("#gameBoard");
const digits = document.querySelector("#digits");
const deleteNum = document.querySelector("#delete");
const mistake = document.querySelector("#mistake");
let lastSelected = null;
let error = 0;

const puzzle = [
    "8-6-1----",
    "--3-64-9-",
    "9-----816",
    "-8-396---",
    "7-2-4-3-9",
    "---572-8-",
    "521-----4",
    "-3-75-2--",
    "----2-1-5",

    // "856917423",
    // "213864597",
    // "947235816",
    // "185396724",
    // "762148359",
    // "394572681",
    // "521683974",
    // "439751268",
    // "----29135",
]

const solution = [ 
    "856917423",
    "213864597",
    "947235816",
    "185396724",
    "762148359",
    "394572681",
    "521683974",
    "439751268",
    "678429135",
]


window.onload=(()=> {
    //creating a row and column
    for(let i=0; i<9; i++) {  //Row
      for(let j =0; j<9; j++) {
        const div = document.createElement("div"); //creating div template
        div.classList.add("tile");  // 9*9 tile adding in every grid
        //creating a click pointer which responsible for the click event 
        div.addEventListener("click",selectTile);

        // hum check krenge row and col ki value uske liye corrdinate add krenge
        div.setAttribute("row", i);
        div.setAttribute("col",j);

        if(puzzle[i][j]!= "-") {
            div.innerText = puzzle[i][j];
            div.classList.add("filled");  // adding a filled class with different color.
        }
        
       // Creating border
       // creating border for bottom
       if(i==2 || i==5) {
          div.classList.add("border-bottom");
       }

       //creating border right
       if(j==2 || j==5) {
        div.classList.add("border-right");
       }

        gameBoard.appendChild(div);
      }
    }

    // Creating a digits

    for(let i =0; i<9; i++) {
      const div = document.createElement("div");  // creating a div
      div.classList.add("tile");  // Add tiles in the div 
      //add number at selected box create a function with name addNumber
      div.addEventListener("click", addNumber);
      div.innerText = i+1;    // givinb value form 1 to 9 to digtis
      // div.style.height = gameBoard.querySelector(".tile").clientHeight+"px";
      digits.appendChild(div); 
    }
});

//creating a click pointer which responsible for the click event 

function selectTile(){
  // // console.log(this);
  // this.classList.add("select-tile");
    if(lastSelected!= null) {
      lastSelected.classList.remove("select-tile");
    }
    lastSelected = this;
    lastSelected.classList.add("select-tile");
}

//Function for adding Number at Selected box
function addNumber() {
  // alert(this.innerText);
  if(lastSelected.innerText =="" || lastSelected.classList.contains("danger")) {  //agar lastselected black hai tabhi usme value add ho.
    lastSelected.innerText = this.innerText;
  }

  //checking added number is right or not
  // jo number added h uski row and col ki position check krenge
  let row = lastSelected.getAttribute("row");
  let col = lastSelected.getAttribute("col");
  // console.log(row,col);
  if(solution[row][col] == lastSelected.innerText) {
    // alert("Right");
    lastSelected.classList.remove("danger");
  }
  else {
    //when wrong
    lastSelected.classList.add("danger");
    addErrorandDisplay();
    // alert("Wrong")
  }

  if(error >2) {
    alert("Oops.. You Lost!");
    location.reload();
  }

  //check all tiles are filled
  if(isAllTilesFilled()) {
// alert("All Filled");
const allTiles = gameBoard.querySelectorAll(".tile");
let userAnswer = [...allTiles].map((tile)=> {
  return tile.innerText;
})

let num = 0;
for(let i=0; i<9; i++) {
  for(let j=0; j<9; j++) {
    if(solution[i][j] != userAnswer[num]) {
      allTiles[num].classList.add("danger");
    }
    num++;
  }
}
// console.log(userAnswer);

let dangerClass = [...allTiles].some(tile => {
  return tile.classList.contains("danger");

});

if(dangerClass) {
  if(error>2) {
    alert("You lost!");
     location.reload();
  }

} else {
  alert("Congratulations ! you win this Puzzle");
}
  }

}   

// Make delete button working
//agar lastSelected classList filled class contain nahi kr rha h uski ko bas delete kro

deleteNum.onclick=()=>{
  if(!lastSelected.classList.contains("filled")) {
    lastSelected.innerText = ""; 
  }
}

function addErrorandDisplay() {
  error++;
    mistake.innerText = error;
}

// function to check all tiles are filled
// allTiles is consider as a nodeList so hame every function jo ki java ka inbuilt function h use use 
// krne k liye is nodeList ko array mei change krn HOGA jiske liye hume [...allTiles] ker denge bas

function isAllTilesFilled(){
  const allTiles = gameBoard.querySelectorAll(".tile");
 // console.log(allTiles);
     return [...allTiles].every((tile)=>{
    return tile.innerText!="";
});

}