/*

        <!-- warpper3  RESET PASSWORD PAGE-->
        <div id="wrapper3" class="col">
          <form
            id="form3"
            class="row g-1 d-flex align-items-center justify-content-center m-auto mt-2"
          >
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">
                <i class="fa fa-user-circle" aria-hidden="true"></i
              ></span>
              <input
                type="password"
                class="form-control"
                id="reset_old_username"
                placeholder="Old username"
              />
              <span class="input-group-text">
                <i
                  onclick=" togglePasswordVisibility('reset_old_sername', 'togglereset_old_username')"
                  class="far fa-eye"
                  id="togglereset_old_username"
                  style="cursor: pointer"
                ></i>
              </span>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="basic-addon1"
                ><i class="bi bi-file-lock2-fill"></i
              ></span>

              <input
                type="password"
                class="form-control"
                id="reset_old_password"
                placeholder="Old password"
              />
              <span class="input-group-text">
                <i
                  onclick=" togglePasswordVisibility('reset_old_password', 'toggle_reset_old_password')"
                  class="far fa-eye"
                  id="toggle_reset_old_password"
                  style="cursor: pointer"
                ></i>
              </span>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">
                <i class="fa fa-user-circle" aria-hidden="true"></i
              ></span>
              <input
                type="password"
                class="form-control"
                id="reset_new_username"
                placeholder="New Username"
              />
              <span class="input-group-text">
                <i
                  onclick=" togglePasswordVisibility('reset_new_username', 'toggle_reset_new_username')"
                  class="far fa-eye"
                  id="toggle_reset_new_username"
                  style="cursor: pointer"
                ></i>
              </span>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span>

              <input
                type="password"
                class="form-control"
                id="reset_new_password"
                placeholder="New Password"
              />
              <span class="input-group-text">
                <i
                  onclick=" togglePasswordVisibility('reset_new_password', 'toggle_reset_new_password')"
                  class="far fa-eye"
                  id="toggle_reset_new_password"
                  style="cursor: pointer"
                ></i>
              </span>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
              <input
                type="password"
                class="form-control"
                id="reset_confirm_password"
                placeholder="Confirm Password"
              />
              <span class="input-group-text">
                <i
                  onclick=" togglePasswordVisibility('reset_confirm_password', 'toggle_reset_confirm_password')"
                  class="far fa-eye"
                  id="toggle_reset_confirm_password"
                  style="cursor: pointer"
                ></i>
              </span>
            </div>

            <div class="col-12">
              <button id="btReset" type="button" class="btn btn-primary">
                Continue
              </button>
            </div>

            <div class="col-12 mt-1">
              <div id="wrapper-col-6" class="row">
                <div class="col-6">
                  <a onclick="hideWrapper('wrapper2')" href="#"><i class="bi bi-journal-check"></i> Register</a>
                </div>
                <div class="col-6">
                  <a onclick="hideWrapper('wrapper4')" href="#">
                    <i  class="bi bi-emoji-angry-fill"></i> forgot password</a
                  >
                </div>
                <div class="col-6">
                  <a onclick="hideWrapper('wrapper1')" href="#">
                    <i class="fa fa-key" aria-hidden="true"></i>
                    Login</a
                  >
                </div>

                <div class="col-6">
                  <a href="../../../index.html"> <i class="bi bi-house-add-fill"></i>Go Back</a>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="row">
                <div class="col-12 text-center">
                  <div
                    style="color: blue"
                    class="spinner-border d-none"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="toast-container position-fixed top-0 p-3">
              <div
                id="liveToast"
                class="toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div class="toast-header">
                  <strong class="me-auto">Unknown Username or Password</strong>
                  <small> <i class="fa fa-lock" aria-hidden="true"></i></small>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="toast-body">
                  Your username or password is not registered.
                </div>
              </div>
            </div>
          </form>
        </div>
     <!-- END warpper3  RESET PASSWORD PAGE-->

        showToast('aeToastE', 'Enter Mobile Number', 'Enter Mobile Number', '10');

*/


// validate all input fields

function validateAll() {
  var old_username = document.getElementById("reset_old_username").value;
  var old_password = document.getElementById("reset_old_password").value;
  var new_username = document.getElementById("reset_new_username").value;
  var new_password = document.getElementById("reset_new_password").value;
  var confirm_password = document.getElementById("reset_confirm_password").value;

  if (old_username == "" || old_password == "" || new_username == "" || new_password == "" || confirm_password == "") {
   showToast("aeToastE", "Fill all fields", "Fill all fields", "10");
    return false;
  } else {
    return true;
  }


  if(new_password != confirm_password){
    showToast("aeToastE", "New Passwords do not match", "New Passwords do not match Confirm", "10");
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
      alert(data);
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
} 




$(document).ready(function () {
  $("#form1").submit(function (e) {
    var username = document.getElementById("login_username").value
    var password = document.getElementById("login_password").value

    if(aeEmpty(username) || aeEmpty(password)){
      showToast("aeToastE", "Fill all fields", "Fill all fields", "10");
      return false;
    }

    


    // check if login_username is empty

  


    e.preventDefault();

  });
});



function validateLogin(username, password) {
  $.ajax({
    type: "post",
    data: {
      username: username,
      password: password,
    },
    cache: false,
    url: "validate_login.php",
    dataType: "text",
    success: function (data, status) {
      alert(data);
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
} 
 