const pixel = document.querySelector("#base-pixel");
const container = document.querySelector(".container");

let isMouseDown = false;
let eraserMode = false;
let numPixels = 50;
let size = 70 / numPixels + "vh";

pixel.style.width = size;
pixel.style.height = size;

for (let i = 0; i < numPixels; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < numPixels; j++) {
        const pixelClone = pixel.cloneNode(true);
        pixelClone.id = "";
        pixelClone.classList.add("pixel");

        pixelClone.addEventListener("mousedown", () => {
            isMouseDown = true;
            pixelClone.id = eraserMode ? "erased" : "clicked";
        });
    
        pixelClone.addEventListener("mouseover", () => {
            if (isMouseDown) {
                pixelClone.id = eraserMode ? "erased" : "clicked";
            }
        });
    
        pixelClone.addEventListener("mouseup", () => {
            isMouseDown = false;
        });

        row.appendChild(pixelClone);
    }

    container.appendChild(row);
}

document.body.addEventListener('mouseup', () => {
    isMouseDown = false;
});

document.body.addEventListener('mouseleave', () => {
    isMouseDown = false;
});

function clearBoard() {

}


//UI ELEMENTS
const eraserButton = document.querySelector("#eraser");
const pencilButton = document.querySelector("#pencil");
const clearButton = document.querySelector("#clear");

pencil.classList.add("buttonClicked");

eraser.addEventListener("click", () => {
    eraserMode = true;
    eraserButton.classList.add("buttonClicked");
    pencilButton.classList.remove("buttonClicked");
    clearButton.classList.remove("buttonClicked");

});

pencil.addEventListener("click", () => {
    eraserMode = false;
    pencilButton.classList.add("buttonClicked");
    eraserButton.classList.remove("buttonClicked");
    clearButton.classList.remove("buttonClicked");
});

clear.addEventListener("click", () => {
    eraserMode = false;
    clearBoard();
    clearButton.classList.add("buttonClicked");
    eraserButton.classList.remove("buttonClicked");
    pencilButton.classList.remove("buttonClicked");
});
