document.addEventListener("DOMContentLoaded", async () => {
  const routineContainer = document.getElementById("routine-container");

  try {
    // Fetch routines from the API
    const response = await fetch("http://localhost:5500/api/routines"); // Use the correct endpoint
    const routines = await response.json();

    // Check if routines exist
    if (routines.length === 0) {
      routineContainer.innerHTML = "<p>No routines found.</p>";
      return;
    }

    routines.forEach((routine) => {
      const routineCard = document.createElement("div");
      routineCard.className = "routine-card"; // CSS class for styling

      routineCard.innerHTML = `
          <div class="routine-image-container">
              ${
                routine.file
                  ? `<img src="../backend/${routine.file
                      .split("/")
                      .pop()}" alt="Routine file" class="routine-image">`
                  : `<div class="placeholder-image">No Image</div>`
              }
          </div>
          <div class="routine-details">
              <h3>${routine.title}</h3>
              <p><strong>Username:</strong> ${routine.username}</p>
              <p><strong>Description:</strong> ${routine.description}</p>
              <p><strong>Difficulty:</strong> ${routine.difficulty}</p>
              <p><strong>Duration:</strong> ${routine.duration} minutes</p>
              <p><strong>Likes:</strong> <span class="likes-count">${
                routine.likes || 0
              }</span></p>
              <button class="like-button" data-id="${routine._id}">Like</button>
          </div>
          `;

      // Add event listener to like button
      const likeButton = routineCard.querySelector(".like-button");
      likeButton.addEventListener("click", async () => {
        const res = await fetch(
          `http://localhost:5500/api/routines/${routine._id}/like`,
          {
            method: "POST",
          }
        );

        // Check if the response is successful
        if (res.ok) {
          const updatedRoutine = await res.json();
          // Update the likes count in the HTML
          const likesCountElement = routineCard.querySelector(".likes-count");
          likesCountElement.innerText = updatedRoutine.likes; // Update likes count
        } else {
          console.error("Failed to like the routine.");
        }
      });

      routineContainer.appendChild(routineCard);
    });
  } catch (error) {
    console.error("Error fetching routines:", error);
    routineContainer.innerHTML =
      "<p>Error loading routines. Please try again.</p>";
  }
});
