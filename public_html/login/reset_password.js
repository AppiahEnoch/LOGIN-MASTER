$(document).ready(function () {
    $("#form3").submit(function (e) {
      e.preventDefault();
      validateAll();
});
});




function validateAll() {
    var old_username = document.getElementById("reset_old_username").value;
    var old_password = document.getElementById("reset_old_password").value;
    var new_username = document.getElementById("reset_new_username").value;
    var new_password = document.getElementById("reset_new_password").value;
    var confirm_password = document.getElementById("reset_confirm_password").value;
  
    if (old_username == "" || old_password == "" || new_username == "" || new_password == "" || confirm_password == "") {
     showToast("aeToastE", "Fill all fields", "Fill all fields", "10");
      return false;
    } 
  
  
    if(new_password != confirm_password){
      showToast("aeToastE", "New Passwords do not match", "New Passwords do not match Confirm", "10");
       return false;
     }

     // check length of password
     if(new_password.length < 8){
      showToast("aeToastE", "Password too Short", "Password must be at least 8 characters", "10");
       return false;
     }

  
     reset_password(old_username, old_password, new_username, new_password, confirm_password)
     
  }
  
  
  
  
  
  
  
  
  function reset_password(old_username, old_password, new_username, new_password, confirm_password) {
    $.ajax({
      type: "post",
      data: {
        old_username:old_username,
        old_password:old_password,
        new_username:new_username,
        new_password:new_password,
      },
      cache: false,
      url: "reset_password.php",
      dataType: "text",
      success: function (data, status) {
        //alert(data)
       if(data=="0") {
        showToast("aeToastE", "Old Password is incorrect", "Old Password is incorrect", "10");
       }
       else if(data=="1") {
        showToast("aeToastS", "Reset successful", "Login Details Reset is successful", "10");
       }
       else{
        showToast("aeToastE", "Error", "Error", "10");
       
       }

      },
      error: function (xhr, status, error) {
        alert(error);
      },
    });
  } 
  