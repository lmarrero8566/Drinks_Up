document.addEventListener('DOMContentLoaded', function() {
    var options = {
        onCycleTo: () => {
            drinkInfo();
        }
    }
    var carousel = document.querySelectorAll('.carousel', options);
    var instances = M.Carousel.init(carousel);
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

    getRandomDrink();
    getDrinkHistory();
});