const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

var registrationCodeIsVerified = false;
var emailVerified = false;
var originalEmailVerificationCode = '';
var clickOnCode=true;

//function to check if registration code input is empty
function verifyRegitrationCode() {
  var registration_code = document.getElementById('registration_code').value;
  var userMobile = document.getElementById('userMobile').value;

  if (aeEmpty(registration_code)) {
    showToast(
      'aeToastE',
      'Enter Registration Code',
      'Enter Registration Code',
      '10'
    );
    return true;
  }
  if (aeEmpty(userMobile)) {
    showToast('aeToastE', 'Enter Mobile Number', 'Enter Mobile Number', '10');

    return true;
  }

  checkRegCode(registration_code, userMobile);
}

// similar function to check email address
function sendEmailVerificationCode() {
  showSpin(1);
  
  var email = document.getElementById('email1').value;
  if (aeEmpty(email)) {
    showToast('aeToastE', 'Enter Email Address', 'Enter Email Address', '10');
    hideAllSpin();
    return true;
  }

  originalEmailVerificationCode = getOTP();

  $.ajax({
    type: 'post',
    data: {
      email: email,
      code: originalEmailVerificationCode
    },
    cache: false,
    url: 'sendEmailVerificationCode.php',
    dataType: 'text',
    success: function (data, status) {

     // alert(data);
      hideAllSpin();

      if (data == '1') {
        showToast(
          'aeToastS',
          'Email Verification Code Sent',
          'Email Verification Code Sent To Your Email Address get it to veriy your  address',
          '20'
        );
       
      } else  {
        showToast(
          'aeToastE',
          'Invalid Email Address',
          'Your Email Address May be Invalid',
          '20'
        );
      
 
      }
    },
    error: function (xhr, status, error) {
      hideAllSpin();
      showToast(
        'aeToastE',
        'Invalid Code',
        'Your Code May be Invalid or Expired',
        '20'
      );
    },
  });
}

function checkRegCode(registration_code, userMobile) {
  showSpin(1);

  $.ajax({
    type: 'post',
    data: {
      code: registration_code,
      mobile: userMobile,
    },
    cache: false,
    url: 'checkRegCode.php',
    dataType: 'text',
    success: function (data, status) {
      hideAllSpin();

      if (data == '1') {
        //set the text on the button to verified.
        document.getElementById('verify_regCode').innerText = 'Verified';
        registrationCodeIsVerified = true;
        showToast("aeToastS", "Registration Code Verified", "Registration Code Verified", "20");
        


      } else if (data == '0') {
        showToast(
          'aeToastE',
          'Invalid Code',
          'Your Code May be Invalid or Expired',
          '20'
        );
        //set the text on the button to verified.
        document.getElementById('verify_regCode').innerText = 'Verify';
      }
    },
    error: function (xhr, status, error) {
      hideAllSpin();
      showToast(
        'aeToastE',
        'Invalid Code',
        'Your Code May be Invalid or Expired',
        '20'
      );
    },
  });
}

function setVerifiedCodeFalse(){
  registrationCodeIsVerified = false;
  document.getElementById('verify_regCode').innerText = 'Verify';
}

function verifyEmaiCode(){

  // che if  emtpy
  var emailVerificationCode = document.getElementById('tbVerify_email_Code').value;
  if (aeEmpty(emailVerificationCode)) {
    showToast(
      'aeToastE',
      'Enter Email Verification Code',
      'Enter Email Verification Code',
      '10'
    );
    return false;
    }

 if (aeEmpty(originalEmailVerificationCode)) {
    showToast(
      'aeToastE',
      'Click On Code button!',
      'Click On Code To get Your Email Verification Code',
      '10'
    );

    return
  }

    // compare to originalEmailVerificationCode
    if (emailVerificationCode != originalEmailVerificationCode) { 
      showToast(
        'aeToastE',
        'Invalid Code',
        'Your Code May be Invalid or Expired',
        '20'
      );

      return
    }
    else {
      showToast(
        'aeToastS',
        'Email Verification Code Verified',
        'Your Email Verification Code is Verified',
        '20'
      );
      emailVerified =true;
      // change the text of the button to verified btVerifyEmailCode 
      document.getElementById('btVerifyEmailCode').innerText = 'Verified';
    
    

  }

}

function setVarifiedEmailFalse()

{


  document.getElementById('btVerifyEmailCode').innerText = 'Verify';

  if (emailVerified) {
    emailVerified = false;
    originalEmailVerificationCode ="";
}
}


// qquer structure to submit the form
$(document).ready(function () {
  $("#form2").submit(function (e) {
    e.preventDefault();
    if (registrationCodeIsVerified == false) {
      showToast(
        'aeToastE',
        'Verify Registration Code',
        'Verify Registration Code',
        '10'
      );
      return;
    }

    var userMail = document.getElementById('email1').value;
    if (aeEmpty(userMail)) {
    }
    else{

      if (emailVerified == false) {
        showToast(
          'aeToastE',
          'Verify Email ',
          'Verify Your Email ',
          '10'
        );
        return;
      }
  
    }


var username=document.getElementById('regUserName').value; 
var password=document.getElementById('regPassword').value;
var confrmPassword=document.getElementById('regConfrmPassword').value;

if(aeEmpty(username)){
  showToast('aeToastE','Enter Username','Enter Username','10');
  return;
}
else if(aeEmpty(password)){
  showToast('aeToastE','Enter Password','Enter Password','10');
  return;
}

// check length of password

else if(password.length<8){
  showToast('aeToastE','Password Must Be 8 Characters Long','Password Must Be 8 Characters Long','10');
  return;
}

else if(aeEmpty(confrmPassword)){
  showToast('aeToastE','Enter Confirm Password','Enter Confirm Password','10');
  return;
}

if(password!=confrmPassword){
  showToast('aeToastE','Password Do Not Match','Password Not Match','10');
  return;

}

saveDataToServer(password,username);

// send the form data to the server



});
});

function saveDataToServer(password,username) {
  showSpin(1);
  var mobile =document.getElementById('userMobile').value;
  var email = document.getElementById('email1').value;
  var mobile =document.getElementById('userMobile').value;
  var email = document.getElementById('email1').value;
  var code = document.getElementById('registration_code').value;

  if(aeEmpty(mobile)){
    showToast('aeToastE','Enter Mobile Number','Enter Mobile Number','10');
    return;
  }
  else if(aeEmpty(email)){
   email = "Not Available";
  }



  $.ajax({
    type: "post",
    data: {
      username: username,
      password: password,
      email: email,
      mobile: mobile,
      code: code
    },
    cache: false,
    url: "saveNewUserRegistrationData.php",
    dataType: "text",
    success: function (data, status) {
      hideAllSpin();

      if  (data == '1') {
        showToast("aeToastS", "Registration Success", "Registration Success", "20");
       
      }
      else if (data == '5') {
        showToast("aeToastE", "Username Not Available", "Username Not Available", "20");
      }
      else if (data == '6') {
        showToast("aeToastE", "Your Email Is Already Registered", "Your Email Is Already Registered", "20");
      }
      else if (data == '7') {
        showToast("aeToastE", "Your Mobile Number Is Already Registered", "Your Mobile Number Is Already Registered", "20");
      }


      

    },
    error: function (xhr, status, error) {
      // alert(error);
    },
  });
}
















function showToast(toastID, title, message, positionInPercentage) {
  //   showToast( "aeToastE","new Toast","toast","20");
  //change to the toast Id to toastID
  var toast = document.getElementById(toastID);

  // change titlte of the toast to the message
  //check if the title is not null
  if (title != null) {
    toast
      .getElementsByClassName('toast-header')[0]
      .getElementsByTagName('strong')[0].innerText = title;
  }

  //check if the message is not null
  if (message != null) {
    toast.getElementsByClassName('toast-body')[0].innerText = message;
  }

  toast.style.position = 'fixed';

  if (positionInPercentage != null) {
    toast.style.top = positionInPercentage + '%';
  }
  toast.style.left = '50%';
  toast.style.transform = 'translate(-50%, -50%)';
  toast.style.zIndex = '99999';
  var toast = new bootstrap.Toast(toast);
  toast.show();
}


