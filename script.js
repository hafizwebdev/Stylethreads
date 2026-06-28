let cart = 0;
let wishlist = 0;
let cartItems = [];
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf0SHUjNRG4MnukUHJ1uDZiVvcwojLZ4s",
  authDomain: "hafizdev-19721.firebaseapp.com",
  projectId: "hafizdev-19721",
  storageBucket: "hafizdev-19721.firebasestorage.app",
  messagingSenderId: "361334176435",
  appId: "1:361334176435:web:d092ede716be006bc78ec6",
  measurementId: "G-R45Q5SS2LL"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
  function loadProducts() {
  db.collection("products").get().then((snapshot) => {
    let container = document.getElementById("productList");

    container.innerHTML = "";

    snapshot.forEach((doc) => {
      let data = doc.data();

      container.innerHTML += `
        <div class="product">
          <img src="${data.image}" style="width:150px;">
          <h3>${data.name}</h3>
          <p>Category: ${data.category}</p>
          <p>Price: Rs.${data.price}</p>

         <button onclick='buyNow(${JSON.stringify(data)})'>Buy Now</button>
          <button onclick="addWishlist()">❤️ Wishlist</button>
        </div>
      `;
    });
  });
}
function login() {
  let email = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("userStatus").innerText =
        "Logged in: " + userCredential.user.email;
      alert("Login Successful!");
    })
    .catch((error) => alert(error.message));
}
function signup() {
  let email = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("userStatus").innerText =
        "Account Created: " + userCredential.user.email;
      alert("Signup Successful!");
    })
    .catch((error) => alert(error.message));
}
function logout() {
  auth.signOut().then(() => {
    document.getElementById("userStatus").innerText = "";
    cart = 0;
cartItems = [];
wishlist = 0;
document.getElementById("wishlist").innerHTML = 0;
document.getElementById("cart").innerHTML = 0;
document.getElementById("totalItems").innerHTML = 0;
    alert("Logged Out Successfully!");
  });
}

// AUTH STATE
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("userStatus").innerText =
      "Logged in: " + user.email;
      db.collection("users")
  .doc(user.uid)
  .collection("cart")
  .get()
  .then((snapshot) => {
    cart = snapshot.size;
    document.getElementById("cart").innerHTML = cart;
    document.getElementById("totalItems").innerHTML = cart;
  });
  db.collection("users")
  .doc(user.uid)
  .collection("wishlist")
  .get()
  .then((snapshot) => {
    wishlist = snapshot.size;
    document.getElementById("wishlist").innerHTML = wishlist;
  });
  }
});
function buyNow(product) {
  cartItems.push(product);
  cart++;
  document.getElementById("cart").innerHTML = cart;
  document.getElementById("totalItems").innerHTML = cart;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  if (auth.currentUser) {
  db.collection("users")
    .doc(auth.currentUser.uid)
    .collection("cart")
    .add(product);
}
  alert("Product Added to Cart");
}
function addWishlist() {
  wishlist++;
  document.getElementById("wishlist").innerHTML = wishlist;
  if (auth.currentUser) {
  db.collection("users")
    .doc(auth.currentUser.uid)
    .collection("wishlist")
    .add({
      addedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}
  alert("Added to Wishlist");
}

function searchProduct() {
  let input = document.getElementById("search").value.toLowerCase();
  let products = document.getElementsByClassName("product");

  for (let p of products) {
    let name = p.getElementsByTagName("h3")[0].innerHTML.toLowerCase();
    p.style.display = name.includes(input) ? "block" : "none";
  }
}
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
function checkout() {
  alert(cart === 0 ? "Cart is empty!" : "Proceeding...");
}

function payNow() {
  let n = document.getElementById("cardName").value;
  let num = document.getElementById("cardNumber").value;
  let c = document.getElementById("cvv").value;

  if (!n || !num || !c) alert("Fill all fields!");
  else alert("Payment Successful 🎉");
}

// STORAGE
function loadData() {
  document.getElementById("cart").innerHTML = cart;
  document.getElementById("wishlist").innerHTML = wishlist;
}


window.addEventListener("load", function () {
  loadData();
  loadProducts();
  alert("Welcome to Style Threads!");
});