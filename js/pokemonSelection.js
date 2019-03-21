/*----- constants -----*/
const $body = $("body");
const $containerDiv = $(".container");
const $nav = $("nav");
const $anchor = $("a");

/*----- app's state (variables) -----*/

let pokemonSelectedCount = 0;

let pokemonSelected = [];

const pokemonAvailable =[
	{
		imageSource: "images/pokemon/bulbasaur.png",
		name: "Bulbasaur",
		type: "Grass",
		health: 100
	},

	{
		imageSource: "images/pokemon/charmander.png",
		name: "Charamander",
		type: "Fire",
		health: 100
	},

	{
		imageSource: "images/pokemon/squirtle.png",
		name: "Squirtle",
		type: "Water",
		health: 100
	},

	{
		imageSource: "images/pokemon/bellsprout.png",
		name: "Bellsprout",
		type: "Grass",
		health: 100
	},

	{
		imageSource: "images/pokemon/ponyta.png",
		name: "Ponyta",
		type: "Fire",
		health: 100
	},

	{
		imageSource: "images/pokemon/tentacool.png",
		name: "Tentacool",
		type: "Water",
		health: 100
	}
];


const garyPokemon = [
	{
		imageSource: "images/gary/exeggutor.png",
		name: "Exeggutor",
		type: "Grass",
		health: 100
	},

	{
		imageSource: "images/gary/flareon.png",
		name: "Flareon",
		type: "Fire",
		health: 100
	},

	{
		imageSource: "images/gary/krabby.png",
		name: "Krabby",
		type: "Water",
		health: 100
	},

	{
		imageSource: "images/gary/magmar.png",
		name: "Magmar",
		type: "Fire",
		health: 100
	},

	{
		imageSource: "images/gary/oddish.png",
		name: "Oddish",
		type: "Grass",
		health: 100
	},

	{
		imageSource: "images/gary/poliwag.png",
		name: "Poliwag",
		type: "Water",
		health: 100
	}	
];

/*----- cached element references -----*/


/*----- functions -----*/

function createPokemonView(){
	for(let i=0; i<pokemonAvailable.length; i++){
		const $pokemonViewDiv = $("<div/>");
		const $pokemonImage = $("<img/>");
		const $pokemonInfoDiv = $("<div/>");
		const $h2Name = $("<h2/>");
		const $h2Type = $("<h2/>");

		$pokemonImage.attr("src", pokemonAvailable[i].imageSource);
		$pokemonViewDiv.append($pokemonImage);
		$pokemonViewDiv.append($pokemonInfoDiv);
		$pokemonViewDiv.addClass("pokemonViewDiv");
		$pokemonInfoDiv.addClass("pokemonInfoDiv");
		$pokemonImage.addClass("pokemonImage");
		const name = "Name: " + pokemonAvailable[i].name;
		const type = "Type: " + pokemonAvailable[i].type;
		$h2Name.text(name);
		$pokemonInfoDiv.append($h2Name);
		$h2Type.text(type);
		$pokemonInfoDiv.append($h2Type);
		$containerDiv.append($pokemonViewDiv);
	}
}


//----- Get the pokemon that have been selected and store their data into an array of objects -----//
function transferPokemonSelected(imageArray){
	const objectArray = [];
	for(let i=0; i<imageArray.length; i++){
		for(let j=0; j<pokemonAvailable.length; j++){
			if(imageArray[i] === pokemonAvailable[j].imageSource){
				let object = {};
				object.imageSource = pokemonAvailable[j].imageSource;
				object.name = pokemonAvailable[j].name;
				object.type = pokemonAvailable[j].type;
				object.health = pokemonAvailable[j].health;
				objectArray.push(object);
			}
		}
	}
	console.log(objectArray);
	return objectArray;
}


//----- Create stringified object and store it in localStorage
function createStringifiedObject(name, objectArray){
	let stringifiedObject = JSON.stringify(objectArray);
	localStorage.setItem(name, stringifiedObject);
	console.log(localStorage);
}



/*----- program run -----*/
createPokemonView();
const $pokemonDivision = $(".pokemonViewDiv");


/*----- event listeners -----*/


//----- Change opacity of division and border when selected/deselected -----//
$pokemonDivision.click(function(event){
	console.log(event.currentTarget);

	const $addSelectedDiv = $(".addSelected");

	if($addSelectedDiv.length >= 1){
		$addSelectedDiv.removeClass("addSelected");
		--pokemonSelectedCount;
	}

	$(event.currentTarget).toggleClass("addSelected");
	if($(event.currentTarget).hasClass("addSelected"))
		++pokemonSelectedCount;
	else
		--pokemonSelectedCount;

	if(pokemonSelectedCount === 1)
		$nav.css("visibility", "visible");
	else
		$nav.css("visibility", "hidden");
});


//----- Get pokemon that have been selected as well as computer's pokemon, create JSON version and redirect to battle.html -----//
$anchor.click(function(){
	let imageArray = [];
	const $addSelectedDiv = $(".addSelected");

	// for(let i=0 ; i<12; i+=2){
	// 	const imageSource = $pokemonDivision.children().eq(i).attr("src");
	// 	imageArray.push(imageSource);
	// }

	for(let i=0 ; i<$addSelectedDiv.length; i++){
		const imageSource = $addSelectedDiv.children().eq(0).attr("src");
		imageArray.push(imageSource);
	}
	const objectArray = transferPokemonSelected(imageArray);
	createStringifiedObject("pokemonSelected", objectArray);
	createStringifiedObject("garyPokemon", garyPokemon);
	window.location.replace("battle.html");
});



/*----- code testing -----*/

// console.log($pokemonDivision);