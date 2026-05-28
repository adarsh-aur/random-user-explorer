const fetchBtn = document.getElementById("fetch-btn");
const userCard = document.getElementById("user-card");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");
const input = document.querySelector(".input-text");
const retry = document.getElementById("retry-btn");

const API_URL = "https://randomuser.me/api/?results=15";

let allUsers = [];

let fav = JSON.parse(localStorage.getItem('fav')) || [];
let copiedEmail = JSON.parse(localStorage.getItem('copy')) || [];

function saveCopyEmail() {
    localStorage.setItem('copy', JSON.stringify(copiedEmail));
}

async function copyEmail(email) {
    try {
        await navigator.clipboard.writeText(email);

        if(!copiedEmail.includes(email)) {
            copiedEmail.push(email);
            saveCopyEmail();
        }
        alert("Email Copied");
    } catch (error) {
        errorText.innerHTML = error.message;
    }
}

function saveToStorage() {
    localStorage.setItem('fav', JSON.stringify(fav));
}

function addToFavourites(email) {
    const user = allUsers.find(u => u.email === email);

    if (!user) {
        return;
    }

    const alreadyExists = fav.some(fav => fav.email === email);

    if (!alreadyExists) {
        fav.push(user);
        saveToStorage();
    }
}

 


window.addEventListener("load", () => {
    fav = JSON.parse(localStorage.getItem("fav")) || [];
});

function showFavourites() {
    display(fav);
}

function showSkeleton() {
    userCard.innerHTML = "";

    for (let i = 0; i < 6; i++) {
        userCard.innerHTML += `
        <div class="skeleton">
            <div class="circle"></div>
            <div class="line long"></div>
            <div class="line short"></div>
        </div>
        `;
    }
}

let hasFetched = false;

async function fetchUsers() {
    try {
        userCard.innerHTML = "";
        errorText.innerHTML = "";
        loadingText.innerHTML = "Loading..";

        fetchBtn.disabled = true;
        retry.disabled = true;
        themeToggle.disabled = true;

        const response = await fetch(API_URL);
        const data = await response.json();

        allUsers = data.results;
        display(allUsers);

        hasFetched = true;

    } catch (error) {
        errorText.innerHTML = error.message;
    } finally {
        loadingText.innerHTML = "";
        themeToggle.disabled = false;
        retry.disabled = (!hasFetched) ? true : false;
    }
}

fetchBtn.addEventListener("click", fetchUsers);
retry.addEventListener("click", fetchUsers);


input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        showSkeleton();

        userCard.innerHTML = "";
        errorText.innerHTML = "";
        loadingText.innerHTML = "Loading..";
        fetchBtn.disable = true;
        retry.disabled = true;
        themeToggle.disabled = true;

        const searchUser = input.value.trim().toLowerCase();

        const filteredUser = allUsers.filter(user => {
            const fullName = `
                ${user.name.first} ${user.name.last}
            `.toLowerCase();
            return fullName.includes(searchUser);
        });

        if (filteredUser.length === 0) {
            errorText.innerHTML = "No user found";
            loadingText.innerHTML = "";
            return;
        }

        errorText.innerHTML = "";
        loadingText.innerHTML = "";
        input.value = "";

        display(filteredUser);
        themeToggle.disabled = false;
        retry.disabled = !hasFetched ? true : false;
    }
});

function display(users) {
    userCard.innerHTML = users.map((user) => {
        return `
        <div class="card">
            <img src="${user.picture.large}" alt="User Image">

            <h2>
                ${user.name.first} ${user.name.last}
            </h2>

            <p>
                ${user.email} 
                <button onclick="copyEmail('${user.email}')">
                📌 Copy Email
                </button>
            </p>

            <p>
                ${user.location.country}
            </p>
            <button onclick="addToFavourites('${user.email}')">
                ❤️ Favourite
            </button>
        </div>
        `;
    }).join("");
}

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
})