const url = 'https://pokeapi.co/api/v2/pokemon/';
let pokemons = [];
const fetchPoke = async () => {
    for (i = 1; i <= 251; i++) {
        const dados = await fetch(`${url}${i}`);
        const pokemon = await dados.json();
        pokemons.push(pokemon);
    }
    mostraPokemonsHtml(pokemons);
}

function mostraPokemonsHtml(pokemons) {
    let html = document.getElementById('pokemonsList');
    let row = `<div class="row">`
    let div = "</div>"
    let cards = pokemons.map(function (pokemon) {
        let type = '';
        if (pokemon.types.length == 2) {
            type = `<div class="${pokemon.types[0].type.name}">
            ${pokemon.types[0].type.name}</div>
            <div class="${pokemon.types[1].type.name}">
            ${pokemon.types[1].type.name}</div>`
        } else(type = `<div class="${pokemon.types[0].type.name}">
        ${pokemon.types[0].type.name}</div>`);
        return `<div class="col-sm"><div class="dex-list">
            <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onclick="selectPokemon(${pokemon.id-1})">
            <div class="iten-dex">
            <img class="dex-img"
            src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png">
            <div class="id-dex">N°${pokemon.id}</div>
            <h3>${pokemon.name[0].toUpperCase()+pokemon.name.substr(1)}</h3>
            <div class="types">
            ${type}
            </div></div></a></div></div>`
    })
    let pokemonList = "";
    for (let index = 0; index < cards.length; index++) {
        pokemonList = pokemonList + cards[index]
    }
    html.innerHTML = row + pokemonList + div;
}

function selectPokemon (n) {
    if (pokemons[n] != undefined) {
        let html = document.getElementById('modal-body');
        html.innerHTML = `
        <b class="pokemon-nome"> ${pokemons[n]
            .name[0].toUpperCase()+pokemons[n].name.substr(1)}</b>
        <div class="modal-dialog">
           <div class="pokemon-card">
        <img class="pokemon-img" src="https://cdn.traction.one/pokedex/pokemon/${n+1}.png"">
        </div>
        </div>
        <div class="card-down">
        <div class="btns-container">
        </div>
        <h3>Altura: ${pokemons[n].height/10}m </h3>
        <h3>Peso: ${pokemons[n].weight/10}kg</h3>
        <h3>Status Base: ${pokemons[n].stats[0].base_stat}</h3>
        <h3>Experiencia base: ${pokemons[n].base_experience}</h3>
        `;
    }
}

function searchPokemon() {
    let search = []
    let input = document.querySelector("#search").value;
    input = input.toLowerCase();
    if (input != "") {
        pokemons.map(function (pokemon) {
            if (pokemon.name.substring(0, input.length) === input) {
                search.push(pokemon);
            }
        })
        if (search.length != 0) {
            mostraPokemonsHtml(search);
        } else {
            let html = document.getElementById('pokemonsList');
            html.innerHTML = `<img class="not-found" src="./assets/images/Pikachu.gif">
            `
        }

    } else {
        mostraPokemonsHtml(pokemons);
    }
}

fetchPoke();