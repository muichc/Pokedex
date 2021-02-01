console.log("sanity check");

const searchBtn = document.querySelector('button');
const input = document.querySelector('#searchTerm');
const pokedex = document.querySelector('.pokedex');
const pokedexProfile = document.querySelector('#profile');
const pokedexBody = document.querySelector('#body');
const pokedexEvolutions = document.querySelector('#evolutions');
const pokedexTypes = document.querySelector('#types');
const pokedexWeaknesses = document.querySelector('#weaknesses');
const pokedexMoves = document.querySelector('#moves');
const pokedexStats = document.querySelector('#base-stats');

searchBtn.addEventListener('click', () => {
    const pokemon = input.value;
    fetchInfo(pokemon);
});



function fetchInfo(pokemon) {
    fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
        .then (responseData => {
            return responseData.json();
        })
        .then (parsedData => {
            updateInfo(parsedData);
        })
        .catch(error => {
            console.error("Oh no");
        })
};

// function fetchInfoTwo(pokemon) {
//     fetch (`https://pokeapi.co/api/v2/pokedex/${pokemon}/`)
//     .then (responseData => {
//         return responseData.json();
//     })
//     .then (parsedData => {
//         console.log(parsedData);
//     })
//     .catch(error => {
//         console.error("Oh no");
//     })
// }


function updateInfo(data) {
    console.log(data)
    // Updates name and image in profile
    const pokePic = document.createElement('img');
    pokePic.setAttribute('src', data.sprites.front_default);
    pokedexProfile.appendChild(pokePic);
    const pokeName = document.createElement('p');
    pokeName.textContent = data.name;
    pokedexProfile.appendChild(pokeName);

    // Updates info about height/weight/gender
    const pokeHeight = document.createElement('p');
    pokeHeight.textContent = `Height: ${data.height/10} m`;
    pokedexBody.appendChild(pokeHeight);
    const pokeWeight = document.createElement('p');
    pokeWeight.textContent = `Weight: ${data.weight/10} kg`;
    pokedexBody.appendChild(pokeWeight);

    // Updates info about evolutions
    // Updates info about pokemon types
    const pokeTypes = document.createElement('p');
    const typeArray = getTypes(data);
    pokeTypes.textContent = `Types: ${typeArray.join(" ")}`;
    pokedexTypes.appendChild(pokeTypes);
};

function getTypes(data) {
    const typeArray = [];
    for (let item in data.types) {
        typeArray.push(data.types[item].type.name);
    }
    return typeArray
}