// ***************  GENERAL  ***************

//** recovery of the modal, its default display is none **
const modaleOpenAndClose = document.querySelector(".modale-container");
modaleOpenAndClose.style.display = "none";

//** this function open the modale **
function openModale() {
  const buttonOpen = document.querySelector("#section-title p");
  buttonOpen.addEventListener("click", () => {
    modaleOpenAndClose.style.display = "flex";

    const modale1 = document.getElementById("modale1");
    modale1.style.display = "flex";
  });
}
openModale();

//** this function closes the modale **
function closeModale() {
  const modaleBg = document.querySelector(".modale-background");
  modaleBg.addEventListener("click", () => {
    modaleOpenAndClose.style.display = "none";
    modale2.style.display = "none";
    cleanModale();
  });
  const buttonClose = document.getElementById("closing-cross");
  buttonClose.addEventListener("click", () => {
    modaleOpenAndClose.style.display = "none";
  });
  const buttonClose2 = document.getElementById("closing-cross2");
  buttonClose2.addEventListener("click", () => {
    cleanModale();

    modaleOpenAndClose.style.display = "none";

    const modale2 = document.getElementById("modale2");
    modale2.style.display = "none";
  });
}
closeModale();

//** this function cleans the inputs and the button of the second modal **
function cleanModale() {
  const form = document.querySelector(".add-pic-form");
  const iconFile = document.querySelector(".add-pic-section i");
  const labelFile = document.querySelector(".add-pic-section label");
  const previewImg = document.querySelector(".add-pic-section img");
  const textCondition = document.querySelector(".add-pic-section p");
  const validateButton = document.getElementById("btn-validate");

  iconFile.style.display = "flex";
  labelFile.style.display = "flex";
  previewImg.style.display = "none";
  textCondition.style.display = "flex";

  form.reset();

  validateButton.style.backgroundColor = "#A7A7A7";
}

//** this function allows you to refresh the work on the modal and on the homepage **
import { displayAndFilteredWorks } from "./works.js";
function RefreshModaleAndHomepage() {
  const modaleGallery = document.querySelector(".display-works-modale");
  const gallery = document.querySelector(".gallery");

  modaleGallery.innerHTML = "";
  retrieveWork();
  gallery.innerHTML = "";
  displayAndFilteredWorks();
}

//***************  FOR THE FIRST MODALE  ***************

//** this function displays the works in the modal **
function showWorksInModale(works) {
  const gallery = document.querySelector(".display-works-modale");
  works.forEach((work) => {
    const divInGallery = document.createElement("div");
    divInGallery.classList.add("img-and-icon");

    const galleryImg = document.createElement("img");
    galleryImg.src = work.imageUrl;
    divInGallery.appendChild(galleryImg);

    const divIcon = document.createElement("div");
    divIcon.id = work.id;
    divIcon.classList.add("div-icon-trash");
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash-can");
    divIcon.appendChild(icon);
    divInGallery.appendChild(divIcon);

    gallery.appendChild(divInGallery);
  });
  deleteWorks();
}

//** this function retrieves the data from the API **
function retrieveWork() {
  const url = "http://localhost:5678/api/works";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showWorksInModale(data);
    });
}

retrieveWork();

//** this function allows you to delete jobs **
function deleteWorks() {
  const url = "http://localhost:5678/api/works/";
  const token = localStorage.getItem("token");
  const allTrash = document.querySelectorAll(".div-icon-trash");

  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      const id = trash.id;
      const init = {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(url + id, init)
        .then((response) => {
          RefreshModaleAndHomepage();
        })
        .catch((error) => {
          console.error("Error deleting photo:", error);
          alert("Un problème est survenu, veuillez réessayer plus tard.");
        });
    });
  });
}

//***************  FOR THE SECONDE MODALE  ***************

//** global variables that we will call many times **
const inputFile = document.querySelector(".add-pic-section input");
const inputTitle = document.getElementById("titre");
const select = document.getElementById("categorie-select");

//** this function opens the second modal and return on the first with the parameters of the functions to call **
function openSecondModaleAndReturn() {
  const modale1 = document.getElementById("modale1");
  const modale2 = document.getElementById("modale2");
  const btnAddPicture = document.getElementById("btn-add-picture");

  btnAddPicture.addEventListener("click", () => {
    modale1.style.display = "none";
    modale2.style.display = "flex";
    imgPreview();

    const iconReturn = document.getElementById("return-arrow");
    iconReturn.addEventListener("click", () => {
      cleanModale();
      modale2.style.display = "none";
      modale1.style.display = "flex";
    });
  });
}

openSecondModaleAndReturn();

//** this function allows you to display the image added in the form **
function imgPreview() {
  const iconFile = document.querySelector(".add-pic-section i");
  const labelFile = document.querySelector(".add-pic-section label");
  const previewImg = document.querySelector(".add-pic-section img");
  const textCondition = document.querySelector(".add-pic-section p");

  inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImg.src = e.target.result;
        previewImg.style.display = "block";
        iconFile.style.display = "none";
        labelFile.style.display = "none";
        textCondition.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });
}

//** this function turns the button green when all the fields are filled **
function greenBtnValidated() {
  document.addEventListener("DOMContentLoaded", function () {
    const validateButton = document.getElementById("btn-validate");

    function checkFormCompletion() {
      if (inputFile.value && inputTitle.value && select.value) {
        validateButton.style.backgroundColor = "#1D6154";
      } else {
        validateButton.style.backgroundColor = "#A7A7A7";
      }
    }

    inputFile.addEventListener("change", checkFormCompletion);
    inputTitle.addEventListener("input", checkFormCompletion);
    select.addEventListener("change", checkFormCompletion);
  });
}

greenBtnValidated();

//** this function displays an error if all the fields are not filled in **
function formError() {
  inputTitle.value = "";
  select.value = "";

  inputTitle.classList.add("error");
  inputTitle.placeholder = "Renseignez une image, un Titre et une categorie";
}

//** this function allows you to post a new work **
function postNewWork() {
  const token = localStorage.getItem("token");
  const url = "http://localhost:5678/api/works";

  const formData = new FormData();
  formData.append("image", inputFile.files[0]);
  formData.append("title", inputTitle.value);
  formData.append("category", select.value);

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      RefreshModaleAndHomepage();
      cleanModale();
    })
    .catch((error) => {
      console.error("There was an error with the request:", error);
      alert("Un problème est survenu, veuillez réessayer plus tard.");
    });
}

//** this function makes the form operational **
function paramsToAddWork() {
  const modale1 = document.getElementById("modale1");
  const modale2 = document.getElementById("modale2");
  const form = document.querySelector(".add-pic-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (
      inputFile.value === "" ||
      inputTitle.value === "" ||
      select.value === ""
    ) {
      formError();
      cleanModale();
    } else {
      postNewWork();
      modale2.style.display = "none";
      modale1.style.display = "flex";
    }
  });
}

paramsToAddWork();
