// // js/scripts.js
// document
//   .getElementById("registerForm")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault(); // Prevent default form submission

//     console.log("Submitting user data:", { name, username, email, password });

//     const name = document.getElementById("registerName").value;
//     const username = document.getElementById("registerUsername").value; // Get username
//     const email = document.getElementById("registerEmail").value;
//     const password = document.getElementById("registerPassword").value;

//     const response = await fetch("http://localhost:5500/api/users/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, username, email, password }), // Include username in request
//     });

//     const data = await response.json();
//     if (response.ok) {
//       alert(data.message); // Show success message
//     } else {
//       alert(data.message); // Show error message
//     }
//   });

document
  .getElementById("registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect user data from the form
    const name = document.getElementById("registerName").value;
    const username = document.getElementById("registerUsername").value; // Get username
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    console.log("Submitting user data:", { name, username, email, password }); // Log the data

    try {
      const response = await fetch("http://localhost:5500/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password }), // Include username in request
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Show success message
        // Optionally redirect to another page after successful registration
        window.location.href = "login.html"; // Redirect to login page after registration
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error during registration:", error); // Log any errors
      alert("An error occurred during registration. Please try again.");
    }
  });
