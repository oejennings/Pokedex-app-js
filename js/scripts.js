let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']}, 
    {name: 'Pikachu', height: 0.4, type: 'electric'},
    {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
    {name: 'Venomoth', height: 1.5, type: ['bug', 'poison']}
]
for (let i=0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.5) {
        document.write(pokemonList[i].name + ' ' + pokemonList[i].height + ' Wow, that\'s big!' + ' ');
    }
    else {
        document.write('<p>' + pokemonList[i].name + ' ' + pokemonList[i].height + '<p/> ')
    }
}

