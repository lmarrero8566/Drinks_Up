// Initialize Global Variable
var drinkHistory = [];

// Get Drink info(name, ingredients, instructions)
function drinkInfo() {
    let id = $('.carousel').find('a.carousel-item.active').data("drinkId");

    let q = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    $.ajax({
        url: q,
        type: "GET"
    }).then(function(res) {
        $('#drinkTitle').text(`${res.drinks[0].strDrink}`);
        $('#instructions').text(`${res.drinks[0].strInstructions}`);
        $('#ingredients').empty();
        let newList = $('<ul>');
        for (let i = 1; i < 16; i++) {
            let currentAmount = res.drinks[0]['strMeasure' + i];
            let currentIngredient = res.drinks[0]['strIngredient' + i];

            if ((currentAmount === null && currentIngredient === null) || (currentAmount === "" && currentIngredient === "")) break;
            else if (currentAmount === null || currentAmount === "") {
                var newItem = $('<li>');
                newItem.text(currentIngredient);
            } else {
                var newItem = $('<li>');
                newItem.text(`${currentAmount} - ${currentIngredient}`);
            }
            newList.append(newItem);
        }
        $('#ingredients').append(newList);
    }).catch(er => {

    })
}

// Pull drink search history from local storage
function getDrinkHistory() {

    if (JSON.parse(localStorage.getItem('drinkHistory') === null)) return;

    drinkHistory = JSON.parse(localStorage.getItem('drinkHistory'));

    $('#drinkHistory').empty();
    let newList = $('<ul>');
    for (let i = 0; i < drinkHistory.length; i++) {
        let newItem = $('<li>');
        let newAnch = $('<a>');
        newAnch.addClass('drink');
        newAnch.text(drinkHistory[i]);
        newItem.append(newAnch);
        newList.append(newItem);
    }
    $('#drinkHistory').append(newList);
}

// Add search to drink history
function addDrinkHistory(drink) {
    if (drinkHistory.includes(drink)) return;

    if (drinkHistory.length < 5) {
        drinkHistory.unshift(drink);
    } else {
        drinkHistory.pop();
        drinkHistory.unshift(drink);
    }

    localStorage.setItem("drinkHistory", JSON.stringify(drinkHistory));

    $('#drinkHistory').empty();
    let newList = $('<ul>');
    for (let i = 0; i < drinkHistory.length; i++) {
        let newItem = $('<li>');
        let newAnch = $('<a>');
        newAnch.addClass('drink');
        newAnch.text(drinkHistory[i]);
        newItem.append(newAnch);
        newList.append(newItem);
    }
    $('#drinkHistory').append(newList);
}

// add drink picture to carousel
function addDrinkCarousel(drink) {
    let newAnch = $('<a>');
    newAnch.addClass('carousel-item');
    newAnch.data('drinkId', drink.idDrink);
    let newDiv = $('<div>');
    newDiv.addClass('carousel-pic');
    newDiv.css('background-image', `url("${drink.strDrinkThumb}"`);
    let newTitle = $('<h4>');
    newTitle.text(drink.strDrink);
    newDiv.append(newTitle);
    newAnch.append(newDiv);
    $('.carousel').append(newAnch);
}

// search for drink by name
function searchDrink(drink) {
    var q = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;

    $.ajax({
        url: q,
        type: "GET"
    }).then(function(res) {
        $('.carousel').empty();
        for (var i = 0; i < res.drinks.length; i++) {
            addDrinkCarousel(res.drinks[i]);
        }
        var options = {
            onCycleTo: () => {
                drinkInfo();
            }
        }
        var caro = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(caro, options);

        addDrinkHistory(drink)
    }).catch(er => {

    })
}

// Get all drinks by spirit type
function getDrinks(choice) {
    choice = choice.trim().toLowerCase();
    var q = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${choice}`;

    $.ajax({
        url: q,
        type: "GET"
    }).then(function(res) {
        $('.carousel').empty();
        for (var i = 0; i < res.drinks.length; i++) {
            addDrinkCarousel(res.drinks[i]);
        }
        var options = {
            onCycleTo: () => {
                drinkInfo();
            }
        }
        var caro = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(caro, options);
    }).catch(er => {

    })
}

// get a single random drink
function getRandomDrink() {
    $.ajax({
        url: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
        type: "GET"
    }).then(function(res) {
        $('.carousel').empty();
        for (var i = 0; i < res.drinks.length; i++) {
            addDrinkCarousel(res.drinks[i]);
        }
        var options = {
            onCycleTo: () => {
                drinkInfo();
            }
        }
        var caro = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(caro, options);
    }).catch(er => {

    })
}