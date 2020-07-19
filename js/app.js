/*----- constants -----*/ 
const playerObject = {};


/*----- cached element references -----*/ 
const $body = $("body");
const $playerSelector = $("a").eq(1);
console.log($playerSelector);
const $div = $("<div/>");
const $imageMale = $("<img/>");
const $imageFemale = $("<img/>");
const $h1 = $("<h1/>");
const $h2 = $("h2");



/*----- app's state (variables) -----*/ 
$h2.eq(0).attr("id", "ash");
$h2.eq(1).attr("id", "may");

let modalExist = false;
let stringifiedplayerObject;

/*----- event listeners -----*/ 


//----- When the user clicks on the "Select Player" link, modal plane along with the player's icons should show up -----//
$playerSelector.click(function(){
	//----- If user clicks on "Select Player" lin
	if($playerSelector.text() === " Select Player "){
		$playerSelector.text(" close modal ");

		//----- Create the modal if it doesn't exist -----//
		if(!modalExist){
			modalExist = true;
			$div.addClass("user-selection");
			$h1.text(" Choose Player ");
			$body.append($h1);

			//----- Make the player icons appear on the page -----//
			$imageMale.attr("src", "images/ash.jpg");
			$imageMale.attr("id", "ash-icon");
			$body.append($imageMale);
			$imageFemale.attr("src", "images/may.png");
			$imageFemale.attr("id", "may-icon");
			$body.append($imageFemale);

			$body.append($div);
			$playerSelector.text(" Close Modal ");
			$h2.toggleClass("hide");

		}
		
		else{
			//----- If it already exists and is not visible, make it appear on the screen -----//
			const $userSelectionDiv = $(".user-selection");
			hideElements($userSelectionDiv);
		}
	}
	else{
		//----- If it already exists and is visible, make it disappear from the screen -----//
		const $userSelectionDiv = $(".user-selection");
		hideElements($userSelectionDiv);
		$playerSelector.text(" Select Player ");
	}
});


// If Ash is clicked, update player object with his info
$imageMale.click(function(){
	createObject("Ash");
});

// If May is clicked, update player object with his info
$imageFemale.click(function(){
	createObject("May");
});



/*----- functions -----*/


//----- Make the elements in the modal appear and disappear
function hideElements($userSelectionDiv){
	$h2.toggleClass("hide");
	$imageMale.toggleClass("hide");
	$imageFemale.toggleClass("hide");
	$userSelectionDiv.toggleClass("hide");
	$h1.toggleClass("hide");
}


//----- Updates the player object, converts it to JSON string and stores it in the localStorage -----//
function createObject(playerName){
	playerObject.name = playerName;
	
	if(playerName === 'Ash')
		playerObject.imageSrc = "images/ash.jpg";
	else if(playerName === 'May')
		playerObject.imageSrc = "images/may.png";
	
	stringifiedplayerObject = JSON.stringify(playerObject);
	localStorage.setItem("playerStats", stringifiedplayerObject);
	console.log(localStorage);

	window.location.replace("pokemonSelection.html");
}
