$(document).ready(function() {
    $("#CreateAccount").validate({
      rules: {
            username: {
                required: true,
                minlength: 7
            },
            email: {
                required: true,
                minlength: 7
            },
            password: {
                required: true,
                minlength: 7
            },
            confirm: {
                required: true,
                minlength: 7,
                equalTo: "#password"
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
          email: {
            required: "Please enter your mail!",
            minlength: "At least 7 characters!"
        },
        confirm: {
            required: "Please confirm your password!",
            minlength: "At least 7 characters!",
            equalTo: "Please confirm your password"
        },
      },
      submitHandler: function(form) {
      var username = $('#username').val();
      var password = $('#password').val();
      var email = $('#email').val();
      //let =  have Block Scope
      // console.log(data_to_server);
      $.ajax({
        type: 'POST',
        url: 'src/php/register.php',
        //data: data_to_server,   // data = specifică datele care urmează să fie trimise către server
        data:{
            username: username,
            password: password,
            email: email
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