//Definierar URL:S
const apiUrl = "http://localhost:3000/api";
const url_Register = `${apiUrl}/register`;
const url_LogIn = `${apiUrl}/login`;
const url_Protected = `${apiUrl}/protected`;

//Funktion för att registrera användare
document.getElementById("registerForm").addEventListener("submit", async function(event) {

    event.preventDefault();
    
    //Hämtar in input från ID:fält
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    await createUser(username, password);
});

//Funktion för att logga in
document.getElementById("loginForm").addEventListener("submit", async function(event) {

    event.preventDefault();
    
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    
    await logIn(username, password);
});