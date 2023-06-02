$(document).ready(function () {
    $("#form4").submit(function (e) {
        e.preventDefault();

        var email = $("#forgot_password").val();
            if(aeEmpty(email))
        {
            showToast("aeToastE", "Enter Your Email", "Enter Your Email", "10");
            return;
        }

    
        sendPassword(email);


    });
    });



function sendPassword(email) {
    showSpin(2)
    $.ajax({
      type: "post",
      data: {
        email: email,
        
      },
      cache: false,
      url: "send_password.php",
      dataType: "text",
      success: function (data, status) {
        hideAllSpin();

        if(data==1){
            showToast("aeToastS", "Password Sent", "Password Sent", "10");
        }
        else if(data==0){
            showToast("aeToastE", "Unkwown Email", "Your Email is not registered in the System", "10"); 
        }
        else{
            showToast("aeToastE", "Unkwown Error", "Unknown Error", "10");
        }
      },
      error: function (xhr, status, error) {
        alert(error);
      },
    });
  }