var autofill = {
  
  client : null,
  Initialize : function(_client) {
    client = _client;
    $('.AUTOFILL').each( function () {

      // For each autofill object, replace the name of the connection
      // with an actual connection.
      $( this ).data("collection", mongo.db.collection($( this ).data(collection)));    
      $( this ).on('input', function () {
        var value = $( this ).val();
        if (value >= 2) {
          console.log($( this ).data("collection"));
        }
      })
    });
  }

}




