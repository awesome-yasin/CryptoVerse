
$(document).ready(function () {
  
    // FETCHING DATA FROM JSON FILE
    $.getJSON("js/losers.json", 
            function (data) {
        var student = '';

        // ITERATING THROUGH OBJECTS
        $.each(data, function (key, value) {

            //CONSTRUCTION OF ROWS HAVING
            // DATA FROM JSON OBJECT
            student += '<tr>';
            student += '<td class = "loser">' + 
                value.name + '</td>';

            student += '<td class = "loser">' + 
                value.volume + '</td>';

            student += '<td class = "loser">' + 
                value.price + '</td>';

            student += '<td class = "loser">' + 
                value.change + '</td>';

            student += '</tr>';
        });
          
        //INSERTING ROWS INTO TABLE 
        $('#loser-table').append(student);
    });
    
});