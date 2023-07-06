let pokemonRepository = (function () {
    
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

    function add(pokemon) {
        if (
         typeof pokemon === "object" &&
        "name" in pokemon 
        // "detailsUrl" in pokemon
        ) {
            pokemonRepository.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
        
    }
    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonLists = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#modalContainer");

        button.innerText = pokemon.name;
        button.classList.add('button-class');

        button.addEventListener('click', function() {
            showDetails(pokemon);
        })

        listItem.appendChild(button);
        pokemonLists.appendChild(listItem); 
    }

    function showModal(item) {

        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");


        modalTitle.empty();
        modalBody.empty();

        let nameElement = $("<h1>" + item.name + "</h1>");

        let imageElement = $('<img class="modal-img" style="width:50%">');
        imageElement.attr("src", item.imageUrl);

        let heightElement = $("<p>" + "Height: " + item.height + "m" + "</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        
    }
      
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
        }
    });
  

     function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item);
        })
    }; 

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response){
            return response.json();
        }).then(function (details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e){
            console.error (e);
        });
    }

    let searchBar = document.querySelector(".search");
    let listArea = document.querySelector(".pokemon-list");

    function pokemonFilter(searchInput) {
        return pokemonList.filter((pokemon) => {
            let filteredPokemon = pokemon.name
            return filteredPokemon.includes(searchInput.toLowerCase())
        });
    }

    function removeList() {
        listArea.innerHTML = ''
    }

    function addPokemon(pokemon) {
        pokemonRepository.addListItem(pokemon)
    }

    searchBar.addEventListener('.search', function () {
        let searchInput = searchBar.value
        let filteredList = pokemonRepository.pokemonFilter(searchInput)
        removeList()
        if (filteredList.length === 0) {
            listArea.innerHTML = '<p>No Pokemon with that Name</p>'
        } else {
            filteredList.forEach(addPokemon)
        }
    })
    
    return{
        getAll: getAll,
        add: add,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal,
        pokemonFilter: pokemonFilter
    }; 
}) ();

pokemonRepository.loadList().then(function() {
 pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    });   
});





    