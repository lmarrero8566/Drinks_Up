    
    //Open brewery base url
    var bdbQueryURL = ["https://api.openbrewerydb.org/breweries?per_page=5"];

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
    

    //This forms the Open Brewery 

    function formQueryURL(v,w,y,x,z) {
        var brewInput = [v,w,y,x,z];
        bdbQueryURL = ["https://api.openbrewerydb.org/breweries?per_page=5"];

        //This functions checks to make sure there are valid user inputs, not null and not undefined.
            function nullCheck(item, index, arr)    {
                if (arr[index].value != "" && arr[index].value != null) {
                bdbQueryURL.push("&" + arr[index].param + arr[index].value);
                bdbQueryURL = bdbQueryURL.join("");
                };
                return bdbQueryURL;
            };
        //End of nullCheck Function

        brewInput.forEach(nullCheck);
        return bdbQueryURL;
    };



    //Makes the API Call
    function openBrew() {
        //Clear the results on click prior to getting the new result
        $("#brewResults").empty();
        // //API request
        $.ajax({    
            url: bdbQueryURL,
            method: "GET"
            }) .then (function(response) {
                    popMap(response);
                    console.log(response);
                    $(response).each(function(index) {
                        var btn = $("<button>");
                        // btn.attr({type: "button", onclick: "parent.open('" + $(this)[index].website_url + "')" });
                        btn.addClass("btn-large");
                        btn.text(response[index].name);
                        $("#brewResults").append(btn);
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
        openBrew();
    };

