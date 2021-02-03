    //Declaring all global variables
    var bdbQueryURL = ["https://api.openbrewerydb.org/breweries"];

    //Empty array that will be used to store all of the results from the API GET request
    var resultsObj = [];

    //Query URL array. This allows us to take in multiple optional criteria
    var brewInput = [];

    //Declaring global variables for the brewery inputs

    var brewName = {
        param: "?by_name",
        value: ""
    };
    
    var brewType = {
        param: "?by_type",
        value: ""
    };

    var brewCity = {
        param: "?by_city",
        value: ""
    };

    var brewState = {
        param: "?by_state",
        value: ""
    };

    var brewZip = {
        param: "?by_postal",
        value: ""
    };
   
    //Query that checks for null values. It will only include values that are not null into the query url array

    function nullCheck(varName)  {
        if (varName.value !== "")   {
            brewInput.push(varName);
            console.log(brewInput);
        };
        return brewInput;
    };


    //This forms the Open Brewery 

    function formQueryURL() {
        console.log("formQuery ran");
        //This checks to see if each variable has a value. if it does, then it's added to the array.
        nullCheck(brewName);
        nullCheck(brewType);
        nullCheck(brewCity);
        nullCheck(brewState);
        nullCheck(brewZip);

        // nullCheck(brewZip);
        if (brewInput.length === 0) {
            p = $("<p>");
            p.text("You must provide at least one criteria")
            $("brewresults").append(p);
        }
        else    {
            //adds the first param to the query string so that all of the remaining params can include the & symbol
            bdbQueryURL = bdbQueryURL + brewInput[0].param + brewInput[0].value;
            brewInput.splice(0,1);

            //Iterates through the remaining objects in the array and adds them to the queryURL.
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
                console.log("openBrew ran");
    };

    //Creates buttons for each of the results
    function renderResults()    {
        $("#brewResults").empty();
        console.log(resultsObj);
        for (var i = 0; i < 10; i++)    {
            var btn = $("<button>");
            btn.addClass("btn-small");
            $("#brewResults").append(btn);
            btn.text(resultsObj[i].name + "\nAddress:\n" + resultsObj[i].street_1 + "\n " + resultsObj[i].street_2 + "\n " + resultsObj[i].city + "," + resultsObj[i].state + "," + resultsObj[i].zip);
            console.log("this button creation worked");
        };
    };

    function brewRetrieve() {

        console.log("the onclick worked");
        formQueryURL();
        openBrew();
        renderResults();
    };


    //This will occur with the onclick event

    // $(".brewSubmit").click(brewRetrieve);
    // formQueryURL();
    // openBrew();
    // renderResults();

