var nameHome = document.getElementById("nameHome");
var welcomeName = localStorage.getItem("name");
var Logout = document.getElementById("Logout");
nameHome.innerHTML = "Welcome " + welcomeName;
console.log("amira")
Logout.onclick = function () {
    localStorage.removeItem("name");
};
