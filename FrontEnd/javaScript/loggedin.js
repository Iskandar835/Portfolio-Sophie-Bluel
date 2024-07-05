//** global variable **
const btnLogout = document.getElementById("login");

//** this function sets up the elements once connected **
function userLoggedIn() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const editMode = document.querySelector(".edit-mode")
  const addModifier = document.getElementById("section-title");
  const filtersNone = document.querySelector(".all-filters");
  if (isLoggedIn === "true") {
    editMode.style.display = "flex";

    btnLogout.innerText = "logout";

    const iconModifier = document.createElement("i");
    iconModifier.classList.add("fa-regular", "fa-pen-to-square");
    const textModifier = document.createElement("p");
    textModifier.appendChild(iconModifier);
    textModifier.innerHTML += "Modifier";

    addModifier.classList.add("h2-and-modifier");
    addModifier.appendChild(textModifier);

    filtersNone.style.display = "none";
  }
}

userLoggedIn();

//** This function is used to log out **
function userLoggedOut() {
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    window.location.href = "./index.html";
  });
}

userLoggedOut();
