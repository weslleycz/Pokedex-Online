const url = 'https://pokeapi.co/api/v2/pokemon/';
const fetchPoke = async () => {
    let pokemons = [];
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
            <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div class="iten-dex"><img class="dex-img"
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
    html.innerHTML = row + pokemonList + div
}

fetchPoke();