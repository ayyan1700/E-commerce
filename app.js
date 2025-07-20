//========scrollbar==========//
let container = document.querySelector(".container");
window.addEventListener("scroll", function () {
    if (scrollY >= 80) {
        container.style.transform = "translateY(0%)"
    }
    else {
        container.style.transform = "translateY(-100%)"
    }
});


//==========localstorge-data=======//
var data = JSON.parse(localStorage.getItem("usersData")) || [];
var currentUser = JSON.parse(localStorage.getItem("currectUser"));
var addcart = JSON.parse(localStorage.getItem("addcart"));
var finalcart = JSON.parse(localStorage.getItem("finalcart"));

//============profile===========//
const imageDiv = document.querySelectorAll('.imageDiv');
const fileInput = document.querySelectorAll('.fileInput');

// 🟩 Show profile if already stored in currentUser
if (currentUser && currentUser.profile) {
    imageDiv.forEach((div) => {
        div.innerHTML = '<img src="' + currentUser.profile + '" alt="Profile Image">';
    });
};
imageDiv.forEach((div, index) => {
    div.addEventListener('click', () => {
        if (!data || !currentUser) {
            alert("Login the account first");
            return;
        }
        fileInput[index].click();
    });

    fileInput[index].addEventListener('change', () => {
        const file = fileInput[index].files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // ✅ update profile image in currentUser
                currentUser.profile = e.target.result;

                // ✅ also update in data array
                for (let i = 0; i < data.length; i++) {
                    if (data[i].Email === currentUser.Email) {
                        data[i].profile = e.target.result;
                        break;
                    }
                }

                localStorage.setItem("currectUser", JSON.stringify(currentUser));
                localStorage.setItem("usersData", JSON.stringify(data));


                imageDiv.forEach((div) => {
                    div.innerHTML = '<img src="' + currentUser.profile + '" alt="Profile Image">';
                });
            };

            reader.readAsDataURL(file);
        };
    });
});


//============logout============//
let logout = document.querySelectorAll(".logout");
if (logout) {
    logout.forEach((btn, index) => {
        btn.addEventListener("click", function () {

            if (!currentUser) {
                alert("you already logout");
                return;
            };

            alert("your logout of the account");

            for (let i = 0; i < data.length; i++) {
                if (data[i].Email === currentUser.Email) {
                    data[i].currentUsercarts = currentUser.currentUsercarts || [];
                    break;
                };
            };

            localStorage.setItem("usersData", JSON.stringify(data));

            localStorage.removeItem("currectUser");
            localStorage.removeItem("addcart");
            localStorage.removeItem("carts");

            currentUser = null;
            addcart = [];

            const imageDiv = document.querySelectorAll('.imageDiv');
            imageDiv.forEach(div => {
                div.innerHTML = '<img src="img/default-avatar-icon-of-social-media-user-vector.jpg" alt="Default Image">';
            });
        });
    });
};


//===========store==========//

let store = [

    {
        img: "img/car.webp",
        name: "cars",
        price: "80.50lakhs",
        description: "This premium quality product offers elegant design.",
        slider: ["img/car.webp", "img/car1.webp", "img/car2.webp", "img/car3.webp"]
    },

    {
        img: "img/bike.webp",
        name: "bike",
        price: "80.50lakhs",
        description: "This premium quality product offers elegant design.",
        slider: ["img/bike.webp", "img/bike1.webp", "img/bike2.webp", "img/bike3.webp"]
    },

    {
        img: "img/tab.webp",
        name: "tab",
        price: "80.50lakhs",
        description: "This premium quality product offers elegant design.",
        slider: ["img/tab.webp", "img/tab1.webp", "img/tab2.webp", "img/tab3.webp"]
    },

    {
        img: "img/house.webp",
        name: "house",
        price: "80.50lakhs",
        description: "This premium quality product offers elegant design.",
        slider: ["img/house.webp", "img/house1.webp", "img/house2.webp", "img/house3.webp"]
    },

];

//==========youritem=========//
let youritem = document.getElementById("youritem");
if (youritem) {
    youritem.addEventListener("click", function () {
        if (!currentUser) {
            alert("first login the account");
            return;
        }
        if ((!addcart || addcart.length === 0) &&
            (!currentUser.currentUsercarts || currentUser.currentUsercarts.length === 0)) {
            alert("Cart is empty");
            return;
        };

        window.location.href = "index1.html";
    });
}

//==========backhome===========//
let backhome = document.querySelectorAll(".backhome");
if (backhome) {
    backhome.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    });
}


//===========showloginfoam===========//
let loginpage = document.querySelectorAll(".loginpage");
if (loginpage) {
    loginpage.forEach((btn, index) => {

        btn.addEventListener("click", function () {
            if(currentUser){
                alert("logout previous Account");
                return;
             };
            let overlay = document.createElement("div");
            let foamdiv = document.createElement("div");
            overlay.classList.add("overlay");
            foamdiv.classList.add("foamdiv");
            let body = document.querySelector("body");
            body.style.overflow = "hidden";
            foamdiv.innerHTML = `
        <center><h2>shiptofy</h2></center>
        <br>
        <label for="login-email">Email:</label><br>
        <input id="login-email" type="email" placeholder="Email"><br>
        <label for="login-password">password:</label><br>
        <input id="login-password" type="password" placeholder="password"><br>
        <button id="login">login</button><br>
        <button id="signup-page">signup</button>
        `;

            document.body.appendChild(overlay);
            document.body.appendChild(foamdiv);

            //==============loginaccount===========//
            let loginaccount = document.getElementById("login");
            let loginEmail = document.getElementById("login-email");
            let loginPassword = document.getElementById("login-password");

            loginaccount.addEventListener("click", function () {
                if (!loginEmail.value || !loginPassword.value) {
                    alert("Fill All input fields");
                    return;
                }



                let loginData = {
                    loginEmail: loginEmail.value,
                    loginPassword: loginPassword.value
                };

                let matchfound = false;

                for (let i = 0; i < data.length; i++) {

                    if (
                        loginData.loginEmail === data[i].Email &&
                        loginData.loginPassword === data[i].password
                    ) {
                        alert("Login Account Successfully");


                        localStorage.setItem("currectUser", JSON.stringify(data[i]));
                        currentUser = data[i];

                        localStorage.setItem("addcart", JSON.stringify(currentUser.currentUsercarts || []));
                        addcart = currentUser.currentUsercarts || [];


                        if (currentUser.profile) {
                            imageDiv.forEach((div) => {
                                div.innerHTML = '<img src="' + currentUser.profile + '" alt="Profile Image">';
                            });
                        } else {
                            imageDiv.forEach((div) => {
                                div.innerHTML = '<img src="img/default-avatar-icon-of-social-media-user-vector.jpg" alt="Default Image">';
                            });
                        }

                        overlay.remove();
                        foamdiv.remove();
                        body.style.overflow = "auto";

                        matchfound = true;

                        loginEmail.value = "";
                        loginPassword.value = "";
                        break;

                    }
                };


                if (!matchfound) {
                    alert("Account Not found. Sign up the account");
                }
            });

            //============signup-page button works too============//
            let signuppage = document.getElementById("signup-page");
            if (signuppage) {
                signuppage.addEventListener("click", function () {
                    window.location.href = "index2.html";
                });
            }
        });

    });
}



//===========submitfoam============//
let submit = document.getElementById("submit");
let signName = document.getElementById("signup-name");
let signEmail = document.getElementById("signup-email");
let signuphNumber = document.getElementById("signup-Ph-Number");
let signupPassword = document.getElementById("signup-password");

if (submit) {
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        if (!signName.value || !signEmail.value || !signuphNumber.value || !signupPassword.value) {
            alert("Fill All input fields");
            return;
        }
        user = {
            Name: signName.value,
            Email: signEmail.value,
            number: signuphNumber.value,
            password: signupPassword.value,
            profile: "",
            currentUsercarts: [],

        };
        for (let i = 0; i < data.length; i++) {
            if (user.Email == data[i].Email) {
                alert("Email already Exist");
                return;
            };
        };
        alert("your account created")
        data.push(user);
        localStorage.setItem("usersData", JSON.stringify(data));

        signName.value = "";
        signEmail.value = "";
        signuphNumber.value = "";
        signupPassword.value = "";

        window.location.href = "index.html";

    });
};


//============showcarts==============//

let showcarts = document.querySelector(".cart-Gallery");

if (showcarts) {
    for (i = 0; i < store.length; i++) {
        product = store[i];
        let cardsitem = document.createElement("div");
        cardsitem.classList.add("cards");
        cardsitem.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <p>${product.name}</p>
    <span>${product.price}</span>
    <p>${product.description}</p>
    <button class="select-item">Add to Cart</button>
`;
        showcarts.appendChild(cardsitem);
    }
}

let selectitem = document.querySelectorAll(".select-item");
if (selectitem) {
    selectitem.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (!data || !currentUser) {
                alert("login the account first");
                return;
            };

            if (!currentUser.currentUsercarts) {
                currentUser.currentUsercarts = [];
            };

            let selectedProduct = store[index];
            currentUser.currentUsercarts.push(selectedProduct);

            for (let i = 0; i < data.length; i++) {
                if (data[i].Email === currentUser.Email) {
                    data[i].currentUsercarts = currentUser.currentUsercarts;
                    break;
                };
            };

            localStorage.setItem("currectUser", JSON.stringify(currentUser));
            localStorage.setItem("usersData", JSON.stringify(data));
            localStorage.setItem("addcart", JSON.stringify(currentUser.currentUsercarts));
            localStorage.setItem("carts", JSON.stringify(currentUser.currentUsercarts));

            alert("Item added to cart! If you want to check, click 'Your Item'.");

        });
    });
}

let userCartList = document.querySelector(".user-cart-list");

if (userCartList) {
    addcart.forEach((item, cartIndex) => {
        let div = document.createElement("div");
        div.classList.add("cart-card");
        div.innerHTML = `
            <img class="main-image" src="${item.slider[0]}" alt="${item.name}" />
            <h3>${item.name}</h3>
            <p>${item.price}</p>
            <p>${item.description}</p>
            <img class="thumb" src="${item.slider[0]}">
            <img class="thumb" src="${item.slider[1]}">
            <img class="thumb" src="${item.slider[2]}">
            <img class="thumb" src="${item.slider[3]}"><br>
            <button class="finalcart">final the cart</button><br>
            <button class="removecart">remove to cart</button>
        `;
        userCartList.appendChild(div);


        let finalcartBtn = div.querySelector(".finalcart");
        finalcartBtn.addEventListener("click", function () {
            if (!currentUser || !currentUser.currentUsercarts || currentUser.currentUsercarts.length === 0) {
                alert("Cart is empty or user not logged in");
                return;
            }

            if (!currentUser.finalCart) {
                currentUser.finalCart = [];
            }

            // ✅ 1. Final cart mein add karo (multiple copies allowed)
            currentUser.finalCart.push(item);

            // ✅ 2. currentUser cart se is item ko hatao
            currentUser.currentUsercarts.splice(cartIndex, 1);

            // ✅ 3. Update user data
            for (let i = 0; i < data.length; i++) {
                if (data[i].Email === currentUser.Email) {
                    data[i].currentUsercarts = currentUser.currentUsercarts;
                    data[i].finalCart = currentUser.finalCart;
                    break;
                }
            }

            // ✅ 4. LocalStorage mein save karo
            localStorage.setItem("usersData", JSON.stringify(data));
            localStorage.setItem("currectUser", JSON.stringify(currentUser));
            localStorage.setItem("addcart", JSON.stringify(currentUser.currentUsercarts));
            localStorage.setItem("carts", JSON.stringify(currentUser.currentUsercarts));

            // ✅ 5. UI se remove karo
            div.remove();

            alert(`"${item.name}" finalized and removed from cart.`);
        });


        let removecartBtn = div.querySelector(".removecart");
        removecartBtn.addEventListener("click", function () {
            if (!currentUser || !currentUser.currentUsercarts) return;

            currentUser.currentUsercarts.splice(cartIndex, 1);

            for (let i = 0; i < data.length; i++) {
                if (data[i].Email === currentUser.Email) {
                    data[i].currentUsercarts = currentUser.currentUsercarts;
                    break;
                };
            };

            localStorage.setItem("currectUser", JSON.stringify(currentUser));
            localStorage.setItem("usersData", JSON.stringify(data));
            localStorage.setItem("addcart", JSON.stringify(currentUser.currentUsercarts));
            localStorage.setItem("carts", JSON.stringify(currentUser.currentUsercarts));

            div.remove();
            alert("Item removed from cart.");
        });

        // ✅ Slider thumbnail
        const thumbs = div.querySelectorAll(".thumb");
        const mainImg = div.querySelector(".main-image");
        thumbs.forEach(thumb => {
            thumb.addEventListener("click", () => {
                mainImg.src = thumb.src;
            });
        });
    });
};



//=================shopicon==============//
let countdiv = document.querySelectorAll(".buyitem");

if (countdiv) {
    countdiv.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            if (!currentUser) {
                alert("login Account first");
                return;
            }
            let overlay = document.createElement("div");
            overlay.classList.add("nav-blur-overlay");
            document.body.appendChild(overlay);
            document.body.style.overflow = "hidden"; // Disable scroll


            let sidenavitem = document.createElement("div");
            sidenavitem.classList.add("side-item-nav");
            sidenavitem.innerHTML = `
                <i class="fa-solid fa-xmark close-nav"></i>
                <p>Your finalized items:</p>
            `;
            let finalCartSection = document.createElement("div");
            finalCartSection.classList.add("final-cart-gallery");
            finalCartSection.style.padding = "20px";
            sidenavitem.appendChild(finalCartSection);

            if (currentUser && currentUser.finalCart && currentUser.finalCart.length > 0) {
                currentUser.finalCart.forEach(item => {
                    let img = document.createElement("img");
                    img.src = item.img || item.slider?.[0];
                    img.alt = item.name;
                    img.style.width = "200px";
                    img.style.height = "150px";
                    img.style.marginTop = "20px";
                    img.style.borderRadius = "10px";
                    img.style.boxShadow = "0 0 8px rgba(0,0,0,0.3)";
                    finalCartSection.appendChild(img);
                });
            } else {
                finalCartSection.innerHTML = "<p style='color:white;'>No finalized cart items found.</p>";
            }

            document.body.appendChild(sidenavitem);
            setTimeout(() => {
                sidenavitem.style.transform = "translateX(0%)";
            }, 50);


            sidenavitem.querySelector(".close-nav").addEventListener("click", function () {
                sidenavitem.style.transform = "translateX(100%)";
                setTimeout(() => {
                    sidenavitem.remove();
                    overlay.remove();
                    document.body.style.overflow = "auto";
                }, 400);
            });
        });
    });
}

