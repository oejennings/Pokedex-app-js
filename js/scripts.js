let pokemonRepository = (function () {
    
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-contianer');

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


        button.innerText = pokemon.name;
        button.classList.add('button-class');
        button.addEventListener('click', function() {
            showDetails(pokemon);
        })

        listItem.appendChild(button);
        pokemonLists.appendChild(listItem); 
    }

    function showDetails(pokemon) {
        loadDetails(pokemon)
        }; 

    function showModal(title, text){
        let modalContainer = document.querySelector('#modal-contianer');
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = 'height :' + pokemon.height

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' &&
        modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal(pokemon.name, pokemon.height);
    });

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
    
    return{
        getAll: getAll,
        add: add,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showModal: showModal
    }; 
}) ();

pokemonRepository.loadList().then(function() {
 pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    });   
});





    