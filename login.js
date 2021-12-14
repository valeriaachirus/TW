$(document).ready(function() {
  $("#loginForm").validate({
    rules: {
          username: {
              required: true,
              minlength: 7
          },
          password: {
              required: true,
              minlength: 7
          },
    },
    messages: {
        username: {
            required: "Please enter your name!",
            minlength: "At least 7 characters!"
        },
        password: {
            required: "Please enter your password!",
            minlength: "At least 7 characters!"
        },
        
    },
    submitHandler: function(form) {
        // Metoda serialize() creează un șir de text codificat URL prin serializarea valorilor de formular.
        // Valorile serializate pot fi utilizate în șirul de interogare URL atunci când se face un request AJAX.
      //let data_to_server = $("#loginForm").serialize();
      var username = $('#username').val();
      var password = $('#password').val();
      //let =  have Block Scope
      // console.log(data_to_server);
      $.ajax({
        type: 'POST',
        url: 'src/php/register_insert.php',
        //data: data_to_server,   // data = specifică datele care urmează să fie trimise către server
        data:{
            username: username,
            password: password
        },
        cache: false,
        success: function(result){ //eveniment AJAX
            // O funcție care trebuie apelată dacă cererea reușește. Funcția primește datele returnate de la server
            var rezultat = JSON.parse(result);
            //Metoda JSON.parse() parsează un șir JSON, construind valoarea sau obiectul JavaScript descris de șir.
            if (rezultat.statusCode == 200){
                console.log("Success");
                $('#logged_in_id').show();
                setTimeout(function(){
                $('#logged_in_id').hide();
                },3000);

            }
            else if (rezultat.statusCode == 201) {
                console.log("Validation_Fail");
                
            }
        }
      })
    }
   });
});