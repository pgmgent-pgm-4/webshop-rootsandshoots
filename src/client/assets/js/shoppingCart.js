const shoppingCart = document.getElementById('nav__cart');
const cartContainer = document.getElementById('nav__cartContainer');

shoppingCart.addEventListener("click", function(e) {
    console.log("succes");
    if (cartContainer.style.display === "block") {
        cartContainer.style.display = "none";
        console.log(cartContainer.style.display);
    } else {
        cartContainer.style.display = "block";
        console.log(cartContainer.style.display);
    }
    e.preventDefault();
});