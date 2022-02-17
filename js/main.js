const url = 'https://pokeapi.co/api/v2/pokemon/';
let pokemons = [];
const fetchPoke = async () => {
    for (i = 1; i <= 151; i++) {
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
            src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg">
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

function selectPokemon(n){
    if (pokemons[n]!=undefined) {
        let html = document.getElementById('modal-body');
        html.innerHTML = `<b class="pokemon-nome"> ${pokemons[n]
            .name[0].toUpperCase()+pokemons[n].name.substr(1)}</b>
        <div class="modal-dialog">
           <div class="pokemon-card">
               <img class="pokemon-img" src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${n+1}.svg"">
        </div>
        </div>
        <div class="card-down">
        <div class="btns-container">
        </div>
        <h3>Altura: ${pokemons[n].height/10}m </h3>
        <h3>Peso: ${pokemons[n].weight/10}kg</h3>
        <h3>Status Base: ${pokemons[n].stats[0].base_stat}</h3>
        <h3>Experiencia base: ${pokemons[n].base_experience}</h3>
        </div>
        `;
    }
}

fetchPoke();