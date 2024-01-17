const changeButton = document.getElementById("change");
const colorButton = document.getElementById("color");
const changeColorButton = document.getElementById("change-color");
const rainbowButton = document.getElementById("rainbow");
const darkeningButton = document.getElementById("darkening");
const eraserButton = document.getElementById("erase");
const clearButton = document.getElementById("clear");
const container = document.getElementById("container");

let gridNumber = 16;
let defaultColor = 'rgb(41,145,255)'; 
let color = defaultColor;
let rainbowMode = false;
let darkeningMode = false;
let eraserMode = false;

document.addEventListener('mousedown', startPainting);
document.addEventListener('mouseup', stopPainting);

//Create a function that makes the div grid
function createDivs(numberOfDivs){
    for (let i = 0; i < numberOfDivs; i++) {
        const newDiv = document.createElement('div');
        //Set up a hover effect that changes the div color when the user mouse hover it.
        newDiv.addEventListener('mousemove', paintDiv);
        newDiv.style.width = 'calc(100% / ' + gridNumber + ')';
        newDiv.style.height = 'calc(100% / ' + gridNumber + ')';
        container.appendChild(newDiv);
    }

}

//Create a function to paint while the mouse is pressed.
let painting;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
    e.preventDefault();
}

function paintDiv(e) {
    if (!painting) return;
    e.preventDefault();
    if (!rainbowMode && !darkeningMode && !eraserMode) {
        color = changeColorButton.value;
    } else if (rainbowMode) {
        color = getRandomColor();
    } else if (darkeningMode) {
        color = e.target.getAttribute('data-color');
        if (!color) {
            color = 'hsl(0,0%,100%)';
        }
    color = darkenColor(color);
    e.target.setAttribute('data-color', color);
    } else if (eraserMode) {
        color = 'white';
    }

    e.target.style.backgroundColor = color;
}

function deleteDivs() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

createDivs(gridNumber * gridNumber);
//Add something which allows user to change the divs grid
changeButton.addEventListener('click', () => {
    gridNumber = prompt('How many squares per side do you want to place?', '');
    if (!gridNumber) {

    } else {
    //Once the amount of divs was selected, erase the grid and create a new one in the same total space.
        deleteDivs();
    //Set a limit to the user input.
        if (gridNumber <= 100 && gridNumber >= 1) {
            createDivs(gridNumber * gridNumber);
        } else {
            alert('Please select a number lower than 100');
        }
    }
})

//Add a button to set the default mode
colorButton.addEventListener('click', () => {
    rainbowMode = false;
    darkeningMode = false;
    eraserMode = false;
    color = defaultColor;
})

//Add a rainbow mode
//Add a turn on button
rainbowButton.addEventListener('click', () => {
//Set a conditional that checks if rainbow mode is on
    if (rainbowMode) {
        rainbowMode = false;
        color = defaultColor;
//Create something to disable the rainbow mode
    } else {
    rainbowMode = true;
    darkeningMode = false;
    eraserMode = false;
    }
});

//Set a randomly colors function
function getRandomColor() {
    let r = Math.floor(Math.random() * 256); // Random between 0-255
    let g = Math.floor(Math.random() * 256); // Random between 0-255
    let b = Math.floor(Math.random() * 256); // Random between 0-255
    return 'rgb(' + r + ',' + g + ',' + b + ')'; 
}


//Add a progressive darkening effect
darkeningButton.addEventListener('click', () => {
    if (darkeningMode) {
        darkeningMode = false;
        color = defaultColor;
    } else {
        darkeningMode = true;
        rainbowMode = false;
        eraserMode = false;
        color = 'hsl(0, 0%, 100%)';
    }
});

//Create a darken color function 
function darkenColor(color) {
    // Parse the HSL values from the color string
    let [h, s, l] = color.match(/\d+/g);
    // Decrease the lightness value by 10%
    l = Math.max(l - 10, 0);
    return `hsl(${h}, ${s}%, ${l}%)`;
}

//Add a eraser button (Pending)
eraserButton.addEventListener('click', () => {
    if (eraserMode) {
        eraserMode = false;
    } else {
        eraserMode = true;
        rainbowMode = false;
        darkeningMode = false;
    }
})

//Add a clear button
clearButton.addEventListener('click', () => {
    deleteDivs();
    createDivs(gridNumber * gridNumber);
})

//Replace change button for a bar.