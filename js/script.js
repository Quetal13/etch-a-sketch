//Create a function that makes the div grid
function createDivs(numberOfDivs){
    const container = document.getElementById("container");

    for (let i = 0; i < numberOfDivs; i++) {
        const newDiv = document.createElement('div');
        
        newDiv.addEventListener('mouseover', () => {
            newDiv.style.backgroundColor = 'blue';
        })
        container.appendChild(newDiv);
    }

}

createDivs(256);
//Set up a hover effect that changes the div color when the user mouse hover it.

//Add something which allows user to change the divs grid
//Once the amount of divs was selected, erase the grid and create a new one in the same total space.
//Set a limit to the user input.
//Add an rainbow mode
//Add a progressive darkening effect