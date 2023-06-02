
function myAjax1() {
    $.ajax({
      type: "post",
      data: {
        id: id,
      },
      cache: false,
      url: "",
      dataType: "text",
      success: function (data, status) {
        //alert(data);
      },
      error: function (xhr, status, error) {
        // alert(error);
      },
    });
  }
  
  function sendFile() {
  var formData = new FormData();
  formData.append("myfile", document.getElementById("myfile").files[0]);
  
  $.ajax({
  type: "post",
  cache: false,
  url: "updateGESlist.php",
  data: formData,
  processData: false,
  contentType: false,
  success: function (data, status) {
  // handle the success response here
  },
  error: function (xhr, status, error) {
  // handle the error response here
  }
  });
  }
  
  
  
  
  function getInput() {
    email = $("#tf_email").val();
    mobile = $("#tf_mobile").val();
    ghanaCard = $("#tf_ghanaCard").val();
  
    email = trimV(email);
    mobile = trimV(mobile);
    ghanaCard = trimV(ghanaCard);
  }
  
  function validate_mobile_g(mobile) {
    var phoneRe = /^[0-9]{10}$/;
    var digits = mobile.replace(/\D/g, "");
    return phoneRe.test(digits);
  }
  
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
  function aeEmpty(e) {
    var ee = "";
    try {
      ee = e.trim();
    } catch (error) {
      return true;
    }
    try {
      switch (e) {
        case "":
        case 0:
        case "0":
        case null:
        case false:
        case undefined:
          return true;
        default:
          return false;
      }
    } catch (error) {
      return true;
    }
  }
  
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  
  function showErrorText(message) {
    $("#error_message").text(message);
    $("#error_message").show();
  }
  
  function hideErrorText() {
    $("#error_message").text("");
    $("#error_message").hide();
  }
  


  function showSpin(number) {
    var spinnerID = "#spin" + number;
  
    if ($(spinnerID).hasClass("d-none")) {
      $(spinnerID).removeClass("d-none");
    }
    $(spinnerID).show();
  }

  function hideSpin(number) {
    var spinnerID = "#spin" + number;
    if (!$(spinnerID).hasClass("d-none")) {
      $(spinnerID).addClass("d-none");
    }
    $(spinnerID).hide();
  }

  function hideAllSpin() {
    for (var i = 1; i <= 10; i++) {
      hideSpin(i);
    }
  }
  
  
  function openPage_blank(url) {
    window.open(url, "_blank");
  }
  function openPage(url) {
    window.open(url);
  }
  
  function showAEMsuccess(aeBody,aeTitle) {
    if (!aeEmpty(aeTitle)) {
      $("#aeAlertTitle").text(aeTitle);
    }
  
    if (!aeEmpty(aeBody)) {
      $("#aeAlertBody").text(aeBody);
    }
    $("#aeMsuccess").modal("show");
  }
  
  function showAEMsuccessw(aeBody, aeTitle) {
    if (!aeEmpty(aeTitle)) {
      $("#aeAlertTitlew").text(aeTitle);
    }
  
    if (!aeEmpty(aeBody)) {
      $("#aeAlertBodyw").text(aeBody);
    }
    $("#aeMsuccessw").modal("show");
  }
  
  
  
  
  
  
  
  function showAEMerror(aeBody, aeTitle) {
    if (!aeEmpty(aeTitle)) {
      $("#aeMerrorTitle").text(aeTitle);
    }
  
    if (!aeEmpty(aeBody)) {
      $("#aeMerrorBody").text(aeBody);
    }
    $("#aeMerror").modal("show");
  }
  
  function showMYesNo(aeBody) {
    if (!aeEmpty(aeBody)) {
      $("#aeMBody").text(aeBody);
    }
    $("#aeMyesNo").modal("show");
  }
  
  function passwordConfirm(a, b) {
    return a == b;
  }
  
  function trimV(a) {
    try {
      a = a.trim();
    } catch (error) {}
    return a;
  }
  
  function refreshPage() {
    location.reload();
  }
  
  function showCodeField() {
    $("#codeHide").show();
  }
  function hideCodeField() {
    $("#codeHide").hide();
  }
  
  function validateGhanaCard(ghanaCard) {
    if (aeEmpty(ghanaCard)) {
      return false;
    }
    ghanaCard = ghanaCard.toUpperCase();
    var i = ghanaCard.length;
  
    if (i < 8) {
      return false;
    }
  
    if (i > 20) {
      return false;
    }
  
    ii = ghanaCard.substring(0, 4);
  
    if (!passwordConfirm(ii, "GHA-")) {
      return false;
    }
  
    return true;
  }
  
  
  function openPageReplace(url){
    location.href = url;
  }
  
  
  function validatePassword(password) {
    var passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      var m =
          "must be at least 8 characters long " +
          " and contains at least one lowercase letter, one " +
          "uppercase letter, one number, and one special character";
  
    return passwordRegex.test(password);
  }
  
  
  
  
  
  function checkImageFileSize(id) {
    var file = document.getElementById(id).files[0];
    if (file.size > 1258291) {
      showAEMerror("FILE TOO LARGE");
  
      return false;
    }
    if (!file.type.startsWith("image/")) {
      showAEMerror("CHOOSE IMAGE FILE ONLY");
      return false;
    }
    return true;
  }
  
  function changeImageSRC(fileID, imageTagID) {
    var file = document.getElementById(fileID).files[0];
    document.getElementById(imageTagID).src = URL.createObjectURL(file);
  }
  
  
  
  
  function isFilePDF(fileId) {
  var input = document.getElementById(fileId);
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var size = file.size / 1024 / 1024; // size in MB
    var type = file.type;
  
    if (type !== "application/pdf") {
      aeModelTitle = "CHOOSE PDF ONLY";
      aeModelBody =
        "ONLY PDF FILES ARE ALLOWED";
  
  
      $("#aeMBody").text(aeModelBody);
      $("#aeMTitle").text(aeModelTitle);
      $("#aeModelPassive").modal("show");
  
      document.getElementById(fileId).value = "";
      return false;
      return false;
    } else if (size > 2) {
      aeModelTitle = "PICTURE SIZE TOO LARGE";
      aeModelBody =
        "Your picture size is too large." +
        "we can only accept pictures that are not more than 2mb";
  
      $("#aeMBody").text(aeModelBody);
      $("#aeMTitle").text(aeModelTitle);
      $("#aeModelPassive").modal("show");
      document.getElementById(fileId).value = "";
  
      return false;
      return false;
    } else {
      return true;
    }
  }
  }
  
  
  
  
  function isFileImage(fileId) {
  var input = document.getElementById(fileId);
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var size = file.size / 1024 / 1024; // size in MB
    var type = file.type;
    if (!type.startsWith("image")) {
  
      aeModelTitle = "ONLY IMAGE FILE ALLOWED";
      aeModelBody =
        "Please Choose Image File";
      $("#aeMBody").text(aeModelBody);
      $("#aeMTitle").text(aeModelTitle);
      $("#aeModelPassive").modal("show");
      document.getElementById(fileId).value = "";
   
      return false;
    } else if (size > 2) {
      aeModelTitle = "FILE TOO LARGE";
      aeModelBody =
        "Please Your file is too large";
      $("#aeMBody").text(aeModelBody);
      $("#aeMTitle").text(aeModelTitle);
      $("#aeModelPassive").modal("show");
      document.getElementById(fileId).value = "";
      return false;
    } else {
      return true;
    }
  }
  }
  
  function trimVariables(variablesArray) {
  for (let i = 0; i < variablesArray.length; i++) {
  variablesArray[i] = variablesArray[i].trim();
  }
  return variablesArray;
  }
  
  
  function updateImageSRC(inputFileId, imgTagId) {
  const inputFile = document.getElementById(inputFileId); // get the input file element by its ID
  const file = inputFile.files[0]; // get the first file in the input
  if (file) {
  const reader = new FileReader(); // create a FileReader object
  reader.onload = function() {
  const imgTag = document.getElementById(imgTagId); // get the img tag by its ID
  imgTag.src = reader.result; // set the src attribute of the img tag to the base64-encoded data URL of the selected file
  }
  reader.readAsDataURL(file); // read the selected file as a data URL
  }
  }
  
  
  function extractNumberFromString(str) {
  const match = str.match(/\d+/); // matches one or more digits
  return match ? parseInt(match[0]) : null; // convert the match to a number
  }
  
  function getSelectedText(selectId) {
    // Get a reference to the select element
    const select = document.getElementById(selectId);
  
    // Get the selected option
    const selectedOption = select.options[select.selectedIndex];
  
    // Get the selected text
    const selectedText = selectedOption.text;
  
    // Do something with the selected text
    return(selectedText);
  }
  
  
  function aeDownload(filePath) {
    const fileName = filePath.split("/").pop();
  
    // Create a new anchor element with the file path as the href attribute
    const link = document.createElement("a");
    link.href = filePath;
  
    // Set the download attribute to force download and specify the file name
    link.download = fileName;
  
  
    // Simulate a click on the anchor element
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  
                function showToast(toastID,title,message,positionInPercentage) {
              //   showToast( "aeToastE","new Toast","toast","20");
                  //change to the toast Id to toastID
                  var toast = document.getElementById(toastID);
  
                  // change titlte of the toast to the message
                  //check if the title is not null
                  if(title != null) {
                      toast.getElementsByClassName("toast-header")[0]
                      .getElementsByTagName("strong")[0].innerText = title;
                  }
              
                  //check if the message is not null
                  if(message != null) {
                      toast.getElementsByClassName("toast-body")[0].innerText = message;
                  }
  
                  toast.style.position = "fixed";
  
                  if(positionInPercentage != null) {
                      toast.style.top = positionInPercentage + "%";
                  }
                  toast.style.left = "50%";
                  toast.style.transform = "translate(-50%, -50%)";
                  toast.style.zIndex = "99999";
                  var toast = new bootstrap.Toast(toast);
                  toast.show();
              
              }
  

              function getOTP(length) {
                if(length == null) {
                  length = 6;
                }
                  var result           = '';
                  var characters       = '0123456789';
                  var charactersLength = characters.length;
                  for ( var i = 0; i < length; i++ ) {
                      result += characters.charAt(Math.floor(Math.random() * charactersLength));
                  
                  }
                  return result;
              }
  
  
  
  