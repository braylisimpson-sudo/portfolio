
/// ===== PROJECTS PAGE =====

// 1. Select the empty container on the page
const projectGrid = document.querySelector("#projects-container");

// Holds all projects so the filter buttons can use them
let allProjects = [];

// 2. Load the JSON file
async function loadProjects() {
  const response = await fetch("data/projects.json");  // request the file
  const projects = await response.json();             // convert JSON to JS objects
  allProjects = projects;
  displayProjects(projects);
}

// 3. Loop through projects and build a card for each
function displayProjects(projects) {
  projectGrid.innerHTML = "";   // clear old cards

  projects.forEach(project => {
    const card = document.createElement("div");   // make a new element
    card.classList.add("col-md-6", "col-lg-4");   // Bootstrap grid column

    card.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h2 class="h5 card-title">${project.title}</h2>
          <p class="text-muted small">${project.category}</p>
          <p class="card-text">${project.description}</p>
          <p><strong>Tech:</strong> ${project.technologies.join(", ")}</p>
        </div>
      </div>
    `;

    projectGrid.appendChild(card);   // add it to the page
  });
}

// 4. Only run on the Projects page
if (projectGrid) {
  loadProjects();
}
// ===== FILTER BUTTONS =====
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;   // reads data-category from the button

    if (category === "All") {
      displayProjects(allProjects);
    } else {
      const filtered = allProjects.filter(project => project.category === category);
      displayProjects(filtered);
    }
  });
});
/// ===== BACK TO TOP BUTTON =====
const backToTop = document.querySelector("#back-to-top");   // select the button

if (backToTop) {

  // Show the button after scrolling down 300 pixels
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.remove("d-none");   
    } else {
      backToTop.classList.add("d-none");      
    }
  });

  // Scroll smoothly to the top when clicked
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}