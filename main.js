
// https://developer-paragon.epicgames.com
// https://developer-paragon.epicgames.com//v1/cards
//var descript = effects.find(function(item) {
	//return item.hasownproperty('description')}
	//).description


var baseUrl = 'https://developer-paragon.epicgames.com/v1/cards/complete';
var local = 'https://limitless-river-35959.herokuapp.com/cards';

function getData(callback) {
	var query = {
		url: local,
		type: 'GET',
		dataType: 'json',
		//jsonp: 'callback',
		success: callback,
		};
	$.ajax(query);
};

function displayData(data) {
	var resultElement ='';
	resultElement = data.map(function(item) {
	//console.log(item.effects);


	// HOVER OVER CARD EFFECTS
	var descript = item.effects.find(function(item) { 
	return item.hasOwnProperty('description')
	descript = descript.replace(/\{attr: +?\}/g, function(matched) {
			return matched.replace('{attr:', '').replace('}', '');
		});
	});

	var stat = item.effects.find(function(item) { 
	return item.hasOwnProperty('stat')
	stat = stat.replace(/\"/g, "");
	});


	var thing = '';

	if(descript != null) {
		var newThing = Object.keys(descript).map(function(item) {
		return '<strong class="dName">' + item + ': </strong>' + '<span>' + descript[item] + '</span>' + '<br>';});

		thing = newThing;
		console.log(newThing);
	}

	else {
		var newStat = Object.keys(stat).map(function(item) {
		return '<strong class="dStat">' + item + ': </strong>' + '<span>' + stat[item] + '</span>' +'<br>';});
		thing = newStat;
	};

	return '<div class="each-card">' + '<p class="card-name">' + item.name + '</p>' +
	'<p class="card-type">' + item.slotType + '</p>' +
	'<p class="info">' + thing.join('') + '</p>' + 
	'<img class="card-image" src="http:' + item.images.medium_stats + '">' +
	'</div>';
	});

	$('.js-results').html(resultElement);
};

// LOADER
function loader() {
    myVar = setTimeout(submitSearch, 4000);
}

function submitSearch(event) {
	$('.js-button').click(function(event) {
		event.preventDefault();
		$('.homePage').addClass('invisible');
		$('.resourcesPage').addClass('invisible');
		$('.howItWorksPage').addClass('invisible');
		$('.cardsPage').removeClass('invisible');
		$('.js-results').removeClass('invisible');
		getData(displayData);
	});
};

function toHIWPage(event) {
	$('.js-button1').click(function(event) {
		event.preventDefault();
		$('.homePage').addClass('invisible');
		$('.cardsPage').addClass('invisible');
		$('.resourcesPage').addClass('invisible');
		$('.howItWorksPage').removeClass('invisible');
	});
}

function toResourcesPage(event) {
	$('.js-button2').click(function(event) {
		event.preventDefault();
		$('.homePage').addClass('invisible');
		$('.cardsPage').addClass('invisible');
		$('.howItWorksPage').addClass('invisible');
		$('.resourcesPage').removeClass('invisible');
	});
}

function toHomePage(event) {
	$('.js-button3').click(function(event) {
		event.preventDefault();
		$('.homePage').removeClass('invisible');
		$('.cardsPage').addClass('invisible');
		$('.howItWorksPage').addClass('invisible');
		$('.resourcesPage').addClass('invisible');
	});
}

$(function() {
	submitSearch();
	toHIWPage();
	toResourcesPage();
	toHomePage();
});