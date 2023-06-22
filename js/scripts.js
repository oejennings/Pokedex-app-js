let pokemonRepository = (function () {
    
    let pokedex = [
        {
            name: 'Bulbasaur', 
            height: 0.7, 
            type: ['grass', ' poison']
        }, 
        {
            name: 'Pikachu', 
            height: 0.4, 
            type: ' electric'
        },
        {
            name: 'Charizard', 
            height: 1.7, 
            type: ['fire', ' flying']
        },
        {
            name: 'Venomoth', 
            height: 1.5, 
            type: ['bug', ' poison']
        }
    ];

    function getAll() {
        return pokedex;
    }

    function add(pokemon) {
        pokedex.push(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonLists = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');


        button.innerText = pokemon.name;
        button.classList.add('button-class');
        button.addEventListener('click', function() {
            showDetails(pokemon);
        })

        listItem.appendChild(button);
        pokemonLists.appendChild(listItem); 
    }

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }
    
    return{
        getAll: getAll,
        add: add,  
        addListItem: addListItem
    };
    
}) ();


pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});




    