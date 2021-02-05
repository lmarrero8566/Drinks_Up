    
    //Open brewery base url
    var bdbQueryURL = [];

    //Declaring global variables for the brewery inputs

    var brewName = {
        param: "by_name=",
        value: ""
    };
    
    var brewType = {
        param: "by_type=",
        value: ""
    };

    var brewCity = {
        param: "by_city=",
        value: ""
    };

    var brewState = {
        param: "by_state=",
        value: ""
    };

    var brewZip = {
        param: "by_postal=",
        value: ""
    };

    var brewHist = [];
    

    //This forms the Open Brewery 

    function formQueryURL(v,w,y,x,z) {
        var brewInput = [v,w,y,x,z];
        bdbdQueryURL = bdbQueryURL.splice(0, 1); //resets the query URL to an empty array
        bdbQueryURL = ["https://api.openbrewerydb.org/breweries?per_page=10"];

        //This functions checks to make sure there are valid user inputs, not null and not undefined.
            function nullCheck(item, index, arr)    {
                if (arr[index].value != "" && arr[index].value != null) {
                bdbQueryURL.push("&" + arr[index].param + arr[index].value);
                bdbQueryURL = bdbQueryURL.join("");
                };
                return bdbQueryURL;
            };
        brewInput.forEach(nullCheck);
        return bdbQueryURL;
    };

    //Function that stores the search history
    function storeBrewHistory(queryURL)    {
    
        if (brewHist == null) {
            brewHist = [];
            brewHist.push(queryURL);
            localStorage.setItem("Brewery Search History", JSON.stringify(brewHist));
            btnCreate(brewHist);
        }
        else if (brewHist.length < 8)   {
            brewHist.push(queryURL);
            localStorage.setItem("Brewery Search History", JSON.stringify(brewHist));
            btnCreate(brewHist);
            
        }
        else    {
            brewHist.splice(0,1);
            brewHist.push(queryURL);
            localStorage.setItem("Brewery Search History", JSON.stringify(brewHist));
            btnCreate(brewHist); 
        };

        brewHist = JSON.parse(localStorage.getItem("Brewery Search History"));
        return brewHist;
    };


    //Makes the API Call
    function openBrew(brewApiURL,targetEl) {
        //Clear the results on click prior to getting the new result
        targetEl.empty();
        // //API request
        $.ajax({    
            url: brewApiURL,
            method: "GET"
            }) .then (function(response) {
                    popMap(response);
                    $(response).each(function(index) {
                        //Create a card for each result
                        var brewCard = $("<div>");
                        var brewP = $("<p>");
                        brewCard.addClass("brew card-panel grey lighten-3");
                        brewP.html("<strong><a target='_blank' href='" + response[index].website_url + "'>" + response[index].name +"</a><strong><br>" + response[index].street + "<br>" + response[index].city + ", " + response[index].state );
                        brewCard.append(brewP);
                        targetEl.append(brewCard);
                    });
                });
    };

    


    function brewRetrieve() {
        bdbQueryURL = [];
        brewName.value = $("#brewName").val();
        brewType.value = $("#brewType").val();
        brewCity.value = $("#brewCity").val();
        brewState.value =$("#brewState").val();
        brewZip.value =$("#brewZip").val();
        formQueryURL(brewName, brewType, brewState, brewCity,brewZip);
        openBrew(bdbQueryURL, $("#brewResults"));
        storeBrewHistory(bdbQueryURL);
    };

