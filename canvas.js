let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelector(".pencil-color");
let pencilWidthEle = document.querySelector(".pencil-Width");
let eraserlWidthEle = document.querySelector(".eraser-Width");
let download =document.querySelector(".download");

let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthEle.value;
let eraserWidth = eraserlWidthEle.value;

let undoRedoTracker = []; //data
let track = 0; // represent which action from tracker array


let mouseDown = false;

// API;
let tool = canvas.getContext("2d");

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

// mousedown ->start new path, mousemove -> path fill (graphics)
canvas.addEventListener("mousedown" , (e) => {
 mouseDown = true;
  beginPath({
      x: e.clientX,
      y: e.clientY
  })
})
canvas.addEventListener("mousemove" , (e) => {
 if(mouseDown) drawStroke({
     x: e.clientX,
     y: e.clientY,
     color : eraserFlag ? eraserColor : penColor,
     width : eraserFlag ? eraserWidth : penWidth
 })
})
canvas.addEventListener("mouseup" , (e) => {
    mouseDown = false;
})

function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}
function drawStroke(strokeObj){
    tool.strokeStyle =strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}

pencilColor.forEach((colorElem) => {
    colorElem.addEventListener("click" , (e) => {
        let color = colorElem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
    })
});

pencilWidthEle.addEventListener("change" , (e) => {
    pencilWidth = pencilWidthEle.value;
    tool.lineWidth = eraserWidth;
}) 
eraserWidthEle.addEventListener("change" , (e) => {
    eraserWidth = eraserWidthEle.value;
    tool.lineWidth = eraserWidth;
}) 
erasee.addEventListener("click" , (e) => {
    if(eraserFlag)
    {
      tool.strokeStyle = eraserColor;
      tool.lineWidth = eraserWidth;
    }
    else{
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
})

download.addEventListener("click" , (e) => {
    let url = canvas.toDataURL();
    
    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})