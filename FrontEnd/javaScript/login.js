//** The mail and the password of the customer **
const email = "sophie.bluel@test.tld";
const password = "S0phie";

//** global variables **
const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

//** this function sends a POST request to the API and retrieves and puts the token in local storage **
async function retrieveToken(email, password) {
  const url = "http://localhost:5678/api/users/login";
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    localStorage.setItem("token", result.token);
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "./index.html";
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    alert("Un problème est survenu, veuillez réessayer plus tard.");
  }
}

//** this function sends an error if incorrect email or password **
function loginError() {
  emailInput.value = "";
  passwordInput.value = "";

  emailInput.classList.add("error");
  emailInput.placeholder = "Erreur dans l’identifiant ou le mot de passe";
}

//** this function starts retrieveToken() if email and password are good **
function login() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const valueInputMail = emailInput.value;
    const valueInputPassword = passwordInput.value;

    if (valueInputMail === email && valueInputPassword === password) {
      retrieveToken(valueInputMail, valueInputPassword);
    } else {
      loginError();
    }
  });
}

login();
