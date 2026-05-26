# 👤 Random User Generator App

A beginner-to-intermediate JavaScript project that fetches and displays user data from an external API. This project focuses on understanding asynchronous JavaScript, DOM manipulation, dynamic rendering, and modern UI patterns like loading states, skeleton screens, and dark mode.

---

## 🚀 Features

- Fetch random users from an external API
- Display multiple user cards dynamically
- Loading state handling for better UX
- Error handling for failed requests
- Skeleton loading animation
- Dark mode toggle
- Responsive grid layout
- Clean and modern UI design

---

## 🧠 What You Learn (Step-by-Step Breakdown)

### STEP 1 — DOM Selection
You start by selecting required elements from the page such as:
- Button for triggering the request
- Loading indicator text
- Error message container
- Main container for rendering users

This teaches how to interact with the DOM using element selection methods.

---

### STEP 2 — Event Handling
A click event is attached to the button so that the application responds when the user interacts with it.

This introduces event-driven programming in the browser.

---

### STEP 3 — Asynchronous Flow
The data fetching logic is handled using an asynchronous approach so the UI does not freeze while waiting for the API response.

---

### STEP 4 — Loading State
Before making the request:
- Previous user data is cleared
- Previous errors are removed
- A loading indicator is displayed

This improves user experience and feedback.

---

### STEP 5 — Fetching Data from API
Data is retrieved from:

https://randomuser.me/api/

This helps you understand how to work with real-world APIs.

---

### STEP 6 — Error Handling
The response is validated to ensure it is successful. If not, an error is triggered and handled gracefully.

This teaches proper API error handling techniques.

---

### STEP 7 — Converting Response
The raw response is converted into a usable JavaScript object so it can be processed in the application.

---

### STEP 8 — Understanding API Structure
The returned data contains nested objects. You explore and inspect the structure to extract:
- User name
- Email address
- Profile picture
- Country or location

This builds confidence in working with unknown data structures.

---

### STEP 9 — Rendering Data to UI
User information is dynamically inserted into the DOM using template-based rendering.

This teaches dynamic UI generation.

---

### STEP 10 — Error Display
If something goes wrong, an error message is shown in the UI instead of breaking the app.

---

### STEP 11 — Cleanup
After the process completes (success or failure), the loading state is removed to keep the UI clean.

---

## 📈 Learning Levels

### LEVEL 1 — Core Async Practice
- Fetch a single random user
- Display user details (image, name, email, country)
- Show loading state
- Handle errors properly
- Clear previous data before new request

---

### LEVEL 2 — Array & DOM Rendering
- Fetch multiple users at once
- Render user cards dynamically
- Use array methods or looping techniques
- Build reusable UI structure

---

### LEVEL 3 — Search Functionality
- Store fetched users in memory
- Filter users based on input text
- Re-render filtered results dynamically

---

### LEVEL 4 — UI Enhancements
- Add loading spinner instead of text
- Implement dark mode toggle
- Improve card hover effects
- Create responsive grid layout
- Disable button during loading state

---

### LEVEL 5 — Advanced Features
- Store favorite users using local storage
- Add pagination or load more functionality
- Implement infinite scrolling
- Add copy-to-clipboard functionality for emails
- Build reusable UI components

---

## 🛠 Tech Stack

- HTML
- CSS
- JavaScript
- Random User API

---

## 🌐 API Reference

User data is fetched from:

https://randomuser.me/

---

## 🎯 Goal of This Project

To understand how real-world frontend applications are built using asynchronous data fetching, dynamic DOM updates, and modern UI patterns used in production applications.

---

## 👨‍💻 Author

This project is created by Adarsh Ranjan as a learning-focused implementation to explore how modern web applications handle asynchronous data fetching, dynamic UI rendering, and real-time user interactions using vanilla JavaScript, HTML, and CSS.

It is designed to demonstrate how core frontend concepts—such as API integration, loading states, error handling, and responsive UI design—can be structured in a clean and maintainable way.

The project also serves as a sandbox for practicing scalable front-end architecture, where logic is separated into clear steps for better readability, debugging, and reuse.

If you use or extend this project, you are encouraged to modify it according to your own learning goals—whether that means adding new features, improving UI/UX, or integrating additional APIs.

Contributions, improvements, and ideas are always welcome.

GitHub: [adarsh-aur](https://github.com/adarsh-aur)

Built with ❤️ in India.