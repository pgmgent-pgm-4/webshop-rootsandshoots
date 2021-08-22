const profile = document.getElementById('nav__profile');
const profileContainer = document.getElementById('nav__profileContainer');

profile.addEventListener("click", function(e) {
    console.log("succes");
    if (profileContainer.style.display === "block") {
        profileContainer.style.display = "none";
        console.log(profileContainer.style.display);
    } else {
        profileContainer.style.display = "block";
        console.log(profileContainer.style.display);
    }
    e.preventDefault();
});