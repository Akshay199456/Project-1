/*----- constants -----*/
const playerWinStatus = localStorage.getItem("playerWinStatus");
const playerStatsDeserialized = JSON.parse(localStorage.getItem("playerStats"));
const pokemonStatsDeserialized = JSON.parse(localStorage.getItem("pokemonSelected"));
const garyPokemonImageSource = localStorage.getItem("garyPokemonImageSource");
const garyPokemonName = localStorage.getItem("garyPokemonName");

// console.log(garyPokemonImageSource);
// console.log(garyPokemonImageSource);
const $pokemonData = $(".pokemonData");
console.log($pokemonData);
const $audio = $("#player");
const $image = $("#playerImage");
const $winnerText = $(".winner-text");

/*----- app's state (variables) -----*/ 



/*----- cached element references -----*/ 



/*----- event listeners -----*/ 



/*----- functions -----*/


//----- Play different music depending on whether the player has won or lost --/////
function setTheme(){
	if(playerWinStatus === "true"){
		$audio.attr("src", "sounds/victory.mp3");
		$image.attr("src", playerStatsDeserialized.imageSrc);
	}

	else{
		$image.attr("src", "images/gary.png");
		$winnerText.text("Computer");
		//////// Need to update gary's pokemon over here as well if he wins. 
	}
}


function createPokemonView(){
	
	if(playerWinStatus === "true"){
		for(let i=0; i<pokemonStatsDeserialized.length; i++){
			console.log(pokemonStatsDeserialized[i].name);
			console.log(pokemonStatsDeserialized[i].imageSource);
			console.log($pokemonData);
			const $pokemonViewDiv = $("<div/>");
			const $pokemonImage = $("<img/>");
			const $h2 = $("<h2/>");
	
			$pokemonViewDiv.addClass("pokemonViewDiv");
			$pokemonImage.addClass("pokemonImage");
			$pokemonImage.attr("src",pokemonStatsDeserialized[i].imageSource);
			$h2.text(pokemonStatsDeserialized[0].name);
			$h2.addClass("pokemonText");
			$pokemonViewDiv.append($pokemonImage);
			$pokemonViewDiv.append($h2);
			$pokemonData.append($pokemonViewDiv);
		}
	}

	else{
			const $pokemonViewDiv = $("<div/>");
			const $pokemonImage = $("<img/>");
			const $h2 = $("<h2/>");
	
			$pokemonViewDiv.addClass("pokemonViewDiv");
			$pokemonImage.addClass("pokemonImage");
			$pokemonImage.attr("src", garyPokemonImageSource);
			$h2.text(garyPokemonName);
			$h2.addClass("pokemonText");
			$pokemonViewDiv.append($pokemonImage);
			$pokemonViewDiv.append($h2);
			$pokemonData.append($pokemonViewDiv);
	}
}


/*----- program run -----*/
setTheme();
createPokemonView();



/*----- code testing -----*/
// console.log(typeof(playerWinStatus));
// console.log("+"+playerWinStatus+"+");
console.log(pokemonStatsDeserialized);