$(document).ready(function()    {

    //Declaring all global variables
    var bdbQueryURL = ["https://api.openbrewerydb.org/breweries"];

    //Empty array that will be used to store all of the results from the API GET request
    var resultsObj = [];

    //Variables for all the inputs
    var brewName = {
        param: "?by_name=",
        value: $("#brewname").val()
    };

    var brewType = {
            param: "?by_type=",
            value: $("#brewtype").val()
    };

    var brewCity = {
        param: "?by_city=",
        value: "" //$("#cityname").val() 
    };     

    var brewState =  {
        param: "?by_state=",
        value: "Florida" //$("#state").val()
    };  

    var brewZip = {
        param: "?by_postal=",
        value: "" //$("#zip").val()
    };

    //Query URL array. This allows us to take in multiple optional criteria
    var brewInput = [];

    //Query that checks for null values. It will only include values that are not null into the query url array
    function nullCheck(varName)  {
        if (varName.value !== "")   {
            brewInput.push(varName);
        };
        return brewInput;
    };

    function formQueryURL() {
        //This checks to see if each variable has a value. if it does, then it's added to the array.
        nullCheck(brewName);
        nullCheck(brewType);
        nullCheck(brewCity);
        nullCheck(brewState);
        nullCheck(brewZip);
        console.log(brewInput);
        if (brewInput.length === 0) {
            $("brewresults").append($("<p>"));
            console.log("you must provide at least one criteria");
        }
        else    {
            //adds the first param to the query string so that all of the remaining params can include the & symbol
            bdbQueryURL = bdbQueryURL + brewInput[0].param + brewInput[0].value;
            brewInput.splice(0,1);
            //this iterates through the remaining objects in the array and adds them to the queryURL.
            brewInput.forEach(function(thisEl)  {
                bdbQueryURL = bdbQueryURL + "&" + thisEl.param + thisEl.value;
            });
            return bdbQueryURL;
        };
    };

    //Makes the API Call
    function openBrew() {

        // //API request
        $.ajax({    
            url: bdbQueryURL,
            method: "GET"
            }) .then (function(response) {
                    popMap(response);
                    $(response).each(function(thisEl)   {
                        obj = {
                            name: response[thisEl].name,
                            street_1: response[thisEl].street,
                            street_2: response[thisEl].address_2,
                            street_3: response[thisEl].address_3,
                            city: response[thisEl].city,
                            state: response[thisEl].state,
                            zip: response[thisEl].postal_code,
                            phone: response[thisEl].phone,
                            lon: response[thisEl].longitude,
                            lat: response[thisEl].latitude,
                            website: response[thisEl].website_url,
                        };
                        resultsObj.push(obj);
                        return resultsObj;
                    })
                });
                return resultsObj;
    };

    //Creates buttons for each of the results
    function renderResults(arr)    {
        arr.forEach(function(thisEl) {
            var div = $("<div>");
            var span = $("<span>");
            var btn = $("<button>");
            div.addClass("card horizontal");
            span.addClass("card-stacked");
            btn.addClass("btn-small");
            $("#brewresults").append(div);
            div.append(span);
            span.append(btn);
            btn.text(arr[thisEl].name + "\nAddress:\n" + thisEl.street_1 + "\n " + thisEl.street_2 + "\n " + thisEl.city + "," + thisEl.state + "," + thisEl.zip);
            console.log("this worked");
        });
    };


    //This will occur with the onclick event
    // formQueryURL();
    // console.log(bdbQueryURL);
    // openBrew();
    // console.log(resultsObj);
    // renderResults(resultsObj);



});
