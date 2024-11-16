// // Fetch routines and display
// const routineList = document.getElementById("routine-list");
// fetch("http://localhost:5000/api/routines")
//   .then((response) => response.json())
//   .then((routines) => {
//     routines.forEach((routine) => {
//       const routineDiv = document.createElement("div");
//       routineDiv.innerHTML = `
//         <h3>${routine.title}</h3>
//         <p>Difficulty: ${routine.difficulty}</p>
//         <p>Type: ${routine.type}</p>
//         <p>Length: ${routine.length} mins</p>
//         <p>Rating: ${
//           routine.ratings.length > 0
//             ? (
//                 routine.ratings.reduce((a, b) => a + b, 0) /
//                 routine.ratings.length
//               ).toFixed(1)
//             : "Not rated"
//         }</p>
//         <p>Completed: ${routine.completedCount} times</p>
//         <button onclick="completeRoutine('${
//           routine._id
//         }')">Mark as Completed</button>
//         <button onclick="rateRoutine('${routine._id}')">Rate</button>
//       `;
//       routineList.appendChild(routineDiv);
//     });
//   });

// function completeRoutine(id) {
//   fetch(`http://localhost:5000/api/routines/${id}/complete`, { method: "PUT" })
//     .then((response) => response.json())
//     .then((data) => location.reload());
// }

// function rateRoutine(id) {
//   const rating = prompt("Enter your rating (1-5)");
//   fetch(`http://localhost:5000/api/routines/${id}/rate`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ rating: Number(rating) }),
//   })
//     .then((response) => response.json())
//     .then((data) => location.reload());
// }

// // document.getElementById('routineForm').addEventListener('submit', async function (e) {
// //   e.preventDefault();

// //   const routineData = {
// //     title: document.getElementById('title').value,
// //     description: document.getElementById('description').value,
// //     difficulty: document.getElementById('difficulty').value,
// //     duration: document.getElementById('duration').value,
// //     userId: 'YOUR_USER_ID'  // replace with logged in user id
// //   };

// //   const response = await fetch('http://localhost:5000/api/routines', {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify(routineData),
// //   });

// //   const result = await response.json();
// //   alert('Routine Created: ' + result.title);
// // });

// document
//   .getElementById("registerForm")
//   .addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const name = document.getElementById("registerName").value;
//     const email = document.getElementById("registerEmail").value;
//     const password = document.getElementById("registerPassword").value;

//     const response = await fetch("http://localhost:5500/api/users/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, email, password }),
//     });

//     const data = await response.json();
//     alert(data.message);
//   });

// document.addEventListener("DOMContentLoaded", () => {
//   const heroHeading = document.querySelector(".hero h1");

//   // Function to get current time and greet the user
//   const getGreeting = () => {
//     const now = new Date();
//     const hour = now.getHours();
//     if (hour < 12) {
//       return "Good Morning!";
//     } else if (hour < 18) {
//       return "Good Afternoon!";
//     } else {
//       return "Good Evening!";
//     }
//   };

//   // Update the hero heading with a greeting
//   heroHeading.innerText = `${getGreeting()} Welcome to FitXchange!`;
// });

document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("authLink");
  const logoutLink = document.getElementById("logoutLink");
  const createRoutineLink = document.getElementById("createRoutineLink");

  // Check if user is logged in
  const username = localStorage.getItem("username");

  if (username) {
    // User is logged in, show username and logout button
    authLink.innerHTML = `<a href="#"><b>${username}</b></a>`;
    logoutLink.style.display = "block"; // Show logout button

    // Ensure create routine link is accessible
    createRoutineLink.style.pointerEvents = "auto";
  } else {
    // User is not logged in, hide logout button and restrict access to create routine
    logoutLink.style.display = "none";
    createRoutineLink.style.pointerEvents = "none"; // Disable the link if not logged in
    createRoutineLink.innerHTML = "<b>Login to share routine</b>";
  }

  // Logout functionality
  logoutLink.addEventListener("click", () => {
    localStorage.removeItem("username"); // Clear user session
    authLink.innerHTML = '<a href="login.html"><b>Login</b></a>'; // Reset to "Login"
    logoutLink.style.display = "none"; // Hide logout button
    createRoutineLink.style.pointerEvents = "none"; // Disable creating routine when logged out
    window.location.href = "index.html"; // Redirect to homepage
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const routineList = document.getElementById("routine-list");

  try {
    // Fetch top 3 routines from the API based on likes
    const response = await fetch("http://localhost:5500/api/routines/top");
    const topRoutines = await response.json();

    // Check if routines exist
    if (topRoutines.length === 0) {
      routineList.innerHTML = "<p>No popular routines found.</p>";
      return;
    }

    // Iterate over top routines and create HTML elements
    topRoutines.forEach((routine) => {
      const routineCard = document.createElement("div");
      routineCard.className = "routine-card"; // CSS class for styling

      routineCard.innerHTML = `
              <h3>${routine.title}</h3>
              <p>Duration: ${routine.duration} mins | Difficulty: ${
        routine.difficulty
      }</p>
              <p><strong>Likes:</strong> ${routine.likes || 0}</p>
              <a href="browseroutine.html">View Details</a>
          `;

      routineList.appendChild(routineCard);
    });
  } catch (error) {
    console.error("Error fetching popular routines:", error);
    routineList.innerHTML =
      "<p>Error loading popular routines. Please try again.</p>";
  }
});
