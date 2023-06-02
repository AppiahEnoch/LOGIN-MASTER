const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// globals
var code_length = 8;
var user_level = 1;


$(document).ready(function () {
  $('#registrationForm').submit(function (e) {
    e.preventDefault();
    user_level = 1;
    code_length = 8;
    document.getElementById('spinner-container').style.display = 'flex'; // Hide spinner

    // check the button user clicked on
    var button_clicked = $(this).find('button[type=submit]:focus');
    var button_text = button_clicked.text();
    var button_id = button_clicked.attr('id');
    if (button_text == 'Admin code') {
      code_length = 15;
      user_level = 0;
    }

    send_code();
  });
});

function copy_code() {
  //check if the input field is empty
  if (document.getElementById('gen_code').value == '') {
    return;
  }
  var copyText = document.getElementById('gen_code');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  //change icon to check

  var copy_icon = document.getElementById('copy_icon');
  copy_icon.classList.remove('bi-clipboard');
  copy_icon.classList.add('bi-check2-circle');
  copy_icon.style.color = '#0000ff';
  copy_icon.style.cursor = 'default';

  const genCodeInput = document.getElementById('gen_code');
  genCodeInput.select();
  genCodeInput.setSelectionRange(0, genCodeInput.value.length);

  navigator.clipboard
    .writeText(genCodeInput.value)
    .then(() => {
      // Text copied successfully

      // Update tooltip using plain JavaScript
      document
        .getElementById('copy_icon')
        .setAttribute('data-bs-original-title', 'Copied');
      // Show tooltip using plain JavaScript
      const tooltip = bootstrap.Tooltip.getInstance(
        document.getElementById('copy_icon')
      );
      tooltip.show();
      // Update tooltip using jQuery
    })
    .catch((error) => {
      // Failed to copy text to clipboard
      console.error('Error copying text: ', error);
    });
}
// funtion to reset the icon  and tooltip
function reset_icon() {
  var copy_icon = document.getElementById('copy_icon');
  copy_icon.classList.remove('bi-check2-circle');
  copy_icon.classList.add('bi-clipboard');
  copy_icon.style.color = '#000000';
  copy_icon.style.cursor = 'pointer';
  // Update tooltip using plain JavaScript
  document
    .getElementById('copy_icon')
    .setAttribute('data-bs-original-title', 'Copy to clipboard');
  // Show tooltip using plain JavaScript
  const tooltip = bootstrap.Tooltip.getInstance(
    document.getElementById('copy_icon')
  );
}

//function to send email, mobile and code to php file
function send_code() {
  reset_icon();
  generate_code(code_length);

  var email = document.getElementById('gen_code_email').value;
  var mobile = document.getElementById('gen_code_mobile').value;
  var code = document.getElementById('gen_code').value;

  // check if  any of the input field is empty
  if (email == '' || mobile == '') {
    return;
  }

  $.ajax({
    type: 'POST',
    data: {
      email: email,
      mobile: mobile,
      code: code,
      user_level: user_level,
    },
    url: 'send_registration_code.php',
    dataType: 'text',
    success: function (response) {
      document.getElementById('spinner-container').style.display = 'none'; // Hide spinner
      if (response == '1') {
        showToast(
          'aeToastS',
          'Congratulations!',
          'Code has been sent to your email. ',
          '20'
        );
      }
    },
    //show error message
    error: function (response) {
      document.getElementById('spinner-container').style.display = 'none'; // Hide spinner
      var message = response.responseText;
      alert(message);

      showToast('aeToastE', 'Error!', 'Code has not been sent. ', '20');
    },
  });
}

// funtion to generate random code with mixture of different characters only numbers and letters
function generate_code(code_length) {
  var code = '';
  var possible = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789';
  for (var i = 0; i < code_length; i++)
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  document.getElementById('gen_code').value = code;
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

$(document).ready(function () {

      // set label text to file name
      $('#groupCode').on('change', function () {
        var fileName = $(this).val().split('\\').pop();
        $('#lbGroupCode').text(fileName);
      });



  $('#btgroupCode').click(function () {
    var fileInput = document.getElementById('groupCode');
    //check if the file is not empty
    if (fileInput.files.length === 0) {
      showToast('aeToastE', 'Error!', 'Please select a file.', '20');
      return;
    }

    var file = fileInput.files[0];
    var fileSize = file.size / 1024 / 1024; // size in MB
    var fileType = file.type;

    if (
      fileType ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      fileSize <= 3
    ) {
      var formData = new FormData();
      formData.append('groupCode', file);

      document.getElementById('spinner-container').style.display = 'flex'; // Show spinner
  
      


 

      $.ajax({
        url: 'generateCodes_from_Excel.php',
        type: 'POST',
        data: formData,
        processData: false, // Important!
        contentType: false,
        success: function (data) {
          document.getElementById('spinner-container').style.display = 'none'; // Hide spinner
          if (isNumber(data)){
            if (data==0){
              showToast('aeToastE', 'Error!', 'Please select a valid file.', '20');
        
          }
          else {
          //  var myInt=parseInt(data);

            showToast('aeToastS', 'Success! ', data+' Codes have been Sent to the given Emails Successfully.', '20');
          }

        }
  

      
        },
        error: function (xhr, status, error) {
          document.getElementById('spinner-container').style.display = 'none'; // Hide spinner
          console.error('An error occurred: ', error);
        },
      });
    } else {
      if (fileSize > 3) {
        showToast(
          'aeToastE',
          'Error!',
          'The file must be less than 3MB.',
          '20'
        );
      }

      if (
        fileType !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        showToast('aeToastE', 'Error!', 'The file must be a .xlsx file.', '20');
      }
    }
  });
});

function toggleCodeWrapper() {
  var codeWrapper = document.getElementById("codeWrapper");
  var blankspace = document.getElementById("blankSpace");
  if (codeWrapper.style.display === "none") {
      codeWrapper.style.display = "block";
      blankspace.style.display = "none";
  } else {
      codeWrapper.style.display = "none";
      blankspace.style.display = "block";
  }
}