
const button_login = document.getElementById("login_btn_id");
button_login.addEventListener('click', function(e){
    console.log('login');
    const userElement = document.getElementById('floatingInput');
    const passwordElement = document.getElementById('floatingPassword');
    console.log();
    console.log();

    $.ajax({
        url: "https://semproj2.theosim.com/wp-json/jwt-auth/v1/token",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "username": userElement.value,
            "password": passwordElement.value,
        }),
        error: function(err) {
          alert('Failed to Login');
        },
        success: function(data) {
          // console.log("Success!");
          // console.log(data.token);
          localStorage.setItem('token', data.token);
          window.location.replace("http://localhost:8000/index.html");
        }
      });


});