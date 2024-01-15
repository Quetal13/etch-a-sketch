const changeButton = document.getElementById("change");
const rainbowButton = document.getElementById("rainbow");
const darkeningButton = document.getElementById("darkening");
const container = document.getElementById("container");

let gridNumber = 16;
let defaultColor = 'rgb(41,145,255)'; 
let color = defaultColor;
let rainbowMode = false;
let darkeningMode = false;

//Create a function that makes the div grid
function createDivs(numberOfDivs){
    for (let i = 0; i < numberOfDivs; i++) {
        const newDiv = document.createElement('div');
        //Set up a hover effect that changes the div color when the user mouse hover it.
        newDiv.addEventListener('mouseover', () => {
            if (!rainbowMode && !darkeningMode) {
                color = defaultColor;
            } else if (rainbowMode) {
                color = getRandomColor();
            } else if (darkeningMode) {
                color = darkenColor(color);
            }
            newDiv.style.backgroundColor = color;
        })
        newDiv.style.width = 'calc(100% / ' + gridNumber + ')';
        newDiv.style.height = 'calc(100% / ' + gridNumber + ')';
        container.appendChild(newDiv);
    }

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
    //Once the amount of divs was selected, erase the grid and create a new one in the same total space.
    deleteDivs();
    //Set a limit to the user input.
    if (gridNumber <= 100 && gridNumber >= 1) {
        createDivs(gridNumber * gridNumber);
    } else {
        alert('Please select a number lower than 100');
    }
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