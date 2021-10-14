var userName = document.getElementById("name");
var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");
var signup = document.getElementById("signup");

var invalidAlert = document.getElementById("invalidAlert");
var alreadyExist = document.getElementById("alreadyExist");

var loginBtn = document.getElementById("loginBtn");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");

var correction = document.getElementById("correction");

var nameSignupAlert = document.getElementById("nameSignupAlert");
var emailSignupAlert = document.getElementById("emailSignupAlert");
var passwordSignupAlert = document.getElementById("passwordSignupAlert");

var welcomeMessage = null;
var currentIndex = 0;
var usersData;
// check if localstorage empty or not
if (localStorage.getItem("usersList") == null) {
    usersData = [];
} else {
    usersData = JSON.parse(localStorage.getItem("usersList"));
}

//onclick event on signup button
if (signup) {
signup.onclick = function() {
    if(dataValidation()) {
    var userInfo = {
        name: userName.value,
        email: userEmail.value,
        pass: userPassword.value,
    };
    function emailExists(userEmail){
        return usersData.some(function (userInformation) { 
            return userInformation.email === userEmail;
        })
    }
    if (emailExists(userInfo.email)){
        alreadyExist.style.display = "block";
    } 
    else {
        usersData.push(userInfo);
        localStorage.setItem("usersList", JSON.stringify(usersData));
        alreadyExist.style.display = "none";
        location.href = "index.html";
    }
    }
    
};
}

//check validation of signup form
function dataValidation() {
    if (userName.value == "" || userEmail.value == "" || userPassword.value == "") 
    {
        invalidAlert.style.display = "block";
        validAlert.style.display = "none";
        return false;
    } 
    else {
        invalidAlert.style.display = "none";
        return true;
    }
}

//onclick event on login button
if (loginBtn) {
loginBtn.onclick = function () {
    if(usersData.length > 0){
        if (loginDataValidation()) {
            for (var i = 0; i < usersData.length; i++) {
                if (usersData[i].email == loginEmail.value) {
                    currentIndex = i;
                }
            }

            if (
                usersData[currentIndex].email == loginEmail.value &&
                usersData[currentIndex].pass == loginPassword.value
            ) {
                correction.style.display = "none";
                localStorage.setItem("name", usersData[currentIndex].name);
                location.href = "welcome.html";
            } else {
                correction.style.display = "block";
            }
        }
    }
    else{
        correction.style.display = "block";
    }
    
};
}
//check validation login form
function loginDataValidation() {
if (loginEmail.value != "" && loginPassword.value != "") {
    invalidAlert.style.display = "none";
    return true;
} else {
    invalidAlert.style.display = "block";
    return false;
}
}


/************************validation of each input of signup form **************************/
function userNameValidation() {
var regex = /^[A-Z][a-z]{2,7}$/;
if (regex.test(userName.value)) {
    nameSignupAlert.style.display = "none";
    return true;
} else {
    nameSignupAlert.style.display = "block";
    console.log("error");
    return false;
}
}

function userEmailValidation() {
var regex = /(.+)@(.+){2,}\.(.+){2,}/;
if (regex.test(userEmail.value)) {
    emailSignupAlert.style.display = "none";
    return true;
} else {
    emailSignupAlert.style.display = "block";
    return false;
}
}

function userPasswordValidation() {
var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
if (regex.test(userPassword.value)) {
    passwordSignupAlert.style.display = "none";
    return true;
} else {
    passwordSignupAlert.style.display = "block";
    return false;
}
}

/************************ event on signup inputs **************************/
if(userName){
    userName.addEventListener("keyup", userNameValidation);
}
if (userEmail) {
    userEmail.addEventListener("keyup", userEmailValidation);
}
if (userPassword) {
    userPassword.addEventListener("keyup", userPasswordValidation);
}

