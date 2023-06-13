let pokemonRepository = (function () {
    
    let pokemonList = [
        {
            name: 'Bulbasaur', 
            height: 0.7, 
            type: ['grass', 'poison']
        }, 
        {
            name: 'Pikachu', 
            height: 0.4, 
            type: 'electric'
        },
        {
            name: 'Charizard', 
            height: 1.7, 
            type: ['fire', 'flying']
        },
        {
            name: 'Venomoth', 
            height: 1.5, 
            type: ['bug', 'poison']
        }
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return{
        getAll: getAll,
        add: add  
    };

}) ();


function listingPokemon (pokemon) {

    document.write('<p>' + pokemon.name + ' ' + pokemon.height + ' ' + pokemon.type + '<p/>'); 
    
    // if (pokemonList.height > 1.5) {
    //     document.write('<p>' + pokemon.name + ' ' + pokemon.height + ' Wow, that\'s big!' + ' ' + pokemon.type + '<p/');
    // }
    // else {
    //     document.write('<p>' + pokemon.name + ' ' + pokemon.height + '<p/> ')
    // }

}

pokemonRepository.getAll().forEach(listingPokemon);




    