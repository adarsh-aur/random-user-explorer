const fetchBtn = document.getElementById("fetch-btn");
const userCard = document.getElementById("user-card");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");

const API_URL = "https://randomuser.me/api/?results=6";

function showSkeletons() {
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

fetchBtn.addEventListener("click", async () => {
    userCard.innerHTML = "";
    errorText.innerHTML = "";
    loadingText.innerHTML = "Loading..";

    showSkeletons();

    try {
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error("Unexpected Error!");

        const data = await response.json();

        const users = data.results;

        display(users);

    } catch (error) {
        errorText.textContent = error.message;
    } finally {
        loadingText.textContent = "";
    }
});

function display(users) {
    userCard.innerHTML = users.map(user => {
        return `
            <div class="card">
                <img src="${user.picture.large}" alt="User Image">

                <h2>
                    ${user.name.first} ${user.name.last}
                </h2>

                <p>
                    ${user.email}
                </p>

                <p>
                    ${user.location.country}
                </p>
            </div>
        `;
    }).join("");
}


const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});