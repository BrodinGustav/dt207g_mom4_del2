//Definierar URL:S
const apiUrl = "http://localhost:3000/api";
const url_Register = `${apiUrl}/register`;
const url_LogIn = `${apiUrl}/login`;
const url_Protected = `${apiUrl}/protected`;

//****HÄNDELSELYSSNARE****
document.addEventListener("DOMContentLoaded", function() {

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Kontrollera om formulär finns
if (!registerForm || !loginForm) {
    console.error("Kan inte hitta formulär.");
    return;
}

//Händelselyssnare för register-formulär
registerForm.addEventListener("submit", async function(event) {

    event.preventDefault();
    
    //Hämtar in input från ID:fält
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

 // Kontrollera inputfälten
 if (!username || !password) {
    console.error("Användarnamn och lösenord krävs.");
    return;
}

registerForm.style.display = "none";
await createUser(username, password);

    // Återställ input-fälten till tomma strängar
    document.getElementById("registerUsername").value = "";
    document.getElementById("registerPassword").value = "";

});

//Händelselyssnare för login-forumlär
loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();
    
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    

 // Kontrollera inputfälten
 if (!username || !password) {
    console.error("Användarnamn och lösenord krävs.");
    return;
}

registerForm.style.display = "none";
loginForm.style.display = "none";

    await logIn(username, password);

    // Återställ input-fälten till tomma strängar
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
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
        } else {
            // Vid felaktiga användaruppgifter, visa felmeddelande
            const errorContainer = document.getElementById("error_container");
            const errorList = document.getElementById("error_list");
            errorList.innerHTML = ""; // Rensa tidigare felmeddelanden
            const li = document.createElement("li");
            li.textContent = "Fel användarnamn eller lösenord.";
            errorList.appendChild(li);
            errorContainer.style.display = "block";
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
    window.location.href = 'index.html';
}