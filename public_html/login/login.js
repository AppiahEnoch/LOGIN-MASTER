$(document).ready(function () {
  $('#form1').submit(function (e) {
    e.preventDefault();
    var username = document.getElementById('login_username').value;
    var password = document.getElementById('login_password').value;

    if (aeEmpty(username) || aeEmpty(password)) {
      showToast('aeToastE', 'Fill all fields', 'Fill all fields', '10');
      return false;
    }

    validateLogin(username, password);
  });
});

function validateLogin(username, password) {
  showSpin(3);
  $.ajax({
    type: 'post',
    data: {
      username: username,
      password: password,
    },
    cache: false,
    url: 'validate_login.php',
    dataType: 'text',
    success: function (data, status) {
      hideAllSpin()

      if (data == 1) {

        window.location='../admin/admin.html'
  
    


      } 
      
      else if (data == 2) {
        showToast('aeToastS', 'User 1', 'Login Successful', '10');

      }
      
      else {
        showToast(
          'aeToastE',
          'Invalid username or password',
          'Invalid username or password',
          '10'
        );
      }
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
}
