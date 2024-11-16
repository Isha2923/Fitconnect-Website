// // // Login functionality
// // document
// //   .getElementById("loginForm")
// //   .addEventListener("submit", async function (event) {
// //     event.preventDefault();

// //     const email = document.getElementById("loginEmail").value;
// //     const password = document.getElementById("loginPassword").value;

// //     console.log("Email:", email);
// //     console.log("Password:", password);

// //     const response = await fetch("http://localhost:5500/api/users/login", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ email, password }),
// //     });

// //     const data = await response.json();

// //     if (response.ok) {
// //       alert("Login successful!");
// //       window.location.href = "index.html"; // Redirect to home page
// //     } else {
// //       alert(data.message); // Show error message
// //     }
// //   });

// // Login functionality
// document
//   .getElementById("loginForm")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const email = document.getElementById("loginEmail").value;
//     const password = document.getElementById("loginPassword").value;

//     console.log("Email:", email);
//     console.log("Password:", password);

//     try {
//       const response = await fetch("http://localhost:5500/api/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Login successful!");
//         window.location.href = "index.html"; // Redirect to home page
//       } else {
//         console.log(data.message);
//         alert(data.message || "Login failed. Please try again."); // Default error message
//       }
//     } catch (error) {
//       console.log(error);
//       console.error("Error:", error);
//       alert("An unexpected error occurred. Please try again.");
//     }
//   });

// Login functionality
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:5500/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login successful!");
      window.location.href = "index.html"; // Redirect to home page
    } else {
      alert(data.message); // Show error message
    }
  });
