
/** app state  */
let infoDisplayed = false;

/** element references  */
const searchBtn = document.querySelector('button');
const input = document.querySelector('#search-term');
const pokedex = document.querySelector('.pokedex');

const pokedexMoves = document.querySelector('#moves');


/*--- Profile --- */
const pokedexProfile = document.querySelector('#profile');
const pokemonPic = document.querySelector('#profile-pic');
const pokemonName = document.createElement('p');
// pokemonName.setAttribute('id', )

/*--- Body ---*/
const pokedexBody = document.querySelector('#body');
const pokedexHW = document.querySelector('#height-weight');
const pokemonHeight = document.createElement('span');
const pokemonWeight = document.createElement('span');

/*--- Evolutions ---*/
const pokedexEvolutions = document.querySelector('#evolutions');

/*--- Error Messages ---*/
const errorContainer = document.querySelector('.error');
const errorMessage = document.createElement('span');

/*--- Types ---*/
const pokedexTypes = document.querySelector('#types');
const gen1Types = ["normal", "fight", "flying", "poison", "ground", "rock", "bug", "ghost", "fire", "water", "grass", "electric", "psychic", "ice", "dragon"]

/*---Base Stats ---*/
const pokedexStats = document.querySelector('#base-stats');
const pokemonAttack = document.createElement('p');
const pokemonDefense = document.createElement('p');
const pokemonHp = document.createElement('p');
const pokemonSpecialAtt = document.createElement('p');
const pokemonSpecialDef = document.createElement('p');
const pokemonSpeed = document.createElement('p');


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
    const pokemon = input.value.toLowerCase();
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
            if(parsedData.id <=151) {
                updateInfo(parsedData);
            } else{
                throw new Error ("Not Gen 1 Pokemon");
            }
        })
        .catch(error => {
            errorMessage.textContent = "Unknown pokemon, did you spell it correctly?";
            errorContainer.appendChild(errorMessage);
            console.error(error);
        })
        
};

function fetchInfoType(type) {
    fetch (`https://pokeapi.co/api/v2/type/${type}/`)
    .then (responseData => {
        return responseData.json();
    })
    .then (parsedData => {
        console.log(parsedData);
    })
    .catch(error => {
        errorMessage.textContent = "Unknown type, how did you even get here?";
        errorContainer.appendChild(errorMessage);
        console.error(error);
    })
}



function updateInfo(data) {
    console.log(data)
    // Updates profile info
    pokemonPic.setAttribute('src', data.sprites.other["official-artwork"].front_default);
    pokemonName.textContent = `${capitalizeFirstLetter(data.name)} #${getPokemonId(data.id)}`;
    // Updates height/weight info
    // pokemonHeight.innerHTML = `<p> HEIGHT: ${data.height/10} m <span> WEIGHT: ${data.weight/10} kg </span> </p> `
    pokemonHeight.textContent = `HEIGHT: ${data.height/10} m`
    pokemonWeight.textContent = `WEIGHT: ${data.weight/10} kg`;
    // Updates type info
    const typeArray = getTypes(data);
    if (pokedexTypes.hasChildNodes()) {
        pokedexTypes.innerHTML = "";
    }
    for (let item in typeArray) {
        if (gen1Types.includes(typeArray[item])) {
            console.log(typeArray[item])
            const pokemonType = document.createElement('button');
            pokemonType.setAttribute('type', 'button');
            pokemonType.setAttribute('class', `${typeArray[item]}`);
            console.log(pokemonType);
            pokemonType.textContent = typeArray[item].toUpperCase();
            pokedexTypes.appendChild(pokemonType);
        }
    }
    // Updates info about base stats
    for (let stat in data.stats) {
        pokemonHp.textContent = `HP: ${data.stats[stat].base_stat}`;
        pokemonAttack.textContent = `ATTACK: ${data.stats[stat].base_stat}`;
        pokemonDefense.textContent = `DEFENSE: ${data.stats[stat].base_stat}`;
        pokemonSpecialAtt.textContent = `SPECIAL ATTACK: ${data.stats[stat].base_stat}`;
        pokemonSpecialDef.textContent = `SPECIAL DEFENSE: ${data.stats[stat].base_stat}`;
        pokemonSpeed.textContent = `SPEED: ${data.stats[stat].base_stat}`;
    }
    // Updates displayInfo
    if (infoDisplayed === false) {
        return displayInfo(data);
    } 
};


function displayInfo(data) {
    // Changes initial pic to correct pokedex pic
    pokedex.style.backgroundImage = "url('../resources/images/pokedexFinal.png')"
    // Displays name and image in profile   
    pokemonPic.style.display = "inline";
    pokedexProfile.appendChild(pokemonName);

    // Displays info about height/weight/gender   
    pokedexHW.appendChild(pokemonHeight);
    pokedexHW.appendChild(pokemonWeight);
    pokedexBody.style.display = "inline";

    // Displays info about evolutions
    
    // Displays info about pokemon types

    // Displays info about type effectiveness
    // pokedexTypeEffect.appendChild(pokedexWeak);
    // pokedexTypeEffect.appendChild(pokedexResist);
    // pokedexTypeEffect.appendChild(pokedexImmune);

    // Displays info about base stats
    pokedexStats.appendChild(pokemonAttack);
    pokedexStats.appendChild(pokemonDefense);
    pokedexStats.appendChild(pokemonHp);
    pokedexStats.appendChild(pokemonSpecialAtt);
    pokedexStats.appendChild(pokemonSpecialDef);
    pokedexStats.appendChild(pokemonSpeed);

    // Check is there was an error message and remove it 
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

// function getTypeEffect(data){
//     const typeArray = getTypes(data);
//     const 
//     for (let type in typeArray) {
//         fetchInfoType(typeArray[type]);
//     }
//     const pokemonWeak = document.createElement('button');
// }
    


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemonId(number) {
    if (number < 10) {
        return `00${number}`;
    } else if (number >=10 && number <100) {
        return `0${number}`;
    } else {
        return `${number}`;
    }
}

// Bar chart code from canvas 
// const chartContainer = document.createElement('div');
// chartContainer.setAttribute('id', "chartContainer");
// chartContainer.setAttribute('style', "height: 370px; width: 100%;")
// function chart() {
//     var chart = new CanvasJS.Chart("chartContainer", {
//         animationEnabled: true,
//         // title:{
//         //     text:"Fortune 500 Companies by Country"
//         // },
//         axisX:{
//             interval: 1
//         },
//         axisY2:{
//             interlacedColor: "rgba(1,77,101,.2)",
//             gridColor: "rgba(1,77,101,.1)",
//             title: "Number of Companies"
//         },
//         data: [{
//             type: "bar",
//             name: "companies",
//             axisYType: "secondary",
//             color: "#014D65",
//             dataPoints: [
//                 { y: 3, label: "Sweden" },
//                 { y: 7, label: "Taiwan" },
//                 { y: 5, label: "Russia" },
//                 { y: 9, label: "Spain" },
//                 { y: 7, label: "Brazil" },
//                 { y: 7, label: "India" },
//                 { y: 9, label: "Italy" },
//                 { y: 8, label: "Australia" },
//                 { y: 11, label: "Canada" },
//                 { y: 15, label: "South Korea" },
//                 { y: 12, label: "Netherlands" },
//                 { y: 15, label: "Switzerland" },
//                 { y: 25, label: "Britain" },
//                 { y: 28, label: "Germany" },
//                 { y: 29, label: "France" },
//                 { y: 52, label: "Japan" },
//                 { y: 103, label: "China" },
//                 { y: 134, label: "US" }
//             ]
//         }]
//     });
//     chart.render();
// }

