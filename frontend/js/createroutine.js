document
  .getElementById("routineForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const username = document.getElementById("username").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const difficulty = document.getElementById("difficulty").value;
    const duration = document.getElementById("duration").value;
    const file = document.getElementById("file").files[0];

    formData.append("username", username);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("difficulty", difficulty);
    formData.append("duration", duration);
    //if (file) {
    formData.append("file", file); // Appending file if uploaded
    //}

    try {
      const response = await fetch(
        "http://localhost:5500/api/routines/create",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Routine created successfully!");
      } else {
        alert(
          "An error occurred while creating the routine. Please try again."
        );
      }
    } catch (error) {
      alert("An error occurred while creating the routine. Please try again.");
    }
  });

// document
//   .getElementById("routineForm")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     const username = document.getElementById("username").value;
//     const title = document.getElementById("title").value;
//     const description = document.getElementById("description").value;
//     const difficulty = document.getElementById("difficulty").value;
//     const duration = document.getElementById("duration").value;
//     const file = document.getElementById("file").files[0]; // Check if this ID is correct

//     // Logging values for debugging
//     console.log({ username, title, description, difficulty, duration, file });

//     formData.append("username", username);
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("difficulty", difficulty);
//     formData.append("duration", duration);
//     if (file) {
//       formData.append("file", file); // Appending file if uploaded
//     }

//     try {
//       const response = await fetch(
//         "http://localhost:5500/api/routines/create",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const result = await response.json();
//       if (response.ok) {
//         alert("Routine created successfully!");
//       } else {
//         alert(
//           result.message || "An error occurred while creating the routine."
//         ); // Handle response
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while creating the routine. Please try again.");
//     }
//   });
