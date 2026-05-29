const fetchBtn = document.getElementById("fetch-btn");
const retryBtn = document.getElementById("retry-btn");
const favBtn = document.getElementById("fav-btn");
const themeBtn = document.getElementById("theme-toggle");
const loadMoreBtn = document.getElementById("load-more-btn");

const userCard = document.getElementById("user-card");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");
const input = document.querySelector(".input-text");

const API_URL = "https://randomuser.me/api/";

let allUsers = [];
let fav = JSON.parse(localStorage.getItem('fav')) || [];
let copiedEmails = JSON.parse(localStorage.getItem('copy')) || [];

let page = 1;
let isLoading = false;
let isInfinite = true;
let inFavMode = false;

function saveFav() {
    localStorage.setItem('fav', JSON.stringify(fav));
}

function saveCopy() {
    localStorage.setItem('copy', JSON.stringify(copiedEmails));
}

function loadingSpinner(btn, state) {
    if (!btn) return;

    if (state) {
        btn.disabled = true;
        btn.dataset.original = btn.innerHTML;
        btn.innerHTML = "⌛ Loading.."
    }
    else {
        btn.disabled = false;
        btn.innerHTML = btn.dataset.original || btn.innerHTML;
    }
}

async function copyEmail(email) {
    try {
        await navigator.clipboard.writeText(email);

        if (!copiedEmails.includes(email)) {
            copiedEmails.push(email);
            showToast("Email copied!");
            saveCopy();
        }

    } catch (error) {
        errorText.innerHTML = error.message;
    }
}

function addToFav(email) {
    const user = allUsers.find(u => u.email === email);

    if (!user) {
        errorText.innerHTML = "No user(s) found";
        return;
    }

    if (!fav.some(f => f.email === email)) {
        fav.push(user);
        saveFav();
    }
}

function showFav() {

    inFavMode = !inFavMode;

    if (inFavMode) {

        favBtn.innerHTML = "⬅ Back To Users";

        if (fav.length === 0) {

            userCard.innerHTML = `
                <h2>No favourites added </h2>
            `;

            return;
        }

        render(fav);

    } else {

        favBtn.innerHTML = " Show Favourites";

        render(allUsers);
    }
}

async function fetchUsers() {
    if (isLoading) return;

    try {
        isLoading = true;
        loadingSpinner(fetchBtn, true);
        loadingSpinner(retryBtn, true);
        loadingSpinner(loadMoreBtn, true);

        errorText.innerHTML = "";

        showSkeletons();

        const response = await fetch(`${API_URL}?results=12&page=${page}`);

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        
        const uniqueUsers = data.results.filter(
            newUser =>
                !allUsers.some(
                    oldUser => oldUser.email === newUser.email
                )
        );
        
        allUsers = [...allUsers, ...uniqueUsers];

        if (inFavMode) {
            inFavMode = false;
            favBtn.innerHTML = " Show Favourites";
        }   

        render(allUsers);

        page++;

    } catch (error) {
        errorText.innerHTML = error.message;
    } finally {
        isLoading = false;
        loadingSpinner(fetchBtn, false);
    }
}

loadMoreBtn.addEventListener("click", fetchUsers);

window.addEventListener("scroll", async () => {
    if (!isInfinite || isLoading || inFavMode) return;

    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

    if (bottom) {
        await fetchUsers();
    }
});

input.addEventListener("input", () => {
        const value = input.value.trim().toLowerCase();

        if (value === "") {
            render(inFavMode ? fav : allUsers);
            return;
        }

        const source = inFavMode ? fav : allUsers;

        const filteredUser = source.filter(u => {
            const fullName =
                `${u.name.first} ${u.name.last}`.toLowerCase();

            return fullName.includes(value);
        });
        render(filteredUser);
});


function render(list) {
    userCard.innerHTML = list.map(user => `
        <div class="card">
            <img src="${user.picture.large}">

            <h2>${user.name.first} ${user.name.last}</h2>

            <p>
                ${user.email}
                <button onclick="copyEmail('${user.email}')"> Copy</button>
            </p>

            <p>${user.location.country}</p>

            <button onclick="addToFav('${user.email}')">Fav</button>
        </div>
    `).join("");
}

fetchBtn.addEventListener("click", fetchUsers);

favBtn.addEventListener("click", showFav);

retryBtn.addEventListener("click", () => {
    page = 1;
    allUsers = [];
    fetchUsers();
});


themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});


const scrollStatus =
    document.getElementById("scroll-status");

scrollStatus.addEventListener("click", () => {

    isInfinite = !isInfinite;

    if (isInfinite) {

        scrollStatus.innerHTML =
            "Infinite Scroll: ON";

        scrollStatus.classList.remove("scroll-off");
        scrollStatus.classList.add("scroll-on");

        loadMoreBtn.style.display = "none";

    } else {

        scrollStatus.innerHTML =
            "Infinite Scroll: OFF";

        scrollStatus.classList.remove("scroll-on");
        scrollStatus.classList.add("scroll-off");

        loadMoreBtn.style.display = "block";
    }
});

function showToast(message) {
    const toast = document.createElement("div");

    toast.className = "toast";
    toast.innerText = message;

    document
      .getElementById("toast-container")
      .appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showSkeletons() {
    userCard.innerHTML = "";

    for (let i = 0; i < 12; i++) {
        userCard.innerHTML += `
            <div class="skeleton">
                <div class="circle"></div>
                <div class="line long"></div>
                <div class="line short"></div>
            </div>
        `;
    }
}