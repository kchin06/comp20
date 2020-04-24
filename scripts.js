
/*-- use AJAX data pattern to send a request to the API, tetreive some data, and display the data
*/

var results=[]; /*object of array of objects(events)*/


function loadData(){
    var api_url =  "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=";
    var api_key = "&apikey=IRf1McTms041EqaYu7WMVAtq6JuW4WQd";
    var url = api_url + getInput() + api_key;

    /*making arrays to store values*/
            var array_Artists = [];
            var array_Genre = [];
            var array_Date = [];
            var array_Venue = [];

    /*
    var api_url =  "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=";
    var city = 'new york';
    var api_key = "&apikey=IRf1McTms041EqaYu7WMVAtq6JuW4WQd";
    var url = api_url + city + api_key;
    */
   

    request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onreadystatechange= function(){
        if(request.readyState == 4 && request.status ==200){
            var result = request.response;
            events = JSON.parse(result);
            /*data for names of events are an located in an array of objects called events. each object has key "name" with value artist name*/
            event_array = events["_embedded"]["events"];

            /*populating arrays*/
            event_array.forEach(function(item){
                array_Artists.push(item["name"]);
                array_Genre.push(item["classifications"]["0"]["genre"]["name"]);
                array_Venue.push(item["_embedded"]["venues"]["0"]["name"]);
                array_Date.push(item["dates"]["start"]["localDate"]);

            })


        /*creating JSON objects
         - objects are in JSON form and cannot be converted
        */


        var temp;
        for (var i = 0; i<array_Artists.length; i++){
            temp = {"artist":array_Artists[i], "genre":array_Genre[i],"venue":array_Venue[i], "date":array_Date[i]};

            results.push(temp);
        }
        console.log(results);


        /*displaying information*/
        document.getElementById("data").innerHTML=array_Artists + array_Genre + array_Date + array_Venue;

        }else if (request.readyState == 4 && request.status!= 200){
            document.getElementById("data").innerHTML="Error";
        }
    }
    request.send();

    setTimeout(function(){ build_table();}, 1000);
}

/* gets user input and passes into URL */
function getInput () {
  var input = document.formInput.city.value;
  return input;
}


/* TEST */
function tableContent()
{
    var dataTable = document.getElementById("table");
    dataTable.style.fontFamily="Tahoma, Geneva, sans-serif";
    dataTable.style.bordercolor="red";
}



/*building table*/

function build_table(){
var storedData = results;
var cols = [];
/*pushing all keys to an array to make headers*/
for(var i=0; i<storedData.length; i++){
    for(var k in storedData[i]){
            console.log(k, "k")
        if (cols.indexOf(k) === -1){
            cols.push(k);
        }
    }
}

/*creating table element*/
var table = document.createElement("table");

/*creating table row element of table*/
var tr = table.insertRow(-1);

for(var i = 0; i<cols.length; i++){
    /*creating table headers*/
    var theader = document.createElement("th");
    theader.innerHTML = cols[i];

    /*appending keys(column name) to table row*/
    tr.appendChild(theader);
    console.log(theader);

}

console.log(table);
/*adding information to the table*/
for (var i = 0; i<storedData.length; i++){
    //create a new row//
    trow = table.insertRow(-1);
    for (var j = 0; j<cols.length; j++){
        var cell = trow.insertCell(-1);
        /*inserting cells at particular place*/
        cell.innerHTML=storedData[i][cols[j]];
    }
}

//adding table to document//
var tempTable = document.getElementById("table");
tempTable.innerHTML = "";
tempTable.appendChild(table);
console.log(table);


}
