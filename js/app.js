
/** app state  */
let infoDisplayed = false;

/** element references  */
const searchBtn = document.querySelector('button');
const input = document.querySelector('#search-term');
const pokedex = document.querySelector('.pokedex');

const pokedexMoves = document.querySelector('#moves');
const pokedexStats = document.querySelector('#base-stats');

/*--- Profile --- */
const pokedexProfile = document.querySelector('#profile');
const pokemonPic = document.createElement('img');
const pokemonName = document.createElement('p');

/*--- Body ---*/
const pokedexBody = document.querySelector('#body');
const pokemonHeight = document.createElement('p');
const pokemonWeight = document.createElement('p');

/*--- Evolutions ---*/
const pokedexEvolutions = document.querySelector('#evolutions');

/*--- Types ---*/
const pokedexTypes = document.querySelector('#types');

/*--- Type Effectiveness ---*/
const pokedexTypeEffect = document.querySelector('#type-effect');
const pokedexWeak = document.createElement('div');
pokedexWeak.textContent = "Weakness (2X DMG)";
const pokedexResist = document.createElement('div');
pokedexResist.textContent = "Resistant (0.5X DMG)";
const pokedexImmune = document.createElement('div');
pokedexImmune.textContent = "Immune (No DMG)";


/** Event Listeners  */
searchBtn.addEventListener('click', () => {
    const pokemon = input.value;
    input.value = "";
    fetchInfo(pokemon);
});


/**  functions  */
function fetchInfo(pokemon) {
    fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
        .then (responseData => {
            return responseData.json();
        })
        .then (parsedData => {
            updateInfo(parsedData);
        })
        .catch(error => {
            const errorMessage = document.createElement('p')
            errorMessage.textContent = "Unknown pokemon, did you spell it correctly?";
            pokedexProfile.appendChild(errorMessage);
            console.error(error);
        })
        
};

function fetchInfoType(pokemon) {
    fetch (`https://pokeapi.co/api/v2/type/${pokemon}/`)
    .then (responseData => {
        return responseData.json();
    })
    .then (parsedData => {
        getTypeEffect(parsedData);
        console.log(parsedData);
    })
    .catch(error => {
        const errorMessage = document.createElement('p')
            errorMessage.textContent = "Unknown type, how did you even get here?";
            pokedexProfile.appendChild(errorMessage);
        console.error(error);
    })
}



function updateInfo(data) {
    console.log(data)
    // Updates profile info
    pokemonPic.setAttribute('src', data.sprites.front_default);
    pokemonName.textContent = capitalizeFirstLetter(data.name);
    // Updates height/weight info
    pokemonHeight.textContent = `Height: ${data.height/10} m`;
    pokemonWeight.textContent = `Weight: ${data.weight/10} kg`;
    // Updates type info
    const typeArray = getTypes(data);
    if (pokedexTypes.hasChildNodes()) {
        pokedexTypes.innerHTML = "";
    }
    for (let item in typeArray) {
        const pokemonType = document.createElement('button');
        pokemonType.setAttribute('type', 'button');
        pokemonType.textContent = typeArray[item];
        pokedexTypes.appendChild(pokemonType);
    }
    // Updates type effectiveness
    
    // Updates displayInfo
    if (infoDisplayed === false) {
        return displayInfo(data);
    } 
};


function displayInfo(data) {
    // Changes initial pic to correct pokedex pic
    const initialPic = document.querySelector('#initialPic');
    const picContainer = document.querySelector('.pokedex-images')
    picContainer.removeChild(initialPic);
    const actualPokedex = document.createElement('img');
    actualPokedex.setAttribute('src', '../resources/images/pokedexFinal.png');
    actualPokedex.setAttribute('id', "actualImage");
    // document.body.style.backgroundImage = actualPokedex;
    picContainer.appendChild(actualPokedex);
    // Displays name and image in profile   
    pokedexProfile.appendChild(pokemonPic); 
    pokedexProfile.appendChild(pokemonName);

    // Displays info about height/weight/gender   
    pokedexBody.appendChild(pokemonHeight);
    pokedexBody.appendChild(pokemonWeight);

    // Displays info about evolutions

    // Displays info about pokemon types

    // Displays info about type effectiveness
    pokedexTypeEffect.appendChild(pokedexWeak);
    pokedexTypeEffect.appendChild(pokedexResist);
    pokedexTypeEffect.appendChild(pokedexImmune);

    // Displays info about moveset

    // Indicates that the page is now displayed with info
    infoDisplayed = true;
}


function getTypes(data) {
    const typeArray = [];
    for (let item in data.types) {
        typeArray.push(data.types[item].type.name);
    }
    return typeArray
}

function getTypeEffect(data){
    const typeArray = getTypes(data);
    for (let type in typeArray) {
        fetchInfoType(typeArray[type]);
    }
    const pokemonWeak = document.createElement('button');
}
    


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Bar chart code from canvas 
const chartContainer = document.createElement('div');
chartContainer.setAttribute('id', "chartContainer");
chartContainer.setAttribute('style', "height: 370px; width: 100%;")
function chart() {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text:"Fortune 500 Companies by Country"
        },
        axisX:{
            interval: 1
        },
        axisY2:{
            interlacedColor: "rgba(1,77,101,.2)",
            gridColor: "rgba(1,77,101,.1)",
            title: "Number of Companies"
        },
        data: [{
            type: "bar",
            name: "companies",
            axisYType: "secondary",
            color: "#014D65",
            dataPoints: [
                { y: 3, label: "Sweden" },
                { y: 7, label: "Taiwan" },
                { y: 5, label: "Russia" },
                { y: 9, label: "Spain" },
                { y: 7, label: "Brazil" },
                { y: 7, label: "India" },
                { y: 9, label: "Italy" },
                { y: 8, label: "Australia" },
                { y: 11, label: "Canada" },
                { y: 15, label: "South Korea" },
                { y: 12, label: "Netherlands" },
                { y: 15, label: "Switzerland" },
                { y: 25, label: "Britain" },
                { y: 28, label: "Germany" },
                { y: 29, label: "France" },
                { y: 52, label: "Japan" },
                { y: 103, label: "China" },
                { y: 134, label: "US" }
            ]
        }]
    });
    // chart.render();
}

