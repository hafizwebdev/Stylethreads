let cart = 0;
let wishlist = 0;

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please enter Username and Password");
    } else {
        alert("Login Successful!");
    }
}

function logout() {
    alert("Logged Out Successfully!");
}

function buyNow() {
    cart++;
    document.getElementById("cart").innerHTML = cart;
    document.getElementById("totalItems").innerHTML = cart;

    alert("Product Added to Cart");
}
function addWishlist() {
    wishlist++;
    document.getElementById("wishlist").innerHTML = wishlist;

    alert("Product Added to Wishlist");
}

function searchProduct() {

    let input = document.getElementById("search").value.toLowerCase();

    let products = document.getElementsByClassName("product");

    for (let i = 0; i < products.length; i++) {

        let name = products[i]
            .getElementsByTagName("h3")[0]
            .innerHTML
            .toLowerCase();

        if (name.includes(input)) {
            products[i].style.display = "block";
        } else {
            products[i].style.display = "none";
        }
    }
}
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function checkout() {

    if (cart === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Proceeding to Checkout...");
    }

}

function payNow() {

    let name = document.getElementById("cardName").value;
    let number = document.getElementById("cardNumber").value;
    let cvv = document.getElementById("cvv").value;

    if (name === "" || number === "" || cvv === "") {
        alert("Please fill all payment details!");
    } else {
        alert("Payment Successful! 🎉");
    }
}
function clearLoginFields() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function resetCart() {
    cart = 0;
    document.getElementById("cart").innerHTML = cart;
    document.getElementById("totalItems").innerHTML = cart;
}

function resetWishlist() {
    wishlist = 0;
    document.getElementById("wishlist").innerHTML = wishlist;
}

function showWelcome() {
    alert("👋 Welcome to Style Threads!");
}

window.onload = function () {
    showWelcome();
};
function saveData() {
    localStorage.setItem("cart", cart);
    localStorage.setItem("wishlist", wishlist);
}

function loadData() {
    cart = Number(localStorage.getItem("cart")) || 0;
    wishlist = Number(localStorage.getItem("wishlist")) || 0;

    document.getElementById("cart").innerHTML = cart;
    document.getElementById("wishlist").innerHTML = wishlist;

    let total = document.getElementById("totalItems");
    if (total) {
        total.innerHTML = cart;
    }
}

window.addEventListener("beforeunload", saveData);
window.addEventListener("load", loadData);
const firebaseConfig = {
  apiKey: "AIzaSyDf0SHUjNRG4MnukUHJ1UjVvcwojLZ4s",
  authDomain: "hafizdev-19721.firebaseapp.com",
  projectId: "hafizdev-19721",
  storageBucket: "hafizdev-19721.firebasestorage.app",
  messagingSenderId: "361334176435",
  appId: "1:361334176435:web:d092ede716be006bc78ec6",
  measurementId: "G-R45Q5SS2LL"
};

// Firebase start
firebase.initializeApp(firebaseConfig);
