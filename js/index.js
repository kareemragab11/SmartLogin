// ===================== Variables =====================
var logInEmail = document.getElementById("logInEmail");
var logInPassword = document.getElementById("logInPassword");
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPass = document.getElementById("signUpPass");
var warrning = document.getElementById("warrning");

var emailRegex = /^[a-z0-9_]{3,20}@(gmail|yahoo|hotmail)\.(com|net)$/;
var nameRegex = /^[A-Z][a-z0-9_]{3,15}$/;
var data = [];

// ===================== Load Saved Users =====================
if (localStorage.getItem("allData") != null) {
  data = JSON.parse(localStorage.getItem("allData"));
} else {
  data = [];
}

// ===================== Page Protection =====================
// Prevent access to smartlogin.html if not logged in
if (window.location.pathname.includes("smartlogin.html") && !localStorage.getItem("sessionUsername")) {
  window.location.href = "./../index.html"; // back to login
}

// Show welcome name on smartlogin.html
if (document.getElementById("welcome")) {
  document.getElementById("welcome").innerText = `Welcome ${localStorage.getItem("sessionUsername")}`;
}

// ===================== Functions =====================

// Show warning text
function showWarning(message) {
  warrning.innerText = message;
  warrning.classList.remove("d-none");
}

// ===================== SIGN UP =====================
function signup() {
  if (signUpName.value.trim() != "" && signUpEmail.value.trim() != "" && signUpPass.value.trim() != "") {
    if (nameRegex.test(signUpName.value.trim())) {
      if (emailRegex.test(signUpEmail.value.trim())) {
        if (!data.some(user => user.signEmail.toLowerCase() === signUpEmail.value.trim().toLowerCase())) {
          var signupData = {
            signName: signUpName.value.trim(),
            signEmail: signUpEmail.value.trim(),
            signPass: signUpPass.value.trim()
          };
          data.push(signupData);
          saveToLocalStorage();
          clearInputs();
          window.location.href = "./../index.html"; // ✅ after sign up go to login
        } else {
          showWarning("⚠️ This Email already exists, try another one");
        }
      } else {
        showWarning("⚠️ Enter a valid email (example@gmail.com)");
      }
    } else {
      showWarning("⚠️ Name must start with a capital letter");
    }
  } else {
    showWarning("⚠️ Fill all fields before continuing");
  }
}

// ===================== LOGIN =====================
function login() {
  if (logInEmail.value.trim() != "" && logInPassword.value.trim() != "") {
    var loginData = {
      logEmail: logInEmail.value.trim(),
      logPass: logInPassword.value.trim()
    };

    var storedData = JSON.parse(localStorage.getItem("allData")) || [];
    var user = storedData.find(u => u.signEmail.toLowerCase() === loginData.logEmail.toLowerCase());

    if (!user) {
      showWarning("⚠️ The email you entered does not exist");
    } else if (user.signPass !== loginData.logPass) {
      showWarning("⚠️ The password you entered is incorrect");
    } else {
      localStorage.setItem("sessionUsername", user.signName);
      window.location.href = "./pages/smartlogin.html"; // ✅ correct path to welcome page
    }
    clearInputs();
  } else {
    showWarning("⚠️ Fill all fields before continuing");
  }
}

// ===================== SAVE USERS =====================
function saveToLocalStorage() {
  localStorage.setItem("allData", JSON.stringify(data));
}

// ===================== CLEAR INPUTS =====================
function clearInputs() {
  if (logInEmail) logInEmail.value = "";
  if (logInPassword) logInPassword.value = "";
  if (signUpName) signUpName.value = "";
  if (signUpEmail) signUpEmail.value = "";
  if (signUpPass) signUpPass.value = "";
}

// ===================== LOGOUT =====================
function logout() {
  localStorage.removeItem("sessionUsername");
  window.location.href = "./../index.html"; // ✅ back to login page
}
