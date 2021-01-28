//To Do
    // Dynamically build queryURl based on what inputs were provided. - Done
    // Parse response array into separate objects for each brewery. - Done
        //The object should contain:
        //     Name - Should link to the website Url
        //     city
        //     state
        //     zip
        //     phone
        //     type
        //     Location button - will trigger the pinpoint on the map

//Display the results on the html page - Not Started

//Nice to Have
    //If no latitude or longitude is available use the street address to retrieve the latitude and longitude.


$(document).ready(function()    {
    var bdbQueryURL = "https://api.openbrewerydb.org/breweries";

    var resObj = [];

    //API Request to open brewery

    // This should be a jquery selector using the ID for the Name input field.
    var brewName = $("#name").val(); 

    // This should be a jquery selector using the ID for the Zip code input field.
    var zip = "?by_zip=34787"; // Used this value for testing. Will pull this from the input field from the front-end.

    // This should be a jquery selector using the ID for the city input field.
    var city = "?by_city=Orlando";   // Used this value for testing. Will pull this from the input field from the front-end.

    // This should be a jquery selector using the ID for the state input field.
    var state =  "?by_state=Florida";  // Used this value for testing. Will pull this from the input field from the front-end.

    // This should be a jquery selector using the ID for the type input field.
    var type = $("#type").val(); 

    var criteria = [brewName, zip, city, state, type];

    console.log(criteria);

    //Forms the query url and includes any search criteria that was inputted by the user.
    function formBdbQueryURL()  {
        for (var i = 0; i < criteria.length; i++)   {
            if (criteria[i])  {
                    bdbQueryURL = bdbQueryURL + criteria[i];
            }
        }
        return;
    }


    formBdbQueryURL();


    // //API request
    $.ajax({    
    url: bdbQueryURL,
    method: "GET"
    }) .then (function(response) {
            popMap(response);
            $(response).each(function()   {
                obj = {
                    name: this.name,
                    city: this.city,
                    state: this.state,
                    zip: this.postal_code,
                    phone: this.phone,
                    lon: this.longitude,
                    lat: this.latitude,
                    website: this.website_url
                };
                resObj.push(obj);
            })
        });

        console.log(resObj);

})
