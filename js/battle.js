// To retrieve the object stored in localStorage

/*----- constants -----*/ 
const playerStatsDeserialized = JSON.parse(localStorage.getItem("playerStats"));
const garyStatsDeserialized = JSON.parse(localStorage.getItem("garyPokemon"));
const pokemonSelectedDeserialized = JSON.parse(localStorage.getItem("pokemonSelected"));
console.log(pokemonSelectedDeserialized);
const $battleDiv = $(".battle");
const $imageGary = $("<img/>");
const $imagePlayer = $("<img/>");
const $pokeBallSpriteDivGary = $("<div/>");
const $pokeBallSpriteDivPlayer = $("<div/>");
const $textDiv = $(".text-interaction div");
const $introductoryh2 = $("<h2/>");
const $containerDiv = $(".container");
const $anchor = $("a");

/*----- app's state (variables) -----*/ 
let playerWinStatus = false;
let clickCount = 0;
let playerTurn = false;
let currentPlayerPokemon;
let currentPlayerPokemonFainted = false;
let currentGaryPokemon;
let currentGaryPokemonFainted = false;
let pokemonSelectedCount = 0;


/*----- cached element references -----*/ 


/*----- event listeners -----*/

$textDiv.on("click",textDivClickFunction); 



function playerEventListeners(playerName){
	const $tackle = $(".tackle");
	const $changePokemon = $(".changePokemon");

	$tackle.click(function(){
		$textDiv.off();
		console.log(" tackle clicked");
		$tackle.remove();
		$changePokemon.remove();
		const $h2 = $("<h2/>");
		$h2.text(currentPlayerPokemon+" used tackle!");
		const $span = $(".text-interaction span");
		$span.toggle();
		$textDiv.append($h2);
		addAnimation("transition.slideDownIn", $h2, 2000);
		gameLogic("player");
		addAnimation("callout.bounce", $imagePlayer, 2000);
						
		setTimeout(function(){
			addAnimation("callout.shake", $imageGary, 2000);
			$textDiv.on("click", textDivClickFunction);
		}, 2000);

	});	

	$changePokemon.click(function(){
		// $textDiv.off();
		console.log(" change pokemon clicked");
		createPokemonView();
		$containerDiv.css("visibility", "visible");
		const $pokemonDivision = $(".pokemonViewDiv");
		const $nav = $("nav");
		pokemonDivisionClick($pokemonDivision, $nav);
	});
}


function pokemonDivisionClick($element, $navbar){
	$element.click(function(event){
		// console.log(event.currentTarget);
		const $addSelectedDiv = $(".addSelected");
		// console.log($addSelectedDiv.length);

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
			$navbar.css("visibility", "visible");
		else
			$navbar.css("visibility", "hidden");
	});
}

$anchor.click(function(){
	const $addSelectedDiv = $(".addSelected div");
	const $nav = $("nav");
	if($addSelectedDiv.children().eq(0).text() === currentPlayerPokemon){
		$containerDiv.css("visibility", "hidden");
		$nav.css("visibility", "hidden");
	}
	// else{
	// 	bringNewPokemon($addSelectedDiv);
	// }

});



/*----- functions -----*/

function bringNewPokemon($element){
	currentPlayerPokemon =	$element.children().eq(0).text();
	
}

function textDivClickFunction(){
	let text;
	let pictureSource;
	const $h2 = $(".text-interaction h2");
	if($introductoryh2.text() === "Gary wants to fight!"){

		// Gary text
		let randomNumber = generateRandomNumber();
		text = "Gary sent out "+ garyStatsDeserialized[randomNumber].name + "!";
		pictureSource = garyStatsDeserialized[randomNumber].imageSource;
		currentGaryPokemon = garyStatsDeserialized[randomNumber].name;
		$introductoryh2.text(text);
		clickCount = 1;
		addAnimation("transition.slideDownIn", $introductoryh2, 2000);
		const $span = $("span");
		addAnimation("transition.slideDownIn", $span, 2000);
		addAnimation("transition.slideLeftOut", $imageGary, 1000);
		addAnimation("transition.slideLeftOut", $pokeBallSpriteDivGary, 1000);
		$imageGary.attr("src", pictureSource);
		addAnimation("transition.slideLeftIn", $imageGary, 1000);
		

		addPokemonName(garyStatsDeserialized[randomNumber].name, "Gary");
		const $pokemonName = $(".pokemonNameGary");
		addAnimation("transition.slideLeftIn", $pokemonName, 1000);
		
		createHealthBar("healthBarGary", "gary");
		const $healthBarGary = $(".healthBarGary");
		addAnimation("transition.slideLeftIn", $healthBarGary, 1000);		
	}

	else if(clickCount === 1){
		// Player text
		text = "Go "+ pokemonSelectedDeserialized[0].name + "!";
		pictureSource = pokemonSelectedDeserialized[0].imageSource;
		currentPlayerPokemon = pokemonSelectedDeserialized[0].name;
		$introductoryh2.text(text);
		addAnimation("transition.slideDownIn", $introductoryh2, 2000);
		const $span = $("span");
		addAnimation("transition.slideDownIn", $span, 2000);
		addAnimation("transition.slideRightOut", $imagePlayer, 1000);
		addAnimation("transition.slideLeftOut", $pokeBallSpriteDivPlayer, 1000);
		$imagePlayer.attr("src", pictureSource);
		addAnimation("transition.slideRightIn", $imagePlayer, 1000);
		

		addPokemonName(pokemonSelectedDeserialized[0].name, "Player");
		const $pokemonName = $(".pokemonNamePlayer");
		addAnimation("transition.slideRightIn", $pokemonName, 1000);

		createHealthBar("healthBarPlayer", "player");
		const $healthBarPlayer = $(".healthBarPlayer");
		addAnimation("transition.slideRightIn", $healthBarPlayer, 1000);

		clickCount = 2;
		playerTurn = true;
	}

	else if(playerTurn && !currentPlayerPokemonFainted && !currentGaryPokemonFainted){
		const garyPokemonObject = getGaryPokemonDetails(currentGaryPokemon);
		const $h2 = $(".text-interaction h2");
		const $span = $(".text-interaction span");
		$span.toggle();
		$h2.remove();

		const $tackle = $("<h2/>")
		const $changePokemon = $("<h2/>");
		$tackle.addClass("tackle");
		$changePokemon.addClass("changePokemon");
		$tackle.text("Tackle");
		$changePokemon.text("Change Pokemon");
		$textDiv.append($tackle);
		$textDiv.append($changePokemon);
		playerEventListeners("player");
		playerTurn = false;
	}

	else if($h2.text() === (currentPlayerPokemon + " used tackle!"))
		computerTurn();
}

function computerTurn(){
	console.log("computerTurn called");
	if(!currentGaryPokemonFainted){
		setTimeout(function(){
				const $h2 = $(".text-interaction h2");
				$h2.text(currentGaryPokemon+" used tackle!");
				addAnimation("transition.slideDownIn", $h2, 2000);
				gameLogic("gary");
				addAnimation("callout.bounce", $imageGary, 2000);
	
					
				setTimeout(function(){
					addAnimation("callout.shake", $imagePlayer, 2000);
				}, 2000);
			}, 2000);
			
		playerTurn = true;
	}
}


function getGaryPokemonDetails(pokemonName){
	 if(pokemonName === "Exeggutor")
		return garyStatsDeserialized[0];
	else if(pokemonName === "Flareon")
		return garyStatsDeserialized[1];
	else if(pokemonName === "Krabby")
		return garyStatsDeserialized[2];
	else if(pokemonName === "Magmar")
		return garyStatsDeserialized[3];
	else if(pokemonName === "Oddish")
		return garyStatsDeserialized[4];
	else if(pokemonName === "Poliwag")
		return garyStatsDeserialized[5];
}

function getPlayerPokemonDetails(pokemonName){
	if(pokemonName === "Bulbasaur")
		return pokemonSelectedDeserialized[0];
	else if(pokemonName === "Charmander")
		return pokemonSelectedDeserialized[1];
	else if(pokemonName === "Squirtle")
		return pokemonSelectedDeserialized[2];
	else if(pokemonName === "Bellsprout")
		return pokemonSelectedDeserialized[3];
	else if(pokemonName === "Ponyta")
		return pokemonSelectedDeserialized[4];
	else if(pokemonName === "Tentacool")
		return pokemonSelectedDeserialized[5];
}

function getDamageOutput(playerPokemonType, garyPokemonType){
	if((playerPokemonType === "Fire" && garyPokemonType === "Fire") || 
		(playerPokemonType === "Water" && garyPokemonType === "Water") || 
		(playerPokemonType === "Grass" && garyPokemonType === "Grass"))
		return 15;
	else if((playerPokemonType === "Fire" && garyPokemonType === "Water") ||
		(playerPokemonType === "Water" && garyPokemonType === "Grass") || 
		(playerPokemonType === "Grass" && garyPokemonType === "Fire"))
		return 5;
	else if((playerPokemonType === "Fire" && garyPokemonType === "Grass") ||
		(playerPokemonType === "Water" && garyPokemonType === "Fire") ||
		(playerPokemonType === "Grass" && garyPokemonType === "Water"))
		return 30;

}


function changeHealthBarColorAndValue($element, pokemonHealth){
	// console.log(pokemonHealth);
	let bgColor;

	if(pokemonHealth <= 20)
		bgColor = "#ff0000";
	else if(pokemonHealth <=60)
		bgColor = "#ffff00";

	$element.velocity({
		width: pokemonHealth+"%",
		backgroundColor: bgColor
	}, 2000);
}

function garyPokemonPlayed(){
	if(currentGaryPokemon === "Exeggutor")
		return "images/gary/exeggutor.png";
	else if(currentGaryPokemon === "Flareon")
		return "images/gary/flareon.png";
	else if(currentGaryPokemon === "Krabby")
		return "images/gary/krabby.png";
	else if(currentGaryPokemon === "Magmar")
		return "images/gary/magmar.png";
	else if(currentGaryPokemon === "Oddish")
		return "images/gary/oddish.png";
	else if(currentGaryPokemon === "Poliwag")
		return "images/gary/poliwag.png"; 

}

function gameLogic(playerName){
	const playerPokemonObject = getPlayerPokemonDetails(currentPlayerPokemon);
	const garyPokemonObject = getGaryPokemonDetails(currentGaryPokemon);
	// console.log(playerPokemonObject);
	// console.log(garyPokemonObject);
	const $healthBarGary = $(".healthBarGary");
	const $healthBarPlayer = $(".healthBarPlayer");
	// console.log(damageOutput);
	if(playerName === "player"){
		const $healthBarGary = $(".healthBarGary"); 
		const $outerDivGary = $(".outerDivGary");
		const $pokemonNameGary = $(".pokemonNameGary");
		let damageOutput = getDamageOutput(pokemonSelectedDeserialized[0].type, garyPokemonObject.type);
		garyPokemonObject.health-=damageOutput;
		changeHealthBarColorAndValue($healthBarGary, garyPokemonObject.health);
		if(garyPokemonObject.health <= 0){
			currentGaryPokemonFainted = true;
			setTimeout(function(){
				addAnimation("transition.slideDownOut" ,$imageGary, 4000);
				addAnimation("transition.slideDownOut", $outerDivGary, 4000);
				addAnimation("transition.slideDownOut", $pokemonNameGary, 4000);
				const $h2 = $(".text-interaction h2");
				$h2.text(currentGaryPokemon + " has fainted!");
				let imageSource = garyPokemonPlayed();
				localStorage.setItem("garyPokemonImageSource", imageSource);
				localStorage.setItem("playerWinStatus", true);
				localStorage.setItem("garyPokemonName", currentGaryPokemon);
				console.log(localStorage.getItem("garyPokemonImageSource"));
			}, 2000);

			setTimeout(function(){
				window.location.replace("result.html");
			}, 4000);
		}
	}

	else{
		const $healthBarPlayer = $(".healthBarPlayer"); 
		const $outerDivPlayer = $(".outerDivPlayer");
		const $pokemonNamePlayer = $(".pokemonNamePlayer");
		let damageOutput = getDamageOutput(garyPokemonObject.type, pokemonSelectedDeserialized[0].type);
		pokemonSelectedDeserialized[0].health-=damageOutput;
		changeHealthBarColorAndValue($healthBarPlayer, pokemonSelectedDeserialized[0].health);
		if(pokemonSelectedDeserialized[0].health <= 0){
			currentPlayerPokemonFainted = true;
			setTimeout(function(){
				addAnimation("transition.slideDownOut" ,$imagePlayer, 4000);
				addAnimation("transition.slideDownOut", $outerDivPlayer, 4000);
				addAnimation("transition.slideDownOut", $pokemonNamePlayer, 4000);
				const $h2 = $(".text-interaction h2");
				$h2.text(currentPlayerPokemon + " has fainted!");
				let imageSource = garyPokemonPlayed();
				localStorage.setItem("garyPokemonImageSource", imageSource);
				localStorage.setItem("playerWinStatus", false);
				localStorage.setItem("garyPokemonName", currentGaryPokemon);
				console.log(localStorage.getItem("garyPokemonImageSource"));
			}, 2000);

		setTimeout(function(){
				window.location.replace("result.html");
			}, 6000);
		}
	}
}


// Adds the given animation to the element to be animated
function addAnimation(animationType, $animationElement, animationDuration){
	$animationElement.velocity(animationType,{
		duration: animationDuration,
		loop: false
	});
}

function createPokeball($element, className){
	for(let i=0; i<6; i++){
		const $pokeBallImage = $("<img/>");
		$pokeBallImage.attr("src", "images/pokeballSprite.png");
		$pokeBallImage.addClass(className);
		$element.append($pokeBallImage);
	}
}

function introductoryText(){
	$introductoryh2.text("Gary wants to fight!");
	$textDiv.append($introductoryh2);
	createDownArrow();
}

function createDownArrow(){
	const $span = $("<span/>");
	const $icon = $("<i/>");
	$icon.addClass("fas fa-sort-down");
	$span.append($icon);
	$textDiv.append($span);
}


function openingView(){
	$imageGary.attr("src","images/gary.png");
	$imageGary.attr("id","garyImage");
	$imagePlayer.attr("src", playerStatsDeserialized.imageSrc);
	$imagePlayer.attr("id", "playerImage");
	
	createPokeball($pokeBallSpriteDivGary, "pokeBall");
	$pokeBallSpriteDivGary.addClass("pokeBallGary");
	$battleDiv.append($pokeBallSpriteDivGary);
	$battleDiv.append($imageGary);
	$battleDiv.append($imagePlayer);
	createPokeball($pokeBallSpriteDivPlayer, "pokeBall");
	$pokeBallSpriteDivPlayer.addClass("pokeBallPlayer");
	$battleDiv.append($pokeBallSpriteDivPlayer);

	addAnimation("transition.slideLeftIn", $imageGary, 4000);
	addAnimation("transition.slideRightIn", $imagePlayer, 4000);
	addAnimation("transition.slideLeftIn", $pokeBallSpriteDivGary, 4000);
	addAnimation("transition.slideRightIn", $pokeBallSpriteDivPlayer, 4000);

	setTimeout(introductoryText, 4000);
}

function generateRandomNumber(){
	const randomNumber = Math.floor(Math.random() * garyStatsDeserialized.length);
	return randomNumber;
}

function createHealthBar(className, playerName){
	const $outerDiv = $("<div/>");
	if(playerName  === "gary")
		$outerDiv.addClass("outerDivGary");
	else
		$outerDiv.addClass("outerDivPlayer");
	const $div = $("<div/>");
	$div.addClass(className);
	$outerDiv.append($div);
	$battleDiv.append($outerDiv);
}


function addPokemonName(pokemonName, player){
	if(player === "Gary"){
		const $h2 = $("<h2/>");
		$h2.text(pokemonName);
		$h2.addClass("pokemonNameGary");
		$battleDiv.append($h2);
	}

	else{
		const $h2 = $("<h2/>");
		$h2.text(pokemonName);
		$h2.addClass("pokemonNamePlayer");
		$battleDiv.append($h2);	
	}
}


// Modal code

function createPokemonView(){
	for(let i=0; i<pokemonSelectedDeserialized.length; i++){
		const $pokemonViewDiv = $("<div/>");
		const $pokemonImage = $("<img/>");
		const $pokemonInfoDiv = $("<div/>");
		const $h2Name = $("<h2/>");
		const $h2Type = $("<h2/>");
		const $h2Health = $("<h2/>");

		$pokemonImage.attr("src", pokemonSelectedDeserialized[i].imageSource);
		$pokemonViewDiv.append($pokemonImage);
		$pokemonViewDiv.append($pokemonInfoDiv);
		$pokemonViewDiv.addClass("pokemonViewDiv");
		$pokemonInfoDiv.addClass("pokemonInfoDiv");
		$pokemonImage.addClass("pokemonImage");
		const name = pokemonSelectedDeserialized[i].name;
		const type = "Type: " + pokemonSelectedDeserialized[i].type;
		let hp; 
		if(pokemonSelectedDeserialized[i].health <=0)
			hp = 0;
		else
			hp = "HP: " + pokemonSelectedDeserialized[i].health;
		$h2Name.text(name);
		$pokemonInfoDiv.append($h2Name);
		$h2Type.text(type);
		$pokemonInfoDiv.append($h2Type);
		$h2Health.text(hp);
		$pokemonInfoDiv.append($h2Health);
		$containerDiv.append($pokemonViewDiv);
	}
}




/*
	(Remaining) Need to execute code that:

	1. allows player to change pokemon in between battle (store updated pokemon data & add animations once selected)
	2. allows player to change pokemon if their pokemon dies in battle
	3. store result of the winner after the loser loses their 6 pokemon
	4. Update instruction.js to reflect grass, water, fire weakness in battle

*/







/*----- program run -----*/
openingView();
localStorage.setItem("playerWinStatus", playerWinStatus);

/*----- testing -----*/


// console.log(playerStatsDeserialized.imageSrc);