

function togglePasswordVisibility(passwordId, toggleId) {
  const togglePassword = document.querySelector(`#${toggleId}`);
  const password = document.querySelector(`#${passwordId}`);

  // Toggle the type attribute
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // Toggle the eye icon
  togglePassword.classList.toggle('fa-eye');
  togglePassword.classList.toggle('fa-eye-slash');
}




function hideWrapper(wrapperId) {
  var wrappers = document.querySelectorAll("#wrapper1,#wrapper2, #wrapper3, #wrapper4");
  Array.prototype.forEach.call(wrappers, function(wrapper) {
    wrapper.classList.add("d-none");
  });
  
  var w1 = document.querySelector("#" + wrapperId);
  if (w1) {
    w1.classList.remove("d-none");
  }
}



