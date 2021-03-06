document.addEventListener('DOMContentLoaded', function() {
    var options = {
        onCycleTo: () => {
            drinkInfo();
        }
    }
    var carousel = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(carousel, options);
    var select = document.querySelectorAll('select');
    var instances = M.FormSelect.init(select);
    var tabs = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(tabs);



    $(document).on("change", "#spirits", function(e) {
        var spiritChoice = $('#spirits').find('option:selected').val();
        getDrinks(spiritChoice);
    })

    $('#drinkSearch').submit((e) => {
        e.preventDefault();

        var drink = $('#searchDrink').val().trim().toLowerCase();
        searchDrink(drink);
    })

    $(document).on('click', '.drink', function(e) {
        searchDrink(e.target.text);
    })


    //Prevents default action for the submit button on the brewery page
    $('#brewForm').submit((f) => {
        f.preventDefault();
    });

    //Run the open brewery functions
    $("#brewSearch").on("click", brewRetrieve);




    $('#cocktailTab').on('click', function() {
        $('.showcase').removeClass('hidden');
        $('#mapContainer').removeClass('mapCont');
        $('#mapContainer').addClass('hidden');
        var options = {
            onCycleTo: () => {
                drinkInfo();
            }
        }
        var carousel = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(carousel, options);
    })

    $('#breweryTab').on('click', function() {
        $('.showcase').addClass('hidden');
        $('#mapContainer').removeClass('hidden');
        $('#mapContainer').addClass('mapCont');
        setTimeout(function() { myApp.map.invalidateSize() }, 50);
    })

    getRandomDrink();
    getDrinkHistory();

});