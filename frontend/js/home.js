$(document).ready(function(){
    $.ajax({
        crossOrigin: true,
        url:"http://localhost:300/users/1",
        method: "GET",
        dataType : "json",
    })
    .done(function(response){
        let data = JSON.stringify(response);
        console.log(data);
    })
    .fail(function(error){
        let erreur = JSON.stringify(error);
        console.log(erreur);
    })
});