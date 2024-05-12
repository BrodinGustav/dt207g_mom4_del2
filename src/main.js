//Definierar URL:S
const apiUrl = "http://localhost:3000/api";
const url_Register = `${apiUrl}/register`;
const url_LogIn = `${apiUrl}/login`;
const url_Protected = `${apiUrl}/protected`;

//****HÄNDELSELYSSNARE****
document.addEventListener("DOMContentLoaded", function() {

//Händelselyssnare för register-formulär
document.getElementById("registerForm").addEventListener("submit", async function(event) {

    event.preventDefault();
    
    //Hämtar in input från ID:fält
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    await createUser(username, password);
});

//Händelselyssnare för login-forumlär
document.getElementById("loginForm").addEventListener("submit", async function(event) {

    event.preventDefault();
    
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    
    await logIn(username, password);
});
});
//****FUNKTIONER****

//Funktion för att skapa användare
async function createUser(username, password) {             //Argument från servern skickas med vid fetch

    try {
        const response = await fetch(url_Register, {        //Fetchar från URL gällande registrering
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
    
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log(data);                                  //Skriver ut svar från servern

    } catch (error) {
        console.error("Error registering user:", error);
    }
}

//Funktion för att logga in 
async function logIn(username, password) {              //Argument från servern skickas med vid fetch
 
    try {
        const response = await fetch(url_LogIn, {        //Fetchar från URL gällande login
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
 
        const data = await response.json();
        console.log(data);                              //Skriver ut svar från servern
 
        if (data.token) {
            localStorage.setItem("token", data.token);      //Lagra token i localStorage om lyckad inlogg
            await getProtectedData();
        }
 
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

//Funktion för att hämta skyddad data
async function getProtectedData() {

    try {
        const token = localStorage.getItem("token");     //Hämtar token från localStorage vid fetch
        const response = await fetch(url_Protected, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    
        const data = await response.json();
        console.log(data);
    
        //Hämtar ID
        document.getElementById("protectedContent").textContent = JSON.stringify(data);     //Skriver ut data från ID hämtad från servern
        document.getElementById("protectedData").style.display = "block";                   //Visar ID vid hämtning av serverdata
    
    } catch (error) {
        console.error("Error fetching protected data:", error);
    }
}

//Funktion för att logga ut
function logOut() {
    localStorage.removeItem("token");                                           //Tar bort token vid utlogg
    document.getElementById("protectedData").style.display = "none";            //Gömmer ID vid utlogg
}