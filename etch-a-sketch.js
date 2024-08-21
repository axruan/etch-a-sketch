const pixel = document.querySelector("#base-pixel");
const container = document.querySelector(".container");

let isMouseDown = false;
let eraserMode = false;
let numPixels = 16;
let size = 70 / numPixels + "vh";

generateBoard(numPixels, size)


function generateBoard(numPixels, size) {
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
    
}

document.body.addEventListener('mouseup', () => {
    isMouseDown = false;
});

document.body.addEventListener('mouseleave', () => {
    isMouseDown = false;
});

function clearBoard() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.id = "erased";
    });

    console.log("board cleared!");
}

function deleteBoard() {
    const rows = document.querySelectorAll(".row");
    rows.forEach(row => {
        container.removeChild(row);
    })

    console.log("board deleted");
}

function clearButtons(self, other) {
    self.classList.add("buttonClicked");
    other.classList.remove("buttonClicked");
}


//UI ELEMENTS
const eraserButton = document.querySelector("#eraser");
const pencilButton = document.querySelector("#pencil");
const clearButton = document.querySelector("#clear");
const newBoardButton = document.querySelector("#new-board");
const generateBoardButton = document.querySelector("#generate-board");
const modal = document.querySelector(".modal");
const overlay = document.querySelector("#overlay");
const rangeInput = document.querySelector("#slider")
const rangeValueDisplay = document.querySelector("#size-text")

pencilButton.classList.add("buttonClicked");

eraserButton.addEventListener("click", () => {
    eraserMode = true;
    clearButtons(eraserButton, pencilButton);

});

pencilButton.addEventListener("click", () => {
    eraserMode = false;
    clearButtons(pencilButton, eraserButton);
});

clearButton.addEventListener("click", () => {
    clearBoard();
    
});

newBoardButton.addEventListener("click", () => {
    openModal();
    deleteBoard();
})

rangeInput.addEventListener("input", () => {
    const currentValue = rangeInput.value;
    rangeValueDisplay.textContent = `${currentValue} x ${currentValue}`
})

generateBoardButton.addEventListener("click", () => {
    hideModal();
    numPixels = rangeInput.value;
    size = 70 / numPixels + "vh";
    generateBoard(numPixels, size);
})

function openModal() {
    modal.style.display = "flex";
    overlay.style.display = "block";
}

function hideModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
}
